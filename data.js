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
// role    : 名前の上に出る肩書き（短く）
// comment : カードに出るひとこと（1行くらい）
// profile : 個人ページに出る紹介文。[ ] の中に "段落" を並べる
// ※よく遊ぶゲームは、下の GAMES の players から自動で表示される
// links  : 外部リンク。label が表示名、url がリンク先
const MEMBERS = [
  {
    id: "marupis",
    name: "marupis",
    icon: "images/marupis.webp",
    face: "29% 39%",
    role: "社長 / LoL廃人",
    comment: "表の顔は社長、裏の顔はLoL廃人。",
    profile: [
      "昼は社長、夜はサモナーズリフトの住人。会議よりランク戦、決算書よりKDAをチェックする。",
      "経営判断のスピードは、フラッシュを押す指より速いとか遅いとか。",
    ],
    likes: "",
    links: [],
  },
  {
    id: "bubobu",
    name: "bubobu.",
    icon: "images/bubobu.webp",
    face: "75% 5%",
    role: "IPIOの逆ベクトル",
    comment: "IPIOとは基本真逆。噛み合った瞬間、誰にも止められない。",
    profile: [
      "会話がなくても、なぜか毎回IPIOと真逆の方向へ全力で進んでいく。右と言われれば左、攻めの空気なら守り。",
      "しかし二人のベクトルがぴたりと揃ったとき、cAMPs最強の合体技が発動する。発動条件は今も解明されていない。",
    ],
    likes: "",
    links: [],
  },
  {
    id: "typicalboy",
    name: "Typicalboy",
    icon: "images/typicalboy.webp",
    face: "47% 6%",
    role: "ツッコミ担当",
    comment: "全女性の世論を背負う存在。ツッコミは常に最速。",
    profile: [
      "全女性の世論を一身に背負った存在。その「いや、それはない」は、すなわち世の女性たちの総意である。",
      "ボケが発生すると0.1秒でツッコミが飛んでくる、cAMPsの良識（たぶん）。",
    ],
    likes: "",
    links: [],
  },
  {
    id: "ipio",
    name: "IPIO",
    icon: "images/ipio.webp",
    face: "42% 13%",
    role: "bubobu.の逆ベクトル",
    comment: "bubobu.とは基本真逆。噛み合った瞬間、手がつけられない。",
    profile: [
      "無言のまま、bubobu.と真逆の行動を取り続けるもう一人の主人公。打ち合わせをしていないのに、毎回きれいに逆を行く。",
      "ただし二人のベクトルが一致したとき、その破壊力は計測不能。敵チームは祈るしかない。",
    ],
    likes: "",
    links: [],
  },
  {
    id: "kafka",
    name: "Kafka",
    icon: "images/kafka.webp",
    face: "50% 25%",
    role: "まとめ役",
    comment: "みんなをまとめる頼れる存在。ただし本人がよく寝坊する。",
    profile: [
      "バラバラなcAMPsを不思議とひとつにまとめ上げる、頼れるまとめ役。",
      "……なのだが、集合時間になっても本人だけ来ないことがある。理由はだいたい寝坊。",
    ],
    likes: "",
    links: [
      // 書き方の例： { label: "X", url: "https://x.com/xxxx" },
    ],
  },
];

// ---------- 遊んでいるゲーム ----------
// status  : "playing"（遊んでいる） か "past"（前に遊んでいた）
// players : 遊んでいるメンバーの id（bubobu / ipio / kafka / marupis / typicalboy）
//           ここに書いたゲームは、各メンバーの個人ページにも自動で表示される
// store   : リンク先の名前（ボタンに表示）
// 書き方の例：
// { name: "ゲーム名", url: "https://store.steampowered.com/app/xxxx/", store: "Steam", status: "playing", players: ["kafka", "ipio"], note: "ひとこと" },
const GAMES = [
  { name: "Fortnite", url: "https://www.fortnite.com/", store: "公式サイト", status: "playing", players: ["ipio", "kafka"] },
  { name: "Terraria", url: "https://store.steampowered.com/app/105600/", store: "Steam", status: "playing", players: ["ipio", "kafka", "typicalboy", "marupis"] },
  { name: "League of Legends", url: "https://www.leagueoflegends.com/", store: "公式サイト", status: "playing", players: ["ipio", "kafka", "typicalboy", "marupis"] },
  { name: "Apex Legends", url: "https://store.steampowered.com/app/1172470/", store: "Steam", status: "playing", players: ["ipio", "kafka", "typicalboy", "bubobu"] },
  { name: "VALORANT", url: "https://playvalorant.com/", store: "公式サイト", status: "playing", players: ["ipio", "kafka", "typicalboy", "bubobu", "marupis"] },
  { name: "Monster Hunter Wilds", url: "https://store.steampowered.com/app/2246340/", store: "Steam", status: "playing", players: ["ipio", "kafka", "typicalboy", "bubobu"] },
  { name: "Street Fighter 6", url: "https://store.steampowered.com/app/1364780/", store: "Steam", status: "playing", players: ["kafka"] },
  { name: "Path of Exile 2", url: "https://store.steampowered.com/app/2694490/", store: "Steam", status: "playing", players: ["kafka", "typicalboy", "ipio"] },
  { name: "ContractVille", url: "https://store.steampowered.com/app/2698780/", store: "Steam", status: "playing", players: ["ipio", "kafka", "typicalboy"] },
  { name: "PEAK", url: "https://store.steampowered.com/app/3527290/", store: "Steam", status: "playing", players: ["kafka", "typicalboy", "ipio"] },
  { name: "METAL GEAR SOLID Δ: SNAKE EATER", url: "https://store.steampowered.com/app/2417610/", store: "Steam", status: "playing", players: ["kafka"] },
  { name: "Shadowverse: Worlds Beyond", url: "https://store.steampowered.com/app/2584990/", store: "Steam", status: "playing", players: ["typicalboy"] },
  { name: "Windrose", url: "https://store.steampowered.com/app/3041230/", store: "Steam", status: "playing", players: ["typicalboy", "kafka", "ipio"] },
  { name: "Heavenly Bodies", url: "https://store.steampowered.com/app/1138850/", store: "Steam", status: "playing", players: ["typicalboy", "kafka", "ipio", "bubobu"] },
];

// ---------- おすすめリンク ----------
// category : 見出しになるカテゴリ名。同じ名前のものがまとめて表示される
// by       : おすすめした人の id（空でもOK）
// 書き方の例：
// { category: "戦績・統計", title: "OP.GG", url: "https://www.op.gg/", by: "marupis", note: "LoLの戦績確認" },
const LINKS = [];
