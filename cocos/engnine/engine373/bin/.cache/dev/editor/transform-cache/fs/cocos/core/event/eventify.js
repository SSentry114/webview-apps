System.register("q-bundled:///fs/cocos/core/event/eventify.js", ["./callbacks-invoker.js", "../utils/js.js"], function (_export, _context) {
  "use strict";

  var CallbacksInvoker, createMap;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  /**
   * @en Generate a new class from the given base class, after polyfill all functionalities in [[IEventified]] as if it's extended from [[EventTarget]]
   * @zh 生成一个类，该类继承自指定的基类，并以和 [[EventTarget]] 等同的方式实现了 [[IEventified]] 的所有接口。
   * @param base The base class
   * @example
   * ```ts
   * class Base { say() { console.log('Hello!'); } }
   * class MyClass extends Eventify(Base) { }
   * function (o: MyClass) {
   *     o.say(); // Ok: Extend from `Base`
   *     o.emit('sing', 'The ghost'); // Ok: `MyClass` implements IEventified
   * }
   * ```
   */
  function Eventify(base) {
    class Eventified extends base {
      constructor(...args) {
        super(...args);
        this._callbackTable = createMap(true);
      }

      once(type, callback, target) {
        return this.on(type, callback, target, true);
      }

      targetOff(typeOrTarget) {
        this.removeAll(typeOrTarget);
      }

    } // Mixin with `CallbacksInvokers`'s prototype


    const callbacksInvokerPrototype = CallbacksInvoker.prototype;
    const propertyKeys = Object.getOwnPropertyNames(callbacksInvokerPrototype).concat(Object.getOwnPropertySymbols(callbacksInvokerPrototype));

    for (let iPropertyKey = 0; iPropertyKey < propertyKeys.length; ++iPropertyKey) {
      const propertyKey = propertyKeys[iPropertyKey];

      if (!(propertyKey in Eventified.prototype)) {
        const propertyDescriptor = Object.getOwnPropertyDescriptor(callbacksInvokerPrototype, propertyKey);

        if (propertyDescriptor) {
          Object.defineProperty(Eventified.prototype, propertyKey, propertyDescriptor);
        }
      }
    }

    return Eventified;
  }

  _export("Eventify", Eventify);

  return {
    setters: [function (_callbacksInvokerJs) {
      CallbacksInvoker = _callbacksInvokerJs.CallbacksInvoker;
    }, function (_utilsJsJs) {
      createMap = _utilsJsJs.createMap;
    }],
    execute: function () {}
  };
});