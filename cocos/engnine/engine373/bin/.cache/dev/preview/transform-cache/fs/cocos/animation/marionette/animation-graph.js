System.register("q-bundled:///fs/cocos/animation/marionette/animation-graph.js", ["../../core/data/decorators/index.js", "../../../../virtual/internal%253Aconstants.js", "../../core/index.js", "./ownership.js", "./variable.js", "./errors.js", "./create-eval.js", "./motion-state.js", "./state.js", "../../serialization/deserialize-symbols.js", "../define.js", "./animation-graph-like.js"], function (_export, _context) {
  "use strict";

  var ccclass, serializable, DEBUG, js, clamp, assertIsNonNullable, assertIsTrue, EditorExtendable, shift, assertsOwnedBy, own, markAsDangling, ownerSymbol, TriggerResetMode, VariableType, InvalidTransitionError, createEval, MotionState, State, outgoingsSymbol, incomingsSymbol, InteractiveState, onAfterDeserializedTag, CLASS_NAME_PREFIX_ANIM, AnimationGraphLike, _dec, _class, _class2, _initializer, _initializer2, _initializer3, _dec2, _class4, _class5, _initializer4, _initializer5, _initializer6, _initializer7, _initializer8, _initializer9, _initializer10, _dec3, _class7, _dec4, _class8, _class9, _initializer11, _initializer12, _initializer13, _dec5, _class11, _class12, _initializer14, _initializer15, _initializer16, _initializer17, _initializer18, _dec6, _class14, _class15, _initializer19, _dec7, _class17, _class18, _initializer20, _initializer21, _initializer22, _initializer23, _dec8, _class20, _class21, _initializer24, _initializer25, _dec9, _class23, _class24, _initializer26, _dec10, _class26, _class27, _initializer27, _initializer28, Transition, TransitionInterruptionSource, AnimationTransition, EmptyState, EmptyStateTransition, StateMachine, SubStateMachine, Layer, LayerBlending, TRIGGER_VARIABLE_FLAG_VALUE_START, TRIGGER_VARIABLE_FLAG_VALUE_MASK, TRIGGER_VARIABLE_FLAG_RESET_MODE_START, TRIGGER_VARIABLE_FLAG_RESET_MODE_MASK, TRIGGER_VARIABLE_DEFAULT_FLAGS, PlainVariable, TriggerVariable, AnimationGraph;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

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

      Transition = (_dec = ccclass(CLASS_NAME_PREFIX_ANIM + "Transition"), _dec(_class = (_class2 = /*#__PURE__*/function (_EditorExtendable) {
        _inheritsLoose(Transition, _EditorExtendable);

        /**
         * The transition source.
         */

        /**
         * The transition target.
         */

        /**
         * The transition condition.
         */
        function Transition(from, to, conditions) {
          var _this;

          _this = _EditorExtendable.call(this) || this;
          _this.from = _initializer && _initializer();
          _this.to = _initializer2 && _initializer2();
          _this.conditions = _initializer3 && _initializer3();
          _this[ownerSymbol] = void 0;
          _this.from = from;
          _this.to = to;

          if (conditions) {
            _this.conditions = conditions;
          }

          return _this;
        }

        var _proto = Transition.prototype;

        _proto.copyTo = function copyTo(that) {
          that.conditions = this.conditions.map(function (condition) {
            return condition.clone();
          });
        };

        return Transition;
      }(EditorExtendable), (_initializer = _applyDecoratedInitializer(_class2.prototype, "from", [serializable], null), _initializer2 = _applyDecoratedInitializer(_class2.prototype, "to", [serializable], null), _initializer3 = _applyDecoratedInitializer(_class2.prototype, "conditions", [serializable], function () {
        return [];
      })), _class2)) || _class);

      (function (TransitionInterruptionSource) {
        TransitionInterruptionSource[TransitionInterruptionSource["NONE"] = 0] = "NONE";
        TransitionInterruptionSource[TransitionInterruptionSource["CURRENT_STATE"] = 1] = "CURRENT_STATE";
        TransitionInterruptionSource[TransitionInterruptionSource["NEXT_STATE"] = 2] = "NEXT_STATE";
        TransitionInterruptionSource[TransitionInterruptionSource["CURRENT_STATE_THEN_NEXT_STATE"] = 3] = "CURRENT_STATE_THEN_NEXT_STATE";
        TransitionInterruptionSource[TransitionInterruptionSource["NEXT_STATE_THEN_CURRENT_STATE"] = 4] = "NEXT_STATE_THEN_CURRENT_STATE";
      })(TransitionInterruptionSource || _export("TransitionInterruptionSource", TransitionInterruptionSource = {}));

      AnimationTransition = (_dec2 = ccclass(CLASS_NAME_PREFIX_ANIM + "AnimationTransition"), _dec2(_class4 = (_class5 = /*#__PURE__*/function (_Transition) {
        _inheritsLoose(AnimationTransition, _Transition);

        function AnimationTransition() {
          var _this2;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this2 = _Transition.call.apply(_Transition, [this].concat(args)) || this;
          _this2.duration = _initializer4 && _initializer4();
          _this2.relativeDuration = _initializer5 && _initializer5();
          _this2.exitConditionEnabled = _initializer6 && _initializer6();
          _this2.destinationStart = _initializer7 && _initializer7();
          _this2.relativeDestinationStart = _initializer8 && _initializer8();
          _this2.interruptionSource = _initializer9 && _initializer9();
          _this2._exitCondition = _initializer10 && _initializer10();
          return _this2;
        }

        var _proto2 = AnimationTransition.prototype;

        _proto2.copyTo = function copyTo(that) {
          _Transition.prototype.copyTo.call(this, that);

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
        ;

        _createClass(AnimationTransition, [{
          key: "exitCondition",
          get: function get() {
            return this._exitCondition;
          },
          set: function set(value) {
            assertIsTrue(value >= 0.0);
            this._exitCondition = value;
          }
          /**
           * @internal This field is exposed for **experimental editor only** usage.
           */

        }, {
          key: "interruptible",
          get: function get() {
            return this.interruptionSource !== TransitionInterruptionSource.NONE;
          },
          set: function set(value) {
            this.interruptionSource = value ? TransitionInterruptionSource.CURRENT_STATE_THEN_NEXT_STATE : TransitionInterruptionSource.NONE;
          }
        }]);

        return AnimationTransition;
      }(Transition), (_initializer4 = _applyDecoratedInitializer(_class5.prototype, "duration", [serializable], function () {
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

      _export("EmptyState", EmptyState = (_dec3 = ccclass(CLASS_NAME_PREFIX_ANIM + "EmptyState"), _dec3(_class7 = /*#__PURE__*/function (_State) {
        _inheritsLoose(EmptyState, _State);

        function EmptyState() {
          return _State.apply(this, arguments) || this;
        }

        var _proto3 = EmptyState.prototype;

        _proto3._clone = function _clone() {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          var that = new EmptyState();
          this.copyTo(that);
          return that;
        };

        return EmptyState;
      }(State)) || _class7));

      _export("EmptyStateTransition", EmptyStateTransition = (_dec4 = ccclass(CLASS_NAME_PREFIX_ANIM + "EmptyStateTransition"), _dec4(_class8 = (_class9 = /*#__PURE__*/function (_Transition2) {
        _inheritsLoose(EmptyStateTransition, _Transition2);

        function EmptyStateTransition() {
          var _this3;

          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          _this3 = _Transition2.call.apply(_Transition2, [this].concat(args)) || this;
          _this3.duration = _initializer11 && _initializer11();
          _this3.destinationStart = _initializer12 && _initializer12();
          _this3.relativeDestinationStart = _initializer13 && _initializer13();
          return _this3;
        }

        var _proto4 = EmptyStateTransition.prototype;

        _proto4.copyTo = function copyTo(that) {
          _Transition2.prototype.copyTo.call(this, that);

          that.duration = this.duration;
          that.destinationStart = this.destinationStart;
          that.relativeDestinationStart = this.relativeDestinationStart;
        };

        return EmptyStateTransition;
      }(Transition), (_initializer11 = _applyDecoratedInitializer(_class9.prototype, "duration", [serializable], function () {
        return 0.3;
      }), _initializer12 = _applyDecoratedInitializer(_class9.prototype, "destinationStart", [serializable], function () {
        return 0.0;
      }), _initializer13 = _applyDecoratedInitializer(_class9.prototype, "relativeDestinationStart", [serializable], function () {
        return false;
      })), _class9)) || _class8));

      _export("StateMachine", StateMachine = (_dec5 = ccclass('cc.animation.StateMachine'), _dec5(_class11 = (_class12 = /*#__PURE__*/function (_EditorExtendable2) {
        _inheritsLoose(StateMachine, _EditorExtendable2);

        var _proto5 = StateMachine.prototype;

        /**
         * // TODO: HACK
         * @internal
         */
        _proto5.__callOnAfterDeserializeRecursive = function __callOnAfterDeserializeRecursive() {
          this[onAfterDeserializedTag]();
          var nStates = this._states.length;

          for (var iState = 0; iState < nStates; ++iState) {
            var state = this._states[iState];

            if (state instanceof SubStateMachine) {
              state.stateMachine.__callOnAfterDeserializeRecursive();
            }
          }
        };

        function StateMachine() {
          var _this4;

          _this4 = _EditorExtendable2.call(this) || this;
          _this4._states = _initializer14 && _initializer14();
          _this4._transitions = _initializer15 && _initializer15();
          _this4._entryState = _initializer16 && _initializer16();
          _this4._exitState = _initializer17 && _initializer17();
          _this4._anyState = _initializer18 && _initializer18();
          _this4._entryState = _this4._addState(new State());
          _this4._entryState.name = 'Entry';
          _this4._exitState = _this4._addState(new State());
          _this4._exitState.name = 'Exit';
          _this4._anyState = _this4._addState(new State());
          _this4._anyState.name = 'Any';
          return _this4;
        }

        _proto5[onAfterDeserializedTag] = function () {
          var _this5 = this;

          this._states.forEach(function (state) {
            return own(state, _this5);
          });

          this._transitions.forEach(function (transition) {
            transition.from[outgoingsSymbol].push(transition);
            transition.to[incomingsSymbol].push(transition);
          });
        };

        _proto5[createEval] = function (context) {
          throw new Error('Method not implemented.');
        }
        /**
         * The entry state.
         */
        ;

        /**
         * Gets an iterator to all states within this graph.
         * @returns The iterator.
         */
        _proto5.states = function states() {
          return this._states;
        }
        /**
         * Gets an iterator to all transitions within this graph.
         * @returns The iterator.
         */
        ;

        _proto5.transitions = function transitions() {
          return this._transitions;
        }
        /**
         * Gets the transitions between specified states.
         * @param from Transition source.
         * @param to Transition target.
         * @returns Iterator to the transitions
         */
        ;

        _proto5.getTransitionsBetween = function getTransitionsBetween(from, to) {
          assertsOwnedBy(from, this);
          assertsOwnedBy(to, this);
          return from[outgoingsSymbol].filter(function (transition) {
            return transition.to === to;
          });
        }
        /**
         * @en
         * Gets all transitions outgoing from specified state.
         * @zh
         * 获取从指定状态引出的所有过渡。
         * @param from @en The state. @zh 指定状态。
         * @returns @en Iterable to result transitions, in priority order. @zh 到结果过渡的迭代器，按优先级顺序。
         */
        ;

        _proto5.getOutgoings = function getOutgoings(from) {
          assertsOwnedBy(from, this);
          return from[outgoingsSymbol];
        }
        /**
         * Gets all incoming transitions of specified state.
         * @param to The state.
         * @returns Result transitions.
         */
        ;

        _proto5.getIncomings = function getIncomings(to) {
          assertsOwnedBy(to, this);
          return to[incomingsSymbol];
        }
        /**
         * Adds a motion state into this state machine.
         * @returns The newly created motion.
         */
        ;

        _proto5.addMotion = function addMotion() {
          return this._addState(new MotionState());
        }
        /**
         * Adds a sub state machine into this state machine.
         * @returns The newly created state machine.
         */
        ;

        _proto5.addSubStateMachine = function addSubStateMachine() {
          return this._addState(new SubStateMachine());
        }
        /**
         * Adds an empty state into this state machine.
         * @returns The newly created empty state.
         */
        ;

        _proto5.addEmpty = function addEmpty() {
          return this._addState(new EmptyState());
        }
        /**
         * Removes specified state from this state machine.
         * @param state The state to remove.
         */
        ;

        _proto5.remove = function remove(state) {
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
        ;

        _proto5.connect = function connect(from, to, conditions) {
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

          var transition = from instanceof MotionState || from === this._anyState ? new AnimationTransition(from, to, conditions) : from instanceof EmptyState ? new EmptyStateTransition(from, to, conditions) : new Transition(from, to, conditions);
          own(transition, this);

          this._transitions.push(transition);

          from[outgoingsSymbol].push(transition);
          to[incomingsSymbol].push(transition);
          return transition;
        };

        _proto5.disconnect = function disconnect(from, to) {
          assertsOwnedBy(from, this);
          assertsOwnedBy(to, this);
          var oTransitions = from[outgoingsSymbol];
          var iTransitions = to[incomingsSymbol];
          var transitions = this._transitions;
          var oTransitionsToRemove = oTransitions.filter(function (oTransition) {
            return oTransition.to === to;
          });
          var nOTransitionToRemove = oTransitionsToRemove.length;

          var _loop = function _loop(iOTransitionToRemove) {
            var oTransition = oTransitionsToRemove[iOTransitionToRemove];
            js.array.remove(oTransitions, oTransition);
            assertIsTrue(js.array.remove(transitions, oTransition));
            assertIsNonNullable(js.array.removeIf(iTransitions, function (transition) {
              return transition === oTransition;
            }));
            markAsDangling(oTransition);
          };

          for (var iOTransitionToRemove = 0; iOTransitionToRemove < nOTransitionToRemove; ++iOTransitionToRemove) {
            _loop(iOTransitionToRemove);
          }
        };

        _proto5.removeTransition = function removeTransition(removal) {
          assertIsTrue(js.array.remove(this._transitions, removal));
          assertIsNonNullable(js.array.removeIf(removal.from[outgoingsSymbol], function (transition) {
            return transition === removal;
          }));
          assertIsNonNullable(js.array.removeIf(removal.to[incomingsSymbol], function (transition) {
            return transition === removal;
          }));
          markAsDangling(removal);
        };

        _proto5.eraseOutgoings = function eraseOutgoings(from) {
          var _this6 = this;

          assertsOwnedBy(from, this);
          var oTransitions = from[outgoingsSymbol];

          var _loop2 = function _loop2(iOTransition) {
            var oTransition = oTransitions[iOTransition];
            var to = oTransition.to;
            assertIsTrue(js.array.remove(_this6._transitions, oTransition));
            assertIsNonNullable(js.array.removeIf(to[incomingsSymbol], function (transition) {
              return transition === oTransition;
            }));
            markAsDangling(oTransition);
          };

          for (var iOTransition = 0; iOTransition < oTransitions.length; ++iOTransition) {
            _loop2(iOTransition);
          }

          oTransitions.length = 0;
        };

        _proto5.eraseIncomings = function eraseIncomings(to) {
          var _this7 = this;

          assertsOwnedBy(to, this);
          var iTransitions = to[incomingsSymbol];

          var _loop3 = function _loop3(iITransition) {
            var iTransition = iTransitions[iITransition];
            var from = iTransition.from;
            assertIsTrue(js.array.remove(_this7._transitions, iTransition));
            assertIsNonNullable(js.array.removeIf(from[outgoingsSymbol], function (transition) {
              return transition === iTransition;
            }));
            markAsDangling(iTransition);
          };

          for (var iITransition = 0; iITransition < iTransitions.length; ++iITransition) {
            _loop3(iITransition);
          }

          iTransitions.length = 0;
        };

        _proto5.eraseTransitionsIncludes = function eraseTransitionsIncludes(state) {
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
        ;

        _proto5.adjustTransitionPriority = function adjustTransitionPriority(adjusting, diff) {
          var from = adjusting.from;

          if (diff === 0) {
            return;
          }

          var outgoings = from[outgoingsSymbol];
          var iAdjusting = outgoings.indexOf(adjusting);
          assertIsTrue(iAdjusting >= 0);
          var iNew = clamp(iAdjusting + diff, 0, outgoings.length - 1);
          {
            // 1. Adjust the order in entire transition array, which is used for serialization.
            // We're doing a discrete movement: move without bother other outgoings from other motion
            var globalTransitions = this._transitions;
            var adjustingIndexInGlobal = globalTransitions.indexOf(adjusting);
            assertIsTrue(adjustingIndexInGlobal >= 0);
            var lastPlaceholder = adjustingIndexInGlobal;

            if (iNew > iAdjusting) {
              // Shift right
              for (var iOutgoing = iAdjusting + 1; iOutgoing <= iNew; ++iOutgoing) {
                var outgoing = outgoings[iOutgoing];
                var indexInGlobal = globalTransitions.indexOf(outgoing);
                assertIsTrue(indexInGlobal >= 0);
                globalTransitions[lastPlaceholder] = outgoing;
                lastPlaceholder = indexInGlobal;
              }
            } else if (iAdjusting > iNew) {
              // Shift left
              for (var _iOutgoing = iAdjusting - 1; _iOutgoing >= iNew; --_iOutgoing) {
                var _outgoing = outgoings[_iOutgoing];

                var _indexInGlobal = globalTransitions.indexOf(_outgoing);

                assertIsTrue(_indexInGlobal >= 0);
                globalTransitions[lastPlaceholder] = _outgoing;
                lastPlaceholder = _indexInGlobal;
              }
            }

            globalTransitions[lastPlaceholder] = adjusting;
          } // eslint-disable-next-line no-lone-blocks

          {
            // 2. Adjust the order in outgoing array.
            shift(outgoings, iAdjusting, iNew);
          }
        };

        _proto5.copyTo = function copyTo(that) {
          // Clear that first
          var thatStatesOld = that._states.filter(function (state) {
            switch (state) {
              case that._entryState:
              case that._exitState:
              case that._anyState:
                return true;

              default:
                return false;
            }
          });

          for (var _iterator = _createForOfIteratorHelperLoose(thatStatesOld), _step; !(_step = _iterator()).done;) {
            var thatStateOld = _step.value;
            that.remove(thatStateOld);
          }

          var stateMap = new Map();

          for (var _iterator2 = _createForOfIteratorHelperLoose(this._states), _step2; !(_step2 = _iterator2()).done;) {
            var state = _step2.value;

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
                  var thatState = state._clone();

                  that._addState(thatState);

                  stateMap.set(state, thatState);
                } else {
                  assertIsTrue(false);
                }

                break;
            }
          }

          for (var _iterator3 = _createForOfIteratorHelperLoose(this._transitions), _step3; !(_step3 = _iterator3()).done;) {
            var transition = _step3.value;
            var thatFrom = stateMap.get(transition.from);
            var thatTo = stateMap.get(transition.to);
            assertIsTrue(thatFrom && thatTo);
            var thatTransition = that.connect(thatFrom, thatTo);
            thatTransition.conditions = transition.conditions.map(function (condition) {
              return condition.clone();
            });

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
        };

        _proto5.clone = function clone() {
          var that = new StateMachine();
          this.copyTo(that);
          return that;
        };

        _proto5._addState = function _addState(state) {
          own(state, this);

          this._states.push(state);

          return state;
        };

        _createClass(StateMachine, [{
          key: "entryState",
          get: function get() {
            return this._entryState;
          }
          /**
           * The exit state.
           */

        }, {
          key: "exitState",
          get: function get() {
            return this._exitState;
          }
          /**
           * The any state.
           */

        }, {
          key: "anyState",
          get: function get() {
            return this._anyState;
          }
        }]);

        return StateMachine;
      }(EditorExtendable), (_initializer14 = _applyDecoratedInitializer(_class12.prototype, "_states", [serializable], function () {
        return [];
      }), _initializer15 = _applyDecoratedInitializer(_class12.prototype, "_transitions", [serializable], function () {
        return [];
      }), _initializer16 = _applyDecoratedInitializer(_class12.prototype, "_entryState", [serializable], null), _initializer17 = _applyDecoratedInitializer(_class12.prototype, "_exitState", [serializable], null), _initializer18 = _applyDecoratedInitializer(_class12.prototype, "_anyState", [serializable], null)), _class12)) || _class11));

      _export("SubStateMachine", SubStateMachine = (_dec6 = ccclass('cc.animation.SubStateMachine'), _dec6(_class14 = (_class15 = /*#__PURE__*/function (_InteractiveState) {
        _inheritsLoose(SubStateMachine, _InteractiveState);

        function SubStateMachine() {
          var _this8;

          for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            args[_key5] = arguments[_key5];
          }

          _this8 = _InteractiveState.call.apply(_InteractiveState, [this].concat(args)) || this;
          _this8._stateMachine = _initializer19 && _initializer19();
          return _this8;
        }

        var _proto6 = SubStateMachine.prototype;

        _proto6.copyTo = function copyTo(that) {
          _InteractiveState.prototype.copyTo.call(this, that);

          this._stateMachine.copyTo(that._stateMachine);
        };

        _proto6._clone = function _clone() {
          var that = new SubStateMachine();
          this.copyTo(that);
          return that;
        };

        _createClass(SubStateMachine, [{
          key: "stateMachine",
          get: function get() {
            return this._stateMachine;
          }
        }]);

        return SubStateMachine;
      }(InteractiveState), (_initializer19 = _applyDecoratedInitializer(_class15.prototype, "_stateMachine", [serializable], function () {
        return new StateMachine();
      })), _class15)) || _class14));

      _export("Layer", Layer = (_dec7 = ccclass('cc.animation.Layer'), _dec7(_class17 = (_class18 = /*#__PURE__*/function () {
        /**
         * @marked_as_engine_private
         */
        function Layer() {
          this[ownerSymbol] = void 0;
          this._stateMachine = _initializer20 && _initializer20();
          this.name = _initializer21 && _initializer21();
          this.weight = _initializer22 && _initializer22();
          this.mask = _initializer23 && _initializer23();
          this._stateMachine = new StateMachine();
        }

        _createClass(Layer, [{
          key: "stateMachine",
          get: function get() {
            return this._stateMachine;
          }
        }]);

        return Layer;
      }(), (_initializer20 = _applyDecoratedInitializer(_class18.prototype, "_stateMachine", [serializable], null), _initializer21 = _applyDecoratedInitializer(_class18.prototype, "name", [serializable], function () {
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
      PlainVariable = (_dec8 = ccclass('cc.animation.PlainVariable'), _dec8(_class20 = (_class21 = /*#__PURE__*/function () {
        // TODO: we should not specify type here but due to de-serialization limitation
        // See: https://github.com/cocos-creator/3d-tasks/issues/7909
        // Same as `_type`
        function PlainVariable(type) {
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

        _createClass(PlainVariable, [{
          key: "type",
          get: function get() {
            return this._type;
          }
        }, {
          key: "value",
          get: function get() {
            return this._value;
          },
          set: function set(value) {
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
        }]);

        return PlainVariable;
      }(), (_initializer24 = _applyDecoratedInitializer(_class21.prototype, "_type", [serializable], function () {
        return VariableType.FLOAT;
      }), _initializer25 = _applyDecoratedInitializer(_class21.prototype, "_value", [serializable], function () {
        return 0.0;
      })), _class21)) || _class20);
      TriggerVariable = (_dec9 = ccclass('cc.animation.TriggerVariable'), _dec9(_class23 = (_class24 = /*#__PURE__*/function () {
        function TriggerVariable() {
          this._flags = _initializer26 && _initializer26();
        }

        _createClass(TriggerVariable, [{
          key: "type",
          get: function get() {
            return VariableType.TRIGGER;
          }
        }, {
          key: "value",
          get: function get() {
            return !!((this._flags & TRIGGER_VARIABLE_FLAG_VALUE_MASK) >> TRIGGER_VARIABLE_FLAG_VALUE_START);
          },
          set: function set(value) {
            if (value) {
              this._flags |= 1 << TRIGGER_VARIABLE_FLAG_VALUE_START;
            } else {
              this._flags &= ~(1 << TRIGGER_VARIABLE_FLAG_VALUE_START);
            }
          }
        }, {
          key: "resetMode",
          get: function get() {
            return (this._flags & TRIGGER_VARIABLE_FLAG_RESET_MODE_MASK) >> TRIGGER_VARIABLE_FLAG_RESET_MODE_START;
          },
          set: function set(value) {
            // Clear
            this._flags &= ~TRIGGER_VARIABLE_FLAG_RESET_MODE_MASK; // Set

            this._flags |= value << TRIGGER_VARIABLE_FLAG_RESET_MODE_START;
          } // l -> h
          // value(1 bits) | reset_mode(2 bits)

        }]);

        return TriggerVariable;
      }(), (_initializer26 = _applyDecoratedInitializer(_class24.prototype, "_flags", [serializable], function () {
        return TRIGGER_VARIABLE_DEFAULT_FLAGS;
      })), _class24)) || _class23);
      /**
       * @en
       * An opacity type which denotes what the animation graph seems like outside the engine.
       * @zh
       * 一个非透明的类型，它是动画图在引擎外部的表示。
       */

      _export("AnimationGraph", AnimationGraph = (_dec10 = ccclass('cc.animation.AnimationGraph'), _dec10(_class26 = (_class27 = /*#__PURE__*/function (_AnimationGraphLike) {
        _inheritsLoose(AnimationGraph, _AnimationGraphLike);

        function AnimationGraph() {
          var _this9;

          _this9 = _AnimationGraphLike.call(this) || this;
          _this9._layers = _initializer27 && _initializer27();
          _this9._variables = _initializer28 && _initializer28();
          return _this9;
        }

        var _proto7 = AnimationGraph.prototype;

        _proto7.onLoaded = function onLoaded() {
          var layers = this._layers;
          var nLayers = layers.length;

          for (var iLayer = 0; iLayer < nLayers; ++iLayer) {
            var layer = layers[iLayer];

            layer.stateMachine.__callOnAfterDeserializeRecursive();
          }
        };

        /**
         * Adds a layer.
         * @returns The new layer.
         */
        _proto7.addLayer = function addLayer() {
          var layer = new Layer();

          this._layers.push(layer);

          return layer;
        }
        /**
         * Removes a layer.
         * @param index Index to the layer to remove.
         */
        ;

        _proto7.removeLayer = function removeLayer(index) {
          js.array.removeAt(this._layers, index);
        }
        /**
         * Adjusts the layer's order.
         * @param index
         * @param newIndex
         */
        ;

        _proto7.moveLayer = function moveLayer(index, newIndex) {
          shift(this._layers, index, newIndex);
        }
        /**
         * Adds a boolean variable.
         * @param name The variable's name.
         * @param value The variable's default value.
         */
        ;

        _proto7.addBoolean = function addBoolean(name, value) {
          if (value === void 0) {
            value = false;
          }

          var variable = new PlainVariable(VariableType.BOOLEAN);
          variable.value = value;
          this._variables[name] = variable;
        }
        /**
         * Adds a floating variable.
         * @param name The variable's name.
         * @param value The variable's default value.
         */
        ;

        _proto7.addFloat = function addFloat(name, value) {
          if (value === void 0) {
            value = 0.0;
          }

          var variable = new PlainVariable(VariableType.FLOAT);
          variable.value = value;
          this._variables[name] = variable;
        }
        /**
         * Adds an integer variable.
         * @param name The variable's name.
         * @param value The variable's default value.
         */
        ;

        _proto7.addInteger = function addInteger(name, value) {
          if (value === void 0) {
            value = 0;
          }

          var variable = new PlainVariable(VariableType.INTEGER);
          variable.value = value;
          this._variables[name] = variable;
        }
        /**
         * Adds a trigger variable.
         * @param name The variable's name.
         * @param value The variable's default value.
         * @param resetMode The trigger's reset mode.
         */
        ;

        _proto7.addTrigger = function addTrigger(name, value, resetMode) {
          if (value === void 0) {
            value = false;
          }

          if (resetMode === void 0) {
            resetMode = TriggerResetMode.AFTER_CONSUMED;
          }

          var variable = new TriggerVariable();
          variable.resetMode = resetMode;
          variable.value = value;
          this._variables[name] = variable;
        };

        _proto7.removeVariable = function removeVariable(name) {
          delete this._variables[name];
        };

        _proto7.getVariable = function getVariable(name) {
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
        ;

        _proto7.renameVariable = function renameVariable(name, newName) {
          var variables = this._variables;

          if (!(name in variables)) {
            return;
          }

          if (newName in variables) {
            return;
          } // Rename but also retain order.


          this._variables = Object.entries(variables).reduce(function (result, _ref) {
            var k = _ref[0],
                v = _ref[1];
            result[k === name ? newName : k] = v;
            return result;
          }, {});
        };

        _createClass(AnimationGraph, [{
          key: "layers",
          get: function get() {
            return this._layers;
          }
        }, {
          key: "variables",
          get: function get() {
            return Object.entries(this._variables);
          }
        }]);

        return AnimationGraph;
      }(AnimationGraphLike), (_initializer27 = _applyDecoratedInitializer(_class27.prototype, "_layers", [serializable], function () {
        return [];
      }), _initializer28 = _applyDecoratedInitializer(_class27.prototype, "_variables", [serializable], function () {
        return {};
      })), _class27)) || _class26));
    }
  };
});