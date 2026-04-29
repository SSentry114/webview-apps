System.register("q-bundled:///fs/cocos/serialization/instantiate.js", ["../../../virtual/internal%253Aconstants.js", "../core/index.js"], function (_export, _context) {
  "use strict";

  var DEV, JSB, CCObject, isCCObject, js, ValueType, jsbUtils, isCCClassOrFastDefined, getError, warn, misc, cclegacy, Destroyed, PersistentMask, objsToClearTmpVar;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function instantiate(original, internalForce) {
    if (!internalForce) {
      if (DEV) {
        if (typeof original !== 'object' || Array.isArray(original)) {
          throw new TypeError(getError(6900));
        }

        if (!original) {
          throw new TypeError(getError(6901));
        }

        if (!cclegacy.isValid(original)) {
          throw new TypeError(getError(6901));
        }

        if (original instanceof cclegacy.Component) {
          warn('Should not instantiate a single cc.Component directly, you must instantiate the entire node.');
        }
      }
    }

    var clone;

    if (isCCObject(original)) {
      if (original._instantiate) {
        cclegacy.game._isCloning = true;
        clone = original._instantiate(null, true);
        cclegacy.game._isCloning = false;

        if (JSB) {
          jsbUtils.updateChildrenForDeserialize(clone);
        } // eslint-disable-next-line @typescript-eslint/no-unsafe-return


        return clone;
      } else if (original instanceof cclegacy.Asset) {
        throw new TypeError(getError(6903));
      }
    }

    cclegacy.game._isCloning = true;
    clone = doInstantiate(original);
    cclegacy.game._isCloning = false;

    if (JSB) {
      jsbUtils.updateChildrenForDeserialize(clone);
    } // eslint-disable-next-line @typescript-eslint/no-unsafe-return


    return clone;
  }
  /*
   * @en
   * Do instantiate object, the object to instantiate must be non-nil.
   * @zh
   * 这是一个通用的 instantiate 方法，可能效率比较低。
   * 之后可以给各种类型重写快速实例化的特殊实现，但应该在单元测试中将结果和这个方法的结果进行对比。
   * 值得注意的是，这个方法不可重入。
   * @param obj - 该方法仅供内部使用，用户需负责保证参数合法。什么参数是合法的请参考 cc.instantiate 的实现。
   * @param parent - 只有在该对象下的场景物体会被克隆。
   * @return {Object}
   * @private
   */


  function doInstantiate(obj, parent) {
    if (DEV) {
      if (Array.isArray(obj)) {
        throw new TypeError(getError(6904));
      }

      if (misc.isDomNode(obj)) {
        throw new TypeError(getError(6905));
      }
    }

    var clone;

    if (obj._iN$t) {
      // User can specify an existing object by assigning the "_iN$t" property.
      // enumerateObject will always push obj to objsToClearTmpVar
      clone = obj._iN$t;
    } else if (obj.constructor) {
      var Klass = obj.constructor;
      clone = new Klass();
    } else {
      clone = Object.create(null);
    }

    enumerateObject(obj, clone, parent);

    for (var i = 0, len = objsToClearTmpVar.length; i < len; ++i) {
      objsToClearTmpVar[i]._iN$t = null;
    }

    objsToClearTmpVar.length = 0; // eslint-disable-next-line @typescript-eslint/no-unsafe-return

    return clone;
  } // @param {Object} obj - The object to instantiate, typeof must be 'object' and should not be an array.


  function enumerateCCClass(klass, obj, clone, parent) {
    var props = klass.__values__;

    for (var p = 0; p < props.length; p++) {
      var key = props[p];
      var value = obj[key];

      if (typeof value === 'object' && value) {
        var initValue = clone[key];

        if (initValue instanceof ValueType && initValue.constructor === value.constructor) {
          initValue.set(value);
        } else {
          clone[key] = value._iN$t || instantiateObj(value, parent);
        }
      } else {
        clone[key] = value;
      }
    }
  }

  function enumerateObject(obj, clone, parent) {
    // 目前使用“_iN$t”这个特殊字段来存实例化后的对象，这样做主要是为了防止循环引用
    // 注意，为了避免循环引用，所有新创建的实例，必须在赋值前被设为源对象的_iN$t
    js.value(obj, '_iN$t', clone, true);
    objsToClearTmpVar.push(obj);
    var klass = obj.constructor;

    if (isCCClassOrFastDefined(klass)) {
      enumerateCCClass(klass, obj, clone, parent);
    } else {
      // primitive javascript object
      for (var key in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (!obj.hasOwnProperty(key) || key.charCodeAt(0) === 95 && key.charCodeAt(1) === 95 // starts with "__"
        && key !== '__type__' && key !== '__prefab') {
          continue;
        }

        var value = obj[key];

        if (typeof value === 'object' && value) {
          if (value === clone) {
            continue; // value is obj._iN$t
          }

          clone[key] = value._iN$t || instantiateObj(value, parent);
        } else {
          clone[key] = value;
        }
      }
    }

    if (isCCObject(obj)) {
      clone._objFlags &= PersistentMask;
    }
  }
  /*
   * @param {Object|Array} obj - the original non-nil object, typeof must be 'object'
   * @return {Object|Array} - the original non-nil object, typeof must be 'object'
   */


  function instantiateObj(obj, parent) {
    if (obj instanceof ValueType) {
      return obj.clone();
    }

    if (obj instanceof cclegacy.Asset) {
      // 所有资源直接引用，不需要拷贝
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return obj;
    }

    var clone;

    if (ArrayBuffer.isView(obj)) {
      var len = obj.length;
      clone = new obj.constructor(len); // @ts-expect-error: unknown

      obj._iN$t = clone;
      objsToClearTmpVar.push(obj);

      for (var i = 0; i < len; ++i) {
        clone[i] = obj[i];
      } // eslint-disable-next-line @typescript-eslint/no-unsafe-return


      return clone;
    }

    if (Array.isArray(obj)) {
      var _len = obj.length;
      clone = new Array(_len); // @ts-expect-error: unknown

      obj._iN$t = clone;
      objsToClearTmpVar.push(obj);

      for (var _i = 0; _i < _len; ++_i) {
        var value = obj[_i];

        if (typeof value === 'object' && value) {
          clone[_i] = value._iN$t || instantiateObj(value, parent);
        } else {
          clone[_i] = value;
        }
      } // eslint-disable-next-line @typescript-eslint/no-unsafe-return


      return clone;
    } else if (obj._objFlags & Destroyed) {
      // the same as cc.isValid(obj)
      return null;
    }

    var ctor = obj.constructor;

    if (isCCClassOrFastDefined(ctor)) {
      if (parent) {
        if (parent instanceof cclegacy.Component) {
          if (obj instanceof cclegacy.Node || obj instanceof cclegacy.Component) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return obj;
          }
        } else if (parent instanceof cclegacy.Node) {
          if (obj instanceof cclegacy.Node) {
            if (!obj.isChildOf(parent)) {
              // should not clone other nodes if not descendant
              // eslint-disable-next-line @typescript-eslint/no-unsafe-return
              return obj;
            }
          } else if (obj instanceof cclegacy.Component) {
            if (obj.node && !obj.node.isChildOf(parent)) {
              // should not clone other component if not descendant
              // eslint-disable-next-line @typescript-eslint/no-unsafe-return
              return obj;
            }
          }
        }
      } // eslint-disable-next-line new-cap


      clone = new ctor();
    } else if (ctor === Object) {
      clone = {};
    } else if (!ctor) {
      clone = Object.create(null);
    } else {
      // unknown type
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return obj;
    }

    enumerateObject(obj, clone, parent); // eslint-disable-next-line @typescript-eslint/no-unsafe-return

    return clone;
  }

  _export("instantiate", instantiate);

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      DEV = _virtualInternal253AconstantsJs.DEV;
      JSB = _virtualInternal253AconstantsJs.JSB;
    }, function (_coreIndexJs) {
      CCObject = _coreIndexJs.CCObject;
      isCCObject = _coreIndexJs.isCCObject;
      js = _coreIndexJs.js;
      ValueType = _coreIndexJs.ValueType;
      jsbUtils = _coreIndexJs.jsbUtils;
      isCCClassOrFastDefined = _coreIndexJs.isCCClassOrFastDefined;
      getError = _coreIndexJs.getError;
      warn = _coreIndexJs.warn;
      misc = _coreIndexJs.misc;
      cclegacy = _coreIndexJs.cclegacy;
    }],
    execute: function () {
      Destroyed = CCObject.Flags.Destroyed;
      PersistentMask = CCObject.Flags.PersistentMask;
      objsToClearTmpVar = []; // used to reset _iN$t variable

      /**
       * Invoke _instantiate method if supplied.
       * The _instantiate callback will be called only on the root object, its associated object will not be called.
       * @param instantiated If supplied, _instantiate just need to initialize the instantiated object, no need to create new object by itself.
       * @returns The instantiated object.
       */

      instantiate._clone = doInstantiate;
      cclegacy.instantiate = instantiate;
    }
  };
});