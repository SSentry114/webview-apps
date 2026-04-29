System.register("q-bundled:///fs/editor/src/marionette/preview.js", ["../../../cocos/3d/skeletal-animation/skeletal-animation-blending.js", "../../../cocos/animation/marionette/create-eval.js", "../../../cocos/animation/marionette/variable.js", "../../../cocos/core/data/utils/asserts.js", "../../../cocos/animation/marionette/animation-blend.js"], function (_export, _context) {
  "use strict";

  var LegacyBlendStateBuffer, createEval, VarInstance, assertIsNonNullable, AnimationBlendEval, AnimationGraphPartialPreviewer, MotionPreviewer, TransitionPreviewer;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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
      AnimationGraphPartialPreviewer = /*#__PURE__*/function () {
        function AnimationGraphPartialPreviewer(root) {
          this._root = void 0;
          this._blendBuffer = new LegacyBlendStateBuffer();
          this._varInstances = {};
          this._root = root;
        }

        var _proto = AnimationGraphPartialPreviewer.prototype;

        _proto.destroy = function destroy() {};

        _proto.evaluate = function evaluate() {
          this._blendBuffer.apply();
        };

        _proto.addVariable = function addVariable(id, type, value) {
          var varInstances = this._varInstances;

          if (id in varInstances) {
            return;
          }

          varInstances[id] = new VarInstance(type, value);
        };

        _proto.removeVariable = function removeVariable(id) {
          delete this._varInstances[id];
        };

        _proto.updateVariable = function updateVariable(id, value) {
          var varInstance = this._varInstances[id];

          if (!varInstance) {
            return;
          }

          varInstance.value = value;
        };

        _proto.createMotionEval = function createMotionEval(motion) {
          var root = this._root,
              blendBuffer = this._blendBuffer;
          var bindContext = {
            getVar: this._getVar.bind(this)
          };
          var motionEval = motion[createEval]({
            node: root,
            blendBuffer: blendBuffer,
            getVar: function getVar() {
              return bindContext.getVar.apply(bindContext, arguments);
            },
            clipOverrides: null
          });
          return motionEval;
        };

        _proto._getVar = function _getVar(id) {
          return this._varInstances[id];
        };

        return AnimationGraphPartialPreviewer;
      }();

      _export("MotionPreviewer", MotionPreviewer = /*#__PURE__*/function (_AnimationGraphPartia) {
        _inheritsLoose(MotionPreviewer, _AnimationGraphPartia);

        function MotionPreviewer() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _AnimationGraphPartia.call.apply(_AnimationGraphPartia, [this].concat(args)) || this;
          _this._time = 0.0;
          _this._motionEval = null;
          _this._timelineStatsDirty = true;
          _this._timelineStats = {
            timeLineLength: 0.0
          };
          return _this;
        }

        var _proto2 = MotionPreviewer.prototype;

        /**
         * Gets an iterable to the weights of each motion(that has runtime ID).
         */
        _proto2.queryWeights = function queryWeights() {
          var getWeightsRecursive = /*#__PURE__*/regeneratorRuntime.mark(function getWeightsRecursive(motionEval, weight) {
            var nChild, iChild, childMotionEval, childWeight, _iterator, _step, child;

            return regeneratorRuntime.wrap(function getWeightsRecursive$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (!(typeof motionEval.runtimeId !== 'undefined')) {
                      _context2.next = 3;
                      break;
                    }

                    _context2.next = 3;
                    return [motionEval.runtimeId, weight];

                  case 3:
                    if (!(motionEval instanceof AnimationBlendEval)) {
                      _context2.next = 20;
                      break;
                    }

                    nChild = motionEval.childCount;
                    iChild = 0;

                  case 6:
                    if (!(iChild < nChild)) {
                      _context2.next = 20;
                      break;
                    }

                    childMotionEval = motionEval.getChildMotionEval(iChild);
                    childWeight = motionEval.getChildWeight(iChild);

                    if (!childMotionEval) {
                      _context2.next = 17;
                      break;
                    }

                    _iterator = _createForOfIteratorHelperLoose(getWeightsRecursive(childMotionEval, childWeight));

                  case 11:
                    if ((_step = _iterator()).done) {
                      _context2.next = 17;
                      break;
                    }

                    child = _step.value;
                    _context2.next = 15;
                    return child;

                  case 15:
                    _context2.next = 11;
                    break;

                  case 17:
                    ++iChild;
                    _context2.next = 6;
                    break;

                  case 20:
                    return _context2.abrupt("return");

                  case 21:
                  case "end":
                    return _context2.stop();
                }
              }
            }, getWeightsRecursive);
          });

          if (this._motionEval) {
            return getWeightsRecursive(this._motionEval, 1.0);
          }

          return [];
        };

        _proto2.setMotion = function setMotion(motion) {
          this._motionEval = _AnimationGraphPartia.prototype.createMotionEval.call(this, motion);
          this._timelineStatsDirty = true;
        };

        _proto2.setTime = function setTime(time) {
          this._time = time;
        };

        _proto2.updateVariable = function updateVariable(id, value) {
          _AnimationGraphPartia.prototype.updateVariable.call(this, id, value);

          this._timelineStatsDirty = true;
        };

        _proto2.evaluate = function evaluate() {
          var motionEval = this._motionEval;

          if (!motionEval) {
            return;
          }

          motionEval.sample(this._time / motionEval.duration, 1.0);

          _AnimationGraphPartia.prototype.evaluate.call(this);
        };

        _proto2._updateTimelineStats = function _updateTimelineStats() {
          var _this$_motionEval$dur, _this$_motionEval;

          this._timelineStats.timeLineLength = (_this$_motionEval$dur = (_this$_motionEval = this._motionEval) === null || _this$_motionEval === void 0 ? void 0 : _this$_motionEval.duration) !== null && _this$_motionEval$dur !== void 0 ? _this$_motionEval$dur : 0.0;
        };

        _createClass(MotionPreviewer, [{
          key: "timelineStats",
          get: function get() {
            if (this._timelineStatsDirty) {
              this._updateTimelineStats();

              this._timelineStatsDirty = false;
            }

            return this._timelineStats;
          }
        }]);

        return MotionPreviewer;
      }(AnimationGraphPartialPreviewer));

      _export("TransitionPreviewer", TransitionPreviewer = /*#__PURE__*/function (_AnimationGraphPartia2) {
        _inheritsLoose(TransitionPreviewer, _AnimationGraphPartia2);

        function TransitionPreviewer(root) {
          var _this2;

          _this2 = _AnimationGraphPartia2.call(this, root) || this;
          _this2._time = 0.0;
          _this2._transitionDuration = 0.0;
          _this2._relativeDuration = false;
          _this2._exitConditionEnabled = false;
          _this2._exitCondition = 0.0;
          _this2._destinationStart = 0.0;
          _this2._relativeDestinationStart = false;
          _this2._source = null;
          _this2._target = null;
          _this2._timelineStatsDirty = true;
          _this2._timeLineStats = {
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
          return _this2;
        }

        var _proto3 = TransitionPreviewer.prototype;

        _proto3.destroy = function destroy() {};

        _proto3.setSourceMotion = function setSourceMotion(motion) {
          this._source = _AnimationGraphPartia2.prototype.createMotionEval.call(this, motion);
          this._timelineStatsDirty = true;
        };

        _proto3.setTargetMotion = function setTargetMotion(motion) {
          this._target = _AnimationGraphPartia2.prototype.createMotionEval.call(this, motion);
          this._timelineStatsDirty = true;
        };

        _proto3.setTransitionDuration = function setTransitionDuration(value) {
          this._transitionDuration = value;
          this._timelineStatsDirty = true;
        };

        _proto3.setRelativeTransitionDuration = function setRelativeTransitionDuration(value) {
          this._relativeDuration = value;
          this._timelineStatsDirty = true;
        };

        _proto3.calculateTransitionDurationFromTimelineLength = function calculateTransitionDurationFromTimelineLength(value) {
          assertIsNonNullable(this._source);
          return this._relativeDuration ? value / this._source.duration : value;
        };

        _proto3.setExitTimes = function setExitTimes(value) {
          this._exitCondition = value;
          this._timelineStatsDirty = true;
        };

        _proto3.setExitTimeEnabled = function setExitTimeEnabled(value) {
          this._exitConditionEnabled = value;
          this._timelineStatsDirty = true;
        };

        _proto3.setDestinationStart = function setDestinationStart(value) {
          this._destinationStart = value;
          this._timelineStatsDirty = true;
        };

        _proto3.setRelativeDestinationStart = function setRelativeDestinationStart(value) {
          this._relativeDestinationStart = value;
          this._timelineStatsDirty = true;
        };

        _proto3.calculateExitTimesFromTimelineLength = function calculateExitTimesFromTimelineLength(value) {
          assertIsNonNullable(this._source);
          return value / this._source.duration;
        };

        _proto3.updateVariable = function updateVariable(id, value) {
          _AnimationGraphPartia2.prototype.updateVariable.call(this, id, value);

          this._timelineStatsDirty = true;
        }
        /**
         * 
         * @param time Player time, in seconds.
         */
        ;

        _proto3.setTime = function setTime(time) {
          this._time = time;
        };

        _proto3.evaluate = function evaluate() {
          var source = this._source,
              target = this._target,
              time = this._time,
              exitCondition = this._exitCondition,
              exitConditionEnabled = this._exitConditionEnabled,
              transitionDuration = this._transitionDuration,
              relativeDuration = this._relativeDuration,
              destinationStart = this._destinationStart,
              relativeDestinationStart = this._relativeDestinationStart;

          if (!source || !target) {
            return;
          }

          var sourceDuration = source.duration;
          var targetDuration = target.duration;
          var exitTimeAbsolute = exitConditionEnabled ? sourceDuration * exitCondition : 0.0;
          var transitionDurationAbsolute = relativeDuration ? sourceDuration * transitionDuration : transitionDuration;
          var destinationStartAbsolute = relativeDestinationStart ? destinationStart * targetDuration : destinationStart;

          if (time < exitTimeAbsolute) {
            source.sample(time / sourceDuration, 1.0);
          } else {
            var transitionTime = time - exitTimeAbsolute;

            if (transitionTime > transitionDurationAbsolute) {
              target.sample((destinationStartAbsolute + transitionTime) / targetDuration, 1.0);
            } else {
              var transitionRatio = transitionTime / transitionDurationAbsolute;
              var sourceWeight = 1.0 - transitionRatio;
              var targetWeight = transitionRatio;
              source.sample(time / sourceDuration, sourceWeight);
              target.sample(transitionTime / targetDuration, targetWeight);
            }
          }

          _AnimationGraphPartia2.prototype.evaluate.call(this);
        };

        _proto3._updateTimelineStats = function _updateTimelineStats() {
          var source = this._source,
              target = this._target,
              exitCondition = this._exitCondition,
              exitConditionEnabled = this._exitConditionEnabled,
              transitionDuration = this._transitionDuration,
              relativeDuration = this._relativeDuration,
              destinationStart = this._destinationStart,
              relativeDestinationStart = this._relativeDestinationStart;
          assertIsNonNullable(source);
          assertIsNonNullable(target);
          var sourceMotionDuration = source.duration;
          var exitTimeRelative = exitConditionEnabled ? exitCondition : 0.0;
          var exitTimeAbsolute = sourceMotionDuration * exitTimeRelative;
          var transitionDurationAbsolute = relativeDuration ? sourceMotionDuration * transitionDuration : transitionDuration;
          var sourceMotionStart = 0.0;
          var sourceMotionLiveTime = exitTimeAbsolute + transitionDurationAbsolute;
          var sourceMotionRepeatCount = sourceMotionLiveTime / sourceMotionDuration;
          var targetMotionDuration = target.duration;
          var destinationStartAbsolute = relativeDestinationStart ? targetMotionDuration * destinationStart : destinationStart;
          var targetMotionStart = exitTimeAbsolute - destinationStartAbsolute;
          var targetMotionLiveTime = Math.max(transitionDurationAbsolute, targetMotionDuration);
          var targetMotionRepeatCount = targetMotionLiveTime / targetMotionDuration;
          var timeLineLength = exitTimeAbsolute + targetMotionLiveTime;
          var timeLineStats = this._timeLineStats;
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
        };

        _createClass(TransitionPreviewer, [{
          key: "timelineStats",
          get: function get() {
            if (this._timelineStatsDirty) {
              this._updateTimelineStats();

              this._timelineStatsDirty = false;
            }

            return this._timeLineStats;
          }
        }]);

        return TransitionPreviewer;
      }(AnimationGraphPartialPreviewer));
    }
  };
});