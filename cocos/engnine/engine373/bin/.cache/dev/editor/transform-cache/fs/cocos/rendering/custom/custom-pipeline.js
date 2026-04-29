System.register("q-bundled:///fs/cocos/rendering/custom/custom-pipeline.js", ["../../render-scene/scene/index.js", "./define.js", "./utils.js"], function (_export, _context) {
  "use strict";

  var CameraUsage, buildFxaaPass, buildBloomPasses, buildForwardPass, buildNativeForwardPass, buildPostprocessPass, AntiAliasing, buildUIPass, isUICamera, CustomPipelineBuilder, NativePipelineBuilder;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export({
    CustomPipelineBuilder: void 0,
    NativePipelineBuilder: void 0
  });

  return {
    setters: [function (_renderSceneSceneIndexJs) {
      CameraUsage = _renderSceneSceneIndexJs.CameraUsage;
    }, function (_defineJs) {
      buildFxaaPass = _defineJs.buildFxaaPass;
      buildBloomPasses = _defineJs.buildBloomPass;
      buildForwardPass = _defineJs.buildForwardPass;
      buildNativeForwardPass = _defineJs.buildNativeForwardPass;
      buildPostprocessPass = _defineJs.buildPostprocessPass;
      AntiAliasing = _defineJs.AntiAliasing;
      buildUIPass = _defineJs.buildUIPass;
    }, function (_utilsJs) {
      isUICamera = _utilsJs.isUICamera;
    }],
    execute: function () {
      _export("CustomPipelineBuilder", CustomPipelineBuilder = class CustomPipelineBuilder {
        setup(cameras, ppl) {
          for (let i = 0; i < cameras.length; i++) {
            const camera = cameras[i];

            if (camera.scene === null) {
              continue;
            }

            const isGameView = camera.cameraUsage === CameraUsage.GAME || camera.cameraUsage === CameraUsage.GAME_VIEW;

            if (!isGameView) {
              // forward pass
              buildForwardPass(camera, ppl, isGameView);
              continue;
            } // TODO: There is currently no effective way to judge the ui camera. Let’s do this first.


            if (!isUICamera(camera)) {
              // forward pass
              const forwardInfo = buildForwardPass(camera, ppl, isGameView); // fxaa pass

              const fxaaInfo = buildFxaaPass(camera, ppl, forwardInfo.rtName); // bloom passes

              const bloomInfo = buildBloomPasses(camera, ppl, fxaaInfo.rtName); // Present Pass

              buildPostprocessPass(camera, ppl, bloomInfo.rtName, AntiAliasing.NONE);
              continue;
            } // render ui


            buildUIPass(camera, ppl);
          }
        }

      });

      _export("NativePipelineBuilder", NativePipelineBuilder = class NativePipelineBuilder {
        setup(cameras, ppl) {
          for (let i = 0; i < cameras.length; i++) {
            const camera = cameras[i];

            if (camera.scene === null) {
              continue;
            }

            if (camera.cameraUsage !== CameraUsage.GAME) {
              buildForwardPass(camera, ppl, false);
              continue;
            }

            buildNativeForwardPass(camera, ppl); // buildNativeDeferredPipeline(camera, ppl);
          }
        }

      });
    }
  };
});