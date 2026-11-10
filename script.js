// ============================================================
// data.js の中身を読み取って、各ページに表示するためのプログラム。
// 普段の更新では、このファイルを触る必要はありません。
// ============================================================

// 文字列をHTMLに安全に埋め込むための変換（< や > などを無害化）
function esc(text) {
  return String(text ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// メンバーを名前のABC順（大文字・小文字は区別しない）に並べ替える
// → data.js にはどの順番で書いても、表示は常にABC順になる
MEMBERS.sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));

// id からメンバーを探す
function findMember(id) {
  return MEMBERS.find((m) => m.id === id);
}

// 頭文字（画像が無いときの代わり）
function initialOf(member) {
  return esc(member.name.charAt(0).toUpperCase());
}

// イメージカラーを CSS に渡すための style 属性（色の使い方は style.css 側で決める）
function colorAttr(member) {
  return member.color ? ` style="--member-color:${esc(member.color)}"` : "";
}

// 小さい丸アイコン。全身イラストから顔の部分（data.js の face）を切り抜いて表示
function iconHtml(member, size) {
  const style = member.icon
    ? `style="background-image:url('${esc(member.icon)}');background-position:${esc(member.face || "50% 20%")}"`
    : "";
  return `<span class="icon icon-${size}${member.icon ? " has-image" : ""}"
            data-initial="${initialOf(member)}" ${style}
            role="img" aria-label="${esc(member.name)}"></span>`;
}

// ゲーム一覧用の丸アイコン。data.js の gameIcon で指定した部分（ペットや小物など）を切り抜く
// gameIcon が無い人は通常の顔アイコンを使う
function gameIconHtml(member) {
  const c = member.gameIcon;
  if (!member.icon || !c) return iconHtml(member, "s");
  const style = `width:${Number(c.zoom) * 100}%;transform:translate(-${Number(c.x)}%,-${Number(c.y)}%)`;
  return `<span class="icon icon-s icon-crop has-image" role="img" aria-label="${esc(member.name)}">
            <img src="${esc(member.icon)}" alt="" style="${style}" onerror="this.parentNode.classList.remove('has-image');this.remove()">
          </span>`;
}

// ゲーム名の色：遊んでいる人のイメージカラー。複数人ならグラデーション
function playersColorStyle(players) {
  const colors = players.map((m) => m.color).filter(Boolean);
  if (!colors.length) return "";
  const bg = colors.length === 1 ? colors[0] : `linear-gradient(90deg, ${colors.join(", ")})`;
  return ` style="--title-color:${esc(bg)}"`;
}

// 縦長の全身イラスト。画像が無いときは頭文字を大きく表示
function portraitHtml(member) {
  return `<div class="portrait" data-initial="${initialOf(member)}">
      ${member.icon ? `<img src="${esc(member.icon)}" alt="${esc(member.name)}のイラスト" onerror="this.remove()">` : ""}
    </div>`;
}

// 「準備中」表示
function emptyHtml(message) {
  return `<p class="empty">${esc(message)}</p>`;
}

// ---------- トップページ ----------
function renderTop() {
  document.getElementById("site-about").innerHTML =
    SITE.about.map((line) => `<p>${esc(line)}</p>`).join("");

  document.getElementById("top-members").innerHTML = MEMBERS.map(
    (m) => `<a class="mini-member" href="member.html?id=${esc(m.id)}"${colorAttr(m)}>
              ${iconHtml(m, "s")}<span>${esc(m.name)}</span>
            </a>`
  ).join("");
}

// ---------- メンバー一覧 ----------
function renderMembers() {
  document.getElementById("member-list").innerHTML = MEMBERS.map(
    (m) => `<a class="member-card" href="member.html?id=${esc(m.id)}"${colorAttr(m)}>
              ${portraitHtml(m)}
              <div class="member-card-body">
                <h2>${esc(m.name)}</h2>
              </div>
            </a>`
  ).join("");
}

// ---------- 個人ページ ----------
function renderMember() {
  // URLの ?id=xxx 部分を読み取る
  const id = new URLSearchParams(location.search).get("id");
  const m = findMember(id);
  const box = document.getElementById("member-detail");

  if (!m) {
    box.innerHTML = emptyHtml("メンバーが見つかりませんでした。");
    return;
  }

  document.title = `${m.name} | ${SITE.name}`;
  if (m.color) box.style.setProperty("--member-color", m.color);

  // GAMES の players にこの人の id が入っているゲームを集める
  const myGames = GAMES.filter((g) => (g.players || []).includes(m.id));
  const gamesHtml = myGames.length
    ? `<ul class="tags">${myGames
        .map((g) =>
          g.url
            ? `<li><a href="${esc(g.url)}" target="_blank" rel="noopener">${esc(g.name)}</a></li>`
            : `<li>${esc(g.name)}</li>`
        )
        .join("")}</ul>`
    : emptyHtml("準備中");

  const linksHtml = m.links.length
    ? `<ul class="link-buttons">${m.links
        .map((l) => `<li><a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a></li>`)
        .join("")}</ul>`
    : emptyHtml("準備中");

  box.innerHTML = `
    <div class="profile-visual">${portraitHtml(m)}</div>
    <div class="profile-info">
      <div class="profile-head">
        ${m.role ? `<p class="role">${esc(m.role)}</p>` : ""}
        <h1>${esc(m.name)}</h1>
        <p class="comment">${esc(m.comment)}</p>
      </div>
      ${(m.profile || []).length
        ? `<section class="profile-section profile-text"><h2>プロフィール</h2>${m.profile
            .map((p) => `<p>${esc(p)}</p>`)
            .join("")}</section>`
        : ""}
      <section class="profile-section"><h2>よく遊ぶゲーム</h2>${gamesHtml}</section>
      <section class="profile-section"><h2>好きなもの</h2>${
        m.likes ? `<p>${esc(m.likes)}</p>` : emptyHtml("準備中")
      }</section>
      <section class="profile-section"><h2>リンク</h2>${linksHtml}</section>
    </div>
  `;
}

// ---------- ゲーム一覧 ----------
function renderGames() {
  const box = document.getElementById("game-list");
  if (!GAMES.length) {
    box.innerHTML = emptyHtml("準備中");
    return;
  }

  const groups = [
    { key: "playing", title: "ゲームタイトル" },
    { key: "past", title: "前に遊んでいた" },
  ];

  box.innerHTML = groups
    .map((group) => {
      const games = GAMES.filter((g) => g.status === group.key);
      if (!games.length) return "";
      return `<h2 class="group-title">${group.title}</h2>
        <div class="grid">${games.map(gameCardHtml).join("")}</div>`;
    })
    .join("");
}

function gameCardHtml(g) {
  // メンバー一覧と同じABC順で並べる
  const members = MEMBERS.filter((m) => (g.players || []).includes(m.id));
  const players = members
    .map(
      (m) => `<a class="player" href="member.html?id=${esc(m.id)}"${colorAttr(m)}>
                ${gameIconHtml(m)}<span>${esc(m.name)}</span></a>`
    )
    .join("");
  return `<div class="card game-card">
      <h3><span class="game-title"${playersColorStyle(members)}>${esc(g.name)}</span></h3>
      ${g.note ? `<p class="comment">${esc(g.note)}</p>` : ""}
      <div class="players">${players}</div>
      ${g.url ? `<a class="store-link" href="${esc(g.url)}" target="_blank" rel="noopener">${esc(g.store || "ストアページ")} →</a>` : ""}
    </div>`;
}

// ---------- おすすめリンク ----------
function renderLinks() {
  const box = document.getElementById("link-list");
  if (!LINKS.length) {
    box.innerHTML = emptyHtml("準備中");
    return;
  }

  // カテゴリ名の登場順にまとめる
  const categories = [...new Set(LINKS.map((l) => l.category))];

  box.innerHTML = categories
    .map((cat) => {
      const items = LINKS.filter((l) => l.category === cat)
        .map((l) => {
          const m = findMember(l.by);
          return `<li class="card link-item">
            <a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.title)}</a>
            ${l.note ? `<p class="comment">${esc(l.note)}</p>` : ""}
            ${m ? `<p class="by">${iconHtml(m, "s")}${esc(m.name)}のおすすめ</p>` : ""}
          </li>`;
        })
        .join("");
      return `<h2 class="group-title">${esc(cat)}</h2><ul class="link-items">${items}</ul>`;
    })
    .join("");
}

// ---------- 全ページ共通 ----------
// サイト名を差し込む
document.querySelectorAll(".site-name").forEach((el) => (el.textContent = SITE.name));
document.querySelectorAll(".site-catchcopy").forEach((el) => (el.textContent = SITE.catchcopy));
if (!document.title) document.title = SITE.name;
else if (!document.title.includes("|")) document.title += ` | ${SITE.name}`;

// <body data-page="..."> の値に応じて、そのページ用の表示を実行
const renderers = {
  top: renderTop,
  members: renderMembers,
  member: renderMember,
  games: renderGames,
  links: renderLinks,
};
renderers[document.body.dataset.page]?.();
