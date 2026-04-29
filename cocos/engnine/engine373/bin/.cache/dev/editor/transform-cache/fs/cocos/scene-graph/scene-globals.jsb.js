System.register("q-bundled:///fs/cocos/scene-graph/scene-globals.jsb.js", ["../core/data/decorators/index.js", "../core/global-exports.js", "../core/data/index.js", "../asset/assets/texture-cube.js", "../core/value-types/index.js", "../render-scene/scene/index.js", "../asset/assets/material.js", "../core/math/index.js"], function (_export, _context) {
  "use strict";

  var displayName, editable, formerlySerializedAs, range, readOnly, serializable, tooltip, type, visible, legacyCC, CCFloat, CCInteger, TextureCube, Enum, ccclass, displayOrder, rangeMin, rangeStep, slide, Ambient, EnvironmentLightingType, Material, Vec2, Vec3, Color, Vec4, DEFAULT_WORLD_MIN_POS, DEFAULT_WORLD_MAX_POS, DEFAULT_OCTREE_DEPTH, FogType, ShadowSize, ShadowType, AmbientInfo, SkyboxInfo, FogInfo, ShadowsInfo, OctreeInfo, LightProbeInfo, SceneGlobals, SceneGlobalsProto, skyboxDescriptor, OctreeInfoProto, enabledDescriptor, minPosDescriptor, maxPosDescriptor, depthDescriptor, ShadowsInfoProto, shadowEnabledDescriptor, typeDescriptor, shadowColorDescriptor, planeDirectionDescriptor, planeHeightDescriptor, maxReceivedDescriptor, shadowMapSizeDescriptor, FogInfoProto, fogEnabledDescriptor, accurateDescriptor, fogColorDescriptor, fogTypeDescriptor, fogDensityDescriptor, fogStartDescriptor, fogEndDescriptor, fogAttenDescriptor, fogTopDescriptor, fogRangeDescriptor, SkyboxInfoProto, skyboxRotationAngleDescriptor, skyboxReflectionMapDescriptor, skyboxEnabledDescriptor, envLightingTypeDescriptor, useHDRDescriptor, envmapDescriptor, diffuseMapDescriptor, skyboxMaterialDescriptor, AmbientInfoProto, skyLightingColorDescriptor, skyIllumDescriptor, groundLightingColorDescriptor, LightProbeInfoProto, lightProbeGIScaleDescriptor, lightProbeGISamplesDescriptor, lightProbeBouncesDescriptor, lightProbeReduceRingingDescriptor, lightProbeShowProbeDescriptor, lightProbeShowWireframeDescriptor, lightProbeShowConvexDescriptor;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function ambientSkyLightEnable() {
    const scene = legacyCC.director.getScene();
    const skybox = scene.globals.skybox;

    if (skybox.useIBL && skybox.applyDiffuseMap) {
      return false;
    } else {
      return true;
    }
  }

  function checkFieldIs(attr, value) {
    return function () {
      return this[attr] === value;
    };
  }

  function checkFieldNot(attr, value) {
    return function () {
      return this[attr] !== value;
    };
  } // handle meta data, it is generated automatically


  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      displayName = _coreDataDecoratorsIndexJs.displayName;
      editable = _coreDataDecoratorsIndexJs.editable;
      formerlySerializedAs = _coreDataDecoratorsIndexJs.formerlySerializedAs;
      range = _coreDataDecoratorsIndexJs.range;
      readOnly = _coreDataDecoratorsIndexJs.readOnly;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      type = _coreDataDecoratorsIndexJs.type;
      visible = _coreDataDecoratorsIndexJs.visible;
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      displayOrder = _coreDataDecoratorsIndexJs.displayOrder;
      rangeMin = _coreDataDecoratorsIndexJs.rangeMin;
      rangeStep = _coreDataDecoratorsIndexJs.rangeStep;
      slide = _coreDataDecoratorsIndexJs.slide;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_coreDataIndexJs) {
      CCFloat = _coreDataIndexJs.CCFloat;
      CCInteger = _coreDataIndexJs.CCInteger;
    }, function (_assetAssetsTextureCubeJs) {
      TextureCube = _assetAssetsTextureCubeJs.TextureCube;
    }, function (_coreValueTypesIndexJs) {
      Enum = _coreValueTypesIndexJs.Enum;
    }, function (_renderSceneSceneIndexJs) {
      Ambient = _renderSceneSceneIndexJs.Ambient;
      EnvironmentLightingType = _renderSceneSceneIndexJs.EnvironmentLightingType;
    }, function (_assetAssetsMaterialJs) {
      Material = _assetAssetsMaterialJs.Material;
    }, function (_coreMathIndexJs) {
      Vec2 = _coreMathIndexJs.Vec2;
      Vec3 = _coreMathIndexJs.Vec3;
      Color = _coreMathIndexJs.Color;
      Vec4 = _coreMathIndexJs.Vec4;
    }],
    execute: function () {
      _export("DEFAULT_WORLD_MIN_POS", DEFAULT_WORLD_MIN_POS = new Vec3(-1024.0, -1024.0, -1024.0));

      _export("DEFAULT_WORLD_MAX_POS", DEFAULT_WORLD_MAX_POS = new Vec3(1024.0, 1024.0, 1024.0));

      _export("DEFAULT_OCTREE_DEPTH", DEFAULT_OCTREE_DEPTH = 8);
      /**
       * @zh
       * 全局雾类型。
       * @en
       * The global fog type
       * @static
       * @enum FogInfo.FogType
       */


      _export("FogType", FogType = Enum({
        /**
         * @zh
         * 线性雾。
         * @en
         * Linear fog
         * @readonly
         */
        LINEAR: 0,

        /**
         * @zh
         * 指数雾。
         * @en
         * Exponential fog
         * @readonly
         */
        EXP: 1,

        /**
         * @zh
         * 指数平方雾。
         * @en
         * Exponential square fog
         * @readonly
         */
        EXP_SQUARED: 2,

        /**
         * @zh
         * 层叠雾。
         * @en
         * Layered fog
         * @readonly
         */
        LAYERED: 3
      }));
      /**
       * @zh 阴影贴图分辨率。
       * @en The shadow map size.
       * @static
       * @enum Shadows.ShadowSize
       */


      _export("ShadowSize", ShadowSize = Enum({
        /**
         * @zh 分辨率 256 * 256。
         * @en shadow resolution 256 * 256.
         * @readonly
         */
        Low_256x256: 256,

        /**
         * @zh 分辨率 512 * 512。
         * @en shadow resolution 512 * 512.
         * @readonly
         */
        Medium_512x512: 512,

        /**
         * @zh 分辨率 1024 * 1024。
         * @en shadow resolution 1024 * 1024.
         * @readonly
         */
        High_1024x1024: 1024,

        /**
         * @zh 分辨率 2048 * 2048。
         * @en shadow resolution 2048 * 2048.
         * @readonly
         */
        Ultra_2048x2048: 2048
      }));
      /**
       * @zh 阴影类型。
       * @en The shadow type
       * @enum Shadows.ShadowType
       */


      _export("ShadowType", ShadowType = Enum({
        /**
         * @zh 平面阴影。
         * @en Planar shadow
         * @property Planar
         * @readonly
         */
        Planar: 0,

        /**
         * @zh 阴影贴图。
         * @en Shadow type
         * @property ShadowMap
         * @readonly
         */
        ShadowMap: 1
      })); // @ts-ignore


      _export("AmbientInfo", AmbientInfo = jsb.AmbientInfo);

      legacyCC.AmbientInfo = AmbientInfo; // @ts-ignore

      _export("SkyboxInfo", SkyboxInfo = jsb.SkyboxInfo);

      legacyCC.SkyboxInfo = SkyboxInfo; // @ts-ignore

      _export("FogInfo", FogInfo = jsb.FogInfo);

      legacyCC.FogInfo = FogInfo;
      FogInfo.FogType = FogType; // @ts-ignore

      _export("ShadowsInfo", ShadowsInfo = jsb.ShadowsInfo);

      legacyCC.ShadowsInfo = ShadowsInfo; // @ts-ignore

      _export("OctreeInfo", OctreeInfo = jsb.OctreeInfo);

      legacyCC.OctreeInfo = OctreeInfo; // @ts-ignore

      _export("LightProbeInfo", LightProbeInfo = jsb.LightProbeInfo); //legacyCC.LightProbeInfo = LightProbeInfo;
      // @ts-ignore


      _export("SceneGlobals", SceneGlobals = jsb.SceneGlobals);

      legacyCC.SceneGlobals = SceneGlobals;

      (function () {
        const sceneGlobalsProto = SceneGlobals.prototype;

        sceneGlobalsProto._ctor = function () {
          this._ambientRef = this.getAmbientInfo();
          this._shadowsRef = this.getShadowsInfo();
          this._skyboxRef = this.getSkyboxInfo();
          this._fogRef = this.getFogInfo();
          this._octreeRef = this.getOctreeInfo();
          this._lightProbeRef = this.getLightProbeInfo();
        };

        Object.defineProperty(sceneGlobalsProto, 'ambient', {
          enumerable: true,
          configurable: true,

          get() {
            return this._ambientRef;
          },

          set(v) {
            this._ambientRef = v;
            this.setAmbientInfo(v);
          }

        });
        Object.defineProperty(sceneGlobalsProto, 'shadows', {
          enumerable: true,
          configurable: true,

          get() {
            return this._shadowsRef;
          },

          set(v) {
            this._shadowsRef = v;
            this.setShadowsInfo(v);
          }

        });
        Object.defineProperty(sceneGlobalsProto, '_skybox', {
          enumerable: true,
          configurable: true,

          get() {
            return this._skyboxRef;
          },

          set(v) {
            this._skyboxRef = v;
            this.setSkyboxInfo(v);
          }

        });
        Object.defineProperty(sceneGlobalsProto, 'skybox', {
          enumerable: true,
          configurable: true,

          get() {
            return this._skyboxRef;
          },

          set(v) {
            this._skyboxRef = v;
            this.setSkyboxInfo(v);
          }

        });
        Object.defineProperty(sceneGlobalsProto, 'fog', {
          enumerable: true,
          configurable: true,

          get() {
            return this._fogRef;
          },

          set(v) {
            this._fogRef = v;
            this.setFogInfo(v);
          }

        });
        Object.defineProperty(sceneGlobalsProto, 'octree', {
          enumerable: true,
          configurable: true,

          get() {
            return this._octreeRef;
          },

          set(v) {
            this._octreeRef = v;
            this.setOctreeInfo(v);
          }

        });
        Object.defineProperty(sceneGlobalsProto, 'lightProbeInfo', {
          enumerable: true,
          configurable: true,

          get() {
            return this._lightProbeRef;
          },

          set(v) {
            this._lightProbeRef = v;
            this.setLightProbeInfo(v);
          }

        });
      })();

      SceneGlobalsProto = SceneGlobals.prototype;
      editable(SceneGlobalsProto, 'ambient', () => new AmbientInfo());
      serializable(SceneGlobalsProto, 'ambient', () => new AmbientInfo());
      editable(SceneGlobalsProto, 'shadows', () => new ShadowsInfo());
      serializable(SceneGlobalsProto, 'shadows', () => new ShadowsInfo());
      serializable(SceneGlobalsProto, '_skybox', () => new SkyboxInfo());
      serializable(SceneGlobalsProto, 'fog', () => new FogInfo());
      editable(SceneGlobalsProto, 'fog', () => new FogInfo());
      skyboxDescriptor = Object.getOwnPropertyDescriptor(SceneGlobalsProto, 'skybox');
      type(SkyboxInfo)(SceneGlobalsProto, 'skybox', skyboxDescriptor);
      editable(SceneGlobalsProto, 'skybox', skyboxDescriptor);
      serializable(SceneGlobalsProto, 'octree', () => new OctreeInfo());
      editable(SceneGlobalsProto, 'octree', () => new OctreeInfo());
      serializable(SceneGlobalsProto, 'lightProbeInfo', () => new LightProbeInfo());
      editable(SceneGlobalsProto, 'lightProbeInfo', () => new LightProbeInfo());
      ccclass('cc.SceneGlobals')(SceneGlobals);
      OctreeInfoProto = OctreeInfo.prototype;
      serializable(OctreeInfoProto, '_enabled', () => false);
      serializable(OctreeInfoProto, '_minPos', () => new Vec3(DEFAULT_WORLD_MIN_POS));
      serializable(OctreeInfoProto, '_maxPos', () => new Vec3(DEFAULT_WORLD_MAX_POS));
      serializable(OctreeInfoProto, '_depth', () => DEFAULT_OCTREE_DEPTH);
      enabledDescriptor = Object.getOwnPropertyDescriptor(OctreeInfoProto, 'enabled');
      tooltip('i18n:octree_culling.enabled')(OctreeInfoProto, 'enabled', enabledDescriptor);
      editable(OctreeInfoProto, 'enabled', enabledDescriptor);
      minPosDescriptor = Object.getOwnPropertyDescriptor(OctreeInfoProto, 'minPos');
      displayName('World MinPos')(OctreeInfoProto, 'minPos', minPosDescriptor);
      tooltip('i18n:octree_culling.minPos')(OctreeInfoProto, 'minPos', minPosDescriptor);
      editable(OctreeInfoProto, 'minPos', minPosDescriptor);
      maxPosDescriptor = Object.getOwnPropertyDescriptor(OctreeInfoProto, 'maxPos');
      displayName('World MaxPos')(OctreeInfoProto, 'maxPos', maxPosDescriptor);
      tooltip('i18n:octree_culling.maxPos')(OctreeInfoProto, 'maxPos', maxPosDescriptor);
      editable(OctreeInfoProto, 'maxPos', maxPosDescriptor);
      depthDescriptor = Object.getOwnPropertyDescriptor(OctreeInfoProto, 'depth');
      tooltip('i18n:octree_culling.depth')(OctreeInfoProto, 'depth', depthDescriptor);
      type(CCInteger)(OctreeInfoProto, 'depth', depthDescriptor);
      slide(OctreeInfoProto, 'depth', depthDescriptor);
      range([4, 12, 1])(OctreeInfoProto, 'depth', depthDescriptor);
      editable(OctreeInfoProto, 'depth', depthDescriptor);
      ccclass('cc.OctreeInfo')(OctreeInfo);
      ShadowsInfoProto = ShadowsInfo.prototype;
      serializable(ShadowsInfoProto, '_enabled', () => false);
      serializable(ShadowsInfoProto, '_type', () => ShadowType.Planar);
      serializable(ShadowsInfoProto, '_normal', () => new Vec3(0, 1, 0));
      serializable(ShadowsInfoProto, '_distance', () => 0);
      serializable(ShadowsInfoProto, '_shadowColor', () => new Color(0, 0, 0, 76));
      serializable(ShadowsInfoProto, '_maxReceived', () => 4);
      serializable(ShadowsInfoProto, '_size', () => new Vec2(1024, 1024));
      shadowEnabledDescriptor = Object.getOwnPropertyDescriptor(ShadowsInfoProto, 'enabled');
      tooltip('i18n:shadow.enabled')(ShadowsInfoProto, 'enabled', shadowEnabledDescriptor);
      editable(ShadowsInfoProto, 'enabled', shadowEnabledDescriptor);
      typeDescriptor = Object.getOwnPropertyDescriptor(ShadowsInfoProto, 'type');
      tooltip('i18n:shadow.type')(ShadowsInfoProto, 'type', typeDescriptor);
      type(ShadowType)(ShadowsInfoProto, 'type', typeDescriptor);
      editable(ShadowsInfoProto, 'type', typeDescriptor);
      shadowColorDescriptor = Object.getOwnPropertyDescriptor(ShadowsInfoProto, 'shadowColor');
      tooltip('i18n:shadow.shadowColor')(ShadowsInfoProto, 'shadowColor', shadowColorDescriptor);
      visible(checkFieldIs("_type", ShadowType.Planar))(ShadowsInfoProto, 'shadowColor', shadowColorDescriptor);
      planeDirectionDescriptor = Object.getOwnPropertyDescriptor(ShadowsInfoProto, 'planeDirection');
      tooltip('i18n:shadow.planeDirection')(ShadowsInfoProto, 'planeDirection', planeDirectionDescriptor);
      visible(checkFieldIs("_type", ShadowType.Planar))(ShadowsInfoProto, 'planeDirection', planeDirectionDescriptor);
      planeHeightDescriptor = Object.getOwnPropertyDescriptor(ShadowsInfoProto, 'planeHeight');
      tooltip('i18n:shadow.planeHeight')(ShadowsInfoProto, 'planeHeight', planeHeightDescriptor);
      visible(checkFieldIs("_type", ShadowType.Planar))(ShadowsInfoProto, 'planeHeight', planeHeightDescriptor);
      type(CCFloat)(ShadowsInfoProto, 'planeHeight', planeHeightDescriptor);
      editable(ShadowsInfoProto, 'planeHeight', planeHeightDescriptor);
      maxReceivedDescriptor = Object.getOwnPropertyDescriptor(ShadowsInfoProto, 'maxReceived');
      visible(checkFieldIs("_type", ShadowType.ShadowMap))(ShadowsInfoProto, 'maxReceived', maxReceivedDescriptor);
      tooltip('i18n:shadow.maxReceived')(ShadowsInfoProto, 'maxReceived', maxReceivedDescriptor);
      type(CCInteger)(ShadowsInfoProto, 'maxReceived', maxReceivedDescriptor);
      shadowMapSizeDescriptor = Object.getOwnPropertyDescriptor(ShadowsInfoProto, 'shadowMapSize');
      visible(checkFieldIs("_type", ShadowType.ShadowMap))(ShadowsInfoProto, 'shadowMapSize', shadowMapSizeDescriptor);
      tooltip('i18n:shadow.shadowMapSize')(ShadowsInfoProto, 'shadowMapSize', shadowMapSizeDescriptor);
      type(ShadowSize)(ShadowsInfoProto, 'shadowMapSize', shadowMapSizeDescriptor);
      ccclass('cc.ShadowsInfo')(ShadowsInfo);
      FogInfoProto = FogInfo.prototype;
      serializable(FogInfoProto, '_type', () => FogType.LINEAR);
      serializable(FogInfoProto, '_fogColor', () => new Color('#C8C8C8'));
      serializable(FogInfoProto, '_enabled', () => false);
      serializable(FogInfoProto, '_fogDensity', () => 0.3);
      serializable(FogInfoProto, '_fogStart', () => 0.5);
      serializable(FogInfoProto, '_fogEnd', () => 300);
      serializable(FogInfoProto, '_fogAtten', () => 5);
      serializable(FogInfoProto, '_fogTop', () => 1.5);
      serializable(FogInfoProto, '_fogRange', () => 1.2);
      serializable(FogInfoProto, '_accurate', () => false);
      fogEnabledDescriptor = Object.getOwnPropertyDescriptor(FogInfoProto, 'enabled');
      displayOrder(0)(FogInfoProto, 'enabled', fogEnabledDescriptor);
      tooltip('i18n:fog.enabled')(FogInfoProto, 'enabled', fogEnabledDescriptor);
      editable(FogInfoProto, 'enabled', fogEnabledDescriptor);
      accurateDescriptor = Object.getOwnPropertyDescriptor(FogInfoProto, 'accurate');
      displayOrder(0)(FogInfoProto, 'accurate', accurateDescriptor);
      tooltip('i18n:fog.accurate')(FogInfoProto, 'accurate', accurateDescriptor);
      editable(FogInfoProto, 'accurate', accurateDescriptor);
      fogColorDescriptor = Object.getOwnPropertyDescriptor(FogInfoProto, 'fogColor');
      tooltip('i18n:fog.fogColor')(FogInfoProto, 'fogColor', fogColorDescriptor);
      editable(FogInfoProto, 'fogColor', fogColorDescriptor);
      fogTypeDescriptor = Object.getOwnPropertyDescriptor(FogInfoProto, 'type');
      tooltip('i18n:fog.type')(FogInfoProto, 'type', fogTypeDescriptor);
      displayOrder(1)(FogInfoProto, 'type', fogTypeDescriptor);
      type(FogType)(FogInfoProto, 'type', fogTypeDescriptor);
      editable(FogInfoProto, 'type', fogTypeDescriptor);
      fogDensityDescriptor = Object.getOwnPropertyDescriptor(FogInfoProto, 'fogDensity');
      tooltip('i18n:fog.fogDensity')(FogInfoProto, 'fogDensity', fogDensityDescriptor);
      slide(FogInfoProto, 'fogDensity', fogDensityDescriptor);
      rangeStep(0.01)(FogInfoProto, 'fogDensity', fogDensityDescriptor);
      range([0, 1])(FogInfoProto, 'fogDensity', fogDensityDescriptor);
      type(CCFloat)(FogInfoProto, 'fogDensity', fogDensityDescriptor);
      visible(function () {
        this._type !== FogType.LAYERED && this._type !== FogType.LINEAR;
      })(FogInfoProto, 'fogDensity', fogDensityDescriptor);
      fogStartDescriptor = Object.getOwnPropertyDescriptor(FogInfoProto, 'fogStart');
      tooltip('i18n:fog.fogStart')(FogInfoProto, 'fogStart', fogStartDescriptor);
      rangeStep(0.01)(FogInfoProto, 'fogStart', fogStartDescriptor);
      type(CCFloat)(FogInfoProto, 'fogStart', fogStartDescriptor);
      visible(checkFieldNot("_type", FogType.LAYERED))(FogInfoProto, 'fogStart', fogStartDescriptor);
      fogEndDescriptor = Object.getOwnPropertyDescriptor(FogInfoProto, 'fogEnd');
      tooltip('i18n:fog.fogEnd')(FogInfoProto, 'fogEnd', fogEndDescriptor);
      rangeStep(0.01)(FogInfoProto, 'fogEnd', fogEndDescriptor);
      type(CCFloat)(FogInfoProto, 'fogEnd', fogEndDescriptor);
      visible(checkFieldIs("_type", FogType.LINEAR))(FogInfoProto, 'fogEnd', fogEndDescriptor);
      fogAttenDescriptor = Object.getOwnPropertyDescriptor(FogInfoProto, 'fogAtten');
      tooltip('i18n:fog.fogAtten')(FogInfoProto, 'fogAtten', fogAttenDescriptor);
      rangeStep(0.01)(FogInfoProto, 'fogAtten', fogAttenDescriptor);
      rangeMin(0.01)(FogInfoProto, 'fogAtten', fogAttenDescriptor);
      type(CCFloat)(FogInfoProto, 'fogAtten', fogAttenDescriptor);
      visible(checkFieldNot("_type", FogType.LINEAR))(FogInfoProto, 'fogAtten', fogAttenDescriptor);
      fogTopDescriptor = Object.getOwnPropertyDescriptor(FogInfoProto, 'fogTop');
      tooltip('i18n:fog.fogTop')(FogInfoProto, 'fogTop', fogTopDescriptor);
      rangeStep(0.01)(FogInfoProto, 'fogTop', fogTopDescriptor);
      type(CCFloat)(FogInfoProto, 'fogTop', fogTopDescriptor);
      visible(checkFieldIs("_type", FogType.LAYERED))(FogInfoProto, 'fogTop', fogTopDescriptor);
      fogRangeDescriptor = Object.getOwnPropertyDescriptor(FogInfoProto, 'fogRange');
      tooltip('i18n:fog.fogRange')(FogInfoProto, 'fogRange', fogRangeDescriptor);
      rangeStep(0.01)(FogInfoProto, 'fogRange', fogRangeDescriptor);
      type(CCFloat)(FogInfoProto, 'fogRange', fogRangeDescriptor);
      visible(checkFieldIs("_type", FogType.LAYERED))(FogInfoProto, 'fogRange', fogRangeDescriptor);
      ccclass('cc.FogInfo')(FogInfo);
      SkyboxInfoProto = SkyboxInfo.prototype;
      serializable(SkyboxInfoProto, '_envLightingType', () => EnvironmentLightingType.HEMISPHERE_DIFFUSE);
      formerlySerializedAs('_envmap')(SkyboxInfoProto, '_envmapHDR', () => null);
      type(TextureCube)(SkyboxInfoProto, '_envmapHDR', () => null);
      serializable(SkyboxInfoProto, '_envmapHDR', () => null);
      type(TextureCube)(SkyboxInfoProto, '_envmapLDR', () => null);
      serializable(SkyboxInfoProto, '_envmapLDR', () => null);
      type(TextureCube)(SkyboxInfoProto, '_diffuseMapHDR', () => null);
      serializable(SkyboxInfoProto, '_diffuseMapHDR', () => null);
      type(TextureCube)(SkyboxInfoProto, '_diffuseMapLDR', () => null);
      serializable(SkyboxInfoProto, '_diffuseMapLDR', () => null);
      serializable(SkyboxInfoProto, '_enabled', () => false);
      serializable(SkyboxInfoProto, '_useHDR', () => true);
      type(Material)(SkyboxInfoProto, '_editableMaterial', () => null);
      serializable(SkyboxInfoProto, '_editableMaterial', () => null);
      type(TextureCube)(SkyboxInfoProto, '_reflectionHDR', () => null);
      serializable(SkyboxInfoProto, '_reflectionHDR', () => null);
      type(TextureCube)(SkyboxInfoProto, '_reflectionLDR', () => null);
      serializable(SkyboxInfoProto, '_reflectionLDR', () => null);
      skyboxRotationAngleDescriptor = Object.getOwnPropertyDescriptor(SkyboxInfoProto, 'rotationAngle');
      type(CCFloat)(SkyboxInfoProto, 'rotationAngle', skyboxRotationAngleDescriptor);
      range([0, 360])(SkyboxInfoProto, 'rotationAngle', skyboxRotationAngleDescriptor);
      rangeStep(1)(SkyboxInfoProto, 'rotationAngle', skyboxRotationAngleDescriptor);
      slide(SkyboxInfoProto, 'rotationAngle', skyboxRotationAngleDescriptor);
      tooltip('i18n:skybox.rotationAngle')(SkyboxInfoProto, 'rotationAngle', skyboxRotationAngleDescriptor);
      skyboxReflectionMapDescriptor = Object.getOwnPropertyDescriptor(SkyboxInfoProto, 'reflectionMap');
      editable(SkyboxInfoProto, 'reflectionMap', skyboxReflectionMapDescriptor);
      readOnly(SkyboxInfoProto, 'reflectionMap', skyboxReflectionMapDescriptor);
      type(TextureCube)(SkyboxInfoProto, 'reflectionMap', skyboxReflectionMapDescriptor);
      displayOrder(100)(SkyboxInfoProto, 'reflectionMap', skyboxReflectionMapDescriptor);
      skyboxEnabledDescriptor = Object.getOwnPropertyDescriptor(SkyboxInfoProto, 'enabled');
      tooltip('i18n:skybox.enabled')(SkyboxInfoProto, 'enabled', skyboxEnabledDescriptor);
      editable(SkyboxInfoProto, 'enabled', skyboxEnabledDescriptor);
      envLightingTypeDescriptor = Object.getOwnPropertyDescriptor(SkyboxInfoProto, 'envLightingType');
      tooltip('i18n:skybox.EnvironmentLightingType')(SkyboxInfoProto, 'envLightingType', envLightingTypeDescriptor);
      type(EnvironmentLightingType)(SkyboxInfoProto, 'envLightingType', envLightingTypeDescriptor);
      editable(SkyboxInfoProto, 'envLightingType', envLightingTypeDescriptor);
      useHDRDescriptor = Object.getOwnPropertyDescriptor(SkyboxInfoProto, 'useHDR');
      tooltip('i18n:skybox.useHDR')(SkyboxInfoProto, 'useHDR', useHDRDescriptor);
      editable(SkyboxInfoProto, 'useHDR', useHDRDescriptor);
      envmapDescriptor = Object.getOwnPropertyDescriptor(SkyboxInfoProto, 'envmap');
      tooltip('i18n:skybox.envmap')(SkyboxInfoProto, 'envmap', envmapDescriptor);
      type(TextureCube)(SkyboxInfoProto, 'envmap', envmapDescriptor);
      editable(SkyboxInfoProto, 'envmap', envmapDescriptor);
      diffuseMapDescriptor = Object.getOwnPropertyDescriptor(SkyboxInfoProto, 'diffuseMap');
      displayOrder(100)(SkyboxInfoProto, 'diffuseMap', diffuseMapDescriptor);
      type(TextureCube)(SkyboxInfoProto, 'diffuseMap', diffuseMapDescriptor);
      readOnly(SkyboxInfoProto, 'diffuseMap', diffuseMapDescriptor);
      editable(SkyboxInfoProto, 'diffuseMap', diffuseMapDescriptor);
      visible(function () {
        return this.useIBL && this.applyDiffuseMap;
      })(SkyboxInfoProto, 'diffuseMap', diffuseMapDescriptor);
      skyboxMaterialDescriptor = Object.getOwnPropertyDescriptor(SkyboxInfoProto, 'skyboxMaterial');
      tooltip('i18n:skybox.material')(SkyboxInfoProto, 'skyboxMaterial', skyboxMaterialDescriptor);
      type(Material)(SkyboxInfoProto, 'skyboxMaterial', skyboxMaterialDescriptor);
      editable(SkyboxInfoProto, 'skyboxMaterial', skyboxMaterialDescriptor);
      serializable(SkyboxInfoProto, '_rotationAngle', () => 0);
      ccclass('cc.SkyboxInfo')(SkyboxInfo);
      AmbientInfoProto = AmbientInfo.prototype;
      formerlySerializedAs('_skyColor')(AmbientInfoProto, '_skyColorHDR', () => new Vec4(0.2, 0.5, 0.8, 1.0));
      serializable(AmbientInfoProto, '_skyColorHDR', () => new Vec4(0.2, 0.5, 0.8, 1.0));
      formerlySerializedAs('_skyIllum')(AmbientInfoProto, '_skyIllumHDR', () => Ambient.SKY_ILLUM);
      serializable(AmbientInfoProto, '_skyIllumHDR', () => Ambient.SKY_ILLUM);
      formerlySerializedAs('_groundAlbedo')(AmbientInfoProto, '_groundAlbedoHDR', () => new Vec4(0.2, 0.2, 0.2, 1.0));
      serializable(AmbientInfoProto, '_groundAlbedoHDR', () => new Vec4(0.2, 0.2, 0.2, 1.0));
      serializable(AmbientInfoProto, '_skyColorLDR', () => new Vec4(0.2, 0.5, 0.8, 1.0));
      serializable(AmbientInfoProto, '_skyIllumLDR', () => Ambient.SKY_ILLUM);
      serializable(AmbientInfoProto, '_groundAlbedoLDR', () => new Vec4(0.2, 0.2, 0.2, 1.0));
      skyLightingColorDescriptor = Object.getOwnPropertyDescriptor(AmbientInfoProto, 'skyLightingColor');
      tooltip('i18n:ambient.skyLightingColor')(AmbientInfoProto, 'skyLightingColor', skyLightingColorDescriptor);
      editable(AmbientInfoProto, 'skyLightingColor', skyLightingColorDescriptor);
      visible(ambientSkyLightEnable)(AmbientInfoProto, 'skyLightingColor', skyLightingColorDescriptor);
      skyIllumDescriptor = Object.getOwnPropertyDescriptor(AmbientInfoProto, 'skyIllum');
      tooltip('i18n:ambient.skyIllum')(AmbientInfoProto, 'skyIllum', skyIllumDescriptor);
      type(CCFloat)(AmbientInfoProto, 'skyIllum', skyIllumDescriptor);
      editable(AmbientInfoProto, 'skyIllum', skyIllumDescriptor);
      groundLightingColorDescriptor = Object.getOwnPropertyDescriptor(AmbientInfoProto, 'groundLightingColor');
      tooltip('i18n:ambient.groundLightingColor')(AmbientInfoProto, 'groundLightingColor', groundLightingColorDescriptor);
      editable(AmbientInfoProto, 'groundLightingColor', groundLightingColorDescriptor);
      visible(ambientSkyLightEnable)(AmbientInfoProto, 'groundLightingColor', groundLightingColorDescriptor);
      ccclass('cc.AmbientInfo')(AmbientInfo);
      LightProbeInfoProto = LightProbeInfo.prototype;
      serializable(LightProbeInfoProto, '_giScale', () => 1.0);
      serializable(LightProbeInfoProto, '_giSamples', () => 1024);
      serializable(LightProbeInfoProto, '_bounces', () => 2);
      serializable(LightProbeInfoProto, '_reduceRinging', () => 0.0);
      serializable(LightProbeInfoProto, '_showProbe', () => true);
      serializable(LightProbeInfoProto, '_showWireframe', () => true);
      serializable(LightProbeInfoProto, '_showConvex', () => false);
      serializable(LightProbeInfoProto, '_data', () => null);
      lightProbeGIScaleDescriptor = Object.getOwnPropertyDescriptor(LightProbeInfoProto, 'giScale');
      range([0, 100, 1])(LightProbeInfoProto, 'giScale', lightProbeGIScaleDescriptor);
      type(CCFloat)(LightProbeInfoProto, 'giScale', lightProbeGIScaleDescriptor);
      displayName('GIScale')(LightProbeInfoProto, 'giScale', lightProbeGIScaleDescriptor);
      tooltip('i18n:light_probe.giScale')(LightProbeInfoProto, 'giScale', lightProbeGIScaleDescriptor);
      editable(LightProbeInfoProto, 'giScale', lightProbeGIScaleDescriptor);
      lightProbeGISamplesDescriptor = Object.getOwnPropertyDescriptor(LightProbeInfoProto, 'giSamples');
      tooltip('i18n:light_probe.giSamples')(LightProbeInfoProto, 'giSamples', lightProbeGISamplesDescriptor);
      editable(LightProbeInfoProto, 'giSamples', lightProbeGISamplesDescriptor);
      range([64, 65536, 1])(LightProbeInfoProto, 'giSamples', lightProbeGISamplesDescriptor);
      type(CCInteger)(LightProbeInfoProto, 'giSamples', lightProbeGISamplesDescriptor);
      displayName('GISamples')(LightProbeInfoProto, 'giSamples', lightProbeGISamplesDescriptor);
      lightProbeBouncesDescriptor = Object.getOwnPropertyDescriptor(LightProbeInfoProto, 'bounces');
      tooltip('i18n:light_probe.bounces')(LightProbeInfoProto, 'bounces', lightProbeBouncesDescriptor);
      editable(LightProbeInfoProto, 'bounces', lightProbeBouncesDescriptor);
      range([1, 4, 1])(LightProbeInfoProto, 'bounces', lightProbeBouncesDescriptor);
      type(CCInteger)(LightProbeInfoProto, 'bounces', lightProbeBouncesDescriptor);
      tooltip('i18n:light_probe.bounces')(LightProbeInfoProto, 'bounces', lightProbeBouncesDescriptor);
      lightProbeReduceRingingDescriptor = Object.getOwnPropertyDescriptor(LightProbeInfoProto, 'reduceRinging');
      tooltip('i18n:light_probe.reduceRinging')(LightProbeInfoProto, 'reduceRinging', lightProbeReduceRingingDescriptor);
      editable(LightProbeInfoProto, 'reduceRinging', lightProbeReduceRingingDescriptor);
      range([0.0, 0.05, 0.001])(LightProbeInfoProto, 'reduceRinging', lightProbeReduceRingingDescriptor);
      slide(LightProbeInfoProto, 'reduceRinging', lightProbeReduceRingingDescriptor);
      type(CCFloat)(LightProbeInfoProto, 'reduceRinging', lightProbeReduceRingingDescriptor);
      lightProbeShowProbeDescriptor = Object.getOwnPropertyDescriptor(LightProbeInfoProto, 'showProbe');
      tooltip('i18n:light_probe.showProbe')(LightProbeInfoProto, 'showProbe', lightProbeShowProbeDescriptor);
      editable(LightProbeInfoProto, 'showProbe', lightProbeShowProbeDescriptor);
      lightProbeShowWireframeDescriptor = Object.getOwnPropertyDescriptor(LightProbeInfoProto, 'showWireframe');
      tooltip('i18n:light_probe.showWireframe')(LightProbeInfoProto, 'showWireframe', lightProbeShowWireframeDescriptor);
      editable(LightProbeInfoProto, 'showWireframe', lightProbeShowWireframeDescriptor);
      lightProbeShowConvexDescriptor = Object.getOwnPropertyDescriptor(LightProbeInfoProto, 'showConvex');
      tooltip('i18n:light_probe.showConvex')(LightProbeInfoProto, 'showConvex', lightProbeShowConvexDescriptor);
      editable(LightProbeInfoProto, 'showConvex', lightProbeShowConvexDescriptor);
      ccclass('cc.LightProbeInfo')(LightProbeInfo);
    }
  };
});