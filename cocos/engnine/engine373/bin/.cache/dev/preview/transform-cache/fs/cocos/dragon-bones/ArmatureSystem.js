System.register("q-bundled:///fs/cocos/dragon-bones/ArmatureSystem.js", ["../game/director.js", "../core/index.js"], function (_export, _context) {
  "use strict";

  var director, System, cclegacy, ArmatureSystem;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_gameDirectorJs) {
      director = _gameDirectorJs.director;
    }, function (_coreIndexJs) {
      System = _coreIndexJs.System;
      cclegacy = _coreIndexJs.cclegacy;
    }],
    execute: function () {
      /**
       * @en The ArmatureSystem is mainly responsible for triggering and updating the animation uniformly.
       * @zh 骨架系统，主要负责统一触发更新骨骼动画。
       */
      _export("ArmatureSystem", ArmatureSystem = /*#__PURE__*/function (_System) {
        _inheritsLoose(ArmatureSystem, _System);

        /**
         * @en The ID flag of the system.
         * @zh 此系统的 ID 标记。
         */
        function ArmatureSystem() {
          var _this;

          _this = _System.call(this) || this;
          _this._armatures = new Set();
          return _this;
        }
        /**
         * @en Gets the instance of the ArmatureSystem system.
         * @zh 获取 Dragonbones Armature 系统的单例。
         */


        ArmatureSystem.getInstance = function getInstance() {
          if (!ArmatureSystem._instance) {
            ArmatureSystem._instance = new ArmatureSystem();
            director.registerSystem(ArmatureSystem.ID, ArmatureSystem._instance, System.Priority.HIGH);
          }

          return ArmatureSystem._instance;
        };

        var _proto = ArmatureSystem.prototype;

        /**
         * @en Add the ArmatureDisplay components into ArmatureSystem system.
         * @zh 将龙骨组件添加到系统中。
         */
        _proto.add = function add(armature) {
          if (!armature) return;

          if (!this._armatures.has(armature)) {
            this._armatures.add(armature);
          }
        }
        /**
         * @en Remove the ArmatureDisplay components from ArmatureSystem system.
         * @zh 将龙骨组件从系统移除。
         */
        ;

        _proto.remove = function remove(armature) {
          if (!armature) return;

          if (this._armatures.has(armature)) {
            this._armatures["delete"](armature);
          }
        }
        /**
         * @en Trigger animation update of Armature objects.
         * @zh 触发更新龙骨动画。
         */
        ;

        _proto.postUpdate = function postUpdate(dt) {
          if (!this._armatures) {
            return;
          }

          this._armatures.forEach(function (armature) {
            armature.updateAnimation(dt);
            armature.syncAttachedNode();
          });
        }
        /**
         * @en
         * Trigger update of rendering data for all Dragonbone components.
         * @zh
         * 触发标记更新所有龙骨组件的渲染数据。
         */
        ;

        _proto.prepareRenderData = function prepareRenderData() {
          if (!this._armatures) {
            return;
          }

          this._armatures.forEach(function (armature) {
            armature.markForUpdateRenderData();
          });
        };

        return ArmatureSystem;
      }(System));

      ArmatureSystem.ID = 'ARMATURE';
      ArmatureSystem._instance = void 0;
      cclegacy.internal.ArmatureSystem = ArmatureSystem;
    }
  };
});