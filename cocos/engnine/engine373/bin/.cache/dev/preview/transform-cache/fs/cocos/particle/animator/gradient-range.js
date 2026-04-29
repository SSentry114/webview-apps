System.register("q-bundled:///fs/cocos/particle/animator/gradient-range.js", ["../../core/data/decorators/index.js", "../../../../virtual/internal%253Aconstants.js", "../../core/index.js", "./gradient.js", "../../asset/assets/index.js", "../../asset/assets/asset-enum.js"], function (_export, _context) {
  "use strict";

  var ccclass, type, serializable, editable, EDITOR, Color, Enum, cclegacy, Gradient, AlphaKey, ColorKey, Texture2D, PixelFormat, Filter, WrapMode, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _initializer, _initializer2, _initializer3, _initializer4, _initializer5, _initializer6, _initializer7, _class3, _temp, SerializableTable, Mode, GradientRange;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _applyDecoratedInitializer(target, property, decorators, initializer) {
    return decorators.slice().reverse().reduce(function (decoratedInitializer, decorator) {
      return decorator(target, property, decoratedInitializer) || decoratedInitializer;
    }, initializer);
  }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function evaluateGradient(gr, time, index) {
    switch (gr.mode) {
      case Mode.Color:
        return gr.color;

      case Mode.TwoColors:
        return index === 0 ? gr.colorMin : gr.colorMax;

      case Mode.RandomColor:
        return gr.gradient.randomColor();

      case Mode.Gradient:
        return gr.gradient.evaluate(time);

      case Mode.TwoGradients:
        return index === 0 ? gr.gradientMin.evaluate(time) : gr.gradientMax.evaluate(time);

      default:
        return gr.color;
    }
  }

  function evaluateHeight(gr) {
    switch (gr.mode) {
      case Mode.TwoColors:
        return 2;

      case Mode.TwoGradients:
        return 2;

      default:
        return 1;
    }
  }

  function packGradientRange(tex, data, samples, gr) {
    var height = evaluateHeight(gr);
    var len = samples * height * 4;

    if (data === null || data.length !== len) {
      data = new Uint8Array(samples * height * 4);
    }

    var interval = 1.0 / (samples - 1);
    var offset = 0;

    for (var h = 0; h < height; h++) {
      for (var j = 0; j < samples; j++) {
        var color = evaluateGradient(gr, interval * j, h);
        data[offset] = color.r;
        data[offset + 1] = color.g;
        data[offset + 2] = color.b;
        data[offset + 3] = color.a;
        offset += 4;
      }
    }

    if (tex === null || samples !== tex.width || height !== tex.height) {
      if (tex) {
        tex.destroy();
      }

      tex = new Texture2D();
      tex.create(samples, height, PixelFormat.RGBA8888);
      tex.setFilters(Filter.LINEAR, Filter.LINEAR);
      tex.setWrapMode(WrapMode.CLAMP_TO_EDGE, WrapMode.CLAMP_TO_EDGE);
    }

    tex.uploadData(data);
    return {
      texture: tex,
      texdata: data
    };
  }

  _export("packGradientRange", packGradientRange);

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      type = _coreDataDecoratorsIndexJs.type;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      editable = _coreDataDecoratorsIndexJs.editable;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_coreIndexJs) {
      Color = _coreIndexJs.Color;
      Enum = _coreIndexJs.Enum;
      cclegacy = _coreIndexJs.cclegacy;
    }, function (_gradientJs) {
      Gradient = _gradientJs.default;
      AlphaKey = _gradientJs.AlphaKey;
      ColorKey = _gradientJs.ColorKey;
    }, function (_assetAssetsIndexJs) {
      Texture2D = _assetAssetsIndexJs.Texture2D;
    }, function (_assetAssetsAssetEnumJs) {
      PixelFormat = _assetAssetsAssetEnumJs.PixelFormat;
      Filter = _assetAssetsAssetEnumJs.Filter;
      WrapMode = _assetAssetsAssetEnumJs.WrapMode;
    }],
    execute: function () {
      SerializableTable = EDITOR && [['_mode', 'color'], ['_mode', 'gradient'], ['_mode', 'colorMin', 'colorMax'], ['_mode', 'gradientMin', 'gradientMax'], ['_mode', 'gradient']];
      /**
       * @en
       * Gradinet is a component to calculate color value. It contains 5 modes:
       * Color is just the color value all the time.
       * Two Colors has 2 color values to interpolate the color value.
       * Gradient value is generated by many color keys interpolation.
       * Two Gradients has 2 gradients. The value is calculated by interpolation of the 2 gradients value.
       * Random Color has one gradient. The value is get from color keys of the gradient randomly.
       * @zh
       * 渐变曲线是用来计算颜色值的控件，它包含五种模式：
       * 单色从头到尾只返回一种颜色值。
       * 双色包含两个颜色值，返回两种颜色之间的插值。
       * 渐变曲线包含许多颜色帧，返回颜色帧之间的插值。
       * 双渐变曲线包含两个渐变曲线，对两个渐变曲线返回的颜色值再进行插值。
       * 随机颜色包含一个颜色曲线，从曲线中随机获取颜色值。
       */

      Mode = Enum({
        Color: 0,
        Gradient: 1,
        TwoColors: 2,
        TwoGradients: 3,
        RandomColor: 4
      });
      /**
       * @en
       * GradientRange is a data structure which contains some constant colors or gradients.
       * Calculate the color by its mode and particle system will use it to change particle attribute associated with it.
       * Refer [[GradientRange.Mode]] to see the detail of calculation mode.
       * @zh
       * GradientRange 是一类数据结构，其包含了多个常数颜色或渐变色，计算时其将根据计算模式计算最终颜色，粒子系统使用此数据结构对所有的粒子的属性进行修改。
       * 详细的计算模式请参考 [[GradientRange.Mode]] 的解释。
       */

      _export("default", GradientRange = (_dec = ccclass('cc.GradientRange'), _dec2 = type(Mode), _dec3 = type(Gradient), _dec4 = type(Gradient), _dec5 = type(Gradient), _dec6 = type(Mode), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function () {
        function GradientRange() {
          this.color = _initializer && _initializer();
          this.colorMin = _initializer2 && _initializer2();
          this.colorMax = _initializer3 && _initializer3();
          this.gradient = _initializer4 && _initializer4();
          this.gradientMin = _initializer5 && _initializer5();
          this.gradientMax = _initializer6 && _initializer6();
          this._mode = _initializer7 && _initializer7();
          this._color = Color.WHITE.clone();
        }

        var _proto = GradientRange.prototype;

        /**
         * @en Calculate gradient value.
         * @zh 计算颜色渐变曲线数值。
         * @param time @en Normalized time to interpolate. @zh 用于插值的归一化时间。
         * @param rndRatio @en Interpolation ratio when mode is TwoColors or TwoGradients.
         *                     Particle attribute will pass in a random number to get a random result.
         *                 @zh 当模式为双色或双渐变色时，使用的插值比例，通常粒子系统会传入一个随机数以获得一个随机结果。
         * @returns @en Gradient value. @zh 颜色渐变曲线的值。
         */
        _proto.evaluate = function evaluate(time, rndRatio) {
          switch (this._mode) {
            case Mode.Color:
              return this.color;

            case Mode.TwoColors:
              Color.lerp(this._color, this.colorMin, this.colorMax, rndRatio);
              return this._color;

            case Mode.RandomColor:
              return this.gradient.randomColor();

            case Mode.Gradient:
              return this.gradient.evaluate(time);

            case Mode.TwoGradients:
              Color.lerp(this._color, this.gradientMin.evaluate(time), this.gradientMax.evaluate(time), rndRatio);
              return this._color;

            default:
              return this.color;
          }
        }
        /**
         * @deprecated since v3.5.0, this is an engine private interface that will be removed in the future.
         */
        ;

        _proto._onBeforeSerialize = function _onBeforeSerialize(props) {
          return SerializableTable[this._mode];
        };

        _createClass(GradientRange, [{
          key: "mode",
          get:
          /**
           * @en Gets/Sets color gradient mode to use. See [[Mode]].
           * @zh 使用的渐变色类型 参考 [[Mode]]。
           */
          function get() {
            return this._mode;
          },
          set: function set(m) {
            if (EDITOR && !cclegacy.GAME_VIEW) {
              if (m === Mode.RandomColor) {
                if (this.gradient.colorKeys.length === 0) {
                  this.gradient.colorKeys.push(new ColorKey());
                }

                if (this.gradient.alphaKeys.length === 0) {
                  this.gradient.alphaKeys.push(new AlphaKey());
                }
              }
            }

            this._mode = m;
          }
          /**
           * @en The gradient mode. See [[Mode]].
           * @zh 渐变色类型 参考 [[Mode]]。
           */

        }]);

        return GradientRange;
      }(), _class3.Mode = Mode, _temp), (_applyDecoratedDescriptor(_class2.prototype, "mode", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "mode"), _class2.prototype), _initializer = _applyDecoratedInitializer(_class2.prototype, "color", [serializable, editable], function () {
        return Color.WHITE.clone();
      }), _initializer2 = _applyDecoratedInitializer(_class2.prototype, "colorMin", [serializable, editable], function () {
        return Color.WHITE.clone();
      }), _initializer3 = _applyDecoratedInitializer(_class2.prototype, "colorMax", [serializable, editable], function () {
        return Color.WHITE.clone();
      }), _initializer4 = _applyDecoratedInitializer(_class2.prototype, "gradient", [_dec3], function () {
        return new Gradient();
      }), _initializer5 = _applyDecoratedInitializer(_class2.prototype, "gradientMin", [_dec4], function () {
        return new Gradient();
      }), _initializer6 = _applyDecoratedInitializer(_class2.prototype, "gradientMax", [_dec5], function () {
        return new Gradient();
      }), _initializer7 = _applyDecoratedInitializer(_class2.prototype, "_mode", [_dec6], function () {
        return Mode.Color;
      })), _class2)) || _class));
    }
  };
});