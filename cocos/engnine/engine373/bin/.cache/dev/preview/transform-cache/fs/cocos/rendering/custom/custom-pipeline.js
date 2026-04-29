System.register("q-bundled:///fs/cocos/rendering/custom/custom-pipeline.js", ["../../render-scene/scene/index.js", "./define.js", "./utils.js"], function (_export, _context) {
  "use strict";

  var CameraUsage, buildFxaaPass, buildBloomPasses, buildForwardPass, buildNativeForwardPass, buildPostprocessPass, AntiAliasing, buildUIPass, isUICamera, CustomPipelineBuilder, NativePipelineBuilder;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      _export("CustomPipelineBuilder", CustomPipelineBuilder = /*#__PURE__*/function () {
        function CustomPipelineBuilder() {}

        var _proto = CustomPipelineBuilder.prototype;

        _proto.setup = function setup(cameras, ppl) {
          for (var i = 0; i < cameras.length; i++) {
            var camera = cameras[i];

            if (camera.scene === null) {
              continue;
            }

            var isGameView = camera.cameraUsage === CameraUsage.GAME || camera.cameraUsage === CameraUsage.GAME_VIEW;

            if (!isGameView) {
              // forward pass
              buildForwardPass(camera, ppl, isGameView);
              continue;
            } // TODO: There is currently no effective way to judge the ui camera. Let’s do this first.


            if (!isUICamera(camera)) {
              // forward pass
              var forwardInfo = buildForwardPass(camera, ppl, isGameView); // fxaa pass

              var fxaaInfo = buildFxaaPass(camera, ppl, forwardInfo.rtName); // bloom passes

              var bloomInfo = buildBloomPasses(camera, ppl, fxaaInfo.rtName); // Present Pass

              buildPostprocessPass(camera, ppl, bloomInfo.rtName, AntiAliasing.NONE);
              continue;
            } // render ui


            buildUIPass(camera, ppl);
          }
        };

        return CustomPipelineBuilder;
      }());

      _export("NativePipelineBuilder", NativePipelineBuilder = /*#__PURE__*/function () {
        function NativePipelineBuilder() {}

        var _proto2 = NativePipelineBuilder.prototype;

        _proto2.setup = function setup(cameras, ppl) {
          for (var i = 0; i < cameras.length; i++) {
            var camera = cameras[i];

            if (camera.scene === null) {
              continue;
            }

            if (camera.cameraUsage !== CameraUsage.GAME) {
              buildForwardPass(camera, ppl, false);
              continue;
            }

            buildNativeForwardPass(camera, ppl); // buildNativeDeferredPipeline(camera, ppl);
          }
        };

        return NativePipelineBuilder;
      }());
    }
  };
});