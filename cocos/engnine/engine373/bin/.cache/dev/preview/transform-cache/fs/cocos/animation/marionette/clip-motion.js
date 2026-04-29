System.register("q-bundled:///fs/cocos/animation/marionette/clip-motion.js", ["../../core/index.js", "../animation-clip.js", "../animation-state.js", "./animation-graph-editor-extras-clone-helper.js", "./create-eval.js", "./graph-debug.js"], function (_export, _context) {
  "use strict";

  var editorExtrasTag, _decorator, EditorExtendable, AnimationClip, AnimationState, cloneAnimationGraphEditorExtrasFrom, createEval, getMotionRuntimeID, RUNTIME_ID_ENABLED, _dec, _dec2, _class, _class2, _initializer, ccclass, type, ClipMotion, ClipMotionEval;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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
      ccclass = _decorator.ccclass;
      type = _decorator.type;

      _export("ClipMotion", ClipMotion = (_dec = ccclass('cc.animation.ClipMotion'), _dec2 = type(AnimationClip), _dec(_class = (_class2 = /*#__PURE__*/function (_EditorExtendable) {
        _inheritsLoose(ClipMotion, _EditorExtendable);

        function ClipMotion() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _EditorExtendable.call.apply(_EditorExtendable, [this].concat(args)) || this;
          _this.clip = _initializer && _initializer();
          return _this;
        }

        var _proto = ClipMotion.prototype;

        _proto[createEval] = function (context) {
          if (!this.clip) {
            return null;
          }

          var clipMotionEval = new ClipMotionEval(context, this.clip);

          if (RUNTIME_ID_ENABLED) {
            clipMotionEval.runtimeId = getMotionRuntimeID(this);
          }

          return clipMotionEval;
        };

        _proto.clone = function clone() {
          var that = new ClipMotion();
          that.clip = this.clip;
          that[editorExtrasTag] = cloneAnimationGraphEditorExtrasFrom(this);
          return that;
        };

        return ClipMotion;
      }(EditorExtendable), (_initializer = _applyDecoratedInitializer(_class2.prototype, "clip", [_dec2], function () {
        return null;
      })), _class2)) || _class));

      ClipMotionEval = /*#__PURE__*/function () {
        /**
         * @internal
         */
        function ClipMotionEval(context, clip) {
          var _context$clipOverride, _context$clipOverride2;

          var overriding = (_context$clipOverride = (_context$clipOverride2 = context.clipOverrides) === null || _context$clipOverride2 === void 0 ? void 0 : _context$clipOverride2.get(clip)) !== null && _context$clipOverride !== void 0 ? _context$clipOverride : clip;
          this._duration = overriding.duration / overriding.speed;
          this._state = this._createState(overriding, context);
          this._originalClip = clip;
        }

        var _proto2 = ClipMotionEval.prototype;

        _proto2.getClipStatuses = function getClipStatuses(baseWeight) {
          var _this2 = this;

          var got = false;
          return {
            next: function next() {
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
                    __DEBUG_ID__: _this2.__DEBUG__ID__,
                    clip: _this2._state.clip,
                    weight: baseWeight
                  }
                };
              }
            }
          };
        };

        _proto2.sample = function sample(progress, weight) {
          if (weight === 0.0) {
            return;
          }

          var time = this._state.duration * progress;
          this._state.time = time;
          this._state.weight = weight;

          this._state.sample();

          this._state.weight = 0.0;
        };

        _proto2.overrideClips = function overrideClips(overrides, context) {
          var originalClip = this._originalClip;
          var overriding = overrides.get(originalClip);

          if (overriding) {
            this._state.destroy();

            this._state = this._createState(overriding, context);
            this._duration = overriding.duration / overriding.speed;
          }
        }
        /**
         * Preserved here for clip overriding.
         */
        ;

        _proto2._createState = function _createState(clip, context) {
          var state = new AnimationState(clip);
          state.initialize(context.node, context.blendBuffer, context.mask);
          return state;
        };

        _createClass(ClipMotionEval, [{
          key: "duration",
          get: function get() {
            return this._duration;
          }
        }, {
          key: "progress",
          get: function get() {
            return this._state.time / this.duration;
          }
        }]);

        return ClipMotionEval;
      }();
    }
  };
});