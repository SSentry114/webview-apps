System.register("q-bundled:///fs/cocos/2d/components/label.js", ["../../core/data/decorators/index.js", "../../../../virtual/internal%253Aconstants.js", "pal/minigame", "../assets/index.js", "../../asset/assets/index.js", "../../core/index.js", "../assembler/label/font-utils.js", "../framework/ui-renderer.js", "../../asset/assets/texture-base.js", "../../asset/assets/asset-enum.js", "../../gfx/index.js"], function (_export, _context) {
  "use strict";

  var ccclass, help, executionOrder, menu, tooltip, displayOrder, visible, multiline, type, serializable, editable, BYTEDANCE, EDITOR, JSB, minigame, BitmapFont, Font, SpriteFrame, ImageAsset, JsonAsset, Texture2D, ccenum, cclegacy, Color, CanvasPool, InstanceMaterialType, UIRenderer, TextureBase, PixelFormat, BlendFactor, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _class, _class2, _initializer, _initializer2, _initializer3, _initializer4, _initializer5, _initializer6, _initializer7, _initializer8, _initializer9, _initializer10, _initializer11, _initializer12, _initializer13, _initializer14, _initializer15, _initializer16, _initializer17, _initializer18, _initializer19, _class3, _temp, tempColor, HorizontalTextAlignment, VerticalTextAlignment, Overflow, CacheMode, Label;

  function _applyDecoratedInitializer(target, property, decorators, initializer) {
    return decorators.slice().reverse().reduce(function (decoratedInitializer, decorator) {
      return decorator(target, property, decoratedInitializer) || decoratedInitializer;
    }, initializer);
  }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  _export({
    HorizontalTextAlignment: void 0,
    VerticalTextAlignment: void 0,
    Overflow: void 0,
    CacheMode: void 0
  });

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      help = _coreDataDecoratorsIndexJs.help;
      executionOrder = _coreDataDecoratorsIndexJs.executionOrder;
      menu = _coreDataDecoratorsIndexJs.menu;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      displayOrder = _coreDataDecoratorsIndexJs.displayOrder;
      visible = _coreDataDecoratorsIndexJs.visible;
      multiline = _coreDataDecoratorsIndexJs.multiline;
      type = _coreDataDecoratorsIndexJs.type;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      editable = _coreDataDecoratorsIndexJs.editable;
    }, function (_virtualInternal253AconstantsJs) {
      BYTEDANCE = _virtualInternal253AconstantsJs.BYTEDANCE;
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      JSB = _virtualInternal253AconstantsJs.JSB;
    }, function (_palMinigame) {
      minigame = _palMinigame.minigame;
    }, function (_assetsIndexJs) {
      BitmapFont = _assetsIndexJs.BitmapFont;
      Font = _assetsIndexJs.Font;
      SpriteFrame = _assetsIndexJs.SpriteFrame;
    }, function (_assetAssetsIndexJs) {
      ImageAsset = _assetAssetsIndexJs.ImageAsset;
      JsonAsset = _assetAssetsIndexJs.JsonAsset;
      Texture2D = _assetAssetsIndexJs.Texture2D;
    }, function (_coreIndexJs) {
      ccenum = _coreIndexJs.ccenum;
      cclegacy = _coreIndexJs.cclegacy;
      Color = _coreIndexJs.Color;
    }, function (_assemblerLabelFontUtilsJs) {
      CanvasPool = _assemblerLabelFontUtilsJs.CanvasPool;
    }, function (_frameworkUiRendererJs) {
      InstanceMaterialType = _frameworkUiRendererJs.InstanceMaterialType;
      UIRenderer = _frameworkUiRendererJs.UIRenderer;
    }, function (_assetAssetsTextureBaseJs) {
      TextureBase = _assetAssetsTextureBaseJs.TextureBase;
    }, function (_assetAssetsAssetEnumJs) {
      PixelFormat = _assetAssetsAssetEnumJs.PixelFormat;
    }, function (_gfxIndexJs) {
      BlendFactor = _gfxIndexJs.BlendFactor;
    }],
    execute: function () {
      tempColor = Color.WHITE.clone();
      /**
       * @en Enum for horizontal text alignment.
       *
       * @zh 文本横向对齐类型。
       */

      (function (HorizontalTextAlignment) {
        HorizontalTextAlignment[HorizontalTextAlignment["LEFT"] = 0] = "LEFT";
        HorizontalTextAlignment[HorizontalTextAlignment["CENTER"] = 1] = "CENTER";
        HorizontalTextAlignment[HorizontalTextAlignment["RIGHT"] = 2] = "RIGHT";
      })(HorizontalTextAlignment || _export("HorizontalTextAlignment", HorizontalTextAlignment = {}));

      ccenum(HorizontalTextAlignment);
      /**
       * @en Enum for vertical text alignment.
       *
       * @zh 文本垂直对齐类型。
       */

      (function (VerticalTextAlignment) {
        VerticalTextAlignment[VerticalTextAlignment["TOP"] = 0] = "TOP";
        VerticalTextAlignment[VerticalTextAlignment["CENTER"] = 1] = "CENTER";
        VerticalTextAlignment[VerticalTextAlignment["BOTTOM"] = 2] = "BOTTOM";
      })(VerticalTextAlignment || _export("VerticalTextAlignment", VerticalTextAlignment = {}));

      ccenum(VerticalTextAlignment);
      /**
       * @en Enum for Overflow.
       *
       * @zh 文本溢出行为类型。
       */

      (function (Overflow) {
        Overflow[Overflow["NONE"] = 0] = "NONE";
        Overflow[Overflow["CLAMP"] = 1] = "CLAMP";
        Overflow[Overflow["SHRINK"] = 2] = "SHRINK";
        Overflow[Overflow["RESIZE_HEIGHT"] = 3] = "RESIZE_HEIGHT";
      })(Overflow || _export("Overflow", Overflow = {}));

      ccenum(Overflow);
      /**
       * @en Enum for cache mode.
       *
       * @zh 文本图集缓存类型。
       */

      (function (CacheMode) {
        CacheMode[CacheMode["NONE"] = 0] = "NONE";
        CacheMode[CacheMode["BITMAP"] = 1] = "BITMAP";
        CacheMode[CacheMode["CHAR"] = 2] = "CHAR";
      })(CacheMode || _export("CacheMode", CacheMode = {}));

      ccenum(CacheMode);
      /**
       * @en
       * The Label Component.
       *
       * @zh
       * 文字标签组件。
       */

      _export("Label", Label = (_dec = ccclass('cc.Label'), _dec2 = help('i18n:cc.Label'), _dec3 = executionOrder(110), _dec4 = menu('2D/Label'), _dec5 = displayOrder(4), _dec6 = tooltip('i18n:label.string'), _dec7 = type(HorizontalTextAlignment), _dec8 = displayOrder(5), _dec9 = tooltip('i18n:label.horizontal_align'), _dec10 = type(VerticalTextAlignment), _dec11 = displayOrder(6), _dec12 = tooltip('i18n:label.vertical_align'), _dec13 = displayOrder(7), _dec14 = tooltip('i18n:label.font_size'), _dec15 = displayOrder(8), _dec16 = tooltip('i18n:label.line_height'), _dec17 = visible(function () {
        return !this._isSystemFontUsed && this._font instanceof BitmapFont;
      }), _dec18 = displayOrder(9), _dec19 = tooltip('i18n:label.spacing_x'), _dec20 = type(Overflow), _dec21 = displayOrder(10), _dec22 = tooltip('i18n:label.overflow'), _dec23 = displayOrder(11), _dec24 = tooltip('i18n:label.wrap'), _dec25 = displayOrder(12), _dec26 = tooltip('i18n:label.system_font'), _dec27 = displayOrder(13), _dec28 = visible(function () {
        return this._isSystemFontUsed;
      }), _dec29 = tooltip('i18n:label.font_family'), _dec30 = type(Font), _dec31 = displayOrder(13), _dec32 = visible(function () {
        return !this._isSystemFontUsed;
      }), _dec33 = tooltip('i18n:label.font'), _dec34 = type(CacheMode), _dec35 = displayOrder(14), _dec36 = tooltip('i18n:label.cache_mode'), _dec37 = displayOrder(15), _dec38 = tooltip('i18n:label.font_bold'), _dec39 = displayOrder(16), _dec40 = tooltip('i18n:label.font_italic'), _dec41 = displayOrder(17), _dec42 = tooltip('i18n:label.font_underline'), _dec43 = visible(function () {
        return this._isUnderline;
      }), _dec44 = displayOrder(18), _dec45 = tooltip('i18n:label.underline_height'), _dec46 = visible(function () {
        return this._font instanceof BitmapFont;
      }), _dec47 = displayOrder(19), _dec48 = tooltip('i18n:label.isUse_vertical_kerning'), _dec49 = type(JsonAsset), _dec50 = displayOrder(21), _dec51 = visible(function () {
        return this._isUseVerticalKerning && this._font instanceof BitmapFont;
      }), _dec52 = tooltip('i18n:label.vertical_kerning'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = (_temp = _class3 = class Label extends UIRenderer {
        /**
         * @en Enum for horizontal text alignment.
         *
         * @zh 文本横向对齐类型。
         */

        /**
         * @en Enum for vertical text alignment.
         *
         * @zh 文本垂直对齐类型。
         */

        /**
         * @en Enum for label overflow mode.
         *
         * @zh 文本溢出行为类型。
         */

        /**
         * @en Enum for cache mode.
         *
         * @zh 文本图集缓存类型。
         */

        /**
         * @deprecated since v3.7.0, this is an engine private interface that will be removed in the future.
         */

        /**
         * @en
         * Content string of label.
         *
         * @zh
         * 标签显示的文本内容。
         */
        get string() {
          return this._string;
        }

        set string(value) {
          if (value === null || value === undefined) {
            value = '';
          } else {
            value = value.toString();
          }

          if (this._string === value) {
            return;
          }

          this._string = value;
          this.markForUpdateRenderData();
        }
        /**
         * @en
         * Horizontal Alignment of label.
         *
         * @zh
         * 文本内容的水平对齐方式。
         */


        get horizontalAlign() {
          return this._horizontalAlign;
        }

        set horizontalAlign(value) {
          if (this._horizontalAlign === value) {
            return;
          }

          this._horizontalAlign = value;
          this.markForUpdateRenderData();
        }
        /**
         * @en
         * Vertical Alignment of label.
         *
         * @zh
         * 文本内容的垂直对齐方式。
         */


        get verticalAlign() {
          return this._verticalAlign;
        }

        set verticalAlign(value) {
          if (this._verticalAlign === value) {
            return;
          }

          this._verticalAlign = value;
          this.markForUpdateRenderData();
        }
        /**
         * @en
         * The actual rendering font size in shrink mode.
         *
         * @zh
         * SHRINK 模式下面文本实际渲染的字体大小。
         */


        get actualFontSize() {
          return this._actualFontSize;
        }

        set actualFontSize(value) {
          this._actualFontSize = value;
        }
        /**
         * @en
         * Font size of label.
         *
         * @zh
         * 文本字体大小。
         */


        get fontSize() {
          return this._fontSize;
        }

        set fontSize(value) {
          if (this._fontSize === value) {
            return;
          }

          this._fontSize = value;
          this.markForUpdateRenderData();
        }
        /**
         * @en
         * Line Height of label.
         *
         * @zh
         * 文本行高。
         */


        get lineHeight() {
          return this._lineHeight;
        }

        set lineHeight(value) {
          if (this._lineHeight === value) {
            return;
          }

          this._lineHeight = value;
          this.markForUpdateRenderData();
        }
        /**
         * @en
         * The spacing between text characters, only available in BMFont.
         *
         * @zh
         * 文本字符之间的间距。仅在使用 BMFont 位图字体时生效。
         */


        get spacingX() {
          return this._spacingX;
        }

        set spacingX(value) {
          if (this._spacingX === value) {
            return;
          }

          this._spacingX = value;
          this.markForUpdateRenderData();
        }
        /**
         * @en
         * Overflow of label.
         *
         * @zh
         * 文字显示超出范围时的处理方式。
         */


        get overflow() {
          return this._overflow;
        }

        set overflow(value) {
          if (this._overflow === value) {
            return;
          }

          this._overflow = value;
          this.markForUpdateRenderData();
        }
        /**
         * @en
         * Whether auto wrap label when string width is large than label width.
         *
         * @zh
         * 是否自动换行。
         */


        get enableWrapText() {
          return this._enableWrapText;
        }

        set enableWrapText(value) {
          if (this._enableWrapText === value) {
            return;
          }

          this._enableWrapText = value;
          this.markForUpdateRenderData();
        }
        /**
         * @en
         * Whether use system font name or not.
         *
         * @zh
         * 是否使用系统字体。
         */


        get useSystemFont() {
          return this._isSystemFontUsed;
        }

        set useSystemFont(value) {
          if (this._isSystemFontUsed === value) {
            return;
          }

          this.destroyRenderData();

          if (EDITOR) {
            if (!value && this._isSystemFontUsed && this._userDefinedFont) {
              this.font = this._userDefinedFont;
              this.spacingX = this._spacingX;
              return;
            }
          }

          this._isSystemFontUsed = !!value;

          if (value) {
            this.font = null;
          }

          this._flushAssembler();

          this.markForUpdateRenderData();
        }
        /**
         * @en
         * Font family of label, only take effect when useSystemFont property is true.
         *
         * @zh
         * 文本字体名称, 只在 useSystemFont 属性为 true 的时候生效。
         */


        get fontFamily() {
          return this._fontFamily;
        }

        set fontFamily(value) {
          if (this._fontFamily === value) {
            return;
          }

          this._fontFamily = value;
          this.markForUpdateRenderData();
        }
        /**
         * @en
         * The font of label.
         *
         * @zh
         * 文本字体。
         */


        get font() {
          // return this._N$file;
          return this._font;
        }

        set font(value) {
          if (this._font === value) {
            return;
          } // if delete the font, we should change isSystemFontUsed to true


          this._isSystemFontUsed = !value;

          if (EDITOR) {
            this._userDefinedFont = value;
          } // this._N$file = value;


          this._font = value; // if (value && this._isSystemFontUsed)
          //     this._isSystemFontUsed = false;

          this.destroyRenderData();
          this._fontAtlas = null;
          this.updateRenderData(true);
        }
        /**
         * @en
         * The cache mode of label. This mode only supports system fonts.
         *
         * @zh
         * 文本缓存模式, 该模式只支持系统字体。
         */


        get cacheMode() {
          return this._cacheMode;
        }

        set cacheMode(value) {
          if (this._cacheMode === value) {
            return;
          }

          if (this._cacheMode === CacheMode.BITMAP && !(this._font instanceof BitmapFont) && this._ttfSpriteFrame) {
            this._ttfSpriteFrame._resetDynamicAtlasFrame();
          }

          if (this._cacheMode === CacheMode.CHAR) {
            this._ttfSpriteFrame = null;
          }

          this._cacheMode = value;
          this.updateRenderData(true);
        }
        /**
         * @en
         * Whether the font is bold.
         *
         * @zh
         * 字体是否加粗。
         */


        get isBold() {
          return this._isBold;
        }

        set isBold(value) {
          if (this._isBold === value) {
            return;
          }

          this._isBold = value;
          this.markForUpdateRenderData();
        }
        /**
         * @en
         * Whether the font is italic.
         *
         * @zh
         * 字体是否倾斜。
         */


        get isItalic() {
          return this._isItalic;
        }

        set isItalic(value) {
          if (this._isItalic === value) {
            return;
          }

          this._isItalic = value;
          this.markForUpdateRenderData();
        }
        /**
         * @en
         * Whether the font is underline.
         *
         * @zh
         * 字体是否加下划线。
         */


        get isUnderline() {
          return this._isUnderline;
        }

        set isUnderline(value) {
          if (this._isUnderline === value) {
            return;
          }

          this._isUnderline = value;
          this.markForUpdateRenderData();
        }
        /**
         * @en The height of underline.
         * @zh 下划线高度。
         */


        get underlineHeight() {
          return this._underlineHeight;
        }

        set underlineHeight(value) {
          if (this._underlineHeight === value) return;
          this._underlineHeight = value;
          this.markForUpdateRenderData();
        }
        /**
         * @en
         * when u want use vertical kerning for bitmap font
         *
         * @zh
         * when u want use vertical kerning for bitmap font
         */


        get isUseVerticalKerning() {
          return this._isUseVerticalKerning;
        }

        set isUseVerticalKerning(value) {
          if (this._isUseVerticalKerning === value) {
            return;
          }

          this._isUseVerticalKerning = value;

          if (this._font instanceof BitmapFont) {
            if (this._isUseVerticalKerning) {
              this._font.setVerticalKerningDict(this._verticalKerning.json);
            } else {
              this._font.clearVerticalKeningDict();
            }

            this.markForUpdateRenderData();
          }
        }
        /**
         * @en
         * The json vertical kerning of bitmap font.
         *
         * @zh
         * The json vertical kerning of bitmap font.
         */


        get verticalKerning() {
          return this._verticalKerning;
        }

        set verticalKerning(value) {
          if (this._verticalKerning === value) {
            return;
          }

          this._verticalKerning = value;

          if (this._font instanceof BitmapFont) {
            if (this._isUseVerticalKerning) {
              this._font.clearVerticalKeningDict();

              this._font.setVerticalKerningDict(this._verticalKerning.json);
            }

            this.markForUpdateRenderData();
          }
        }
        /**
         * @deprecated since v3.7.0, this is an engine private interface that will be removed in the future.
         */


        get spriteFrame() {
          return this._texture;
        }
        /**
         * @deprecated since v3.7.0, this is an engine private interface that will be removed in the future.
         */


        get ttfSpriteFrame() {
          return this._ttfSpriteFrame;
        }
        /**
         * @deprecated since v3.7.0, this is an engine private interface that will be removed in the future.
         */


        get assemblerData() {
          return this._assemblerData;
        }
        /**
         * @deprecated since v3.7.0, this is an engine private interface that will be removed in the future.
         */


        get fontAtlas() {
          return this._fontAtlas;
        }

        set fontAtlas(value) {
          this._fontAtlas = value;
        }
        /**
         * @deprecated since v3.5.0, this is an engine private interface that will be removed in the future.
         */


        get _bmFontOriginalSize() {
          if (this._font instanceof BitmapFont) {
            return this._font.fontSize;
          } else {
            return -1;
          }
        }

        /**
         * @engineInternal
         */
        get contentWidth() {
          return this._contentWidth;
        }
        /**
         * @engineInternal
         */


        set contentWidth(val) {
          this._contentWidth = val;
        }

        constructor() {
          super();
          this._string = _initializer && _initializer();
          this._horizontalAlign = _initializer2 && _initializer2();
          this._verticalAlign = _initializer3 && _initializer3();
          this._actualFontSize = _initializer4 && _initializer4();
          this._fontSize = _initializer5 && _initializer5();
          this._fontFamily = _initializer6 && _initializer6();
          this._lineHeight = _initializer7 && _initializer7();
          this._overflow = _initializer8 && _initializer8();
          this._enableWrapText = _initializer9 && _initializer9();
          this._font = _initializer10 && _initializer10();
          this._isSystemFontUsed = _initializer11 && _initializer11();
          this._spacingX = _initializer12 && _initializer12();
          this._isItalic = _initializer13 && _initializer13();
          this._isBold = _initializer14 && _initializer14();
          this._isUnderline = _initializer15 && _initializer15();
          this._underlineHeight = _initializer16 && _initializer16();
          this._cacheMode = _initializer17 && _initializer17();
          this._isUseVerticalKerning = _initializer18 && _initializer18();
          this._verticalKerning = _initializer19 && _initializer19();
          this._N$file = null;
          this._texture = null;
          this._ttfSpriteFrame = null;
          this._userDefinedFont = null;
          this._assemblerData = null;
          this._fontAtlas = null;
          this._letterTexture = null;
          this._contentWidth = 0;

          if (EDITOR) {
            this._userDefinedFont = null;
          }

          this._ttfSpriteFrame = null;
        }

        onEnable() {
          super.onEnable(); // TODO: Hack for barbarians

          if (!this._font && !this._isSystemFontUsed) {
            this.useSystemFont = true;
          } // Reapply default font family if necessary


          if (this._isSystemFontUsed && !this._fontFamily) {
            this.fontFamily = 'Arial';
          } // Hack Thai BitmapFont


          if (this._font instanceof BitmapFont) {
            if (this._isUseVerticalKerning) this._font.setVerticalKerningDict(this._verticalKerning.json);else this._font.clearVerticalKeningDict();
          }

          this._applyFontTexture();
        }

        onDestroy() {
          if (this._assembler && this._assembler.resetAssemblerData) {
            this._assembler.resetAssemblerData(this._assemblerData);
          }

          this._assemblerData = null;

          if (this._ttfSpriteFrame) {
            this._ttfSpriteFrame._resetDynamicAtlasFrame();

            const tex = this._ttfSpriteFrame.texture;

            this._ttfSpriteFrame.destroy();

            if (tex) {
              const tex2d = tex;

              if (tex2d.image) {
                tex2d.image.destroy();
              }

              tex.destroy();
            }

            this._ttfSpriteFrame = null;
          } // texture cannot be destroyed in here, lettertexture image source is public.


          this._letterTexture = null;
          super.onDestroy();
        }
        /**
         * @en update render data.
         * @zh 更新渲染相关数据。
         * @param force @en Whether to force an immediate update. @zh 是否立马强制更新渲染数据。
         */


        updateRenderData(force = false) {
          if (force) {
            this._flushAssembler(); // Hack: Fixed the bug that richText wants to get the label length by _measureText,
            // _assembler.updateRenderData will update the content size immediately.


            if (this.renderData) this.renderData.vertDirty = true;

            this._applyFontTexture();
          }

          if (this._assembler) {
            this._assembler.updateRenderData(this);
          }
        }

        _render(render) {
          render.commitComp(this, this.renderData, this._texture, this._assembler, null);
        } // Cannot use the base class methods directly because BMFont and CHAR cannot be updated in assambler with just color.


        _updateColor() {
          super._updateColor();

          this.markForUpdateRenderData();
        }
        /**
         * @deprecated since v3.7.0, this is an engine private interface that will be removed in the future.
         */


        setEntityColor(color) {
          if (JSB) {
            if (this._font instanceof BitmapFont) {
              this._renderEntity.color = color;
            } else {
              tempColor.set(255, 255, 255, color.a);
              this._renderEntity.color = tempColor;
            }
          }
        }

        _canRender() {
          if (!super._canRender() || !this._string) {
            return false;
          }

          const font = this._font;

          if (font && font instanceof BitmapFont) {
            const spriteFrame = font.spriteFrame; // cannot be activated if texture not loaded yet

            if (!spriteFrame || !spriteFrame.texture) {
              return false;
            }
          }

          return true;
        }

        _flushAssembler() {
          const assembler = Label.Assembler.getAssembler(this);

          if (this._assembler !== assembler) {
            this.destroyRenderData();
            this._assembler = assembler;
          }

          if (!this.renderData) {
            if (this._assembler && this._assembler.createData) {
              this._renderData = this._assembler.createData(this);
              this.renderData.material = this.material;

              this._updateColor();
            }
          }
        }

        _applyFontTexture() {
          this.markForUpdateRenderData();
          const font = this._font;

          if (font instanceof BitmapFont) {
            const spriteFrame = font.spriteFrame;

            if (spriteFrame && spriteFrame.texture) {
              this._texture = spriteFrame;

              if (this.renderData) {
                this.renderData.textureDirty = true;
              }

              this.changeMaterialForDefine();

              if (this._assembler) {
                this._assembler.updateRenderData(this);
              }
            }
          } else {
            if (this.cacheMode === CacheMode.CHAR) {
              this._letterTexture = this._assembler.getAssemblerData();
              this._texture = this._letterTexture;
            } else if (!this._ttfSpriteFrame) {
              this._ttfSpriteFrame = new SpriteFrame();
              this._assemblerData = this._assembler.getAssemblerData();
              const image = new ImageAsset(this._assemblerData.canvas);
              const texture = new Texture2D();
              texture.image = image;
              this._ttfSpriteFrame.texture = texture;
            }

            if (this.cacheMode !== CacheMode.CHAR) {
              // this._frame._refreshTexture(this._texture);
              this._texture = this._ttfSpriteFrame;
            }

            this.changeMaterialForDefine();
          }
        }

        changeMaterialForDefine() {
          if (!this._texture) {
            return;
          }

          let value = false;

          if (this.cacheMode !== CacheMode.CHAR) {
            const spriteFrame = this._texture;
            const texture = spriteFrame.texture;

            if (texture instanceof TextureBase) {
              const format = texture.getPixelFormat();
              value = format === PixelFormat.RGBA_ETC1 || format === PixelFormat.RGB_A_PVRTC_4BPPV1 || format === PixelFormat.RGB_A_PVRTC_2BPPV1;
            }
          }

          if (value) {
            this._instanceMaterialType = InstanceMaterialType.USE_ALPHA_SEPARATED;
          } else {
            this._instanceMaterialType = InstanceMaterialType.ADD_COLOR_AND_TEXTURE;
          }

          this.updateMaterial();
        }
        /**
         * @engineInternal
         */


        _updateBlendFunc() {
          // override for BYTEDANCE
          if (BYTEDANCE) {
            // need to fix ttf font black border at the sdk verion lower than 2.0.0
            const sysInfo = minigame.getSystemInfoSync();

            if (Number.parseInt(sysInfo.SDKVersion[0]) < 2) {
              if (this._srcBlendFactor === BlendFactor.SRC_ALPHA && !minigame.isDevTool && !(this._font instanceof BitmapFont) && !this._customMaterial) {
                // Premultiplied alpha on runtime when sdk verion is lower than 2.0.0
                this._srcBlendFactor = BlendFactor.ONE;
              }
            }
          }

          super._updateBlendFunc();
        }

      }, _class3.HorizontalAlign = HorizontalTextAlignment, _class3.VerticalAlign = VerticalTextAlignment, _class3.Overflow = Overflow, _class3.CacheMode = CacheMode, _class3._canvasPool = CanvasPool.getInstance(), _temp), (_applyDecoratedDescriptor(_class2.prototype, "string", [_dec5, _dec6, multiline], Object.getOwnPropertyDescriptor(_class2.prototype, "string"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "horizontalAlign", [_dec7, _dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "horizontalAlign"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "verticalAlign", [_dec10, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "verticalAlign"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fontSize", [_dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "fontSize"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "lineHeight", [_dec15, _dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "lineHeight"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "spacingX", [_dec17, _dec18, _dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "spacingX"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "overflow", [_dec20, _dec21, _dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "overflow"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "enableWrapText", [_dec23, _dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "enableWrapText"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "useSystemFont", [_dec25, _dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "useSystemFont"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fontFamily", [_dec27, _dec28, _dec29], Object.getOwnPropertyDescriptor(_class2.prototype, "fontFamily"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "font", [_dec30, _dec31, _dec32, _dec33], Object.getOwnPropertyDescriptor(_class2.prototype, "font"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "cacheMode", [_dec34, _dec35, _dec36], Object.getOwnPropertyDescriptor(_class2.prototype, "cacheMode"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isBold", [_dec37, _dec38], Object.getOwnPropertyDescriptor(_class2.prototype, "isBold"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isItalic", [_dec39, _dec40], Object.getOwnPropertyDescriptor(_class2.prototype, "isItalic"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isUnderline", [_dec41, _dec42], Object.getOwnPropertyDescriptor(_class2.prototype, "isUnderline"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "underlineHeight", [_dec43, editable, _dec44, _dec45], Object.getOwnPropertyDescriptor(_class2.prototype, "underlineHeight"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isUseVerticalKerning", [_dec46, _dec47, _dec48], Object.getOwnPropertyDescriptor(_class2.prototype, "isUseVerticalKerning"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "verticalKerning", [_dec49, _dec50, _dec51, _dec52], Object.getOwnPropertyDescriptor(_class2.prototype, "verticalKerning"), _class2.prototype), _initializer = _applyDecoratedInitializer(_class2.prototype, "_string", [serializable], function () {
        return 'label';
      }), _initializer2 = _applyDecoratedInitializer(_class2.prototype, "_horizontalAlign", [serializable], function () {
        return HorizontalTextAlignment.CENTER;
      }), _initializer3 = _applyDecoratedInitializer(_class2.prototype, "_verticalAlign", [serializable], function () {
        return VerticalTextAlignment.CENTER;
      }), _initializer4 = _applyDecoratedInitializer(_class2.prototype, "_actualFontSize", [serializable], function () {
        return 0;
      }), _initializer5 = _applyDecoratedInitializer(_class2.prototype, "_fontSize", [serializable], function () {
        return 40;
      }), _initializer6 = _applyDecoratedInitializer(_class2.prototype, "_fontFamily", [serializable], function () {
        return 'Arial';
      }), _initializer7 = _applyDecoratedInitializer(_class2.prototype, "_lineHeight", [serializable], function () {
        return 40;
      }), _initializer8 = _applyDecoratedInitializer(_class2.prototype, "_overflow", [serializable], function () {
        return Overflow.NONE;
      }), _initializer9 = _applyDecoratedInitializer(_class2.prototype, "_enableWrapText", [serializable], function () {
        return true;
      }), _initializer10 = _applyDecoratedInitializer(_class2.prototype, "_font", [serializable], function () {
        return null;
      }), _initializer11 = _applyDecoratedInitializer(_class2.prototype, "_isSystemFontUsed", [serializable], function () {
        return true;
      }), _initializer12 = _applyDecoratedInitializer(_class2.prototype, "_spacingX", [serializable], function () {
        return 0;
      }), _initializer13 = _applyDecoratedInitializer(_class2.prototype, "_isItalic", [serializable], function () {
        return false;
      }), _initializer14 = _applyDecoratedInitializer(_class2.prototype, "_isBold", [serializable], function () {
        return false;
      }), _initializer15 = _applyDecoratedInitializer(_class2.prototype, "_isUnderline", [serializable], function () {
        return false;
      }), _initializer16 = _applyDecoratedInitializer(_class2.prototype, "_underlineHeight", [serializable], function () {
        return 2;
      }), _initializer17 = _applyDecoratedInitializer(_class2.prototype, "_cacheMode", [serializable], function () {
        return CacheMode.NONE;
      }), _initializer18 = _applyDecoratedInitializer(_class2.prototype, "_isUseVerticalKerning", [serializable], function () {
        return false;
      }), _initializer19 = _applyDecoratedInitializer(_class2.prototype, "_verticalKerning", [serializable], function () {
        return null;
      })), _class2)) || _class) || _class) || _class) || _class));

      cclegacy.Label = Label;
    }
  };
});