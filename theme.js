// ============================================================
// ライト／ダークモードの切り替え（全ページ共通）
// ・トップページのロゴの左側を押すとライト、右側を押すとダーク、
//   テントのあたりを押すとカーボン（太陽と月が両方入ったロゴ＋カーボン柄の背景）
// ・選んだモードはブラウザに記憶され、次に開いたときも同じモードになる（最初はダーク）
// ページが表示される前に色を決めるため、各HTMLの <head> で読み込む
// ============================================================
(function () {
  var KEY = "camps-theme";
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  document.documentElement.dataset.theme = saved === "light" || saved === "carbon" ? saved : "dark";

  window.setTheme = function (theme) {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem(KEY, theme); } catch (e) {}
    document.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
  };
})();
