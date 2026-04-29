System.register("q-bundled:///fs/cocos/physics/physx/shapes/physx-trimesh-shape.js", ["../../../core/index.js", "../physx-adapter.js", "./physx-shape.js", "../../../gfx/index.js", "../physx-instance.js"], function (_export, _context) {
  "use strict";

  var Quat, Vec3, createConvexMesh, createMeshGeometryFlags, createTriangleMesh, PX, removeReference, EPhysXShapeType, PhysXShape, AttributeName, PhysXInstance, PhysXTrimeshShape;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("PhysXTrimeshShape", void 0);

  return {
    setters: [function (_coreIndexJs) {
      Quat = _coreIndexJs.Quat;
      Vec3 = _coreIndexJs.Vec3;
    }, function (_physxAdapterJs) {
      createConvexMesh = _physxAdapterJs.createConvexMesh;
      createMeshGeometryFlags = _physxAdapterJs.createMeshGeometryFlags;
      createTriangleMesh = _physxAdapterJs.createTriangleMesh;
      PX = _physxAdapterJs.PX;
      removeReference = _physxAdapterJs.removeReference;
    }, function (_physxShapeJs) {
      EPhysXShapeType = _physxShapeJs.EPhysXShapeType;
      PhysXShape = _physxShapeJs.PhysXShape;
    }, function (_gfxIndexJs) {
      AttributeName = _gfxIndexJs.AttributeName;
    }, function (_physxInstanceJs) {
      PhysXInstance = _physxInstanceJs.PhysXInstance;
    }],
    execute: function () {
      _export("PhysXTrimeshShape", PhysXTrimeshShape = class PhysXTrimeshShape extends PhysXShape {
        constructor() {
          super(EPhysXShapeType.MESH);
          this.geometry = void 0;
        }

        setMesh(v) {
          if (v && v.renderingSubMeshes.length > 0) {
            if (this._impl != null) {
              removeReference(this, this._impl);

              this._impl.release();

              this._impl = null;
            }

            const physics = PhysXInstance.physics;
            const collider = this.collider;
            const pxmat = this.getSharedMaterial(collider.sharedMaterial);
            const meshScale = PhysXShape.MESH_SCALE;
            meshScale.setScale(Vec3.ONE);
            meshScale.setRotation(Quat.IDENTITY);

            if (collider.convex) {
              if (PX.MESH_CONVEX[v._uuid] == null) {
                const cooking = PhysXInstance.cooking;
                const posBuf = v.readAttribute(0, AttributeName.ATTR_POSITION);
                PX.MESH_CONVEX[v._uuid] = createConvexMesh(posBuf, cooking, physics);
              }

              const convexMesh = PX.MESH_CONVEX[v._uuid];
              this.geometry = new PX.ConvexMeshGeometry(convexMesh, meshScale, createMeshGeometryFlags(0, true));
            } else {
              if (PX.MESH_STATIC[v._uuid] == null) {
                const cooking = PhysXInstance.cooking;
                const posBuf = v.readAttribute(0, AttributeName.ATTR_POSITION);
                const indBuf = v.readIndices(0); // Uint16Array ?

                PX.MESH_STATIC[v._uuid] = createTriangleMesh(posBuf, indBuf, cooking, physics);
              }

              const trimesh = PX.MESH_STATIC[v._uuid];
              this.geometry = new PX.TriangleMeshGeometry(trimesh, meshScale, createMeshGeometryFlags(0, false));
            }

            this.updateGeometry();
            this._impl = physics.createShape(this.geometry, pxmat, true, this._flags);
            this.updateByReAdd();
          }
        }

        get collider() {
          return this._collider;
        }

        onComponentSet() {
          this.setMesh(this.collider.mesh);
        }

        updateScale() {
          this.updateGeometry();
          this.setCenter(this._collider.center);
        }

        updateGeometry() {
          const meshScale = PhysXShape.MESH_SCALE;
          meshScale.setScale(this.collider.node.worldScale);
          meshScale.setRotation(Quat.IDENTITY);
          this.geometry.setScale(meshScale);
        }
        /* override */


        setMaterial(v) {
          if (this._impl) super.setMaterial(v);
        }

        setCenter(v) {
          if (this._impl) super.setCenter(v);
        }

        setAsTrigger(v) {
          if (this._impl) super.setAsTrigger(v);
        }

        setFilerData(v) {
          if (this._impl) super.setFilerData(v);
        }

        addToBody() {
          if (this._impl) super.addToBody();
        }

        removeFromBody() {
          if (this._impl) super.removeFromBody();
        }

      });
    }
  };
});