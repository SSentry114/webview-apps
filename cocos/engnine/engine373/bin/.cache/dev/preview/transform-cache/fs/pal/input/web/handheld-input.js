System.register("q-bundled:///fs/pal/input/web/handheld-input.js", ["../../../cocos/core/event/event-target.js", "../input-source.js", "../../../cocos/core/math/index.js"], function (_export, _context) {
  "use strict";

  var EventTarget, InputSourcePosition, InputSourceOrientation, Vec3, Quat, HandheldInputDevice;

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
      _export("HandheldInputDevice", HandheldInputDevice = /*#__PURE__*/function () {
        function HandheldInputDevice() {
          this._eventTarget = new EventTarget();

          this._initInputSource();
        }
        /**
         * @engineInternal
         */


        var _proto = HandheldInputDevice.prototype;

        _proto._on = function _on(eventType, callback, target) {
          this._eventTarget.on(eventType, callback, target);
        };

        _proto._initInputSource = function _initInputSource() {
          this._handheldPosition = new InputSourcePosition();

          this._handheldPosition.getValue = function () {
            return Vec3.ZERO;
          };

          this._handheldOrientation = new InputSourceOrientation();

          this._handheldOrientation.getValue = function () {
            return Quat.IDENTITY;
          };
        };

        _createClass(HandheldInputDevice, [{
          key: "handheldPosition",
          get: function get() {
            return this._handheldPosition;
          }
        }, {
          key: "handheldOrientation",
          get: function get() {
            return this._handheldOrientation;
          }
        }]);

        return HandheldInputDevice;
      }());
    }
  };
});