System.register("q-bundled:///fs/cocos/3d/assets/skeleton.jsb.js", ["../../core/data/decorators/index.js", "../../core/index.js", "../../asset/assets/asset.js"], function (_export, _context) {
  "use strict";

  var ccclass, type, serializable, CCString, cclegacy, Mat4, Asset, Skeleton, skeletonProto, oldSkeletonProtoOnLoaded, SkeletonProto;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      type = _coreDataDecoratorsIndexJs.type;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_coreIndexJs) {
      CCString = _coreIndexJs.CCString;
      cclegacy = _coreIndexJs.cclegacy;
      Mat4 = _coreIndexJs.Mat4;
    }, function (_assetAssetsAssetJs) {
      Asset = _assetAssetsAssetJs.Asset;
    }],
    execute: function () {
      _export("Skeleton", Skeleton = jsb.Skeleton);

      cclegacy.Skeleton = Skeleton;
      skeletonProto = Skeleton.prototype;
      Object.defineProperty(skeletonProto, 'bindposes', {
        enumerable: true,
        configurable: true,
        get: function get() {
          return this._bindposes;
        },
        set: function set(v) {
          this._bindposes = v;

          this._setBindposes(v);
        }
      });

      skeletonProto._ctor = function () {
        jsb.Asset.prototype._ctor.apply(this, arguments);

        this._bindposes = [];
      };

      skeletonProto.destroy = function () {
        var _cclegacy$director$ro, _cclegacy$director$ro2;

        (_cclegacy$director$ro = cclegacy.director.root) === null || _cclegacy$director$ro === void 0 ? void 0 : (_cclegacy$director$ro2 = _cclegacy$director$ro.dataPoolManager) === null || _cclegacy$director$ro2 === void 0 ? void 0 : _cclegacy$director$ro2.releaseSkeleton(this);
        return Asset.prototype.destroy.call(this);
      };

      oldSkeletonProtoOnLoaded = skeletonProto.onLoaded;

      skeletonProto.onLoaded = function () {
        this._setBindposes(this._bindposes);

        oldSkeletonProtoOnLoaded.call(this);
      }; // handle meta data, it is generated automatically


      SkeletonProto = Skeleton.prototype;
      type([CCString])(SkeletonProto, '_joints', function () {
        return [];
      });
      type([Mat4])(SkeletonProto, '_bindposes', function () {
        return [];
      });
      serializable(SkeletonProto, '_hash', function () {
        return 0;
      });
      ccclass('cc.Skeleton')(Skeleton);
    }
  };
});