System.register("q-bundled:///fs/cocos/rendering/custom/executor.js", ["../index.js", "../../core/index.js", "../../core/geometry/intersect.js", "../../core/geometry/sphere.js", "../../gfx/index.js", "../../core/global-exports.js", "../../core/math/vec3.js", "../../core/math/vec4.js", "../../render-scene/index.js", "../../render-scene/scene/shadows.js", "../define.js", "../render-pipeline.js", "./render-graph.js", "./types.js", "./web-scene.js", "./web-scene-visitor.js", "./utils.js", "../render-additive-light-queue.js", "../render-shadow-map-batched-queue.js", "../planar-shadow-queue.js", "./graph.js", "./effect.js", "./define.js", "../render-reflection-probe-queue.js", "../reflection-probe-manager.js", "../../asset/asset-manager/builtin-res-mgr.js"], function (_export, _context) {
  "use strict";

  var getPhaseID, PipelineStateManager, assert, cclegacy, RecyclePool, intersect, Sphere, AccessFlagBit, Attribute, BufferInfo, BufferUsageBit, BufferViewInfo, ColorAttachment, DepthStencilAttachment, DescriptorSetInfo, deviceManager, Format, Framebuffer, FramebufferInfo, GeneralBarrierInfo, InputAssemblerInfo, LoadOp, MemoryUsageBit, Rect, RenderPassInfo, StoreOp, SurfaceTransform, Texture, TextureInfo, TextureType, TextureUsageBit, Viewport, legacyCC, Vec3, Vec4, BatchingSchemes, ShadowType, isEnableEffect, SetIndex, UBODeferredLight, UBOForwardLight, UBOLocal, PipelineInputAssemblerData, Blit, RasterPass, RenderGraph, RenderSwapchain, ResourceDesc, SceneData, AttachmentType, ComputeView, QueueHint, RasterView, ResourceDimension, ResourceFlags, SceneFlags, UpdateFrequency, WebSceneTask, WebSceneTransversal, WebSceneVisitor, stringify, RenderAdditiveLightQueue, RenderShadowMapBatchedQueue, PlanarShadowQueue, DefaultVisitor, depthFirstSearch, ReferenceGraphView, VectorGraphColorMap, getDescBindingFromName, getDescriptorSetDataFromLayout, getDescriptorSetDataFromLayoutId, getRenderArea, mergeSrcToTargetDesc, updateGlobalDescBinding, RenderReflectionProbeQueue, ReflectionProbeManager, builtinResMgr, context, DeviceResource, DeviceTexture, DeviceBuffer, _vec4Array, BlitDesc, DeviceRenderQueue, SubmitInfo, RenderPassLayoutInfo, RasterPassInfo, profilerViewport, renderPassArea, DeviceRenderPass, DeviceSceneTransversal, GraphScene, DevicePreSceneTask, sceneViewport, DeviceSceneTask, DevicePostSceneTask, ExecutorPools, vbData, quadRect, BlitInfo, ExecutorContext, ResourceVisitor, Executor, BaseRenderVisitor, PreRenderVisitor, PostRenderVisitor, RenderVisitor;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
      DeviceResource = /*#__PURE__*/function () {
        function DeviceResource(name) {
          this._name = void 0;
          this._name = name;
        }

        _createClass(DeviceResource, [{
          key: "name",
          get: function get() {
            return this._name;
          }
        }]);

        return DeviceResource;
      }();

      DeviceTexture = /*#__PURE__*/function (_DeviceResource) {
        _inheritsLoose(DeviceTexture, _DeviceResource);

        var _proto = DeviceTexture.prototype;

        _proto._setDesc = function _setDesc(desc) {
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
        };

        function DeviceTexture(name, tex) {
          var _this;

          _this = _DeviceResource.call(this, name) || this;
          _this._texture = null;
          _this._swapchain = null;
          _this._framebuffer = null;
          _this._desc = null;
          _this._trait = null;
          var resGraph = context.resourceGraph;
          var verID = resGraph.vertex(name);

          _this._setDesc(resGraph.getDesc(verID));

          _this._trait = resGraph.getTraits(verID);

          if (tex instanceof Texture) {
            _this._texture = tex;
            return _assertThisInitialized(_this);
          }

          if (tex instanceof Framebuffer) {
            _this._framebuffer = tex;
            return _assertThisInitialized(_this);
          }

          if (tex instanceof RenderSwapchain) {
            _this._swapchain = tex.swapchain;
            return _assertThisInitialized(_this);
          }

          var info = _this._desc;
          var type = TextureType.TEX2D;

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

          var usageFlags = TextureUsageBit.NONE;
          if (info.flags & ResourceFlags.COLOR_ATTACHMENT) usageFlags |= TextureUsageBit.COLOR_ATTACHMENT;
          if (info.flags & ResourceFlags.DEPTH_STENCIL_ATTACHMENT) usageFlags |= TextureUsageBit.DEPTH_STENCIL_ATTACHMENT;
          if (info.flags & ResourceFlags.INPUT_ATTACHMENT) usageFlags |= TextureUsageBit.INPUT_ATTACHMENT;
          if (info.flags & ResourceFlags.SAMPLED) usageFlags |= TextureUsageBit.SAMPLED;
          if (info.flags & ResourceFlags.STORAGE) usageFlags |= TextureUsageBit.STORAGE;
          _this._texture = context.device.createTexture(new TextureInfo(type, usageFlags, info.format, info.width, info.height));
          return _this;
        }

        _proto.release = function release() {
          if (this.framebuffer) {
            this.framebuffer.destroy();
            this._framebuffer = null;
          }

          if (this.texture) {
            this.texture.destroy();
            this._texture = null;
          }
        };

        _createClass(DeviceTexture, [{
          key: "texture",
          get: function get() {
            return this._texture;
          }
        }, {
          key: "framebuffer",
          get: function get() {
            return this._framebuffer;
          },
          set: function set(val) {
            this._framebuffer = val;
          }
        }, {
          key: "description",
          get: function get() {
            return this._desc;
          }
        }, {
          key: "trait",
          get: function get() {
            return this._trait;
          }
        }, {
          key: "swapchain",
          get: function get() {
            return this._swapchain;
          }
        }]);

        return DeviceTexture;
      }(DeviceResource);

      DeviceBuffer = /*#__PURE__*/function (_DeviceResource2) {
        _inheritsLoose(DeviceBuffer, _DeviceResource2);

        function DeviceBuffer(name) {
          return _DeviceResource2.call(this, name) || this;
        }

        return DeviceBuffer;
      }(DeviceResource);

      _vec4Array = new Float32Array(4);

      BlitDesc = /*#__PURE__*/function () {
        function BlitDesc(blit, queue) {
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


        var _proto2 = BlitDesc.prototype;

        _proto2._createQuadInputAssembler = function _createQuadInputAssembler() {
          return context.blit.pipelineIAData;
        };

        _proto2.createScreenQuad = function createScreenQuad() {
          if (!this._screenQuad) {
            this._screenQuad = this._createQuadInputAssembler();
          }
        };

        _proto2._gatherVolumeLights = function _gatherVolumeLights(camera) {
          if (!camera.scene) {
            return;
          }

          var pipeline = context.pipeline;
          var cmdBuff = context.commandBuffer;
          var sphereLights = camera.scene.sphereLights;
          var spotLights = camera.scene.spotLights;

          var _sphere = Sphere.create(0, 0, 0, 1);

          var exposure = camera.exposure;
          var idx = 0;
          var maxLights = UBODeferredLight.LIGHTS_PER_PASS;
          var elementLen = Vec4.length; // sizeof(vec4) / sizeof(float32)

          var fieldLen = elementLen * maxLights;

          for (var i = 0; i < sphereLights.length && idx < maxLights; i++, ++idx) {
            var light = sphereLights[i];
            Sphere.set(_sphere, light.position.x, light.position.y, light.position.z, light.range);

            if (intersect.sphereFrustum(_sphere, camera.frustum)) {
              // cc_lightPos
              Vec3.toArray(_vec4Array, light.position);
              _vec4Array[3] = 0;

              this._lightBufferData.set(_vec4Array, idx * elementLen); // cc_lightColor


              Vec3.toArray(_vec4Array, light.color);

              if (light.useColorTemperature) {
                var tempRGB = light.colorTemperatureRGB;
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

          for (var _i = 0; _i < spotLights.length && idx < maxLights; _i++, ++idx) {
            var _light = spotLights[_i];
            Sphere.set(_sphere, _light.position.x, _light.position.y, _light.position.z, _light.range);

            if (intersect.sphereFrustum(_sphere, camera.frustum)) {
              // cc_lightPos
              Vec3.toArray(_vec4Array, _light.position);
              _vec4Array[3] = 1;

              this._lightBufferData.set(_vec4Array, idx * elementLen + fieldLen * 0); // cc_lightColor


              Vec3.toArray(_vec4Array, _light.color);

              if (_light.useColorTemperature) {
                var _tempRGB = _light.colorTemperatureRGB;
                _vec4Array[0] *= _tempRGB.x;
                _vec4Array[1] *= _tempRGB.y;
                _vec4Array[2] *= _tempRGB.z;
              }

              if (pipeline.pipelineSceneData.isHDR) {
                _vec4Array[3] = _light.luminance * exposure * this._lightMeterScale;
              } else {
                _vec4Array[3] = _light.luminance;
              }

              this._lightBufferData.set(_vec4Array, idx * elementLen + fieldLen * 1); // cc_lightSizeRangeAngle


              _vec4Array[0] = _light.size;
              _vec4Array[1] = _light.range;
              _vec4Array[2] = _light.spotAngle;

              this._lightBufferData.set(_vec4Array, idx * elementLen + fieldLen * 2); // cc_lightDir


              Vec3.toArray(_vec4Array, _light.direction);

              this._lightBufferData.set(_vec4Array, idx * elementLen + fieldLen * 3);
            }
          } // the count of lights is set to cc_lightDir[0].w


          var offset = fieldLen * 3 + 3;

          this._lightBufferData.set([idx], offset);

          cmdBuff.updateBuffer(this._lightVolumeBuffer, this._lightBufferData);
        };

        _proto2.update = function update() {
          if (this.blit.sceneFlags & SceneFlags.VOLUMETRIC_LIGHTING && this.blit.camera && !this._isGatherLight) {
            this._gatherVolumeLights(this.blit.camera);

            this._isGatherLight = true;
            this._isUpdate = false;
          }

          if (!this._isUpdate) {
            this._stageDesc.update();

            this._isUpdate = true;
          }
        };

        _proto2.reset = function reset() {
          this._isUpdate = false;
          this._isGatherLight = false;
        };

        _proto2.createStageDescriptor = function createStageDescriptor() {
          var blit = this.blit;
          var pass = blit.material.passes[blit.passID];
          var device = context.device;
          this._stageDesc = context.blit.stageDescs.get(pass);

          if (!this._stageDesc) {
            this._stageDesc = device.createDescriptorSet(new DescriptorSetInfo(pass.localSetLayout));
            context.blit.stageDescs.set(pass, this._stageDesc);
          }

          if (this.blit.sceneFlags & SceneFlags.VOLUMETRIC_LIGHTING) {
            this._lightVolumeBuffer = context.blit.lightVolumeBuffer;
            var deferredLitsBufView = context.blit.deferredLitsBufView;
            this._lightBufferData = context.blit.lightBufferData;

            this._lightBufferData.fill(0);

            var binding = isEnableEffect() ? getDescBindingFromName('CCForwardLight') : UBOForwardLight.BINDING;

            this._stageDesc.bindBuffer(UBOForwardLight.BINDING, deferredLitsBufView);
          }

          this._stageDesc.bindBuffer(UBOLocal.BINDING, context.blit.emptyLocalUBO);
        };

        _createClass(BlitDesc, [{
          key: "screenQuad",
          get: // If VOLUMETRIC_LIGHTING is turned on, it needs to be assigned
          function get() {
            return this._screenQuad;
          }
        }, {
          key: "blit",
          get: function get() {
            return this._blit;
          },
          set: function set(blit) {
            this._blit = blit;
          }
        }, {
          key: "stageDesc",
          get: function get() {
            return this._stageDesc;
          }
        }]);

        return BlitDesc;
      }();

      DeviceRenderQueue = /*#__PURE__*/function () {
        function DeviceRenderQueue() {
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

        var _proto3 = DeviceRenderQueue.prototype;

        _proto3.init = function init(devicePass, queueHint, id) {
          this.reset();
          this.queueHint = queueHint;
          this.queueId = id;
          this._devicePass = devicePass;
          if (isEnableEffect()) this._phaseID = cclegacy.rendering.getPhaseID(devicePass.passID, context.renderGraph.getLayout(id) || 'default');

          if (!this._sceneVisitor) {
            this._sceneVisitor = new WebSceneVisitor(context.commandBuffer, context.pipeline.pipelineSceneData);
          }
        };

        _proto3.createBlitDesc = function createBlitDesc(blit) {
          if (!this._blitDesc) {
            this._blitDesc = new BlitDesc(blit, this);
          }

          this._blitDesc.createScreenQuad();

          this._blitDesc.createStageDescriptor();
        };

        _proto3.addSceneTask = function addSceneTask(scene) {
          if (!this._transversal) {
            this._transversal = new DeviceSceneTransversal(this, context.pipelineSceneData, scene);
          }

          this._transversal.graphScene = scene;

          this._preSceneTasks.push(this._transversal.preRenderPass(this._sceneVisitor));

          this._sceneTasks.push(this._transversal.transverse(this._sceneVisitor));
        };

        _proto3.reset = function reset() {
          var _this$_blitDesc;

          this._postSceneTasks.length = this._preSceneTasks.length = this._sceneTasks.length = 0;
          this._isUpdateUBO = false;
          this._isUploadInstance = false;
          this._isUploadBatched = false;
          (_this$_blitDesc = this._blitDesc) === null || _this$_blitDesc === void 0 ? void 0 : _this$_blitDesc.reset();
        };

        _proto3.preRecord = function preRecord() {
          for (var _iterator = _createForOfIteratorHelperLoose(this._preSceneTasks), _step; !(_step = _iterator()).done;) {
            var task = _step.value;
            task.start();
            task.join();
            task.submit();
          }
        };

        _proto3.record = function record() {
          if (this._descSetData && this._descSetData.descriptorSet) {
            context.commandBuffer.bindDescriptorSet(SetIndex.COUNT, this._descSetData.descriptorSet);
          }

          for (var _iterator2 = _createForOfIteratorHelperLoose(this._sceneTasks), _step2; !(_step2 = _iterator2()).done;) {
            var task = _step2.value;
            task.start();
            task.join();
            task.submit();
          }
        };

        _proto3.postRecord = function postRecord() {
          for (var _iterator3 = _createForOfIteratorHelperLoose(this._postSceneTasks), _step3; !(_step3 = _iterator3()).done;) {
            var task = _step3.value;
            task.start();
            task.join();
            task.submit();
          }
        };

        _createClass(DeviceRenderQueue, [{
          key: "phaseID",
          get: function get() {
            return this._phaseID;
          }
        }, {
          key: "layoutID",
          get: function get() {
            return this._layoutID;
          },
          set: function set(value) {
            this._layoutID = value;
            var layoutGraph = context.layoutGraph;
            this._renderPhase = layoutGraph.tryGetRenderPhase(value);
            var layout = layoutGraph.getLayout(value);
            this._descSetData = layout.descriptorSets.get(UpdateFrequency.PER_PHASE);
          }
        }, {
          key: "descSetData",
          get: function get() {
            return this._descSetData;
          }
        }, {
          key: "renderPhase",
          get: function get() {
            return this._renderPhase;
          }
        }, {
          key: "queueId",
          get: function get() {
            return this._queueId;
          },
          set: function set(val) {
            this._queueId = val;
          }
        }, {
          key: "isUpdateUBO",
          get: function get() {
            return this._isUpdateUBO;
          },
          set: function set(update) {
            this._isUpdateUBO = update;
          }
        }, {
          key: "isUploadInstance",
          get: function get() {
            return this._isUploadInstance;
          },
          set: function set(value) {
            this._isUploadInstance = value;
          }
        }, {
          key: "isUploadBatched",
          get: function get() {
            return this._isUploadBatched;
          },
          set: function set(value) {
            this._isUploadBatched = value;
          }
        }, {
          key: "blitDesc",
          get: function get() {
            return this._blitDesc;
          }
        }, {
          key: "sceneTasks",
          get: function get() {
            return this._sceneTasks;
          }
        }, {
          key: "queueHint",
          get: function get() {
            return this._hint;
          },
          set: function set(value) {
            this._hint = value;
          }
        }, {
          key: "devicePass",
          get: function get() {
            return this._devicePass;
          }
        }, {
          key: "preSceneTasks",
          get: function get() {
            return this._preSceneTasks;
          }
        }]);

        return DeviceRenderQueue;
      }();

      SubmitInfo = /*#__PURE__*/function () {
        function SubmitInfo() {
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

        var _proto4 = SubmitInfo.prototype;

        _proto4.reset = function reset() {
          this.instances.clear();
          this.renderInstanceQueue.length = 0;
          this.batches.clear();
          this.opaqueList.length = 0;
          this.transparentList.length = 0;
          this.planarQueue = null;
          this.shadowMap = null;
          this.additiveLight = null;
          this.reflectionProbe = null;
        };

        return SubmitInfo;
      }();

      RenderPassLayoutInfo = /*#__PURE__*/function () {
        function RenderPassLayoutInfo(layoutId, input) {
          this._layoutID = 0;
          this._stage = null;
          this._layout = void 0;
          this._inputName = void 0;
          this._descriptorSet = null;
          this._inputName = input[0];
          this._layoutID = layoutId;
          var lg = context.layoutGraph;
          this._stage = lg.getRenderStage(layoutId);
          this._layout = lg.getLayout(layoutId);

          var layoutData = this._layout.descriptorSets.get(UpdateFrequency.PER_PASS);

          var globalDesc = context.pipeline.descriptorSet;

          if (layoutData) {
            // find resource
            var deviceTex = context.deviceTextures.get(this._inputName);
            var gfxTex = deviceTex === null || deviceTex === void 0 ? void 0 : deviceTex.texture;
            var layoutDesc = layoutData.descriptorSet;

            if (!gfxTex) {
              throw Error("Could not find texture with resource name " + this._inputName);
            }

            var resId = context.resourceGraph.vertex(this._inputName);
            var samplerInfo = context.resourceGraph.getSampler(resId); // bind descriptors

            for (var _iterator4 = _createForOfIteratorHelperLoose(input[1]), _step4; !(_step4 = _iterator4()).done;) {
              var descriptor = _step4.value;
              var descriptorName = descriptor.name;
              var descriptorID = lg.attributeIndex.get(descriptorName); // find descriptor binding

              for (var _iterator5 = _createForOfIteratorHelperLoose(layoutData.descriptorSetLayoutData.descriptorBlocks), _step5; !(_step5 = _iterator5()).done;) {
                var block = _step5.value;

                for (var i = 0; i !== block.descriptors.length; ++i) {
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

        _createClass(RenderPassLayoutInfo, [{
          key: "descriptorSet",
          get: function get() {
            return this._descriptorSet;
          }
        }, {
          key: "layoutID",
          get: function get() {
            return this._layoutID;
          }
        }, {
          key: "stage",
          get: function get() {
            return this._stage;
          }
        }, {
          key: "layout",
          get: function get() {
            return this._layout;
          }
        }]);

        return RenderPassLayoutInfo;
      }();

      RasterPassInfo = /*#__PURE__*/function () {
        function RasterPassInfo() {}

        var _proto5 = RasterPassInfo.prototype;

        _proto5._copyPass = function _copyPass(pass) {
          var rasterPass = this._pass || new RasterPass();
          rasterPass.width = pass.width;
          rasterPass.height = pass.height;
          rasterPass.versionName = pass.versionName;
          rasterPass.version = pass.version;
          rasterPass.showStatistics = pass.showStatistics;
          rasterPass.viewport.copy(pass.viewport);

          for (var _iterator6 = _createForOfIteratorHelperLoose(pass.rasterViews), _step6; !(_step6 = _iterator6()).done;) {
            var val = _step6.value;
            var currRasterKey = val[0];
            var currRasterView = val[1];
            var rasterView = rasterPass.rasterViews.get(currRasterKey) || new RasterView();
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

          for (var _iterator7 = _createForOfIteratorHelperLoose(pass.computeViews), _step7; !(_step7 = _iterator7()).done;) {
            var _val = _step7.value;
            var currComputeViews = _val[1];
            var currComputeKey = _val[0];
            var computeViews = rasterPass.computeViews.get(currComputeKey) || [];
            if (computeViews.length) computeViews.length = currComputeViews.length;
            var idx = 0;

            for (var _iterator8 = _createForOfIteratorHelperLoose(currComputeViews), _step8; !(_step8 = _iterator8()).done;) {
              var currComputeView = _step8.value;
              var computeView = computeViews[idx] || new ComputeView();
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
        };

        _proto5.applyInfo = function applyInfo(id, pass) {
          this._id = id;

          this._copyPass(pass);
        };

        _createClass(RasterPassInfo, [{
          key: "id",
          get: function get() {
            return this._id;
          }
        }, {
          key: "pass",
          get: function get() {
            return this._pass;
          }
        }]);

        return RasterPassInfo;
      }();

      profilerViewport = new Viewport();
      renderPassArea = new Rect();

      DeviceRenderPass = /*#__PURE__*/function () {
        function DeviceRenderPass(passInfo) {
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
          var device = context.device;
          this._layoutName = context.renderGraph.getLayout(passInfo.id);
          this._passID = cclegacy.rendering.getPassID(this._layoutName);
          var depthStencilAttachment = new DepthStencilAttachment();
          depthStencilAttachment.format = Format.DEPTH_STENCIL;
          depthStencilAttachment.depthLoadOp = LoadOp.DISCARD;
          depthStencilAttachment.stencilLoadOp = LoadOp.DISCARD;
          depthStencilAttachment.stencilStoreOp = StoreOp.DISCARD;
          depthStencilAttachment.depthStoreOp = StoreOp.DISCARD;
          var colors = [];
          var colorTexs = [];
          var depthTex = null;
          var swapchain = null;
          var framebuffer = null;

          for (var _iterator9 = _createForOfIteratorHelperLoose(passInfo.pass.computeViews), _step9; !(_step9 = _iterator9()).done;) {
            var cv = _step9.value;

            this._applyRenderLayout(cv);
          } // update the layout descriptorSet


          if (this.renderLayout && this.renderLayout.descriptorSet) {
            this.renderLayout.descriptorSet.update();
          }

          for (var _iterator10 = _createForOfIteratorHelperLoose(passInfo.pass.rasterViews), _step10; !(_step10 = _iterator10()).done;) {
            var _step10$value = _step10.value,
                resName = _step10$value[0],
                rasterV = _step10$value[1];
            var resTex = context.deviceTextures.get(resName);

            if (!resTex) {
              var resourceGraph = context.resourceGraph;
              var vertId = resourceGraph.vertex(resName);
              var resourceVisitor = new ResourceVisitor(resName);
              resourceGraph.visitVertex(resourceVisitor, vertId);
              resTex = context.deviceTextures.get(resName);
            } else {
              var resGraph = context.resourceGraph;
              var resId = resGraph.vertex(resName);
              var resFbo = resGraph._vertices[resId]._object;

              if (resTex.framebuffer && resFbo instanceof Framebuffer && resTex.framebuffer !== resFbo) {
                resTex.framebuffer = resFbo;
              }
            }

            if (!swapchain) swapchain = resTex.swapchain;
            if (!framebuffer) framebuffer = resTex.framebuffer;
            var clearFlag = rasterV.clearFlags & 0xffffffff;

            switch (rasterV.attachmentType) {
              case AttachmentType.RENDER_TARGET:
                {
                  if (!resTex.swapchain && !resTex.framebuffer) colorTexs.push(resTex.texture);

                  var _colorAttachment = new ColorAttachment();

                  _colorAttachment.format = resTex.description.format;
                  _colorAttachment.sampleCount = resTex.description.sampleCount;
                  _colorAttachment.loadOp = rasterV.loadOp;
                  _colorAttachment.storeOp = rasterV.storeOp;
                  _colorAttachment.barrier = device.getGeneralBarrier(new GeneralBarrierInfo(rasterV.loadOp === LoadOp.LOAD ? AccessFlagBit.COLOR_ATTACHMENT_WRITE : AccessFlagBit.NONE, rasterV.storeOp === StoreOp.STORE ? AccessFlagBit.COLOR_ATTACHMENT_WRITE : AccessFlagBit.NONE));

                  this._clearColor.push(rasterV.clearColor);

                  colors.push(_colorAttachment);
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
            var colorAttachment = new ColorAttachment();
            colors.push(colorAttachment);
          }

          if (colorTexs.length === 0 && !swapchain && !framebuffer) {
            var currTex = device.createTexture(new TextureInfo());
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

        var _proto6 = DeviceRenderPass.prototype;

        _proto6.addQueue = function addQueue(queue) {
          this._deviceQueues.push(queue);
        };

        _proto6.prePass = function prePass() {
          for (var _iterator11 = _createForOfIteratorHelperLoose(this._deviceQueues), _step11; !(_step11 = _iterator11()).done;) {
            var queue = _step11.value;
            queue.preRecord();
          }
        };

        _proto6._applyRenderLayout = function _applyRenderLayout(input) {
          var stageName = context.renderGraph.getLayout(this.rasterPassInfo.id);

          if (stageName) {
            var layoutGraph = context.layoutGraph;
            var stageId = layoutGraph.locateChild(layoutGraph.nullVertex(), stageName);

            if (stageId !== 0xFFFFFFFF) {
              this._layout = new RenderPassLayoutInfo(stageId, input);
            }
          }
        };

        _proto6.getGlobalDescData = function getGlobalDescData() {
          var stageId = context.layoutGraph.locateChild(context.layoutGraph.nullVertex(), 'default');
          assert(stageId !== 0xFFFFFFFF);
          var layout = context.layoutGraph.getLayout(stageId);
          var layoutData = layout.descriptorSets.get(UpdateFrequency.PER_PASS);
          return layoutData;
        };

        _proto6._applyViewport = function _applyViewport(frameTex) {
          this._viewport = null;
          var viewport = this._rasterInfo.pass.viewport;

          if (viewport.left !== 0 || viewport.top !== 0 || viewport.width !== 0 || viewport.height !== 0) {
            this._viewport = viewport;
          }
        };

        _proto6._showProfiler = function _showProfiler(rect) {
          var profiler = context.pipeline.profiler;

          if (!profiler || !profiler.enabled) {
            return;
          }

          var renderPass = this._renderPass;
          var cmdBuff = context.commandBuffer;
          var submodel = profiler.subModels[0];
          var pass = submodel.passes[0];
          var ia = submodel.inputAssembler;
          var device = context.device;
          var pso = PipelineStateManager.getOrCreatePipelineState(device, pass, submodel.shaders[0], renderPass, ia);
          var descData = getDescriptorSetDataFromLayoutId(pass.passID);
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
        ;

        _proto6.record = function record() {
          var tex = this.framebuffer.colorTextures[0];

          this._applyViewport(tex);

          var cmdBuff = context.commandBuffer;

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

          for (var _iterator12 = _createForOfIteratorHelperLoose(this._deviceQueues), _step12; !(_step12 = _iterator12()).done;) {
            var queue = _step12.value;
            queue.record();
          }

          if (this._rasterInfo.pass.showStatistics) {
            this._showProfiler(renderPassArea);
          }

          cmdBuff.endRenderPass();
        };

        _proto6._clear = function _clear() {
          for (var _iterator13 = _createForOfIteratorHelperLoose(context.submitMap), _step13; !(_step13 = _iterator13()).done;) {
            var _step13$value = _step13.value,
                cam = _step13$value[0],
                infoMap = _step13$value[1];

            for (var _iterator14 = _createForOfIteratorHelperLoose(infoMap), _step14; !(_step14 = _iterator14()).done;) {
              var _info$additiveLight;

              var _step14$value = _step14.value,
                  id = _step14$value[0],
                  info = _step14$value[1];
              (_info$additiveLight = info.additiveLight) === null || _info$additiveLight === void 0 ? void 0 : _info$additiveLight.clear();
              var it = info.instances.values();
              var res = it.next();

              while (!res.done) {
                res.value.clear();
                res = it.next();
              }

              info.renderInstanceQueue = [];
              info.instances.clear();
            }
          }
        };

        _proto6.postPass = function postPass() {
          this._clear(); // this.submitMap.clear();


          for (var _iterator15 = _createForOfIteratorHelperLoose(this._deviceQueues), _step15; !(_step15 = _iterator15()).done;) {
            var queue = _step15.value;
            queue.postRecord();
          }
        };

        _proto6.resetResource = function resetResource(id, pass) {
          this._rasterInfo.applyInfo(id, pass);

          this._deviceQueues.length = 0;
          var framebuffer = null;
          var colTextures = [];
          var depTexture = this._framebuffer.depthStencilTexture;

          for (var _iterator16 = _createForOfIteratorHelperLoose(this._rasterInfo.pass.computeViews), _step16; !(_step16 = _iterator16()).done;) {
            var cv = _step16.value;

            this._applyRenderLayout(cv);
          } // update the layout descriptorSet


          if (this.renderLayout && this.renderLayout.descriptorSet) {
            this.renderLayout.descriptorSet.update();
          }

          for (var _iterator17 = _createForOfIteratorHelperLoose(this._rasterInfo.pass.rasterViews), _step17; !(_step17 = _iterator17()).done;) {
            var _step17$value = _step17.value,
                resName = _step17$value[0],
                rasterV = _step17$value[1];
            var deviceTex = context.deviceTextures.get(resName);
            var resGraph = context.resourceGraph;
            var resId = resGraph.vertex(resName);
            var resFbo = resGraph._vertices[resId]._object;
            var resDesc = resGraph.getDesc(resId);

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
        };

        _createClass(DeviceRenderPass, [{
          key: "layoutName",
          get: function get() {
            return this._layoutName;
          }
        }, {
          key: "passID",
          get: function get() {
            return this._passID;
          }
        }, {
          key: "renderLayout",
          get: function get() {
            return this._layout;
          }
        }, {
          key: "renderPass",
          get: function get() {
            return this._renderPass;
          }
        }, {
          key: "framebuffer",
          get: function get() {
            return this._framebuffer;
          }
        }, {
          key: "clearColor",
          get: function get() {
            return this._clearColor;
          }
        }, {
          key: "clearDepth",
          get: function get() {
            return this._clearDepth;
          }
        }, {
          key: "clearStencil",
          get: function get() {
            return this._clearStencil;
          }
        }, {
          key: "deviceQueues",
          get: function get() {
            return this._deviceQueues;
          }
        }, {
          key: "rasterPassInfo",
          get: function get() {
            return this._rasterInfo;
          }
        }, {
          key: "viewport",
          get: function get() {
            return this._viewport;
          }
        }]);

        return DeviceRenderPass;
      }();

      DeviceSceneTransversal = /*#__PURE__*/function (_WebSceneTransversal) {
        _inheritsLoose(DeviceSceneTransversal, _WebSceneTransversal);

        function DeviceSceneTransversal(quque, sceneData, graphSceneData) {
          var _this2;

          var camera = graphSceneData.scene ? graphSceneData.scene.camera : null;
          _this2 = _WebSceneTransversal.call(this, camera, sceneData, context.ubo) || this;
          _this2._currentQueue = void 0;
          _this2._graphScene = void 0;
          _this2._preSceneTask = void 0;
          _this2._sceneTask = void 0;
          _this2._postSceneTask = void 0;
          _this2._currentQueue = quque;
          _this2._graphScene = graphSceneData;
          return _this2;
        }

        var _proto7 = DeviceSceneTransversal.prototype;

        _proto7.preRenderPass = function preRenderPass(visitor) {
          if (!this._preSceneTask) {
            this._preSceneTask = new DevicePreSceneTask(this._currentQueue, this._graphScene, visitor);
          }

          this._preSceneTask.apply(this._currentQueue, this.graphScene);

          return this._preSceneTask;
        };

        _proto7.transverse = function transverse(visitor) {
          if (!this._sceneTask) {
            this._sceneTask = new DeviceSceneTask(this._currentQueue, this._graphScene, visitor);
          }

          this._sceneTask.apply(this._currentQueue, this.graphScene);

          return this._sceneTask;
        };

        _proto7.postRenderPass = function postRenderPass(visitor) {
          if (!this._postSceneTask) {
            this._postSceneTask = new DevicePostSceneTask(this._sceneData, context.ubo, this._camera, visitor);
          }

          return this._postSceneTask;
        };

        _createClass(DeviceSceneTransversal, [{
          key: "graphScene",
          get: function get() {
            return this._graphScene;
          },
          set: function set(graphScene) {
            this._graphScene = graphScene;
            this._camera = graphScene.scene ? graphScene.scene.camera : null;
            if (this._camera) this._scene = this._camera.scene;
          }
        }]);

        return DeviceSceneTransversal;
      }(WebSceneTransversal);

      GraphScene = /*#__PURE__*/function () {
        function GraphScene() {
          this.scene = null;
          this.blit = null;
          this.dispatch = null;
          this.sceneID = -1;
        }

        var _proto8 = GraphScene.prototype;

        _proto8._copyScene = function _copyScene(scene) {
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

            for (var i = 0; i < scene.scenes.length; i++) {
              this.scene.scenes[i] = scene.scenes[i];
            }

            return;
          }

          this.scene = null;
        };

        _proto8._copyBlit = function _copyBlit(blit) {
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
        };

        _proto8.init = function init(scene, blit, sceneID) {
          this._copyScene(scene);

          this._copyBlit(blit);

          this.sceneID = sceneID;
        };

        return GraphScene;
      }();

      DevicePreSceneTask = /*#__PURE__*/function (_WebSceneTask) {
        _inheritsLoose(DevicePreSceneTask, _WebSceneTask);

        function DevicePreSceneTask(queue, graphScene, visitor) {
          var _this3;

          _this3 = _WebSceneTask.call(this, context.pipelineSceneData, context.ubo, graphScene.scene && graphScene.scene.camera ? graphScene.scene.camera : null, visitor) || this;
          _this3._currentQueue = void 0;
          _this3._renderPass = void 0;
          _this3._submitInfo = null;
          _this3._graphScene = void 0;
          _this3._cmdBuff = void 0;
          _this3._currentQueue = queue;
          _this3._graphScene = graphScene;
          _this3._renderPass = queue.devicePass.renderPass;
          _this3._cmdBuff = context.commandBuffer;
          return _this3;
        }

        var _proto9 = DevicePreSceneTask.prototype;

        _proto9.apply = function apply(queue, graphScene) {
          this._currentQueue = queue;
          this._graphScene = graphScene;
          this._renderPass = queue.devicePass.renderPass;
          this._cmdBuff = context.commandBuffer;
          var camera = graphScene.scene && graphScene.scene.camera ? graphScene.scene.camera : null;

          if (camera) {
            this._scene = camera.scene;
            this._camera = camera;
          }
        };

        _proto9.start = function start() {
          if (this.graphScene.blit) {
            this._currentQueue.createBlitDesc(this.graphScene.blit);

            return;
          }

          if (!this.camera) {
            return;
          }

          var devicePass = this._currentQueue.devicePass;
          var submitMap = context.submitMap;
          var submitInfoMap = submitMap.get(this.camera);

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
            _WebSceneTask.prototype.start.call(this);

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

            var probes = ReflectionProbeManager.probeManager.getProbes();

            for (var i = 0; i < probes.length; i++) {
              if (probes[i].hasFrameBuffer(this._currentQueue.devicePass.framebuffer)) {
                this._submitInfo.reflectionProbe.gatherRenderObjects(probes[i], this.camera, this._cmdBuff);

                break;
              }
            }

            return;
          }

          var sceneFlag = this._graphScene.scene.flags; // If it is not empty, it means that it has been added and will not be traversed.

          var isEmpty = !this._submitInfo.opaqueList.length && !this._submitInfo.transparentList.length && !this._submitInfo.instances.size && !this._submitInfo.batches.size;

          if (isEmpty) {
            for (var _iterator18 = _createForOfIteratorHelperLoose(this.sceneData.renderObjects), _step18; !(_step18 = _iterator18()).done;) {
              var ro = _step18.value;
              var subModels = ro.model.subModels;

              for (var _iterator19 = _createForOfIteratorHelperLoose(subModels), _step19; !(_step19 = _iterator19()).done;) {
                var subModel = _step19.value;
                var passes = subModel.passes;

                for (var _iterator20 = _createForOfIteratorHelperLoose(passes), _step20; !(_step20 = _iterator20()).done;) {
                  var p = _step20.value;
                  if ((isEnableEffect() ? p.phaseID : p.phase) !== this._currentQueue.phaseID) continue;
                  var batchingScheme = p.batchingScheme;

                  if (batchingScheme === BatchingSchemes.INSTANCING) {
                    var instancedBuffer = p.getInstancedBuffer();
                    instancedBuffer.merge(subModel, passes.indexOf(p));

                    this._submitInfo.instances.add(instancedBuffer);
                  } else if (batchingScheme === BatchingSchemes.VB_MERGING) {
                    var batchedBuffer = p.getBatchedBuffer();
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
        };

        _proto9._instancedSort = function _instancedSort() {
          var it = this._submitInfo.instances.values();

          var res = it.next();

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
        };

        _proto9._insertRenderList = function _insertRenderList(ro, subModelIdx, passIdx, isTransparent) {
          if (isTransparent === void 0) {
            isTransparent = false;
          }

          var subModel = ro.model.subModels[subModelIdx];
          var pass = subModel.passes[passIdx];
          var shader = subModel.shaders[passIdx];
          var currTransparent = pass.blendState.targets[0].blend;
          var devicePass = this._currentQueue.devicePass;
          var passId = devicePass.passID;
          var phase = isEnableEffect() ? this._currentQueue.phaseID // | cclegacy.rendering.getPhaseID(passId, 'planarShadow')
          : getPhaseID('default') | getPhaseID('planarShadow');

          if (currTransparent !== isTransparent || !(pass.phaseID & (isTransparent ? phase : this._currentQueue.phaseID))) {
            return;
          }

          var hash = 0 << 30 | pass.priority << 16 | subModel.priority << 8 | passIdx;
          var rp = context.pools.addPassInfo();
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
        ;

        _proto9._opaqueCompareFn = function _opaqueCompareFn(a, b) {
          return a.hash - b.hash || a.depth - b.depth || a.shaderId - b.shaderId;
        }
        /**
         * @en Comparison sorting function. Transparent objects are sorted by priority -> depth back to front -> shader ID.
         * @zh 比较排序函数。半透明对象按优先级 -> 深度由后向前 -> Shader ID 顺序排序。
         */
        ;

        _proto9._transparentCompareFn = function _transparentCompareFn(a, b) {
          return a.priority - b.priority || a.hash - b.hash || b.depth - a.depth || a.shaderId - b.shaderId;
        };

        _proto9._uploadInstanceBuffers = function _uploadInstanceBuffers() {
          if (this._currentQueue.isUploadInstance) return;

          var it = this._submitInfo.instances.values();

          var res = it.next();

          while (!res.done) {
            if (res.value.hasPendingModels) res.value.uploadBuffers(this._cmdBuff);
            res = it.next();
          }

          this._currentQueue.isUploadInstance = true;
        };

        _proto9._uploadBatchedBuffers = function _uploadBatchedBuffers() {
          if (this._currentQueue.isUploadBatched) return;

          var it = this._submitInfo.batches.values();

          var res = it.next();

          while (!res.done) {
            for (var b = 0; b < res.value.batches.length; ++b) {
              var batch = res.value.batches[b];

              if (!batch.mergeCount) {
                continue;
              }

              for (var v = 0; v < batch.vbs.length; ++v) {
                batch.vbs[v].update(batch.vbDatas[v]);
              }

              this._cmdBuff.updateBuffer(batch.vbIdx, batch.vbIdxData.buffer);

              this._cmdBuff.updateBuffer(batch.ubo, batch.uboData);
            }

            res = it.next();
          }

          this._currentQueue.isUploadBatched = true;
        };

        _proto9._isShadowMap = function _isShadowMap() {
          return this.sceneData.shadows.enabled && this.sceneData.shadows.type === ShadowType.ShadowMap && this.graphScene.scene.flags & SceneFlags.SHADOW_CASTER;
        };

        _proto9._updateGlobal = function _updateGlobal(data) {
          var devicePass = this._currentQueue.devicePass;
          updateGlobalDescBinding(data, isEnableEffect() ? context.renderGraph.getLayout(devicePass.rasterPassInfo.id) : 'default');
          if (!isEnableEffect()) context.pipeline.descriptorSet.update();
        };

        _proto9._setMainLightShadowTex = function _setMainLightShadowTex(data) {
          var graphScene = this.graphScene;

          if (graphScene.scene && graphScene.scene.camera) {
            var mainLight = graphScene.scene.camera.scene.mainLight;
            var shadowFrameBufferMap = this.sceneData.shadowFrameBufferMap;

            if (mainLight && shadowFrameBufferMap.has(mainLight)) {
              var shadowAttrID = context.layoutGraph.attributeIndex.get('cc_shadowMap');
              var defaultTex = builtinResMgr.get('default-texture').getGFXTexture();

              for (var _iterator21 = _createForOfIteratorHelperLoose(data.textures), _step21; !(_step21 = _iterator21()).done;) {
                var _step21$value = _step21.value,
                    key = _step21$value[0],
                    value = _step21$value[1];

                if (key === shadowAttrID) {
                  var tex = data.textures.get(shadowAttrID);

                  if (tex === defaultTex) {
                    data.textures.set(key, shadowFrameBufferMap.get(mainLight).colorTextures[0]);
                  }

                  return;
                }
              }
            }
          }
        };

        _proto9._updateUbo = function _updateUbo() {
          if (this._currentQueue.isUpdateUBO) return;
          var devicePass = this._currentQueue.devicePass;
          var rasterId = devicePass.rasterPassInfo.id;
          var passRenderData = context.renderGraph.getData(rasterId); // CCGlobal

          this._updateGlobal(passRenderData); // CCCamera, CCShadow, CCCSM


          var queueId = this._currentQueue.queueId;
          var queueRenderData = context.renderGraph.getData(queueId);

          this._setMainLightShadowTex(queueRenderData);

          this._updateGlobal(queueRenderData);

          if (isEnableEffect()) {
            var layoutName = context.renderGraph.getLayout(rasterId);
            var descSetData = getDescriptorSetDataFromLayout(layoutName);
            mergeSrcToTargetDesc(descSetData.descriptorSet, context.pipeline.descriptorSet, true);
          }

          this._currentQueue.isUpdateUBO = true;
        };

        _proto9.submit = function submit() {
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
        };

        _createClass(DevicePreSceneTask, [{
          key: "graphScene",
          get: function get() {
            return this._graphScene;
          }
        }]);

        return DevicePreSceneTask;
      }(WebSceneTask);

      sceneViewport = new Viewport();

      DeviceSceneTask = /*#__PURE__*/function (_WebSceneTask2) {
        _inheritsLoose(DeviceSceneTask, _WebSceneTask2);

        function DeviceSceneTask(queue, graphScene, visitor) {
          var _this4;

          _this4 = _WebSceneTask2.call(this, context.pipelineSceneData, context.ubo, graphScene.scene && graphScene.scene.camera ? graphScene.scene.camera : null, visitor) || this;
          _this4._currentQueue = void 0;
          _this4._renderPass = void 0;
          _this4._graphScene = void 0;
          _this4._currentQueue = queue;
          _this4._renderPass = _this4._currentQueue.devicePass.renderPass;
          _this4._graphScene = graphScene;
          return _this4;
        }

        var _proto10 = DeviceSceneTask.prototype;

        _proto10.apply = function apply(queue, graphScene) {
          this._currentQueue = queue;
          this._graphScene = graphScene;
          this._renderPass = queue.devicePass.renderPass;
          var camera = graphScene.scene && graphScene.scene.camera ? graphScene.scene.camera : null;

          if (camera) {
            this._scene = camera.scene;
            this._camera = camera;
          }
        };

        _proto10.start = function start() {};

        _proto10._recordRenderList = function _recordRenderList(isTransparent) {
          var submitMap = context.submitMap;
          var currSubmitInfo = submitMap.get(this.camera).get(this._currentQueue.phaseID);
          var renderList = isTransparent ? currSubmitInfo.transparentList : currSubmitInfo.opaqueList;

          for (var i = 0; i < renderList.length; ++i) {
            var _renderList$i = renderList[i],
                subModel = _renderList$i.subModel,
                passIdx = _renderList$i.passIdx;
            var inputAssembler = subModel.inputAssembler;
            var pass = subModel.passes[passIdx];
            var shader = subModel.shaders[passIdx];
            var pso = PipelineStateManager.getOrCreatePipelineState(deviceManager.gfxDevice, pass, shader, this._renderPass, inputAssembler);
            this.visitor.bindPipelineState(pso);
            this.visitor.bindDescriptorSet(SetIndex.MATERIAL, pass.descriptorSet);
            this.visitor.bindDescriptorSet(SetIndex.LOCAL, subModel.descriptorSet);
            this.visitor.bindInputAssembler(inputAssembler);
            this.visitor.draw(inputAssembler);
          }
        };

        _proto10._recordOpaqueList = function _recordOpaqueList() {
          this._recordRenderList(false);
        };

        _proto10._recordInstences = function _recordInstences() {
          var submitMap = context.submitMap;
          var currSubmitInfo = submitMap.get(this.camera).get(this._currentQueue.phaseID);
          var it = currSubmitInfo.renderInstanceQueue.length === 0 ? currSubmitInfo.instances.values() : currSubmitInfo.renderInstanceQueue.values();
          var res = it.next();

          while (!res.done) {
            var _res$value = res.value,
                instances = _res$value.instances,
                pass = _res$value.pass,
                hasPendingModels = _res$value.hasPendingModels;

            if (hasPendingModels) {
              this.visitor.bindDescriptorSet(SetIndex.MATERIAL, pass.descriptorSet);
              var lastPSO = null;

              for (var b = 0; b < instances.length; ++b) {
                var instance = instances[b];

                if (!instance.count) {
                  continue;
                }

                var shader = instance.shader;
                var pso = PipelineStateManager.getOrCreatePipelineState(deviceManager.gfxDevice, pass, shader, this._renderPass, instance.ia);

                if (lastPSO !== pso) {
                  this.visitor.bindPipelineState(pso);
                  lastPSO = pso;
                }

                var ia = instance.ia;
                this.visitor.bindDescriptorSet(SetIndex.LOCAL, instance.descriptorSet, res.value.dynamicOffsets);
                this.visitor.bindInputAssembler(ia);
                this.visitor.draw(ia);
              }
            }

            res = it.next();
          }
        };

        _proto10._recordBatches = function _recordBatches() {
          var submitMap = context.submitMap;
          var currSubmitInfo = submitMap.get(this.camera).get(this._currentQueue.phaseID);
          var it = currSubmitInfo.batches.values();
          var res = it.next();

          while (!res.done) {
            var boundPSO = false;

            for (var b = 0; b < res.value.batches.length; ++b) {
              var batch = res.value.batches[b];

              if (!batch.mergeCount) {
                continue;
              }

              if (!boundPSO) {
                var shader = batch.shader;
                var pso = PipelineStateManager.getOrCreatePipelineState(deviceManager.gfxDevice, batch.pass, shader, this._renderPass, batch.ia);
                this.visitor.bindPipelineState(pso);
                this.visitor.bindDescriptorSet(SetIndex.MATERIAL, batch.pass.descriptorSet);
                boundPSO = true;
              }

              var ia = batch.ia;
              this.visitor.bindDescriptorSet(SetIndex.LOCAL, batch.descriptorSet, res.value.dynamicOffsets);
              this.visitor.bindInputAssembler(ia);
              this.visitor.draw(ia);
            }

            res = it.next();
          }
        };

        _proto10._recordUI = function _recordUI() {
          var batches = this.camera.scene.batches;

          for (var i = 0; i < batches.length; i++) {
            var batch = batches[i];
            var visible = false;

            if (this.camera.visibility & batch.visFlags) {
              visible = true;
            }

            if (!visible) continue; // shaders.length always equals actual used passes.length

            var count = batch.shaders.length;

            for (var j = 0; j < count; j++) {
              var pass = batch.passes[j];
              if ((isEnableEffect() ? pass.phaseID : pass.phase) !== this._currentQueue.phaseID) continue;
              var shader = batch.shaders[j];
              var inputAssembler = batch.inputAssembler;
              var pso = PipelineStateManager.getOrCreatePipelineState(deviceManager.gfxDevice, pass, shader, this._renderPass, inputAssembler);
              this.visitor.bindPipelineState(pso);
              this.visitor.bindDescriptorSet(SetIndex.MATERIAL, pass.descriptorSet);
              var ds = batch.descriptorSet;
              this.visitor.bindDescriptorSet(SetIndex.LOCAL, ds);
              this.visitor.bindInputAssembler(inputAssembler);
              this.visitor.draw(inputAssembler);
            }
          }
        };

        _proto10._recordTransparentList = function _recordTransparentList() {
          this._recordRenderList(true);
        };

        _proto10._recordShadowMap = function _recordShadowMap() {
          var _currSubmitInfo$shado;

          var submitMap = context.submitMap;
          var currSubmitInfo = submitMap.get(this.camera).get(this._currentQueue.phaseID);
          (_currSubmitInfo$shado = currSubmitInfo.shadowMap) === null || _currSubmitInfo$shado === void 0 ? void 0 : _currSubmitInfo$shado.recordCommandBuffer(context.device, this._renderPass, context.commandBuffer);
        };

        _proto10._recordReflectionProbe = function _recordReflectionProbe() {
          var _currSubmitInfo$refle;

          var submitMap = context.submitMap;
          var currSubmitInfo = submitMap.get(this.camera).get(this._currentQueue.phaseID);
          (_currSubmitInfo$refle = currSubmitInfo.reflectionProbe) === null || _currSubmitInfo$refle === void 0 ? void 0 : _currSubmitInfo$refle.recordCommandBuffer(context.device, this._renderPass, context.commandBuffer);
        };

        _proto10._isShadowMap = function _isShadowMap() {
          return this.sceneData.shadows.enabled && this.sceneData.shadows.type === ShadowType.ShadowMap && this.graphScene.scene && this.graphScene.scene.flags & SceneFlags.SHADOW_CASTER;
        };

        _proto10._clearExtBlitDesc = function _clearExtBlitDesc(desc, extResId) {
          var toGpuDesc = desc.gpuDescriptorSet;

          for (var i = 0; i < extResId.length; i++) {
            var currDesc = toGpuDesc.gpuDescriptors[extResId[i]];
            if (currDesc.gpuBuffer) currDesc.gpuBuffer = null;else if (currDesc.gpuTextureView) {
              currDesc.gpuTextureView = null;
              currDesc.gpuSampler = null;
            } else if (currDesc.gpuTexture) {
              currDesc.gpuTexture = null;
              currDesc.gpuSampler = null;
            }
          }
        };

        _proto10._recordBlit = function _recordBlit() {
          if (!this.graphScene.blit) {
            return;
          }

          var blit = this.graphScene.blit;
          var currMat = blit.material;
          var pass = currMat.passes[blit.passID];
          pass.update();
          var shader = pass.getShaderVariant();
          var devicePass = this._currentQueue.devicePass;
          var screenIa = this._currentQueue.blitDesc.screenQuad.quadIA;
          var globalDesc = context.pipeline.descriptorSet;
          var pso;

          if (pass !== null && shader !== null && screenIa !== null) {
            pso = PipelineStateManager.getOrCreatePipelineState(context.device, pass, shader, devicePass.renderPass, screenIa);
          }

          if (pso) {
            this.visitor.bindPipelineState(pso);
            var layoutStage = devicePass.renderLayout;
            var layoutDesc = layoutStage.descriptorSet;
            var extResId = isEnableEffect() ? [] : mergeSrcToTargetDesc(pass.descriptorSet, layoutDesc); // if (isEnableEffect()) this.visitor.bindDescriptorSet(SetIndex.GLOBAL, layoutDesc);

            this.visitor.bindDescriptorSet(SetIndex.MATERIAL, isEnableEffect() ? pass.descriptorSet : layoutDesc);
            this.visitor.bindDescriptorSet(SetIndex.LOCAL, this._currentQueue.blitDesc.stageDesc);
            this.visitor.bindInputAssembler(screenIa);
            this.visitor.draw(screenIa); // The desc data obtained from the outside should be cleaned up so that the data can be modified

            this._clearExtBlitDesc(layoutDesc, extResId); // if (isEnableEffect()) this.visitor.bindDescriptorSet(SetIndex.GLOBAL, globalDesc);

          }
        };

        _proto10._recordAdditiveLights = function _recordAdditiveLights() {
          var _currSubmitInfo$addit;

          var devicePass = this._currentQueue.devicePass;
          var submitMap = context.submitMap;
          var currSubmitInfo = submitMap.get(this.camera).get(this._currentQueue.phaseID);
          (_currSubmitInfo$addit = currSubmitInfo.additiveLight) === null || _currSubmitInfo$addit === void 0 ? void 0 : _currSubmitInfo$addit.recordCommandBuffer(context.device, this._renderPass, context.commandBuffer);
        };

        _proto10._recordPlanarShadows = function _recordPlanarShadows() {
          var _currSubmitInfo$plana;

          var devicePass = this._currentQueue.devicePass;
          var submitMap = context.submitMap;
          var currSubmitInfo = submitMap.get(this.camera).get(this._currentQueue.phaseID);
          (_currSubmitInfo$plana = currSubmitInfo.planarQueue) === null || _currSubmitInfo$plana === void 0 ? void 0 : _currSubmitInfo$plana.recordCommandBuffer(context.device, this._renderPass, context.commandBuffer);
        };

        _proto10.submit = function submit() {
          var devicePass = this._currentQueue.devicePass;

          if (!this._currentQueue.devicePass.viewport) {
            var texture = this._currentQueue.devicePass.framebuffer.colorTextures[0];
            var graphScene = this.graphScene;
            var lightInfo = graphScene.scene ? graphScene.scene.light : null;
            var area = this._isShadowMap() && graphScene.scene && lightInfo.light ? getRenderArea(this.camera, texture.width, texture.height, lightInfo.light, lightInfo.level) : getRenderArea(this.camera, texture.width, texture.height);
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

          var graphSceneData = this.graphScene.scene;

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
        };

        _createClass(DeviceSceneTask, [{
          key: "graphScene",
          get: function get() {
            return this._graphScene;
          }
        }]);

        return DeviceSceneTask;
      }(WebSceneTask);

      DevicePostSceneTask = /*#__PURE__*/function (_WebSceneTask3) {
        _inheritsLoose(DevicePostSceneTask, _WebSceneTask3);

        function DevicePostSceneTask() {
          return _WebSceneTask3.apply(this, arguments) || this;
        }

        return DevicePostSceneTask;
      }(WebSceneTask);

      ExecutorPools = /*#__PURE__*/function () {
        function ExecutorPools(context) {
          this.deviceQueuePool = void 0;
          this.graphScenePool = void 0;
          this.reflectionProbe = void 0;
          this.passPool = void 0;
          this.rasterPassInfoPool = void 0;
          this.deviceQueuePool = new RecyclePool(function () {
            return new DeviceRenderQueue();
          }, 16);
          this.graphScenePool = new RecyclePool(function () {
            return new GraphScene();
          }, 16);
          this.rasterPassInfoPool = new RecyclePool(function () {
            return new RasterPassInfo();
          }, 16);
          this.reflectionProbe = new RecyclePool(function () {
            return new RenderReflectionProbeQueue(context.pipeline);
          }, 8);
          this.passPool = new RecyclePool(function () {
            return {
              priority: 0,
              hash: 0,
              depth: 0,
              shaderId: 0,
              subModel: null,
              passIdx: 0
            };
          }, 64);
        }

        var _proto11 = ExecutorPools.prototype;

        _proto11.addPassInfo = function addPassInfo() {
          return this.passPool.add();
        };

        _proto11.resetPassInfo = function resetPassInfo() {
          this.passPool.reset();
        };

        _proto11.addDeviceQueue = function addDeviceQueue() {
          return this.deviceQueuePool.add();
        };

        _proto11.addGraphScene = function addGraphScene() {
          return this.graphScenePool.add();
        };

        _proto11.addReflectionProbe = function addReflectionProbe() {
          return this.reflectionProbe.add();
        };

        _proto11.addRasterPassInfo = function addRasterPassInfo() {
          return this.rasterPassInfoPool.add();
        };

        _proto11.reset = function reset() {
          this.deviceQueuePool.reset();
          this.graphScenePool.reset();
          this.reflectionProbe.reset();
          this.resetPassInfo();
        };

        return ExecutorPools;
      }();

      vbData = new Float32Array(4 * 4);
      quadRect = new Rect();

      BlitInfo = /*#__PURE__*/function () {
        function BlitInfo(context) {
          this._pipelineIAData = void 0;
          this._context = void 0;
          this._width = void 0;
          this._height = void 0;
          this._stageDescs = new Map();
          this._context = context;
          this._width = context.width;
          this._height = context.height;
          this._pipelineIAData = this._createQuadInputAssembler();

          var vb = this._genQuadVertexData(SurfaceTransform.IDENTITY, new Rect(0, 0, context.width, context.height));

          this._pipelineIAData.quadVB.update(vb);

          this._createLightVolumes();

          this._localUBO = context.device.createBuffer(new BufferInfo(BufferUsageBit.UNIFORM | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.DEVICE, UBOLocal.SIZE, UBOLocal.SIZE));
        }

        var _proto12 = BlitInfo.prototype;

        _proto12.resize = function resize(width, height) {
          if (width !== this._width || height !== this._height) {
            quadRect.y = quadRect.x = 0;
            quadRect.width = width;
            quadRect.height = height;

            var vb = this._genQuadVertexData(SurfaceTransform.IDENTITY, quadRect);

            this._pipelineIAData.quadVB.update(vb);
          }
        };

        _proto12._createLightVolumes = function _createLightVolumes() {
          var device = this._context.root.device;
          var totalSize = Float32Array.BYTES_PER_ELEMENT * 4 * 4 * UBODeferredLight.LIGHTS_PER_PASS;
          totalSize = Math.ceil(totalSize / device.capabilities.uboOffsetAlignment) * device.capabilities.uboOffsetAlignment;
          this._lightVolumeBuffer = device.createBuffer(new BufferInfo(BufferUsageBit.UNIFORM | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, totalSize, device.capabilities.uboOffsetAlignment));
          this._deferredLitsBufView = device.createBuffer(new BufferViewInfo(this._lightVolumeBuffer, 0, totalSize));
          this._lightBufferData = new Float32Array(totalSize / Float32Array.BYTES_PER_ELEMENT);
        };

        _proto12._genQuadVertexData = function _genQuadVertexData(surfaceTransform, renderArea) {
          var minX = renderArea.x / this._context.width;
          var maxX = (renderArea.x + renderArea.width) / this._context.width;
          var minY = renderArea.y / this._context.height;
          var maxY = (renderArea.y + renderArea.height) / this._context.height;

          if (this._context.root.device.capabilities.screenSpaceSignY > 0) {
            var temp = maxY;
            maxY = minY;
            minY = temp;
          }

          var n = 0;

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
        };

        _proto12._createQuadInputAssembler = function _createQuadInputAssembler() {
          // create vertex buffer
          var inputAssemblerData = new PipelineInputAssemblerData();
          var vbStride = Float32Array.BYTES_PER_ELEMENT * 4;
          var vbSize = vbStride * 4;
          var device = cclegacy.director.root.device;
          var quadVB = device.createBuffer(new BufferInfo(BufferUsageBit.VERTEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.DEVICE | MemoryUsageBit.HOST, vbSize, vbStride));

          if (!quadVB) {
            return inputAssemblerData;
          } // create index buffer


          var ibStride = Uint8Array.BYTES_PER_ELEMENT;
          var ibSize = ibStride * 6;
          var quadIB = device.createBuffer(new BufferInfo(BufferUsageBit.INDEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.DEVICE, ibSize, ibStride));

          if (!quadIB) {
            return inputAssemblerData;
          }

          var indices = new Uint8Array(6);
          indices[0] = 0;
          indices[1] = 1;
          indices[2] = 2;
          indices[3] = 1;
          indices[4] = 3;
          indices[5] = 2;
          quadIB.update(indices); // create input assembler

          var attributes = new Array(2);
          attributes[0] = new Attribute('a_position', Format.RG32F);
          attributes[1] = new Attribute('a_texCoord', Format.RG32F);
          var quadIA = device.createInputAssembler(new InputAssemblerInfo(attributes, [quadVB], quadIB));
          inputAssemblerData.quadIB = quadIB;
          inputAssemblerData.quadVB = quadVB;
          inputAssemblerData.quadIA = quadIA;
          return inputAssemblerData;
        };

        _createClass(BlitInfo, [{
          key: "pipelineIAData",
          get: function get() {
            return this._pipelineIAData;
          }
        }, {
          key: "deferredLitsBufView",
          get: function get() {
            return this._deferredLitsBufView;
          }
        }, {
          key: "lightVolumeBuffer",
          get: function get() {
            return this._lightVolumeBuffer;
          }
        }, {
          key: "lightBufferData",
          get: function get() {
            return this._lightBufferData;
          }
        }, {
          key: "stageDescs",
          get: function get() {
            return this._stageDescs;
          }
        }, {
          key: "emptyLocalUBO",
          get: function get() {
            return this._localUBO;
          }
        }]);

        return BlitInfo;
      }();

      ExecutorContext = /*#__PURE__*/function () {
        function ExecutorContext(pipeline, ubo, device, resourceGraph, renderGraph, layoutGraph, width, height) {
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

        var _proto13 = ExecutorContext.prototype;

        _proto13.reset = function reset() {
          this.pools.reset();
          this.cullCamera = null;

          for (var _iterator22 = _createForOfIteratorHelperLoose(this.submitMap), _step22; !(_step22 = _iterator22()).done;) {
            var infoMap = _step22.value;

            for (var _iterator23 = _createForOfIteratorHelperLoose(infoMap[1]), _step23; !(_step23 = _iterator23()).done;) {
              var info = _step23.value;
              info[1].reset();
            }
          }
        };

        _proto13.resize = function resize(width, height) {
          this.width = width;
          this.height = height;
          this.blit.resize(width, height);
        };

        return ExecutorContext;
      }();

      ResourceVisitor = /*#__PURE__*/function () {
        function ResourceVisitor(resName) {
          this.name = void 0;
          this.name = resName;
        }

        var _proto14 = ResourceVisitor.prototype;

        _proto14.createDeviceTex = function createDeviceTex(value) {
          var deviceTex = new DeviceTexture(this.name, value);
          context.deviceTextures.set(this.name, deviceTex);
        };

        _proto14.managed = function managed(value) {
          this.createDeviceTex(value);
        };

        _proto14.managedBuffer = function managedBuffer(value) {// noop
        };

        _proto14.managedTexture = function managedTexture(value) {// noop
        };

        _proto14.persistentBuffer = function persistentBuffer(value) {};

        _proto14.persistentTexture = function persistentTexture(value) {
          this.createDeviceTex(value);
        };

        _proto14.framebuffer = function framebuffer(value) {
          this.createDeviceTex(value);
        };

        _proto14.swapchain = function swapchain(value) {
          this.createDeviceTex(value);
        };

        return ResourceVisitor;
      }();

      _export("Executor", Executor = /*#__PURE__*/function () {
        function Executor(pipeline, ubo, device, resourceGraph, layoutGraph, width, height) {
          this._context = void 0;
          this._visitor = void 0;
          context = this._context = new ExecutorContext(pipeline, ubo, device, resourceGraph, new RenderGraph(), layoutGraph, width, height);
        }

        var _proto15 = Executor.prototype;

        _proto15.resize = function resize(width, height) {
          context.resize(width, height);
        };

        _proto15.execute = function execute(rg) {
          context.renderGraph = rg;
          context.reset();
          var cmdBuff = context.commandBuffer;
          cmdBuff.begin();
          if (!this._visitor) this._visitor = new RenderVisitor();
          depthFirstSearch(this._visitor.graphView, this._visitor, this._visitor.colorMap);
          cmdBuff.end();
          context.device.queue.submit([cmdBuff]);
        };

        _proto15.release = function release() {
          context.devicePasses.clear();

          for (var _iterator24 = _createForOfIteratorHelperLoose(context.deviceTextures), _step24; !(_step24 = _iterator24()).done;) {
            var _step24$value = _step24.value,
                k = _step24$value[0],
                v = _step24$value[1];
            v.release();
          }

          context.deviceTextures.clear();
        };

        return Executor;
      }());

      BaseRenderVisitor = /*#__PURE__*/function () {
        function BaseRenderVisitor() {
          this.queueID = 0xFFFFFFFF;
          this.sceneID = 0xFFFFFFFF;
          this.passID = 0xFFFFFFFF;
          this.currPass = void 0;
          this.currQueue = void 0;
          this.rg = void 0;
          this.rg = context.renderGraph;
        }

        var _proto16 = BaseRenderVisitor.prototype;

        _proto16._isRasterPass = function _isRasterPass(u) {
          return !!context.renderGraph.tryGetRasterPass(u);
        };

        _proto16._isQueue = function _isQueue(u) {
          return !!context.renderGraph.tryGetQueue(u);
        };

        _proto16._isScene = function _isScene(u) {
          return !!context.renderGraph.tryGetScene(u);
        };

        _proto16._isBlit = function _isBlit(u) {
          return !!context.renderGraph.tryGetBlit(u);
        };

        _proto16.applyID = function applyID(id) {
          if (this._isRasterPass(id)) {
            this.passID = id;
          } else if (this._isQueue(id)) {
            this.queueID = id;
          } else if (this._isScene(id) || this._isBlit(id)) {
            this.sceneID = id;
          }
        };

        return BaseRenderVisitor;
      }();

      PreRenderVisitor = /*#__PURE__*/function (_BaseRenderVisitor) {
        _inheritsLoose(PreRenderVisitor, _BaseRenderVisitor);

        function PreRenderVisitor() {
          return _BaseRenderVisitor.call(this) || this;
        }

        var _proto17 = PreRenderVisitor.prototype;

        _proto17.clear = function clear(value) {// do nothing
        };

        _proto17.viewport = function viewport(value) {// do nothing
        };

        _proto17.rasterPass = function rasterPass(pass) {
          if (!this.rg.getValid(this.passID)) return;
          var devicePasses = context.devicePasses;

          if (pass.versionName === '') {
            var passHash = stringify(pass);
            this.currPass = devicePasses.get(passHash);

            if (!this.currPass) {
              var rasterInfo = context.pools.addRasterPassInfo();
              rasterInfo.applyInfo(this.passID, pass);
              this.currPass = new DeviceRenderPass(rasterInfo);
              devicePasses.set(passHash, this.currPass);
            } else {
              this.currPass.resetResource(this.passID, pass);
            }
          } else {
            var _passHash = pass.versionName;
            this.currPass = devicePasses.get(_passHash);
            var currRasterPass = this.currPass ? this.currPass.rasterPassInfo.pass : null;

            if (!this.currPass || currRasterPass.version !== pass.version) {
              var _rasterInfo = context.pools.addRasterPassInfo();

              _rasterInfo.applyInfo(this.passID, pass);

              this.currPass = new DeviceRenderPass(_rasterInfo);
              devicePasses.set(_passHash, this.currPass);
            } else {
              this.currPass.resetResource(this.passID, pass);
            }
          }
        };

        _proto17.rasterSubpass = function rasterSubpass(value) {};

        _proto17.computeSubpass = function computeSubpass(value) {};

        _proto17.compute = function compute(value) {};

        _proto17.copy = function copy(value) {};

        _proto17.move = function move(value) {};

        _proto17.raytrace = function raytrace(value) {};

        _proto17.queue = function queue(value) {
          if (!this.rg.getValid(this.queueID)) return;
          var deviceQueue = context.pools.addDeviceQueue();
          deviceQueue.init(this.currPass, value.hint, this.queueID);
          this.currQueue = deviceQueue;
          this.currPass.addQueue(deviceQueue);
          var layoutName = this.rg.getLayout(this.queueID);

          if (layoutName) {
            var layoutGraph = context.layoutGraph;

            if (this.currPass.renderLayout) {
              var layoutId = layoutGraph.locateChild(this.currPass.renderLayout.layoutID, layoutName);
              this.currQueue.layoutID = layoutId;
            }
          }
        };

        _proto17.scene = function scene(value) {
          if (!this.rg.getValid(this.sceneID)) return;
          var graphScene = context.pools.addGraphScene();
          graphScene.init(value, null, this.sceneID);
          this.currQueue.addSceneTask(graphScene);
        };

        _proto17.blit = function blit(value) {
          if (!this.rg.getValid(this.sceneID)) return;
          var graphScene = context.pools.addGraphScene();
          graphScene.init(null, value, -1);
          this.currQueue.addSceneTask(graphScene);
        };

        _proto17.dispatch = function dispatch(value) {};

        return PreRenderVisitor;
      }(BaseRenderVisitor);

      PostRenderVisitor = /*#__PURE__*/function (_BaseRenderVisitor2) {
        _inheritsLoose(PostRenderVisitor, _BaseRenderVisitor2);

        function PostRenderVisitor() {
          return _BaseRenderVisitor2.call(this) || this;
        }

        var _proto18 = PostRenderVisitor.prototype;

        _proto18.clear = function clear(value) {// do nothing
        };

        _proto18.viewport = function viewport(value) {// do nothing
        };

        _proto18.rasterPass = function rasterPass(pass) {
          var devicePasses = context.devicePasses;
          var passHash = pass.versionName === '' ? stringify(pass) : pass.versionName;
          var currPass = devicePasses.get(passHash);
          if (!currPass) return;
          this.currPass = currPass;
          this.currPass.prePass();
          this.currPass.record();
          this.currPass.postPass();
        };

        _proto18.rasterSubpass = function rasterSubpass(value) {};

        _proto18.computeSubpass = function computeSubpass(value) {};

        _proto18.compute = function compute(value) {};

        _proto18.copy = function copy(value) {};

        _proto18.move = function move(value) {};

        _proto18.raytrace = function raytrace(value) {};

        _proto18.queue = function queue(value) {// collect scene results
        };

        _proto18.scene = function scene(value) {// scene command list finished
        };

        _proto18.blit = function blit(value) {};

        _proto18.dispatch = function dispatch(value) {};

        return PostRenderVisitor;
      }(BaseRenderVisitor);

      _export("RenderVisitor", RenderVisitor = /*#__PURE__*/function (_DefaultVisitor) {
        _inheritsLoose(RenderVisitor, _DefaultVisitor);

        function RenderVisitor() {
          var _this5;

          _this5 = _DefaultVisitor.call(this) || this;
          _this5._preVisitor = void 0;
          _this5._postVisitor = void 0;
          _this5._graphView = void 0;
          _this5._colorMap = void 0;
          _this5._preVisitor = new PreRenderVisitor();
          _this5._postVisitor = new PostRenderVisitor();
          _this5._graphView = new ReferenceGraphView(context.renderGraph);
          _this5._colorMap = new VectorGraphColorMap(context.renderGraph.numVertices());
          return _this5;
        }

        var _proto19 = RenderVisitor.prototype;

        _proto19.discoverVertex = function discoverVertex(u, gv) {
          var g = gv.g;

          this._preVisitor.applyID(u);

          g.visitVertex(this._preVisitor, u);
        };

        _proto19.finishVertex = function finishVertex(v, gv) {
          var g = gv.g;
          g.visitVertex(this._postVisitor, v);
        };

        _createClass(RenderVisitor, [{
          key: "graphView",
          get: function get() {
            return this._graphView;
          }
        }, {
          key: "colorMap",
          get: function get() {
            return this._colorMap;
          }
        }]);

        return RenderVisitor;
      }(DefaultVisitor));
    }
  };
});