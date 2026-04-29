System.register("q-bundled:///fs/cocos/physics/physx/joints/physx-joint.js", ["../physx-adapter.js", "../physx-instance.js"], function (_export, _context) {
  "use strict";

  var PX, setJointActors, _pxtrans, PhysXInstance, PhysXJoint;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("PhysXJoint", void 0);

  return {
    setters: [function (_physxAdapterJs) {
      PX = _physxAdapterJs.PX;
      setJointActors = _physxAdapterJs.setJointActors;
      _pxtrans = _physxAdapterJs._pxtrans;
    }, function (_physxInstanceJs) {
      PhysXInstance = _physxInstanceJs.PhysXInstance;
    }],
    execute: function () {
      _export("PhysXJoint", PhysXJoint = class PhysXJoint {
        static get tempActor() {
          if (!this._tempActor) {
            this._tempActor = PhysXInstance.physics.createRigidDynamic(_pxtrans);
          }

          return this._tempActor;
        }

        setConnectedBody(v) {// TODO
        }

        setEnableCollision(v) {
          this._impl.setConstraintFlag(1 << 3, v);
        }

        get impl() {
          return this._impl;
        }

        get constraint() {
          return this._com;
        }

        initialize(v) {
          this._com = v;
          this._rigidBody = v.attachedBody;
          this.onComponentSet();
          this.setEnableCollision(this._com.enableCollision);

          if (this._impl.$$) {
            PX.IMPL_PTR[this._impl.$$.ptr] = this;
          }
        } // virtual


        onComponentSet() {} // virtual


        updateScale0() {}

        updateScale1() {}

        onEnable() {
          const sb = this._rigidBody.body.sharedBody;
          const connect = this._com.connectedBody;
          sb.addJoint(this, 0);

          if (connect) {
            const sb2 = connect.body.sharedBody;
            setJointActors(this._impl, sb.impl, sb2.impl);
            sb2.addJoint(this, 1);
          } else {
            setJointActors(this._impl, sb.impl, null);
          }
        }

        onDisable() {
          setJointActors(this._impl, PhysXJoint.tempActor, null);
          const sb = this._rigidBody.body.sharedBody;
          sb.removeJoint(this, 0);
          const connect = this.constraint.connectedBody;

          if (connect) {
            const sb2 = connect.body.sharedBody;
            sb2.removeJoint(this, 1);
          }
        }

        onDestroy() {
          if (this._impl.$$) {
            PX.IMPL_PTR[this._impl.$$.ptr] = null;
            delete PX.IMPL_PTR[this._impl.$$.ptr];
          }

          this._impl.release();

          this._com = null;
          this._rigidBody = null;
          this._impl = null;
        }

      });

      PhysXJoint._tempActor = void 0;
    }
  };
});