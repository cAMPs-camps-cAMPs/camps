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
  // ロゴの左半分 → ライト、右半分 → ダーク
  document.querySelectorAll("[data-theme-set]").forEach((btn) =>
    btn.addEventListener("click", () => setTheme(btn.dataset.themeSet))
  );

  document.getElementById("site-about").innerHTML =
    SITE.about.map((line) => `<p>${esc(line)}</p>`).join("");

  document.getElementById("top-members").innerHTML = MEMBERS.map(
    (m) => `<a class="mini-member${m.status ? " has-status" : ""}" href="member.html?id=${esc(m.id)}"${colorAttr(m)}>
              <span class="mini-icon">${gameIconHtml(m)}${m.status ? `<span class="status-tag">${esc(m.status)}</span>` : ""}</span>
              <span class="m-name">${esc(m.name)}</span>
            </a>`
  ).join("");
}

// ---------- メンバー一覧 ----------
function renderMembers() {
  // 見出し「MEMBERS」を、カードの並び順どおりのメンバーカラーのグラデーションにする
  const colors = MEMBERS.map((m) => m.color).filter(Boolean);
  const title = document.querySelector(".page-title strong");
  if (title && colors.length > 1) title.style.backgroundImage =`linear-gradient(90deg, ${colors.join(", ")})`;

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
                ${gameIconHtml(m)}<span class="m-name">${esc(m.name)}</span></a>`
    )
    .join("");
  return `<div class="card game-card">
      <h3><span class="game-title"${playersColorStyle(members)}>${esc(g.name)}</span></h3>
      ${g.note ? `<p class="comment">${esc(g.note)}</p>` : ""}
      <div class="players">${players}</div>
      ${g.url ? `<a class="store-link" href="${esc(g.url)}" target="_blank" rel="noopener">${esc(g.store || "ストアページ")} →</a>` : ""}
    </div>`;
}

// ---------- スポーツ成績（リンク集ページ） ----------
function sportsHtml() {
  if (typeof SPORTS === "undefined" || !SPORTS.teams.length) return "";
  const formLabel = { W: "勝", D: "分", L: "敗" };
  const cardHtml = (list) => list
    .map(
      (t) => `<li class="card sport-card" style="--team-color:${esc(t.color || "var(--accent)")}">
        <p class="sport-league">${esc(t.league)}<span>${esc(t.season)}</span></p>
        <h3>${esc(t.name)}</h3>
        <p class="sport-rank"><strong>${esc(t.rank)}</strong>位</p>
        <p class="sport-record">${esc(t.record)}</p>
        ${
          (t.form || []).length
            ? `<p class="sport-form" aria-label="直近${t.form.length}試合">${t.form
                .map((f) => `<span class="form-${esc(f)}">${esc(formLabel[f] || f)}</span>`)
                .join("")}<small>直近${t.form.length}試合（左が古い）</small></p>`
            : ""
        }
        ${t.url ? `<a class="store-link" href="${esc(t.url)}" target="_blank" rel="noopener">順位表を見る →</a>` : ""}
      </li>`
    )
    .join("");

  // 種目（sport）ごとに分けて表示（登場順）
  const sports = [...new Set(SPORTS.teams.map((t) => t.sport || "その他"))];
  const groups = sports
    .map(
      (s) => `<h3 class="sport-group-title">${esc(s)}</h3>
        <ul class="sport-list">${cardHtml(SPORTS.teams.filter((t) => (t.sport || "その他") === s))}</ul>`
    )
    .join("");

  return `<h2 class="group-title">スポーツ成績</h2>
    <p class="sport-updated">最終更新：${esc(SPORTS.updated)}（自動更新ではありません。最新は各順位表へ）</p>
    ${groups}`;
}

// ---------- おすすめリンク ----------
function renderLinks() {
  const box = document.getElementById("link-list");

  // メンバーごとのリンク（data.js の各メンバーの links から自動で作る）
  const memberLinksHtml = `<h2 class="group-title">メンバーのリンク</h2>
    <ul class="member-links">${MEMBERS.map(
      (m) => `<li class="card member-link"${colorAttr(m)}>
        <a class="member-link-name" href="member.html?id=${esc(m.id)}">${iconHtml(m, "s")}<span class="m-name">${esc(m.name)}</span></a>
        ${
          m.links.length
            ? `<ul class="link-buttons">${m.links
                .map((l) => `<li><a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a></li>`)
                .join("")}</ul>`
            : `<p class="empty">${esc(m.status || "準備中")}</p>`
        }
      </li>`
    ).join("")}</ul>`;

  // カテゴリ名の登場順にまとめる
  const categories = [...new Set(LINKS.map((l) => l.category))];

  box.innerHTML = memberLinksHtml + sportsHtml() + categories
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

// ---------- モードごとのロゴ（トップの大きいロゴ） ----------
// ダーク：月のロゴ／ライト：太陽のロゴ（白背景）／カーボン：太陽と月のロゴ（カーボン背景）
// ※ 左上のヘッダーの小さいロゴ：ライトは白背景の太陽と月、それ以外は真っ黒背景の太陽と月
const LOGOS = {
  dark: "images/logo-dark.png",
  light: "images/logo-light.webp",
  carbon: "images/logo-carbon.png",
};
const HEADER_LOGOS = {
  light: "images/logo-white.webp",
  other: "images/logo-black.png",
};

function applyLogoForTheme() {
  const theme = document.documentElement.dataset.theme;
  const src = LOGOS[theme] || LOGOS.carbon;
  document.querySelectorAll(".hero-logo").forEach((el) => (el.src = src));
  const headerSrc = theme === "light" ? HEADER_LOGOS.light : HEADER_LOGOS.other;
  document.querySelectorAll(".logo img").forEach((el) => (el.src = headerSrc));
}

applyLogoForTheme();
document.addEventListener("themechange", applyLogoForTheme);

// <body data-page="..."> の値に応じて、そのページ用の表示を実行
const renderers = {
  top: renderTop,
  members: renderMembers,
  member: renderMember,
  games: renderGames,
  links: renderLinks,
};
renderers[document.body.dataset.page]?.();
