System.register("q-bundled:///fs/cocos/spine/skeleton-data.js", ["../../../virtual/internal%253Aconstants.js", "../core/index.js", "./skeleton-cache.js", "./skeleton-texture.js", "./lib/spine-core.js", "../core/data/decorators/index.js", "../core/global-exports.js", "../asset/assets/index.js", "../scene-graph/index.js"], function (_export, _context) {
  "use strict";

  var EDITOR, CCString, Enum, SkeletonCache, SkeletonTexture, spine, ccclass, serializable, type, legacyCC, Texture2D, Asset, Node, _dec, _dec2, _dec3, _class, _class2, _initializer, _initializer2, _initializer3, _initializer4, _initializer5, SkeletonData;

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
    }, function (_coreIndexJs) {
      CCString = _coreIndexJs.CCString;
      Enum = _coreIndexJs.Enum;
    }, function (_skeletonCacheJs) {
      SkeletonCache = _skeletonCacheJs.default;
    }, function (_skeletonTextureJs) {
      SkeletonTexture = _skeletonTextureJs.SkeletonTexture;
    }, function (_libSpineCoreJs) {
      spine = _libSpineCoreJs.default;
    }, function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      type = _coreDataDecoratorsIndexJs.type;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_assetAssetsIndexJs) {
      Texture2D = _assetAssetsIndexJs.Texture2D;
      Asset = _assetAssetsIndexJs.Asset;
    }, function (_sceneGraphIndexJs) {
      Node = _sceneGraphIndexJs.Node;
    }],
    execute: function () {
      /**
       * @en The skeleton data of spine.
       * @zh Spine 的骨骼数据。
       * @class SkeletonData
       * @extends Asset
       */
      _export("SkeletonData", SkeletonData = (_dec = ccclass('sp.SkeletonData'), _dec2 = type([Texture2D]), _dec3 = type([CCString]), _dec(_class = (_class2 = /*#__PURE__*/function (_Asset) {
        _inheritsLoose(SkeletonData, _Asset);

        function SkeletonData() {
          var _this;

          _this = _Asset.call(this) || this;
          _this._skeletonJson = _initializer && _initializer();
          _this.textures = _initializer2 && _initializer2();
          _this.textureNames = _initializer3 && _initializer3();
          _this.scale = _initializer4 && _initializer4();
          _this._atlasText = _initializer5 && _initializer5();
          _this._buffer = void 0;
          _this._skeletonCache = null;
          _this._atlasCache = null;
          _this._skinsEnum = null;
          _this._animsEnum = null;

          _this.reset();

          return _this;
        }
        /**
         * @internal
         * @deprecated Since v3.7.2, this is an engine private interface that will be removed in the future.
         */


        var _proto = SkeletonData.prototype;

        _proto.createNode = function createNode(callback) {
          var node = new Node(this.name);
          var skeleton = node.addComponent('cc.Skeleton');
          skeleton.skeletonData = this;
          return callback(null, node);
        }
        /**
         * @en Resets skeleton data state.
         * @zh 重置数据。
         */
        ;

        _proto.reset = function reset() {
          this._skeletonCache = null;
          this._atlasCache = null;

          if (EDITOR && !legacyCC.GAME_VIEW) {
            this._skinsEnum = null;
            this._animsEnum = null;
          }
        }
        /**
         * @internal Since v3.7.2, this is an engine private function, only works in editor.
         * @en Reset skeleton skin and animation enumeration.
         * @zh 重置皮肤和动画枚举。
         */
        ;

        _proto.resetEnums = function resetEnums() {
          if (EDITOR && !legacyCC.GAME_VIEW) {
            this._skinsEnum = null;
            this._animsEnum = null;
          }
        }
        /**
         * @en Gets the included SkeletonData used in spine runtime.<br>
         * Returns a sp.spine.SkeletonData object.
         * @zh 获取 Spine Runtime 使用的 SkeletonData。<br>
         * 返回一个 p.spine.SkeletonData 对象。
         * @param quiet @en If vaulue is false, feedback information will be printed when an error occurs.
         *              @zh 值为 false 时，当发生错误时将打印出反馈信息。
         */
        ;

        _proto.getRuntimeData = function getRuntimeData(quiet) {
          if (this._skeletonCache) {
            return this._skeletonCache;
          }

          if (!(this.textures && this.textures.length > 0) && this.textureNames && this.textureNames.length > 0) {
            if (!quiet) {
              console.error(this.name + " no textures found!");
            }

            return null;
          }

          var atlas = this._getAtlas(quiet);

          if (!atlas) {
            return null;
          }

          var attachmentLoader = new spine.AtlasAttachmentLoader(atlas);
          var resData = null;
          var reader = null;

          if (this.skeletonJson) {
            reader = new spine.SkeletonJson(attachmentLoader);
            resData = this.skeletonJson;
          } else {
            reader = new spine.SkeletonBinary(attachmentLoader);
            resData = new Uint8Array(this._nativeAsset);
          }

          reader.scale = this.scale;
          this._skeletonCache = reader.readSkeletonData(resData);
          atlas.dispose();
          return this._skeletonCache;
        }
        /**
         * @internal Since v3.7.2, this is an engine private function, it only works in editor.
         */
        ;

        _proto.getSkinsEnum = function getSkinsEnum() {
          if (this._skinsEnum
          /* && Object.keys(this._skinsEnum).length > 0 */
          ) {
              return this._skinsEnum;
            }

          var sd = this.getRuntimeData(true);

          if (sd) {
            var skins = sd.skins;
            var enumDef = {};

            for (var i = 0; i < skins.length; i++) {
              var name = skins[i].name;
              enumDef[name] = i;
            }

            return this._skinsEnum = Enum(enumDef);
          }

          return null;
        }
        /**
         * @internal Since v3.7.2, this is an engine private function, it only works in editor.
         */
        ;

        _proto.getAnimsEnum = function getAnimsEnum() {
          if (this._animsEnum && Object.keys(this._animsEnum).length > 1) {
            return this._animsEnum;
          }

          var sd = this.getRuntimeData(true);

          if (sd) {
            var enumDef = {
              '<None>': 0
            };
            var anims = sd.animations;

            for (var i = 0; i < anims.length; i++) {
              var name = anims[i].name;
              enumDef[name] = i + 1;
            }

            return this._animsEnum = Enum(enumDef);
          }

          return null;
        }
        /**
         * @en Destroy skeleton data.
         * @zh 销毁 skeleton data。
         */
        ;

        _proto.destroy = function destroy() {
          SkeletonCache.sharedCache.removeSkeleton(this._uuid);
          return _Asset.prototype.destroy.call(this);
        } // PRIVATE
        ;

        _proto._getTexture = function _getTexture(line) {
          var names = this.textureNames;

          for (var i = 0; i < names.length; i++) {
            if (names[i] === line) {
              var texture = this.textures[i];
              var tex = new SkeletonTexture({
                width: texture.width,
                height: texture.height
              });
              tex.setRealTexture(texture);
              return tex;
            }
          }

          console.error(this.name + " no textures found!");
          return null;
        }
        /**
         * @method _getAtlas
         * @param {boolean} [quiet=false]
         * @return {sp.spine.Atlas}
         * @private
         */
        ;

        _proto._getAtlas = function _getAtlas(quiet) {
          if (this._atlasCache) {
            return this._atlasCache;
          }

          if (!this.atlasText) {
            if (!quiet) {
              console.error(this.name + " no atlas found!");
            }

            return null;
          }

          return this._atlasCache = new spine.TextureAtlas(this.atlasText, this._getTexture.bind(this));
        };

        _createClass(SkeletonData, [{
          key: "skeletonJsonStr",
          get:
          /**
           * @en See http://en.esotericsoftware.com/spine-json-format
           * @zh 可查看 Spine 官方文档 http://zh.esotericsoftware.com/spine-json-format
           * @deprecated since v3.5.0, this is an engine private interface that will be removed in the future.
           */

          /**
           * @en A string parsed from the _skeletonJson.
           * @zh 从 _skeletonJson 中解析出的字符串。
           */
          function get() {
            if (this._skeletonJson) {
              return JSON.stringify(this._skeletonJson);
            }

            return '';
          }
          /**
           * @en See http://en.esotericsoftware.com/spine-json-format
           * @zh 可查看 Spine 官方文档 http://zh.esotericsoftware.com/spine-json-format
           */

        }, {
          key: "skeletonJson",
          get: function get() {
            return this._skeletonJson;
          },
          set: function set(value) {
            this.reset();

            if (typeof value === 'string') {
              this._skeletonJson = JSON.parse(value);
            } else {
              this._skeletonJson = value;
            } // If create by manual, uuid is empty.


            if (!this._uuid && value.skeleton) {
              this._uuid = value.skeleton.hash;
            }
          }
          /**
           * @en An atlas text description.
           * @zh Atlas 文本描述。
           */

        }, {
          key: "atlasText",
          get: function get() {
            return this._atlasText;
          },
          set: function set(value) {
            this._atlasText = value;
            this.reset();
          }
          /**
           * @en Texture array.
           * @zh 纹理数组。
           */

        }, {
          key: "_nativeAsset",
          get:
          /**
           * @deprecated since v3.5.0, this is an engine private interface that will be removed in the future.
           */
          function get() {
            return this._buffer;
          },
          set: function set(bin) {
            this._buffer = bin;
            this.reset();
          }
          /**
           * @en A string describing atlas.
           * @zh 描述图集信息的字符串。
           */

        }]);

        return SkeletonData;
      }(Asset), (_initializer = _applyDecoratedInitializer(_class2.prototype, "_skeletonJson", [serializable], function () {
        return null;
      }), _initializer2 = _applyDecoratedInitializer(_class2.prototype, "textures", [serializable, _dec2], function () {
        return [];
      }), _initializer3 = _applyDecoratedInitializer(_class2.prototype, "textureNames", [serializable, _dec3], function () {
        return [];
      }), _initializer4 = _applyDecoratedInitializer(_class2.prototype, "scale", [serializable], function () {
        return 1;
      }), _initializer5 = _applyDecoratedInitializer(_class2.prototype, "_atlasText", [serializable], function () {
        return '';
      })), _class2)) || _class));

      legacyCC.internal.SpineSkeletonData = SkeletonData;
    }
  };
});