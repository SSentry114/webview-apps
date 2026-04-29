System.register("q-bundled:///fs/cocos/animation/embedded-player/embedded-player.js", ["../../core/data/decorators/index.js", "../../core/index.js", "../define.js"], function (_export, _context) {
  "use strict";

  var ccclass, serializable, EditorExtendable, CLASS_NAME_PREFIX_ANIM, EmbeddedPlayable, EmbeddedPlayableState, _dec, _class, _class2, _initializer, _initializer2, _initializer3, _initializer4, EmbeddedPlayer;

  function _applyDecoratedInitializer(target, property, decorators, initializer) {
    return decorators.slice().reverse().reduce(function (decoratedInitializer, decorator) {
      return decorator(target, property, decoratedInitializer) || decoratedInitializer;
    }, initializer);
  }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  _export({
    EmbeddedPlayable: void 0,
    EmbeddedPlayableState: void 0
  });

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_coreIndexJs) {
      EditorExtendable = _coreIndexJs.EditorExtendable;
    }, function (_defineJs) {
      CLASS_NAME_PREFIX_ANIM = _defineJs.CLASS_NAME_PREFIX_ANIM;
    }],
    execute: function () {
      _export("EmbeddedPlayer", EmbeddedPlayer = (_dec = ccclass(`${CLASS_NAME_PREFIX_ANIM}EmbeddedPlayer`), _dec(_class = (_class2 = class EmbeddedPlayer extends EditorExtendable {
        constructor(...args) {
          super(...args);
          this.begin = _initializer && _initializer();
          this.end = _initializer2 && _initializer2();
          this.reconciledSpeed = _initializer3 && _initializer3();
          this.playable = _initializer4 && _initializer4();
        }

      }, (_initializer = _applyDecoratedInitializer(_class2.prototype, "begin", [serializable], function () {
        return 0.0;
      }), _initializer2 = _applyDecoratedInitializer(_class2.prototype, "end", [serializable], function () {
        return 0.0;
      }), _initializer3 = _applyDecoratedInitializer(_class2.prototype, "reconciledSpeed", [serializable], function () {
        return false;
      }), _initializer4 = _applyDecoratedInitializer(_class2.prototype, "playable", [serializable], function () {
        return null;
      })), _class2)) || _class));

      _export("EmbeddedPlayable", EmbeddedPlayable = class EmbeddedPlayable {});

      _export("EmbeddedPlayableState", EmbeddedPlayableState = class EmbeddedPlayableState {
        constructor(randomAccess) {
          this._randomAccess = randomAccess;
        }
        /**
         * @zh
         * 是否可以随意调整此播放器到任何时间。
         * @en
         * Indicates if this player can be adjusted to any time.
         */


        get randomAccess() {
          return this._randomAccess;
        }
        /**
         * @zh
         * 销毁此播放器。
         * @zh
         * Destroys this player state.
         */


        setTime(_time) {}

      });
    }
  };
});