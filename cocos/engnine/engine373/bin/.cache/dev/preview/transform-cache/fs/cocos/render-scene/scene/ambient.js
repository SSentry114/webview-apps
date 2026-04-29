System.register("q-bundled:///fs/cocos/render-scene/scene/ambient.js", ["../../core/index.js"], function (_export, _context) {
  "use strict";

  var Vec4, cclegacy, Ambient;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_coreIndexJs) {
      Vec4 = _coreIndexJs.Vec4;
      cclegacy = _coreIndexJs.cclegacy;
    }],
    execute: function () {
      /**
       * @en Ambient lighting representation in the render scene.
       * The initial data is setup in [[SceneGlobals.ambient]].
       * @zh 渲染场景中的环境光照设置。
       * 初始值是由 [[SceneGlobals.ambient]] 设置的。
       */
      _export("Ambient", Ambient = /*#__PURE__*/function () {
        function Ambient() {
          this._groundAlbedoHDR = new Vec4(0.2, 0.2, 0.2, 1.0);
          this._skyColorHDR = new Vec4(0.2, 0.5, 0.8, 1.0);
          this._skyIllumHDR = 0;
          this._groundAlbedoLDR = new Vec4(0.2, 0.2, 0.2, 1.0);
          this._skyColorLDR = new Vec4(0.2, 0.5, 0.8, 1.0);
          this._skyIllumLDR = 0;
          this._mipmapCount = 1;
          this._enabled = false;
        }

        var _proto = Ambient.prototype;

        _proto.initialize = function initialize(ambientInfo) {
          // Init HDR/LDR from serialized data on load
          this._skyColorHDR = ambientInfo.skyColorHDR;

          this._groundAlbedoHDR.set(ambientInfo.groundAlbedoHDR);

          this._skyIllumHDR = ambientInfo.skyIllumHDR;
          this._skyColorLDR = ambientInfo.skyColorLDR;

          this._groundAlbedoLDR.set(ambientInfo.groundAlbedoLDR);

          this._skyIllumLDR = ambientInfo.skyIllumLDR;
        };

        _createClass(Ambient, [{
          key: "enabled",
          get: function get() {
            return this._enabled;
          }
          /**
           * @en Sky color
           * @zh 天空颜色
           */
          ,
          set:
          /**
           * @en Enable ambient
           * @zh 是否开启环境光
           */
          function set(val) {
            this._enabled = val;
          }
        }, {
          key: "skyColor",
          get: function get() {
            var isHDR = cclegacy.director.root.pipeline.pipelineSceneData.isHDR;

            if (isHDR) {
              return this._skyColorHDR;
            } else {
              return this._skyColorLDR;
            }
          },
          set: function set(color) {
            var isHDR = cclegacy.director.root.pipeline.pipelineSceneData.isHDR;

            if (isHDR) {
              this._skyColorHDR.set(color);
            } else {
              this._skyColorLDR.set(color);
            }
          }
          /**
           * @en Sky illuminance
           * @zh 天空亮度
           */

        }, {
          key: "skyIllum",
          get: function get() {
            var isHDR = cclegacy.director.root.pipeline.pipelineSceneData.isHDR;

            if (isHDR) {
              return this._skyIllumHDR;
            } else {
              return this._skyIllumLDR;
            }
          },
          set: function set(illum) {
            var isHDR = cclegacy.director.root.pipeline.pipelineSceneData.isHDR;

            if (isHDR) {
              this._skyIllumHDR = illum;
            } else {
              this._skyIllumLDR = illum;
            }
          }
          /**
           * @en Ground color
           * @zh 地面颜色
           */

        }, {
          key: "groundAlbedo",
          get: function get() {
            var isHDR = cclegacy.director.root.pipeline.pipelineSceneData.isHDR;

            if (isHDR) {
              return this._groundAlbedoHDR;
            } else {
              return this._groundAlbedoLDR;
            }
          },
          set: function set(color) {
            var isHDR = cclegacy.director.root.pipeline.pipelineSceneData.isHDR;

            if (isHDR) {
              this._groundAlbedoHDR.set(color);
            } else {
              this._groundAlbedoLDR.set(color);
            }
          }
        }]);

        return Ambient;
      }());

      Ambient.SUN_ILLUM = 65000.0;
      Ambient.SKY_ILLUM = 20000.0;
      cclegacy.Ambient = Ambient;
    }
  };
});