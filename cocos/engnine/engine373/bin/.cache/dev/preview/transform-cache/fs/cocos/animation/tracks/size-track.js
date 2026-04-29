System.register("q-bundled:///fs/cocos/animation/tracks/size-track.js", ["../../core/data/decorators/index.js", "../../core/index.js", "../define.js", "./track.js", "./utils.js"], function (_export, _context) {
  "use strict";

  var ccclass, serializable, RealCurve, Size, CLASS_NAME_PREFIX_ANIM, createEvalSymbol, Channel, Track, maskIfEmpty, _dec, _class, _class2, _initializer, CHANNEL_NAMES, SizeTrack, SizeTrackEval;

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
    }, function (_coreIndexJs) {
      RealCurve = _coreIndexJs.RealCurve;
      Size = _coreIndexJs.Size;
    }, function (_defineJs) {
      CLASS_NAME_PREFIX_ANIM = _defineJs.CLASS_NAME_PREFIX_ANIM;
      createEvalSymbol = _defineJs.createEvalSymbol;
    }, function (_trackJs) {
      Channel = _trackJs.Channel;
      Track = _trackJs.Track;
    }, function (_utilsJs) {
      maskIfEmpty = _utilsJs.maskIfEmpty;
    }],
    execute: function () {
      CHANNEL_NAMES = ['Width', 'Height'];
      /**
       * @en
       * A size track animates a size attribute of target.
       * @zh
       * 尺寸轨道描述目标上某个尺寸属性的动画。
       */

      _export("SizeTrack", SizeTrack = (_dec = ccclass(CLASS_NAME_PREFIX_ANIM + "SizeTrack"), _dec(_class = (_class2 = /*#__PURE__*/function (_Track) {
        _inheritsLoose(SizeTrack, _Track);

        function SizeTrack() {
          var _this;

          _this = _Track.call(this) || this;
          _this._channels = _initializer && _initializer();
          _this._channels = new Array(2);

          for (var i = 0; i < _this._channels.length; ++i) {
            var channel = new Channel(new RealCurve());
            channel.name = CHANNEL_NAMES[i];
            _this._channels[i] = channel;
          }

          return _this;
        }
        /**
         * @en The width channel and the height channel of the track.
         * @zh 返回此轨道的宽度通道和高度通道。
         * @returns An readonly array in which
         * the first element is the width channel and the second element is the height channel.
         */


        var _proto = SizeTrack.prototype;

        _proto.channels = function channels() {
          return this._channels;
        }
        /**
         * @internal
         */
        ;

        _proto[createEvalSymbol] = function () {
          return new SizeTrackEval(maskIfEmpty(this._channels[0].curve), maskIfEmpty(this._channels[1].curve));
        };

        return SizeTrack;
      }(Track), (_initializer = _applyDecoratedInitializer(_class2.prototype, "_channels", [serializable], null)), _class2)) || _class));

      _export("SizeTrackEval", SizeTrackEval = /*#__PURE__*/function () {
        function SizeTrackEval(_width, _height) {
          this._result = new Size();
          this._width = _width;
          this._height = _height;
        }

        var _proto2 = SizeTrackEval.prototype;

        _proto2.evaluate = function evaluate(time, runtimeBinding) {
          if ((!this._width || !this._height) && runtimeBinding.getValue) {
            var size = runtimeBinding.getValue();
            this._result.x = size.x;
            this._result.y = size.y;
          }

          if (this._width) {
            this._result.width = this._width.evaluate(time);
          }

          if (this._height) {
            this._result.height = this._height.evaluate(time);
          }

          return this._result;
        };

        return SizeTrackEval;
      }());
    }
  };
});