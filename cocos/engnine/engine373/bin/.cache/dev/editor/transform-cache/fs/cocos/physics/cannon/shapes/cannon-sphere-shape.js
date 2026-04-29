System.register("q-bundled:///fs/cocos/physics/cannon/shapes/cannon-sphere-shape.js", ["@cocos/cannon", "../../../core/index.js", "../cannon-util.js", "./cannon-shape.js", "../../../../exports/physics-framework.js"], function (_export, _context) {
  "use strict";

  var CANNON, absMaxComponent, clamp, commitShapeUpdates, CannonShape, PhysicsSystem, CannonSphereShape;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("CannonSphereShape", void 0);

  return {
    setters: [function (_cocosCannon) {
      CANNON = _cocosCannon.default;
    }, function (_coreIndexJs) {
      absMaxComponent = _coreIndexJs.absMaxComponent;
      clamp = _coreIndexJs.clamp;
    }, function (_cannonUtilJs) {
      commitShapeUpdates = _cannonUtilJs.commitShapeUpdates;
    }, function (_cannonShapeJs) {
      CannonShape = _cannonShapeJs.CannonShape;
    }, function (_exportsPhysicsFrameworkJs) {
      PhysicsSystem = _exportsPhysicsFrameworkJs.PhysicsSystem;
    }],
    execute: function () {
      _export("CannonSphereShape", CannonSphereShape = class CannonSphereShape extends CannonShape {
        get collider() {
          return this._collider;
        }

        get impl() {
          return this._shape;
        }

        updateRadius() {
          const max = Math.abs(absMaxComponent(this.collider.node.worldScale));
          this.impl.radius = clamp(this.collider.radius * Math.abs(max), PhysicsSystem.instance.minVolumeSize, Number.MAX_VALUE);
          this.impl.updateBoundingSphereRadius();

          if (this._index !== -1) {
            commitShapeUpdates(this._body);
          }
        }

        constructor(radius = 0.5) {
          super();
          this._shape = new CANNON.Sphere(radius);
        }

        onLoad() {
          super.onLoad();
          this.updateRadius();
        }

        setScale(scale) {
          super.setScale(scale);
          this.updateRadius();
        }

      });
    }
  };
});