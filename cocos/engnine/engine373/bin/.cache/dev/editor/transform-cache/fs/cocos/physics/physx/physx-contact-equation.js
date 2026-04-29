System.register("q-bundled:///fs/cocos/physics/physx/physx-contact-equation.js", ["../../core/index.js", "./physx-adapter.js"], function (_export, _context) {
  "use strict";

  var Vec3, Quat, getContactNormal, getContactPosition, PhysXContactEquation, quat;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("PhysXContactEquation", void 0);

  return {
    setters: [function (_coreIndexJs) {
      Vec3 = _coreIndexJs.Vec3;
      Quat = _coreIndexJs.Quat;
    }, function (_physxAdapterJs) {
      getContactNormal = _physxAdapterJs.getContactNormal;
      getContactPosition = _physxAdapterJs.getContactPosition;
    }],
    execute: function () {
      quat = new Quat();

      _export("PhysXContactEquation", PhysXContactEquation = class PhysXContactEquation {
        get isBodyA() {
          return this.colliderA.uuid === this.event.selfCollider.uuid;
        }

        constructor(event) {
          this.impl = null;
          this.event = void 0;
          this.event = event;
        }

        getLocalPointOnA(out) {
          getContactPosition(this.impl, out, this.event.impl);
          Vec3.subtract(out, out, this.colliderA.node.worldPosition);
        }

        getLocalPointOnB(out) {
          getContactPosition(this.impl, out, this.event.impl);
          Vec3.subtract(out, out, this.colliderB.node.worldPosition);
        }

        getWorldPointOnA(out) {
          getContactPosition(this.impl, out, this.event.impl);
        }

        getWorldPointOnB(out) {
          getContactPosition(this.impl, out, this.event.impl);
        }

        getLocalNormalOnA(out) {
          this.getWorldNormalOnA(out);
          Quat.conjugate(quat, this.colliderA.node.worldRotation);
          Vec3.transformQuat(out, out, quat);
        }

        getLocalNormalOnB(out) {
          this.getWorldNormalOnB(out);
          Quat.conjugate(quat, this.colliderB.node.worldRotation);
          Vec3.transformQuat(out, out, quat);
        }

        getWorldNormalOnA(out) {
          getContactNormal(this.impl, out, this.event.impl);
          if (!this.isBodyA) Vec3.negate(out, out);
        }

        getWorldNormalOnB(out) {
          getContactNormal(this.impl, out, this.event.impl);
        }

      });
    }
  };
});