System.register("q-bundled:///fs/cocos/animation/marionette/animation-blend-2d.js", ["../../core/index.js", "./create-eval.js", "./animation-blend.js", "./parametric.js", "./blend-2d.js", "../define.js"], function (_export, _context) {
  "use strict";

  var Vec2, _decorator, ccenum, createEval, AnimationBlend, AnimationBlendEval, AnimationBlendItem, BindableNumber, bindOr, VariableType, sampleFreeformCartesian, sampleFreeformDirectional, blendSimpleDirectional, CLASS_NAME_PREFIX_ANIM, AnimationBlend2DEval, _dec, _class, _class2, _initializer, _dec2, _class4, _class5, _initializer2, _initializer3, _initializer4, _initializer5, _class6, _temp, ccclass, serializable, Algorithm, AnimationBlend2DItem, AnimationBlend2D;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedInitializer(target, property, decorators, initializer) {
    return decorators.slice().reverse().reduce(function (decoratedInitializer, decorator) {
      return decorator(target, property, decoratedInitializer) || decoratedInitializer;
    }, initializer);
  }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_coreIndexJs) {
      Vec2 = _coreIndexJs.Vec2;
      _decorator = _coreIndexJs._decorator;
      ccenum = _coreIndexJs.ccenum;
    }, function (_createEvalJs) {
      createEval = _createEvalJs.createEval;
    }, function (_animationBlendJs) {
      AnimationBlend = _animationBlendJs.AnimationBlend;
      AnimationBlendEval = _animationBlendJs.AnimationBlendEval;
      AnimationBlendItem = _animationBlendJs.AnimationBlendItem;
    }, function (_parametricJs) {
      BindableNumber = _parametricJs.BindableNumber;
      bindOr = _parametricJs.bindOr;
      VariableType = _parametricJs.VariableType;
    }, function (_blend2dJs) {
      sampleFreeformCartesian = _blend2dJs.sampleFreeformCartesian;
      sampleFreeformDirectional = _blend2dJs.sampleFreeformDirectional;
      blendSimpleDirectional = _blend2dJs.blendSimpleDirectional;
    }, function (_defineJs) {
      CLASS_NAME_PREFIX_ANIM = _defineJs.CLASS_NAME_PREFIX_ANIM;
    }],
    execute: function () {
      ({
        ccclass,
        serializable
      } = _decorator);

      (function (Algorithm) {
        Algorithm[Algorithm["SIMPLE_DIRECTIONAL"] = 0] = "SIMPLE_DIRECTIONAL";
        Algorithm[Algorithm["FREEFORM_CARTESIAN"] = 1] = "FREEFORM_CARTESIAN";
        Algorithm[Algorithm["FREEFORM_DIRECTIONAL"] = 2] = "FREEFORM_DIRECTIONAL";
      })(Algorithm || (Algorithm = {}));

      ccenum(Algorithm);
      AnimationBlend2DItem = (_dec = ccclass(`${CLASS_NAME_PREFIX_ANIM}AnimationBlend2DItem`), _dec(_class = (_class2 = class AnimationBlend2DItem extends AnimationBlendItem {
        constructor(...args) {
          super(...args);
          this.threshold = _initializer && _initializer();
        }

        clone() {
          const that = new AnimationBlend2DItem();

          this._copyTo(that);

          return that;
        }

        _copyTo(that) {
          super._copyTo(that);

          Vec2.copy(that.threshold, this.threshold);
          return that;
        }

      }, (_initializer = _applyDecoratedInitializer(_class2.prototype, "threshold", [serializable], function () {
        return new Vec2();
      })), _class2)) || _class);

      _export("AnimationBlend2D", AnimationBlend2D = (_dec2 = ccclass('cc.animation.AnimationBlend2D'), _dec2(_class4 = (_class5 = (_temp = _class6 = class AnimationBlend2D extends AnimationBlend {
        constructor(...args) {
          super(...args);
          this.algorithm = _initializer2 && _initializer2();
          this._items = _initializer3 && _initializer3();
          this.paramX = _initializer4 && _initializer4();
          this.paramY = _initializer5 && _initializer5();
        }

        get items() {
          return this._items;
        }

        set items(items) {
          this._items = Array.from(items);
        }

        clone() {
          const that = new AnimationBlend2D();
          this.copyTo(that);
          that._items = this._items.map(item => {
            var _item$clone;

            return (_item$clone = item === null || item === void 0 ? void 0 : item.clone()) !== null && _item$clone !== void 0 ? _item$clone : null;
          });
          that.paramX = this.paramX.clone();
          that.paramY = this.paramY.clone();
          return that;
        }

        [createEval](context) {
          const evaluation = new AnimationBlend2DEval(context, this, this._items, this._items.map(({
            threshold
          }) => threshold), this.algorithm, [0.0, 0.0]);
          const initialValueX = bindOr(context, this.paramX, VariableType.FLOAT, evaluation.setInput, evaluation, 0);
          const initialValueY = bindOr(context, this.paramY, VariableType.FLOAT, evaluation.setInput, evaluation, 1);
          evaluation.setInput(initialValueX, 0);
          evaluation.setInput(initialValueY, 1);
          return evaluation;
        }

      }, _class6.Algorithm = Algorithm, _class6.Item = AnimationBlend2DItem, _temp), (_initializer2 = _applyDecoratedInitializer(_class5.prototype, "algorithm", [serializable], function () {
        return Algorithm.SIMPLE_DIRECTIONAL;
      }), _initializer3 = _applyDecoratedInitializer(_class5.prototype, "_items", [serializable], function () {
        return [];
      }), _initializer4 = _applyDecoratedInitializer(_class5.prototype, "paramX", [serializable], function () {
        return new BindableNumber();
      }), _initializer5 = _applyDecoratedInitializer(_class5.prototype, "paramY", [serializable], function () {
        return new BindableNumber();
      })), _class5)) || _class4));

      AnimationBlend2DEval = class AnimationBlend2DEval extends AnimationBlendEval {
        constructor(context, base, items, thresholds, algorithm, inputs) {
          super(context, base, items, inputs);
          this._thresholds = void 0;
          this._algorithm = void 0;
          this._value = new Vec2();
          this._thresholds = thresholds;
          this._algorithm = algorithm;
          this.doEval();
        }

        eval(weights, [x, y]) {
          Vec2.set(this._value, x, y);
          weights.fill(0);

          switch (this._algorithm) {
            case Algorithm.SIMPLE_DIRECTIONAL:
              blendSimpleDirectional(weights, this._thresholds, this._value);
              break;

            case Algorithm.FREEFORM_CARTESIAN:
              sampleFreeformCartesian(weights, this._thresholds, this._value);
              break;

            case Algorithm.FREEFORM_DIRECTIONAL:
              sampleFreeformDirectional(weights, this._thresholds, this._value);
              break;

            default:
              break;
          }
        }

      };
    }
  };
});