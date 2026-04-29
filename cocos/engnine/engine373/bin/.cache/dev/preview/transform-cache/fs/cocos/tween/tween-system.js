System.register("q-bundled:///fs/cocos/tween/tween-system.js", ["../../../virtual/internal%253Aconstants.js", "../core/index.js", "./actions/action-manager.js", "../game/index.js"], function (_export, _context) {
  "use strict";

  var EDITOR, System, cclegacy, ActionManager, Director, director, TweenSystem;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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
      _export("TweenSystem", TweenSystem = /*#__PURE__*/function (_System) {
        _inheritsLoose(TweenSystem, _System);

        function TweenSystem() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _System.call.apply(_System, [this].concat(args)) || this;
          _this.actionMgr = new ActionManager();
          return _this;
        }

        var _proto = TweenSystem.prototype;

        /**
         * @en
         * The update will auto execute after all components update.
         * @zh
         * 此方法会在组件 update 之后自动执行。
         * @param dt @en The delta time @zh 间隔时间
         */
        _proto.update = function update(dt) {
          if (!EDITOR || cclegacy.GAME_VIEW || this._executeInEditMode) {
            this.actionMgr.update(dt);
          }
        };

        _createClass(TweenSystem, [{
          key: "ActionManager",
          get:
          /**
           * @en
           * Gets the action manager.
           * @zh
           * 获取动作管理器。
           */
          function get() {
            return this.actionMgr;
          }
        }]);

        return TweenSystem;
      }(System));

      TweenSystem.ID = 'TWEEN';
      TweenSystem.instance = void 0;
      director.on(Director.EVENT_INIT, function () {
        var sys = new TweenSystem();
        TweenSystem.instance = sys;
        director.registerSystem(TweenSystem.ID, sys, System.Priority.MEDIUM);
      });
    }
  };
});