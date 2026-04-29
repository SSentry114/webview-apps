System.register("q-bundled:///fs/cocos/core/data/decorators/property.js", ["../../../../../virtual/internal%253Aconstants.js", "./utils.js", "../../platform/debug.js", "../utils/preprocess-class.js", "../class-stash.js", "../../utils/js-typed.js"], function (_export, _context) {
  "use strict";

  var DEV, EDITOR, TEST, getSubDict, getClassCache, warnID, errorID, getFullFormOfProperty, PropertyStashInternalFlag, getClassName, mixin;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function property(target, propertyKey, descriptorOrInitializer) {
    var options = null;

    function normalized(target, propertyKey, descriptorOrInitializer) {
      var classStash = getOrCreateClassStash(target);
      var propertyStash = getOrCreateEmptyPropertyStash(target, propertyKey);
      var classConstructor = target.constructor;
      mergePropertyOptions(classStash, propertyStash, classConstructor, propertyKey, options, descriptorOrInitializer);
    }

    if (target === undefined) {
      // @property() => LegacyPropertyDecorator
      return property({
        type: undefined
      });
    } else if (typeof propertyKey === 'undefined') {
      // @property(options) => LegacyPropertyDescriptor
      // @property(type) => LegacyPropertyDescriptor
      options = target;
      return normalized;
    } else {
      // @property
      normalized(target, propertyKey, descriptorOrInitializer);
      return undefined;
    }
  }

  function getDefaultFromInitializer(initializer) {
    var value;

    try {
      value = initializer();
    } catch (e) {
      // just lazy initialize by CCClass
      return initializer;
    }

    if (typeof value !== 'object' || value === null) {
      // string boolean number function undefined null
      return value;
    } else {
      // The default attribute will not be used in the ES6 constructor actually,
      // so we don't need to simplify into `{}` or `[]` or vec2 completely.
      return initializer;
    }
  }

  function extractActualDefaultValues(classConstructor) {
    var dummyObj;

    try {
      // eslint-disable-next-line new-cap
      dummyObj = new classConstructor();
    } catch (e) {
      if (DEV) {
        warnID(3652, getClassName(classConstructor), e);
      }

      return {};
    }

    return dummyObj;
  }

  function getOrCreateClassStash(target) {
    var cache = getClassCache(target.constructor);
    return cache;
  }

  function getOrCreateEmptyPropertyStash(target, propertyKey) {
    var _ref, _properties$_ref;

    var classStash = getClassCache(target.constructor);
    var ccclassProto = getSubDict(classStash, 'proto');
    var properties = getSubDict(ccclassProto, 'properties');
    var propertyStash = (_properties$_ref = properties[_ref = propertyKey]) !== null && _properties$_ref !== void 0 ? _properties$_ref : properties[_ref] = {};
    return propertyStash;
  }

  function getOrCreatePropertyStash(target, propertyKey, descriptorOrInitializer) {
    var _ref2, _properties$_ref2;

    var classStash = getClassCache(target.constructor);
    var ccclassProto = getSubDict(classStash, 'proto');
    var properties = getSubDict(ccclassProto, 'properties');
    var propertyStash = (_properties$_ref2 = properties[_ref2 = propertyKey]) !== null && _properties$_ref2 !== void 0 ? _properties$_ref2 : properties[_ref2] = {};
    propertyStash.__internalFlags |= PropertyStashInternalFlag.STANDALONE;

    if (descriptorOrInitializer && typeof descriptorOrInitializer !== 'function' && (descriptorOrInitializer.get || descriptorOrInitializer.set)) {
      if (descriptorOrInitializer.get) {
        propertyStash.get = descriptorOrInitializer.get;
      }

      if (descriptorOrInitializer.set) {
        propertyStash.set = descriptorOrInitializer.set;
      }
    } else {
      setDefaultValue(classStash, propertyStash, target.constructor, propertyKey, descriptorOrInitializer);
    }

    return propertyStash;
  }

  function mergePropertyOptions(cache, propertyStash, ctor, propertyKey, options, descriptorOrInitializer) {
    var fullOptions;
    var isGetset = descriptorOrInitializer && typeof descriptorOrInitializer !== 'function' && (descriptorOrInitializer.get || descriptorOrInitializer.set);

    if (options) {
      fullOptions = getFullFormOfProperty(options, isGetset);
    } // @ts-expect-error enum PropertyStashInternalFlag is used as number


    var propertyRecord = mixin(propertyStash, fullOptions || options || {});

    if (isGetset) {
      // typescript or babel
      if (DEV && options && ((fullOptions || options).get || (fullOptions || options).set)) {
        var errorProps = getSubDict(cache, 'errorProps');

        if (!errorProps[propertyKey]) {
          errorProps[propertyKey] = true;
          warnID(3655, propertyKey, getClassName(ctor), propertyKey, propertyKey);
        }
      }

      if (descriptorOrInitializer.get) {
        propertyRecord.get = descriptorOrInitializer.get;
      }

      if (descriptorOrInitializer.set) {
        propertyRecord.set = descriptorOrInitializer.set;
      }
    } else {
      // Target property is non-accessor
      if (DEV && (propertyRecord.get || propertyRecord.set)) {
        // Specify "accessor options" for non-accessor property is forbidden.
        errorID(3655, propertyKey, getClassName(ctor), propertyKey, propertyKey);
        return;
      }

      setDefaultValue(cache, propertyRecord, ctor, propertyKey, descriptorOrInitializer);

      if (EDITOR && !window.Build || TEST) {
        // eslint-disable-next-line no-prototype-builtins
        if (!fullOptions && options && options.hasOwnProperty('default')) {
          warnID(3653, propertyKey, getClassName(ctor));
        }
      }
    }
  }

  function setDefaultValue(classStash, propertyStash, classConstructor, propertyKey, descriptorOrInitializer) {
    if (descriptorOrInitializer !== undefined) {
      if (typeof descriptorOrInitializer === 'function') {
        propertyStash["default"] = getDefaultFromInitializer(descriptorOrInitializer);
      } else if (descriptorOrInitializer === null) {// For some decorated properties we haven't specified the default value, then the initializer should be null.
        // We fall back to the behavior of v3.6.3, where we don't specify the default value automatically.
        // propertyStash.default = undefined;
      } else if (descriptorOrInitializer.initializer) {
        // In the case of Babel, if an initializer is given for a class field.
        // That initializer is passed to `descriptor.initializer`.
        propertyStash["default"] = getDefaultFromInitializer(descriptorOrInitializer.initializer);
      }
    } else {
      // In the case of TypeScript, we can not directly capture the initializer.
      // We have to be hacking to extract the value.
      // We should fall back to the TypeScript case only when `descriptorOrInitializer` is undefined.
      var actualDefaultValues = classStash["default"] || (classStash["default"] = extractActualDefaultValues(classConstructor)); // eslint-disable-next-line no-prototype-builtins

      if (actualDefaultValues.hasOwnProperty(propertyKey)) {
        propertyStash["default"] = actualDefaultValues[propertyKey];
      }
    }
  }

  _export({
    property: property,
    getOrCreatePropertyStash: getOrCreatePropertyStash
  });

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      DEV = _virtualInternal253AconstantsJs.DEV;
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      TEST = _virtualInternal253AconstantsJs.TEST;
    }, function (_utilsJs) {
      getSubDict = _utilsJs.getSubDict;
      getClassCache = _utilsJs.getClassCache;
    }, function (_platformDebugJs) {
      warnID = _platformDebugJs.warnID;
      errorID = _platformDebugJs.errorID;
    }, function (_utilsPreprocessClassJs) {
      getFullFormOfProperty = _utilsPreprocessClassJs.getFullFormOfProperty;
    }, function (_classStashJs) {
      PropertyStashInternalFlag = _classStashJs.PropertyStashInternalFlag;
    }, function (_utilsJsTypedJs) {
      getClassName = _utilsJsTypedJs.getClassName;
      mixin = _utilsJsTypedJs.mixin;
    }],
    execute: function () {}
  };
});