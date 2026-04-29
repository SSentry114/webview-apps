System.register("q-bundled:///fs/pal/pacer/pacer-minigame.js", ["pal/minigame", "../../cocos/core/data/utils/asserts.js"], function (_export, _context) {
  "use strict";

  var minigame, assertIsTrue, Pacer;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_palMinigame) {
      minigame = _palMinigame.minigame;
    }, function (_cocosCoreDataUtilsAssertsJs) {
      assertIsTrue = _cocosCoreDataUtilsAssertsJs.assertIsTrue;
    }],
    execute: function () {
      _export("Pacer", Pacer = /*#__PURE__*/function () {
        function Pacer() {
          var _this = this;

          this._rafHandle = 0;
          this._onTick = null;
          this._updateCallback = void 0;
          this._targetFrameRate = 60;
          this._isPlaying = false;

          this._updateCallback = function () {
            if (_this._isPlaying) {
              _this._rafHandle = requestAnimationFrame(_this._updateCallback);
            }

            if (_this._onTick) {
              _this._onTick();
            }
          };
        }

        var _proto = Pacer.prototype;

        _proto.start = function start() {
          if (this._isPlaying) return;
          this._rafHandle = requestAnimationFrame(this._updateCallback);
          this._isPlaying = true;
        };

        _proto.stop = function stop() {
          if (!this._isPlaying) return;
          cancelAnimationFrame(this._rafHandle);
          this._rafHandle = 0;
          this._isPlaying = false;
        };

        _createClass(Pacer, [{
          key: "targetFrameRate",
          get: function get() {
            return this._targetFrameRate;
          },
          set: function set(val) {
            if (this._targetFrameRate !== val) {
              assertIsTrue(val > 0);
              this._targetFrameRate = val;
              minigame.setPreferredFramesPerSecond(this._targetFrameRate);

              if (this._isPlaying) {
                this.stop();
                this.start();
              }
            }
          }
        }, {
          key: "onTick",
          get: function get() {
            return this._onTick;
          },
          set: function set(val) {
            this._onTick = val;
          }
        }]);

        return Pacer;
      }());
    }
  };
});