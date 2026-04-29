System.register("q-bundled:///fs/cocos/physics/cannon/constraints/cannon-lock-constraint.js", ["@cocos/cannon", "./cannon-constraint.js"], function (_export, _context) {
  "use strict";

  var CANNON, CannonConstraint, CannonLockConstraint;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_cocosCannon) {
      CANNON = _cocosCannon.default;
    }, function (_cannonConstraintJs) {
      CannonConstraint = _cannonConstraintJs.CannonConstraint;
    }],
    execute: function () {
      _export("CannonLockConstraint", CannonLockConstraint = /*#__PURE__*/function (_CannonConstraint) {
        _inheritsLoose(CannonLockConstraint, _CannonConstraint);

        function CannonLockConstraint() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _CannonConstraint.call.apply(_CannonConstraint, [this].concat(args)) || this;
          _this._breakForce = 1e9;
          return _this;
        }

        var _proto = CannonLockConstraint.prototype;

        _proto.setBreakForce = function setBreakForce(v) {
          this._breakForce = v;
          this.updateFrame();
        };

        _proto.setBreakTorque = function setBreakTorque(v) {// not supported
        };

        _proto.onComponentSet = function onComponentSet() {
          this._breakForce = this.constraint.breakForce;
          this.updateFrame();
        };

        _proto.updateFrame = function updateFrame() {
          var bodyA = this._rigidBody.body.impl;
          var cb = this.constraint.connectedBody;
          var bodyB = CANNON.World.staticBody;

          if (cb) {
            bodyB = cb.body.impl;
          }

          this._impl = new CANNON.LockConstraint(bodyA, bodyB, {
            maxForce: this._breakForce
          });
        };

        _proto.updateScale0 = function updateScale0() {
          this.updateFrame();
        };

        _proto.updateScale1 = function updateScale1() {
          this.updateFrame();
        };

        _createClass(CannonLockConstraint, [{
          key: "impl",
          get: function get() {
            return this._impl;
          }
        }, {
          key: "constraint",
          get: function get() {
            return this._com;
          }
        }]);

        return CannonLockConstraint;
      }(CannonConstraint));
    }
  };
});