System.register("q-bundled:///fs/cocos/asset/assets/effect-asset.jsb.js", ["../../core/data/decorators/index.js", "../../core/index.js", "./asset.js"], function (_export, _context) {
  "use strict";

  var ccclass, editable, editorOnly, serializable, cclegacy, EffectAsset, effectAssetProto, EffectAssetProto;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      editable = _coreDataDecoratorsIndexJs.editable;
      editorOnly = _coreDataDecoratorsIndexJs.editorOnly;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_coreIndexJs) {
      cclegacy = _coreIndexJs.cclegacy;
    }, function (_assetJs) {}],
    execute: function () {
      _export("EffectAsset", EffectAsset = jsb.EffectAsset);

      cclegacy.EffectAsset = EffectAsset;
      effectAssetProto = EffectAsset.prototype;

      effectAssetProto._ctor = function () {
        jsb.Asset.prototype._ctor.apply(this, arguments);

        this.hideInEditor = false;
      }; // handle meta data, it is generated automatically


      EffectAssetProto = EffectAsset.prototype;
      editable(EffectAssetProto, 'techniques', function () {
        return [];
      });
      serializable(EffectAssetProto, 'techniques', function () {
        return [];
      });
      editable(EffectAssetProto, 'shaders', function () {
        return [];
      });
      serializable(EffectAssetProto, 'shaders', function () {
        return [];
      });
      editable(EffectAssetProto, 'combinations', function () {
        return [];
      });
      serializable(EffectAssetProto, 'combinations', function () {
        return [];
      });
      editorOnly(EffectAssetProto, 'hideInEditor', function () {
        return false;
      });
      serializable(EffectAssetProto, 'hideInEditor', function () {
        return false;
      });
      ccclass('cc.EffectAsset')(EffectAsset);
    }
  };
});