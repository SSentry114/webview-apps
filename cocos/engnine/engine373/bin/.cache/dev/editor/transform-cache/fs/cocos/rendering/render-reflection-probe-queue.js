System.register("q-bundled:///fs/cocos/rendering/render-reflection-probe-queue.js", ["./define.js", "./pass-phase.js", "./pipeline-state-manager.js", "../render-scene/core/pass.js", "../render-scene/scene/index.js", "./render-instanced-queue.js", "./render-batched-queue.js", "../core/index.js", "../scene-graph/layers.js"], function (_export, _context) {
  "use strict";

  var isEnableEffect, SetIndex, getPhaseID, PipelineStateManager, BatchingSchemes, ProbeType, SKYBOX_FLAG, RenderInstancedQueue, RenderBatchedQueue, cclegacy, geometry, Layers, RenderReflectionProbeQueue, REFLECTION_PROBE_DEFAULT_MASK, CC_USE_RGBE_OUTPUT, _phaseID, _phaseReflectMapID;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function getPassIndex(subModel) {
    const passes = subModel.passes;
    const r = cclegacy.rendering;
    if (isEnableEffect()) _phaseID = r.getPhaseID(r.getPassID('default'), 'default');

    for (let k = 0; k < passes.length; k++) {
      if ((!r || !r.enableEffectImport) && passes[k].phase === _phaseID || isEnableEffect() && passes[k].phaseID === _phaseID) {
        return k;
      }
    }

    return -1;
  }

  function getReflectMapPassIndex(subModel) {
    const passes = subModel.passes;
    const r = cclegacy.rendering;
    if (isEnableEffect()) _phaseReflectMapID = r.getPhaseID(r.getPassID('default'), 'reflect-map');

    for (let k = 0; k < passes.length; k++) {
      if ((!r || !r.enableEffectImport) && passes[k].phase === _phaseReflectMapID || isEnableEffect() && passes[k].phaseID === _phaseReflectMapID) {
        return k;
      }
    }

    return -1;
  }
  /**
   * @zh
   * 反射探针渲染队列
   */


  _export("RenderReflectionProbeQueue", void 0);

  return {
    setters: [function (_defineJs) {
      isEnableEffect = _defineJs.isEnableEffect;
      SetIndex = _defineJs.SetIndex;
    }, function (_passPhaseJs) {
      getPhaseID = _passPhaseJs.getPhaseID;
    }, function (_pipelineStateManagerJs) {
      PipelineStateManager = _pipelineStateManagerJs.PipelineStateManager;
    }, function (_renderSceneCorePassJs) {
      BatchingSchemes = _renderSceneCorePassJs.BatchingSchemes;
    }, function (_renderSceneSceneIndexJs) {
      ProbeType = _renderSceneSceneIndexJs.ProbeType;
      SKYBOX_FLAG = _renderSceneSceneIndexJs.SKYBOX_FLAG;
    }, function (_renderInstancedQueueJs) {
      RenderInstancedQueue = _renderInstancedQueueJs.RenderInstancedQueue;
    }, function (_renderBatchedQueueJs) {
      RenderBatchedQueue = _renderBatchedQueueJs.RenderBatchedQueue;
    }, function (_coreIndexJs) {
      cclegacy = _coreIndexJs.cclegacy;
      geometry = _coreIndexJs.geometry;
    }, function (_sceneGraphLayersJs) {
      Layers = _sceneGraphLayersJs.Layers;
    }],
    execute: function () {
      // eslint-disable-next-line max-len
      REFLECTION_PROBE_DEFAULT_MASK = Layers.makeMaskExclude([Layers.BitMask.UI_2D, Layers.BitMask.UI_3D, Layers.BitMask.GIZMOS, Layers.BitMask.EDITOR, Layers.BitMask.SCENE_GIZMO, Layers.BitMask.PROFILER]);
      CC_USE_RGBE_OUTPUT = 'CC_USE_RGBE_OUTPUT';
      _phaseID = getPhaseID('default');
      _phaseReflectMapID = getPhaseID('reflect-map');

      _export("RenderReflectionProbeQueue", RenderReflectionProbeQueue = class RenderReflectionProbeQueue {
        constructor(pipeline) {
          this._pipeline = void 0;
          this._subModelsArray = [];
          this._passArray = [];
          this._shaderArray = [];
          this._rgbeSubModelsArray = [];
          this._instancedQueue = void 0;
          this._batchedQueue = void 0;
          this._pipeline = pipeline;
          this._instancedQueue = new RenderInstancedQueue();
          this._batchedQueue = new RenderBatchedQueue();
        }

        gatherRenderObjects(probe, camera, cmdBuff) {
          this.clear();
          const scene = camera.scene;
          const sceneData = this._pipeline.pipelineSceneData;
          const skybox = sceneData.skybox;

          if (skybox.enabled && skybox.model && probe.camera.clearFlag & SKYBOX_FLAG) {
            this.add(skybox.model);
          }

          const models = scene.models;
          const visibility = probe.camera.visibility;

          for (let i = 0; i < models.length; i++) {
            const model = models[i];

            if (scene.isCulledByLod(camera, model)) {
              continue;
            } // filter model by view visibility


            if (model.enabled && model.node && model.worldBounds && model.bakeToReflectionProbe) {
              if (probe.probeType === ProbeType.CUBE) {
                if (((visibility & model.node.layer) === model.node.layer || visibility & model.visFlags) && geometry.intersect.aabbWithAABB(model.worldBounds, probe.boundingBox)) {
                  this.add(model);
                }
              } else if ((model.node.layer & REFLECTION_PROBE_DEFAULT_MASK) === model.node.layer || REFLECTION_PROBE_DEFAULT_MASK & model.visFlags) {
                if (geometry.intersect.aabbFrustum(model.worldBounds, probe.camera.frustum)) {
                  this.add(model);
                }
              }
            }
          }

          this._instancedQueue.uploadBuffers(cmdBuff);

          this._batchedQueue.uploadBuffers(cmdBuff);
        }

        clear() {
          this._subModelsArray.length = 0;
          this._shaderArray.length = 0;
          this._passArray.length = 0;

          this._instancedQueue.clear();

          this._batchedQueue.clear();

          this._rgbeSubModelsArray.length = 0;
        }

        add(model) {
          const subModels = model.subModels;

          for (let j = 0; j < subModels.length; j++) {
            const subModel = subModels[j];
            let passIdx = getReflectMapPassIndex(subModel);
            let bUseReflectPass = true;

            if (passIdx < 0) {
              passIdx = getPassIndex(subModel);
              bUseReflectPass = false;
            }

            if (passIdx < 0) {
              continue;
            }

            const pass = subModel.passes[passIdx];
            const batchingScheme = pass.batchingScheme;

            if (!bUseReflectPass) {
              let patches = subModel.patches;
              const useRGBEPatchs = [{
                name: CC_USE_RGBE_OUTPUT,
                value: true
              }];
              patches = patches ? patches.concat(useRGBEPatchs) : useRGBEPatchs;
              subModel.onMacroPatchesStateChanged(patches);

              this._rgbeSubModelsArray.push(subModel);
            }

            if (batchingScheme === BatchingSchemes.INSTANCING) {
              // instancing
              const buffer = pass.getInstancedBuffer();
              buffer.merge(subModel, passIdx);

              this._instancedQueue.queue.add(buffer);
            } else if (pass.batchingScheme === BatchingSchemes.VB_MERGING) {
              // vb-merging
              const buffer = pass.getBatchedBuffer();
              buffer.merge(subModel, passIdx, model);

              this._batchedQueue.queue.add(buffer);
            } else {
              const shader = subModel.shaders[passIdx];

              this._subModelsArray.push(subModel);

              if (shader) this._shaderArray.push(shader);

              this._passArray.push(pass);
            }
          }
        }
        /**
         * @zh
         * record CommandBuffer
         */


        recordCommandBuffer(device, renderPass, cmdBuff) {
          this._instancedQueue.recordCommandBuffer(device, renderPass, cmdBuff);

          this._batchedQueue.recordCommandBuffer(device, renderPass, cmdBuff);

          for (let i = 0; i < this._subModelsArray.length; ++i) {
            const subModel = this._subModelsArray[i];
            const shader = this._shaderArray[i];
            const pass = this._passArray[i];
            const ia = subModel.inputAssembler;
            const pso = PipelineStateManager.getOrCreatePipelineState(device, pass, shader, renderPass, ia);
            const descriptorSet = pass.descriptorSet;
            cmdBuff.bindPipelineState(pso);
            cmdBuff.bindDescriptorSet(SetIndex.MATERIAL, descriptorSet);
            cmdBuff.bindDescriptorSet(SetIndex.LOCAL, subModel.descriptorSet);
            cmdBuff.bindInputAssembler(ia);
            cmdBuff.draw(ia);
          }

          this.resetRGBEMacro();

          this._instancedQueue.clear();

          this._batchedQueue.clear();
        }

        resetRGBEMacro() {
          for (let i = 0; i < this._rgbeSubModelsArray.length; i++) {
            const subModel = this._rgbeSubModelsArray[i]; // eslint-disable-next-line prefer-const

            let patches = subModel.patches;
            if (!patches) continue;

            for (let j = 0; j < patches.length; j++) {
              const patch = patches[j];

              if (patch.name === CC_USE_RGBE_OUTPUT) {
                patches.splice(j, 1);
                break;
              }
            }

            subModel.onMacroPatchesStateChanged(patches);
          }
        }

      });
    }
  };
});