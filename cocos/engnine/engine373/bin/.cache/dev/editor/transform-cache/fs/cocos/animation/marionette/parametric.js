System.register("q-bundled:///fs/cocos/animation/marionette/parametric.js", ["../../core/index.js", "../define.js", "./errors.js", "./variable.js"], function (_export, _context) {
  "use strict";

  var _decorator, CLASS_NAME_PREFIX_ANIM, VariableNotDefinedError, VariableTypeMismatchedError, VariableType, _dec, _class, _class2, _initializer, _initializer2, _dec2, _class4, _class5, _initializer3, _initializer4, ccclass, serializable, BindableNumber, BindableBoolean;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedInitializer(target, property, decorators, initializer) {
    return decorators.slice().reverse().reduce(function (decoratedInitializer, decorator) {
      return decorator(target, property, decoratedInitializer) || decoratedInitializer;
    }, initializer);
  }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function bindOr(context, bindable, type, callback, thisArg, ...args) {
    const {
      variable,
      value
    } = bindable;

    if (!variable) {
      return value;
    }

    const varInstance = context.getVar(variable);

    if (!validateVariableExistence(varInstance, variable)) {
      return value;
    }

    if (varInstance.type !== type) {
      throw new VariableTypeMismatchedError(variable, 'number');
    }

    const initialValue = varInstance.bind(callback, thisArg, ...args);
    return initialValue;
  }

  function bindNumericOr(context, bindable, type, callback, thisArg, ...args) {
    const {
      variable,
      value
    } = bindable;

    if (!variable) {
      return value;
    }

    const varInstance = context.getVar(variable);

    if (!validateVariableExistence(varInstance, variable)) {
      return value;
    }

    if (type !== VariableType.FLOAT && type !== VariableType.INTEGER) {
      throw new VariableTypeMismatchedError(variable, 'number or integer');
    }

    const initialValue = varInstance.bind(callback, thisArg, ...args);
    return initialValue;
  }

  function validateVariableExistence(varInstance, name) {
    if (!varInstance) {
      // TODO, warn only?
      throw new VariableNotDefinedError(name);
    } else {
      return true;
    }
  }

  function validateVariableType(type, expected, name) {
    if (type !== expected) {
      throw new VariableTypeMismatchedError(name, 'number');
    }
  }

  function validateVariableTypeNumeric(type, name) {
    if (type !== VariableType.FLOAT && type !== VariableType.INTEGER) {
      throw new VariableTypeMismatchedError(name, 'number or integer');
    }
  }

  function validateVariableTypeTriggerLike(type, name) {
    if (type !== VariableType.TRIGGER) {
      throw new VariableTypeMismatchedError(name, 'trigger');
    }
  }

  _export({
    bindOr: bindOr,
    bindNumericOr: bindNumericOr,
    validateVariableExistence: validateVariableExistence,
    validateVariableType: validateVariableType,
    validateVariableTypeNumeric: validateVariableTypeNumeric,
    validateVariableTypeTriggerLike: validateVariableTypeTriggerLike
  });

  return {
    setters: [function (_coreIndexJs) {
      _decorator = _coreIndexJs._decorator;
    }, function (_defineJs) {
      CLASS_NAME_PREFIX_ANIM = _defineJs.CLASS_NAME_PREFIX_ANIM;
    }, function (_errorsJs) {
      VariableNotDefinedError = _errorsJs.VariableNotDefinedError;
      VariableTypeMismatchedError = _errorsJs.VariableTypeMismatchedError;
    }, function (_variableJs) {
      VariableType = _variableJs.VariableType;
    }],
    execute: function () {
      _export("VariableType", VariableType);

      ({
        ccclass,
        serializable
      } = _decorator);

      _export("BindableNumber", BindableNumber = (_dec = ccclass(`${CLASS_NAME_PREFIX_ANIM}BindableNumber`), _dec(_class = (_class2 = class BindableNumber {
        constructor(value = 0.0) {
          this.variable = _initializer && _initializer();
          this.value = _initializer2 && _initializer2();
          this.value = value;
        }

        clone() {
          const that = new BindableNumber();
          that.value = this.value;
          that.variable = this.variable;
          return that;
        }

      }, (_initializer = _applyDecoratedInitializer(_class2.prototype, "variable", [serializable], function () {
        return '';
      }), _initializer2 = _applyDecoratedInitializer(_class2.prototype, "value", [serializable], function () {
        return 0.0;
      })), _class2)) || _class));

      _export("BindableBoolean", BindableBoolean = (_dec2 = ccclass(`${CLASS_NAME_PREFIX_ANIM}BindableBoolean`), _dec2(_class4 = (_class5 = class BindableBoolean {
        constructor(value = false) {
          this.variable = _initializer3 && _initializer3();
          this.value = _initializer4 && _initializer4();
          this.value = value;
        }

        clone() {
          const that = new BindableBoolean();
          that.value = this.value;
          that.variable = this.variable;
          return that;
        }

      }, (_initializer3 = _applyDecoratedInitializer(_class5.prototype, "variable", [serializable], function () {
        return '';
      }), _initializer4 = _applyDecoratedInitializer(_class5.prototype, "value", [serializable], function () {
        return false;
      })), _class5)) || _class4));
    }
  };
});