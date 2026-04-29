System.register("q-bundled:///fs/cocos/render-scene/scene/model.js", ["../../../../virtual/internal%253Aconstants.js", "../../asset/asset-manager/builtin-res-mgr.js", "../../scene-graph/layers.js", "./submodel.js", "../../core/index.js", "../../gfx/index.js", "../../rendering/define.js", "./shadows.js", "./reflection-probe.js"], function (_export, _context) {
  "use strict";

  var EDITOR, builtinResMgr, Layers, SubModel, Mat4, Vec3, Vec4, geometry, cclegacy, EPSILON, BufferInfo, BufferUsageBit, MemoryUsageBit, Filter, Address, SamplerInfo, deviceManager, UBOLocal, UBOSH, UBOWorldBound, UNIFORM_LIGHTMAP_TEXTURE_BINDING, UNIFORM_REFLECTION_PROBE_CUBEMAP_BINDING, UNIFORM_REFLECTION_PROBE_DATA_MAP_BINDING, UNIFORM_REFLECTION_PROBE_TEXTURE_BINDING, ShadowType, ProbeType, Model, m4_1, shadowMapPatches, staticLightMapPatches, stationaryLightMapPatches, highpLightMapPatches, lightProbePatches, CC_USE_REFLECTION_PROBE, CC_DISABLE_DIRECTIONAL_LIGHT, ModelType, lightmapSamplerHash, lightmapSamplerWithMipHash;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export({
    Model: void 0,
    ModelType: void 0
  });

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_assetAssetManagerBuiltinResMgrJs) {
      builtinResMgr = _assetAssetManagerBuiltinResMgrJs.builtinResMgr;
    }, function (_sceneGraphLayersJs) {
      Layers = _sceneGraphLayersJs.Layers;
    }, function (_submodelJs) {
      SubModel = _submodelJs.SubModel;
    }, function (_coreIndexJs) {
      Mat4 = _coreIndexJs.Mat4;
      Vec3 = _coreIndexJs.Vec3;
      Vec4 = _coreIndexJs.Vec4;
      geometry = _coreIndexJs.geometry;
      cclegacy = _coreIndexJs.cclegacy;
      EPSILON = _coreIndexJs.EPSILON;
    }, function (_gfxIndexJs) {
      BufferInfo = _gfxIndexJs.BufferInfo;
      BufferUsageBit = _gfxIndexJs.BufferUsageBit;
      MemoryUsageBit = _gfxIndexJs.MemoryUsageBit;
      Filter = _gfxIndexJs.Filter;
      Address = _gfxIndexJs.Address;
      SamplerInfo = _gfxIndexJs.SamplerInfo;
      deviceManager = _gfxIndexJs.deviceManager;
    }, function (_renderingDefineJs) {
      UBOLocal = _renderingDefineJs.UBOLocal;
      UBOSH = _renderingDefineJs.UBOSH;
      UBOWorldBound = _renderingDefineJs.UBOWorldBound;
      UNIFORM_LIGHTMAP_TEXTURE_BINDING = _renderingDefineJs.UNIFORM_LIGHTMAP_TEXTURE_BINDING;
      UNIFORM_REFLECTION_PROBE_CUBEMAP_BINDING = _renderingDefineJs.UNIFORM_REFLECTION_PROBE_CUBEMAP_BINDING;
      UNIFORM_REFLECTION_PROBE_DATA_MAP_BINDING = _renderingDefineJs.UNIFORM_REFLECTION_PROBE_DATA_MAP_BINDING;
      UNIFORM_REFLECTION_PROBE_TEXTURE_BINDING = _renderingDefineJs.UNIFORM_REFLECTION_PROBE_TEXTURE_BINDING;
    }, function (_shadowsJs) {
      ShadowType = _shadowsJs.ShadowType;
    }, function (_reflectionProbeJs) {
      ProbeType = _reflectionProbeJs.ProbeType;
    }],
    execute: function () {
      m4_1 = new Mat4();
      shadowMapPatches = [{
        name: 'CC_RECEIVE_SHADOW',
        value: true
      }];
      staticLightMapPatches = [{
        name: 'CC_USE_LIGHTMAP',
        value: 1
      }];
      stationaryLightMapPatches = [{
        name: 'CC_USE_LIGHTMAP',
        value: 2
      }];
      highpLightMapPatches = [{
        name: 'CC_LIGHT_MAP_VERSION',
        value: 2
      }];
      lightProbePatches = [{
        name: 'CC_USE_LIGHT_PROBE',
        value: true
      }];
      CC_USE_REFLECTION_PROBE = 'CC_USE_REFLECTION_PROBE';
      CC_DISABLE_DIRECTIONAL_LIGHT = 'CC_DISABLE_DIRECTIONAL_LIGHT';

      (function (ModelType) {
        ModelType[ModelType["DEFAULT"] = 0] = "DEFAULT";
        ModelType[ModelType["SKINNING"] = 1] = "SKINNING";
        ModelType[ModelType["BAKED_SKINNING"] = 2] = "BAKED_SKINNING";
        ModelType[ModelType["BATCH_2D"] = 3] = "BATCH_2D";
        ModelType[ModelType["PARTICLE_BATCH"] = 4] = "PARTICLE_BATCH";
        ModelType[ModelType["LINE"] = 5] = "LINE";
      })(ModelType || _export("ModelType", ModelType = {}));

      lightmapSamplerHash = new SamplerInfo(Filter.LINEAR, Filter.LINEAR, Filter.NONE, Address.CLAMP, Address.CLAMP, Address.CLAMP);
      lightmapSamplerWithMipHash = new SamplerInfo(Filter.LINEAR, Filter.LINEAR, Filter.LINEAR, Address.CLAMP, Address.CLAMP, Address.CLAMP);
      /**
       * @en A representation of a model instance
       * The base model class, which is the core component of [[MeshRenderer]],
       * adds its own Model to the rendered scene for rendering submissions when [[MeshRenderer]] is enabled.
       * This type of object represents a rendering instance in a scene, and it can contain multiple sub models,
       * each of which corresponds to a material. These sub models share the same location and form a complete object.
       * Each sub model references a sub mesh resource, which provides vertex and index buffers for rendering.
       * @zh 代表一个模型实例
       * 基础模型类，它是 [[MeshRenderer]] 的核心组成部分，在 [[MeshRenderer]] 启用时会将自己的 Model 添加到渲染场景中用于提交渲染。
       * 此类型对象代表一个场景中的渲染实例，它可以包含多个子模型，每个子模型对应一个材质。这些子模型共享同样的位置，组成一个完整的物体。
       * 每个子模型引用一个子网格资源，后者提供渲染所用的顶点与索引缓冲。
       */

      _export("Model", Model = class Model {
        /**
         * @en Sub models of the current model
         * @zh 获取所有子模型
         */
        get subModels() {
          return this._subModels;
        }
        /**
         * @en Whether the model is initialized
         * @zh 是否初始化
         */


        get inited() {
          return this._inited;
        }
        /**
         * @en The axis-aligned bounding box of the model in the world space
         * @zh 获取世界空间包围盒
         */


        get worldBounds() {
          return this._worldBounds;
        }
        /**
         * @en The axis-aligned bounding box of the model in the model space
         * @zh 获取模型空间包围盒
         */


        get modelBounds() {
          return this._modelBounds;
        }
        /**
         * @en The ubo buffer of the model
         * @zh 获取模型的 ubo 缓冲
         */


        get localBuffer() {
          return this._localBuffer;
        }
        /**
         * @en The SH ubo buffer of the model
         * @zh 获取模型的球谐 ubo 缓冲
         */


        get localSHBuffer() {
          return this._localSHBuffer;
        }
        /**
         * @en The world bound ubo buffer
         * @zh 获取世界包围盒 ubo 缓冲
         */


        get worldBoundBuffer() {
          return this._worldBoundBuffer;
        }
        /**
         * @en The time stamp of last update
         * @zh 获取上次更新时间戳
         */


        get updateStamp() {
          return this._updateStamp;
        }
        /**
         * @en Use LightProbe or not
         * @zh 光照探针开关
         */


        get useLightProbe() {
          return this._useLightProbe;
        }

        set useLightProbe(val) {
          this._useLightProbe = val;
          this.onMacroPatchesStateChanged();
        }
        /**
         * @en located tetrahedron index
         * @zh 模型所处的四面体索引
         */


        get tetrahedronIndex() {
          return this._tetrahedronIndex;
        }

        set tetrahedronIndex(index) {
          this._tetrahedronIndex = index;
        }
        /**
         * @en Model level shadow bias
         * @zh 阴影偏移值
         */


        get shadowBias() {
          return this._shadowBias;
        }

        set shadowBias(val) {
          this._shadowBias = val;
        }
        /**
         * @en Model level shadow normal bias
         * @zh 阴影法线偏移值
         */


        get shadowNormalBias() {
          return this._shadowNormalBias;
        }

        set shadowNormalBias(val) {
          this._shadowNormalBias = val;
        }
        /**
         * @en Whether the model should receive shadow
         * @zh 是否接收阴影
         */


        get receiveShadow() {
          return this._receiveShadow;
        }

        set receiveShadow(val) {
          this._receiveShadow = val;
          this.onMacroPatchesStateChanged();
        }
        /**
         * @en Whether the model should cast shadow
         * @zh 是否投射阴影
         */


        get castShadow() {
          return this._castShadow;
        }

        set castShadow(val) {
          this._castShadow = val;
        }
        /**
         * @en Gets or sets receive direction Light.
         * @zh 获取或者设置接收平行光光照。
         */


        get receiveDirLight() {
          return this._receiveDirLight;
        }

        set receiveDirLight(val) {
          this._receiveDirLight = val;
          this.onMacroPatchesStateChanged();
        }
        /**
         * @en The node to which the model belongs
         * @zh 模型所在的节点
         */


        get node() {
          return this._node;
        }

        set node(n) {
          this._node = n;
        }
        /**
         * @en Model's transform
         * @zh 模型的变换
         */


        get transform() {
          return this._transform;
        }

        set transform(n) {
          this._transform = n;
        }
        /**
         * @en Model's visibility tag
         * Model's visibility flags, it's different from [[Node.layer]],
         * but it will also be compared with [[Camera.visibility]] during culling process.
         * @zh 模型的可见性标志
         * 模型的可见性标志与 [[Node.layer]] 不同，它会在剔除阶段与 [[Camera.visibility]] 进行比较
         */


        get visFlags() {
          return this._visFlags;
        }

        set visFlags(val) {
          this._visFlags = val;
        }
        /**
         * @en Whether the model is enabled in the render scene so that it will be rendered
         * @zh 模型是否在渲染场景中启用并被渲染
         */


        get enabled() {
          return this._enabled;
        }

        set enabled(val) {
          this._enabled = val;
        }
        /**
         * @en Rendering priority in the transparent queue of model.
         * @zh Model 在透明队列中的渲染排序优先级
         */


        get priority() {
          return this._priority;
        }

        set priority(val) {
          this._priority = val;
        }
        /**
         * @en Whether the model can be render by the reflection probe
         * @zh 模型是否能被反射探针渲染
         */


        get bakeToReflectionProbe() {
          return this._bakeToReflectionProbe;
        }

        set bakeToReflectionProbe(val) {
          this._bakeToReflectionProbe = val;
        }
        /**
         * @en Reflection probe type
         * @zh 反射探针类型。
         */


        get reflectionProbeType() {
          return this._reflectionProbeType;
        }

        set reflectionProbeType(val) {
          this._reflectionProbeType = val;
          const subModels = this._subModels;

          for (let i = 0; i < subModels.length; i++) {
            subModels[i].useReflectionProbeType = val;
          }

          this.onMacroPatchesStateChanged();
        }
        /**
         * @en sets or gets reflection probe id
         * @zh 设置或获取反射探针id。
         */


        get reflectionProbeId() {
          return this._reflectionProbeId;
        }

        set reflectionProbeId(val) {
          this._reflectionProbeId = val;
        }
        /**
         * @en The type of the model
         * @zh 模型类型
         */


        /**
         * @internal
         * @en native object
         * @zh 原生对象
         */

        /**
         * @internal
         * @en return native object
         * @zh 返回原生对象
         */

        /**
         * @en Constructor to create an empty model
         * @zh 创建一个空模型
         */
        constructor() {
          this.type = ModelType.DEFAULT;
          this.scene = null;
          this.isDynamicBatching = false;
          this._worldBounds = null;
          this._modelBounds = null;
          this._subModels = [];
          this._node = null;
          this._transform = null;
          this._device = void 0;
          this._inited = false;
          this._descriptorSetCount = 1;
          this._updateStamp = -1;
          this._localDataUpdated = true;
          this._localData = new Float32Array(UBOLocal.COUNT);
          this._localBuffer = null;
          this._localSHData = null;
          this._localSHBuffer = null;
          this._lightmap = null;
          this._lightmapUVParam = new Vec4();
          this._tetrahedronIndex = -1;
          this._lastWorldBoundCenter = new Vec3(Infinity, Infinity, Infinity);
          this._useLightProbe = false;
          this._worldBoundBuffer = null;
          this._receiveShadow = false;
          this._castShadow = false;
          this._receiveDirLight = true;
          this._shadowBias = 0;
          this._shadowNormalBias = 0;
          this._reflectionProbeId = -1;
          this._enabled = true;
          this._visFlags = Layers.Enum.NONE;
          this._priority = 0;
          this._bakeToReflectionProbe = true;
          this._reflectionProbeType = 0;
          this._device = deviceManager.gfxDevice;
        }
        /**
         * @en Initialize the model
         * @zh 初始化模型
         */


        initialize() {
          if (this._inited) {
            return;
          }

          this._receiveShadow = true;
          this.castShadow = false;
          this.enabled = true;
          this.visFlags = Layers.Enum.NONE;
          this._inited = true;
          this._bakeToReflectionProbe = true;
          this._reflectionProbeType = 0;
        }
        /**
         * @en Destroy the model
         * @zh 销毁模型
         */


        destroy() {
          const subModels = this._subModels;

          for (let i = 0; i < subModels.length; i++) {
            this._subModels[i].destroy();
          }

          if (this._localBuffer) {
            this._localBuffer.destroy();

            this._localBuffer = null;
          }

          if (this._localSHBuffer) {
            this._localSHBuffer.destroy();

            this._localSHBuffer = null;
          }

          if (this._worldBoundBuffer) {
            this._worldBoundBuffer.destroy();

            this._worldBoundBuffer = null;
          }

          this._worldBounds = null;
          this._modelBounds = null;
          this._subModels.length = 0;
          this._inited = false;
          this._localDataUpdated = true;
          this._transform = null;
          this._node = null;
          this.isDynamicBatching = false;
        }
        /**
         * @en Attach the model to a [[renderer.RenderScene]]
         * @zh 添加模型到渲染场景 [[renderer.RenderScene]] 中
         * @param scene destination scene
         */


        attachToScene(scene) {
          this.scene = scene;
          this._localDataUpdated = true;
        }
        /**
         * @en Detach the model from its render scene
         * @zh 移除场景中的模型
         */


        detachFromScene() {
          this.scene = null;
        }
        /**
         * @en Update the model's transform
         * @zh 更新模型的变换
         * @param stamp time stamp
         */


        updateTransform(stamp) {
          const node = this.transform;

          if (node.hasChangedFlags || node.isTransformDirty()) {
            node.updateWorldTransform();
            this._localDataUpdated = true;
            const worldBounds = this._worldBounds;

            if (this._modelBounds && worldBounds) {
              // @ts-expect-error TS2445
              this._modelBounds.transform(node._mat, node._pos, node._rot, node._scale, worldBounds);
            }
          }
        }
        /**
         * @en Update the model's world AABB
         * @zh 更新模型的世界空间包围盒
         */


        updateWorldBound() {
          const node = this.transform;

          if (node !== null) {
            node.updateWorldTransform();
            this._localDataUpdated = true;
            const worldBounds = this._worldBounds;

            if (this._modelBounds && worldBounds) {
              // @ts-expect-error TS2445
              this._modelBounds.transform(node._mat, node._pos, node._rot, node._scale, worldBounds);
            }
          }
        }
        /**
         * @en Update the model's ubo
         * @zh 更新模型的 ubo
         * @param stamp time stamp
         */


        updateUBOs(stamp) {
          const subModels = this._subModels;

          for (let i = 0; i < subModels.length; i++) {
            subModels[i].update();
          }

          this._updateStamp = stamp;
          this.updateSHUBOs();
          const forceUpdateUBO = this.node.scene.globals.shadows.enabled && this.node.scene.globals.shadows.type === ShadowType.Planar;

          if (!this._localDataUpdated) {
            return;
          }

          this._localDataUpdated = false; // @ts-expect-error using private members here for efficiency

          const worldMatrix = this.transform._mat;
          let hasNonInstancingPass = false;

          for (let i = 0; i < subModels.length; i++) {
            const subModel = subModels[i];
            const idx = subModel.instancedWorldMatrixIndex;

            if (idx >= 0) {
              subModel.updateInstancedWorldMatrix(worldMatrix, idx);
            } else {
              hasNonInstancingPass = true;
            }
          }

          if ((hasNonInstancingPass || forceUpdateUBO) && this._localBuffer) {
            Mat4.toArray(this._localData, worldMatrix, UBOLocal.MAT_WORLD_OFFSET);
            Mat4.inverseTranspose(m4_1, worldMatrix);
            Mat4.toArray(this._localData, m4_1, UBOLocal.MAT_WORLD_IT_OFFSET);

            this._localBuffer.update(this._localData);
          }
        }

        showTetrahedron() {
          return this.isLightProbeAvailable();
        }

        isLightProbeAvailable() {
          if (!this._useLightProbe) {
            return false;
          }

          const lightProbes = cclegacy.director.root.pipeline.pipelineSceneData.lightProbes;

          if (!lightProbes || lightProbes.empty()) {
            return false;
          }

          if (!this._worldBounds) {
            return false;
          }

          return true;
        }

        updateSHBuffer() {
          if (!this._localSHData) {
            return;
          }

          const subModels = this._subModels;
          let hasNonInstancingPass = false;

          for (let i = 0; i < subModels.length; i++) {
            const subModel = subModels[i];
            const idx = subModel.instancedSHIndex;

            if (idx >= 0) {
              subModel.updateInstancedSH(this._localSHData, idx);
            } else {
              hasNonInstancingPass = true;
            }
          }

          if (hasNonInstancingPass && this._localSHBuffer) {
            this._localSHBuffer.update(this._localSHData);
          }
        }
        /**
         * @en Clear the model's SH ubo
         * @zh 清除模型的球谐 ubo
         */


        clearSHUBOs() {
          if (!this._localSHData) {
            return;
          }

          for (let i = 0; i < UBOSH.COUNT; i++) {
            this._localSHData[i] = 0.0;
          }

          this.updateSHBuffer();
        }
        /**
         * @en Update the model's SH ubo
         * @zh 更新模型的球谐 ubo
         */


        updateSHUBOs() {
          if (!this.isLightProbeAvailable()) {
            return;
          }

          const center = this._worldBounds.center;

          if (!EDITOR && center.equals(this._lastWorldBoundCenter, EPSILON)) {
            return;
          }

          const coefficients = [];
          const weights = new Vec4(0.0, 0.0, 0.0, 0.0);
          const lightProbes = cclegacy.director.root.pipeline.pipelineSceneData.lightProbes;

          this._lastWorldBoundCenter.set(center);

          this._tetrahedronIndex = lightProbes.data.getInterpolationWeights(center, this._tetrahedronIndex, weights);
          const result = lightProbes.data.getInterpolationSHCoefficients(this._tetrahedronIndex, weights, coefficients);

          if (!result) {
            return;
          }

          if (!this._localSHData) {
            return;
          }

          cclegacy.internal.SH.reduceRinging(coefficients, lightProbes.reduceRinging);
          cclegacy.internal.SH.updateUBOData(this._localSHData, UBOSH.SH_LINEAR_CONST_R_OFFSET, coefficients);
          this.updateSHBuffer();
        }
        /**
         * @en Create the model's AABB
         * @zh 创建模型的包围盒
         * @param minPos min position of the AABB
         * @param maxPos max position of the AABB
         */


        createBoundingShape(minPos, maxPos) {
          if (!minPos || !maxPos) {
            return;
          }

          this._modelBounds = geometry.AABB.fromPoints(geometry.AABB.create(), minPos, maxPos);
          this._worldBounds = geometry.AABB.clone(this._modelBounds);
        }

        _createSubModel() {
          return new SubModel();
        }
        /**
         * @en Initialize a sub model with the sub mesh data and the material.
         * @zh 用子网格数据和材质初始化一个子模型。
         * @param idx sub model's index
         * @param subMeshData sub mesh
         * @param mat sub material
         */


        initSubModel(idx, subMeshData, mat) {
          this.initialize();

          if (this._subModels[idx] == null) {
            this._subModels[idx] = this._createSubModel();
          } else {
            this._subModels[idx].destroy();
          }

          this._subModels[idx].initialize(subMeshData, mat.passes, this.getMacroPatches(idx)); // This is a temporary solution
          // It should not be written in a fixed way, or modified by the user


          this._subModels[idx].initPlanarShadowShader();

          this._subModels[idx].initPlanarShadowInstanceShader();

          this._updateAttributesAndBinding(idx);
        }
        /**
         * @en Set material for a given sub model
         * @zh 为指定的子模型设置材质
         * @param idx sub model's index
         * @param subMesh sub mesh
         */


        setSubModelMesh(idx, subMesh) {
          if (!this._subModels[idx]) {
            return;
          }

          this._subModels[idx].subMesh = subMesh;
        }
        /**
         * @en Set a sub material
         * @zh 设置一个子材质
         * @param idx sub model's index
         * @param mat sub material
         */


        setSubModelMaterial(idx, mat) {
          if (!this._subModels[idx]) {
            return;
          }

          this._subModels[idx].passes = mat.passes;

          this._updateAttributesAndBinding(idx);
        }
        /**
         * @en Pipeline changed callback
         * @zh 管线更新回调
         */


        onGlobalPipelineStateChanged() {
          const subModels = this._subModels;

          for (let i = 0; i < subModels.length; i++) {
            subModels[i].onPipelineStateChanged();
          }
        }
        /**
         * @en Shader macro changed callback
         * @zh Shader 宏更新回调
         */


        onMacroPatchesStateChanged() {
          const subModels = this._subModels;

          for (let i = 0; i < subModels.length; i++) {
            subModels[i].onMacroPatchesStateChanged(this.getMacroPatches(i));
          }
        }

        onGeometryChanged() {
          const subModels = this._subModels;

          for (let i = 0; i < subModels.length; i++) {
            subModels[i].onGeometryChanged();
          }
        }
        /**
         * @internal
         * If the model has lighting map
         * initialize lighting map info before model initializing
         * because the lighting map will influence the shader
         */


        initLightingmap(texture, uvParam) {
          this._lightmap = texture;
          this._lightmapUVParam = uvParam;
        }
        /**
         * @en Update the light map info
         * @zh 更新光照贴图信息
         * @param texture light map
         * @param uvParam uv coordinate
         */


        updateLightingmap(texture, uvParam) {
          Vec4.toArray(this._localData, uvParam, UBOLocal.LIGHTINGMAP_UVPARAM);
          this._localDataUpdated = true;
          this._lightmap = texture;
          this._lightmapUVParam = uvParam;
          this.onMacroPatchesStateChanged();

          if (!texture) {
            texture = builtinResMgr.get('empty-texture');
          }

          const gfxTexture = texture.getGFXTexture();

          if (gfxTexture) {
            const sampler = this._device.getSampler(texture.mipmaps.length > 1 ? lightmapSamplerWithMipHash : lightmapSamplerHash);

            const subModels = this._subModels;

            for (let i = 0; i < subModels.length; i++) {
              const {
                descriptorSet
              } = subModels[i];
              descriptorSet.bindTexture(UNIFORM_LIGHTMAP_TEXTURE_BINDING, gfxTexture);
              descriptorSet.bindSampler(UNIFORM_LIGHTMAP_TEXTURE_BINDING, sampler);
              descriptorSet.update();
            }
          }
        }
        /**
         * @en Update the cube map of the reflection probe
         * @zh 更新反射探针的立方体贴图
         * @param texture probe cubemap
         */


        updateReflectionProbeCubemap(texture) {
          this._localDataUpdated = true;
          this.onMacroPatchesStateChanged();

          if (!texture) {
            texture = builtinResMgr.get('default-cube-texture');
          }

          const gfxTexture = texture.getGFXTexture();

          if (gfxTexture) {
            const reflectionSampler = this._device.getSampler(texture.getSamplerInfo());

            const subModels = this._subModels;

            for (let i = 0; i < subModels.length; i++) {
              const {
                descriptorSet
              } = subModels[i];

              if (descriptorSet) {
                descriptorSet.bindSampler(UNIFORM_REFLECTION_PROBE_CUBEMAP_BINDING, reflectionSampler);
                descriptorSet.bindTexture(UNIFORM_REFLECTION_PROBE_CUBEMAP_BINDING, gfxTexture);
                descriptorSet.update();
              }
            }
          }
        }
        /**
         * @en Update the planar relflection map of the reflection probe
         * @zh 更新反射探针的平面反射贴图
         * @param texture planar relflection map
         */


        updateReflectionProbePlanarMap(texture) {
          this._localDataUpdated = true;
          this.onMacroPatchesStateChanged();

          const sampler = this._device.getSampler(new SamplerInfo(Filter.LINEAR, Filter.LINEAR, Filter.NONE, Address.CLAMP, Address.CLAMP, Address.CLAMP));

          if (!texture) {
            texture = builtinResMgr.get('empty-texture').getGFXTexture();
          }

          if (texture) {
            const subModels = this._subModels;

            for (let i = 0; i < subModels.length; i++) {
              const {
                descriptorSet
              } = subModels[i];

              if (descriptorSet) {
                descriptorSet.bindTexture(UNIFORM_REFLECTION_PROBE_TEXTURE_BINDING, texture);
                descriptorSet.bindSampler(UNIFORM_REFLECTION_PROBE_TEXTURE_BINDING, sampler);
                descriptorSet.update();
              }
            }
          }
        }
        /**
         * @en Update the data map of the reflection probe
         * @zh 更新反射探针的数据贴图
         * @param texture data map
         */


        updateReflectionProbeDataMap(texture) {
          this._localDataUpdated = true;
          this.onMacroPatchesStateChanged();

          if (!texture) {
            texture = builtinResMgr.get('empty-texture');
          }

          const gfxTexture = texture.getGFXTexture();

          if (gfxTexture) {
            const subModels = this._subModels;

            for (let i = 0; i < subModels.length; i++) {
              const {
                descriptorSet
              } = subModels[i];

              if (descriptorSet) {
                descriptorSet.bindTexture(UNIFORM_REFLECTION_PROBE_DATA_MAP_BINDING, gfxTexture);
                descriptorSet.bindSampler(UNIFORM_REFLECTION_PROBE_DATA_MAP_BINDING, texture.getGFXSampler());
                descriptorSet.update();
              }
            }
          }
        }
        /**
         * @en Update the shadow bias
         * @zh 更新阴影偏移
         */


        updateLocalShadowBias() {
          const sv = this._localData;
          sv[UBOLocal.LOCAL_SHADOW_BIAS + 0] = this._shadowBias;
          sv[UBOLocal.LOCAL_SHADOW_BIAS + 1] = this._shadowNormalBias;
          this._localDataUpdated = true;
        }
        /**
         * @en Update the id of reflection probe
         * @zh 更新物体使用哪个反射探针
         */


        updateReflectionProbeId() {
          const sv = this._localData;
          sv[UBOLocal.LOCAL_SHADOW_BIAS + 2] = this._reflectionProbeId;
          sv[UBOLocal.LOCAL_SHADOW_BIAS + 3] = 0;
          let probe = null;

          if (cclegacy.internal.reflectionProbeManager) {
            probe = cclegacy.internal.reflectionProbeManager.getProbeById(this._reflectionProbeId);
          }

          if (probe) {
            if (probe.probeType === ProbeType.PLANAR) {
              sv[UBOLocal.REFLECTION_PROBE_DATA1] = probe.node.up.x;
              sv[UBOLocal.REFLECTION_PROBE_DATA1 + 1] = probe.node.up.y;
              sv[UBOLocal.REFLECTION_PROBE_DATA1 + 2] = probe.node.up.z;
              sv[UBOLocal.REFLECTION_PROBE_DATA1 + 3] = 1.0;
              sv[UBOLocal.REFLECTION_PROBE_DATA2] = 1.0;
              sv[UBOLocal.REFLECTION_PROBE_DATA2 + 1] = 0.0;
              sv[UBOLocal.REFLECTION_PROBE_DATA2 + 2] = 0.0;
              sv[UBOLocal.REFLECTION_PROBE_DATA2 + 3] = 1.0;
            } else {
              sv[UBOLocal.REFLECTION_PROBE_DATA1] = probe.node.worldPosition.x;
              sv[UBOLocal.REFLECTION_PROBE_DATA1 + 1] = probe.node.worldPosition.y;
              sv[UBOLocal.REFLECTION_PROBE_DATA1 + 2] = probe.node.worldPosition.z;
              sv[UBOLocal.REFLECTION_PROBE_DATA1 + 3] = 0.0;
              sv[UBOLocal.REFLECTION_PROBE_DATA2] = probe.size.x;
              sv[UBOLocal.REFLECTION_PROBE_DATA2 + 1] = probe.size.y;
              sv[UBOLocal.REFLECTION_PROBE_DATA2 + 2] = probe.size.z;
              sv[UBOLocal.REFLECTION_PROBE_DATA2 + 3] = probe.cubemap ? probe.cubemap.mipmapLevel : 1.0;
            }
          }

          this._localDataUpdated = true;
        }
        /**
         * @en Return shader's macro patches
         * @zh 获取 shader 宏
         * @param subModelIndex sub model's index
         */


        getMacroPatches(subModelIndex) {
          let patches = this.receiveShadow ? shadowMapPatches : null;

          if (this._lightmap != null) {
            let stationary = false;

            if (this.node && this.node.scene) {
              stationary = this.node.scene.globals.bakedWithStationaryMainLight;
            }

            const lightmapPathes = stationary ? stationaryLightMapPatches : staticLightMapPatches;
            patches = patches ? patches.concat(lightmapPathes) : lightmapPathes; // use highp lightmap

            if (this.node.scene.globals.bakedWithHighpLightmap) {
              patches = patches.concat(highpLightMapPatches);
            }
          }

          if (this._useLightProbe) {
            patches = patches ? patches.concat(lightProbePatches) : lightProbePatches;
          }

          const reflectionProbePatches = [{
            name: CC_USE_REFLECTION_PROBE,
            value: this._reflectionProbeType
          }];
          patches = patches ? patches.concat(reflectionProbePatches) : reflectionProbePatches;
          const receiveDirLightPatches = [{
            name: CC_DISABLE_DIRECTIONAL_LIGHT,
            value: !this._receiveDirLight
          }];
          patches = patches ? patches.concat(receiveDirLightPatches) : receiveDirLightPatches;
          return patches;
        }

        _updateAttributesAndBinding(subModelIndex) {
          const subModel = this._subModels[subModelIndex];

          if (!subModel) {
            return;
          }

          this._initLocalDescriptors(subModelIndex);

          this._updateLocalDescriptors(subModelIndex, subModel.descriptorSet);

          this._initLocalSHDescriptors(subModelIndex);

          this._updateLocalSHDescriptors(subModelIndex, subModel.descriptorSet);

          this._initWorldBoundDescriptors(subModelIndex);

          if (subModel.worldBoundDescriptorSet) {
            this._updateWorldBoundDescriptors(subModelIndex, subModel.worldBoundDescriptorSet);
          }

          const shader = subModel.passes[0].getShaderVariant(subModel.patches);

          this._updateInstancedAttributes(shader.attributes, subModel);
        } // sub-classes can override the following functions if needed
        // for now no subModel level instancing attributes


        _updateInstancedAttributes(attributes, subModel) {
          subModel.UpdateInstancedAttributes(attributes);
          this._localDataUpdated = true;
        }

        _initLocalDescriptors(subModelIndex) {
          if (!this._localBuffer) {
            this._localBuffer = this._device.createBuffer(new BufferInfo(BufferUsageBit.UNIFORM | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.DEVICE, UBOLocal.SIZE, UBOLocal.SIZE));
          }
        }

        _initLocalSHDescriptors(subModelIndex) {
          if (!EDITOR && !this._useLightProbe) {
            return;
          }

          if (!this._localSHData) {
            this._localSHData = new Float32Array(UBOSH.COUNT);
          }

          if (!this._localSHBuffer) {
            this._localSHBuffer = this._device.createBuffer(new BufferInfo(BufferUsageBit.UNIFORM | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.DEVICE, UBOSH.SIZE, UBOSH.SIZE));
          }
        }

        _initWorldBoundDescriptors(subModelIndex) {
          if (!this._worldBoundBuffer) {
            this._worldBoundBuffer = this._device.createBuffer(new BufferInfo(BufferUsageBit.UNIFORM | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.DEVICE, UBOWorldBound.SIZE, UBOWorldBound.SIZE));
          }
        }

        _updateLocalDescriptors(subModelIndex, descriptorSet) {
          if (this._localBuffer) descriptorSet.bindBuffer(UBOLocal.BINDING, this._localBuffer);
        }

        _updateLocalSHDescriptors(subModelIndex, descriptorSet) {
          if (this._localSHBuffer) descriptorSet.bindBuffer(UBOSH.BINDING, this._localSHBuffer);
        }

        _updateWorldBoundDescriptors(subModelIndex, descriptorSet) {
          if (this._worldBoundBuffer) descriptorSet.bindBuffer(UBOWorldBound.BINDING, this._worldBoundBuffer);
        }

      });
    }
  };
});