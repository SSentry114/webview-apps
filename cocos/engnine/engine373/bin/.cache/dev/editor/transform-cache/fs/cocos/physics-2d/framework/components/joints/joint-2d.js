System.register("q-bundled:///fs/cocos/physics-2d/framework/components/joints/joint-2d.js", ["../../../../../../virtual/internal%253Aconstants.js", "../../../../core/index.js", "../rigid-body-2d.js", "../../physics-types.js", "../../physics-selector.js", "../../../../scene-graph/index.js"], function (_export, _context) {
  "use strict";

  var EDITOR, Vec2, _decorator, cclegacy, tooltip, serializable, RigidBody2D, EJoint2DType, createJoint, Component, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _initializer, _initializer2, _initializer3, _initializer4, ccclass, type, property, Joint2D;

  function _applyDecoratedInitializer(target, property, decorators, initializer) {
    return decorators.slice().reverse().reduce(function (decoratedInitializer, decorator) {
      return decorator(target, property, decoratedInitializer) || decoratedInitializer;
    }, initializer);
  }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_coreIndexJs) {
      Vec2 = _coreIndexJs.Vec2;
      _decorator = _coreIndexJs._decorator;
      cclegacy = _coreIndexJs.cclegacy;
      tooltip = _coreIndexJs.tooltip;
      serializable = _coreIndexJs.serializable;
    }, function (_rigidBody2dJs) {
      RigidBody2D = _rigidBody2dJs.RigidBody2D;
    }, function (_physicsTypesJs) {
      EJoint2DType = _physicsTypesJs.EJoint2DType;
    }, function (_physicsSelectorJs) {
      createJoint = _physicsSelectorJs.createJoint;
    }, function (_sceneGraphIndexJs) {
      Component = _sceneGraphIndexJs.Component;
    }],
    execute: function () {
      ({
        ccclass,
        type,
        property
      } = _decorator);

      _export("Joint2D", Joint2D = (_dec = ccclass('cc.Joint2D'), _dec2 = tooltip('i18n:physics2d.joint.anchor'), _dec3 = tooltip('i18n:physics2d.joint.connectedAnchor'), _dec4 = tooltip('i18n:physics2d.joint.collideConnected'), _dec5 = type(RigidBody2D), _dec6 = tooltip('i18n:physics2d.joint.connectedBody'), _dec(_class = (_class2 = class Joint2D extends Component {
        constructor(...args) {
          super(...args);
          this.anchor = _initializer && _initializer();
          this.connectedAnchor = _initializer2 && _initializer2();
          this.collideConnected = _initializer3 && _initializer3();
          this.connectedBody = _initializer4 && _initializer4();
          this._body = null;
          this._joint = null;
          this.TYPE = EJoint2DType.None;
        }

        get body() {
          return this._body;
        }

        get impl() {
          return this._joint;
        }

        onLoad() {
          if (!EDITOR || cclegacy.GAME_VIEW) {
            this._joint = createJoint(this.TYPE);

            this._joint.initialize(this);

            this._body = this.getComponent(RigidBody2D);
          }
        }

        onEnable() {
          if (this._joint && this._joint.onEnable) {
            this._joint.onEnable();
          }
        }

        onDisable() {
          if (this._joint && this._joint.onDisable) {
            this._joint.onDisable();
          }
        }

        start() {
          if (this._joint && this._joint.start) {
            this._joint.start();
          }
        }

        onDestroy() {
          if (this._joint && this._joint.onDestroy) {
            this._joint.onDestroy();
          }
        }

      }, (_initializer = _applyDecoratedInitializer(_class2.prototype, "anchor", [serializable, _dec2], function () {
        return new Vec2();
      }), _initializer2 = _applyDecoratedInitializer(_class2.prototype, "connectedAnchor", [serializable, _dec3], function () {
        return new Vec2();
      }), _initializer3 = _applyDecoratedInitializer(_class2.prototype, "collideConnected", [serializable, _dec4], function () {
        return false;
      }), _initializer4 = _applyDecoratedInitializer(_class2.prototype, "connectedBody", [_dec5, serializable, _dec6], function () {
        return null;
      })), _class2)) || _class));
    }
  };
});