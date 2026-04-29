System.register("q-bundled:///fs/cocos/animation/marionette/condition.js", ["./parametric.js", "../../core/index.js", "../define.js", "./create-eval.js", "./errors.js"], function (_export, _context) {
  "use strict";

  var VariableType, BindableBoolean, BindableNumber, bindOr, validateVariableExistence, bindNumericOr, validateVariableTypeTriggerLike, _decorator, CLASS_NAME_PREFIX_ANIM, createEval, VariableTypeMismatchedError, BinaryConditionEval, UnaryConditionEval, TriggerConditionEval, _dec, _class, _class2, _initializer, _initializer2, _initializer3, _class3, _temp, _dec2, _class4, _class5, _initializer4, _initializer5, _class6, _temp2, _dec3, _class7, _class8, _initializer6, ccclass, serializable, BinaryOperator, BinaryCondition, UnaryOperator, UnaryCondition, TriggerCondition;

  function _applyDecoratedInitializer(target, property, decorators, initializer) {
    return decorators.slice().reverse().reduce(function (decoratedInitializer, decorator) {
      return decorator(target, property, decoratedInitializer) || decoratedInitializer;
    }, initializer);
  }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function validateConditionParamNumber(val, name) {
    if (typeof val !== 'number') {
      throw new VariableTypeMismatchedError(name, 'float');
    }
  }

  function validateConditionParamInteger(val, name) {
    if (!Number.isInteger(val)) {
      throw new VariableTypeMismatchedError(name, 'integer');
    }
  }

  function validateConditionParamBoolean(val, name) {
    if (typeof val !== 'boolean') {
      throw new VariableTypeMismatchedError(name, 'boolean');
    }
  }

  function validateConditionParamTrigger(val, name) {
    if (typeof val !== 'object') {
      throw new VariableTypeMismatchedError(name, 'trigger');
    }
  }

  _export({
    validateConditionParamNumber: validateConditionParamNumber,
    validateConditionParamInteger: validateConditionParamInteger,
    validateConditionParamBoolean: validateConditionParamBoolean,
    validateConditionParamTrigger: validateConditionParamTrigger
  });

  return {
    setters: [function (_parametricJs) {
      VariableType = _parametricJs.VariableType;
      BindableBoolean = _parametricJs.BindableBoolean;
      BindableNumber = _parametricJs.BindableNumber;
      bindOr = _parametricJs.bindOr;
      validateVariableExistence = _parametricJs.validateVariableExistence;
      bindNumericOr = _parametricJs.bindNumericOr;
      validateVariableTypeTriggerLike = _parametricJs.validateVariableTypeTriggerLike;
    }, function (_coreIndexJs) {
      _decorator = _coreIndexJs._decorator;
    }, function (_defineJs) {
      CLASS_NAME_PREFIX_ANIM = _defineJs.CLASS_NAME_PREFIX_ANIM;
    }, function (_createEvalJs) {
      createEval = _createEvalJs.createEval;
    }, function (_errorsJs) {
      VariableTypeMismatchedError = _errorsJs.VariableTypeMismatchedError;
    }],
    execute: function () {
      ({
        ccclass,
        serializable
      } = _decorator);

      (function (BinaryOperator) {
        BinaryOperator[BinaryOperator["EQUAL_TO"] = 0] = "EQUAL_TO";
        BinaryOperator[BinaryOperator["NOT_EQUAL_TO"] = 1] = "NOT_EQUAL_TO";
        BinaryOperator[BinaryOperator["LESS_THAN"] = 2] = "LESS_THAN";
        BinaryOperator[BinaryOperator["LESS_THAN_OR_EQUAL_TO"] = 3] = "LESS_THAN_OR_EQUAL_TO";
        BinaryOperator[BinaryOperator["GREATER_THAN"] = 4] = "GREATER_THAN";
        BinaryOperator[BinaryOperator["GREATER_THAN_OR_EQUAL_TO"] = 5] = "GREATER_THAN_OR_EQUAL_TO";
      })(BinaryOperator || (BinaryOperator = {}));

      _export("BinaryCondition", BinaryCondition = (_dec = ccclass(`${CLASS_NAME_PREFIX_ANIM}BinaryCondition`), _dec(_class = (_class2 = (_temp = _class3 = class BinaryCondition {
        constructor() {
          this.operator = _initializer && _initializer();
          this.lhs = _initializer2 && _initializer2();
          this.rhs = _initializer3 && _initializer3();
        }

        clone() {
          const that = new BinaryCondition();
          that.operator = this.operator;
          that.lhs = this.lhs.clone();
          that.rhs = this.rhs.clone();
          return that;
        }

        [createEval](context) {
          const {
            operator,
            lhs,
            rhs
          } = this;
          const evaluation = new BinaryConditionEval(operator, 0.0, 0.0);
          const lhsValue = bindNumericOr(context, lhs, VariableType.FLOAT, evaluation.setLhs, evaluation);
          const rhsValue = bindNumericOr(context, rhs, VariableType.FLOAT, evaluation.setRhs, evaluation);
          evaluation.reset(lhsValue, rhsValue);
          return evaluation;
        }

      }, _class3.Operator = BinaryOperator, _temp), (_initializer = _applyDecoratedInitializer(_class2.prototype, "operator", [serializable], function () {
        return BinaryOperator.EQUAL_TO;
      }), _initializer2 = _applyDecoratedInitializer(_class2.prototype, "lhs", [serializable], function () {
        return new BindableNumber();
      }), _initializer3 = _applyDecoratedInitializer(_class2.prototype, "rhs", [serializable], function () {
        return new BindableNumber();
      })), _class2)) || _class));

      BinaryConditionEval = class BinaryConditionEval {
        constructor(operator, lhs, rhs) {
          this._operator = operator;
          this._lhs = lhs;
          this._rhs = rhs;

          this._eval();
        }

        reset(lhs, rhs) {
          this._lhs = lhs;
          this._rhs = rhs;

          this._eval();
        }

        setLhs(value) {
          this._lhs = value;

          this._eval();
        }

        setRhs(value) {
          this._rhs = value;

          this._eval();
        }
        /**
         * Evaluates this condition.
         */


        eval() {
          return this._result;
        }

        _eval() {
          const {
            _lhs: lhs,
            _rhs: rhs
          } = this;

          switch (this._operator) {
            default:
            case BinaryOperator.EQUAL_TO:
              this._result = lhs === rhs;
              break;

            case BinaryOperator.NOT_EQUAL_TO:
              this._result = lhs !== rhs;
              break;

            case BinaryOperator.LESS_THAN:
              this._result = lhs < rhs;
              break;

            case BinaryOperator.LESS_THAN_OR_EQUAL_TO:
              this._result = lhs <= rhs;
              break;

            case BinaryOperator.GREATER_THAN:
              this._result = lhs > rhs;
              break;

            case BinaryOperator.GREATER_THAN_OR_EQUAL_TO:
              this._result = lhs >= rhs;
              break;
          }
        }

      };

      (function (UnaryOperator) {
        UnaryOperator[UnaryOperator["TRUTHY"] = 0] = "TRUTHY";
        UnaryOperator[UnaryOperator["FALSY"] = 1] = "FALSY";
      })(UnaryOperator || (UnaryOperator = {}));

      _export("UnaryCondition", UnaryCondition = (_dec2 = ccclass(`${CLASS_NAME_PREFIX_ANIM}UnaryCondition`), _dec2(_class4 = (_class5 = (_temp2 = _class6 = class UnaryCondition {
        constructor() {
          this.operator = _initializer4 && _initializer4();
          this.operand = _initializer5 && _initializer5();
        }

        clone() {
          const that = new UnaryCondition();
          that.operator = this.operator;
          that.operand = this.operand.clone();
          return that;
        }

        [createEval](context) {
          const {
            operator,
            operand
          } = this;
          const evaluation = new UnaryConditionEval(operator, false);
          const value = bindOr(context, operand, VariableType.BOOLEAN, evaluation.setOperand, evaluation);
          evaluation.reset(value);
          return evaluation;
        }

      }, _class6.Operator = UnaryOperator, _temp2), (_initializer4 = _applyDecoratedInitializer(_class5.prototype, "operator", [serializable], function () {
        return UnaryOperator.TRUTHY;
      }), _initializer5 = _applyDecoratedInitializer(_class5.prototype, "operand", [serializable], function () {
        return new BindableBoolean();
      })), _class5)) || _class4));

      UnaryConditionEval = class UnaryConditionEval {
        constructor(operator, operand) {
          this._operator = operator;
          this._operand = operand;

          this._eval();
        }

        reset(value) {
          this.setOperand(value);
        }

        setOperand(value) {
          this._operand = value;

          this._eval();
        }
        /**
         * Evaluates this condition.
         */


        eval() {
          return this._result;
        }

        _eval() {
          const {
            _operand: operand
          } = this;

          switch (this._operator) {
            default:
            case UnaryOperator.TRUTHY:
              this._result = !!operand;
              break;

            case UnaryOperator.FALSY:
              this._result = !operand;
              break;
          }
        }

      };

      _export("TriggerCondition", TriggerCondition = (_dec3 = ccclass(`${CLASS_NAME_PREFIX_ANIM}TriggerCondition`), _dec3(_class7 = (_class8 = class TriggerCondition {
        constructor() {
          this.trigger = _initializer6 && _initializer6();
        }

        clone() {
          const that = new TriggerCondition();
          that.trigger = this.trigger;
          return that;
        }

        [createEval](context) {
          const evaluation = new TriggerConditionEval(false);
          const triggerInstance = context.getVar(this.trigger);

          if (validateVariableExistence(triggerInstance, this.trigger)) {
            validateVariableTypeTriggerLike(triggerInstance.type, this.trigger);
            evaluation.setTrigger(triggerInstance.bind(evaluation.setTrigger, evaluation));
          }

          return evaluation;
        }

      }, (_initializer6 = _applyDecoratedInitializer(_class8.prototype, "trigger", [serializable], function () {
        return '';
      })), _class8)) || _class7));

      TriggerConditionEval = class TriggerConditionEval {
        constructor(triggered) {
          this._triggered = false;
          this._triggered = triggered;
        }

        setTrigger(trigger) {
          this._triggered = trigger;
        }

        eval() {
          return this._triggered;
        }

      };
    }
  };
});