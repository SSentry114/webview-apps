System.register("q-bundled:///fs/cocos/rendering/pipeline-scene-data.js", ["../render-scene/scene/fog.js", "../render-scene/scene/ambient.js", "../render-scene/scene/skybox.js", "../render-scene/scene/shadows.js", "../render-scene/scene/octree.js", "../gfx/index.js", "../asset/assets/index.js", "./shadow/csm-layers.js", "../core/index.js"], function (_export, _context) {
  "use strict";

  var Fog, Ambient, Skybox, Shadows, Octree, InputAssemblerInfo, BufferInfo, BufferUsageBit, MemoryUsageBit, Attribute, Format, Material, CSMLayers, cclegacy, GEOMETRY_RENDERER_TECHNIQUE_COUNT, PipelineSceneData;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_renderSceneSceneFogJs) {
      Fog = _renderSceneSceneFogJs.Fog;
    }, function (_renderSceneSceneAmbientJs) {
      Ambient = _renderSceneSceneAmbientJs.Ambient;
    }, function (_renderSceneSceneSkyboxJs) {
      Skybox = _renderSceneSceneSkyboxJs.Skybox;
    }, function (_renderSceneSceneShadowsJs) {
      Shadows = _renderSceneSceneShadowsJs.Shadows;
    }, function (_renderSceneSceneOctreeJs) {
      Octree = _renderSceneSceneOctreeJs.Octree;
    }, function (_gfxIndexJs) {
      InputAssemblerInfo = _gfxIndexJs.InputAssemblerInfo;
      BufferInfo = _gfxIndexJs.BufferInfo;
      BufferUsageBit = _gfxIndexJs.BufferUsageBit;
      MemoryUsageBit = _gfxIndexJs.MemoryUsageBit;
      Attribute = _gfxIndexJs.Attribute;
      Format = _gfxIndexJs.Format;
    }, function (_assetAssetsIndexJs) {
      Material = _assetAssetsIndexJs.Material;
    }, function (_shadowCsmLayersJs) {
      CSMLayers = _shadowCsmLayersJs.CSMLayers;
    }, function (_coreIndexJs) {
      cclegacy = _coreIndexJs.cclegacy;
    }],
    execute: function () {
      GEOMETRY_RENDERER_TECHNIQUE_COUNT = 6;

      _export("PipelineSceneData", PipelineSceneData = /*#__PURE__*/function () {
        function PipelineSceneData() {
          this.fog = new Fog();
          this.ambient = new Ambient();
          this.skybox = new Skybox();
          this.shadows = new Shadows();
          this.csmLayers = new CSMLayers();
          this.octree = new Octree();
          this.lightProbes = cclegacy.internal.LightProbes ? new cclegacy.internal.LightProbes() : null;
          this.validPunctualLights = [];
          this.renderObjects = [];
          this.shadowFrameBufferMap = new Map();
          this._geometryRendererMaterials = [];
          this._geometryRendererPasses = [];
          this._geometryRendererShaders = [];
          this._occlusionQueryVertexBuffer = null;
          this._occlusionQueryIndicesBuffer = null;
          this._occlusionQueryInputAssembler = null;
          this._occlusionQueryMaterial = null;
          this._occlusionQueryShader = null;
          this._isHDR = true;
          this._shadingScale = 1.0;
          this._csmSupported = true;
          this._shadingScale = 1.0;
        }

        var _proto = PipelineSceneData.prototype;

        _proto.activate = function activate(device) {
          this._device = device;
          this.initGeometryRendererMaterials();
          this.initOcclusionQuery();
          return true;
        };

        _proto.initGeometryRendererMaterials = function initGeometryRendererMaterials() {
          var offset = 0;

          for (var tech = 0; tech < GEOMETRY_RENDERER_TECHNIQUE_COUNT; tech++) {
            this._geometryRendererMaterials[tech] = new Material();
            this._geometryRendererMaterials[tech]._uuid = "geometry-renderer-material-" + tech;

            this._geometryRendererMaterials[tech].initialize({
              effectName: 'internal/builtin-geometry-renderer',
              technique: tech
            });

            for (var pass = 0; pass < this._geometryRendererMaterials[tech].passes.length; ++pass) {
              this._geometryRendererPasses[offset] = this._geometryRendererMaterials[tech].passes[pass];
              this._geometryRendererShaders[offset] = this._geometryRendererMaterials[tech].passes[pass].getShaderVariant();
              offset++;
            }
          }
        };

        _proto.initOcclusionQuery = function initOcclusionQuery() {
          if (!this._occlusionQueryInputAssembler) {
            this._occlusionQueryInputAssembler = this._createOcclusionQueryIA();
          }

          if (!this._occlusionQueryMaterial) {
            var mat = new Material();
            mat._uuid = 'default-occlusion-query-material';
            mat.initialize({
              effectName: 'internal/builtin-occlusion-query'
            });
            this._occlusionQueryMaterial = mat;

            if (mat.passes.length > 0) {
              this._occlusionQueryShader = mat.passes[0].getShaderVariant();
            }
          }
        };

        _proto.getOcclusionQueryPass = function getOcclusionQueryPass() {
          if (this._occlusionQueryMaterial && this._occlusionQueryMaterial.passes.length > 0) {
            return this._occlusionQueryMaterial.passes[0];
          }

          return null;
        };

        _proto.updatePipelineSceneData = function updatePipelineSceneData() {};

        _proto.destroy = function destroy() {
          var _this$_occlusionQuery, _this$_occlusionQuery2, _this$_occlusionQuery3;

          this.shadows.destroy();
          this.csmLayers.destroy();
          this.validPunctualLights.length = 0;
          (_this$_occlusionQuery = this._occlusionQueryInputAssembler) === null || _this$_occlusionQuery === void 0 ? void 0 : _this$_occlusionQuery.destroy();
          this._occlusionQueryInputAssembler = null;
          (_this$_occlusionQuery2 = this._occlusionQueryVertexBuffer) === null || _this$_occlusionQuery2 === void 0 ? void 0 : _this$_occlusionQuery2.destroy();
          this._occlusionQueryVertexBuffer = null;
          (_this$_occlusionQuery3 = this._occlusionQueryIndicesBuffer) === null || _this$_occlusionQuery3 === void 0 ? void 0 : _this$_occlusionQuery3.destroy();
          this._occlusionQueryIndicesBuffer = null;
        };

        _proto._createOcclusionQueryIA = function _createOcclusionQueryIA() {
          // create vertex buffer
          var device = this._device;
          var vertices = new Float32Array([-1, -1, -1, 1, -1, -1, -1, 1, -1, 1, 1, -1, -1, -1, 1, 1, -1, 1, -1, 1, 1, 1, 1, 1]);
          var vbStride = Float32Array.BYTES_PER_ELEMENT * 3;
          var vbSize = vbStride * 8;
          this._occlusionQueryVertexBuffer = device.createBuffer(new BufferInfo(BufferUsageBit.VERTEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.DEVICE, vbSize, vbStride));

          this._occlusionQueryVertexBuffer.update(vertices); // create index buffer


          var indices = new Uint16Array([0, 2, 1, 1, 2, 3, 4, 5, 6, 5, 7, 6, 1, 3, 7, 1, 7, 5, 0, 4, 6, 0, 6, 2, 0, 1, 5, 0, 5, 4, 2, 6, 7, 2, 7, 3]);
          var ibStride = Uint16Array.BYTES_PER_ELEMENT;
          var ibSize = ibStride * 36;
          this._occlusionQueryIndicesBuffer = device.createBuffer(new BufferInfo(BufferUsageBit.INDEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.DEVICE, ibSize, ibStride));

          this._occlusionQueryIndicesBuffer.update(indices);

          var attributes = [new Attribute('a_position', Format.RGB32F)]; // create cube input assembler

          var info = new InputAssemblerInfo(attributes, [this._occlusionQueryVertexBuffer], this._occlusionQueryIndicesBuffer);
          var inputAssembler = device.createInputAssembler(info);
          return inputAssembler;
        };

        _createClass(PipelineSceneData, [{
          key: "isHDR",
          get:
          /**
            * @en Is open HDR.
            * @zh 是否开启 HDR。
            * @readonly
            */
          function get() {
            return this._isHDR;
          },
          set: function set(val) {
            this._isHDR = val;
          }
        }, {
          key: "shadingScale",
          get: function get() {
            return this._shadingScale;
          },
          set: function set(val) {
            this._shadingScale = val;
          }
        }, {
          key: "csmSupported",
          get: function get() {
            return this._csmSupported;
          },
          set: function set(val) {
            this._csmSupported = val;
          }
        }, {
          key: "geometryRendererPasses",
          get: function get() {
            return this._geometryRendererPasses;
          }
        }, {
          key: "geometryRendererShaders",
          get: function get() {
            return this._geometryRendererShaders;
          }
        }]);

        return PipelineSceneData;
      }());
    }
  };
});