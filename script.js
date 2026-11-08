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

// id からメンバーを探す
function findMember(id) {
  return MEMBERS.find((m) => m.id === id);
}

// アイコン画像。画像が無いときは頭文字の丸アイコンに切り替える
function iconHtml(member, size) {
  const initial = esc(member.name.charAt(0).toUpperCase());
  return `
    <span class="icon icon-${size}" data-initial="${initial}">
      <img src="${esc(member.icon)}" alt="${esc(member.name)}のアイコン"
           onerror="this.remove()">
    </span>`;
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
    (m) => `<a class="mini-member" href="member.html?id=${esc(m.id)}">
              ${iconHtml(m, "s")}<span>${esc(m.name)}</span>
            </a>`
  ).join("");
}

// ---------- メンバー一覧 ----------
function renderMembers() {
  document.getElementById("member-list").innerHTML = MEMBERS.map(
    (m) => `<a class="card member-card" href="member.html?id=${esc(m.id)}">
              ${iconHtml(m, "m")}
              <h2>${esc(m.name)}</h2>
              ${m.role ? `<p class="role">${esc(m.role)}</p>` : ""}
              <p class="comment">${esc(m.comment)}</p>
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

  const gamesHtml = m.games.length
    ? `<ul class="tags">${m.games.map((g) => `<li>${esc(g)}</li>`).join("")}</ul>`
    : emptyHtml("準備中");

  const linksHtml = m.links.length
    ? `<ul class="link-buttons">${m.links
        .map((l) => `<li><a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a></li>`)
        .join("")}</ul>`
    : emptyHtml("準備中");

  box.innerHTML = `
    <div class="profile-head">
      ${iconHtml(m, "l")}
      <div>
        <h1>${esc(m.name)}</h1>
        ${m.role ? `<p class="role">${esc(m.role)}</p>` : ""}
        <p class="comment">${esc(m.comment)}</p>
      </div>
    </div>
    <section class="profile-section"><h2>よく遊ぶゲーム</h2>${gamesHtml}</section>
    <section class="profile-section"><h2>好きなもの</h2>${
      m.likes ? `<p>${esc(m.likes)}</p>` : emptyHtml("準備中")
    }</section>
    <section class="profile-section"><h2>リンク</h2>${linksHtml}</section>
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
    { key: "playing", title: "いま遊んでいる" },
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
  const players = (g.players || [])
    .map(findMember)
    .filter(Boolean)
    .map((m) => `<a href="member.html?id=${esc(m.id)}" title="${esc(m.name)}">${iconHtml(m, "s")}</a>`)
    .join("");
  return `<div class="card game-card">
      <h3>${esc(g.name)}</h3>
      ${g.note ? `<p class="comment">${esc(g.note)}</p>` : ""}
      <div class="players">${players}</div>
      ${g.url ? `<a class="store-link" href="${esc(g.url)}" target="_blank" rel="noopener">ストアページ →</a>` : ""}
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
