System.register("q-bundled:///fs/pal/input/native/touch-input.js", ["pal/screen-adapter", "../../../cocos/core/math/index.js", "../../../cocos/core/event/index.js", "../../../cocos/input/types/index.js", "../touch-manager.js", "../../../cocos/core/platform/macro.js", "../../../cocos/input/types/event-enum.js"], function (_export, _context) {
  "use strict";

  var screenAdapter, Vec2, EventTarget, EventTouch, touchManager, macro, InputEventType, TouchInputSource;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("TouchInputSource", void 0);

  return {
    setters: [function (_palScreenAdapter) {
      screenAdapter = _palScreenAdapter.screenAdapter;
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
    }],
    execute: function () {
      _export("TouchInputSource", TouchInputSource = class TouchInputSource {
        constructor() {
          this._eventTarget = new EventTarget();
          this._windowManager = void 0;

          this._registerEvent();

          this._windowManager = jsb.ISystemWindowManager.getInstance();
        }

        _registerEvent() {
          jsb.onTouchStart = this._createCallback(InputEventType.TOUCH_START);
          jsb.onTouchMove = this._createCallback(InputEventType.TOUCH_MOVE);
          jsb.onTouchEnd = this._createCallback(InputEventType.TOUCH_END);
          jsb.onTouchCancel = this._createCallback(InputEventType.TOUCH_CANCEL);
        }

        _createCallback(eventType) {
          return (changedTouches, windowId) => {
            const handleTouches = [];
            const length = changedTouches.length;

            const windowSize = this._windowManager.getWindow(windowId).getViewSize();

            for (let i = 0; i < length; ++i) {
              const changedTouch = changedTouches[i];
              const touchID = changedTouch.identifier;

              if (touchID === null) {
                continue;
              }

              const location = this._getLocation(changedTouch, windowSize);

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
              eventTouch.windowId = windowId;

              this._eventTarget.emit(eventType, eventTouch);
            }
          };
        }

        _getLocation(touch, windowSize) {
          const dpr = screenAdapter.devicePixelRatio;
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