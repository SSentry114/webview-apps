System.register("q-bundled:///fs/cocos/input/system-event.js", ["../core/index.js", "./types/index.js", "./input.js", "./types/event-enum.js"], function (_export, _context) {
  "use strict";

  var EventTarget, cclegacy, SystemEventType, input, InputEventType, SystemEvent, systemEvent;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_coreIndexJs) {
      EventTarget = _coreIndexJs.EventTarget;
      cclegacy = _coreIndexJs.cclegacy;
    }, function (_typesIndexJs) {
      SystemEventType = _typesIndexJs.SystemEventType;
    }, function (_inputJs) {
      input = _inputJs.input;
    }, function (_typesEventEnumJs) {
      InputEventType = _typesEventEnumJs.InputEventType;
    }],
    execute: function () {
      /**
       * @en
       * The System event, it currently supports keyboard events and accelerometer events.<br/>
       * You can get the `SystemEvent` instance with `systemEvent`.<br/>
       * @zh
       * 系统事件，它目前支持按键事件和重力感应事件。<br/>
       * 你可以通过 `systemEvent` 获取到 `SystemEvent` 的实例。<br/>
       *
       * @deprecated since v3.4.0, please use Input class instead.
       *
       * @example
       * ```
       * import { systemEvent, SystemEvent } from 'cc';
       * systemEvent.on(SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
       * systemEvent.off(SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
       * ```
       */
      _export("SystemEvent", SystemEvent = /*#__PURE__*/function (_EventTarget) {
        _inheritsLoose(SystemEvent, _EventTarget);

        function SystemEvent() {
          var _this;

          _this = _EventTarget.call(this) || this;
          input.on(InputEventType.MOUSE_DOWN, function (e) {
            _this.emit(SystemEventType.MOUSE_DOWN, e);
          });
          input.on(InputEventType.MOUSE_MOVE, function (e) {
            _this.emit(SystemEventType.MOUSE_MOVE, e);
          });
          input.on(InputEventType.MOUSE_UP, function (e) {
            _this.emit(SystemEventType.MOUSE_UP, e);
          });
          input.on(InputEventType.MOUSE_WHEEL, function (e) {
            _this.emit(SystemEventType.MOUSE_WHEEL, e);
          });
          input.on(InputEventType.TOUCH_START, function (e) {
            _this.emit(SystemEventType.TOUCH_START, e.touch, e);
          });
          input.on(InputEventType.TOUCH_MOVE, function (e) {
            _this.emit(SystemEventType.TOUCH_MOVE, e.touch, e);
          });
          input.on(InputEventType.TOUCH_END, function (e) {
            _this.emit(SystemEventType.TOUCH_END, e.touch, e);
          });
          input.on(InputEventType.TOUCH_CANCEL, function (e) {
            _this.emit(SystemEventType.TOUCH_CANCEL, e.touch, e);
          });
          input.on(InputEventType.KEY_DOWN, function (e) {
            _this.emit(SystemEventType.KEY_DOWN, e);
          });
          input.on(InputEventType.KEY_PRESSING, function (e) {
            _this.emit(SystemEventType.KEY_DOWN, e);
          });
          input.on(InputEventType.KEY_UP, function (e) {
            _this.emit(SystemEventType.KEY_UP, e);
          });
          input.on(InputEventType.DEVICEMOTION, function (e) {
            _this.emit(SystemEventType.DEVICEMOTION, e);
          });
          return _this;
        }
        /**
         * @en
         * Sets whether to enable the accelerometer event listener or not.
         *
         * @zh
         * 是否启用加速度计事件。
         */


        var _proto = SystemEvent.prototype;

        _proto.setAccelerometerEnabled = function setAccelerometerEnabled(isEnabled) {
          input.setAccelerometerEnabled(isEnabled);
        }
        /**
         * @en
         * Sets the accelerometer interval value.
         *
         * @zh
         * 设置加速度计间隔值。
         */
        ;

        _proto.setAccelerometerInterval = function setAccelerometerInterval(interval) {
          input.setAccelerometerInterval(interval);
        }
        /**
         * @en
         * Register an callback of a specific system event type.
         * @zh
         * 注册特定事件类型回调。
         *
         * @param type - The event type
         * @param callback - The event listener's callback
         * @param target - The event listener's target and callee
         * @param once - Register the event listener once
         */
        // @ts-expect-error Property 'on' in type 'SystemEvent' is not assignable to the same property in base type
        ;

        _proto.on = function on(type, callback, target, once) {
          _EventTarget.prototype.on.call(this, type, callback, target, once);

          return callback;
        }
        /**
         * @en
         * Removes the listeners previously registered with the same type, callback, target and or useCapture,
         * if only type is passed as parameter, all listeners registered with that type will be removed.
         * @zh
         * 删除之前用同类型，回调，目标或 useCapture 注册的事件监听器，如果只传递 type，将会删除 type 类型的所有事件监听器。
         *
         * @param type - A string representing the event type being removed.
         * @param callback - The callback to remove.
         * @param target - The target (this object) to invoke the callback, if it's not given, only callback without target will be removed
         */
        ;

        _proto.off = function off(type, callback, target) {
          _EventTarget.prototype.off.call(this, type, callback, target);
        };

        return SystemEvent;
      }(EventTarget));

      SystemEvent.EventType = SystemEventType;
      cclegacy.SystemEvent = SystemEvent;
      /**
       * @module cc
       */

      /**
       * @en The singleton of the SystemEvent, there should only be one instance to be used globally
       * @zh 系统事件单例，方便全局使用。
       *
       * @deprecated since v3.4.0, please use input instead.
       */

      _export("systemEvent", systemEvent = new SystemEvent());

      cclegacy.systemEvent = systemEvent;
    }
  };
});