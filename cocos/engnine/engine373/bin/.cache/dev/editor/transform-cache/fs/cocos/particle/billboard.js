System.register("q-bundled:///fs/cocos/particle/billboard.js", ["../core/data/decorators/index.js", "../asset/asset-manager/index.js", "../3d/misc/index.js", "../asset/assets/index.js", "../scene-graph/component.js", "../gfx/index.js", "../core/index.js", "../render-scene/index.js"], function (_export, _context) {
  "use strict";

  var ccclass, help, executeInEditMode, menu, tooltip, type, serializable, builtinResMgr, createMesh, Material, Texture2D, Component, Attribute, AttributeName, Format, PrimitiveMode, Color, toDegree, toRadian, Vec4, cclegacy, scene, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _initializer, _initializer2, _initializer3, _initializer4, Billboard;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _applyDecoratedInitializer(target, property, decorators, initializer) {
    return decorators.slice().reverse().reduce(function (decoratedInitializer, decorator) {
      return decorator(target, property, decoratedInitializer) || decoratedInitializer;
    }, initializer);
  }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      help = _coreDataDecoratorsIndexJs.help;
      executeInEditMode = _coreDataDecoratorsIndexJs.executeInEditMode;
      menu = _coreDataDecoratorsIndexJs.menu;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      type = _coreDataDecoratorsIndexJs.type;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_assetAssetManagerIndexJs) {
      builtinResMgr = _assetAssetManagerIndexJs.builtinResMgr;
    }, function (_dMiscIndexJs) {
      createMesh = _dMiscIndexJs.createMesh;
    }, function (_assetAssetsIndexJs) {
      Material = _assetAssetsIndexJs.Material;
      Texture2D = _assetAssetsIndexJs.Texture2D;
    }, function (_sceneGraphComponentJs) {
      Component = _sceneGraphComponentJs.Component;
    }, function (_gfxIndexJs) {
      Attribute = _gfxIndexJs.Attribute;
      AttributeName = _gfxIndexJs.AttributeName;
      Format = _gfxIndexJs.Format;
      PrimitiveMode = _gfxIndexJs.PrimitiveMode;
    }, function (_coreIndexJs) {
      Color = _coreIndexJs.Color;
      toDegree = _coreIndexJs.toDegree;
      toRadian = _coreIndexJs.toRadian;
      Vec4 = _coreIndexJs.Vec4;
      cclegacy = _coreIndexJs.cclegacy;
    }, function (_renderSceneIndexJs) {
      scene = _renderSceneIndexJs.scene;
    }],
    execute: function () {
      _export("Billboard", Billboard = (_dec = ccclass('cc.Billboard'), _dec2 = help('i18n:cc.Billboard'), _dec3 = menu('Effects/Billboard'), _dec4 = type(Texture2D), _dec5 = type(Texture2D), _dec6 = tooltip('i18n:billboard.texture'), _dec7 = tooltip('i18n:billboard.height'), _dec8 = tooltip('i18n:billboard.width'), _dec9 = tooltip('i18n:billboard.rotation'), _dec(_class = _dec2(_class = _dec3(_class = executeInEditMode(_class = (_class2 = class Billboard extends Component {
        /**
         * @zh Billboard纹理。
         */
        get texture() {
          return this._texture;
        }

        set texture(val) {
          this._texture = val;

          if (this._material) {
            this._material.setProperty('mainTexture', val);
          }
        }

        /**
         * @zh 高度。
         */
        get height() {
          return this._height;
        }

        set height(val) {
          this._height = val;

          if (this._material) {
            this._uniform.y = val;

            this._material.setProperty('cc_size_rotation', this._uniform);
          }
        }

        /**
         * @zh 宽度。
         */
        get width() {
          return this._width;
        }

        set width(val) {
          this._width = val;

          if (this._material) {
            this._uniform.x = val;

            this._material.setProperty('cc_size_rotation', this._uniform);
          }
        }

        /**
         * @zh billboard绕中心点旋转的角度
         */
        get rotation() {
          return Math.round(toDegree(this._rotation) * 100) / 100;
        }

        set rotation(val) {
          this._rotation = toRadian(val);

          if (this._material) {
            this._uniform.z = this._rotation;

            this._material.setProperty('cc_size_rotation', this._uniform);
          }
        }

        constructor() {
          super();
          this._texture = _initializer && _initializer();
          this._height = _initializer2 && _initializer2();
          this._width = _initializer3 && _initializer3();
          this._rotation = _initializer4 && _initializer4();
          this._model = null;
          this._mesh = null;
          this._material = null;
          this._uniform = new Vec4(1, 1, 0, 0);
        }

        onLoad() {
          this.createModel();
        }

        onEnable() {
          this.attachToScene();
          this._model.enabled = true;
          this.width = this._width;
          this.height = this._height;
          this.rotation = this.rotation;
          this.texture = this.texture;
        }

        onDisable() {
          this.detachFromScene();
        }

        attachToScene() {
          if (this._model && this.node && this.node.scene) {
            if (this._model.scene) {
              this.detachFromScene();
            }

            this._getRenderScene().addModel(this._model);
          }
        }

        detachFromScene() {
          if (this._model && this._model.scene) {
            this._model.scene.removeModel(this._model);
          }
        }

        createModel() {
          this._mesh = createMesh({
            primitiveMode: PrimitiveMode.TRIANGLE_LIST,
            positions: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            uvs: [0, 0, 1, 0, 0, 1, 1, 1],
            colors: [Color.WHITE.r, Color.WHITE.g, Color.WHITE.b, Color.WHITE.a, Color.WHITE.r, Color.WHITE.g, Color.WHITE.b, Color.WHITE.a, Color.WHITE.r, Color.WHITE.g, Color.WHITE.b, Color.WHITE.a, Color.WHITE.r, Color.WHITE.g, Color.WHITE.b, Color.WHITE.a],
            attributes: [new Attribute(AttributeName.ATTR_POSITION, Format.RGB32F), new Attribute(AttributeName.ATTR_TEX_COORD, Format.RG32F), new Attribute(AttributeName.ATTR_COLOR, Format.RGBA8UI, true)],
            indices: [0, 1, 2, 1, 2, 3]
          }, undefined, {
            calculateBounds: false
          });
          const model = this._model = cclegacy.director.root.createModel(scene.Model, this.node);
          model.node = model.transform = this.node;

          if (this._material == null) {
            this._material = new Material();

            this._material.copy(builtinResMgr.get('default-billboard-material'));
          }

          model.initSubModel(0, this._mesh.renderingSubMeshes[0], this._material);
        }

      }, (_initializer = _applyDecoratedInitializer(_class2.prototype, "_texture", [_dec4], function () {
        return null;
      }), _applyDecoratedDescriptor(_class2.prototype, "texture", [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "texture"), _class2.prototype), _initializer2 = _applyDecoratedInitializer(_class2.prototype, "_height", [serializable], function () {
        return 0;
      }), _applyDecoratedDescriptor(_class2.prototype, "height", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "height"), _class2.prototype), _initializer3 = _applyDecoratedInitializer(_class2.prototype, "_width", [serializable], function () {
        return 0;
      }), _applyDecoratedDescriptor(_class2.prototype, "width", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "width"), _class2.prototype), _initializer4 = _applyDecoratedInitializer(_class2.prototype, "_rotation", [serializable], function () {
        return 0;
      }), _applyDecoratedDescriptor(_class2.prototype, "rotation", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "rotation"), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class));
    }
  };
});