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
    var proxyTarget = "_" + attr + "_target";

    var arrayProxy = function arrayProxy(self, targetArrayAttr) {
      return new Proxy(self[targetArrayAttr], {
        get: function get(targetArray, prop, receiver) {
          return Reflect.get(targetArray, prop, receiver);
        },
        set: function set(targetArray, prop, receiver) {
          var ret = Reflect.set(targetArray, prop, receiver);
          self[targetArrayAttr] = targetArray;
          return ret;
        }
      });
    };

    Object.defineProperty(proto, attr, {
      configurable: true,
      enumerable: true,
      get: function get() {
        this[proxyTarget] || (this[proxyTarget] = []);
        return arrayProxy(this, proxyTarget);
      },
      set: function set(v) {
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
        for (var i = 0; i < this._flows.length; i++) {
          this._flows[i].init(this);
        }

        var info = {
          tag: this._tag,
          flows: this._flows
        };
        this.initialize(info);
      };

      oldForwardOnLoaded = forwardPipelineProto.onLoaded; // hook to invoke init after deserialization

      forwardPipelineProto.onLoaded = function () {
        if (oldForwardOnLoaded) oldForwardOnLoaded.call(this);

        for (var i = 0; i < this._flows.length; i++) {
          this._flows[i].init(this);
        }

        var info = {
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
        for (var i = 0; i < this._stages.length; i++) {
          this._stages[i].init(pipeline);
        }

        var info = {
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
        for (var i = 0; i < this._stages.length; i++) {
          this._stages[i].init(pipeline);
        }

        var info = {
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
        for (var i = 0; i < this._stages.length; i++) {
          this._stages[i].init(pipeline);
        }

        var info = {
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
        var queues = [];

        for (var i = 0; i < this.renderQueues.length; i++) {
          // @ts-ignore
          queues.push(this.renderQueues[i].init());
        }

        var info = {
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
        var queues = [];

        for (var i = 0; i < this.renderQueues.length; i++) {
          // @ts-ignore
          queues.push(this.renderQueues[i].init());
        }

        var info = {
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
        var info = {
          name: this._name,
          priority: this._priority,
          tag: this._tag,
          renderQueues: []
        };
        this.initialize(info);
      };

      _export("RenderQueueDesc", RenderQueueDesc = (_dec = type(RenderQueueSortMode), _dec2 = type([CCString]), (_class = /*#__PURE__*/function () {
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
        function RenderQueueDesc() {
          this.isTransparent = _initializer && _initializer();
          this.sortMode = _initializer2 && _initializer2();
          this.stages = _initializer3 && _initializer3();
          this.stages = [];
        }

        var _proto = RenderQueueDesc.prototype;

        _proto.init = function init() {
          return new nr.RenderQueueDesc(this.isTransparent, this.sortMode, this.stages);
        };

        return RenderQueueDesc;
      }(), (_initializer = _applyDecoratedInitializer(_class.prototype, "isTransparent", [serializable, editable], function () {
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

        for (var i = 0; i < this._flows.length; i++) {
          this._flows[i].init(this);
        }

        var info = {
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
        for (var i = 0; i < this._stages.length; i++) {
          this._stages[i].init(pipeline);
        }

        var info = {
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
        var queues = [];

        for (var i = 0; i < this.renderQueues.length; i++) {
          // @ts-ignore
          queues.push(this.renderQueues[i].init());
        }

        var info = {
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
        var queues = [];

        for (var i = 0; i < this.renderQueues.length; i++) {
          // @ts-ignore
          queues.push(this.renderQueues[i].init());
        }

        pipeline.pipelineSceneData.deferredLightingMaterial = this._deferredMaterial;
        var info = {
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
        var queues = [];

        for (var i = 0; i < this.renderQueues.length; i++) {
          // @ts-ignore
          queues.push(this.renderQueues[i].init());
        }

        pipeline.pipelineSceneData.bloomMaterial = this._bloomMaterial;
        var info = {
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
        var queues = [];

        for (var i = 0; i < this.renderQueues.length; i++) {
          // @ts-ignore
          queues.push(this.renderQueues[i].init());
        }

        pipeline.pipelineSceneData.postProcessMaterial = this._postProcessMaterial;
        var info = {
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
      RenderTextureConfig = (_dec3 = ccclass('RenderTextureConfig'), _dec4 = type(RenderTexture), _dec3(_class3 = (_class4 = function RenderTextureConfig() {
        this.name = _initializer4 && _initializer4();
        this.texture = _initializer5 && _initializer5();
      }, (_initializer4 = _applyDecoratedInitializer(_class4.prototype, "name", [serializable, editable], function () {
        return '';
      }), _initializer5 = _applyDecoratedInitializer(_class4.prototype, "texture", [_dec4], function () {
        return null;
      })), _class4)) || _class3);
      proxyArrayAttribute = proxyArrayAttributeImpl;
      editable(RenderStage.prototype, '_name', function () {
        return '';
      });
      editable(RenderStage.prototype, '_tag', function () {
        return 0;
      });
      editable(RenderStage.prototype, '_priority', function () {
        return 0;
      });
      serializable(RenderStage.prototype, '_tag', function () {
        return 0;
      });
      serializable(RenderStage.prototype, '_priority', function () {
        return 0;
      });
      editable(RenderFlow.prototype, '_name', function () {
        return '';
      });
      editable(RenderFlow.prototype, '_priority', function () {
        return 0;
      });
      editable(RenderFlow.prototype, '_tag', function () {
        return 0;
      });
      editable(RenderFlow.prototype, '_stages', function () {
        return [];
      });
      declType(RenderFlow.prototype, [RenderStage], '_stages', function () {
        return [];
      });
      proxyArrayAttribute(RenderFlow.prototype, '_stages');
      serializable(RenderFlow.prototype, '_name', function () {
        return '';
      });
      serializable(RenderFlow.prototype, '_priority', function () {
        return 0;
      });
      serializable(RenderFlow.prototype, '_tag', function () {
        return 0;
      });
      serializable(RenderFlow.prototype, '_stages', function () {
        return [];
      });
      editable(RenderPipeline.prototype, '_tag', function () {
        return 0;
      });
      editable(RenderPipeline.prototype, '_name', function () {
        return [];
      });
      serializable(RenderPipeline.prototype, '_tag', function () {
        return 0;
      });
      serializable(RenderPipeline.prototype, '_name', function () {
        return '';
      });
      editable(RenderPipeline.prototype, '_flows', function () {
        return [];
      });
      declType(RenderPipeline.prototype, [RenderFlow], '_flows', function () {
        return [];
      });
      proxyArrayAttribute(RenderPipeline.prototype, '_flows');
      serializable(RenderPipeline.prototype, '_flows', function () {
        return [];
      });
      editable(DeferredPipeline.prototype, 'renderTextures', function () {
        return [];
      });
      declType(DeferredPipeline.prototype, [RenderTextureConfig], "renderTextures", function () {
        return [];
      });
      serializable(DeferredPipeline.prototype, 'renderTextures', function () {
        return [];
      });
      editable(DeferredPipeline.prototype, 'renderTextures', function () {
        return [];
      });
      editable(ForwardPipeline.prototype, 'renderTextures', function () {
        return [];
      });
      declType(ForwardPipeline.prototype, [RenderTextureConfig], "renderTextures", function () {
        return [];
      });
      serializable(ForwardPipeline.prototype, 'renderTextures', function () {
        return [];
      });
      declType(GbufferStage.prototype, [RenderQueueDesc], 'renderQueues', function () {
        return [];
      });
      serializable(GbufferStage.prototype, 'renderQueues', function () {
        return [];
      });
      editable(GbufferStage.prototype, 'renderQueues', function () {
        return [];
      });
      editable(LightingStage.prototype, '_deferredMaterial', function () {
        return null;
      });
      declType(LightingStage.prototype, jsb.Material, '_deferredMaterial', function () {
        return null;
      });
      declType(LightingStage.prototype, [RenderQueueDesc], 'renderQueues', function () {
        return [];
      });
      serializable(LightingStage.prototype, '_deferredMaterial', function () {
        return null;
      });
      serializable(LightingStage.prototype, 'renderQueue', function () {
        return [];
      });
      editable(LightingStage.prototype, 'renderQueue', function () {
        return [];
      });
      editable(BloomStage.prototype, '_bloomMaterial', function () {
        return null;
      });
      declType(BloomStage.prototype, jsb.Material, '_bloomMaterial', function () {
        return [];
      });
      serializable(BloomStage.prototype, '_bloomMaterial', function () {
        return null;
      });
      declType(PostProcessStage.prototype, [RenderQueueDesc], 'renderQueues', function () {
        return [];
      });
      editable(PostProcessStage.prototype, '_postProcessMaterial', function () {
        return null;
      });
      declType(PostProcessStage.prototype, jsb.Material, '_postProcessMaterial', function () {
        return null;
      });
      serializable(PostProcessStage.prototype, 'renderQueues', function () {
        return [];
      });
      editable(PostProcessStage.prototype, 'renderQueues', function () {
        return [];
      });
      serializable(PostProcessStage.prototype, '_postProcessMaterial', function () {
        return null;
      });
      declType(ForwardStage.prototype, [RenderQueueDesc], 'renderQueues', function () {
        return [];
      });
      serializable(ForwardStage.prototype, 'renderQueues', function () {
        return [];
      });
      editable(ForwardStage.prototype, 'renderQueues', function () {
        return [];
      }); //-------------------- register types -------------------- 

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