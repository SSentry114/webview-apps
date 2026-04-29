System.register("q-bundled:///fs/editor/src/marionette/visit.js", ["../../../cocos/animation/marionette/animation-blend-1d.js", "../../../cocos/animation/marionette/animation-blend-2d.js", "../../../cocos/animation/marionette/animation-blend-direct.js", "../../../cocos/animation/marionette/animation-graph.js", "../../../cocos/animation/marionette/clip-motion.js", "../../../cocos/animation/marionette/motion-state.js"], function (_export, _context) {
  "use strict";

  var AnimationBlend1D, AnimationBlend2D, AnimationBlendDirect, SubStateMachine, ClipMotion, MotionState, _marked3, _marked6, _marked7;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function visitAnimationGraphEditorExtras(animationGraph) {
    var _marked, _marked2, _iterator, _step, layer, visitStateMachine, visitMotion;

    return regeneratorRuntime.wrap(function visitAnimationGraphEditorExtras$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            visitMotion = function _visitMotion(motion) {
              var _iterator4, _step4, childMotion;

              return regeneratorRuntime.wrap(function visitMotion$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return motion;

                    case 2:
                      if (!(motion instanceof AnimationBlend1D || motion instanceof AnimationBlend2D || motion instanceof AnimationBlendDirect)) {
                        _context3.next = 10;
                        break;
                      }

                      _iterator4 = _createForOfIteratorHelperLoose(motion.items);

                    case 4:
                      if ((_step4 = _iterator4()).done) {
                        _context3.next = 10;
                        break;
                      }

                      childMotion = _step4.value.motion;

                      if (!childMotion) {
                        _context3.next = 8;
                        break;
                      }

                      return _context3.delegateYield(visitMotion(childMotion), "t0", 8);

                    case 8:
                      _context3.next = 4;
                      break;

                    case 10:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _marked2);
            };

            visitStateMachine = function _visitStateMachine(stateMachine) {
              var _iterator2, _step2, state, motion, _iterator3, _step3, transition;

              return regeneratorRuntime.wrap(function visitStateMachine$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return stateMachine;

                    case 2:
                      _iterator2 = _createForOfIteratorHelperLoose(stateMachine.states());

                    case 3:
                      if ((_step2 = _iterator2()).done) {
                        _context2.next = 18;
                        break;
                      }

                      state = _step2.value;
                      _context2.next = 7;
                      return state;

                    case 7:
                      if (!(state instanceof MotionState)) {
                        _context2.next = 14;
                        break;
                      }

                      motion = state.motion;

                      if (motion) {
                        _context2.next = 11;
                        break;
                      }

                      return _context2.abrupt("continue", 16);

                    case 11:
                      return _context2.delegateYield(visitMotion(motion), "t0", 12);

                    case 12:
                      _context2.next = 16;
                      break;

                    case 14:
                      if (!(state instanceof SubStateMachine)) {
                        _context2.next = 16;
                        break;
                      }

                      return _context2.delegateYield(visitStateMachine(state.stateMachine), "t1", 16);

                    case 16:
                      _context2.next = 3;
                      break;

                    case 18:
                      _iterator3 = _createForOfIteratorHelperLoose(stateMachine.transitions());

                    case 19:
                      if ((_step3 = _iterator3()).done) {
                        _context2.next = 25;
                        break;
                      }

                      transition = _step3.value;
                      _context2.next = 23;
                      return transition;

                    case 23:
                      _context2.next = 19;
                      break;

                    case 25:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _marked);
            };

            _marked = /*#__PURE__*/regeneratorRuntime.mark(visitStateMachine), _marked2 = /*#__PURE__*/regeneratorRuntime.mark(visitMotion);
            _iterator = _createForOfIteratorHelperLoose(animationGraph.layers);

          case 4:
            if ((_step = _iterator()).done) {
              _context4.next = 9;
              break;
            }

            layer = _step.value;
            return _context4.delegateYield(visitStateMachine(layer.stateMachine), "t0", 7);

          case 7:
            _context4.next = 4;
            break;

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _marked3);
  }

  function visitAnimationClips(animationGraph) {
    var _marked4, _marked5, _iterator5, _step5, layer, visitStateMachine, visitMotion;

    return regeneratorRuntime.wrap(function visitAnimationClips$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            visitMotion = function _visitMotion2(motion) {
              var _iterator7, _step7, childMotion;

              return regeneratorRuntime.wrap(function visitMotion$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      if (!(motion instanceof ClipMotion)) {
                        _context6.next = 6;
                        break;
                      }

                      if (!motion.clip) {
                        _context6.next = 4;
                        break;
                      }

                      _context6.next = 4;
                      return motion.clip;

                    case 4:
                      _context6.next = 14;
                      break;

                    case 6:
                      if (!(motion instanceof AnimationBlend1D || motion instanceof AnimationBlend2D || motion instanceof AnimationBlendDirect)) {
                        _context6.next = 14;
                        break;
                      }

                      _iterator7 = _createForOfIteratorHelperLoose(motion.items);

                    case 8:
                      if ((_step7 = _iterator7()).done) {
                        _context6.next = 14;
                        break;
                      }

                      childMotion = _step7.value.motion;

                      if (!childMotion) {
                        _context6.next = 12;
                        break;
                      }

                      return _context6.delegateYield(visitMotion(childMotion), "t0", 12);

                    case 12:
                      _context6.next = 8;
                      break;

                    case 14:
                    case "end":
                      return _context6.stop();
                  }
                }
              }, _marked5);
            };

            visitStateMachine = function _visitStateMachine2(stateMachine) {
              var _iterator6, _step6, state, motion;

              return regeneratorRuntime.wrap(function visitStateMachine$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      _iterator6 = _createForOfIteratorHelperLoose(stateMachine.states());

                    case 1:
                      if ((_step6 = _iterator6()).done) {
                        _context5.next = 13;
                        break;
                      }

                      state = _step6.value;

                      if (!(state instanceof MotionState)) {
                        _context5.next = 9;
                        break;
                      }

                      motion = state.motion;

                      if (!motion) {
                        _context5.next = 7;
                        break;
                      }

                      return _context5.delegateYield(visitMotion(motion), "t0", 7);

                    case 7:
                      _context5.next = 11;
                      break;

                    case 9:
                      if (!(state instanceof SubStateMachine)) {
                        _context5.next = 11;
                        break;
                      }

                      return _context5.delegateYield(visitStateMachine(state.stateMachine), "t1", 11);

                    case 11:
                      _context5.next = 1;
                      break;

                    case 13:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _marked4);
            };

            _marked4 = /*#__PURE__*/regeneratorRuntime.mark(visitStateMachine), _marked5 = /*#__PURE__*/regeneratorRuntime.mark(visitMotion);
            _iterator5 = _createForOfIteratorHelperLoose(animationGraph.layers);

          case 4:
            if ((_step5 = _iterator5()).done) {
              _context7.next = 9;
              break;
            }

            layer = _step5.value;
            return _context7.delegateYield(visitStateMachine(layer.stateMachine), "t0", 7);

          case 7:
            _context7.next = 4;
            break;

          case 9:
          case "end":
            return _context7.stop();
        }
      }
    }, _marked6);
  }

  function visitAnimationClipsInController(animationController) {
    var graph;
    return regeneratorRuntime.wrap(function visitAnimationClipsInController$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            graph = animationController.graph;

            if (!graph) {
              _context8.next = 3;
              break;
            }

            return _context8.delegateYield(visitAnimationClips(graph), "t0", 3);

          case 3:
          case "end":
            return _context8.stop();
        }
      }
    }, _marked7);
  }

  _export({
    visitAnimationGraphEditorExtras: visitAnimationGraphEditorExtras,
    visitAnimationClips: visitAnimationClips,
    visitAnimationClipsInController: visitAnimationClipsInController
  });

  return {
    setters: [function (_cocosAnimationMarionetteAnimationBlend1dJs) {
      AnimationBlend1D = _cocosAnimationMarionetteAnimationBlend1dJs.AnimationBlend1D;
    }, function (_cocosAnimationMarionetteAnimationBlend2dJs) {
      AnimationBlend2D = _cocosAnimationMarionetteAnimationBlend2dJs.AnimationBlend2D;
    }, function (_cocosAnimationMarionetteAnimationBlendDirectJs) {
      AnimationBlendDirect = _cocosAnimationMarionetteAnimationBlendDirectJs.AnimationBlendDirect;
    }, function (_cocosAnimationMarionetteAnimationGraphJs) {
      SubStateMachine = _cocosAnimationMarionetteAnimationGraphJs.SubStateMachine;
    }, function (_cocosAnimationMarionetteClipMotionJs) {
      ClipMotion = _cocosAnimationMarionetteClipMotionJs.ClipMotion;
    }, function (_cocosAnimationMarionetteMotionStateJs) {
      MotionState = _cocosAnimationMarionetteMotionStateJs.MotionState;
    }],
    execute: function () {
      _marked3 = /*#__PURE__*/regeneratorRuntime.mark(visitAnimationGraphEditorExtras);
      _marked6 = /*#__PURE__*/regeneratorRuntime.mark(visitAnimationClips);
      _marked7 = /*#__PURE__*/regeneratorRuntime.mark(visitAnimationClipsInController);
    }
  };
});