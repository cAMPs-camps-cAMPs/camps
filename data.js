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
  catchcopy: "朝から夜までゆるく集まってゲームする、5人のDiscordサーバー",
  about: [
    "朝から夜までゆるく集まってゲームする、5人のDiscordサーバー。",
  ],
};

// ---------- メンバー ----------
// id     : 個人ページのURLに使う名前（英小文字・数字のみ）。例 member.html?id=kafka
// icon   : images フォルダの全身イラスト（縦長）。まだ無い人は "" にしておくと頭文字で表示
// face   : 小さい丸アイコンに切り抜く顔の位置。"横% 縦%"（0%が左・上、100%が右・下）
//          顔がずれていたら数字を少しずつ変えて調整する
// gameIcon: ゲーム一覧の丸アイコンに切り抜く場所。x / y は切り抜く中心（画像の左上から何%か）、
//           zoom は拡大率（大きいほど小さい部分をアップにする）
// color   : イメージカラー。ゲーム一覧のアイコンの枠と、ゲーム名の色に使う
//           （遊んでいる人が複数いると、その人たちの色のグラデーションになる）
// role    : 名前の上に出る肩書き（短く）
// comment : カードに出るひとこと（1行くらい）
// profile : 個人ページに出る紹介文。[ ] の中に "段落" を並べる
// ※よく遊ぶゲームは、下の GAMES の players から自動で表示される
// links  : 外部リンク。label が表示名、url がリンク先。リンク集ページにも自動で載る
// status : 状態（例 "行方不明"）。トップページのアイコンに表示される。無い人は書かなくてOK
const MEMBERS = [
  {
    id: "marupis",
    name: "marupis",
    icon: "images/marupis.webp",
    face: "29% 39%",
    gameIcon: { x: 70.5, y: 30, zoom: 3.6 }, // ゲーム一覧のアイコン：出目金
    color: "#b07cff",                         // イメージカラー：紫
    role: "社長 / LoL廃人",
    comment: "表の顔は社長、裏の顔はLoL廃人。",
    profile: [
      "昼は社長、夜はサモナーズリフトの住人。会議よりランク戦、決算書よりKDAをチェックする。",
      "経営判断のスピードは、フラッシュを押す指より速いとか遅いとか。",
    ],
    likes: "",
    links: [{ label: "OP.GG", url: "https://op.gg/lol/summoners/jp/%E3%81%BE%E3%82%8B%E3%81%B4%E3%81%99-JP1" }, { label: "DeepLoL", url: "https://www.deeplol.gg/summoner/jp/%E3%81%BE%E3%82%8B%E3%81%B4%E3%81%99-JP1" }], // まるぴす#JP1
  },
  {
    id: "bubobu",
    name: "bubobu.",
    icon: "images/bubobu.webp",
    face: "75% 5%",
    gameIcon: { x: 65.5, y: 18, zoom: 4.6 },  // ゲーム一覧のアイコン：ガスマスクの顔
    color: "#ff9d42",                         // イメージカラー：オレンジ
    role: "IPIOの逆ベクトル",
    comment: "IPIOとは基本真逆。噛み合った瞬間、誰にも止められない。",
    profile: [
      "会話がなくても、なぜか毎回IPIOと真逆の方向へ全力で進んでいく。右と言われれば左、攻めの空気なら守り。",
      "しかし二人のベクトルがぴたりと揃ったとき、cAMPs最強の合体技が発動する。発動条件は今も解明されていない。",
    ],
    likes: "",
    links: [], // OP.GG（Nettr222#7154）は戦績が見つからないため未登録
    status: "行方不明", // トップページなどに出る状態。不要になったらこの行を消す
  },
  {
    id: "typicalboy",
    name: "Typicalboy",
    icon: "images/typicalboy.webp",
    face: "47% 6%",
    gameIcon: { x: 75.4, y: 37.7, zoom: 17 }, // ゲーム一覧のアイコン：目の缶バッジ
    color: "#4d9bff",                         // イメージカラー：青
    role: "ツッコミ担当",
    comment: "全女性の世論を背負う存在。ツッコミは常に最速。",
    profile: [
      "全女性の世論を一身に背負った存在。その「いや、それはない」は、すなわち世の女性たちの総意である。",
      "ボケが発生すると0.1秒でツッコミが飛んでくる、cAMPsの良識（たぶん）。",
    ],
    likes: "",
    links: [{ label: "OP.GG", url: "https://op.gg/lol/summoners/jp/Typicalboy-2526" }, { label: "DeepLoL", url: "https://www.deeplol.gg/summoner/jp/Typicalboy-2526" }],
  },
  {
    id: "ipio",
    name: "IPIO",
    icon: "images/ipio.webp",
    face: "42% 13%",
    gameIcon: { x: 64, y: 17.5, zoom: 5 },    // ゲーム一覧のアイコン：犬
    color: "#ff4d5e",                         // イメージカラー：赤
    role: "bubobu.の逆ベクトル",
    comment: "bubobu.とは基本真逆。噛み合った瞬間、手がつけられない。",
    profile: [
      "無言のまま、bubobu.と真逆の行動を取り続けるもう一人の主人公。打ち合わせをしていないのに、毎回きれいに逆を行く。",
      "ただし二人のベクトルが一致したとき、その破壊力は計測不能。敵チームは祈るしかない。",
    ],
    likes: "",
    links: [{ label: "OP.GG", url: "https://op.gg/lol/summoners/jp/ipio-9493" }, { label: "DeepLoL", url: "https://www.deeplol.gg/summoner/jp/ipio-9493" }],
  },
  {
    id: "kafka",
    name: "Kafka",
    icon: "images/kafka.webp",
    face: "50% 25%",
    gameIcon: { x: 88.5, y: 27.5, zoom: 4.4 }, // ゲーム一覧のアイコン：パキポディウム
    color: "#4ade80",                          // イメージカラー：緑
    role: "まとめ役",
    comment: "みんなをまとめる頼れる存在。ただし本人がよく寝坊する。",
    profile: [
      "バラバラなcAMPsを不思議とひとつにまとめ上げる、頼れるまとめ役。",
      "……なのだが、集合時間になっても本人だけ来ないことがある。理由はだいたい寝坊。",
    ],
    likes: "",
    links: [
      { label: "OP.GG", url: "https://op.gg/lol/summoners/jp/kanicowboy-000" }, { label: "DeepLoL", url: "https://www.deeplol.gg/summoner/jp/kanicowboy-000" },
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
// 並び順：ここに書いた順番でゲームページに表示される（今はビッグタイトル順）
const GAMES = [
  { name: "League of Legends", url: "https://www.leagueoflegends.com/", store: "公式サイト", status: "playing", players: ["ipio", "kafka", "typicalboy", "marupis"] },
  { name: "Fortnite", url: "https://www.fortnite.com/", store: "公式サイト", status: "playing", players: ["ipio", "kafka"] },
  { name: "VALORANT", url: "https://playvalorant.com/", store: "公式サイト", status: "playing", players: ["ipio", "kafka", "typicalboy", "bubobu", "marupis"] },
  { name: "Apex Legends", url: "https://store.steampowered.com/app/1172470/", store: "Steam", status: "playing", players: ["ipio", "kafka", "typicalboy", "bubobu"] },
  { name: "Monster Hunter Wilds", url: "https://store.steampowered.com/app/2246340/", store: "Steam", status: "playing", players: ["ipio", "kafka", "typicalboy", "bubobu"] },
  { name: "Terraria", url: "https://store.steampowered.com/app/105600/", store: "Steam", status: "playing", players: ["ipio", "kafka", "typicalboy", "marupis"] },
  { name: "Street Fighter 6", url: "https://store.steampowered.com/app/1364780/", store: "Steam", status: "playing", players: ["kafka"] },
  { name: "METAL GEAR SOLID Δ: SNAKE EATER", url: "https://store.steampowered.com/app/2417610/", store: "Steam", status: "playing", players: ["kafka"] },
  { name: "Path of Exile 2", url: "https://store.steampowered.com/app/2694490/", store: "Steam", status: "playing", players: ["kafka", "typicalboy", "ipio"] },
  { name: "PEAK", url: "https://store.steampowered.com/app/3527290/", store: "Steam", status: "playing", players: ["kafka", "typicalboy", "ipio"] },
  { name: "Shadowverse: Worlds Beyond", url: "https://store.steampowered.com/app/2584990/", store: "Steam", status: "playing", players: ["typicalboy"] },
  { name: "Windrose", url: "https://store.steampowered.com/app/3041230/", store: "Steam", status: "playing", players: ["typicalboy", "kafka", "ipio"] },
  { name: "ContractVille", url: "https://store.steampowered.com/app/2698780/", store: "Steam", status: "playing", players: ["ipio", "kafka", "typicalboy"] },
  { name: "Heavenly Bodies", url: "https://store.steampowered.com/app/1138850/", store: "Steam", status: "playing", players: ["typicalboy", "kafka", "ipio", "bubobu"] },
];

// ---------- おすすめリンク ----------
// category : 見出しになるカテゴリ名。同じ名前のものがまとめて表示される
// by       : おすすめした人の id（空でもOK）
// 書き方の例：
// { category: "戦績・統計", title: "OP.GG", url: "https://www.op.gg/", by: "marupis", note: "LoLの戦績確認" },
const LINKS = [];
