System.register("q-bundled:///fs/cocos/core/geometry/deprecated.js", ["../utils/x-deprecated.js", "./line.js", "./intersect.js"], function (_export, _context) {
  "use strict";

  var replaceProperty, removeProperty, Line, intersect;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_utilsXDeprecatedJs) {
      replaceProperty = _utilsXDeprecatedJs.replaceProperty;
      removeProperty = _utilsXDeprecatedJs.removeProperty;
    }, function (_lineJs) {
      Line = _lineJs.Line;
    }, function (_intersectJs) {
      intersect = _intersectJs.default;
    }],
    execute: function () {
      replaceProperty(Line.prototype, 'line', [{
        name: 'mag',
        newName: 'len'
      }, {
        name: 'magnitude',
        newName: 'len'
      }]);
      removeProperty(intersect, 'intersect', [{
        name: 'line_quad'
      }]);
    }
  };
});