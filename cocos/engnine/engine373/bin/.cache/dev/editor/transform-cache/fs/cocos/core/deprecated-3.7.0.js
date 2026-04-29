System.register("q-bundled:///fs/cocos/core/deprecated-3.7.0.js", ["./utils/index.js"], function (_export, _context) {
  "use strict";

  var js, markAsWarning;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_utilsIndexJs) {
      js = _utilsIndexJs.js;
      markAsWarning = _utilsIndexJs.markAsWarning;
    }],
    execute: function () {
      markAsWarning(js, 'js', [{
        name: 'js',
        suggest: `'js.js' is deprecated since v3.7.0, please access 'js' directly instead.`
      }]);
    }
  };
});