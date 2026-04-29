System.register("q-bundled:///fs/cocos/terrain/height-field.js", ["../core/math/index.js"], function (_export, _context) {
  "use strict";

  var clamp, HeightField;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_coreMathIndexJs) {
      clamp = _coreMathIndexJs.clamp;
    }],
    execute: function () {
      _export("HeightField", HeightField = /*#__PURE__*/function () {
        function HeightField(w, h) {
          this.data = new Uint16Array();
          this.w = 0;
          this.h = 0;
          this.w = w;
          this.h = h;
          this.data = new Uint16Array(w * h);

          for (var i = 0; i < w * h; ++i) {
            this.data[i] = 0;
          }
        }

        var _proto = HeightField.prototype;

        _proto.set = function set(i, j, value) {
          this.data[j * this.w + i] = value;
        };

        _proto.get = function get(i, j) {
          return this.data[j * this.w + i];
        };

        _proto.getClamp = function getClamp(i, j) {
          i = clamp(i, 0, this.w - 1);
          j = clamp(j, 0, this.h - 1);
          return this.get(i, j);
        };

        _proto.getAt = function getAt(x, y) {
          var fx = x;
          var fy = y;
          var ix0 = Math.floor(fx);
          var iz0 = Math.floor(fy);
          var ix1 = ix0 + 1;
          var iz1 = iz0 + 1;
          var dx = fx - ix0;
          var dz = fy - iz0;
          ix0 = clamp(ix0, 0, this.w - 1);
          iz0 = clamp(iz0, 0, this.h - 1);
          ix1 = clamp(ix1, 0, this.w - 1);
          iz1 = clamp(iz1, 0, this.h - 1);
          var a = this.get(ix0, iz0);
          var b = this.get(ix1, iz0);
          var c = this.get(ix0, iz1);
          var d = this.get(ix1, iz1);
          var m = (b + c) * 0.5;

          if (dx + dz <= 1.0) {
            d = m + (m - a);
          } else {
            a = m + (m - d);
          }

          var h1 = a * (1.0 - dx) + b * dx;
          var h2 = c * (1.0 - dx) + d * dx;
          var h = h1 * (1.0 - dz) + h2 * dz;
          return h;
        };

        return HeightField;
      }());
    }
  };
});