(function () {
  'use strict';

  // Disable Right-Click Context Menu
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });

  // Block Keyboard Shortcuts (DevTools, Source, Print, Save)
  document.addEventListener('keydown', function (e) {
    var key = e.key ? e.key.toLowerCase() : '';
    var code = e.keyCode || e.which;

    // F12
    if (code === 123 || key === 'f12') {
      e.preventDefault();
      return false;
    }

    // Ctrl+Shift+I (DevTools), Ctrl+Shift+J (Console), Ctrl+Shift+C (Inspect Element)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (key === 'i' || key === 'j' || key === 'c' || code === 73 || code === 74 || code === 67)) {
      e.preventDefault();
      return false;
    }

    // Ctrl+U (View Page Source)
    if ((e.ctrlKey || e.metaKey) && (key === 'u' || code === 85)) {
      e.preventDefault();
      return false;
    }

    // Ctrl+S (Save Page) & Ctrl+P (Print / PDF save)
    if ((e.ctrlKey || e.metaKey) && (key === 's' || key === 'p' || code === 83 || code === 80)) {
      e.preventDefault();
      return false;
    }
  });

  // Block Text Selection and Dragging
  document.addEventListener('selectstart', function (e) {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
    }
  });

  document.addEventListener('dragstart', function (e) {
    e.preventDefault();
  });

  // Freeze / Break DevTools if opened (Debugger Loop)
  function triggerDebugger() {
    function hit() {
      (function () {
        return false;
      })
      ['constructor']('debugger')
      ['call']();
    }

    try {
      hit();
    } catch (err) {}
  }

  // Detect DevTools opened via outer vs inner window resize
  var threshold = 160;
  setInterval(function () {
    var widthDiff = window.outerWidth - window.innerWidth > threshold;
    var heightDiff = window.outerHeight - window.innerHeight > threshold;

    if (widthDiff || heightDiff) {
      document.body.innerHTML = '<div style="background:#09090b;color:#f87171;font-family:monospace;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;font-size:1.2rem;">ACCESS DENIED: DEVTOOLS DETECTED</div>';
    }

    triggerDebugger();
  }, 400);

  // Clear console log leaks
  if (window.console) {
    window.console.log = function () {};
    window.console.warn = function () {};
    window.console.error = function () {};
    window.console.info = function () {};
    window.console.table = function () {};
  }
})();