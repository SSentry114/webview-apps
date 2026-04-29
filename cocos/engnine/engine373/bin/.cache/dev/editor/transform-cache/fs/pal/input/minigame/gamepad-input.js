System.register("q-bundled:///fs/pal/input/minigame/gamepad-input.js", ["../../../cocos/core/event/event-target.js", "../input-source.js", "../../../cocos/core/index.js"], function (_export, _context) {
  "use strict";

  var EventTarget, InputSourceButton, InputSourceDpad, InputSourceOrientation, InputSourcePosition, InputSourceStick, Quat, Vec3, GamepadInputDevice;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("GamepadInputDevice", void 0);

  return {
    setters: [function (_cocosCoreEventEventTargetJs) {
      EventTarget = _cocosCoreEventEventTargetJs.EventTarget;
    }, function (_inputSourceJs) {
      InputSourceButton = _inputSourceJs.InputSourceButton;
      InputSourceDpad = _inputSourceJs.InputSourceDpad;
      InputSourceOrientation = _inputSourceJs.InputSourceOrientation;
      InputSourcePosition = _inputSourceJs.InputSourcePosition;
      InputSourceStick = _inputSourceJs.InputSourceStick;
    }, function (_cocosCoreIndexJs) {
      Quat = _cocosCoreIndexJs.Quat;
      Vec3 = _cocosCoreIndexJs.Vec3;
    }],
    execute: function () {
      _export("GamepadInputDevice", GamepadInputDevice = class GamepadInputDevice {
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

        get buttonL1() {
          return this._buttonL1;
        }

        get buttonL2() {
          return this._buttonL2;
        }

        get buttonL3() {
          return this._buttonL3;
        }

        get buttonR1() {
          return this._buttonR1;
        }

        get buttonR2() {
          return this._buttonR2;
        }

        get buttonR3() {
          return this._buttonR3;
        } // public get buttonTouchPad () { return this._buttonTouchPad; }
        // public get buttonHome () { return this._buttonHome; }


        get buttonShare() {
          return this._buttonShare;
        }

        get buttonOptions() {
          return this._buttonOptions;
        }

        get dpad() {
          return this._dpad;
        }

        get leftStick() {
          return this._leftStick;
        }

        get rightStick() {
          return this._rightStick;
        }

        get buttonStart() {
          return this._buttonStart;
        }

        get gripLeft() {
          return this._gripLeft;
        }

        get gripRight() {
          return this._gripRight;
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

        get deviceId() {
          return this._deviceId;
        }

        get connected() {
          return this._connected;
        }

        constructor(deviceId) {
          this._deviceId = -1;
          this._connected = false;
          this._deviceId = deviceId;

          this._initInputSource();
        }
        /**
         * @engineInternal
         */


        static _init() {// not supported
        }
        /**
         * @engineInternal
         */


        static _on(eventType, cb, target) {
          GamepadInputDevice._eventTarget.on(eventType, cb, target);
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

          this._buttonL1 = new InputSourceButton();

          this._buttonL1.getValue = () => 0;

          this._buttonL2 = new InputSourceButton();

          this._buttonL2.getValue = () => 0;

          this._buttonL3 = new InputSourceButton();

          this._buttonL3.getValue = () => 0;

          this._buttonR1 = new InputSourceButton();

          this._buttonR1.getValue = () => 0;

          this._buttonR2 = new InputSourceButton();

          this._buttonR2.getValue = () => 0;

          this._buttonR3 = new InputSourceButton();

          this._buttonR3.getValue = () => 0; // this._buttonTouchPad = new InputSourceButton();
          // this._buttonTouchPad.getValue = () => 0;
          // this._buttonHome = new InputSourceButton();
          // this._buttonHome.getValue = () => 0;


          this._buttonShare = new InputSourceButton();

          this._buttonShare.getValue = () => 0;

          this._buttonOptions = new InputSourceButton();

          this._buttonOptions.getValue = () => 0;

          const dpadUp = new InputSourceButton();

          dpadUp.getValue = () => 0;

          const dpadDown = new InputSourceButton();

          dpadDown.getValue = () => 0;

          const dpadLeft = new InputSourceButton();

          dpadLeft.getValue = () => 0;

          const dpadRight = new InputSourceButton();

          dpadRight.getValue = () => 0;

          this._dpad = new InputSourceDpad({
            up: dpadUp,
            down: dpadDown,
            left: dpadLeft,
            right: dpadRight
          });
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
          this._buttonStart = new InputSourceButton();

          this._buttonStart.getValue = () => 0;

          this._gripLeft = new InputSourceButton();

          this._gripLeft.getValue = () => 0;

          this._gripRight = new InputSourceButton();

          this._gripRight.getValue = () => 0;

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

      GamepadInputDevice.all = [];
      GamepadInputDevice.xr = null;
      GamepadInputDevice._eventTarget = new EventTarget();
    }
  };
});