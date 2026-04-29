System.register("q-bundled:///fs/cocos/core/data/custom-serializable.js", ["./utils/asserts.js"], function (_export, _context) {
  "use strict";

  var assertIsNonNullable, assertIsTrue, serializeTag, deserializeTag, enableIfCCON;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_utilsAssertsJs) {
      assertIsNonNullable = _utilsAssertsJs.assertIsNonNullable;
      assertIsTrue = _utilsAssertsJs.assertIsTrue;
    }],
    execute: function () {
      /**
       * Tag to define the custom serialization method.
       * @internal
       */
      _export("serializeTag", serializeTag = Symbol('[[Serialize]]'));
      /**
       * Tag to define the custom deserialization method.
       * @internal
       */


      _export("deserializeTag", deserializeTag = Symbol('[[Deserialize]]'));

      /**
       * Enables the custom to serialize/deserialize method only if the (de)serialize procedure is targeting CCON.
       * @deprecated since v3.5.0, this is an engine private interface that will be removed in the future.
       */
      _export("enableIfCCON", enableIfCCON = (_target, propertyKey, descriptor) => {
        const original = descriptor.value;
        assertIsNonNullable(original);

        if (propertyKey === serializeTag) {
          return { ...descriptor,
            value: function wrapSerialize(output, context) {
              if (!context.toCCON) {
                output.writeThis();
              } else {
                original.call(this, output, context);
              }
            }
          };
        } else {
          assertIsTrue(propertyKey === deserializeTag, '@enableIfCCON should be only applied to custom (de)serialize method');
          return { ...descriptor,
            value: function wrapDeserialize(input, context) {
              if (!context.fromCCON) {
                input.readThis();
              } else {
                original.call(this, input, context);
              }
            }
          };
        }
      });
    }
  };
});