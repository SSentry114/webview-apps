System.register("q-bundled:///fs/cocos/animation/marionette/animation-blend.js", ["../../core/index.js", "./create-eval.js", "./errors.js", "../define.js", "./graph-debug.js", "./animation-graph-editor-extras-clone-helper.js"], function (_export, _context2) {
  "use strict";

  var _decorator, EditorExtendable, editorExtrasTag, createEval, VariableTypeMismatchedError, CLASS_NAME_PREFIX_ANIM, getMotionRuntimeID, RUNTIME_ID_ENABLED, cloneAnimationGraphEditorExtrasFrom, AnimationBlendEval, _dec, _class, _class2, _initializer, _dec2, _class4, _class5, _initializer2, ccclass, serializable, AnimationBlendItem, AnimationBlend;

  function _applyDecoratedInitializer(target, property, decorators, initializer) {
    return decorators.slice().reverse().reduce(function (decoratedInitializer, decorator) {
      return decorator(target, property, decoratedInitializer) || decoratedInitializer;
    }, initializer);
  }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function validateBlendParam(val, name) {
    if (typeof val !== 'number') {
      // TODO var name?
      throw new VariableTypeMismatchedError(name, 'number');
    }
  }

  _export({
    AnimationBlendEval: void 0,
    validateBlendParam: validateBlendParam
  });

  return {
    setters: [function (_coreIndexJs) {
      _decorator = _coreIndexJs._decorator;
      EditorExtendable = _coreIndexJs.EditorExtendable;
      editorExtrasTag = _coreIndexJs.editorExtrasTag;
    }, function (_createEvalJs) {
      createEval = _createEvalJs.createEval;
    }, function (_errorsJs) {
      VariableTypeMismatchedError = _errorsJs.VariableTypeMismatchedError;
    }, function (_defineJs) {
      CLASS_NAME_PREFIX_ANIM = _defineJs.CLASS_NAME_PREFIX_ANIM;
    }, function (_graphDebugJs) {
      getMotionRuntimeID = _graphDebugJs.getMotionRuntimeID;
      RUNTIME_ID_ENABLED = _graphDebugJs.RUNTIME_ID_ENABLED;
    }, function (_animationGraphEditorExtrasCloneHelperJs) {
      cloneAnimationGraphEditorExtrasFrom = _animationGraphEditorExtrasCloneHelperJs.cloneAnimationGraphEditorExtrasFrom;
    }],
    execute: function () {
      ({
        ccclass,
        serializable
      } = _decorator);

      _export("AnimationBlendItem", AnimationBlendItem = (_dec = ccclass(`${CLASS_NAME_PREFIX_ANIM}AnimationBlendItem`), _dec(_class = (_class2 = class AnimationBlendItem {
        constructor() {
          this.motion = _initializer && _initializer();
        }

        clone() {
          const that = new AnimationBlendItem();

          this._copyTo(that);

          return that;
        }

        _copyTo(that) {
          var _this$motion$clone, _this$motion;

          that.motion = (_this$motion$clone = (_this$motion = this.motion) === null || _this$motion === void 0 ? void 0 : _this$motion.clone()) !== null && _this$motion$clone !== void 0 ? _this$motion$clone : null;
          return that;
        }

      }, (_initializer = _applyDecoratedInitializer(_class2.prototype, "motion", [serializable], function () {
        return null;
      })), _class2)) || _class));

      _export("AnimationBlend", AnimationBlend = (_dec2 = ccclass(`${CLASS_NAME_PREFIX_ANIM}AnimationBlend`), _dec2(_class4 = (_class5 = class AnimationBlend extends EditorExtendable {
        constructor(...args) {
          super(...args);
          this.name = _initializer2 && _initializer2();
        }

        copyTo(that) {
          that.name = this.name;
          that[editorExtrasTag] = cloneAnimationGraphEditorExtrasFrom(this);
        }

      }, (_initializer2 = _applyDecoratedInitializer(_class5.prototype, "name", [serializable], function () {
        return '';
      })), _class5)) || _class4));

      _export("AnimationBlendEval", AnimationBlendEval = class AnimationBlendEval {
        constructor(context, base, children, inputs) {
          this._childEvaluators = children.map(child => {
            var _child$motion$createE, _child$motion;

            return (_child$motion$createE = (_child$motion = child.motion) === null || _child$motion === void 0 ? void 0 : _child$motion[createEval](context)) !== null && _child$motion$createE !== void 0 ? _child$motion$createE : null;
          });
          this._weights = new Array(this._childEvaluators.length).fill(0);
          this._inputs = [...inputs];

          if (RUNTIME_ID_ENABLED) {
            this.runtimeId = getMotionRuntimeID(base);
          }
        }

        get childCount() {
          return this._weights.length;
        }

        getChildWeight(childIndex) {
          return this._weights[childIndex];
        }

        getChildMotionEval(childIndex) {
          return this._childEvaluators[childIndex];
        }

        get duration() {
          let uniformDuration = 0.0;

          for (let iChild = 0; iChild < this._childEvaluators.length; ++iChild) {
            var _this$_childEvaluator, _this$_childEvaluator2;

            uniformDuration += ((_this$_childEvaluator = (_this$_childEvaluator2 = this._childEvaluators[iChild]) === null || _this$_childEvaluator2 === void 0 ? void 0 : _this$_childEvaluator2.duration) !== null && _this$_childEvaluator !== void 0 ? _this$_childEvaluator : 0.0) * this._weights[iChild];
          }

          return uniformDuration;
        }

        getClipStatuses(baseWeight) {
          const {
            _childEvaluators: children,
            _weights: weights
          } = this;
          const nChildren = children.length;
          let iChild = 0;
          let currentChildIterator;
          return {
            next() {
              // eslint-disable-next-line no-constant-condition
              while (true) {
                if (currentChildIterator) {
                  const result = currentChildIterator.next();

                  if (!result.done) {
                    return result;
                  }
                }

                if (iChild >= nChildren) {
                  return {
                    done: true,
                    value: undefined
                  };
                } else {
                  const child = children[iChild];
                  currentChildIterator = child === null || child === void 0 ? void 0 : child.getClipStatuses(baseWeight * weights[iChild]);
                  ++iChild;
                }
              }
            }

          };
        }

        sample(progress, weight) {
          for (let iChild = 0; iChild < this._childEvaluators.length; ++iChild) {
            var _this$_childEvaluator3;

            (_this$_childEvaluator3 = this._childEvaluators[iChild]) === null || _this$_childEvaluator3 === void 0 ? void 0 : _this$_childEvaluator3.sample(progress, weight * this._weights[iChild]);
          }
        }

        overrideClips(overrides, context) {
          for (let iChild = 0; iChild < this._childEvaluators.length; ++iChild) {
            var _this$_childEvaluator4;

            (_this$_childEvaluator4 = this._childEvaluators[iChild]) === null || _this$_childEvaluator4 === void 0 ? void 0 : _this$_childEvaluator4.overrideClips(overrides, context);
          }
        }

        setInput(value, index) {
          this._inputs[index] = value;
          this.doEval();
        }

        doEval() {
          this.eval(this._weights, this._inputs);
        }

        eval(_weights, _inputs) {}

      });
    }
  };
});