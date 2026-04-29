System.register("q-bundled:///fs/cocos/physics/bullet/constraints/bullet-p2p-constraint.js", ["./bullet-constraint.js", "../../../core/index.js", "../bullet-cache.js", "../instantiated.js", "../bullet-utils.js"], function (_export, _context) {
  "use strict";

  var BulletConstraint, Vec3, BulletCache, CC_V3_0, bt, cocos2BulletVec3, BulletP2PConstraint;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("BulletP2PConstraint", void 0);

  return {
    setters: [function (_bulletConstraintJs) {
      BulletConstraint = _bulletConstraintJs.BulletConstraint;
    }, function (_coreIndexJs) {
      Vec3 = _coreIndexJs.Vec3;
    }, function (_bulletCacheJs) {
      BulletCache = _bulletCacheJs.BulletCache;
      CC_V3_0 = _bulletCacheJs.CC_V3_0;
    }, function (_instantiatedJs) {
      bt = _instantiatedJs.bt;
    }, function (_bulletUtilsJs) {
      cocos2BulletVec3 = _bulletUtilsJs.cocos2BulletVec3;
    }],
    execute: function () {
      _export("BulletP2PConstraint", BulletP2PConstraint = class BulletP2PConstraint extends BulletConstraint {
        setPivotA(v) {
          const cs = this.constraint;
          const pivotA = BulletCache.instance.BT_V3_0;
          Vec3.multiply(CC_V3_0, cs.node.worldScale, cs.pivotA);
          cocos2BulletVec3(pivotA, CC_V3_0);
          bt.P2PConstraint_setPivotA(this._impl, pivotA);
          if (!cs.connectedBody) this.setPivotB(cs.pivotB);
        }

        setPivotB(v) {
          const cs = this.constraint;
          const node = this._rigidBody.node;
          const pivotB = BulletCache.instance.BT_V3_0;
          const cb = cs.connectedBody;

          if (cb) {
            Vec3.multiply(CC_V3_0, cb.node.worldScale, cs.pivotB);
            cocos2BulletVec3(pivotB, CC_V3_0);
          } else {
            Vec3.multiply(CC_V3_0, node.worldScale, cs.pivotA);
            Vec3.add(CC_V3_0, CC_V3_0, node.worldPosition);
            Vec3.add(CC_V3_0, CC_V3_0, cs.pivotB);
            cocos2BulletVec3(pivotB, CC_V3_0);
          }

          bt.P2PConstraint_setPivotB(this._impl, pivotB);
        }

        get constraint() {
          return this._com;
        }

        onComponentSet() {
          const cb = this.constraint.connectedBody;
          const bodyA = this._rigidBody.body.impl;
          const bodyB = cb ? cb.body.impl : bt.TypedConstraint_getFixedBody();
          const pivotA = BulletCache.instance.BT_V3_0;
          const pivotB = BulletCache.instance.BT_V3_1;
          this._impl = bt.P2PConstraint_new(bodyA, bodyB, pivotA, pivotB);
          this.setPivotA(this.constraint.pivotA);
          this.setPivotB(this.constraint.pivotB);
        }

        updateScale0() {
          this.setPivotA(this.constraint.pivotA);
        }

        updateScale1() {
          this.setPivotB(this.constraint.pivotB);
        }

      });
    }
  };
});