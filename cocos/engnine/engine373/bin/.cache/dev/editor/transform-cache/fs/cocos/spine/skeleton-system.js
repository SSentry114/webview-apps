System.register("q-bundled:///fs/cocos/spine/skeleton-system.js", ["../game/director.js", "../core/index.js", "../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var director, System, legacyCC, SkeletonSystem;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("SkeletonSystem", void 0);

  return {
    setters: [function (_gameDirectorJs) {
      director = _gameDirectorJs.director;
    }, function (_coreIndexJs) {
      System = _coreIndexJs.System;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
      _export("SkeletonSystem", SkeletonSystem = class SkeletonSystem extends System {
        /**
         * @en
         * The ID flag of the system.
         * @zh
         * 此系统的 ID 标记。
         */
        constructor() {
          super();
          this._skeletons = new Set();
        }
        /**
         * @en
         * Gets the instance of the Spine Skeleton system.
         * @zh
         * 获取 Spine 骨骼系统的单例。
         */


        static getInstance() {
          if (!SkeletonSystem._instance) {
            SkeletonSystem._instance = new SkeletonSystem();
            director.registerSystem(SkeletonSystem.ID, SkeletonSystem._instance, System.Priority.HIGH);
          }

          return SkeletonSystem._instance;
        }

        add(skeleton) {
          if (!skeleton) return;

          if (!this._skeletons.has(skeleton)) {
            this._skeletons.add(skeleton);
          }
        }

        remove(skeleton) {
          if (!skeleton) return;

          if (this._skeletons.has(skeleton)) {
            this._skeletons.delete(skeleton);
          }
        }

        postUpdate(dt) {
          if (!this._skeletons) {
            return;
          }

          this._skeletons.forEach(skeleton => {
            skeleton.updateAnimation(dt);
            skeleton.syncAttachedNode();
          });
        }

        prepareRenderData() {
          if (!this._skeletons) {
            return;
          }

          this._skeletons.forEach(skeleton => {
            skeleton.markForUpdateRenderData();
          });
        }

      });

      SkeletonSystem.ID = 'SKELETON';
      SkeletonSystem._instance = void 0;
      legacyCC.internal.SpineSkeletonSystem = SkeletonSystem;
    }
  };
});