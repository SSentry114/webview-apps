System.register("q-bundled:///fs/cocos/core/data/garbage-collection.js", ["../../../../virtual/internal%253Aconstants.js"], function (_export, _context) {
  "use strict";

  var EDITOR, GarbageCollectionManager, targetSymbol, garbageCollectionManager;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }],
    execute: function () {
      targetSymbol = Symbol('[[target]]');
      GarbageCollectionManager = class GarbageCollectionManager {
        constructor() {
          this._finalizationRegistry = EDITOR && typeof FinalizationRegistry !== 'undefined' ? new FinalizationRegistry(this.finalizationRegistryCallback.bind(this)) : null;
          this._gcObjects = new WeakMap();
        }

        registerGCObject(gcObject) {
          if (EDITOR && this._finalizationRegistry) {
            const token = {};
            const proxy = new Proxy(gcObject, {
              get(target, property, receiver) {
                if (property === targetSymbol) {
                  return target;
                }

                let val = Reflect.get(target, property);

                if (typeof val === 'function' && property !== 'constructor') {
                  const original = val;

                  val = function newFunc() {
                    // @ts-expect-error this is referenced to proxy
                    return original.apply(this[targetSymbol], arguments);
                  };
                }

                return val;
              },

              set(target, prop, value, receiver) {
                target[prop] = value;
                return true;
              }

            });

            this._gcObjects.set(token, gcObject);

            this._finalizationRegistry.register(proxy, token, token);

            return proxy;
          } else {
            return gcObject;
          }
        }

        init() {}

        finalizationRegistryCallback(token) {
          const gcObject = this._gcObjects.get(token);

          if (gcObject) {
            this._gcObjects.delete(token);

            gcObject.destroy();
          }

          this._finalizationRegistry.unregister(token);
        }

        destroy() {}

      };
      /**
       * @engineInternal
       */

      _export("garbageCollectionManager", garbageCollectionManager = new GarbageCollectionManager());
    }
  };
});