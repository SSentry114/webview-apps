System.register("q-bundled:///fs/cocos/2d/components/label-outline.js", ["../../core/data/decorators/index.js", "../../scene-graph/component.js", "../../core/index.js", "./label.js"], function (_export, _context) {
  "use strict";

  var ccclass, help, executionOrder, menu, tooltip, requireComponent, executeInEditMode, serializable, Component, Color, cclegacy, Label, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _initializer, _initializer2, LabelOutline;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _applyDecoratedInitializer(target, property, decorators, initializer) {
    return decorators.slice().reverse().reduce(function (decoratedInitializer, decorator) {
      return decorator(target, property, decoratedInitializer) || decoratedInitializer;
    }, initializer);
  }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      help = _coreDataDecoratorsIndexJs.help;
      executionOrder = _coreDataDecoratorsIndexJs.executionOrder;
      menu = _coreDataDecoratorsIndexJs.menu;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      requireComponent = _coreDataDecoratorsIndexJs.requireComponent;
      executeInEditMode = _coreDataDecoratorsIndexJs.executeInEditMode;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_sceneGraphComponentJs) {
      Component = _sceneGraphComponentJs.Component;
    }, function (_coreIndexJs) {
      Color = _coreIndexJs.Color;
      cclegacy = _coreIndexJs.cclegacy;
    }, function (_labelJs) {
      Label = _labelJs.Label;
    }],
    execute: function () {
      /**
       * @en
       * Outline effect used to change the display, only for system fonts or TTF fonts.
       *
       * @zh
       * 描边效果组件,用于字体描边,只能用于系统字体。
       *
       * @example
       * ```ts
       * import { Node, Label, LabelOutline } from 'cc';
       * // Create a new node and add label components.
       * const node = new Node("New Label");
       * const label = node.addComponent(Label);
       * const outline = node.addComponent(LabelOutline);
       * node.parent = this.node;
       * ```
       */
      _export("LabelOutline", LabelOutline = (_dec = ccclass('cc.LabelOutline'), _dec2 = help('i18n:cc.LabelOutline'), _dec3 = executionOrder(110), _dec4 = menu('UI/LabelOutline'), _dec5 = requireComponent(Label), _dec6 = tooltip('i18n:labelOutline.color'), _dec7 = tooltip('i18n:labelOutline.width'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = executeInEditMode(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LabelOutline, _Component);

        function LabelOutline() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._color = _initializer && _initializer();
          _this._width = _initializer2 && _initializer2();
          return _this;
        }

        var _proto = LabelOutline.prototype;

        _proto.onEnable = function onEnable() {
          this._updateRenderData();
        };

        _proto.onDisable = function onDisable() {
          this._updateRenderData();
        };

        _proto._updateRenderData = function _updateRenderData() {
          var label = this.node.getComponent(Label);

          if (label) {
            label.updateRenderData(true);
          }
        };

        _createClass(LabelOutline, [{
          key: "color",
          get:
          /**
           * @en
           * Outline color.
           *
           * @zh
           * 改变描边的颜色。
           *
           * @example
           * ```ts
           * import { Color } from 'cc';
           * outline.color = new Color(0.5, 0.3, 0.7, 1.0);
           * ```
           */
          function get() {
            return this._color;
          },
          set: function set(value) {
            if (this._color === value) {
              return;
            }

            this._color.set(value);

            this._updateRenderData();
          }
          /**
           * @en
           * Change the outline width.
           *
           * @zh
           * 改变描边的宽度。
           *
           * @example
           * ```ts
           * outline.width = 3;
           * ```
           */

        }, {
          key: "width",
          get: function get() {
            return this._width;
          },
          set: function set(value) {
            if (this._width === value) {
              return;
            }

            this._width = value;

            this._updateRenderData();
          }
        }]);

        return LabelOutline;
      }(Component), (_initializer = _applyDecoratedInitializer(_class2.prototype, "_color", [serializable], function () {
        return new Color(0, 0, 0, 255);
      }), _initializer2 = _applyDecoratedInitializer(_class2.prototype, "_width", [serializable], function () {
        return 2;
      }), _applyDecoratedDescriptor(_class2.prototype, "color", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "color"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "width", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "width"), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class) || _class) || _class));

      cclegacy.LabelOutline = LabelOutline;
    }
  };
});