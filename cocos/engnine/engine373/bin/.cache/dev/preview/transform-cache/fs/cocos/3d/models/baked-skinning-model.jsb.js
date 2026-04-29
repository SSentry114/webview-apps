System.register("q-bundled:///fs/cocos/3d/models/baked-skinning-model.jsb.js", ["../../core/index.js"], function (_export, _context) {
  "use strict";

  var cclegacy, BakedSkinningModel, MorphModel, bakedSkinningModelProto, oldDestroy, oldBindSkeleton;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_coreIndexJs) {
      cclegacy = _coreIndexJs.cclegacy;
    }],
    execute: function () {
      _export("BakedSkinningModel", BakedSkinningModel = jsb.BakedSkinningModel);

      cclegacy.BakedSkinningModel = jsb.BakedSkinningModel;
      MorphModel = jsb.MorphModel;
      bakedSkinningModelProto = BakedSkinningModel.prototype;

      bakedSkinningModelProto._ctor = function () {
        jsb.Model.prototype._ctor.call(this);

        this.uploadedAnim = undefined;
        this._dataPoolManager = cclegacy.director.root.dataPoolManager;
        var jointTextureInfo = new Float32Array(4);

        var animInfo = this._dataPoolManager.jointAnimationInfo.getData();

        this._jointsMedium = {
          buffer: null,
          jointTextureInfo: jointTextureInfo,
          animInfo: animInfo,
          texture: null,
          boundsInfo: null
        };
        this._skeleton = null;
        this._mesh = null;

        this._registerOnDestroy();
      };

      oldDestroy = bakedSkinningModelProto.destroy;

      bakedSkinningModelProto.destroy = function () {
        this.uploadedAnim = undefined; // uninitialized

        this._jointsMedium.boundsInfo = null;

        this._applyJointTexture();

        oldDestroy.call(this);
      }; // tips:for native platform need call jointTexturePool.releaseHandle(oldTex)


      bakedSkinningModelProto._onDestroy = function () {
        this._applyJointTexture();
      };

      oldBindSkeleton = bakedSkinningModelProto.bindSkeleton;

      bakedSkinningModelProto.bindSkeleton = function (skeleton, skinningRoot, mesh) {
        if (skeleton === void 0) {
          skeleton = null;
        }

        if (skinningRoot === void 0) {
          skinningRoot = null;
        }

        if (mesh === void 0) {
          mesh = null;
        }

        this._skeleton = skeleton;
        this._mesh = mesh;

        if (!skeleton || !skinningRoot || !mesh) {
          return;
        }

        this.transform = skinningRoot;
        var resMgr = this._dataPoolManager;
        this._jointsMedium.animInfo = resMgr.jointAnimationInfo.getData(skinningRoot.uuid);
        var animInfo = this._jointsMedium.animInfo;
        this.syncAnimInfoForJS(animInfo.buffer, animInfo.data, animInfo.dirtyForJSB);
        oldBindSkeleton.apply(this, arguments);
      };

      bakedSkinningModelProto.uploadAnimation = function (anim) {
        var _texture;

        if (!this._skeleton || !this._mesh || this.uploadedAnim === anim) {
          return;
        }

        this.uploadedAnim = anim;
        this.setUploadedAnimForJS(!!anim);
        var resMgr = this._dataPoolManager;
        var texture = null;
        var modelBounds = null;

        if (anim) {
          texture = resMgr.jointTexturePool.getSequencePoseTexture(this._skeleton, anim, this._mesh, this.transform);
          this._jointsMedium.boundsInfo = texture && texture.bounds.get(this._mesh.hash);
          modelBounds = null; // don't calc bounds again in Model
        } else {
          texture = resMgr.jointTexturePool.getDefaultPoseTexture(this._skeleton, this._mesh, this.transform);
          this._jointsMedium.boundsInfo = null;
          modelBounds = texture && texture.bounds.get(this._mesh.hash)[0];
        }

        this._applyJointTexture(texture);

        var jointTextureInfo = this._jointsMedium.jointTextureInfo;
        var tex = (_texture = texture) === null || _texture === void 0 ? void 0 : _texture.handle.texture;
        this.syncDataForJS(this._jointsMedium.boundsInfo, modelBounds, jointTextureInfo[0], jointTextureInfo[1], jointTextureInfo[2], jointTextureInfo[3], tex, this._jointsMedium.animInfo.data);
      };

      bakedSkinningModelProto._applyJointTexture = function (texture) {
        if (texture === void 0) {
          texture = null;
        }

        var oldTex = this._jointsMedium.texture;

        if (oldTex && oldTex !== texture) {
          this._dataPoolManager.jointTexturePool.releaseHandle(oldTex);
        }

        this._jointsMedium.texture = texture;

        if (!texture) {
          return;
        }

        var jointTextureInfo = this._jointsMedium.jointTextureInfo;
        jointTextureInfo[0] = texture.handle.texture.width;
        jointTextureInfo[1] = this._skeleton.joints.length;
        jointTextureInfo[2] = texture.pixelOffset + 0.1; // guard against floor() underflow

        jointTextureInfo[3] = 1 / jointTextureInfo[0];
      };
    }
  };
});