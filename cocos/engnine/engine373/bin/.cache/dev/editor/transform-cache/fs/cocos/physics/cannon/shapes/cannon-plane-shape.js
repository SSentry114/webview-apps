System.register("q-bundled:///fs/cocos/physics/cannon/shapes/cannon-plane-shape.js", ["@cocos/cannon", "../../../core/index.js", "../cannon-util.js", "./cannon-shape.js"], function (_export, _context) {
  "use strict";

  var CANNON, Vec3, Quat, commitShapeUpdates, CannonShape, CannonPlaneShape;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("CannonPlaneShape", void 0);

  return {
    setters: [function (_cocosCannon) {
      CANNON = _cocosCannon.default;
    }, function (_coreIndexJs) {
      Vec3 = _coreIndexJs.Vec3;
      Quat = _coreIndexJs.Quat;
    }, function (_cannonUtilJs) {
      commitShapeUpdates = _cannonUtilJs.commitShapeUpdates;
    }, function (_cannonShapeJs) {
      CannonShape = _cannonShapeJs.CannonShape;
    }],
    execute: function () {
      _export("CannonPlaneShape", CannonPlaneShape = class CannonPlaneShape extends CannonShape {
        get collider() {
          return this._collider;
        }

        get impl() {
          return this._shape;
        }

        constructor() {
          super();
          this._shape = new CANNON.Plane();
        }

        setNormal(v) {
          Quat.rotationTo(this._orient, Vec3.UNIT_Z, v);

          if (this._index !== -1) {
            commitShapeUpdates(this._body);
          }
        }

        setConstant(v) {
          Vec3.scaleAndAdd(this._offset, this._collider.center, this.collider.normal, v);
        }

        onLoad() {
          super.onLoad();
          this.setConstant(this.collider.constant);
          this.setNormal(this.collider.normal);
        }

        _setCenter(v) {
          super._setCenter(v);

          this.setConstant(this.collider.constant);
        }

      });
    }
  };
});