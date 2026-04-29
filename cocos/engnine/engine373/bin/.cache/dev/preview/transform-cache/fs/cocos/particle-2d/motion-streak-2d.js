System.register("q-bundled:///fs/cocos/particle-2d/motion-streak-2d.js", ["../core/data/decorators/index.js", "../../../virtual/internal%253Aconstants.js", "../2d/framework/index.js", "../asset/assets/texture-2d.js", "../core/index.js"], function (_export, _context) {
  "use strict";

  var ccclass, executeInEditMode, serializable, playOnFocus, menu, help, editable, type, EDITOR, UIRenderer, Texture2D, Vec2, cclegacy, _dec, _dec2, _dec3, _dec4, _class, _class2, _initializer, _initializer2, _initializer3, _initializer4, _initializer5, _initializer6, _class3, _temp, Point, MotionStreak;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedInitializer(target, property, decorators, initializer) {
    return decorators.slice().reverse().reduce(function (decoratedInitializer, decorator) {
      return decorator(target, property, decoratedInitializer) || decoratedInitializer;
    }, initializer);
  }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      executeInEditMode = _coreDataDecoratorsIndexJs.executeInEditMode;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      playOnFocus = _coreDataDecoratorsIndexJs.playOnFocus;
      menu = _coreDataDecoratorsIndexJs.menu;
      help = _coreDataDecoratorsIndexJs.help;
      editable = _coreDataDecoratorsIndexJs.editable;
      type = _coreDataDecoratorsIndexJs.type;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_dFrameworkIndexJs) {
      UIRenderer = _dFrameworkIndexJs.UIRenderer;
    }, function (_assetAssetsTexture2dJs) {
      Texture2D = _assetAssetsTexture2dJs.Texture2D;
    }, function (_coreIndexJs) {
      Vec2 = _coreIndexJs.Vec2;
      cclegacy = _coreIndexJs.cclegacy;
    }],
    execute: function () {
      Point = /*#__PURE__*/function () {
        function Point(point, dir) {
          this.point = new Vec2();
          this.dir = new Vec2();
          this.distance = 0;
          this.time = 0;
          if (point) this.point.set(point);
          if (dir) this.dir.set(dir);
        }

        var _proto = Point.prototype;

        _proto.setPoint = function setPoint(x, y) {
          this.point.x = x;
          this.point.y = y;
        };

        _proto.setDir = function setDir(x, y) {
          this.dir.x = x;
          this.dir.y = y;
        };

        return Point;
      }();
      /**
       * @en
       * cc.MotionStreak manages a Ribbon based on it's motion in absolute space.                 <br/>
       * You construct it with a fadeTime, minimum segment size, texture path, texture            <br/>
       * length and color. The fadeTime controls how long it takes each vertex in                 <br/>
       * the streak to fade out, the minimum segment size it how many pixels the                  <br/>
       * streak will move before adding a new ribbon segment, and the texture                     <br/>
       * length is the how many pixels the texture is stretched across. The texture               <br/>
       * is vertically aligned along the streak segment.
       * @zh 运动轨迹，用于游戏对象的运动轨迹上实现拖尾渐隐效果。
       */


      _export("MotionStreak", MotionStreak = (_dec = ccclass('cc.MotionStreak'), _dec2 = menu('Effects/MotionStreak'), _dec3 = help('i18n:COMPONENT.help_url.motionStreak'), _dec4 = type(Texture2D), _dec(_class = executeInEditMode(_class = playOnFocus(_class = _dec2(_class = _dec3(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_UIRenderer) {
        _inheritsLoose(MotionStreak, _UIRenderer);

        function MotionStreak() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _UIRenderer.call.apply(_UIRenderer, [this].concat(args)) || this;
          _this._preview = _initializer && _initializer();
          _this._fadeTime = _initializer2 && _initializer2();
          _this._minSeg = _initializer3 && _initializer3();
          _this._stroke = _initializer4 && _initializer4();
          _this._texture = _initializer5 && _initializer5();
          _this._fastMode = _initializer6 && _initializer6();
          _this._points = [];
          return _this;
        }

        var _proto2 = MotionStreak.prototype;

        _proto2.onEnable = function onEnable() {
          _UIRenderer.prototype.onEnable.call(this);

          this.reset();
        };

        _proto2._flushAssembler = function _flushAssembler() {
          var assembler = MotionStreak.Assembler.getAssembler(this);

          if (this._assembler !== assembler) {
            this._assembler = assembler;
          }

          if (!this.renderData) {
            if (this._assembler && this._assembler.createData) {
              this._renderData = this._assembler.createData(this);
              this.renderData.material = this.material;

              this._updateColor();
            }
          }
        };

        _proto2.onFocusInEditor = function onFocusInEditor() {
          if (this._preview) {
            this.reset();
          }
        };

        _proto2.onLostFocusInEditor = function onLostFocusInEditor() {
          if (this._preview) {
            this.reset();
          }
        }
        /**
         * @en Remove all living segments of the ribbon.
         * @zh 删除当前所有的拖尾片段。
         * @example
         * // Remove all living segments of the ribbon.
         * myMotionStreak.reset();
         */
        ;

        _proto2.reset = function reset() {
          this._points.length = 0;
          if (this.renderData) this.renderData.clear();
        };

        _proto2.lateUpdate = function lateUpdate(dt) {
          if (EDITOR && !cclegacy.GAME_VIEW && !this._preview) return;
          if (this._assembler) this._assembler.update(this, dt);
        }
        /**
         * @deprecated since v3.5.0, this is an engine private interface that will be removed in the future.
         */
        ;

        _proto2._render = function _render(render) {
          render.commitComp(this, this.renderData, this._texture, this._assembler, null);
        };

        _createClass(MotionStreak, [{
          key: "preview",
          get:
          /**
           * @en Preview the trailing effect in editor mode.
           * @zh 在编辑器模式下预览拖尾效果。
           */
          function get() {
            return this._preview;
          },
          set: function set(val) {
            this._preview = val;
            this.reset();
          }
          /**
           * @en The fade time to fade.
           * @zh 拖尾的渐隐时间，以秒为单位。
           * @example
           * motionStreak.fadeTime = 3;
           */

        }, {
          key: "fadeTime",
          get: function get() {
            return this._fadeTime;
          },
          set: function set(val) {
            this._fadeTime = val;
            this.reset();
          }
          /**
           * @en The minimum segment size.
           * @zh 拖尾之间最小距离。
           * @example
           * motionStreak.minSeg = 3;
           */

        }, {
          key: "minSeg",
          get: function get() {
            return this._minSeg;
          },
          set: function set(val) {
            this._minSeg = val;
          }
          /**
           * @en The stroke's width.
           * @zh 拖尾的宽度。
           * @example
           * motionStreak.stroke = 64;
           */

        }, {
          key: "stroke",
          get: function get() {
            return this._stroke;
          },
          set: function set(val) {
            this._stroke = val;
          }
          /**
           * @en The texture of the MotionStreak.
           * @zh 拖尾的贴图。
           * @example
           * motionStreak.texture = newTexture;
           */

        }, {
          key: "texture",
          get: function get() {
            return this._texture;
          },
          set: function set(val) {
            if (this._texture === val) return;
            this._texture = val;
          }
          /**
           * @en The fast Mode.
           * @zh 是否启用了快速模式。当启用快速模式，新的点会被更快地添加，但精度较低。
           * @example
           * motionStreak.fastMode = true;
           */

        }, {
          key: "fastMode",
          get: function get() {
            return this._fastMode;
          },
          set: function set(val) {
            this._fastMode = val;
          }
        }, {
          key: "points",
          get: function get() {
            return this._points;
          }
        }]);

        return MotionStreak;
      }(UIRenderer), _class3.Point = Point, _temp), (_applyDecoratedDescriptor(_class2.prototype, "preview", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "preview"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fadeTime", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "fadeTime"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "minSeg", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "minSeg"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "stroke", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "stroke"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "texture", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "texture"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fastMode", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "fastMode"), _class2.prototype), _initializer = _applyDecoratedInitializer(_class2.prototype, "_preview", [serializable], function () {
        return false;
      }), _initializer2 = _applyDecoratedInitializer(_class2.prototype, "_fadeTime", [serializable], function () {
        return 1;
      }), _initializer3 = _applyDecoratedInitializer(_class2.prototype, "_minSeg", [serializable], function () {
        return 1;
      }), _initializer4 = _applyDecoratedInitializer(_class2.prototype, "_stroke", [serializable], function () {
        return 64;
      }), _initializer5 = _applyDecoratedInitializer(_class2.prototype, "_texture", [serializable], function () {
        return null;
      }), _initializer6 = _applyDecoratedInitializer(_class2.prototype, "_fastMode", [serializable], function () {
        return false;
      })), _class2)) || _class) || _class) || _class) || _class) || _class));
    }
  };
});