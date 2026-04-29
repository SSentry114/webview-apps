System.register("q-bundled:///fs/cocos/animation/marionette/graph-eval.js", ["../../../../virtual/internal%253Aconstants.js", "./animation-graph.js", "./create-eval.js", "./variable.js", "./parametric.js", "./condition.js", "./motion-state.js", "../../core/index.js", "../../3d/skeletal-animation/skeletal-animation-blending.js", "../../3d/skeletal-animation/limits.js", "./state-machine-component.js"], function (_export, _context) {
  "use strict";

  var DEBUG, isAnimationTransition, SubStateMachine, EmptyState, EmptyStateTransition, TransitionInterruptionSource, createEval, VarInstance, TriggerResetMode, validateVariableExistence, validateVariableType, VariableType, TriggerCondition, MotionState, warnID, assertIsTrue, assertIsNonNullable, LayeredBlendStateBuffer, MAX_ANIMATION_LAYER, StateMachineComponent, _Object$freeze, AnimationGraphEval, LayerEval, emptyClipStatusesIterator, emptyClipStatusesIterable, TransitionMatchCache, transitionMatchCache, InterruptingTransitionMatchCache, interruptingTransitionMatchCache, NodeKind, StateEval, InstantiatedComponents, MotionStateEval, SpecialStateEval, EmptyStateEval, QueuedMotion, TransitionSnapshotEval;

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  /**
   * Gets the motion of current motion state or transition snapshot
   * whose outgoing transitions, called "interruption source", will be inspected to
   * detect the interrupting transition.
   */
  function getInterruptionSourceMotion(state) {
    // If current state is a motion state, then it's the result.
    // Otherwise the current state is a transition snapshot --
    // we support nested interruptions, eg,
    // _A->B_ was interrupted by _B->C_,
    // then _(A->B)->C_ can be interrupted further by _C->D_.
    // In such cases, we need to decide which transition could interrupt _(A->B)->C_.
    // Outgoing transitions from destination motion are always inspected.
    // And as the code following suggested, we order that:
    // outgoing transitions from **the first** motion of "current transition snapshot"
    // are also inspected. No other transitions are considered.
    // This means for instance, in above example,
    // _(A->B)->C_ can and can only be further interrupted by:
    // - _A->D_, since it's outgoing from _A_;
    // - _C->D_, since it's outgoing from _D_.
    // However it can not be interrupted by _B->C_.
    //
    // > Tip: The term "nested interruption" was taken from here:
    // > https://stackoverflow.com/a/24128928
    return state.kind === NodeKind.animation ? state : state.first;
  }

  function createStateStatusCache() {
    return {
      progress: 0.0
    };
  }

  function calcProgressUpdate(currentProgress, duration, deltaTime) {
    if (duration === 0.0) {
      // TODO?
      return 0.0;
    }

    var progress = currentProgress + deltaTime / duration;
    return progress;
  }

  function normalizeProgress(progress) {
    var signedFrac = progress - Math.trunc(progress);
    return signedFrac >= 0.0 ? signedFrac : 1.0 + signedFrac;
  }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      DEBUG = _virtualInternal253AconstantsJs.DEBUG;
    }, function (_animationGraphJs) {
      isAnimationTransition = _animationGraphJs.isAnimationTransition;
      SubStateMachine = _animationGraphJs.SubStateMachine;
      EmptyState = _animationGraphJs.EmptyState;
      EmptyStateTransition = _animationGraphJs.EmptyStateTransition;
      TransitionInterruptionSource = _animationGraphJs.TransitionInterruptionSource;
    }, function (_createEvalJs) {
      createEval = _createEvalJs.createEval;
    }, function (_variableJs) {
      VarInstance = _variableJs.VarInstance;
      TriggerResetMode = _variableJs.TriggerResetMode;
    }, function (_parametricJs) {
      validateVariableExistence = _parametricJs.validateVariableExistence;
      validateVariableType = _parametricJs.validateVariableType;
      VariableType = _parametricJs.VariableType;
    }, function (_conditionJs) {
      TriggerCondition = _conditionJs.TriggerCondition;
    }, function (_motionStateJs) {
      MotionState = _motionStateJs.MotionState;
    }, function (_coreIndexJs) {
      warnID = _coreIndexJs.warnID;
      assertIsTrue = _coreIndexJs.assertIsTrue;
      assertIsNonNullable = _coreIndexJs.assertIsNonNullable;
    }, function (_dSkeletalAnimationSkeletalAnimationBlendingJs) {
      LayeredBlendStateBuffer = _dSkeletalAnimationSkeletalAnimationBlendingJs.LayeredBlendStateBuffer;
    }, function (_dSkeletalAnimationLimitsJs) {
      MAX_ANIMATION_LAYER = _dSkeletalAnimationLimitsJs.MAX_ANIMATION_LAYER;
    }, function (_stateMachineComponentJs) {
      StateMachineComponent = _stateMachineComponentJs.StateMachineComponent;
    }],
    execute: function () {
      _export("AnimationGraphEval", AnimationGraphEval = /*#__PURE__*/function () {
        function AnimationGraphEval(graph, root, controller, clipOverrides) {
          var _this = this;

          this._blendBuffer = new LayeredBlendStateBuffer();
          this._currentTransitionCache = {
            duration: 0.0,
            time: 0.0
          };
          this._varInstances = {};
          this._hasAutoTrigger = false;
          this._root = void 0;

          if (DEBUG) {
            if (graph.layers.length >= MAX_ANIMATION_LAYER) {
              throw new Error("Max layer count exceeds. " + ("Allowed: " + MAX_ANIMATION_LAYER + ", actual: " + graph.layers.length));
            }
          }

          for (var _iterator = _createForOfIteratorHelperLoose(graph.variables), _step; !(_step = _iterator()).done;) {
            var _step$value = _step.value,
                _name = _step$value[0],
                variable = _step$value[1];
            var varInstance = this._varInstances[_name] = new VarInstance(variable.type, variable.value);

            if (variable.type === VariableType.TRIGGER) {
              var resetMode = variable.resetMode;
              varInstance.resetMode = resetMode;

              if (resetMode === TriggerResetMode.NEXT_FRAME_OR_AFTER_CONSUMED) {
                this._hasAutoTrigger = true;
              }
            }
          }

          var context = {
            controller: controller,
            blendBuffer: this._blendBuffer,
            node: root,
            clipOverrides: clipOverrides,
            getVar: function getVar(id) {
              return _this._varInstances[id];
            },
            triggerResetFn: function triggerResetFn(name) {
              _this.setValue(name, false);
            }
          };
          var layerEvaluations = this._layerEvaluations = graph.layers.map(function (layer) {
            var layerEval = new LayerEval(layer, _extends({}, context));
            return layerEval;
          }); // Set layer masks.

          var nLayers = layerEvaluations.length;

          for (var iLayer = 0; iLayer < nLayers; ++iLayer) {
            var mask = graph.layers[iLayer].mask;

            if (mask) {
              var excludeNodes = mask.filterDisabledNodes(context.node);

              this._blendBuffer.setMask(iLayer, excludeNodes);
            }
          }

          this._root = root;
        }

        var _proto = AnimationGraphEval.prototype;

        _proto.update = function update(deltaTime) {
          var blendBuffer = this._blendBuffer,
              layerEvaluations = this._layerEvaluations;
          var nLayers = layerEvaluations.length;

          for (var iLayer = 0; iLayer < nLayers; ++iLayer) {
            var layerEval = layerEvaluations[iLayer];
            layerEval.update(deltaTime);
            blendBuffer.commitLayerChanges(iLayer, layerEval.weight * layerEval.passthroughWeight);
          }

          if (this._hasAutoTrigger) {
            var varInstances = this._varInstances;

            for (var varName in varInstances) {
              var varInstance = varInstances[varName];

              if (varInstance.type === VariableType.TRIGGER && varInstance.resetMode === TriggerResetMode.NEXT_FRAME_OR_AFTER_CONSUMED) {
                varInstance.value = false;
              }
            }
          }

          this._blendBuffer.apply();
        };

        _proto.getVariables = function getVariables() {
          return Object.entries(this._varInstances);
        };

        _proto.getCurrentStateStatus = function getCurrentStateStatus(layer) {
          return this._layerEvaluations[layer].getCurrentStateStatus();
        };

        _proto.getCurrentClipStatuses = function getCurrentClipStatuses(layer) {
          return this._layerEvaluations[layer].getCurrentClipStatuses();
        };

        _proto.getCurrentTransition = function getCurrentTransition(layer) {
          var layers = this._layerEvaluations,
              currentTransition = this._currentTransitionCache;
          var isInTransition = layers[layer].getCurrentTransition(currentTransition);
          return isInTransition ? currentTransition : null;
        };

        _proto.getNextStateStatus = function getNextStateStatus(layer) {
          return this._layerEvaluations[layer].getNextStateStatus();
        };

        _proto.getNextClipStatuses = function getNextClipStatuses(layer) {
          return this._layerEvaluations[layer].getNextClipStatuses();
        };

        _proto.getValue = function getValue(name) {
          var varInstance = this._varInstances[name];

          if (!varInstance) {
            return undefined;
          } else {
            return varInstance.value;
          }
        };

        _proto.setValue = function setValue(name, value) {
          var varInstance = this._varInstances[name];

          if (!varInstance) {
            return;
          }

          varInstance.value = value;
        };

        _proto.getLayerWeight = function getLayerWeight(layerIndex) {
          assertIsTrue(layerIndex >= 0 && layerIndex < this._layerEvaluations.length, "Invalid layer index");
          return this._layerEvaluations[layerIndex].weight;
        };

        _proto.setLayerWeight = function setLayerWeight(layerIndex, weight) {
          assertIsTrue(layerIndex >= 0 && layerIndex < this._layerEvaluations.length, "Invalid layer index");
          this._layerEvaluations[layerIndex].weight = weight;
        };

        _proto.overrideClips = function overrideClips(overrides) {
          var layerEvaluations = this._layerEvaluations;
          var nLayers = layerEvaluations.length;

          for (var iLayer = 0; iLayer < nLayers; ++iLayer) {
            var layerEval = layerEvaluations[iLayer];
            layerEval.overrideClips(overrides, this._root, this._blendBuffer);
          }
        };

        _createClass(AnimationGraphEval, [{
          key: "layerCount",
          get: function get() {
            return this._layerEvaluations.length;
          }
        }]);

        return AnimationGraphEval;
      }());
      /**
       * @zh
       * 描述了如何对动画图中引用的动画剪辑进行替换。
       * @en
       * Describes how to override animation clips in an animation graph.
       */


      LayerEval = /*#__PURE__*/function () {
        function LayerEval(layer, context) {
          var _layer$mask;

          this.passthroughWeight = 1.0;
          this._motionStates = [];
          this._topLevelEntry = void 0;
          this._topLevelExit = void 0;
          this._currentNode = void 0;
          this._currentTransitionToNode = null;
          this._currentTransitionPath = [];
          this._transitionProgress = 0;
          this._fromWeight = 0.0;
          this._toWeight = 0.0;
          this._fromUpdated = false;
          this._toUpdated = false;
          this._transitionSnapshot = new TransitionSnapshotEval();
          this._mask = null;
          this.name = layer.name;
          this._controller = context.controller;
          this.weight = layer.weight;

          var _this$_addStateMachin = this._addStateMachine(layer.stateMachine, null, _extends({
            mask: (_layer$mask = layer.mask) !== null && _layer$mask !== void 0 ? _layer$mask : undefined
          }, context), layer.name),
              entry = _this$_addStateMachin.entry,
              exit = _this$_addStateMachin.exit;

          this._topLevelEntry = entry;
          this._topLevelExit = exit;
          this._currentNode = entry;
          this._resetTrigger = context.triggerResetFn;
          this._mask = layer.mask;
        }
        /**
         * Indicates if this layer's top level graph reached its exit.
         */


        var _proto2 = LayerEval.prototype;

        _proto2.update = function update(deltaTime) {
          if (!this.exited) {
            this._fromWeight = 1.0;
            this._toWeight = 0.0;

            this._eval(deltaTime);

            this._sample();
          }
        };

        _proto2.getCurrentStateStatus = function getCurrentStateStatus() {
          var currentNode = this._currentNode;

          if (currentNode.kind === NodeKind.animation) {
            return currentNode.getFromPortStatus();
          } else if (currentNode.kind === NodeKind.transitionSnapshot) {
            return currentNode.first.getFromPortStatus();
          } else {
            return null;
          }
        };

        _proto2.getCurrentClipStatuses = function getCurrentClipStatuses() {
          var currentNode = this._currentNode;

          if (currentNode.kind === NodeKind.animation) {
            return currentNode.getClipStatuses(this._fromWeight);
          } else if (currentNode.kind === NodeKind.transitionSnapshot) {
            return currentNode.first.getClipStatuses(this._fromWeight);
          } else {
            return emptyClipStatusesIterable;
          }
        };

        _proto2.getCurrentTransition = function getCurrentTransition(transitionStatus) {
          var currentTransitionPath = this._currentTransitionPath;

          if (currentTransitionPath.length !== 0) {
            var lastNode = currentTransitionPath[currentTransitionPath.length - 1];

            if (lastNode.to.kind !== NodeKind.animation && lastNode.to.kind !== NodeKind.empty) {
              return false;
            }

            var _currentTransitionPat = currentTransitionPath[0],
                duration = _currentTransitionPat.duration,
                normalizedDuration = _currentTransitionPat.normalizedDuration;
            var durationInSeconds = transitionStatus.duration = normalizedDuration ? duration * (this._currentNode.kind === NodeKind.animation ? this._currentNode.duration : this._currentNode.kind === NodeKind.transitionSnapshot ? this._currentNode.first.duration : 0.0) : duration;
            transitionStatus.time = this._transitionProgress * durationInSeconds;
            return true;
          } else {
            return false;
          }
        };

        _proto2.getNextStateStatus = function getNextStateStatus() {
          if (!this._currentTransitionToNode || this._currentTransitionToNode.kind === NodeKind.empty) {
            return null;
          }

          return this._currentTransitionToNode.getToPortStatus();
        };

        _proto2.getNextClipStatuses = function getNextClipStatuses() {
          var _to$getClipStatuses;

          var currentTransitionPath = this._currentTransitionPath;
          var nCurrentTransitionPath = currentTransitionPath.length;

          if (nCurrentTransitionPath === 0) {
            return emptyClipStatusesIterable;
          }

          var to = currentTransitionPath[nCurrentTransitionPath - 1].to;

          if (to.kind !== NodeKind.animation) {
            return emptyClipStatusesIterable;
          }

          return (_to$getClipStatuses = to.getClipStatuses(this._toWeight)) !== null && _to$getClipStatuses !== void 0 ? _to$getClipStatuses : emptyClipStatusesIterable;
        };

        _proto2.overrideClips = function overrideClips(overrides, node, blendBuffer) {
          var _this$_mask;

          var motionStates = this._motionStates;
          var overrideClipContext = {
            node: node,
            blendBuffer: blendBuffer,
            mask: (_this$_mask = this._mask) !== null && _this$_mask !== void 0 ? _this$_mask : undefined
          };
          var nMotionStates = motionStates.length;

          for (var iMotionState = 0; iMotionState < nMotionStates; ++iMotionState) {
            var _node = motionStates[iMotionState];

            if (_node.kind === NodeKind.animation) {
              _node.overrideClips(overrides, overrideClipContext);
            }
          }
        };

        _proto2._addStateMachine = function _addStateMachine(graph, parentStateMachineInfo, context, __DEBUG_ID__) {
          var _this2 = this;

          var nodes = Array.from(graph.states());
          var entryEval;
          var anyNode;
          var exitEval;
          var nodeEvaluations = nodes.map(function (node) {
            if (node instanceof MotionState) {
              var motionStateEval = new MotionStateEval(node, context);

              _this2._motionStates.push(motionStateEval);

              return motionStateEval;
            } else if (node === graph.entryState) {
              return entryEval = new SpecialStateEval(node, NodeKind.entry, node.name);
            } else if (node === graph.exitState) {
              return exitEval = new SpecialStateEval(node, NodeKind.exit, node.name);
            } else if (node === graph.anyState) {
              return anyNode = new SpecialStateEval(node, NodeKind.any, node.name);
            } else if (node instanceof EmptyState) {
              return new EmptyStateEval(node);
            } else {
              assertIsTrue(node instanceof SubStateMachine);
              return null;
            }
          });
          assertIsNonNullable(entryEval, 'Entry node is missing');
          assertIsNonNullable(exitEval, 'Exit node is missing');
          assertIsNonNullable(anyNode, 'Any node is missing');
          var stateMachineInfo = {
            components: null,
            parent: parentStateMachineInfo,
            entry: entryEval,
            exit: exitEval,
            any: anyNode
          };

          for (var iNode = 0; iNode < nodes.length; ++iNode) {
            var nodeEval = nodeEvaluations[iNode];

            if (nodeEval) {
              nodeEval.stateMachine = stateMachineInfo;
            }
          }

          var subStateMachineInfos = nodes.map(function (node) {
            if (node instanceof SubStateMachine) {
              var subStateMachineInfo = _this2._addStateMachine(node.stateMachine, stateMachineInfo, context, __DEBUG_ID__ + "/" + node.name);

              subStateMachineInfo.components = new InstantiatedComponents(node);
              return subStateMachineInfo;
            } else {
              return null;
            }
          });

          if (DEBUG) {
            for (var _iterator2 = _createForOfIteratorHelperLoose(nodeEvaluations), _step2; !(_step2 = _iterator2()).done;) {
              var _nodeEval = _step2.value;

              if (_nodeEval) {
                _nodeEval.__DEBUG_ID__ = _nodeEval.name + "(from " + __DEBUG_ID__ + ")";
              }
            }
          }

          for (var _iNode = 0; _iNode < nodes.length; ++_iNode) {
            var node = nodes[_iNode];
            var outgoingTemplates = graph.getOutgoings(node);
            var outgoingTransitions = [];
            var fromNode = void 0;

            if (node instanceof SubStateMachine) {
              var subStateMachineInfo = subStateMachineInfos[_iNode];
              assertIsNonNullable(subStateMachineInfo);
              fromNode = subStateMachineInfo.exit;
            } else {
              var _nodeEval2 = nodeEvaluations[_iNode];
              assertIsNonNullable(_nodeEval2);
              fromNode = _nodeEval2;
            }

            var _loop = function _loop() {
              var outgoing = _step3.value;
              var outgoingNode = outgoing.to;
              var iOutgoingNode = nodes.findIndex(function (nodeTemplate) {
                return nodeTemplate === outgoing.to;
              });

              if (iOutgoingNode < 0) {
                assertIsTrue(false, 'Bad animation data');
              }

              var toNode = void 0;

              if (outgoingNode instanceof SubStateMachine) {
                var _subStateMachineInfo = subStateMachineInfos[iOutgoingNode];
                assertIsNonNullable(_subStateMachineInfo);
                toNode = _subStateMachineInfo.entry;
              } else {
                var _nodeEval3 = nodeEvaluations[iOutgoingNode];
                assertIsNonNullable(_nodeEval3);
                toNode = _nodeEval3;
              }

              var conditions = outgoing.conditions.map(function (condition) {
                return condition[createEval](context);
              });
              var transitionEval = {
                conditions: conditions,
                to: toNode,
                triggers: undefined,
                duration: 0.0,
                normalizedDuration: false,
                destinationStart: 0.0,
                relativeDestinationStart: false,
                exitCondition: 0.0,
                exitConditionEnabled: false,
                interruption: TransitionInterruptionSource.NONE
              };

              if (isAnimationTransition(outgoing)) {
                transitionEval.duration = outgoing.duration;
                transitionEval.normalizedDuration = outgoing.relativeDuration;
                transitionEval.exitConditionEnabled = outgoing.exitConditionEnabled;
                transitionEval.exitCondition = outgoing.exitCondition;
                transitionEval.destinationStart = outgoing.destinationStart;
                transitionEval.relativeDestinationStart = outgoing.relativeDestinationStart;
                transitionEval.interruption = outgoing.interruptionSource;
              } else if (outgoing instanceof EmptyStateTransition) {
                transitionEval.duration = outgoing.duration;
                transitionEval.destinationStart = outgoing.destinationStart;
                transitionEval.relativeDestinationStart = outgoing.relativeDestinationStart;
              }

              transitionEval.conditions.forEach(function (conditionEval, iCondition) {
                var condition = outgoing.conditions[iCondition];

                if (condition instanceof TriggerCondition && condition.trigger) {
                  var _transitionEval$trigg;

                  // TODO: validates the existence of trigger?
                  ((_transitionEval$trigg = transitionEval.triggers) !== null && _transitionEval$trigg !== void 0 ? _transitionEval$trigg : transitionEval.triggers = []).push(condition.trigger);
                }
              });
              outgoingTransitions.push(transitionEval);
            };

            for (var _iterator3 = _createForOfIteratorHelperLoose(outgoingTemplates), _step3; !(_step3 = _iterator3()).done;) {
              _loop();
            }

            fromNode.outgoingTransitions = outgoingTransitions;
          }

          return stateMachineInfo;
        }
        /**
         * Updates this layer, return when the time piece exhausted or the graph reached exit state.
         * @param deltaTime The time piece to update.
         * @returns Remain time piece.
         */
        ;

        _proto2._eval = function _eval(deltaTime) {
          assertIsTrue(!this.exited);

          var haltOnNonMotionState = this._continueDanglingTransition();

          if (haltOnNonMotionState) {
            return 0.0;
          }

          var MAX_ITERATIONS = 100;
          var remainTimePiece = deltaTime;

          for (var continueNextIterationForce = true, // Force next iteration even remain time piece is zero
          iterations = 0; continueNextIterationForce || remainTimePiece > 0.0;) {
            continueNextIterationForce = false;

            if (iterations === MAX_ITERATIONS) {
              warnID(14000, MAX_ITERATIONS);
              break;
            }

            ++iterations; // Update current transition if we're in transition.
            // If currently no transition, we simple fallthrough.

            if (this._currentTransitionPath.length > 0) {
              var _transitionMatch = this._detectInterruption(remainTimePiece, interruptingTransitionMatchCache);

              if (_transitionMatch) {
                remainTimePiece -= _transitionMatch.requires;

                var ranIntoNonMotionState = this._interrupt(_transitionMatch);

                if (ranIntoNonMotionState) {
                  break;
                }

                continueNextIterationForce = true;
                continue;
              }

              var currentUpdatingConsume = this._updateCurrentTransition(remainTimePiece);

              remainTimePiece -= currentUpdatingConsume;

              if (this._currentNode.kind === NodeKind.exit) {
                break;
              }

              if (this._currentTransitionPath.length === 0) {
                // If the update invocation finished the transition,
                // We force restart the iteration
                continueNextIterationForce = true;
              }

              continue;
            }

            var currentNode = this._currentNode;

            var transitionMatch = this._matchCurrentNodeTransition(remainTimePiece);

            if (transitionMatch) {
              var transition = transitionMatch.transition,
                  updateRequires = transitionMatch.requires;
              remainTimePiece -= updateRequires;

              if (currentNode.kind === NodeKind.animation) {
                currentNode.updateFromPort(updateRequires);
                this._fromUpdated = true;
              }

              var _ranIntoNonMotionState = this._switchTo(transition);

              if (_ranIntoNonMotionState) {
                break;
              }

              continueNextIterationForce = true;
            } else {
              // If no transition matched, we update current node.
              if (currentNode.kind === NodeKind.animation) {
                currentNode.updateFromPort(remainTimePiece);
                this._fromUpdated = true; // Animation play eat all times.

                remainTimePiece = 0.0;
              } else {
                // Happened when firstly entered the layer's top level entry
                // and no further transition.
                // I'm sure conscious of it's redundant with above statement, just emphasize.
                remainTimePiece = 0.0;
              }

              continue;
            }
          }

          if (this._fromUpdated && this._currentNode.kind === NodeKind.animation) {
            this._fromUpdated = false;

            this._currentNode.triggerFromPortUpdate(this._controller);
          }

          if (this._currentTransitionToNode && this._toUpdated && this._currentTransitionToNode.kind === NodeKind.animation) {
            this._toUpdated = false;

            this._currentTransitionToNode.triggerToPortUpdate(this._controller);
          }

          return remainTimePiece;
        };

        _proto2._sample = function _sample() {
          var currentNode = this._currentNode,
              currentTransitionToNode = this._currentTransitionToNode,
              fromWeight = this._fromWeight,
              toWeight = this._toWeight;

          if (currentNode.kind === NodeKind.empty) {
            // If current state is empty:
            // - if there is no transition, the passthrough weight is 0.0, means this layer has no effect.
            // - otherwise,
            //   - if the destination is also empty state, it's as if no transition.
            //   - otherwise, asserts the destination to be motion state;
            //     the passthrough weight is set to the transition rate,
            //     the motion state is sampled with full weight.
            this.passthroughWeight = 0.0;

            if (currentTransitionToNode && currentTransitionToNode.kind === NodeKind.animation) {
              this.passthroughWeight = toWeight;
              currentTransitionToNode.sampleToPort(1.0);
            }
          } else if (currentTransitionToNode && currentTransitionToNode.kind === NodeKind.empty) {
            this.passthroughWeight = fromWeight;

            this._sampleSource(1.0);
          } else {
            this.passthroughWeight = 1.0;

            this._sampleSource(fromWeight);

            if (currentTransitionToNode && currentTransitionToNode.kind === NodeKind.animation) {
              currentTransitionToNode.sampleToPort(toWeight);
            }
          }
        };

        _proto2._sampleSource = function _sampleSource(weight) {
          var currentNode = this._currentNode;

          if (currentNode.kind === NodeKind.animation) {
            currentNode.sampleFromPort(weight);
          } else if (currentNode.kind === NodeKind.transitionSnapshot) {
            currentNode.sample(weight);
          }
        }
        /**
         * Searches for a transition which should be performed
         * if current node update for no more than `deltaTime`.
         * @param deltaTime
         * @returns
         */
        ;

        _proto2._matchCurrentNodeTransition = function _matchCurrentNodeTransition(deltaTime) {
          var currentNode = this._currentNode;
          var transitionMatch = transitionMatchCache.reset();

          this._matchTransition(currentNode, currentNode, deltaTime, null, transitionMatch);

          if (transitionMatch.hasZeroCost()) {
            return transitionMatch;
          }

          if (currentNode.kind === NodeKind.animation) {
            this._matchAnyScoped(currentNode, deltaTime, transitionMatch);

            if (transitionMatch.hasZeroCost()) {
              return transitionMatch;
            }
          }

          if (transitionMatch.isValid()) {
            return transitionMatch;
          }

          return null;
        }
        /**
         * Notes the real node is used:
         * - to determinate the starting state machine from where the any states are matched;
         * - so we can solve transitions' relative durations.
         */
        ;

        _proto2._matchAnyScoped = function _matchAnyScoped(realNode, deltaTime, result) {
          var transitionMatchUpdated = false;

          for (var ancestor = realNode.stateMachine; ancestor !== null; ancestor = ancestor.parent) {
            var updated = this._matchTransition(ancestor.any, realNode, deltaTime, null, result);

            if (updated) {
              transitionMatchUpdated = true;
            }

            if (result.hasZeroCost()) {
              break;
            }
          }

          return transitionMatchUpdated;
        }
        /**
         * Searches for a transition which should be performed
         * if specified node updates for no more than `deltaTime` and less than `result.requires`.
         * We solve the relative durations of transitions based on duration of `realNode`.
         * @returns True if a transition match is updated into the `result`.
         */
        ;

        _proto2._matchTransition = function _matchTransition(node, realNode, deltaTime, except, result) {
          assertIsTrue(node === realNode || node.kind === NodeKind.any);
          var outgoingTransitions = node.outgoingTransitions;
          var nTransitions = outgoingTransitions.length;
          var resultUpdated = false;

          for (var iTransition = 0; iTransition < nTransitions; ++iTransition) {
            var transition = outgoingTransitions[iTransition];

            if (transition === except) {
              continue;
            }

            var conditions = transition.conditions;
            var nConditions = conditions.length; // Handle empty condition case.

            if (nConditions === 0) {
              if (node.kind === NodeKind.entry || node.kind === NodeKind.exit) {
                // These kinds of transition is definitely chosen.
                result.set(transition, 0.0);
                resultUpdated = true;
                break;
              }

              if (!transition.exitConditionEnabled) {
                // Invalid transition, ignored.
                continue;
              }
            }

            var deltaTimeRequired = 0.0;

            if (realNode.kind === NodeKind.animation && transition.exitConditionEnabled) {
              var exitTime = realNode.duration * transition.exitCondition;
              deltaTimeRequired = Math.max(exitTime - realNode.fromPortTime, 0.0); // Note: the >= is reasonable in compare to >: we select the first-minimal requires.

              if (deltaTimeRequired > deltaTime || deltaTimeRequired >= result.requires) {
                continue;
              }
            }

            var satisfied = true;

            for (var iCondition = 0; iCondition < nConditions; ++iCondition) {
              var condition = conditions[iCondition];

              if (!condition.eval()) {
                satisfied = false;
                break;
              }
            }

            if (!satisfied) {
              continue;
            }

            if (deltaTimeRequired === 0.0) {
              // Exit condition is disabled or the exit condition is just 0.0.
              result.set(transition, 0.0);
              resultUpdated = true;
              break;
            }

            assertIsTrue(deltaTimeRequired <= result.requires);
            result.set(transition, deltaTimeRequired);
            resultUpdated = true;
          }

          return resultUpdated;
        }
        /**
         * Try switch current node or transition snapshot using specified transition.
         * @param transition The transition.
         * @returns If the transition finally ran into entry/exit state.
         */
        ;

        _proto2._switchTo = function _switchTo(transition) {
          var currentTransitionPath = this._currentTransitionPath;

          this._consumeTransition(transition);

          currentTransitionPath.push(transition);

          var motionNode = this._matchTransitionPathUntilMotion();

          if (motionNode) {
            // Apply transitions
            this._doTransitionToMotion(motionNode);

            return false;
          } else {
            return true;
          }
        }
        /**
         * Called every frame(not every iteration).
         * Returns if we ran into an entry/exit node and still no satisfied transition matched this frame.
         */
        ;

        _proto2._continueDanglingTransition = function _continueDanglingTransition() {
          var currentTransitionPath = this._currentTransitionPath;
          var lenCurrentTransitionPath = currentTransitionPath.length;

          if (lenCurrentTransitionPath === 0) {
            return false;
          }

          var lastTransition = currentTransitionPath[lenCurrentTransitionPath - 1];
          var tailNode = lastTransition.to;

          if (tailNode.kind !== NodeKind.animation && tailNode.kind !== NodeKind.empty) {
            var motionNode = this._matchTransitionPathUntilMotion();

            if (motionNode) {
              // Apply transitions
              this._doTransitionToMotion(motionNode);

              return false;
            } else {
              return true;
            }
          }

          return false;
        };

        _proto2._matchTransitionPathUntilMotion = function _matchTransitionPathUntilMotion() {
          var currentTransitionPath = this._currentTransitionPath;
          var lenCurrentTransitionPath = currentTransitionPath.length;
          assertIsTrue(lenCurrentTransitionPath !== 0);
          var lastTransition = currentTransitionPath[lenCurrentTransitionPath - 1];
          var tailNode = lastTransition.to;

          for (; tailNode.kind !== NodeKind.animation && tailNode.kind !== NodeKind.empty;) {
            var transitionMatch = transitionMatchCache.reset();

            this._matchTransition(tailNode, tailNode, 0.0, null, transitionMatch);

            if (!transitionMatch.transition) {
              break;
            }

            var transition = transitionMatch.transition;

            this._consumeTransition(transition);

            currentTransitionPath.push(transition);
            tailNode = transition.to;
          }

          return tailNode.kind === NodeKind.animation || tailNode.kind === NodeKind.empty ? tailNode : null;
        };

        _proto2._consumeTransition = function _consumeTransition(transition) {
          var to = transition.to;

          if (to.kind === NodeKind.entry) {
            // We're entering a state machine
            this._callEnterMethods(to);
          }
        };

        _proto2._resetTriggersAlongThePath = function _resetTriggersAlongThePath() {
          var currentTransitionPath = this._currentTransitionPath;
          var nTransitions = currentTransitionPath.length;

          for (var iTransition = 0; iTransition < nTransitions; ++iTransition) {
            var transition = currentTransitionPath[iTransition];

            this._resetTriggersOnTransition(transition);
          }
        };

        _proto2._doTransitionToMotion = function _doTransitionToMotion(targetNode) {
          var currentTransitionPath = this._currentTransitionPath;
          assertIsTrue(currentTransitionPath.length !== 0); // Reset triggers

          this._resetTriggersAlongThePath();

          this._transitionProgress = 0.0;
          this._currentTransitionToNode = targetNode;
          this._toUpdated = false;

          if (targetNode.kind === NodeKind.animation) {
            var _currentTransitionPat2 = currentTransitionPath[0],
                destinationStart = _currentTransitionPat2.destinationStart,
                relativeDestinationStart = _currentTransitionPat2.relativeDestinationStart;
            var destinationStartRatio = relativeDestinationStart ? destinationStart : targetNode.duration === 0 ? 0.0 : destinationStart / targetNode.duration;
            targetNode.resetToPort(destinationStartRatio);
          }

          this._callEnterMethods(targetNode);
        }
        /**
         * Update current transition.
         * Asserts: `!!this._currentTransition`.
         * @param deltaTime Time piece.
         * @returns
         */
        ;

        _proto2._updateCurrentTransition = function _updateCurrentTransition(deltaTime) {
          var _toNode$name;

          var currentTransitionPath = this._currentTransitionPath,
              currentTransitionToNode = this._currentTransitionToNode;
          assertIsNonNullable(currentTransitionPath.length > 0);
          assertIsNonNullable(currentTransitionToNode);
          var currentTransition = currentTransitionPath[0];
          var transitionDuration = currentTransition.duration,
              normalizedDuration = currentTransition.normalizedDuration;
          var fromNode = this._currentNode;
          var toNode = currentTransitionToNode;
          var contrib = 0.0;
          var ratio = 0.0;

          if (transitionDuration <= 0) {
            contrib = 0.0;
            ratio = 1.0;
          } else {
            assertIsTrue(fromNode.kind === NodeKind.animation || fromNode.kind === NodeKind.empty || fromNode.kind === NodeKind.transitionSnapshot);
            var transitionProgress = this._transitionProgress;
            var durationSeconds = fromNode.kind === NodeKind.empty ? transitionDuration : normalizedDuration ? transitionDuration * (fromNode.kind === NodeKind.animation ? fromNode.duration : fromNode.first.duration) : transitionDuration;
            var progressSeconds = transitionProgress * durationSeconds;
            var remain = durationSeconds - progressSeconds;
            assertIsTrue(remain >= 0.0);
            contrib = Math.min(remain, deltaTime);
            ratio = this._transitionProgress = (progressSeconds + contrib) / durationSeconds;
            assertIsTrue(ratio >= 0.0 && ratio <= 1.0);
          }

          var toNodeName = (_toNode$name = toNode === null || toNode === void 0 ? void 0 : toNode.name) !== null && _toNode$name !== void 0 ? _toNode$name : '<Empty>';
          this._fromWeight = 1.0 - ratio;
          this._toWeight = ratio;
          var shouldUpdatePorts = contrib !== 0;
          var hasFinished = ratio === 1.0;

          if (fromNode.kind === NodeKind.animation && shouldUpdatePorts) {
            fromNode.updateFromPort(contrib);
            this._fromUpdated = true;
          }

          if (toNode.kind === NodeKind.animation && shouldUpdatePorts) {
            toNode.updateToPort(contrib);
            this._toUpdated = true;
          }

          if (hasFinished) {
            // Transition done.
            this._finishCurrentTransition();
          }

          return contrib;
        };

        _proto2._finishCurrentTransition = function _finishCurrentTransition() {
          var currentTransitionPath = this._currentTransitionPath,
              currentTransitionToNode = this._currentTransitionToNode;
          assertIsNonNullable(currentTransitionPath.length > 0);
          assertIsNonNullable(currentTransitionToNode);
          var fromNode = this._currentNode;
          var toNode = currentTransitionToNode;

          this._callExitMethods(fromNode); // Exiting overrides the updating
          // Processed below.
          // this._fromUpdated = false;


          var transitions = this._currentTransitionPath;
          var nTransition = transitions.length;

          for (var iTransition = 0; iTransition < nTransition; ++iTransition) {
            var to = transitions[iTransition].to;

            if (to.kind === NodeKind.exit) {
              this._callExitMethods(to);
            }
          }

          this._fromUpdated = this._toUpdated;
          this._toUpdated = false;

          this._dropCurrentTransition();

          this._currentNode = toNode;

          if (fromNode.kind === NodeKind.transitionSnapshot) {
            fromNode.clear();
          }
        };

        _proto2._dropCurrentTransition = function _dropCurrentTransition() {
          var currentTransitionToNode = this._currentTransitionToNode;
          assertIsNonNullable(currentTransitionToNode);

          if (currentTransitionToNode.kind === NodeKind.animation) {
            currentTransitionToNode.finishTransition();
          }

          this._currentTransitionToNode = null;
          this._currentTransitionPath.length = 0; // Make sure we won't suffer from precision problem

          this._fromWeight = 1.0;
          this._toWeight = 0.0;
        };

        _proto2._detectInterruption = function _detectInterruption(remainTimePiece, result) {
          var currentTransitionPath = this._currentTransitionPath,
              currentNode = this._currentNode,
              currentTransitionToNode = this._currentTransitionToNode;

          if (currentNode.kind !== NodeKind.animation && currentNode.kind !== NodeKind.transitionSnapshot) {
            return null;
          }

          if (!currentTransitionToNode || currentTransitionToNode.kind !== NodeKind.animation) {
            return null;
          }

          assertIsTrue(currentTransitionPath.length !== 0);
          var currentTransition = currentTransitionPath[0];
          var interruption = currentTransition.interruption;

          if (interruption === TransitionInterruptionSource.NONE) {
            return null;
          }

          var transitionMatch = transitionMatchCache.reset();
          var transitionMatchSource = null; // We have to decide what to be used as unit 1
          // to interpret the relative transition duration.

          var anyTransitionMeasureBaseState = currentNode.kind === NodeKind.animation ? currentNode : currentNode.first;

          var transitionMatchUpdated = this._matchAnyScoped(anyTransitionMeasureBaseState, remainTimePiece, transitionMatch);

          if (transitionMatchUpdated) {
            transitionMatchSource = anyTransitionMeasureBaseState; // TODO: shall be any?
          }

          if (transitionMatch.hasZeroCost()) {// TODO
          }

          var motion0 = interruption === TransitionInterruptionSource.CURRENT_STATE || interruption === TransitionInterruptionSource.CURRENT_STATE_THEN_NEXT_STATE ? getInterruptionSourceMotion(currentNode) : currentTransitionToNode;
          transitionMatchUpdated = this._matchTransition(motion0, motion0, remainTimePiece, currentTransition, transitionMatch);

          if (transitionMatchUpdated) {
            transitionMatchSource = motion0;
          }

          if (transitionMatch.hasZeroCost()) {// TODO
          }

          var motion1 = interruption === TransitionInterruptionSource.NEXT_STATE_THEN_CURRENT_STATE ? getInterruptionSourceMotion(currentNode) : interruption === TransitionInterruptionSource.CURRENT_STATE_THEN_NEXT_STATE ? currentTransitionToNode : null;

          if (motion1) {
            transitionMatchUpdated = this._matchTransition(motion1, motion1, remainTimePiece, currentTransition, transitionMatch);

            if (transitionMatchUpdated) {
              transitionMatchSource = motion1;
            }

            if (transitionMatch.hasZeroCost()) {// TODO
            }
          }

          if (transitionMatchCache.transition) {
            assertIsNonNullable(transitionMatchSource);
            return result.set(transitionMatchSource, transitionMatchCache.transition, transitionMatchCache.requires);
          }

          return null;
        }
        /**
         * Important: `transitionSource` may not be `this._currentNode`.
         */
        ;

        _proto2._interrupt = function _interrupt(_ref) {
          var transitionSource = _ref.from,
              transition = _ref.transition,
              transitionRequires = _ref.requires;
          var currentNode = this._currentNode;
          assertIsTrue(currentNode.kind === NodeKind.animation || currentNode.kind === NodeKind.transitionSnapshot); // If we're interrupting motion->*,
          // we update the motion then do the first enqueue to transition snapshot.

          if (currentNode.kind === NodeKind.animation) {
            currentNode.updateFromPort(transitionRequires);
            this._fromUpdated = true;
            var transitionSnapshot = this._transitionSnapshot;
            assertIsTrue(transitionSnapshot.empty);
            transitionSnapshot.enqueue(currentNode, 1.0);
          }

          this._takeCurrentTransitionSnapshot(transitionSource);

          this._dropCurrentTransition(); // Install the snapshot as "current"


          this._currentNode = this._transitionSnapshot;

          var ranIntoNonMotionState = this._switchTo(transition);

          return ranIntoNonMotionState;
        }
        /**
         * A thing to note is `transitionSource` may not be `this._currentNode`.
         */
        ;

        _proto2._takeCurrentTransitionSnapshot = function _takeCurrentTransitionSnapshot(transitionSource) {
          var currentTransitionPath = this._currentTransitionPath,
              currentTransitionToNode = this._currentTransitionToNode,
              transitionSnapshot = this._transitionSnapshot;
          assertIsTrue(currentTransitionPath.length !== 0);
          assertIsTrue(currentTransitionToNode && currentTransitionToNode.kind === NodeKind.animation);
          var currentTransition = currentTransitionPath[0];
          var transitionDuration = currentTransition.duration,
              normalizedDuration = currentTransition.normalizedDuration;
          var fromNode = transitionSource;
          var ratio = 0.0;

          if (transitionDuration <= 0) {
            ratio = 1.0;
          } else {
            var transitionProgress = this._transitionProgress;
            var durationSeconds = normalizedDuration ? transitionDuration * fromNode.duration : transitionDuration;
            var progressSeconds = transitionProgress * durationSeconds;
            var remain = durationSeconds - progressSeconds;
            assertIsTrue(remain >= 0.0);
            ratio = progressSeconds / durationSeconds;
            assertIsTrue(ratio >= 0.0 && ratio <= 1.0);
          }

          transitionSnapshot.enqueue(currentTransitionToNode, ratio);
        };

        _proto2._resetTriggersOnTransition = function _resetTriggersOnTransition(transition) {
          var triggers = transition.triggers;

          if (triggers) {
            var nTriggers = triggers.length;

            for (var iTrigger = 0; iTrigger < nTriggers; ++iTrigger) {
              var trigger = triggers[iTrigger];

              this._resetTrigger(trigger);
            }
          }
        };

        _proto2._resetTrigger = function _resetTrigger(name) {
          var triggerResetFn = this._triggerReset;
          triggerResetFn(name);
        };

        _proto2._callEnterMethods = function _callEnterMethods(node) {
          var _node$stateMachine$co;

          var controller = this._controller;

          switch (node.kind) {
            default:
              break;

            case NodeKind.animation:
              {
                node.components.callMotionStateEnterMethods(controller, node.getToPortStatus());
                break;
              }

            case NodeKind.entry:
              (_node$stateMachine$co = node.stateMachine.components) === null || _node$stateMachine$co === void 0 ? void 0 : _node$stateMachine$co.callStateMachineEnterMethods(controller);
              break;
          }
        };

        _proto2._callExitMethods = function _callExitMethods(node) {
          var _node$stateMachine$co2;

          var controller = this._controller;

          switch (node.kind) {
            default:
              break;

            case NodeKind.animation:
              {
                node.components.callMotionStateExitMethods(controller, node.getFromPortStatus());
                break;
              }

            case NodeKind.exit:
              (_node$stateMachine$co2 = node.stateMachine.components) === null || _node$stateMachine$co2 === void 0 ? void 0 : _node$stateMachine$co2.callStateMachineExitMethods(controller);
              break;
          }
        };

        _createClass(LayerEval, [{
          key: "exited",
          get: function get() {
            return this._currentNode === this._topLevelExit;
          }
        }]);

        return LayerEval;
      }();

      emptyClipStatusesIterator = Object.freeze({
        next: function next() {
          return {
            done: true,
            value: undefined
          };
        }
      });
      emptyClipStatusesIterable = Object.freeze((_Object$freeze = {}, _Object$freeze[Symbol.iterator] = function () {
        return emptyClipStatusesIterator;
      }, _Object$freeze));

      TransitionMatchCache = /*#__PURE__*/function () {
        function TransitionMatchCache() {
          this.transition = null;
          this.requires = Infinity;
        }

        var _proto3 = TransitionMatchCache.prototype;

        _proto3.hasZeroCost = function hasZeroCost() {
          return this.requires === 0;
        };

        _proto3.isValid = function isValid() {
          return this.transition !== null;
        };

        _proto3.set = function set(transition, requires) {
          this.transition = transition;
          this.requires = requires;
          return this;
        };

        _proto3.reset = function reset() {
          this.requires = Infinity;
          this.transition = null;
          return this;
        };

        return TransitionMatchCache;
      }();

      transitionMatchCache = new TransitionMatchCache();

      InterruptingTransitionMatchCache = /*#__PURE__*/function () {
        function InterruptingTransitionMatchCache() {
          this.transition = null;
          this.requires = 0.0;
          this.from = null;
        }

        var _proto4 = InterruptingTransitionMatchCache.prototype;

        _proto4.set = function set(from, transition, requires) {
          this.from = from;
          this.transition = transition;
          this.requires = requires;
          return this;
        };

        return InterruptingTransitionMatchCache;
      }();

      interruptingTransitionMatchCache = new InterruptingTransitionMatchCache();

      (function (NodeKind) {
        NodeKind[NodeKind["entry"] = 0] = "entry";
        NodeKind[NodeKind["exit"] = 1] = "exit";
        NodeKind[NodeKind["any"] = 2] = "any";
        NodeKind[NodeKind["animation"] = 3] = "animation";
        NodeKind[NodeKind["empty"] = 4] = "empty";
        NodeKind[NodeKind["transitionSnapshot"] = 5] = "transitionSnapshot";
      })(NodeKind || (NodeKind = {}));

      _export("StateEval", StateEval =
      /**
       * @internal
       */
      function StateEval(node) {
        this.name = void 0;
        this.outgoingTransitions = [];
        this.name = node.name;
      });

      InstantiatedComponents = /*#__PURE__*/function () {
        function InstantiatedComponents(node) {
          this._components = node.instantiateComponents();
        }

        var _proto5 = InstantiatedComponents.prototype;

        _proto5.callMotionStateEnterMethods = function callMotionStateEnterMethods(controller, status) {
          this._callMotionStateCallbackIfNonDefault('onMotionStateEnter', controller, status);
        };

        _proto5.callMotionStateUpdateMethods = function callMotionStateUpdateMethods(controller, status) {
          this._callMotionStateCallbackIfNonDefault('onMotionStateUpdate', controller, status);
        };

        _proto5.callMotionStateExitMethods = function callMotionStateExitMethods(controller, status) {
          this._callMotionStateCallbackIfNonDefault('onMotionStateExit', controller, status);
        };

        _proto5.callStateMachineEnterMethods = function callStateMachineEnterMethods(controller) {
          this._callStateMachineCallbackIfNonDefault('onStateMachineEnter', controller);
        };

        _proto5.callStateMachineExitMethods = function callStateMachineExitMethods(controller) {
          this._callStateMachineCallbackIfNonDefault('onStateMachineExit', controller);
        };

        _proto5._callMotionStateCallbackIfNonDefault = function _callMotionStateCallbackIfNonDefault(methodName, controller, status) {
          var components = this._components;
          var nComponents = components.length;

          for (var iComponent = 0; iComponent < nComponents; ++iComponent) {
            var component = components[iComponent];

            if (component[methodName] !== StateMachineComponent.prototype[methodName]) {
              component[methodName](controller, status);
            }
          }
        };

        _proto5._callStateMachineCallbackIfNonDefault = function _callStateMachineCallbackIfNonDefault(methodName, controller) {
          var components = this._components;
          var nComponents = components.length;

          for (var iComponent = 0; iComponent < nComponents; ++iComponent) {
            var component = components[iComponent];

            if (component[methodName] !== StateMachineComponent.prototype[methodName]) {
              component[methodName](controller);
            }
          }
        };

        return InstantiatedComponents;
      }();

      _export("MotionStateEval", MotionStateEval = /*#__PURE__*/function (_StateEval) {
        _inheritsLoose(MotionStateEval, _StateEval);

        function MotionStateEval(node, context) {
          var _node$motion$createEv, _node$motion;

          var _this3;

          _this3 = _StateEval.call(this, node) || this;
          _this3.kind = NodeKind.animation;
          _this3._source = null;
          _this3._baseSpeed = 1.0;
          _this3._speed = 1.0;
          _this3._fromPort = {
            progress: 0.0,
            statusCache: createStateStatusCache()
          };
          _this3._toPort = {
            progress: 0.0,
            statusCache: createStateStatusCache()
          };
          _this3._baseSpeed = node.speed;

          _this3._setSpeedMultiplier(1.0);

          if (node.speedMultiplierEnabled && node.speedMultiplier) {
            var speedMultiplierVarName = node.speedMultiplier;
            var varInstance = context.getVar(speedMultiplierVarName);

            if (validateVariableExistence(varInstance, speedMultiplierVarName)) {
              validateVariableType(varInstance.type, VariableType.FLOAT, speedMultiplierVarName);
              varInstance.bind(_this3._setSpeedMultiplier, _assertThisInitialized(_this3));
              var initialSpeedMultiplier = varInstance.value;

              _this3._setSpeedMultiplier(initialSpeedMultiplier);
            }
          }

          var sourceEvalContext = _extends({}, context);

          var sourceEval = (_node$motion$createEv = (_node$motion = node.motion) === null || _node$motion === void 0 ? void 0 : _node$motion[createEval](sourceEvalContext)) !== null && _node$motion$createEv !== void 0 ? _node$motion$createEv : null;

          if (sourceEval) {
            Object.defineProperty(sourceEval, '__DEBUG_ID__', {
              value: _this3.name
            });
          }

          _this3._source = sourceEval;
          _this3.components = new InstantiatedComponents(node);
          return _this3;
        }

        var _proto6 = MotionStateEval.prototype;

        _proto6.updateFromPort = function updateFromPort(deltaTime) {
          this._fromPort.progress = calcProgressUpdate(this._fromPort.progress, this.duration, deltaTime * this._speed);
        };

        _proto6.updateToPort = function updateToPort(deltaTime) {
          if (DEBUG) {
            // See `this.finishTransition()`
            assertIsTrue(!Number.isNaN(this._toPort.progress));
          }

          this._toPort.progress = calcProgressUpdate(this._toPort.progress, this.duration, deltaTime * this._speed);
        };

        _proto6.triggerFromPortUpdate = function triggerFromPortUpdate(controller) {
          this.components.callMotionStateUpdateMethods(controller, this.getFromPortStatus());
        };

        _proto6.triggerToPortUpdate = function triggerToPortUpdate(controller) {
          this.components.callMotionStateUpdateMethods(controller, this.getToPortStatus());
        };

        _proto6.getFromPortStatus = function getFromPortStatus() {
          var stateStatus = this._fromPort.statusCache;

          if (DEBUG) {
            stateStatus.__DEBUG_ID__ = this.name;
          }

          stateStatus.progress = normalizeProgress(this._fromPort.progress);
          return stateStatus;
        };

        _proto6.getToPortStatus = function getToPortStatus() {
          if (DEBUG) {
            // See `this.finishTransition()`
            assertIsTrue(!Number.isNaN(this._toPort.progress));
          }

          var stateStatus = this._toPort.statusCache;

          if (DEBUG) {
            stateStatus.__DEBUG_ID__ = this.name;
          }

          stateStatus.progress = normalizeProgress(this._toPort.progress);
          return stateStatus;
        };

        _proto6.resetToPort = function resetToPort(at) {
          this._toPort.progress = at;
        };

        _proto6.finishTransition = function finishTransition() {
          this._fromPort.progress = this._toPort.progress;

          if (DEBUG) {
            // Well, this statement exists for debugging purpose.
            // Once the transition was finished, this method is called to
            // switch this motion from "target" to "source".
            // After, this motion can no longer be used as "target"
            // unless `this.resetToPort()` is called.
            // Let's set progress of this motion's "to port" to NaN,
            // to catch such a violation.
            this._toPort.progress = Number.NaN;
          }
        };

        _proto6.sampleFromPort = function sampleFromPort(weight) {
          var _this$_source;

          (_this$_source = this._source) === null || _this$_source === void 0 ? void 0 : _this$_source.sample(this._fromPort.progress, weight);
        };

        _proto6.sampleToPort = function sampleToPort(weight) {
          var _this$_source2;

          if (DEBUG) {
            // See `this.finishTransition()`
            assertIsTrue(!Number.isNaN(this._toPort.progress));
          }

          (_this$_source2 = this._source) === null || _this$_source2 === void 0 ? void 0 : _this$_source2.sample(this._toPort.progress, weight);
        };

        _proto6.getClipStatuses = function getClipStatuses(baseWeight) {
          var source = this._source;

          if (!source) {
            return emptyClipStatusesIterable;
          } else {
            var _ref2;

            return _ref2 = {}, _ref2[Symbol.iterator] = function () {
              return source.getClipStatuses(baseWeight);
            }, _ref2;
          }
        };

        _proto6.overrideClips = function overrideClips(overrides, context) {
          var _this$_source3;

          (_this$_source3 = this._source) === null || _this$_source3 === void 0 ? void 0 : _this$_source3.overrideClips(overrides, context);
        };

        _proto6._setSpeedMultiplier = function _setSpeedMultiplier(value) {
          this._speed = this._baseSpeed * value;
        };

        _createClass(MotionStateEval, [{
          key: "duration",
          get: function get() {
            var _this$_source$duratio, _this$_source4;

            return (_this$_source$duratio = (_this$_source4 = this._source) === null || _this$_source4 === void 0 ? void 0 : _this$_source4.duration) !== null && _this$_source$duratio !== void 0 ? _this$_source$duratio : 0.0;
          }
        }, {
          key: "fromPortTime",
          get: function get() {
            return this._fromPort.progress * this.duration;
          }
        }]);

        return MotionStateEval;
      }(StateEval));

      _export("SpecialStateEval", SpecialStateEval = /*#__PURE__*/function (_StateEval2) {
        _inheritsLoose(SpecialStateEval, _StateEval2);

        function SpecialStateEval(node, kind, name) {
          var _this4;

          _this4 = _StateEval2.call(this, node) || this;
          _this4.kind = void 0;
          _this4.kind = kind;
          return _this4;
        }

        return SpecialStateEval;
      }(StateEval));

      _export("EmptyStateEval", EmptyStateEval = /*#__PURE__*/function (_StateEval3) {
        _inheritsLoose(EmptyStateEval, _StateEval3);

        function EmptyStateEval(node) {
          var _this5;

          _this5 = _StateEval3.call(this, node) || this;
          _this5.kind = NodeKind.empty;
          return _this5;
        }

        return EmptyStateEval;
      }(StateEval));

      QueuedMotion = function QueuedMotion(motion, weight) {
        this.motion = motion;
        this.weight = weight;
      };

      TransitionSnapshotEval = /*#__PURE__*/function (_StateEval4) {
        _inheritsLoose(TransitionSnapshotEval, _StateEval4);

        function TransitionSnapshotEval() {
          var _this6;

          _this6 = _StateEval4.call(this, {
            name: "[[TransitionSnapshotEval]]"
          }) || this;
          _this6.kind = NodeKind.transitionSnapshot;
          _this6._queue = [];
          return _this6;
        }

        var _proto7 = TransitionSnapshotEval.prototype;

        _proto7.sample = function sample(weight) {
          var queue = this._queue;
          var nQueue = queue.length;

          for (var iQueuedMotions = 0; iQueuedMotions < nQueue; ++iQueuedMotions) {
            var _queue$iQueuedMotions = queue[iQueuedMotions],
                _motion = _queue$iQueuedMotions.motion,
                snapshotWeight = _queue$iQueuedMotions.weight; // Here implies: motions added to snapshot should have been switched from "target" to "source".

            _motion.sampleFromPort(snapshotWeight * weight);
          }
        };

        _proto7.clear = function clear() {
          this._queue.length = 0;
        };

        _proto7.enqueue = function enqueue(state, weight) {
          var queue = this._queue;
          var nQueue = queue.length;
          var complementWeight = 1.0 - weight;

          for (var iQueuedMotions = 0; iQueuedMotions < nQueue; ++iQueuedMotions) {
            queue[iQueuedMotions].weight *= complementWeight;
          }

          queue.push(new QueuedMotion(state, weight));
        };

        _createClass(TransitionSnapshotEval, [{
          key: "empty",
          get: function get() {
            return this._queue.length === 0;
          }
        }, {
          key: "first",
          get: function get() {
            var queue = this._queue;
            assertIsTrue(queue.length > 0);
            return queue[0].motion;
          }
        }]);

        return TransitionSnapshotEval;
      }(StateEval);
    }
  };
});