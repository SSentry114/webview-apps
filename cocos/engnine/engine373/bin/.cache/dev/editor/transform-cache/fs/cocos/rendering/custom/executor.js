System.register("q-bundled:///fs/cocos/rendering/custom/executor.js", ["../index.js", "../../core/index.js", "../../core/geometry/intersect.js", "../../core/geometry/sphere.js", "../../gfx/index.js", "../../core/global-exports.js", "../../core/math/vec3.js", "../../core/math/vec4.js", "../../render-scene/index.js", "../../render-scene/scene/shadows.js", "../define.js", "../render-pipeline.js", "./render-graph.js", "./types.js", "./web-scene.js", "./web-scene-visitor.js", "./utils.js", "../render-additive-light-queue.js", "../render-shadow-map-batched-queue.js", "../planar-shadow-queue.js", "./graph.js", "./effect.js", "./define.js", "../render-reflection-probe-queue.js", "../reflection-probe-manager.js", "../../asset/asset-manager/builtin-res-mgr.js"], function (_export, _context) {
  "use strict";

  var getPhaseID, PipelineStateManager, assert, cclegacy, RecyclePool, intersect, Sphere, AccessFlagBit, Attribute, BufferInfo, BufferUsageBit, BufferViewInfo, ColorAttachment, DepthStencilAttachment, DescriptorSetInfo, deviceManager, Format, Framebuffer, FramebufferInfo, GeneralBarrierInfo, InputAssemblerInfo, LoadOp, MemoryUsageBit, Rect, RenderPassInfo, StoreOp, SurfaceTransform, Texture, TextureInfo, TextureType, TextureUsageBit, Viewport, legacyCC, Vec3, Vec4, BatchingSchemes, ShadowType, isEnableEffect, SetIndex, UBODeferredLight, UBOForwardLight, UBOLocal, PipelineInputAssemblerData, Blit, RasterPass, RenderGraph, RenderSwapchain, ResourceDesc, SceneData, AttachmentType, ComputeView, QueueHint, RasterView, ResourceDimension, ResourceFlags, SceneFlags, UpdateFrequency, WebSceneTask, WebSceneTransversal, WebSceneVisitor, stringify, RenderAdditiveLightQueue, RenderShadowMapBatchedQueue, PlanarShadowQueue, DefaultVisitor, depthFirstSearch, ReferenceGraphView, VectorGraphColorMap, getDescBindingFromName, getDescriptorSetDataFromLayout, getDescriptorSetDataFromLayoutId, getRenderArea, mergeSrcToTargetDesc, updateGlobalDescBinding, RenderReflectionProbeQueue, ReflectionProbeManager, builtinResMgr, DeviceResource, DeviceTexture, DeviceBuffer, BlitDesc, DeviceRenderQueue, SubmitInfo, RenderPassLayoutInfo, RasterPassInfo, DeviceRenderPass, DeviceSceneTransversal, GraphScene, DevicePreSceneTask, DeviceSceneTask, DevicePostSceneTask, ExecutorPools, BlitInfo, ExecutorContext, ResourceVisitor, Executor, BaseRenderVisitor, PreRenderVisitor, PostRenderVisitor, RenderVisitor, context, _vec4Array, profilerViewport, renderPassArea, sceneViewport, vbData, quadRect;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export({
    Executor: void 0,
    RenderVisitor: void 0
  });

  return {
    setters: [function (_indexJs) {
      getPhaseID = _indexJs.getPhaseID;
      PipelineStateManager = _indexJs.PipelineStateManager;
    }, function (_coreIndexJs) {
      assert = _coreIndexJs.assert;
      cclegacy = _coreIndexJs.cclegacy;
      RecyclePool = _coreIndexJs.RecyclePool;
    }, function (_coreGeometryIntersectJs) {
      intersect = _coreGeometryIntersectJs.default;
    }, function (_coreGeometrySphereJs) {
      Sphere = _coreGeometrySphereJs.Sphere;
    }, function (_gfxIndexJs) {
      AccessFlagBit = _gfxIndexJs.AccessFlagBit;
      Attribute = _gfxIndexJs.Attribute;
      BufferInfo = _gfxIndexJs.BufferInfo;
      BufferUsageBit = _gfxIndexJs.BufferUsageBit;
      BufferViewInfo = _gfxIndexJs.BufferViewInfo;
      ColorAttachment = _gfxIndexJs.ColorAttachment;
      DepthStencilAttachment = _gfxIndexJs.DepthStencilAttachment;
      DescriptorSetInfo = _gfxIndexJs.DescriptorSetInfo;
      deviceManager = _gfxIndexJs.deviceManager;
      Format = _gfxIndexJs.Format;
      Framebuffer = _gfxIndexJs.Framebuffer;
      FramebufferInfo = _gfxIndexJs.FramebufferInfo;
      GeneralBarrierInfo = _gfxIndexJs.GeneralBarrierInfo;
      InputAssemblerInfo = _gfxIndexJs.InputAssemblerInfo;
      LoadOp = _gfxIndexJs.LoadOp;
      MemoryUsageBit = _gfxIndexJs.MemoryUsageBit;
      Rect = _gfxIndexJs.Rect;
      RenderPassInfo = _gfxIndexJs.RenderPassInfo;
      StoreOp = _gfxIndexJs.StoreOp;
      SurfaceTransform = _gfxIndexJs.SurfaceTransform;
      Texture = _gfxIndexJs.Texture;
      TextureInfo = _gfxIndexJs.TextureInfo;
      TextureType = _gfxIndexJs.TextureType;
      TextureUsageBit = _gfxIndexJs.TextureUsageBit;
      Viewport = _gfxIndexJs.Viewport;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_coreMathVec3Js) {
      Vec3 = _coreMathVec3Js.Vec3;
    }, function (_coreMathVec4Js) {
      Vec4 = _coreMathVec4Js.Vec4;
    }, function (_renderSceneIndexJs) {
      BatchingSchemes = _renderSceneIndexJs.BatchingSchemes;
    }, function (_renderSceneSceneShadowsJs) {
      ShadowType = _renderSceneSceneShadowsJs.ShadowType;
    }, function (_defineJs) {
      isEnableEffect = _defineJs.isEnableEffect;
      SetIndex = _defineJs.SetIndex;
      UBODeferredLight = _defineJs.UBODeferredLight;
      UBOForwardLight = _defineJs.UBOForwardLight;
      UBOLocal = _defineJs.UBOLocal;
    }, function (_renderPipelineJs) {
      PipelineInputAssemblerData = _renderPipelineJs.PipelineInputAssemblerData;
    }, function (_renderGraphJs) {
      Blit = _renderGraphJs.Blit;
      RasterPass = _renderGraphJs.RasterPass;
      RenderGraph = _renderGraphJs.RenderGraph;
      RenderSwapchain = _renderGraphJs.RenderSwapchain;
      ResourceDesc = _renderGraphJs.ResourceDesc;
      SceneData = _renderGraphJs.SceneData;
    }, function (_typesJs) {
      AttachmentType = _typesJs.AttachmentType;
      ComputeView = _typesJs.ComputeView;
      QueueHint = _typesJs.QueueHint;
      RasterView = _typesJs.RasterView;
      ResourceDimension = _typesJs.ResourceDimension;
      ResourceFlags = _typesJs.ResourceFlags;
      SceneFlags = _typesJs.SceneFlags;
      UpdateFrequency = _typesJs.UpdateFrequency;
    }, function (_webSceneJs) {
      WebSceneTask = _webSceneJs.WebSceneTask;
      WebSceneTransversal = _webSceneJs.WebSceneTransversal;
    }, function (_webSceneVisitorJs) {
      WebSceneVisitor = _webSceneVisitorJs.WebSceneVisitor;
    }, function (_utilsJs) {
      stringify = _utilsJs.stringify;
    }, function (_renderAdditiveLightQueueJs) {
      RenderAdditiveLightQueue = _renderAdditiveLightQueueJs.RenderAdditiveLightQueue;
    }, function (_renderShadowMapBatchedQueueJs) {
      RenderShadowMapBatchedQueue = _renderShadowMapBatchedQueueJs.RenderShadowMapBatchedQueue;
    }, function (_planarShadowQueueJs) {
      PlanarShadowQueue = _planarShadowQueueJs.PlanarShadowQueue;
    }, function (_graphJs) {
      DefaultVisitor = _graphJs.DefaultVisitor;
      depthFirstSearch = _graphJs.depthFirstSearch;
      ReferenceGraphView = _graphJs.ReferenceGraphView;
    }, function (_effectJs) {
      VectorGraphColorMap = _effectJs.VectorGraphColorMap;
    }, function (_defineJs2) {
      getDescBindingFromName = _defineJs2.getDescBindingFromName;
      getDescriptorSetDataFromLayout = _defineJs2.getDescriptorSetDataFromLayout;
      getDescriptorSetDataFromLayoutId = _defineJs2.getDescriptorSetDataFromLayoutId;
      getRenderArea = _defineJs2.getRenderArea;
      mergeSrcToTargetDesc = _defineJs2.mergeSrcToTargetDesc;
      updateGlobalDescBinding = _defineJs2.updateGlobalDescBinding;
    }, function (_renderReflectionProbeQueueJs) {
      RenderReflectionProbeQueue = _renderReflectionProbeQueueJs.RenderReflectionProbeQueue;
    }, function (_reflectionProbeManagerJs) {
      ReflectionProbeManager = _reflectionProbeManagerJs.ReflectionProbeManager;
    }, function (_assetAssetManagerBuiltinResMgrJs) {
      builtinResMgr = _assetAssetManagerBuiltinResMgrJs.builtinResMgr;
    }],
    execute: function () {
      DeviceResource = class DeviceResource {
        constructor(name) {
          this._name = void 0;
          this._name = name;
        }

        get name() {
          return this._name;
        }

      };
      DeviceTexture = class DeviceTexture extends DeviceResource {
        get texture() {
          return this._texture;
        }

        set framebuffer(val) {
          this._framebuffer = val;
        }

        get framebuffer() {
          return this._framebuffer;
        }

        get description() {
          return this._desc;
        }

        get trait() {
          return this._trait;
        }

        get swapchain() {
          return this._swapchain;
        }

        _setDesc(desc) {
          if (!this._desc) {
            this._desc = new ResourceDesc();
          }

          this._desc.alignment = desc.alignment;
          this._desc.depthOrArraySize = desc.depthOrArraySize;
          this._desc.dimension = desc.dimension;
          this._desc.flags = desc.flags;
          this._desc.format = desc.format;
          this._desc.height = desc.height;
          this._desc.mipLevels = desc.mipLevels;
          this._desc.sampleCount = desc.sampleCount;
          this._desc.textureFlags = desc.textureFlags;
          this._desc.width = desc.width;
        }

        constructor(name, tex) {
          super(name);
          this._texture = null;
          this._swapchain = null;
          this._framebuffer = null;
          this._desc = null;
          this._trait = null;
          const resGraph = context.resourceGraph;
          const verID = resGraph.vertex(name);

          this._setDesc(resGraph.getDesc(verID));

          this._trait = resGraph.getTraits(verID);

          if (tex instanceof Texture) {
            this._texture = tex;
            return;
          }

          if (tex instanceof Framebuffer) {
            this._framebuffer = tex;
            return;
          }

          if (tex instanceof RenderSwapchain) {
            this._swapchain = tex.swapchain;
            return;
          }

          const info = this._desc;
          let type = TextureType.TEX2D;

          switch (info.dimension) {
            case ResourceDimension.TEXTURE1D:
              type = TextureType.TEX1D;
              break;

            case ResourceDimension.TEXTURE2D:
              type = TextureType.TEX2D;
              break;

            case ResourceDimension.TEXTURE3D:
              type = TextureType.TEX3D;
              break;

            default:
          }

          let usageFlags = TextureUsageBit.NONE;
          if (info.flags & ResourceFlags.COLOR_ATTACHMENT) usageFlags |= TextureUsageBit.COLOR_ATTACHMENT;
          if (info.flags & ResourceFlags.DEPTH_STENCIL_ATTACHMENT) usageFlags |= TextureUsageBit.DEPTH_STENCIL_ATTACHMENT;
          if (info.flags & ResourceFlags.INPUT_ATTACHMENT) usageFlags |= TextureUsageBit.INPUT_ATTACHMENT;
          if (info.flags & ResourceFlags.SAMPLED) usageFlags |= TextureUsageBit.SAMPLED;
          if (info.flags & ResourceFlags.STORAGE) usageFlags |= TextureUsageBit.STORAGE;
          this._texture = context.device.createTexture(new TextureInfo(type, usageFlags, info.format, info.width, info.height));
        }

        release() {
          if (this.framebuffer) {
            this.framebuffer.destroy();
            this._framebuffer = null;
          }

          if (this.texture) {
            this.texture.destroy();
            this._texture = null;
          }
        }

      };
      DeviceBuffer = class DeviceBuffer extends DeviceResource {
        constructor(name) {
          super(name);
        }

      };
      _vec4Array = new Float32Array(4);
      BlitDesc = class BlitDesc {
        // If VOLUMETRIC_LIGHTING is turned on, it needs to be assigned
        get screenQuad() {
          return this._screenQuad;
        }

        get blit() {
          return this._blit;
        }

        set blit(blit) {
          this._blit = blit;
        }

        get stageDesc() {
          return this._stageDesc;
        }

        constructor(blit, queue) {
          this._isUpdate = false;
          this._isGatherLight = false;
          this._blit = void 0;
          this._screenQuad = null;
          this._queue = null;
          this._stageDesc = void 0;
          this._lightVolumeBuffer = null;
          this._lightMeterScale = 10000.0;
          this._blit = blit;
          this._queue = queue;
        }
        /**
         * @zh
         * 创建四边形输入汇集器。
         */


        _createQuadInputAssembler() {
          return context.blit.pipelineIAData;
        }

        createScreenQuad() {
          if (!this._screenQuad) {
            this._screenQuad = this._createQuadInputAssembler();
          }
        }

        _gatherVolumeLights(camera) {
          if (!camera.scene) {
            return;
          }

          const pipeline = context.pipeline;
          const cmdBuff = context.commandBuffer;
          const sphereLights = camera.scene.sphereLights;
          const spotLights = camera.scene.spotLights;

          const _sphere = Sphere.create(0, 0, 0, 1);

          const exposure = camera.exposure;
          let idx = 0;
          const maxLights = UBODeferredLight.LIGHTS_PER_PASS;
          const elementLen = Vec4.length; // sizeof(vec4) / sizeof(float32)

          const fieldLen = elementLen * maxLights;

          for (let i = 0; i < sphereLights.length && idx < maxLights; i++, ++idx) {
            const light = sphereLights[i];
            Sphere.set(_sphere, light.position.x, light.position.y, light.position.z, light.range);

            if (intersect.sphereFrustum(_sphere, camera.frustum)) {
              // cc_lightPos
              Vec3.toArray(_vec4Array, light.position);
              _vec4Array[3] = 0;

              this._lightBufferData.set(_vec4Array, idx * elementLen); // cc_lightColor


              Vec3.toArray(_vec4Array, light.color);

              if (light.useColorTemperature) {
                const tempRGB = light.colorTemperatureRGB;
                _vec4Array[0] *= tempRGB.x;
                _vec4Array[1] *= tempRGB.y;
                _vec4Array[2] *= tempRGB.z;
              }

              if (pipeline.pipelineSceneData.isHDR) {
                _vec4Array[3] = light.luminance * exposure * this._lightMeterScale;
              } else {
                _vec4Array[3] = light.luminance;
              }

              this._lightBufferData.set(_vec4Array, idx * elementLen + fieldLen * 1); // cc_lightSizeRangeAngle


              _vec4Array[0] = light.size;
              _vec4Array[1] = light.range;
              _vec4Array[2] = 0.0;

              this._lightBufferData.set(_vec4Array, idx * elementLen + fieldLen * 2);
            }
          }

          for (let i = 0; i < spotLights.length && idx < maxLights; i++, ++idx) {
            const light = spotLights[i];
            Sphere.set(_sphere, light.position.x, light.position.y, light.position.z, light.range);

            if (intersect.sphereFrustum(_sphere, camera.frustum)) {
              // cc_lightPos
              Vec3.toArray(_vec4Array, light.position);
              _vec4Array[3] = 1;

              this._lightBufferData.set(_vec4Array, idx * elementLen + fieldLen * 0); // cc_lightColor


              Vec3.toArray(_vec4Array, light.color);

              if (light.useColorTemperature) {
                const tempRGB = light.colorTemperatureRGB;
                _vec4Array[0] *= tempRGB.x;
                _vec4Array[1] *= tempRGB.y;
                _vec4Array[2] *= tempRGB.z;
              }

              if (pipeline.pipelineSceneData.isHDR) {
                _vec4Array[3] = light.luminance * exposure * this._lightMeterScale;
              } else {
                _vec4Array[3] = light.luminance;
              }

              this._lightBufferData.set(_vec4Array, idx * elementLen + fieldLen * 1); // cc_lightSizeRangeAngle


              _vec4Array[0] = light.size;
              _vec4Array[1] = light.range;
              _vec4Array[2] = light.spotAngle;

              this._lightBufferData.set(_vec4Array, idx * elementLen + fieldLen * 2); // cc_lightDir


              Vec3.toArray(_vec4Array, light.direction);

              this._lightBufferData.set(_vec4Array, idx * elementLen + fieldLen * 3);
            }
          } // the count of lights is set to cc_lightDir[0].w


          const offset = fieldLen * 3 + 3;

          this._lightBufferData.set([idx], offset);

          cmdBuff.updateBuffer(this._lightVolumeBuffer, this._lightBufferData);
        }

        update() {
          if (this.blit.sceneFlags & SceneFlags.VOLUMETRIC_LIGHTING && this.blit.camera && !this._isGatherLight) {
            this._gatherVolumeLights(this.blit.camera);

            this._isGatherLight = true;
            this._isUpdate = false;
          }

          if (!this._isUpdate) {
            this._stageDesc.update();

            this._isUpdate = true;
          }
        }

        reset() {
          this._isUpdate = false;
          this._isGatherLight = false;
        }

        createStageDescriptor() {
          const blit = this.blit;
          const pass = blit.material.passes[blit.passID];
          const device = context.device;
          this._stageDesc = context.blit.stageDescs.get(pass);

          if (!this._stageDesc) {
            this._stageDesc = device.createDescriptorSet(new DescriptorSetInfo(pass.localSetLayout));
            context.blit.stageDescs.set(pass, this._stageDesc);
          }

          if (this.blit.sceneFlags & SceneFlags.VOLUMETRIC_LIGHTING) {
            this._lightVolumeBuffer = context.blit.lightVolumeBuffer;
            const deferredLitsBufView = context.blit.deferredLitsBufView;
            this._lightBufferData = context.blit.lightBufferData;

            this._lightBufferData.fill(0);

            const binding = isEnableEffect() ? getDescBindingFromName('CCForwardLight') : UBOForwardLight.BINDING;

            this._stageDesc.bindBuffer(UBOForwardLight.BINDING, deferredLitsBufView);
          }

          this._stageDesc.bindBuffer(UBOLocal.BINDING, context.blit.emptyLocalUBO);
        }

      };
      DeviceRenderQueue = class DeviceRenderQueue {
        constructor() {
          this._preSceneTasks = [];
          this._sceneTasks = [];
          this._postSceneTasks = [];
          this._devicePass = void 0;
          this._hint = QueueHint.NONE;
          this._phaseID = getPhaseID('default');
          this._renderPhase = null;
          this._descSetData = null;
          this._layoutID = -1;
          this._isUpdateUBO = false;
          this._isUploadInstance = false;
          this._isUploadBatched = false;
          this._transversal = null;
          this._sceneVisitor = void 0;
          this._blitDesc = null;
          this._queueId = -1;
        }

        get phaseID() {
          return this._phaseID;
        }

        set layoutID(value) {
          this._layoutID = value;
          const layoutGraph = context.layoutGraph;
          this._renderPhase = layoutGraph.tryGetRenderPhase(value);
          const layout = layoutGraph.getLayout(value);
          this._descSetData = layout.descriptorSets.get(UpdateFrequency.PER_PHASE);
        }

        get layoutID() {
          return this._layoutID;
        }

        get descSetData() {
          return this._descSetData;
        }

        get renderPhase() {
          return this._renderPhase;
        }

        set queueId(val) {
          this._queueId = val;
        }

        get queueId() {
          return this._queueId;
        }

        set isUpdateUBO(update) {
          this._isUpdateUBO = update;
        }

        get isUpdateUBO() {
          return this._isUpdateUBO;
        }

        set isUploadInstance(value) {
          this._isUploadInstance = value;
        }

        get isUploadInstance() {
          return this._isUploadInstance;
        }

        set isUploadBatched(value) {
          this._isUploadBatched = value;
        }

        get isUploadBatched() {
          return this._isUploadBatched;
        }

        init(devicePass, queueHint, id) {
          this.reset();
          this.queueHint = queueHint;
          this.queueId = id;
          this._devicePass = devicePass;
          if (isEnableEffect()) this._phaseID = cclegacy.rendering.getPhaseID(devicePass.passID, context.renderGraph.getLayout(id) || 'default');

          if (!this._sceneVisitor) {
            this._sceneVisitor = new WebSceneVisitor(context.commandBuffer, context.pipeline.pipelineSceneData);
          }
        }

        createBlitDesc(blit) {
          if (!this._blitDesc) {
            this._blitDesc = new BlitDesc(blit, this);
          }

          this._blitDesc.createScreenQuad();

          this._blitDesc.createStageDescriptor();
        }

        addSceneTask(scene) {
          if (!this._transversal) {
            this._transversal = new DeviceSceneTransversal(this, context.pipelineSceneData, scene);
          }

          this._transversal.graphScene = scene;

          this._preSceneTasks.push(this._transversal.preRenderPass(this._sceneVisitor));

          this._sceneTasks.push(this._transversal.transverse(this._sceneVisitor));
        }

        reset() {
          var _this$_blitDesc;

          this._postSceneTasks.length = this._preSceneTasks.length = this._sceneTasks.length = 0;
          this._isUpdateUBO = false;
          this._isUploadInstance = false;
          this._isUploadBatched = false;
          (_this$_blitDesc = this._blitDesc) === null || _this$_blitDesc === void 0 ? void 0 : _this$_blitDesc.reset();
        }

        get blitDesc() {
          return this._blitDesc;
        }

        get sceneTasks() {
          return this._sceneTasks;
        }

        set queueHint(value) {
          this._hint = value;
        }

        get queueHint() {
          return this._hint;
        }

        get devicePass() {
          return this._devicePass;
        }

        get preSceneTasks() {
          return this._preSceneTasks;
        }

        preRecord() {
          for (const task of this._preSceneTasks) {
            task.start();
            task.join();
            task.submit();
          }
        }

        record() {
          if (this._descSetData && this._descSetData.descriptorSet) {
            context.commandBuffer.bindDescriptorSet(SetIndex.COUNT, this._descSetData.descriptorSet);
          }

          for (const task of this._sceneTasks) {
            task.start();
            task.join();
            task.submit();
          }
        }

        postRecord() {
          for (const task of this._postSceneTasks) {
            task.start();
            task.join();
            task.submit();
          }
        }

      };
      SubmitInfo = class SubmitInfo {
        constructor() {
          this.instances = new Set();
          this.renderInstanceQueue = [];
          this.batches = new Set();
          this.opaqueList = [];
          this.transparentList = [];
          this.planarQueue = null;
          this.shadowMap = null;
          this.additiveLight = null;
          this.reflectionProbe = null;
        }

        reset() {
          this.instances.clear();
          this.renderInstanceQueue.length = 0;
          this.batches.clear();
          this.opaqueList.length = 0;
          this.transparentList.length = 0;
          this.planarQueue = null;
          this.shadowMap = null;
          this.additiveLight = null;
          this.reflectionProbe = null;
        }

      };
      RenderPassLayoutInfo = class RenderPassLayoutInfo {
        constructor(layoutId, input) {
          this._layoutID = 0;
          this._stage = null;
          this._layout = void 0;
          this._inputName = void 0;
          this._descriptorSet = null;
          this._inputName = input[0];
          this._layoutID = layoutId;
          const lg = context.layoutGraph;
          this._stage = lg.getRenderStage(layoutId);
          this._layout = lg.getLayout(layoutId);

          const layoutData = this._layout.descriptorSets.get(UpdateFrequency.PER_PASS);

          const globalDesc = context.pipeline.descriptorSet;

          if (layoutData) {
            // find resource
            const deviceTex = context.deviceTextures.get(this._inputName);
            const gfxTex = deviceTex === null || deviceTex === void 0 ? void 0 : deviceTex.texture;
            const layoutDesc = layoutData.descriptorSet;

            if (!gfxTex) {
              throw Error(`Could not find texture with resource name ${this._inputName}`);
            }

            const resId = context.resourceGraph.vertex(this._inputName);
            const samplerInfo = context.resourceGraph.getSampler(resId); // bind descriptors

            for (const descriptor of input[1]) {
              const descriptorName = descriptor.name;
              const descriptorID = lg.attributeIndex.get(descriptorName); // find descriptor binding

              for (const block of layoutData.descriptorSetLayoutData.descriptorBlocks) {
                for (let i = 0; i !== block.descriptors.length; ++i) {
                  // const buffer = layoutDesc.getBuffer(block.offset + i);
                  // const texture = layoutDesc.getTexture(block.offset + i);
                  if (descriptorID === block.descriptors[i].descriptorID) {
                    layoutDesc.bindTexture(block.offset + i, gfxTex);
                    layoutDesc.bindSampler(block.offset + i, context.device.getSampler(samplerInfo));
                    if (!this._descriptorSet) this._descriptorSet = layoutDesc;
                    continue;
                  } // if (!buffer && !texture) {
                  //     layoutDesc.bindBuffer(block.offset + i, globalDesc.getBuffer(block.offset + i));
                  //     layoutDesc.bindTexture(block.offset + i, globalDesc.getTexture(block.offset + i));
                  //     layoutDesc.bindSampler(block.offset + i, globalDesc.getSampler(block.offset + i));
                  // }

                }
              }
            }
          }
        }

        get descriptorSet() {
          return this._descriptorSet;
        }

        get layoutID() {
          return this._layoutID;
        }

        get stage() {
          return this._stage;
        }

        get layout() {
          return this._layout;
        }

      };
      RasterPassInfo = class RasterPassInfo {
        get id() {
          return this._id;
        }

        get pass() {
          return this._pass;
        }

        _copyPass(pass) {
          const rasterPass = this._pass || new RasterPass();
          rasterPass.width = pass.width;
          rasterPass.height = pass.height;
          rasterPass.versionName = pass.versionName;
          rasterPass.version = pass.version;
          rasterPass.showStatistics = pass.showStatistics;
          rasterPass.viewport.copy(pass.viewport);

          for (const val of pass.rasterViews) {
            const currRasterKey = val[0];
            const currRasterView = val[1];
            const rasterView = rasterPass.rasterViews.get(currRasterKey) || new RasterView();
            rasterView.slotName = currRasterView.slotName;
            rasterView.accessType = currRasterView.accessType;
            rasterView.attachmentType = currRasterView.attachmentType;
            rasterView.loadOp = currRasterView.loadOp;
            rasterView.storeOp = currRasterView.storeOp;
            rasterView.clearFlags = currRasterView.clearFlags;
            rasterView.slotID = currRasterView.slotID;
            rasterView.clearColor.copy(currRasterView.clearColor);
            rasterPass.rasterViews.set(currRasterKey, rasterView);
          }

          for (const val of pass.computeViews) {
            const currComputeViews = val[1];
            const currComputeKey = val[0];
            const computeViews = rasterPass.computeViews.get(currComputeKey) || [];
            if (computeViews.length) computeViews.length = currComputeViews.length;
            let idx = 0;

            for (const currComputeView of currComputeViews) {
              const computeView = computeViews[idx] || new ComputeView();
              computeView.name = currComputeView.name;
              computeView.accessType = currComputeView.accessType;
              computeView.clearFlags = currComputeView.clearFlags;
              computeView.clearColor.copy(currComputeView.clearColor);
              computeView.clearValueType = currComputeView.clearValueType;
              computeViews[idx] = computeView;
              idx++;
            }

            rasterPass.computeViews.set(currComputeKey, computeViews);
          }

          this._pass = rasterPass;
        }

        applyInfo(id, pass) {
          this._id = id;

          this._copyPass(pass);
        }

      };
      profilerViewport = new Viewport();
      renderPassArea = new Rect();
      DeviceRenderPass = class DeviceRenderPass {
        constructor(passInfo) {
          this._renderPass = void 0;
          this._framebuffer = void 0;
          this._clearColor = [];
          this._deviceQueues = [];
          this._clearDepth = 1;
          this._clearStencil = 0;
          this._passID = void 0;
          this._layoutName = void 0;
          this._viewport = null;
          this._rasterInfo = void 0;
          this._layout = null;
          this._rasterInfo = passInfo;
          const device = context.device;
          this._layoutName = context.renderGraph.getLayout(passInfo.id);
          this._passID = cclegacy.rendering.getPassID(this._layoutName);
          const depthStencilAttachment = new DepthStencilAttachment();
          depthStencilAttachment.format = Format.DEPTH_STENCIL;
          depthStencilAttachment.depthLoadOp = LoadOp.DISCARD;
          depthStencilAttachment.stencilLoadOp = LoadOp.DISCARD;
          depthStencilAttachment.stencilStoreOp = StoreOp.DISCARD;
          depthStencilAttachment.depthStoreOp = StoreOp.DISCARD;
          const colors = [];
          const colorTexs = [];
          let depthTex = null;
          let swapchain = null;
          let framebuffer = null;

          for (const cv of passInfo.pass.computeViews) {
            this._applyRenderLayout(cv);
          } // update the layout descriptorSet


          if (this.renderLayout && this.renderLayout.descriptorSet) {
            this.renderLayout.descriptorSet.update();
          }

          for (const [resName, rasterV] of passInfo.pass.rasterViews) {
            let resTex = context.deviceTextures.get(resName);

            if (!resTex) {
              const resourceGraph = context.resourceGraph;
              const vertId = resourceGraph.vertex(resName);
              const resourceVisitor = new ResourceVisitor(resName);
              resourceGraph.visitVertex(resourceVisitor, vertId);
              resTex = context.deviceTextures.get(resName);
            } else {
              const resGraph = context.resourceGraph;
              const resId = resGraph.vertex(resName);
              const resFbo = resGraph._vertices[resId]._object;

              if (resTex.framebuffer && resFbo instanceof Framebuffer && resTex.framebuffer !== resFbo) {
                resTex.framebuffer = resFbo;
              }
            }

            if (!swapchain) swapchain = resTex.swapchain;
            if (!framebuffer) framebuffer = resTex.framebuffer;
            const clearFlag = rasterV.clearFlags & 0xffffffff;

            switch (rasterV.attachmentType) {
              case AttachmentType.RENDER_TARGET:
                {
                  if (!resTex.swapchain && !resTex.framebuffer) colorTexs.push(resTex.texture);
                  const colorAttachment = new ColorAttachment();
                  colorAttachment.format = resTex.description.format;
                  colorAttachment.sampleCount = resTex.description.sampleCount;
                  colorAttachment.loadOp = rasterV.loadOp;
                  colorAttachment.storeOp = rasterV.storeOp;
                  colorAttachment.barrier = device.getGeneralBarrier(new GeneralBarrierInfo(rasterV.loadOp === LoadOp.LOAD ? AccessFlagBit.COLOR_ATTACHMENT_WRITE : AccessFlagBit.NONE, rasterV.storeOp === StoreOp.STORE ? AccessFlagBit.COLOR_ATTACHMENT_WRITE : AccessFlagBit.NONE));

                  this._clearColor.push(rasterV.clearColor);

                  colors.push(colorAttachment);
                }
                break;

              case AttachmentType.DEPTH_STENCIL:
                depthStencilAttachment.depthStoreOp = rasterV.storeOp;
                depthStencilAttachment.stencilStoreOp = rasterV.storeOp;
                depthStencilAttachment.depthLoadOp = rasterV.loadOp;
                depthStencilAttachment.stencilLoadOp = rasterV.loadOp;
                depthStencilAttachment.barrier = device.getGeneralBarrier(new GeneralBarrierInfo(rasterV.loadOp === LoadOp.LOAD ? AccessFlagBit.DEPTH_STENCIL_ATTACHMENT_WRITE : AccessFlagBit.NONE, rasterV.storeOp === StoreOp.STORE ? AccessFlagBit.DEPTH_STENCIL_ATTACHMENT_WRITE : AccessFlagBit.NONE));
                if (!resTex.swapchain && !resTex.framebuffer) depthTex = resTex.texture;
                this._clearDepth = rasterV.clearColor.x;
                this._clearStencil = rasterV.clearColor.y;
                break;

              case AttachmentType.SHADING_RATE:
                // noop
                break;

              default:
            }
          }

          if (colors.length === 0) {
            const colorAttachment = new ColorAttachment();
            colors.push(colorAttachment);
          }

          if (colorTexs.length === 0 && !swapchain && !framebuffer) {
            const currTex = device.createTexture(new TextureInfo());
            colorTexs.push(currTex);
          } // if (!depthTex && !swapchain && !framebuffer) {
          //     depthTex = device.createTexture(new TextureInfo(
          //         TextureType.TEX2D,
          //         TextureUsageBit.DEPTH_STENCIL_ATTACHMENT | TextureUsageBit.SAMPLED,
          //         Format.DEPTH_STENCIL,
          //         colorTexs[0].width,
          //         colorTexs[0].height,
          //     ));
          // }


          this._renderPass = device.createRenderPass(new RenderPassInfo(colors, depthStencilAttachment));
          this._framebuffer = framebuffer || device.createFramebuffer(new FramebufferInfo(this._renderPass, swapchain ? [swapchain.colorTexture] : colorTexs, swapchain ? swapchain.depthStencilTexture : depthTex));
        }

        get layoutName() {
          return this._layoutName;
        }

        get passID() {
          return this._passID;
        }

        get renderLayout() {
          return this._layout;
        }

        get renderPass() {
          return this._renderPass;
        }

        get framebuffer() {
          return this._framebuffer;
        }

        get clearColor() {
          return this._clearColor;
        }

        get clearDepth() {
          return this._clearDepth;
        }

        get clearStencil() {
          return this._clearStencil;
        }

        get deviceQueues() {
          return this._deviceQueues;
        }

        get rasterPassInfo() {
          return this._rasterInfo;
        }

        get viewport() {
          return this._viewport;
        }

        addQueue(queue) {
          this._deviceQueues.push(queue);
        }

        prePass() {
          for (const queue of this._deviceQueues) {
            queue.preRecord();
          }
        }

        _applyRenderLayout(input) {
          const stageName = context.renderGraph.getLayout(this.rasterPassInfo.id);

          if (stageName) {
            const layoutGraph = context.layoutGraph;
            const stageId = layoutGraph.locateChild(layoutGraph.nullVertex(), stageName);

            if (stageId !== 0xFFFFFFFF) {
              this._layout = new RenderPassLayoutInfo(stageId, input);
            }
          }
        }

        getGlobalDescData() {
          const stageId = context.layoutGraph.locateChild(context.layoutGraph.nullVertex(), 'default');
          assert(stageId !== 0xFFFFFFFF);
          const layout = context.layoutGraph.getLayout(stageId);
          const layoutData = layout.descriptorSets.get(UpdateFrequency.PER_PASS);
          return layoutData;
        }

        _applyViewport(frameTex) {
          this._viewport = null;
          const viewport = this._rasterInfo.pass.viewport;

          if (viewport.left !== 0 || viewport.top !== 0 || viewport.width !== 0 || viewport.height !== 0) {
            this._viewport = viewport;
          }
        }

        _showProfiler(rect) {
          const profiler = context.pipeline.profiler;

          if (!profiler || !profiler.enabled) {
            return;
          }

          const renderPass = this._renderPass;
          const cmdBuff = context.commandBuffer;
          const submodel = profiler.subModels[0];
          const pass = submodel.passes[0];
          const ia = submodel.inputAssembler;
          const device = context.device;
          const pso = PipelineStateManager.getOrCreatePipelineState(device, pass, submodel.shaders[0], renderPass, ia);
          const descData = getDescriptorSetDataFromLayoutId(pass.passID);
          mergeSrcToTargetDesc(descData.descriptorSet, context.pipeline.descriptorSet, true);
          profilerViewport.width = rect.width;
          profilerViewport.height = rect.height;
          cmdBuff.setViewport(profilerViewport);
          cmdBuff.setScissor(rect);
          cmdBuff.bindPipelineState(pso);
          cmdBuff.bindDescriptorSet(SetIndex.MATERIAL, pass.descriptorSet);
          cmdBuff.bindDescriptorSet(SetIndex.LOCAL, submodel.descriptorSet);
          cmdBuff.bindInputAssembler(ia);
          cmdBuff.draw(ia);
        } // record common buffer


        record() {
          const tex = this.framebuffer.colorTextures[0];

          this._applyViewport(tex);

          const cmdBuff = context.commandBuffer;

          if (this._viewport) {
            renderPassArea.x = this._viewport.left;
            renderPassArea.y = this._viewport.top;
            renderPassArea.width = this._viewport.width;
            renderPassArea.height = this._viewport.height;
          } else {
            renderPassArea.y = renderPassArea.x = 0;
            renderPassArea.width = tex.width;
            renderPassArea.height = tex.height;
          }

          cmdBuff.beginRenderPass(this.renderPass, this.framebuffer, renderPassArea, this.clearColor, this.clearDepth, this.clearStencil);
          cmdBuff.bindDescriptorSet(SetIndex.GLOBAL, context.pipeline.descriptorSet);

          for (const queue of this._deviceQueues) {
            queue.record();
          }

          if (this._rasterInfo.pass.showStatistics) {
            this._showProfiler(renderPassArea);
          }

          cmdBuff.endRenderPass();
        }

        _clear() {
          for (const [cam, infoMap] of context.submitMap) {
            for (const [id, info] of infoMap) {
              var _info$additiveLight;

              (_info$additiveLight = info.additiveLight) === null || _info$additiveLight === void 0 ? void 0 : _info$additiveLight.clear();
              const it = info.instances.values();
              let res = it.next();

              while (!res.done) {
                res.value.clear();
                res = it.next();
              }

              info.renderInstanceQueue = [];
              info.instances.clear();
            }
          }
        }

        postPass() {
          this._clear(); // this.submitMap.clear();


          for (const queue of this._deviceQueues) {
            queue.postRecord();
          }
        }

        resetResource(id, pass) {
          this._rasterInfo.applyInfo(id, pass);

          this._deviceQueues.length = 0;
          let framebuffer = null;
          const colTextures = [];
          let depTexture = this._framebuffer.depthStencilTexture;

          for (const cv of this._rasterInfo.pass.computeViews) {
            this._applyRenderLayout(cv);
          } // update the layout descriptorSet


          if (this.renderLayout && this.renderLayout.descriptorSet) {
            this.renderLayout.descriptorSet.update();
          }

          for (const [resName, rasterV] of this._rasterInfo.pass.rasterViews) {
            const deviceTex = context.deviceTextures.get(resName);
            const resGraph = context.resourceGraph;
            const resId = resGraph.vertex(resName);
            const resFbo = resGraph._vertices[resId]._object;
            const resDesc = resGraph.getDesc(resId);

            if (deviceTex.framebuffer && resFbo instanceof Framebuffer && deviceTex.framebuffer !== resFbo) {
              framebuffer = this._framebuffer = deviceTex.framebuffer = resFbo;
            } else if (deviceTex.texture && (deviceTex.texture.width !== resDesc.width || deviceTex.texture.height !== resDesc.height)) {
              deviceTex.texture.resize(resDesc.width, resDesc.height);

              switch (rasterV.attachmentType) {
                case AttachmentType.RENDER_TARGET:
                  colTextures.push(deviceTex.texture);
                  break;

                case AttachmentType.DEPTH_STENCIL:
                  depTexture = deviceTex.texture;
                  break;

                case AttachmentType.SHADING_RATE:
                  // noop
                  break;

                default:
              }
            }
          }

          if (!framebuffer && colTextures.length) {
            this._framebuffer.destroy();

            this._framebuffer = context.device.createFramebuffer(new FramebufferInfo(this._renderPass, colTextures, depTexture));
          }
        }

      };
      DeviceSceneTransversal = class DeviceSceneTransversal extends WebSceneTransversal {
        constructor(quque, sceneData, graphSceneData) {
          const camera = graphSceneData.scene ? graphSceneData.scene.camera : null;
          super(camera, sceneData, context.ubo);
          this._currentQueue = void 0;
          this._graphScene = void 0;
          this._preSceneTask = void 0;
          this._sceneTask = void 0;
          this._postSceneTask = void 0;
          this._currentQueue = quque;
          this._graphScene = graphSceneData;
        }

        set graphScene(graphScene) {
          this._graphScene = graphScene;
          this._camera = graphScene.scene ? graphScene.scene.camera : null;
          if (this._camera) this._scene = this._camera.scene;
        }

        get graphScene() {
          return this._graphScene;
        }

        preRenderPass(visitor) {
          if (!this._preSceneTask) {
            this._preSceneTask = new DevicePreSceneTask(this._currentQueue, this._graphScene, visitor);
          }

          this._preSceneTask.apply(this._currentQueue, this.graphScene);

          return this._preSceneTask;
        }

        transverse(visitor) {
          if (!this._sceneTask) {
            this._sceneTask = new DeviceSceneTask(this._currentQueue, this._graphScene, visitor);
          }

          this._sceneTask.apply(this._currentQueue, this.graphScene);

          return this._sceneTask;
        }

        postRenderPass(visitor) {
          if (!this._postSceneTask) {
            this._postSceneTask = new DevicePostSceneTask(this._sceneData, context.ubo, this._camera, visitor);
          }

          return this._postSceneTask;
        }

      };
      GraphScene = class GraphScene {
        constructor() {
          this.scene = null;
          this.blit = null;
          this.dispatch = null;
          this.sceneID = -1;
        }

        _copyScene(scene) {
          if (scene) {
            if (!this.scene) {
              this.scene = new SceneData();
            }

            this.scene.name = scene.name;
            this.scene.light.level = scene.light.level;
            this.scene.light.light = scene.light.light;
            this.scene.flags = scene.flags;
            this.scene.camera = scene.camera;
            this.scene.scenes.length = 0;

            for (let i = 0; i < scene.scenes.length; i++) {
              this.scene.scenes[i] = scene.scenes[i];
            }

            return;
          }

          this.scene = null;
        }

        _copyBlit(blit) {
          if (blit) {
            if (!this.blit) {
              this.blit = new Blit(blit.material, blit.passID, blit.sceneFlags, blit.camera);
            }

            this.blit.material = blit.material;
            this.blit.passID = blit.passID;
            this.blit.sceneFlags = blit.sceneFlags;
            this.blit.camera = blit.camera;
            return;
          }

          this.blit = null;
        }

        init(scene, blit, sceneID) {
          this._copyScene(scene);

          this._copyBlit(blit);

          this.sceneID = sceneID;
        }

      };
      DevicePreSceneTask = class DevicePreSceneTask extends WebSceneTask {
        constructor(queue, graphScene, visitor) {
          super(context.pipelineSceneData, context.ubo, graphScene.scene && graphScene.scene.camera ? graphScene.scene.camera : null, visitor);
          this._currentQueue = void 0;
          this._renderPass = void 0;
          this._submitInfo = null;
          this._graphScene = void 0;
          this._cmdBuff = void 0;
          this._currentQueue = queue;
          this._graphScene = graphScene;
          this._renderPass = queue.devicePass.renderPass;
          this._cmdBuff = context.commandBuffer;
        }

        apply(queue, graphScene) {
          this._currentQueue = queue;
          this._graphScene = graphScene;
          this._renderPass = queue.devicePass.renderPass;
          this._cmdBuff = context.commandBuffer;
          const camera = graphScene.scene && graphScene.scene.camera ? graphScene.scene.camera : null;

          if (camera) {
            this._scene = camera.scene;
            this._camera = camera;
          }
        }

        get graphScene() {
          return this._graphScene;
        }

        start() {
          if (this.graphScene.blit) {
            this._currentQueue.createBlitDesc(this.graphScene.blit);

            return;
          }

          if (!this.camera) {
            return;
          }

          const devicePass = this._currentQueue.devicePass;
          const submitMap = context.submitMap;
          let submitInfoMap = submitMap.get(this.camera);

          if (submitInfoMap && submitInfoMap.has(this._currentQueue.phaseID)) {
            this._submitInfo = submitInfoMap.get(this._currentQueue.phaseID);
          } else {
            if (!submitInfoMap) {
              submitInfoMap = new Map();
              submitMap.set(this.camera, submitInfoMap);
            }

            this._submitInfo = new SubmitInfo();
            submitInfoMap.set(this._currentQueue.phaseID, this._submitInfo);
          } // culling


          if ((!this._isShadowMap() || this._isShadowMap() && this.graphScene.scene.light.level === 0) && this.camera !== context.cullCamera) {
            super.start();
            context.cullCamera = this.camera;
          } // shadowmap


          if (this._isShadowMap()) {
            assert(this.graphScene.scene.light.light);

            if (!this._submitInfo.shadowMap) {
              this._submitInfo.shadowMap = context.shadowMapBatched;
            }

            this.sceneData.shadowFrameBufferMap.set(this.graphScene.scene.light.light, devicePass.framebuffer);

            this._submitInfo.shadowMap.gatherLightPasses(this.camera, this.graphScene.scene.light.light, this._cmdBuff, this.graphScene.scene.light.level);

            return;
          } // reflection probe


          if (this.graphScene.scene.flags & SceneFlags.REFLECTION_PROBE && !this._submitInfo.reflectionProbe) {
            this._submitInfo.reflectionProbe = context.pools.addReflectionProbe();

            this._submitInfo.reflectionProbe.clear();

            const probes = ReflectionProbeManager.probeManager.getProbes();

            for (let i = 0; i < probes.length; i++) {
              if (probes[i].hasFrameBuffer(this._currentQueue.devicePass.framebuffer)) {
                this._submitInfo.reflectionProbe.gatherRenderObjects(probes[i], this.camera, this._cmdBuff);

                break;
              }
            }

            return;
          }

          const sceneFlag = this._graphScene.scene.flags; // If it is not empty, it means that it has been added and will not be traversed.

          const isEmpty = !this._submitInfo.opaqueList.length && !this._submitInfo.transparentList.length && !this._submitInfo.instances.size && !this._submitInfo.batches.size;

          if (isEmpty) {
            for (const ro of this.sceneData.renderObjects) {
              const subModels = ro.model.subModels;

              for (const subModel of subModels) {
                const passes = subModel.passes;

                for (const p of passes) {
                  if ((isEnableEffect() ? p.phaseID : p.phase) !== this._currentQueue.phaseID) continue;
                  const batchingScheme = p.batchingScheme;

                  if (batchingScheme === BatchingSchemes.INSTANCING) {
                    const instancedBuffer = p.getInstancedBuffer();
                    instancedBuffer.merge(subModel, passes.indexOf(p));

                    this._submitInfo.instances.add(instancedBuffer);
                  } else if (batchingScheme === BatchingSchemes.VB_MERGING) {
                    const batchedBuffer = p.getBatchedBuffer();
                    batchedBuffer.merge(subModel, passes.indexOf(p), ro.model);

                    this._submitInfo.batches.add(batchedBuffer);
                  } else {
                    this._insertRenderList(ro, subModels.indexOf(subModel), passes.indexOf(p));

                    this._insertRenderList(ro, subModels.indexOf(subModel), passes.indexOf(p), true);
                  }
                }
              }
            }

            this._instancedSort();
          }

          if (sceneFlag & SceneFlags.DEFAULT_LIGHTING) {
            this._submitInfo.additiveLight = context.additiveLight;

            this._submitInfo.additiveLight.gatherLightPasses(this.camera, this._cmdBuff, this._currentQueue.devicePass.layoutName);
          }

          if (sceneFlag & SceneFlags.PLANAR_SHADOW) {
            this._submitInfo.planarQueue = context.planarShadow;

            this._submitInfo.planarQueue.gatherShadowPasses(this.camera, this._cmdBuff);
          }

          if (sceneFlag & SceneFlags.OPAQUE_OBJECT) {
            this._submitInfo.opaqueList.sort(this._opaqueCompareFn);
          }

          if (sceneFlag & SceneFlags.TRANSPARENT_OBJECT) {
            this._submitInfo.transparentList.sort(this._transparentCompareFn);
          }
        }

        _instancedSort() {
          let it = this._submitInfo.instances.values();

          let res = it.next();

          while (!res.done) {
            if (!res.value.pass.blendState.targets[0].blend) {
              this._submitInfo.renderInstanceQueue.push(res.value);
            }

            res = it.next();
          }

          it = this._submitInfo.renderInstanceQueue.values();
          res = it.next();

          while (!res.done) {
            if (res.value.pass.blendState.targets[0].blend) {
              this._submitInfo.renderInstanceQueue.push(res.value);
            }

            res = it.next();
          }
        }

        _insertRenderList(ro, subModelIdx, passIdx, isTransparent = false) {
          const subModel = ro.model.subModels[subModelIdx];
          const pass = subModel.passes[passIdx];
          const shader = subModel.shaders[passIdx];
          const currTransparent = pass.blendState.targets[0].blend;
          const devicePass = this._currentQueue.devicePass;
          const passId = devicePass.passID;
          const phase = isEnableEffect() ? this._currentQueue.phaseID // | cclegacy.rendering.getPhaseID(passId, 'planarShadow')
          : getPhaseID('default') | getPhaseID('planarShadow');

          if (currTransparent !== isTransparent || !(pass.phaseID & (isTransparent ? phase : this._currentQueue.phaseID))) {
            return;
          }

          const hash = 0 << 30 | pass.priority << 16 | subModel.priority << 8 | passIdx;
          const rp = context.pools.addPassInfo();
          rp.priority = ro.model.priority;
          rp.hash = hash;
          rp.depth = ro.depth || 0;
          rp.shaderId = shader.typedID;
          rp.subModel = subModel;
          rp.passIdx = passIdx;
          if (isTransparent) this._submitInfo.transparentList.push(rp);else this._submitInfo.opaqueList.push(rp);
        }
        /**
         * @en Comparison sorting function. Opaque objects are sorted by priority -> depth front to back -> shader ID.
         * @zh 比较排序函数。不透明对象按优先级 -> 深度由前向后 -> Shader ID 顺序排序。
         */


        _opaqueCompareFn(a, b) {
          return a.hash - b.hash || a.depth - b.depth || a.shaderId - b.shaderId;
        }
        /**
         * @en Comparison sorting function. Transparent objects are sorted by priority -> depth back to front -> shader ID.
         * @zh 比较排序函数。半透明对象按优先级 -> 深度由后向前 -> Shader ID 顺序排序。
         */


        _transparentCompareFn(a, b) {
          return a.priority - b.priority || a.hash - b.hash || b.depth - a.depth || a.shaderId - b.shaderId;
        }

        _uploadInstanceBuffers() {
          if (this._currentQueue.isUploadInstance) return;

          const it = this._submitInfo.instances.values();

          let res = it.next();

          while (!res.done) {
            if (res.value.hasPendingModels) res.value.uploadBuffers(this._cmdBuff);
            res = it.next();
          }

          this._currentQueue.isUploadInstance = true;
        }

        _uploadBatchedBuffers() {
          if (this._currentQueue.isUploadBatched) return;

          const it = this._submitInfo.batches.values();

          let res = it.next();

          while (!res.done) {
            for (let b = 0; b < res.value.batches.length; ++b) {
              const batch = res.value.batches[b];

              if (!batch.mergeCount) {
                continue;
              }

              for (let v = 0; v < batch.vbs.length; ++v) {
                batch.vbs[v].update(batch.vbDatas[v]);
              }

              this._cmdBuff.updateBuffer(batch.vbIdx, batch.vbIdxData.buffer);

              this._cmdBuff.updateBuffer(batch.ubo, batch.uboData);
            }

            res = it.next();
          }

          this._currentQueue.isUploadBatched = true;
        }

        _isShadowMap() {
          return this.sceneData.shadows.enabled && this.sceneData.shadows.type === ShadowType.ShadowMap && this.graphScene.scene.flags & SceneFlags.SHADOW_CASTER;
        }

        _updateGlobal(data) {
          const devicePass = this._currentQueue.devicePass;
          updateGlobalDescBinding(data, isEnableEffect() ? context.renderGraph.getLayout(devicePass.rasterPassInfo.id) : 'default');
          if (!isEnableEffect()) context.pipeline.descriptorSet.update();
        }

        _setMainLightShadowTex(data) {
          const graphScene = this.graphScene;

          if (graphScene.scene && graphScene.scene.camera) {
            const mainLight = graphScene.scene.camera.scene.mainLight;
            const shadowFrameBufferMap = this.sceneData.shadowFrameBufferMap;

            if (mainLight && shadowFrameBufferMap.has(mainLight)) {
              const shadowAttrID = context.layoutGraph.attributeIndex.get('cc_shadowMap');
              const defaultTex = builtinResMgr.get('default-texture').getGFXTexture();

              for (const [key, value] of data.textures) {
                if (key === shadowAttrID) {
                  const tex = data.textures.get(shadowAttrID);

                  if (tex === defaultTex) {
                    data.textures.set(key, shadowFrameBufferMap.get(mainLight).colorTextures[0]);
                  }

                  return;
                }
              }
            }
          }
        }

        _updateUbo() {
          if (this._currentQueue.isUpdateUBO) return;
          const devicePass = this._currentQueue.devicePass;
          const rasterId = devicePass.rasterPassInfo.id;
          const passRenderData = context.renderGraph.getData(rasterId); // CCGlobal

          this._updateGlobal(passRenderData); // CCCamera, CCShadow, CCCSM


          const queueId = this._currentQueue.queueId;
          const queueRenderData = context.renderGraph.getData(queueId);

          this._setMainLightShadowTex(queueRenderData);

          this._updateGlobal(queueRenderData);

          if (isEnableEffect()) {
            const layoutName = context.renderGraph.getLayout(rasterId);
            const descSetData = getDescriptorSetDataFromLayout(layoutName);
            mergeSrcToTargetDesc(descSetData.descriptorSet, context.pipeline.descriptorSet, true);
          }

          this._currentQueue.isUpdateUBO = true;
        }

        submit() {
          this._updateUbo();

          if (this.graphScene.blit) {
            this._currentQueue.blitDesc.update();

            return;
          }

          if (this._isShadowMap()) {
            return;
          }

          this._uploadInstanceBuffers();

          this._uploadBatchedBuffers();
        }

      };
      sceneViewport = new Viewport();
      DeviceSceneTask = class DeviceSceneTask extends WebSceneTask {
        constructor(queue, graphScene, visitor) {
          super(context.pipelineSceneData, context.ubo, graphScene.scene && graphScene.scene.camera ? graphScene.scene.camera : null, visitor);
          this._currentQueue = void 0;
          this._renderPass = void 0;
          this._graphScene = void 0;
          this._currentQueue = queue;
          this._renderPass = this._currentQueue.devicePass.renderPass;
          this._graphScene = graphScene;
        }

        apply(queue, graphScene) {
          this._currentQueue = queue;
          this._graphScene = graphScene;
          this._renderPass = queue.devicePass.renderPass;
          const camera = graphScene.scene && graphScene.scene.camera ? graphScene.scene.camera : null;

          if (camera) {
            this._scene = camera.scene;
            this._camera = camera;
          }
        }

        get graphScene() {
          return this._graphScene;
        }

        start() {}

        _recordRenderList(isTransparent) {
          const submitMap = context.submitMap;
          const currSubmitInfo = submitMap.get(this.camera).get(this._currentQueue.phaseID);
          const renderList = isTransparent ? currSubmitInfo.transparentList : currSubmitInfo.opaqueList;

          for (let i = 0; i < renderList.length; ++i) {
            const {
              subModel,
              passIdx
            } = renderList[i];
            const {
              inputAssembler
            } = subModel;
            const pass = subModel.passes[passIdx];
            const shader = subModel.shaders[passIdx];
            const pso = PipelineStateManager.getOrCreatePipelineState(deviceManager.gfxDevice, pass, shader, this._renderPass, inputAssembler);
            this.visitor.bindPipelineState(pso);
            this.visitor.bindDescriptorSet(SetIndex.MATERIAL, pass.descriptorSet);
            this.visitor.bindDescriptorSet(SetIndex.LOCAL, subModel.descriptorSet);
            this.visitor.bindInputAssembler(inputAssembler);
            this.visitor.draw(inputAssembler);
          }
        }

        _recordOpaqueList() {
          this._recordRenderList(false);
        }

        _recordInstences() {
          const submitMap = context.submitMap;
          const currSubmitInfo = submitMap.get(this.camera).get(this._currentQueue.phaseID);
          const it = currSubmitInfo.renderInstanceQueue.length === 0 ? currSubmitInfo.instances.values() : currSubmitInfo.renderInstanceQueue.values();
          let res = it.next();

          while (!res.done) {
            const {
              instances,
              pass,
              hasPendingModels
            } = res.value;

            if (hasPendingModels) {
              this.visitor.bindDescriptorSet(SetIndex.MATERIAL, pass.descriptorSet);
              let lastPSO = null;

              for (let b = 0; b < instances.length; ++b) {
                const instance = instances[b];

                if (!instance.count) {
                  continue;
                }

                const shader = instance.shader;
                const pso = PipelineStateManager.getOrCreatePipelineState(deviceManager.gfxDevice, pass, shader, this._renderPass, instance.ia);

                if (lastPSO !== pso) {
                  this.visitor.bindPipelineState(pso);
                  lastPSO = pso;
                }

                const ia = instance.ia;
                this.visitor.bindDescriptorSet(SetIndex.LOCAL, instance.descriptorSet, res.value.dynamicOffsets);
                this.visitor.bindInputAssembler(ia);
                this.visitor.draw(ia);
              }
            }

            res = it.next();
          }
        }

        _recordBatches() {
          const submitMap = context.submitMap;
          const currSubmitInfo = submitMap.get(this.camera).get(this._currentQueue.phaseID);
          const it = currSubmitInfo.batches.values();
          let res = it.next();

          while (!res.done) {
            let boundPSO = false;

            for (let b = 0; b < res.value.batches.length; ++b) {
              const batch = res.value.batches[b];

              if (!batch.mergeCount) {
                continue;
              }

              if (!boundPSO) {
                const shader = batch.shader;
                const pso = PipelineStateManager.getOrCreatePipelineState(deviceManager.gfxDevice, batch.pass, shader, this._renderPass, batch.ia);
                this.visitor.bindPipelineState(pso);
                this.visitor.bindDescriptorSet(SetIndex.MATERIAL, batch.pass.descriptorSet);
                boundPSO = true;
              }

              const ia = batch.ia;
              this.visitor.bindDescriptorSet(SetIndex.LOCAL, batch.descriptorSet, res.value.dynamicOffsets);
              this.visitor.bindInputAssembler(ia);
              this.visitor.draw(ia);
            }

            res = it.next();
          }
        }

        _recordUI() {
          const batches = this.camera.scene.batches;

          for (let i = 0; i < batches.length; i++) {
            const batch = batches[i];
            let visible = false;

            if (this.camera.visibility & batch.visFlags) {
              visible = true;
            }

            if (!visible) continue; // shaders.length always equals actual used passes.length

            const count = batch.shaders.length;

            for (let j = 0; j < count; j++) {
              const pass = batch.passes[j];
              if ((isEnableEffect() ? pass.phaseID : pass.phase) !== this._currentQueue.phaseID) continue;
              const shader = batch.shaders[j];
              const inputAssembler = batch.inputAssembler;
              const pso = PipelineStateManager.getOrCreatePipelineState(deviceManager.gfxDevice, pass, shader, this._renderPass, inputAssembler);
              this.visitor.bindPipelineState(pso);
              this.visitor.bindDescriptorSet(SetIndex.MATERIAL, pass.descriptorSet);
              const ds = batch.descriptorSet;
              this.visitor.bindDescriptorSet(SetIndex.LOCAL, ds);
              this.visitor.bindInputAssembler(inputAssembler);
              this.visitor.draw(inputAssembler);
            }
          }
        }

        _recordTransparentList() {
          this._recordRenderList(true);
        }

        _recordShadowMap() {
          var _currSubmitInfo$shado;

          const submitMap = context.submitMap;
          const currSubmitInfo = submitMap.get(this.camera).get(this._currentQueue.phaseID);
          (_currSubmitInfo$shado = currSubmitInfo.shadowMap) === null || _currSubmitInfo$shado === void 0 ? void 0 : _currSubmitInfo$shado.recordCommandBuffer(context.device, this._renderPass, context.commandBuffer);
        }

        _recordReflectionProbe() {
          var _currSubmitInfo$refle;

          const submitMap = context.submitMap;
          const currSubmitInfo = submitMap.get(this.camera).get(this._currentQueue.phaseID);
          (_currSubmitInfo$refle = currSubmitInfo.reflectionProbe) === null || _currSubmitInfo$refle === void 0 ? void 0 : _currSubmitInfo$refle.recordCommandBuffer(context.device, this._renderPass, context.commandBuffer);
        }

        _isShadowMap() {
          return this.sceneData.shadows.enabled && this.sceneData.shadows.type === ShadowType.ShadowMap && this.graphScene.scene && this.graphScene.scene.flags & SceneFlags.SHADOW_CASTER;
        }

        _clearExtBlitDesc(desc, extResId) {
          const toGpuDesc = desc.gpuDescriptorSet;

          for (let i = 0; i < extResId.length; i++) {
            const currDesc = toGpuDesc.gpuDescriptors[extResId[i]];
            if (currDesc.gpuBuffer) currDesc.gpuBuffer = null;else if (currDesc.gpuTextureView) {
              currDesc.gpuTextureView = null;
              currDesc.gpuSampler = null;
            } else if (currDesc.gpuTexture) {
              currDesc.gpuTexture = null;
              currDesc.gpuSampler = null;
            }
          }
        }

        _recordBlit() {
          if (!this.graphScene.blit) {
            return;
          }

          const blit = this.graphScene.blit;
          const currMat = blit.material;
          const pass = currMat.passes[blit.passID];
          pass.update();
          const shader = pass.getShaderVariant();
          const devicePass = this._currentQueue.devicePass;
          const screenIa = this._currentQueue.blitDesc.screenQuad.quadIA;
          const globalDesc = context.pipeline.descriptorSet;
          let pso;

          if (pass !== null && shader !== null && screenIa !== null) {
            pso = PipelineStateManager.getOrCreatePipelineState(context.device, pass, shader, devicePass.renderPass, screenIa);
          }

          if (pso) {
            this.visitor.bindPipelineState(pso);
            const layoutStage = devicePass.renderLayout;
            const layoutDesc = layoutStage.descriptorSet;
            const extResId = isEnableEffect() ? [] : mergeSrcToTargetDesc(pass.descriptorSet, layoutDesc); // if (isEnableEffect()) this.visitor.bindDescriptorSet(SetIndex.GLOBAL, layoutDesc);

            this.visitor.bindDescriptorSet(SetIndex.MATERIAL, isEnableEffect() ? pass.descriptorSet : layoutDesc);
            this.visitor.bindDescriptorSet(SetIndex.LOCAL, this._currentQueue.blitDesc.stageDesc);
            this.visitor.bindInputAssembler(screenIa);
            this.visitor.draw(screenIa); // The desc data obtained from the outside should be cleaned up so that the data can be modified

            this._clearExtBlitDesc(layoutDesc, extResId); // if (isEnableEffect()) this.visitor.bindDescriptorSet(SetIndex.GLOBAL, globalDesc);

          }
        }

        _recordAdditiveLights() {
          var _currSubmitInfo$addit;

          const devicePass = this._currentQueue.devicePass;
          const submitMap = context.submitMap;
          const currSubmitInfo = submitMap.get(this.camera).get(this._currentQueue.phaseID);
          (_currSubmitInfo$addit = currSubmitInfo.additiveLight) === null || _currSubmitInfo$addit === void 0 ? void 0 : _currSubmitInfo$addit.recordCommandBuffer(context.device, this._renderPass, context.commandBuffer);
        }

        _recordPlanarShadows() {
          var _currSubmitInfo$plana;

          const devicePass = this._currentQueue.devicePass;
          const submitMap = context.submitMap;
          const currSubmitInfo = submitMap.get(this.camera).get(this._currentQueue.phaseID);
          (_currSubmitInfo$plana = currSubmitInfo.planarQueue) === null || _currSubmitInfo$plana === void 0 ? void 0 : _currSubmitInfo$plana.recordCommandBuffer(context.device, this._renderPass, context.commandBuffer);
        }

        submit() {
          const devicePass = this._currentQueue.devicePass;

          if (!this._currentQueue.devicePass.viewport) {
            const texture = this._currentQueue.devicePass.framebuffer.colorTextures[0];
            const graphScene = this.graphScene;
            const lightInfo = graphScene.scene ? graphScene.scene.light : null;
            const area = this._isShadowMap() && graphScene.scene && lightInfo.light ? getRenderArea(this.camera, texture.width, texture.height, lightInfo.light, lightInfo.level) : getRenderArea(this.camera, texture.width, texture.height);
            sceneViewport.left = area.x;
            sceneViewport.top = area.y;
            sceneViewport.width = area.width;
            sceneViewport.height = area.height;
            this.visitor.setViewport(sceneViewport);
            this.visitor.setScissor(area);
          } // Currently processing blit and camera first


          if (this.graphScene.blit) {
            this._recordBlit();

            return;
          }

          if (this._isShadowMap()) {
            this._recordShadowMap();

            return;
          }

          const graphSceneData = this.graphScene.scene;

          if (graphSceneData.flags & SceneFlags.OPAQUE_OBJECT || graphSceneData.flags & SceneFlags.CUTOUT_OBJECT) {
            this._recordOpaqueList();
          }

          if (graphSceneData.flags & SceneFlags.DRAW_INSTANCING) {
            this._recordInstences();
          } // this._recordBatches();


          if (graphSceneData.flags & SceneFlags.DEFAULT_LIGHTING) {
            this._recordAdditiveLights();
          }

          this.visitor.bindDescriptorSet(SetIndex.GLOBAL, context.pipeline.descriptorSet);

          if (graphSceneData.flags & SceneFlags.PLANAR_SHADOW) {
            this._recordPlanarShadows();
          }

          if (graphSceneData.flags & SceneFlags.TRANSPARENT_OBJECT) {
            this._recordTransparentList();
          }

          if (graphSceneData.flags & SceneFlags.GEOMETRY) {
            var _geometryRenderer;

            (_geometryRenderer = this.camera.geometryRenderer) === null || _geometryRenderer === void 0 ? void 0 : _geometryRenderer.render(devicePass.renderPass, context.commandBuffer, context.pipeline.pipelineSceneData);
          }

          if (graphSceneData.flags & SceneFlags.UI) {
            this._recordUI();
          }

          if (graphSceneData.flags & SceneFlags.REFLECTION_PROBE) {
            this._recordReflectionProbe();
          }
        }

      };
      DevicePostSceneTask = class DevicePostSceneTask extends WebSceneTask {};
      ExecutorPools = class ExecutorPools {
        constructor(context) {
          this.deviceQueuePool = void 0;
          this.graphScenePool = void 0;
          this.reflectionProbe = void 0;
          this.passPool = void 0;
          this.rasterPassInfoPool = void 0;
          this.deviceQueuePool = new RecyclePool(() => new DeviceRenderQueue(), 16);
          this.graphScenePool = new RecyclePool(() => new GraphScene(), 16);
          this.rasterPassInfoPool = new RecyclePool(() => new RasterPassInfo(), 16);
          this.reflectionProbe = new RecyclePool(() => new RenderReflectionProbeQueue(context.pipeline), 8);
          this.passPool = new RecyclePool(() => ({
            priority: 0,
            hash: 0,
            depth: 0,
            shaderId: 0,
            subModel: null,
            passIdx: 0
          }), 64);
        }

        addPassInfo() {
          return this.passPool.add();
        }

        resetPassInfo() {
          this.passPool.reset();
        }

        addDeviceQueue() {
          return this.deviceQueuePool.add();
        }

        addGraphScene() {
          return this.graphScenePool.add();
        }

        addReflectionProbe() {
          return this.reflectionProbe.add();
        }

        addRasterPassInfo() {
          return this.rasterPassInfoPool.add();
        }

        reset() {
          this.deviceQueuePool.reset();
          this.graphScenePool.reset();
          this.reflectionProbe.reset();
          this.resetPassInfo();
        }

      };
      vbData = new Float32Array(4 * 4);
      quadRect = new Rect();
      BlitInfo = class BlitInfo {
        get pipelineIAData() {
          return this._pipelineIAData;
        }

        get deferredLitsBufView() {
          return this._deferredLitsBufView;
        }

        get lightVolumeBuffer() {
          return this._lightVolumeBuffer;
        }

        get lightBufferData() {
          return this._lightBufferData;
        }

        get stageDescs() {
          return this._stageDescs;
        }

        get emptyLocalUBO() {
          return this._localUBO;
        }

        constructor(context) {
          this._pipelineIAData = void 0;
          this._context = void 0;
          this._width = void 0;
          this._height = void 0;
          this._stageDescs = new Map();
          this._context = context;
          this._width = context.width;
          this._height = context.height;
          this._pipelineIAData = this._createQuadInputAssembler();

          const vb = this._genQuadVertexData(SurfaceTransform.IDENTITY, new Rect(0, 0, context.width, context.height));

          this._pipelineIAData.quadVB.update(vb);

          this._createLightVolumes();

          this._localUBO = context.device.createBuffer(new BufferInfo(BufferUsageBit.UNIFORM | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.DEVICE, UBOLocal.SIZE, UBOLocal.SIZE));
        }

        resize(width, height) {
          if (width !== this._width || height !== this._height) {
            quadRect.y = quadRect.x = 0;
            quadRect.width = width;
            quadRect.height = height;

            const vb = this._genQuadVertexData(SurfaceTransform.IDENTITY, quadRect);

            this._pipelineIAData.quadVB.update(vb);
          }
        }

        _createLightVolumes() {
          const device = this._context.root.device;
          let totalSize = Float32Array.BYTES_PER_ELEMENT * 4 * 4 * UBODeferredLight.LIGHTS_PER_PASS;
          totalSize = Math.ceil(totalSize / device.capabilities.uboOffsetAlignment) * device.capabilities.uboOffsetAlignment;
          this._lightVolumeBuffer = device.createBuffer(new BufferInfo(BufferUsageBit.UNIFORM | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, totalSize, device.capabilities.uboOffsetAlignment));
          this._deferredLitsBufView = device.createBuffer(new BufferViewInfo(this._lightVolumeBuffer, 0, totalSize));
          this._lightBufferData = new Float32Array(totalSize / Float32Array.BYTES_PER_ELEMENT);
        }

        _genQuadVertexData(surfaceTransform, renderArea) {
          const minX = renderArea.x / this._context.width;
          const maxX = (renderArea.x + renderArea.width) / this._context.width;
          let minY = renderArea.y / this._context.height;
          let maxY = (renderArea.y + renderArea.height) / this._context.height;

          if (this._context.root.device.capabilities.screenSpaceSignY > 0) {
            const temp = maxY;
            maxY = minY;
            minY = temp;
          }

          let n = 0;

          switch (surfaceTransform) {
            case SurfaceTransform.IDENTITY:
              n = 0;
              vbData[n++] = -1.0;
              vbData[n++] = -1.0;
              vbData[n++] = minX;
              vbData[n++] = maxY;
              vbData[n++] = 1.0;
              vbData[n++] = -1.0;
              vbData[n++] = maxX;
              vbData[n++] = maxY;
              vbData[n++] = -1.0;
              vbData[n++] = 1.0;
              vbData[n++] = minX;
              vbData[n++] = minY;
              vbData[n++] = 1.0;
              vbData[n++] = 1.0;
              vbData[n++] = maxX;
              vbData[n++] = minY;
              break;

            case SurfaceTransform.ROTATE_90:
              n = 0;
              vbData[n++] = -1.0;
              vbData[n++] = -1.0;
              vbData[n++] = maxX;
              vbData[n++] = maxY;
              vbData[n++] = 1.0;
              vbData[n++] = -1.0;
              vbData[n++] = maxX;
              vbData[n++] = minY;
              vbData[n++] = -1.0;
              vbData[n++] = 1.0;
              vbData[n++] = minX;
              vbData[n++] = maxY;
              vbData[n++] = 1.0;
              vbData[n++] = 1.0;
              vbData[n++] = minX;
              vbData[n++] = minY;
              break;

            case SurfaceTransform.ROTATE_180:
              n = 0;
              vbData[n++] = -1.0;
              vbData[n++] = -1.0;
              vbData[n++] = minX;
              vbData[n++] = minY;
              vbData[n++] = 1.0;
              vbData[n++] = -1.0;
              vbData[n++] = maxX;
              vbData[n++] = minY;
              vbData[n++] = -1.0;
              vbData[n++] = 1.0;
              vbData[n++] = minX;
              vbData[n++] = maxY;
              vbData[n++] = 1.0;
              vbData[n++] = 1.0;
              vbData[n++] = maxX;
              vbData[n++] = maxY;
              break;

            case SurfaceTransform.ROTATE_270:
              n = 0;
              vbData[n++] = -1.0;
              vbData[n++] = -1.0;
              vbData[n++] = minX;
              vbData[n++] = minY;
              vbData[n++] = 1.0;
              vbData[n++] = -1.0;
              vbData[n++] = minX;
              vbData[n++] = maxY;
              vbData[n++] = -1.0;
              vbData[n++] = 1.0;
              vbData[n++] = maxX;
              vbData[n++] = minY;
              vbData[n++] = 1.0;
              vbData[n++] = 1.0;
              vbData[n++] = maxX;
              vbData[n++] = maxY;
              break;

            default:
              break;
          }

          return vbData;
        }

        _createQuadInputAssembler() {
          // create vertex buffer
          const inputAssemblerData = new PipelineInputAssemblerData();
          const vbStride = Float32Array.BYTES_PER_ELEMENT * 4;
          const vbSize = vbStride * 4;
          const device = cclegacy.director.root.device;
          const quadVB = device.createBuffer(new BufferInfo(BufferUsageBit.VERTEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.DEVICE | MemoryUsageBit.HOST, vbSize, vbStride));

          if (!quadVB) {
            return inputAssemblerData;
          } // create index buffer


          const ibStride = Uint8Array.BYTES_PER_ELEMENT;
          const ibSize = ibStride * 6;
          const quadIB = device.createBuffer(new BufferInfo(BufferUsageBit.INDEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.DEVICE, ibSize, ibStride));

          if (!quadIB) {
            return inputAssemblerData;
          }

          const indices = new Uint8Array(6);
          indices[0] = 0;
          indices[1] = 1;
          indices[2] = 2;
          indices[3] = 1;
          indices[4] = 3;
          indices[5] = 2;
          quadIB.update(indices); // create input assembler

          const attributes = new Array(2);
          attributes[0] = new Attribute('a_position', Format.RG32F);
          attributes[1] = new Attribute('a_texCoord', Format.RG32F);
          const quadIA = device.createInputAssembler(new InputAssemblerInfo(attributes, [quadVB], quadIB));
          inputAssemblerData.quadIB = quadIB;
          inputAssemblerData.quadVB = quadVB;
          inputAssemblerData.quadIA = quadIA;
          return inputAssemblerData;
        }

      };
      ExecutorContext = class ExecutorContext {
        constructor(pipeline, ubo, device, resourceGraph, renderGraph, layoutGraph, width, height) {
          this.device = void 0;
          this.pipeline = void 0;
          this.commandBuffer = void 0;
          this.pipelineSceneData = void 0;
          this.resourceGraph = void 0;
          this.devicePasses = new Map();
          this.deviceTextures = new Map();
          this.layoutGraph = void 0;
          this.root = void 0;
          this.ubo = void 0;
          this.additiveLight = void 0;
          this.shadowMapBatched = void 0;
          this.planarShadow = void 0;
          this.submitMap = new Map();
          this.pools = void 0;
          this.blit = void 0;
          this.renderGraph = void 0;
          this.width = void 0;
          this.height = void 0;
          this.cullCamera = void 0;
          this.pipeline = pipeline;
          this.device = device;
          this.commandBuffer = device.commandBuffer;
          this.pipelineSceneData = pipeline.pipelineSceneData;
          this.resourceGraph = resourceGraph;
          this.renderGraph = renderGraph;
          this.root = legacyCC.director.root;
          this.ubo = ubo;
          this.layoutGraph = layoutGraph;
          this.width = width;
          this.height = height;
          this.additiveLight = new RenderAdditiveLightQueue(pipeline);
          this.shadowMapBatched = new RenderShadowMapBatchedQueue(pipeline);
          this.planarShadow = new PlanarShadowQueue(pipeline);
          this.pools = new ExecutorPools(this);
          this.blit = new BlitInfo(this);
        }

        reset() {
          this.pools.reset();
          this.cullCamera = null;

          for (const infoMap of this.submitMap) {
            for (const info of infoMap[1]) info[1].reset();
          }
        }

        resize(width, height) {
          this.width = width;
          this.height = height;
          this.blit.resize(width, height);
        }

      };
      ResourceVisitor = class ResourceVisitor {
        constructor(resName) {
          this.name = void 0;
          this.name = resName;
        }

        createDeviceTex(value) {
          const deviceTex = new DeviceTexture(this.name, value);
          context.deviceTextures.set(this.name, deviceTex);
        }

        managed(value) {
          this.createDeviceTex(value);
        }

        managedBuffer(value) {// noop
        }

        managedTexture(value) {// noop
        }

        persistentBuffer(value) {}

        persistentTexture(value) {
          this.createDeviceTex(value);
        }

        framebuffer(value) {
          this.createDeviceTex(value);
        }

        swapchain(value) {
          this.createDeviceTex(value);
        }

      };

      _export("Executor", Executor = class Executor {
        constructor(pipeline, ubo, device, resourceGraph, layoutGraph, width, height) {
          this._context = void 0;
          this._visitor = void 0;
          context = this._context = new ExecutorContext(pipeline, ubo, device, resourceGraph, new RenderGraph(), layoutGraph, width, height);
        }

        resize(width, height) {
          context.resize(width, height);
        }

        execute(rg) {
          context.renderGraph = rg;
          context.reset();
          const cmdBuff = context.commandBuffer;
          cmdBuff.begin();
          if (!this._visitor) this._visitor = new RenderVisitor();
          depthFirstSearch(this._visitor.graphView, this._visitor, this._visitor.colorMap);
          cmdBuff.end();
          context.device.queue.submit([cmdBuff]);
        }

        release() {
          context.devicePasses.clear();

          for (const [k, v] of context.deviceTextures) {
            v.release();
          }

          context.deviceTextures.clear();
        }

      });

      BaseRenderVisitor = class BaseRenderVisitor {
        constructor() {
          this.queueID = 0xFFFFFFFF;
          this.sceneID = 0xFFFFFFFF;
          this.passID = 0xFFFFFFFF;
          this.currPass = void 0;
          this.currQueue = void 0;
          this.rg = void 0;
          this.rg = context.renderGraph;
        }

        _isRasterPass(u) {
          return !!context.renderGraph.tryGetRasterPass(u);
        }

        _isQueue(u) {
          return !!context.renderGraph.tryGetQueue(u);
        }

        _isScene(u) {
          return !!context.renderGraph.tryGetScene(u);
        }

        _isBlit(u) {
          return !!context.renderGraph.tryGetBlit(u);
        }

        applyID(id) {
          if (this._isRasterPass(id)) {
            this.passID = id;
          } else if (this._isQueue(id)) {
            this.queueID = id;
          } else if (this._isScene(id) || this._isBlit(id)) {
            this.sceneID = id;
          }
        }

      };
      PreRenderVisitor = class PreRenderVisitor extends BaseRenderVisitor {
        constructor() {
          super();
        }

        clear(value) {// do nothing
        }

        viewport(value) {// do nothing
        }

        rasterPass(pass) {
          if (!this.rg.getValid(this.passID)) return;
          const devicePasses = context.devicePasses;

          if (pass.versionName === '') {
            const passHash = stringify(pass);
            this.currPass = devicePasses.get(passHash);

            if (!this.currPass) {
              const rasterInfo = context.pools.addRasterPassInfo();
              rasterInfo.applyInfo(this.passID, pass);
              this.currPass = new DeviceRenderPass(rasterInfo);
              devicePasses.set(passHash, this.currPass);
            } else {
              this.currPass.resetResource(this.passID, pass);
            }
          } else {
            const passHash = pass.versionName;
            this.currPass = devicePasses.get(passHash);
            const currRasterPass = this.currPass ? this.currPass.rasterPassInfo.pass : null;

            if (!this.currPass || currRasterPass.version !== pass.version) {
              const rasterInfo = context.pools.addRasterPassInfo();
              rasterInfo.applyInfo(this.passID, pass);
              this.currPass = new DeviceRenderPass(rasterInfo);
              devicePasses.set(passHash, this.currPass);
            } else {
              this.currPass.resetResource(this.passID, pass);
            }
          }
        }

        rasterSubpass(value) {}

        computeSubpass(value) {}

        compute(value) {}

        copy(value) {}

        move(value) {}

        raytrace(value) {}

        queue(value) {
          if (!this.rg.getValid(this.queueID)) return;
          const deviceQueue = context.pools.addDeviceQueue();
          deviceQueue.init(this.currPass, value.hint, this.queueID);
          this.currQueue = deviceQueue;
          this.currPass.addQueue(deviceQueue);
          const layoutName = this.rg.getLayout(this.queueID);

          if (layoutName) {
            const layoutGraph = context.layoutGraph;

            if (this.currPass.renderLayout) {
              const layoutId = layoutGraph.locateChild(this.currPass.renderLayout.layoutID, layoutName);
              this.currQueue.layoutID = layoutId;
            }
          }
        }

        scene(value) {
          if (!this.rg.getValid(this.sceneID)) return;
          const graphScene = context.pools.addGraphScene();
          graphScene.init(value, null, this.sceneID);
          this.currQueue.addSceneTask(graphScene);
        }

        blit(value) {
          if (!this.rg.getValid(this.sceneID)) return;
          const graphScene = context.pools.addGraphScene();
          graphScene.init(null, value, -1);
          this.currQueue.addSceneTask(graphScene);
        }

        dispatch(value) {}

      };
      PostRenderVisitor = class PostRenderVisitor extends BaseRenderVisitor {
        constructor() {
          super();
        }

        clear(value) {// do nothing
        }

        viewport(value) {// do nothing
        }

        rasterPass(pass) {
          const devicePasses = context.devicePasses;
          const passHash = pass.versionName === '' ? stringify(pass) : pass.versionName;
          const currPass = devicePasses.get(passHash);
          if (!currPass) return;
          this.currPass = currPass;
          this.currPass.prePass();
          this.currPass.record();
          this.currPass.postPass();
        }

        rasterSubpass(value) {}

        computeSubpass(value) {}

        compute(value) {}

        copy(value) {}

        move(value) {}

        raytrace(value) {}

        queue(value) {// collect scene results
        }

        scene(value) {// scene command list finished
        }

        blit(value) {}

        dispatch(value) {}

      };

      _export("RenderVisitor", RenderVisitor = class RenderVisitor extends DefaultVisitor {
        constructor() {
          super();
          this._preVisitor = void 0;
          this._postVisitor = void 0;
          this._graphView = void 0;
          this._colorMap = void 0;
          this._preVisitor = new PreRenderVisitor();
          this._postVisitor = new PostRenderVisitor();
          this._graphView = new ReferenceGraphView(context.renderGraph);
          this._colorMap = new VectorGraphColorMap(context.renderGraph.numVertices());
        }

        get graphView() {
          return this._graphView;
        }

        get colorMap() {
          return this._colorMap;
        }

        discoverVertex(u, gv) {
          const g = gv.g;

          this._preVisitor.applyID(u);

          g.visitVertex(this._preVisitor, u);
        }

        finishVertex(v, gv) {
          const g = gv.g;
          g.visitVertex(this._postVisitor, v);
        }

      });
    }
  };
});