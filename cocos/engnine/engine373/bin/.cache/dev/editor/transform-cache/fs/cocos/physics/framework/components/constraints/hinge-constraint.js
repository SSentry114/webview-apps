System.register("q-bundled:///fs/cocos/physics/framework/components/constraints/hinge-constraint.js", ["../../../../core/data/decorators/index.js", "../../../../../../virtual/internal%253Aconstants.js", "./constraint.js", "../../../../core/index.js", "../../physics-enum.js"], function (_export, _context) {
  "use strict";

  var ccclass, help, menu, serializable, formerlySerializedAs, type, EDITOR, Constraint, Vec3, cclegacy, EConstraintType, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _initializer, _initializer2, _initializer3, HingeConstraint;

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
      help = _coreDataDecoratorsIndexJs.help;
      menu = _coreDataDecoratorsIndexJs.menu;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      formerlySerializedAs = _coreDataDecoratorsIndexJs.formerlySerializedAs;
      type = _coreDataDecoratorsIndexJs.type;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_constraintJs) {
      Constraint = _constraintJs.Constraint;
    }, function (_coreIndexJs) {
      Vec3 = _coreIndexJs.Vec3;
      cclegacy = _coreIndexJs.cclegacy;
    }, function (_physicsEnumJs) {
      EConstraintType = _physicsEnumJs.EConstraintType;
    }],
    execute: function () {
      _export("HingeConstraint", HingeConstraint = (_dec = ccclass('cc.HingeConstraint'), _dec2 = help('i18n:cc.HingeConstraint'), _dec3 = menu('Physics/HingeConstraint(beta)'), _dec4 = type(Vec3), _dec5 = type(Vec3), _dec6 = type(Vec3), _dec7 = formerlySerializedAs('axisA'), _dec8 = formerlySerializedAs('pivotA'), _dec9 = formerlySerializedAs('pivotB'), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = class HingeConstraint extends Constraint {
        /**
         * @en
         * The position of the own rigid body in local space with respect to the constraint axis.
         * @zh
         * 在本地空间中，自身刚体相对于约束关节的位置。
         */
        get pivotA() {
          return this._pivotA;
        }

        set pivotA(v) {
          Vec3.copy(this._pivotA, v);

          if (!EDITOR || cclegacy.GAME_VIEW) {
            this.constraint.setPivotA(this._pivotA);
          }
        }
        /**
         * @en
         * The position of the connected rigid body in the local space with respect to the constraint axis.
         * @zh
         * 在本地空间中，连接刚体相对于约束关节的位置。
         */


        get pivotB() {
          return this._pivotB;
        }

        set pivotB(v) {
          Vec3.copy(this._pivotB, v);

          if (!EDITOR || cclegacy.GAME_VIEW) {
            this.constraint.setPivotB(this._pivotB);
          }
        }
        /**
         * @en
         * The direction of the constraint axis rotation in local space.
         * @zh
         * 在本地空间中，约束关节旋转的方向。
         */


        get axis() {
          return this._axis;
        }

        set axis(v) {
          Vec3.copy(this._axis, v);

          if (!EDITOR || cclegacy.GAME_VIEW) {
            this.constraint.setAxis(this._axis);
          }
        }

        get constraint() {
          return this._constraint;
        }

        constructor() {
          super(EConstraintType.HINGE);
          this._axis = _initializer && _initializer();
          this._pivotA = _initializer2 && _initializer2();
          this._pivotB = _initializer3 && _initializer3();
        }

      }, (_applyDecoratedDescriptor(_class2.prototype, "pivotA", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "pivotA"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "pivotB", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "pivotB"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "axis", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "axis"), _class2.prototype), _initializer = _applyDecoratedInitializer(_class2.prototype, "_axis", [serializable, _dec7], function () {
        return new Vec3();
      }), _initializer2 = _applyDecoratedInitializer(_class2.prototype, "_pivotA", [serializable, _dec8], function () {
        return new Vec3();
      }), _initializer3 = _applyDecoratedInitializer(_class2.prototype, "_pivotB", [serializable, _dec9], function () {
        return new Vec3();
      })), _class2)) || _class) || _class) || _class));
    }
  };
});