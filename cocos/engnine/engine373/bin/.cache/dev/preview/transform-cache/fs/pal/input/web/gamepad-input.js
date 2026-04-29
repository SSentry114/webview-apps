System.register("q-bundled:///fs/pal/input/web/gamepad-input.js", ["pal/system-info", "../../../cocos/input/types/event-enum.js", "../../../cocos/core/event/event-target.js", "../../../predefine.js", "../../system-info/enum-type/index.js", "../input-source.js", "../../../cocos/core/index.js", "../../../cocos/input/types/index.js"], function (_export, _context) {
  "use strict";

  var systemInfo, InputEventType, EventTarget, legacyCC, Feature, InputSourceButton, InputSourceDpad, InputSourceOrientation, InputSourcePosition, InputSourceStick, Quat, Vec3, js, EventGamepad, BUTTON_SOUTH, BUTTON_EAST, BUTTON_WEST, BUTTON_NORTH, BUTTON_L1, BUTTON_R1, BUTTON_L2, BUTTON_R2, BUTTON_SHARE, BUTTON_OPTIONS, BUTTON_L3, BUTTON_R3, BUTTON_DPAD_UP, BUTTON_DPAD_DOWN, BUTTON_DPAD_LEFT, BUTTON_DPAD_RIGHT, BUTTON_HOME, BUTTON_TOUCH_PAD, AXIS_LEFT_STICK_X, AXIS_LEFT_STICK_Y, AXIS_RIGHT_STICK_X, AXIS_RIGHT_STICK_Y, XR_TRIGGER, XR_GRIP, XR_TOUCHPAD, XR_STICK, XR_BUTTON_1, XR_BUTTON_2, XR_AXIS_TOUCHPAD_X, XR_AXIS_TOUCHPAD_Y, XR_AXIS_STICK_X, XR_AXIS_STICK_Y, EPSILON, XRLeftHandedness, XRRightHandedness, Pose, GamepadInputDevice;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_palSystemInfo) {
      systemInfo = _palSystemInfo.systemInfo;
    }, function (_cocosInputTypesEventEnumJs) {
      InputEventType = _cocosInputTypesEventEnumJs.InputEventType;
    }, function (_cocosCoreEventEventTargetJs) {
      EventTarget = _cocosCoreEventEventTargetJs.EventTarget;
    }, function (_predefineJs) {
      legacyCC = _predefineJs.default;
    }, function (_systemInfoEnumTypeIndexJs) {
      Feature = _systemInfoEnumTypeIndexJs.Feature;
    }, function (_inputSourceJs) {
      InputSourceButton = _inputSourceJs.InputSourceButton;
      InputSourceDpad = _inputSourceJs.InputSourceDpad;
      InputSourceOrientation = _inputSourceJs.InputSourceOrientation;
      InputSourcePosition = _inputSourceJs.InputSourcePosition;
      InputSourceStick = _inputSourceJs.InputSourceStick;
    }, function (_cocosCoreIndexJs) {
      Quat = _cocosCoreIndexJs.Quat;
      Vec3 = _cocosCoreIndexJs.Vec3;
      js = _cocosCoreIndexJs.js;
    }, function (_cocosInputTypesIndexJs) {
      EventGamepad = _cocosInputTypesIndexJs.EventGamepad;
    }],
    execute: function () {
      //#region button index alias
      BUTTON_SOUTH = 0;
      BUTTON_EAST = 1;
      BUTTON_WEST = 2;
      BUTTON_NORTH = 3;
      BUTTON_L1 = 4;
      BUTTON_R1 = 5;
      BUTTON_L2 = 6;
      BUTTON_R2 = 7;
      BUTTON_SHARE = 8;
      BUTTON_OPTIONS = 9;
      BUTTON_L3 = 10;
      BUTTON_R3 = 11;
      BUTTON_DPAD_UP = 12;
      BUTTON_DPAD_DOWN = 13;
      BUTTON_DPAD_LEFT = 14;
      BUTTON_DPAD_RIGHT = 15;
      BUTTON_HOME = 16;
      BUTTON_TOUCH_PAD = 17;
      AXIS_LEFT_STICK_X = 0;
      AXIS_LEFT_STICK_Y = 1;
      AXIS_RIGHT_STICK_X = 2;
      AXIS_RIGHT_STICK_Y = 3;
      XR_TRIGGER = 0;
      XR_GRIP = 1;
      XR_TOUCHPAD = 2;
      XR_STICK = 3;
      XR_BUTTON_1 = 4;
      XR_BUTTON_2 = 5;
      XR_AXIS_TOUCHPAD_X = 0;
      XR_AXIS_TOUCHPAD_Y = 1;
      XR_AXIS_STICK_X = 2;
      XR_AXIS_STICK_Y = 3; //#endregion  button index alias

      EPSILON = 0.01;
      XRLeftHandedness = 'left';
      XRRightHandedness = 'right';

      (function (Pose) {
        Pose[Pose["HAND_LEFT"] = 1] = "HAND_LEFT";
        Pose[Pose["HAND_RIGHT"] = 4] = "HAND_RIGHT";
        Pose[Pose["AIM_LEFT"] = 2] = "AIM_LEFT";
        Pose[Pose["AIM_RIGHT"] = 5] = "AIM_RIGHT";
      })(Pose || (Pose = {}));

      _export("GamepadInputDevice", GamepadInputDevice = /*#__PURE__*/function () {
        function GamepadInputDevice(deviceId) {
          var _this$_webPoseState;

          this._deviceId = -1;
          this._connected = false;
          this._webPoseState = (_this$_webPoseState = {}, _this$_webPoseState[Pose.HAND_LEFT] = {
            position: Vec3.ZERO,
            orientation: Quat.IDENTITY
          }, _this$_webPoseState[Pose.HAND_RIGHT] = {
            position: Vec3.ZERO,
            orientation: Quat.IDENTITY
          }, _this$_webPoseState[Pose.AIM_LEFT] = {
            position: Vec3.ZERO,
            orientation: Quat.IDENTITY
          }, _this$_webPoseState[Pose.AIM_RIGHT] = {
            position: Vec3.ZERO,
            orientation: Quat.IDENTITY
          }, _this$_webPoseState);
          this._deviceId = deviceId;

          this._initInputSource();
        }
        /**
         * @engineInternal
         */


        GamepadInputDevice._init = function _init() {
          if (!systemInfo.hasFeature(Feature.EVENT_GAMEPAD)) {
            return;
          }

          GamepadInputDevice._registerEvent();
        }
        /**
         * @engineInternal
         */
        ;

        GamepadInputDevice._on = function _on(eventType, cb, target) {
          GamepadInputDevice._eventTarget.on(eventType, cb, target);
        };

        GamepadInputDevice._removeInputDevice = function _removeInputDevice(id) {
          var removeIndex = GamepadInputDevice.all.findIndex(function (device) {
            return device.deviceId === id;
          });

          if (removeIndex === -1) {
            return;
          }

          js.array.fastRemoveAt(GamepadInputDevice.all, removeIndex);
        };

        GamepadInputDevice._getOrCreateInputDevice = function _getOrCreateInputDevice(id, connected) {
          var device = GamepadInputDevice.all.find(function (device) {
            return device.deviceId === id;
          });

          if (!device) {
            device = new GamepadInputDevice(id);
            GamepadInputDevice.all.push(device);
          }

          device._connected = connected;
          return device;
        };

        GamepadInputDevice._ensureDirectorDefined = function _ensureDirectorDefined() {
          return new Promise(function (resolve) {
            GamepadInputDevice._intervalId = setInterval(function () {
              if (legacyCC.director && legacyCC.Director) {
                clearInterval(GamepadInputDevice._intervalId);
                GamepadInputDevice._intervalId = -1;
                resolve();
              }
            }, 50);
          });
        };

        GamepadInputDevice._registerEvent = function _registerEvent() {
          GamepadInputDevice._ensureDirectorDefined().then(function () {
            legacyCC.director.on(legacyCC.Director.EVENT_BEGIN_FRAME, GamepadInputDevice._scanGamepads);
          })["catch"](function (e) {});

          window.addEventListener('gamepadconnected', function (e) {
            GamepadInputDevice._cachedWebGamepads[e.gamepad.index] = e.gamepad;

            var device = GamepadInputDevice._getOrCreateInputDevice(e.gamepad.index, true);

            GamepadInputDevice._eventTarget.emit(InputEventType.GAMEPAD_CHANGE, new EventGamepad(InputEventType.GAMEPAD_CHANGE, device));
          });
          window.addEventListener('gamepaddisconnected', function (e) {
            GamepadInputDevice._cachedWebGamepads[e.gamepad.index] = null;

            var device = GamepadInputDevice._getOrCreateInputDevice(e.gamepad.index, false);

            GamepadInputDevice._removeInputDevice(e.gamepad.index);

            GamepadInputDevice._eventTarget.emit(InputEventType.GAMEPAD_CHANGE, new EventGamepad(InputEventType.GAMEPAD_CHANGE, device));
          });
        };

        GamepadInputDevice._scanWebGamepads = function _scanWebGamepads(devices) {
          var webGamepads = GamepadInputDevice._getWebGamePads();

          if (!webGamepads) {
            return;
          }

          for (var i = 0; i < webGamepads.length; ++i) {
            var webGamepad = webGamepads === null || webGamepads === void 0 ? void 0 : webGamepads[i];

            if (!webGamepad) {
              continue;
            }

            var cachedWebGamepad = GamepadInputDevice._cachedWebGamepads[webGamepad.index]; // TODO: what if cachedWebGamepad is null

            if (cachedWebGamepad) {
              var device = void 0;
              var cachedButtons = cachedWebGamepad.buttons;

              for (var j = 0; j < cachedButtons.length; ++j) {
                var cachedButton = cachedButtons[j];
                var button = webGamepad.buttons[j];

                if (Math.abs(cachedButton.value - button.value) > EPSILON) {
                  device = GamepadInputDevice._getOrCreateInputDevice(webGamepad.index, true);
                  break;
                }
              }

              if (device) {
                devices.push(device);
                continue;
              }

              var cachedAxes = cachedWebGamepad.axes;

              for (var _j = 0; _j < cachedAxes.length; ++_j) {
                var cachedAxisValue = cachedAxes[_j];
                var axisValue = webGamepad.axes[_j];

                if (Math.abs(cachedAxisValue - axisValue) > EPSILON) {
                  device = GamepadInputDevice._getOrCreateInputDevice(webGamepad.index, true);
                  break;
                }
              }

              if (device) {
                devices.push(device);
                continue;
              }
            }
          } // update cache


          GamepadInputDevice._cachedWebGamepads = webGamepads;
        };

        GamepadInputDevice._scanGamepads = function _scanGamepads() {
          var devices = [];

          GamepadInputDevice._scanWebGamepads(devices);

          GamepadInputDevice._scanWebXRGamepads(devices); // emit event


          for (var i = 0; i < devices.length; ++i) {
            var device = devices[i];

            GamepadInputDevice._eventTarget.emit(InputEventType.GAMEPAD_INPUT, new EventGamepad(InputEventType.GAMEPAD_INPUT, device));
          }

          GamepadInputDevice._scanWebXRGamepadsPose();
        };

        GamepadInputDevice._scanWebXRGamepads = function _scanWebXRGamepads(devices) {
          var _GamepadInputDevice$_, _GamepadInputDevice$_2;

          var webxrGamepadMap = GamepadInputDevice._getWebXRGamepadMap();

          if (!webxrGamepadMap) {
            // update cache
            GamepadInputDevice._cachedWebXRGamepadMap = null;

            if (GamepadInputDevice.xr && GamepadInputDevice.xr._connected) {
              GamepadInputDevice.xr._connected = false;

              GamepadInputDevice._eventTarget.emit(InputEventType.GAMEPAD_CHANGE, new EventGamepad(InputEventType.GAMEPAD_CHANGE, GamepadInputDevice.xr));

              devices.push(GamepadInputDevice.xr);
            }

            return;
          }

          if (!GamepadInputDevice.xr) {
            // webxr gamepads index is -1 https://www.w3.org/TR/webxr-gamepads-module-1/#navigator-differences
            GamepadInputDevice.xr = new GamepadInputDevice(-1);
          }

          var left = webxrGamepadMap.get(XRLeftHandedness);
          var right = webxrGamepadMap.get(XRRightHandedness);

          if (!left && !right) {
            if (GamepadInputDevice.xr._connected) {
              GamepadInputDevice.xr._connected = false;

              GamepadInputDevice._eventTarget.emit(InputEventType.GAMEPAD_CHANGE, new EventGamepad(InputEventType.GAMEPAD_CHANGE, GamepadInputDevice.xr));
            }
          } else if (!GamepadInputDevice.xr._connected) {
            GamepadInputDevice.xr._connected = true;

            GamepadInputDevice._eventTarget.emit(InputEventType.GAMEPAD_CHANGE, new EventGamepad(InputEventType.GAMEPAD_CHANGE, GamepadInputDevice.xr));
          }

          if (GamepadInputDevice.checkGamepadChanged(left, (_GamepadInputDevice$_ = GamepadInputDevice._cachedWebXRGamepadMap) === null || _GamepadInputDevice$_ === void 0 ? void 0 : _GamepadInputDevice$_.get(XRLeftHandedness))) {
            devices.push(GamepadInputDevice.xr);
          } else if (GamepadInputDevice.checkGamepadChanged(right, (_GamepadInputDevice$_2 = GamepadInputDevice._cachedWebXRGamepadMap) === null || _GamepadInputDevice$_2 === void 0 ? void 0 : _GamepadInputDevice$_2.get(XRRightHandedness))) {
            devices.push(GamepadInputDevice.xr);
          } // update cache


          if (!GamepadInputDevice._cachedWebXRGamepadMap) {
            GamepadInputDevice._cachedWebXRGamepadMap = new Map();
          }

          GamepadInputDevice._cachedWebXRGamepadMap.set(XRLeftHandedness, GamepadInputDevice._copyCacheGamepadValue(left));

          GamepadInputDevice._cachedWebXRGamepadMap.set(XRRightHandedness, GamepadInputDevice._copyCacheGamepadValue(right));
        };

        GamepadInputDevice.checkGamepadChanged = function checkGamepadChanged(currGamepad, cachedGamepad) {
          if (!currGamepad && !cachedGamepad) {
            return false;
          } else if (!currGamepad || !cachedGamepad) {
            return true;
          }

          var cachedButtons = cachedGamepad.buttons;

          for (var j = 0; j < cachedButtons.length; ++j) {
            var cachedButton = cachedButtons[j];
            var button = currGamepad.buttons[j];

            if (button.value !== 0 || cachedButton !== 0) {
              return true;
            }
          }

          var cachedAxes = cachedGamepad.axes;

          for (var _j2 = 0; _j2 < cachedAxes.length; ++_j2) {
            var cachedAxisValue = cachedAxes[_j2];
            var axisValue = currGamepad.axes[_j2];

            if (axisValue !== 0 || cachedAxisValue !== 0) {
              return true;
            }
          }

          return false;
        };

        GamepadInputDevice._copyCacheGamepadValue = function _copyCacheGamepadValue(gamepad) {
          if (!gamepad) {
            return undefined;
          }

          var cacheGamepad = {
            buttons: new Array(gamepad.buttons.length),
            axes: new Array(gamepad.axes.length)
          };

          for (var j = 0; j < gamepad.buttons.length; ++j) {
            cacheGamepad.buttons[j] = gamepad.buttons[j].value;
          }

          for (var _j3 = 0; _j3 < gamepad.axes.length; ++_j3) {
            cacheGamepad.axes[_j3] = gamepad.axes[_j3];
          }

          return cacheGamepad;
        };

        GamepadInputDevice._scanWebXRGamepadsPose = function _scanWebXRGamepadsPose() {
          var _globalThis$__globalX;

          var infoList = (_globalThis$__globalX = globalThis.__globalXR) === null || _globalThis$__globalX === void 0 ? void 0 : _globalThis$__globalX.webxrHandlePoseInfos;

          if (!infoList || !GamepadInputDevice.xr) {
            return;
          }

          for (var i = 0; i < infoList.length; ++i) {
            var info = infoList[i];

            GamepadInputDevice.xr._updateWebPoseState(info);
          }

          GamepadInputDevice._eventTarget.emit(InputEventType.HANDLE_POSE_INPUT, new EventGamepad(InputEventType.HANDLE_POSE_INPUT, GamepadInputDevice.xr));
        };

        GamepadInputDevice._getWebXRGamepadMap = function _getWebXRGamepadMap() {
          var _globalThis$__globalX2;

          return (_globalThis$__globalX2 = globalThis.__globalXR) === null || _globalThis$__globalX2 === void 0 ? void 0 : _globalThis$__globalX2.webxrGamepadMap;
        };

        GamepadInputDevice._getWebGamePads = function _getWebGamePads() {
          if (typeof navigator.getGamepads === 'function') {
            return navigator.getGamepads(); // @ts-expect-error Property 'webkitGetGamepads' does not exist on type 'Navigator'
          } else if (typeof navigator.webkitGetGamepads === 'function') {
            // @ts-expect-error Property 'webkitGetGamepads' does not exist on type 'Navigator'
            return navigator.webkitGetGamepads();
          }

          return [];
        };

        GamepadInputDevice._getWebGamepad = function _getWebGamepad(deviceId) {
          var webGamepads = GamepadInputDevice._getWebGamePads();

          for (var i = 0; i < webGamepads.length; ++i) {
            var webGamepad = webGamepads[i];

            if (webGamepad && webGamepad.index === deviceId) {
              return webGamepad;
            }
          }

          return undefined;
        };

        var _proto = GamepadInputDevice.prototype;

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

        _proto._updateWebPoseState = function _updateWebPoseState(info) {
          if (info.code !== Pose.HAND_LEFT && info.code !== Pose.AIM_LEFT && info.code !== Pose.HAND_RIGHT && info.code !== Pose.AIM_RIGHT) {
            return;
          }

          this._webPoseState[info.code] = {
            position: new Vec3(info.position.x, info.position.y, info.position.z),
            orientation: new Quat(info.orientation.x, info.orientation.y, info.orientation.z, info.orientation.w)
          };
        };

        _proto._initInputSource = function _initInputSource() {
          var _this = this;

          this._buttonNorth = new InputSourceButton();

          this._buttonNorth.getValue = function () {
            if (_this.deviceId === -1) {
              var _GamepadInputDevice$_3;

              var webxrGamepad = (_GamepadInputDevice$_3 = GamepadInputDevice._getWebXRGamepadMap()) === null || _GamepadInputDevice$_3 === void 0 ? void 0 : _GamepadInputDevice$_3.get(XRLeftHandedness);

              if (webxrGamepad && webxrGamepad.buttons.length > XR_BUTTON_2) {
                return webxrGamepad.buttons[XR_BUTTON_2].value;
              }

              return 0;
            }

            var webGamepad = GamepadInputDevice._getWebGamepad(_this.deviceId);

            if (webGamepad) {
              return webGamepad.buttons[BUTTON_NORTH].value;
            }

            return 0;
          };

          this._buttonEast = new InputSourceButton();

          this._buttonEast.getValue = function () {
            if (_this.deviceId === -1) {
              var _GamepadInputDevice$_4;

              var webxrGamepad = (_GamepadInputDevice$_4 = GamepadInputDevice._getWebXRGamepadMap()) === null || _GamepadInputDevice$_4 === void 0 ? void 0 : _GamepadInputDevice$_4.get(XRRightHandedness);

              if (webxrGamepad && webxrGamepad.buttons.length > XR_BUTTON_2) {
                return webxrGamepad.buttons[XR_BUTTON_2].value;
              }

              return 0;
            }

            var webGamepad = GamepadInputDevice._getWebGamepad(_this.deviceId);

            if (webGamepad) {
              return webGamepad.buttons[BUTTON_EAST].value;
            }

            return 0;
          };

          this._buttonWest = new InputSourceButton();

          this._buttonWest.getValue = function () {
            if (_this.deviceId === -1) {
              var _GamepadInputDevice$_5;

              var webxrGamepad = (_GamepadInputDevice$_5 = GamepadInputDevice._getWebXRGamepadMap()) === null || _GamepadInputDevice$_5 === void 0 ? void 0 : _GamepadInputDevice$_5.get(XRLeftHandedness);

              if (webxrGamepad && webxrGamepad.buttons.length > XR_BUTTON_1) {
                return webxrGamepad.buttons[XR_BUTTON_1].value;
              }

              return 0;
            }

            var webGamepad = GamepadInputDevice._getWebGamepad(_this.deviceId);

            if (webGamepad) {
              return webGamepad.buttons[BUTTON_WEST].value;
            }

            return 0;
          };

          this._buttonSouth = new InputSourceButton();

          this._buttonSouth.getValue = function () {
            if (_this.deviceId === -1) {
              var _GamepadInputDevice$_6;

              var webxrGamepad = (_GamepadInputDevice$_6 = GamepadInputDevice._getWebXRGamepadMap()) === null || _GamepadInputDevice$_6 === void 0 ? void 0 : _GamepadInputDevice$_6.get(XRRightHandedness);

              if (webxrGamepad && webxrGamepad.buttons.length > XR_BUTTON_1) {
                return webxrGamepad.buttons[XR_BUTTON_1].value;
              }

              return 0;
            }

            var webGamepad = GamepadInputDevice._getWebGamepad(_this.deviceId);

            if (webGamepad) {
              return webGamepad.buttons[BUTTON_SOUTH].value;
            }

            return 0;
          };

          this._buttonL1 = new InputSourceButton();

          this._buttonL1.getValue = function () {
            var webGamepad = GamepadInputDevice._getWebGamepad(_this.deviceId);

            if (webGamepad) {
              return webGamepad.buttons[BUTTON_L1].value;
            }

            return 0;
          };

          this._buttonL2 = new InputSourceButton();

          this._buttonL2.getValue = function () {
            if (_this.deviceId === -1) {
              var _GamepadInputDevice$_7;

              var webxrGamepad = (_GamepadInputDevice$_7 = GamepadInputDevice._getWebXRGamepadMap()) === null || _GamepadInputDevice$_7 === void 0 ? void 0 : _GamepadInputDevice$_7.get(XRLeftHandedness);

              if (webxrGamepad && webxrGamepad.buttons.length > XR_TRIGGER) {
                return webxrGamepad.buttons[XR_TRIGGER].value;
              }

              return 0;
            }

            var webGamepad = GamepadInputDevice._getWebGamepad(_this.deviceId);

            if (webGamepad) {
              return webGamepad.buttons[BUTTON_L2].value;
            }

            return 0;
          };

          this._buttonL3 = new InputSourceButton();

          this._buttonL3.getValue = function () {
            if (_this.deviceId === -1) {
              var _GamepadInputDevice$_8;

              var webxrGamepad = (_GamepadInputDevice$_8 = GamepadInputDevice._getWebXRGamepadMap()) === null || _GamepadInputDevice$_8 === void 0 ? void 0 : _GamepadInputDevice$_8.get(XRLeftHandedness);

              if (webxrGamepad) {
                if (webxrGamepad.buttons.length > XR_STICK && webxrGamepad.buttons[XR_STICK].value !== 0) {
                  return webxrGamepad.buttons[XR_STICK].value;
                } else if (webxrGamepad.buttons.length > XR_TOUCHPAD && webxrGamepad.buttons[XR_TOUCHPAD].value !== 0) {
                  return webxrGamepad.buttons[XR_TOUCHPAD].value;
                }
              }

              return 0;
            }

            var webGamepad = GamepadInputDevice._getWebGamepad(_this.deviceId);

            if (webGamepad) {
              return webGamepad.buttons[BUTTON_L3].value;
            }

            return 0;
          };

          this._buttonR1 = new InputSourceButton();

          this._buttonR1.getValue = function () {
            var webGamepad = GamepadInputDevice._getWebGamepad(_this.deviceId);

            if (webGamepad) {
              return webGamepad.buttons[BUTTON_R1].value;
            }

            return 0;
          };

          this._buttonR2 = new InputSourceButton();

          this._buttonR2.getValue = function () {
            if (_this.deviceId === -1) {
              var _GamepadInputDevice$_9;

              var webxrGamepad = (_GamepadInputDevice$_9 = GamepadInputDevice._getWebXRGamepadMap()) === null || _GamepadInputDevice$_9 === void 0 ? void 0 : _GamepadInputDevice$_9.get(XRRightHandedness);

              if (webxrGamepad && webxrGamepad.buttons.length > XR_TRIGGER) {
                return webxrGamepad.buttons[XR_TRIGGER].value;
              }

              return 0;
            }

            var webGamepad = GamepadInputDevice._getWebGamepad(_this.deviceId);

            if (webGamepad) {
              return webGamepad.buttons[BUTTON_R2].value;
            }

            return 0;
          };

          this._buttonR3 = new InputSourceButton();

          this._buttonR3.getValue = function () {
            if (_this.deviceId === -1) {
              var _GamepadInputDevice$_10;

              var webxrGamepad = (_GamepadInputDevice$_10 = GamepadInputDevice._getWebXRGamepadMap()) === null || _GamepadInputDevice$_10 === void 0 ? void 0 : _GamepadInputDevice$_10.get(XRRightHandedness);

              if (webxrGamepad) {
                if (webxrGamepad.buttons.length > XR_STICK && webxrGamepad.buttons[XR_STICK].value !== 0) {
                  return webxrGamepad.buttons[XR_STICK].value;
                } else if (webxrGamepad.buttons.length > XR_TOUCHPAD && webxrGamepad.buttons[XR_TOUCHPAD].value !== 0) {
                  return webxrGamepad.buttons[XR_TOUCHPAD].value;
                }
              }

              return 0;
            }

            var webGamepad = GamepadInputDevice._getWebGamepad(_this.deviceId);

            if (webGamepad) {
              return webGamepad.buttons[BUTTON_R3].value;
            }

            return 0;
          }; // this._buttonTouchPad = new InputSourceButton();
          // this._buttonTouchPad.getValue = () => {
          //     const webGamepad = GamepadInputDevice._getWebGamepad(this.deviceId);
          //     if (webGamepad) { return webGamepad.buttons[BUTTON_TOUCH_PAD].value; }
          //     return 0;
          // };
          // this._buttonHome = new InputSourceButton();
          // this._buttonHome.getValue = () => {
          //     const webGamepad = GamepadInputDevice._getWebGamepad(this.deviceId);
          //     if (webGamepad) { return webGamepad.buttons[BUTTON_HOME].value; }
          //     return 0;
          // };


          this._buttonShare = new InputSourceButton();

          this._buttonShare.getValue = function () {
            var webGamepad = GamepadInputDevice._getWebGamepad(_this.deviceId);

            if (webGamepad) {
              return webGamepad.buttons[BUTTON_SHARE].value;
            }

            return 0;
          };

          this._buttonOptions = new InputSourceButton();

          this._buttonOptions.getValue = function () {
            var webGamepad = GamepadInputDevice._getWebGamepad(_this.deviceId);

            if (webGamepad) {
              return webGamepad.buttons[BUTTON_OPTIONS].value;
            }

            return 0;
          };

          var dpadUp = new InputSourceButton();

          dpadUp.getValue = function () {
            var webGamepad = GamepadInputDevice._getWebGamepad(_this.deviceId);

            if (webGamepad) {
              return webGamepad.buttons[BUTTON_DPAD_UP].value;
            }

            return 0;
          };

          var dpadDown = new InputSourceButton();

          dpadDown.getValue = function () {
            var webGamepad = GamepadInputDevice._getWebGamepad(_this.deviceId);

            if (webGamepad) {
              return webGamepad.buttons[BUTTON_DPAD_DOWN].value;
            }

            return 0;
          };

          var dpadLeft = new InputSourceButton();

          dpadLeft.getValue = function () {
            var webGamepad = GamepadInputDevice._getWebGamepad(_this.deviceId);

            if (webGamepad) {
              return webGamepad.buttons[BUTTON_DPAD_LEFT].value;
            }

            return 0;
          };

          var dpadRight = new InputSourceButton();

          dpadRight.getValue = function () {
            var webGamepad = GamepadInputDevice._getWebGamepad(_this.deviceId);

            if (webGamepad) {
              return webGamepad.buttons[BUTTON_DPAD_RIGHT].value;
            }

            return 0;
          };

          this._dpad = new InputSourceDpad({
            up: dpadUp,
            down: dpadDown,
            left: dpadLeft,
            right: dpadRight
          });
          var leftStickUp = new InputSourceButton();

          leftStickUp.getValue = function () {
            if (_this.deviceId === -1) {
              var _GamepadInputDevice$_11;

              var webxrGamepad = (_GamepadInputDevice$_11 = GamepadInputDevice._getWebXRGamepadMap()) === null || _GamepadInputDevice$_11 === void 0 ? void 0 : _GamepadInputDevice$_11.get(XRLeftHandedness);

              if (webxrGamepad) {
                if (webxrGamepad.axes.length > XR_AXIS_STICK_Y && webxrGamepad.axes[XR_AXIS_STICK_Y] !== 0) {
                  return _this._axisToButtons(webxrGamepad.axes[XR_AXIS_STICK_Y]).negative;
                } else if (webxrGamepad.axes.length > XR_AXIS_TOUCHPAD_Y && webxrGamepad.axes[XR_AXIS_TOUCHPAD_Y] !== 0) {
                  return _this._axisToButtons(webxrGamepad.axes[XR_AXIS_TOUCHPAD_Y]).negative;
                }
              }

              return 0;
            }

            var webGamepad = GamepadInputDevice._getWebGamepad(_this.deviceId);

            if (webGamepad) {
              return _this._axisToButtons(webGamepad.axes[AXIS_LEFT_STICK_Y]).negative;
            }

            return 0;
          };

          var leftStickDown = new InputSourceButton();

          leftStickDown.getValue = function () {
            if (_this.deviceId === -1) {
              var _GamepadInputDevice$_12;

              var webxrGamepad = (_GamepadInputDevice$_12 = GamepadInputDevice._getWebXRGamepadMap()) === null || _GamepadInputDevice$_12 === void 0 ? void 0 : _GamepadInputDevice$_12.get(XRLeftHandedness);

              if (webxrGamepad) {
                if (webxrGamepad.axes.length > XR_AXIS_STICK_Y && webxrGamepad.axes[XR_AXIS_STICK_Y] !== 0) {
                  return _this._axisToButtons(webxrGamepad.axes[XR_AXIS_STICK_Y]).positive;
                } else if (webxrGamepad.axes.length > XR_AXIS_TOUCHPAD_Y && webxrGamepad.axes[XR_AXIS_TOUCHPAD_Y] !== 0) {
                  return _this._axisToButtons(webxrGamepad.axes[XR_AXIS_TOUCHPAD_Y]).positive;
                }
              }

              return 0;
            }

            var webGamepad = GamepadInputDevice._getWebGamepad(_this.deviceId);

            if (webGamepad) {
              return _this._axisToButtons(webGamepad.axes[AXIS_LEFT_STICK_Y]).positive;
            }

            return 0;
          };

          var leftStickLeft = new InputSourceButton();

          leftStickLeft.getValue = function () {
            if (_this.deviceId === -1) {
              var _GamepadInputDevice$_13;

              var webxrGamepad = (_GamepadInputDevice$_13 = GamepadInputDevice._getWebXRGamepadMap()) === null || _GamepadInputDevice$_13 === void 0 ? void 0 : _GamepadInputDevice$_13.get(XRLeftHandedness);

              if (webxrGamepad) {
                if (webxrGamepad.axes.length > XR_AXIS_STICK_X && webxrGamepad.axes[XR_AXIS_STICK_X] !== 0) {
                  return _this._axisToButtons(webxrGamepad.axes[XR_AXIS_STICK_X]).negative;
                } else if (webxrGamepad.axes.length > XR_AXIS_TOUCHPAD_X && webxrGamepad.axes[XR_AXIS_TOUCHPAD_X] !== 0) {
                  return _this._axisToButtons(webxrGamepad.axes[XR_AXIS_TOUCHPAD_X]).negative;
                }
              }

              return 0;
            }

            var webGamepad = GamepadInputDevice._getWebGamepad(_this.deviceId);

            if (webGamepad) {
              return _this._axisToButtons(webGamepad.axes[AXIS_LEFT_STICK_X]).negative;
            }

            return 0;
          };

          var leftStickRight = new InputSourceButton();

          leftStickRight.getValue = function () {
            if (_this.deviceId === -1) {
              var _GamepadInputDevice$_14;

              var webxrGamepad = (_GamepadInputDevice$_14 = GamepadInputDevice._getWebXRGamepadMap()) === null || _GamepadInputDevice$_14 === void 0 ? void 0 : _GamepadInputDevice$_14.get(XRLeftHandedness);

              if (webxrGamepad) {
                if (webxrGamepad.axes.length > XR_AXIS_STICK_X && webxrGamepad.axes[XR_AXIS_STICK_X] !== 0) {
                  return _this._axisToButtons(webxrGamepad.axes[XR_AXIS_STICK_X]).positive;
                } else if (webxrGamepad.axes.length > XR_AXIS_TOUCHPAD_X && webxrGamepad.axes[XR_AXIS_TOUCHPAD_X] !== 0) {
                  return _this._axisToButtons(webxrGamepad.axes[XR_AXIS_TOUCHPAD_X]).positive;
                }
              }

              return 0;
            }

            var webGamepad = GamepadInputDevice._getWebGamepad(_this.deviceId);

            if (webGamepad) {
              return _this._axisToButtons(webGamepad.axes[AXIS_LEFT_STICK_X]).positive;
            }

            return 0;
          };

          this._leftStick = new InputSourceStick({
            up: leftStickUp,
            down: leftStickDown,
            left: leftStickLeft,
            right: leftStickRight
          });
          var rightStickUp = new InputSourceButton();

          rightStickUp.getValue = function () {
            if (_this.deviceId === -1) {
              var _GamepadInputDevice$_15;

              var webxrGamepad = (_GamepadInputDevice$_15 = GamepadInputDevice._getWebXRGamepadMap()) === null || _GamepadInputDevice$_15 === void 0 ? void 0 : _GamepadInputDevice$_15.get(XRRightHandedness);

              if (webxrGamepad) {
                if (webxrGamepad.axes.length > XR_AXIS_STICK_Y && webxrGamepad.axes[XR_AXIS_STICK_Y] !== 0) {
                  return _this._axisToButtons(webxrGamepad.axes[XR_AXIS_STICK_Y]).negative;
                } else if (webxrGamepad.axes.length > XR_AXIS_TOUCHPAD_Y && webxrGamepad.axes[XR_AXIS_TOUCHPAD_Y] !== 0) {
                  return _this._axisToButtons(webxrGamepad.axes[XR_AXIS_TOUCHPAD_Y]).negative;
                }
              }

              return 0;
            }

            var webGamepad = GamepadInputDevice._getWebGamepad(_this.deviceId);

            if (webGamepad) {
              return _this._axisToButtons(webGamepad.axes[AXIS_RIGHT_STICK_Y]).negative;
            }

            return 0;
          };

          var rightStickDown = new InputSourceButton();

          rightStickDown.getValue = function () {
            if (_this.deviceId === -1) {
              var _GamepadInputDevice$_16;

              var webxrGamepad = (_GamepadInputDevice$_16 = GamepadInputDevice._getWebXRGamepadMap()) === null || _GamepadInputDevice$_16 === void 0 ? void 0 : _GamepadInputDevice$_16.get(XRRightHandedness);

              if (webxrGamepad) {
                if (webxrGamepad.axes.length > XR_AXIS_STICK_Y && webxrGamepad.axes[XR_AXIS_STICK_Y] !== 0) {
                  return _this._axisToButtons(webxrGamepad.axes[XR_AXIS_STICK_Y]).positive;
                } else if (webxrGamepad.axes.length > XR_AXIS_TOUCHPAD_Y && webxrGamepad.axes[XR_AXIS_TOUCHPAD_Y] !== 0) {
                  return _this._axisToButtons(webxrGamepad.axes[XR_AXIS_TOUCHPAD_Y]).positive;
                }
              }

              return 0;
            }

            var webGamepad = GamepadInputDevice._getWebGamepad(_this.deviceId);

            if (webGamepad) {
              return _this._axisToButtons(webGamepad.axes[AXIS_RIGHT_STICK_Y]).positive;
            }

            return 0;
          };

          var rightStickLeft = new InputSourceButton();

          rightStickLeft.getValue = function () {
            if (_this.deviceId === -1) {
              var _GamepadInputDevice$_17;

              var webxrGamepad = (_GamepadInputDevice$_17 = GamepadInputDevice._getWebXRGamepadMap()) === null || _GamepadInputDevice$_17 === void 0 ? void 0 : _GamepadInputDevice$_17.get(XRRightHandedness);

              if (webxrGamepad) {
                if (webxrGamepad.axes.length > XR_AXIS_STICK_X && webxrGamepad.axes[XR_AXIS_STICK_X] !== 0) {
                  return _this._axisToButtons(webxrGamepad.axes[XR_AXIS_STICK_X]).negative;
                } else if (webxrGamepad.axes.length > XR_AXIS_TOUCHPAD_X && webxrGamepad.axes[XR_AXIS_TOUCHPAD_X] !== 0) {
                  return _this._axisToButtons(webxrGamepad.axes[XR_AXIS_TOUCHPAD_X]).negative;
                }
              }

              return 0;
            }

            var webGamepad = GamepadInputDevice._getWebGamepad(_this.deviceId);

            if (webGamepad) {
              return _this._axisToButtons(webGamepad.axes[AXIS_RIGHT_STICK_X]).negative;
            }

            return 0;
          };

          var rightStickRight = new InputSourceButton();

          rightStickRight.getValue = function () {
            if (_this.deviceId === -1) {
              var _GamepadInputDevice$_18;

              var webxrGamepad = (_GamepadInputDevice$_18 = GamepadInputDevice._getWebXRGamepadMap()) === null || _GamepadInputDevice$_18 === void 0 ? void 0 : _GamepadInputDevice$_18.get(XRRightHandedness);

              if (webxrGamepad) {
                if (webxrGamepad.axes.length > XR_AXIS_STICK_X && webxrGamepad.axes[XR_AXIS_STICK_X] !== 0) {
                  return _this._axisToButtons(webxrGamepad.axes[XR_AXIS_STICK_X]).positive;
                } else if (webxrGamepad.axes.length > XR_AXIS_TOUCHPAD_X && webxrGamepad.axes[XR_AXIS_TOUCHPAD_X] !== 0) {
                  return _this._axisToButtons(webxrGamepad.axes[XR_AXIS_TOUCHPAD_X]).positive;
                }
              }

              return 0;
            }

            var webGamepad = GamepadInputDevice._getWebGamepad(_this.deviceId);

            if (webGamepad) {
              return _this._axisToButtons(webGamepad.axes[AXIS_RIGHT_STICK_X]).positive;
            }

            return 0;
          };

          this._rightStick = new InputSourceStick({
            up: rightStickUp,
            down: rightStickDown,
            left: rightStickLeft,
            right: rightStickRight
          });
          this._buttonStart = new InputSourceButton();

          this._buttonStart.getValue = function () {
            return 0;
          };

          this._gripLeft = new InputSourceButton();

          this._gripLeft.getValue = function () {
            if (_this.deviceId === -1) {
              var _GamepadInputDevice$_19;

              var webxrGamepad = (_GamepadInputDevice$_19 = GamepadInputDevice._getWebXRGamepadMap()) === null || _GamepadInputDevice$_19 === void 0 ? void 0 : _GamepadInputDevice$_19.get(XRLeftHandedness);

              if (webxrGamepad && webxrGamepad.buttons.length > XR_GRIP) {
                return webxrGamepad.buttons[XR_GRIP].value;
              }
            }

            return 0;
          };

          this._gripRight = new InputSourceButton();

          this._gripRight.getValue = function () {
            if (_this.deviceId === -1) {
              var _GamepadInputDevice$_20;

              var webxrGamepad = (_GamepadInputDevice$_20 = GamepadInputDevice._getWebXRGamepadMap()) === null || _GamepadInputDevice$_20 === void 0 ? void 0 : _GamepadInputDevice$_20.get(XRRightHandedness);

              if (webxrGamepad && webxrGamepad.buttons.length > XR_GRIP) {
                return webxrGamepad.buttons[XR_GRIP].value;
              }
            }

            return 0;
          };

          this._handLeftPosition = new InputSourcePosition();

          this._handLeftPosition.getValue = function () {
            return _this._webPoseState[Pose.HAND_LEFT].position;
          };

          this._handLeftOrientation = new InputSourceOrientation();

          this._handLeftOrientation.getValue = function () {
            return _this._webPoseState[Pose.HAND_LEFT].orientation;
          };

          this._handRightPosition = new InputSourcePosition();

          this._handRightPosition.getValue = function () {
            return _this._webPoseState[Pose.HAND_RIGHT].position;
          };

          this._handRightOrientation = new InputSourceOrientation();

          this._handRightOrientation.getValue = function () {
            return _this._webPoseState[Pose.HAND_RIGHT].orientation;
          };

          this._aimLeftPosition = new InputSourcePosition();

          this._aimLeftPosition.getValue = function () {
            return _this._webPoseState[Pose.AIM_LEFT].position;
          };

          this._aimLeftOrientation = new InputSourceOrientation();

          this._aimLeftOrientation.getValue = function () {
            return _this._webPoseState[Pose.AIM_LEFT].orientation;
          };

          this._aimRightPosition = new InputSourcePosition();

          this._aimRightPosition.getValue = function () {
            return _this._webPoseState[Pose.AIM_RIGHT].position;
          };

          this._aimRightOrientation = new InputSourceOrientation();

          this._aimRightOrientation.getValue = function () {
            return _this._webPoseState[Pose.AIM_RIGHT].orientation;
          };
        };

        _createClass(GamepadInputDevice, [{
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
          key: "buttonL1",
          get: function get() {
            return this._buttonL1;
          }
        }, {
          key: "buttonL2",
          get: function get() {
            return this._buttonL2;
          }
        }, {
          key: "buttonL3",
          get: function get() {
            return this._buttonL3;
          }
        }, {
          key: "buttonR1",
          get: function get() {
            return this._buttonR1;
          }
        }, {
          key: "buttonR2",
          get: function get() {
            return this._buttonR2;
          }
        }, {
          key: "buttonR3",
          get: function get() {
            return this._buttonR3;
          } // public get buttonTouchPad () { return this._buttonTouchPad; }
          // public get buttonHome () { return this._buttonHome; }

        }, {
          key: "buttonShare",
          get: function get() {
            return this._buttonShare;
          }
        }, {
          key: "buttonOptions",
          get: function get() {
            return this._buttonOptions;
          }
        }, {
          key: "dpad",
          get: function get() {
            return this._dpad;
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
          key: "buttonStart",
          get: function get() {
            return this._buttonStart;
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
        }, {
          key: "deviceId",
          get: function get() {
            return this._deviceId;
          }
        }, {
          key: "connected",
          get: function get() {
            return this._connected;
          }
        }]);

        return GamepadInputDevice;
      }());

      GamepadInputDevice.all = [];
      GamepadInputDevice.xr = null;
      GamepadInputDevice._eventTarget = new EventTarget();
      GamepadInputDevice._cachedWebGamepads = [];
      GamepadInputDevice._cachedWebXRGamepadMap = null;
      GamepadInputDevice._intervalId = -1;
    }
  };
});