System.register("q-bundled:///fs/cocos/input/types/event/event-handle.js", ["./event.js"], function (_export, _context) {
  "use strict";

  var Event, EventHandle;

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
       * The 6DOF handle event.
       *
       * @zh
       * 6DOF手柄事件。
       */
      _export("EventHandle", EventHandle = /*#__PURE__*/function (_Event) {
        _inheritsLoose(EventHandle, _Event);

        /**
         * @en The handle device which trigger the current handle event
         * @zh 触发当前手柄事件的手柄设备
         */

        /**
         * @param eventType - The type of the event
         * @param handleInputDevice - The handle device which trigger the current handle event
         */
        function EventHandle(eventType, handleInputDevice) {
          var _this;

          _this = _Event.call(this, eventType, false) || this;
          _this.handleInputDevice = void 0;
          _this.handleInputDevice = handleInputDevice;
          return _this;
        }

        return EventHandle;
      }(Event));
    }
  };
});