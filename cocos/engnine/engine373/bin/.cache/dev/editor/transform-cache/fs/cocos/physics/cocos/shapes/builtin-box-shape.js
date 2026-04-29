System.register("q-bundled:///fs/cocos/physics/cocos/shapes/builtin-box-shape.js", ["../../../core/index.js", "./builtin-shape.js"], function (_export, _context) {
  "use strict";

  var Vec3, geometry, BuiltinShape, BuiltinBoxShape;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("BuiltinBoxShape", void 0);

  return {
    setters: [function (_coreIndexJs) {
      Vec3 = _coreIndexJs.Vec3;
      geometry = _coreIndexJs.geometry;
    }, function (_builtinShapeJs) {
      BuiltinShape = _builtinShapeJs.BuiltinShape;
    }],
    execute: function () {
      _export("BuiltinBoxShape", BuiltinBoxShape = class BuiltinBoxShape extends BuiltinShape {
        get localObb() {
          return this._localShape;
        }

        get worldObb() {
          return this._worldShape;
        }

        get collider() {
          return this._collider;
        }

        constructor() {
          super();
          this._localShape = new geometry.OBB();
          this._worldShape = new geometry.OBB();
        }

        updateSize() {
          Vec3.multiplyScalar(this.localObb.halfExtents, this.collider.size, 0.5);
          Vec3.multiply(this.worldObb.halfExtents, this.localObb.halfExtents, this.collider.node.worldScale);
        }

        onLoad() {
          super.onLoad();
          this.updateSize();
        }

      });
    }
  };
});