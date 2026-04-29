System.register("q-bundled:///fs/cocos/spine/skeleton-texture.js", ["../asset/assets/asset-enum.js", "./lib/spine-core.js"], function (_export, _context) {
  "use strict";

  var Filter, WrapMode, spine, SkeletonTexture;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  /**
   * @internal Since v3.7.2, this is an engine private function.
   */
  function convertFilter(filter) {
    switch (filter) {
      case spine.TextureFilter.Nearest:
      case spine.TextureFilter.MipMapNearestNearest:
      case spine.TextureFilter.MipMapLinearNearest:
        return Filter.NEAREST;

      case spine.TextureFilter.MipMap:
      case spine.TextureFilter.MipMapNearestLinear:
      case spine.TextureFilter.MipMapLinearLinear:
      case spine.TextureFilter.Linear:
      default:
        return Filter.LINEAR;
    }
  }
  /**
   * @internal Since v3.7.2, this is an engine private function.
   */


  function convertWraps(wrap) {
    switch (wrap) {
      case spine.TextureWrap.MirroredRepeat:
        return WrapMode.MIRRORED_REPEAT;

      case spine.TextureWrap.ClampToEdge:
        return WrapMode.CLAMP_TO_EDGE;

      case spine.TextureWrap.Repeat:
      default:
        return WrapMode.REPEAT;
    }
  }

  _export({
    convertFilter: convertFilter,
    convertWraps: convertWraps
  });

  return {
    setters: [function (_assetAssetsAssetEnumJs) {
      Filter = _assetAssetsAssetEnumJs.Filter;
      WrapMode = _assetAssetsAssetEnumJs.WrapMode;
    }, function (_libSpineCoreJs) {
      spine = _libSpineCoreJs.default;
    }],
    execute: function () {
      /**
       * @en The texture of spine.
       * @zh 骨骼贴图。
       * @class SkeletonTexture
       */
      _export("SkeletonTexture", SkeletonTexture = /*#__PURE__*/function (_spine$Texture) {
        _inheritsLoose(SkeletonTexture, _spine$Texture);

        /**
         * @deprecated Since v3.7.2, this property will be removed in the future.
         */

        /**
         * @en Use a Texture2D type object to Store and rendering spine.Texture data.
         * @zh cocos 中使用 Texture2D 存储和渲染 spine.Texture 的数据。
         */

        /**
         * @internal
         * @deprecated Since v3.7.2, this will be removed in the future.
         */
        function SkeletonTexture(opt) {
          var _this;

          _this = _spine$Texture.call(this, opt) || this; // TODO

          _this.name = 'sp.SkeletonTexture';
          _this._texture = null;
          _this._material = null;
          return _this;
        }
        /**
         * @en Sets Texture2D resource.
         * @zh 设置 Texture2D 资源。
         * @param tex @en Texture2D asset. @zh Texture2D 资源。
         */


        var _proto = SkeletonTexture.prototype;

        _proto.setRealTexture = function setRealTexture(tex) {
          this._texture = tex;
        }
        /**
         * @en Gets Texture2D resource.
         * @zh 获取 Texture2D 资源。
         */
        ;

        _proto.getRealTexture = function getRealTexture() {
          return this._texture;
        }
        /**
         * @en Sets the texture's filter mode.
         * @zh 设置此贴图的过滤算法。
         * @param minFilter @en Filter mode for scale down.
         *                  @zh 控制向下采样方式。
         * @param magFilter @en Filter mode for scale up.
         *                  @zh 控制向上采样方式。
         */
        ;

        _proto.setFilters = function setFilters(minFilter, magFilter) {
          if (this._texture) {
            this.getRealTexture().setFilters(convertFilter(minFilter), convertFilter(magFilter));
          }
        }
        /**
         * @en Sets the wrap mode of the texture.
         * @zh 设置此贴图的缠绕模式。
         * @param uWrap U coordinate wrap mode.
         * @param vWrap V coordinate wrap mode.
         */
        ;

        _proto.setWraps = function setWraps(uWrap, vWrap) {
          if (this._texture) {
            this.getRealTexture().setWrapMode(convertWraps(uWrap), convertWraps(vWrap));
          }
        }
        /**
         * @en Just for adapter interface.
         * @zh 空函数为了适配接口。
         */
        ;

        _proto.dispose = function dispose() {};

        return SkeletonTexture;
      }(spine.Texture));
    }
  };
});