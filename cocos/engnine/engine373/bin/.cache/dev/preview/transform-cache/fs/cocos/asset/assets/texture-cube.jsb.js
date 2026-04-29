System.register("q-bundled:///fs/cocos/asset/assets/texture-cube.jsb.js", ["../../core/data/decorators/index.js", "./asset-enum.js", "../../core/index.js", "./simple-texture.js", "../../../../virtual/internal%253Aconstants.js"], function (_export, _context) {
  "use strict";

  var ccclass, serializable, Filter, PixelFormat, WrapMode, js, cclegacy, EDITOR, TEST, textureCubeProto, FaceIndex, MipmapMode, TextureCube, oldOnLoaded, TextureCubeProto;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_assetEnumJs) {
      Filter = _assetEnumJs.Filter;
      PixelFormat = _assetEnumJs.PixelFormat;
      WrapMode = _assetEnumJs.WrapMode;
    }, function (_coreIndexJs) {
      js = _coreIndexJs.js;
      cclegacy = _coreIndexJs.cclegacy;
    }, function (_simpleTextureJs) {}, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      TEST = _virtualInternal253AconstantsJs.TEST;
    }],
    execute: function () {
      textureCubeProto = jsb.TextureCube.prototype;

      (function (FaceIndex) {
        FaceIndex[FaceIndex["right"] = 0] = "right";
        FaceIndex[FaceIndex["left"] = 1] = "left";
        FaceIndex[FaceIndex["top"] = 2] = "top";
        FaceIndex[FaceIndex["bottom"] = 3] = "bottom";
        FaceIndex[FaceIndex["front"] = 4] = "front";
        FaceIndex[FaceIndex["back"] = 5] = "back";
      })(FaceIndex || (FaceIndex = {}));

      (function (MipmapMode) {
        MipmapMode[MipmapMode["NONE"] = 0] = "NONE";
        MipmapMode[MipmapMode["AUTO"] = 1] = "AUTO";
        MipmapMode[MipmapMode["BAKED_CONVOLUTION_MAP"] = 2] = "BAKED_CONVOLUTION_MAP";
      })(MipmapMode || (MipmapMode = {}));

      textureCubeProto.createNode = null;

      _export("TextureCube", TextureCube = jsb.TextureCube);

      TextureCube.Filter = Filter;
      TextureCube.PixelFormat = PixelFormat;
      TextureCube.WrapMode = WrapMode;

      textureCubeProto._ctor = function () {
        jsb.SimpleTexture.prototype._ctor.apply(this, arguments);

        this._mipmaps = null;
        this._mipmapAtlas = null;
      };

      Object.defineProperty(textureCubeProto, 'mipmaps', {
        get: function get() {
          return this._mipmaps;
        },
        set: function set(value) {
          this._mipmaps = value;
          this.setMipmaps(value);
        }
      });
      Object.defineProperty(textureCubeProto, 'image', {
        get: function get() {
          return this._mipmaps.length === 0 ? null : this._mipmaps[0];
        },
        set: function set(value) {
          this.mipmaps = value ? [value] : [];
        }
      });
      oldOnLoaded = textureCubeProto.onLoaded;

      textureCubeProto.onLoaded = function () {
        if (this._mipmapMode === MipmapMode.BAKED_CONVOLUTION_MAP) {
          this.setMipmapAtlasForJS(this._mipmapAtlas);
        } else {
          this.setMipmapsForJS(this._mipmaps);
        }

        oldOnLoaded.apply(this);
      };

      textureCubeProto._serialize = function (ctxForExporting) {
        if (EDITOR || TEST) {
          if (this._mipmapMode === MipmapMode.BAKED_CONVOLUTION_MAP) {
            var atlas = this._mipmapAtlas.atlas;
            var uuids = {};

            if (ctxForExporting && ctxForExporting._compressUuid) {
              uuids = {
                front: EditorExtends.UuidUtils.compressUuid(atlas.front._uuid, true),
                back: EditorExtends.UuidUtils.compressUuid(atlas.back._uuid, true),
                left: EditorExtends.UuidUtils.compressUuid(atlas.left._uuid, true),
                right: EditorExtends.UuidUtils.compressUuid(atlas.right._uuid, true),
                top: EditorExtends.UuidUtils.compressUuid(atlas.top._uuid, true),
                bottom: EditorExtends.UuidUtils.compressUuid(atlas.bottom._uuid, true)
              };
            } else {
              uuids = {
                front: atlas.front._uuid,
                back: atlas.back._uuid,
                left: atlas.left._uuid,
                right: atlas.right._uuid,
                top: atlas.top._uuid,
                bottom: atlas.bottom._uuid
              };
            }

            return {
              base: jsb.TextureBase.prototype._serialize(ctxForExporting),
              rgbe: this.isRGBE,
              mipmapMode: this._mipmapMode,
              mipmapAtlas: uuids,
              mipmapLayout: this._mipmapAtlas.layout
            };
          } else {
            return {
              base: jsb.TextureBase.prototype._serialize(ctxForExporting),
              rgbe: this.isRGBE,
              mipmaps: this._mipmaps.map(function (mipmap) {
                return ctxForExporting && ctxForExporting._compressUuid ? {
                  front: EditorExtends.UuidUtils.compressUuid(mipmap.front._uuid, true),
                  back: EditorExtends.UuidUtils.compressUuid(mipmap.back._uuid, true),
                  left: EditorExtends.UuidUtils.compressUuid(mipmap.left._uuid, true),
                  right: EditorExtends.UuidUtils.compressUuid(mipmap.right._uuid, true),
                  top: EditorExtends.UuidUtils.compressUuid(mipmap.top._uuid, true),
                  bottom: EditorExtends.UuidUtils.compressUuid(mipmap.bottom._uuid, true)
                } : {
                  front: mipmap.front._uuid,
                  back: mipmap.back._uuid,
                  left: mipmap.left._uuid,
                  right: mipmap.right._uuid,
                  top: mipmap.top._uuid,
                  bottom: mipmap.bottom._uuid
                };
              })
            };
          }
        }

        return null;
      };

      textureCubeProto._deserialize = function (serializedData, handle) {
        var data = serializedData;

        jsb.TextureBase.prototype._deserialize.call(this, data.base, handle);

        this.isRGBE = data.rgbe;

        if (data.mipmapMode != undefined) {
          this._mipmapMode = data.mipmapMode;
        }

        if (this._mipmapMode === MipmapMode.BAKED_CONVOLUTION_MAP) {
          var mipmapAtlas = data.mipmapAtlas;
          var mipmapLayout = data.mipmapLayout;
          this._mipmapAtlas = {
            atlas: {},
            layout: mipmapLayout
          };
          this._mipmapAtlas.atlas = {
            front: new jsb.ImageAsset(),
            back: new jsb.ImageAsset(),
            left: new jsb.ImageAsset(),
            right: new jsb.ImageAsset(),
            top: new jsb.ImageAsset(),
            bottom: new jsb.ImageAsset()
          };

          if (mipmapAtlas) {
            var imageAssetClassId = js.getClassId(jsb.ImageAsset);
            handle.result.push(this._mipmapAtlas.atlas, "front", mipmapAtlas.front, imageAssetClassId);
            handle.result.push(this._mipmapAtlas.atlas, "back", mipmapAtlas.back, imageAssetClassId);
            handle.result.push(this._mipmapAtlas.atlas, "left", mipmapAtlas.left, imageAssetClassId);
            handle.result.push(this._mipmapAtlas.atlas, "right", mipmapAtlas.right, imageAssetClassId);
            handle.result.push(this._mipmapAtlas.atlas, "top", mipmapAtlas.top, imageAssetClassId);
            handle.result.push(this._mipmapAtlas.atlas, "bottom", mipmapAtlas.bottom, imageAssetClassId);
          }
        } else {
          this._mipmaps = new Array(data.mipmaps.length);

          for (var i = 0; i < data.mipmaps.length; ++i) {
            // Prevent resource load failed
            this._mipmaps[i] = {
              front: new jsb.ImageAsset(),
              back: new jsb.ImageAsset(),
              left: new jsb.ImageAsset(),
              right: new jsb.ImageAsset(),
              top: new jsb.ImageAsset(),
              bottom: new jsb.ImageAsset()
            };
            var mipmap = data.mipmaps[i];

            var _imageAssetClassId = js.getClassId(jsb.ImageAsset);

            handle.result.push(this._mipmaps[i], "front", mipmap.front, _imageAssetClassId);
            handle.result.push(this._mipmaps[i], "back", mipmap.back, _imageAssetClassId);
            handle.result.push(this._mipmaps[i], "left", mipmap.left, _imageAssetClassId);
            handle.result.push(this._mipmaps[i], "right", mipmap.right, _imageAssetClassId);
            handle.result.push(this._mipmaps[i], "top", mipmap.top, _imageAssetClassId);
            handle.result.push(this._mipmaps[i], "bottom", mipmap.bottom, _imageAssetClassId);
          }
        }
      };

      cclegacy.TextureCube = jsb.TextureCube; // handle meta data, it is generated automatically

      TextureCubeProto = TextureCube.prototype;
      serializable(TextureCubeProto, 'isRGBE', function () {
        return false;
      });
      serializable(TextureCubeProto, '_mipmaps', function () {
        return [];
      });
      serializable(TextureCubeProto, '_mipmapMode', function () {
        return MipmapMode.NONE;
      });
      serializable(TextureCubeProto, '_mipmapAtlas', function () {
        return null;
      });
      ccclass('cc.TextureCube')(TextureCube);
    }
  };
});