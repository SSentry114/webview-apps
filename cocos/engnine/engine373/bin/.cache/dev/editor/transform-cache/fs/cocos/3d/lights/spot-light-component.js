System.register("q-bundled:///fs/cocos/3d/lights/spot-light-component.js", ["../../core/index.js", "../../render-scene/index.js", "./light-component.js", "../../render-scene/scene/index.js"], function (_export, _context) {
  "use strict";

  var toRadian, cclegacy, CCBoolean, CCFloat, _decorator, scene, Light, PhotometricTerm, Camera, PCFType, ShadowType, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _class, _class2, _initializer, _initializer2, _initializer3, _initializer4, _initializer5, _initializer6, _initializer7, _initializer8, _initializer9, _initializer10, ccclass, range, slide, type, editable, displayOrder, help, executeInEditMode, menu, tooltip, serializable, formerlySerializedAs, visible, property, SpotLight;

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _applyDecoratedInitializer(target, property, decorators, initializer) {
    return decorators.slice().reverse().reduce(function (decoratedInitializer, decorator) {
      return decorator(target, property, decoratedInitializer) || decoratedInitializer;
    }, initializer);
  }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_coreIndexJs) {
      toRadian = _coreIndexJs.toRadian;
      cclegacy = _coreIndexJs.cclegacy;
      CCBoolean = _coreIndexJs.CCBoolean;
      CCFloat = _coreIndexJs.CCFloat;
      _decorator = _coreIndexJs._decorator;
    }, function (_renderSceneIndexJs) {
      scene = _renderSceneIndexJs.scene;
    }, function (_lightComponentJs) {
      Light = _lightComponentJs.Light;
      PhotometricTerm = _lightComponentJs.PhotometricTerm;
    }, function (_renderSceneSceneIndexJs) {
      Camera = _renderSceneSceneIndexJs.Camera;
      PCFType = _renderSceneSceneIndexJs.PCFType;
      ShadowType = _renderSceneSceneIndexJs.ShadowType;
    }],
    execute: function () {
      ({
        ccclass,
        range,
        slide,
        type,
        editable,
        displayOrder,
        help,
        executeInEditMode,
        menu,
        tooltip,
        serializable,
        formerlySerializedAs,
        visible,
        property
      } = _decorator);
      /**
       * @en The spot light component, multiple spot lights can be added to one scene.
       * @zh 聚光灯光源组件，场景中可以添加多个聚光灯光源。
       */

      _export("SpotLight", SpotLight = (_dec = ccclass('cc.SpotLight'), _dec2 = help('i18n:cc.SpotLight'), _dec3 = menu('Light/SpotLight'), _dec4 = formerlySerializedAs('_luminance'), _dec5 = tooltip('i18n:lights.luminous_flux'), _dec6 = displayOrder(-1), _dec7 = tooltip('i18n:lights.luminance'), _dec8 = displayOrder(-1), _dec9 = type(PhotometricTerm), _dec10 = displayOrder(-2), _dec11 = tooltip('i18n:lights.term'), _dec12 = tooltip('i18n:lights.size'), _dec13 = tooltip('i18n:lights.range'), _dec14 = range([2, 180, 1]), _dec15 = tooltip('The spot light cone angle'), _dec16 = tooltip('i18n:lights.shadowEnabled'), _dec17 = visible(() => cclegacy.director.root.pipeline.pipelineSceneData.shadows.type === ShadowType.ShadowMap), _dec18 = property({
        group: {
          name: 'DynamicShadowSettings',
          displayOrder: 1
        }
      }), _dec19 = type(CCBoolean), _dec20 = tooltip('i18n:lights.shadowPcf'), _dec21 = visible(() => cclegacy.director.root.pipeline.pipelineSceneData.shadows.type === ShadowType.ShadowMap), _dec22 = property({
        group: {
          name: 'DynamicShadowSettings',
          displayOrder: 2
        }
      }), _dec23 = type(PCFType), _dec24 = tooltip('i18n:lights.shadowBias'), _dec25 = visible(() => cclegacy.director.root.pipeline.pipelineSceneData.shadows.type === ShadowType.ShadowMap), _dec26 = property({
        group: {
          name: 'DynamicShadowSettings',
          displayOrder: 3
        }
      }), _dec27 = type(CCFloat), _dec28 = tooltip('i18n:lights.shadowNormalBias'), _dec29 = visible(() => cclegacy.director.root.pipeline.pipelineSceneData.shadows.type === ShadowType.ShadowMap), _dec30 = property({
        group: {
          name: 'DynamicShadowSettings',
          displayOrder: 4
        }
      }), _dec31 = type(CCFloat), _dec(_class = _dec2(_class = _dec3(_class = executeInEditMode(_class = (_class2 = class SpotLight extends Light {
        // Shadow map properties

        /**
         * @en Luminous flux of the light.
         * @zh 光通量。
         */
        get luminousFlux() {
          const isHDR = cclegacy.director.root.pipeline.pipelineSceneData.isHDR;

          if (isHDR) {
            return this._luminanceHDR * scene.nt2lm(this._size);
          } else {
            return this._luminanceLDR;
          }
        }

        set luminousFlux(val) {
          const isHDR = cclegacy.director.root.pipeline.pipelineSceneData.isHDR;
          let result = 0;

          if (isHDR) {
            this._luminanceHDR = val / scene.nt2lm(this._size);
            result = this._luminanceHDR;
          } else {
            this._luminanceLDR = val;
            result = this._luminanceLDR;
          }

          this._light && (this._light.luminance = result);
        }
        /**
          * @en Luminance of the light.
          * @zh 光亮度。
          */


        get luminance() {
          const isHDR = cclegacy.director.root.pipeline.pipelineSceneData.isHDR;

          if (isHDR) {
            return this._luminanceHDR;
          } else {
            return this._luminanceLDR;
          }
        }

        set luminance(val) {
          const isHDR = cclegacy.director.root.pipeline.pipelineSceneData.isHDR;

          if (isHDR) {
            this._luminanceHDR = val;
            this._light && (this._light.luminanceHDR = this._luminanceHDR);
          } else {
            this._luminanceLDR = val;
            this._light && (this._light.luminanceLDR = this._luminanceLDR);
          }
        }
        /**
         * @en The photometric term currently being used.
         * @zh 当前使用的光度学计量单位。
         */


        get term() {
          return this._term;
        }

        set term(val) {
          this._term = val;
        }
        /**
         * @en
         * Size of the light.
         * @zh
         * 光源大小。
         */


        get size() {
          return this._size;
        }

        set size(val) {
          this._size = val;

          if (this._light) {
            this._light.size = val;
          }
        }
        /**
         * @en
         * Range of the light.
         * @zh
         * 光源范围。
         */


        get range() {
          return this._range;
        }

        set range(val) {
          this._range = val;

          if (this._light) {
            this._light.range = val;
          }
        }
        /**
         * @en
         * The spot light cone angle.
         * @zh
         * 聚光灯锥角。
         */


        get spotAngle() {
          return this._spotAngle;
        }

        set spotAngle(val) {
          this._spotAngle = val;

          if (this._light) {
            this._light.spotAngle = toRadian(val);
          }
        }
        /**
         * @en Whether activate shadow
         * @zh 是否启用阴影？
         */


        get shadowEnabled() {
          return this._shadowEnabled;
        }

        set shadowEnabled(val) {
          this._shadowEnabled = val;

          if (this._light) {
            this._light.shadowEnabled = val;
          }
        }
        /**
         * @en The pcf level of the shadow generation.
         * @zh 获取或者设置阴影 pcf 等级。
         */


        get shadowPcf() {
          return this._shadowPcf;
        }

        set shadowPcf(val) {
          this._shadowPcf = val;

          if (this._light) {
            this._light.shadowPcf = val;
          }
        }
        /**
         * @en The depth offset of shadow to avoid moire pattern artifacts
         * @zh 阴影的深度偏移, 可以减弱跨像素导致的条纹状失真
         */


        get shadowBias() {
          return this._shadowBias;
        }

        set shadowBias(val) {
          this._shadowBias = val;

          if (this._light) {
            this._light.shadowBias = val;
          }
        }
        /**
         * @en The normal bias of the shadow map.
         * @zh 设置或者获取法线偏移。
         */


        get shadowNormalBias() {
          return this._shadowNormalBias;
        }

        set shadowNormalBias(val) {
          this._shadowNormalBias = val;

          if (this._light) {
            this._light.shadowNormalBias = val;
          }
        }

        constructor() {
          super();
          this._size = _initializer && _initializer();
          this._luminanceHDR = _initializer2 && _initializer2();
          this._luminanceLDR = _initializer3 && _initializer3();
          this._term = _initializer4 && _initializer4();
          this._range = _initializer5 && _initializer5();
          this._spotAngle = _initializer6 && _initializer6();
          this._shadowEnabled = _initializer7 && _initializer7();
          this._shadowPcf = _initializer8 && _initializer8();
          this._shadowBias = _initializer9 && _initializer9();
          this._shadowNormalBias = _initializer10 && _initializer10();
          this._lightType = scene.SpotLight;
        }

        _createLight() {
          super._createLight();

          this._type = scene.LightType.SPOT;
          this.size = this._size;
          this.range = this._range;
          this.spotAngle = this._spotAngle;

          if (this._light) {
            const spotLight = this._light;
            spotLight.luminanceHDR = this._luminanceHDR;
            spotLight.luminanceLDR = this._luminanceLDR; // shadow info

            spotLight.shadowEnabled = this._shadowEnabled;
            spotLight.shadowPcf = this._shadowPcf;
            spotLight.shadowBias = this._shadowBias;
            spotLight.shadowNormalBias = this._shadowNormalBias;
          }
        }

      }, (_initializer = _applyDecoratedInitializer(_class2.prototype, "_size", [serializable], function () {
        return 0.15;
      }), _initializer2 = _applyDecoratedInitializer(_class2.prototype, "_luminanceHDR", [serializable, _dec4], function () {
        return 1700 / scene.nt2lm(0.15);
      }), _initializer3 = _applyDecoratedInitializer(_class2.prototype, "_luminanceLDR", [serializable], function () {
        return 1700 / scene.nt2lm(0.15) * Camera.standardExposureValue * Camera.standardLightMeterScale;
      }), _initializer4 = _applyDecoratedInitializer(_class2.prototype, "_term", [serializable], function () {
        return PhotometricTerm.LUMINOUS_FLUX;
      }), _initializer5 = _applyDecoratedInitializer(_class2.prototype, "_range", [serializable], function () {
        return 1;
      }), _initializer6 = _applyDecoratedInitializer(_class2.prototype, "_spotAngle", [serializable], function () {
        return 60;
      }), _initializer7 = _applyDecoratedInitializer(_class2.prototype, "_shadowEnabled", [serializable], function () {
        return false;
      }), _initializer8 = _applyDecoratedInitializer(_class2.prototype, "_shadowPcf", [serializable], function () {
        return PCFType.HARD;
      }), _initializer9 = _applyDecoratedInitializer(_class2.prototype, "_shadowBias", [serializable], function () {
        return 0.00001;
      }), _initializer10 = _applyDecoratedInitializer(_class2.prototype, "_shadowNormalBias", [serializable], function () {
        return 0.0;
      }), _applyDecoratedDescriptor(_class2.prototype, "luminousFlux", [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "luminousFlux"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "luminance", [_dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "luminance"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "term", [_dec9, _dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "term"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "size", [_dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "size"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "range", [_dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "range"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "spotAngle", [slide, _dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "spotAngle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "shadowEnabled", [_dec16, _dec17, _dec18, editable, _dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "shadowEnabled"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "shadowPcf", [_dec20, _dec21, _dec22, editable, _dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "shadowPcf"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "shadowBias", [_dec24, _dec25, _dec26, editable, _dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "shadowBias"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "shadowNormalBias", [_dec28, _dec29, _dec30, editable, _dec31], Object.getOwnPropertyDescriptor(_class2.prototype, "shadowNormalBias"), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class));
    }
  };
});