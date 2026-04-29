System.register("q-bundled:///fs/cocos/animation/marionette/animation-graph.js", ["../../core/data/decorators/index.js", "../../../../virtual/internal%253Aconstants.js", "../../core/index.js", "./ownership.js", "./variable.js", "./errors.js", "./create-eval.js", "./motion-state.js", "./state.js", "../../serialization/deserialize-symbols.js", "../define.js", "./animation-graph-like.js"], function (_export, _context) {
  "use strict";

  var ccclass, serializable, DEBUG, js, clamp, assertIsNonNullable, assertIsTrue, EditorExtendable, shift, assertsOwnedBy, own, markAsDangling, ownerSymbol, TriggerResetMode, VariableType, InvalidTransitionError, createEval, MotionState, State, outgoingsSymbol, incomingsSymbol, InteractiveState, onAfterDeserializedTag, CLASS_NAME_PREFIX_ANIM, AnimationGraphLike, _dec, _class, _class2, _initializer, _initializer2, _initializer3, _dec2, _class4, _class5, _initializer4, _initializer5, _initializer6, _initializer7, _initializer8, _initializer9, _initializer10, _dec3, _class7, _dec4, _class8, _class9, _initializer11, _initializer12, _initializer13, _dec5, _class11, _class12, _initializer14, _initializer15, _initializer16, _initializer17, _initializer18, _dec6, _class14, _class15, _initializer19, _dec7, _class17, _class18, _initializer20, _initializer21, _initializer22, _initializer23, _dec8, _class20, _class21, _initializer24, _initializer25, _dec9, _class23, _class24, _initializer26, _dec10, _class26, _class27, _initializer27, _initializer28, Transition, TransitionInterruptionSource, AnimationTransition, EmptyState, EmptyStateTransition, StateMachine, SubStateMachine, Layer, LayerBlending, TRIGGER_VARIABLE_FLAG_VALUE_START, TRIGGER_VARIABLE_FLAG_VALUE_MASK, TRIGGER_VARIABLE_FLAG_RESET_MODE_START, TRIGGER_VARIABLE_FLAG_RESET_MODE_MASK, TRIGGER_VARIABLE_DEFAULT_FLAGS, PlainVariable, TriggerVariable, AnimationGraph;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedInitializer(target, property, decorators, initializer) {
    return decorators.slice().reverse().reduce(function (decoratedInitializer, decorator) {
      return decorator(target, property, decoratedInitializer) || decoratedInitializer;
    }, initializer);
  }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function isAnimationTransition(transition) {
    return transition instanceof AnimationTransition;
  }

  _export({
    isAnimationTransition: isAnimationTransition,
    TransitionInterruptionSource: void 0,
    LayerBlending: void 0
  });

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_virtualInternal253AconstantsJs) {
      DEBUG = _virtualInternal253AconstantsJs.DEBUG;
    }, function (_coreIndexJs) {
      js = _coreIndexJs.js;
      clamp = _coreIndexJs.clamp;
      assertIsNonNullable = _coreIndexJs.assertIsNonNullable;
      assertIsTrue = _coreIndexJs.assertIsTrue;
      EditorExtendable = _coreIndexJs.EditorExtendable;
      shift = _coreIndexJs.shift;
    }, function (_ownershipJs) {
      assertsOwnedBy = _ownershipJs.assertsOwnedBy;
      own = _ownershipJs.own;
      markAsDangling = _ownershipJs.markAsDangling;
      ownerSymbol = _ownershipJs.ownerSymbol;
    }, function (_variableJs) {
      TriggerResetMode = _variableJs.TriggerResetMode;
      VariableType = _variableJs.VariableType;
    }, function (_errorsJs) {
      InvalidTransitionError = _errorsJs.InvalidTransitionError;
    }, function (_createEvalJs) {
      createEval = _createEvalJs.createEval;
    }, function (_motionStateJs) {
      MotionState = _motionStateJs.MotionState;
    }, function (_stateJs) {
      State = _stateJs.State;
      outgoingsSymbol = _stateJs.outgoingsSymbol;
      incomingsSymbol = _stateJs.incomingsSymbol;
      InteractiveState = _stateJs.InteractiveState;
    }, function (_serializationDeserializeSymbolsJs) {
      onAfterDeserializedTag = _serializationDeserializeSymbolsJs.onAfterDeserializedTag;
    }, function (_defineJs) {
      CLASS_NAME_PREFIX_ANIM = _defineJs.CLASS_NAME_PREFIX_ANIM;
    }, function (_animationGraphLikeJs) {
      AnimationGraphLike = _animationGraphLikeJs.AnimationGraphLike;
    }],
    execute: function () {
      _export("State", State);

      Transition = (_dec = ccclass(`${CLASS_NAME_PREFIX_ANIM}Transition`), _dec(_class = (_class2 = class Transition extends EditorExtendable {
        /**
         * The transition source.
         */

        /**
         * The transition target.
         */

        /**
         * The transition condition.
         */
        constructor(from, to, conditions) {
          super();
          this.from = _initializer && _initializer();
          this.to = _initializer2 && _initializer2();
          this.conditions = _initializer3 && _initializer3();
          this[ownerSymbol] = void 0;
          this.from = from;
          this.to = to;

          if (conditions) {
            this.conditions = conditions;
          }
        }

        copyTo(that) {
          that.conditions = this.conditions.map(condition => condition.clone());
        }

      }, (_initializer = _applyDecoratedInitializer(_class2.prototype, "from", [serializable], null), _initializer2 = _applyDecoratedInitializer(_class2.prototype, "to", [serializable], null), _initializer3 = _applyDecoratedInitializer(_class2.prototype, "conditions", [serializable], function () {
        return [];
      })), _class2)) || _class);

      (function (TransitionInterruptionSource) {
        TransitionInterruptionSource[TransitionInterruptionSource["NONE"] = 0] = "NONE";
        TransitionInterruptionSource[TransitionInterruptionSource["CURRENT_STATE"] = 1] = "CURRENT_STATE";
        TransitionInterruptionSource[TransitionInterruptionSource["NEXT_STATE"] = 2] = "NEXT_STATE";
        TransitionInterruptionSource[TransitionInterruptionSource["CURRENT_STATE_THEN_NEXT_STATE"] = 3] = "CURRENT_STATE_THEN_NEXT_STATE";
        TransitionInterruptionSource[TransitionInterruptionSource["NEXT_STATE_THEN_CURRENT_STATE"] = 4] = "NEXT_STATE_THEN_CURRENT_STATE";
      })(TransitionInterruptionSource || _export("TransitionInterruptionSource", TransitionInterruptionSource = {}));

      AnimationTransition = (_dec2 = ccclass(`${CLASS_NAME_PREFIX_ANIM}AnimationTransition`), _dec2(_class4 = (_class5 = class AnimationTransition extends Transition {
        constructor(...args) {
          super(...args);
          this.duration = _initializer4 && _initializer4();
          this.relativeDuration = _initializer5 && _initializer5();
          this.exitConditionEnabled = _initializer6 && _initializer6();
          this.destinationStart = _initializer7 && _initializer7();
          this.relativeDestinationStart = _initializer8 && _initializer8();
          this.interruptionSource = _initializer9 && _initializer9();
          this._exitCondition = _initializer10 && _initializer10();
        }

        get exitCondition() {
          return this._exitCondition;
        }

        set exitCondition(value) {
          assertIsTrue(value >= 0.0);
          this._exitCondition = value;
        }
        /**
         * @internal This field is exposed for **experimental editor only** usage.
         */


        get interruptible() {
          return this.interruptionSource !== TransitionInterruptionSource.NONE;
        }

        set interruptible(value) {
          this.interruptionSource = value ? TransitionInterruptionSource.CURRENT_STATE_THEN_NEXT_STATE : TransitionInterruptionSource.NONE;
        }

        copyTo(that) {
          super.copyTo(that);
          that.duration = this.duration;
          that.relativeDuration = this.relativeDuration;
          that.exitConditionEnabled = this.exitConditionEnabled;
          that.exitCondition = this.exitCondition;
          that.destinationStart = this.destinationStart;
          that.relativeDestinationStart = this.relativeDestinationStart;
          that.interruptible = this.interruptible;
        }
        /**
         * @internal This field is exposed for **internal** usage.
         */


      }, (_initializer4 = _applyDecoratedInitializer(_class5.prototype, "duration", [serializable], function () {
        return 0.3;
      }), _initializer5 = _applyDecoratedInitializer(_class5.prototype, "relativeDuration", [serializable], function () {
        return false;
      }), _initializer6 = _applyDecoratedInitializer(_class5.prototype, "exitConditionEnabled", [serializable], function () {
        return true;
      }), _initializer7 = _applyDecoratedInitializer(_class5.prototype, "destinationStart", [serializable], function () {
        return 0.0;
      }), _initializer8 = _applyDecoratedInitializer(_class5.prototype, "relativeDestinationStart", [serializable], function () {
        return false;
      }), _initializer9 = _applyDecoratedInitializer(_class5.prototype, "interruptionSource", [serializable], function () {
        return TransitionInterruptionSource.NONE;
      }), _initializer10 = _applyDecoratedInitializer(_class5.prototype, "_exitCondition", [serializable], function () {
        return 1.0;
      })), _class5)) || _class4);

      _export("EmptyState", EmptyState = (_dec3 = ccclass(`${CLASS_NAME_PREFIX_ANIM}EmptyState`), _dec3(_class7 = class EmptyState extends State {
        _clone() {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          const that = new EmptyState();
          this.copyTo(that);
          return that;
        }

      }) || _class7));

      _export("EmptyStateTransition", EmptyStateTransition = (_dec4 = ccclass(`${CLASS_NAME_PREFIX_ANIM}EmptyStateTransition`), _dec4(_class8 = (_class9 = class EmptyStateTransition extends Transition {
        constructor(...args) {
          super(...args);
          this.duration = _initializer11 && _initializer11();
          this.destinationStart = _initializer12 && _initializer12();
          this.relativeDestinationStart = _initializer13 && _initializer13();
        }

        copyTo(that) {
          super.copyTo(that);
          that.duration = this.duration;
          that.destinationStart = this.destinationStart;
          that.relativeDestinationStart = this.relativeDestinationStart;
        }

      }, (_initializer11 = _applyDecoratedInitializer(_class9.prototype, "duration", [serializable], function () {
        return 0.3;
      }), _initializer12 = _applyDecoratedInitializer(_class9.prototype, "destinationStart", [serializable], function () {
        return 0.0;
      }), _initializer13 = _applyDecoratedInitializer(_class9.prototype, "relativeDestinationStart", [serializable], function () {
        return false;
      })), _class9)) || _class8));

      _export("StateMachine", StateMachine = (_dec5 = ccclass('cc.animation.StateMachine'), _dec5(_class11 = (_class12 = class StateMachine extends EditorExtendable {
        /**
         * // TODO: HACK
         * @internal
         */
        __callOnAfterDeserializeRecursive() {
          this[onAfterDeserializedTag]();
          const nStates = this._states.length;

          for (let iState = 0; iState < nStates; ++iState) {
            const state = this._states[iState];

            if (state instanceof SubStateMachine) {
              state.stateMachine.__callOnAfterDeserializeRecursive();
            }
          }
        }

        constructor() {
          super();
          this._states = _initializer14 && _initializer14();
          this._transitions = _initializer15 && _initializer15();
          this._entryState = _initializer16 && _initializer16();
          this._exitState = _initializer17 && _initializer17();
          this._anyState = _initializer18 && _initializer18();
          this._entryState = this._addState(new State());
          this._entryState.name = 'Entry';
          this._exitState = this._addState(new State());
          this._exitState.name = 'Exit';
          this._anyState = this._addState(new State());
          this._anyState.name = 'Any';
        }

        [onAfterDeserializedTag]() {
          this._states.forEach(state => own(state, this));

          this._transitions.forEach(transition => {
            transition.from[outgoingsSymbol].push(transition);
            transition.to[incomingsSymbol].push(transition);
          });
        }

        [createEval](context) {
          throw new Error('Method not implemented.');
        }
        /**
         * The entry state.
         */


        get entryState() {
          return this._entryState;
        }
        /**
         * The exit state.
         */


        get exitState() {
          return this._exitState;
        }
        /**
         * The any state.
         */


        get anyState() {
          return this._anyState;
        }
        /**
         * Gets an iterator to all states within this graph.
         * @returns The iterator.
         */


        states() {
          return this._states;
        }
        /**
         * Gets an iterator to all transitions within this graph.
         * @returns The iterator.
         */


        transitions() {
          return this._transitions;
        }
        /**
         * Gets the transitions between specified states.
         * @param from Transition source.
         * @param to Transition target.
         * @returns Iterator to the transitions
         */


        getTransitionsBetween(from, to) {
          assertsOwnedBy(from, this);
          assertsOwnedBy(to, this);
          return from[outgoingsSymbol].filter(transition => transition.to === to);
        }
        /**
         * @en
         * Gets all transitions outgoing from specified state.
         * @zh
         * 获取从指定状态引出的所有过渡。
         * @param from @en The state. @zh 指定状态。
         * @returns @en Iterable to result transitions, in priority order. @zh 到结果过渡的迭代器，按优先级顺序。
         */


        getOutgoings(from) {
          assertsOwnedBy(from, this);
          return from[outgoingsSymbol];
        }
        /**
         * Gets all incoming transitions of specified state.
         * @param to The state.
         * @returns Result transitions.
         */


        getIncomings(to) {
          assertsOwnedBy(to, this);
          return to[incomingsSymbol];
        }
        /**
         * Adds a motion state into this state machine.
         * @returns The newly created motion.
         */


        addMotion() {
          return this._addState(new MotionState());
        }
        /**
         * Adds a sub state machine into this state machine.
         * @returns The newly created state machine.
         */


        addSubStateMachine() {
          return this._addState(new SubStateMachine());
        }
        /**
         * Adds an empty state into this state machine.
         * @returns The newly created empty state.
         */


        addEmpty() {
          return this._addState(new EmptyState());
        }
        /**
         * Removes specified state from this state machine.
         * @param state The state to remove.
         */


        remove(state) {
          assertsOwnedBy(state, this);

          if (state === this.entryState || state === this.exitState || state === this.anyState) {
            return;
          }

          this.eraseTransitionsIncludes(state);
          js.array.remove(this._states, state);
          markAsDangling(state);
        }
        /**
         * Connect two states.
         * @param from Source state.
         * @param to Target state.
         * @param condition The transition condition.
         */


        connect(from, to, conditions) {
          assertsOwnedBy(from, this);
          assertsOwnedBy(to, this);

          if (to === this.entryState) {
            throw new InvalidTransitionError('to-entry');
          }

          if (to === this.anyState) {
            throw new InvalidTransitionError('to-any');
          }

          if (from === this.exitState) {
            throw new InvalidTransitionError('from-exit');
          }

          const transition = from instanceof MotionState || from === this._anyState ? new AnimationTransition(from, to, conditions) : from instanceof EmptyState ? new EmptyStateTransition(from, to, conditions) : new Transition(from, to, conditions);
          own(transition, this);

          this._transitions.push(transition);

          from[outgoingsSymbol].push(transition);
          to[incomingsSymbol].push(transition);
          return transition;
        }

        disconnect(from, to) {
          assertsOwnedBy(from, this);
          assertsOwnedBy(to, this);
          const oTransitions = from[outgoingsSymbol];
          const iTransitions = to[incomingsSymbol];
          const transitions = this._transitions;
          const oTransitionsToRemove = oTransitions.filter(oTransition => oTransition.to === to);
          const nOTransitionToRemove = oTransitionsToRemove.length;

          for (let iOTransitionToRemove = 0; iOTransitionToRemove < nOTransitionToRemove; ++iOTransitionToRemove) {
            const oTransition = oTransitionsToRemove[iOTransitionToRemove];
            js.array.remove(oTransitions, oTransition);
            assertIsTrue(js.array.remove(transitions, oTransition));
            assertIsNonNullable(js.array.removeIf(iTransitions, transition => transition === oTransition));
            markAsDangling(oTransition);
          }
        }

        removeTransition(removal) {
          assertIsTrue(js.array.remove(this._transitions, removal));
          assertIsNonNullable(js.array.removeIf(removal.from[outgoingsSymbol], transition => transition === removal));
          assertIsNonNullable(js.array.removeIf(removal.to[incomingsSymbol], transition => transition === removal));
          markAsDangling(removal);
        }

        eraseOutgoings(from) {
          assertsOwnedBy(from, this);
          const oTransitions = from[outgoingsSymbol];

          for (let iOTransition = 0; iOTransition < oTransitions.length; ++iOTransition) {
            const oTransition = oTransitions[iOTransition];
            const to = oTransition.to;
            assertIsTrue(js.array.remove(this._transitions, oTransition));
            assertIsNonNullable(js.array.removeIf(to[incomingsSymbol], transition => transition === oTransition));
            markAsDangling(oTransition);
          }

          oTransitions.length = 0;
        }

        eraseIncomings(to) {
          assertsOwnedBy(to, this);
          const iTransitions = to[incomingsSymbol];

          for (let iITransition = 0; iITransition < iTransitions.length; ++iITransition) {
            const iTransition = iTransitions[iITransition];
            const from = iTransition.from;
            assertIsTrue(js.array.remove(this._transitions, iTransition));
            assertIsNonNullable(js.array.removeIf(from[outgoingsSymbol], transition => transition === iTransition));
            markAsDangling(iTransition);
          }

          iTransitions.length = 0;
        }

        eraseTransitionsIncludes(state) {
          this.eraseIncomings(state);
          this.eraseOutgoings(state);
        }
        /**
         * @en
         * Adjusts the priority of a transition.
         *
         * To demonstrate, one can imagine a transition array sorted by their priority.
         * - If `diff` is zero, nothing's gonna happen.
         * - Negative `diff` raises the priority:
         *   `diff` number of transitions originally having higher priority than `adjusting`
         *   will then have lower priority than `adjusting`.
         * - Positive `diff` reduce the priority:
         *   `|diff|` number of transitions originally having lower priority than `adjusting`
         *   will then have higher priority than `adjusting`.
         *
         * If the number of transitions indicated by `diff`
         * is more than the actual one, the actual number would be taken.
         * @zh
         * 调整过渡的优先级。
         *
         * 为了说明，可以想象一个由优先级排序的过渡数组。
         * - 如果 `diff` 是 0，无事发生。
         * - 负的 `diff` 会提升该过渡的优先级：原本优先于 `adjusting` 的 `diff` 条过渡的优先级会设置为低于 `adjusting`。
         * - 正的 `diff` 会降低该过渡的优先级：原本优先级低于 `adjusting` 的 `|diff|` 条过渡会设置为优先于 `adjusting`。
         *
         * 如果 `diff` 指示的过渡数量比实际多，则会使用实际数量。
         *
         * @param adjusting @en The transition to adjust the priority. @zh 需要调整优先级的过渡。
         * @param diff @en Indicates how to adjust the priority. @zh 指示如何调整优先级。
         */


        adjustTransitionPriority(adjusting, diff) {
          const {
            from
          } = adjusting;

          if (diff === 0) {
            return;
          }

          const outgoings = from[outgoingsSymbol];
          const iAdjusting = outgoings.indexOf(adjusting);
          assertIsTrue(iAdjusting >= 0);
          const iNew = clamp(iAdjusting + diff, 0, outgoings.length - 1);
          {
            // 1. Adjust the order in entire transition array, which is used for serialization.
            // We're doing a discrete movement: move without bother other outgoings from other motion
            const {
              _transitions: globalTransitions
            } = this;
            const adjustingIndexInGlobal = globalTransitions.indexOf(adjusting);
            assertIsTrue(adjustingIndexInGlobal >= 0);
            let lastPlaceholder = adjustingIndexInGlobal;

            if (iNew > iAdjusting) {
              // Shift right
              for (let iOutgoing = iAdjusting + 1; iOutgoing <= iNew; ++iOutgoing) {
                const outgoing = outgoings[iOutgoing];
                const indexInGlobal = globalTransitions.indexOf(outgoing);
                assertIsTrue(indexInGlobal >= 0);
                globalTransitions[lastPlaceholder] = outgoing;
                lastPlaceholder = indexInGlobal;
              }
            } else if (iAdjusting > iNew) {
              // Shift left
              for (let iOutgoing = iAdjusting - 1; iOutgoing >= iNew; --iOutgoing) {
                const outgoing = outgoings[iOutgoing];
                const indexInGlobal = globalTransitions.indexOf(outgoing);
                assertIsTrue(indexInGlobal >= 0);
                globalTransitions[lastPlaceholder] = outgoing;
                lastPlaceholder = indexInGlobal;
              }
            }

            globalTransitions[lastPlaceholder] = adjusting;
          } // eslint-disable-next-line no-lone-blocks

          {
            // 2. Adjust the order in outgoing array.
            shift(outgoings, iAdjusting, iNew);
          }
        }

        copyTo(that) {
          // Clear that first
          const thatStatesOld = that._states.filter(state => {
            switch (state) {
              case that._entryState:
              case that._exitState:
              case that._anyState:
                return true;

              default:
                return false;
            }
          });

          for (const thatStateOld of thatStatesOld) {
            that.remove(thatStateOld);
          }

          const stateMap = new Map();

          for (const state of this._states) {
            switch (state) {
              case this._entryState:
                stateMap.set(state, that._entryState);
                break;

              case this._exitState:
                stateMap.set(state, that._exitState);
                break;

              case this._anyState:
                stateMap.set(state, that._anyState);
                break;

              default:
                if (state instanceof MotionState || state instanceof SubStateMachine || state instanceof EmptyState) {
                  const thatState = state._clone();

                  that._addState(thatState);

                  stateMap.set(state, thatState);
                } else {
                  assertIsTrue(false);
                }

                break;
            }
          }

          for (const transition of this._transitions) {
            const thatFrom = stateMap.get(transition.from);
            const thatTo = stateMap.get(transition.to);
            assertIsTrue(thatFrom && thatTo);
            const thatTransition = that.connect(thatFrom, thatTo);
            thatTransition.conditions = transition.conditions.map(condition => condition.clone());

            if (thatTransition instanceof AnimationTransition) {
              assertIsTrue(transition instanceof AnimationTransition);
              transition.copyTo(thatTransition);
            } else if (thatTransition instanceof EmptyStateTransition) {
              assertIsTrue(transition instanceof EmptyStateTransition);
              transition.copyTo(thatTransition);
            } else {
              transition.copyTo(thatTransition);
            }
          }
        }

        clone() {
          const that = new StateMachine();
          this.copyTo(that);
          return that;
        }

        _addState(state) {
          own(state, this);

          this._states.push(state);

          return state;
        }

      }, (_initializer14 = _applyDecoratedInitializer(_class12.prototype, "_states", [serializable], function () {
        return [];
      }), _initializer15 = _applyDecoratedInitializer(_class12.prototype, "_transitions", [serializable], function () {
        return [];
      }), _initializer16 = _applyDecoratedInitializer(_class12.prototype, "_entryState", [serializable], null), _initializer17 = _applyDecoratedInitializer(_class12.prototype, "_exitState", [serializable], null), _initializer18 = _applyDecoratedInitializer(_class12.prototype, "_anyState", [serializable], null)), _class12)) || _class11));

      _export("SubStateMachine", SubStateMachine = (_dec6 = ccclass('cc.animation.SubStateMachine'), _dec6(_class14 = (_class15 = class SubStateMachine extends InteractiveState {
        constructor(...args) {
          super(...args);
          this._stateMachine = _initializer19 && _initializer19();
        }

        get stateMachine() {
          return this._stateMachine;
        }

        copyTo(that) {
          super.copyTo(that);

          this._stateMachine.copyTo(that._stateMachine);
        }

        _clone() {
          const that = new SubStateMachine();
          this.copyTo(that);
          return that;
        }

      }, (_initializer19 = _applyDecoratedInitializer(_class15.prototype, "_stateMachine", [serializable], function () {
        return new StateMachine();
      })), _class15)) || _class14));

      _export("Layer", Layer = (_dec7 = ccclass('cc.animation.Layer'), _dec7(_class17 = (_class18 = class Layer {
        /**
         * @marked_as_engine_private
         */
        constructor() {
          this[ownerSymbol] = void 0;
          this._stateMachine = _initializer20 && _initializer20();
          this.name = _initializer21 && _initializer21();
          this.weight = _initializer22 && _initializer22();
          this.mask = _initializer23 && _initializer23();
          this._stateMachine = new StateMachine();
        }

        get stateMachine() {
          return this._stateMachine;
        }

      }, (_initializer20 = _applyDecoratedInitializer(_class18.prototype, "_stateMachine", [serializable], null), _initializer21 = _applyDecoratedInitializer(_class18.prototype, "name", [serializable], function () {
        return '';
      }), _initializer22 = _applyDecoratedInitializer(_class18.prototype, "weight", [serializable], function () {
        return 1.0;
      }), _initializer23 = _applyDecoratedInitializer(_class18.prototype, "mask", [serializable], function () {
        return null;
      })), _class18)) || _class17));

      (function (LayerBlending) {
        LayerBlending[LayerBlending["override"] = 0] = "override";
        LayerBlending[LayerBlending["additive"] = 1] = "additive";
      })(LayerBlending || _export("LayerBlending", LayerBlending = {}));

      TRIGGER_VARIABLE_FLAG_VALUE_START = 0;
      TRIGGER_VARIABLE_FLAG_VALUE_MASK = 1;
      TRIGGER_VARIABLE_FLAG_RESET_MODE_START = 1;
      TRIGGER_VARIABLE_FLAG_RESET_MODE_MASK = 6; // 0b110
      // DO NOT CHANGE TO THIS VALUE. This is related to V3.5 migration.

      TRIGGER_VARIABLE_DEFAULT_FLAGS = 0; // Let's ensure `0`'s meaning: `value: false, resetMode: TriggerSwitchMode: TriggerResetMode.AFTER_CONSUMED`

      assertIsTrue((0 << TRIGGER_VARIABLE_FLAG_VALUE_START | TriggerResetMode.AFTER_CONSUMED << TRIGGER_VARIABLE_FLAG_RESET_MODE_START) === TRIGGER_VARIABLE_DEFAULT_FLAGS);
      PlainVariable = (_dec8 = ccclass('cc.animation.PlainVariable'), _dec8(_class20 = (_class21 = class PlainVariable {
        // TODO: we should not specify type here but due to de-serialization limitation
        // See: https://github.com/cocos-creator/3d-tasks/issues/7909
        // Same as `_type`
        constructor(type) {
          this._type = _initializer24 && _initializer24();
          this._value = _initializer25 && _initializer25();

          if (typeof type === 'undefined') {
            return;
          }

          this._type = type;

          switch (type) {
            default:
              break;

            case VariableType.FLOAT:
              this._value = 0;
              break;

            case VariableType.INTEGER:
              this._value = 0.0;
              break;

            case VariableType.BOOLEAN:
              this._value = false;
              break;
          }
        }

        get type() {
          return this._type;
        }

        get value() {
          return this._value;
        }

        set value(value) {
          if (DEBUG) {
            switch (this._type) {
              default:
                break;

              case VariableType.FLOAT:
                assertIsTrue(typeof value === 'number');
                break;

              case VariableType.INTEGER:
                assertIsTrue(Number.isInteger(value));
                break;

              case VariableType.BOOLEAN:
                assertIsTrue(typeof value === 'boolean');
                break;
            }
          }

          this._value = value;
        }

      }, (_initializer24 = _applyDecoratedInitializer(_class21.prototype, "_type", [serializable], function () {
        return VariableType.FLOAT;
      }), _initializer25 = _applyDecoratedInitializer(_class21.prototype, "_value", [serializable], function () {
        return 0.0;
      })), _class21)) || _class20);
      TriggerVariable = (_dec9 = ccclass('cc.animation.TriggerVariable'), _dec9(_class23 = (_class24 = class TriggerVariable {
        constructor() {
          this._flags = _initializer26 && _initializer26();
        }

        get type() {
          return VariableType.TRIGGER;
        }

        get value() {
          return !!((this._flags & TRIGGER_VARIABLE_FLAG_VALUE_MASK) >> TRIGGER_VARIABLE_FLAG_VALUE_START);
        }

        set value(value) {
          if (value) {
            this._flags |= 1 << TRIGGER_VARIABLE_FLAG_VALUE_START;
          } else {
            this._flags &= ~(1 << TRIGGER_VARIABLE_FLAG_VALUE_START);
          }
        }

        get resetMode() {
          return (this._flags & TRIGGER_VARIABLE_FLAG_RESET_MODE_MASK) >> TRIGGER_VARIABLE_FLAG_RESET_MODE_START;
        }

        set resetMode(value) {
          // Clear
          this._flags &= ~TRIGGER_VARIABLE_FLAG_RESET_MODE_MASK; // Set

          this._flags |= value << TRIGGER_VARIABLE_FLAG_RESET_MODE_START;
        } // l -> h
        // value(1 bits) | reset_mode(2 bits)


      }, (_initializer26 = _applyDecoratedInitializer(_class24.prototype, "_flags", [serializable], function () {
        return TRIGGER_VARIABLE_DEFAULT_FLAGS;
      })), _class24)) || _class23);
      /**
       * @en
       * An opacity type which denotes what the animation graph seems like outside the engine.
       * @zh
       * 一个非透明的类型，它是动画图在引擎外部的表示。
       */

      _export("AnimationGraph", AnimationGraph = (_dec10 = ccclass('cc.animation.AnimationGraph'), _dec10(_class26 = (_class27 = class AnimationGraph extends AnimationGraphLike {
        constructor() {
          super();
          this._layers = _initializer27 && _initializer27();
          this._variables = _initializer28 && _initializer28();
        }

        onLoaded() {
          const {
            _layers: layers
          } = this;
          const nLayers = layers.length;

          for (let iLayer = 0; iLayer < nLayers; ++iLayer) {
            const layer = layers[iLayer];

            layer.stateMachine.__callOnAfterDeserializeRecursive();
          }
        }

        get layers() {
          return this._layers;
        }

        get variables() {
          return Object.entries(this._variables);
        }
        /**
         * Adds a layer.
         * @returns The new layer.
         */


        addLayer() {
          const layer = new Layer();

          this._layers.push(layer);

          return layer;
        }
        /**
         * Removes a layer.
         * @param index Index to the layer to remove.
         */


        removeLayer(index) {
          js.array.removeAt(this._layers, index);
        }
        /**
         * Adjusts the layer's order.
         * @param index
         * @param newIndex
         */


        moveLayer(index, newIndex) {
          shift(this._layers, index, newIndex);
        }
        /**
         * Adds a boolean variable.
         * @param name The variable's name.
         * @param value The variable's default value.
         */


        addBoolean(name, value = false) {
          const variable = new PlainVariable(VariableType.BOOLEAN);
          variable.value = value;
          this._variables[name] = variable;
        }
        /**
         * Adds a floating variable.
         * @param name The variable's name.
         * @param value The variable's default value.
         */


        addFloat(name, value = 0.0) {
          const variable = new PlainVariable(VariableType.FLOAT);
          variable.value = value;
          this._variables[name] = variable;
        }
        /**
         * Adds an integer variable.
         * @param name The variable's name.
         * @param value The variable's default value.
         */


        addInteger(name, value = 0) {
          const variable = new PlainVariable(VariableType.INTEGER);
          variable.value = value;
          this._variables[name] = variable;
        }
        /**
         * Adds a trigger variable.
         * @param name The variable's name.
         * @param value The variable's default value.
         * @param resetMode The trigger's reset mode.
         */


        addTrigger(name, value = false, resetMode = TriggerResetMode.AFTER_CONSUMED) {
          const variable = new TriggerVariable();
          variable.resetMode = resetMode;
          variable.value = value;
          this._variables[name] = variable;
        }

        removeVariable(name) {
          delete this._variables[name];
        }

        getVariable(name) {
          return this._variables[name];
        }
        /**
         * @zh 重命名一个变量。注意，所有对该变量的引用都不会修改。
         * 如果变量的原始名称不存在或者新的名称已存在，此方法不会做任何事。
         * 变量在图中的顺序会保持不变。
         * @en Renames an variable. Note, this won't changes any reference to the variable.
         * If the original name of the variable doesn't exists or
         * the new name has already existed, this method won't do anything.
         * The variable's order in the graph is also retained.
         * @param name @zh 要重命名的变量的名字。 @en The name of the variable to be renamed.
         * @param newName @zh 新的名字。 @en New name.
         */


        renameVariable(name, newName) {
          const {
            _variables: variables
          } = this;

          if (!(name in variables)) {
            return;
          }

          if (newName in variables) {
            return;
          } // Rename but also retain order.


          this._variables = Object.entries(variables).reduce((result, [k, v]) => {
            result[k === name ? newName : k] = v;
            return result;
          }, {});
        }

      }, (_initializer27 = _applyDecoratedInitializer(_class27.prototype, "_layers", [serializable], function () {
        return [];
      }), _initializer28 = _applyDecoratedInitializer(_class27.prototype, "_variables", [serializable], function () {
        return {};
      })), _class27)) || _class26));
    }
  };
});