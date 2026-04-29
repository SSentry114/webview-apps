System.register("q-bundled:///fs/cocos/core/value-types/bitmask.js", ["../../../../virtual/internal%253Aconstants.js", "../utils/js.js", "../global-exports.js", "../platform/debug.js"], function (_export, _context) {
  "use strict";

  var EDITOR, TEST, value, legacyCC, errorID;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  /**
   * @en
   * Defines a BitMask type. The editor will display different inspector depending on this data type.  It may define some properties to the object.
   * The keys of new properties are the integer type values, and the values are corresponding keys. See the example below.
   * keys.
   * @zh
   * 定义一个位掩码类型。编辑器会根据这个数据类型显示不同的显示界面。它可能会在对象添加新属性。新属性的 key 是原来的整型 value，value 是对应的 key。参考下面的例子。
   * @param obj
   * @en A JavaScript literal object containing BitMask names and values.
   * @zh 包含 BitMask 名称和值的 JavaScript 文字对象。
   * @returns @en The defined BitMask type @zh 定义的位掩码类型。
   * @example
   * ```ts
   * // `type1` and `type2` are single-selected.
   * let obj = {
   *     type1: 0,
   *     type2: 1 << 2,
   * }
   *
   * // `type1` and `type2` are multiple-selected.
   * // New properties are added to obj, obj now is
   * // {
   * //     type1: 0,
   * //     type2: 1<< 2,
   * //     0: type1,
   * //     4: type2
   * // }
   * BitMask(obj);
   * ```
   */
  function BitMask(obj) {
    if ('__bitmask__' in obj) {
      return obj;
    }

    value(obj, '__bitmask__', null, true);
    let lastIndex = -1;
    const keys = Object.keys(obj);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      let val = obj[key];

      if (val === -1) {
        val = ++lastIndex;
        obj[key] = val;
      } else if (typeof val === 'number') {
        lastIndex = val;
      } else if (typeof val === 'string' && Number.isInteger(parseFloat(key))) {
        continue;
      }

      const reverseKey = `${val}`;

      if (key !== reverseKey) {
        if ((EDITOR || TEST) && reverseKey in obj && obj[reverseKey] !== key) {
          errorID(7100, reverseKey);
          continue;
        }

        value(obj, reverseKey, key);
      }
    }

    return obj;
  }
  /**
   * @en Checks if an object is BitMask. @zh 检查一个对象是否是 BitMask。
   * @param BitMaskType @en The object to check. @zh 待检查对象。
   * @returns @en True if it is a BitMask, false else.
   * @zh 如果是 BitMask，返回 true；否则返回 false。
   */


  /**
   * @en Similar to [[BitMask]], but it doesn't add properties to the object.
   * @zh 和 [[BitMask]] 类似功能，但不会往对象添加属性。
   * @param bitmaskx @en An object to make BitMask type. @zh 要标记为 BitMask 类型的对象。
   * @returns @en The passed in object. @zh 传入的对象。
   */
  function ccbitmask(bitmaskx) {
    if ('__bitmask__' in bitmaskx) {
      return;
    }

    value(bitmaskx, '__bitmask__', null, true);
  }

  _export({
    BitMask: BitMask,
    ccbitmask: ccbitmask
  });

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      TEST = _virtualInternal253AconstantsJs.TEST;
    }, function (_utilsJsJs) {
      value = _utilsJsJs.value;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_platformDebugJs) {
      errorID = _platformDebugJs.errorID;
    }],
    execute: function () {
      BitMask.isBitMask = BitMaskType => BitMaskType && BitMaskType.hasOwnProperty('__bitmask__');
      /**
       *
       * @param BitMaskDef
       * @returns @en A sorted array with integer values. @zh 存储整型属性值的数组。该数组已排序。
       */


      BitMask.getList = BitMaskDef => {
        if (BitMaskDef.__bitmask__) {
          return BitMaskDef.__bitmask__;
        }

        return BitMask.update(BitMaskDef);
      };
      /**
       * @en
       * Update BitMask object properties.
       * @zh
       * 更新 BitMask 对象的属性列表。
       *
       * @param BitMaskDef
       * @returns @en A sorted array with integer values. @zh 存储整型属性值的数组。该数组已排序。
       */


      BitMask.update = BitMaskDef => {
        if (!Array.isArray(BitMaskDef.__bitmask__)) {
          BitMaskDef.__bitmask__ = [];
        }

        const bitList = BitMaskDef.__bitmask__;
        bitList.length = 0;

        for (const name in BitMaskDef) {
          const v = BitMaskDef[name];

          if (Number.isInteger(v)) {
            bitList.push({
              name,
              value: v
            });
          }
        }

        bitList.sort((a, b) => a.value - b.value);
        return bitList;
      };

      legacyCC.BitMask = BitMask;
    }
  };
});