System.register("q-bundled:///fs/cocos/rendering/custom/types.js", ["../../gfx/index.js", "./serialization.js"], function (_export, _context) {
  "use strict";

  var ClearFlagBit, Color, LoadOp, ShaderStageFlagBit, StoreOp, Type, UniformBlock, saveColor, loadColor, saveUniformBlock, loadUniformBlock, UpdateFrequency, ParameterType, ResourceResidency, QueueHint, ResourceDimension, ResourceFlags, TaskType, SceneFlags, LightingMode, AttachmentType, AccessType, RasterView, ClearValueType, ComputeView, LightInfo, DescriptorTypeOrder, Descriptor, DescriptorBlock, DescriptorBlockFlattened, DescriptorBlockIndex, CopyPair, MovePair, PipelineStatistics;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function getUpdateFrequencyName(e) {
    switch (e) {
      case UpdateFrequency.PER_INSTANCE:
        return 'PER_INSTANCE';

      case UpdateFrequency.PER_BATCH:
        return 'PER_BATCH';

      case UpdateFrequency.PER_PHASE:
        return 'PER_PHASE';

      case UpdateFrequency.PER_PASS:
        return 'PER_PASS';

      case UpdateFrequency.COUNT:
        return 'COUNT';

      default:
        return '';
    }
  }

  function getParameterTypeName(e) {
    switch (e) {
      case ParameterType.CONSTANTS:
        return 'CONSTANTS';

      case ParameterType.CBV:
        return 'CBV';

      case ParameterType.UAV:
        return 'UAV';

      case ParameterType.SRV:
        return 'SRV';

      case ParameterType.TABLE:
        return 'TABLE';

      case ParameterType.SSV:
        return 'SSV';

      default:
        return '';
    }
  }

  function getResourceResidencyName(e) {
    switch (e) {
      case ResourceResidency.MANAGED:
        return 'MANAGED';

      case ResourceResidency.MEMORYLESS:
        return 'MEMORYLESS';

      case ResourceResidency.PERSISTENT:
        return 'PERSISTENT';

      case ResourceResidency.EXTERNAL:
        return 'EXTERNAL';

      case ResourceResidency.BACKBUFFER:
        return 'BACKBUFFER';

      default:
        return '';
    }
  }

  function getQueueHintName(e) {
    switch (e) {
      case QueueHint.NONE:
        return 'NONE';

      case QueueHint.RENDER_OPAQUE:
        return 'RENDER_OPAQUE';

      case QueueHint.RENDER_CUTOUT:
        return 'RENDER_CUTOUT';

      case QueueHint.RENDER_TRANSPARENT:
        return 'RENDER_TRANSPARENT';

      default:
        return '';
    }
  }

  function getResourceDimensionName(e) {
    switch (e) {
      case ResourceDimension.BUFFER:
        return 'BUFFER';

      case ResourceDimension.TEXTURE1D:
        return 'TEXTURE1D';

      case ResourceDimension.TEXTURE2D:
        return 'TEXTURE2D';

      case ResourceDimension.TEXTURE3D:
        return 'TEXTURE3D';

      default:
        return '';
    }
  }

  function getTaskTypeName(e) {
    switch (e) {
      case TaskType.SYNC:
        return 'SYNC';

      case TaskType.ASYNC:
        return 'ASYNC';

      default:
        return '';
    }
  }

  function getLightingModeName(e) {
    switch (e) {
      case LightingMode.NONE:
        return 'NONE';

      case LightingMode.DEFAULT:
        return 'DEFAULT';

      case LightingMode.CLUSTERED:
        return 'CLUSTERED';

      default:
        return '';
    }
  }

  function getAttachmentTypeName(e) {
    switch (e) {
      case AttachmentType.RENDER_TARGET:
        return 'RENDER_TARGET';

      case AttachmentType.DEPTH_STENCIL:
        return 'DEPTH_STENCIL';

      case AttachmentType.SHADING_RATE:
        return 'SHADING_RATE';

      default:
        return '';
    }
  }

  function getAccessTypeName(e) {
    switch (e) {
      case AccessType.READ:
        return 'READ';

      case AccessType.READ_WRITE:
        return 'READ_WRITE';

      case AccessType.WRITE:
        return 'WRITE';

      default:
        return '';
    }
  }

  function getClearValueTypeName(e) {
    switch (e) {
      case ClearValueType.FLOAT_TYPE:
        return 'FLOAT_TYPE';

      case ClearValueType.INT_TYPE:
        return 'INT_TYPE';

      default:
        return '';
    }
  }

  function getDescriptorTypeOrderName(e) {
    switch (e) {
      case DescriptorTypeOrder.UNIFORM_BUFFER:
        return 'UNIFORM_BUFFER';

      case DescriptorTypeOrder.DYNAMIC_UNIFORM_BUFFER:
        return 'DYNAMIC_UNIFORM_BUFFER';

      case DescriptorTypeOrder.SAMPLER_TEXTURE:
        return 'SAMPLER_TEXTURE';

      case DescriptorTypeOrder.SAMPLER:
        return 'SAMPLER';

      case DescriptorTypeOrder.TEXTURE:
        return 'TEXTURE';

      case DescriptorTypeOrder.STORAGE_BUFFER:
        return 'STORAGE_BUFFER';

      case DescriptorTypeOrder.DYNAMIC_STORAGE_BUFFER:
        return 'DYNAMIC_STORAGE_BUFFER';

      case DescriptorTypeOrder.STORAGE_IMAGE:
        return 'STORAGE_IMAGE';

      case DescriptorTypeOrder.INPUT_ATTACHMENT:
        return 'INPUT_ATTACHMENT';

      default:
        return '';
    }
  }

  function saveRasterView(ar, v) {
    ar.writeString(v.slotName);
    ar.writeNumber(v.accessType);
    ar.writeNumber(v.attachmentType);
    ar.writeNumber(v.loadOp);
    ar.writeNumber(v.storeOp);
    ar.writeNumber(v.clearFlags);
    saveColor(ar, v.clearColor);
    ar.writeNumber(v.slotID);
  }

  function loadRasterView(ar, v) {
    v.slotName = ar.readString();
    v.accessType = ar.readNumber();
    v.attachmentType = ar.readNumber();
    v.loadOp = ar.readNumber();
    v.storeOp = ar.readNumber();
    v.clearFlags = ar.readNumber();
    loadColor(ar, v.clearColor);
    v.slotID = ar.readNumber();
  }

  function saveComputeView(ar, v) {
    ar.writeString(v.name);
    ar.writeNumber(v.accessType);
    ar.writeNumber(v.clearFlags);
    saveColor(ar, v.clearColor);
    ar.writeNumber(v.clearValueType);
  }

  function loadComputeView(ar, v) {
    v.name = ar.readString();
    v.accessType = ar.readNumber();
    v.clearFlags = ar.readNumber();
    loadColor(ar, v.clearColor);
    v.clearValueType = ar.readNumber();
  }

  function saveLightInfo(ar, v) {
    // skip, v.light: Light
    ar.writeNumber(v.level);
  }

  function loadLightInfo(ar, v) {
    // skip, v.light: Light
    v.level = ar.readNumber();
  }

  function saveDescriptor(ar, v) {
    ar.writeNumber(v.type);
    ar.writeNumber(v.count);
  }

  function loadDescriptor(ar, v) {
    v.type = ar.readNumber();
    v.count = ar.readNumber();
  }

  function saveDescriptorBlock(ar, v) {
    ar.writeNumber(v.descriptors.size); // Map<string, Descriptor>

    for (var _iterator = _createForOfIteratorHelperLoose(v.descriptors), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
          k1 = _step$value[0],
          v1 = _step$value[1];
      ar.writeString(k1);
      saveDescriptor(ar, v1);
    }

    ar.writeNumber(v.uniformBlocks.size); // Map<string, UniformBlock>

    for (var _iterator2 = _createForOfIteratorHelperLoose(v.uniformBlocks), _step2; !(_step2 = _iterator2()).done;) {
      var _step2$value = _step2.value,
          _k = _step2$value[0],
          _v = _step2$value[1];
      ar.writeString(_k);
      saveUniformBlock(ar, _v);
    }

    ar.writeNumber(v.capacity);
    ar.writeNumber(v.count);
  }

  function loadDescriptorBlock(ar, v) {
    var sz = 0;
    sz = ar.readNumber(); // Map<string, Descriptor>

    for (var i1 = 0; i1 !== sz; ++i1) {
      var k1 = ar.readString();
      var v1 = new Descriptor();
      loadDescriptor(ar, v1);
      v.descriptors.set(k1, v1);
    }

    sz = ar.readNumber(); // Map<string, UniformBlock>

    for (var _i = 0; _i !== sz; ++_i) {
      var _k2 = ar.readString();

      var _v2 = new UniformBlock();

      loadUniformBlock(ar, _v2);
      v.uniformBlocks.set(_k2, _v2);
    }

    v.capacity = ar.readNumber();
    v.count = ar.readNumber();
  }

  function saveDescriptorBlockFlattened(ar, v) {
    ar.writeNumber(v.descriptorNames.length); // string[]

    for (var _iterator3 = _createForOfIteratorHelperLoose(v.descriptorNames), _step3; !(_step3 = _iterator3()).done;) {
      var v1 = _step3.value;
      ar.writeString(v1);
    }

    ar.writeNumber(v.uniformBlockNames.length); // string[]

    for (var _iterator4 = _createForOfIteratorHelperLoose(v.uniformBlockNames), _step4; !(_step4 = _iterator4()).done;) {
      var _v3 = _step4.value;
      ar.writeString(_v3);
    }

    ar.writeNumber(v.descriptors.length); // Descriptor[]

    for (var _iterator5 = _createForOfIteratorHelperLoose(v.descriptors), _step5; !(_step5 = _iterator5()).done;) {
      var _v4 = _step5.value;
      saveDescriptor(ar, _v4);
    }

    ar.writeNumber(v.uniformBlocks.length); // UniformBlock[]

    for (var _iterator6 = _createForOfIteratorHelperLoose(v.uniformBlocks), _step6; !(_step6 = _iterator6()).done;) {
      var _v5 = _step6.value;
      saveUniformBlock(ar, _v5);
    }

    ar.writeNumber(v.capacity);
    ar.writeNumber(v.count);
  }

  function loadDescriptorBlockFlattened(ar, v) {
    var sz = 0;
    sz = ar.readNumber(); // string[]

    v.descriptorNames.length = sz;

    for (var i1 = 0; i1 !== sz; ++i1) {
      v.descriptorNames[i1] = ar.readString();
    }

    sz = ar.readNumber(); // string[]

    v.uniformBlockNames.length = sz;

    for (var _i2 = 0; _i2 !== sz; ++_i2) {
      v.uniformBlockNames[_i2] = ar.readString();
    }

    sz = ar.readNumber(); // Descriptor[]

    v.descriptors.length = sz;

    for (var _i3 = 0; _i3 !== sz; ++_i3) {
      var v1 = new Descriptor();
      loadDescriptor(ar, v1);
      v.descriptors[_i3] = v1;
    }

    sz = ar.readNumber(); // UniformBlock[]

    v.uniformBlocks.length = sz;

    for (var _i4 = 0; _i4 !== sz; ++_i4) {
      var _v6 = new UniformBlock();

      loadUniformBlock(ar, _v6);
      v.uniformBlocks[_i4] = _v6;
    }

    v.capacity = ar.readNumber();
    v.count = ar.readNumber();
  }

  function saveDescriptorBlockIndex(ar, v) {
    ar.writeNumber(v.updateFrequency);
    ar.writeNumber(v.parameterType);
    ar.writeNumber(v.descriptorType);
    ar.writeNumber(v.visibility);
  }

  function loadDescriptorBlockIndex(ar, v) {
    v.updateFrequency = ar.readNumber();
    v.parameterType = ar.readNumber();
    v.descriptorType = ar.readNumber();
    v.visibility = ar.readNumber();
  }

  function saveCopyPair(ar, v) {
    ar.writeString(v.source);
    ar.writeString(v.target);
    ar.writeNumber(v.mipLevels);
    ar.writeNumber(v.numSlices);
    ar.writeNumber(v.sourceMostDetailedMip);
    ar.writeNumber(v.sourceFirstSlice);
    ar.writeNumber(v.sourcePlaneSlice);
    ar.writeNumber(v.targetMostDetailedMip);
    ar.writeNumber(v.targetFirstSlice);
    ar.writeNumber(v.targetPlaneSlice);
  }

  function loadCopyPair(ar, v) {
    v.source = ar.readString();
    v.target = ar.readString();
    v.mipLevels = ar.readNumber();
    v.numSlices = ar.readNumber();
    v.sourceMostDetailedMip = ar.readNumber();
    v.sourceFirstSlice = ar.readNumber();
    v.sourcePlaneSlice = ar.readNumber();
    v.targetMostDetailedMip = ar.readNumber();
    v.targetFirstSlice = ar.readNumber();
    v.targetPlaneSlice = ar.readNumber();
  }

  function saveMovePair(ar, v) {
    ar.writeString(v.source);
    ar.writeString(v.target);
    ar.writeNumber(v.mipLevels);
    ar.writeNumber(v.numSlices);
    ar.writeNumber(v.targetMostDetailedMip);
    ar.writeNumber(v.targetFirstSlice);
    ar.writeNumber(v.targetPlaneSlice);
  }

  function loadMovePair(ar, v) {
    v.source = ar.readString();
    v.target = ar.readString();
    v.mipLevels = ar.readNumber();
    v.numSlices = ar.readNumber();
    v.targetMostDetailedMip = ar.readNumber();
    v.targetFirstSlice = ar.readNumber();
    v.targetPlaneSlice = ar.readNumber();
  }

  function savePipelineStatistics(ar, v) {
    ar.writeNumber(v.numRenderPasses);
    ar.writeNumber(v.numManagedTextures);
    ar.writeNumber(v.totalManagedTextures);
    ar.writeNumber(v.numUploadBuffers);
    ar.writeNumber(v.numUploadBufferViews);
    ar.writeNumber(v.numFreeUploadBuffers);
    ar.writeNumber(v.numFreeUploadBufferViews);
    ar.writeNumber(v.numDescriptorSets);
    ar.writeNumber(v.numFreeDescriptorSets);
    ar.writeNumber(v.numInstancingBuffers);
    ar.writeNumber(v.numInstancingUniformBlocks);
  }

  function loadPipelineStatistics(ar, v) {
    v.numRenderPasses = ar.readNumber();
    v.numManagedTextures = ar.readNumber();
    v.totalManagedTextures = ar.readNumber();
    v.numUploadBuffers = ar.readNumber();
    v.numUploadBufferViews = ar.readNumber();
    v.numFreeUploadBuffers = ar.readNumber();
    v.numFreeUploadBufferViews = ar.readNumber();
    v.numDescriptorSets = ar.readNumber();
    v.numFreeDescriptorSets = ar.readNumber();
    v.numInstancingBuffers = ar.readNumber();
    v.numInstancingUniformBlocks = ar.readNumber();
  }

  _export({
    getUpdateFrequencyName: getUpdateFrequencyName,
    getParameterTypeName: getParameterTypeName,
    getResourceResidencyName: getResourceResidencyName,
    getQueueHintName: getQueueHintName,
    getResourceDimensionName: getResourceDimensionName,
    getTaskTypeName: getTaskTypeName,
    getLightingModeName: getLightingModeName,
    getAttachmentTypeName: getAttachmentTypeName,
    getAccessTypeName: getAccessTypeName,
    getClearValueTypeName: getClearValueTypeName,
    getDescriptorTypeOrderName: getDescriptorTypeOrderName,
    saveRasterView: saveRasterView,
    loadRasterView: loadRasterView,
    saveComputeView: saveComputeView,
    loadComputeView: loadComputeView,
    saveLightInfo: saveLightInfo,
    loadLightInfo: loadLightInfo,
    saveDescriptor: saveDescriptor,
    loadDescriptor: loadDescriptor,
    saveDescriptorBlock: saveDescriptorBlock,
    loadDescriptorBlock: loadDescriptorBlock,
    saveDescriptorBlockFlattened: saveDescriptorBlockFlattened,
    loadDescriptorBlockFlattened: loadDescriptorBlockFlattened,
    saveDescriptorBlockIndex: saveDescriptorBlockIndex,
    loadDescriptorBlockIndex: loadDescriptorBlockIndex,
    saveCopyPair: saveCopyPair,
    loadCopyPair: loadCopyPair,
    saveMovePair: saveMovePair,
    loadMovePair: loadMovePair,
    savePipelineStatistics: savePipelineStatistics,
    loadPipelineStatistics: loadPipelineStatistics,
    UpdateFrequency: void 0,
    ParameterType: void 0,
    ResourceResidency: void 0,
    QueueHint: void 0,
    ResourceDimension: void 0,
    ResourceFlags: void 0,
    TaskType: void 0,
    SceneFlags: void 0,
    LightingMode: void 0,
    AttachmentType: void 0,
    AccessType: void 0,
    ClearValueType: void 0,
    DescriptorTypeOrder: void 0
  });

  return {
    setters: [function (_gfxIndexJs) {
      ClearFlagBit = _gfxIndexJs.ClearFlagBit;
      Color = _gfxIndexJs.Color;
      LoadOp = _gfxIndexJs.LoadOp;
      ShaderStageFlagBit = _gfxIndexJs.ShaderStageFlagBit;
      StoreOp = _gfxIndexJs.StoreOp;
      Type = _gfxIndexJs.Type;
      UniformBlock = _gfxIndexJs.UniformBlock;
    }, function (_serializationJs) {
      saveColor = _serializationJs.saveColor;
      loadColor = _serializationJs.loadColor;
      saveUniformBlock = _serializationJs.saveUniformBlock;
      loadUniformBlock = _serializationJs.loadUniformBlock;
    }],
    execute: function () {
      (function (UpdateFrequency) {
        UpdateFrequency[UpdateFrequency["PER_INSTANCE"] = 0] = "PER_INSTANCE";
        UpdateFrequency[UpdateFrequency["PER_BATCH"] = 1] = "PER_BATCH";
        UpdateFrequency[UpdateFrequency["PER_PHASE"] = 2] = "PER_PHASE";
        UpdateFrequency[UpdateFrequency["PER_PASS"] = 3] = "PER_PASS";
        UpdateFrequency[UpdateFrequency["COUNT"] = 4] = "COUNT";
      })(UpdateFrequency || _export("UpdateFrequency", UpdateFrequency = {}));

      (function (ParameterType) {
        ParameterType[ParameterType["CONSTANTS"] = 0] = "CONSTANTS";
        ParameterType[ParameterType["CBV"] = 1] = "CBV";
        ParameterType[ParameterType["UAV"] = 2] = "UAV";
        ParameterType[ParameterType["SRV"] = 3] = "SRV";
        ParameterType[ParameterType["TABLE"] = 4] = "TABLE";
        ParameterType[ParameterType["SSV"] = 5] = "SSV";
      })(ParameterType || _export("ParameterType", ParameterType = {}));

      (function (ResourceResidency) {
        ResourceResidency[ResourceResidency["MANAGED"] = 0] = "MANAGED";
        ResourceResidency[ResourceResidency["MEMORYLESS"] = 1] = "MEMORYLESS";
        ResourceResidency[ResourceResidency["PERSISTENT"] = 2] = "PERSISTENT";
        ResourceResidency[ResourceResidency["EXTERNAL"] = 3] = "EXTERNAL";
        ResourceResidency[ResourceResidency["BACKBUFFER"] = 4] = "BACKBUFFER";
      })(ResourceResidency || _export("ResourceResidency", ResourceResidency = {}));

      (function (QueueHint) {
        QueueHint[QueueHint["NONE"] = 0] = "NONE";
        QueueHint[QueueHint["RENDER_OPAQUE"] = 1] = "RENDER_OPAQUE";
        QueueHint[QueueHint["RENDER_CUTOUT"] = 2] = "RENDER_CUTOUT";
        QueueHint[QueueHint["RENDER_TRANSPARENT"] = 3] = "RENDER_TRANSPARENT";
      })(QueueHint || _export("QueueHint", QueueHint = {}));

      (function (ResourceDimension) {
        ResourceDimension[ResourceDimension["BUFFER"] = 0] = "BUFFER";
        ResourceDimension[ResourceDimension["TEXTURE1D"] = 1] = "TEXTURE1D";
        ResourceDimension[ResourceDimension["TEXTURE2D"] = 2] = "TEXTURE2D";
        ResourceDimension[ResourceDimension["TEXTURE3D"] = 3] = "TEXTURE3D";
      })(ResourceDimension || _export("ResourceDimension", ResourceDimension = {}));

      (function (ResourceFlags) {
        ResourceFlags[ResourceFlags["NONE"] = 0] = "NONE";
        ResourceFlags[ResourceFlags["UNIFORM"] = 1] = "UNIFORM";
        ResourceFlags[ResourceFlags["INDIRECT"] = 2] = "INDIRECT";
        ResourceFlags[ResourceFlags["STORAGE"] = 4] = "STORAGE";
        ResourceFlags[ResourceFlags["SAMPLED"] = 8] = "SAMPLED";
        ResourceFlags[ResourceFlags["COLOR_ATTACHMENT"] = 16] = "COLOR_ATTACHMENT";
        ResourceFlags[ResourceFlags["DEPTH_STENCIL_ATTACHMENT"] = 32] = "DEPTH_STENCIL_ATTACHMENT";
        ResourceFlags[ResourceFlags["INPUT_ATTACHMENT"] = 64] = "INPUT_ATTACHMENT";
        ResourceFlags[ResourceFlags["SHADING_RATE"] = 128] = "SHADING_RATE";
      })(ResourceFlags || _export("ResourceFlags", ResourceFlags = {}));

      (function (TaskType) {
        TaskType[TaskType["SYNC"] = 0] = "SYNC";
        TaskType[TaskType["ASYNC"] = 1] = "ASYNC";
      })(TaskType || _export("TaskType", TaskType = {}));

      (function (SceneFlags) {
        SceneFlags[SceneFlags["NONE"] = 0] = "NONE";
        SceneFlags[SceneFlags["OPAQUE_OBJECT"] = 1] = "OPAQUE_OBJECT";
        SceneFlags[SceneFlags["CUTOUT_OBJECT"] = 2] = "CUTOUT_OBJECT";
        SceneFlags[SceneFlags["TRANSPARENT_OBJECT"] = 4] = "TRANSPARENT_OBJECT";
        SceneFlags[SceneFlags["SHADOW_CASTER"] = 8] = "SHADOW_CASTER";
        SceneFlags[SceneFlags["UI"] = 16] = "UI";
        SceneFlags[SceneFlags["DEFAULT_LIGHTING"] = 32] = "DEFAULT_LIGHTING";
        SceneFlags[SceneFlags["VOLUMETRIC_LIGHTING"] = 64] = "VOLUMETRIC_LIGHTING";
        SceneFlags[SceneFlags["CLUSTERED_LIGHTING"] = 128] = "CLUSTERED_LIGHTING";
        SceneFlags[SceneFlags["PLANAR_SHADOW"] = 256] = "PLANAR_SHADOW";
        SceneFlags[SceneFlags["GEOMETRY"] = 512] = "GEOMETRY";
        SceneFlags[SceneFlags["PROFILER"] = 1024] = "PROFILER";
        SceneFlags[SceneFlags["DRAW_INSTANCING"] = 2048] = "DRAW_INSTANCING";
        SceneFlags[SceneFlags["DRAW_NON_INSTANCING"] = 4096] = "DRAW_NON_INSTANCING";
        SceneFlags[SceneFlags["REFLECTION_PROBE"] = 8192] = "REFLECTION_PROBE";
        SceneFlags[SceneFlags["ALL"] = 4294967295] = "ALL";
      })(SceneFlags || _export("SceneFlags", SceneFlags = {}));

      (function (LightingMode) {
        LightingMode[LightingMode["NONE"] = 0] = "NONE";
        LightingMode[LightingMode["DEFAULT"] = 1] = "DEFAULT";
        LightingMode[LightingMode["CLUSTERED"] = 2] = "CLUSTERED";
      })(LightingMode || _export("LightingMode", LightingMode = {}));

      (function (AttachmentType) {
        AttachmentType[AttachmentType["RENDER_TARGET"] = 0] = "RENDER_TARGET";
        AttachmentType[AttachmentType["DEPTH_STENCIL"] = 1] = "DEPTH_STENCIL";
        AttachmentType[AttachmentType["SHADING_RATE"] = 2] = "SHADING_RATE";
      })(AttachmentType || _export("AttachmentType", AttachmentType = {}));

      (function (AccessType) {
        AccessType[AccessType["READ"] = 0] = "READ";
        AccessType[AccessType["READ_WRITE"] = 1] = "READ_WRITE";
        AccessType[AccessType["WRITE"] = 2] = "WRITE";
      })(AccessType || _export("AccessType", AccessType = {}));

      _export("RasterView", RasterView = function RasterView(slotName, accessType, attachmentType, loadOp, storeOp, clearFlags, clearColor) {
        if (slotName === void 0) {
          slotName = '';
        }

        if (accessType === void 0) {
          accessType = AccessType.WRITE;
        }

        if (attachmentType === void 0) {
          attachmentType = AttachmentType.RENDER_TARGET;
        }

        if (loadOp === void 0) {
          loadOp = LoadOp.LOAD;
        }

        if (storeOp === void 0) {
          storeOp = StoreOp.STORE;
        }

        if (clearFlags === void 0) {
          clearFlags = ClearFlagBit.ALL;
        }

        if (clearColor === void 0) {
          clearColor = new Color();
        }

        this.slotName = void 0;
        this.accessType = void 0;
        this.attachmentType = void 0;
        this.loadOp = void 0;
        this.storeOp = void 0;
        this.clearFlags = void 0;
        this.clearColor = void 0;
        this.slotID = 0;
        this.slotName = slotName;
        this.accessType = accessType;
        this.attachmentType = attachmentType;
        this.loadOp = loadOp;
        this.storeOp = storeOp;
        this.clearFlags = clearFlags;
        this.clearColor = clearColor;
      });

      (function (ClearValueType) {
        ClearValueType[ClearValueType["FLOAT_TYPE"] = 0] = "FLOAT_TYPE";
        ClearValueType[ClearValueType["INT_TYPE"] = 1] = "INT_TYPE";
      })(ClearValueType || _export("ClearValueType", ClearValueType = {}));

      _export("ComputeView", ComputeView = function ComputeView(name, accessType, clearFlags, clearColor, clearValueType) {
        if (name === void 0) {
          name = '';
        }

        if (accessType === void 0) {
          accessType = AccessType.READ;
        }

        if (clearFlags === void 0) {
          clearFlags = ClearFlagBit.NONE;
        }

        if (clearColor === void 0) {
          clearColor = new Color();
        }

        if (clearValueType === void 0) {
          clearValueType = ClearValueType.FLOAT_TYPE;
        }

        this.name = void 0;
        this.accessType = void 0;
        this.clearFlags = void 0;
        this.clearColor = void 0;
        this.clearValueType = void 0;
        this.name = name;
        this.accessType = accessType;
        this.clearFlags = clearFlags;
        this.clearColor = clearColor;
        this.clearValueType = clearValueType;
      });

      _export("LightInfo", LightInfo = function LightInfo(light, level) {
        if (light === void 0) {
          light = null;
        }

        if (level === void 0) {
          level = 0;
        }

        this.light = void 0;
        this.level = void 0;
        this.light = light;
        this.level = level;
      }
      /*refcount*/
      );

      (function (DescriptorTypeOrder) {
        DescriptorTypeOrder[DescriptorTypeOrder["UNIFORM_BUFFER"] = 0] = "UNIFORM_BUFFER";
        DescriptorTypeOrder[DescriptorTypeOrder["DYNAMIC_UNIFORM_BUFFER"] = 1] = "DYNAMIC_UNIFORM_BUFFER";
        DescriptorTypeOrder[DescriptorTypeOrder["SAMPLER_TEXTURE"] = 2] = "SAMPLER_TEXTURE";
        DescriptorTypeOrder[DescriptorTypeOrder["SAMPLER"] = 3] = "SAMPLER";
        DescriptorTypeOrder[DescriptorTypeOrder["TEXTURE"] = 4] = "TEXTURE";
        DescriptorTypeOrder[DescriptorTypeOrder["STORAGE_BUFFER"] = 5] = "STORAGE_BUFFER";
        DescriptorTypeOrder[DescriptorTypeOrder["DYNAMIC_STORAGE_BUFFER"] = 6] = "DYNAMIC_STORAGE_BUFFER";
        DescriptorTypeOrder[DescriptorTypeOrder["STORAGE_IMAGE"] = 7] = "STORAGE_IMAGE";
        DescriptorTypeOrder[DescriptorTypeOrder["INPUT_ATTACHMENT"] = 8] = "INPUT_ATTACHMENT";
      })(DescriptorTypeOrder || _export("DescriptorTypeOrder", DescriptorTypeOrder = {}));

      _export("Descriptor", Descriptor = function Descriptor(type) {
        if (type === void 0) {
          type = Type.UNKNOWN;
        }

        this.type = void 0;
        this.count = 1;
        this.type = type;
      });

      _export("DescriptorBlock", DescriptorBlock = function DescriptorBlock() {
        this.descriptors = new Map();
        this.uniformBlocks = new Map();
        this.capacity = 0;
        this.count = 0;
      });

      _export("DescriptorBlockFlattened", DescriptorBlockFlattened = function DescriptorBlockFlattened() {
        this.descriptorNames = [];
        this.uniformBlockNames = [];
        this.descriptors = [];
        this.uniformBlocks = [];
        this.capacity = 0;
        this.count = 0;
      });

      _export("DescriptorBlockIndex", DescriptorBlockIndex = function DescriptorBlockIndex(updateFrequency, parameterType, descriptorType, visibility) {
        if (updateFrequency === void 0) {
          updateFrequency = UpdateFrequency.PER_INSTANCE;
        }

        if (parameterType === void 0) {
          parameterType = ParameterType.CONSTANTS;
        }

        if (descriptorType === void 0) {
          descriptorType = DescriptorTypeOrder.UNIFORM_BUFFER;
        }

        if (visibility === void 0) {
          visibility = ShaderStageFlagBit.NONE;
        }

        this.updateFrequency = void 0;
        this.parameterType = void 0;
        this.descriptorType = void 0;
        this.visibility = void 0;
        this.updateFrequency = updateFrequency;
        this.parameterType = parameterType;
        this.descriptorType = descriptorType;
        this.visibility = visibility;
      });

      _export("CopyPair", CopyPair = function CopyPair(source, target, mipLevels, numSlices, sourceMostDetailedMip, sourceFirstSlice, sourcePlaneSlice, targetMostDetailedMip, targetFirstSlice, targetPlaneSlice) {
        if (source === void 0) {
          source = '';
        }

        if (target === void 0) {
          target = '';
        }

        if (mipLevels === void 0) {
          mipLevels = 0xFFFFFFFF;
        }

        if (numSlices === void 0) {
          numSlices = 0xFFFFFFFF;
        }

        if (sourceMostDetailedMip === void 0) {
          sourceMostDetailedMip = 0;
        }

        if (sourceFirstSlice === void 0) {
          sourceFirstSlice = 0;
        }

        if (sourcePlaneSlice === void 0) {
          sourcePlaneSlice = 0;
        }

        if (targetMostDetailedMip === void 0) {
          targetMostDetailedMip = 0;
        }

        if (targetFirstSlice === void 0) {
          targetFirstSlice = 0;
        }

        if (targetPlaneSlice === void 0) {
          targetPlaneSlice = 0;
        }

        this.source = void 0;
        this.target = void 0;
        this.mipLevels = void 0;
        this.numSlices = void 0;
        this.sourceMostDetailedMip = void 0;
        this.sourceFirstSlice = void 0;
        this.sourcePlaneSlice = void 0;
        this.targetMostDetailedMip = void 0;
        this.targetFirstSlice = void 0;
        this.targetPlaneSlice = void 0;
        this.source = source;
        this.target = target;
        this.mipLevels = mipLevels;
        this.numSlices = numSlices;
        this.sourceMostDetailedMip = sourceMostDetailedMip;
        this.sourceFirstSlice = sourceFirstSlice;
        this.sourcePlaneSlice = sourcePlaneSlice;
        this.targetMostDetailedMip = targetMostDetailedMip;
        this.targetFirstSlice = targetFirstSlice;
        this.targetPlaneSlice = targetPlaneSlice;
      });

      _export("MovePair", MovePair = function MovePair(source, target, mipLevels, numSlices, targetMostDetailedMip, targetFirstSlice, targetPlaneSlice) {
        if (source === void 0) {
          source = '';
        }

        if (target === void 0) {
          target = '';
        }

        if (mipLevels === void 0) {
          mipLevels = 0xFFFFFFFF;
        }

        if (numSlices === void 0) {
          numSlices = 0xFFFFFFFF;
        }

        if (targetMostDetailedMip === void 0) {
          targetMostDetailedMip = 0;
        }

        if (targetFirstSlice === void 0) {
          targetFirstSlice = 0;
        }

        if (targetPlaneSlice === void 0) {
          targetPlaneSlice = 0;
        }

        this.source = void 0;
        this.target = void 0;
        this.mipLevels = void 0;
        this.numSlices = void 0;
        this.targetMostDetailedMip = void 0;
        this.targetFirstSlice = void 0;
        this.targetPlaneSlice = void 0;
        this.source = source;
        this.target = target;
        this.mipLevels = mipLevels;
        this.numSlices = numSlices;
        this.targetMostDetailedMip = targetMostDetailedMip;
        this.targetFirstSlice = targetFirstSlice;
        this.targetPlaneSlice = targetPlaneSlice;
      });

      _export("PipelineStatistics", PipelineStatistics = function PipelineStatistics() {
        this.numRenderPasses = 0;
        this.numManagedTextures = 0;
        this.totalManagedTextures = 0;
        this.numUploadBuffers = 0;
        this.numUploadBufferViews = 0;
        this.numFreeUploadBuffers = 0;
        this.numFreeUploadBufferViews = 0;
        this.numDescriptorSets = 0;
        this.numFreeDescriptorSets = 0;
        this.numInstancingBuffers = 0;
        this.numInstancingUniformBlocks = 0;
      });
    }
  };
});