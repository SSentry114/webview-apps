System.register("q-bundled:///fs/cocos/physics-2d/box2d/joints/mouse-joint.js", ["@cocos/box2d", "./joint-2d.js", "../../framework/index.js", "../../framework/physics-types.js", "../../../core/index.js", "../../../scene-graph/node-event.js", "../../../scene-graph/index.js"], function (_export, _context) {
  "use strict";

  var b2, b2Joint, PhysicsSystem2D, PHYSICS_2D_PTM_RATIO, Vec2, NodeEventType, find, b2MouseJoint, tempB2Vec2;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("b2MouseJoint", void 0);

  return {
    setters: [function (_cocosBox2d) {
      b2 = _cocosBox2d.default;
    }, function (_joint2dJs) {
      b2Joint = _joint2dJs.b2Joint;
    }, function (_frameworkIndexJs) {
      PhysicsSystem2D = _frameworkIndexJs.PhysicsSystem2D;
    }, function (_frameworkPhysicsTypesJs) {
      PHYSICS_2D_PTM_RATIO = _frameworkPhysicsTypesJs.PHYSICS_2D_PTM_RATIO;
    }, function (_coreIndexJs) {
      Vec2 = _coreIndexJs.Vec2;
    }, function (_sceneGraphNodeEventJs) {
      NodeEventType = _sceneGraphNodeEventJs.NodeEventType;
    }, function (_sceneGraphIndexJs) {
      find = _sceneGraphIndexJs.find;
    }],
    execute: function () {
      tempB2Vec2 = new b2.Vec2();

      _export("b2MouseJoint", b2MouseJoint = class b2MouseJoint extends b2Joint {
        constructor(...args) {
          super(...args);
          this._touchPoint = new Vec2();
          this._isTouched = false;
        }

        setTarget(v) {
          if (this._b2joint) {
            tempB2Vec2.x = v.x / PHYSICS_2D_PTM_RATIO;
            tempB2Vec2.y = v.y / PHYSICS_2D_PTM_RATIO;

            this._b2joint.SetTarget(tempB2Vec2);
          }
        }

        setDampingRatio(v) {
          if (this._b2joint) {
            this._b2joint.SetDampingRatio(v);
          }
        }

        setFrequency(v) {
          if (this._b2joint) {
            this._b2joint.SetFrequency(v);
          }
        }

        setMaxForce(v) {
          if (this._b2joint) {
            this._b2joint.SetMaxForce(v);
          }
        }

        _createJointDef() {
          const def = new b2.MouseJointDef();
          const comp = this._jointComp;
          def.target.Set(this._touchPoint.x / PHYSICS_2D_PTM_RATIO, this._touchPoint.y / PHYSICS_2D_PTM_RATIO);
          def.maxForce = comp.maxForce;
          def.dampingRatio = comp.dampingRatio;
          def.frequencyHz = comp.frequency;
          return def;
        }

        initialize(comp) {
          super.initialize(comp);
          const canvas = find('Canvas');

          if (canvas) {
            canvas.on(NodeEventType.TOUCH_START, this.onTouchBegan, this);
            canvas.on(NodeEventType.TOUCH_MOVE, this.onTouchMove, this);
            canvas.on(NodeEventType.TOUCH_END, this.onTouchEnd, this);
            canvas.on(NodeEventType.TOUCH_CANCEL, this.onTouchEnd, this);
          }
        }

        onEnable() {}

        start() {}

        onTouchBegan(event) {
          this._isTouched = true;

          const target = this._touchPoint.set(event.getUILocation());

          const world = PhysicsSystem2D.instance.physicsWorld;
          const colliders = world.testPoint(target);
          if (colliders.length <= 0) return;
          const body = colliders[0].body;
          body.wakeUp();
          const comp = this._jointComp;
          comp.connectedBody = body;

          this._init();

          this.setMaxForce(comp.maxForce * body.getMass());
          this.setTarget(target);
        }

        onTouchMove(event) {
          this._touchPoint = event.getUILocation();
        }

        onTouchEnd(event) {
          this._destroy();

          this._isTouched = false;
        }

        update() {
          if (!this._isTouched || !this.isValid()) {
            return;
          } // let camera = cc.Camera.findCamera(this.node);
          // if (camera) {
          //     this.target = camera.getScreenToWorldPoint(this._touchPoint);
          // }
          // else {


          this.setTarget(this._touchPoint); // }
        }

      });
    }
  };
});