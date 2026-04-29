System.register("q-bundled:///fs/pal/input/native/accelerometer-input.js", ["pal/system-info", "pal/screen-adapter", "../../../cocos/core/event/index.js", "../../system-info/enum-type/index.js", "../../screen-adapter/enum-type/index.js", "../../../cocos/input/types/index.js", "../../../cocos/input/types/event-enum.js"], function (_export, _context) {
  "use strict";

  var systemInfo, screenAdapter, EventTarget, OS, Orientation, Acceleration, EventAcceleration, InputEventType, AccelerometerInputSource;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("AccelerometerInputSource", void 0);

  return {
    setters: [function (_palSystemInfo) {
      systemInfo = _palSystemInfo.systemInfo;
    }, function (_palScreenAdapter) {
      screenAdapter = _palScreenAdapter.screenAdapter;
    }, function (_cocosCoreEventIndexJs) {
      EventTarget = _cocosCoreEventIndexJs.EventTarget;
    }, function (_systemInfoEnumTypeIndexJs) {
      OS = _systemInfoEnumTypeIndexJs.OS;
    }, function (_screenAdapterEnumTypeIndexJs) {
      Orientation = _screenAdapterEnumTypeIndexJs.Orientation;
    }, function (_cocosInputTypesIndexJs) {
      Acceleration = _cocosInputTypesIndexJs.Acceleration;
      EventAcceleration = _cocosInputTypesIndexJs.EventAcceleration;
    }, function (_cocosInputTypesEventEnumJs) {
      InputEventType = _cocosInputTypesEventEnumJs.InputEventType;
    }],
    execute: function () {
      _export("AccelerometerInputSource", AccelerometerInputSource = class AccelerometerInputSource {
        constructor() {
          this._intervalInSeconds = 0.2;
          this._intervalId = void 0;
          this._isEnabled = false;
          this._eventTarget = new EventTarget();
          this._didAccelerateFunc = void 0;
          this._didAccelerateFunc = this._didAccelerate.bind(this);
        }

        _didAccelerate() {
          const deviceMotionValue = jsb.device.getDeviceMotionValue();
          let x = deviceMotionValue[3] * 0.1;
          let y = deviceMotionValue[4] * 0.1;
          const z = deviceMotionValue[5] * 0.1;
          const orientation = screenAdapter.orientation;
          const tmpX = x;

          if (orientation === Orientation.LANDSCAPE_RIGHT) {
            x = -y;
            y = tmpX;
          } else if (orientation === Orientation.LANDSCAPE_LEFT) {
            x = y;
            y = -tmpX;
          } else if (orientation === Orientation.PORTRAIT_UPSIDE_DOWN) {
            x = -x;
            y = -y;
          } // fix android acc values are opposite


          if (systemInfo.os === OS.ANDROID || systemInfo.os === OS.OHOS) {
            x = -x;
            y = -y;
          }

          const timestamp = performance.now();
          const acceleration = new Acceleration(x, y, z, timestamp);
          const eventAcceleration = new EventAcceleration(acceleration);

          this._eventTarget.emit(InputEventType.DEVICEMOTION, eventAcceleration);
        }

        start() {
          if (this._intervalId) {
            clearInterval(this._intervalId);
          }

          this._intervalId = setInterval(this._didAccelerateFunc, this._intervalInSeconds * 1000);
          jsb.device.setAccelerometerInterval(this._intervalInSeconds);
          jsb.device.setAccelerometerEnabled(true);
          this._isEnabled = true;
        }

        stop() {
          if (this._intervalId) {
            clearInterval(this._intervalId);
            this._intervalId = undefined;
          }

          jsb.device.setAccelerometerEnabled(false);
          this._isEnabled = false;
        }

        setInterval(intervalInMileseconds) {
          this._intervalInSeconds = intervalInMileseconds / 1000;
          jsb.device.setAccelerometerInterval(this._intervalInSeconds);

          if (this._isEnabled) {
            // restart accelerometer
            jsb.device.setAccelerometerEnabled(false);
            jsb.device.setAccelerometerEnabled(true);
          }
        }

        on(eventType, callback, target) {
          this._eventTarget.on(eventType, callback, target);
        }

      });
    }
  };
});