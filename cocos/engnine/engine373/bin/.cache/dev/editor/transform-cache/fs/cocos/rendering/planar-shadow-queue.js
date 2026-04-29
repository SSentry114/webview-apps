System.register("q-bundled:///fs/cocos/rendering/planar-shadow-queue.js", ["../core/index.js", "./define.js", "./pipeline-state-manager.js", "./render-instanced-queue.js", "../render-scene/scene/shadows.js", "../scene-graph/layers.js"], function (_export, _context) {
  "use strict";

  var geometry, SetIndex, PipelineStateManager, RenderInstancedQueue, ShadowType, Layers, PlanarShadowQueue, _ab;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("PlanarShadowQueue", void 0);

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

      _export("PlanarShadowQueue", PlanarShadowQueue = class PlanarShadowQueue {
        constructor(pipeline) {
          this._pendingSubModels = [];
          this._castModels = [];
          this._instancedQueue = new RenderInstancedQueue();
          this._pipeline = void 0;
          this._pipeline = pipeline;
        }

        gatherShadowPasses(camera, cmdBuff) {
          const pipelineSceneData = this._pipeline.pipelineSceneData;
          const shadows = pipelineSceneData.shadows;

          this._instancedQueue.clear();

          this._pendingSubModels.length = 0;
          this._castModels.length = 0;

          if (!shadows.enabled || shadows.type !== ShadowType.Planar || shadows.normal.length() < 0.000001) {
            return;
          }

          const scene = camera.scene;
          const frustum = camera.frustum;
          const shadowVisible = (camera.visibility & Layers.BitMask.DEFAULT) !== 0;

          if (!scene.mainLight || !shadowVisible) {
            return;
          }

          const models = scene.models;

          for (let i = 0; i < models.length; i++) {
            const model = models[i];

            if (scene.isCulledByLod(camera, model)) {
              continue;
            }

            if (model.enabled && model.node && model.castShadow) {
              this._castModels.push(model);
            }
          }

          const instancedBuffer = shadows.instancingMaterial.passes[0].getInstancedBuffer();

          this._instancedQueue.queue.add(instancedBuffer);

          for (let i = 0; i < this._castModels.length; i++) {
            const model = this._castModels[i];

            if (model.worldBounds) {
              geometry.AABB.transform(_ab, model.worldBounds, shadows.matLight);

              if (!geometry.intersect.aabbFrustum(_ab, frustum)) {
                continue;
              }
            }

            const subModels = model.subModels;

            for (let j = 0; j < subModels.length; j++) {
              const subModel = subModels[j]; // TODO: planar shadow cant use instance
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
        }

        recordCommandBuffer(device, renderPass, cmdBuff) {
          const shadows = this._pipeline.pipelineSceneData.shadows;

          if (!shadows.enabled || shadows.type !== ShadowType.Planar) {
            return;
          }

          this._instancedQueue.recordCommandBuffer(device, renderPass, cmdBuff);

          if (!this._pendingSubModels.length) {
            return;
          }

          const pass = shadows.material.passes[0];
          const descriptorSet = pass.descriptorSet;
          cmdBuff.bindDescriptorSet(SetIndex.MATERIAL, descriptorSet);
          const subModels = this._pendingSubModels;

          for (let j = 0; j < subModels.length; j++) {
            const subModel = subModels[j]; // This is a temporary solution
            // It should not be written in a fixed way, or modified by the user

            const shader = subModel.planarShader;
            const ia = subModel.inputAssembler;
            const pso = PipelineStateManager.getOrCreatePipelineState(device, pass, shader, renderPass, ia);
            cmdBuff.bindPipelineState(pso);
            cmdBuff.bindDescriptorSet(SetIndex.LOCAL, subModel.descriptorSet);
            cmdBuff.bindInputAssembler(ia);
            cmdBuff.draw(ia);
          }
        }

      });
    }
  };
});