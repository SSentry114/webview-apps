System.register("q-bundled:///fs/pal/input/minigame/touch-input.js", ["pal/minigame", "pal/screen-adapter", "pal/system-info", "../../../../virtual/internal%253Aconstants.js", "../../../cocos/core/math/index.js", "../../../cocos/core/event/index.js", "../../../cocos/input/types/index.js", "../touch-manager.js", "../../../cocos/core/platform/macro.js", "../../../cocos/input/types/event-enum.js", "../../system-info/enum-type/index.js"], function (_export, _context) {
  "use strict";

  var minigame, screenAdapter, systemInfo, ALIPAY, Vec2, EventTarget, EventTouch, touchManager, macro, InputEventType, Feature, TouchInputSource;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      _export("TouchInputSource", TouchInputSource = /*#__PURE__*/function () {
        function TouchInputSource() {
          this._eventTarget = new EventTarget();

          if (systemInfo.hasFeature(Feature.INPUT_TOUCH)) {
            this._registerEvent();
          }
        }

        var _proto = TouchInputSource.prototype;

        _proto._registerEvent = function _registerEvent() {
          minigame.onTouchStart(this._createCallback(InputEventType.TOUCH_START));
          minigame.onTouchMove(this._createCallback(InputEventType.TOUCH_MOVE));
          minigame.onTouchEnd(this._createCallback(InputEventType.TOUCH_END));
          minigame.onTouchCancel(this._createCallback(InputEventType.TOUCH_CANCEL));
        };

        _proto._createCallback = function _createCallback(eventType) {
          var _this = this;

          return function (event) {
            var handleTouches = [];
            var windowSize = screenAdapter.windowSize;
            var dpr = screenAdapter.devicePixelRatio;
            var length = event.changedTouches.length;

            for (var i = 0; i < length; ++i) {
              var changedTouch = event.changedTouches[i];
              var touchID = changedTouch.identifier;

              if (touchID === null) {
                continue;
              }

              var location = _this._getLocation(changedTouch, windowSize, dpr);

              var touch = touchManager.getTouch(touchID, location.x, location.y);

              if (!touch) {
                continue;
              }

              if (eventType === InputEventType.TOUCH_END || eventType === InputEventType.TOUCH_CANCEL) {
                touchManager.releaseTouch(touchID);
              }

              handleTouches.push(touch);
            }

            if (handleTouches.length > 0) {
              var eventTouch = new EventTouch(handleTouches, false, eventType, macro.ENABLE_MULTI_TOUCH ? touchManager.getAllTouches() : handleTouches);

              _this._eventTarget.emit(eventType, eventTouch);
            }
          };
        };

        _proto._getLocation = function _getLocation(touch, windowSize, dpr) {
          if (ALIPAY) {
            // HACK: on Alipay platform,
            // the physical screen size = systemInfo.screenSize * dpr = systemInfo.windowSize * dpr * dpr
            // the location of touch event is in systemInfo.windowSize space
            var _x = touch.clientX * dpr * dpr;

            var _y = windowSize.height - touch.clientY * dpr * dpr;

            return new Vec2(_x, _y);
          }

          var x = touch.clientX * dpr;
          var y = windowSize.height - touch.clientY * dpr;
          return new Vec2(x, y);
        };

        _proto.on = function on(eventType, callback, target) {
          this._eventTarget.on(eventType, callback, target);
        };

        return TouchInputSource;
      }());
    }
  };
});