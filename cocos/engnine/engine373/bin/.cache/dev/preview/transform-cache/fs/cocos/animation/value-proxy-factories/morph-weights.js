System.register("q-bundled:///fs/cocos/animation/value-proxy-factories/morph-weights.js", ["../../core/data/decorators/index.js"], function (_export, _context) {
  "use strict";

  var ccclass, serializable, _dec, _class, _class2, _initializer, _initializer2, _dec2, _class4, _class5, _initializer3, _dec3, _class7, MorphWeightValueProxy, MorphWeightsValueProxy, MorphWeightsAllValueProxy;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    }],
    execute: function () {
      /**
       * @en
       * Value proxy factory for setting morph weights of specified sub-mesh on model component target.
       * @zh
       * 用于设置模型组件目标上指定子网格的指定形状的形变权重的曲线值代理工厂。
       */
      _export("MorphWeightValueProxy", MorphWeightValueProxy = (_dec = ccclass('cc.animation.MorphWeightValueProxy'), _dec(_class = (_class2 = /*#__PURE__*/function () {
        function MorphWeightValueProxy() {
          this.subMeshIndex = _initializer && _initializer();
          this.shapeIndex = _initializer2 && _initializer2();
        }

        var _proto = MorphWeightValueProxy.prototype;

        _proto.forTarget = function forTarget(target) {
          var _this = this;

          return {
            set: function set(value) {
              target.setWeight(value, _this.subMeshIndex, _this.shapeIndex);
            }
          };
        };

        return MorphWeightValueProxy;
      }(), (_initializer = _applyDecoratedInitializer(_class2.prototype, "subMeshIndex", [serializable], function () {
        return 0;
      }), _initializer2 = _applyDecoratedInitializer(_class2.prototype, "shapeIndex", [serializable], function () {
        return 0;
      })), _class2)) || _class));
      /**
       * @en
       * Value proxy factory for setting morph weights of specified sub-mesh on model component target.
       * @zh
       * 用于设置模型组件目标上指定子网格形变权重的曲线值代理工厂。
       */


      _export("MorphWeightsValueProxy", MorphWeightsValueProxy = (_dec2 = ccclass('cc.animation.MorphWeightsValueProxy'), _dec2(_class4 = (_class5 = /*#__PURE__*/function () {
        function MorphWeightsValueProxy() {
          this.subMeshIndex = _initializer3 && _initializer3();
        }

        var _proto2 = MorphWeightsValueProxy.prototype;

        _proto2.forTarget = function forTarget(target) {
          var _this2 = this;

          return {
            set: function set(value) {
              target.setWeights(value, _this2.subMeshIndex);
            }
          };
        };

        return MorphWeightsValueProxy;
      }(), (_initializer3 = _applyDecoratedInitializer(_class5.prototype, "subMeshIndex", [serializable], function () {
        return 0;
      })), _class5)) || _class4));
      /**
       * @en
       * Value proxy factory for setting morph weights of each sub-mesh on model component target.
       * @zh
       * 用于设置模型组件目标上所有子网格形变权重的曲线值代理工厂。
       */


      _export("MorphWeightsAllValueProxy", MorphWeightsAllValueProxy = (_dec3 = ccclass('cc.animation.MorphWeightsAllValueProxy'), _dec3(_class7 = /*#__PURE__*/function () {
        function MorphWeightsAllValueProxy() {}

        var _proto3 = MorphWeightsAllValueProxy.prototype;

        _proto3.forTarget = function forTarget(target) {
          return {
            set: function set(value) {
              var _target$mesh$struct$p, _target$mesh;

              var nSubMeshes = (_target$mesh$struct$p = (_target$mesh = target.mesh) === null || _target$mesh === void 0 ? void 0 : _target$mesh.struct.primitives.length) !== null && _target$mesh$struct$p !== void 0 ? _target$mesh$struct$p : 0;

              for (var iSubMesh = 0; iSubMesh < nSubMeshes; ++iSubMesh) {
                target.setWeights(value, iSubMesh);
              }
            }
          };
        };

        return MorphWeightsAllValueProxy;
      }()) || _class7));
    }
  };
});