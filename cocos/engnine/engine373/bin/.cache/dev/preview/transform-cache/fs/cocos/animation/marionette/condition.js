System.register("q-bundled:///fs/cocos/animation/marionette/condition.js", ["./parametric.js", "../../core/index.js", "../define.js", "./create-eval.js", "./errors.js"], function (_export, _context) {
  "use strict";

  var VariableType, BindableBoolean, BindableNumber, bindOr, validateVariableExistence, bindNumericOr, validateVariableTypeTriggerLike, _decorator, CLASS_NAME_PREFIX_ANIM, createEval, VariableTypeMismatchedError, _dec, _class, _class2, _initializer, _initializer2, _initializer3, _class3, _temp, _dec2, _class4, _class5, _initializer4, _initializer5, _class6, _temp2, _dec3, _class7, _class8, _initializer6, ccclass, serializable, BinaryOperator, BinaryCondition, BinaryConditionEval, UnaryOperator, UnaryCondition, UnaryConditionEval, TriggerCondition, TriggerConditionEval;

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
      ccclass = _decorator.ccclass;
      serializable = _decorator.serializable;

      (function (BinaryOperator) {
        BinaryOperator[BinaryOperator["EQUAL_TO"] = 0] = "EQUAL_TO";
        BinaryOperator[BinaryOperator["NOT_EQUAL_TO"] = 1] = "NOT_EQUAL_TO";
        BinaryOperator[BinaryOperator["LESS_THAN"] = 2] = "LESS_THAN";
        BinaryOperator[BinaryOperator["LESS_THAN_OR_EQUAL_TO"] = 3] = "LESS_THAN_OR_EQUAL_TO";
        BinaryOperator[BinaryOperator["GREATER_THAN"] = 4] = "GREATER_THAN";
        BinaryOperator[BinaryOperator["GREATER_THAN_OR_EQUAL_TO"] = 5] = "GREATER_THAN_OR_EQUAL_TO";
      })(BinaryOperator || (BinaryOperator = {}));

      _export("BinaryCondition", BinaryCondition = (_dec = ccclass(CLASS_NAME_PREFIX_ANIM + "BinaryCondition"), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function () {
        function BinaryCondition() {
          this.operator = _initializer && _initializer();
          this.lhs = _initializer2 && _initializer2();
          this.rhs = _initializer3 && _initializer3();
        }

        var _proto = BinaryCondition.prototype;

        _proto.clone = function clone() {
          var that = new BinaryCondition();
          that.operator = this.operator;
          that.lhs = this.lhs.clone();
          that.rhs = this.rhs.clone();
          return that;
        };

        _proto[createEval] = function (context) {
          var operator = this.operator,
              lhs = this.lhs,
              rhs = this.rhs;
          var evaluation = new BinaryConditionEval(operator, 0.0, 0.0);
          var lhsValue = bindNumericOr(context, lhs, VariableType.FLOAT, evaluation.setLhs, evaluation);
          var rhsValue = bindNumericOr(context, rhs, VariableType.FLOAT, evaluation.setRhs, evaluation);
          evaluation.reset(lhsValue, rhsValue);
          return evaluation;
        };

        return BinaryCondition;
      }(), _class3.Operator = BinaryOperator, _temp), (_initializer = _applyDecoratedInitializer(_class2.prototype, "operator", [serializable], function () {
        return BinaryOperator.EQUAL_TO;
      }), _initializer2 = _applyDecoratedInitializer(_class2.prototype, "lhs", [serializable], function () {
        return new BindableNumber();
      }), _initializer3 = _applyDecoratedInitializer(_class2.prototype, "rhs", [serializable], function () {
        return new BindableNumber();
      })), _class2)) || _class));

      BinaryConditionEval = /*#__PURE__*/function () {
        function BinaryConditionEval(operator, lhs, rhs) {
          this._operator = operator;
          this._lhs = lhs;
          this._rhs = rhs;

          this._eval();
        }

        var _proto2 = BinaryConditionEval.prototype;

        _proto2.reset = function reset(lhs, rhs) {
          this._lhs = lhs;
          this._rhs = rhs;

          this._eval();
        };

        _proto2.setLhs = function setLhs(value) {
          this._lhs = value;

          this._eval();
        };

        _proto2.setRhs = function setRhs(value) {
          this._rhs = value;

          this._eval();
        }
        /**
         * Evaluates this condition.
         */
        ;

        _proto2.eval = function _eval() {
          return this._result;
        };

        _proto2._eval = function _eval() {
          var lhs = this._lhs,
              rhs = this._rhs;

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
        };

        return BinaryConditionEval;
      }();

      (function (UnaryOperator) {
        UnaryOperator[UnaryOperator["TRUTHY"] = 0] = "TRUTHY";
        UnaryOperator[UnaryOperator["FALSY"] = 1] = "FALSY";
      })(UnaryOperator || (UnaryOperator = {}));

      _export("UnaryCondition", UnaryCondition = (_dec2 = ccclass(CLASS_NAME_PREFIX_ANIM + "UnaryCondition"), _dec2(_class4 = (_class5 = (_temp2 = _class6 = /*#__PURE__*/function () {
        function UnaryCondition() {
          this.operator = _initializer4 && _initializer4();
          this.operand = _initializer5 && _initializer5();
        }

        var _proto3 = UnaryCondition.prototype;

        _proto3.clone = function clone() {
          var that = new UnaryCondition();
          that.operator = this.operator;
          that.operand = this.operand.clone();
          return that;
        };

        _proto3[createEval] = function (context) {
          var operator = this.operator,
              operand = this.operand;
          var evaluation = new UnaryConditionEval(operator, false);
          var value = bindOr(context, operand, VariableType.BOOLEAN, evaluation.setOperand, evaluation);
          evaluation.reset(value);
          return evaluation;
        };

        return UnaryCondition;
      }(), _class6.Operator = UnaryOperator, _temp2), (_initializer4 = _applyDecoratedInitializer(_class5.prototype, "operator", [serializable], function () {
        return UnaryOperator.TRUTHY;
      }), _initializer5 = _applyDecoratedInitializer(_class5.prototype, "operand", [serializable], function () {
        return new BindableBoolean();
      })), _class5)) || _class4));

      UnaryConditionEval = /*#__PURE__*/function () {
        function UnaryConditionEval(operator, operand) {
          this._operator = operator;
          this._operand = operand;

          this._eval();
        }

        var _proto4 = UnaryConditionEval.prototype;

        _proto4.reset = function reset(value) {
          this.setOperand(value);
        };

        _proto4.setOperand = function setOperand(value) {
          this._operand = value;

          this._eval();
        }
        /**
         * Evaluates this condition.
         */
        ;

        _proto4.eval = function _eval() {
          return this._result;
        };

        _proto4._eval = function _eval() {
          var operand = this._operand;

          switch (this._operator) {
            default:
            case UnaryOperator.TRUTHY:
              this._result = !!operand;
              break;

            case UnaryOperator.FALSY:
              this._result = !operand;
              break;
          }
        };

        return UnaryConditionEval;
      }();

      _export("TriggerCondition", TriggerCondition = (_dec3 = ccclass(CLASS_NAME_PREFIX_ANIM + "TriggerCondition"), _dec3(_class7 = (_class8 = /*#__PURE__*/function () {
        function TriggerCondition() {
          this.trigger = _initializer6 && _initializer6();
        }

        var _proto5 = TriggerCondition.prototype;

        _proto5.clone = function clone() {
          var that = new TriggerCondition();
          that.trigger = this.trigger;
          return that;
        };

        _proto5[createEval] = function (context) {
          var evaluation = new TriggerConditionEval(false);
          var triggerInstance = context.getVar(this.trigger);

          if (validateVariableExistence(triggerInstance, this.trigger)) {
            validateVariableTypeTriggerLike(triggerInstance.type, this.trigger);
            evaluation.setTrigger(triggerInstance.bind(evaluation.setTrigger, evaluation));
          }

          return evaluation;
        };

        return TriggerCondition;
      }(), (_initializer6 = _applyDecoratedInitializer(_class8.prototype, "trigger", [serializable], function () {
        return '';
      })), _class8)) || _class7));

      TriggerConditionEval = /*#__PURE__*/function () {
        function TriggerConditionEval(triggered) {
          this._triggered = false;
          this._triggered = triggered;
        }

        var _proto6 = TriggerConditionEval.prototype;

        _proto6.setTrigger = function setTrigger(trigger) {
          this._triggered = trigger;
        };

        _proto6.eval = function _eval() {
          return this._triggered;
        };

        return TriggerConditionEval;
      }();
    }
  };
});