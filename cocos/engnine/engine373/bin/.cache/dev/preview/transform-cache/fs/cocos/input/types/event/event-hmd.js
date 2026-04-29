System.register("q-bundled:///fs/cocos/input/types/event/event-hmd.js", ["./event.js"], function (_export, _context) {
  "use strict";

  var Event, EventHMD;

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
       * The HMD event.
       *
       * @zh
       * 头戴显示器事件。
       */
      _export("EventHMD", EventHMD = /*#__PURE__*/function (_Event) {
        _inheritsLoose(EventHMD, _Event);

        /**
         * @en The hmd device which trigger the current hmd event
         * @zh 触发当前头戴显示器事件的头戴显示器设备
         */

        /**
         * @param eventType - The type of the event
         * @param hmdInputDevice - The hmd device which trigger the current hmd event
         */
        function EventHMD(eventType, hmdInputDevice) {
          var _this;

          _this = _Event.call(this, eventType, false) || this;
          _this.hmdInputDevice = void 0;
          _this.hmdInputDevice = hmdInputDevice;
          return _this;
        }

        return EventHMD;
      }(Event));
    }
  };
});