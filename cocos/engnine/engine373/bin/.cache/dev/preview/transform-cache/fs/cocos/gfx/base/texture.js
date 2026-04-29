System.register("q-bundled:///fs/cocos/gfx/base/texture.js", ["./define.js"], function (_export, _context) {
  "use strict";

  var GFXObject, ObjectType, TextureInfo, TextureViewInfo, Texture;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_defineJs) {
      GFXObject = _defineJs.GFXObject;
      ObjectType = _defineJs.ObjectType;
      TextureInfo = _defineJs.TextureInfo;
      TextureViewInfo = _defineJs.TextureViewInfo;
    }],
    execute: function () {
      /**
       * @en GFX texture.
       * @zh GFX 纹理。
       */
      _export("Texture", Texture = /*#__PURE__*/function (_GFXObject) {
        _inheritsLoose(Texture, _GFXObject);

        function Texture() {
          var _this;

          _this = _GFXObject.call(this, ObjectType.TEXTURE) || this;
          _this._info = new TextureInfo();
          _this._viewInfo = new TextureViewInfo();
          _this._isPowerOf2 = false;
          _this._isTextureView = false;
          _this._size = 0;
          return _this;
        }

        Texture.getLevelCount = function getLevelCount(width, height) {
          return Math.floor(Math.log2(Math.max(width, height)));
        };

        _createClass(Texture, [{
          key: "type",
          get:
          /**
           * @en Get texture type.
           * @zh 纹理类型。
           */
          function get() {
            return this._info.type;
          }
          /**
           * @en Get texture usage.
           * @zh 纹理使用方式。
           */

        }, {
          key: "usage",
          get: function get() {
            return this._info.usage;
          }
          /**
           * @en Get texture format.
           * @zh 纹理格式。
           */

        }, {
          key: "format",
          get: function get() {
            return this._info.format;
          }
          /**
           * @en Get texture width.
           * @zh 纹理宽度。
           */

        }, {
          key: "width",
          get: function get() {
            return this._info.width;
          }
          /**
           * @en Get texture height.
           * @zh 纹理高度。
           */

        }, {
          key: "height",
          get: function get() {
            return this._info.height;
          }
          /**
           * @en Get texture depth.
           * @zh 纹理深度。
           */

        }, {
          key: "depth",
          get: function get() {
            return this._info.depth;
          }
          /**
           * @en Get texture array layer.
           * @zh 纹理数组层数。
           */

        }, {
          key: "layerCount",
          get: function get() {
            return this._info.layerCount;
          }
          /**
           * @en Get texture mip level.
           * @zh 纹理 mip 层级数。
           */

        }, {
          key: "levelCount",
          get: function get() {
            return this._info.levelCount;
          }
          /**
           * @en Get texture samples.
           * @zh 纹理采样数。
           */

        }, {
          key: "samples",
          get: function get() {
            return this._info.samples;
          }
          /**
           * @en Get texture flags.
           * @zh 纹理标识位。
           */

        }, {
          key: "flags",
          get: function get() {
            return this._info.flags;
          }
          /**
           * @en Get texture size.
           * @zh 纹理大小。
           */

        }, {
          key: "size",
          get: function get() {
            return this._size;
          }
          /**
           * @en Get texture info.
           * @zh 纹理信息。
           */

        }, {
          key: "info",
          get: function get() {
            return this._info;
          }
          /**
           * @en Get view info.
           * @zh 纹理视图信息。
           */

        }, {
          key: "viewInfo",
          get: function get() {
            return this._viewInfo;
          }
          /**
           * @en Get texture type.
           * @zh 是否为纹理视图。
           */

        }, {
          key: "isTextureView",
          get: function get() {
            return this._isTextureView;
          }
        }]);

        return Texture;
      }(GFXObject));
    }
  };
});