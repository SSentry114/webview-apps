System.register("q-bundled:///fs/pal/input/native/handle-input.js", ["../../../cocos/input/types/event-enum.js", "../../../cocos/core/event/event-target.js", "../../../cocos/input/types/index.js", "../input-source.js", "../../../cocos/core/math/index.js"], function (_export, _context) {
  "use strict";

  var InputEventType, EventTarget, EventHandle, InputSourceButton, InputSourceStick, InputSourcePosition, InputSourceOrientation, Vec3, Quat, Button, Pose, _nativeButtonMap, HandleInputDevice;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_cocosInputTypesEventEnumJs) {
      InputEventType = _cocosInputTypesEventEnumJs.InputEventType;
    }, function (_cocosCoreEventEventTargetJs) {
      EventTarget = _cocosCoreEventEventTargetJs.EventTarget;
    }, function (_cocosInputTypesIndexJs) {
      EventHandle = _cocosInputTypesIndexJs.EventHandle;
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
      (function (Button) {
        Button[Button["BUTTON_EAST"] = 0] = "BUTTON_EAST";
        Button[Button["BUTTON_SOUTH"] = 1] = "BUTTON_SOUTH";
        Button[Button["BUTTON_WEST"] = 2] = "BUTTON_WEST";
        Button[Button["BUTTON_NORTH"] = 3] = "BUTTON_NORTH";
        Button[Button["BUTTON_TRIGGER_LEFT"] = 4] = "BUTTON_TRIGGER_LEFT";
        Button[Button["BUTTON_TRIGGER_RIGHT"] = 5] = "BUTTON_TRIGGER_RIGHT";
        Button[Button["TRIGGER_LEFT"] = 6] = "TRIGGER_LEFT";
        Button[Button["TRIGGER_RIGHT"] = 7] = "TRIGGER_RIGHT";
        Button[Button["GRIP_LEFT"] = 8] = "GRIP_LEFT";
        Button[Button["GRIP_RIGHT"] = 9] = "GRIP_RIGHT";
        Button[Button["BUTTON_LEFT_STICK"] = 10] = "BUTTON_LEFT_STICK";
        Button[Button["LEFT_STICK_UP"] = 11] = "LEFT_STICK_UP";
        Button[Button["LEFT_STICK_DOWN"] = 12] = "LEFT_STICK_DOWN";
        Button[Button["LEFT_STICK_LEFT"] = 13] = "LEFT_STICK_LEFT";
        Button[Button["LEFT_STICK_RIGHT"] = 14] = "LEFT_STICK_RIGHT";
        Button[Button["BUTTON_RIGHT_STICK"] = 15] = "BUTTON_RIGHT_STICK";
        Button[Button["RIGHT_STICK_UP"] = 16] = "RIGHT_STICK_UP";
        Button[Button["RIGHT_STICK_DOWN"] = 17] = "RIGHT_STICK_DOWN";
        Button[Button["RIGHT_STICK_LEFT"] = 18] = "RIGHT_STICK_LEFT";
        Button[Button["RIGHT_STICK_RIGHT"] = 19] = "RIGHT_STICK_RIGHT";
        Button[Button["ROKID_MENU"] = 20] = "ROKID_MENU";
        Button[Button["ROKID_START"] = 21] = "ROKID_START";
      })(Button || (Button = {}));

      (function (Pose) {
        Pose[Pose["HAND_LEFT"] = 0] = "HAND_LEFT";
        Pose[Pose["HAND_RIGHT"] = 1] = "HAND_RIGHT";
        Pose[Pose["AIM_LEFT"] = 2] = "AIM_LEFT";
        Pose[Pose["AIM_RIGHT"] = 3] = "AIM_RIGHT";
      })(Pose || (Pose = {}));

      _nativeButtonMap = {
        1: Button.BUTTON_EAST,
        2: Button.BUTTON_SOUTH,
        3: Button.BUTTON_NORTH,
        4: Button.BUTTON_WEST,
        9: Button.BUTTON_LEFT_STICK,
        10: Button.BUTTON_RIGHT_STICK,
        11: Button.ROKID_MENU,
        12: Button.ROKID_START,
        13: Button.BUTTON_TRIGGER_LEFT,
        14: Button.BUTTON_TRIGGER_RIGHT
      };

      _export("HandleInputDevice", HandleInputDevice = /*#__PURE__*/function () {
        function HandleInputDevice() {
          var _this$_nativeButtonSt, _this$_nativePoseStat;

          this._eventTarget = new EventTarget();
          this._nativeButtonState = (_this$_nativeButtonSt = {}, _this$_nativeButtonSt[Button.BUTTON_SOUTH] = 0, _this$_nativeButtonSt[Button.BUTTON_EAST] = 0, _this$_nativeButtonSt[Button.BUTTON_WEST] = 0, _this$_nativeButtonSt[Button.BUTTON_NORTH] = 0, _this$_nativeButtonSt[Button.BUTTON_TRIGGER_LEFT] = 0, _this$_nativeButtonSt[Button.BUTTON_TRIGGER_RIGHT] = 0, _this$_nativeButtonSt[Button.TRIGGER_LEFT] = 0, _this$_nativeButtonSt[Button.TRIGGER_RIGHT] = 0, _this$_nativeButtonSt[Button.GRIP_LEFT] = 0, _this$_nativeButtonSt[Button.GRIP_RIGHT] = 0, _this$_nativeButtonSt[Button.LEFT_STICK_UP] = 0, _this$_nativeButtonSt[Button.LEFT_STICK_DOWN] = 0, _this$_nativeButtonSt[Button.LEFT_STICK_LEFT] = 0, _this$_nativeButtonSt[Button.LEFT_STICK_RIGHT] = 0, _this$_nativeButtonSt[Button.RIGHT_STICK_UP] = 0, _this$_nativeButtonSt[Button.RIGHT_STICK_DOWN] = 0, _this$_nativeButtonSt[Button.RIGHT_STICK_LEFT] = 0, _this$_nativeButtonSt[Button.RIGHT_STICK_RIGHT] = 0, _this$_nativeButtonSt[Button.BUTTON_LEFT_STICK] = 0, _this$_nativeButtonSt[Button.BUTTON_RIGHT_STICK] = 0, _this$_nativeButtonSt[Button.ROKID_MENU] = 0, _this$_nativeButtonSt[Button.ROKID_START] = 0, _this$_nativeButtonSt);
          this._nativePoseState = (_this$_nativePoseStat = {}, _this$_nativePoseStat[Pose.HAND_LEFT] = {
            position: Vec3.ZERO,
            orientation: Quat.IDENTITY
          }, _this$_nativePoseStat[Pose.HAND_RIGHT] = {
            position: Vec3.ZERO,
            orientation: Quat.IDENTITY
          }, _this$_nativePoseStat[Pose.AIM_LEFT] = {
            position: Vec3.ZERO,
            orientation: Quat.IDENTITY
          }, _this$_nativePoseStat[Pose.AIM_RIGHT] = {
            position: Vec3.ZERO,
            orientation: Quat.IDENTITY
          }, _this$_nativePoseStat);

          this._initInputSource();

          this._registerEvent();
        }

        var _proto = HandleInputDevice.prototype;

        _proto._registerEvent = function _registerEvent() {
          var _this = this;

          jsb.onHandleInput = function (infoList) {
            for (var i = 0; i < infoList.length; ++i) {
              var info = infoList[i];

              _this._updateNativeButtonState(info);

              _this._eventTarget.emit(InputEventType.HANDLE_INPUT, new EventHandle(InputEventType.HANDLE_INPUT, _this));
            }
          };

          jsb.onHandlePoseInput = function (infoList) {
            for (var i = 0; i < infoList.length; ++i) {
              var info = infoList[i];

              _this._updateNativePoseState(info);
            }

            _this._eventTarget.emit(InputEventType.HANDLE_POSE_INPUT, new EventHandle(InputEventType.HANDLE_POSE_INPUT, _this));
          };
        }
        /**
         * @engineInternal
         */
        ;

        _proto._on = function _on(eventType, callback, target) {
          this._eventTarget.on(eventType, callback, target);
        };

        _proto._axisToButtons = function _axisToButtons(axisValue) {
          var value = Math.abs(axisValue);

          if (axisValue > 0) {
            return {
              negative: 0,
              positive: value
            };
          } else if (axisValue < 0) {
            return {
              negative: value,
              positive: 0
            };
          } else {
            return {
              negative: 0,
              positive: 0
            };
          }
        };

        _proto._updateNativeButtonState = function _updateNativeButtonState(info) {
          var buttonInfoList = info.buttonInfoList,
              axisInfoList = info.axisInfoList;

          for (var i = 0; i < buttonInfoList.length; ++i) {
            var buttonInfo = buttonInfoList[i];
            var button = _nativeButtonMap[buttonInfo.code];
            this._nativeButtonState[button] = buttonInfo.isPressed ? 1 : 0;
          }

          for (var _i = 0; _i < axisInfoList.length; ++_i) {
            var axisInfo = axisInfoList[_i];
            var code = axisInfo.code,
                value = axisInfo.value;
            var negativeButton = void 0;
            var positiveButton = void 0;
            var axisValue = void 0;

            switch (code) {
              case 3:
                negativeButton = Button.LEFT_STICK_LEFT;
                positiveButton = Button.LEFT_STICK_RIGHT;
                axisValue = this._axisToButtons(value);
                break;

              case 4:
                negativeButton = Button.LEFT_STICK_DOWN;
                positiveButton = Button.LEFT_STICK_UP;
                axisValue = this._axisToButtons(value);
                break;

              case 5:
                negativeButton = Button.RIGHT_STICK_LEFT;
                positiveButton = Button.RIGHT_STICK_RIGHT;
                axisValue = this._axisToButtons(value);
                break;

              case 6:
                negativeButton = Button.RIGHT_STICK_DOWN;
                positiveButton = Button.RIGHT_STICK_UP;
                axisValue = this._axisToButtons(value);
                break;

              default:
                if (code === 7) {
                  this._nativeButtonState[Button.TRIGGER_LEFT] = value;
                } else if (code === 8) {
                  this._nativeButtonState[Button.TRIGGER_RIGHT] = value;
                } else if (code === 9) {
                  this._nativeButtonState[Button.GRIP_LEFT] = value;
                } else if (code === 10) {
                  this._nativeButtonState[Button.GRIP_RIGHT] = value;
                }

                break;
            }

            if (negativeButton && positiveButton && axisValue) {
              this._nativeButtonState[negativeButton] = axisValue.negative;
              this._nativeButtonState[positiveButton] = axisValue.positive;
            }
          }
        };

        _proto._updateNativePoseState = function _updateNativePoseState(info) {
          switch (info.code) {
            case 1:
              this._nativePoseState[Pose.HAND_LEFT] = {
                position: new Vec3(info.x, info.y, info.z),
                orientation: new Quat(info.quaternionX, info.quaternionY, info.quaternionZ, info.quaternionW)
              };
              break;

            case 2:
              this._nativePoseState[Pose.AIM_LEFT] = {
                position: new Vec3(info.x, info.y, info.z),
                orientation: new Quat(info.quaternionX, info.quaternionY, info.quaternionZ, info.quaternionW)
              };
              break;

            case 4:
              this._nativePoseState[Pose.HAND_RIGHT] = {
                position: new Vec3(info.x, info.y, info.z),
                orientation: new Quat(info.quaternionX, info.quaternionY, info.quaternionZ, info.quaternionW)
              };
              break;

            case 5:
              this._nativePoseState[Pose.AIM_RIGHT] = {
                position: new Vec3(info.x, info.y, info.z),
                orientation: new Quat(info.quaternionX, info.quaternionY, info.quaternionZ, info.quaternionW)
              };
              break;

            default:
              break;
          }
        };

        _proto._initInputSource = function _initInputSource() {
          var _this2 = this;

          this._buttonNorth = new InputSourceButton();

          this._buttonNorth.getValue = function () {
            return _this2._nativeButtonState[Button.BUTTON_NORTH];
          };

          this._buttonEast = new InputSourceButton();

          this._buttonEast.getValue = function () {
            return _this2._nativeButtonState[Button.BUTTON_EAST];
          };

          this._buttonWest = new InputSourceButton();

          this._buttonWest.getValue = function () {
            return _this2._nativeButtonState[Button.BUTTON_WEST];
          };

          this._buttonSouth = new InputSourceButton();

          this._buttonSouth.getValue = function () {
            return _this2._nativeButtonState[Button.BUTTON_SOUTH];
          };

          this._buttonTriggerLeft = new InputSourceButton();

          this._buttonTriggerLeft.getValue = function () {
            return _this2._nativeButtonState[Button.BUTTON_TRIGGER_LEFT];
          };

          this._buttonTriggerRight = new InputSourceButton();

          this._buttonTriggerRight.getValue = function () {
            return _this2._nativeButtonState[Button.BUTTON_TRIGGER_RIGHT];
          };

          this._triggerLeft = new InputSourceButton();

          this._triggerLeft.getValue = function () {
            return _this2._nativeButtonState[Button.TRIGGER_LEFT];
          };

          this._triggerRight = new InputSourceButton();

          this._triggerRight.getValue = function () {
            return _this2._nativeButtonState[Button.TRIGGER_RIGHT];
          };

          this._gripLeft = new InputSourceButton();

          this._gripLeft.getValue = function () {
            return _this2._nativeButtonState[Button.GRIP_LEFT];
          };

          this._gripRight = new InputSourceButton();

          this._gripRight.getValue = function () {
            return _this2._nativeButtonState[Button.GRIP_RIGHT];
          };

          this._buttonLeftStick = new InputSourceButton();

          this._buttonLeftStick.getValue = function () {
            return _this2._nativeButtonState[Button.BUTTON_LEFT_STICK];
          };

          var leftStickUp = new InputSourceButton();

          leftStickUp.getValue = function () {
            return _this2._nativeButtonState[Button.LEFT_STICK_UP];
          };

          var leftStickDown = new InputSourceButton();

          leftStickDown.getValue = function () {
            return _this2._nativeButtonState[Button.LEFT_STICK_DOWN];
          };

          var leftStickLeft = new InputSourceButton();

          leftStickLeft.getValue = function () {
            return _this2._nativeButtonState[Button.LEFT_STICK_LEFT];
          };

          var leftStickRight = new InputSourceButton();

          leftStickRight.getValue = function () {
            return _this2._nativeButtonState[Button.LEFT_STICK_RIGHT];
          };

          this._leftStick = new InputSourceStick({
            up: leftStickUp,
            down: leftStickDown,
            left: leftStickLeft,
            right: leftStickRight
          });
          this._buttonRightStick = new InputSourceButton();

          this._buttonRightStick.getValue = function () {
            return _this2._nativeButtonState[Button.BUTTON_RIGHT_STICK];
          };

          var rightStickUp = new InputSourceButton();

          rightStickUp.getValue = function () {
            return _this2._nativeButtonState[Button.RIGHT_STICK_UP];
          };

          var rightStickDown = new InputSourceButton();

          rightStickDown.getValue = function () {
            return _this2._nativeButtonState[Button.RIGHT_STICK_DOWN];
          };

          var rightStickLeft = new InputSourceButton();

          rightStickLeft.getValue = function () {
            return _this2._nativeButtonState[Button.RIGHT_STICK_LEFT];
          };

          var rightStickRight = new InputSourceButton();

          rightStickRight.getValue = function () {
            return _this2._nativeButtonState[Button.RIGHT_STICK_RIGHT];
          };

          this._rightStick = new InputSourceStick({
            up: rightStickUp,
            down: rightStickDown,
            left: rightStickLeft,
            right: rightStickRight
          });
          this._buttonOptions = new InputSourceButton();

          this._buttonOptions.getValue = function () {
            return _this2._nativeButtonState[Button.ROKID_MENU];
          };

          this._buttonStart = new InputSourceButton();

          this._buttonStart.getValue = function () {
            return _this2._nativeButtonState[Button.ROKID_START];
          };

          this._handLeftPosition = new InputSourcePosition();

          this._handLeftPosition.getValue = function () {
            return _this2._nativePoseState[Pose.HAND_LEFT].position;
          };

          this._handLeftOrientation = new InputSourceOrientation();

          this._handLeftOrientation.getValue = function () {
            return _this2._nativePoseState[Pose.HAND_LEFT].orientation;
          };

          this._handRightPosition = new InputSourcePosition();

          this._handRightPosition.getValue = function () {
            return _this2._nativePoseState[Pose.HAND_RIGHT].position;
          };

          this._handRightOrientation = new InputSourceOrientation();

          this._handRightOrientation.getValue = function () {
            return _this2._nativePoseState[Pose.HAND_RIGHT].orientation;
          };

          this._aimLeftPosition = new InputSourcePosition();

          this._aimLeftPosition.getValue = function () {
            return _this2._nativePoseState[Pose.AIM_LEFT].position;
          };

          this._aimLeftOrientation = new InputSourceOrientation();

          this._aimLeftOrientation.getValue = function () {
            return _this2._nativePoseState[Pose.AIM_LEFT].orientation;
          };

          this._aimRightPosition = new InputSourcePosition();

          this._aimRightPosition.getValue = function () {
            return _this2._nativePoseState[Pose.AIM_RIGHT].position;
          };

          this._aimRightOrientation = new InputSourceOrientation();

          this._aimRightOrientation.getValue = function () {
            return _this2._nativePoseState[Pose.AIM_RIGHT].orientation;
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