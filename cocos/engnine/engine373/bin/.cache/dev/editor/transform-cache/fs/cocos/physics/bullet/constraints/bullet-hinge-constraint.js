System.register("q-bundled:///fs/cocos/physics/bullet/constraints/bullet-hinge-constraint.js", ["./bullet-constraint.js", "../../../core/index.js", "../bullet-cache.js", "../instantiated.js", "../bullet-utils.js"], function (_export, _context) {
  "use strict";

  var BulletConstraint, Quat, Vec3, BulletCache, CC_QUAT_0, CC_V3_0, bt, cocos2BulletQuat, cocos2BulletVec3, BulletHingeConstraint;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("BulletHingeConstraint", void 0);

  return {
    setters: [function (_bulletConstraintJs) {
      BulletConstraint = _bulletConstraintJs.BulletConstraint;
    }, function (_coreIndexJs) {
      Quat = _coreIndexJs.Quat;
      Vec3 = _coreIndexJs.Vec3;
    }, function (_bulletCacheJs) {
      BulletCache = _bulletCacheJs.BulletCache;
      CC_QUAT_0 = _bulletCacheJs.CC_QUAT_0;
      CC_V3_0 = _bulletCacheJs.CC_V3_0;
    }, function (_instantiatedJs) {
      bt = _instantiatedJs.bt;
    }, function (_bulletUtilsJs) {
      cocos2BulletQuat = _bulletUtilsJs.cocos2BulletQuat;
      cocos2BulletVec3 = _bulletUtilsJs.cocos2BulletVec3;
    }],
    execute: function () {
      _export("BulletHingeConstraint", BulletHingeConstraint = class BulletHingeConstraint extends BulletConstraint {
        setPivotA(v) {
          this.updateFrames();
        }

        setPivotB(v) {
          this.updateFrames();
        }

        setAxis(v) {
          this.updateFrames();
        }

        get constraint() {
          return this._com;
        }

        onComponentSet() {
          const cb = this.constraint.connectedBody;
          const bodyA = this._rigidBody.body.impl;
          const bodyB = cb ? cb.body.impl : bt.TypedConstraint_getFixedBody();
          const trans0 = BulletCache.instance.BT_TRANSFORM_0;
          const trans1 = BulletCache.instance.BT_TRANSFORM_1;
          this._impl = bt.HingeConstraint_new(bodyA, bodyB, trans0, trans1);
          this.updateFrames();
        }

        updateFrames() {
          const cs = this.constraint;
          const node = cs.node;
          const v3_0 = CC_V3_0;
          const rot_0 = CC_QUAT_0;
          const trans0 = BulletCache.instance.BT_TRANSFORM_0;
          Vec3.multiply(v3_0, node.worldScale, cs.pivotA);
          cocos2BulletVec3(bt.Transform_getOrigin(trans0), v3_0);
          const quat = BulletCache.instance.BT_QUAT_0;
          Quat.rotationTo(rot_0, Vec3.UNIT_Z, cs.axis);
          cocos2BulletQuat(quat, rot_0);
          bt.Transform_setRotation(trans0, quat);
          const trans1 = BulletCache.instance.BT_TRANSFORM_1;
          const cb = this.constraint.connectedBody;

          if (cb) {
            Vec3.multiply(v3_0, cb.node.worldScale, cs.pivotB);
          } else {
            Vec3.multiply(v3_0, node.worldScale, cs.pivotA);
            Vec3.add(v3_0, v3_0, node.worldPosition);
            Vec3.add(v3_0, v3_0, cs.pivotB);
            Quat.multiply(rot_0, rot_0, node.worldRotation);
          }

          cocos2BulletVec3(bt.Transform_getOrigin(trans1), v3_0);
          cocos2BulletQuat(quat, rot_0);
          bt.Transform_setRotation(trans1, quat);
          bt.HingeConstraint_setFrames(this._impl, trans0, trans1);
        }

        updateScale0() {
          this.updateFrames();
        }

        updateScale1() {
          this.updateFrames();
        }

      });
    }
  };
});