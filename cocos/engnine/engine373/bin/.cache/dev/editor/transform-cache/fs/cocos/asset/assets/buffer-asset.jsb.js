System.register("q-bundled:///fs/cocos/asset/assets/buffer-asset.jsb.js", ["../../core/data/decorators/index.js", "../../core/index.js", "./asset.js"], function (_export, _context) {
  "use strict";

  var ccclass, override, cclegacy, BufferAsset, BufferAssetProto, _nativeAssetDescriptor;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      override = _coreDataDecoratorsIndexJs.override;
    }, function (_coreIndexJs) {
      cclegacy = _coreIndexJs.cclegacy;
    }, function (_assetJs) {}],
    execute: function () {
      _export("BufferAsset", BufferAsset = jsb.BufferAsset);

      cclegacy.BufferAsset = jsb.BufferAsset; // handle meta data, it is generated automatically

      BufferAssetProto = BufferAsset.prototype;
      _nativeAssetDescriptor = Object.getOwnPropertyDescriptor(BufferAssetProto, '_nativeAsset');
      override(BufferAssetProto, '_nativeAsset', _nativeAssetDescriptor);
      ccclass('cc.BufferAsset')(BufferAsset);
    }
  };
});