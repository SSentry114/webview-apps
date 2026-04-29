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
      _export("MorphWeightValueProxy", MorphWeightValueProxy = (_dec = ccclass('cc.animation.MorphWeightValueProxy'), _dec(_class = (_class2 = class MorphWeightValueProxy {
        constructor() {
          this.subMeshIndex = _initializer && _initializer();
          this.shapeIndex = _initializer2 && _initializer2();
        }

        forTarget(target) {
          return {
            set: value => {
              target.setWeight(value, this.subMeshIndex, this.shapeIndex);
            }
          };
        }

      }, (_initializer = _applyDecoratedInitializer(_class2.prototype, "subMeshIndex", [serializable], function () {
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


      _export("MorphWeightsValueProxy", MorphWeightsValueProxy = (_dec2 = ccclass('cc.animation.MorphWeightsValueProxy'), _dec2(_class4 = (_class5 = class MorphWeightsValueProxy {
        constructor() {
          this.subMeshIndex = _initializer3 && _initializer3();
        }

        forTarget(target) {
          return {
            set: value => {
              target.setWeights(value, this.subMeshIndex);
            }
          };
        }

      }, (_initializer3 = _applyDecoratedInitializer(_class5.prototype, "subMeshIndex", [serializable], function () {
        return 0;
      })), _class5)) || _class4));
      /**
       * @en
       * Value proxy factory for setting morph weights of each sub-mesh on model component target.
       * @zh
       * 用于设置模型组件目标上所有子网格形变权重的曲线值代理工厂。
       */


      _export("MorphWeightsAllValueProxy", MorphWeightsAllValueProxy = (_dec3 = ccclass('cc.animation.MorphWeightsAllValueProxy'), _dec3(_class7 = class MorphWeightsAllValueProxy {
        forTarget(target) {
          return {
            set: value => {
              var _target$mesh$struct$p, _target$mesh;

              const nSubMeshes = (_target$mesh$struct$p = (_target$mesh = target.mesh) === null || _target$mesh === void 0 ? void 0 : _target$mesh.struct.primitives.length) !== null && _target$mesh$struct$p !== void 0 ? _target$mesh$struct$p : 0;

              for (let iSubMesh = 0; iSubMesh < nSubMeshes; ++iSubMesh) {
                target.setWeights(value, iSubMesh);
              }
            }
          };
        }

      }) || _class7));
    }
  };
});