System.register("q-bundled:///fs/cocos/physics/cocos/builtin-world.js", ["../../core/index.js", "./builtin-shared-body.js", "../utils/array-collision-matrix.js"], function (_export, _context) {
  "use strict";

  var Vec3, error, js, geometry, BuiltinSharedBody, ArrayCollisionMatrix, BuiltInWorld, hitPoint, TriggerEventObject;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("BuiltInWorld", void 0);

  return {
    setters: [function (_coreIndexJs) {
      Vec3 = _coreIndexJs.Vec3;
      error = _coreIndexJs.error;
      js = _coreIndexJs.js;
      geometry = _coreIndexJs.geometry;
    }, function (_builtinSharedBodyJs) {
      BuiltinSharedBody = _builtinSharedBodyJs.BuiltinSharedBody;
    }, function (_utilsArrayCollisionMatrixJs) {
      ArrayCollisionMatrix = _utilsArrayCollisionMatrixJs.ArrayCollisionMatrix;
    }],
    execute: function () {
      hitPoint = new Vec3();
      TriggerEventObject = {
        type: 'onTriggerEnter',
        selfCollider: null,
        otherCollider: null,
        impl: {}
      };
      /**
       * Built-in collision system, intended for use as a
       * efficient discrete collision detector,
       * not a full physical simulator
       */

      _export("BuiltInWorld", BuiltInWorld = class BuiltInWorld {
        constructor() {
          this.shapeArr = [];
          this.bodies = [];
          this._shapeArrPrev = [];
          this._collisionMatrix = new ArrayCollisionMatrix();
          this._collisionMatrixPrev = new ArrayCollisionMatrix();
        }

        setGravity(v) {}

        setAllowSleep(v) {}

        setDefaultMaterial(v) {}

        get impl() {
          return this;
        }

        destroy() {
          if (this.bodies.length) error('You should destroy all physics component first.');
        }

        step(deltaTime) {
          // store and reset collision array
          const tmp = this._shapeArrPrev;
          this._shapeArrPrev = this.shapeArr;
          this.shapeArr = tmp;
          this.shapeArr.length = 0; // collision detection

          for (let i = 0; i < this.bodies.length; i++) {
            const bodyA = this.bodies[i];

            for (let j = i + 1; j < this.bodies.length; j++) {
              const bodyB = this.bodies[j]; // first, Check collision filter masks

              if ((bodyA.collisionFilterGroup & bodyB.collisionFilterMask) === 0 || (bodyB.collisionFilterGroup & bodyA.collisionFilterMask) === 0) {
                continue;
              }

              bodyA.intersects(bodyB);
            }
          }
        }

        syncSceneToPhysics() {
          for (let i = 0; i < this.bodies.length; i++) {
            this.bodies[i].syncSceneToPhysics();
          }
        }

        syncAfterEvents() {
          this.syncSceneToPhysics();
        }

        emitEvents() {
          this.emitTriggerEvent();
        }

        raycastClosest(worldRay, options, out) {
          let tmp_d = Infinity;
          const max_d = options.maxDistance;
          const mask = options.mask;

          for (let i = 0; i < this.bodies.length; i++) {
            const body = this.bodies[i];
            if (!(body.collisionFilterGroup & mask)) continue;

            for (let i = 0; i < body.shapes.length; i++) {
              const shape = body.shapes[i];
              const distance = geometry.intersect.resolve(worldRay, shape.worldShape);

              if (distance === 0 || distance > max_d) {
                continue;
              }

              if (tmp_d > distance) {
                tmp_d = distance;
                Vec3.normalize(hitPoint, worldRay.d);
                Vec3.scaleAndAdd(hitPoint, worldRay.o, hitPoint, distance);

                out._assign(hitPoint, distance, shape.collider, Vec3.ZERO);
              }
            }
          }

          return !(tmp_d === Infinity);
        }

        raycast(worldRay, options, pool, results) {
          const max_d = options.maxDistance;
          const mask = options.mask;

          for (let i = 0; i < this.bodies.length; i++) {
            const body = this.bodies[i];
            if (!(body.collisionFilterGroup & mask)) continue;

            for (let i = 0; i < body.shapes.length; i++) {
              const shape = body.shapes[i];
              const distance = geometry.intersect.resolve(worldRay, shape.worldShape);

              if (distance === 0 || distance > max_d) {
                continue;
              } else {
                const r = pool.add();
                worldRay.computeHit(hitPoint, distance);

                r._assign(hitPoint, distance, shape.collider, Vec3.ZERO);

                results.push(r);
              }
            }
          }

          return results.length > 0;
        }

        getSharedBody(node, wrappedBody) {
          return BuiltinSharedBody.getSharedBody(node, this, wrappedBody);
        }

        addSharedBody(body) {
          const index = this.bodies.indexOf(body);

          if (index < 0) {
            this.bodies.push(body);
          }
        }

        removeSharedBody(body) {
          const index = this.bodies.indexOf(body);

          if (index >= 0) {
            js.array.fastRemoveAt(this.bodies, index);
          }
        }

        emitTriggerEvent() {
          let shapeA;
          let shapeB;

          for (let i = 0; i < this.shapeArr.length; i += 2) {
            shapeA = this.shapeArr[i];
            shapeB = this.shapeArr[i + 1];
            TriggerEventObject.selfCollider = shapeA.collider;
            TriggerEventObject.otherCollider = shapeB.collider;

            this._collisionMatrix.set(shapeA.id, shapeB.id, true);

            if (this._collisionMatrixPrev.get(shapeA.id, shapeB.id)) {
              // emit stay
              TriggerEventObject.type = 'onTriggerStay';
            } else {
              // first trigger, emit enter
              TriggerEventObject.type = 'onTriggerEnter';
            }

            if (shapeA.collider) {
              shapeA.collider.emit(TriggerEventObject.type, TriggerEventObject);
            }

            TriggerEventObject.selfCollider = shapeB.collider;
            TriggerEventObject.otherCollider = shapeA.collider;

            if (shapeB.collider) {
              shapeB.collider.emit(TriggerEventObject.type, TriggerEventObject);
            }
          }

          for (let i = 0; i < this._shapeArrPrev.length; i += 2) {
            shapeA = this._shapeArrPrev[i];
            shapeB = this._shapeArrPrev[i + 1];

            if (this._collisionMatrixPrev.get(shapeA.id, shapeB.id)) {
              if (!this._collisionMatrix.get(shapeA.id, shapeB.id)) {
                // emit exit
                TriggerEventObject.type = 'onTriggerExit';
                TriggerEventObject.selfCollider = shapeA.collider;
                TriggerEventObject.otherCollider = shapeB.collider;

                if (shapeA.collider) {
                  shapeA.collider.emit(TriggerEventObject.type, TriggerEventObject);
                }

                TriggerEventObject.selfCollider = shapeB.collider;
                TriggerEventObject.otherCollider = shapeA.collider;

                if (shapeB.collider) {
                  shapeB.collider.emit(TriggerEventObject.type, TriggerEventObject);
                }

                this._collisionMatrix.set(shapeA.id, shapeB.id, false);
              }
            }
          }

          const temp = this._collisionMatrixPrev.matrix;
          this._collisionMatrixPrev.matrix = this._collisionMatrix.matrix;
          this._collisionMatrix.matrix = temp;

          this._collisionMatrix.reset();
        }

      });
    }
  };
});