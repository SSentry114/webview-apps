System.register("q-bundled:///fs/cocos/physics/cannon/shapes/cannon-box-shape.js", ["@cocos/cannon", "../../../core/index.js", "../cannon-util.js", "./cannon-shape.js", "../../../../exports/physics-framework.js", "../../utils/util.js"], function (_export, _context) {
  "use strict";

  var CANNON, clamp, Vec3, commitShapeUpdates, CannonShape, PhysicsSystem, absolute, VEC3_0, CannonBoxShape;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("CannonBoxShape", void 0);

  return {
    setters: [function (_cocosCannon) {
      CANNON = _cocosCannon.default;
    }, function (_coreIndexJs) {
      clamp = _coreIndexJs.clamp;
      Vec3 = _coreIndexJs.Vec3;
    }, function (_cannonUtilJs) {
      commitShapeUpdates = _cannonUtilJs.commitShapeUpdates;
    }, function (_cannonShapeJs) {
      CannonShape = _cannonShapeJs.CannonShape;
    }, function (_exportsPhysicsFrameworkJs) {
      PhysicsSystem = _exportsPhysicsFrameworkJs.PhysicsSystem;
    }, function (_utilsUtilJs) {
      absolute = _utilsUtilJs.absolute;
      VEC3_0 = _utilsUtilJs.VEC3_0;
    }],
    execute: function () {
      _export("CannonBoxShape", CannonBoxShape = class CannonBoxShape extends CannonShape {
        get collider() {
          return this._collider;
        }

        get impl() {
          return this._shape;
        }

        constructor() {
          super();
          this.halfExtent = void 0;
          this.halfExtent = new CANNON.Vec3(0.5, 0.5, 0.5);
          this._shape = new CANNON.Box(this.halfExtent.clone());
        }

        updateSize() {
          Vec3.multiplyScalar(this.halfExtent, this.collider.size, 0.5);
          const ws = absolute(VEC3_0.set(this.collider.node.worldScale));
          const x = this.halfExtent.x * ws.x;
          const y = this.halfExtent.y * ws.y;
          const z = this.halfExtent.z * ws.z;
          const minVolumeSize = PhysicsSystem.instance.minVolumeSize;
          this.impl.halfExtents.x = clamp(x, minVolumeSize, Number.MAX_VALUE);
          this.impl.halfExtents.y = clamp(y, minVolumeSize, Number.MAX_VALUE);
          this.impl.halfExtents.z = clamp(z, minVolumeSize, Number.MAX_VALUE);
          this.impl.updateConvexPolyhedronRepresentation();

          if (this._index !== -1) {
            commitShapeUpdates(this._body);
          }
        }

        onLoad() {
          super.onLoad();
          this.updateSize();
        }

        setScale(scale) {
          super.setScale(scale);
          this.updateSize();
        }

      });
    }
  };
});