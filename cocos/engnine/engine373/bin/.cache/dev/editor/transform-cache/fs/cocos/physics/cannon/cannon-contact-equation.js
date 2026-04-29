System.register("q-bundled:///fs/cocos/physics/cannon/cannon-contact-equation.js", ["../../core/index.js"], function (_export, _context) {
  "use strict";

  var Quat, Vec3, CannonContactEquation, quat;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("CannonContactEquation", void 0);

  return {
    setters: [function (_coreIndexJs) {
      Quat = _coreIndexJs.Quat;
      Vec3 = _coreIndexJs.Vec3;
    }],
    execute: function () {
      quat = new Quat();

      _export("CannonContactEquation", CannonContactEquation = class CannonContactEquation {
        get isBodyA() {
          if (this.impl) {
            const si = this.event.selfCollider.shape.impl;
            const bj = this.impl.bj;
            return si.body.id === bj.id;
          }

          return false;
        }

        constructor(event) {
          this.impl = null;
          this.event = void 0;
          this.event = event;
        }

        getLocalPointOnA(out) {
          if (this.impl) Vec3.copy(out, this.impl.rj);
        }

        getLocalPointOnB(out) {
          if (this.impl) Vec3.copy(out, this.impl.ri);
        }

        getWorldPointOnA(out) {
          if (this.impl) Vec3.add(out, this.impl.rj, this.impl.bj.position);
        }

        getWorldPointOnB(out) {
          if (this.impl) Vec3.add(out, this.impl.ri, this.impl.bi.position);
        }

        getLocalNormalOnA(out) {
          if (this.impl) {
            this.getWorldNormalOnA(out);
            Quat.conjugate(quat, this.impl.bi.quaternion);
            Vec3.transformQuat(out, out, quat);
          }
        }

        getLocalNormalOnB(out) {
          if (this.impl) {
            Quat.conjugate(quat, this.impl.bj.quaternion);
            Vec3.transformQuat(out, this.impl.ni, quat);
          }
        }

        getWorldNormalOnA(out) {
          if (this.impl) {
            this.getWorldNormalOnB(out);
            if (!this.isBodyA) Vec3.negate(out, out);
          }
        }

        getWorldNormalOnB(out) {
          if (this.impl) Vec3.copy(out, this.impl.ni);
        }

      });
    }
  };
});