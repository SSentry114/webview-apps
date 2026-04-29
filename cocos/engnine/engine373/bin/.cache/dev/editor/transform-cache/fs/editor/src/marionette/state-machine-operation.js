System.register("q-bundled:///fs/editor/src/marionette/state-machine-operation.js", ["../../../cocos/animation/marionette/animation-graph.js", "../../../cocos/animation/marionette/motion-state.js", "../../../cocos/core/data/utils/asserts.js"], function (_export, _context) {
  "use strict";

  var EmptyStateTransition, isAnimationTransition, EmptyState, MotionState, assertIsTrue;

  function copyTransitionConditions(lhs, rhs) {
    lhs.conditions = rhs.conditions.map(condition => condition.clone());
  }

  function copyTransition(lhs, rhs) {
    if (isAnimationTransition(lhs)) {
      assertIsTrue(isAnimationTransition(rhs));
      rhs.copyTo(lhs);
    } else if (lhs instanceof EmptyStateTransition) {
      assertIsTrue(rhs instanceof EmptyStateTransition);
      rhs.copyTo(lhs);
    } else {
      rhs.copyTo(lhs);
    }
  }
  /**
   * Clones a state into same state machine.
   * @param stateMachine The state machine within which the motion state locates.
   * @param state The state.
   * @param includeTransitions If true, transitions are also cloned.
   * @returns The newly created state.
   * 
   * For each editor extras object attached on animation-graph-specific objects,
   * if the editor extras object has a method called `clone`,
   * that method would be called to perform a clone operation on that editor extras object.
   * The return value would be used as the clone result.
   * The method `clone` has the signature: `(host: EditorExtendableObject) => unknown`.
   * Otherwise, if no `clone` method provide, the new editor extras would be set to undefined.
   */


  function cloneState(stateMachine, state, includeTransitions) {
    const newStateOwner = typeof includeTransitions === 'boolean' ? stateMachine : includeTransitions;
    let newState;

    if (state instanceof MotionState) {
      const newMotionState = newState = newStateOwner.addMotion();
      state.copyTo(newMotionState);
    } else if (state instanceof EmptyState) {
      const newEmptyState = newState = newStateOwner.addEmpty();
      state.copyTo(newEmptyState);
    } else
      /* if (state instanceof SubStateMachine) */
      {
        const newSubStateMachine = newState = newStateOwner.addSubStateMachine();
        state.copyTo(newSubStateMachine);
      }

    if (includeTransitions && stateMachine === newStateOwner) {
      const incomings = stateMachine.getIncomings(state);

      for (const incoming of incomings) {
        const newIncoming = stateMachine.connect(incoming.from, newState);
        copyTransition(newIncoming, incoming);
      }

      const outgoings = stateMachine.getOutgoings(state);

      for (const outgoing of outgoings) {
        const newOutgoing = stateMachine.connect(newState, outgoing.to);
        copyTransition(newOutgoing, outgoing);
      }
    }

    return newState;
  }
  /**
   * Turns a motion state into a new sub state machine.
   * @param stateMachine The state machine within which the motion state locates.
   * @param state The motion state.
   * @returns The newly created sub state machine.
   */


  function turnMotionStateIntoSubStateMachine(stateMachine, state) {
    // Create new state.
    const subStateMachine = stateMachine.addSubStateMachine();
    subStateMachine.name = state.name;
    const newMotionState = subStateMachine.stateMachine.addMotion();
    state.copyTo(newMotionState);
    subStateMachine.stateMachine.connect(subStateMachine.stateMachine.entryState, newMotionState); // Connect.

    const incomings = stateMachine.getIncomings(state);

    for (const incoming of incomings) {
      const newIncoming = stateMachine.connect(incoming.from, subStateMachine);
      copyTransition(newIncoming, incoming);
    }

    const outgoings = stateMachine.getOutgoings(state);

    for (const outgoing of outgoings) {
      const newOutgoingInternal = subStateMachine.stateMachine.connect(newMotionState, subStateMachine.stateMachine.exitState);
      copyTransition(newOutgoingInternal, outgoing);
      const newOutgoingExternal = stateMachine.connect(subStateMachine, outgoing.to);
      copyTransitionConditions(newOutgoingExternal, outgoing);
    } // Remove old one.


    stateMachine.remove(state);
    return subStateMachine;
  }

  _export({
    cloneState: cloneState,
    turnMotionStateIntoSubStateMachine: turnMotionStateIntoSubStateMachine
  });

  return {
    setters: [function (_cocosAnimationMarionetteAnimationGraphJs) {
      EmptyStateTransition = _cocosAnimationMarionetteAnimationGraphJs.EmptyStateTransition;
      isAnimationTransition = _cocosAnimationMarionetteAnimationGraphJs.isAnimationTransition;
      EmptyState = _cocosAnimationMarionetteAnimationGraphJs.EmptyState;
    }, function (_cocosAnimationMarionetteMotionStateJs) {
      MotionState = _cocosAnimationMarionetteMotionStateJs.MotionState;
    }, function (_cocosCoreDataUtilsAssertsJs) {
      assertIsTrue = _cocosCoreDataUtilsAssertsJs.assertIsTrue;
    }],
    execute: function () {}
  };
});