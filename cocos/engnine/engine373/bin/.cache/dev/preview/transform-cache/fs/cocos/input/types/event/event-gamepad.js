System.register("q-bundled:///fs/cocos/input/types/event/event-gamepad.js", ["./event.js"], function (_export, _context) {
  "use strict";

  var Event, EventGamepad;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_eventJs) {
      Event = _eventJs.Event;
    }],
    execute: function () {
      /**
        * @en
        * The gamepad event.
        * @zh
        * 手柄事件。
        */
      _export("EventGamepad", EventGamepad = /*#__PURE__*/function (_Event) {
        _inheritsLoose(EventGamepad, _Event);

        /**
         * @en The gamepad device which trigger the current gamepad event
         * @zh 触发当前手柄事件的手柄设备
         */
        function EventGamepad(type, gamepad) {
          var _this;

          _this = _Event.call(this, type, false) || this;
          _this.gamepad = void 0;
          _this.gamepad = gamepad;
          return _this;
        }

        return EventGamepad;
      }(Event));
    }
  };
});