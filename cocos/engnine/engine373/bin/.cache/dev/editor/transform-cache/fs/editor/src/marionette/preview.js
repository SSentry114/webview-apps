System.register("q-bundled:///fs/editor/src/marionette/preview.js", ["../../../cocos/3d/skeletal-animation/skeletal-animation-blending.js", "../../../cocos/animation/marionette/create-eval.js", "../../../cocos/animation/marionette/variable.js", "../../../cocos/core/data/utils/asserts.js", "../../../cocos/animation/marionette/animation-blend.js"], function (_export, _context) {
  "use strict";

  var LegacyBlendStateBuffer, createEval, VarInstance, assertIsNonNullable, AnimationBlendEval, AnimationGraphPartialPreviewer, MotionPreviewer, TransitionPreviewer;

  _export({
    MotionPreviewer: void 0,
    TransitionPreviewer: void 0
  });

  return {
    setters: [function (_cocos3dSkeletalAnimationSkeletalAnimationBlendingJs) {
      LegacyBlendStateBuffer = _cocos3dSkeletalAnimationSkeletalAnimationBlendingJs.LegacyBlendStateBuffer;
    }, function (_cocosAnimationMarionetteCreateEvalJs) {
      createEval = _cocosAnimationMarionetteCreateEvalJs.createEval;
    }, function (_cocosAnimationMarionetteVariableJs) {
      VarInstance = _cocosAnimationMarionetteVariableJs.VarInstance;
    }, function (_cocosCoreDataUtilsAssertsJs) {
      assertIsNonNullable = _cocosCoreDataUtilsAssertsJs.assertIsNonNullable;
    }, function (_cocosAnimationMarionetteAnimationBlendJs) {
      AnimationBlendEval = _cocosAnimationMarionetteAnimationBlendJs.AnimationBlendEval;
    }],
    execute: function () {
      AnimationGraphPartialPreviewer = class AnimationGraphPartialPreviewer {
        constructor(root) {
          this._root = void 0;
          this._blendBuffer = new LegacyBlendStateBuffer();
          this._varInstances = {};
          this._root = root;
        }

        destroy() {}

        evaluate() {
          this._blendBuffer.apply();
        }

        addVariable(id, type, value) {
          const {
            _varInstances: varInstances
          } = this;

          if (id in varInstances) {
            return;
          }

          varInstances[id] = new VarInstance(type, value);
        }

        removeVariable(id) {
          delete this._varInstances[id];
        }

        updateVariable(id, value) {
          const varInstance = this._varInstances[id];

          if (!varInstance) {
            return;
          }

          varInstance.value = value;
        }

        createMotionEval(motion) {
          const {
            _root: root,
            _blendBuffer: blendBuffer
          } = this;
          const bindContext = {
            getVar: this._getVar.bind(this)
          };
          const motionEval = motion[createEval]({
            node: root,
            blendBuffer,
            getVar: (...args) => {
              return bindContext.getVar(...args);
            },
            clipOverrides: null
          });
          return motionEval;
        }

        _getVar(id) {
          return this._varInstances[id];
        }

      };

      _export("MotionPreviewer", MotionPreviewer = class MotionPreviewer extends AnimationGraphPartialPreviewer {
        constructor(...args) {
          super(...args);
          this._time = 0.0;
          this._motionEval = null;
          this._timelineStatsDirty = true;
          this._timelineStats = {
            timeLineLength: 0.0
          };
        }

        get timelineStats() {
          if (this._timelineStatsDirty) {
            this._updateTimelineStats();

            this._timelineStatsDirty = false;
          }

          return this._timelineStats;
        }
        /**
         * Gets an iterable to the weights of each motion(that has runtime ID).
         */


        queryWeights() {
          const getWeightsRecursive = function* (motionEval, weight) {
            if (typeof motionEval.runtimeId !== 'undefined') {
              yield [motionEval.runtimeId, weight];
            }

            if (motionEval instanceof AnimationBlendEval) {
              const nChild = motionEval.childCount;

              for (let iChild = 0; iChild < nChild; ++iChild) {
                const childMotionEval = motionEval.getChildMotionEval(iChild);
                const childWeight = motionEval.getChildWeight(iChild);

                if (childMotionEval) {
                  for (const child of getWeightsRecursive(childMotionEval, childWeight)) {
                    yield child;
                  }
                }
              }
            }

            return;
          };

          if (this._motionEval) {
            return getWeightsRecursive(this._motionEval, 1.0);
          }

          return [];
        }

        setMotion(motion) {
          this._motionEval = super.createMotionEval(motion);
          this._timelineStatsDirty = true;
        }

        setTime(time) {
          this._time = time;
        }

        updateVariable(id, value) {
          super.updateVariable(id, value);
          this._timelineStatsDirty = true;
        }

        evaluate() {
          const {
            _motionEval: motionEval
          } = this;

          if (!motionEval) {
            return;
          }

          motionEval.sample(this._time / motionEval.duration, 1.0);
          super.evaluate();
        }

        _updateTimelineStats() {
          var _this$_motionEval$dur, _this$_motionEval;

          this._timelineStats.timeLineLength = (_this$_motionEval$dur = (_this$_motionEval = this._motionEval) === null || _this$_motionEval === void 0 ? void 0 : _this$_motionEval.duration) !== null && _this$_motionEval$dur !== void 0 ? _this$_motionEval$dur : 0.0;
        }

      });

      _export("TransitionPreviewer", TransitionPreviewer = class TransitionPreviewer extends AnimationGraphPartialPreviewer {
        constructor(root) {
          super(root);
          this._time = 0.0;
          this._transitionDuration = 0.0;
          this._relativeDuration = false;
          this._exitConditionEnabled = false;
          this._exitCondition = 0.0;
          this._destinationStart = 0.0;
          this._relativeDestinationStart = false;
          this._source = null;
          this._target = null;
          this._timelineStatsDirty = true;
          this._timeLineStats = {
            timeLineLength: 0.0,
            sourceMotionStart: 0.0,
            sourceMotionRepeatCount: 0.0,
            sourceMotionDuration: 0.0,
            targetMotionStart: 0.0,
            targetMotionRepeatCount: 0.0,
            targetMotionDuration: 0.0,
            exitTimesStart: 0.0,
            exitTimesLength: 0.0,
            transitionDurationStart: 0.0,
            transitionDurationLength: 0.0
          };
        }

        destroy() {}

        get timelineStats() {
          if (this._timelineStatsDirty) {
            this._updateTimelineStats();

            this._timelineStatsDirty = false;
          }

          return this._timeLineStats;
        }

        setSourceMotion(motion) {
          this._source = super.createMotionEval(motion);
          this._timelineStatsDirty = true;
        }

        setTargetMotion(motion) {
          this._target = super.createMotionEval(motion);
          this._timelineStatsDirty = true;
        }

        setTransitionDuration(value) {
          this._transitionDuration = value;
          this._timelineStatsDirty = true;
        }

        setRelativeTransitionDuration(value) {
          this._relativeDuration = value;
          this._timelineStatsDirty = true;
        }

        calculateTransitionDurationFromTimelineLength(value) {
          assertIsNonNullable(this._source);
          return this._relativeDuration ? value / this._source.duration : value;
        }

        setExitTimes(value) {
          this._exitCondition = value;
          this._timelineStatsDirty = true;
        }

        setExitTimeEnabled(value) {
          this._exitConditionEnabled = value;
          this._timelineStatsDirty = true;
        }

        setDestinationStart(value) {
          this._destinationStart = value;
          this._timelineStatsDirty = true;
        }

        setRelativeDestinationStart(value) {
          this._relativeDestinationStart = value;
          this._timelineStatsDirty = true;
        }

        calculateExitTimesFromTimelineLength(value) {
          assertIsNonNullable(this._source);
          return value / this._source.duration;
        }

        updateVariable(id, value) {
          super.updateVariable(id, value);
          this._timelineStatsDirty = true;
        }
        /**
         * 
         * @param time Player time, in seconds.
         */


        setTime(time) {
          this._time = time;
        }

        evaluate() {
          const {
            _source: source,
            _target: target,
            _time: time,
            _exitCondition: exitCondition,
            _exitConditionEnabled: exitConditionEnabled,
            _transitionDuration: transitionDuration,
            _relativeDuration: relativeDuration,
            _destinationStart: destinationStart,
            _relativeDestinationStart: relativeDestinationStart
          } = this;

          if (!source || !target) {
            return;
          }

          const sourceDuration = source.duration;
          const targetDuration = target.duration;
          const exitTimeAbsolute = exitConditionEnabled ? sourceDuration * exitCondition : 0.0;
          const transitionDurationAbsolute = relativeDuration ? sourceDuration * transitionDuration : transitionDuration;
          const destinationStartAbsolute = relativeDestinationStart ? destinationStart * targetDuration : destinationStart;

          if (time < exitTimeAbsolute) {
            source.sample(time / sourceDuration, 1.0);
          } else {
            const transitionTime = time - exitTimeAbsolute;

            if (transitionTime > transitionDurationAbsolute) {
              target.sample((destinationStartAbsolute + transitionTime) / targetDuration, 1.0);
            } else {
              const transitionRatio = transitionTime / transitionDurationAbsolute;
              const sourceWeight = 1.0 - transitionRatio;
              const targetWeight = transitionRatio;
              source.sample(time / sourceDuration, sourceWeight);
              target.sample(transitionTime / targetDuration, targetWeight);
            }
          }

          super.evaluate();
        }

        _updateTimelineStats() {
          const {
            _source: source,
            _target: target,
            _exitCondition: exitCondition,
            _exitConditionEnabled: exitConditionEnabled,
            _transitionDuration: transitionDuration,
            _relativeDuration: relativeDuration,
            _destinationStart: destinationStart,
            _relativeDestinationStart: relativeDestinationStart
          } = this;
          assertIsNonNullable(source);
          assertIsNonNullable(target);
          const sourceMotionDuration = source.duration;
          const exitTimeRelative = exitConditionEnabled ? exitCondition : 0.0;
          const exitTimeAbsolute = sourceMotionDuration * exitTimeRelative;
          const transitionDurationAbsolute = relativeDuration ? sourceMotionDuration * transitionDuration : transitionDuration;
          const sourceMotionStart = 0.0;
          const sourceMotionLiveTime = exitTimeAbsolute + transitionDurationAbsolute;
          const sourceMotionRepeatCount = sourceMotionLiveTime / sourceMotionDuration;
          const targetMotionDuration = target.duration;
          const destinationStartAbsolute = relativeDestinationStart ? targetMotionDuration * destinationStart : destinationStart;
          const targetMotionStart = exitTimeAbsolute - destinationStartAbsolute;
          const targetMotionLiveTime = Math.max(transitionDurationAbsolute, targetMotionDuration);
          const targetMotionRepeatCount = targetMotionLiveTime / targetMotionDuration;
          const timeLineLength = exitTimeAbsolute + targetMotionLiveTime;
          const {
            _timeLineStats: timeLineStats
          } = this;
          timeLineStats.timeLineLength = timeLineLength;
          timeLineStats.sourceMotionStart = sourceMotionStart;
          timeLineStats.sourceMotionRepeatCount = sourceMotionRepeatCount;
          timeLineStats.sourceMotionDuration = sourceMotionDuration;
          timeLineStats.targetMotionStart = targetMotionStart;
          timeLineStats.targetMotionRepeatCount = targetMotionRepeatCount;
          timeLineStats.targetMotionDuration = targetMotionDuration;
          timeLineStats.exitTimesStart = 0.0;
          timeLineStats.exitTimesLength = exitTimeAbsolute;
          timeLineStats.transitionDurationStart = exitTimeAbsolute;
          timeLineStats.transitionDurationLength = transitionDurationAbsolute;
        }

      });
    }
  };
});