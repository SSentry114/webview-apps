System.register("q-bundled:///fs/editor/exports/new-gen-anim.js", ["../../cocos/animation/marionette/blend-1d.js", "../../cocos/animation/marionette/blend-2d.js", "../../cocos/animation/marionette/asset-creation.js", "../src/marionette/variable-binding.js", "../src/marionette/preview.js", "../src/marionette/state-machine-operation.js", "../src/marionette/visit.js"], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_cocosAnimationMarionetteBlend1dJs) {
      _export("blend1D", _cocosAnimationMarionetteBlend1dJs.blend1D);
    }, function (_cocosAnimationMarionetteBlend2dJs) {
      _export({
        blendSimpleDirectional: _cocosAnimationMarionetteBlend2dJs.blendSimpleDirectional,
        validateSimpleDirectionalSamples: _cocosAnimationMarionetteBlend2dJs.validateSimpleDirectionalSamples,
        SimpleDirectionalIssueSameDirection: _cocosAnimationMarionetteBlend2dJs.SimpleDirectionalIssueSameDirection
      });
    }, function (_cocosAnimationMarionetteAssetCreationJs) {
      var _exportObj = {};

      for (var _key in _cocosAnimationMarionetteAssetCreationJs) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _cocosAnimationMarionetteAssetCreationJs[_key];
      }

      _export(_exportObj);
    }, function (_srcMarionetteVariableBindingJs) {
      _export("viewVariableBindings", _srcMarionetteVariableBindingJs.viewVariableBindings);
    }, function (_srcMarionettePreviewJs) {
      _export({
        MotionPreviewer: _srcMarionettePreviewJs.MotionPreviewer,
        TransitionPreviewer: _srcMarionettePreviewJs.TransitionPreviewer
      });
    }, function (_srcMarionetteStateMachineOperationJs) {
      _export({
        cloneState: _srcMarionetteStateMachineOperationJs.cloneState,
        turnMotionStateIntoSubStateMachine: _srcMarionetteStateMachineOperationJs.turnMotionStateIntoSubStateMachine
      });
    }, function (_srcMarionetteVisitJs) {
      _export({
        visitAnimationClips: _srcMarionetteVisitJs.visitAnimationClips,
        visitAnimationClipsInController: _srcMarionetteVisitJs.visitAnimationClipsInController,
        visitAnimationGraphEditorExtras: _srcMarionetteVisitJs.visitAnimationGraphEditorExtras
      });
    }],
    execute: function () {}
  };
});