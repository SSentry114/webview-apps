System.register("q-bundled:///fs/cocos/2d/renderer/draw-batch.js", ["../../scene-graph/layers.js", "../../core/index.js", "../../render-scene/core/pass.js"], function (_export, _context) {
  "use strict";

  var Layers, cclegacy, Pass, UI_VIS_FLAG, DrawBatch2D;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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

      _export("DrawBatch2D", DrawBatch2D = /*#__PURE__*/function () {
        function DrawBatch2D() {
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

        var _proto = DrawBatch2D.prototype;

        //private declare _nativeObj: any;
        _proto.destroy = function destroy(ui) {
          this._passes = [];
        };

        _proto.clear = function clear() {
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
        ;

        _proto.fillPasses = function fillPasses(mat, dss, dssHash, patches) {
          if (mat) {
            var passes = mat.passes;

            if (!passes) {
              return;
            }

            var hashFactor = 0;
            var dirty = false;
            this._shaders.length = passes.length;

            for (var i = 0; i < passes.length; i++) {
              if (!this._passes[i]) {
                this._passes[i] = new Pass(cclegacy.director.root);
              }

              var mtlPass = passes[i];
              var passInUse = this._passes[i];
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
        };

        _createClass(DrawBatch2D, [{
          key: "inputAssembler",
          get: function get() {
            return this._inputAssembler;
          },
          set: function set(ia) {
            this._inputAssembler = ia;
          }
        }, {
          key: "descriptorSet",
          get: function get() {
            return this._descriptorSet;
          },
          set: function set(ds) {
            this._descriptorSet = ds;
          }
        }, {
          key: "visFlags",
          get: function get() {
            return this._visFlags;
          },
          set: function set(vis) {
            this._visFlags = vis;
          }
        }, {
          key: "passes",
          get: function get() {
            return this._passes;
          }
        }, {
          key: "shaders",
          get: function get() {
            return this._shaders;
          } // public bufferBatch: MeshBuffer | null = null; // use less
          // public camera: Camera | null = null; // use less
          // public renderScene: RenderScene | null = null; // use less for now

        }]);

        return DrawBatch2D;
      }());
    }
  };
});