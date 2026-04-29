System.register("q-bundled:///fs/pal/input/minigame/handle-input.js", ["../../../cocos/core/event/index.js", "../input-source.js", "../../../cocos/core/math/index.js"], function (_export, _context) {
  "use strict";

  var EventTarget, InputSourceButton, InputSourceStick, InputSourcePosition, InputSourceOrientation, Vec3, Quat, HandleInputDevice;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
      _export("HandleInputDevice", HandleInputDevice = /*#__PURE__*/function () {
        function HandleInputDevice() {
          this._eventTarget = new EventTarget();

          this._initInputSource();
        }
        /**
         * @engineInternal
         */


        var _proto = HandleInputDevice.prototype;

        _proto._on = function _on(eventType, callback, target) {
          this._eventTarget.on(eventType, callback, target);
        };

        _proto._initInputSource = function _initInputSource() {
          this._buttonNorth = new InputSourceButton();

          this._buttonNorth.getValue = function () {
            return 0;
          };

          this._buttonEast = new InputSourceButton();

          this._buttonEast.getValue = function () {
            return 0;
          };

          this._buttonWest = new InputSourceButton();

          this._buttonWest.getValue = function () {
            return 0;
          };

          this._buttonSouth = new InputSourceButton();

          this._buttonSouth.getValue = function () {
            return 0;
          };

          this._buttonTriggerLeft = new InputSourceButton();

          this._buttonTriggerLeft.getValue = function () {
            return 0;
          };

          this._buttonTriggerRight = new InputSourceButton();

          this._buttonTriggerRight.getValue = function () {
            return 0;
          };

          this._triggerLeft = new InputSourceButton();

          this._triggerLeft.getValue = function () {
            return 0;
          };

          this._triggerRight = new InputSourceButton();

          this._triggerRight.getValue = function () {
            return 0;
          };

          this._gripLeft = new InputSourceButton();

          this._gripLeft.getValue = function () {
            return 0;
          };

          this._gripRight = new InputSourceButton();

          this._gripRight.getValue = function () {
            return 0;
          };

          this._buttonLeftStick = new InputSourceButton();

          this._buttonLeftStick.getValue = function () {
            return 0;
          };

          var leftStickUp = new InputSourceButton();

          leftStickUp.getValue = function () {
            return 0;
          };

          var leftStickDown = new InputSourceButton();

          leftStickDown.getValue = function () {
            return 0;
          };

          var leftStickLeft = new InputSourceButton();

          leftStickLeft.getValue = function () {
            return 0;
          };

          var leftStickRight = new InputSourceButton();

          leftStickRight.getValue = function () {
            return 0;
          };

          this._leftStick = new InputSourceStick({
            up: leftStickUp,
            down: leftStickDown,
            left: leftStickLeft,
            right: leftStickRight
          });
          this._buttonRightStick = new InputSourceButton();

          this._buttonRightStick.getValue = function () {
            return 0;
          };

          var rightStickUp = new InputSourceButton();

          rightStickUp.getValue = function () {
            return 0;
          };

          var rightStickDown = new InputSourceButton();

          rightStickDown.getValue = function () {
            return 0;
          };

          var rightStickLeft = new InputSourceButton();

          rightStickLeft.getValue = function () {
            return 0;
          };

          var rightStickRight = new InputSourceButton();

          rightStickRight.getValue = function () {
            return 0;
          };

          this._rightStick = new InputSourceStick({
            up: rightStickUp,
            down: rightStickDown,
            left: rightStickLeft,
            right: rightStickRight
          });
          this._buttonOptions = new InputSourceButton();

          this._buttonOptions.getValue = function () {
            return 0;
          };

          this._buttonStart = new InputSourceButton();

          this._buttonStart.getValue = function () {
            return 0;
          };

          this._handLeftPosition = new InputSourcePosition();

          this._handLeftPosition.getValue = function () {
            return Vec3.ZERO;
          };

          this._handLeftOrientation = new InputSourceOrientation();

          this._handLeftOrientation.getValue = function () {
            return Quat.IDENTITY;
          };

          this._handRightPosition = new InputSourcePosition();

          this._handRightPosition.getValue = function () {
            return Vec3.ZERO;
          };

          this._handRightOrientation = new InputSourceOrientation();

          this._handRightOrientation.getValue = function () {
            return Quat.IDENTITY;
          };

          this._aimLeftPosition = new InputSourcePosition();

          this._aimLeftPosition.getValue = function () {
            return Vec3.ZERO;
          };

          this._aimLeftOrientation = new InputSourceOrientation();

          this._aimLeftOrientation.getValue = function () {
            return Quat.IDENTITY;
          };

          this._aimRightPosition = new InputSourcePosition();

          this._aimRightPosition.getValue = function () {
            return Vec3.ZERO;
          };

          this._aimRightOrientation = new InputSourceOrientation();

          this._aimRightOrientation.getValue = function () {
            return Quat.IDENTITY;
          };
        };

        _createClass(HandleInputDevice, [{
          key: "buttonNorth",
          get: function get() {
            return this._buttonNorth;
          }
        }, {
          key: "buttonEast",
          get: function get() {
            return this._buttonEast;
          }
        }, {
          key: "buttonWest",
          get: function get() {
            return this._buttonWest;
          }
        }, {
          key: "buttonSouth",
          get: function get() {
            return this._buttonSouth;
          }
        }, {
          key: "buttonTriggerLeft",
          get: function get() {
            return this._buttonTriggerLeft;
          }
        }, {
          key: "buttonTriggerRight",
          get: function get() {
            return this._buttonTriggerRight;
          }
        }, {
          key: "triggerLeft",
          get: function get() {
            return this._triggerLeft;
          }
        }, {
          key: "triggerRight",
          get: function get() {
            return this._triggerRight;
          }
        }, {
          key: "gripLeft",
          get: function get() {
            return this._gripLeft;
          }
        }, {
          key: "gripRight",
          get: function get() {
            return this._gripRight;
          }
        }, {
          key: "leftStick",
          get: function get() {
            return this._leftStick;
          }
        }, {
          key: "rightStick",
          get: function get() {
            return this._rightStick;
          }
        }, {
          key: "buttonLeftStick",
          get: function get() {
            return this._buttonLeftStick;
          }
        }, {
          key: "buttonRightStick",
          get: function get() {
            return this._buttonRightStick;
          }
        }, {
          key: "buttonOptions",
          get: function get() {
            return this._buttonOptions;
          }
        }, {
          key: "buttonStart",
          get: function get() {
            return this._buttonStart;
          }
        }, {
          key: "handLeftPosition",
          get: function get() {
            return this._handLeftPosition;
          }
        }, {
          key: "handLeftOrientation",
          get: function get() {
            return this._handLeftOrientation;
          }
        }, {
          key: "handRightPosition",
          get: function get() {
            return this._handRightPosition;
          }
        }, {
          key: "handRightOrientation",
          get: function get() {
            return this._handRightOrientation;
          }
        }, {
          key: "aimLeftPosition",
          get: function get() {
            return this._aimLeftPosition;
          }
        }, {
          key: "aimLeftOrientation",
          get: function get() {
            return this._aimLeftOrientation;
          }
        }, {
          key: "aimRightPosition",
          get: function get() {
            return this._aimRightPosition;
          }
        }, {
          key: "aimRightOrientation",
          get: function get() {
            return this._aimRightOrientation;
          }
        }]);

        return HandleInputDevice;
      }());
    }
  };
});