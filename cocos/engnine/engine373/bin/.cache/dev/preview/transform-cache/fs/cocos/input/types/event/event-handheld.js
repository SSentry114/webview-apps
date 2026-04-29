System.register("q-bundled:///fs/cocos/input/types/event/event-handheld.js", ["./event.js"], function (_export, _context) {
  "use strict";

  var Event, EventHandheld;

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
       * The Handheld event.
       *
       * @zh
       * 手持设备事件。
       */
      _export("EventHandheld", EventHandheld = /*#__PURE__*/function (_Event) {
        _inheritsLoose(EventHandheld, _Event);

        /**
         * @en The handheld device which trigger the current handheld event
         * @zh 触发当前手持设备事件的手持设备
         */

        /**
         * @param eventType - The type of the event
         * @param handheldInputDevice - The handheld device which trigger the current handheld event
         */
        function EventHandheld(eventType, handheldInputDevice) {
          var _this;

          _this = _Event.call(this, eventType, false) || this;
          _this.handheldInputDevice = void 0;
          _this.handheldInputDevice = handheldInputDevice;
          return _this;
        }

        return EventHandheld;
      }(Event));
    }
  };
});