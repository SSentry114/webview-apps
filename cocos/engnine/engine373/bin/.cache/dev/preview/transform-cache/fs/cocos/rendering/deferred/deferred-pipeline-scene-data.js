System.register("q-bundled:///fs/cocos/rendering/deferred/deferred-pipeline-scene-data.js", ["../render-pipeline.js", "../../asset/assets/index.js", "../pipeline-scene-data.js", "../../core/platform/macro.js", "../../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var MAX_BLOOM_FILTER_PASS_NUM, Material, PipelineSceneData, macro, legacyCC, AntiAliasing, BLOOM_PREFILTERPASS_INDEX, BLOOM_DOWNSAMPLEPASS_INDEX, BLOOM_UPSAMPLEPASS_INDEX, BLOOM_COMBINEPASS_INDEX, DeferredPipelineSceneData;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  _export("AntiAliasing", void 0);

  return {
    setters: [function (_renderPipelineJs) {
      MAX_BLOOM_FILTER_PASS_NUM = _renderPipelineJs.MAX_BLOOM_FILTER_PASS_NUM;
    }, function (_assetAssetsIndexJs) {
      Material = _assetAssetsIndexJs.Material;
    }, function (_pipelineSceneDataJs) {
      PipelineSceneData = _pipelineSceneDataJs.PipelineSceneData;
    }, function (_corePlatformMacroJs) {
      macro = _corePlatformMacroJs.macro;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
      (function (AntiAliasing) {
        AntiAliasing[AntiAliasing["NONE"] = 0] = "NONE";
        AntiAliasing[AntiAliasing["FXAA"] = 1] = "FXAA";
      })(AntiAliasing || _export("AntiAliasing", AntiAliasing = {}));

      _export("BLOOM_PREFILTERPASS_INDEX", BLOOM_PREFILTERPASS_INDEX = 0);

      _export("BLOOM_DOWNSAMPLEPASS_INDEX", BLOOM_DOWNSAMPLEPASS_INDEX = 1);

      _export("BLOOM_UPSAMPLEPASS_INDEX", BLOOM_UPSAMPLEPASS_INDEX = BLOOM_DOWNSAMPLEPASS_INDEX + MAX_BLOOM_FILTER_PASS_NUM);

      _export("BLOOM_COMBINEPASS_INDEX", BLOOM_COMBINEPASS_INDEX = BLOOM_UPSAMPLEPASS_INDEX + MAX_BLOOM_FILTER_PASS_NUM);

      _export("DeferredPipelineSceneData", DeferredPipelineSceneData = /*#__PURE__*/function (_PipelineSceneData) {
        _inheritsLoose(DeferredPipelineSceneData, _PipelineSceneData);

        function DeferredPipelineSceneData() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _PipelineSceneData.call.apply(_PipelineSceneData, [this].concat(args)) || this;
          _this._antiAliasing = AntiAliasing.NONE;
          return _this;
        }

        var _proto = DeferredPipelineSceneData.prototype;

        _proto.updatePipelineSceneData = function updatePipelineSceneData() {
          this.updatePipelinePassInfo();
        };

        _proto.updateBloomPass = function updateBloomPass() {
          if (!this._bloomMaterial) return;
          var prefilterPass = this._bloomMaterial.passes[BLOOM_PREFILTERPASS_INDEX];
          prefilterPass.beginChangeStatesSilently();
          prefilterPass.tryCompile();
          prefilterPass.endChangeStatesSilently();

          for (var i = 0; i < MAX_BLOOM_FILTER_PASS_NUM; ++i) {
            var downsamplePass = this._bloomMaterial.passes[BLOOM_DOWNSAMPLEPASS_INDEX + i];
            downsamplePass.beginChangeStatesSilently();
            downsamplePass.tryCompile();
            downsamplePass.endChangeStatesSilently();
            var upsamplePass = this._bloomMaterial.passes[BLOOM_UPSAMPLEPASS_INDEX + i];
            upsamplePass.beginChangeStatesSilently();
            upsamplePass.tryCompile();
            upsamplePass.endChangeStatesSilently();
          }

          var combinePass = this._bloomMaterial.passes[BLOOM_COMBINEPASS_INDEX];
          combinePass.beginChangeStatesSilently();
          combinePass.tryCompile();
          combinePass.endChangeStatesSilently();
        };

        _proto.updatePostProcessPass = function updatePostProcessPass() {
          if (!this.postprocessMaterial) return;
          var passPost = this.postprocessMaterial.passes[0];
          passPost.beginChangeStatesSilently();
          passPost.tryCompile();
          passPost.endChangeStatesSilently();
        };

        _proto.initPipelinePassInfo = function initPipelinePassInfo() {
          // builtin deferred material
          var deferredMat = new Material();
          deferredMat._uuid = 'builtin-deferred-material';
          deferredMat.initialize({
            effectName: 'pipeline/deferred-lighting'
          });

          for (var i = 0; i < deferredMat.passes.length; ++i) {
            deferredMat.passes[i].tryCompile();
          }

          this._deferredLightingMaterial = deferredMat;
          var bloomMat = new Material();
          bloomMat._uuid = 'builtin-bloom-material';
          bloomMat.initialize({
            effectName: 'pipeline/bloom'
          });

          for (var _i = 0; _i < bloomMat.passes.length; ++_i) {
            bloomMat.passes[_i].tryCompile();
          }

          this._bloomMaterial = bloomMat;
          var postMat = new Material();
          postMat._uuid = 'builtin-post-process-material';

          if (macro.ENABLE_ANTIALIAS_FXAA) {
            this._antiAliasing = AntiAliasing.FXAA;
          }

          postMat.initialize({
            effectName: 'pipeline/post-process',
            defines: {
              // Anti-aliasing type, currently only fxaa, so 1 means fxaa
              ANTIALIAS_TYPE: this._antiAliasing
            }
          });

          for (var _i2 = 0; _i2 < postMat.passes.length; ++_i2) {
            postMat.passes[_i2].tryCompile();
          }

          this._postprocessMaterial = postMat;
          this.updatePipelinePassInfo();
        };

        _proto.updatePipelinePassInfo = function updatePipelinePassInfo() {
          this.updateBloomPass();
          this.updatePostProcessPass();
          this.updateDeferredPassInfo();
        };

        _proto.activate = function activate(device) {
          _PipelineSceneData.prototype.activate.call(this, device);

          this.initPipelinePassInfo();
          return true;
        };

        _proto.updateDeferredPassInfo = function updateDeferredPassInfo() {
          this.updateDeferredLightPass();
        };

        _proto.updateDeferredLightPass = function updateDeferredLightPass() {
          if (!this._deferredLightingMaterial) return; // It's temporary solution for main light shadowmap

          legacyCC.director.root.pipeline.macros.CC_RECEIVE_SHADOW = 1;
          var passLit = this._deferredLightingMaterial.passes[0];
          passLit.beginChangeStatesSilently();
          passLit.tryCompile();
          passLit.endChangeStatesSilently();
        };

        _createClass(DeferredPipelineSceneData, [{
          key: "antiAliasing",
          get: function get() {
            return this._antiAliasing;
          },
          set: function set(value) {
            this._antiAliasing = value;

            if (this._postprocessMaterial) {
              var defines = this._postprocessMaterial.passes[0].defines;
              Object.assign(defines, {
                ANTIALIAS_TYPE: value
              });
              var renderMat = new Material();
              renderMat.initialize({
                effectAsset: this._postprocessMaterial.effectAsset,
                defines: defines
              });

              for (var i = 0; i < renderMat.passes.length; ++i) {
                renderMat.passes[i].tryCompile();
              }

              this._postprocessMaterial = renderMat;
            }
          }
        }, {
          key: "bloomMaterial",
          get: function get() {
            return this._bloomMaterial;
          },
          set: function set(mat) {
            if (this._bloomMaterial === mat || !mat) return;
            this._bloomMaterial = mat;
            this.updatePipelinePassInfo();
          }
        }, {
          key: "postprocessMaterial",
          get: function get() {
            return this._postprocessMaterial;
          },
          set: function set(mat) {
            if (this._postprocessMaterial === mat || !mat) return;
            this._postprocessMaterial = mat;
            this.updatePipelinePassInfo();
          }
        }, {
          key: "deferredLightingMaterial",
          get: function get() {
            return this._deferredLightingMaterial;
          },
          set: function set(mat) {
            if (this._deferredLightingMaterial === mat || !mat) return;
            this._deferredLightingMaterial = mat;
            this.updatePipelinePassInfo();
          }
        }]);

        return DeferredPipelineSceneData;
      }(PipelineSceneData));
    }
  };
});