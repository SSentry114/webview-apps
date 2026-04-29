System.register("q-bundled:///fs/cocos/physics/physx/shapes/physx-box-shape.js", ["../../utils/util.js", "../physx-adapter.js", "./physx-shape.js", "../physx-instance.js"], function (_export, _context) {
  "use strict";

  var absolute, VEC3_0, PX, EPhysXShapeType, PhysXShape, PhysXInstance, PhysXBoxShape;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("PhysXBoxShape", void 0);

  return {
    setters: [function (_utilsUtilJs) {
      absolute = _utilsUtilJs.absolute;
      VEC3_0 = _utilsUtilJs.VEC3_0;
    }, function (_physxAdapterJs) {
      PX = _physxAdapterJs.PX;
    }, function (_physxShapeJs) {
      EPhysXShapeType = _physxShapeJs.EPhysXShapeType;
      PhysXShape = _physxShapeJs.PhysXShape;
    }, function (_physxInstanceJs) {
      PhysXInstance = _physxInstanceJs.PhysXInstance;
    }],
    execute: function () {
      _export("PhysXBoxShape", PhysXBoxShape = class PhysXBoxShape extends PhysXShape {
        constructor() {
          super(EPhysXShapeType.BOX);

          if (!PhysXBoxShape.BOX_GEOMETRY) {
            VEC3_0.set(0.5, 0.5, 0.5);
            PhysXBoxShape.BOX_GEOMETRY = new PX.BoxGeometry(VEC3_0);
          }
        }

        updateSize() {
          this.updateScale();
        }

        get collider() {
          return this._collider;
        }

        onComponentSet() {
          this.updateGeometry();
          const pxmat = this.getSharedMaterial(this._collider.sharedMaterial);
          this._impl = PhysXInstance.physics.createShape(PhysXBoxShape.BOX_GEOMETRY, pxmat, true, this._flags);
        }

        updateScale() {
          this.updateGeometry();

          this._impl.setGeometry(PhysXBoxShape.BOX_GEOMETRY);

          this.setCenter(this._collider.center);
        }

        updateGeometry() {
          const co = this.collider;
          const ws = co.node.worldScale;
          VEC3_0.set(co.size).multiplyScalar(0.5).multiply(ws);
          PhysXBoxShape.BOX_GEOMETRY.setHalfExtents(absolute(VEC3_0));
        }

      });

      PhysXBoxShape.BOX_GEOMETRY = void 0;
    }
  };
});