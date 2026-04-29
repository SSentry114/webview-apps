System.register("q-bundled:///fs/cocos/animation/marionette/__tmp__/graph-from-description.js", ["../../../core/index.js", "../animation-graph.js", "../condition.js", "../clip-motion.js", "../animation-blend-1d.js", "../animation-blend-2d.js", "../parametric.js"], function (_export, _context) {
  "use strict";

  var Vec2, AnimationGraph, BinaryCondition, TriggerCondition, UnaryCondition, ClipMotion, AnimationBlend1D, AnimationBlend2D, VariableType;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function createGraphFromDescription(graphDescription) {
    const graph = new AnimationGraph();

    if (graphDescription.vars) {
      for (const varDesc of graphDescription.vars) {
        switch (getVariableTypeFromValue(varDesc.value)) {
          case VariableType.FLOAT:
            graph.addFloat(varDesc.name, varDesc.value);
            break;

          case VariableType.BOOLEAN:
            graph.addBoolean(varDesc.name, varDesc.value);
            break;
        }
      }
    }

    for (const layerDesc of graphDescription.layers) {
      const layer = graph.addLayer();
      createSubgraph(layer.stateMachine, layerDesc.graph);
    }

    return graph;
  }

  function createSubgraph(subgraph, subgraphDesc) {
    var _subgraphDesc$nodes$m, _subgraphDesc$nodes;

    const nodes = (_subgraphDesc$nodes$m = (_subgraphDesc$nodes = subgraphDesc.nodes) === null || _subgraphDesc$nodes === void 0 ? void 0 : _subgraphDesc$nodes.map(nodeDesc => {
      let node;

      if (nodeDesc.type === 'animation') {
        const animationState = subgraph.addMotion();

        if (nodeDesc.motion) {
          animationState.motion = createMotion(nodeDesc.motion);
        }

        node = animationState;
      } else {
        const subSubgraph = subgraph.addSubStateMachine();
        createSubgraph(subgraph, nodeDesc);
        node = subSubgraph;
      }

      if (nodeDesc.name) {
        node.name = nodeDesc.name;
      }

      return node;
    })) !== null && _subgraphDesc$nodes$m !== void 0 ? _subgraphDesc$nodes$m : [];

    if (subgraphDesc.entryTransitions) {
      for (const transitionDesc of subgraphDesc.entryTransitions) {
        createTransition(subgraph, subgraph.entryState, nodes[transitionDesc.to], transitionDesc);
      }
    }

    if (subgraphDesc.exitTransitions) {
      for (const transitionDesc of subgraphDesc.exitTransitions) {
        createAnimationTransition(subgraph, nodes[transitionDesc.from], subgraph.exitState, transitionDesc);
      }
    }

    if (subgraphDesc.anyTransitions) {
      for (const transitionDesc of subgraphDesc.anyTransitions) {
        createTransition(subgraph, subgraph.entryState, nodes[transitionDesc.to], transitionDesc);
      }
    }

    if (subgraphDesc.transitions) {
      for (const transitionDesc of subgraphDesc.transitions) {
        createAnimationTransition(subgraph, nodes[transitionDesc.from], nodes[transitionDesc.to], transitionDesc);
      }
    }
  }

  function createTransition(graph, from, to, transitionDesc) {
    var _transitionDesc$condi;

    let condition;
    const conditions = (_transitionDesc$condi = transitionDesc.conditions) === null || _transitionDesc$condi === void 0 ? void 0 : _transitionDesc$condi.map(conditionDesc => {
      switch (conditionDesc.type) {
        default:
          throw new Error(`Unknown condition type.`);

        case 'unary':
          {
            const condition = new UnaryCondition();
            condition.operator = UnaryCondition.Operator[conditionDesc.type];
            createParametric(conditionDesc.operand, condition.operand);
            return condition;
          }

        case 'binary':
          {
            const condition = new BinaryCondition();
            condition.operator = BinaryCondition.Operator[conditionDesc.type];
            createParametric(conditionDesc.lhs, condition.lhs);
            createParametric(conditionDesc.rhs, condition.rhs);
            return condition;
          }

        case 'trigger':
          {
            const condition = new TriggerCondition();
            return condition;
          }
      }
    });
    const transition = graph.connect(from, to, conditions);
    return transition;
  }

  function createAnimationTransition(graph, from, to, descriptor) {
    const transition = createTransition(graph, from, to, descriptor);
    const {
      duration,
      exitCondition
    } = descriptor;
    transition.duration = duration !== null && duration !== void 0 ? duration : 0.0;
    transition.exitConditionEnabled = false;

    if (typeof exitCondition !== 'undefined') {
      transition.exitConditionEnabled = true;
      transition.exitCondition = exitCondition;
    }

    return transition;
  }

  function createMotion(motionDesc) {
    if (motionDesc.type === 'clip') {
      const motion = new ClipMotion();
      return motion;
    } else if (motionDesc.blender.type === '1d') {
      const motion = new AnimationBlend1D();
      const thresholds = motionDesc.blender.thresholds;
      motion.items = motionDesc.children.map((childMotionDesc, iMotion) => {
        const item = new AnimationBlend1D.Item();
        item.motion = createMotion(childMotionDesc);
        item.threshold = thresholds[iMotion];
        return item;
      });
      createParametric(motionDesc.blender.value, motion.param);
      return motion;
    } else {
      const algorithm = AnimationBlend2D.Algorithm[motionDesc.blender.algorithm];
      const motion = new AnimationBlend2D();
      motion.algorithm = algorithm;
      const thresholds = motionDesc.blender.thresholds;
      motion.items = motionDesc.children.map((childMotionDesc, iMotion) => {
        const item = new AnimationBlend2D.Item();
        item.motion = createMotion(childMotionDesc);
        item.threshold = new Vec2(thresholds[iMotion].x, thresholds[iMotion].y);
        return item;
      });
      createParametric(motionDesc.blender.values[0], motion.paramX);
      createParametric(motionDesc.blender.values[1], motion.paramY);
      return motion;
    }
  }

  function createParametric(paramDesc, bindable) {
    if (typeof paramDesc === 'object') {
      bindable.variable = paramDesc.name;
      bindable.value = paramDesc.value;
    } else {
      bindable.value = paramDesc;
    }
  }

  function getVariableTypeFromValue(value) {
    switch (true) {
      case typeof value === 'boolean':
        return VariableType.BOOLEAN;

      case typeof value === 'number':
        return VariableType.FLOAT;

      default:
        throw new Error(`Unknown variable type.`);
    }
  }

  _export("createGraphFromDescription", createGraphFromDescription);

  return {
    setters: [function (_coreIndexJs) {
      Vec2 = _coreIndexJs.Vec2;
    }, function (_animationGraphJs) {
      AnimationGraph = _animationGraphJs.AnimationGraph;
    }, function (_conditionJs) {
      BinaryCondition = _conditionJs.BinaryCondition;
      TriggerCondition = _conditionJs.TriggerCondition;
      UnaryCondition = _conditionJs.UnaryCondition;
    }, function (_clipMotionJs) {
      ClipMotion = _clipMotionJs.ClipMotion;
    }, function (_animationBlend1dJs) {
      AnimationBlend1D = _animationBlend1dJs.AnimationBlend1D;
    }, function (_animationBlend2dJs) {
      AnimationBlend2D = _animationBlend2dJs.AnimationBlend2D;
    }, function (_parametricJs) {
      VariableType = _parametricJs.VariableType;
    }],
    execute: function () {}
  };
});