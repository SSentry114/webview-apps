System.register("q-bundled:///fs/pal/input/web/keyboard-input.js", ["../../../cocos/input/types/index.js", "../../../cocos/core/event/index.js", "../../../cocos/input/types/event-enum.js"], function (_export, _context) {
  "use strict";

  var KeyCode, EventKeyboard, EventTarget, InputEventType, KeyboardInputSource, code2KeyCode;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function getKeyCode(code) {
    return code2KeyCode[code] || KeyCode.NONE;
  }

  _export("KeyboardInputSource", void 0);

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
      code2KeyCode = {
        Backspace: KeyCode.BACKSPACE,
        Tab: KeyCode.TAB,
        Enter: KeyCode.ENTER,
        ShiftLeft: KeyCode.SHIFT_LEFT,
        ControlLeft: KeyCode.CTRL_LEFT,
        AltLeft: KeyCode.ALT_LEFT,
        ShiftRight: KeyCode.SHIFT_RIGHT,
        ControlRight: KeyCode.CTRL_RIGHT,
        AltRight: KeyCode.ALT_RIGHT,
        Pause: KeyCode.PAUSE,
        CapsLock: KeyCode.CAPS_LOCK,
        Escape: KeyCode.ESCAPE,
        Space: KeyCode.SPACE,
        PageUp: KeyCode.PAGE_UP,
        PageDown: KeyCode.PAGE_DOWN,
        End: KeyCode.END,
        Home: KeyCode.HOME,
        ArrowLeft: KeyCode.ARROW_LEFT,
        ArrowUp: KeyCode.ARROW_UP,
        ArrowRight: KeyCode.ARROW_RIGHT,
        ArrowDown: KeyCode.ARROW_DOWN,
        Insert: KeyCode.INSERT,
        Delete: KeyCode.DELETE,
        Digit0: KeyCode.DIGIT_0,
        Digit1: KeyCode.DIGIT_1,
        Digit2: KeyCode.DIGIT_2,
        Digit3: KeyCode.DIGIT_3,
        Digit4: KeyCode.DIGIT_4,
        Digit5: KeyCode.DIGIT_5,
        Digit6: KeyCode.DIGIT_6,
        Digit7: KeyCode.DIGIT_7,
        Digit8: KeyCode.DIGIT_8,
        Digit9: KeyCode.DIGIT_9,
        KeyA: KeyCode.KEY_A,
        KeyB: KeyCode.KEY_B,
        KeyC: KeyCode.KEY_C,
        KeyD: KeyCode.KEY_D,
        KeyE: KeyCode.KEY_E,
        KeyF: KeyCode.KEY_F,
        KeyG: KeyCode.KEY_G,
        KeyH: KeyCode.KEY_H,
        KeyI: KeyCode.KEY_I,
        KeyJ: KeyCode.KEY_J,
        KeyK: KeyCode.KEY_K,
        KeyL: KeyCode.KEY_L,
        KeyM: KeyCode.KEY_M,
        KeyN: KeyCode.KEY_N,
        KeyO: KeyCode.KEY_O,
        KeyP: KeyCode.KEY_P,
        KeyQ: KeyCode.KEY_Q,
        KeyR: KeyCode.KEY_R,
        KeyS: KeyCode.KEY_S,
        KeyT: KeyCode.KEY_T,
        KeyU: KeyCode.KEY_U,
        KeyV: KeyCode.KEY_V,
        KeyW: KeyCode.KEY_W,
        KeyX: KeyCode.KEY_X,
        KeyY: KeyCode.KEY_Y,
        KeyZ: KeyCode.KEY_Z,
        Numpad0: KeyCode.NUM_0,
        Numpad1: KeyCode.NUM_1,
        Numpad2: KeyCode.NUM_2,
        Numpad3: KeyCode.NUM_3,
        Numpad4: KeyCode.NUM_4,
        Numpad5: KeyCode.NUM_5,
        Numpad6: KeyCode.NUM_6,
        Numpad7: KeyCode.NUM_7,
        Numpad8: KeyCode.NUM_8,
        Numpad9: KeyCode.NUM_9,
        NumpadMultiply: KeyCode.NUM_MULTIPLY,
        NumpadAdd: KeyCode.NUM_PLUS,
        NumpadSubtract: KeyCode.NUM_SUBTRACT,
        NumpadDecimal: KeyCode.NUM_DECIMAL,
        NumpadDivide: KeyCode.NUM_DIVIDE,
        NumpadEnter: KeyCode.NUM_ENTER,
        F1: KeyCode.F1,
        F2: KeyCode.F2,
        F3: KeyCode.F3,
        F4: KeyCode.F4,
        F5: KeyCode.F5,
        F6: KeyCode.F6,
        F7: KeyCode.F7,
        F8: KeyCode.F8,
        F9: KeyCode.F9,
        F10: KeyCode.F10,
        F11: KeyCode.F11,
        F12: KeyCode.F12,
        NumLock: KeyCode.NUM_LOCK,
        ScrollLock: KeyCode.SCROLL_LOCK,
        Semicolon: KeyCode.SEMICOLON,
        Equal: KeyCode.EQUAL,
        Comma: KeyCode.COMMA,
        Minus: KeyCode.DASH,
        Period: KeyCode.PERIOD,
        Slash: KeyCode.SLASH,
        Backquote: KeyCode.BACK_QUOTE,
        BracketLeft: KeyCode.BRACKET_LEFT,
        Backslash: KeyCode.BACKSLASH,
        BracketRight: KeyCode.BRACKET_RIGHT,
        Quote: KeyCode.QUOTE
      };

      _export("KeyboardInputSource", KeyboardInputSource = class KeyboardInputSource {
        constructor() {
          this._eventTarget = new EventTarget();

          this._registerEvent();
        }

        dispatchKeyboardDownEvent(nativeKeyboardEvent) {
          this._handleKeyboardDown(nativeKeyboardEvent);
        }

        dispatchKeyboardUpEvent(nativeKeyboardEvent) {
          this._handleKeyboardUp(nativeKeyboardEvent);
        }

        on(eventType, callback, target) {
          this._eventTarget.on(eventType, callback, target);
        }

        _registerEvent() {
          const canvas = document.getElementById('GameCanvas');
          canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener('keydown', this._handleKeyboardDown.bind(this));
          canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener('keyup', this._handleKeyboardUp.bind(this));
        }

        _getInputEvent(event, eventType) {
          const keyCode = getKeyCode(event.code);
          const eventKeyboard = new EventKeyboard(keyCode, eventType);
          return eventKeyboard;
        }

        _handleKeyboardDown(event) {
          event.stopPropagation();
          event.preventDefault();

          if (!event.repeat) {
            const keyDownInputEvent = this._getInputEvent(event, InputEventType.KEY_DOWN);

            this._eventTarget.emit(InputEventType.KEY_DOWN, keyDownInputEvent);
          } else {
            const keyPressingInputEvent = this._getInputEvent(event, InputEventType.KEY_PRESSING);

            this._eventTarget.emit(InputEventType.KEY_PRESSING, keyPressingInputEvent);
          }
        }

        _handleKeyboardUp(event) {
          const inputEvent = this._getInputEvent(event, InputEventType.KEY_UP);

          event.stopPropagation();
          event.preventDefault();

          this._eventTarget.emit(InputEventType.KEY_UP, inputEvent);
        }

      });
    }
  };
});