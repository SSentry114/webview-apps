System.register("q-bundled:///fs/pal/input/minigame/touch-input.js", ["pal/minigame", "pal/screen-adapter", "pal/system-info", "../../../../virtual/internal%253Aconstants.js", "../../../cocos/core/math/index.js", "../../../cocos/core/event/index.js", "../../../cocos/input/types/index.js", "../touch-manager.js", "../../../cocos/core/platform/macro.js", "../../../cocos/input/types/event-enum.js", "../../system-info/enum-type/index.js"], function (_export, _context) {
  "use strict";

  var minigame, screenAdapter, systemInfo, ALIPAY, Vec2, EventTarget, EventTouch, touchManager, macro, InputEventType, Feature, TouchInputSource;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("TouchInputSource", void 0);

  return {
    setters: [function (_palMinigame) {
      minigame = _palMinigame.minigame;
    }, function (_palScreenAdapter) {
      screenAdapter = _palScreenAdapter.screenAdapter;
    }, function (_palSystemInfo) {
      systemInfo = _palSystemInfo.systemInfo;
    }, function (_virtualInternal253AconstantsJs) {
      ALIPAY = _virtualInternal253AconstantsJs.ALIPAY;
    }, function (_cocosCoreMathIndexJs) {
      Vec2 = _cocosCoreMathIndexJs.Vec2;
    }, function (_cocosCoreEventIndexJs) {
      EventTarget = _cocosCoreEventIndexJs.EventTarget;
    }, function (_cocosInputTypesIndexJs) {
      EventTouch = _cocosInputTypesIndexJs.EventTouch;
    }, function (_touchManagerJs) {
      touchManager = _touchManagerJs.touchManager;
    }, function (_cocosCorePlatformMacroJs) {
      macro = _cocosCorePlatformMacroJs.macro;
    }, function (_cocosInputTypesEventEnumJs) {
      InputEventType = _cocosInputTypesEventEnumJs.InputEventType;
    }, function (_systemInfoEnumTypeIndexJs) {
      Feature = _systemInfoEnumTypeIndexJs.Feature;
    }],
    execute: function () {
      _export("TouchInputSource", TouchInputSource = class TouchInputSource {
        constructor() {
          this._eventTarget = new EventTarget();

          if (systemInfo.hasFeature(Feature.INPUT_TOUCH)) {
            this._registerEvent();
          }
        }

        _registerEvent() {
          minigame.onTouchStart(this._createCallback(InputEventType.TOUCH_START));
          minigame.onTouchMove(this._createCallback(InputEventType.TOUCH_MOVE));
          minigame.onTouchEnd(this._createCallback(InputEventType.TOUCH_END));
          minigame.onTouchCancel(this._createCallback(InputEventType.TOUCH_CANCEL));
        }

        _createCallback(eventType) {
          return event => {
            const handleTouches = [];
            const windowSize = screenAdapter.windowSize;
            const dpr = screenAdapter.devicePixelRatio;
            const length = event.changedTouches.length;

            for (let i = 0; i < length; ++i) {
              const changedTouch = event.changedTouches[i];
              const touchID = changedTouch.identifier;

              if (touchID === null) {
                continue;
              }

              const location = this._getLocation(changedTouch, windowSize, dpr);

              const touch = touchManager.getTouch(touchID, location.x, location.y);

              if (!touch) {
                continue;
              }

              if (eventType === InputEventType.TOUCH_END || eventType === InputEventType.TOUCH_CANCEL) {
                touchManager.releaseTouch(touchID);
              }

              handleTouches.push(touch);
            }

            if (handleTouches.length > 0) {
              const eventTouch = new EventTouch(handleTouches, false, eventType, macro.ENABLE_MULTI_TOUCH ? touchManager.getAllTouches() : handleTouches);

              this._eventTarget.emit(eventType, eventTouch);
            }
          };
        }

        _getLocation(touch, windowSize, dpr) {
          if (ALIPAY) {
            // HACK: on Alipay platform,
            // the physical screen size = systemInfo.screenSize * dpr = systemInfo.windowSize * dpr * dpr
            // the location of touch event is in systemInfo.windowSize space
            const x = touch.clientX * dpr * dpr;
            const y = windowSize.height - touch.clientY * dpr * dpr;
            return new Vec2(x, y);
          }

          const x = touch.clientX * dpr;
          const y = windowSize.height - touch.clientY * dpr;
          return new Vec2(x, y);
        }

        on(eventType, callback, target) {
          this._eventTarget.on(eventType, callback, target);
        }

      });
    }
  };
});