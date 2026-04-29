System.register("q-bundled:///fs/cocos/asset/assets/texture-base.js", ["../../../../virtual/internal%253Aconstants.js", "../../core/data/decorators/index.js", "./asset.js", "./asset-enum.js", "../../gfx/index.js", "../../core/index.js"], function (_export, _context) {
  "use strict";

  var EDITOR, TEST, ccclass, serializable, Asset, Filter, PixelFormat, WrapMode, Format, SamplerInfo, deviceManager, errorID, murmurhash2_32_gc, ccenum, cclegacy, js, _dec, _class, _class2, _initializer, _initializer2, _initializer3, _initializer4, _initializer5, _initializer6, _initializer7, _initializer8, _class3, _temp, idGenerator, TextureBase;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedInitializer(target, property, decorators, initializer) {
    return decorators.slice().reverse().reduce(function (decoratedInitializer, decorator) {
      return decorator(target, property, decoratedInitializer) || decoratedInitializer;
    }, initializer);
  }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      TEST = _virtualInternal253AconstantsJs.TEST;
    }, function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_assetJs) {
      Asset = _assetJs.Asset;
    }, function (_assetEnumJs) {
      Filter = _assetEnumJs.Filter;
      PixelFormat = _assetEnumJs.PixelFormat;
      WrapMode = _assetEnumJs.WrapMode;
    }, function (_gfxIndexJs) {
      Format = _gfxIndexJs.Format;
      SamplerInfo = _gfxIndexJs.SamplerInfo;
      deviceManager = _gfxIndexJs.deviceManager;
    }, function (_coreIndexJs) {
      errorID = _coreIndexJs.errorID;
      murmurhash2_32_gc = _coreIndexJs.murmurhash2_32_gc;
      ccenum = _coreIndexJs.ccenum;
      cclegacy = _coreIndexJs.cclegacy;
      js = _coreIndexJs.js;
    }],
    execute: function () {
      ccenum(Format);
      idGenerator = new js.IDGenerator('Tex');
      /**
       * @en The base texture class, it defines features shared by all textures.
       * @zh 贴图资源基类。它定义了所有贴图共用的概念。
       */

      _export("TextureBase", TextureBase = (_dec = ccclass('cc.TextureBase'), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Asset) {
        _inheritsLoose(TextureBase, _Asset);

        function TextureBase() {
          var _this;

          _this = _Asset.call(this) || this; // Id for generate hash in material

          _this._format = _initializer && _initializer();
          _this._minFilter = _initializer2 && _initializer2();
          _this._magFilter = _initializer3 && _initializer3();
          _this._mipFilter = _initializer4 && _initializer4();
          _this._wrapS = _initializer5 && _initializer5();
          _this._wrapT = _initializer6 && _initializer6();
          _this._wrapR = _initializer7 && _initializer7();
          _this._anisotropy = _initializer8 && _initializer8();
          _this._width = 1;
          _this._height = 1;
          _this._id = void 0;
          _this._samplerInfo = new SamplerInfo();
          _this._gfxSampler = null;
          _this._gfxDevice = null;
          _this._textureHash = 0;
          _this._id = idGenerator.getNewId();
          _this._gfxDevice = _this._getGFXDevice();
          _this._textureHash = murmurhash2_32_gc(_this._id, 666);
          return _this;
        }
        /**
         * @en Gets the id of the texture.
         * @zh 获取标识符。
         * @returns @en The id of this texture. @zh 此贴图的 id。
         */


        var _proto = TextureBase.prototype;

        _proto.getId = function getId() {
          return this._id;
        }
        /**
         * @en Gets the pixel format.
         * @zh 获取像素格式。
         * @returns @en The pixel format. @zh 像素格式。
         */
        ;

        _proto.getPixelFormat = function getPixelFormat() {
          return this._format;
        }
        /**
         * @en Gets the anisotropy.
         * @zh 获取各向异性。
         * @returns @en The anisotropy. @zh 各项异性值。
         */
        ;

        _proto.getAnisotropy = function getAnisotropy() {
          return this._anisotropy;
        }
        /**
         * @en Sets the wrap mode of the texture.
         * Be noted, if the size of the texture is not power of two, only [[WrapMode.CLAMP_TO_EDGE]] is allowed.
         * @zh 设置此贴图的缠绕模式。
         * 注意，若贴图尺寸不是 2 的整数幂，缠绕模式仅允许 [[WrapMode.CLAMP_TO_EDGE]]。
         * @param wrapS @en S(U) coordinate wrap mode. @zh S(U) 坐标系缠绕模式.
         * @param wrapT @en T(V) coordinate wrap mode. @zh T(V) 坐标系缠绕模式.
         * @param wrapR @en R(W) coordinate wrap mode. @zh R(W) 坐标系缠绕模式.
         */
        ;

        _proto.setWrapMode = function setWrapMode(wrapS, wrapT, wrapR) {
          if (wrapR === undefined) wrapR = wrapS; // wrap modes should be as consistent as possible for performance

          this._wrapS = wrapS;
          this._samplerInfo.addressU = wrapS;
          this._wrapT = wrapT;
          this._samplerInfo.addressV = wrapT;
          this._wrapR = wrapR;
          this._samplerInfo.addressW = wrapR;

          if (this._gfxDevice) {
            this._gfxSampler = this._gfxDevice.getSampler(this._samplerInfo);
          }
        }
        /**
         * @en Sets the texture's filter mode.
         * @zh 设置此贴图的过滤算法。
         * @param minFilter @en Filter mode for scale down. @zh 贴图缩小时使用的过滤模式。
         * @param magFilter @en Filter mode for scale up. @zh 贴图放大时使用的过滤模式。
         */
        ;

        _proto.setFilters = function setFilters(minFilter, magFilter) {
          this._minFilter = minFilter;
          this._samplerInfo.minFilter = minFilter;
          this._magFilter = magFilter;
          this._samplerInfo.magFilter = magFilter;

          if (this._gfxDevice) {
            this._gfxSampler = this._gfxDevice.getSampler(this._samplerInfo);
          }
        }
        /**
         * @en Sets the texture's mip filter mode.
         * @zh 设置此贴图的多层 mip 过滤算法。
         * @param mipFilter @en Filter mode for multiple mip level. @zh 多层 mip 过滤模式。
         */
        ;

        _proto.setMipFilter = function setMipFilter(mipFilter) {
          this._mipFilter = mipFilter;
          this._samplerInfo.mipFilter = mipFilter;

          if (this._gfxDevice) {
            this._gfxSampler = this._gfxDevice.getSampler(this._samplerInfo);
          }
        }
        /**
         * @en Sets the texture's anisotropy.
         * @zh 设置此贴图的各向异性。
         * @param anisotropy @en The anisotropy to be set. @zh 待设置的各向异性数值。
         */
        ;

        _proto.setAnisotropy = function setAnisotropy(anisotropy) {
          this._anisotropy = anisotropy;
          this._samplerInfo.maxAnisotropy = anisotropy;

          if (this._gfxDevice) {
            this._gfxSampler = this._gfxDevice.getSampler(this._samplerInfo);
          }
        }
        /**
         * @en Destroy the current texture, clear up the related GPU resources.
         * @zh 销毁此贴图，并释放占用的 GPU 资源。
         */
        ;

        _proto.destroy = function destroy() {
          var _cclegacy$director$ro;

          var destroyed = _Asset.prototype.destroy.call(this);

          if (destroyed && (_cclegacy$director$ro = cclegacy.director.root) !== null && _cclegacy$director$ro !== void 0 && _cclegacy$director$ro.batcher2D) {
            cclegacy.director.root.batcher2D._releaseDescriptorSetCache(this._textureHash);
          }

          return destroyed;
        }
        /**
         * @en Gets the texture hash.
         * @zh 获取此贴图的哈希值。
         */
        ;

        _proto.getHash = function getHash() {
          return this._textureHash;
        }
        /**
         * @en Gets the GFX Texture resource
         * @zh 获取此贴图底层的 GFX 贴图对象。
         */
        ;

        _proto.getGFXTexture = function getGFXTexture() {
          return null;
        }
        /**
         * @en Gets the internal GFX sampler hash.
         * @zh 获取此贴图内部使用的 GFX 采样器信息。
         * @private
         */
        ;

        _proto.getSamplerInfo = function getSamplerInfo() {
          return this._samplerInfo;
        }
        /**
         * @en Gets the sampler resource for the texture
         * @zh 获取此贴图底层的 GFX 采样信息。
         */
        ;

        _proto.getGFXSampler = function getGFXSampler() {
          if (!this._gfxSampler) {
            if (this._gfxDevice) {
              this._gfxSampler = this._gfxDevice.getSampler(this._samplerInfo);
            } else {
              errorID(9302);
            }
          }

          return this._gfxSampler;
        } // SERIALIZATION

        /**
         * @deprecated since v3.5.0, this is an engine private interface that will be removed in the future.
         */
        ;

        _proto._serialize = function _serialize(ctxForExporting) {
          if (EDITOR || TEST) {
            return this._minFilter + "," + this._magFilter + "," + this._wrapS + "," + this._wrapT + "," + this._mipFilter + "," + this._anisotropy;
          }

          return '';
        }
        /**
         * @deprecated since v3.5.0, this is an engine private interface that will be removed in the future.
         */
        ;

        _proto._deserialize = function _deserialize(serializedData, handle) {
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

        _proto._getGFXDevice = function _getGFXDevice() {
          return deviceManager.gfxDevice;
        };

        _proto._getGFXFormat = function _getGFXFormat() {
          return this._getGFXPixelFormat(this._format);
        };

        _proto._setGFXFormat = function _setGFXFormat(format) {
          this._format = format === undefined ? PixelFormat.RGBA8888 : format;
        };

        _proto._getGFXPixelFormat = function _getGFXPixelFormat(format) {
          if (format === PixelFormat.RGBA_ETC1) {
            format = PixelFormat.RGB_ETC1;
          } else if (format === PixelFormat.RGB_A_PVRTC_4BPPV1) {
            format = PixelFormat.RGB_PVRTC_4BPPV1;
          } else if (format === PixelFormat.RGB_A_PVRTC_2BPPV1) {
            format = PixelFormat.RGB_PVRTC_2BPPV1;
          }

          return format;
        };

        _createClass(TextureBase, [{
          key: "isCompressed",
          get:
          /**
           * @en Whether the pixel data is compressed.
           * @zh 此贴图是否为压缩的像素格式。
           */
          function get() {
            return this._format >= PixelFormat.RGB_ETC1 && this._format <= PixelFormat.RGBA_ASTC_12x12 || this._format >= PixelFormat.RGB_A_PVRTC_2BPPV1 && this._format <= PixelFormat.RGBA_ETC1;
          }
          /**
           * @en Pixel width of the texture.
           * @zh 此贴图的像素宽度。
           */

        }, {
          key: "width",
          get: function get() {
            return this._width;
          }
          /**
           * @en Pixel height of the texture.
           * @zh 此贴图的像素高度。
           */

        }, {
          key: "height",
          get: function get() {
            return this._height;
          }
          /**
           * @en The pixel format enum.
           * @zh 像素格式枚举类型。
           */

        }]);

        return TextureBase;
      }(Asset), _class3.PixelFormat = PixelFormat, _class3.WrapMode = WrapMode, _class3.Filter = Filter, _temp), (_initializer = _applyDecoratedInitializer(_class2.prototype, "_format", [serializable], function () {
        return PixelFormat.RGBA8888;
      }), _initializer2 = _applyDecoratedInitializer(_class2.prototype, "_minFilter", [serializable], function () {
        return Filter.LINEAR;
      }), _initializer3 = _applyDecoratedInitializer(_class2.prototype, "_magFilter", [serializable], function () {
        return Filter.LINEAR;
      }), _initializer4 = _applyDecoratedInitializer(_class2.prototype, "_mipFilter", [serializable], function () {
        return Filter.NONE;
      }), _initializer5 = _applyDecoratedInitializer(_class2.prototype, "_wrapS", [serializable], function () {
        return WrapMode.REPEAT;
      }), _initializer6 = _applyDecoratedInitializer(_class2.prototype, "_wrapT", [serializable], function () {
        return WrapMode.REPEAT;
      }), _initializer7 = _applyDecoratedInitializer(_class2.prototype, "_wrapR", [serializable], function () {
        return WrapMode.REPEAT;
      }), _initializer8 = _applyDecoratedInitializer(_class2.prototype, "_anisotropy", [serializable], function () {
        return 0;
      })), _class2)) || _class));

      cclegacy.TextureBase = TextureBase;
    }
  };
});