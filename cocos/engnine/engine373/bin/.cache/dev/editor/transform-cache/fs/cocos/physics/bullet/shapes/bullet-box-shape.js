System.register("q-bundled:///fs/cocos/physics/bullet/shapes/bullet-box-shape.js", ["./bullet-shape.js", "../../../../exports/physics-framework.js", "../../utils/util.js", "../bullet-utils.js", "../bullet-cache.js", "../instantiated.js"], function (_export, _context) {
  "use strict";

  var BulletShape, PhysicsSystem, absolute, VEC3_0, cocos2BulletVec3, BulletCache, bt, BulletBoxShape;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("BulletBoxShape", void 0);

  return {
    setters: [function (_bulletShapeJs) {
      BulletShape = _bulletShapeJs.BulletShape;
    }, function (_exportsPhysicsFrameworkJs) {
      PhysicsSystem = _exportsPhysicsFrameworkJs.PhysicsSystem;
    }, function (_utilsUtilJs) {
      absolute = _utilsUtilJs.absolute;
      VEC3_0 = _utilsUtilJs.VEC3_0;
    }, function (_bulletUtilsJs) {
      cocos2BulletVec3 = _bulletUtilsJs.cocos2BulletVec3;
    }, function (_bulletCacheJs) {
      BulletCache = _bulletCacheJs.BulletCache;
    }, function (_instantiatedJs) {
      bt = _instantiatedJs.bt;
    }],
    execute: function () {
      _export("BulletBoxShape", BulletBoxShape = class BulletBoxShape extends BulletShape {
        updateSize() {
          const hf = BulletCache.instance.BT_V3_0;
          cocos2BulletVec3(hf, this.getMinUnscaledHalfExtents(VEC3_0));
          bt.BoxShape_setUnscaledHalfExtents(this.impl, hf);
          this.updateCompoundTransform();
        }

        get collider() {
          return this._collider;
        }

        onComponentSet() {
          const hf = BulletCache.instance.BT_V3_0;
          cocos2BulletVec3(hf, this.getMinUnscaledHalfExtents(VEC3_0));
          this._impl = bt.BoxShape_new(hf);
          this.updateScale();
        }

        updateScale() {
          super.updateScale();
          const bt_v3 = BulletCache.instance.BT_V3_0;
          bt.CollisionShape_setLocalScaling(this._impl, cocos2BulletVec3(bt_v3, this.getMinScale(VEC3_0)));
          this.updateCompoundTransform();
        }

        getMinUnscaledHalfExtents(out) {
          const size = this.collider.size;
          const ws = absolute(VEC3_0.set(this._collider.node.worldScale));
          const minVolumeSize = PhysicsSystem.instance.minVolumeSize;
          const halfSizeX = size.x / 2;
          const halfSizeY = size.y / 2;
          const halfSizeZ = size.z / 2;
          const halfX = halfSizeX * ws.x < minVolumeSize ? minVolumeSize / ws.x : halfSizeX;
          const halfY = halfSizeY * ws.y < minVolumeSize ? minVolumeSize / ws.y : halfSizeY;
          const halfZ = halfSizeZ * ws.z < minVolumeSize ? minVolumeSize / ws.z : halfSizeZ;
          out.set(halfX, halfY, halfZ);
          return out;
        }

        getMinScale(out) {
          const size = this.collider.size;
          const ws = absolute(VEC3_0.set(this._collider.node.worldScale));
          const minVolumeSize = PhysicsSystem.instance.minVolumeSize;
          const halfSizeX = size.x / 2;
          const halfSizeY = size.y / 2;
          const halfSizeZ = size.z / 2;
          const scaleX = halfSizeX * ws.x < minVolumeSize ? minVolumeSize / halfSizeX : ws.x;
          const scaleY = halfSizeY * ws.y < minVolumeSize ? minVolumeSize / halfSizeY : ws.y;
          const scaleZ = halfSizeZ * ws.z < minVolumeSize ? minVolumeSize / halfSizeZ : ws.z;
          out.set(scaleX, scaleY, scaleZ);
          return out;
        }

      });
    }
  };
});