System.register("q-bundled:///fs/pal/input/native/handle-input.js", ["../../../cocos/input/types/event-enum.js", "../../../cocos/core/event/event-target.js", "../../../cocos/input/types/index.js", "../input-source.js", "../../../cocos/core/math/index.js"], function (_export, _context) {
  "use strict";

  var InputEventType, EventTarget, EventHandle, InputSourceButton, InputSourceStick, InputSourcePosition, InputSourceOrientation, Vec3, Quat, HandleInputDevice, Button, Pose, _nativeButtonMap;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("HandleInputDevice", void 0);

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
          this._nativeButtonState = {
            [Button.BUTTON_SOUTH]: 0,
            [Button.BUTTON_EAST]: 0,
            [Button.BUTTON_WEST]: 0,
            [Button.BUTTON_NORTH]: 0,
            [Button.BUTTON_TRIGGER_LEFT]: 0,
            [Button.BUTTON_TRIGGER_RIGHT]: 0,
            [Button.TRIGGER_LEFT]: 0,
            [Button.TRIGGER_RIGHT]: 0,
            [Button.GRIP_LEFT]: 0,
            [Button.GRIP_RIGHT]: 0,
            [Button.LEFT_STICK_UP]: 0,
            [Button.LEFT_STICK_DOWN]: 0,
            [Button.LEFT_STICK_LEFT]: 0,
            [Button.LEFT_STICK_RIGHT]: 0,
            [Button.RIGHT_STICK_UP]: 0,
            [Button.RIGHT_STICK_DOWN]: 0,
            [Button.RIGHT_STICK_LEFT]: 0,
            [Button.RIGHT_STICK_RIGHT]: 0,
            [Button.BUTTON_LEFT_STICK]: 0,
            [Button.BUTTON_RIGHT_STICK]: 0,
            [Button.ROKID_MENU]: 0,
            [Button.ROKID_START]: 0
          };
          this._nativePoseState = {
            [Pose.HAND_LEFT]: {
              position: Vec3.ZERO,
              orientation: Quat.IDENTITY
            },
            [Pose.HAND_RIGHT]: {
              position: Vec3.ZERO,
              orientation: Quat.IDENTITY
            },
            [Pose.AIM_LEFT]: {
              position: Vec3.ZERO,
              orientation: Quat.IDENTITY
            },
            [Pose.AIM_RIGHT]: {
              position: Vec3.ZERO,
              orientation: Quat.IDENTITY
            }
          };

          this._initInputSource();

          this._registerEvent();
        }

        _registerEvent() {
          jsb.onHandleInput = infoList => {
            for (let i = 0; i < infoList.length; ++i) {
              const info = infoList[i];

              this._updateNativeButtonState(info);

              this._eventTarget.emit(InputEventType.HANDLE_INPUT, new EventHandle(InputEventType.HANDLE_INPUT, this));
            }
          };

          jsb.onHandlePoseInput = infoList => {
            for (let i = 0; i < infoList.length; ++i) {
              const info = infoList[i];

              this._updateNativePoseState(info);
            }

            this._eventTarget.emit(InputEventType.HANDLE_POSE_INPUT, new EventHandle(InputEventType.HANDLE_POSE_INPUT, this));
          };
        }
        /**
         * @engineInternal
         */


        _on(eventType, callback, target) {
          this._eventTarget.on(eventType, callback, target);
        }

        _axisToButtons(axisValue) {
          const value = Math.abs(axisValue);

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
        }

        _updateNativeButtonState(info) {
          const {
            buttonInfoList,
            axisInfoList
          } = info;

          for (let i = 0; i < buttonInfoList.length; ++i) {
            const buttonInfo = buttonInfoList[i];
            const button = _nativeButtonMap[buttonInfo.code];
            this._nativeButtonState[button] = buttonInfo.isPressed ? 1 : 0;
          }

          for (let i = 0; i < axisInfoList.length; ++i) {
            const axisInfo = axisInfoList[i];
            const {
              code,
              value
            } = axisInfo;
            let negativeButton;
            let positiveButton;
            let axisValue;

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
        }

        _updateNativePoseState(info) {
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
        }

        _initInputSource() {
          this._buttonNorth = new InputSourceButton();

          this._buttonNorth.getValue = () => this._nativeButtonState[Button.BUTTON_NORTH];

          this._buttonEast = new InputSourceButton();

          this._buttonEast.getValue = () => this._nativeButtonState[Button.BUTTON_EAST];

          this._buttonWest = new InputSourceButton();

          this._buttonWest.getValue = () => this._nativeButtonState[Button.BUTTON_WEST];

          this._buttonSouth = new InputSourceButton();

          this._buttonSouth.getValue = () => this._nativeButtonState[Button.BUTTON_SOUTH];

          this._buttonTriggerLeft = new InputSourceButton();

          this._buttonTriggerLeft.getValue = () => this._nativeButtonState[Button.BUTTON_TRIGGER_LEFT];

          this._buttonTriggerRight = new InputSourceButton();

          this._buttonTriggerRight.getValue = () => this._nativeButtonState[Button.BUTTON_TRIGGER_RIGHT];

          this._triggerLeft = new InputSourceButton();

          this._triggerLeft.getValue = () => this._nativeButtonState[Button.TRIGGER_LEFT];

          this._triggerRight = new InputSourceButton();

          this._triggerRight.getValue = () => this._nativeButtonState[Button.TRIGGER_RIGHT];

          this._gripLeft = new InputSourceButton();

          this._gripLeft.getValue = () => this._nativeButtonState[Button.GRIP_LEFT];

          this._gripRight = new InputSourceButton();

          this._gripRight.getValue = () => this._nativeButtonState[Button.GRIP_RIGHT];

          this._buttonLeftStick = new InputSourceButton();

          this._buttonLeftStick.getValue = () => this._nativeButtonState[Button.BUTTON_LEFT_STICK];

          const leftStickUp = new InputSourceButton();

          leftStickUp.getValue = () => this._nativeButtonState[Button.LEFT_STICK_UP];

          const leftStickDown = new InputSourceButton();

          leftStickDown.getValue = () => this._nativeButtonState[Button.LEFT_STICK_DOWN];

          const leftStickLeft = new InputSourceButton();

          leftStickLeft.getValue = () => this._nativeButtonState[Button.LEFT_STICK_LEFT];

          const leftStickRight = new InputSourceButton();

          leftStickRight.getValue = () => this._nativeButtonState[Button.LEFT_STICK_RIGHT];

          this._leftStick = new InputSourceStick({
            up: leftStickUp,
            down: leftStickDown,
            left: leftStickLeft,
            right: leftStickRight
          });
          this._buttonRightStick = new InputSourceButton();

          this._buttonRightStick.getValue = () => this._nativeButtonState[Button.BUTTON_RIGHT_STICK];

          const rightStickUp = new InputSourceButton();

          rightStickUp.getValue = () => this._nativeButtonState[Button.RIGHT_STICK_UP];

          const rightStickDown = new InputSourceButton();

          rightStickDown.getValue = () => this._nativeButtonState[Button.RIGHT_STICK_DOWN];

          const rightStickLeft = new InputSourceButton();

          rightStickLeft.getValue = () => this._nativeButtonState[Button.RIGHT_STICK_LEFT];

          const rightStickRight = new InputSourceButton();

          rightStickRight.getValue = () => this._nativeButtonState[Button.RIGHT_STICK_RIGHT];

          this._rightStick = new InputSourceStick({
            up: rightStickUp,
            down: rightStickDown,
            left: rightStickLeft,
            right: rightStickRight
          });
          this._buttonOptions = new InputSourceButton();

          this._buttonOptions.getValue = () => this._nativeButtonState[Button.ROKID_MENU];

          this._buttonStart = new InputSourceButton();

          this._buttonStart.getValue = () => this._nativeButtonState[Button.ROKID_START];

          this._handLeftPosition = new InputSourcePosition();

          this._handLeftPosition.getValue = () => this._nativePoseState[Pose.HAND_LEFT].position;

          this._handLeftOrientation = new InputSourceOrientation();

          this._handLeftOrientation.getValue = () => this._nativePoseState[Pose.HAND_LEFT].orientation;

          this._handRightPosition = new InputSourcePosition();

          this._handRightPosition.getValue = () => this._nativePoseState[Pose.HAND_RIGHT].position;

          this._handRightOrientation = new InputSourceOrientation();

          this._handRightOrientation.getValue = () => this._nativePoseState[Pose.HAND_RIGHT].orientation;

          this._aimLeftPosition = new InputSourcePosition();

          this._aimLeftPosition.getValue = () => this._nativePoseState[Pose.AIM_LEFT].position;

          this._aimLeftOrientation = new InputSourceOrientation();

          this._aimLeftOrientation.getValue = () => this._nativePoseState[Pose.AIM_LEFT].orientation;

          this._aimRightPosition = new InputSourcePosition();

          this._aimRightPosition.getValue = () => this._nativePoseState[Pose.AIM_RIGHT].position;

          this._aimRightOrientation = new InputSourceOrientation();

          this._aimRightOrientation.getValue = () => this._nativePoseState[Pose.AIM_RIGHT].orientation;
        }

      });
    }
  };
});