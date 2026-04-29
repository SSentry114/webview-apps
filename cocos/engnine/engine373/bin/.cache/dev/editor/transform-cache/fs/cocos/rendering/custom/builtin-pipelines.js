System.register("q-bundled:///fs/cocos/rendering/custom/builtin-pipelines.js", ["../../../../virtual/internal%253Aconstants.js", "../../render-scene/scene/index.js", "./define.js", "./utils.js"], function (_export, _context) {
  "use strict";

  var EDITOR, CameraUsage, buildForwardPass, buildGBufferPass, buildLightingPass, buildPostprocessPass, buildReflectionProbePasss, buildUIPass, isUICamera, ForwardPipelineBuilder, DeferredPipelineBuilder;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export({
    ForwardPipelineBuilder: void 0,
    DeferredPipelineBuilder: void 0
  });

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_renderSceneSceneIndexJs) {
      CameraUsage = _renderSceneSceneIndexJs.CameraUsage;
    }, function (_defineJs) {
      buildForwardPass = _defineJs.buildForwardPass;
      buildGBufferPass = _defineJs.buildGBufferPass;
      buildLightingPass = _defineJs.buildLightingPass;
      buildPostprocessPass = _defineJs.buildPostprocessPass;
      buildReflectionProbePasss = _defineJs.buildReflectionProbePasss;
      buildUIPass = _defineJs.buildUIPass;
    }, function (_utilsJs) {
      isUICamera = _utilsJs.isUICamera;
    }],
    execute: function () {
      _export("ForwardPipelineBuilder", ForwardPipelineBuilder = class ForwardPipelineBuilder {
        setup(cameras, ppl) {
          for (let i = 0; i < cameras.length; i++) {
            const camera = cameras[i];

            if (camera.scene === null) {
              continue;
            } // forward pass


            buildForwardPass(camera, ppl, false);

            if (EDITOR) {
              buildReflectionProbePasss(camera, ppl, false);
            }
          }
        }

      });

      _export("DeferredPipelineBuilder", DeferredPipelineBuilder = class DeferredPipelineBuilder {
        setup(cameras, ppl) {
          for (let i = 0; i < cameras.length; ++i) {
            const camera = cameras[i];

            if (!camera.scene) {
              continue;
            }

            const isGameView = camera.cameraUsage === CameraUsage.GAME || camera.cameraUsage === CameraUsage.GAME_VIEW;

            if (!isGameView) {
              buildForwardPass(camera, ppl, false);
              continue;
            }

            if (!isUICamera(camera)) {
              // GBuffer Pass
              const gBufferInfo = buildGBufferPass(camera, ppl); // Lighting Pass

              const lightInfo = buildLightingPass(camera, ppl, gBufferInfo); // Postprocess

              buildPostprocessPass(camera, ppl, lightInfo.rtName);
              continue;
            } // render ui


            buildUIPass(camera, ppl);
          }
        }

      });
    }
  };
});