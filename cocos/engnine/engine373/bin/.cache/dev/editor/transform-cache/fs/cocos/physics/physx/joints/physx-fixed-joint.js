System.register("q-bundled:///fs/cocos/physics/physx/joints/physx-fixed-joint.js", ["../../../core/index.js", "../../framework/index.js", "../physx-adapter.js", "./physx-joint.js"], function (_export, _context) {
  "use strict";

  var Vec3, Quat, Mat4, PhysicsSystem, PX, getTempTransform, _pxtrans, PhysXJoint, PhysXFixedJoint;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("PhysXFixedJoint", void 0);

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
      _export("PhysXFixedJoint", PhysXFixedJoint = class PhysXFixedJoint extends PhysXJoint {
        constructor(...args) {
          super(...args);
          this._breakForce = 0;
          this._breakTorque = 0;
        }

        setBreakForce(v) {
          this._breakForce = this.constraint.breakForce;

          this._impl.setBreakForce(this._breakForce, this._breakTorque);
        }

        setBreakTorque(v) {
          this._breakTorque = this.constraint.breakTorque;

          this._impl.setBreakForce(this._breakForce, this._breakTorque);
        }

        get constraint() {
          return this._com;
        }

        onComponentSet() {
          this._impl = PX.createFixedConstraint(PhysXJoint.tempActor, _pxtrans, null, _pxtrans);
          this.setBreakForce(this.constraint.breakForce);
          this.setBreakTorque(this.constraint.breakTorque);
          this.updateFrame();
        }

        updateFrame() {
          const bodyA = this._rigidBody.body.sharedBody;
          const cb = this.constraint.connectedBody;
          const bodyB = cb ? cb.body.sharedBody : PhysicsSystem.instance.physicsWorld.getSharedBody(bodyA.node);
          const pos = new Vec3();
          const rot = new Quat();
          const trans = new Mat4();
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
        }

        updateScale0() {
          this.updateFrame();
        }

        updateScale1() {
          this.updateFrame();
        }

      });
    }
  };
});