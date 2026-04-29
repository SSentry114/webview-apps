System.register("q-bundled:///fs/cocos/physics/framework/components/constraints/constraint.js", ["../../../../core/data/decorators/index.js", "../../../../../../virtual/internal%253Aconstants.js", "../../../../scene-graph/index.js", "../rigid-body.js", "../../../../core/index.js", "../../physics-selector.js", "../../physics-enum.js"], function (_export, _context) {
  "use strict";

  var ccclass, requireComponent, displayOrder, type, readOnly, serializable, EDITOR, Component, RigidBody, Eventify, cclegacy, selector, createConstraint, EConstraintType, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _initializer, _initializer2, _class3, _temp, Constraint;

  function _applyDecoratedInitializer(target, property, decorators, initializer) {
    return decorators.slice().reverse().reduce(function (decoratedInitializer, decorator) {
      return decorator(target, property, decoratedInitializer) || decoratedInitializer;
    }, initializer);
  }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      requireComponent = _coreDataDecoratorsIndexJs.requireComponent;
      displayOrder = _coreDataDecoratorsIndexJs.displayOrder;
      type = _coreDataDecoratorsIndexJs.type;
      readOnly = _coreDataDecoratorsIndexJs.readOnly;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_sceneGraphIndexJs) {
      Component = _sceneGraphIndexJs.Component;
    }, function (_rigidBodyJs) {
      RigidBody = _rigidBodyJs.RigidBody;
    }, function (_coreIndexJs) {
      Eventify = _coreIndexJs.Eventify;
      cclegacy = _coreIndexJs.cclegacy;
    }, function (_physicsSelectorJs) {
      selector = _physicsSelectorJs.selector;
      createConstraint = _physicsSelectorJs.createConstraint;
    }, function (_physicsEnumJs) {
      EConstraintType = _physicsEnumJs.EConstraintType;
    }],
    execute: function () {
      /**
       * @en
       * Base class for joint constraints, which depends on rigid body components.
       * @zh
       * 关节约束的基类，它依赖于刚体组件。
       */
      _export("Constraint", Constraint = (_dec = ccclass('cc.Constraint'), _dec2 = requireComponent(RigidBody), _dec3 = type(RigidBody), _dec4 = displayOrder(-2), _dec5 = type(RigidBody), _dec6 = displayOrder(-1), _dec7 = displayOrder(0), _dec8 = type(RigidBody), _dec(_class = _dec2(_class = (_class2 = (_temp = _class3 = class Constraint extends Eventify(Component) {
        /**
         * @en
         * Enumeration of joint types.
         * @zh
         * 关节类型的枚举。
         */

        /**
         * @en
         * Gets the collider attached rigid-body.
         * @zh
         * 获取碰撞器所绑定的刚体组件。
         */
        get attachedBody() {
          return this.getComponent(RigidBody);
        }
        /**
         * @en
         * Get or set the jointed rigid body, null means link to a static rigid body at the world origin.
         * @zh
         * 获取或设置关节连接的刚体，为空时表示链接到位于世界原点的静态刚体。
         */


        get connectedBody() {
          return this._connectedBody;
        }

        set connectedBody(v) {
          this._connectedBody = v;

          if (!EDITOR || cclegacy.GAME_VIEW) {
            if (this._constraint) this._constraint.setConnectedBody(v);
          }
        }
        /**
         * @en
         * Get or set whether collision is turned on between two rigid bodies connected by a joint.
         * @zh
         * 获取或设置关节连接的两刚体之间是否开启碰撞。
         */


        get enableCollision() {
          return this._enableCollision;
        }

        set enableCollision(v) {
          this._enableCollision = v;

          if (!EDITOR || cclegacy.GAME_VIEW) {
            if (this._constraint) this._constraint.setEnableCollision(v);
          }
        }
        /**
         * @en
         * Gets the type of this joint.
         * @zh
         * 获取此关节的类型。
         */


        constructor(type) {
          super();
          this.TYPE = void 0;
          this._enableCollision = _initializer && _initializer();
          this._connectedBody = _initializer2 && _initializer2();
          this._constraint = null;
          this.TYPE = type;
        } /// COMPONENT LIFECYCLE ///


        onLoad() {
          if (!selector.runInEditor) return;
          this._constraint = createConstraint(this.TYPE);

          this._constraint.initialize(this);
        }

        onEnable() {
          if (this._constraint) {
            this._constraint.onEnable();
          }
        }

        onDisable() {
          if (this._constraint) {
            this._constraint.onDisable();
          }
        }

        onDestroy() {
          if (this._constraint) {
            this._constraint.onDestroy();
          }
        }

      }, _class3.Type = EConstraintType, _temp), (_applyDecoratedDescriptor(_class2.prototype, "attachedBody", [_dec3, readOnly, _dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "attachedBody"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "connectedBody", [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "connectedBody"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "enableCollision", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "enableCollision"), _class2.prototype), _initializer = _applyDecoratedInitializer(_class2.prototype, "_enableCollision", [serializable], function () {
        return true;
      }), _initializer2 = _applyDecoratedInitializer(_class2.prototype, "_connectedBody", [_dec8], function () {
        return null;
      })), _class2)) || _class) || _class));

      (function (_Constraint) {})(Constraint || _export("Constraint", Constraint = {}));
    }
  };
});