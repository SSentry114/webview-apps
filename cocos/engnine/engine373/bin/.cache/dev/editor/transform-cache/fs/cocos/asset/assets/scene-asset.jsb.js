System.register("q-bundled:///fs/cocos/asset/assets/scene-asset.jsb.js", ["../../core/data/decorators/index.js", "../../core/index.js", "./asset.js"], function (_export, _context) {
  "use strict";

  var ccclass, editable, serializable, cclegacy, SceneAsset, sceneAssetProto, SceneAssetProto;

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
      _export("SceneAsset", SceneAsset = jsb.SceneAsset);

      cclegacy.SceneAsset = SceneAsset;
      sceneAssetProto = SceneAsset.prototype;
      Object.defineProperty(sceneAssetProto, 'scene', {
        enumerable: true,
        configurable: true,

        get() {
          if (!this._scene) {
            this._scene = this.getScene();
          }

          return this._scene;
        },

        set(v) {
          this._scene = v;
          this.setScene(v);
        }

      });

      sceneAssetProto._ctor = function () {
        jsb.Asset.prototype._ctor.apply(this, arguments);

        this._scene = null;
      }; // handle meta data, it is generated automatically


      SceneAssetProto = SceneAsset.prototype;
      serializable(SceneAssetProto, 'scene', () => null);
      editable(SceneAssetProto, 'scene', () => null);
      ccclass('cc.SceneAsset')(SceneAsset);
    }
  };
});