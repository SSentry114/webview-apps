System.register("q-bundled:///fs/cocos/asset/assets/render-texture.jsb.js", ["../../core/data/decorators/index.js", "../../../../virtual/internal%253Aconstants.js", "../../core/index.js", "./asset-enum.js", "./asset.js"], function (_export, _context) {
  "use strict";

  var ccclass, EDITOR, TEST, cclegacy, Filter, PixelFormat, WrapMode, renderTextureProto, textureBaseProto, RenderTexture, oldReadPixels;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      TEST = _virtualInternal253AconstantsJs.TEST;
    }, function (_coreIndexJs) {
      cclegacy = _coreIndexJs.cclegacy;
    }, function (_assetEnumJs) {
      Filter = _assetEnumJs.Filter;
      PixelFormat = _assetEnumJs.PixelFormat;
      WrapMode = _assetEnumJs.WrapMode;
    }, function (_assetJs) {}],
    execute: function () {
      renderTextureProto = jsb.RenderTexture.prototype;
      textureBaseProto = jsb.TextureBase.prototype;
      renderTextureProto.createNode = null; // @ts-ignore

      _export("RenderTexture", RenderTexture = jsb.RenderTexture);

      RenderTexture.Filter = Filter;
      RenderTexture.PixelFormat = PixelFormat;
      RenderTexture.WrapMode = WrapMode;

      renderTextureProto._serialize = function (ctxForExporting) {
        if (EDITOR || TEST) {
          return {
            base: textureBaseProto._serialize(ctxForExporting),
            w: this._width,
            h: this._height,
            n: this._name
          };
        }

        return {};
      };

      renderTextureProto._deserialize = function (serializedData, handle) {
        var data = serializedData;
        this._width = data.w;
        this._height = data.h;
        this._name = data.n;

        textureBaseProto._deserialize.call(this, data.base, handle);
      };

      oldReadPixels = renderTextureProto.readPixels;

      renderTextureProto.readPixels = function readPixels(x, y, width, height, buffer) {
        x = x || 0;
        y = y || 0;
        width = width || this.width;
        height = height || this.height;
        var tmpBuffer = oldReadPixels.call(this, x, y, width, height);

        if (tmpBuffer.length == 0) {
          return null;
        }

        buffer = tmpBuffer;
        return buffer;
      };

      cclegacy.RenderTexture = jsb.RenderTexture; // handle meta data, it is generated automatically

      ccclass('cc.RenderTexture')(RenderTexture);
    }
  };
});