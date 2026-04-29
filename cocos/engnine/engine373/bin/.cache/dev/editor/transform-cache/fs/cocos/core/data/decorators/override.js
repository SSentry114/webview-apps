System.register("q-bundled:///fs/cocos/core/data/decorators/override.js", ["./property.js"], function (_export, _context) {
  "use strict";

  var getOrCreatePropertyStash, override;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_propertyJs) {
      getOrCreatePropertyStash = _propertyJs.getOrCreatePropertyStash;
    }],
    execute: function () {
      /**
       *
       * @engineInternal
       */
      _export("override", override = (target, propertyKey, descriptorOrInitializer) => {
        const propertyStash = getOrCreatePropertyStash(target, propertyKey, descriptorOrInitializer);
        propertyStash.override = true;
      });
    }
  };
});