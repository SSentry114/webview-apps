System.register("q-bundled:///fs/cocos/animation/transform-utils.js", ["../core/index.js"], function (_export, _context) {
  "use strict";

  var Mat4, m4_1;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  /**
   * @deprecated since v3.5.0, this is an engine private interface that will be removed in the future.
   */
  function getPathFromRoot(target, root) {
    let node = target;
    let path = '';

    while (node !== null && node !== root) {
      path = `${node.name}/${path}`;
      node = node.parent;
    }

    return path.slice(0, -1);
  }
  /**
   * @deprecated since v3.5.0, this is an engine private interface that will be removed in the future.
   */


  function getWorldTransformUntilRoot(target, root, outMatrix) {
    Mat4.identity(outMatrix);

    while (target !== root) {
      Mat4.fromRTS(m4_1, target.rotation, target.position, target.scale);
      Mat4.multiply(outMatrix, m4_1, outMatrix);
      target = target.parent;
    }

    return outMatrix;
  }

  _export({
    getPathFromRoot: getPathFromRoot,
    getWorldTransformUntilRoot: getWorldTransformUntilRoot
  });

  return {
    setters: [function (_coreIndexJs) {
      Mat4 = _coreIndexJs.Mat4;
    }],
    execute: function () {
      m4_1 = new Mat4();
    }
  };
});