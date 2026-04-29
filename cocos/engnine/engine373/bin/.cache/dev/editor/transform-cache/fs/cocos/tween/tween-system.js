System.register("q-bundled:///fs/cocos/tween/tween-system.js", ["../../../virtual/internal%253Aconstants.js", "../core/index.js", "./actions/action-manager.js", "../game/index.js"], function (_export, _context) {
  "use strict";

  var EDITOR, System, cclegacy, ActionManager, Director, director, TweenSystem;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("TweenSystem", void 0);

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_coreIndexJs) {
      System = _coreIndexJs.System;
      cclegacy = _coreIndexJs.cclegacy;
    }, function (_actionsActionManagerJs) {
      ActionManager = _actionsActionManagerJs.ActionManager;
    }, function (_gameIndexJs) {
      Director = _gameIndexJs.Director;
      director = _gameIndexJs.director;
    }],
    execute: function () {
      /**
       * @en
       * Tween system.
       * @zh
       * 缓动系统。
       */
      _export("TweenSystem", TweenSystem = class TweenSystem extends System {
        constructor(...args) {
          super(...args);
          this.actionMgr = new ActionManager();
        }

        /**
         * @en
         * Gets the action manager.
         * @zh
         * 获取动作管理器。
         */
        get ActionManager() {
          return this.actionMgr;
        }

        /**
         * @en
         * The update will auto execute after all components update.
         * @zh
         * 此方法会在组件 update 之后自动执行。
         * @param dt @en The delta time @zh 间隔时间
         */
        update(dt) {
          if (!EDITOR || cclegacy.GAME_VIEW || this._executeInEditMode) {
            this.actionMgr.update(dt);
          }
        }

      });

      TweenSystem.ID = 'TWEEN';
      TweenSystem.instance = void 0;
      director.on(Director.EVENT_INIT, () => {
        const sys = new TweenSystem();
        TweenSystem.instance = sys;
        director.registerSystem(TweenSystem.ID, sys, System.Priority.MEDIUM);
      });
    }
  };
});