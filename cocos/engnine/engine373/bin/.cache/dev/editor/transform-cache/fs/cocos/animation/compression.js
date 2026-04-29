System.register("q-bundled:///fs/cocos/animation/compression.js", ["../core/index.js"], function (_export, _context) {
  "use strict";

  var approx;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  /**
   * Removes keys which are linear interpolations of surrounding keys.
   * @param keys Input keys.
   * @param values Input values.
   * @param maxDiff Max error.
   * @returns The new keys `keys` and new values `values`.
   */
  function removeLinearKeys(keys, values, maxDiff = 1e-3) {
    const nKeys = keys.length;

    if (nKeys < 3) {
      return {
        keys: keys.slice(),
        values: values.slice()
      };
    }

    const removeFlags = new Array(nKeys).fill(false); // We may choose to use different key selection policy?
    // http://nfrechette.github.io/2016/12/07/anim_compression_key_reduction/

    const iLastKey = nKeys - 1;

    for (let iKey = 1; iKey < iLastKey; ++iKey) {
      // Should we select previous non-removed key?
      const iPrevious = iKey - 1;
      const iNext = iKey + 1;
      const {
        [iPrevious]: previousKey,
        [iKey]: currentKey,
        [iNext]: nextKey
      } = keys;
      const {
        [iPrevious]: previousValue,
        [iKey]: currentValue,
        [iNext]: nextValue
      } = values;
      const alpha = (currentKey - previousKey) / (nextKey - previousKey);
      const expectedValue = (nextValue - previousValue) * alpha + previousValue;

      if (approx(expectedValue, currentValue, maxDiff)) {
        removeFlags[iKey] = true;
      }
    }

    return filterFromRemoveFlags(keys, values, removeFlags);
  }
  /**
   * Removes trivial frames.
   * @param keys Input keys.
   * @param values Input values.
   * @param maxDiff Max error.
   * @returns The new keys `keys` and new values `values`.
   */


  function removeTrivialKeys(keys, values, maxDiff = 1e-3) {
    const nKeys = keys.length;

    if (nKeys < 2) {
      return {
        keys: keys.slice(),
        values: values.slice()
      };
    }

    const removeFlags = new Array(nKeys).fill(false);

    for (let iKey = 1; iKey < nKeys; ++iKey) {
      // Should we select previous non-removed key?
      const iPrevious = iKey - 1;
      const {
        [iPrevious]: previousValue,
        [iKey]: currentValue
      } = values;

      if (approx(previousValue, currentValue, maxDiff)) {
        removeFlags[iKey] = true;
      }
    }

    return filterFromRemoveFlags(keys, values, removeFlags);
  }

  function filterFromRemoveFlags(keys, values, removeFlags) {
    const nKeys = keys.length;
    const nRemovals = removeFlags.reduce((n, removeFlag) => removeFlag ? n + 1 : n, 0);

    if (!nRemovals) {
      return {
        keys: keys.slice(),
        values: values.slice()
      };
    }

    const nNewKeyframes = nKeys - nRemovals;
    const newKeys = new Array(nNewKeyframes).fill(0.0);
    const newValues = new Array(nNewKeyframes).fill(0.0);

    for (let iNewKeys = 0, iKey = 0; iKey < nKeys; ++iKey) {
      if (!removeFlags[iKey]) {
        newKeys[iNewKeys] = keys[iKey];
        newValues[iNewKeys] = values[iKey];
        ++iNewKeys;
      }
    }

    return {
      keys: newKeys,
      values: newValues
    };
  }

  _export({
    removeLinearKeys: removeLinearKeys,
    removeTrivialKeys: removeTrivialKeys
  });

  return {
    setters: [function (_coreIndexJs) {
      approx = _coreIndexJs.approx;
    }],
    execute: function () {}
  };
});