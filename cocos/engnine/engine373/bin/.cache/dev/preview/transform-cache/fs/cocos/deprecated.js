System.register("q-bundled:///fs/cocos/deprecated.js", ["./core/index.js", "./root.js"], function (_export, _context) {
  "use strict";

  var replaceProperty, Root;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_coreIndexJs) {
      replaceProperty = _coreIndexJs.replaceProperty;
    }, function (_rootJs) {
      Root = _rootJs.Root;
    }],
    execute: function () {
      // Root
      replaceProperty(Root.prototype, 'Root.prototype', [{
        name: 'ui',
        newName: 'batcher2D'
      }]);
    }
  };
});