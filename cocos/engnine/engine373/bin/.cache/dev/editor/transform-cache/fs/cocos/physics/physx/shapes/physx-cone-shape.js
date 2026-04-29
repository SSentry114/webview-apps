System.register("q-bundled:///fs/cocos/physics/physx/shapes/physx-cone-shape.js", ["../../../core/index.js", "../../../primitive/cylinder.js", "../../framework/index.js", "../physx-adapter.js", "../physx-instance.js", "./physx-shape.js"], function (_export, _context) {
  "use strict";

  var Quat, Vec3, cylinder, EAxisDirection, createConvexMesh, createMeshGeometryFlags, PX, _trans, PhysXInstance, EPhysXShapeType, PhysXShape, PhysXConeShape;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("PhysXConeShape", void 0);

  return {
    setters: [function (_coreIndexJs) {
      Quat = _coreIndexJs.Quat;
      Vec3 = _coreIndexJs.Vec3;
    }, function (_primitiveCylinderJs) {
      cylinder = _primitiveCylinderJs.default;
    }, function (_frameworkIndexJs) {
      EAxisDirection = _frameworkIndexJs.EAxisDirection;
    }, function (_physxAdapterJs) {
      createConvexMesh = _physxAdapterJs.createConvexMesh;
      createMeshGeometryFlags = _physxAdapterJs.createMeshGeometryFlags;
      PX = _physxAdapterJs.PX;
      _trans = _physxAdapterJs._trans;
    }, function (_physxInstanceJs) {
      PhysXInstance = _physxInstanceJs.PhysXInstance;
    }, function (_physxShapeJs) {
      EPhysXShapeType = _physxShapeJs.EPhysXShapeType;
      PhysXShape = _physxShapeJs.PhysXShape;
    }],
    execute: function () {
      _export("PhysXConeShape", PhysXConeShape = class PhysXConeShape extends PhysXShape {
        constructor() {
          super(EPhysXShapeType.CONE);
          this.geometry = void 0;
        }

        setRadius(v) {
          this.updateGeometry();
        }

        setHeight(v) {
          this.updateGeometry();
        }

        setDirection(v) {
          this.updateGeometry();
        }

        get collider() {
          return this._collider;
        }

        onComponentSet() {
          const collider = this.collider;
          const physics = PhysXInstance.physics;

          if (!PhysXConeShape.CONVEX_MESH) {
            const cooking = PhysXInstance.cooking;
            const primitive = cylinder(0, 0.5, 1, {
              radialSegments: 32,
              heightSegments: 1
            });
            PhysXConeShape.CONVEX_MESH = createConvexMesh(primitive.positions, cooking, physics);
          }

          const meshScale = PhysXShape.MESH_SCALE;
          meshScale.setScale(Vec3.ONE);
          meshScale.setRotation(Quat.IDENTITY);
          const convexMesh = PhysXConeShape.CONVEX_MESH;
          const pxmat = this.getSharedMaterial(collider.sharedMaterial);
          this.geometry = new PX.ConvexMeshGeometry(convexMesh, meshScale, createMeshGeometryFlags(0, true));
          this.updateGeometry();
          this._impl = physics.createShape(this.geometry, pxmat, true, this._flags);
        }

        updateScale() {
          this.updateGeometry();
          this.setCenter(this._collider.center);
        }

        updateGeometry() {
          const collider = this.collider;
          const r = collider.radius;
          const h = collider.height;
          const a = collider.direction;
          const scale = _trans.translation;
          Vec3.copy(scale, collider.node.worldScale);
          scale.y *= Math.max(0.0001, h / 1);
          const radius = Math.max(0.0001, r / 0.5);
          const xzMaxNorm = Math.max(scale.x, scale.z);
          scale.x = scale.z = xzMaxNorm * radius;
          const quat = _trans.rotation;

          switch (a) {
            case EAxisDirection.X_AXIS:
              Quat.fromEuler(quat, 0, 0, 90);
              break;

            case EAxisDirection.Y_AXIS:
            default:
              Quat.copy(quat, Quat.IDENTITY);
              break;

            case EAxisDirection.Z_AXIS:
              Quat.fromEuler(quat, 90, 0, 0);
              break;
          }

          const meshScale = PhysXShape.MESH_SCALE;
          meshScale.setScale(scale);
          meshScale.setRotation(quat);
          this.geometry.setScale(meshScale);
          Quat.copy(this._rotation, quat);
        }

      });

      PhysXConeShape.CONVEX_MESH = void 0;
    }
  };
});