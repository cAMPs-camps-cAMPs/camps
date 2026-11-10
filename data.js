// ============================================================
// サイトの中身（データ）はすべてこのファイルに書きます。
// HTMLやCSSを触らなくても、ここを編集すれば表示が変わります。
//
// 書き方の注意
//  ・文字は "（ダブルクォート）で囲む
//  ・項目の区切りは ,（カンマ）。最後の項目の後ろのカンマはあってもOK
//  ・{ } や [ ] の閉じ忘れに注意（崩れたらまずここを確認）
// ============================================================

// ---------- サイト全体 ----------
const SITE = {
  name: "cAMPs",
  catchcopy: "ゆるく集まってゲームする、5人のDiscordサーバー",
  about: [
    "ここにサーバーの紹介文を書きます。",
    "どんなメンバーが、いつごろ、何をして遊んでいるかなど。",
  ],
};

// ---------- メンバー ----------
// id     : 個人ページのURLに使う名前（英小文字・数字のみ）。例 member.html?id=kafka
// icon   : images フォルダの全身イラスト（縦長）。まだ無い人は "" にしておくと頭文字で表示
// face   : 小さい丸アイコンに切り抜く顔の位置。"横% 縦%"（0%が左・上、100%が右・下）
//          顔がずれていたら数字を少しずつ変えて調整する
// games  : よく遊ぶゲーム名のリスト
// links  : 外部リンク。label が表示名、url がリンク先
const MEMBERS = [
  {
    id: "marupis",
    name: "marupis",
    icon: "images/marupis.webp",
    face: "29% 39%",
    role: "",
    comment: "ひとこと",
    games: [],
    likes: "",
    links: [],
  },
  {
    id: "bubobu",
    name: "bubobu.",
    icon: "",
    face: "50% 20%",
    role: "",
    comment: "ひとこと",
    games: [],
    likes: "",
    links: [],
  },
  {
    id: "typicalboy",
    name: "Typicalboy",
    icon: "images/typicalboy.webp",
    face: "47% 6%",
    role: "",
    comment: "ひとこと",
    games: [],
    likes: "",
    links: [],
  },
  {
    id: "ipio",
    name: "IPIO",
    icon: "",
    face: "50% 20%",
    role: "",
    comment: "ひとこと",
    games: [],
    likes: "",
    links: [],
  },
  {
    id: "kafka",
    name: "Kafka",
    icon: "images/kafka.webp",
    face: "50% 25%",
    role: "",
    comment: "ひとこと",
    games: [],
    likes: "",
    links: [
      // 書き方の例： { label: "X", url: "https://x.com/xxxx" },
    ],
  },
];

// ---------- 遊んでいるゲーム ----------
// status  : "playing"（遊んでいる） か "past"（前に遊んでいた）
// players : 遊んでいるメンバーの id
// 書き方の例：
// { name: "ゲーム名", url: "https://store.steampowered.com/app/xxxx/", status: "playing", players: ["kafka", "opipi"], note: "ひとこと" },
const GAMES = [];

// ---------- おすすめリンク ----------
// category : 見出しになるカテゴリ名。同じ名前のものがまとめて表示される
// by       : おすすめした人の id（空でもOK）
// 書き方の例：
// { category: "戦績・統計", title: "OP.GG", url: "https://www.op.gg/", by: "marupis", note: "LoLの戦績確認" },
const LINKS = [];
