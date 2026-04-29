System.register("q-bundled:///fs/cocos/3d/assets/mesh.jsb.js", ["../../core/data/decorators/index.js", "../../core/index.js"], function (_export, _context) {
  "use strict";

  var ccclass, serializable, cclegacy, Vec3, Mesh, IStructProto, meshAssetProto, originOnLoaded, MeshProto;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_coreIndexJs) {
      cclegacy = _coreIndexJs.cclegacy;
      Vec3 = _coreIndexJs.Vec3;
    }],
    execute: function () {
      _export("Mesh", Mesh = jsb.Mesh);

      IStructProto = jsb.Mesh.IStruct.prototype;
      Object.defineProperty(IStructProto, 'minPosition', {
        configurable: true,
        enumerable: true,

        get() {
          const r = this.getMinPosition();

          if (r) {
            if (!this._minPositionCache) {
              this._minPositionCache = new Vec3(r.x, r.y, r.z);
            } else {
              this._minPositionCache.set(r.x, r.y, r.z);
            }
          } else {
            this._minPositionCache = undefined;
          }

          return this._minPositionCache;
        },

        set(v) {
          this.setMinPosition(v);
        }

      });
      Object.defineProperty(IStructProto, 'maxPosition', {
        configurable: true,
        enumerable: true,

        get() {
          const r = this.getMaxPosition();

          if (r) {
            if (!this._maxPositionCache) {
              this._maxPositionCache = new Vec3(r.x, r.y, r.z);
            } else {
              this._maxPositionCache.set(r.x, r.y, r.z);
            }
          } else {
            this._maxPositionCache = undefined;
          }

          return this._maxPositionCache;
        },

        set(v) {
          this.setMaxPosition(v);
        }

      });
      meshAssetProto = jsb.Mesh.prototype;
      meshAssetProto.createNode = null;
      originOnLoaded = meshAssetProto.onLoaded;

      meshAssetProto._ctor = function () {
        jsb.Asset.prototype._ctor.apply(this, arguments);

        this._struct = {
          vertexBundles: [],
          primitives: []
        };
        this._minPosition = undefined;
        this._maxPosition = undefined;
      };

      Object.defineProperty(meshAssetProto, 'struct', {
        configurable: true,
        enumerable: true,

        get() {
          return this.getStruct();
        }

      });
      Object.defineProperty(meshAssetProto, 'minPosition', {
        configurable: true,
        enumerable: true,

        get() {
          const r = this.getMinPosition();

          if (r) {
            if (!this._minPosition) {
              this._minPosition = new Vec3(r.x, r.y, r.z);
            } else {
              this._minPosition.set(r.x, r.y, r.z);
            }
          } else {
            this._minPosition = undefined;
          }

          return this._minPosition;
        }

      });
      Object.defineProperty(meshAssetProto, 'maxPosition', {
        configurable: true,
        enumerable: true,

        get() {
          const r = this.getMaxPosition();

          if (r) {
            if (!this._maxPosition) {
              this._maxPosition = new Vec3(r.x, r.y, r.z);
            } else {
              this._maxPosition.set(r.x, r.y, r.z);
            }
          } else {
            this._maxPosition = undefined;
          }

          return this._maxPosition;
        }

      });

      meshAssetProto.onLoaded = function () {
        // might be undefined or null
        const meshStruct = this._struct;

        if (meshStruct) {
          // Synchronize to native if the struct contains valid values.
          if (meshStruct.vertexBundles.length !== 0 || meshStruct.primitives.length !== 0) {
            this.setStruct(this._struct);
          }
        } // Set to null to release memory in JS


        this._struct = null;
        originOnLoaded.apply(this);
      };

      cclegacy.Mesh = jsb.Mesh; // handle meta data, it is generated automatically

      MeshProto = Mesh.prototype;
      serializable(MeshProto, '_struct', () => {
        return {
          vertexBundles: [],
          primitives: []
        };
      });
      serializable(MeshProto, '_hash', () => 0);
      serializable(MeshProto, '_allowDataAccess', () => true);
      ccclass('cc.Mesh')(Mesh);
    }
  };
});