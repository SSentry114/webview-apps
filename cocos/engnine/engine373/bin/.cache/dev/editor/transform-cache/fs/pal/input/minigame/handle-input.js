System.register("q-bundled:///fs/pal/input/minigame/handle-input.js", ["../../../cocos/core/event/index.js", "../input-source.js", "../../../cocos/core/math/index.js"], function (_export, _context) {
  "use strict";

  var EventTarget, InputSourceButton, InputSourceStick, InputSourcePosition, InputSourceOrientation, Vec3, Quat, HandleInputDevice;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("HandleInputDevice", void 0);

  return {
    setters: [function (_cocosCoreEventIndexJs) {
      EventTarget = _cocosCoreEventIndexJs.EventTarget;
    }, function (_inputSourceJs) {
      InputSourceButton = _inputSourceJs.InputSourceButton;
      InputSourceStick = _inputSourceJs.InputSourceStick;
      InputSourcePosition = _inputSourceJs.InputSourcePosition;
      InputSourceOrientation = _inputSourceJs.InputSourceOrientation;
    }, function (_cocosCoreMathIndexJs) {
      Vec3 = _cocosCoreMathIndexJs.Vec3;
      Quat = _cocosCoreMathIndexJs.Quat;
    }],
    execute: function () {
      _export("HandleInputDevice", HandleInputDevice = class HandleInputDevice {
        get buttonNorth() {
          return this._buttonNorth;
        }

        get buttonEast() {
          return this._buttonEast;
        }

        get buttonWest() {
          return this._buttonWest;
        }

        get buttonSouth() {
          return this._buttonSouth;
        }

        get buttonTriggerLeft() {
          return this._buttonTriggerLeft;
        }

        get buttonTriggerRight() {
          return this._buttonTriggerRight;
        }

        get triggerLeft() {
          return this._triggerLeft;
        }

        get triggerRight() {
          return this._triggerRight;
        }

        get gripLeft() {
          return this._gripLeft;
        }

        get gripRight() {
          return this._gripRight;
        }

        get leftStick() {
          return this._leftStick;
        }

        get rightStick() {
          return this._rightStick;
        }

        get buttonLeftStick() {
          return this._buttonLeftStick;
        }

        get buttonRightStick() {
          return this._buttonRightStick;
        }

        get buttonOptions() {
          return this._buttonOptions;
        }

        get buttonStart() {
          return this._buttonStart;
        }

        get handLeftPosition() {
          return this._handLeftPosition;
        }

        get handLeftOrientation() {
          return this._handLeftOrientation;
        }

        get handRightPosition() {
          return this._handRightPosition;
        }

        get handRightOrientation() {
          return this._handRightOrientation;
        }

        get aimLeftPosition() {
          return this._aimLeftPosition;
        }

        get aimLeftOrientation() {
          return this._aimLeftOrientation;
        }

        get aimRightPosition() {
          return this._aimRightPosition;
        }

        get aimRightOrientation() {
          return this._aimRightOrientation;
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
          this._buttonNorth = new InputSourceButton();

          this._buttonNorth.getValue = () => 0;

          this._buttonEast = new InputSourceButton();

          this._buttonEast.getValue = () => 0;

          this._buttonWest = new InputSourceButton();

          this._buttonWest.getValue = () => 0;

          this._buttonSouth = new InputSourceButton();

          this._buttonSouth.getValue = () => 0;

          this._buttonTriggerLeft = new InputSourceButton();

          this._buttonTriggerLeft.getValue = () => 0;

          this._buttonTriggerRight = new InputSourceButton();

          this._buttonTriggerRight.getValue = () => 0;

          this._triggerLeft = new InputSourceButton();

          this._triggerLeft.getValue = () => 0;

          this._triggerRight = new InputSourceButton();

          this._triggerRight.getValue = () => 0;

          this._gripLeft = new InputSourceButton();

          this._gripLeft.getValue = () => 0;

          this._gripRight = new InputSourceButton();

          this._gripRight.getValue = () => 0;

          this._buttonLeftStick = new InputSourceButton();

          this._buttonLeftStick.getValue = () => 0;

          const leftStickUp = new InputSourceButton();

          leftStickUp.getValue = () => 0;

          const leftStickDown = new InputSourceButton();

          leftStickDown.getValue = () => 0;

          const leftStickLeft = new InputSourceButton();

          leftStickLeft.getValue = () => 0;

          const leftStickRight = new InputSourceButton();

          leftStickRight.getValue = () => 0;

          this._leftStick = new InputSourceStick({
            up: leftStickUp,
            down: leftStickDown,
            left: leftStickLeft,
            right: leftStickRight
          });
          this._buttonRightStick = new InputSourceButton();

          this._buttonRightStick.getValue = () => 0;

          const rightStickUp = new InputSourceButton();

          rightStickUp.getValue = () => 0;

          const rightStickDown = new InputSourceButton();

          rightStickDown.getValue = () => 0;

          const rightStickLeft = new InputSourceButton();

          rightStickLeft.getValue = () => 0;

          const rightStickRight = new InputSourceButton();

          rightStickRight.getValue = () => 0;

          this._rightStick = new InputSourceStick({
            up: rightStickUp,
            down: rightStickDown,
            left: rightStickLeft,
            right: rightStickRight
          });
          this._buttonOptions = new InputSourceButton();

          this._buttonOptions.getValue = () => 0;

          this._buttonStart = new InputSourceButton();

          this._buttonStart.getValue = () => 0;

          this._handLeftPosition = new InputSourcePosition();

          this._handLeftPosition.getValue = () => Vec3.ZERO;

          this._handLeftOrientation = new InputSourceOrientation();

          this._handLeftOrientation.getValue = () => Quat.IDENTITY;

          this._handRightPosition = new InputSourcePosition();

          this._handRightPosition.getValue = () => Vec3.ZERO;

          this._handRightOrientation = new InputSourceOrientation();

          this._handRightOrientation.getValue = () => Quat.IDENTITY;

          this._aimLeftPosition = new InputSourcePosition();

          this._aimLeftPosition.getValue = () => Vec3.ZERO;

          this._aimLeftOrientation = new InputSourceOrientation();

          this._aimLeftOrientation.getValue = () => Quat.IDENTITY;

          this._aimRightPosition = new InputSourcePosition();

          this._aimRightPosition.getValue = () => Vec3.ZERO;

          this._aimRightOrientation = new InputSourceOrientation();

          this._aimRightOrientation.getValue = () => Quat.IDENTITY;
        }

      });
    }
  };
});