// ============================================================
// ライト／ダーク／カーボンの切り替え（全ページ共通）
// ・サイトを開いたときは、いつもカーボン（太陽と月が両方入ったロゴ＋カーボン柄）
// ・トップページのロゴの左側を押すとライト、右側を押すとダーク、
//   テントのあたりを押すとカーボン
// ・選んだモードは、そのタブを開いている間だけ覚えておく（ページを移動しても同じモード）。
//   タブを閉じて開き直すと、またカーボンから始まる
// ページが表示される前に色を決めるため、各HTMLの <head> で読み込む
// ============================================================
(function () {
  var KEY = "camps-theme";
  var DEFAULT_THEME = "carbon"; // 開いたときのモード
  var saved = null;
  try { saved = sessionStorage.getItem(KEY); } catch (e) {}
  document.documentElement.dataset.theme =
    saved === "light" || saved === "dark" || saved === "carbon" ? saved : DEFAULT_THEME;

  window.setTheme = function (theme) {
    document.documentElement.dataset.theme = theme;
    try { sessionStorage.setItem(KEY, theme); } catch (e) {}
    document.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
  };
})();
