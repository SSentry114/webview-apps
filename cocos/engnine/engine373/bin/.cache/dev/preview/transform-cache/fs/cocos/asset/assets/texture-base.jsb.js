System.register("q-bundled:///fs/cocos/asset/assets/texture-base.jsb.js", ["../../core/data/decorators/index.js", "../../../../virtual/internal%253Aconstants.js", "../../gfx/index.js", "../../core/index.js", "./asset-enum.js", "./asset.js"], function (_export, _context) {
  "use strict";

  var ccclass, serializable, TEST, EDITOR, deviceManager, cclegacy, Filter, PixelFormat, WrapMode, textureBaseProto, TextureBase, oldGetGFXSampler, oldGetHash, oldGetSamplerInfo, oldDestroy, TextureBaseProto;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_virtualInternal253AconstantsJs) {
      TEST = _virtualInternal253AconstantsJs.TEST;
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_gfxIndexJs) {
      deviceManager = _gfxIndexJs.deviceManager;
    }, function (_coreIndexJs) {
      cclegacy = _coreIndexJs.cclegacy;
    }, function (_assetEnumJs) {
      Filter = _assetEnumJs.Filter;
      PixelFormat = _assetEnumJs.PixelFormat;
      WrapMode = _assetEnumJs.WrapMode;
    }, function (_assetJs) {}],
    execute: function () {
      textureBaseProto = jsb.TextureBase.prototype;

      textureBaseProto._serialize = function (ctxForExporting) {
        if (EDITOR || TEST) {
          return this._minFilter + "," + this._magFilter + "," + this._wrapS + "," + this._wrapT + "," + this._mipFilter + "," + this._anisotropy;
        }

        return '';
      };

      textureBaseProto._deserialize = function (serializedData, handle) {
        var data = serializedData;
        var fields = data.split(',');
        fields.unshift('');

        if (fields.length >= 5) {
          // decode filters
          this.setFilters(parseInt(fields[1]), parseInt(fields[2])); // decode wraps

          this.setWrapMode(parseInt(fields[3]), parseInt(fields[4]));
        }

        if (fields.length >= 7) {
          this.setMipFilter(parseInt(fields[5]));
          this.setAnisotropy(parseInt(fields[6]));
        }
      };

      textureBaseProto._getGFXDevice = function () {
        return deviceManager.gfxDevice;
      };

      textureBaseProto._getGFXFormat = function () {
        return this._getGFXPixelFormat(this.format);
      };

      textureBaseProto._setGFXFormat = function (format) {
        this.format = format === undefined ? PixelFormat.RGBA8888 : format;
      };

      textureBaseProto._getGFXPixelFormat = function (format) {
        if (format === PixelFormat.RGBA_ETC1) {
          format = PixelFormat.RGB_ETC1;
        } else if (format === PixelFormat.RGB_A_PVRTC_4BPPV1) {
          format = PixelFormat.RGB_PVRTC_4BPPV1;
        } else if (format === PixelFormat.RGB_A_PVRTC_2BPPV1) {
          format = PixelFormat.RGB_PVRTC_2BPPV1;
        }

        return format;
      };

      textureBaseProto.createNode = null;

      _export("TextureBase", TextureBase = jsb.TextureBase);

      TextureBase.Filter = Filter;
      TextureBase.PixelFormat = PixelFormat;
      TextureBase.WrapMode = WrapMode;

      textureBaseProto._ctor = function () {
        jsb.Asset.prototype._ctor.apply(this, arguments);

        this._gfxSampler = null;
        this._samplerInfo = null;
        this._textureHash = 0;

        this._registerGFXSamplerUpdatedListener();
      };

      oldGetGFXSampler = textureBaseProto.getGFXSampler;

      textureBaseProto.getGFXSampler = function () {
        if (!this._gfxSampler) {
          this._gfxSampler = oldGetGFXSampler.call(this);
        }

        return this._gfxSampler;
      };

      oldGetHash = textureBaseProto.getHash;

      textureBaseProto.getHash = function () {
        if (this._textureHash === 0) {
          this._textureHash = oldGetHash.call(this);
        }

        return this._textureHash;
      };

      oldGetSamplerInfo = textureBaseProto.getSamplerInfo;

      textureBaseProto.getSamplerInfo = function () {
        if (!this._samplerInfo) {
          this._samplerInfo = oldGetSamplerInfo.call(this);
        }

        return this._samplerInfo;
      };

      oldDestroy = textureBaseProto.destroy;

      textureBaseProto.destroy = function () {
        var _cclegacy$director$ro;

        if ((_cclegacy$director$ro = cclegacy.director.root) !== null && _cclegacy$director$ro !== void 0 && _cclegacy$director$ro.batcher2D) {
          // legacyCC.director.root.batcher2D._releaseDescriptorSetCache(this.getHash());
          cclegacy.director.root.batcher2D._releaseDescriptorSetCache(this.getGFXTexture(), this.getGFXSampler());
        } // dispatch into C++ virtual function CCObject::destroy


        return oldDestroy.call(this);
      };

      textureBaseProto._onGFXSamplerUpdated = function (gfxSampler, samplerInfo) {
        this._gfxSampler = gfxSampler;
        this._samplerInfo = samplerInfo;
      };

      cclegacy.TextureBase = jsb.TextureBase; // handle meta data, it is generated automatically

      TextureBaseProto = TextureBase.prototype;
      serializable(TextureBaseProto, '_format', function () {
        return PixelFormat.RGBA8888;
      });
      serializable(TextureBaseProto, '_minFilter', function () {
        return Filter.LINEAR;
      });
      serializable(TextureBaseProto, '_magFilter', function () {
        return Filter.LINEAR;
      });
      serializable(TextureBaseProto, '_mipFilter', function () {
        return Filter.NONE;
      });
      serializable(TextureBaseProto, '_wrapS', function () {
        return WrapMode.REPEAT;
      });
      serializable(TextureBaseProto, '_wrapT', function () {
        return WrapMode.REPEAT;
      });
      serializable(TextureBaseProto, '_wrapR', function () {
        return WrapMode.REPEAT;
      });
      serializable(TextureBaseProto, '_anisotropy', function () {
        return 0;
      });
      ccclass('cc.TextureBase')(TextureBase);
    }
  };
});