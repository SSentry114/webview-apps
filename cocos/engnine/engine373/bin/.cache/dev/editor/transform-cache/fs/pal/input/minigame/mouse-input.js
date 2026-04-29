System.register("q-bundled:///fs/pal/input/minigame/mouse-input.js", ["pal/minigame", "pal/screen-adapter", "pal/system-info", "../../../cocos/core/math/index.js", "../../../cocos/core/event/index.js", "../../../cocos/input/types/index.js", "../../../cocos/input/types/event-enum.js", "../../system-info/enum-type/index.js"], function (_export, _context) {
  "use strict";

  var minigame, screenAdapter, systemInfo, Vec2, EventTarget, EventMouse, InputEventType, Feature, MouseInputSource;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("MouseInputSource", void 0);

  return {
    setters: [function (_palMinigame) {
      minigame = _palMinigame.minigame;
    }, function (_palScreenAdapter) {
      screenAdapter = _palScreenAdapter.screenAdapter;
    }, function (_palSystemInfo) {
      systemInfo = _palSystemInfo.systemInfo;
    }, function (_cocosCoreMathIndexJs) {
      Vec2 = _cocosCoreMathIndexJs.Vec2;
    }, function (_cocosCoreEventIndexJs) {
      EventTarget = _cocosCoreEventIndexJs.EventTarget;
    }, function (_cocosInputTypesIndexJs) {
      EventMouse = _cocosInputTypesIndexJs.EventMouse;
    }, function (_cocosInputTypesEventEnumJs) {
      InputEventType = _cocosInputTypesEventEnumJs.InputEventType;
    }, function (_systemInfoEnumTypeIndexJs) {
      Feature = _systemInfoEnumTypeIndexJs.Feature;
    }],
    execute: function () {
      _export("MouseInputSource", MouseInputSource = class MouseInputSource {
        constructor() {
          this._eventTarget = new EventTarget();
          this._isPressed = false;
          this._preMousePos = new Vec2();

          if (systemInfo.hasFeature(Feature.EVENT_MOUSE)) {
            this._registerEvent();
          }
        }

        _getLocation(event) {
          const windowSize = screenAdapter.windowSize;
          const dpr = screenAdapter.devicePixelRatio;
          const x = event.x * dpr;
          const y = windowSize.height - event.y * dpr;
          return new Vec2(x, y);
        }

        _registerEvent() {
          var _minigame$wx, _minigame$wx$onMouseD, _minigame$wx2, _minigame$wx2$onMouse, _minigame$wx3, _minigame$wx3$onMouse, _minigame$wx4, _minigame$wx4$onWheel;

          (_minigame$wx = minigame.wx) === null || _minigame$wx === void 0 ? void 0 : (_minigame$wx$onMouseD = _minigame$wx.onMouseDown) === null || _minigame$wx$onMouseD === void 0 ? void 0 : _minigame$wx$onMouseD.call(_minigame$wx, this._createCallback(InputEventType.MOUSE_DOWN));
          (_minigame$wx2 = minigame.wx) === null || _minigame$wx2 === void 0 ? void 0 : (_minigame$wx2$onMouse = _minigame$wx2.onMouseMove) === null || _minigame$wx2$onMouse === void 0 ? void 0 : _minigame$wx2$onMouse.call(_minigame$wx2, this._createCallback(InputEventType.MOUSE_MOVE));
          (_minigame$wx3 = minigame.wx) === null || _minigame$wx3 === void 0 ? void 0 : (_minigame$wx3$onMouse = _minigame$wx3.onMouseUp) === null || _minigame$wx3$onMouse === void 0 ? void 0 : _minigame$wx3$onMouse.call(_minigame$wx3, this._createCallback(InputEventType.MOUSE_UP));
          (_minigame$wx4 = minigame.wx) === null || _minigame$wx4 === void 0 ? void 0 : (_minigame$wx4$onWheel = _minigame$wx4.onWheel) === null || _minigame$wx4$onWheel === void 0 ? void 0 : _minigame$wx4$onWheel.call(_minigame$wx4, this._handleMouseWheel.bind(this));
        }

        _createCallback(eventType) {
          return event => {
            const location = this._getLocation(event);

            let button = event.button;

            switch (eventType) {
              case InputEventType.MOUSE_DOWN:
                this._isPressed = true;
                break;

              case InputEventType.MOUSE_UP:
                this._isPressed = false;
                break;

              case InputEventType.MOUSE_MOVE:
                if (!this._isPressed) {
                  button = EventMouse.BUTTON_MISSING;
                }

                break;

              default:
                break;
            }

            const eventMouse = new EventMouse(eventType, false, this._preMousePos);
            eventMouse.setLocation(location.x, location.y);
            eventMouse.setButton(button);
            eventMouse.movementX = location.x - this._preMousePos.x;
            eventMouse.movementY = this._preMousePos.y - location.y; // update previous mouse position.

            this._preMousePos.set(location.x, location.y);

            this._eventTarget.emit(eventType, eventMouse);
          };
        }

        _handleMouseWheel(event) {
          const eventType = InputEventType.MOUSE_WHEEL;

          const location = this._getLocation(event);

          const button = event.button;
          const eventMouse = new EventMouse(eventType, false, this._preMousePos);
          eventMouse.setLocation(location.x, location.y);
          eventMouse.setButton(button);
          eventMouse.movementX = location.x - this._preMousePos.x;
          eventMouse.movementY = this._preMousePos.y - location.y;
          eventMouse.setScrollData(event.deltaX, -event.deltaY); // update previous mouse position.

          this._preMousePos.set(location.x, location.y);

          this._eventTarget.emit(InputEventType.MOUSE_WHEEL, eventMouse);
        }

        on(eventType, callback, target) {
          this._eventTarget.on(eventType, callback, target);
        }

      });
    }
  };
});