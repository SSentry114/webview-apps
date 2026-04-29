System.register("q-bundled:///fs/pal/input/minigame/hmd-input.js", ["../../../cocos/core/event/event-target.js", "../input-source.js", "../../../cocos/core/math/index.js"], function (_export, _context) {
  "use strict";

  var EventTarget, InputSourcePosition, InputSourceOrientation, Vec3, Quat, HMDInputDevice;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("HMDInputDevice", void 0);

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
      _export("HMDInputDevice", HMDInputDevice = class HMDInputDevice {
        get viewLeftPosition() {
          return this._viewLeftPosition;
        }

        get viewLeftOrientation() {
          return this._viewLeftOrientation;
        }

        get viewRightPosition() {
          return this._viewRightPosition;
        }

        get viewRightOrientation() {
          return this._viewRightOrientation;
        }

        get headMiddlePosition() {
          return this._headMiddlePosition;
        }

        get headMiddleOrientation() {
          return this._headMiddleOrientation;
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
          this._viewLeftPosition = new InputSourcePosition();

          this._viewLeftPosition.getValue = () => Vec3.ZERO;

          this._viewLeftOrientation = new InputSourceOrientation();

          this._viewLeftOrientation.getValue = () => Quat.IDENTITY;

          this._viewRightPosition = new InputSourcePosition();

          this._viewRightPosition.getValue = () => Vec3.ZERO;

          this._viewRightOrientation = new InputSourceOrientation();

          this._viewRightOrientation.getValue = () => Quat.IDENTITY;

          this._headMiddlePosition = new InputSourcePosition();

          this._headMiddlePosition.getValue = () => Vec3.ZERO;

          this._headMiddleOrientation = new InputSourceOrientation();

          this._headMiddleOrientation.getValue = () => Quat.IDENTITY;
        }

      });
    }
  };
});