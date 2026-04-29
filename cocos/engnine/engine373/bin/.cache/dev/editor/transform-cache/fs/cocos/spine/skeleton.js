System.register("q-bundled:///fs/cocos/spine/skeleton.js", ["../../../virtual/internal%253Aconstants.js", "./track-entry-listeners.js", "./lib/spine-core.js", "./skeleton-cache.js", "./attach-util.js", "../core/data/class-decorator.js", "../2d/framework/ui-renderer.js", "../core/index.js", "../core/data/decorators/index.js", "./skeleton-data.js", "../2d/components/graphics.js", "../render-scene/index.js", "../gfx/index.js", "../core/global-exports.js", "./skeleton-system.js", "../2d/renderer/render-entity.js", "../2d/renderer/render-draw-info.js", "../asset/assets/index.js", "../asset/asset-manager/index.js", "../scene-graph/index.js"], function (_export, _context) {
  "use strict";

  var EDITOR, TrackEntryListeners, spine, SkeletonCache, AttachUtil, ccclass, executeInEditMode, help, menu, UIRenderer, CCClass, CCObject, Color, Enum, ccenum, logID, warn, RecyclePool, js, displayName, displayOrder, editable, override, serializable, tooltip, type, visible, SkeletonData, Graphics, MaterialInstance, BlendOp, legacyCC, SkeletonSystem, RenderEntity, RenderEntityType, RenderDrawInfo, Material, builtinResMgr, Node, _dec, _dec2, _class, _class2, _initializer, _initializer2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _class4, _class5, _initializer3, _initializer4, _initializer5, _initializer6, _initializer7, _initializer8, _initializer9, _initializer10, _initializer11, _initializer12, _initializer13, _initializer14, _initializer15, _initializer16, _initializer17, _class6, _temp, timeScale, DefaultSkinsEnum, DefaultAnimsEnum, AnimationCacheMode, SpineMaterialType, SpineSocket, Skeleton;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _applyDecoratedInitializer(target, property, decorators, initializer) {
    return decorators.slice().reverse().reduce(function (decoratedInitializer, decorator) {
      return decorator(target, property, decoratedInitializer) || decoratedInitializer;
    }, initializer);
  }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function setEnumAttr(obj, propName, enumDef) {
    CCClass.Attr.setClassAttr(obj, propName, 'type', 'Enum');
    CCClass.Attr.setClassAttr(obj, propName, 'enumList', Enum.getList(enumDef));
  }

  _export({
    DefaultSkinsEnum: void 0,
    DefaultAnimsEnum: void 0,
    AnimationCacheMode: void 0,
    SpineMaterialType: void 0
  });

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_trackEntryListenersJs) {
      TrackEntryListeners = _trackEntryListenersJs.TrackEntryListeners;
    }, function (_libSpineCoreJs) {
      spine = _libSpineCoreJs.default;
    }, function (_skeletonCacheJs) {
      SkeletonCache = _skeletonCacheJs.default;
    }, function (_attachUtilJs) {
      AttachUtil = _attachUtilJs.AttachUtil;
    }, function (_coreDataClassDecoratorJs) {
      ccclass = _coreDataClassDecoratorJs.ccclass;
      executeInEditMode = _coreDataClassDecoratorJs.executeInEditMode;
      help = _coreDataClassDecoratorJs.help;
      menu = _coreDataClassDecoratorJs.menu;
    }, function (_dFrameworkUiRendererJs) {
      UIRenderer = _dFrameworkUiRendererJs.UIRenderer;
    }, function (_coreIndexJs) {
      CCClass = _coreIndexJs.CCClass;
      CCObject = _coreIndexJs.CCObject;
      Color = _coreIndexJs.Color;
      Enum = _coreIndexJs.Enum;
      ccenum = _coreIndexJs.ccenum;
      logID = _coreIndexJs.logID;
      warn = _coreIndexJs.warn;
      RecyclePool = _coreIndexJs.RecyclePool;
      js = _coreIndexJs.js;
    }, function (_coreDataDecoratorsIndexJs) {
      displayName = _coreDataDecoratorsIndexJs.displayName;
      displayOrder = _coreDataDecoratorsIndexJs.displayOrder;
      editable = _coreDataDecoratorsIndexJs.editable;
      override = _coreDataDecoratorsIndexJs.override;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      type = _coreDataDecoratorsIndexJs.type;
      visible = _coreDataDecoratorsIndexJs.visible;
    }, function (_skeletonDataJs) {
      SkeletonData = _skeletonDataJs.SkeletonData;
    }, function (_dComponentsGraphicsJs) {
      Graphics = _dComponentsGraphicsJs.Graphics;
    }, function (_renderSceneIndexJs) {
      MaterialInstance = _renderSceneIndexJs.MaterialInstance;
    }, function (_gfxIndexJs) {
      BlendOp = _gfxIndexJs.BlendOp;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_skeletonSystemJs) {
      SkeletonSystem = _skeletonSystemJs.SkeletonSystem;
    }, function (_dRendererRenderEntityJs) {
      RenderEntity = _dRendererRenderEntityJs.RenderEntity;
      RenderEntityType = _dRendererRenderEntityJs.RenderEntityType;
    }, function (_dRendererRenderDrawInfoJs) {
      RenderDrawInfo = _dRendererRenderDrawInfoJs.RenderDrawInfo;
    }, function (_assetAssetsIndexJs) {
      Material = _assetAssetsIndexJs.Material;
    }, function (_assetAssetManagerIndexJs) {
      builtinResMgr = _assetAssetManagerIndexJs.builtinResMgr;
    }, function (_sceneGraphIndexJs) {
      Node = _sceneGraphIndexJs.Node;
    }],
    execute: function () {
      /**
       * @en
       * Animation playback rate.
       * @zh
       * 动画播放速率。
       */
      _export("timeScale", timeScale = 1.0);
      /**
       * @internal Since v3.7.2, this is an engine private enum, only used in editor.
       */


      (function (DefaultSkinsEnum) {
        DefaultSkinsEnum[DefaultSkinsEnum["default"] = 0] = "default";
      })(DefaultSkinsEnum || _export("DefaultSkinsEnum", DefaultSkinsEnum = {}));

      ccenum(DefaultSkinsEnum);
      /**
       * @internal Since v3.7.2, this is an engine private enum, only used in editor.
       */

      (function (DefaultAnimsEnum) {
        DefaultAnimsEnum[DefaultAnimsEnum["<None>"] = 0] = "<None>";
      })(DefaultAnimsEnum || _export("DefaultAnimsEnum", DefaultAnimsEnum = {}));

      ccenum(DefaultAnimsEnum);
      /**
       * @en Enum for animation cache mode type.
       * @zh Spine 动画缓存类型。
       */

      (function (AnimationCacheMode) {
        AnimationCacheMode[AnimationCacheMode["REALTIME"] = 0] = "REALTIME";
        AnimationCacheMode[AnimationCacheMode["SHARED_CACHE"] = 1] = "SHARED_CACHE";
        AnimationCacheMode[AnimationCacheMode["PRIVATE_CACHE"] = 2] = "PRIVATE_CACHE";
      })(AnimationCacheMode || _export("AnimationCacheMode", AnimationCacheMode = {}));

      ccenum(AnimationCacheMode);

      (function (SpineMaterialType) {
        SpineMaterialType[SpineMaterialType["COLORED_TEXTURED"] = 0] = "COLORED_TEXTURED";
        SpineMaterialType[SpineMaterialType["TWO_COLORED"] = 1] = "TWO_COLORED";
      })(SpineMaterialType || _export("SpineMaterialType", SpineMaterialType = {}));

      /**
       * @en
       * The Sockets attached to bones, synchronous transform with spine animation.
       * @zh
       * Spine 挂点，可附着在目标骨骼上随 spine 动画一起运动。
       * @class SpineSocket
       */
      _export("SpineSocket", SpineSocket = (_dec = ccclass('sp.Skeleton.SpineSocket'), _dec2 = type(Node), _dec(_class = (_class2 = class SpineSocket {
        /**
         * @en Path of the target joint.
         * @zh 此挂点的目标骨骼路径。
         */

        /**
         * @en Transform output node.
         * @zh 此挂点的变换信息输出节点。
         */
        constructor(path = '', target = null) {
          this.path = _initializer && _initializer();
          this.target = _initializer2 && _initializer2();
          this.path = path;
          this.target = target;
        }

      }, (_initializer = _applyDecoratedInitializer(_class2.prototype, "path", [serializable, editable], function () {
        return '';
      }), _initializer2 = _applyDecoratedInitializer(_class2.prototype, "target", [_dec2, editable, serializable], function () {
        return null;
      })), _class2)) || _class));

      js.setClassAlias(SpineSocket, 'sp.Skeleton.SpineSocket');
      /**
       * @en
       * The skeleton of Spine <br/>
       * <br/>
       * (Skeleton has a reference to a SkeletonData and stores the state for skeleton instance,
       * which consists of the current pose's bone SRT, slot colors, and which slot attachments are visible. <br/>
       * Multiple skeletons can use the same SkeletonData which includes all animations, skins, and attachments.) <br/>
       * Cocos Creator supports spine versions lower than 3.8.99.
       * @zh
       * Spine 骨骼动画 <br/>
       * <br/>
       * (Skeleton 具有对骨骼数据的引用并且存储了骨骼实例的状态，
       * 它由当前的骨骼动作，slot 颜色，和可见的 slot attachments 组成。<br/>
       * 多个 Skeleton 可以使用相同的骨骼数据，其中包括所有的动画，皮肤和 attachments。
       * Cocos Creator 支持 spine 版本最高到3.8.99。
       * @class Skeleton
       * @extends UIRenderer
       */

      _export("Skeleton", Skeleton = (_dec3 = ccclass('sp.Skeleton'), _dec4 = help('i18n:cc.Spine'), _dec5 = menu('Spine/Skeleton'), _dec6 = type(Material), _dec7 = displayOrder(0), _dec8 = displayName('CustomMaterial'), _dec9 = type(SkeletonData), _dec10 = displayName('Default Skin'), _dec11 = type(DefaultSkinsEnum), _dec12 = tooltip('i18n:COMPONENT.skeleton.default_skin'), _dec13 = displayName('Animation'), _dec14 = type(DefaultAnimsEnum), _dec15 = tooltip('i18n:COMPONENT.skeleton.animation'), _dec16 = displayName('Animation Cache Mode'), _dec17 = tooltip('i18n:COMPONENT.skeleton.animation_cache_mode'), _dec18 = type(AnimationCacheMode), _dec19 = tooltip('i18n:COMPONENT.skeleton.loop'), _dec20 = tooltip('i18n:COMPONENT.skeleton.premultipliedAlpha'), _dec21 = tooltip('i18n:COMPONENT.skeleton.time_scale'), _dec22 = tooltip('i18n:COMPONENT.skeleton.debug_slots'), _dec23 = tooltip('i18n:COMPONENT.skeleton.debug_bones'), _dec24 = tooltip('i18n:COMPONENT.skeleton.debug_mesh'), _dec25 = tooltip('i18n:COMPONENT.skeleton.use_tint'), _dec26 = tooltip('i18n:COMPONENT.skeleton.enabled_batch'), _dec27 = type([SpineSocket]), _dec28 = tooltip('i18n:animation.sockets'), _dec29 = visible(false), _dec30 = visible(false), _dec3(_class4 = _dec4(_class4 = _dec5(_class4 = executeInEditMode(_class4 = (_class5 = (_temp = _class6 = class Skeleton extends UIRenderer {
        /**
         * @internal Since v3.7.2, this is an engine private interface.
         */
        get drawList() {
          return this._drawList;
        }

        _updateBuiltinMaterial() {
          const material = builtinResMgr.get('default-spine-material');
          return material;
        }

        get customMaterial() {
          return this._customMaterial;
        }

        set customMaterial(val) {
          this._customMaterial = val;
          this.updateMaterial();
          this.markForUpdateRenderData();
        }

        updateMaterial() {
          let mat;
          if (this._customMaterial) mat = this._customMaterial;else mat = this._updateBuiltinMaterial();
          this.setMaterial(mat, 0);

          this._cleanMaterialCache();
        }
        /**
         * @en The skeletal animation is paused?
         * @zh 该骨骼动画是否暂停。
         * @property paused
         * @type {Boolean}
         * @default false
         */


        get paused() {
          return this._paused;
        }

        set paused(value) {
          this._paused = value;
        }
        /** dstBlendFactor
         * @en
         * The skeleton data contains the skeleton information (bind pose bones, slots, draw order,
         * attachments, skins, etc) and animations but does not hold any state.<br/>
         * Multiple skeletons can share the same skeleton data.
         * @zh
         * 骨骼数据包含了骨骼信息（绑定骨骼动作，slots，渲染顺序，
         * attachments，皮肤等等）和动画但不持有任何状态。<br/>
         * 多个 Skeleton 可以共用相同的骨骼数据。
         * @property {sp.SkeletonData} skeletonData
         */


        get skeletonData() {
          return this._skeletonData;
        }

        set skeletonData(value) {
          if (value) value.resetEnums();

          if (this._skeletonData !== value) {
            this.destroyRenderData();
            this._skeletonData = value;
            this._needUpdateSkeltonData = true;
            this.defaultSkin = '';
            this.defaultAnimation = '';

            if (EDITOR && !legacyCC.GAME_VIEW) {
              this._refreshInspector();
            }

            this._updateUITransform();

            this._updateSkeletonData();
          }
        }
        /**
         * @en The name of current playing animation.
         * @zh 当前播放的动画名称。
         * @property {String} animation
         */


        get animation() {
          if (this.isAnimationCached()) {
            return this._animationName;
          }

          const entry = this.getCurrent(0);
          return entry && entry.animation.name || '';
        }

        set animation(value) {
          if (value) {
            this.setAnimation(0, value, this.loop);
            this.markForUpdateRenderData();
          } else {
            this.clearAnimation();
          }
        }
        /**
         * @internal Since v3.7.2, this is an engine private interface
         */


        get _defaultSkinIndex() {
          if (this.skeletonData) {
            const skinsEnum = this.skeletonData.getSkinsEnum();

            if (skinsEnum) {
              if (this.defaultSkin === '') {
                // eslint-disable-next-line no-prototype-builtins
                if (skinsEnum.hasOwnProperty(0)) {
                  this._defaultSkinIndex = 0;
                  return 0;
                }
              } else {
                const skinIndex = skinsEnum[this.defaultSkin];

                if (skinIndex !== undefined) {
                  return skinIndex;
                }
              }
            }
          }

          return 0;
        }
        /**
         * @internal Since v3.7.2, this is an engine private interface.
         */


        set _defaultSkinIndex(value) {
          let skinsEnum;

          if (this.skeletonData) {
            skinsEnum = this.skeletonData.getSkinsEnum();
          }

          if (!skinsEnum) {
            console.error(`${this.name} skin enums are invalid`);
            return;
          }

          const skinName = skinsEnum[value];

          if (skinName !== undefined) {
            this.defaultSkin = skinName;
            this.setSkin(this.defaultSkin);

            if (EDITOR && !legacyCC.GAME_VIEW
            /* && !cc.engine.isPlaying */
            ) {
                this._refreshInspector();

                this.markForUpdateRenderData();
              }
          } else {
            console.error(`${this.name} skin enums are invalid`);
          }
        } // value of 0 represents no animation

        /**
         * @internal
         */


        get _animationIndex() {
          const animationName = EDITOR && !legacyCC.GAME_VIEW ? this.defaultAnimation : this.animation;

          if (this.skeletonData) {
            if (animationName) {
              const animsEnum = this.skeletonData.getAnimsEnum();

              if (animsEnum) {
                const animIndex = animsEnum[animationName];

                if (animIndex !== undefined) {
                  return animIndex;
                }
              }
            } else {
              this._refreshInspector();
            }
          }

          return 0;
        }
        /**
         * @internal
         */


        set _animationIndex(value) {
          let animsEnum;

          if (this.skeletonData) {
            animsEnum = this.skeletonData.getAnimsEnum();
          }

          if (!animsEnum) {
            console.error(`${this.name} animation enums are invalid`);
            return;
          }

          const animName = animsEnum[value];

          if (animName !== undefined) {
            this.animation = animName;

            if (EDITOR && !legacyCC.GAME_VIEW) {
              this.defaultAnimation = animName;

              this._refreshInspector();
            } else {
              this.animation = animName;
            }
          } else {
            console.error(`${this.name} animation enums are invalid`);
          }
        }
        /**
         * @en Animation mode, with options for real-time mode, private cached, or public cached mode.
         * @zh 动画模式，可选实时模式，私有 cached 或公共 cached 模式。
         */


        get defaultCacheMode() {
          return this._defaultCacheMode;
        }

        set defaultCacheMode(mode) {
          this._defaultCacheMode = mode;
          this.setAnimationCacheMode(this._defaultCacheMode);
        }
        /**
         * @en Whether play animations in loop mode.
         * @zh 是否循环播放当前骨骼动画。
         */


        /**
         * @en Whether premultipliedAlpha enabled.
         * @zh 是否启用 alpha 预乘。
         */
        get premultipliedAlpha() {
          return this._premultipliedAlpha;
        }

        set premultipliedAlpha(v) {
          if (v !== this._premultipliedAlpha) {
            this._premultipliedAlpha = v;
            this.markForUpdateRenderData();
          }
        }
        /**
         * @en The time scale of this skeleton.
         * @zh 当前骨骼中所有动画的时间缩放率。
         */


        get timeScale() {
          return this._timeScale;
        }

        set timeScale(value) {
          if (value !== this._timeScale) {
            this._timeScale = value;
          }
        }
        /**
         * @en Indicates whether open debug slots.
         * @zh 是否显示 slot 的 debug 信息。
         */


        get debugSlots() {
          return this._debugSlots;
        }

        set debugSlots(v) {
          if (v !== this._debugSlots) {
            this._debugSlots = v;

            this._updateDebugDraw();

            this.markForUpdateRenderData();
          }
        }
        /**
         * @en Indicates whether open debug bones.
         * @zh 是否显示 bone 的 debug 信息。
         */


        get debugBones() {
          return this._debugBones;
        }

        set debugBones(v) {
          if (v !== this._debugBones) {
            this._debugBones = v;

            this._updateDebugDraw();

            this.markForUpdateRenderData();
          }
        }
        /**
         * @en Indicates whether open debug mesh.
         * @zh 是否显示 mesh 的 debug 信息。
         */


        get debugMesh() {
          return this._debugMesh;
        }

        set debugMesh(value) {
          if (value !== this._debugMesh) {
            this._debugMesh = value;

            this._updateDebugDraw();

            this.markForUpdateRenderData();
          }
        }
        /**
         * @en Enabled two color tint.
         * @zh 是否启用染色效果。
         */


        get useTint() {
          return this._useTint;
        }

        set useTint(value) {
          if (value !== this._useTint) {
            this._useTint = value;

            this._updateUseTint();
          }
        }
        /**
         * @en If rendering a large number of identical textures and simple skeletal animations,
         * enabling batching can reduce the number of draw calls and improve rendering performance.
         * @zh 如果渲染大量相同纹理，且结构简单的骨骼动画，开启合批可以降低 draw call 数量提升渲染性能。
         */


        get enableBatch() {
          return this._enableBatch;
        }

        set enableBatch(value) {
          if (value !== this._enableBatch) {
            this._enableBatch = value;

            this._updateBatch();
          }
        }
        /**
         * @en
         * The bone sockets this animation component maintains.<br>
         * A SpineSocket object contains a path reference to bone, and a target node.
         * @zh
         * 当前动画组件维护的挂点数组。一个挂点组件包括动画节点路径和目标节点。
         */


        get sockets() {
          return this._sockets;
        }

        set sockets(val) {
          if (EDITOR && !legacyCC.GAME_VIEW) {
            this._verifySockets(val);
          }

          this._sockets = val;

          this._updateSocketBindings();

          this.attachUtil._syncAttachedNode();
        }
        /**
         * @en
         * All the target nodes been set in the array of SpineSocket.
         * @zh 当前所有设置在 SpineSocket 数组中的 target nodes。
         */


        get socketNodes() {
          return this._socketNodes;
        } // Frame cache

        /**
         * @internal
         */


        requestDrawInfo(idx) {
          if (!this._drawInfoList[idx]) {
            this._drawInfoList[idx] = new RenderDrawInfo();
          }

          return this._drawInfoList[idx];
        } // CONSTRUCTOR


        constructor() {
          super();
          this.loop = _initializer3 && _initializer3();
          this._frameCache = null;
          this._curFrame = null;
          this._effectDelegate = null;
          this._skeleton = void 0;
          this._clipper = void 0;
          this._debugRenderer = void 0;
          this._startSlotIndex = void 0;
          this._endSlotIndex = void 0;
          this._startEntry = void 0;
          this._endEntry = void 0;
          this.attachUtil = void 0;
          this.maxVertexCount = 0;
          this.maxIndexCount = 0;
          this._materialCache = {};
          this._enumSkins = Enum({});
          this._enumAnimations = Enum({});
          this._playTimes = 0;
          this._timeScale = _initializer4 && _initializer4();
          this._paused = false;
          this._accTime = 0;
          this._playCount = 0;
          this._skeletonCache = null;
          this._animationName = '';
          this._animationQueue = [];
          this._headAniInfo = null;
          this._isAniComplete = true;
          this._needUpdateSkeltonData = true;
          this._useTint = _initializer5 && _initializer5();
          this._preCacheMode = _initializer6 && _initializer6();
          this._cacheMode = _initializer7 && _initializer7();
          this._defaultCacheMode = _initializer8 && _initializer8();
          this._debugBones = _initializer9 && _initializer9();
          this._debugSlots = _initializer10 && _initializer10();
          this._skeletonData = _initializer11 && _initializer11();
          this._premultipliedAlpha = _initializer12 && _initializer12();
          this.defaultSkin = _initializer13 && _initializer13();
          this.defaultAnimation = _initializer14 && _initializer14();
          this._enableBatch = _initializer15 && _initializer15();
          this._sockets = _initializer16 && _initializer16();
          this._drawIdx = 0;
          this._drawList = new RecyclePool(() => ({
            material: null,
            texture: null,
            indexOffset: 0,
            indexCount: 0
          }), 1);
          this._debugMesh = _initializer17 && _initializer17();
          this._rootBone = void 0;
          this._state = void 0;
          this._listener = void 0;
          this._socketNodes = new Map();
          this._cachedSockets = new Map();
          this._drawInfoList = [];
          this._effectDelegate = null;
          this._skeleton = null;
          this._rootBone = null;
          this._listener = null;
          this._debugRenderer = null;
          this._startSlotIndex = -1;
          this._endSlotIndex = -1;
          this._startEntry = {
            animation: {
              name: ''
            },
            trackIndex: 0
          };
          this._endEntry = {
            animation: {
              name: ''
            },
            trackIndex: 0
          };
          this.attachUtil = new AttachUtil();
          setEnumAttr(this, '_defaultSkinIndex', this._enumSkins);
          setEnumAttr(this, '_animationIndex', this._enumAnimations);
          this._useVertexOpacity = true;
        }
        /**
         * @en
         * Sets runtime skeleton data to sp.Skeleton.<br>
         * This method is different from the `skeletonData` property. This method is passed in the raw data provided by the
         *  Spine runtime, and the skeletonData type is the asset type provided by Creator.
         * @zh
         * 设置底层运行时用到的 SkeletonData。<br>
         * 这个接口有别于 `skeletonData` 属性，这个接口传入的是 Spine runtime 提供的原始数据，而 skeletonData 的类型是 Creator 提供的资源类型。
         * @method setSkeletonData
         * @param {sp.spine.SkeletonData} skeletonData
         */


        setSkeletonData(skeletonData) {
          if (!EDITOR || legacyCC.GAME_VIEW) {
            if (this._cacheMode === AnimationCacheMode.SHARED_CACHE) {
              this._skeletonCache = SkeletonCache.sharedCache;
            } else if (this._cacheMode === AnimationCacheMode.PRIVATE_CACHE) {
              this._skeletonCache = new SkeletonCache();

              this._skeletonCache.enablePrivateMode();
            }
          }

          if (this.isAnimationCached()) {
            if (this.debugBones || this.debugSlots) {
              warn('Debug bones or slots is invalid in cached mode');
            }

            const skeletonInfo = this._skeletonCache.getSkeletonCache(this.skeletonData._uuid, skeletonData);

            this._skeleton = skeletonInfo.skeleton;
            this._clipper = skeletonInfo.clipper;
            this._rootBone = this._skeleton.getRootBone();
          } else {
            this._skeleton = new spine.Skeleton(skeletonData);
            this._clipper = new spine.SkeletonClipping();
            this._rootBone = this._skeleton.getRootBone();
          } // Recreate render data and mark dirty


          this._flushAssembler();
        }
        /**
         * @en Sets slots visible range.
         * @zh 设置骨骼插槽可视范围。
         */


        setSlotsRange(startSlotIndex, endSlotIndex) {
          if (this.isAnimationCached()) {
            warn('Slots visible range can not be modified in cached mode.');
          } else {
            this._startSlotIndex = startSlotIndex;
            this._endSlotIndex = endSlotIndex;
          }
        }
        /**
         * @en Sets animation state data.<br>
         * The parameter type is {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.AnimationStateData.
         * @zh 设置动画状态数据。<br>
         * 参数是 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.AnimationStateData。
         */


        setAnimationStateData(stateData) {
          if (this.isAnimationCached()) {
            warn('\'setAnimationStateData\' interface can not be invoked in cached mode.');
          } else {
            const state = new spine.AnimationState(stateData);

            if (this._listener) {
              if (this._state) {
                this._state.removeListener(this._listener);
              }

              state.addListener(this._listener);
            }

            this._state = state;
          }
        } // IMPLEMENT


        __preload() {
          super.__preload();

          const children = this.node.children;

          for (let i = 0, n = children.length; i < n; i++) {
            const child = children[i];

            if (child && child.name === 'DEBUG_DRAW_NODE') {
              child.destroy();
            }
          }

          this._updateSkeletonData();

          this._updateDebugDraw();

          if (EDITOR && !legacyCC.GAME_VIEW) {
            this._refreshInspector();
          }
        }
        /**
         * @en
         * It's best to set cache mode before set property 'dragonAsset', or will waste some cpu time.
         * If set the mode in editor, then no need to worry about order problem.
         * @zh
         * 若想切换渲染模式，最好在设置'dragonAsset'之前，先设置好渲染模式，否则有运行时开销。
         * 若在编辑中设置渲染模式，则无需担心设置次序的问题。
         *
         * @example
         * skeleton.setAnimationCacheMode(sp.Skeleton.AnimationCacheMode.SHARED_CACHE);
         */


        setAnimationCacheMode(cacheMode) {
          if (this._preCacheMode !== cacheMode) {
            this._cacheMode = cacheMode;
            this._needUpdateSkeltonData = true;

            this._updateSkeletonData();

            this._updateUseTint();

            this._updateSocketBindings();

            this.markForUpdateRenderData();
          }
        }
        /**
         * @en Whether in cached mode.
         * @zh 当前是否处于缓存模式。
         */


        isAnimationCached() {
          if (EDITOR && !legacyCC.GAME_VIEW) return false;
          return this._cacheMode !== AnimationCacheMode.REALTIME;
        }
        /**
         * @en Update skeleton animation.
         * @zh 更新骨骼动画。
         * @param dt @en delta time. @zh 时间差。
         */


        updateAnimation(dt) {
          this.markForUpdateRenderData();
          if (EDITOR && !legacyCC.GAME_VIEW) return;
          if (this.paused) return;
          dt *= this._timeScale * timeScale;

          if (this.isAnimationCached()) {
            // Cache mode and has animation queue.
            if (this._isAniComplete) {
              if (this._animationQueue.length === 0 && !this._headAniInfo) {
                const frameCache = this._frameCache;

                if (frameCache && frameCache.isInvalid()) {
                  frameCache.updateToFrame();
                  const frames = frameCache.frames;
                  this._curFrame = frames[frames.length - 1];
                }

                return;
              }

              if (!this._headAniInfo) {
                this._headAniInfo = this._animationQueue.shift();
              }

              this._accTime += dt;

              if (this._accTime > this._headAniInfo.delay) {
                const aniInfo = this._headAniInfo;
                this._headAniInfo = null;
                this.setAnimation(0, aniInfo.animationName, aniInfo.loop);
              }

              return;
            }

            this._updateCache(dt);
          } else {
            this._updateRealtime(dt);
          }
        }
        /**
         * @en Sets vertex effect delegate.
         * @zh 设置顶点特效动画代理。
         * @param effectDelegate @en Vertex effect delegate. @zh 顶点特效代理。
         */


        setVertexEffectDelegate(effectDelegate) {
          this._effectDelegate = effectDelegate;
        }
        /**
         * @en Sets the bones and slots to the setup pose.
         * @zh 还原到起始动作。
         * @method setToSetupPose
         */


        setToSetupPose() {
          if (this._skeleton) {
            this._skeleton.setToSetupPose();
          }
        }
        /**
         * @en
         * Sets the bones to the setup pose,
         * using the values from the `BoneData` list in the `SkeletonData`.
         * @zh
         * 设置 bone 到起始动作。
         * 使用 SkeletonData 中的 BoneData 列表中的值。
         * @method setBonesToSetupPose
         */


        setBonesToSetupPose() {
          if (this._skeleton) {
            this._skeleton.setBonesToSetupPose();
          }
        }
        /**
         * @en
         * Sets the slots to the setup pose,
         * using the values from the `SlotData` list in the `SkeletonData`.
         * @zh
         * 设置 slot 到起始动作。
         * 使用 SkeletonData 中的 SlotData 列表中的值。
         * @method setSlotsToSetupPose
         */


        setSlotsToSetupPose() {
          if (this._skeleton) {
            this._skeleton.setSlotsToSetupPose();
          }
        }
        /**
         * @en
         * Updating an animation cache to calculate all frame data in the animation is a cost in
         * performance due to calculating all data in a single frame.
         * To update the cache, use the invalidAnimationCache method with high performance.
         * @zh
         * 更新某个动画缓存, 预计算动画中所有帧数据，由于在单帧计算所有数据，所以较消耗性能。
         * 若想更新缓存，可使用 invalidAnimationCache 方法，具有较高性能。
         * @method updateAnimationCache
         * @param {String} animName
         */


        updateAnimationCache(animName) {
          if (!this.isAnimationCached()) return;
          const uuid = this._skeletonData._uuid;

          if (this._skeletonCache) {
            this._skeletonCache.updateAnimationCache(uuid, animName);
          }
        }
        /**
         * @en
         * Invalidates the animation cache, which is then recomputed on each frame.
         * @zh
         * 使动画缓存失效，之后会在每帧重新计算。
         * @method invalidAnimationCache
         */


        invalidAnimationCache() {
          if (!this.isAnimationCached()) return;

          if (this._skeletonCache) {
            this._skeletonCache.invalidAnimationCache(this._skeletonData._uuid);
          }
        }
        /**
         * @en
         * Finds a bone by name.
         * This does a string comparison for every bone.<br>
         * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Bone object.
         * @zh
         * 通过名称查找 bone。
         * 这里对每个 bone 的名称进行了对比。<br>
         * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Bone 对象。
         *
         * @method findBone
         * @param {String} boneName
         * @return {sp.spine.Bone}
         */


        findBone(boneName) {
          if (this._skeleton) {
            return this._skeleton.findBone(boneName);
          }

          return null;
        }
        /**
         * @en
         * Finds a slot by name. This does a string comparison for every slot.<br>
         * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Slot object.
         * @zh
         * 通过名称查找 slot。这里对每个 slot 的名称进行了比较。<br>
         * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Slot 对象。
         *
         * @method findSlot
         * @param {String} slotName
         * @return {sp.spine.Slot}
         */


        findSlot(slotName) {
          if (this._skeleton) {
            return this._skeleton.findSlot(slotName);
          }

          return null;
        }
        /**
         * @en
         * Finds a skin by name and makes it the active skin.
         * This does a string comparison for every skin.<br>
         * Note that setting the skin does not change which attachments are visible.<br>
         * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Skin object.
         * @zh
         * 按名称查找皮肤，激活该皮肤。这里对每个皮肤的名称进行了比较。<br>
         * 注意：设置皮肤不会改变 attachment 的可见性。<br>
         * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Skin 对象。
         *
         * @method setSkin
         * @param {String} skinName
         */


        setSkin(skinName) {
          if (this._skeleton) {
            this._skeleton.setSkinByName(skinName);

            this._skeleton.setSlotsToSetupPose();
          }

          this.invalidAnimationCache();
        }
        /**
         * @en
         * Returns the attachment for the slot and attachment name.
         * The skeleton looks first in its skin, then in the skeleton data’s default skin.<br>
         * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Attachment object.
         * @zh
         * 通过 slot 和 attachment 的名称获取 attachment。Skeleton 优先查找它的皮肤，然后才是 Skeleton Data 中默认的皮肤。<br>
         * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Attachment 对象。
         *
         * @method getAttachment
         * @param {String} slotName
         * @param {String} attachmentName
         * @return {sp.spine.Attachment}
         */


        getAttachment(slotName, attachmentName) {
          if (this._skeleton) {
            return this._skeleton.getAttachmentByName(slotName, attachmentName);
          }

          return null;
        }
        /**
         * @en
         * Sets the attachment for the slot and attachment name.
         * The skeleton looks first in its skin, then in the skeleton data’s default skin.
         * @zh
         * 通过 slot 和 attachment 的名字来设置 attachment。
         * Skeleton 优先查找它的皮肤，然后才是 Skeleton Data 中默认的皮肤。
         * @method setAttachment
         * @param {String} slotName
         * @param {String} attachmentName
         */


        setAttachment(slotName, attachmentName) {
          if (this._skeleton) {
            this._skeleton.setAttachment(slotName, attachmentName);
          }

          this.invalidAnimationCache();
        }
        /**
         * @en
         * Get Texture Atlas used in attachments.
         * @zh 获取附件图集。
         * @param regionAttachment An attachment type of RegionAttachment or BoundingBoxAttachment.
         * @return TextureRegion contains texture and atlas text information.
         */


        getTextureAtlas(regionAttachment) {
          return regionAttachment.region;
        } // ANIMATION

        /**
         * @en
         * Mix applies all keyframe values,
         * interpolated for the specified time and mixed with the current values.
         * @zh 为所有关键帧设定混合及混合时间（从当前值开始差值）。
         * @method setMix
         * @param {String} fromAnimation
         * @param {String} toAnimation
         * @param {Number} duration
         */


        setMix(fromAnimation, toAnimation, duration) {
          if (this._state) {
            this._state.data.setMix(fromAnimation, toAnimation, duration);
          }
        }
        /**
         * @en Set the current animation. Any queued animations are cleared.<br>
         * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.TrackEntry object.
         * @zh 设置当前动画。队列中的任何的动画将被清除。<br>
         * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.TrackEntry 对象。
         * @method setAnimation
         * @param {Number} trackIndex
         * @param {String} name
         * @param {Boolean} loop
         * @return {sp.spine.TrackEntry}
         */


        setAnimation(trackIndex, name, loop) {
          this._playTimes = loop ? 0 : 1;

          if (this.isAnimationCached()) {
            if (trackIndex !== 0) {
              warn('Track index can not greater than 0 in cached mode.');
            }

            if (!this._skeletonCache) return null;

            let cache = this._skeletonCache.getAnimationCache(this._skeletonData._uuid, name);

            if (!cache) {
              cache = this._skeletonCache.initAnimationCache(this._skeletonData._uuid, name);
            }

            if (cache) {
              this._animationName = name;
              this._isAniComplete = false;
              this._accTime = 0;
              this._playCount = 0;
              this._frameCache = cache;

              if (this._socketNodes.size > 0) {
                this._frameCache.enableCacheAttachedInfo();
              }

              this._frameCache.updateToFrame(0);

              this._curFrame = this._frameCache.frames[0];
            }
          } else if (this._skeleton) {
            const animation = this._skeleton.data.findAnimation(name);

            if (!animation) {
              logID(7509, name);
              return null;
            }

            this._animationName = name;

            const res = this._state.setAnimationWith(trackIndex, animation, loop);

            this._state.apply(this._skeleton);

            return res;
          }

          return null;
        }
        /**
         * @en Adds an animation to be played delay seconds after the current or last queued animation.<br>
         * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.TrackEntry object.
         * @zh 添加一个动画到动画队列尾部，还可以延迟指定的秒数。<br>
         * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.TrackEntry 对象。
         * @method addAnimation
         * @param {Number} trackIndex
         * @param {String} name
         * @param {Boolean} loop
         * @param {Number} [delay=0]
         * @return {sp.spine.TrackEntry}
         */


        addAnimation(trackIndex, name, loop, delay) {
          delay = delay || 0;

          if (this.isAnimationCached()) {
            if (trackIndex !== 0) {
              warn('Track index can not greater than 0 in cached mode.');
            }

            this._animationQueue.push({
              animationName: name,
              loop,
              delay
            });
          } else if (this._skeleton) {
            var _this$_state;

            const animation = this._skeleton.data.findAnimation(name);

            if (!animation) {
              logID(7510, name);
              return null;
            }

            return (_this$_state = this._state) === null || _this$_state === void 0 ? void 0 : _this$_state.addAnimationWith(trackIndex, animation, loop, delay);
          }

          return null;
        }
        /**
         * @en Find animation with specified name.
         * @zh 查找指定名称的动画。
         * @method findAnimation
         * @param {String} name
         * @returns {sp.spine.Animation}
         */


        findAnimation(name) {
          if (this._skeleton) {
            return this._skeleton.data.findAnimation(name);
          }

          return null;
        }
        /**
         * @en Clear animation and set to setup pose.
         * @zh 清除动画并还原到初始姿势。
         */


        clearAnimation() {
          if (!this.isAnimationCached()) {
            this.clearTrack(0);
            this.setToSetupPose();
          }
        }
        /**
         * @en Returns track entry by trackIndex.<br>
         * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.TrackEntry object.
         * @zh 通过 track 索引获取 TrackEntry。<br>
         * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.TrackEntry 对象。
         * @method getCurrent
         * @param trackIndex
         * @return {sp.spine.TrackEntry}
         */


        getCurrent(trackIndex) {
          if (this.isAnimationCached()) {
            warn('\'getCurrent\' interface can not be invoked in cached mode.');
          } else if (this._state) {
            return this._state.getCurrent(trackIndex);
          }

          return null;
        }
        /**
         * @en Clears all tracks of animation state.
         * @zh 清除所有 track 的动画状态。
         * @method clearTracks
         */


        clearTracks() {
          if (this.isAnimationCached()) {
            warn('\'clearTracks\' interface can not be invoked in cached mode.');
          } else if (this._state) {
            this._state.clearTracks();

            this.setToSetupPose();
          }
        }
        /**
         * @en Clears track of animation state by trackIndex.
         * @zh 清除出指定 track 的动画状态。
         * @method clearTrack
         * @param {number} trackIndex
         */


        clearTrack(trackIndex) {
          if (this.isAnimationCached()) {
            warn('\'clearTrack\' interface can not be invoked in cached mode.');
          } else if (this._state) {
            this._state.clearTrack(trackIndex);

            if (EDITOR && !legacyCC.GAME_VIEW
            /* && !cc.engine.isPlaying */
            ) {
                this._state.update(0);
              }
          }
        }
        /**
         * @en Sets the start event listener.
         * @zh 用来设置开始播放动画的事件监听。
         * @method setStartListener
         * @param {function} listener
         */


        setStartListener(listener) {
          this._ensureListener();

          this._listener.start = listener;
        }
        /**
         * @en Sets the interrupt event listener.
         * @zh 用来设置动画被打断的事件监听。
         * @method setInterruptListener
         * @param {function} listener
         */


        setInterruptListener(listener) {
          this._ensureListener();

          this._listener.interrupt = listener;
        }
        /**
         * @en Sets the end event listener.
         * @zh 用来设置动画播放完后的事件监听。
         * @method setEndListener
         * @param {function} listener
         */


        setEndListener(listener) {
          this._ensureListener();

          this._listener.end = listener;
        }
        /**
         * @en Sets the dispose event listener.
         * @zh 用来设置动画将被销毁的事件监听。
         * @method setDisposeListener
         * @param {function} listener
         */


        setDisposeListener(listener) {
          this._ensureListener();

          this._listener.dispose = listener;
        }
        /**
         * @en Sets the complete event listener.
         * @zh 用来设置动画播放一次循环结束后的事件监听。
         * @method setCompleteListener
         * @param {function} listener
         */


        setCompleteListener(listener) {
          this._ensureListener();

          this._listener.complete = listener;
        }
        /**
         * @en Sets the animation event listener.
         * @zh 用来设置动画播放过程中帧事件的监听。
         * @method setEventListener
         * @param {function} listener
         */


        setEventListener(listener) {
          this._ensureListener();

          this._listener.event = listener;
        }
        /**
         * @en Sets the start event listener for specified TrackEntry.
         * @zh 用来为指定的 TrackEntry 设置动画开始播放的事件监听。
         * @method setTrackStartListener
         * @param {sp.spine.TrackEntry} entry
         * @param {function} listener
         */


        setTrackStartListener(entry, listener) {
          TrackEntryListeners.getListeners(entry).start = listener;
        }
        /**
         * @en Sets the interrupt event listener for specified TrackEntry.
         * @zh 用来为指定的 TrackEntry 设置动画被打断的事件监听。
         * @method setTrackInterruptListener
         * @param {sp.spine.TrackEntry} entry
         * @param {function} listener
         */


        setTrackInterruptListener(entry, listener) {
          TrackEntryListeners.getListeners(entry).interrupt = listener;
        }
        /**
         * @en Sets the end event listener for specified TrackEntry.
         * @zh 用来为指定的 TrackEntry 设置动画播放结束的事件监听。
         * @method setTrackEndListener
         * @param {sp.spine.TrackEntry} entry
         * @param {function} listener
         */


        setTrackEndListener(entry, listener) {
          TrackEntryListeners.getListeners(entry).end = listener;
        }
        /**
         * @en Sets the dispose event listener for specified TrackEntry.
         * @zh 用来为指定的 TrackEntry 设置动画即将被销毁的事件监听。
         * @method setTrackDisposeListener
         * @param {sp.spine.TrackEntry} entry
         * @param {function} listener
         */


        setTrackDisposeListener(entry, listener) {
          TrackEntryListeners.getListeners(entry).dispose = listener;
        }
        /**
         * @en Sets the complete event listener for specified TrackEntry.
         * @zh 用来为指定的 TrackEntry 设置动画一次循环播放结束的事件监听。
         * @method setTrackCompleteListener
         * @param {sp.spine.TrackEntry} entry
         * @param {function} listener
         * @param {sp.spine.TrackEntry} listener.entry
         * @param {Number} listener.loopCount
         */


        setTrackCompleteListener(entry, listener) {
          TrackEntryListeners.getListeners(entry).complete = function (trackEntry) {
            const loopCount = Math.floor(trackEntry.trackTime / trackEntry.animationEnd);
            listener(trackEntry, loopCount);
          };
        }
        /**
         * @en Sets the event listener for specified TrackEntry.
         * @zh 用来为指定的 TrackEntry 设置动画帧事件的监听。
         * @method setTrackEventListener
         * @param {sp.spine.TrackEntry} entry
         * @param {function} listener
         */


        setTrackEventListener(entry, listener) {
          TrackEntryListeners.getListeners(entry).event = listener;
        }
        /**
         * @en Gets the animation state object.
         * @zh 获取动画状态。
         * @method getState
         * @return {sp.spine.AnimationState} state
         */


        getState() {
          return this._state;
        }
        /**
         * @en Be called when component state becomes available.
         * @zh 组件状态变为可用时调用。
         */


        onEnable() {
          super.onEnable();

          this._flushAssembler();

          SkeletonSystem.getInstance().add(this);
        }
        /**
         * @en Be called when component state becomes disabled.
         * @zh 组件状态变为禁用状态时调用。
         */


        onDisable() {
          super.onDisable();
          SkeletonSystem.getInstance().remove(this);
        }
        /**
         * @en Be called before components are destroyed.
         * @zh 组件被销毁前调用。
         */


        onDestroy() {
          this._cleanMaterialCache();

          this._drawList.destroy();

          super.onDestroy();
        }
        /**
         * @en Call this method to destroy the rendering data.
         * @zh 调用该方法销毁渲染数据。
         */


        destroyRenderData() {
          this._drawList.reset();

          super.destroyRenderData();
        }

        getMaterialTemplate() {
          if (this.customMaterial !== null) return this.customMaterial;
          if (this.material) return this.material;
          this.updateMaterial();
          return this.material;
        }
        /**
         * @internal Since v3.7.2, this is an engine private interface.
         */


        getMaterialForBlendAndTint(src, dst, type) {
          const key = `${type}/${src}/${dst}`;
          let inst = this._materialCache[key];

          if (inst) {
            return inst;
          }

          const material = this.getMaterialTemplate();
          const matInfo = {
            parent: material,
            subModelIdx: 0,
            owner: this
          };
          inst = new MaterialInstance(matInfo);
          this._materialCache[key] = inst;
          inst.overridePipelineStates({
            blendState: {
              blendColor: Color.WHITE,
              targets: [{
                blendEq: BlendOp.ADD,
                blendAlphaEq: BlendOp.ADD,
                blendSrc: src,
                blendDst: dst,
                blendSrcAlpha: src,
                blendDstAlpha: dst
              }]
            }
          });
          let useTwoColor = false;

          if (type === SpineMaterialType.TWO_COLORED) {
            useTwoColor = true;
          }

          const useLocal = !this._enableBatch;
          inst.recompileShaders({
            TWO_COLORED: useTwoColor,
            USE_LOCAL: useLocal
          });
          return inst;
        } // For Redo, Undo
        // call markForUpdateRenderData to make sure renderData will be re-built.

        /**
         * @internal Since v3.7.2, this is an engine private interface.
         */


        onRestore() {
          this.updateMaterial();
          this.markForUpdateRenderData();
        }
        /**
         * @en Query all bones that can attach sockets.
         * @zh 查询所有可以添加挂点的所有骨骼。
         * @return String typed array of bones's path.
         */


        querySockets() {
          if (!this._skeleton) {
            return [];
          }

          if (this._cachedSockets.size === 0) {
            this._indexBoneSockets();
          }

          if (this._cachedSockets.size > 0) {
            return Array.from(this._cachedSockets.keys()).sort();
          }

          return [];
        }
        /**
         * @internal
         */


        _requestDrawData(material, texture, indexOffset, indexCount) {
          const draw = this._drawList.add();

          draw.material = material;
          draw.texture = texture;
          draw.indexOffset = indexOffset;
          draw.indexCount = indexCount;
          return draw;
        }
        /**
         * @en Submit rendering data to batcher2d.
         * @zh 提交渲染数据。
         */


        _render(batcher) {
          let indicesCount = 0;

          if (this.renderData && this._drawList) {
            const rd = this.renderData;
            const chunk = rd.chunk;
            const accessor = chunk.vertexAccessor;
            const meshBuffer = rd.getMeshBuffer();
            const origin = meshBuffer.indexOffset; // Fill index buffer

            for (let i = 0; i < this._drawList.length; i++) {
              this._drawIdx = i;
              const dc = this._drawList.data[i];

              if (dc.texture) {
                batcher.commitMiddleware(this, meshBuffer, origin + dc.indexOffset, dc.indexCount, dc.texture, dc.material, this._enableBatch);
              }

              indicesCount += dc.indexCount;
            }

            const subIndices = rd.indices.subarray(0, indicesCount);
            accessor.appendIndices(chunk.bufferId, subIndices);
          }
        } // RENDERER

        /**
         * @en Computes the world SRT from the local SRT for each bone.
         * @zh 重新更新所有骨骼的世界 Transform，
         * 当获取 bone 的数值未更新时，即可使用该函数进行更新数值。
         * @method updateWorldTransform
         * @example
         * var bone = spine.findBone('head');
         * cc.log(bone.worldX); // return 0;
         * spine.updateWorldTransform();
         * bone = spine.findBone('head');
         * cc.log(bone.worldX); // return -23.12;
         */


        updateWorldTransform() {
          if (!this.isAnimationCached()) return;

          if (this._skeleton) {
            this._skeleton.updateWorldTransform();
          }
        }

        _emitCacheCompleteEvent() {
          if (!this._listener) return;
          this._endEntry.animation.name = this._animationName;
          if (this._listener.complete) this._listener.complete(this._endEntry);
          if (this._listener.end) this._listener.end(this._endEntry);
        }

        _updateCache(dt) {
          const frameCache = this._frameCache;

          if (!frameCache.isInited()) {
            return;
          }

          const frames = frameCache.frames;
          const frameTime = SkeletonCache.FrameTime; // Animation Start, the event different from dragonbones inner event,
          // It has no event object.

          if (this._accTime === 0 && this._playCount === 0) {
            this._startEntry.animation.name = this._animationName;
            if (this._listener && this._listener.start) this._listener.start(this._startEntry);
          }

          this._accTime += dt;
          let frameIdx = Math.floor(this._accTime / frameTime);

          if (!frameCache.isCompleted) {
            frameCache.updateToFrame(frameIdx); // Update render data size if needed

            if (this.renderData && (this.renderData.vertexCount < frameCache.maxVertexCount || this.renderData.indexCount < frameCache.maxIndexCount)) {
              this.maxVertexCount = frameCache.maxVertexCount > this.maxVertexCount ? frameCache.maxVertexCount : this.maxVertexCount;
              this.maxIndexCount = frameCache.maxIndexCount > this.maxIndexCount ? frameCache.maxIndexCount : this.maxIndexCount;
              this.renderData.resize(this.maxVertexCount, this.maxIndexCount);

              if (!this.renderData.indices || this.maxIndexCount > this.renderData.indices.length) {
                this.renderData.indices = new Uint16Array(this.maxIndexCount);
              }
            }
          }

          if (frameCache.isCompleted && frameIdx >= frames.length) {
            this._playCount++;

            if (this._playTimes > 0 && this._playCount >= this._playTimes) {
              // set frame to end frame.
              this._curFrame = frames[frames.length - 1];
              this._accTime = 0;
              this._playCount = 0;
              this._isAniComplete = true;

              this._emitCacheCompleteEvent();

              return;
            }

            this._accTime = 0;
            frameIdx = 0;

            this._emitCacheCompleteEvent();
          }

          this._curFrame = frames[frameIdx];
        }

        _updateRealtime(dt) {
          const skeleton = this._skeleton;
          const state = this._state;

          if (skeleton) {
            skeleton.update(dt);

            if (state) {
              state.update(dt);
              state.apply(skeleton);
            }
          }
        }

        _indexBoneSockets() {
          if (!this._skeleton) {
            return;
          }

          this._cachedSockets.clear();

          const bones = this._skeleton.bones;

          const getBoneName = bone => {
            if (bone.parent == null) return bone.data.name || '<Unamed>';
            return `${getBoneName(bones[bone.parent.data.index])}/${bone.data.name}`;
          };

          for (let i = 0, l = bones.length; i < l; i++) {
            const bd = bones[i].data;
            const boneName = getBoneName(bones[i]);

            this._cachedSockets.set(boneName, bd.index);
          }
        } // if change use tint mode, just clear material cache


        _updateUseTint() {
          this._cleanMaterialCache();

          this.destroyRenderData();

          if (this._assembler && this._skeleton) {
            this._renderData = this._assembler.createData(this);
            this.markForUpdateRenderData();
          }
        } // if change use batch mode, just clear material cache


        _updateBatch() {
          this._cleanMaterialCache();

          this.markForUpdateRenderData();
        } // update animation list for editor


        _updateAnimEnum() {
          let animEnum;

          if (this.skeletonData) {
            animEnum = this.skeletonData.getAnimsEnum();
          } else {
            animEnum = DefaultAnimsEnum;
          } // reset enum type


          this._enumAnimations = Enum({});
          Object.assign(this._enumAnimations, animEnum);
          Enum.update(this._enumAnimations);
          setEnumAttr(this, '_animationIndex', this._enumAnimations);
        } // update skin list for editor


        _updateSkinEnum() {
          let skinEnum;

          if (this.skeletonData) {
            skinEnum = this.skeletonData.getSkinsEnum();
          } else {
            skinEnum = DefaultSkinsEnum;
          }

          this._enumSkins = Enum({});
          Object.assign(this._enumSkins, skinEnum);
          Enum.update(this._enumSkins);
          setEnumAttr(this, '_defaultSkinIndex', this._enumSkins);
        }

        _ensureListener() {
          if (!this._listener) {
            this._listener = new TrackEntryListeners();

            if (this._state) {
              this._state.addListener(this._listener);
            }
          }
        }

        _updateSkeletonData() {
          if (!this.skeletonData || this._needUpdateSkeltonData === false) {
            return;
          }

          this._needUpdateSkeltonData = false;
          const data = this.skeletonData.getRuntimeData();

          if (!data) {
            return;
          }

          try {
            this.setSkeletonData(data);

            if (!this.isAnimationCached()) {
              this.setAnimationStateData(new spine.AnimationStateData(this._skeleton.data));
            }

            if (this.defaultSkin) this.setSkin(this.defaultSkin);
          } catch (e) {
            warn(e);
          }

          this._indexBoneSockets();

          this._updateSocketBindings();

          this.attachUtil.init(this);
          this._preCacheMode = this._cacheMode;
          this.animation = this.defaultAnimation;
        }

        _refreshInspector() {
          // update inspector
          this._updateAnimEnum();

          this._updateSkinEnum(); // TODO: refresh inspector
          // Editor.Utils.refreshSelectedInspector('node', this.node.uuid);

        }

        _updateDebugDraw() {
          if (this.debugBones || this.debugSlots || this.debugMesh) {
            if (!this._debugRenderer) {
              const debugDrawNode = new Node('DEBUG_DRAW_NODE');
              debugDrawNode.hideFlags |= CCObject.Flags.DontSave | CCObject.Flags.HideInHierarchy;
              const debugDraw = debugDrawNode.addComponent(Graphics);
              debugDraw.lineWidth = 1;
              debugDraw.strokeColor = new Color(255, 0, 0, 255);
              this._debugRenderer = debugDraw;
              debugDrawNode.parent = this.node;
            } // this._debugRenderer.node.active = true;


            if (this.isAnimationCached()) {
              warn('Debug bones or slots is invalid in cached mode');
            }
          } else if (this._debugRenderer) {
            this._debugRenderer.node.destroy();

            this._debugRenderer = null; // this._debugRenderer.node.active = false;
          }
        }

        _flushAssembler() {
          const assembler = Skeleton.Assembler.getAssembler(this);

          if (this._assembler !== assembler) {
            this._assembler = assembler;
          }

          if (this._skeleton && this._assembler) {
            this._renderData = this._assembler.createData(this);
            this.markForUpdateRenderData();

            this._updateColor();
          }
        }

        _updateSocketBindings() {
          if (!this._skeleton) return;

          this._socketNodes.clear();

          for (let i = 0, l = this._sockets.length; i < l; i++) {
            const socket = this._sockets[i];

            if (socket.path && socket.target) {
              const boneIdx = this._cachedSockets.get(socket.path);

              if (!boneIdx) {
                console.error(`Skeleton data does not contain path ${socket.path}`);
                continue;
              }

              this._socketNodes.set(boneIdx, socket.target);
            }
          }
        }

        _verifySockets(sockets) {
          for (let i = 0, l = sockets.length; i < l; i++) {
            const target = sockets[i].target;

            if (target) {
              if (!target.parent || target.parent !== this.node) {
                console.error(`Target node ${target.name} is expected to be a direct child of ${this.node.name}`);
                continue;
              }
            }
          }

          const uniqueSocketNode = new Map();
          sockets.forEach(x => {
            if (x.target) {
              if (uniqueSocketNode.get(x.target)) {
                console.error(`Target node ${x.target.name} has existed.`);
              } else {
                uniqueSocketNode.set(x.target, true);
              }
            }
          });
        }

        _cleanMaterialCache() {
          for (const val in this._materialCache) {
            this._materialCache[val].destroy();
          }

          this._materialCache = {};
        }

        createRenderEntity() {
          const renderEntity = new RenderEntity(RenderEntityType.DYNAMIC);
          renderEntity.setUseLocal(true);
          return renderEntity;
        }
        /**
         * @en Mark to re-update the rendering data, usually used to force refresh the display.
         * @zh 标记重新更新渲染数据，一般用于强制刷新显示。
         */


        markForUpdateRenderData(enable = true) {
          super.markForUpdateRenderData(enable);

          if (this._debugRenderer) {
            this._debugRenderer.markForUpdateRenderData(enable);
          }
        }
        /**
         * @engineInternal since v3.7.2 this is an engine private function.
         */


        syncAttachedNode() {
          // sync attached node matrix
          this.attachUtil._syncAttachedNode();
        }

        _updateUITransform() {
          const uiTrans = this.node._uiProps.uiTransformComp;
          let skeletonData = null;

          if (this._skeletonData) {
            skeletonData = this._skeletonData.getRuntimeData();
          }

          if (skeletonData === null) {
            uiTrans.setContentSize(100, 100);
            uiTrans.anchorX = 0.5;
            uiTrans.anchorX = 0.5;
          } else {
            if (skeletonData.width && skeletonData.height) uiTrans.setContentSize(skeletonData.width, skeletonData.height);
            if (skeletonData.width !== 0) uiTrans.anchorX = Math.abs(skeletonData.x) / skeletonData.width;
            if (skeletonData.height !== 0) uiTrans.anchorY = Math.abs(skeletonData.y) / skeletonData.height;
          }
        }

      }, _class6.SpineSocket = SpineSocket, _class6.AnimationCacheMode = AnimationCacheMode, _temp), (_applyDecoratedDescriptor(_class5.prototype, "customMaterial", [override, _dec6, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class5.prototype, "customMaterial"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "skeletonData", [editable, _dec9], Object.getOwnPropertyDescriptor(_class5.prototype, "skeletonData"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "_defaultSkinIndex", [_dec10, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class5.prototype, "_defaultSkinIndex"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "_animationIndex", [_dec13, _dec14, _dec15], Object.getOwnPropertyDescriptor(_class5.prototype, "_animationIndex"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "defaultCacheMode", [_dec16, _dec17, editable, _dec18], Object.getOwnPropertyDescriptor(_class5.prototype, "defaultCacheMode"), _class5.prototype), _initializer3 = _applyDecoratedInitializer(_class5.prototype, "loop", [serializable, _dec19], function () {
        return true;
      }), _applyDecoratedDescriptor(_class5.prototype, "premultipliedAlpha", [editable, _dec20], Object.getOwnPropertyDescriptor(_class5.prototype, "premultipliedAlpha"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "timeScale", [_dec21, editable], Object.getOwnPropertyDescriptor(_class5.prototype, "timeScale"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "debugSlots", [editable, _dec22], Object.getOwnPropertyDescriptor(_class5.prototype, "debugSlots"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "debugBones", [editable, _dec23], Object.getOwnPropertyDescriptor(_class5.prototype, "debugBones"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "debugMesh", [editable, _dec24], Object.getOwnPropertyDescriptor(_class5.prototype, "debugMesh"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "useTint", [editable, _dec25], Object.getOwnPropertyDescriptor(_class5.prototype, "useTint"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "enableBatch", [editable, _dec26], Object.getOwnPropertyDescriptor(_class5.prototype, "enableBatch"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "sockets", [_dec27, _dec28], Object.getOwnPropertyDescriptor(_class5.prototype, "sockets"), _class5.prototype), _initializer4 = _applyDecoratedInitializer(_class5.prototype, "_timeScale", [serializable], function () {
        return 1;
      }), _initializer5 = _applyDecoratedInitializer(_class5.prototype, "_useTint", [serializable], function () {
        return false;
      }), _initializer6 = _applyDecoratedInitializer(_class5.prototype, "_preCacheMode", [serializable], function () {
        return -1;
      }), _initializer7 = _applyDecoratedInitializer(_class5.prototype, "_cacheMode", [serializable], function () {
        return AnimationCacheMode.REALTIME;
      }), _initializer8 = _applyDecoratedInitializer(_class5.prototype, "_defaultCacheMode", [serializable], function () {
        return AnimationCacheMode.REALTIME;
      }), _initializer9 = _applyDecoratedInitializer(_class5.prototype, "_debugBones", [serializable], function () {
        return false;
      }), _initializer10 = _applyDecoratedInitializer(_class5.prototype, "_debugSlots", [serializable], function () {
        return false;
      }), _initializer11 = _applyDecoratedInitializer(_class5.prototype, "_skeletonData", [serializable], function () {
        return null;
      }), _initializer12 = _applyDecoratedInitializer(_class5.prototype, "_premultipliedAlpha", [serializable], function () {
        return true;
      }), _initializer13 = _applyDecoratedInitializer(_class5.prototype, "defaultSkin", [serializable, _dec29], function () {
        return '';
      }), _initializer14 = _applyDecoratedInitializer(_class5.prototype, "defaultAnimation", [_dec30, serializable], function () {
        return '';
      }), _initializer15 = _applyDecoratedInitializer(_class5.prototype, "_enableBatch", [serializable], function () {
        return false;
      }), _initializer16 = _applyDecoratedInitializer(_class5.prototype, "_sockets", [serializable], function () {
        return [];
      }), _initializer17 = _applyDecoratedInitializer(_class5.prototype, "_debugMesh", [serializable], function () {
        return false;
      })), _class5)) || _class4) || _class4) || _class4) || _class4));

      legacyCC.internal.SpineSkeleton = Skeleton;
    }
  };
});