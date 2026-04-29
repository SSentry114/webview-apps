System.register("q-bundled:///fs/cocos/physics-2d/box2d/platform/physics-contact-listener.js", ["@cocos/box2d", "../../../core/index.js", "../../framework/index.js", "../physics-contact.js"], function (_export, _context) {
  "use strict";

  var b2, assert, Contact2DType, PhysicsSystem2D, PhysicsContact, PhysicsContactListener;

  _export("PhysicsContactListener", void 0);

  return {
    setters: [function (_cocosBox2d) {
      b2 = _cocosBox2d.default;
    }, function (_coreIndexJs) {
      assert = _coreIndexJs.assert;
    }, function (_frameworkIndexJs) {
      Contact2DType = _frameworkIndexJs.Contact2DType;
      PhysicsSystem2D = _frameworkIndexJs.PhysicsSystem2D;
    }, function (_physicsContactJs) {
      PhysicsContact = _physicsContactJs.PhysicsContact;
    }],
    execute: function () {
      /*
       Copyright (c) 2017-2023 Xiamen Yaji Software Co., Ltd.
      
       https://www.cocos.com/
      
       Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated documentation files (the "Software"), to deal
       in the Software without restriction, including without limitation the rights to
       use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
       of the Software, and to permit persons to whom the Software is furnished to do so,
       subject to the following conditions:
      
       The above copyright notice and this permission notice shall be included in
       all copies or substantial portions of the Software.
      
       THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
      */
      _export("PhysicsContactListener", PhysicsContactListener = class PhysicsContactListener extends b2.ContactListener {
        getContactKey(contact) {
          const colliderA = contact.m_fixtureA.m_userData.collider;
          const colliderB = contact.m_fixtureB.m_userData.collider;
          let key = colliderA.uuid + colliderB.uuid;

          if (colliderA.uuid > colliderB.uuid) {
            key = colliderB.uuid + colliderA.uuid;
          }

          return key;
        }

        BeginContact(contact) {
          const key = this.getContactKey(contact);

          if (PhysicsContactListener._contactMap.has(key)) {
            const retContact = PhysicsContactListener._contactMap.get(key);

            retContact.ref++; //console.log('   collision++', key, 'current ref is:', retContact.ref);

            if (retContact.status === Contact2DType.END_CONTACT) {
              retContact.status = Contact2DType.STAY_CONTACT; //console.log('   set as stay');
            } else if (retContact.status !== Contact2DType.STAY_CONTACT) {
              retContact.status = Contact2DType.BEGIN_CONTACT; //console.log('   set as enter');
            }
          } else {
            //console.log('   new collision', key, 'current ref is:', 1);
            const retCollision = new PhysicsContact(contact);

            PhysicsContactListener._contactMap.set(key, retCollision);

            retCollision.status = Contact2DType.BEGIN_CONTACT;
          }
        }

        EndContact(contact) {
          const key = this.getContactKey(contact);

          const retContact = PhysicsContactListener._contactMap.get(key);

          assert(retContact);
          retContact.ref--; //console.log('   collision--', key, 'current ref is:', retCollision.ref);

          if (retContact.ref <= 0) {
            //console.log('   set as exit');
            retContact.status = Contact2DType.END_CONTACT;
          }
        }

        PreSolve(contact, oldManifold) {}

        PostSolve(contact, impulse) {}

        finalizeContactEvent() {
          PhysicsContactListener._contactMap.forEach((contact, key) => {
            //console.log('forEach', key, collision);
            if (contact.status === Contact2DType.END_CONTACT) {
              PhysicsContactListener._contactMap.delete(key); //console.log('   report end collision', key, 'current ref is:', contact.ref);


              this.emit(Contact2DType.END_CONTACT, contact);
            } else if (contact.status === Contact2DType.BEGIN_CONTACT) {
              contact.status = Contact2DType.STAY_CONTACT; //console.log('   report enter collision', key, 'current ref is:', contact.ref);

              this.emit(Contact2DType.BEGIN_CONTACT, contact);
            } else if (contact.status === Contact2DType.STAY_CONTACT) {
              //console.log('   report stay collision', key, 'current ref is:', contact.ref);
              this.emit(Contact2DType.STAY_CONTACT, contact);
            }
          });
        }

        emit(contactType, contact) {
          const colliderA = contact.colliderA;
          const colliderB = contact.colliderB;

          if (!colliderA || !colliderB) {
            return;
          }

          const bodyA = colliderA.body;
          const bodyB = colliderB.body; //if rigid body doesn't exist, collider will be added to groundRigidbody automatically,
          //hence it should emit event

          if (bodyA && !bodyA.enabledInHierarchy || bodyB && !bodyB.enabledInHierarchy || !bodyA && !bodyB) {
            return;
          } //bodyA exists and enabledContactListner, or bodyA doesn't exist


          if (bodyA && bodyA.enabledContactListener || !bodyA) {
            colliderA === null || colliderA === void 0 ? void 0 : colliderA.emit(contactType, colliderA, colliderB, contact);
          } //bodyB exists and enabledContactListner, or bodyB doesn't exist


          if (bodyB && bodyB.enabledContactListener || !bodyB) {
            colliderB === null || colliderB === void 0 ? void 0 : colliderB.emit(contactType, colliderB, colliderA, contact);
          }

          if (bodyA && bodyA.enabledContactListener || bodyB && bodyB.enabledContactListener || !bodyA || !bodyB) {
            PhysicsSystem2D.instance.emit(contactType, colliderA, colliderB, contact);
          }

          if (contact.disabled || contact.disabledOnce) {
            contact.setEnabled(false);
            contact.disabledOnce = false;
          }
        }

      });

      PhysicsContactListener._contactMap = new Map();
    }
  };
});