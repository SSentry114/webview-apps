System.register("q-bundled:///fs/cocos/physics/bullet/bullet-cache.js", ["../../core/index.js", "./instantiated.js"], function (_export, _context) {
  "use strict";

  var Vec3, Quat, Mat4, bt, BulletCache, TriggerEventObject, CollisionEventObject, CC_V3_0, CC_V3_1, CC_QUAT_0, CC_MAT4_0, CC_MAT4_1;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("BulletCache", void 0);

  return {
    setters: [function (_coreIndexJs) {
      Vec3 = _coreIndexJs.Vec3;
      Quat = _coreIndexJs.Quat;
      Mat4 = _coreIndexJs.Mat4;
    }, function (_instantiatedJs) {
      bt = _instantiatedJs.bt;
    }],
    execute: function () {
      _export("TriggerEventObject", TriggerEventObject = {
        type: 'onTriggerEnter',
        selfCollider: null,
        otherCollider: null,
        impl: null
      });

      _export("CollisionEventObject", CollisionEventObject = {
        type: 'onCollisionEnter',
        selfCollider: null,
        otherCollider: null,
        contacts: [],
        impl: null
      });

      _export("BulletCache", BulletCache = class BulletCache {
        constructor() {
          this.BT_TRANSFORM_0 = bt.Transform_new();
          this.BT_TRANSFORM_1 = bt.Transform_new();
          this.BT_V3_0 = bt.Vec3_new(0, 0, 0);
          this.BT_V3_1 = bt.Vec3_new(0, 0, 0);
          this.BT_V3_2 = bt.Vec3_new(0, 0, 0);
          this.BT_QUAT_0 = bt.Quat_new(0, 0, 0, 1);
        }

        static get instance() {
          if (BulletCache._instance == null) BulletCache._instance = new BulletCache();
          return BulletCache._instance;
        }

        static setWrapper(impl, type, wrap) {
          if (!this.ROOT[type]) this.ROOT[type] = {};
          this.ROOT[type][impl] = wrap;
        }

        static delWrapper(impl, type) {
          delete this.ROOT[type][impl];
        }

        static getWrapper(ptr, type) {
          return this.ROOT[type][ptr];
        }

        static isNotEmptyShape(ptr) {
          return ptr !== bt.EmptyShape_static();
        }

      });

      BulletCache._instance = void 0;
      BulletCache.ROOT = {};

      _export("CC_V3_0", CC_V3_0 = new Vec3());

      _export("CC_V3_1", CC_V3_1 = new Vec3());

      _export("CC_QUAT_0", CC_QUAT_0 = new Quat());

      _export("CC_MAT4_0", CC_MAT4_0 = new Mat4());

      _export("CC_MAT4_1", CC_MAT4_1 = new Mat4());

      bt.CACHE = BulletCache;
    }
  };
});