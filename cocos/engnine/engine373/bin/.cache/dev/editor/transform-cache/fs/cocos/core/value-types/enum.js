System.register("q-bundled:///fs/cocos/core/value-types/enum.js", ["../../../../virtual/internal%253Aconstants.js", "../utils/js.js", "../global-exports.js", "../platform/debug.js", "../data/utils/asserts.js"], function (_export, _context) {
  "use strict";

  var EDITOR, TEST, DEV, value, legacyCC, errorID, assertIsTrue, _TestEnum;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  /**
   * @en
   * Define an enum type. <br/>
   * If a enum item has a value of -1, it will be given an Integer number according to it's order in the list.<br/>
   * Otherwise it will use the value specified by user who writes the enum definition.
   *
   * @zh
   * 定义一个枚举类型。<br/>
   * 用户可以把枚举值设为任意的整数，如果设为 -1，系统将会分配为上一个枚举值 + 1。
   *
   * @param obj
   * @en A JavaScript literal object containing enum names and values, or a TypeScript enum type.
   * @zh 包含枚举名和值的 JavaScript literal 对象，或者是一个 TypeScript enum 类型。
   * @return @en The defined enum type. @zh 定义的枚举类型。
   */
  function Enum(obj) {
    if ('__enums__' in obj) {
      return obj;
    }

    value(obj, '__enums__', null, true);
    return Enum.update(obj);
  }
  /**
   * @en
   * Update the enum object properties.
   * @zh
   * 更新枚举对象的属性列表。
   * @param obj @en The enum object to update. @zh 需要更新的枚举对象。
   */


  function assertIsEnum(enumType) {
    assertIsTrue(enumType.hasOwnProperty('__enums__'));
  }
  /**
   * Get the enumerators from the enum type.
   * @param enumType @en An enum type. @zh 枚举类型。
   */


  /**
   * Update the enumerators from the enum type.
   * @param enumType @en The enum type defined from [[Enum]] @zh 从[[Enum]]定义的枚举类型。
   * @return {Object[]}
   */
  function updateList(enumType) {
    assertIsEnum(enumType);
    const enums = enumType.__enums__ || [];
    enums.length = 0;

    for (const name in enumType) {
      const v = enumType[name];

      if (Number.isInteger(v)) {
        enums.push({
          name,
          value: v
        });
      }
    }

    enums.sort((a, b) => a.value - b.value);
    enumType.__enums__ = enums;
    return enums;
  }
  /**
   * Reorder the enumerators in the enumeration type by compareFunction.
   * @param enumType @en The enum type defined from [[Enum]] @zh 从[[Enum]]定义的枚举类型。
   * @param compareFn @en Function used to determine the order of the elements. @zh 用于确定元素顺序的函数。
   */


  /**
   * Make the enum type `enumType` as enumeration so that Creator may identify, operate on it.
   * Formally, as a result of invocation on this function with enum type `enumType`:
   * - `Enum.isEnum(enumType)` returns `true`;
   * - `Enum.getList(enumType)` returns the enumerators of `enumType`.
   * @param
   * @en enumType An enum type, eg, a kind of type with similar semantic defined by TypeScript.
   * @zh 枚举类型，例如 TypeScript 中定义的类型。
   */
  function ccenum(enumType) {
    if (!('__enums__' in enumType)) {
      value(enumType, '__enums__', null, true);
    }
  }

  _export({
    Enum: Enum,
    ccenum: ccenum
  });

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      TEST = _virtualInternal253AconstantsJs.TEST;
      DEV = _virtualInternal253AconstantsJs.DEV;
    }, function (_utilsJsJs) {
      value = _utilsJsJs.value;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_platformDebugJs) {
      errorID = _platformDebugJs.errorID;
    }, function (_dataUtilsAssertsJs) {
      assertIsTrue = _dataUtilsAssertsJs.assertIsTrue;
    }],
    execute: function () {
      Enum.update = obj => {
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
        } // auto update list if __enums__ is array
        // @ts-expect-error Injected properties


        if (Array.isArray(obj.__enums__)) {
          updateList(obj);
        }

        return obj;
      };

      (function (_Enum) {})(Enum || _export("Enum", Enum = {}));

      /**
       * Determines if the object is an enum type.
       * @param enumType @en The object to judge. @zh 需要判断的对象。
       */
      Enum.isEnum = enumType => enumType && enumType.hasOwnProperty('__enums__');

      Enum.getList = enumType => {
        assertIsEnum(enumType);

        if (enumType.__enums__) {
          return enumType.__enums__;
        }

        return updateList(enumType);
      };

      Enum.sortList = (enumType, compareFn) => {
        assertIsEnum(enumType);

        if (!Array.isArray(enumType.__enums__)) {
          return;
        }

        enumType.__enums__.sort(compareFn);
      };

      if (DEV) {
        // check key order in object literal
        _TestEnum = Enum({
          ZERO: -1,
          ONE: -1,
          TWO: -1,
          THREE: -1
        });

        if (_TestEnum.ZERO !== 0 || _TestEnum.ONE !== 1 || _TestEnum.THREE !== 3) {
          errorID(7101);
        }
      }

      legacyCC.Enum = Enum;
    }
  };
});