System.register("q-bundled:///fs/cocos/animation/marionette/motion-state.js", ["../../core/data/decorators/index.js", "./state.js"], function (_export, _context) {
  "use strict";

  var ccclass, serializable, InteractiveState, _dec, _class, _class2, _initializer, _initializer2, _initializer3, _initializer4, MotionState;

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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
      _export("MotionState", MotionState = (_dec = ccclass('cc.animation.Motion'), _dec(_class = (_class2 = /*#__PURE__*/function (_InteractiveState) {
        _inheritsLoose(MotionState, _InteractiveState);

        function MotionState() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _InteractiveState.call.apply(_InteractiveState, [this].concat(args)) || this;
          _this.motion = _initializer && _initializer();
          _this.speed = _initializer2 && _initializer2();
          _this.speedMultiplier = _initializer3 && _initializer3();
          _this.speedMultiplierEnabled = _initializer4 && _initializer4();
          return _this;
        }

        var _proto = MotionState.prototype;

        _proto.copyTo = function copyTo(that) {
          var _this$motion$clone, _this$motion;

          _InteractiveState.prototype.copyTo.call(this, that);

          that.motion = (_this$motion$clone = (_this$motion = this.motion) === null || _this$motion === void 0 ? void 0 : _this$motion.clone()) !== null && _this$motion$clone !== void 0 ? _this$motion$clone : null;
          that.speed = this.speed;
          that.speedMultiplier = this.speedMultiplier;
          that.speedMultiplierEnabled = this.speedMultiplierEnabled;
          return this;
        };

        _proto._clone = function _clone() {
          var that = new MotionState();
          this.copyTo(that);
          return that;
        };

        return MotionState;
      }(InteractiveState), (_initializer = _applyDecoratedInitializer(_class2.prototype, "motion", [serializable], function () {
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