System.register("q-bundled:///fs/cocos/asset/assets/asset.jsb.js", ["../../core/data/decorators/index.js", "../../core/index.js", "../asset-manager/helper.js"], function (_export, _context) {
  "use strict";

  var ccclass, serializable, cclegacy, js, _decorator, path, jsbUtils, CallbacksInvoker, applyMixins, getUrlWithUuid, assetProto, Asset, AssetProto, _nativeAssetDescriptor;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_coreIndexJs) {
      cclegacy = _coreIndexJs.cclegacy;
      js = _coreIndexJs.js;
      _decorator = _coreIndexJs._decorator;
      path = _coreIndexJs.path;
      jsbUtils = _coreIndexJs.jsbUtils;
      CallbacksInvoker = _coreIndexJs.CallbacksInvoker;
      applyMixins = _coreIndexJs.applyMixins;
    }, function (_assetManagerHelperJs) {
      getUrlWithUuid = _assetManagerHelperJs.getUrlWithUuid;
    }],
    execute: function () {
      applyMixins(jsb.Asset, [CallbacksInvoker, jsbUtils.ExtraEventMethods]);
      assetProto = jsb.Asset.prototype;

      assetProto._ctor = function () {
        this.loaded = true; // deprecated in v3.3

        this._ref = 0;
        this.__nativeRefs = {};
        this.__jsb_ref_id = undefined;
        this._iN$t = null;
        this.__editorExtras__ = {
          editorOnly: true
        };
        this._callbackTable = js.createMap(true);
        this._file = null; // for deserialization
        // _initializerDefineProperty(_this, "_native", _descriptor$1, _assertThisInitialized(_this));
      };

      Object.defineProperty(assetProto, '_nativeAsset', {
        get: function get() {
          return this._file;
        },
        set: function set(obj) {
          this._file = obj;
        }
      });
      Object.defineProperty(assetProto, 'nativeUrl', {
        get: function get() {
          if (!this._nativeUrl) {
            if (!this._native) return '';
            var name = this._native;

            if (name.charCodeAt(0) === 47) {
              // '/'
              // remove library tag
              // not imported in library, just created on-the-fly
              return name.slice(1);
            }

            if (name.charCodeAt(0) === 46) {
              // '.'
              // imported in dir where json exist
              this._nativeUrl = getUrlWithUuid(this._uuid, {
                nativeExt: name,
                isNative: true
              });
            } else {
              // imported in an independent dir
              this._nativeUrl = getUrlWithUuid(this._uuid, {
                __nativeName__: name,
                nativeExt: path.extname(name),
                isNative: true
              });
            }
          }

          return this._nativeUrl;
        }
      });
      Object.defineProperty(assetProto, 'refCount', {
        configurable: true,
        enumerable: true,
        get: function get() {
          return this._ref;
        }
      });

      assetProto.addRef = function () {
        this._ref++;
        this.addAssetRef();
        return this;
      };

      assetProto.decRef = function (autoRelease) {
        if (autoRelease === void 0) {
          autoRelease = true;
        }

        this.decAssetRef();

        if (this._ref > 0) {
          this._ref--;
        }

        if (autoRelease) {
          cclegacy.assetManager._releaseManager.tryRelease(this);
        }

        return this;
      };

      assetProto.toString = function () {
        return this.nativeUrl;
      };

      assetProto.createNode = null; // @ts-ignore

      _export("Asset", Asset = jsb.Asset);

      cclegacy.Asset = jsb.Asset; // handle meta data, it is generated automatically

      AssetProto = Asset.prototype;
      serializable(AssetProto, '_native', function () {
        return '';
      });
      _nativeAssetDescriptor = Object.getOwnPropertyDescriptor(AssetProto, '_nativeAsset');

      _decorator.property(AssetProto, '_nativeAsset', _nativeAssetDescriptor);

      ccclass('cc.Asset')(Asset);
    }
  };
});