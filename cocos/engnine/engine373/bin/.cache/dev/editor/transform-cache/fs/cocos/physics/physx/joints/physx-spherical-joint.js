System.register("q-bundled:///fs/cocos/physics/physx/joints/physx-spherical-joint.js", ["../../../core/index.js", "../physx-adapter.js", "./physx-joint.js"], function (_export, _context) {
  "use strict";

  var Quat, Vec3, PX, _trans, getTempTransform, _pxtrans, PhysXJoint, PhysXSphericalJoint;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("PhysXSphericalJoint", void 0);

  return {
    setters: [function (_coreIndexJs) {
      Quat = _coreIndexJs.Quat;
      Vec3 = _coreIndexJs.Vec3;
    }, function (_physxAdapterJs) {
      PX = _physxAdapterJs.PX;
      _trans = _physxAdapterJs._trans;
      getTempTransform = _physxAdapterJs.getTempTransform;
      _pxtrans = _physxAdapterJs._pxtrans;
    }, function (_physxJointJs) {
      PhysXJoint = _physxJointJs.PhysXJoint;
    }],
    execute: function () {
      _export("PhysXSphericalJoint", PhysXSphericalJoint = class PhysXSphericalJoint extends PhysXJoint {
        setPivotA(v) {
          const cs = this.constraint;
          const pos = _trans.translation;
          const rot = _trans.rotation;
          Vec3.multiply(pos, cs.node.worldScale, cs.pivotA);
          Quat.copy(rot, Quat.IDENTITY);

          this._impl.setLocalPose(0, getTempTransform(pos, rot));

          if (!cs.connectedBody) this.setPivotB(cs.pivotB);
        }

        setPivotB(v) {
          const cs = this.constraint;
          const cb = cs.connectedBody;
          const pos = _trans.translation;
          const rot = _trans.rotation;
          Vec3.copy(pos, cs.pivotB);
          Quat.copy(rot, Quat.IDENTITY);

          if (cb) {
            Vec3.multiply(pos, cb.node.worldScale, cs.pivotB);
          } else {
            const node = cs.node;
            Vec3.multiply(pos, node.worldScale, cs.pivotA);
            Vec3.add(pos, pos, node.worldPosition);
            Vec3.add(pos, pos, cs.pivotB);
            Quat.multiply(rot, rot, node.worldRotation);
          }

          this._impl.setLocalPose(1, getTempTransform(pos, rot));
        }

        get constraint() {
          return this._com;
        }

        onComponentSet() {
          this._impl = PX.createSphericalJoint(PhysXJoint.tempActor, _pxtrans, null, _pxtrans);
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