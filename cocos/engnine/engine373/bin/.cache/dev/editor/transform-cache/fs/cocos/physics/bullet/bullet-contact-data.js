System.register("q-bundled:///fs/cocos/physics/bullet/bullet-contact-data.js", ["../../core/index.js", "./bullet-cache.js", "./instantiated.js", "./bullet-utils.js"], function (_export, _context) {
  "use strict";

  var Vec3, Quat, CC_QUAT_0, BulletCache, bt, bullet2CocosQuat, bullet2CocosVec3, BulletContactData;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("BulletContactData", void 0);

  return {
    setters: [function (_coreIndexJs) {
      Vec3 = _coreIndexJs.Vec3;
      Quat = _coreIndexJs.Quat;
    }, function (_bulletCacheJs) {
      CC_QUAT_0 = _bulletCacheJs.CC_QUAT_0;
      BulletCache = _bulletCacheJs.BulletCache;
    }, function (_instantiatedJs) {
      bt = _instantiatedJs.bt;
    }, function (_bulletUtilsJs) {
      bullet2CocosQuat = _bulletUtilsJs.bullet2CocosQuat;
      bullet2CocosVec3 = _bulletUtilsJs.bullet2CocosVec3;
    }],
    execute: function () {
      _export("BulletContactData", BulletContactData = class BulletContactData {
        get isBodyA() {
          const sb = this.event.selfCollider.shape.sharedBody.body;
          return sb === bt.PersistentManifold_getBody0(this.event.impl);
        }

        constructor(event) {
          this.impl = 0;
          this.event = void 0;
          this.event = event;
        }

        getLocalPointOnA(out) {
          if (this.impl) bullet2CocosVec3(out, bt.ManifoldPoint_get_m_localPointA(this.impl));
        }

        getLocalPointOnB(out) {
          if (this.impl) bullet2CocosVec3(out, bt.ManifoldPoint_get_m_localPointB(this.impl));
        }

        getWorldPointOnA(out) {
          if (this.impl) bullet2CocosVec3(out, bt.ManifoldPoint_get_m_positionWorldOnA(this.impl));
        }

        getWorldPointOnB(out) {
          if (this.impl) bullet2CocosVec3(out, bt.ManifoldPoint_get_m_positionWorldOnB(this.impl));
        }

        getLocalNormalOnA(out) {
          if (this.impl) {
            const bt_rot = BulletCache.instance.BT_QUAT_0;
            const body = bt.PersistentManifold_getBody0(this.event.impl);
            const trans = bt.CollisionObject_getWorldTransform(body);
            bt.Transform_getRotation(trans, bt_rot);
            const inv_rot = CC_QUAT_0;
            bullet2CocosQuat(inv_rot, bt_rot);
            Quat.conjugate(inv_rot, inv_rot);
            bullet2CocosVec3(out, bt.ManifoldPoint_get_m_normalWorldOnB(this.impl));
            if (!this.isBodyA) Vec3.negate(out, out);
            Vec3.transformQuat(out, out, inv_rot);
          }
        }

        getLocalNormalOnB(out) {
          if (this.impl) {
            const bt_rot = BulletCache.instance.BT_QUAT_0;
            const body = bt.PersistentManifold_getBody1(this.event.impl);
            const trans = bt.CollisionObject_getWorldTransform(body);
            bt.Transform_getRotation(trans, bt_rot);
            const inv_rot = CC_QUAT_0;
            bullet2CocosQuat(inv_rot, bt_rot);
            Quat.conjugate(inv_rot, inv_rot);
            bullet2CocosVec3(out, bt.ManifoldPoint_get_m_normalWorldOnB(this.impl));
            Vec3.transformQuat(out, out, inv_rot);
          }
        }

        getWorldNormalOnA(out) {
          if (this.impl) {
            bullet2CocosVec3(out, bt.ManifoldPoint_get_m_normalWorldOnB(this.impl));
            if (!this.isBodyA) Vec3.negate(out, out);
          }
        }

        getWorldNormalOnB(out) {
          if (this.impl) bullet2CocosVec3(out, bt.ManifoldPoint_get_m_normalWorldOnB(this.impl));
        }

      });
    }
  };
});