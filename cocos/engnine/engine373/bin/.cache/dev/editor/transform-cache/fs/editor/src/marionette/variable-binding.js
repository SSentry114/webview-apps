System.register("q-bundled:///fs/editor/src/marionette/variable-binding.js", ["../../../cocos/animation/marionette/asset-creation.js"], function (_export, _context) {
  "use strict";

  var AnimationBlend1D, AnimationBlend2D, AnimationBlendDirect, UnaryCondition, BinaryCondition, TriggerCondition, MotionState, SubStateMachine, VariableType;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function* viewVariableBindings(animationGraph) {
    for (const layer of animationGraph.layers) {
      yield* visitStateMachine(layer.stateMachine);
    }

    function createVariableBindingView(object, key, acceptableTypes) {
      return {
        get name() {
          return object[key];
        },

        get acceptableTypes() {
          return Array.isArray(acceptableTypes) ? acceptableTypes : [acceptableTypes];
        },

        rebind(newName) {
          object[key] = newName;
        },

        unbind() {
          object[key] = '';
        }

      };
    }

    function* visitStateMachine(stateMachine) {
      for (const transition of stateMachine.transitions()) {
        for (const condition of transition.conditions) {
          if (condition instanceof UnaryCondition) {
            yield createVariableBindingView(condition.operand, 'variable', VariableType.BOOLEAN);
          } else if (condition instanceof BinaryCondition) {
            yield createVariableBindingView(condition.lhs, 'variable', [VariableType.FLOAT, VariableType.INTEGER]);
            yield createVariableBindingView(condition.rhs, 'variable', [VariableType.FLOAT, VariableType.INTEGER]);
          } else if (condition instanceof TriggerCondition) {
            yield createVariableBindingView(condition, 'trigger', VariableType.TRIGGER);
          }
        }
      }

      for (const state of stateMachine.states()) {
        if (state instanceof MotionState) {
          const motion = state.motion;

          if (motion instanceof AnimationBlend1D) {
            yield createVariableBindingView(motion.param, 'variable', [VariableType.FLOAT]);
          } else if (motion instanceof AnimationBlend2D) {
            yield createVariableBindingView(motion.paramX, 'variable', [VariableType.FLOAT]);
            yield createVariableBindingView(motion.paramY, 'variable', [VariableType.FLOAT]);
          } else if (motion instanceof AnimationBlendDirect) {// TODO?
          }
        } else if (state instanceof SubStateMachine) {
          yield* visitStateMachine(state.stateMachine);
        }
      }
    }
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
    execute: function () {}
  };
});