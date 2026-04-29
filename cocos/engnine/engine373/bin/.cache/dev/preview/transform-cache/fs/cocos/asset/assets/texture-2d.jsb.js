System.register("q-bundled:///fs/cocos/asset/assets/texture-2d.jsb.js", ["../../core/data/decorators/index.js", "./image-asset.js", "./simple-texture.js", "./texture-base.jsb.js", "../../core/index.js", "./asset-enum.js"], function (_export, _context) {
  "use strict";

  var ccclass, type, ImageAsset, SimpleTexture, TextureBase, js, cclegacy, Filter, PixelFormat, WrapMode, texture2DProto, Texture2D, oldOnLoaded, Texture2DProto;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      type = _coreDataDecoratorsIndexJs.type;
    }, function (_imageAssetJs) {
      ImageAsset = _imageAssetJs.ImageAsset;
    }, function (_simpleTextureJs) {
      SimpleTexture = _simpleTextureJs.SimpleTexture;
    }, function (_textureBaseJsbJs) {
      TextureBase = _textureBaseJsbJs.TextureBase;
    }, function (_coreIndexJs) {
      js = _coreIndexJs.js;
      cclegacy = _coreIndexJs.cclegacy;
    }, function (_assetEnumJs) {
      Filter = _assetEnumJs.Filter;
      PixelFormat = _assetEnumJs.PixelFormat;
      WrapMode = _assetEnumJs.WrapMode;
    }],
    execute: function () {
      texture2DProto = jsb.Texture2D.prototype;
      texture2DProto.createNode = null;

      _export("Texture2D", Texture2D = jsb.Texture2D);

      Texture2D.Filter = Filter;
      Texture2D.PixelFormat = PixelFormat;
      Texture2D.WrapMode = WrapMode;

      texture2DProto._ctor = function () {
        SimpleTexture.prototype._ctor.apply(this, arguments);

        this._mipmaps = [];
      };

      texture2DProto._serialize = function (ctxForExporting) {
        if (EDITOR || TEST) {
          return {
            base: TextureBase.prototype._serialize(ctxForExporting),
            mipmaps: this._mipmaps.map(function (mipmap) {
              if (!mipmap || !mipmap._uuid) {
                return null;
              }

              if (ctxForExporting && ctxForExporting._compressUuid) {
                // ctxForExporting.dependsOn('_textureSource', texture); TODO
                return EditorExtends.UuidUtils.compressUuid(mipmap._uuid, true);
              }

              return mipmap._uuid;
            })
          };
        }

        return null;
      };

      texture2DProto._deserialize = function (serializedData, handle) {
        var data = serializedData;

        TextureBase.prototype._deserialize.call(this, data.base);

        this._mipmaps = new Array(data.mipmaps.length);

        for (var i = 0; i < data.mipmaps.length; ++i) {
          // Prevent resource load failed
          this._mipmaps[i] = new ImageAsset();

          if (!data.mipmaps[i]) {
            continue;
          }

          var mipmapUUID = data.mipmaps[i];
          handle.result.push(this._mipmaps, "" + i, mipmapUUID, js.getClassId(ImageAsset));
        }
      };

      oldOnLoaded = texture2DProto.onLoaded;

      texture2DProto.onLoaded = function () {
        this.syncMipmapsForJS(this._mipmaps);
        oldOnLoaded.call(this);
      };

      Object.defineProperty(texture2DProto, 'image', {
        configurable: true,
        enumerable: true,
        get: function get() {
          return this._mipmaps.length === 0 ? null : this._mipmaps[0];
        },
        set: function set(value) {
          this.mipmaps = value ? [value] : [];
        }
      });
      Object.defineProperty(texture2DProto, 'mipmaps', {
        configurable: true,
        enumerable: true,
        get: function get() {
          return this._mipmaps;
        },
        set: function set(arr) {
          for (var i = 0, len = arr.length; i < len; ++i) {
            arr[i]._syncDataToNative();
          }

          this._mipmaps = arr;
          this.setMipmaps(arr);
        }
      });
      cclegacy.Texture2D = jsb.Texture2D; // handle meta data, it is generated automatically

      Texture2DProto = Texture2D.prototype;
      type([ImageAsset])(Texture2DProto, '_mipmaps');
      ccclass('cc.Texture2D')(Texture2D);
    }
  };
});