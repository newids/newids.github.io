/* 화면 테마: 라이트 · 다크 · 시스템. 선택은 localStorage 에 남기고, 없으면 시스템을 따른다. */
(function () {
  var KEY = 'theme';
  var root = document.documentElement;
  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function write(v) { try { v ? localStorage.setItem(KEY, v) : localStorage.removeItem(KEY); } catch (e) {} }
  function apply(v) {
    if (v === 'light' || v === 'dark') root.setAttribute('data-theme', v);
    else root.removeAttribute('data-theme');
    var buttons = document.querySelectorAll('[data-theme-choice]');
    for (var i = 0; i < buttons.length; i++) {
      var b = buttons[i];
      b.setAttribute('aria-pressed', String(b.getAttribute('data-theme-choice') === (v || 'system')));
    }
  }
  apply(read());
  document.addEventListener('DOMContentLoaded', function () {
    apply(read());
    document.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-theme-choice]');
      if (!b) return;
      var v = b.getAttribute('data-theme-choice');
      write(v === 'system' ? null : v);
      apply(v === 'system' ? null : v);
    });
  });
})();
