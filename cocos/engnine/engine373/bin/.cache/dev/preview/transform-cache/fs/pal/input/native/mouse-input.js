System.register("q-bundled:///fs/pal/input/native/mouse-input.js", ["pal/screen-adapter", "../../../cocos/input/types/index.js", "../../../cocos/core/event/index.js", "../../../cocos/core/math/index.js", "../../../cocos/input/types/event-enum.js"], function (_export, _context) {
  "use strict";

  var screenAdapter, EventMouse, EventTarget, Vec2, InputEventType, MouseInputSource;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_palScreenAdapter) {
      screenAdapter = _palScreenAdapter.screenAdapter;
    }, function (_cocosInputTypesIndexJs) {
      EventMouse = _cocosInputTypesIndexJs.EventMouse;
    }, function (_cocosCoreEventIndexJs) {
      EventTarget = _cocosCoreEventIndexJs.EventTarget;
    }, function (_cocosCoreMathIndexJs) {
      Vec2 = _cocosCoreMathIndexJs.Vec2;
    }, function (_cocosInputTypesEventEnumJs) {
      InputEventType = _cocosInputTypesEventEnumJs.InputEventType;
    }],
    execute: function () {
      _export("MouseInputSource", MouseInputSource = /*#__PURE__*/function () {
        function MouseInputSource() {
          this._eventTarget = new EventTarget();
          this._preMousePos = new Vec2();
          this._isPressed = false;
          this._windowManager = void 0;
          this._pointLocked = false;
          this._handleMouseDown = void 0;
          this._handleMouseMove = void 0;
          this._handleMouseUp = void 0;
          this._boundedHandleMouseWheel = void 0;
          this._handleMouseDown = this._createCallback(InputEventType.MOUSE_DOWN);
          this._handleMouseMove = this._createCallback(InputEventType.MOUSE_MOVE);
          this._handleMouseUp = this._createCallback(InputEventType.MOUSE_UP);
          this._boundedHandleMouseWheel = this._handleMouseWheel.bind(this);

          this._registerEvent();

          this._windowManager = jsb.ISystemWindowManager.getInstance();
        }

        var _proto = MouseInputSource.prototype;

        _proto.dispatchMouseDownEvent = function dispatchMouseDownEvent(nativeMouseEvent) {
          this._handleMouseDown(nativeMouseEvent);
        };

        _proto.dispatchMouseMoveEvent = function dispatchMouseMoveEvent(nativeMouseEvent) {
          this._handleMouseMove(nativeMouseEvent);
        };

        _proto.dispatchMouseUpEvent = function dispatchMouseUpEvent(nativeMouseEvent) {
          this._handleMouseUp(nativeMouseEvent);
        };

        _proto.dispatchScrollEvent = function dispatchScrollEvent(nativeMouseEvent) {
          this._boundedHandleMouseWheel(nativeMouseEvent);
        };

        _proto._getLocation = function _getLocation(event) {
          var window = this._windowManager.getWindow(event.windowId);

          var windowSize = window.getViewSize();
          var dpr = screenAdapter.devicePixelRatio;
          var x = event.x * dpr;
          var y = windowSize.height - event.y * dpr;
          return new Vec2(x, y);
        };

        _proto._registerEvent = function _registerEvent() {
          var _this = this;

          jsb.onMouseDown = this._handleMouseDown;
          jsb.onMouseMove = this._handleMouseMove;
          jsb.onMouseUp = this._handleMouseUp;
          jsb.onMouseWheel = this._boundedHandleMouseWheel;

          jsb.onPointerlockChange = function (value) {
            _this._pointLocked = value;
          };
        };

        _proto._createCallback = function _createCallback(eventType) {
          var _this2 = this;

          return function (mouseEvent) {
            var location = _this2._getLocation(mouseEvent);

            var button = mouseEvent.button;

            switch (eventType) {
              case InputEventType.MOUSE_DOWN:
                _this2._isPressed = true;
                break;

              case InputEventType.MOUSE_UP:
                _this2._isPressed = false;
                break;

              case InputEventType.MOUSE_MOVE:
                if (!_this2._isPressed) {
                  button = EventMouse.BUTTON_MISSING;
                }

                break;

              default:
                break;
            }

            var eventMouse = new EventMouse(eventType, false, _this2._preMousePos, mouseEvent.windowId);
            eventMouse.setLocation(location.x, location.y);
            eventMouse.setButton(button);
            var dpr = screenAdapter.devicePixelRatio;
            eventMouse.movementX = typeof mouseEvent.xDelta === 'undefined' ? 0 : mouseEvent.xDelta * dpr;
            eventMouse.movementY = typeof mouseEvent.yDelta === 'undefined' ? 0 : mouseEvent.yDelta * dpr; // update previous mouse position.

            _this2._preMousePos.set(location.x, location.y);

            _this2._eventTarget.emit(eventType, eventMouse);
          };
        };

        _proto._handleMouseWheel = function _handleMouseWheel(mouseEvent) {
          var eventType = InputEventType.MOUSE_WHEEL;

          var location = this._getLocation(mouseEvent);

          var button = mouseEvent.button;
          var eventMouse = new EventMouse(eventType, false, this._preMousePos, mouseEvent.windowId);
          eventMouse.setLocation(location.x, location.y);
          eventMouse.setButton(button);
          eventMouse.movementX = location.x - this._preMousePos.x;
          eventMouse.movementY = this._preMousePos.y - location.y;
          var matchStandardFactor = 120;
          eventMouse.setScrollData(mouseEvent.wheelDeltaX * matchStandardFactor, mouseEvent.wheelDeltaY * matchStandardFactor); // update previous mouse position.

          this._preMousePos.set(location.x, location.y);

          this._eventTarget.emit(eventType, eventMouse);
        };

        _proto.on = function on(eventType, callback, target) {
          this._eventTarget.on(eventType, callback, target);
        };

        return MouseInputSource;
      }());
    }
  };
});