System.register("q-bundled:///fs/cocos/physics/bullet/bullet-world.js", ["./bullet-shared-body.js", "./shapes/bullet-shape.js", "../utils/array-collision-matrix.js", "../utils/tuple-dictionary.js", "./bullet-cache.js", "./bullet-utils.js", "../../core/index.js", "./bullet-contact-data.js", "./instantiated.js"], function (_export, _context) {
  "use strict";

  var BulletSharedBody, BulletShape, ArrayCollisionMatrix, TupleDictionary, TriggerEventObject, CollisionEventObject, CC_V3_0, CC_V3_1, BulletCache, bullet2CocosVec3, cocos2BulletVec3, error, Vec3, js, BulletContactData, bt, EBulletType, EBulletTriangleRaycastFlag, BulletWorld, contactsPool, v3_0, v3_1;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("BulletWorld", void 0);

  return {
    setters: [function (_bulletSharedBodyJs) {
      BulletSharedBody = _bulletSharedBodyJs.BulletSharedBody;
    }, function (_shapesBulletShapeJs) {
      BulletShape = _shapesBulletShapeJs.BulletShape;
    }, function (_utilsArrayCollisionMatrixJs) {
      ArrayCollisionMatrix = _utilsArrayCollisionMatrixJs.ArrayCollisionMatrix;
    }, function (_utilsTupleDictionaryJs) {
      TupleDictionary = _utilsTupleDictionaryJs.TupleDictionary;
    }, function (_bulletCacheJs) {
      TriggerEventObject = _bulletCacheJs.TriggerEventObject;
      CollisionEventObject = _bulletCacheJs.CollisionEventObject;
      CC_V3_0 = _bulletCacheJs.CC_V3_0;
      CC_V3_1 = _bulletCacheJs.CC_V3_1;
      BulletCache = _bulletCacheJs.BulletCache;
    }, function (_bulletUtilsJs) {
      bullet2CocosVec3 = _bulletUtilsJs.bullet2CocosVec3;
      cocos2BulletVec3 = _bulletUtilsJs.cocos2BulletVec3;
    }, function (_coreIndexJs) {
      error = _coreIndexJs.error;
      Vec3 = _coreIndexJs.Vec3;
      js = _coreIndexJs.js;
    }, function (_bulletContactDataJs) {
      BulletContactData = _bulletContactDataJs.BulletContactData;
    }, function (_instantiatedJs) {
      bt = _instantiatedJs.bt;
      EBulletType = _instantiatedJs.EBulletType;
      EBulletTriangleRaycastFlag = _instantiatedJs.EBulletTriangleRaycastFlag;
    }],
    execute: function () {
      contactsPool = [];
      v3_0 = CC_V3_0;
      v3_1 = CC_V3_1;

      _export("BulletWorld", BulletWorld = class BulletWorld {
        setDefaultMaterial(v) {}

        setAllowSleep(v) {
          bt.ccDiscreteDynamicsWorld_setAllowSleep(this._world, v);
        }

        setGravity(gravity) {
          bt.DynamicsWorld_setGravity(this._world, cocos2BulletVec3(BulletCache.instance.BT_V3_0, gravity));
        }

        updateNeedEmitEvents(v) {
          if (!this.ghosts) return; // return if destroyed

          if (v) {
            this._needEmitEvents = true;
          } else {
            this._needEmitEvents = false;

            for (let i = 0; i < this.ghosts.length; i++) {
              const ghost = this.ghosts[i];
              const shapes = ghost.ghostStruct.wrappedShapes;

              for (let j = 0; j < shapes.length; j++) {
                const collider = shapes[j].collider;

                if (collider.needCollisionEvent || collider.needTriggerEvent) {
                  this._needEmitEvents = true;
                  return;
                }
              }
            }

            for (let i = 0; i < this.bodies.length; i++) {
              const body = this.bodies[i];
              const shapes = body.bodyStruct.wrappedShapes;

              for (let j = 0; j < shapes.length; j++) {
                const collider = shapes[j].collider;

                if (collider.needCollisionEvent || collider.needTriggerEvent) {
                  this._needEmitEvents = true;
                  return;
                }
              }
            }
          }
        }

        get impl() {
          return this._world;
        }

        constructor() {
          this._world = void 0;
          this._broadphase = void 0;
          this._solver = void 0;
          this._dispatcher = void 0;
          this._needEmitEvents = false;
          this._needSyncAfterEvents = false;
          this.bodies = [];
          this.ghosts = [];
          this.constraints = [];
          this.triggerArrayMat = new ArrayCollisionMatrix();
          this.collisionArrayMat = new ArrayCollisionMatrix();
          this.contactsDic = new TupleDictionary();
          this.oldContactsDic = new TupleDictionary();
          this._broadphase = bt.DbvtBroadphase_new();
          this._dispatcher = bt.CollisionDispatcher_new();
          this._solver = bt.SequentialImpulseConstraintSolver_new();
          this._world = bt.ccDiscreteDynamicsWorld_new(this._dispatcher, this._broadphase, this._solver);
        }

        destroy() {
          if (this.constraints.length || this.bodies.length) error('You should destroy all physics component first.');

          bt._safe_delete(this._world, EBulletType.EBulletTypeCollisionWorld);

          bt._safe_delete(this._broadphase, EBulletType.EBulletTypeDbvtBroadPhase);

          bt._safe_delete(this._dispatcher, EBulletType.EBulletTypeCollisionDispatcher);

          bt._safe_delete(this._solver, EBulletType.EBulletTypeSequentialImpulseConstraintSolver);

          this.bodies = null;
          this.ghosts = null;
          this.constraints = null;
          this.triggerArrayMat = null;
          this.collisionArrayMat = null;
          this.contactsDic = null;
          this.oldContactsDic = null;
          contactsPool.length = 0;
        }

        step(deltaTime, timeSinceLastCalled, maxSubStep = 0) {
          if (!this.bodies.length && !this.ghosts.length) return;
          if (timeSinceLastCalled === undefined) timeSinceLastCalled = deltaTime;
          bt.DynamicsWorld_stepSimulation(this._world, timeSinceLastCalled, maxSubStep, deltaTime);
        }

        syncSceneToPhysics() {
          // Use reverse traversal order, because update dirty will mess up the ghosts or bodyies array.
          for (let i = this.ghosts.length - 1; i >= 0; i--) {
            const ghost = this.ghosts[i]; // Use temporary object, same reason as above

            ghost.updateDirty();
            ghost.syncSceneToGhost();
          }

          for (let i = this.bodies.length - 1; i >= 0; i--) {
            const body = this.bodies[i];
            body.updateDirty();
            body.syncSceneToPhysics();
          }
        }

        syncAfterEvents() {
          if (!this._needSyncAfterEvents) return;
          this.syncSceneToPhysics();
        }

        raycast(worldRay, options, pool, results) {
          worldRay.computeHit(v3_0, options.maxDistance);
          const to = cocos2BulletVec3(BulletCache.instance.BT_V3_0, v3_0);
          const from = cocos2BulletVec3(BulletCache.instance.BT_V3_1, worldRay.o);
          const allHitsCB = bt.ccAllRayCallback_static();
          bt.ccAllRayCallback_reset(allHitsCB, from, to, options.mask, options.queryTrigger);
          bt.ccAllRayCallback_setFlags(allHitsCB, EBulletTriangleRaycastFlag.UseSubSimplexConvexCastRaytest);
          bt.CollisionWorld_rayTest(this._world, from, to, allHitsCB);

          if (bt.RayCallback_hasHit(allHitsCB)) {
            const posArray = bt.ccAllRayCallback_getHitPointWorld(allHitsCB);
            const normalArray = bt.ccAllRayCallback_getHitNormalWorld(allHitsCB);
            const ptrArray = bt.ccAllRayCallback_getCollisionShapePtrs(allHitsCB);

            for (let i = 0, n = bt.int_array_size(ptrArray); i < n; i++) {
              bullet2CocosVec3(v3_0, bt.Vec3_array_at(posArray, i));
              bullet2CocosVec3(v3_1, bt.Vec3_array_at(normalArray, i));
              const shape = BulletCache.getWrapper(bt.int_array_at(ptrArray, i), BulletShape.TYPE);
              const r = pool.add();
              results.push(r);

              r._assign(v3_0, Vec3.distance(worldRay.o, v3_0), shape.collider, v3_1);
            }

            return true;
          }

          return false;
        }

        raycastClosest(worldRay, options, result) {
          worldRay.computeHit(v3_0, options.maxDistance);
          const to = cocos2BulletVec3(BulletCache.instance.BT_V3_0, v3_0);
          const from = cocos2BulletVec3(BulletCache.instance.BT_V3_1, worldRay.o);
          const closeHitCB = bt.ccClosestRayCallback_static();
          bt.ccClosestRayCallback_reset(closeHitCB, from, to, options.mask, options.queryTrigger);
          bt.ccClosestRayCallback_setFlags(closeHitCB, EBulletTriangleRaycastFlag.UseSubSimplexConvexCastRaytest);
          bt.CollisionWorld_rayTest(this._world, from, to, closeHitCB);

          if (bt.RayCallback_hasHit(closeHitCB)) {
            bullet2CocosVec3(v3_0, bt.ccClosestRayCallback_getHitPointWorld(closeHitCB));
            bullet2CocosVec3(v3_1, bt.ccClosestRayCallback_getHitNormalWorld(closeHitCB));
            const shape = BulletCache.getWrapper(bt.ccClosestRayCallback_getCollisionShapePtr(closeHitCB), BulletShape.TYPE);

            result._assign(v3_0, Vec3.distance(worldRay.o, v3_0), shape.collider, v3_1);

            return true;
          }

          return false;
        }

        getSharedBody(node, wrappedBody) {
          return BulletSharedBody.getSharedBody(node, this, wrappedBody);
        }

        addSharedBody(sharedBody) {
          const i = this.bodies.indexOf(sharedBody);

          if (i < 0) {
            this.bodies.push(sharedBody);
            bt.DynamicsWorld_addRigidBody(this._world, sharedBody.body, sharedBody.collisionFilterGroup, sharedBody.collisionFilterMask);
          }
        }

        removeSharedBody(sharedBody) {
          const i = this.bodies.indexOf(sharedBody);

          if (i >= 0) {
            js.array.fastRemoveAt(this.bodies, i);
            bt.DynamicsWorld_removeRigidBody(this._world, sharedBody.body);
          }
        }

        addGhostObject(sharedBody) {
          const i = this.ghosts.indexOf(sharedBody);

          if (i < 0) {
            this.ghosts.push(sharedBody);
            bt.CollisionWorld_addCollisionObject(this._world, sharedBody.ghost, sharedBody.collisionFilterGroup, sharedBody.collisionFilterMask);
          }
        }

        removeGhostObject(sharedBody) {
          const i = this.ghosts.indexOf(sharedBody);

          if (i >= 0) {
            js.array.fastRemoveAt(this.ghosts, i);
            bt.CollisionWorld_removeCollisionObject(this._world, sharedBody.ghost);
          }
        }

        addConstraint(constraint) {
          const i = this.constraints.indexOf(constraint);

          if (i < 0) {
            this.constraints.push(constraint);
            bt.DynamicsWorld_addConstraint(this.impl, constraint.impl, !constraint.constraint.enableCollision);
            constraint.index = i;
          }
        }

        removeConstraint(constraint) {
          const i = this.constraints.indexOf(constraint);

          if (i >= 0) {
            this.constraints.splice(i, 1);
            bt.DynamicsWorld_removeConstraint(this.impl, constraint.impl);
            constraint.index = -1;
          }
        }

        emitEvents() {
          this._needSyncAfterEvents = false;
          if (!this._needEmitEvents) return;
          this.gatherConatactData(); // is enter or stay

          let dicL = this.contactsDic.getLength();

          while (dicL--) {
            contactsPool.push.apply(contactsPool, CollisionEventObject.contacts);
            CollisionEventObject.contacts.length = 0;
            const key = this.contactsDic.getKeyByIndex(dicL);
            const data = this.contactsDic.getDataByKey(key);
            const shape0 = data.shape0;
            const shape1 = data.shape1;
            this.oldContactsDic.set(shape0.id, shape1.id, data);
            const collider0 = shape0.collider;
            const collider1 = shape1.collider;

            if (collider0 && collider1) {
              const isTrigger = collider0.isTrigger || collider1.isTrigger;

              if (isTrigger) {
                if (this.triggerArrayMat.get(shape0.id, shape1.id)) {
                  TriggerEventObject.type = 'onTriggerStay';
                } else {
                  TriggerEventObject.type = 'onTriggerEnter';
                  this.triggerArrayMat.set(shape0.id, shape1.id, true);
                }

                TriggerEventObject.impl = data.impl; //btPersistentManifold

                TriggerEventObject.selfCollider = collider0;
                TriggerEventObject.otherCollider = collider1;
                collider0.emit(TriggerEventObject.type, TriggerEventObject);
                TriggerEventObject.selfCollider = collider1;
                TriggerEventObject.otherCollider = collider0;
                collider1.emit(TriggerEventObject.type, TriggerEventObject);
                this._needSyncAfterEvents = true;
              } else {
                const body0 = collider0.attachedRigidBody;
                const body1 = collider1.attachedRigidBody;

                if (body0 && body1) {
                  if (body0.isSleeping && body1.isSleeping) continue;
                } else if (!body0 && body1) {
                  if (body1.isSleeping) continue;
                } else if (!body1 && body0) {
                  if (body0.isSleeping) continue;
                }

                if (this.collisionArrayMat.get(shape0.id, shape1.id)) {
                  CollisionEventObject.type = 'onCollisionStay';
                } else {
                  CollisionEventObject.type = 'onCollisionEnter';
                  this.collisionArrayMat.set(shape0.id, shape1.id, true);
                }

                for (let i = 0; i < data.contacts.length; i++) {
                  const cq = data.contacts[i]; //btManifoldPoint

                  if (contactsPool.length > 0) {
                    const c = contactsPool.pop();
                    c.impl = cq; //btManifoldPoint

                    CollisionEventObject.contacts.push(c);
                  } else {
                    const c = new BulletContactData(CollisionEventObject);
                    c.impl = cq; //btManifoldPoint

                    CollisionEventObject.contacts.push(c);
                  }
                }

                CollisionEventObject.impl = data.impl; //btPersistentManifold

                CollisionEventObject.selfCollider = collider0;
                CollisionEventObject.otherCollider = collider1;
                collider0.emit(CollisionEventObject.type, CollisionEventObject);
                CollisionEventObject.selfCollider = collider1;
                CollisionEventObject.otherCollider = collider0;
                collider1.emit(CollisionEventObject.type, CollisionEventObject);
                this._needSyncAfterEvents = true;
              }

              if (this.oldContactsDic.get(shape0.id, shape1.id) == null) {
                this.oldContactsDic.set(shape0.id, shape1.id, data);
              }
            }
          } // is exit


          let oldDicL = this.oldContactsDic.getLength();

          while (oldDicL--) {
            const key = this.oldContactsDic.getKeyByIndex(oldDicL);
            const data = this.oldContactsDic.getDataByKey(key);
            const shape0 = data.shape0;
            const shape1 = data.shape1;
            const collider0 = shape0.collider;
            const collider1 = shape1.collider;

            if (collider0 && collider1) {
              const isTrigger = collider0.isTrigger || collider1.isTrigger;

              if (this.contactsDic.getDataByKey(key) == null) {
                if (isTrigger) {
                  if (this.triggerArrayMat.get(shape0.id, shape1.id)) {
                    TriggerEventObject.type = 'onTriggerExit';
                    TriggerEventObject.selfCollider = collider0;
                    TriggerEventObject.otherCollider = collider1;
                    collider0.emit(TriggerEventObject.type, TriggerEventObject);
                    TriggerEventObject.selfCollider = collider1;
                    TriggerEventObject.otherCollider = collider0;
                    collider1.emit(TriggerEventObject.type, TriggerEventObject);
                    this.triggerArrayMat.set(shape0.id, shape1.id, false);
                    this.oldContactsDic.set(shape0.id, shape1.id, null);
                    this._needSyncAfterEvents = true;
                  }
                } else if (this.collisionArrayMat.get(shape0.id, shape1.id)) {
                  contactsPool.push.apply(contactsPool, CollisionEventObject.contacts);
                  CollisionEventObject.contacts.length = 0;
                  CollisionEventObject.type = 'onCollisionExit';
                  CollisionEventObject.selfCollider = collider0;
                  CollisionEventObject.otherCollider = collider1;
                  collider0.emit(CollisionEventObject.type, CollisionEventObject);
                  CollisionEventObject.selfCollider = collider1;
                  CollisionEventObject.otherCollider = collider0;
                  collider1.emit(CollisionEventObject.type, CollisionEventObject);
                  this.collisionArrayMat.set(shape0.id, shape1.id, false);
                  this.oldContactsDic.set(shape0.id, shape1.id, null);
                  this._needSyncAfterEvents = true;
                }
              }
            }
          }

          this.contactsDic.reset();
        }

        gatherConatactData() {
          const numManifolds = bt.Dispatcher_getNumManifolds(this._dispatcher);

          for (let i = 0; i < numManifolds; i++) {
            const manifold = bt.Dispatcher_getManifoldByIndexInternal(this._dispatcher, i); //btPersistentManifold

            const numContacts = bt.PersistentManifold_getNumContacts(manifold);

            for (let j = 0; j < numContacts; j++) {
              const manifoldPoint = bt.PersistentManifold_getContactPoint(manifold, j); //btManifoldPoint

              const s0 = bt.ManifoldPoint_getShape0(manifoldPoint);
              const s1 = bt.ManifoldPoint_getShape1(manifoldPoint);
              const shape0 = BulletCache.getWrapper(s0, BulletShape.TYPE);
              const shape1 = BulletCache.getWrapper(s1, BulletShape.TYPE);

              if (shape0.collider.needTriggerEvent || shape1.collider.needTriggerEvent || shape0.collider.needCollisionEvent || shape1.collider.needCollisionEvent) {
                // current contact
                let item = this.contactsDic.get(shape0.id, shape1.id);

                if (!item) {
                  item = this.contactsDic.set(shape0.id, shape1.id, {
                    shape0,
                    shape1,
                    contacts: [],
                    impl: manifold
                  });
                }

                item.contacts.push(manifoldPoint); //btManifoldPoint
              }
            }
          }
        }

      });
    }
  };
});