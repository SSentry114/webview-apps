System.register("q-bundled:///fs/cocos/gfx/empty/empty-texture.js", ["../base/define.js", "../base/texture.js"], function (_export, _context) {
  "use strict";

  var FormatSurfaceSize, IsPowerOf2, Texture, EmptyTexture;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_baseDefineJs) {
      FormatSurfaceSize = _baseDefineJs.FormatSurfaceSize;
      IsPowerOf2 = _baseDefineJs.IsPowerOf2;
    }, function (_baseTextureJs) {
      Texture = _baseTextureJs.Texture;
    }],
    execute: function () {
      _export("EmptyTexture", EmptyTexture = /*#__PURE__*/function (_Texture) {
        _inheritsLoose(EmptyTexture, _Texture);

        function EmptyTexture() {
          return _Texture.apply(this, arguments) || this;
        }

        var _proto = EmptyTexture.prototype;

        _proto.initialize = function initialize(info, isSwapchainTexture) {
          var texInfo = info;

          if ('texture' in info) {
            texInfo = info.texture.info;
            this._isTextureView = true;

            this._viewInfo.copy(info);
          } else {
            this._viewInfo.texture = this;
            this._viewInfo.type = info.type;
            this._viewInfo.format = info.format;
            this._viewInfo.baseLevel = 0;
            this._viewInfo.levelCount = 1;
            this._viewInfo.baseLayer = 0;
            this._viewInfo.layerCount = 1;
          }

          this._info.copy(texInfo);

          this._isPowerOf2 = IsPowerOf2(this._info.width) && IsPowerOf2(this._info.height);
          this._size = FormatSurfaceSize(this._info.format, this.width, this.height, this.depth, this._info.levelCount) * this._info.layerCount;
        };

        _proto.destroy = function destroy() {};

        _proto.getGLTextureHandle = function getGLTextureHandle() {
          return 0;
        };

        _proto.resize = function resize(width, height) {
          this._info.width = width;
          this._info.height = height;
        };

        _proto.initAsSwapchainTexture = function initAsSwapchainTexture(info) {};

        return EmptyTexture;
      }(Texture));
    }
  };
});