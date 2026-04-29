System.register("q-bundled:///fs/pal/input/minigame/hmd-input.js", ["../../../cocos/core/event/event-target.js", "../input-source.js", "../../../cocos/core/math/index.js"], function (_export, _context) {
  "use strict";

  var EventTarget, InputSourcePosition, InputSourceOrientation, Vec3, Quat, HMDInputDevice;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_cocosCoreEventEventTargetJs) {
      EventTarget = _cocosCoreEventEventTargetJs.EventTarget;
    }, function (_inputSourceJs) {
      InputSourcePosition = _inputSourceJs.InputSourcePosition;
      InputSourceOrientation = _inputSourceJs.InputSourceOrientation;
    }, function (_cocosCoreMathIndexJs) {
      Vec3 = _cocosCoreMathIndexJs.Vec3;
      Quat = _cocosCoreMathIndexJs.Quat;
    }],
    execute: function () {
      _export("HMDInputDevice", HMDInputDevice = /*#__PURE__*/function () {
        function HMDInputDevice() {
          this._eventTarget = new EventTarget();

          this._initInputSource();
        }
        /**
         * @engineInternal
         */


        var _proto = HMDInputDevice.prototype;

        _proto._on = function _on(eventType, callback, target) {
          this._eventTarget.on(eventType, callback, target);
        };

        _proto._initInputSource = function _initInputSource() {
          this._viewLeftPosition = new InputSourcePosition();

          this._viewLeftPosition.getValue = function () {
            return Vec3.ZERO;
          };

          this._viewLeftOrientation = new InputSourceOrientation();

          this._viewLeftOrientation.getValue = function () {
            return Quat.IDENTITY;
          };

          this._viewRightPosition = new InputSourcePosition();

          this._viewRightPosition.getValue = function () {
            return Vec3.ZERO;
          };

          this._viewRightOrientation = new InputSourceOrientation();

          this._viewRightOrientation.getValue = function () {
            return Quat.IDENTITY;
          };

          this._headMiddlePosition = new InputSourcePosition();

          this._headMiddlePosition.getValue = function () {
            return Vec3.ZERO;
          };

          this._headMiddleOrientation = new InputSourceOrientation();

          this._headMiddleOrientation.getValue = function () {
            return Quat.IDENTITY;
          };
        };

        _createClass(HMDInputDevice, [{
          key: "viewLeftPosition",
          get: function get() {
            return this._viewLeftPosition;
          }
        }, {
          key: "viewLeftOrientation",
          get: function get() {
            return this._viewLeftOrientation;
          }
        }, {
          key: "viewRightPosition",
          get: function get() {
            return this._viewRightPosition;
          }
        }, {
          key: "viewRightOrientation",
          get: function get() {
            return this._viewRightOrientation;
          }
        }, {
          key: "headMiddlePosition",
          get: function get() {
            return this._headMiddlePosition;
          }
        }, {
          key: "headMiddleOrientation",
          get: function get() {
            return this._headMiddleOrientation;
          }
        }]);

        return HMDInputDevice;
      }());
    }
  };
});