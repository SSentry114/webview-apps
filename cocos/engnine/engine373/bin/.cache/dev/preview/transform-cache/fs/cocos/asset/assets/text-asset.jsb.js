System.register("q-bundled:///fs/cocos/asset/assets/text-asset.jsb.js", ["../../core/data/decorators/index.js", "../../core/index.js", "./asset.js"], function (_export, _context) {
  "use strict";

  var ccclass, editable, serializable, cclegacy, textAssetProto, TextAsset, TextAssetProto;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      editable = _coreDataDecoratorsIndexJs.editable;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_coreIndexJs) {
      cclegacy = _coreIndexJs.cclegacy;
    }, function (_assetJs) {}],
    execute: function () {
      textAssetProto = jsb.TextAsset.prototype;
      textAssetProto.createNode = null;

      _export("TextAsset", TextAsset = jsb.TextAsset);

      textAssetProto._ctor = function () {
        jsb.Asset.prototype._ctor.apply(this, arguments);
      };

      cclegacy.TextAsset = jsb.TextAsset; // handle meta data, it is generated automatically

      TextAssetProto = TextAsset.prototype;
      editable(TextAssetProto, 'text', function () {
        return '';
      });
      serializable(TextAssetProto, 'text', function () {
        return '';
      });
      ccclass('cc.TextAsset')(TextAsset);
    }
  };
});