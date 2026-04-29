System.register("q-bundled:///fs/cocos/physics/physx/joints/physx-fixed-joint.js", ["../../../core/index.js", "../../framework/index.js", "../physx-adapter.js", "./physx-joint.js"], function (_export, _context) {
  "use strict";

  var Vec3, Quat, Mat4, PhysicsSystem, PX, getTempTransform, _pxtrans, PhysXJoint, PhysXFixedJoint;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_coreIndexJs) {
      Vec3 = _coreIndexJs.Vec3;
      Quat = _coreIndexJs.Quat;
      Mat4 = _coreIndexJs.Mat4;
    }, function (_frameworkIndexJs) {
      PhysicsSystem = _frameworkIndexJs.PhysicsSystem;
    }, function (_physxAdapterJs) {
      PX = _physxAdapterJs.PX;
      getTempTransform = _physxAdapterJs.getTempTransform;
      _pxtrans = _physxAdapterJs._pxtrans;
    }, function (_physxJointJs) {
      PhysXJoint = _physxJointJs.PhysXJoint;
    }],
    execute: function () {
      _export("PhysXFixedJoint", PhysXFixedJoint = /*#__PURE__*/function (_PhysXJoint) {
        _inheritsLoose(PhysXFixedJoint, _PhysXJoint);

        function PhysXFixedJoint() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _PhysXJoint.call.apply(_PhysXJoint, [this].concat(args)) || this;
          _this._breakForce = 0;
          _this._breakTorque = 0;
          return _this;
        }

        var _proto = PhysXFixedJoint.prototype;

        _proto.setBreakForce = function setBreakForce(v) {
          this._breakForce = this.constraint.breakForce;

          this._impl.setBreakForce(this._breakForce, this._breakTorque);
        };

        _proto.setBreakTorque = function setBreakTorque(v) {
          this._breakTorque = this.constraint.breakTorque;

          this._impl.setBreakForce(this._breakForce, this._breakTorque);
        };

        _proto.onComponentSet = function onComponentSet() {
          this._impl = PX.createFixedConstraint(PhysXJoint.tempActor, _pxtrans, null, _pxtrans);
          this.setBreakForce(this.constraint.breakForce);
          this.setBreakTorque(this.constraint.breakTorque);
          this.updateFrame();
        };

        _proto.updateFrame = function updateFrame() {
          var bodyA = this._rigidBody.body.sharedBody;
          var cb = this.constraint.connectedBody;
          var bodyB = cb ? cb.body.sharedBody : PhysicsSystem.instance.physicsWorld.getSharedBody(bodyA.node);
          var pos = new Vec3();
          var rot = new Quat();
          var trans = new Mat4();
          Mat4.fromRT(trans, bodyA.node.worldRotation, bodyA.node.worldPosition);
          Mat4.invert(trans, trans);
          Mat4.getRotation(rot, trans);
          Mat4.getTranslation(pos, trans);

          this._impl.setLocalPose(0, getTempTransform(pos, rot));

          Mat4.fromRT(trans, bodyB.node.worldRotation, bodyB.node.worldPosition);
          Mat4.invert(trans, trans);
          Mat4.getRotation(rot, trans);
          Mat4.getTranslation(pos, trans);

          this._impl.setLocalPose(1, getTempTransform(pos, rot));
        };

        _proto.updateScale0 = function updateScale0() {
          this.updateFrame();
        };

        _proto.updateScale1 = function updateScale1() {
          this.updateFrame();
        };

        _createClass(PhysXFixedJoint, [{
          key: "constraint",
          get: function get() {
            return this._com;
          }
        }]);

        return PhysXFixedJoint;
      }(PhysXJoint));
    }
  };
});