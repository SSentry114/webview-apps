System.register("q-bundled:///fs/editor/src/marionette/variable-binding.js", ["../../../cocos/animation/marionette/asset-creation.js"], function (_export, _context) {
  "use strict";

  var AnimationBlend1D, AnimationBlend2D, AnimationBlendDirect, UnaryCondition, BinaryCondition, TriggerCondition, MotionState, SubStateMachine, VariableType, _marked2;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function viewVariableBindings(animationGraph) {
    var _marked, _iterator, _step, layer, createVariableBindingView, visitStateMachine;

    return regeneratorRuntime.wrap(function viewVariableBindings$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            visitStateMachine = function _visitStateMachine(stateMachine) {
              var _iterator2, _step2, transition, _iterator4, _step4, condition, _iterator3, _step3, state, motion;

              return regeneratorRuntime.wrap(function visitStateMachine$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _iterator2 = _createForOfIteratorHelperLoose(stateMachine.transitions());

                    case 1:
                      if ((_step2 = _iterator2()).done) {
                        _context2.next = 25;
                        break;
                      }

                      transition = _step2.value;
                      _iterator4 = _createForOfIteratorHelperLoose(transition.conditions);

                    case 4:
                      if ((_step4 = _iterator4()).done) {
                        _context2.next = 23;
                        break;
                      }

                      condition = _step4.value;

                      if (!(condition instanceof UnaryCondition)) {
                        _context2.next = 11;
                        break;
                      }

                      _context2.next = 9;
                      return createVariableBindingView(condition.operand, 'variable', VariableType.BOOLEAN);

                    case 9:
                      _context2.next = 21;
                      break;

                    case 11:
                      if (!(condition instanceof BinaryCondition)) {
                        _context2.next = 18;
                        break;
                      }

                      _context2.next = 14;
                      return createVariableBindingView(condition.lhs, 'variable', [VariableType.FLOAT, VariableType.INTEGER]);

                    case 14:
                      _context2.next = 16;
                      return createVariableBindingView(condition.rhs, 'variable', [VariableType.FLOAT, VariableType.INTEGER]);

                    case 16:
                      _context2.next = 21;
                      break;

                    case 18:
                      if (!(condition instanceof TriggerCondition)) {
                        _context2.next = 21;
                        break;
                      }

                      _context2.next = 21;
                      return createVariableBindingView(condition, 'trigger', VariableType.TRIGGER);

                    case 21:
                      _context2.next = 4;
                      break;

                    case 23:
                      _context2.next = 1;
                      break;

                    case 25:
                      _iterator3 = _createForOfIteratorHelperLoose(stateMachine.states());

                    case 26:
                      if ((_step3 = _iterator3()).done) {
                        _context2.next = 49;
                        break;
                      }

                      state = _step3.value;

                      if (!(state instanceof MotionState)) {
                        _context2.next = 45;
                        break;
                      }

                      motion = state.motion;

                      if (!(motion instanceof AnimationBlend1D)) {
                        _context2.next = 35;
                        break;
                      }

                      _context2.next = 33;
                      return createVariableBindingView(motion.param, 'variable', [VariableType.FLOAT]);

                    case 33:
                      _context2.next = 43;
                      break;

                    case 35:
                      if (!(motion instanceof AnimationBlend2D)) {
                        _context2.next = 42;
                        break;
                      }

                      _context2.next = 38;
                      return createVariableBindingView(motion.paramX, 'variable', [VariableType.FLOAT]);

                    case 38:
                      _context2.next = 40;
                      return createVariableBindingView(motion.paramY, 'variable', [VariableType.FLOAT]);

                    case 40:
                      _context2.next = 43;
                      break;

                    case 42:
                      if (motion instanceof AnimationBlendDirect) {// TODO?
                      }

                    case 43:
                      _context2.next = 47;
                      break;

                    case 45:
                      if (!(state instanceof SubStateMachine)) {
                        _context2.next = 47;
                        break;
                      }

                      return _context2.delegateYield(visitStateMachine(state.stateMachine), "t0", 47);

                    case 47:
                      _context2.next = 26;
                      break;

                    case 49:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _marked);
            };

            createVariableBindingView = function _createVariableBindin(object, key, acceptableTypes) {
              return {
                get name() {
                  return object[key];
                },

                get acceptableTypes() {
                  return Array.isArray(acceptableTypes) ? acceptableTypes : [acceptableTypes];
                },

                rebind: function rebind(newName) {
                  object[key] = newName;
                },
                unbind: function unbind() {
                  object[key] = '';
                }
              };
            };

            _marked = /*#__PURE__*/regeneratorRuntime.mark(visitStateMachine);
            _iterator = _createForOfIteratorHelperLoose(animationGraph.layers);

          case 4:
            if ((_step = _iterator()).done) {
              _context3.next = 9;
              break;
            }

            layer = _step.value;
            return _context3.delegateYield(visitStateMachine(layer.stateMachine), "t0", 7);

          case 7:
            _context3.next = 4;
            break;

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _marked2);
  }

  _export("viewVariableBindings", viewVariableBindings);

  return {
    setters: [function (_cocosAnimationMarionetteAssetCreationJs) {
      AnimationBlend1D = _cocosAnimationMarionetteAssetCreationJs.AnimationBlend1D;
      AnimationBlend2D = _cocosAnimationMarionetteAssetCreationJs.AnimationBlend2D;
      AnimationBlendDirect = _cocosAnimationMarionetteAssetCreationJs.AnimationBlendDirect;
      UnaryCondition = _cocosAnimationMarionetteAssetCreationJs.UnaryCondition;
      BinaryCondition = _cocosAnimationMarionetteAssetCreationJs.BinaryCondition;
      TriggerCondition = _cocosAnimationMarionetteAssetCreationJs.TriggerCondition;
      MotionState = _cocosAnimationMarionetteAssetCreationJs.MotionState;
      SubStateMachine = _cocosAnimationMarionetteAssetCreationJs.SubStateMachine;
      VariableType = _cocosAnimationMarionetteAssetCreationJs.VariableType;
    }],
    execute: function () {
      _marked2 = /*#__PURE__*/regeneratorRuntime.mark(viewVariableBindings);
    }
  };
});