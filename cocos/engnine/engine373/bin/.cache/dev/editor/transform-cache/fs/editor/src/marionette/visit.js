System.register("q-bundled:///fs/editor/src/marionette/visit.js", ["../../../cocos/animation/marionette/animation-blend-1d.js", "../../../cocos/animation/marionette/animation-blend-2d.js", "../../../cocos/animation/marionette/animation-blend-direct.js", "../../../cocos/animation/marionette/animation-graph.js", "../../../cocos/animation/marionette/clip-motion.js", "../../../cocos/animation/marionette/motion-state.js"], function (_export, _context) {
  "use strict";

  var AnimationBlend1D, AnimationBlend2D, AnimationBlendDirect, SubStateMachine, ClipMotion, MotionState;

  function* visitAnimationGraphEditorExtras(animationGraph) {
    for (const layer of animationGraph.layers) {
      yield* visitStateMachine(layer.stateMachine);
    }

    function* visitStateMachine(stateMachine) {
      yield stateMachine;

      for (const state of stateMachine.states()) {
        yield state;

        if (state instanceof MotionState) {
          const motion = state.motion;

          if (!motion) {
            continue;
          }

          yield* visitMotion(motion);
        } else if (state instanceof SubStateMachine) {
          yield* visitStateMachine(state.stateMachine);
        }
      }

      for (const transition of stateMachine.transitions()) {
        yield transition;
      }
    }

    function* visitMotion(motion) {
      yield motion;

      if (motion instanceof AnimationBlend1D || motion instanceof AnimationBlend2D || motion instanceof AnimationBlendDirect) {
        for (const {
          motion: childMotion
        } of motion.items) {
          if (childMotion) {
            yield* visitMotion(childMotion);
          }
        }
      }
    }
  }

  function* visitAnimationClips(animationGraph) {
    for (const layer of animationGraph.layers) {
      yield* visitStateMachine(layer.stateMachine);
    }

    function* visitStateMachine(stateMachine) {
      for (const state of stateMachine.states()) {
        if (state instanceof MotionState) {
          const {
            motion
          } = state;

          if (motion) {
            yield* visitMotion(motion);
          }
        } else if (state instanceof SubStateMachine) {
          yield* visitStateMachine(state.stateMachine);
        }
      }
    }

    function* visitMotion(motion) {
      if (motion instanceof ClipMotion) {
        if (motion.clip) {
          yield motion.clip;
        }
      } else if (motion instanceof AnimationBlend1D || motion instanceof AnimationBlend2D || motion instanceof AnimationBlendDirect) {
        for (const {
          motion: childMotion
        } of motion.items) {
          if (childMotion) {
            yield* visitMotion(childMotion);
          }
        }
      }
    }
  }

  function* visitAnimationClipsInController(animationController) {
    const {
      graph
    } = animationController;

    if (graph) {
      yield* visitAnimationClips(graph);
    }
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
    execute: function () {}
  };
});