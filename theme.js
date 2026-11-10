// ============================================================
// ライト／ダークモードの切り替え（全ページ共通）
// ・普段は見ている時刻で自動：6時〜18時はライト（昼）、それ以外はダーク（夜）
// ・トップページの太陽／月をクリックすると手動で切り替え（ブラウザを閉じるまで覚えておく）
// ページが表示される前に色を決めるため、各HTMLの <head> で読み込む
// ============================================================
(function () {
  var KEY = "camps-theme";
  var DAY_START = 6;  // 何時からライトにするか
  var DAY_END = 18;   // 何時からダークにするか

  function themeByTime() {
    var h = new Date().getHours();
    return h >= DAY_START && h < DAY_END ? "light" : "dark";
  }

  var saved = null;
  try { saved = sessionStorage.getItem(KEY); } catch (e) {}
  document.documentElement.dataset.theme = saved === "light" || saved === "dark" ? saved : themeByTime();

  window.setTheme = function (theme) {
    document.documentElement.dataset.theme = theme;
    try { sessionStorage.setItem(KEY, theme); } catch (e) {}
  };
})();
