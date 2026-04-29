System.register("q-bundled:///fs/cocos/animation/marionette/animation-controller.js", ["../../scene-graph/component.js", "./animation-graph.js", "../../core/index.js", "./graph-eval.js", "./animation-graph-variant.js", "./animation-graph-like.js"], function (_export, _context) {
  "use strict";

  var Component, AnimationGraph, _decorator, assertIsNonNullable, assertIsTrue, AnimationGraphEval, AnimationGraphVariant, AnimationGraphLike, _dec, _dec2, _dec3, _dec4, _class, _class2, _initializer, ccclass, menu, type, serializable, editable, formerlySerializedAs, AnimationController;

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
    setters: [function (_sceneGraphComponentJs) {
      Component = _sceneGraphComponentJs.Component;
    }, function (_animationGraphJs) {
      AnimationGraph = _animationGraphJs.AnimationGraph;
    }, function (_coreIndexJs) {
      _decorator = _coreIndexJs._decorator;
      assertIsNonNullable = _coreIndexJs.assertIsNonNullable;
      assertIsTrue = _coreIndexJs.assertIsTrue;
    }, function (_graphEvalJs) {
      AnimationGraphEval = _graphEvalJs.AnimationGraphEval;
    }, function (_animationGraphVariantJs) {
      AnimationGraphVariant = _animationGraphVariantJs.AnimationGraphVariant;
    }, function (_animationGraphLikeJs) {
      AnimationGraphLike = _animationGraphLikeJs.AnimationGraphLike;
    }],
    execute: function () {
      ccclass = _decorator.ccclass;
      menu = _decorator.menu;
      type = _decorator.type;
      serializable = _decorator.serializable;
      editable = _decorator.editable;
      formerlySerializedAs = _decorator.formerlySerializedAs;

      /**
       * @en
       * The animation controller component applies an animation graph
       * to the node which it's attached to.
       * When the controller starts, the animation graph is instantiated.
       * Then you may set variables or query the running statuses of the animation graph instance.
       * @zh
       * 将动画图应用到动画控制器组件所挂载的节点上。
       * 当动画控制器开始运行时，动画图会被实例化。然后便可以设置动画图实例中的变量或者查询动画图的运行状况。
       */
      _export("AnimationController", AnimationController = (_dec = ccclass('cc.animation.AnimationController'), _dec2 = menu('Animation/Animation Controller'), _dec3 = type(AnimationGraphLike), _dec4 = formerlySerializedAs('graph'), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AnimationController, _Component);

        function AnimationController() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._graph = _initializer && _initializer();
          _this._graphEval = null;
          return _this;
        }

        var _proto = AnimationController.prototype;

        _proto.__preload = function __preload() {
          var graph = this.graph;

          if (graph) {
            var originalGraph;
            var clipOverrides = null;

            if (graph instanceof AnimationGraphVariant) {
              if (!graph.original) {
                return;
              }

              originalGraph = graph.original;
              clipOverrides = graph.clipOverrides;
            } else {
              assertIsTrue(graph instanceof AnimationGraph);
              originalGraph = graph;
            }

            var graphEval = new AnimationGraphEval(originalGraph, this.node, this, clipOverrides);
            this._graphEval = graphEval;
          }
        };

        _proto.update = function update(deltaTime) {
          var _this$_graphEval;

          (_this$_graphEval = this._graphEval) === null || _this$_graphEval === void 0 ? void 0 : _this$_graphEval.update(deltaTime);
        }
        /**
         * @zh 获取动画图中的所有变量。
         * @en Gets all the variables in the animation graph.
         * @returns The iterator to the variables.
         * @example
         * ```ts
         * for (const [name, { type }] of animationController.getVariables()) {
         *   log(`Name: ${name}, Type: ${type}`);
         * }
         * ```
         */
        ;

        _proto.getVariables = function getVariables() {
          var graphEval = this._graphEval;
          assertIsNonNullable(graphEval);
          return graphEval.getVariables();
        }
        /**
         * @zh 设置动画图实例中变量的值。
         * @en Sets the value of the variable in the animation graph instance.
         * @param name @en Variable's name. @zh 变量的名称。
         * @param value @en Variable's value. @zh 变量的值。
         * @example
         * ```ts
         * animationController.setValue('speed', 3.14);
         * animationController.setValue('crouching', true);
         * animationController.setValue('attack', true);
         * ```
         */
        ;

        _proto.setValue = function setValue(name, value) {
          var graphEval = this._graphEval;
          assertIsNonNullable(graphEval);
          graphEval.setValue(name, value);
        }
        /**
         * @zh 获取动画图实例中变量的值。
         * @en Gets the value of the variable in the animation graph instance.
         * @param name @en Variable's name. @zh 变量的名称。
         * @returns @en Variable's value. @zh 变量的值。
         */
        ;

        _proto.getValue = function getValue(name) {
          var graphEval = this._graphEval;
          assertIsNonNullable(graphEval);
          return graphEval.getValue(name);
        }
        /**
         * @zh 获取动画图实例中当前状态的运行状况。
         * @en Gets the running status of the current state in the animation graph instance.
         * @param layer @en Index of the layer. @zh 层级索引。
         * @returns @en The running status of the current state. `null` is returned if current state is not a motion state.
         *          @zh 当前的状态运作状态对象。如果当前的状态不是动作状态，则返回 `null`。
         */
        ;

        _proto.getCurrentStateStatus = function getCurrentStateStatus(layer) {
          var graphEval = this._graphEval;
          assertIsNonNullable(graphEval);
          return graphEval.getCurrentStateStatus(layer);
        }
        /**
         * @zh 获取动画图实例中当前状态上包含的所有动画剪辑的运行状况。
         * @en Gets the running status of all the animation clips added on the current state in the animation graph instance.
         * @param layer @en Index of the layer. @zh 层级索引。
         * @returns @en Iterable to the animation clip statuses on current state.
         *              An empty iterable is returned if current state is not a motion state.
         *          @zh 到动画剪辑运作状态的迭代器。若当前状态不是动画状态，则返回一个空的迭代器。
         */
        ;

        _proto.getCurrentClipStatuses = function getCurrentClipStatuses(layer) {
          var graphEval = this._graphEval;
          assertIsNonNullable(graphEval);
          return graphEval.getCurrentClipStatuses(layer);
        }
        /**
         * @zh 获取动画图实例中当前正在进行的过渡的运行状况。
         * @en Gets the running status of the transition currently in progress in the animation graph instance.
         * @param layer @en Index of the layer. @zh 层级索引。
         * @returns @en Current transition status. `null` is returned in case of no transition.
         *          @zh 当前正在进行的过渡，若没有进行任何过渡，则返回 `null`。
         */
        ;

        _proto.getCurrentTransition = function getCurrentTransition(layer) {
          var graphEval = this._graphEval;
          assertIsNonNullable(graphEval);
          return graphEval.getCurrentTransition(layer);
        }
        /**
         * @zh 获取动画图实例中下一个状态的运行状况。
         * @en Gets the running status of the next state in the animation graph instance.
         * @param layer @en Index of the layer. @zh 层级索引。
         * @returns @en The running status of the next state. `null` is returned in case of no transition or if next state is not a motion state.
         *          @zh 下一状态运作状态对象，若未在进行过渡或下一状态不是动画状态，则返回 `null`。
         */
        ;

        _proto.getNextStateStatus = function getNextStateStatus(layer) {
          var graphEval = this._graphEval;
          assertIsNonNullable(graphEval);
          return graphEval.getNextStateStatus(layer);
        }
        /**
         * @zh 获取动画图实例中下一个状态上添加的所有动画剪辑的运行状况。
         * @en Gets the running status of all the animation clips added on the next state in the animation graph instance.
         * @param layer @en Index of the layer. @zh 层级索引。
         * @returns @en Iterable to the animation clip statuses on next state.
         *              An empty iterable is returned in case of no transition or next state is not a motion state.
         *          @zh 到下一状态上包含的动画剪辑运作状态的迭代器，若未在进行过渡或下一状态不是动画状态，则返回一个空的迭代器。
         */
        ;

        _proto.getNextClipStatuses = function getNextClipStatuses(layer) {
          var graphEval = this._graphEval;
          assertIsNonNullable(graphEval);
          return graphEval.getNextClipStatuses(layer);
        }
        /**
         * @zh 获取层级权重。
         * @en Gets the weight of specified layer.
         * @param layer @en Index of the layer. @zh 层级索引。
         */
        ;

        _proto.getLayerWeight = function getLayerWeight(layer) {
          var graphEval = this._graphEval;
          assertIsNonNullable(graphEval);
          return graphEval.getLayerWeight(layer);
        }
        /**
         * @zh 设置层级权重。
         * @en Sets the weight of specified layer.
         * @param layer @en Index of the layer. @zh 层级索引。
         */
        ;

        _proto.setLayerWeight = function setLayerWeight(layer, weight) {
          var graphEval = this._graphEval;
          assertIsNonNullable(graphEval);
          return graphEval.setLayerWeight(layer, weight);
        }
        /**
         * @zh 覆盖动画图实例中的动画剪辑。
         * 对于每一对源剪辑、目标剪辑，
         * 动画图（实例）中的出现的所有源剪辑都会被替换为目标剪辑，就好像动画图中一开始就使用的是目标剪辑。
         * 不过，动画图当前的运转状态会依然保持不变，例如：
         *
         * - 若动作状态涉及的动画剪辑被替换，动作状态的播放进度百分比依然保持不变。
         *
         * - 若过渡的周期是相对的，即使在某一刻动画过渡的源头被替换，那么过渡的进度百分比也依然保持不变。
         *
         * 不管进行多少次覆盖，源剪辑应该一直指定为原始动画图中的动画剪辑。例如：
         *
         * ```ts
         * // `originalClip` 是原始动画图中的剪辑对象，第一次希望将原剪辑覆盖为 `newClip1`，第二次希望将原剪辑覆盖为 `newClip2`
         * animationController.overrideClips_experimental(new Map([ [originalClip, newClip1] ])); // 第一次覆盖
         * animationController.overrideClips_experimental(new Map([ [newClip1, newClip2] ])); // 错误：第二次覆盖
         * animationController.overrideClips_experimental(new Map([ [originalClip, newClip2] ])); // 正确：第二次覆盖
         * ```
         * @en Overrides the animation clips in animation graph instance.
         * TODO
         * @experimental
         */
        ;

        _proto.overrideClips_experimental = function overrideClips_experimental(overrides) {
          var graphEval = this._graphEval;
          assertIsNonNullable(graphEval);
          graphEval.overrideClips(overrides);
        };

        _createClass(AnimationController, [{
          key: "graph",
          get:
          /**
           * @zh
           * 动画控制器所关联的动画图。
           * @en
           * The animation graph associated with the animation controller.
           */
          function get() {
            return this._graph;
          },
          set: function set(value) {
            this._graph = value;
          }
        }, {
          key: "layerCount",
          get:
          /**
           * @zh 获取动画图的层级数量。如果控制器没有指定动画图，则返回 0。
           * @en Gets the count of layers in the animation graph.
           * If no animation graph is specified, 0 is returned.
           */
          function get() {
            var _this$_graphEval$laye, _this$_graphEval2;

            return (_this$_graphEval$laye = (_this$_graphEval2 = this._graphEval) === null || _this$_graphEval2 === void 0 ? void 0 : _this$_graphEval2.layerCount) !== null && _this$_graphEval$laye !== void 0 ? _this$_graphEval$laye : 0;
          }
        }]);

        return AnimationController;
      }(Component), (_applyDecoratedDescriptor(_class2.prototype, "graph", [_dec3, editable], Object.getOwnPropertyDescriptor(_class2.prototype, "graph"), _class2.prototype), _initializer = _applyDecoratedInitializer(_class2.prototype, "_graph", [serializable, _dec4], function () {
        return null;
      })), _class2)) || _class) || _class));
    }
  };
});