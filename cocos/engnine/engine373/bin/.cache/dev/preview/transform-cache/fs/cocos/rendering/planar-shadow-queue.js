System.register("q-bundled:///fs/cocos/rendering/planar-shadow-queue.js", ["../core/index.js", "./define.js", "./pipeline-state-manager.js", "./render-instanced-queue.js", "../render-scene/scene/shadows.js", "../scene-graph/layers.js"], function (_export, _context) {
  "use strict";

  var geometry, SetIndex, PipelineStateManager, RenderInstancedQueue, ShadowType, Layers, _ab, PlanarShadowQueue;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_coreIndexJs) {
      geometry = _coreIndexJs.geometry;
    }, function (_defineJs) {
      SetIndex = _defineJs.SetIndex;
    }, function (_pipelineStateManagerJs) {
      PipelineStateManager = _pipelineStateManagerJs.PipelineStateManager;
    }, function (_renderInstancedQueueJs) {
      RenderInstancedQueue = _renderInstancedQueueJs.RenderInstancedQueue;
    }, function (_renderSceneSceneShadowsJs) {
      ShadowType = _renderSceneSceneShadowsJs.ShadowType;
    }, function (_sceneGraphLayersJs) {
      Layers = _sceneGraphLayersJs.Layers;
    }],
    execute: function () {
      _ab = new geometry.AABB();

      _export("PlanarShadowQueue", PlanarShadowQueue = /*#__PURE__*/function () {
        function PlanarShadowQueue(pipeline) {
          this._pendingSubModels = [];
          this._castModels = [];
          this._instancedQueue = new RenderInstancedQueue();
          this._pipeline = void 0;
          this._pipeline = pipeline;
        }

        var _proto = PlanarShadowQueue.prototype;

        _proto.gatherShadowPasses = function gatherShadowPasses(camera, cmdBuff) {
          var pipelineSceneData = this._pipeline.pipelineSceneData;
          var shadows = pipelineSceneData.shadows;

          this._instancedQueue.clear();

          this._pendingSubModels.length = 0;
          this._castModels.length = 0;

          if (!shadows.enabled || shadows.type !== ShadowType.Planar || shadows.normal.length() < 0.000001) {
            return;
          }

          var scene = camera.scene;
          var frustum = camera.frustum;
          var shadowVisible = (camera.visibility & Layers.BitMask.DEFAULT) !== 0;

          if (!scene.mainLight || !shadowVisible) {
            return;
          }

          var models = scene.models;

          for (var i = 0; i < models.length; i++) {
            var model = models[i];

            if (scene.isCulledByLod(camera, model)) {
              continue;
            }

            if (model.enabled && model.node && model.castShadow) {
              this._castModels.push(model);
            }
          }

          var instancedBuffer = shadows.instancingMaterial.passes[0].getInstancedBuffer();

          this._instancedQueue.queue.add(instancedBuffer);

          for (var _i = 0; _i < this._castModels.length; _i++) {
            var _model = this._castModels[_i];

            if (_model.worldBounds) {
              geometry.AABB.transform(_ab, _model.worldBounds, shadows.matLight);

              if (!geometry.intersect.aabbFrustum(_ab, frustum)) {
                continue;
              }
            }

            var subModels = _model.subModels;

            for (var j = 0; j < subModels.length; j++) {
              var subModel = subModels[j]; // TODO: planar shadow cant use instance
              // const passes = subModel.passes;
              // for (let k = 0; k < passes.length; k++) {
              //     const pass = passes[k];
              //     const batchingScheme = pass.batchingScheme;
              //     if (batchingScheme === BatchingSchemes.INSTANCING) {
              //         instancedBuffer.merge(subModel, k, subModel.planarShader);
              //         this._instancedQueue.queue.add(instancedBuffer);
              //     } else {

              this._pendingSubModels.push(subModel); //     }
              // }

            }
          }

          this._instancedQueue.uploadBuffers(cmdBuff);
        };

        _proto.recordCommandBuffer = function recordCommandBuffer(device, renderPass, cmdBuff) {
          var shadows = this._pipeline.pipelineSceneData.shadows;

          if (!shadows.enabled || shadows.type !== ShadowType.Planar) {
            return;
          }

          this._instancedQueue.recordCommandBuffer(device, renderPass, cmdBuff);

          if (!this._pendingSubModels.length) {
            return;
          }

          var pass = shadows.material.passes[0];
          var descriptorSet = pass.descriptorSet;
          cmdBuff.bindDescriptorSet(SetIndex.MATERIAL, descriptorSet);
          var subModels = this._pendingSubModels;

          for (var j = 0; j < subModels.length; j++) {
            var subModel = subModels[j]; // This is a temporary solution
            // It should not be written in a fixed way, or modified by the user

            var shader = subModel.planarShader;
            var ia = subModel.inputAssembler;
            var pso = PipelineStateManager.getOrCreatePipelineState(device, pass, shader, renderPass, ia);
            cmdBuff.bindPipelineState(pso);
            cmdBuff.bindDescriptorSet(SetIndex.LOCAL, subModel.descriptorSet);
            cmdBuff.bindInputAssembler(ia);
            cmdBuff.draw(ia);
          }
        };

        return PlanarShadowQueue;
      }());
    }
  };
});