System.register("q-bundled:///fs/cocos/animation/marionette/clip-motion.js", ["../../core/index.js", "../animation-clip.js", "../animation-state.js", "./animation-graph-editor-extras-clone-helper.js", "./create-eval.js", "./graph-debug.js"], function (_export, _context) {
  "use strict";

  var editorExtrasTag, _decorator, EditorExtendable, AnimationClip, AnimationState, cloneAnimationGraphEditorExtrasFrom, createEval, getMotionRuntimeID, RUNTIME_ID_ENABLED, ClipMotionEval, _dec, _dec2, _class, _class2, _initializer, ccclass, type, ClipMotion;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedInitializer(target, property, decorators, initializer) {
    return decorators.slice().reverse().reduce(function (decoratedInitializer, decorator) {
      return decorator(target, property, decoratedInitializer) || decoratedInitializer;
    }, initializer);
  }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_coreIndexJs) {
      editorExtrasTag = _coreIndexJs.editorExtrasTag;
      _decorator = _coreIndexJs._decorator;
      EditorExtendable = _coreIndexJs.EditorExtendable;
    }, function (_animationClipJs) {
      AnimationClip = _animationClipJs.AnimationClip;
    }, function (_animationStateJs) {
      AnimationState = _animationStateJs.AnimationState;
    }, function (_animationGraphEditorExtrasCloneHelperJs) {
      cloneAnimationGraphEditorExtrasFrom = _animationGraphEditorExtrasCloneHelperJs.cloneAnimationGraphEditorExtrasFrom;
    }, function (_createEvalJs) {
      createEval = _createEvalJs.createEval;
    }, function (_graphDebugJs) {
      getMotionRuntimeID = _graphDebugJs.getMotionRuntimeID;
      RUNTIME_ID_ENABLED = _graphDebugJs.RUNTIME_ID_ENABLED;
    }],
    execute: function () {
      ({
        ccclass,
        type
      } = _decorator);

      _export("ClipMotion", ClipMotion = (_dec = ccclass('cc.animation.ClipMotion'), _dec2 = type(AnimationClip), _dec(_class = (_class2 = class ClipMotion extends EditorExtendable {
        constructor(...args) {
          super(...args);
          this.clip = _initializer && _initializer();
        }

        [createEval](context) {
          if (!this.clip) {
            return null;
          }

          const clipMotionEval = new ClipMotionEval(context, this.clip);

          if (RUNTIME_ID_ENABLED) {
            clipMotionEval.runtimeId = getMotionRuntimeID(this);
          }

          return clipMotionEval;
        }

        clone() {
          const that = new ClipMotion();
          that.clip = this.clip;
          that[editorExtrasTag] = cloneAnimationGraphEditorExtrasFrom(this);
          return that;
        }

      }, (_initializer = _applyDecoratedInitializer(_class2.prototype, "clip", [_dec2], function () {
        return null;
      })), _class2)) || _class));

      ClipMotionEval = class ClipMotionEval {
        /**
         * @internal
         */
        constructor(context, clip) {
          var _context$clipOverride, _context$clipOverride2;

          const overriding = (_context$clipOverride = (_context$clipOverride2 = context.clipOverrides) === null || _context$clipOverride2 === void 0 ? void 0 : _context$clipOverride2.get(clip)) !== null && _context$clipOverride !== void 0 ? _context$clipOverride : clip;
          this._duration = overriding.duration / overriding.speed;
          this._state = this._createState(overriding, context);
          this._originalClip = clip;
        }

        getClipStatuses(baseWeight) {
          let got = false;
          return {
            next: () => {
              if (got) {
                return {
                  done: true,
                  value: undefined
                };
              } else {
                got = true;
                return {
                  done: false,
                  value: {
                    __DEBUG_ID__: this.__DEBUG__ID__,
                    clip: this._state.clip,
                    weight: baseWeight
                  }
                };
              }
            }
          };
        }

        get duration() {
          return this._duration;
        }

        get progress() {
          return this._state.time / this.duration;
        }

        sample(progress, weight) {
          if (weight === 0.0) {
            return;
          }

          const time = this._state.duration * progress;
          this._state.time = time;
          this._state.weight = weight;

          this._state.sample();

          this._state.weight = 0.0;
        }

        overrideClips(overrides, context) {
          const {
            _originalClip: originalClip
          } = this;
          const overriding = overrides.get(originalClip);

          if (overriding) {
            this._state.destroy();

            this._state = this._createState(overriding, context);
            this._duration = overriding.duration / overriding.speed;
          }
        }
        /**
         * Preserved here for clip overriding.
         */


        _createState(clip, context) {
          const state = new AnimationState(clip);
          state.initialize(context.node, context.blendBuffer, context.mask);
          return state;
        }

      };
    }
  };
});