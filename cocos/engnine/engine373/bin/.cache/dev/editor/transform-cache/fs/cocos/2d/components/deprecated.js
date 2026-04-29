System.register("q-bundled:///fs/cocos/2d/components/deprecated.js", ["./mask.js", "./label.js", "./label-outline.js", "./rich-text.js", "./sprite.js", "./ui-mesh-renderer.js", "./graphics.js", "./ui-static-batch.js", "./ui-opacity.js", "../../core/index.js"], function (_export, _context) {
  "use strict";

  var Mask, MaskType, Label, LabelOutline, RichText, Sprite, UIMeshRenderer, Graphics, UIStaticBatch, UIOpacity, js, cclegacy, replaceProperty;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_maskJs) {
      Mask = _maskJs.Mask;
      MaskType = _maskJs.MaskType;
    }, function (_labelJs) {
      Label = _labelJs.Label;
    }, function (_labelOutlineJs) {
      LabelOutline = _labelOutlineJs.LabelOutline;
    }, function (_richTextJs) {
      RichText = _richTextJs.RichText;
    }, function (_spriteJs) {
      Sprite = _spriteJs.Sprite;
    }, function (_uiMeshRendererJs) {
      UIMeshRenderer = _uiMeshRendererJs.UIMeshRenderer;
    }, function (_graphicsJs) {
      Graphics = _graphicsJs.Graphics;
    }, function (_uiStaticBatchJs) {
      UIStaticBatch = _uiStaticBatchJs.UIStaticBatch;
    }, function (_uiOpacityJs) {
      UIOpacity = _uiOpacityJs.UIOpacity;
    }, function (_coreIndexJs) {
      js = _coreIndexJs.js;
      cclegacy = _coreIndexJs.cclegacy;
      replaceProperty = _coreIndexJs.replaceProperty;
    }],
    execute: function () {
      /**
       * Alias of [[Mask]]
       * @deprecated Since v1.2
       */
      _export("MaskComponent", Mask);

      cclegacy.MaskComponent = Mask;
      js.setClassAlias(Mask, 'cc.MaskComponent');
      /**
       * Alias of [[Label]]
       * @deprecated Since v1.2
       */

      _export("LabelComponent", Label);

      cclegacy.LabelComponent = Label;
      js.setClassAlias(Label, 'cc.LabelComponent');
      /**
       * Alias of [[LabelOutline]]
       * @deprecated Since v1.2
       */

      _export("LabelOutlineComponent", LabelOutline);

      cclegacy.LabelOutlineComponent = LabelOutline;
      js.setClassAlias(LabelOutline, 'cc.LabelOutlineComponent');
      /**
       * Alias of [[RichText]]
       * @deprecated Since v1.2
       */

      _export("RichTextComponent", RichText);

      cclegacy.RichTextComponent = RichText;
      js.setClassAlias(RichText, 'cc.RichTextComponent');
      /**
       * Alias of [[Sprite]]
       * @deprecated Since v1.2
       */

      _export("SpriteComponent", Sprite);

      cclegacy.SpriteComponent = Sprite;
      js.setClassAlias(Sprite, 'cc.SpriteComponent');
      /**
       * Alias of [[UIMeshRenderer]]
       * @deprecated Since v1.2
       */

      _export("UIModelComponent", UIMeshRenderer);

      cclegacy.UIModelComponent = UIMeshRenderer;
      js.setClassAlias(UIMeshRenderer, 'cc.UIModelComponent');
      /**
       * Alias of [[Graphics]]
       * @deprecated Since v1.2
       */

      _export("GraphicsComponent", Graphics);

      cclegacy.GraphicsComponent = Graphics;
      js.setClassAlias(Graphics, 'cc.GraphicsComponent');
      /**
       * Alias of [[UIStaticBatch]]
       * @deprecated Since v1.2
       */

      _export("UIStaticBatchComponent", UIStaticBatch);

      js.setClassAlias(UIStaticBatch, 'cc.UIStaticBatchComponent');
      /**
       * Alias of [[UIOpacity]]
       * @deprecated Since v1.2
       */

      _export("UIOpacityComponent", UIOpacity);

      js.setClassAlias(UIOpacity, 'cc.UIOpacityComponent');
      replaceProperty(Mask.prototype, 'Mask', [{
        name: 'graphics',
        newName: 'subComp',
        target: Mask.prototype,
        targetName: 'Mask'
      }]);
      replaceProperty(MaskType, 'MaskType', [{
        name: 'RECT',
        newName: 'GRAPHICS_RECT',
        target: MaskType,
        targetName: 'MaskType'
      }, {
        name: 'ELLIPSE',
        newName: 'GRAPHICS_ELLIPSE',
        target: MaskType,
        targetName: 'MaskType'
      }, {
        name: 'IMAGE_STENCIL',
        newName: 'SPRITE_STENCIL',
        target: MaskType,
        targetName: 'MaskType'
      }]);
    }
  };
});