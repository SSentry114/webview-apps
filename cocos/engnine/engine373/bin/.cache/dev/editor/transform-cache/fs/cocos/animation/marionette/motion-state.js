System.register("q-bundled:///fs/cocos/animation/marionette/motion-state.js", ["../../core/data/decorators/index.js", "./state.js"], function (_export, _context) {
  "use strict";

  var ccclass, serializable, InteractiveState, _dec, _class, _class2, _initializer, _initializer2, _initializer3, _initializer4, MotionState;

  function _applyDecoratedInitializer(target, property, decorators, initializer) {
    return decorators.slice().reverse().reduce(function (decoratedInitializer, decorator) {
      return decorator(target, property, decoratedInitializer) || decoratedInitializer;
    }, initializer);
  }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_stateJs) {
      InteractiveState = _stateJs.InteractiveState;
    }],
    execute: function () {
      _export("MotionState", MotionState = (_dec = ccclass('cc.animation.Motion'), _dec(_class = (_class2 = class MotionState extends InteractiveState {
        constructor(...args) {
          super(...args);
          this.motion = _initializer && _initializer();
          this.speed = _initializer2 && _initializer2();
          this.speedMultiplier = _initializer3 && _initializer3();
          this.speedMultiplierEnabled = _initializer4 && _initializer4();
        }

        copyTo(that) {
          var _this$motion$clone, _this$motion;

          super.copyTo(that);
          that.motion = (_this$motion$clone = (_this$motion = this.motion) === null || _this$motion === void 0 ? void 0 : _this$motion.clone()) !== null && _this$motion$clone !== void 0 ? _this$motion$clone : null;
          that.speed = this.speed;
          that.speedMultiplier = this.speedMultiplier;
          that.speedMultiplierEnabled = this.speedMultiplierEnabled;
          return this;
        }

        _clone() {
          const that = new MotionState();
          this.copyTo(that);
          return that;
        }

      }, (_initializer = _applyDecoratedInitializer(_class2.prototype, "motion", [serializable], function () {
        return null;
      }), _initializer2 = _applyDecoratedInitializer(_class2.prototype, "speed", [serializable], function () {
        return 1.0;
      }), _initializer3 = _applyDecoratedInitializer(_class2.prototype, "speedMultiplier", [serializable], function () {
        return '';
      }), _initializer4 = _applyDecoratedInitializer(_class2.prototype, "speedMultiplierEnabled", [serializable], function () {
        return false;
      })), _class2)) || _class));
    }
  };
});