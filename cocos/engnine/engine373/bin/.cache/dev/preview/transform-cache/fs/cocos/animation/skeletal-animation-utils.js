System.register("q-bundled:///fs/cocos/animation/skeletal-animation-utils.js", ["../core/index.js"], function (_export, _context) {
  "use strict";

  var Mat4, stack, pool;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function getWorldMatrix(transform, stamp) {
    var i = 0;
    var res = Mat4.IDENTITY;

    while (transform) {
      if (transform.stamp === stamp || transform.stamp + 1 === stamp && !transform.node.hasChangedFlags) {
        res = transform.world;
        transform.stamp = stamp;
        break;
      }

      transform.stamp = stamp;
      stack[i++] = transform;
      transform = transform.parent;
    }

    while (i > 0) {
      transform = stack[--i];
      stack[i] = null;
      var node = transform.node;
      Mat4.fromRTS(transform.local, node.rotation, node.position, node.scale);
      res = Mat4.multiply(transform.world, res, transform.local);
    }

    return res;
  }

  function getTransform(node, root) {
    var joint = null;
    var i = 0;

    while (node !== root) {
      var id = node.uuid;

      if (pool.has(id)) {
        joint = pool.get(id);
        break;
      } else {
        // TODO: object reuse
        joint = {
          node: node,
          local: new Mat4(),
          world: new Mat4(),
          stamp: -1,
          parent: null
        };
        pool.set(id, joint);
      }

      stack[i++] = joint;
      node = node.parent;
      joint = null;
    }

    var child;

    while (i > 0) {
      child = stack[--i];
      stack[i] = null;
      child.parent = joint;
      joint = child;
    }

    return joint;
  }

  function deleteTransform(node) {
    var transform = pool.get(node.uuid) || null;

    while (transform) {
      pool["delete"](transform.node.uuid);
      transform = transform.parent;
    }
  }

  _export({
    getWorldMatrix: getWorldMatrix,
    getTransform: getTransform,
    deleteTransform: deleteTransform
  });

  return {
    setters: [function (_coreIndexJs) {
      Mat4 = _coreIndexJs.Mat4;
    }],
    execute: function () {
      stack = [];
      pool = new Map();
    }
  };
});