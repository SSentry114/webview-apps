System.register("q-bundled:///fs/cocos/asset/assets/deprecation.js", ["../../core/index.js", "./texture-base.js", "./render-texture.js"], function (_export, _context) {
  "use strict";

  var removeProperty, replaceProperty, TextureBase, RenderTexture;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_coreIndexJs) {
      removeProperty = _coreIndexJs.removeProperty;
      replaceProperty = _coreIndexJs.replaceProperty;
    }, function (_textureBaseJs) {
      TextureBase = _textureBaseJs.TextureBase;
    }, function (_renderTextureJs) {
      RenderTexture = _renderTextureJs.RenderTexture;
    }],
    execute: function () {
      removeProperty(TextureBase.prototype, 'TextureBase.prototype', [{
        name: 'hasPremultipliedAlpha'
      }, {
        name: 'setPremultiplyAlpha'
      }, {
        name: 'setFlipY'
      }]);
      replaceProperty(RenderTexture.prototype, 'RenderTexture.prototype', [{
        name: 'getGFXWindow',

        customFunction() {
          // @ts-expect-error
          return this._window;
        }

      }]);
    }
  };
});