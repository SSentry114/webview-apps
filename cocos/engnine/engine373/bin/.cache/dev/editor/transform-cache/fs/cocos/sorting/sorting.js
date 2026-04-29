System.register("q-bundled:///fs/cocos/sorting/sorting.js", ["../core/data/decorators/index.js", "../core/math/index.js", "./sorting-layers.js", "../scene-graph/component.js", "../core/platform/debug.js"], function (_export, _context) {
  "use strict";

  var ccclass, disallowMultiple, editable, executeInEditMode, menu, range, serializable, type, clamp, SortingLayers, Component, warnID, _dec, _dec2, _dec3, _dec4, _class, _class2, _initializer, _initializer2, MAX_INT16, MIN_INT16, Sorting;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      disallowMultiple = _coreDataDecoratorsIndexJs.disallowMultiple;
      editable = _coreDataDecoratorsIndexJs.editable;
      executeInEditMode = _coreDataDecoratorsIndexJs.executeInEditMode;
      menu = _coreDataDecoratorsIndexJs.menu;
      range = _coreDataDecoratorsIndexJs.range;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      type = _coreDataDecoratorsIndexJs.type;
    }, function (_coreMathIndexJs) {
      clamp = _coreMathIndexJs.clamp;
    }, function (_sortingLayersJs) {
      SortingLayers = _sortingLayersJs.SortingLayers;
    }, function (_sceneGraphComponentJs) {
      Component = _sceneGraphComponentJs.Component;
    }, function (_corePlatformDebugJs) {
      warnID = _corePlatformDebugJs.warnID;
    }],
    execute: function () {
      MAX_INT16 = (1 << 15) - 1;
      MIN_INT16 = -1 << 15;
      /**
       * @en
       * Render sort component. This component must be placed on a node with a [[MeshRenderer]] or [[SpriteRenderer]] component.
       *
       * @zh
       * 渲染排序组件。该组件必须放置在带有 [[MeshRenderer]] 或者 [[SpriteRenderer]] 组件的节点上。
       */

      _export("Sorting", Sorting = (_dec = ccclass('cc.Sorting'), _dec2 = menu('Sorting/Sorting'), _dec3 = type(SortingLayers.Enum), _dec4 = range([MIN_INT16, MAX_INT16, 1]), _dec(_class = _dec2(_class = disallowMultiple(_class = executeInEditMode(_class = (_class2 = class Sorting extends Component {
        constructor(...args) {
          super(...args);
          this._sortingLayer = _initializer && _initializer();
          this._sortingOrder = _initializer2 && _initializer2();
          this._modelRenderer = null;
        }

        /**
         * @zh 组件所属排序层 id，影响组件的渲染排序。
         * @en The sorting layer id of the component, which affects the rendering order of the component.
         */
        get sortingLayer() {
          return this._sortingLayer;
        }

        set sortingLayer(val) {
          if (val === this._sortingLayer || !SortingLayers.isLayerValid(val)) return;
          this._sortingLayer = val;

          this._updateSortingPriority();
        }
        /**
         * @zh 组件在当前排序层中的顺序，在默认排序规则中，越小越先渲染。
         * @en Model Renderer's order within a sorting layer. In the default sorting rule, smaller values are rendered first.
         */


        get sortingOrder() {
          return this._sortingOrder;
        }

        set sortingOrder(val) {
          if (val === this._sortingOrder) return;
          this._sortingOrder = clamp(val, MIN_INT16, MAX_INT16);

          this._updateSortingPriority();
        }

        __preload() {
          this._modelRenderer = this.getComponent('cc.ModelRenderer');

          if (!this._modelRenderer) {
            warnID(16301, this.node.name);
          }

          this._updateSortingPriority();
        }

        _updateSortingPriority() {
          const sortingLayerValue = SortingLayers.getLayerIndex(this._sortingLayer);
          const sortingPriority = SortingLayers.getSortingPriority(sortingLayerValue, this._sortingOrder);

          if (this._modelRenderer && this._modelRenderer.isValid) {
            this._modelRenderer.priority = sortingPriority;
          }
        }

      }, (_applyDecoratedDescriptor(_class2.prototype, "sortingLayer", [editable, _dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "sortingLayer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sortingOrder", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "sortingOrder"), _class2.prototype), _initializer = _applyDecoratedInitializer(_class2.prototype, "_sortingLayer", [serializable], function () {
        return SortingLayers.Enum.default;
      }), _initializer2 = _applyDecoratedInitializer(_class2.prototype, "_sortingOrder", [serializable], function () {
        return 0;
      })), _class2)) || _class) || _class) || _class) || _class));
    }
  };
});