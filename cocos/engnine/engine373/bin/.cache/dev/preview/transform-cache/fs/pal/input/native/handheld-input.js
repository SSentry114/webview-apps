System.register("q-bundled:///fs/pal/input/native/handheld-input.js", ["../../../cocos/input/types/event-enum.js", "../../../cocos/core/event/event-target.js", "../../../cocos/input/types/index.js", "../input-source.js", "../../../cocos/core/math/index.js"], function (_export, _context) {
  "use strict";

  var InputEventType, EventTarget, EventHandheld, InputSourcePosition, InputSourceOrientation, Vec3, Quat, Pose, HandheldInputDevice;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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

      _export("HandheldInputDevice", HandheldInputDevice = /*#__PURE__*/function () {
        function HandheldInputDevice() {
          var _this$_nativePoseStat;

          this._eventTarget = new EventTarget();
          this._nativePoseState = (_this$_nativePoseStat = {}, _this$_nativePoseStat[Pose.AR_MOBILE] = {
            position: Vec3.ZERO,
            orientation: Quat.IDENTITY
          }, _this$_nativePoseStat);

          this._initInputSource();

          this._registerEvent();
        }

        var _proto = HandheldInputDevice.prototype;

        _proto._registerEvent = function _registerEvent() {
          var _this = this;

          jsb.onHandheldPoseInput = function (infoList) {
            for (var i = 0; i < infoList.length; ++i) {
              var info = infoList[i];

              _this._updateNativePoseState(info);
            }

            _this._eventTarget.emit(InputEventType.HANDHELD_POSE_INPUT, new EventHandheld(InputEventType.HANDHELD_POSE_INPUT, _this));
          };
        }
        /**
         * @engineInternal
         */
        ;

        _proto._on = function _on(eventType, callback, target) {
          this._eventTarget.on(eventType, callback, target);
        };

        _proto._updateNativePoseState = function _updateNativePoseState(info) {
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
        };

        _proto._initInputSource = function _initInputSource() {
          var _this2 = this;

          this._handheldPosition = new InputSourcePosition();

          this._handheldPosition.getValue = function () {
            return _this2._nativePoseState[Pose.AR_MOBILE].position;
          };

          this._handheldOrientation = new InputSourceOrientation();

          this._handheldOrientation.getValue = function () {
            return _this2._nativePoseState[Pose.AR_MOBILE].orientation;
          };
        };

        _createClass(HandheldInputDevice, [{
          key: "handheldPosition",
          get: function get() {
            return this._handheldPosition;
          }
        }, {
          key: "handheldOrientation",
          get: function get() {
            return this._handheldOrientation;
          }
        }]);

        return HandheldInputDevice;
      }());
    }
  };
});