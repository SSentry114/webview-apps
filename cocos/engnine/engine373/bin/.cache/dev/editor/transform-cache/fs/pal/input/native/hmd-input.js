System.register("q-bundled:///fs/pal/input/native/hmd-input.js", ["../../../cocos/input/types/event-enum.js", "../../../cocos/core/event/event-target.js", "../../../cocos/input/types/index.js", "../input-source.js", "../../../cocos/core/math/index.js"], function (_export, _context) {
  "use strict";

  var InputEventType, EventTarget, EventHMD, InputSourcePosition, InputSourceOrientation, Vec3, Quat, HMDInputDevice, Pose;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("HMDInputDevice", void 0);

  return {
    setters: [function (_cocosInputTypesEventEnumJs) {
      InputEventType = _cocosInputTypesEventEnumJs.InputEventType;
    }, function (_cocosCoreEventEventTargetJs) {
      EventTarget = _cocosCoreEventEventTargetJs.EventTarget;
    }, function (_cocosInputTypesIndexJs) {
      EventHMD = _cocosInputTypesIndexJs.EventHMD;
    }, function (_inputSourceJs) {
      InputSourcePosition = _inputSourceJs.InputSourcePosition;
      InputSourceOrientation = _inputSourceJs.InputSourceOrientation;
    }, function (_cocosCoreMathIndexJs) {
      Vec3 = _cocosCoreMathIndexJs.Vec3;
      Quat = _cocosCoreMathIndexJs.Quat;
    }],
    execute: function () {
      (function (Pose) {
        Pose[Pose["VIEW_LEFT"] = 0] = "VIEW_LEFT";
        Pose[Pose["VIEW_RIGHT"] = 1] = "VIEW_RIGHT";
        Pose[Pose["HEAD_MIDDLE"] = 2] = "HEAD_MIDDLE";
      })(Pose || (Pose = {}));

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
          this._nativePoseState = {
            [Pose.VIEW_LEFT]: {
              position: Vec3.ZERO,
              orientation: Quat.IDENTITY
            },
            [Pose.VIEW_RIGHT]: {
              position: Vec3.ZERO,
              orientation: Quat.IDENTITY
            },
            [Pose.HEAD_MIDDLE]: {
              position: Vec3.ZERO,
              orientation: Quat.IDENTITY
            }
          };

          this._initInputSource();

          this._registerEvent();
        }

        _registerEvent() {
          jsb.onHMDPoseInput = infoList => {
            for (let i = 0; i < infoList.length; ++i) {
              const info = infoList[i];

              this._updateNativePoseState(info);
            }

            this._eventTarget.emit(InputEventType.HMD_POSE_INPUT, new EventHMD(InputEventType.HMD_POSE_INPUT, this));
          };
        }
        /**
         * @engineInternal
         */


        _on(eventType, callback, target) {
          this._eventTarget.on(eventType, callback, target);
        }

        _updateNativePoseState(info) {
          switch (info.code) {
            case 0:
              this._nativePoseState[Pose.VIEW_LEFT] = {
                position: new Vec3(info.x, info.y, info.z),
                orientation: new Quat(info.quaternionX, info.quaternionY, info.quaternionZ, info.quaternionW)
              };
              break;

            case 3:
              this._nativePoseState[Pose.VIEW_RIGHT] = {
                position: new Vec3(info.x, info.y, info.z),
                orientation: new Quat(info.quaternionX, info.quaternionY, info.quaternionZ, info.quaternionW)
              };
              break;

            case 6:
              this._nativePoseState[Pose.HEAD_MIDDLE] = {
                position: new Vec3(info.x, info.y, info.z),
                orientation: new Quat(info.quaternionX, info.quaternionY, info.quaternionZ, info.quaternionW)
              };
              break;

            default:
              break;
          }
        }

        _initInputSource() {
          this._viewLeftPosition = new InputSourcePosition();

          this._viewLeftPosition.getValue = () => this._nativePoseState[Pose.VIEW_LEFT].position;

          this._viewLeftOrientation = new InputSourceOrientation();

          this._viewLeftOrientation.getValue = () => this._nativePoseState[Pose.VIEW_LEFT].orientation;

          this._viewRightPosition = new InputSourcePosition();

          this._viewRightPosition.getValue = () => this._nativePoseState[Pose.VIEW_RIGHT].position;

          this._viewRightOrientation = new InputSourceOrientation();

          this._viewRightOrientation.getValue = () => this._nativePoseState[Pose.VIEW_RIGHT].orientation;

          this._headMiddlePosition = new InputSourcePosition();

          this._headMiddlePosition.getValue = () => this._nativePoseState[Pose.HEAD_MIDDLE].position;

          this._headMiddleOrientation = new InputSourceOrientation();

          this._headMiddleOrientation.getValue = () => this._nativePoseState[Pose.HEAD_MIDDLE].orientation;
        }

      });
    }
  };
});