System.register("q-bundled:///fs/cocos/physics/physx/shapes/physx-plane-shape.js", ["../../../core/index.js", "../physx-adapter.js", "../physx-instance.js", "./physx-shape.js"], function (_export, _context) {
  "use strict";

  var Quat, Vec3, getTempTransform, PX, _trans, PhysXInstance, EPhysXShapeType, PhysXShape, PhysXPlaneShape;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("PhysXPlaneShape", void 0);

  return {
    setters: [function (_coreIndexJs) {
      Quat = _coreIndexJs.Quat;
      Vec3 = _coreIndexJs.Vec3;
    }, function (_physxAdapterJs) {
      getTempTransform = _physxAdapterJs.getTempTransform;
      PX = _physxAdapterJs.PX;
      _trans = _physxAdapterJs._trans;
    }, function (_physxInstanceJs) {
      PhysXInstance = _physxInstanceJs.PhysXInstance;
    }, function (_physxShapeJs) {
      EPhysXShapeType = _physxShapeJs.EPhysXShapeType;
      PhysXShape = _physxShapeJs.PhysXShape;
    }],
    execute: function () {
      _export("PhysXPlaneShape", PhysXPlaneShape = class PhysXPlaneShape extends PhysXShape {
        constructor() {
          super(EPhysXShapeType.PLANE);

          if (!PhysXPlaneShape.PLANE_GEOMETRY) {
            PhysXPlaneShape.PLANE_GEOMETRY = new PX.PlaneGeometry();
          }
        }

        setNormal(v) {
          this.setCenter();
        }

        setConstant(v) {
          this.setCenter();
        }

        setCenter() {
          const co = this.collider;
          const pos = _trans.translation;
          const rot = _trans.rotation;
          Vec3.scaleAndAdd(pos, co.center, co.normal, co.constant);
          Quat.rotationTo(rot, Vec3.UNIT_X, co.normal);
          const trans = getTempTransform(pos, rot);

          this._impl.setLocalPose(trans);
        }

        get collider() {
          return this._collider;
        }

        onComponentSet() {
          const co = this.collider;
          const pxmat = this.getSharedMaterial(co.sharedMaterial);
          this._impl = PhysXInstance.physics.createShape(PhysXPlaneShape.PLANE_GEOMETRY, pxmat, true, this._flags);
          this.setCenter();
        }

        updateScale() {
          this.setCenter();
        }

      });

      PhysXPlaneShape.PLANE_GEOMETRY = void 0;
    }
  };
});