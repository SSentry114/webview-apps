System.register("q-bundled:///fs/pal/input/web/hmd-input.js", ["../../../cocos/input/types/event-enum.js", "../../../cocos/core/event/event-target.js", "../../../cocos/input/types/index.js", "../input-source.js", "../../../cocos/core/math/index.js", "../../../predefine.js"], function (_export, _context) {
  "use strict";

  var InputEventType, EventTarget, EventHMD, InputSourcePosition, InputSourceOrientation, Vec3, Quat, legacyCC, Pose, HMDInputDevice;

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
    }, function (_predefineJs) {
      legacyCC = _predefineJs.default;
    }],
    execute: function () {
      (function (Pose) {
        Pose[Pose["VIEW_LEFT"] = 0] = "VIEW_LEFT";
        Pose[Pose["VIEW_RIGHT"] = 3] = "VIEW_RIGHT";
        Pose[Pose["HEAD_MIDDLE"] = 6] = "HEAD_MIDDLE";
      })(Pose || (Pose = {}));

      _export("HMDInputDevice", HMDInputDevice = /*#__PURE__*/function () {
        function HMDInputDevice() {
          var _this$_webPoseState;

          this._eventTarget = new EventTarget();
          this._intervalId = -1;
          this._webPoseState = (_this$_webPoseState = {}, _this$_webPoseState[Pose.VIEW_LEFT] = {
            position: Vec3.ZERO,
            orientation: Quat.IDENTITY
          }, _this$_webPoseState[Pose.VIEW_RIGHT] = {
            position: Vec3.ZERO,
            orientation: Quat.IDENTITY
          }, _this$_webPoseState[Pose.HEAD_MIDDLE] = {
            position: Vec3.ZERO,
            orientation: Quat.IDENTITY
          }, _this$_webPoseState);

          this._initInputSource();

          this._registerEvent();
        }

        var _proto = HMDInputDevice.prototype;

        _proto._ensureDirectorDefined = function _ensureDirectorDefined() {
          var _this = this;

          return new Promise(function (resolve) {
            _this._intervalId = setInterval(function () {
              if (legacyCC.director && legacyCC.Director) {
                clearInterval(_this._intervalId);
                _this._intervalId = -1;
                resolve();
              }
            }, 50);
          });
        };

        _proto._registerEvent = function _registerEvent() {
          var _this2 = this;

          this._ensureDirectorDefined().then(function () {
            legacyCC.director.on(legacyCC.Director.EVENT_BEGIN_FRAME, _this2._scanHmd, _this2);
          })["catch"](function (e) {});
        };

        _proto._scanHmd = function _scanHmd() {
          var _globalThis$__globalX;

          var infoList = (_globalThis$__globalX = globalThis.__globalXR) === null || _globalThis$__globalX === void 0 ? void 0 : _globalThis$__globalX.webxrHmdPoseInfos;

          if (!infoList) {
            return;
          }

          for (var i = 0; i < infoList.length; ++i) {
            var info = infoList[i];

            this._updateWebPoseState(info);
          }

          this._eventTarget.emit(InputEventType.HMD_POSE_INPUT, new EventHMD(InputEventType.HMD_POSE_INPUT, this));
        }
        /**
         * @engineInternal
         */
        ;

        _proto._on = function _on(eventType, callback, target) {
          this._eventTarget.on(eventType, callback, target);
        };

        _proto._updateWebPoseState = function _updateWebPoseState(info) {
          if (info.code !== Pose.VIEW_LEFT && info.code !== Pose.VIEW_RIGHT && info.code !== Pose.HEAD_MIDDLE) {
            return;
          }

          this._webPoseState[info.code] = {
            position: new Vec3(info.position.x, info.position.y, info.position.z),
            orientation: new Quat(info.orientation.x, info.orientation.y, info.orientation.z, info.orientation.w)
          };
        };

        _proto._initInputSource = function _initInputSource() {
          var _this3 = this;

          this._viewLeftPosition = new InputSourcePosition();

          this._viewLeftPosition.getValue = function () {
            return _this3._webPoseState[Pose.VIEW_LEFT].position;
          };

          this._viewLeftOrientation = new InputSourceOrientation();

          this._viewLeftOrientation.getValue = function () {
            return _this3._webPoseState[Pose.VIEW_LEFT].orientation;
          };

          this._viewRightPosition = new InputSourcePosition();

          this._viewRightPosition.getValue = function () {
            return _this3._webPoseState[Pose.VIEW_RIGHT].position;
          };

          this._viewRightOrientation = new InputSourceOrientation();

          this._viewRightOrientation.getValue = function () {
            return _this3._webPoseState[Pose.VIEW_RIGHT].orientation;
          };

          this._headMiddlePosition = new InputSourcePosition();

          this._headMiddlePosition.getValue = function () {
            return _this3._webPoseState[Pose.HEAD_MIDDLE].position;
          };

          this._headMiddleOrientation = new InputSourceOrientation();

          this._headMiddleOrientation.getValue = function () {
            return _this3._webPoseState[Pose.HEAD_MIDDLE].orientation;
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