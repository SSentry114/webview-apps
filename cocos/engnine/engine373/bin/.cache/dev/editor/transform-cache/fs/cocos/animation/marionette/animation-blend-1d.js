System.register("q-bundled:///fs/cocos/animation/marionette/animation-blend-1d.js", ["../../core/index.js", "./create-eval.js", "./parametric.js", "./animation-blend.js", "./blend-1d.js", "../define.js"], function (_export, _context) {
  "use strict";

  var _decorator, createEval, BindableNumber, bindOr, VariableType, AnimationBlend, AnimationBlendEval, AnimationBlendItem, blend1D, CLASS_NAME_PREFIX_ANIM, AnimationBlend1DEval, _dec, _class, _class2, _initializer, _dec2, _class4, _class5, _initializer2, _initializer3, _class6, _temp, ccclass, serializable, AnimationBlend1DItem, AnimationBlend1D;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedInitializer(target, property, decorators, initializer) {
    return decorators.slice().reverse().reduce(function (decoratedInitializer, decorator) {
      return decorator(target, property, decoratedInitializer) || decoratedInitializer;
    }, initializer);
  }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_coreIndexJs) {
      _decorator = _coreIndexJs._decorator;
    }, function (_createEvalJs) {
      createEval = _createEvalJs.createEval;
    }, function (_parametricJs) {
      BindableNumber = _parametricJs.BindableNumber;
      bindOr = _parametricJs.bindOr;
      VariableType = _parametricJs.VariableType;
    }, function (_animationBlendJs) {
      AnimationBlend = _animationBlendJs.AnimationBlend;
      AnimationBlendEval = _animationBlendJs.AnimationBlendEval;
      AnimationBlendItem = _animationBlendJs.AnimationBlendItem;
    }, function (_blend1dJs) {
      blend1D = _blend1dJs.blend1D;
    }, function (_defineJs) {
      CLASS_NAME_PREFIX_ANIM = _defineJs.CLASS_NAME_PREFIX_ANIM;
    }],
    execute: function () {
      ({
        ccclass,
        serializable
      } = _decorator);
      AnimationBlend1DItem = (_dec = ccclass(`${CLASS_NAME_PREFIX_ANIM}AnimationBlend1DItem`), _dec(_class = (_class2 = class AnimationBlend1DItem extends AnimationBlendItem {
        constructor(...args) {
          super(...args);
          this.threshold = _initializer && _initializer();
        }

        clone() {
          const that = new AnimationBlend1DItem();

          this._copyTo(that);

          return that;
        }

        _copyTo(that) {
          super._copyTo(that);

          that.threshold = this.threshold;
          return that;
        }

      }, (_initializer = _applyDecoratedInitializer(_class2.prototype, "threshold", [serializable], function () {
        return 0.0;
      })), _class2)) || _class);

      _export("AnimationBlend1D", AnimationBlend1D = (_dec2 = ccclass('cc.animation.AnimationBlend1D'), _dec2(_class4 = (_class5 = (_temp = _class6 = class AnimationBlend1D extends AnimationBlend {
        constructor(...args) {
          super(...args);
          this._items = _initializer2 && _initializer2();
          this.param = _initializer3 && _initializer3();
        }

        get items() {
          return this._items;
        }

        set items(value) {
          this._items = Array.from(value).sort(({
            threshold: lhs
          }, {
            threshold: rhs
          }) => lhs - rhs);
        }

        clone() {
          const that = new AnimationBlend1D();
          this.copyTo(that);
          that._items = this._items.map(item => item.clone());
          that.param = this.param.clone();
          return that;
        }

        [createEval](context) {
          const evaluation = new AnimationBlend1DEval(context, this, this._items, this._items.map(({
            threshold
          }) => threshold), 0.0);
          const initialValue = bindOr(context, this.param, VariableType.FLOAT, evaluation.setInput, evaluation, 0);
          evaluation.setInput(initialValue, 0);
          return evaluation;
        }

      }, _class6.Item = AnimationBlend1DItem, _temp), (_initializer2 = _applyDecoratedInitializer(_class5.prototype, "_items", [serializable], function () {
        return [];
      }), _initializer3 = _applyDecoratedInitializer(_class5.prototype, "param", [serializable], function () {
        return new BindableNumber();
      })), _class5)) || _class4));

      AnimationBlend1DEval = class AnimationBlend1DEval extends AnimationBlendEval {
        constructor(context, base, items, thresholds, input) {
          super(context, base, items, [input]);
          this._thresholds = thresholds;
          this.doEval();
        }

        eval(weights, [value]) {
          blend1D(weights, this._thresholds, value);
        }

      };
    }
  };
});