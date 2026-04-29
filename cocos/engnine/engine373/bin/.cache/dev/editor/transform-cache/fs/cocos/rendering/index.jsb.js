System.register("q-bundled:///fs/cocos/rendering/index.jsb.js", ["./pass-phase.js", "../core/index.js", "./define.js", "../core/data/class-decorator.js", "../core/global-exports.js", "./pipeline-event.js"], function (_export, _context) {
  "use strict";

  var getPhaseID, ccenum, CCString, pipeline, ccclass, serializable, editable, type, legacyCC, _dec, _dec2, _class, _initializer, _initializer2, _initializer3, _dec3, _dec4, _class3, _class4, _initializer4, _initializer5, RenderPipeline, RenderFlow, RenderStage, InstancedBuffer, PipelineStateManager, ForwardPipeline, ForwardFlow, ShadowFlow, ForwardStage, ShadowStage, DeferredPipeline, MainFlow, LightingStage, PostProcessStage, GbufferStage, BloomStage, ReflectionProbeFlow, ReflectionProbeStage, getOrCreatePipelineState, forwardPipelineProto, oldForwardOnLoaded, forwardFlowProto, shadowFlowProto, reflectionProbeFlowProto, forwardStageProto, shadowStageProto, reflectionProbeStage, RenderQueueSortMode, RenderQueueDesc, deferredPipelineProto, oldDeferredOnLoaded, mainFlowProto, gbufferStageProto, lightingStageProto, bloomStageProto, postProcessStageProto, RenderTexture, RenderTextureConfig, proxyArrayAttribute;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedInitializer(target, property, decorators, initializer) {
    return decorators.slice().reverse().reduce(function (decoratedInitializer, decorator) {
      return decorator(target, property, decoratedInitializer) || decoratedInitializer;
    }, initializer);
  }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function proxyArrayAttributeImpl(proto, attr) {
    const proxyTarget = `_${attr}_target`;

    let arrayProxy = (self, targetArrayAttr) => {
      return new Proxy(self[targetArrayAttr], {
        get(targetArray, prop, receiver) {
          return Reflect.get(targetArray, prop, receiver);
        },

        set(targetArray, prop, receiver) {
          const ret = Reflect.set(targetArray, prop, receiver);
          self[targetArrayAttr] = targetArray;
          return ret;
        }

      });
    };

    Object.defineProperty(proto, attr, {
      configurable: true,
      enumerable: true,
      get: function () {
        this[proxyTarget] || (this[proxyTarget] = []);
        return arrayProxy(this, proxyTarget);
      },
      set: function (v) {
        this[proxyTarget] = v;
      }
    });
  }

  function declType(proto, attrType, attr, dft) {
    type(attrType)(proto, attr, dft);
  }

  _export("RenderQueueSortMode", void 0);

  return {
    setters: [function (_passPhaseJs) {
      getPhaseID = _passPhaseJs.getPhaseID;
    }, function (_coreIndexJs) {
      ccenum = _coreIndexJs.ccenum;
      CCString = _coreIndexJs.CCString;
    }, function (_defineJs) {
      pipeline = _defineJs;
    }, function (_coreDataClassDecoratorJs) {
      ccclass = _coreDataClassDecoratorJs.ccclass;
      serializable = _coreDataClassDecoratorJs.serializable;
      editable = _coreDataClassDecoratorJs.editable;
      type = _coreDataClassDecoratorJs.type;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_pipelineEventJs) {
      _export("PipelineEventType", _pipelineEventJs.PipelineEventType);
    }],
    execute: function () {
      _export("pipeline", pipeline);

      nr.getPhaseID = getPhaseID;

      _export("RenderPipeline", RenderPipeline = nr.RenderPipeline);

      _export("RenderFlow", RenderFlow = nr.RenderFlow);

      _export("RenderStage", RenderStage = nr.RenderStage);

      _export("InstancedBuffer", InstancedBuffer = nr.InstancedBuffer);

      _export("PipelineStateManager", PipelineStateManager = nr.PipelineStateManager);

      _export("ForwardPipeline", ForwardPipeline = nr.ForwardPipeline);

      _export("ForwardFlow", ForwardFlow = nr.ForwardFlow);

      _export("ShadowFlow", ShadowFlow = nr.ShadowFlow);

      _export("ForwardStage", ForwardStage = nr.ForwardStage);

      _export("ShadowStage", ShadowStage = nr.ShadowStage);

      _export("DeferredPipeline", DeferredPipeline = nr.DeferredPipeline);

      _export("MainFlow", MainFlow = nr.MainFlow);

      _export("LightingStage", LightingStage = nr.LightingStage);

      _export("PostProcessStage", PostProcessStage = nr.PostProcessStage);

      _export("GbufferStage", GbufferStage = nr.GbufferStage);

      _export("BloomStage", BloomStage = nr.BloomStage);

      _export("ReflectionProbeFlow", ReflectionProbeFlow = nr.ReflectionProbeFlow);

      _export("ReflectionProbeStage", ReflectionProbeStage = nr.ReflectionProbeStage);

      getOrCreatePipelineState = nr.PipelineStateManager.getOrCreatePipelineState;

      nr.PipelineStateManager.getOrCreatePipelineState = function (device, pass, shader, renderPass, ia) {
        return getOrCreatePipelineState(pass, shader, renderPass, ia); //cjh TODO: remove hacking. c++ API doesn't access device argument.
      }; // ForwardPipeline


      forwardPipelineProto = ForwardPipeline.prototype;

      forwardPipelineProto._ctor = function () {
        this._tag = 0;
        this._flows = [];
      };

      forwardPipelineProto.init = function () {
        for (let i = 0; i < this._flows.length; i++) {
          this._flows[i].init(this);
        }

        const info = {
          tag: this._tag,
          flows: this._flows
        };
        this.initialize(info);
      };

      oldForwardOnLoaded = forwardPipelineProto.onLoaded; // hook to invoke init after deserialization

      forwardPipelineProto.onLoaded = function () {
        if (oldForwardOnLoaded) oldForwardOnLoaded.call(this);

        for (let i = 0; i < this._flows.length; i++) {
          this._flows[i].init(this);
        }

        const info = {
          tag: this._tag,
          flows: this._flows
        };
        this.initialize(info);
      };

      forwardFlowProto = ForwardFlow.prototype;

      forwardFlowProto._ctor = function () {
        this._name = 0;
        this._priority = 0;
        this._tag = 0;
        this._stages = [];
      };

      forwardFlowProto.init = function (pipeline) {
        for (let i = 0; i < this._stages.length; i++) {
          this._stages[i].init(pipeline);
        }

        const info = {
          name: this._name,
          priority: this._priority,
          tag: this._tag,
          stages: this._stages
        };
        this.initialize(info);
      };

      shadowFlowProto = ShadowFlow.prototype;

      shadowFlowProto._ctor = function () {
        this._name = 0;
        this._priority = 0;
        this._tag = 0;
        this._stages = [];
      };

      shadowFlowProto.init = function (pipeline) {
        for (let i = 0; i < this._stages.length; i++) {
          this._stages[i].init(pipeline);
        }

        const info = {
          name: this._name,
          priority: this._priority,
          tag: this._tag,
          stages: this._stages
        };
        this.initialize(info);
      };

      reflectionProbeFlowProto = ReflectionProbeFlow.prototype;

      reflectionProbeFlowProto._ctor = function () {
        this._name = 0;
        this._priority = 0;
        this._tag = 0;
        this._stages = [];
      };

      reflectionProbeFlowProto.init = function (pipeline) {
        for (let i = 0; i < this._stages.length; i++) {
          this._stages[i].init(pipeline);
        }

        const info = {
          name: this._name,
          priority: this._priority,
          tag: this._tag,
          stages: this._stages
        };
        this.initialize(info);
      };

      forwardStageProto = ForwardStage.prototype;

      forwardStageProto._ctor = function () {
        this._name = 0;
        this._priority = 0;
        this._tag = 0;
        this.renderQueues = [];
      };

      forwardStageProto.init = function (pipeline) {
        const queues = [];

        for (let i = 0; i < this.renderQueues.length; i++) {
          // @ts-ignore
          queues.push(this.renderQueues[i].init());
        }

        const info = {
          name: this._name,
          priority: this._priority,
          tag: this._tag,
          renderQueues: queues
        };
        this.initialize(info);
      };

      shadowStageProto = ShadowStage.prototype;

      shadowStageProto._ctor = function () {
        this._name = 0;
        this._priority = 0;
        this._tag = 0;
      };

      reflectionProbeStage = ReflectionProbeStage.prototype;

      reflectionProbeStage._ctor = function () {
        this._name = 0;
        this._priority = 0;
        this._tag = 0;
        this.renderQueues = [];
      };

      reflectionProbeStage.init = function (pipeline) {
        const queues = [];

        for (let i = 0; i < this.renderQueues.length; i++) {
          // @ts-ignore
          queues.push(this.renderQueues[i].init());
        }

        const info = {
          name: this._name,
          priority: this._priority,
          tag: this._tag,
          renderQueues: queues
        };
        this.initialize(info);
      };

      (function (RenderQueueSortMode) {
        RenderQueueSortMode[RenderQueueSortMode["FRONT_TO_BACK"] = 0] = "FRONT_TO_BACK";
        RenderQueueSortMode[RenderQueueSortMode["BACK_TO_FRONT"] = 1] = "BACK_TO_FRONT";
      })(RenderQueueSortMode || _export("RenderQueueSortMode", RenderQueueSortMode = {}));

      ccenum(RenderQueueSortMode);

      shadowStageProto.init = function (pipeline) {
        const info = {
          name: this._name,
          priority: this._priority,
          tag: this._tag,
          renderQueues: []
        };
        this.initialize(info);
      };

      _export("RenderQueueDesc", RenderQueueDesc = (_dec = type(RenderQueueSortMode), _dec2 = type([CCString]), (_class = class RenderQueueDesc {
        /**
        * @en Whether the render queue is a transparent queue
        * @zh 当前队列是否是半透明队列
        */

        /**
         * @en The sort mode of the render queue
         * @zh 渲染队列的排序模式
         */

        /**
        * @en The stages using this queue
        * @zh 使用当前渲染队列的阶段列表
        */
        constructor() {
          this.isTransparent = _initializer && _initializer();
          this.sortMode = _initializer2 && _initializer2();
          this.stages = _initializer3 && _initializer3();
          this.stages = [];
        }

        init() {
          return new nr.RenderQueueDesc(this.isTransparent, this.sortMode, this.stages);
        }

      }, (_initializer = _applyDecoratedInitializer(_class.prototype, "isTransparent", [serializable, editable], function () {
        return false;
      }), _initializer2 = _applyDecoratedInitializer(_class.prototype, "sortMode", [_dec], function () {
        return RenderQueueSortMode.FRONT_TO_BACK;
      }), _initializer3 = _applyDecoratedInitializer(_class.prototype, "stages", [_dec2], function () {
        return [];
      })), _class)));

      deferredPipelineProto = DeferredPipeline.prototype;

      deferredPipelineProto._ctor = function () {
        this._tag = 0;
        this._flows = [];
        this.renderTextures = [];
        this.materials = [];
      };

      oldDeferredOnLoaded = deferredPipelineProto.onLoaded; // hook to invoke init after deserialization

      deferredPipelineProto.onLoaded = function () {
        if (oldDeferredOnLoaded) oldDeferredOnLoaded.call(this);

        for (let i = 0; i < this._flows.length; i++) {
          this._flows[i].init(this);
        }

        let info = {
          tag: this._tag,
          flows: this._flows
        };
        this.initialize(info);
      };

      mainFlowProto = MainFlow.prototype;

      mainFlowProto._ctor = function () {
        this._name = 0;
        this._priority = 0;
        this._tag = 0;
        this._stages = [];
      };

      mainFlowProto.init = function (pipeline) {
        for (let i = 0; i < this._stages.length; i++) {
          this._stages[i].init(pipeline);
        }

        const info = {
          name: this._name,
          priority: this._priority,
          tag: this._tag,
          stages: this._stages
        };
        this.initialize(info);
      };

      gbufferStageProto = GbufferStage.prototype;

      gbufferStageProto._ctor = function () {
        this._name = 0;
        this._priority = 0;
        this._tag = 0;
        this.renderQueues = [];
      };

      gbufferStageProto.init = function (pipeline) {
        const queues = [];

        for (let i = 0; i < this.renderQueues.length; i++) {
          // @ts-ignore
          queues.push(this.renderQueues[i].init());
        }

        const info = {
          name: this._name,
          priority: this._priority,
          tag: this._tag,
          renderQueues: queues
        };
        this.initialize(info);
      };

      lightingStageProto = LightingStage.prototype;

      lightingStageProto._ctor = function () {
        this._name = 0;
        this._priority = 0;
        this._tag = 0;
        this.renderQueues = [];
        this._deferredMaterial = null;
      };

      lightingStageProto.init = function (pipeline) {
        const queues = [];

        for (let i = 0; i < this.renderQueues.length; i++) {
          // @ts-ignore
          queues.push(this.renderQueues[i].init());
        }

        pipeline.pipelineSceneData.deferredLightingMaterial = this._deferredMaterial;
        const info = {
          name: this._name,
          priority: this._priority,
          tag: this._tag,
          renderQueues: queues
        };
        this.initialize(info);
      };

      bloomStageProto = BloomStage.prototype;

      bloomStageProto._ctor = function () {
        this._name = 0;
        this._priority = 0;
        this._tag = 0;
        this.renderQueues = [];
        this._bloomMaterial = null;
      };

      bloomStageProto.init = function (pipeline) {
        const queues = [];

        for (let i = 0; i < this.renderQueues.length; i++) {
          // @ts-ignore
          queues.push(this.renderQueues[i].init());
        }

        pipeline.pipelineSceneData.bloomMaterial = this._bloomMaterial;
        const info = {
          name: this._name,
          priority: this._priority,
          tag: this._tag,
          renderQueues: queues
        };
        this.initialize(info);
      };

      postProcessStageProto = PostProcessStage.prototype;

      postProcessStageProto._ctor = function () {
        this._name = 0;
        this._priority = 0;
        this._tag = 0;
        this.renderQueues = [];
        this._postProcessMaterial = null;
      };

      postProcessStageProto.init = function (pipeline) {
        const queues = [];

        for (let i = 0; i < this.renderQueues.length; i++) {
          // @ts-ignore
          queues.push(this.renderQueues[i].init());
        }

        pipeline.pipelineSceneData.postProcessMaterial = this._postProcessMaterial;
        const info = {
          name: this._name,
          priority: this._priority,
          tag: this._tag,
          renderQueues: queues
        };
        this.initialize(info);
      };

      legacyCC.RenderFlow = RenderFlow;
      legacyCC.RenderStage = RenderStage;
      legacyCC.RenderPipeline = RenderPipeline;
      RenderTexture = jsb.RenderTexture;
      RenderTextureConfig = (_dec3 = ccclass('RenderTextureConfig'), _dec4 = type(RenderTexture), _dec3(_class3 = (_class4 = class RenderTextureConfig {
        constructor() {
          this.name = _initializer4 && _initializer4();
          this.texture = _initializer5 && _initializer5();
        }

      }, (_initializer4 = _applyDecoratedInitializer(_class4.prototype, "name", [serializable, editable], function () {
        return '';
      }), _initializer5 = _applyDecoratedInitializer(_class4.prototype, "texture", [_dec4], function () {
        return null;
      })), _class4)) || _class3);
      proxyArrayAttribute = proxyArrayAttributeImpl;
      editable(RenderStage.prototype, '_name', () => '');
      editable(RenderStage.prototype, '_tag', () => 0);
      editable(RenderStage.prototype, '_priority', () => 0);
      serializable(RenderStage.prototype, '_tag', () => 0);
      serializable(RenderStage.prototype, '_priority', () => 0);
      editable(RenderFlow.prototype, '_name', () => '');
      editable(RenderFlow.prototype, '_priority', () => 0);
      editable(RenderFlow.prototype, '_tag', () => 0);
      editable(RenderFlow.prototype, '_stages', () => []);
      declType(RenderFlow.prototype, [RenderStage], '_stages', () => []);
      proxyArrayAttribute(RenderFlow.prototype, '_stages');
      serializable(RenderFlow.prototype, '_name', () => '');
      serializable(RenderFlow.prototype, '_priority', () => 0);
      serializable(RenderFlow.prototype, '_tag', () => 0);
      serializable(RenderFlow.prototype, '_stages', () => []);
      editable(RenderPipeline.prototype, '_tag', () => 0);
      editable(RenderPipeline.prototype, '_name', () => []);
      serializable(RenderPipeline.prototype, '_tag', () => 0);
      serializable(RenderPipeline.prototype, '_name', () => '');
      editable(RenderPipeline.prototype, '_flows', () => []);
      declType(RenderPipeline.prototype, [RenderFlow], '_flows', () => []);
      proxyArrayAttribute(RenderPipeline.prototype, '_flows');
      serializable(RenderPipeline.prototype, '_flows', () => []);
      editable(DeferredPipeline.prototype, 'renderTextures', () => []);
      declType(DeferredPipeline.prototype, [RenderTextureConfig], "renderTextures", () => []);
      serializable(DeferredPipeline.prototype, 'renderTextures', () => []);
      editable(DeferredPipeline.prototype, 'renderTextures', () => []);
      editable(ForwardPipeline.prototype, 'renderTextures', () => []);
      declType(ForwardPipeline.prototype, [RenderTextureConfig], "renderTextures", () => []);
      serializable(ForwardPipeline.prototype, 'renderTextures', () => []);
      declType(GbufferStage.prototype, [RenderQueueDesc], 'renderQueues', () => []);
      serializable(GbufferStage.prototype, 'renderQueues', () => []);
      editable(GbufferStage.prototype, 'renderQueues', () => []);
      editable(LightingStage.prototype, '_deferredMaterial', () => null);
      declType(LightingStage.prototype, jsb.Material, '_deferredMaterial', () => null);
      declType(LightingStage.prototype, [RenderQueueDesc], 'renderQueues', () => []);
      serializable(LightingStage.prototype, '_deferredMaterial', () => null);
      serializable(LightingStage.prototype, 'renderQueue', () => []);
      editable(LightingStage.prototype, 'renderQueue', () => []);
      editable(BloomStage.prototype, '_bloomMaterial', () => null);
      declType(BloomStage.prototype, jsb.Material, '_bloomMaterial', () => []);
      serializable(BloomStage.prototype, '_bloomMaterial', () => null);
      declType(PostProcessStage.prototype, [RenderQueueDesc], 'renderQueues', () => []);
      editable(PostProcessStage.prototype, '_postProcessMaterial', () => null);
      declType(PostProcessStage.prototype, jsb.Material, '_postProcessMaterial', () => null);
      serializable(PostProcessStage.prototype, 'renderQueues', () => []);
      editable(PostProcessStage.prototype, 'renderQueues', () => []);
      serializable(PostProcessStage.prototype, '_postProcessMaterial', () => null);
      declType(ForwardStage.prototype, [RenderQueueDesc], 'renderQueues', () => []);
      serializable(ForwardStage.prototype, 'renderQueues', () => []);
      editable(ForwardStage.prototype, 'renderQueues', () => []); //-------------------- register types -------------------- 

      ccclass('RenderQueueDesc')(RenderQueueDesc);
      ccclass('RenderStage')(RenderStage);
      ccclass('ReflectionProbeStage')(ReflectionProbeStage);
      ccclass('GbufferStage')(GbufferStage);
      ccclass('LightingStage')(LightingStage);
      ccclass('BloomStage')(BloomStage);
      ccclass('PostProcessStage')(PostProcessStage);
      ccclass('ForwardStage')(ForwardStage);
      ccclass('ShadowStage')(ShadowStage);
      ccclass('RenderFlow')(RenderFlow);
      ccclass('MainFlow')(MainFlow);
      ccclass('ForwardFlow')(ForwardFlow);
      ccclass('ShadowFlow')(ShadowFlow);
      ccclass('ReflectionProbeFlow')(ReflectionProbeFlow);
      ccclass('cc.RenderPipeline')(RenderPipeline);
      ccclass('ForwardPipeline')(ForwardPipeline);
      ccclass('DeferredPipeline')(DeferredPipeline);
    }
  };
});