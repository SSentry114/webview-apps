System.register("q-bundled:///fs/pal/input/minigame/handheld-input.js", ["../../../cocos/core/event/event-target.js", "../input-source.js", "../../../cocos/core/math/index.js"], function (_export, _context) {
  "use strict";

  var EventTarget, InputSourcePosition, InputSourceOrientation, Quat, Vec3, HandheldInputDevice;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("HandheldInputDevice", void 0);

  return {
    setters: [function (_cocosCoreEventEventTargetJs) {
      EventTarget = _cocosCoreEventEventTargetJs.EventTarget;
    }, function (_inputSourceJs) {
      InputSourcePosition = _inputSourceJs.InputSourcePosition;
      InputSourceOrientation = _inputSourceJs.InputSourceOrientation;
    }, function (_cocosCoreMathIndexJs) {
      Quat = _cocosCoreMathIndexJs.Quat;
      Vec3 = _cocosCoreMathIndexJs.Vec3;
    }],
    execute: function () {
      _export("HandheldInputDevice", HandheldInputDevice = class HandheldInputDevice {
        get handheldPosition() {
          return this._handheldPosition;
        }

        get handheldOrientation() {
          return this._handheldOrientation;
        }

        constructor() {
          this._eventTarget = new EventTarget();

          this._initInputSource();
        }
        /**
         * @engineInternal
         */


        _on(eventType, callback, target) {
          this._eventTarget.on(eventType, callback, target);
        }

        _initInputSource() {
          this._handheldPosition = new InputSourcePosition();

          this._handheldPosition.getValue = () => Vec3.ZERO;

          this._handheldOrientation = new InputSourceOrientation();

          this._handheldOrientation.getValue = () => Quat.IDENTITY;
        }

      });
    }
  };
});