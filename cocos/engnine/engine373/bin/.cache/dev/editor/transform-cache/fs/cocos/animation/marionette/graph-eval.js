System.register("q-bundled:///fs/cocos/animation/marionette/graph-eval.js", ["../../../../virtual/internal%253Aconstants.js", "./animation-graph.js", "./create-eval.js", "./variable.js", "./parametric.js", "./condition.js", "./motion-state.js", "../../core/index.js", "../../3d/skeletal-animation/skeletal-animation-blending.js", "../../3d/skeletal-animation/limits.js", "./state-machine-component.js"], function (_export, _context) {
  "use strict";

  var DEBUG, isAnimationTransition, SubStateMachine, EmptyState, EmptyStateTransition, TransitionInterruptionSource, createEval, VarInstance, TriggerResetMode, validateVariableExistence, validateVariableType, VariableType, TriggerCondition, MotionState, warnID, assertIsTrue, assertIsNonNullable, LayeredBlendStateBuffer, MAX_ANIMATION_LAYER, StateMachineComponent, AnimationGraphEval, LayerEval, TransitionMatchCache, InterruptingTransitionMatchCache, StateEval, InstantiatedComponents, MotionStateEval, SpecialStateEval, EmptyStateEval, QueuedMotion, TransitionSnapshotEval, emptyClipStatusesIterator, emptyClipStatusesIterable, transitionMatchCache, interruptingTransitionMatchCache, NodeKind;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

    const progress = currentProgress + deltaTime / duration;
    return progress;
  }

  function normalizeProgress(progress) {
    const signedFrac = progress - Math.trunc(progress);
    return signedFrac >= 0.0 ? signedFrac : 1.0 + signedFrac;
  }

  _export({
    AnimationGraphEval: void 0,
    StateEval: void 0,
    MotionStateEval: void 0,
    SpecialStateEval: void 0,
    EmptyStateEval: void 0
  });

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
      _export("AnimationGraphEval", AnimationGraphEval = class AnimationGraphEval {
        constructor(graph, root, controller, clipOverrides) {
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
              throw new Error(`Max layer count exceeds. ` + `Allowed: ${MAX_ANIMATION_LAYER}, actual: ${graph.layers.length}`);
            }
          }

          for (const [name, variable] of graph.variables) {
            const varInstance = this._varInstances[name] = new VarInstance(variable.type, variable.value);

            if (variable.type === VariableType.TRIGGER) {
              const {
                resetMode
              } = variable;
              varInstance.resetMode = resetMode;

              if (resetMode === TriggerResetMode.NEXT_FRAME_OR_AFTER_CONSUMED) {
                this._hasAutoTrigger = true;
              }
            }
          }

          const context = {
            controller,
            blendBuffer: this._blendBuffer,
            node: root,
            clipOverrides,
            getVar: id => this._varInstances[id],
            triggerResetFn: name => {
              this.setValue(name, false);
            }
          };
          const layerEvaluations = this._layerEvaluations = graph.layers.map(layer => {
            const layerEval = new LayerEval(layer, { ...context
            });
            return layerEval;
          }); // Set layer masks.

          const nLayers = layerEvaluations.length;

          for (let iLayer = 0; iLayer < nLayers; ++iLayer) {
            const mask = graph.layers[iLayer].mask;

            if (mask) {
              const excludeNodes = mask.filterDisabledNodes(context.node);

              this._blendBuffer.setMask(iLayer, excludeNodes);
            }
          }

          this._root = root;
        }

        get layerCount() {
          return this._layerEvaluations.length;
        }

        update(deltaTime) {
          const {
            _blendBuffer: blendBuffer,
            _layerEvaluations: layerEvaluations
          } = this;
          const nLayers = layerEvaluations.length;

          for (let iLayer = 0; iLayer < nLayers; ++iLayer) {
            const layerEval = layerEvaluations[iLayer];
            layerEval.update(deltaTime);
            blendBuffer.commitLayerChanges(iLayer, layerEval.weight * layerEval.passthroughWeight);
          }

          if (this._hasAutoTrigger) {
            const {
              _varInstances: varInstances
            } = this;

            for (const varName in varInstances) {
              const varInstance = varInstances[varName];

              if (varInstance.type === VariableType.TRIGGER && varInstance.resetMode === TriggerResetMode.NEXT_FRAME_OR_AFTER_CONSUMED) {
                varInstance.value = false;
              }
            }
          }

          this._blendBuffer.apply();
        }

        getVariables() {
          return Object.entries(this._varInstances);
        }

        getCurrentStateStatus(layer) {
          return this._layerEvaluations[layer].getCurrentStateStatus();
        }

        getCurrentClipStatuses(layer) {
          return this._layerEvaluations[layer].getCurrentClipStatuses();
        }

        getCurrentTransition(layer) {
          const {
            _layerEvaluations: layers,
            _currentTransitionCache: currentTransition
          } = this;
          const isInTransition = layers[layer].getCurrentTransition(currentTransition);
          return isInTransition ? currentTransition : null;
        }

        getNextStateStatus(layer) {
          return this._layerEvaluations[layer].getNextStateStatus();
        }

        getNextClipStatuses(layer) {
          return this._layerEvaluations[layer].getNextClipStatuses();
        }

        getValue(name) {
          const varInstance = this._varInstances[name];

          if (!varInstance) {
            return undefined;
          } else {
            return varInstance.value;
          }
        }

        setValue(name, value) {
          const varInstance = this._varInstances[name];

          if (!varInstance) {
            return;
          }

          varInstance.value = value;
        }

        getLayerWeight(layerIndex) {
          assertIsTrue(layerIndex >= 0 && layerIndex < this._layerEvaluations.length, `Invalid layer index`);
          return this._layerEvaluations[layerIndex].weight;
        }

        setLayerWeight(layerIndex, weight) {
          assertIsTrue(layerIndex >= 0 && layerIndex < this._layerEvaluations.length, `Invalid layer index`);
          this._layerEvaluations[layerIndex].weight = weight;
        }

        overrideClips(overrides) {
          const {
            _layerEvaluations: layerEvaluations
          } = this;
          const nLayers = layerEvaluations.length;

          for (let iLayer = 0; iLayer < nLayers; ++iLayer) {
            const layerEval = layerEvaluations[iLayer];
            layerEval.overrideClips(overrides, this._root, this._blendBuffer);
          }
        }

      });
      /**
       * @zh
       * 描述了如何对动画图中引用的动画剪辑进行替换。
       * @en
       * Describes how to override animation clips in an animation graph.
       */


      LayerEval = class LayerEval {
        constructor(layer, context) {
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

          const {
            entry,
            exit
          } = this._addStateMachine(layer.stateMachine, null, {
            mask: (_layer$mask = layer.mask) !== null && _layer$mask !== void 0 ? _layer$mask : undefined,
            ...context
          }, layer.name);

          this._topLevelEntry = entry;
          this._topLevelExit = exit;
          this._currentNode = entry;
          this._resetTrigger = context.triggerResetFn;
          this._mask = layer.mask;
        }
        /**
         * Indicates if this layer's top level graph reached its exit.
         */


        get exited() {
          return this._currentNode === this._topLevelExit;
        }

        update(deltaTime) {
          if (!this.exited) {
            this._fromWeight = 1.0;
            this._toWeight = 0.0;

            this._eval(deltaTime);

            this._sample();
          }
        }

        getCurrentStateStatus() {
          const {
            _currentNode: currentNode
          } = this;

          if (currentNode.kind === NodeKind.animation) {
            return currentNode.getFromPortStatus();
          } else if (currentNode.kind === NodeKind.transitionSnapshot) {
            return currentNode.first.getFromPortStatus();
          } else {
            return null;
          }
        }

        getCurrentClipStatuses() {
          const {
            _currentNode: currentNode
          } = this;

          if (currentNode.kind === NodeKind.animation) {
            return currentNode.getClipStatuses(this._fromWeight);
          } else if (currentNode.kind === NodeKind.transitionSnapshot) {
            return currentNode.first.getClipStatuses(this._fromWeight);
          } else {
            return emptyClipStatusesIterable;
          }
        }

        getCurrentTransition(transitionStatus) {
          const {
            _currentTransitionPath: currentTransitionPath
          } = this;

          if (currentTransitionPath.length !== 0) {
            const lastNode = currentTransitionPath[currentTransitionPath.length - 1];

            if (lastNode.to.kind !== NodeKind.animation && lastNode.to.kind !== NodeKind.empty) {
              return false;
            }

            const {
              duration,
              normalizedDuration
            } = currentTransitionPath[0];
            const durationInSeconds = transitionStatus.duration = normalizedDuration ? duration * (this._currentNode.kind === NodeKind.animation ? this._currentNode.duration : this._currentNode.kind === NodeKind.transitionSnapshot ? this._currentNode.first.duration : 0.0) : duration;
            transitionStatus.time = this._transitionProgress * durationInSeconds;
            return true;
          } else {
            return false;
          }
        }

        getNextStateStatus() {
          if (!this._currentTransitionToNode || this._currentTransitionToNode.kind === NodeKind.empty) {
            return null;
          }

          return this._currentTransitionToNode.getToPortStatus();
        }

        getNextClipStatuses() {
          var _to$getClipStatuses;

          const {
            _currentTransitionPath: currentTransitionPath
          } = this;
          const nCurrentTransitionPath = currentTransitionPath.length;

          if (nCurrentTransitionPath === 0) {
            return emptyClipStatusesIterable;
          }

          const to = currentTransitionPath[nCurrentTransitionPath - 1].to;

          if (to.kind !== NodeKind.animation) {
            return emptyClipStatusesIterable;
          }

          return (_to$getClipStatuses = to.getClipStatuses(this._toWeight)) !== null && _to$getClipStatuses !== void 0 ? _to$getClipStatuses : emptyClipStatusesIterable;
        }

        overrideClips(overrides, node, blendBuffer) {
          var _this$_mask;

          const {
            _motionStates: motionStates
          } = this;
          const overrideClipContext = {
            node,
            blendBuffer,
            mask: (_this$_mask = this._mask) !== null && _this$_mask !== void 0 ? _this$_mask : undefined
          };
          const nMotionStates = motionStates.length;

          for (let iMotionState = 0; iMotionState < nMotionStates; ++iMotionState) {
            const node = motionStates[iMotionState];

            if (node.kind === NodeKind.animation) {
              node.overrideClips(overrides, overrideClipContext);
            }
          }
        }

        _addStateMachine(graph, parentStateMachineInfo, context, __DEBUG_ID__) {
          const nodes = Array.from(graph.states());
          let entryEval;
          let anyNode;
          let exitEval;
          const nodeEvaluations = nodes.map(node => {
            if (node instanceof MotionState) {
              const motionStateEval = new MotionStateEval(node, context);

              this._motionStates.push(motionStateEval);

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
          const stateMachineInfo = {
            components: null,
            parent: parentStateMachineInfo,
            entry: entryEval,
            exit: exitEval,
            any: anyNode
          };

          for (let iNode = 0; iNode < nodes.length; ++iNode) {
            const nodeEval = nodeEvaluations[iNode];

            if (nodeEval) {
              nodeEval.stateMachine = stateMachineInfo;
            }
          }

          const subStateMachineInfos = nodes.map(node => {
            if (node instanceof SubStateMachine) {
              const subStateMachineInfo = this._addStateMachine(node.stateMachine, stateMachineInfo, context, `${__DEBUG_ID__}/${node.name}`);

              subStateMachineInfo.components = new InstantiatedComponents(node);
              return subStateMachineInfo;
            } else {
              return null;
            }
          });

          if (DEBUG) {
            for (const nodeEval of nodeEvaluations) {
              if (nodeEval) {
                nodeEval.__DEBUG_ID__ = `${nodeEval.name}(from ${__DEBUG_ID__})`;
              }
            }
          }

          for (let iNode = 0; iNode < nodes.length; ++iNode) {
            const node = nodes[iNode];
            const outgoingTemplates = graph.getOutgoings(node);
            const outgoingTransitions = [];
            let fromNode;

            if (node instanceof SubStateMachine) {
              const subStateMachineInfo = subStateMachineInfos[iNode];
              assertIsNonNullable(subStateMachineInfo);
              fromNode = subStateMachineInfo.exit;
            } else {
              const nodeEval = nodeEvaluations[iNode];
              assertIsNonNullable(nodeEval);
              fromNode = nodeEval;
            }

            for (const outgoing of outgoingTemplates) {
              const outgoingNode = outgoing.to;
              const iOutgoingNode = nodes.findIndex(nodeTemplate => nodeTemplate === outgoing.to);

              if (iOutgoingNode < 0) {
                assertIsTrue(false, 'Bad animation data');
              }

              let toNode;

              if (outgoingNode instanceof SubStateMachine) {
                const subStateMachineInfo = subStateMachineInfos[iOutgoingNode];
                assertIsNonNullable(subStateMachineInfo);
                toNode = subStateMachineInfo.entry;
              } else {
                const nodeEval = nodeEvaluations[iOutgoingNode];
                assertIsNonNullable(nodeEval);
                toNode = nodeEval;
              }

              const conditions = outgoing.conditions.map(condition => condition[createEval](context));
              const transitionEval = {
                conditions,
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

              transitionEval.conditions.forEach((conditionEval, iCondition) => {
                const condition = outgoing.conditions[iCondition];

                if (condition instanceof TriggerCondition && condition.trigger) {
                  var _transitionEval$trigg;

                  // TODO: validates the existence of trigger?
                  ((_transitionEval$trigg = transitionEval.triggers) !== null && _transitionEval$trigg !== void 0 ? _transitionEval$trigg : transitionEval.triggers = []).push(condition.trigger);
                }
              });
              outgoingTransitions.push(transitionEval);
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


        _eval(deltaTime) {
          assertIsTrue(!this.exited);

          const haltOnNonMotionState = this._continueDanglingTransition();

          if (haltOnNonMotionState) {
            return 0.0;
          }

          const MAX_ITERATIONS = 100;
          let remainTimePiece = deltaTime;

          for (let continueNextIterationForce = true, // Force next iteration even remain time piece is zero
          iterations = 0; continueNextIterationForce || remainTimePiece > 0.0;) {
            continueNextIterationForce = false;

            if (iterations === MAX_ITERATIONS) {
              warnID(14000, MAX_ITERATIONS);
              break;
            }

            ++iterations; // Update current transition if we're in transition.
            // If currently no transition, we simple fallthrough.

            if (this._currentTransitionPath.length > 0) {
              const transitionMatch = this._detectInterruption(remainTimePiece, interruptingTransitionMatchCache);

              if (transitionMatch) {
                remainTimePiece -= transitionMatch.requires;

                const ranIntoNonMotionState = this._interrupt(transitionMatch);

                if (ranIntoNonMotionState) {
                  break;
                }

                continueNextIterationForce = true;
                continue;
              }

              const currentUpdatingConsume = this._updateCurrentTransition(remainTimePiece);

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

            const {
              _currentNode: currentNode
            } = this;

            const transitionMatch = this._matchCurrentNodeTransition(remainTimePiece);

            if (transitionMatch) {
              const {
                transition,
                requires: updateRequires
              } = transitionMatch;
              remainTimePiece -= updateRequires;

              if (currentNode.kind === NodeKind.animation) {
                currentNode.updateFromPort(updateRequires);
                this._fromUpdated = true;
              }

              const ranIntoNonMotionState = this._switchTo(transition);

              if (ranIntoNonMotionState) {
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
        }

        _sample() {
          const {
            _currentNode: currentNode,
            _currentTransitionToNode: currentTransitionToNode,
            _fromWeight: fromWeight,
            _toWeight: toWeight
          } = this;

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
        }

        _sampleSource(weight) {
          const {
            _currentNode: currentNode
          } = this;

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


        _matchCurrentNodeTransition(deltaTime) {
          const currentNode = this._currentNode;
          const transitionMatch = transitionMatchCache.reset();

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


        _matchAnyScoped(realNode, deltaTime, result) {
          let transitionMatchUpdated = false;

          for (let ancestor = realNode.stateMachine; ancestor !== null; ancestor = ancestor.parent) {
            const updated = this._matchTransition(ancestor.any, realNode, deltaTime, null, result);

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


        _matchTransition(node, realNode, deltaTime, except, result) {
          assertIsTrue(node === realNode || node.kind === NodeKind.any);
          const {
            outgoingTransitions
          } = node;
          const nTransitions = outgoingTransitions.length;
          let resultUpdated = false;

          for (let iTransition = 0; iTransition < nTransitions; ++iTransition) {
            const transition = outgoingTransitions[iTransition];

            if (transition === except) {
              continue;
            }

            const {
              conditions
            } = transition;
            const nConditions = conditions.length; // Handle empty condition case.

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

            let deltaTimeRequired = 0.0;

            if (realNode.kind === NodeKind.animation && transition.exitConditionEnabled) {
              const exitTime = realNode.duration * transition.exitCondition;
              deltaTimeRequired = Math.max(exitTime - realNode.fromPortTime, 0.0); // Note: the >= is reasonable in compare to >: we select the first-minimal requires.

              if (deltaTimeRequired > deltaTime || deltaTimeRequired >= result.requires) {
                continue;
              }
            }

            let satisfied = true;

            for (let iCondition = 0; iCondition < nConditions; ++iCondition) {
              const condition = conditions[iCondition];

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


        _switchTo(transition) {
          const {
            _currentTransitionPath: currentTransitionPath
          } = this;

          this._consumeTransition(transition);

          currentTransitionPath.push(transition);

          const motionNode = this._matchTransitionPathUntilMotion();

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


        _continueDanglingTransition() {
          const {
            _currentTransitionPath: currentTransitionPath
          } = this;
          const lenCurrentTransitionPath = currentTransitionPath.length;

          if (lenCurrentTransitionPath === 0) {
            return false;
          }

          const lastTransition = currentTransitionPath[lenCurrentTransitionPath - 1];
          const tailNode = lastTransition.to;

          if (tailNode.kind !== NodeKind.animation && tailNode.kind !== NodeKind.empty) {
            const motionNode = this._matchTransitionPathUntilMotion();

            if (motionNode) {
              // Apply transitions
              this._doTransitionToMotion(motionNode);

              return false;
            } else {
              return true;
            }
          }

          return false;
        }

        _matchTransitionPathUntilMotion() {
          const {
            _currentTransitionPath: currentTransitionPath
          } = this;
          const lenCurrentTransitionPath = currentTransitionPath.length;
          assertIsTrue(lenCurrentTransitionPath !== 0);
          const lastTransition = currentTransitionPath[lenCurrentTransitionPath - 1];
          let tailNode = lastTransition.to;

          for (; tailNode.kind !== NodeKind.animation && tailNode.kind !== NodeKind.empty;) {
            const transitionMatch = transitionMatchCache.reset();

            this._matchTransition(tailNode, tailNode, 0.0, null, transitionMatch);

            if (!transitionMatch.transition) {
              break;
            }

            const transition = transitionMatch.transition;

            this._consumeTransition(transition);

            currentTransitionPath.push(transition);
            tailNode = transition.to;
          }

          return tailNode.kind === NodeKind.animation || tailNode.kind === NodeKind.empty ? tailNode : null;
        }

        _consumeTransition(transition) {
          const {
            to
          } = transition;

          if (to.kind === NodeKind.entry) {
            // We're entering a state machine
            this._callEnterMethods(to);
          }
        }

        _resetTriggersAlongThePath() {
          const {
            _currentTransitionPath: currentTransitionPath
          } = this;
          const nTransitions = currentTransitionPath.length;

          for (let iTransition = 0; iTransition < nTransitions; ++iTransition) {
            const transition = currentTransitionPath[iTransition];

            this._resetTriggersOnTransition(transition);
          }
        }

        _doTransitionToMotion(targetNode) {
          const {
            _currentTransitionPath: currentTransitionPath
          } = this;
          assertIsTrue(currentTransitionPath.length !== 0); // Reset triggers

          this._resetTriggersAlongThePath();

          this._transitionProgress = 0.0;
          this._currentTransitionToNode = targetNode;
          this._toUpdated = false;

          if (targetNode.kind === NodeKind.animation) {
            const {
              destinationStart,
              relativeDestinationStart
            } = currentTransitionPath[0];
            const destinationStartRatio = relativeDestinationStart ? destinationStart : targetNode.duration === 0 ? 0.0 : destinationStart / targetNode.duration;
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


        _updateCurrentTransition(deltaTime) {
          var _toNode$name;

          const {
            _currentTransitionPath: currentTransitionPath,
            _currentTransitionToNode: currentTransitionToNode
          } = this;
          assertIsNonNullable(currentTransitionPath.length > 0);
          assertIsNonNullable(currentTransitionToNode);
          const currentTransition = currentTransitionPath[0];
          const {
            duration: transitionDuration,
            normalizedDuration
          } = currentTransition;
          const fromNode = this._currentNode;
          const toNode = currentTransitionToNode;
          let contrib = 0.0;
          let ratio = 0.0;

          if (transitionDuration <= 0) {
            contrib = 0.0;
            ratio = 1.0;
          } else {
            assertIsTrue(fromNode.kind === NodeKind.animation || fromNode.kind === NodeKind.empty || fromNode.kind === NodeKind.transitionSnapshot);
            const {
              _transitionProgress: transitionProgress
            } = this;
            const durationSeconds = fromNode.kind === NodeKind.empty ? transitionDuration : normalizedDuration ? transitionDuration * (fromNode.kind === NodeKind.animation ? fromNode.duration : fromNode.first.duration) : transitionDuration;
            const progressSeconds = transitionProgress * durationSeconds;
            const remain = durationSeconds - progressSeconds;
            assertIsTrue(remain >= 0.0);
            contrib = Math.min(remain, deltaTime);
            ratio = this._transitionProgress = (progressSeconds + contrib) / durationSeconds;
            assertIsTrue(ratio >= 0.0 && ratio <= 1.0);
          }

          const toNodeName = (_toNode$name = toNode === null || toNode === void 0 ? void 0 : toNode.name) !== null && _toNode$name !== void 0 ? _toNode$name : '<Empty>';
          this._fromWeight = 1.0 - ratio;
          this._toWeight = ratio;
          const shouldUpdatePorts = contrib !== 0;
          const hasFinished = ratio === 1.0;

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
        }

        _finishCurrentTransition() {
          const {
            _currentTransitionPath: currentTransitionPath,
            _currentTransitionToNode: currentTransitionToNode
          } = this;
          assertIsNonNullable(currentTransitionPath.length > 0);
          assertIsNonNullable(currentTransitionToNode);
          const fromNode = this._currentNode;
          const toNode = currentTransitionToNode;

          this._callExitMethods(fromNode); // Exiting overrides the updating
          // Processed below.
          // this._fromUpdated = false;


          const {
            _currentTransitionPath: transitions
          } = this;
          const nTransition = transitions.length;

          for (let iTransition = 0; iTransition < nTransition; ++iTransition) {
            const {
              to
            } = transitions[iTransition];

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
        }

        _dropCurrentTransition() {
          const {
            _currentTransitionToNode: currentTransitionToNode
          } = this;
          assertIsNonNullable(currentTransitionToNode);

          if (currentTransitionToNode.kind === NodeKind.animation) {
            currentTransitionToNode.finishTransition();
          }

          this._currentTransitionToNode = null;
          this._currentTransitionPath.length = 0; // Make sure we won't suffer from precision problem

          this._fromWeight = 1.0;
          this._toWeight = 0.0;
        }

        _detectInterruption(remainTimePiece, result) {
          const {
            _currentTransitionPath: currentTransitionPath,
            _currentNode: currentNode,
            _currentTransitionToNode: currentTransitionToNode
          } = this;

          if (currentNode.kind !== NodeKind.animation && currentNode.kind !== NodeKind.transitionSnapshot) {
            return null;
          }

          if (!currentTransitionToNode || currentTransitionToNode.kind !== NodeKind.animation) {
            return null;
          }

          assertIsTrue(currentTransitionPath.length !== 0);
          const currentTransition = currentTransitionPath[0];
          const {
            interruption
          } = currentTransition;

          if (interruption === TransitionInterruptionSource.NONE) {
            return null;
          }

          const transitionMatch = transitionMatchCache.reset();
          let transitionMatchSource = null; // We have to decide what to be used as unit 1
          // to interpret the relative transition duration.

          const anyTransitionMeasureBaseState = currentNode.kind === NodeKind.animation ? currentNode : currentNode.first;

          let transitionMatchUpdated = this._matchAnyScoped(anyTransitionMeasureBaseState, remainTimePiece, transitionMatch);

          if (transitionMatchUpdated) {
            transitionMatchSource = anyTransitionMeasureBaseState; // TODO: shall be any?
          }

          if (transitionMatch.hasZeroCost()) {// TODO
          }

          const motion0 = interruption === TransitionInterruptionSource.CURRENT_STATE || interruption === TransitionInterruptionSource.CURRENT_STATE_THEN_NEXT_STATE ? getInterruptionSourceMotion(currentNode) : currentTransitionToNode;
          transitionMatchUpdated = this._matchTransition(motion0, motion0, remainTimePiece, currentTransition, transitionMatch);

          if (transitionMatchUpdated) {
            transitionMatchSource = motion0;
          }

          if (transitionMatch.hasZeroCost()) {// TODO
          }

          const motion1 = interruption === TransitionInterruptionSource.NEXT_STATE_THEN_CURRENT_STATE ? getInterruptionSourceMotion(currentNode) : interruption === TransitionInterruptionSource.CURRENT_STATE_THEN_NEXT_STATE ? currentTransitionToNode : null;

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


        _interrupt({
          from: transitionSource,
          transition,
          requires: transitionRequires
        }) {
          const {
            _currentNode: currentNode
          } = this;
          assertIsTrue(currentNode.kind === NodeKind.animation || currentNode.kind === NodeKind.transitionSnapshot); // If we're interrupting motion->*,
          // we update the motion then do the first enqueue to transition snapshot.

          if (currentNode.kind === NodeKind.animation) {
            currentNode.updateFromPort(transitionRequires);
            this._fromUpdated = true;
            const {
              _transitionSnapshot: transitionSnapshot
            } = this;
            assertIsTrue(transitionSnapshot.empty);
            transitionSnapshot.enqueue(currentNode, 1.0);
          }

          this._takeCurrentTransitionSnapshot(transitionSource);

          this._dropCurrentTransition(); // Install the snapshot as "current"


          this._currentNode = this._transitionSnapshot;

          const ranIntoNonMotionState = this._switchTo(transition);

          return ranIntoNonMotionState;
        }
        /**
         * A thing to note is `transitionSource` may not be `this._currentNode`.
         */


        _takeCurrentTransitionSnapshot(transitionSource) {
          const {
            _currentTransitionPath: currentTransitionPath,
            _currentTransitionToNode: currentTransitionToNode,
            _transitionSnapshot: transitionSnapshot
          } = this;
          assertIsTrue(currentTransitionPath.length !== 0);
          assertIsTrue(currentTransitionToNode && currentTransitionToNode.kind === NodeKind.animation);
          const currentTransition = currentTransitionPath[0];
          const {
            duration: transitionDuration,
            normalizedDuration
          } = currentTransition;
          const fromNode = transitionSource;
          let ratio = 0.0;

          if (transitionDuration <= 0) {
            ratio = 1.0;
          } else {
            const {
              _transitionProgress: transitionProgress
            } = this;
            const durationSeconds = normalizedDuration ? transitionDuration * fromNode.duration : transitionDuration;
            const progressSeconds = transitionProgress * durationSeconds;
            const remain = durationSeconds - progressSeconds;
            assertIsTrue(remain >= 0.0);
            ratio = progressSeconds / durationSeconds;
            assertIsTrue(ratio >= 0.0 && ratio <= 1.0);
          }

          transitionSnapshot.enqueue(currentTransitionToNode, ratio);
        }

        _resetTriggersOnTransition(transition) {
          const {
            triggers
          } = transition;

          if (triggers) {
            const nTriggers = triggers.length;

            for (let iTrigger = 0; iTrigger < nTriggers; ++iTrigger) {
              const trigger = triggers[iTrigger];

              this._resetTrigger(trigger);
            }
          }
        }

        _resetTrigger(name) {
          const {
            _triggerReset: triggerResetFn
          } = this;
          triggerResetFn(name);
        }

        _callEnterMethods(node) {
          var _node$stateMachine$co;

          const {
            _controller: controller
          } = this;

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
        }

        _callExitMethods(node) {
          var _node$stateMachine$co2;

          const {
            _controller: controller
          } = this;

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
        }

      };
      emptyClipStatusesIterator = Object.freeze({
        next(..._args) {
          return {
            done: true,
            value: undefined
          };
        }

      });
      emptyClipStatusesIterable = Object.freeze({
        [Symbol.iterator]() {
          return emptyClipStatusesIterator;
        }

      });
      TransitionMatchCache = class TransitionMatchCache {
        constructor() {
          this.transition = null;
          this.requires = Infinity;
        }

        hasZeroCost() {
          return this.requires === 0;
        }

        isValid() {
          return this.transition !== null;
        }

        set(transition, requires) {
          this.transition = transition;
          this.requires = requires;
          return this;
        }

        reset() {
          this.requires = Infinity;
          this.transition = null;
          return this;
        }

      };
      transitionMatchCache = new TransitionMatchCache();
      InterruptingTransitionMatchCache = class InterruptingTransitionMatchCache {
        constructor() {
          this.transition = null;
          this.requires = 0.0;
          this.from = null;
        }

        set(from, transition, requires) {
          this.from = from;
          this.transition = transition;
          this.requires = requires;
          return this;
        }

      };
      interruptingTransitionMatchCache = new InterruptingTransitionMatchCache();

      (function (NodeKind) {
        NodeKind[NodeKind["entry"] = 0] = "entry";
        NodeKind[NodeKind["exit"] = 1] = "exit";
        NodeKind[NodeKind["any"] = 2] = "any";
        NodeKind[NodeKind["animation"] = 3] = "animation";
        NodeKind[NodeKind["empty"] = 4] = "empty";
        NodeKind[NodeKind["transitionSnapshot"] = 5] = "transitionSnapshot";
      })(NodeKind || (NodeKind = {}));

      _export("StateEval", StateEval = class StateEval {
        /**
         * @internal
         */
        constructor(node) {
          this.name = void 0;
          this.outgoingTransitions = [];
          this.name = node.name;
        }

      });

      InstantiatedComponents = class InstantiatedComponents {
        constructor(node) {
          this._components = node.instantiateComponents();
        }

        callMotionStateEnterMethods(controller, status) {
          this._callMotionStateCallbackIfNonDefault('onMotionStateEnter', controller, status);
        }

        callMotionStateUpdateMethods(controller, status) {
          this._callMotionStateCallbackIfNonDefault('onMotionStateUpdate', controller, status);
        }

        callMotionStateExitMethods(controller, status) {
          this._callMotionStateCallbackIfNonDefault('onMotionStateExit', controller, status);
        }

        callStateMachineEnterMethods(controller) {
          this._callStateMachineCallbackIfNonDefault('onStateMachineEnter', controller);
        }

        callStateMachineExitMethods(controller) {
          this._callStateMachineCallbackIfNonDefault('onStateMachineExit', controller);
        }

        _callMotionStateCallbackIfNonDefault(methodName, controller, status) {
          const {
            _components: components
          } = this;
          const nComponents = components.length;

          for (let iComponent = 0; iComponent < nComponents; ++iComponent) {
            const component = components[iComponent];

            if (component[methodName] !== StateMachineComponent.prototype[methodName]) {
              component[methodName](controller, status);
            }
          }
        }

        _callStateMachineCallbackIfNonDefault(methodName, controller) {
          const {
            _components: components
          } = this;
          const nComponents = components.length;

          for (let iComponent = 0; iComponent < nComponents; ++iComponent) {
            const component = components[iComponent];

            if (component[methodName] !== StateMachineComponent.prototype[methodName]) {
              component[methodName](controller);
            }
          }
        }

      };

      _export("MotionStateEval", MotionStateEval = class MotionStateEval extends StateEval {
        constructor(node, context) {
          var _node$motion$createEv, _node$motion;

          super(node);
          this.kind = NodeKind.animation;
          this._source = null;
          this._baseSpeed = 1.0;
          this._speed = 1.0;
          this._fromPort = {
            progress: 0.0,
            statusCache: createStateStatusCache()
          };
          this._toPort = {
            progress: 0.0,
            statusCache: createStateStatusCache()
          };
          this._baseSpeed = node.speed;

          this._setSpeedMultiplier(1.0);

          if (node.speedMultiplierEnabled && node.speedMultiplier) {
            const speedMultiplierVarName = node.speedMultiplier;
            const varInstance = context.getVar(speedMultiplierVarName);

            if (validateVariableExistence(varInstance, speedMultiplierVarName)) {
              validateVariableType(varInstance.type, VariableType.FLOAT, speedMultiplierVarName);
              varInstance.bind(this._setSpeedMultiplier, this);
              const initialSpeedMultiplier = varInstance.value;

              this._setSpeedMultiplier(initialSpeedMultiplier);
            }
          }

          const sourceEvalContext = { ...context
          };
          const sourceEval = (_node$motion$createEv = (_node$motion = node.motion) === null || _node$motion === void 0 ? void 0 : _node$motion[createEval](sourceEvalContext)) !== null && _node$motion$createEv !== void 0 ? _node$motion$createEv : null;

          if (sourceEval) {
            Object.defineProperty(sourceEval, '__DEBUG_ID__', {
              value: this.name
            });
          }

          this._source = sourceEval;
          this.components = new InstantiatedComponents(node);
        }

        get duration() {
          var _this$_source$duratio, _this$_source;

          return (_this$_source$duratio = (_this$_source = this._source) === null || _this$_source === void 0 ? void 0 : _this$_source.duration) !== null && _this$_source$duratio !== void 0 ? _this$_source$duratio : 0.0;
        }

        get fromPortTime() {
          return this._fromPort.progress * this.duration;
        }

        updateFromPort(deltaTime) {
          this._fromPort.progress = calcProgressUpdate(this._fromPort.progress, this.duration, deltaTime * this._speed);
        }

        updateToPort(deltaTime) {
          if (DEBUG) {
            // See `this.finishTransition()`
            assertIsTrue(!Number.isNaN(this._toPort.progress));
          }

          this._toPort.progress = calcProgressUpdate(this._toPort.progress, this.duration, deltaTime * this._speed);
        }

        triggerFromPortUpdate(controller) {
          this.components.callMotionStateUpdateMethods(controller, this.getFromPortStatus());
        }

        triggerToPortUpdate(controller) {
          this.components.callMotionStateUpdateMethods(controller, this.getToPortStatus());
        }

        getFromPortStatus() {
          const {
            statusCache: stateStatus
          } = this._fromPort;

          if (DEBUG) {
            stateStatus.__DEBUG_ID__ = this.name;
          }

          stateStatus.progress = normalizeProgress(this._fromPort.progress);
          return stateStatus;
        }

        getToPortStatus() {
          if (DEBUG) {
            // See `this.finishTransition()`
            assertIsTrue(!Number.isNaN(this._toPort.progress));
          }

          const {
            statusCache: stateStatus
          } = this._toPort;

          if (DEBUG) {
            stateStatus.__DEBUG_ID__ = this.name;
          }

          stateStatus.progress = normalizeProgress(this._toPort.progress);
          return stateStatus;
        }

        resetToPort(at) {
          this._toPort.progress = at;
        }

        finishTransition() {
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
        }

        sampleFromPort(weight) {
          var _this$_source2;

          (_this$_source2 = this._source) === null || _this$_source2 === void 0 ? void 0 : _this$_source2.sample(this._fromPort.progress, weight);
        }

        sampleToPort(weight) {
          var _this$_source3;

          if (DEBUG) {
            // See `this.finishTransition()`
            assertIsTrue(!Number.isNaN(this._toPort.progress));
          }

          (_this$_source3 = this._source) === null || _this$_source3 === void 0 ? void 0 : _this$_source3.sample(this._toPort.progress, weight);
        }

        getClipStatuses(baseWeight) {
          const {
            _source: source
          } = this;

          if (!source) {
            return emptyClipStatusesIterable;
          } else {
            return {
              [Symbol.iterator]: () => source.getClipStatuses(baseWeight)
            };
          }
        }

        overrideClips(overrides, context) {
          var _this$_source4;

          (_this$_source4 = this._source) === null || _this$_source4 === void 0 ? void 0 : _this$_source4.overrideClips(overrides, context);
        }

        _setSpeedMultiplier(value) {
          this._speed = this._baseSpeed * value;
        }

      });

      _export("SpecialStateEval", SpecialStateEval = class SpecialStateEval extends StateEval {
        constructor(node, kind, name) {
          super(node);
          this.kind = void 0;
          this.kind = kind;
        }

      });

      _export("EmptyStateEval", EmptyStateEval = class EmptyStateEval extends StateEval {
        constructor(node) {
          super(node);
          this.kind = NodeKind.empty;
        }

      });

      QueuedMotion = class QueuedMotion {
        constructor(motion, weight) {
          this.motion = motion;
          this.weight = weight;
        }

      };
      TransitionSnapshotEval = class TransitionSnapshotEval extends StateEval {
        constructor() {
          super({
            name: `[[TransitionSnapshotEval]]`
          });
          this.kind = NodeKind.transitionSnapshot;
          this._queue = [];
        }

        get empty() {
          return this._queue.length === 0;
        }

        get first() {
          const {
            _queue: queue
          } = this;
          assertIsTrue(queue.length > 0);
          return queue[0].motion;
        }

        sample(weight) {
          const {
            _queue: queue
          } = this;
          const nQueue = queue.length;

          for (let iQueuedMotions = 0; iQueuedMotions < nQueue; ++iQueuedMotions) {
            const {
              motion,
              weight: snapshotWeight
            } = queue[iQueuedMotions]; // Here implies: motions added to snapshot should have been switched from "target" to "source".

            motion.sampleFromPort(snapshotWeight * weight);
          }
        }

        clear() {
          this._queue.length = 0;
        }

        enqueue(state, weight) {
          const {
            _queue: queue
          } = this;
          const nQueue = queue.length;
          const complementWeight = 1.0 - weight;

          for (let iQueuedMotions = 0; iQueuedMotions < nQueue; ++iQueuedMotions) {
            queue[iQueuedMotions].weight *= complementWeight;
          }

          queue.push(new QueuedMotion(state, weight));
        }

      };
    }
  };
});