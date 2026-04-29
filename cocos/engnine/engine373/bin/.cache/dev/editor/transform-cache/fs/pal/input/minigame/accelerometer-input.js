System.register("q-bundled:///fs/pal/input/minigame/accelerometer-input.js", ["pal/minigame", "../../../cocos/input/types/index.js", "../../../cocos/core/event/index.js", "../../../cocos/input/types/event-enum.js"], function (_export, _context) {
  "use strict";

  var minigame, Acceleration, EventAcceleration, EventTarget, InputEventType, AccelerometerInputSource;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("AccelerometerInputSource", void 0);

  return {
    setters: [function (_palMinigame) {
      minigame = _palMinigame.minigame;
    }, function (_cocosInputTypesIndexJs) {
      Acceleration = _cocosInputTypesIndexJs.Acceleration;
      EventAcceleration = _cocosInputTypesIndexJs.EventAcceleration;
    }, function (_cocosCoreEventIndexJs) {
      EventTarget = _cocosCoreEventIndexJs.EventTarget;
    }, function (_cocosInputTypesEventEnumJs) {
      InputEventType = _cocosInputTypesEventEnumJs.InputEventType;
    }],
    execute: function () {
      _export("AccelerometerInputSource", AccelerometerInputSource = class AccelerometerInputSource {
        constructor() {
          this._isStarted = false;
          this._accelMode = 'normal';
          this._eventTarget = new EventTarget();
          this._didAccelerateFunc = void 0;
          this._didAccelerateFunc = this._didAccelerate.bind(this);
        }

        _registerEvent() {
          minigame.onAccelerometerChange(this._didAccelerateFunc);
        }

        _unregisterEvent() {
          minigame.offAccelerometerChange(this._didAccelerateFunc);
        }

        _didAccelerate(event) {
          const timestamp = performance.now();
          const acceleration = new Acceleration(event.x, event.y, event.z, timestamp);
          const eventAcceleration = new EventAcceleration(acceleration);

          this._eventTarget.emit(InputEventType.DEVICEMOTION, eventAcceleration);
        }

        start() {
          this._registerEvent();

          minigame.startAccelerometer({
            interval: this._accelMode,
            success: () => {
              this._isStarted = true;
            }
          });
        }

        stop() {
          minigame.stopAccelerometer({
            success: () => {
              this._isStarted = false;
            },

            fail() {
              console.error('failed to stop accelerometer');
            }

          });

          this._unregisterEvent();
        }

        setInterval(intervalInMileseconds) {
          // reference: https://developers.weixin.qq.com/minigame/dev/api/device/accelerometer/wx.startAccelerometer.html
          if (intervalInMileseconds >= 200) {
            this._accelMode = 'normal';
          } else if (intervalInMileseconds >= 60) {
            this._accelMode = 'ui';
          } else {
            this._accelMode = 'game';
          }

          if (this._isStarted) {
            // restart accelerometer
            this.stop();
            this.start();
          }
        }

        on(eventType, callback, target) {
          this._eventTarget.on(eventType, callback, target);
        }

      });
    }
  };
});