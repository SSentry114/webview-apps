System.register("q-bundled:///fs/pal/input/native/keyboard-input.js", ["../../../cocos/input/types/index.js", "../../../cocos/core/event/index.js", "../../../cocos/input/types/event-enum.js"], function (_export, _context) {
  "use strict";

  var KeyCode, EventKeyboard, EventTarget, InputEventType, nativeKeyCode2KeyCode, KeyboardInputSource;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function getKeyCode(keyCode) {
    return nativeKeyCode2KeyCode[keyCode] || keyCode;
  }

  return {
    setters: [function (_cocosInputTypesIndexJs) {
      KeyCode = _cocosInputTypesIndexJs.KeyCode;
      EventKeyboard = _cocosInputTypesIndexJs.EventKeyboard;
    }, function (_cocosCoreEventIndexJs) {
      EventTarget = _cocosCoreEventIndexJs.EventTarget;
    }, function (_cocosInputTypesEventEnumJs) {
      InputEventType = _cocosInputTypesEventEnumJs.InputEventType;
    }],
    execute: function () {
      nativeKeyCode2KeyCode = {
        12: KeyCode.NUM_LOCK,
        10048: KeyCode.NUM_0,
        10049: KeyCode.NUM_1,
        10050: KeyCode.NUM_2,
        10051: KeyCode.NUM_3,
        10052: KeyCode.NUM_4,
        10053: KeyCode.NUM_5,
        10054: KeyCode.NUM_6,
        10055: KeyCode.NUM_7,
        10056: KeyCode.NUM_8,
        10057: KeyCode.NUM_9,
        20013: KeyCode.NUM_ENTER,
        20016: KeyCode.SHIFT_RIGHT,
        20017: KeyCode.CTRL_RIGHT,
        20018: KeyCode.ALT_RIGHT
      };

      _export("KeyboardInputSource", KeyboardInputSource = /*#__PURE__*/function () {
        // On native platform, KeyboardEvent.repeat is always false, so we need a map to manage the key state.
        function KeyboardInputSource() {
          var _this = this;

          this._eventTarget = new EventTarget();
          this._keyStateMap = {};
          this._handleKeyboardDown = void 0;
          this._handleKeyboardUp = void 0;

          this._handleKeyboardDown = function (event) {
            var keyCode = getKeyCode(event.keyCode);

            if (!_this._keyStateMap[keyCode]) {
              var eventKeyDown = _this._getInputEvent(event, InputEventType.KEY_DOWN);

              _this._eventTarget.emit(InputEventType.KEY_DOWN, eventKeyDown);
            } else {
              var eventKeyPressing = _this._getInputEvent(event, InputEventType.KEY_PRESSING);

              _this._eventTarget.emit(InputEventType.KEY_PRESSING, eventKeyPressing);
            }

            _this._keyStateMap[keyCode] = true;
          };

          this._handleKeyboardUp = function (event) {
            var keyCode = getKeyCode(event.keyCode);

            var eventKeyUp = _this._getInputEvent(event, InputEventType.KEY_UP);

            _this._keyStateMap[keyCode] = false;

            _this._eventTarget.emit(InputEventType.KEY_UP, eventKeyUp);
          };

          this._registerEvent();
        }

        var _proto = KeyboardInputSource.prototype;

        _proto.dispatchKeyboardDownEvent = function dispatchKeyboardDownEvent(nativeKeyboardEvent) {
          this._handleKeyboardDown(nativeKeyboardEvent);
        };

        _proto.dispatchKeyboardUpEvent = function dispatchKeyboardUpEvent(nativeKeyboardEvent) {
          this._handleKeyboardUp(nativeKeyboardEvent);
        };

        _proto._registerEvent = function _registerEvent() {
          jsb.onKeyDown = this._handleKeyboardDown;
          jsb.onKeyUp = this._handleKeyboardUp;
        };

        _proto._getInputEvent = function _getInputEvent(event, eventType) {
          var keyCode = getKeyCode(event.keyCode);
          var eventKeyboard = new EventKeyboard(keyCode, eventType);
          eventKeyboard.windowId = event.windowId;
          return eventKeyboard;
        };

        _proto.on = function on(eventType, callback, target) {
          this._eventTarget.on(eventType, callback, target);
        };

        return KeyboardInputSource;
      }());
    }
  };
});