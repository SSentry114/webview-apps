System.register("q-bundled:///fs/cocos/spine/skeleton-system.js", ["../game/director.js", "../core/index.js", "../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var director, System, legacyCC, SkeletonSystem;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_gameDirectorJs) {
      director = _gameDirectorJs.director;
    }, function (_coreIndexJs) {
      System = _coreIndexJs.System;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
      _export("SkeletonSystem", SkeletonSystem = /*#__PURE__*/function (_System) {
        _inheritsLoose(SkeletonSystem, _System);

        /**
         * @en
         * The ID flag of the system.
         * @zh
         * 此系统的 ID 标记。
         */
        function SkeletonSystem() {
          var _this;

          _this = _System.call(this) || this;
          _this._skeletons = new Set();
          return _this;
        }
        /**
         * @en
         * Gets the instance of the Spine Skeleton system.
         * @zh
         * 获取 Spine 骨骼系统的单例。
         */


        SkeletonSystem.getInstance = function getInstance() {
          if (!SkeletonSystem._instance) {
            SkeletonSystem._instance = new SkeletonSystem();
            director.registerSystem(SkeletonSystem.ID, SkeletonSystem._instance, System.Priority.HIGH);
          }

          return SkeletonSystem._instance;
        };

        var _proto = SkeletonSystem.prototype;

        _proto.add = function add(skeleton) {
          if (!skeleton) return;

          if (!this._skeletons.has(skeleton)) {
            this._skeletons.add(skeleton);
          }
        };

        _proto.remove = function remove(skeleton) {
          if (!skeleton) return;

          if (this._skeletons.has(skeleton)) {
            this._skeletons["delete"](skeleton);
          }
        };

        _proto.postUpdate = function postUpdate(dt) {
          if (!this._skeletons) {
            return;
          }

          this._skeletons.forEach(function (skeleton) {
            skeleton.updateAnimation(dt);
            skeleton.syncAttachedNode();
          });
        };

        _proto.prepareRenderData = function prepareRenderData() {
          if (!this._skeletons) {
            return;
          }

          this._skeletons.forEach(function (skeleton) {
            skeleton.markForUpdateRenderData();
          });
        };

        return SkeletonSystem;
      }(System));

      SkeletonSystem.ID = 'SKELETON';
      SkeletonSystem._instance = void 0;
      legacyCC.internal.SpineSkeletonSystem = SkeletonSystem;
    }
  };
});