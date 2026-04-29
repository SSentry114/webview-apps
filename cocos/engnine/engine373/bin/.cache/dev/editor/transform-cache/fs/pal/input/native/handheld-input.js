System.register("q-bundled:///fs/pal/input/native/handheld-input.js", ["../../../cocos/input/types/event-enum.js", "../../../cocos/core/event/event-target.js", "../../../cocos/input/types/index.js", "../input-source.js", "../../../cocos/core/math/index.js"], function (_export, _context) {
  "use strict";

  var InputEventType, EventTarget, EventHandheld, InputSourcePosition, InputSourceOrientation, Vec3, Quat, HandheldInputDevice, Pose;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("HandheldInputDevice", void 0);

  return {
    setters: [function (_cocosInputTypesEventEnumJs) {
      InputEventType = _cocosInputTypesEventEnumJs.InputEventType;
    }, function (_cocosCoreEventEventTargetJs) {
      EventTarget = _cocosCoreEventEventTargetJs.EventTarget;
    }, function (_cocosInputTypesIndexJs) {
      EventHandheld = _cocosInputTypesIndexJs.EventHandheld;
    }, function (_inputSourceJs) {
      InputSourcePosition = _inputSourceJs.InputSourcePosition;
      InputSourceOrientation = _inputSourceJs.InputSourceOrientation;
    }, function (_cocosCoreMathIndexJs) {
      Vec3 = _cocosCoreMathIndexJs.Vec3;
      Quat = _cocosCoreMathIndexJs.Quat;
    }],
    execute: function () {
      (function (Pose) {
        Pose[Pose["AR_MOBILE"] = 0] = "AR_MOBILE";
      })(Pose || (Pose = {}));

      _export("HandheldInputDevice", HandheldInputDevice = class HandheldInputDevice {
        get handheldPosition() {
          return this._handheldPosition;
        }

        get handheldOrientation() {
          return this._handheldOrientation;
        }

        constructor() {
          this._eventTarget = new EventTarget();
          this._nativePoseState = {
            [Pose.AR_MOBILE]: {
              position: Vec3.ZERO,
              orientation: Quat.IDENTITY
            }
          };

          this._initInputSource();

          this._registerEvent();
        }

        _registerEvent() {
          jsb.onHandheldPoseInput = infoList => {
            for (let i = 0; i < infoList.length; ++i) {
              const info = infoList[i];

              this._updateNativePoseState(info);
            }

            this._eventTarget.emit(InputEventType.HANDHELD_POSE_INPUT, new EventHandheld(InputEventType.HANDHELD_POSE_INPUT, this));
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
            case 7:
              this._nativePoseState[Pose.AR_MOBILE] = {
                position: new Vec3(info.x, info.y, info.z),
                orientation: new Quat(info.quaternionX, info.quaternionY, info.quaternionZ, info.quaternionW)
              };
              break;

            default:
              break;
          }
        }

        _initInputSource() {
          this._handheldPosition = new InputSourcePosition();

          this._handheldPosition.getValue = () => this._nativePoseState[Pose.AR_MOBILE].position;

          this._handheldOrientation = new InputSourceOrientation();

          this._handheldOrientation.getValue = () => this._nativePoseState[Pose.AR_MOBILE].orientation;
        }

      });
    }
  };
});