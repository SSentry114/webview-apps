System.register("q-bundled:///fs/cocos/physics/physx/physx-world.js", ["../../core/index.js", "./physx-adapter.js", "./physx-shared-body.js", "../utils/tuple-dictionary.js", "./physx-contact-equation.js", "../utils/util.js", "./physx-enum.js", "./physx-instance.js"], function (_export, _context) {
  "use strict";

  var error, js, addActorToScene, raycastAll, simulateScene, initializeWorld, raycastClosest, gatherEvents, getWrapShape, PX, getContactDataOrByteOffset, PhysXSharedBody, TupleDictionary, PhysXContactEquation, CollisionEventObject, TriggerEventObject, EFilterDataWord3, PhysXInstance, PhysXWorld, triggerEventBeginDic, triggerEventEndDic, triggerEventsPool, contactEventDic, contactEventsPool, contactsPool, PhysXCallback;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("PhysXWorld", void 0);

  return {
    setters: [function (_coreIndexJs) {
      error = _coreIndexJs.error;
      js = _coreIndexJs.js;
    }, function (_physxAdapterJs) {
      addActorToScene = _physxAdapterJs.addActorToScene;
      raycastAll = _physxAdapterJs.raycastAll;
      simulateScene = _physxAdapterJs.simulateScene;
      initializeWorld = _physxAdapterJs.initializeWorld;
      raycastClosest = _physxAdapterJs.raycastClosest;
      gatherEvents = _physxAdapterJs.gatherEvents;
      getWrapShape = _physxAdapterJs.getWrapShape;
      PX = _physxAdapterJs.PX;
      getContactDataOrByteOffset = _physxAdapterJs.getContactDataOrByteOffset;
    }, function (_physxSharedBodyJs) {
      PhysXSharedBody = _physxSharedBodyJs.PhysXSharedBody;
    }, function (_utilsTupleDictionaryJs) {
      TupleDictionary = _utilsTupleDictionaryJs.TupleDictionary;
    }, function (_physxContactEquationJs) {
      PhysXContactEquation = _physxContactEquationJs.PhysXContactEquation;
    }, function (_utilsUtilJs) {
      CollisionEventObject = _utilsUtilJs.CollisionEventObject;
      TriggerEventObject = _utilsUtilJs.TriggerEventObject;
    }, function (_physxEnumJs) {
      EFilterDataWord3 = _physxEnumJs.EFilterDataWord3;
    }, function (_physxInstanceJs) {
      PhysXInstance = _physxInstanceJs.PhysXInstance;
    }],
    execute: function () {
      _export("PhysXWorld", PhysXWorld = class PhysXWorld extends PhysXInstance {
        setAllowSleep(_v) {}

        setDefaultMaterial(_v) {}

        setGravity(gravity) {
          this.scene.setGravity(gravity);
        }

        get impl() {
          return this.scene;
        }

        constructor() {
          super();
          this.scene = void 0;
          this.callback = PhysXCallback;
          this.wrappedBodies = [];
          this._isNeedFetch = false;
          initializeWorld(this);
        }

        destroy() {
          if (this.wrappedBodies.length) error('You should destroy all physics component first.');
          this.scene.release();
        }

        step(deltaTime, _timeSinceLastCalled, _maxSubStep = 0) {
          if (this.wrappedBodies.length === 0) return;

          this._simulate(deltaTime);

          if (!PX.MULTI_THREAD) {
            this._fetchResults();

            for (let i = 0; i < this.wrappedBodies.length; i++) {
              const body = this.wrappedBodies[i];
              body.syncPhysicsToScene();
            }
          }
        }

        _simulate(dt) {
          if (!this._isNeedFetch) {
            simulateScene(this.scene, dt);
            this._isNeedFetch = true;
          }
        }

        _fetchResults() {
          if (this._isNeedFetch) {
            this.scene.fetchResults(true);
            this._isNeedFetch = false;
          }
        }

        syncSceneToPhysics() {
          for (let i = 0; i < this.wrappedBodies.length; i++) {
            const body = this.wrappedBodies[i];
            body.syncSceneToPhysics();
          }
        } // only used in muti-thread for now


        syncPhysicsToScene() {
          this._fetchResults();

          for (let i = 0; i < this.wrappedBodies.length; i++) {
            const body = this.wrappedBodies[i];
            body.syncPhysicsToScene();
          }
        }

        syncAfterEvents() {
          for (let i = 0; i < this.wrappedBodies.length; i++) {
            const body = this.wrappedBodies[i];
            body.syncSceneWithCheck();
          }
        }

        getSharedBody(node, wrappedBody) {
          return PhysXSharedBody.getSharedBody(node, this, wrappedBody);
        }

        addActor(body) {
          const index = this.wrappedBodies.indexOf(body);

          if (index < 0) {
            addActorToScene(this.scene, body.impl);
            this.wrappedBodies.push(body);
          }
        }

        removeActor(body) {
          const index = this.wrappedBodies.indexOf(body);

          if (index >= 0) {
            this.scene.removeActor(body.impl, true);
            js.array.fastRemoveAt(this.wrappedBodies, index);
          }
        }

        addConstraint(_constraint) {}

        removeConstraint(_constraint) {}

        raycast(worldRay, options, pool, results) {
          return raycastAll(this, worldRay, options, pool, results);
        }

        raycastClosest(worldRay, options, result) {
          return raycastClosest(this, worldRay, options, result);
        }

        emitEvents() {
          gatherEvents(this);
          PhysXCallback.emitTriggerEvent();
          PhysXCallback.emitCollisionEvent();
        }

      }); ///
      /// Event Callback
      ///


      triggerEventBeginDic = new TupleDictionary();
      triggerEventEndDic = new TupleDictionary();
      triggerEventsPool = [];
      contactEventDic = new TupleDictionary();
      contactEventsPool = [];
      contactsPool = [];
      PhysXCallback = {
        eventCallback: {
          onContactBegin: (a, b, c, d, o) => {
            const wpa = getWrapShape(a);
            const wpb = getWrapShape(b);
            PhysXCallback.onCollision('onCollisionEnter', wpa, wpb, c, d, o);
          },
          onContactEnd: (a, b, c, d, o) => {
            const wpa = getWrapShape(a);
            const wpb = getWrapShape(b);
            PhysXCallback.onCollision('onCollisionExit', wpa, wpb, c, d, o);
          },
          onContactPersist: (a, b, c, d, o) => {
            const wpa = getWrapShape(a);
            const wpb = getWrapShape(b);
            PhysXCallback.onCollision('onCollisionStay', wpa, wpb, c, d, o);
          },
          onTriggerBegin: (a, b) => {
            const wpa = getWrapShape(a);
            const wpb = getWrapShape(b);
            PhysXCallback.onTrigger('onTriggerEnter', wpa, wpb, true);
          },
          onTriggerEnd: (a, b) => {
            const wpa = getWrapShape(a);
            const wpb = getWrapShape(b);
            PhysXCallback.onTrigger('onTriggerExit', wpa, wpb, false);
          }
        },
        // eNONE = 0,   //!< the query should ignore this shape
        // eTOUCH = 1,  //!< a hit on the shape touches the intersection geometry of the query but does not block it
        // eBLOCK = 2   //!< a hit on the shape blocks the query (does not block overlap queries)
        queryCallback: {
          preFilter(filterData, shape, _actor, _out) {
            const word3 = filterData.word3;
            const shapeFlags = shape.getFlags();

            if (word3 & EFilterDataWord3.QUERY_CHECK_TRIGGER && shapeFlags.isSet(PX.ShapeFlag.eTRIGGER_SHAPE)) {
              return PX.QueryHitType.eNONE;
            }

            return word3 & EFilterDataWord3.QUERY_SINGLE_HIT ? PX.QueryHitType.eBLOCK : PX.QueryHitType.eTOUCH;
          },

          preFilterForByteDance(filterData, shapeFlags, hitFlags) {
            const word3 = filterData.word3;

            if (word3 & EFilterDataWord3.QUERY_CHECK_TRIGGER && shapeFlags & PX.ShapeFlag.eTRIGGER_SHAPE) {
              return PX.QueryHitType.eNONE;
            }

            return word3 & EFilterDataWord3.QUERY_SINGLE_HIT ? PX.QueryHitType.eBLOCK : PX.QueryHitType.eTOUCH;
          }

        },

        onTrigger(type, wpa, wpb, isEnter) {
          if (wpa && wpb) {
            if (wpa.collider.needTriggerEvent || wpb.collider.needTriggerEvent) {
              let tE;

              if (triggerEventsPool.length > 0) {
                tE = triggerEventsPool.pop();
                tE.a = wpa;
                tE.b = wpb;
                tE.times = 0;
              } else {
                tE = {
                  a: wpa,
                  b: wpb,
                  times: 0
                };
              }

              if (isEnter) {
                triggerEventBeginDic.set(wpa.id, wpb.id, tE);
              } else {
                triggerEventEndDic.set(wpa.id, wpb.id, tE);
              }
            }
          }
        },

        emitTriggerEvent() {
          let len = triggerEventEndDic.getLength();

          while (len--) {
            const key = triggerEventEndDic.getKeyByIndex(len);
            const data = triggerEventEndDic.getDataByKey(key);
            triggerEventsPool.push(data);
            const dataBeg = triggerEventBeginDic.getDataByKey(key);

            if (dataBeg) {
              triggerEventsPool.push(dataBeg);
              triggerEventBeginDic.set(data.a.id, data.b.id, null);
            }

            const colliderA = data.a.collider;
            const colliderB = data.b.collider;

            if (colliderA && colliderB) {
              const type = 'onTriggerExit';
              TriggerEventObject.type = type;

              if (colliderA.needTriggerEvent) {
                TriggerEventObject.selfCollider = colliderA;
                TriggerEventObject.otherCollider = colliderB;
                colliderA.emit(type, TriggerEventObject);
              }

              if (colliderB.needTriggerEvent) {
                TriggerEventObject.selfCollider = colliderB;
                TriggerEventObject.otherCollider = colliderA;
                colliderB.emit(type, TriggerEventObject);
              }
            }
          }

          triggerEventEndDic.reset();
          len = triggerEventBeginDic.getLength();

          while (len--) {
            const key = triggerEventBeginDic.getKeyByIndex(len);
            const data = triggerEventBeginDic.getDataByKey(key);
            const colliderA = data.a.collider;
            const colliderB = data.b.collider;

            if (!colliderA || !colliderA.isValid || !colliderB || !colliderB.isValid) {
              triggerEventsPool.push(data);
              triggerEventBeginDic.set(data.a.id, data.b.id, null);
            } else {
              const type = data.times++ ? 'onTriggerStay' : 'onTriggerEnter';
              TriggerEventObject.type = type;

              if (colliderA.needTriggerEvent) {
                TriggerEventObject.selfCollider = colliderA;
                TriggerEventObject.otherCollider = colliderB;
                colliderA.emit(type, TriggerEventObject);
              }

              if (colliderB.needTriggerEvent) {
                TriggerEventObject.selfCollider = colliderB;
                TriggerEventObject.otherCollider = colliderA;
                colliderB.emit(type, TriggerEventObject);
              }
            }
          }
        },

        /**
         * @param c the contact count, how many the contacts in this pair
         * @param d the contact buffer, the buffer stores all contacts
         * @param o the data offset, the first contact offset in the contact buffer
         */
        onCollision(type, wpa, wpb, c, d, o) {
          if (wpa && wpb) {
            if (wpa.collider.needCollisionEvent || wpb.collider.needCollisionEvent) {
              if (contactEventsPool.length > 0) {
                const cE = contactEventsPool.pop();
                cE.type = type;
                cE.a = wpa;
                cE.b = wpb;
                cE.contactCount = c;
                cE.buffer = d;
                cE.offset = o;
                contactEventDic.set(wpa.id, wpb.id, cE);
              } else {
                const cE = {
                  type,
                  a: wpa,
                  b: wpb,
                  contactCount: c,
                  buffer: d,
                  offset: o
                };
                contactEventDic.set(wpa.id, wpb.id, cE);
              }
            }
          }
        },

        emitCollisionEvent() {
          let len = contactEventDic.getLength();

          while (len--) {
            const key = contactEventDic.getKeyByIndex(len);
            const data = contactEventDic.getDataByKey(key);
            contactEventsPool.push(data);
            const colliderA = data.a.collider;
            const colliderB = data.b.collider;

            if (colliderA && colliderA.isValid && colliderB && colliderB.isValid) {
              CollisionEventObject.type = data.type;
              CollisionEventObject.impl = data.buffer;
              const c = data.contactCount;
              const d = data.buffer;
              const o = data.offset;
              const contacts = CollisionEventObject.contacts;
              contactsPool.push.apply(contactsPool, contacts);
              contacts.length = 0;

              for (let i = 0; i < c; i++) {
                if (contactsPool.length > 0) {
                  const c = contactsPool.pop();
                  c.colliderA = colliderA;
                  c.colliderB = colliderB;
                  c.impl = getContactDataOrByteOffset(i, o);
                  contacts.push(c);
                } else {
                  const c = new PhysXContactEquation(CollisionEventObject);
                  c.colliderA = colliderA;
                  c.colliderB = colliderB;
                  c.impl = getContactDataOrByteOffset(i, o);
                  contacts.push(c);
                }
              }

              if (colliderA.needCollisionEvent) {
                CollisionEventObject.selfCollider = colliderA;
                CollisionEventObject.otherCollider = colliderB;
                colliderA.emit(CollisionEventObject.type, CollisionEventObject);
              }

              if (colliderB.needCollisionEvent) {
                CollisionEventObject.selfCollider = colliderB;
                CollisionEventObject.otherCollider = colliderA;
                colliderB.emit(CollisionEventObject.type, CollisionEventObject);
              }
            }
          }

          contactEventDic.reset();
        }

      };
    }
  };
});