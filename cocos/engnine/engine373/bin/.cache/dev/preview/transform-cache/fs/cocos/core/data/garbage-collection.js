System.register("q-bundled:///fs/cocos/core/data/garbage-collection.js", ["../../../../virtual/internal%253Aconstants.js"], function (_export, _context) {
  "use strict";

  var EDITOR, targetSymbol, GarbageCollectionManager, garbageCollectionManager;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }],
    execute: function () {
      targetSymbol = Symbol('[[target]]');

      GarbageCollectionManager = /*#__PURE__*/function () {
        function GarbageCollectionManager() {
          this._finalizationRegistry = EDITOR && typeof FinalizationRegistry !== 'undefined' ? new FinalizationRegistry(this.finalizationRegistryCallback.bind(this)) : null;
          this._gcObjects = new WeakMap();
        }

        var _proto = GarbageCollectionManager.prototype;

        _proto.registerGCObject = function registerGCObject(gcObject) {
          if (EDITOR && this._finalizationRegistry) {
            var _token = {};
            var proxy = new Proxy(gcObject, {
              get: function get(target, property, receiver) {
                if (property === targetSymbol) {
                  return target;
                }

                var val = Reflect.get(target, property);

                if (typeof val === 'function' && property !== 'constructor') {
                  var original = val;

                  val = function newFunc() {
                    // @ts-expect-error this is referenced to proxy
                    return original.apply(this[targetSymbol], arguments);
                  };
                }

                return val;
              },
              set: function set(target, prop, value, receiver) {
                target[prop] = value;
                return true;
              }
            });

            this._gcObjects.set(_token, gcObject);

            this._finalizationRegistry.register(proxy, _token, _token);

            return proxy;
          } else {
            return gcObject;
          }
        };

        _proto.init = function init() {};

        _proto.finalizationRegistryCallback = function finalizationRegistryCallback(token) {
          var gcObject = this._gcObjects.get(token);

          if (gcObject) {
            this._gcObjects["delete"](token);

            gcObject.destroy();
          }

          this._finalizationRegistry.unregister(token);
        };

        _proto.destroy = function destroy() {};

        return GarbageCollectionManager;
      }();
      /**
       * @engineInternal
       */


      _export("garbageCollectionManager", garbageCollectionManager = new GarbageCollectionManager());
    }
  };
});