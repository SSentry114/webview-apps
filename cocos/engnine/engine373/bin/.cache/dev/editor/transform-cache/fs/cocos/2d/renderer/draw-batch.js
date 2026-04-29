System.register("q-bundled:///fs/cocos/2d/renderer/draw-batch.js", ["../../scene-graph/layers.js", "../../core/index.js", "../../render-scene/core/pass.js"], function (_export, _context) {
  "use strict";

  var Layers, cclegacy, Pass, DrawBatch2D, UI_VIS_FLAG;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("DrawBatch2D", void 0);

  return {
    setters: [function (_sceneGraphLayersJs) {
      Layers = _sceneGraphLayersJs.Layers;
    }, function (_coreIndexJs) {
      cclegacy = _coreIndexJs.cclegacy;
    }, function (_renderSceneCorePassJs) {
      Pass = _renderSceneCorePassJs.Pass;
    }],
    execute: function () {
      UI_VIS_FLAG = Layers.Enum.NONE | Layers.Enum.UI_3D;

      _export("DrawBatch2D", DrawBatch2D = class DrawBatch2D {
        constructor() {
          this.model = null;
          this.texture = null;
          this.sampler = null;
          this.useLocalData = null;
          this.isStatic = false;
          this.textureHash = 0;
          this.samplerHash = 0;
          this._passes = [];
          this._shaders = [];
          this._visFlags = UI_VIS_FLAG;
          this._inputAssembler = null;
          this._descriptorSet = null;
        }

        get inputAssembler() {
          return this._inputAssembler;
        }

        set inputAssembler(ia) {
          this._inputAssembler = ia;
        }

        get descriptorSet() {
          return this._descriptorSet;
        }

        set descriptorSet(ds) {
          this._descriptorSet = ds;
        }

        get visFlags() {
          return this._visFlags;
        }

        set visFlags(vis) {
          this._visFlags = vis;
        }

        get passes() {
          return this._passes;
        }

        get shaders() {
          return this._shaders;
        } // public bufferBatch: MeshBuffer | null = null; // use less
        // public camera: Camera | null = null; // use less
        // public renderScene: RenderScene | null = null; // use less for now


        //private declare _nativeObj: any;
        destroy(ui) {
          this._passes = [];
        }

        clear() {
          // this.bufferBatch = null;
          this._inputAssembler = null;
          this._descriptorSet = null; // this.camera = null;

          this.texture = null;
          this.sampler = null;
          this.textureHash = 0;
          this.samplerHash = 0;
          this.model = null;
          this.isStatic = false;
          this.useLocalData = null;
          this.visFlags = UI_VIS_FLAG; // this.renderScene = null;
        } // object version


        fillPasses(mat, dss, dssHash, patches) {
          if (mat) {
            const passes = mat.passes;

            if (!passes) {
              return;
            }

            const hashFactor = 0;
            let dirty = false;
            this._shaders.length = passes.length;

            for (let i = 0; i < passes.length; i++) {
              if (!this._passes[i]) {
                this._passes[i] = new Pass(cclegacy.director.root);
              }

              const mtlPass = passes[i];
              const passInUse = this._passes[i];
              mtlPass.update(); // Hack: Cause pass.hash can not check all pass value

              if (!dss) {
                dss = mtlPass.depthStencilState;
                dssHash = 0;
              } // @ts-expect-error hack for UI use pass object


              passInUse._initPassFromTarget(mtlPass, dss, dssHash);

              this._shaders[i] = passInUse.getShaderVariant(patches);
              dirty = true;
            }
          }
        }

      });
    }
  };
});