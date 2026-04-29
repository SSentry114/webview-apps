System.register("q-bundled:///fs/cocos/physics/bullet/constraints/bullet-fixed-constraint.js", ["./bullet-constraint.js", "../../../core/index.js", "../../framework/index.js", "../bullet-cache.js", "../instantiated.js", "../bullet-utils.js"], function (_export, _context) {
  "use strict";

  var BulletConstraint, Mat4, PhysicsSystem, BulletCache, CC_MAT4_0, CC_QUAT_0, CC_V3_0, bt, cocos2BulletQuat, cocos2BulletVec3, BulletFixedConstraint;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_bulletConstraintJs) {
      BulletConstraint = _bulletConstraintJs.BulletConstraint;
    }, function (_coreIndexJs) {
      Mat4 = _coreIndexJs.Mat4;
    }, function (_frameworkIndexJs) {
      PhysicsSystem = _frameworkIndexJs.PhysicsSystem;
    }, function (_bulletCacheJs) {
      BulletCache = _bulletCacheJs.BulletCache;
      CC_MAT4_0 = _bulletCacheJs.CC_MAT4_0;
      CC_QUAT_0 = _bulletCacheJs.CC_QUAT_0;
      CC_V3_0 = _bulletCacheJs.CC_V3_0;
    }, function (_instantiatedJs) {
      bt = _instantiatedJs.bt;
    }, function (_bulletUtilsJs) {
      cocos2BulletQuat = _bulletUtilsJs.cocos2BulletQuat;
      cocos2BulletVec3 = _bulletUtilsJs.cocos2BulletVec3;
    }],
    execute: function () {
      _export("BulletFixedConstraint", BulletFixedConstraint = /*#__PURE__*/function (_BulletConstraint) {
        _inheritsLoose(BulletFixedConstraint, _BulletConstraint);

        function BulletFixedConstraint() {
          return _BulletConstraint.apply(this, arguments) || this;
        }

        var _proto = BulletFixedConstraint.prototype;

        _proto.setBreakForce = function setBreakForce(v) {
          bt.TypedConstraint_setMaxImpulseThreshold(this._impl, v);
        };

        _proto.setBreakTorque = function setBreakTorque(v) {// not supported
        };

        _proto.onComponentSet = function onComponentSet() {
          var cb = this.constraint.connectedBody;
          var bodyA = this._rigidBody.body.sharedBody;
          var bodyB = cb ? cb.body.sharedBody : PhysicsSystem.instance.physicsWorld.getSharedBody(bodyA.node);
          var trans0 = BulletCache.instance.BT_TRANSFORM_0;
          var trans1 = BulletCache.instance.BT_TRANSFORM_1;
          this._impl = bt.FixedConstraint_new(bodyA.body, bodyB.body, trans0, trans1);
          this.setBreakForce(this.constraint.breakForce);
          this.setBreakTorque(this.constraint.breakTorque);
          this.updateFrames();
        };

        _proto.updateFrames = function updateFrames() {
          var cb = this.constraint.connectedBody;
          var bodyA = this._rigidBody.body.sharedBody;
          var bodyB = cb ? cb.body.sharedBody : PhysicsSystem.instance.physicsWorld.getSharedBody(bodyA.node);
          var pos = CC_V3_0;
          var rot = CC_QUAT_0;
          var trans0 = BulletCache.instance.BT_TRANSFORM_0;
          var trans1 = BulletCache.instance.BT_TRANSFORM_1;
          var quat = BulletCache.instance.BT_QUAT_0;
          var trans = CC_MAT4_0; // the local frame transform respect to bodyA

          Mat4.fromRT(trans, bodyA.node.worldRotation, bodyA.node.worldPosition);
          Mat4.invert(trans, trans);
          Mat4.getRotation(rot, trans);
          Mat4.getTranslation(pos, trans);
          cocos2BulletVec3(bt.Transform_getOrigin(trans0), pos);
          cocos2BulletQuat(quat, rot);
          bt.Transform_setRotation(trans0, quat); // the local frame transform respect to bodyB

          Mat4.fromRT(trans, bodyB.node.worldRotation, bodyB.node.worldPosition);
          Mat4.invert(trans, trans);
          Mat4.getRotation(rot, trans);
          Mat4.getTranslation(pos, trans);
          cocos2BulletVec3(bt.Transform_getOrigin(trans1), pos);
          cocos2BulletQuat(quat, rot);
          bt.Transform_setRotation(trans1, quat);
          bt.FixedConstraint_setFrames(this._impl, trans0, trans1);
        };

        _proto.updateScale0 = function updateScale0() {
          this.updateFrames();
        };

        _proto.updateScale1 = function updateScale1() {
          this.updateFrames();
        };

        _createClass(BulletFixedConstraint, [{
          key: "constraint",
          get: function get() {
            return this._com;
          }
        }]);

        return BulletFixedConstraint;
      }(BulletConstraint));
    }
  };
});