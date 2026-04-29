System.register("q-bundled:///fs/cocos/physics-2d/box2d/platform/physics-contact-listener.js", ["@cocos/box2d", "../../../core/index.js", "../../framework/index.js", "../physics-contact.js"], function (_export, _context) {
  "use strict";

  var b2, assert, Contact2DType, PhysicsSystem2D, PhysicsContact, PhysicsContactListener;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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
      _export("PhysicsContactListener", PhysicsContactListener = /*#__PURE__*/function (_b2$ContactListener) {
        _inheritsLoose(PhysicsContactListener, _b2$ContactListener);

        function PhysicsContactListener() {
          return _b2$ContactListener.apply(this, arguments) || this;
        }

        var _proto = PhysicsContactListener.prototype;

        _proto.getContactKey = function getContactKey(contact) {
          var colliderA = contact.m_fixtureA.m_userData.collider;
          var colliderB = contact.m_fixtureB.m_userData.collider;
          var key = colliderA.uuid + colliderB.uuid;

          if (colliderA.uuid > colliderB.uuid) {
            key = colliderB.uuid + colliderA.uuid;
          }

          return key;
        };

        _proto.BeginContact = function BeginContact(contact) {
          var key = this.getContactKey(contact);

          if (PhysicsContactListener._contactMap.has(key)) {
            var retContact = PhysicsContactListener._contactMap.get(key);

            retContact.ref++; //console.log('   collision++', key, 'current ref is:', retContact.ref);

            if (retContact.status === Contact2DType.END_CONTACT) {
              retContact.status = Contact2DType.STAY_CONTACT; //console.log('   set as stay');
            } else if (retContact.status !== Contact2DType.STAY_CONTACT) {
              retContact.status = Contact2DType.BEGIN_CONTACT; //console.log('   set as enter');
            }
          } else {
            //console.log('   new collision', key, 'current ref is:', 1);
            var retCollision = new PhysicsContact(contact);

            PhysicsContactListener._contactMap.set(key, retCollision);

            retCollision.status = Contact2DType.BEGIN_CONTACT;
          }
        };

        _proto.EndContact = function EndContact(contact) {
          var key = this.getContactKey(contact);

          var retContact = PhysicsContactListener._contactMap.get(key);

          assert(retContact);
          retContact.ref--; //console.log('   collision--', key, 'current ref is:', retCollision.ref);

          if (retContact.ref <= 0) {
            //console.log('   set as exit');
            retContact.status = Contact2DType.END_CONTACT;
          }
        };

        _proto.PreSolve = function PreSolve(contact, oldManifold) {};

        _proto.PostSolve = function PostSolve(contact, impulse) {};

        _proto.finalizeContactEvent = function finalizeContactEvent() {
          var _this = this;

          PhysicsContactListener._contactMap.forEach(function (contact, key) {
            //console.log('forEach', key, collision);
            if (contact.status === Contact2DType.END_CONTACT) {
              PhysicsContactListener._contactMap["delete"](key); //console.log('   report end collision', key, 'current ref is:', contact.ref);


              _this.emit(Contact2DType.END_CONTACT, contact);
            } else if (contact.status === Contact2DType.BEGIN_CONTACT) {
              contact.status = Contact2DType.STAY_CONTACT; //console.log('   report enter collision', key, 'current ref is:', contact.ref);

              _this.emit(Contact2DType.BEGIN_CONTACT, contact);
            } else if (contact.status === Contact2DType.STAY_CONTACT) {
              //console.log('   report stay collision', key, 'current ref is:', contact.ref);
              _this.emit(Contact2DType.STAY_CONTACT, contact);
            }
          });
        };

        _proto.emit = function emit(contactType, contact) {
          var colliderA = contact.colliderA;
          var colliderB = contact.colliderB;

          if (!colliderA || !colliderB) {
            return;
          }

          var bodyA = colliderA.body;
          var bodyB = colliderB.body; //if rigid body doesn't exist, collider will be added to groundRigidbody automatically,
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
        };

        return PhysicsContactListener;
      }(b2.ContactListener));

      PhysicsContactListener._contactMap = new Map();
    }
  };
});