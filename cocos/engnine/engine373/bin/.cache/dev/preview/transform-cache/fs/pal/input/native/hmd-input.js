System.register("q-bundled:///fs/pal/input/native/hmd-input.js", ["../../../cocos/input/types/event-enum.js", "../../../cocos/core/event/event-target.js", "../../../cocos/input/types/index.js", "../input-source.js", "../../../cocos/core/math/index.js"], function (_export, _context) {
  "use strict";

  var InputEventType, EventTarget, EventHMD, InputSourcePosition, InputSourceOrientation, Vec3, Quat, Pose, HMDInputDevice;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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

      _export("HMDInputDevice", HMDInputDevice = /*#__PURE__*/function () {
        function HMDInputDevice() {
          var _this$_nativePoseStat;

          this._eventTarget = new EventTarget();
          this._nativePoseState = (_this$_nativePoseStat = {}, _this$_nativePoseStat[Pose.VIEW_LEFT] = {
            position: Vec3.ZERO,
            orientation: Quat.IDENTITY
          }, _this$_nativePoseStat[Pose.VIEW_RIGHT] = {
            position: Vec3.ZERO,
            orientation: Quat.IDENTITY
          }, _this$_nativePoseStat[Pose.HEAD_MIDDLE] = {
            position: Vec3.ZERO,
            orientation: Quat.IDENTITY
          }, _this$_nativePoseStat);

          this._initInputSource();

          this._registerEvent();
        }

        var _proto = HMDInputDevice.prototype;

        _proto._registerEvent = function _registerEvent() {
          var _this = this;

          jsb.onHMDPoseInput = function (infoList) {
            for (var i = 0; i < infoList.length; ++i) {
              var info = infoList[i];

              _this._updateNativePoseState(info);
            }

            _this._eventTarget.emit(InputEventType.HMD_POSE_INPUT, new EventHMD(InputEventType.HMD_POSE_INPUT, _this));
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
        };

        _proto._initInputSource = function _initInputSource() {
          var _this2 = this;

          this._viewLeftPosition = new InputSourcePosition();

          this._viewLeftPosition.getValue = function () {
            return _this2._nativePoseState[Pose.VIEW_LEFT].position;
          };

          this._viewLeftOrientation = new InputSourceOrientation();

          this._viewLeftOrientation.getValue = function () {
            return _this2._nativePoseState[Pose.VIEW_LEFT].orientation;
          };

          this._viewRightPosition = new InputSourcePosition();

          this._viewRightPosition.getValue = function () {
            return _this2._nativePoseState[Pose.VIEW_RIGHT].position;
          };

          this._viewRightOrientation = new InputSourceOrientation();

          this._viewRightOrientation.getValue = function () {
            return _this2._nativePoseState[Pose.VIEW_RIGHT].orientation;
          };

          this._headMiddlePosition = new InputSourcePosition();

          this._headMiddlePosition.getValue = function () {
            return _this2._nativePoseState[Pose.HEAD_MIDDLE].position;
          };

          this._headMiddleOrientation = new InputSourceOrientation();

          this._headMiddleOrientation.getValue = function () {
            return _this2._nativePoseState[Pose.HEAD_MIDDLE].orientation;
          };
        };

        _createClass(HMDInputDevice, [{
          key: "viewLeftPosition",
          get: function get() {
            return this._viewLeftPosition;
          }
        }, {
          key: "viewLeftOrientation",
          get: function get() {
            return this._viewLeftOrientation;
          }
        }, {
          key: "viewRightPosition",
          get: function get() {
            return this._viewRightPosition;
          }
        }, {
          key: "viewRightOrientation",
          get: function get() {
            return this._viewRightOrientation;
          }
        }, {
          key: "headMiddlePosition",
          get: function get() {
            return this._headMiddlePosition;
          }
        }, {
          key: "headMiddleOrientation",
          get: function get() {
            return this._headMiddleOrientation;
          }
        }]);

        return HMDInputDevice;
      }());
    }
  };
});