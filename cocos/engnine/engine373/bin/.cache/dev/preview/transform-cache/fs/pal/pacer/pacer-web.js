System.register("q-bundled:///fs/pal/pacer/pacer-web.js", ["../../../virtual/internal%253Aconstants.js", "../../cocos/core/data/utils/asserts.js"], function (_export, _context) {
  "use strict";

  var EDITOR, assertIsTrue, Pacer;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_cocosCoreDataUtilsAssertsJs) {
      assertIsTrue = _cocosCoreDataUtilsAssertsJs.assertIsTrue;
    }],
    execute: function () {
      _export("Pacer", Pacer = /*#__PURE__*/function () {
        function Pacer() {
          var _this = this;

          this._stHandle = 0;
          this._onTick = null;
          this._targetFrameRate = 60;
          this._frameTime = 0;
          this._startTime = 0;
          this._isPlaying = false;
          this._callback = null;
          this._delay = 0;
          this._start = 0;
          this._rAF = void 0;
          this._cAF = void 0;

          this._handleRAF = function () {
            if (performance.now() - _this._start < _this._delay) {
              _this._rAF.call(window, _this._handleRAF);
            } else if (_this._callback) {
              _this._callback();
            }
          };

          this._rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
          this._cAF = window.cancelAnimationFrame || window.cancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame || window.msCancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.ocancelAnimationFrame;
        }

        var _proto = Pacer.prototype;

        _proto.start = function start() {
          var _this2 = this;

          if (this._isPlaying) return;

          var updateCallback = function updateCallback() {
            _this2._startTime = performance.now();

            if (_this2._isPlaying) {
              _this2._stHandle = _this2._stTime(updateCallback);
            }

            if (_this2._onTick) {
              _this2._onTick();
            }
          };

          this._startTime = performance.now();
          this._stHandle = this._stTime(updateCallback);
          this._isPlaying = true;
        };

        _proto.stop = function stop() {
          if (!this._isPlaying) return;

          this._ctTime(this._stHandle);

          this._stHandle = 0;
          this._isPlaying = false;
        };

        _proto._stTime = function _stTime(callback) {
          var _globalThis$__globalX;

          var currTime = performance.now();
          var elapseTime = Math.max(0, currTime - this._startTime);
          var timeToCall = Math.max(0, this._frameTime - elapseTime);

          if (EDITOR || this._rAF === undefined || (_globalThis$__globalX = globalThis.__globalXR) !== null && _globalThis$__globalX !== void 0 && _globalThis$__globalX.isWebXR) {
            return setTimeout(callback, timeToCall);
          }

          this._start = currTime;
          this._delay = timeToCall;
          this._callback = callback;
          return this._rAF.call(window, this._handleRAF);
        };

        _proto._ctTime = function _ctTime(id) {
          var _globalThis$__globalX2;

          if (EDITOR || this._cAF === undefined || (_globalThis$__globalX2 = globalThis.__globalXR) !== null && _globalThis$__globalX2 !== void 0 && _globalThis$__globalX2.isWebXR) {
            clearTimeout(id);
          } else if (id) {
            this._cAF.call(window, id);
          }
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
              this._frameTime = 1000 / this._targetFrameRate;

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