System.register("q-bundled:///fs/cocos/rendering/custom/layout-graph.js", ["./graph.js", "../../gfx/index.js", "./types.js", "./serialization.js"], function (_export, _context) {
  "use strict";

  var AdjI, ED, InEI, OutE, OutEI, directional, findRelative, getPath, parallel, reindexEdgeList, traversal, DescriptorSetLayoutInfo, ShaderStageFlagBit, Type, UniformBlock, DescriptorBlock, saveDescriptorBlock, loadDescriptorBlock, DescriptorBlockIndex, saveDescriptorBlockIndex, loadDescriptorBlockIndex, DescriptorTypeOrder, saveUniformBlock, loadUniformBlock, saveDescriptorSetLayoutInfo, loadDescriptorSetLayoutInfo, DescriptorDB, RenderPhase, LayoutGraphValue, LayoutGraphVertex, LayoutGraphNameMap, LayoutGraphDescriptorsMap, LayoutGraphComponent, LayoutGraph, UniformData, UniformBlockData, DescriptorData, DescriptorBlockData, DescriptorSetLayoutData, DescriptorSetData, PipelineLayoutData, ShaderBindingData, ShaderLayoutData, TechniqueData, EffectData, ShaderProgramData, RenderStageData, RenderPhaseData, LayoutGraphDataValue, LayoutGraphDataVertex, LayoutGraphDataNameMap, LayoutGraphDataUpdateMap, LayoutGraphDataLayoutMap, LayoutGraphDataComponent, LayoutGraphData;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function getLayoutGraphValueName(e) {
    switch (e) {
      case LayoutGraphValue.RenderStage:
        return 'RenderStage';

      case LayoutGraphValue.RenderPhase:
        return 'RenderPhase';

      default:
        return '';
    }
  }

  function getLayoutGraphDataValueName(e) {
    switch (e) {
      case LayoutGraphDataValue.RenderStage:
        return 'RenderStage';

      case LayoutGraphDataValue.RenderPhase:
        return 'RenderPhase';

      default:
        return '';
    }
  }

  function saveDescriptorDB(ar, v) {
    ar.writeNumber(v.blocks.size); // Map<string, DescriptorBlock>

    for (var _iterator15 = _createForOfIteratorHelperLoose(v.blocks), _step15; !(_step15 = _iterator15()).done;) {
      var _step15$value = _step15.value,
          k1 = _step15$value[0],
          v1 = _step15$value[1];
      saveDescriptorBlockIndex(ar, JSON.parse(k1));
      saveDescriptorBlock(ar, v1);
    }
  }

  function loadDescriptorDB(ar, v) {
    var sz = 0;
    sz = ar.readNumber(); // Map<string, DescriptorBlock>

    for (var i1 = 0; i1 !== sz; ++i1) {
      var k1 = new DescriptorBlockIndex();
      loadDescriptorBlockIndex(ar, k1);
      var v1 = new DescriptorBlock();
      loadDescriptorBlock(ar, v1);
      v.blocks.set(JSON.stringify(k1), v1);
    }
  }

  function saveRenderPhase(ar, v) {
    ar.writeNumber(v.shaders.size); // Set<string>

    for (var _iterator16 = _createForOfIteratorHelperLoose(v.shaders), _step16; !(_step16 = _iterator16()).done;) {
      var v1 = _step16.value;
      ar.writeString(v1);
    }
  }

  function loadRenderPhase(ar, v) {
    var sz = 0;
    sz = ar.readNumber(); // Set<string>

    for (var i1 = 0; i1 !== sz; ++i1) {
      var v1 = ar.readString();
      v.shaders.add(v1);
    }
  }

  function saveLayoutGraph(ar, g) {
    var numVertices = g.numVertices();
    var numEdges = g.numEdges();
    ar.writeNumber(numVertices);
    ar.writeNumber(numEdges);
    var numStages = 0;
    var numPhases = 0;

    for (var _iterator17 = _createForOfIteratorHelperLoose(g.vertices()), _step17; !(_step17 = _iterator17()).done;) {
      var v = _step17.value;

      switch (g.id(v)) {
        case LayoutGraphValue.RenderStage:
          numStages += 1;
          break;

        case LayoutGraphValue.RenderPhase:
          numPhases += 1;
          break;

        default:
          break;
      }
    }

    ar.writeNumber(numStages);
    ar.writeNumber(numPhases);

    for (var _iterator18 = _createForOfIteratorHelperLoose(g.vertices()), _step18; !(_step18 = _iterator18()).done;) {
      var _v = _step18.value;
      ar.writeNumber(g.id(_v));
      ar.writeNumber(g.getParent(_v));
      ar.writeString(g.getName(_v));
      saveDescriptorDB(ar, g.getDescriptors(_v));

      switch (g.id(_v)) {
        case LayoutGraphValue.RenderStage:
          ar.writeNumber(g.getRenderStage(_v));
          break;

        case LayoutGraphValue.RenderPhase:
          saveRenderPhase(ar, g.getRenderPhase(_v));
          break;

        default:
          break;
      }
    }
  }

  function loadLayoutGraph(ar, g) {
    var numVertices = ar.readNumber();
    var numEdges = ar.readNumber();
    var numStages = ar.readNumber();
    var numPhases = ar.readNumber();

    for (var v = 0; v !== numVertices; ++v) {
      var _id = ar.readNumber();

      var u = ar.readNumber();
      var name = ar.readString();

      var _descriptors = new DescriptorDB();

      loadDescriptorDB(ar, _descriptors);

      switch (_id) {
        case LayoutGraphValue.RenderStage:
          {
            var _renderStage = ar.readNumber();

            g.addVertex(LayoutGraphValue.RenderStage, _renderStage, name, _descriptors, u);
            break;
          }

        case LayoutGraphValue.RenderPhase:
          {
            var _renderPhase = new RenderPhase();

            loadRenderPhase(ar, _renderPhase);
            g.addVertex(LayoutGraphValue.RenderPhase, _renderPhase, name, _descriptors, u);
            break;
          }

        default:
          break;
      }
    }
  }

  function saveUniformData(ar, v) {
    ar.writeNumber(v.uniformID);
    ar.writeNumber(v.uniformType);
    ar.writeNumber(v.offset);
    ar.writeNumber(v.size);
  }

  function loadUniformData(ar, v) {
    v.uniformID = ar.readNumber();
    v.uniformType = ar.readNumber();
    v.offset = ar.readNumber();
    v.size = ar.readNumber();
  }

  function saveUniformBlockData(ar, v) {
    ar.writeNumber(v.bufferSize);
    ar.writeNumber(v.uniforms.length); // UniformData[]

    for (var _iterator19 = _createForOfIteratorHelperLoose(v.uniforms), _step19; !(_step19 = _iterator19()).done;) {
      var v1 = _step19.value;
      saveUniformData(ar, v1);
    }
  }

  function loadUniformBlockData(ar, v) {
    v.bufferSize = ar.readNumber();
    var sz = 0;
    sz = ar.readNumber(); // UniformData[]

    v.uniforms.length = sz;

    for (var i1 = 0; i1 !== sz; ++i1) {
      var v1 = new UniformData();
      loadUniformData(ar, v1);
      v.uniforms[i1] = v1;
    }
  }

  function saveDescriptorData(ar, v) {
    ar.writeNumber(v.descriptorID);
    ar.writeNumber(v.type);
    ar.writeNumber(v.count);
  }

  function loadDescriptorData(ar, v) {
    v.descriptorID = ar.readNumber();
    v.type = ar.readNumber();
    v.count = ar.readNumber();
  }

  function saveDescriptorBlockData(ar, v) {
    ar.writeNumber(v.type);
    ar.writeNumber(v.visibility);
    ar.writeNumber(v.offset);
    ar.writeNumber(v.capacity);
    ar.writeNumber(v.descriptors.length); // DescriptorData[]

    for (var _iterator20 = _createForOfIteratorHelperLoose(v.descriptors), _step20; !(_step20 = _iterator20()).done;) {
      var v1 = _step20.value;
      saveDescriptorData(ar, v1);
    }
  }

  function loadDescriptorBlockData(ar, v) {
    v.type = ar.readNumber();
    v.visibility = ar.readNumber();
    v.offset = ar.readNumber();
    v.capacity = ar.readNumber();
    var sz = 0;
    sz = ar.readNumber(); // DescriptorData[]

    v.descriptors.length = sz;

    for (var i1 = 0; i1 !== sz; ++i1) {
      var v1 = new DescriptorData();
      loadDescriptorData(ar, v1);
      v.descriptors[i1] = v1;
    }
  }

  function saveDescriptorSetLayoutData(ar, v) {
    ar.writeNumber(v.slot);
    ar.writeNumber(v.capacity);
    ar.writeNumber(v.uniformBlockCapacity);
    ar.writeNumber(v.samplerTextureCapacity);
    ar.writeNumber(v.descriptorBlocks.length); // DescriptorBlockData[]

    for (var _iterator21 = _createForOfIteratorHelperLoose(v.descriptorBlocks), _step21; !(_step21 = _iterator21()).done;) {
      var v1 = _step21.value;
      saveDescriptorBlockData(ar, v1);
    }

    ar.writeNumber(v.uniformBlocks.size); // Map<number, UniformBlock>

    for (var _iterator22 = _createForOfIteratorHelperLoose(v.uniformBlocks), _step22; !(_step22 = _iterator22()).done;) {
      var _step22$value = _step22.value,
          k1 = _step22$value[0],
          _v2 = _step22$value[1];
      ar.writeNumber(k1);
      saveUniformBlock(ar, _v2);
    }

    ar.writeNumber(v.bindingMap.size); // Map<number, number>

    for (var _iterator23 = _createForOfIteratorHelperLoose(v.bindingMap), _step23; !(_step23 = _iterator23()).done;) {
      var _step23$value = _step23.value,
          _k = _step23$value[0],
          _v3 = _step23$value[1];
      ar.writeNumber(_k);
      ar.writeNumber(_v3);
    }
  }

  function loadDescriptorSetLayoutData(ar, v) {
    v.slot = ar.readNumber();
    v.capacity = ar.readNumber();
    v.uniformBlockCapacity = ar.readNumber();
    v.samplerTextureCapacity = ar.readNumber();
    var sz = 0;
    sz = ar.readNumber(); // DescriptorBlockData[]

    v.descriptorBlocks.length = sz;

    for (var i1 = 0; i1 !== sz; ++i1) {
      var v1 = new DescriptorBlockData();
      loadDescriptorBlockData(ar, v1);
      v.descriptorBlocks[i1] = v1;
    }

    sz = ar.readNumber(); // Map<number, UniformBlock>

    for (var _i7 = 0; _i7 !== sz; ++_i7) {
      var k1 = ar.readNumber();

      var _v4 = new UniformBlock();

      loadUniformBlock(ar, _v4);
      v.uniformBlocks.set(k1, _v4);
    }

    sz = ar.readNumber(); // Map<number, number>

    for (var _i8 = 0; _i8 !== sz; ++_i8) {
      var _k2 = ar.readNumber();

      var _v5 = ar.readNumber();

      v.bindingMap.set(_k2, _v5);
    }
  }

  function saveDescriptorSetData(ar, v) {
    saveDescriptorSetLayoutData(ar, v.descriptorSetLayoutData);
    saveDescriptorSetLayoutInfo(ar, v.descriptorSetLayoutInfo); // skip, v.descriptorSetLayout: DescriptorSetLayout
    // skip, v.descriptorSet: DescriptorSet
  }

  function loadDescriptorSetData(ar, v) {
    loadDescriptorSetLayoutData(ar, v.descriptorSetLayoutData);
    loadDescriptorSetLayoutInfo(ar, v.descriptorSetLayoutInfo); // skip, v.descriptorSetLayout: DescriptorSetLayout
    // skip, v.descriptorSet: DescriptorSet
  }

  function savePipelineLayoutData(ar, v) {
    ar.writeNumber(v.descriptorSets.size); // Map<UpdateFrequency, DescriptorSetData>

    for (var _iterator24 = _createForOfIteratorHelperLoose(v.descriptorSets), _step24; !(_step24 = _iterator24()).done;) {
      var _step24$value = _step24.value,
          k1 = _step24$value[0],
          v1 = _step24$value[1];
      ar.writeNumber(k1);
      saveDescriptorSetData(ar, v1);
    }
  }

  function loadPipelineLayoutData(ar, v) {
    var sz = 0;
    sz = ar.readNumber(); // Map<UpdateFrequency, DescriptorSetData>

    for (var i1 = 0; i1 !== sz; ++i1) {
      var k1 = ar.readNumber();
      var v1 = new DescriptorSetData();
      loadDescriptorSetData(ar, v1);
      v.descriptorSets.set(k1, v1);
    }
  }

  function saveShaderBindingData(ar, v) {
    ar.writeNumber(v.descriptorBindings.size); // Map<number, number>

    for (var _iterator25 = _createForOfIteratorHelperLoose(v.descriptorBindings), _step25; !(_step25 = _iterator25()).done;) {
      var _step25$value = _step25.value,
          k1 = _step25$value[0],
          v1 = _step25$value[1];
      ar.writeNumber(k1);
      ar.writeNumber(v1);
    }
  }

  function loadShaderBindingData(ar, v) {
    var sz = 0;
    sz = ar.readNumber(); // Map<number, number>

    for (var i1 = 0; i1 !== sz; ++i1) {
      var k1 = ar.readNumber();
      var v1 = ar.readNumber();
      v.descriptorBindings.set(k1, v1);
    }
  }

  function saveShaderLayoutData(ar, v) {
    ar.writeNumber(v.layoutData.size); // Map<UpdateFrequency, DescriptorSetLayoutData>

    for (var _iterator26 = _createForOfIteratorHelperLoose(v.layoutData), _step26; !(_step26 = _iterator26()).done;) {
      var _step26$value = _step26.value,
          k1 = _step26$value[0],
          v1 = _step26$value[1];
      ar.writeNumber(k1);
      saveDescriptorSetLayoutData(ar, v1);
    }

    ar.writeNumber(v.bindingData.size); // Map<UpdateFrequency, ShaderBindingData>

    for (var _iterator27 = _createForOfIteratorHelperLoose(v.bindingData), _step27; !(_step27 = _iterator27()).done;) {
      var _step27$value = _step27.value,
          _k3 = _step27$value[0],
          _v6 = _step27$value[1];
      ar.writeNumber(_k3);
      saveShaderBindingData(ar, _v6);
    }
  }

  function loadShaderLayoutData(ar, v) {
    var sz = 0;
    sz = ar.readNumber(); // Map<UpdateFrequency, DescriptorSetLayoutData>

    for (var i1 = 0; i1 !== sz; ++i1) {
      var k1 = ar.readNumber();
      var v1 = new DescriptorSetLayoutData();
      loadDescriptorSetLayoutData(ar, v1);
      v.layoutData.set(k1, v1);
    }

    sz = ar.readNumber(); // Map<UpdateFrequency, ShaderBindingData>

    for (var _i9 = 0; _i9 !== sz; ++_i9) {
      var _k4 = ar.readNumber();

      var _v7 = new ShaderBindingData();

      loadShaderBindingData(ar, _v7);
      v.bindingData.set(_k4, _v7);
    }
  }

  function saveTechniqueData(ar, v) {
    ar.writeNumber(v.passes.length); // ShaderLayoutData[]

    for (var _iterator28 = _createForOfIteratorHelperLoose(v.passes), _step28; !(_step28 = _iterator28()).done;) {
      var v1 = _step28.value;
      saveShaderLayoutData(ar, v1);
    }
  }

  function loadTechniqueData(ar, v) {
    var sz = 0;
    sz = ar.readNumber(); // ShaderLayoutData[]

    v.passes.length = sz;

    for (var i1 = 0; i1 !== sz; ++i1) {
      var v1 = new ShaderLayoutData();
      loadShaderLayoutData(ar, v1);
      v.passes[i1] = v1;
    }
  }

  function saveEffectData(ar, v) {
    ar.writeNumber(v.techniques.size); // Map<string, TechniqueData>

    for (var _iterator29 = _createForOfIteratorHelperLoose(v.techniques), _step29; !(_step29 = _iterator29()).done;) {
      var _step29$value = _step29.value,
          k1 = _step29$value[0],
          v1 = _step29$value[1];
      ar.writeString(k1);
      saveTechniqueData(ar, v1);
    }
  }

  function loadEffectData(ar, v) {
    var sz = 0;
    sz = ar.readNumber(); // Map<string, TechniqueData>

    for (var i1 = 0; i1 !== sz; ++i1) {
      var k1 = ar.readString();
      var v1 = new TechniqueData();
      loadTechniqueData(ar, v1);
      v.techniques.set(k1, v1);
    }
  }

  function saveShaderProgramData(ar, v) {
    savePipelineLayoutData(ar, v.layout); // skip, v.pipelineLayout: PipelineLayout
  }

  function loadShaderProgramData(ar, v) {
    loadPipelineLayoutData(ar, v.layout); // skip, v.pipelineLayout: PipelineLayout
  }

  function saveRenderStageData(ar, v) {
    ar.writeNumber(v.descriptorVisibility.size); // Map<number, ShaderStageFlagBit>

    for (var _iterator30 = _createForOfIteratorHelperLoose(v.descriptorVisibility), _step30; !(_step30 = _iterator30()).done;) {
      var _step30$value = _step30.value,
          k1 = _step30$value[0],
          v1 = _step30$value[1];
      ar.writeNumber(k1);
      ar.writeNumber(v1);
    }
  }

  function loadRenderStageData(ar, v) {
    var sz = 0;
    sz = ar.readNumber(); // Map<number, ShaderStageFlagBit>

    for (var i1 = 0; i1 !== sz; ++i1) {
      var k1 = ar.readNumber();
      var v1 = ar.readNumber();
      v.descriptorVisibility.set(k1, v1);
    }
  }

  function saveRenderPhaseData(ar, v) {
    ar.writeString(v.rootSignature);
    ar.writeNumber(v.shaderPrograms.length); // ShaderProgramData[]

    for (var _iterator31 = _createForOfIteratorHelperLoose(v.shaderPrograms), _step31; !(_step31 = _iterator31()).done;) {
      var v1 = _step31.value;
      saveShaderProgramData(ar, v1);
    }

    ar.writeNumber(v.shaderIndex.size); // Map<string, number>

    for (var _iterator32 = _createForOfIteratorHelperLoose(v.shaderIndex), _step32; !(_step32 = _iterator32()).done;) {
      var _step32$value = _step32.value,
          k1 = _step32$value[0],
          _v8 = _step32$value[1];
      ar.writeString(k1);
      ar.writeNumber(_v8);
    } // skip, v.pipelineLayout: PipelineLayout

  }

  function loadRenderPhaseData(ar, v) {
    v.rootSignature = ar.readString();
    var sz = 0;
    sz = ar.readNumber(); // ShaderProgramData[]

    v.shaderPrograms.length = sz;

    for (var i1 = 0; i1 !== sz; ++i1) {
      var v1 = new ShaderProgramData();
      loadShaderProgramData(ar, v1);
      v.shaderPrograms[i1] = v1;
    }

    sz = ar.readNumber(); // Map<string, number>

    for (var _i10 = 0; _i10 !== sz; ++_i10) {
      var k1 = ar.readString();

      var _v9 = ar.readNumber();

      v.shaderIndex.set(k1, _v9);
    } // skip, v.pipelineLayout: PipelineLayout

  }

  function saveLayoutGraphData(ar, g) {
    var numVertices = g.numVertices();
    var numEdges = g.numEdges();
    ar.writeNumber(numVertices);
    ar.writeNumber(numEdges);
    var numStages = 0;
    var numPhases = 0;

    for (var _iterator33 = _createForOfIteratorHelperLoose(g.vertices()), _step33; !(_step33 = _iterator33()).done;) {
      var v = _step33.value;

      switch (g.id(v)) {
        case LayoutGraphDataValue.RenderStage:
          numStages += 1;
          break;

        case LayoutGraphDataValue.RenderPhase:
          numPhases += 1;
          break;

        default:
          break;
      }
    }

    ar.writeNumber(numStages);
    ar.writeNumber(numPhases);

    for (var _iterator34 = _createForOfIteratorHelperLoose(g.vertices()), _step34; !(_step34 = _iterator34()).done;) {
      var _v10 = _step34.value;
      ar.writeNumber(g.id(_v10));
      ar.writeNumber(g.getParent(_v10));
      ar.writeString(g.getName(_v10));
      ar.writeNumber(g.getUpdate(_v10));
      savePipelineLayoutData(ar, g.getLayout(_v10));

      switch (g.id(_v10)) {
        case LayoutGraphDataValue.RenderStage:
          saveRenderStageData(ar, g.getRenderStage(_v10));
          break;

        case LayoutGraphDataValue.RenderPhase:
          saveRenderPhaseData(ar, g.getRenderPhase(_v10));
          break;

        default:
          break;
      }
    }

    ar.writeNumber(g.valueNames.length); // string[]

    for (var _iterator35 = _createForOfIteratorHelperLoose(g.valueNames), _step35; !(_step35 = _iterator35()).done;) {
      var v1 = _step35.value;
      ar.writeString(v1);
    }

    ar.writeNumber(g.attributeIndex.size); // Map<string, number>

    for (var _iterator36 = _createForOfIteratorHelperLoose(g.attributeIndex), _step36; !(_step36 = _iterator36()).done;) {
      var _step36$value = _step36.value,
          k1 = _step36$value[0],
          _v11 = _step36$value[1];
      ar.writeString(k1);
      ar.writeNumber(_v11);
    }

    ar.writeNumber(g.constantIndex.size); // Map<string, number>

    for (var _iterator37 = _createForOfIteratorHelperLoose(g.constantIndex), _step37; !(_step37 = _iterator37()).done;) {
      var _step37$value = _step37.value,
          _k5 = _step37$value[0],
          _v12 = _step37$value[1];
      ar.writeString(_k5);
      ar.writeNumber(_v12);
    }

    ar.writeNumber(g.shaderLayoutIndex.size); // Map<string, number>

    for (var _iterator38 = _createForOfIteratorHelperLoose(g.shaderLayoutIndex), _step38; !(_step38 = _iterator38()).done;) {
      var _step38$value = _step38.value,
          _k6 = _step38$value[0],
          _v13 = _step38$value[1];
      ar.writeString(_k6);
      ar.writeNumber(_v13);
    }

    ar.writeNumber(g.effects.size); // Map<string, EffectData>

    for (var _iterator39 = _createForOfIteratorHelperLoose(g.effects), _step39; !(_step39 = _iterator39()).done;) {
      var _step39$value = _step39.value,
          _k7 = _step39$value[0],
          _v14 = _step39$value[1];
      ar.writeString(_k7);
      saveEffectData(ar, _v14);
    }
  }

  function loadLayoutGraphData(ar, g) {
    var numVertices = ar.readNumber();
    var numEdges = ar.readNumber();
    var numStages = ar.readNumber();
    var numPhases = ar.readNumber();

    for (var v = 0; v !== numVertices; ++v) {
      var _id2 = ar.readNumber();

      var u = ar.readNumber();
      var name = ar.readString();
      var update = ar.readNumber();
      var layout = new PipelineLayoutData();
      loadPipelineLayoutData(ar, layout);

      switch (_id2) {
        case LayoutGraphDataValue.RenderStage:
          {
            var _renderStage2 = new RenderStageData();

            loadRenderStageData(ar, _renderStage2);
            g.addVertex(LayoutGraphDataValue.RenderStage, _renderStage2, name, update, layout, u);
            break;
          }

        case LayoutGraphDataValue.RenderPhase:
          {
            var _renderPhase2 = new RenderPhaseData();

            loadRenderPhaseData(ar, _renderPhase2);
            g.addVertex(LayoutGraphDataValue.RenderPhase, _renderPhase2, name, update, layout, u);
            break;
          }

        default:
          break;
      }
    }

    var sz = 0;
    sz = ar.readNumber(); // string[]

    g.valueNames.length = sz;

    for (var i1 = 0; i1 !== sz; ++i1) {
      g.valueNames[i1] = ar.readString();
    }

    sz = ar.readNumber(); // Map<string, number>

    for (var _i11 = 0; _i11 !== sz; ++_i11) {
      var k1 = ar.readString();
      var v1 = ar.readNumber();
      g.attributeIndex.set(k1, v1);
    }

    sz = ar.readNumber(); // Map<string, number>

    for (var _i12 = 0; _i12 !== sz; ++_i12) {
      var _k8 = ar.readString();

      var _v15 = ar.readNumber();

      g.constantIndex.set(_k8, _v15);
    }

    sz = ar.readNumber(); // Map<string, number>

    for (var _i13 = 0; _i13 !== sz; ++_i13) {
      var _k9 = ar.readString();

      var _v16 = ar.readNumber();

      g.shaderLayoutIndex.set(_k9, _v16);
    }

    sz = ar.readNumber(); // Map<string, EffectData>

    for (var _i14 = 0; _i14 !== sz; ++_i14) {
      var _k10 = ar.readString();

      var _v17 = new EffectData();

      loadEffectData(ar, _v17);
      g.effects.set(_k10, _v17);
    }
  }

  _export({
    getLayoutGraphValueName: getLayoutGraphValueName,
    getLayoutGraphDataValueName: getLayoutGraphDataValueName,
    saveDescriptorDB: saveDescriptorDB,
    loadDescriptorDB: loadDescriptorDB,
    saveRenderPhase: saveRenderPhase,
    loadRenderPhase: loadRenderPhase,
    saveLayoutGraph: saveLayoutGraph,
    loadLayoutGraph: loadLayoutGraph,
    saveUniformData: saveUniformData,
    loadUniformData: loadUniformData,
    saveUniformBlockData: saveUniformBlockData,
    loadUniformBlockData: loadUniformBlockData,
    saveDescriptorData: saveDescriptorData,
    loadDescriptorData: loadDescriptorData,
    saveDescriptorBlockData: saveDescriptorBlockData,
    loadDescriptorBlockData: loadDescriptorBlockData,
    saveDescriptorSetLayoutData: saveDescriptorSetLayoutData,
    loadDescriptorSetLayoutData: loadDescriptorSetLayoutData,
    saveDescriptorSetData: saveDescriptorSetData,
    loadDescriptorSetData: loadDescriptorSetData,
    savePipelineLayoutData: savePipelineLayoutData,
    loadPipelineLayoutData: loadPipelineLayoutData,
    saveShaderBindingData: saveShaderBindingData,
    loadShaderBindingData: loadShaderBindingData,
    saveShaderLayoutData: saveShaderLayoutData,
    loadShaderLayoutData: loadShaderLayoutData,
    saveTechniqueData: saveTechniqueData,
    loadTechniqueData: loadTechniqueData,
    saveEffectData: saveEffectData,
    loadEffectData: loadEffectData,
    saveShaderProgramData: saveShaderProgramData,
    loadShaderProgramData: loadShaderProgramData,
    saveRenderStageData: saveRenderStageData,
    loadRenderStageData: loadRenderStageData,
    saveRenderPhaseData: saveRenderPhaseData,
    loadRenderPhaseData: loadRenderPhaseData,
    saveLayoutGraphData: saveLayoutGraphData,
    loadLayoutGraphData: loadLayoutGraphData
  });

  return {
    setters: [function (_graphJs) {
      AdjI = _graphJs.AdjI;
      ED = _graphJs.ED;
      InEI = _graphJs.InEI;
      OutE = _graphJs.OutE;
      OutEI = _graphJs.OutEI;
      directional = _graphJs.directional;
      findRelative = _graphJs.findRelative;
      getPath = _graphJs.getPath;
      parallel = _graphJs.parallel;
      reindexEdgeList = _graphJs.reindexEdgeList;
      traversal = _graphJs.traversal;
    }, function (_gfxIndexJs) {
      DescriptorSetLayoutInfo = _gfxIndexJs.DescriptorSetLayoutInfo;
      ShaderStageFlagBit = _gfxIndexJs.ShaderStageFlagBit;
      Type = _gfxIndexJs.Type;
      UniformBlock = _gfxIndexJs.UniformBlock;
    }, function (_typesJs) {
      DescriptorBlock = _typesJs.DescriptorBlock;
      saveDescriptorBlock = _typesJs.saveDescriptorBlock;
      loadDescriptorBlock = _typesJs.loadDescriptorBlock;
      DescriptorBlockIndex = _typesJs.DescriptorBlockIndex;
      saveDescriptorBlockIndex = _typesJs.saveDescriptorBlockIndex;
      loadDescriptorBlockIndex = _typesJs.loadDescriptorBlockIndex;
      DescriptorTypeOrder = _typesJs.DescriptorTypeOrder;
    }, function (_serializationJs) {
      saveUniformBlock = _serializationJs.saveUniformBlock;
      loadUniformBlock = _serializationJs.loadUniformBlock;
      saveDescriptorSetLayoutInfo = _serializationJs.saveDescriptorSetLayoutInfo;
      loadDescriptorSetLayoutInfo = _serializationJs.loadDescriptorSetLayoutInfo;
    }],
    execute: function () {
      _export("DescriptorDB", DescriptorDB = function DescriptorDB() {
        this.blocks = new Map();
      });

      _export("RenderPhase", RenderPhase = function RenderPhase() {
        this.shaders = new Set();
      }); //=================================================================
      // LayoutGraph
      //=================================================================
      // PolymorphicGraph Concept


      _export("LayoutGraphValue", LayoutGraphValue = {
        RenderStage: 0,
        RenderPhase: 1
      });

      //-----------------------------------------------------------------
      // Graph Concept
      _export("LayoutGraphVertex", LayoutGraphVertex = function LayoutGraphVertex(id, object) {
        this._outEdges = [];
        this._inEdges = [];
        this._id = void 0;
        this._object = void 0;
        this.id = id;
        this.object = object;
        this._id = id;
        this._object = object;
      }); //-----------------------------------------------------------------
      // PropertyGraph Concept


      _export("LayoutGraphNameMap", LayoutGraphNameMap = /*#__PURE__*/function () {
        function LayoutGraphNameMap(names) {
          this._names = void 0;
          this.names = names;
          this._names = names;
        }

        var _proto = LayoutGraphNameMap.prototype;

        _proto.get = function get(v) {
          return this._names[v];
        } // skip set, name is constant in AddressableGraph
        ;

        return LayoutGraphNameMap;
      }());

      _export("LayoutGraphDescriptorsMap", LayoutGraphDescriptorsMap = /*#__PURE__*/function () {
        function LayoutGraphDescriptorsMap(descriptors) {
          this._descriptors = void 0;
          this.descriptors = descriptors;
          this._descriptors = descriptors;
        }

        var _proto2 = LayoutGraphDescriptorsMap.prototype;

        _proto2.get = function get(v) {
          return this._descriptors[v];
        };

        return LayoutGraphDescriptorsMap;
      }()); //-----------------------------------------------------------------
      // ComponentGraph Concept


      _export("LayoutGraphComponent", LayoutGraphComponent = {
        Name: 0,
        Descriptors: 1
      });

      //-----------------------------------------------------------------
      // LayoutGraph Implementation
      _export("LayoutGraph", LayoutGraph = /*#__PURE__*/function () {
        function LayoutGraph() {
          this.directed_category = directional.bidirectional;
          this.edge_parallel_category = parallel.allow;
          this.traversal_category = traversal.incidence | traversal.bidirectional | traversal.adjacency | traversal.vertex_list;
          this.components = ['Name', 'Descriptors'];
          this._vertices = [];
          this._names = [];
          this._descriptors = [];
        }

        var _proto3 = LayoutGraph.prototype;

        //-----------------------------------------------------------------
        // Graph
        // type vertex_descriptor = number;
        _proto3.nullVertex = function nullVertex() {
          return 0xFFFFFFFF;
        } // type edge_descriptor = ED;
        ;

        //-----------------------------------------------------------------
        // IncidenceGraph
        // type out_edge_iterator = OutEI;
        // type degree_size_type = number;
        _proto3.edge = function edge(u, v) {
          for (var _iterator = _createForOfIteratorHelperLoose(this._vertices[u]._outEdges), _step; !(_step = _iterator()).done;) {
            var oe = _step.value;

            if (v === oe.target) {
              return true;
            }
          }

          return false;
        };

        _proto3.source = function source(e) {
          return e.source;
        };

        _proto3.target = function target(e) {
          return e.target;
        };

        _proto3.outEdges = function outEdges(v) {
          return new OutEI(this._vertices[v]._outEdges.values(), v);
        };

        _proto3.outDegree = function outDegree(v) {
          return this._vertices[v]._outEdges.length;
        } //-----------------------------------------------------------------
        // BidirectionalGraph
        // type in_edge_iterator = InEI;
        ;

        _proto3.inEdges = function inEdges(v) {
          return new InEI(this._vertices[v]._inEdges.values(), v);
        };

        _proto3.inDegree = function inDegree(v) {
          return this._vertices[v]._inEdges.length;
        };

        _proto3.degree = function degree(v) {
          return this.outDegree(v) + this.inDegree(v);
        } //-----------------------------------------------------------------
        // AdjacencyGraph
        // type adjacency_iterator = AdjI;
        ;

        _proto3.adjacentVertices = function adjacentVertices(v) {
          return new AdjI(this, this.outEdges(v));
        } //-----------------------------------------------------------------
        // VertexListGraph
        ;

        _proto3.vertices = function vertices() {
          return this._vertices.keys();
        };

        _proto3.numVertices = function numVertices() {
          return this._vertices.length;
        } //-----------------------------------------------------------------
        // EdgeListGraph
        ;

        _proto3.numEdges = function numEdges() {
          var numEdges = 0;

          for (var _iterator2 = _createForOfIteratorHelperLoose(this.vertices()), _step2; !(_step2 = _iterator2()).done;) {
            var v = _step2.value;
            numEdges += this.outDegree(v);
          }

          return numEdges;
        } //-----------------------------------------------------------------
        // MutableGraph
        ;

        _proto3.clear = function clear() {
          // ComponentGraph
          this._names.length = 0;
          this._descriptors.length = 0; // Graph Vertices

          this._vertices.length = 0;
        };

        _proto3.addVertex = function addVertex(id, object, name, descriptors, u) {
          if (u === void 0) {
            u = 0xFFFFFFFF;
          }

          var vert = new LayoutGraphVertex(id, object);
          var v = this._vertices.length;

          this._vertices.push(vert);

          this._names.push(name);

          this._descriptors.push(descriptors); // ReferenceGraph


          if (u !== 0xFFFFFFFF) {
            this.addEdge(u, v);
          }

          return v;
        };

        _proto3.clearVertex = function clearVertex(v) {
          // ReferenceGraph(Alias)
          var vert = this._vertices[v]; // clear out edges

          for (var _iterator3 = _createForOfIteratorHelperLoose(vert._outEdges), _step3; !(_step3 = _iterator3()).done;) {
            var oe = _step3.value;
            var target = this._vertices[oe.target];

            for (var i = 0; i !== target._inEdges.length;) {
              // remove all edges
              if (target._inEdges[i].target === v) {
                target._inEdges.splice(i, 1);
              } else {
                ++i;
              }
            }
          }

          vert._outEdges.length = 0; // clear in edges

          for (var _iterator4 = _createForOfIteratorHelperLoose(vert._inEdges), _step4; !(_step4 = _iterator4()).done;) {
            var ie = _step4.value;
            var source = this._vertices[ie.target];

            for (var _i = 0; _i !== source._outEdges.length;) {
              // remove all edges
              if (source._outEdges[_i].target === v) {
                source._outEdges.splice(_i, 1);
              } else {
                ++_i;
              }
            }
          }

          vert._inEdges.length = 0;
        };

        _proto3.removeVertex = function removeVertex(u) {
          this._vertices.splice(u, 1);

          this._names.splice(u, 1);

          this._descriptors.splice(u, 1);

          var sz = this._vertices.length;

          if (u === sz) {
            return;
          }

          for (var v = 0; v !== sz; ++v) {
            var vert = this._vertices[v];
            reindexEdgeList(vert._outEdges, u);
            reindexEdgeList(vert._inEdges, u);
          }
        };

        _proto3.addEdge = function addEdge(u, v) {
          // update in/out edge list
          this._vertices[u]._outEdges.push(new OutE(v));

          this._vertices[v]._inEdges.push(new OutE(u));

          return new ED(u, v);
        };

        _proto3.removeEdges = function removeEdges(u, v) {
          var source = this._vertices[u]; // remove out edges of u

          for (var i = 0; i !== source._outEdges.length;) {
            // remove all edges
            if (source._outEdges[i].target === v) {
              source._outEdges.splice(i, 1);
            } else {
              ++i;
            }
          } // remove in edges of v


          var target = this._vertices[v];

          for (var _i2 = 0; _i2 !== target._inEdges.length;) {
            // remove all edges
            if (target._inEdges[_i2].target === u) {
              target._inEdges.splice(_i2, 1);
            } else {
              ++_i2;
            }
          }
        };

        _proto3.removeEdge = function removeEdge(e) {
          var u = e.source;
          var v = e.target;
          var source = this._vertices[u];

          for (var i = 0; i !== source._outEdges.length;) {
            if (source._outEdges[i].target === v) {
              source._outEdges.splice(i, 1);

              break; // remove one edge
            } else {
              ++i;
            }
          }

          var target = this._vertices[v];

          for (var _i3 = 0; _i3 !== target._inEdges.length;) {
            if (target._inEdges[_i3].target === u) {
              target._inEdges.splice(_i3, 1);

              break; // remove one edge
            } else {
              ++_i3;
            }
          }
        } //-----------------------------------------------------------------
        // NamedGraph
        ;

        _proto3.vertexName = function vertexName(v) {
          return this._names[v];
        };

        _proto3.vertexNameMap = function vertexNameMap() {
          return new LayoutGraphNameMap(this._names);
        } //-----------------------------------------------------------------
        // PropertyGraph
        ;

        _proto3.get = function get(tag) {
          switch (tag) {
            // Components
            case 'Name':
              return new LayoutGraphNameMap(this._names);

            case 'Descriptors':
              return new LayoutGraphDescriptorsMap(this._descriptors);

            default:
              throw Error('property map not found');
          }
        } //-----------------------------------------------------------------
        // ComponentGraph
        ;

        _proto3.component = function component(id, v) {
          switch (id) {
            case LayoutGraphComponent.Name:
              return this._names[v];

            case LayoutGraphComponent.Descriptors:
              return this._descriptors[v];

            default:
              throw Error('component not found');
          }
        };

        _proto3.componentMap = function componentMap(id) {
          switch (id) {
            case LayoutGraphComponent.Name:
              return new LayoutGraphNameMap(this._names);

            case LayoutGraphComponent.Descriptors:
              return new LayoutGraphDescriptorsMap(this._descriptors);

            default:
              throw Error('component map not found');
          }
        } // skip setName, Name is constant in AddressableGraph
        ;

        _proto3.getName = function getName(v) {
          return this._names[v];
        };

        _proto3.getDescriptors = function getDescriptors(v) {
          return this._descriptors[v];
        } //-----------------------------------------------------------------
        // PolymorphicGraph
        ;

        _proto3.holds = function holds(id, v) {
          return this._vertices[v]._id === id;
        };

        _proto3.id = function id(v) {
          return this._vertices[v]._id;
        };

        _proto3.object = function object(v) {
          return this._vertices[v]._object;
        };

        _proto3.value = function value(id, v) {
          if (this._vertices[v]._id === id) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        };

        _proto3.tryValue = function tryValue(id, v) {
          if (this._vertices[v]._id === id) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        };

        _proto3.visitVertex = function visitVertex(visitor, v) {
          var vert = this._vertices[v];

          switch (vert._id) {
            case LayoutGraphValue.RenderStage:
              return visitor.renderStage(vert._object);

            case LayoutGraphValue.RenderPhase:
              return visitor.renderPhase(vert._object);

            default:
              throw Error('polymorphic type not found');
          }
        };

        _proto3.getRenderStage = function getRenderStage(v) {
          if (this._vertices[v]._id === LayoutGraphValue.RenderStage) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        };

        _proto3.getRenderPhase = function getRenderPhase(v) {
          if (this._vertices[v]._id === LayoutGraphValue.RenderPhase) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        };

        _proto3.tryGetRenderStage = function tryGetRenderStage(v) {
          if (this._vertices[v]._id === LayoutGraphValue.RenderStage) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        };

        _proto3.tryGetRenderPhase = function tryGetRenderPhase(v) {
          if (this._vertices[v]._id === LayoutGraphValue.RenderPhase) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        } //-----------------------------------------------------------------
        // ReferenceGraph
        // type reference_descriptor = ED;
        // type child_iterator = OutEI;
        // type parent_iterator = InEI;
        ;

        _proto3.reference = function reference(u, v) {
          for (var _iterator5 = _createForOfIteratorHelperLoose(this._vertices[u]._outEdges), _step5; !(_step5 = _iterator5()).done;) {
            var oe = _step5.value;

            if (v === oe.target) {
              return true;
            }
          }

          return false;
        };

        _proto3.parent = function parent(e) {
          return e.source;
        };

        _proto3.child = function child(e) {
          return e.target;
        };

        _proto3.parents = function parents(v) {
          return new InEI(this._vertices[v]._inEdges.values(), v);
        };

        _proto3.children = function children(v) {
          return new OutEI(this._vertices[v]._outEdges.values(), v);
        };

        _proto3.numParents = function numParents(v) {
          return this._vertices[v]._inEdges.length;
        };

        _proto3.numChildren = function numChildren(v) {
          return this._vertices[v]._outEdges.length;
        };

        _proto3.getParent = function getParent(v) {
          if (v === 0xFFFFFFFF) {
            return 0xFFFFFFFF;
          }

          var list = this._vertices[v]._inEdges;

          if (list.length === 0) {
            return 0xFFFFFFFF;
          } else {
            return list[0].target;
          }
        };

        _proto3.isAncestor = function isAncestor(ancestor, descendent) {
          var pseudo = 0xFFFFFFFF;

          if (ancestor === descendent) {
            // when ancestor === descendent, is_ancestor is defined as false
            return false;
          }

          if (ancestor === pseudo) {
            // special case: pseudo root is always ancestor
            return true;
          }

          if (descendent === pseudo) {
            // special case: pseudo root is never descendent
            return false;
          }

          for (var parent = this.getParent(descendent); parent !== pseudo;) {
            if (ancestor === parent) {
              return true;
            }

            parent = this.getParent(parent);
          }

          return false;
        } //-----------------------------------------------------------------
        // MutableReferenceGraph
        ;

        _proto3.addReference = function addReference(u, v) {
          return this.addEdge(u, v);
        };

        _proto3.removeReference = function removeReference(e) {
          return this.removeEdge(e);
        };

        _proto3.removeReferences = function removeReferences(u, v) {
          return this.removeEdges(u, v);
        } //-----------------------------------------------------------------
        // ParentGraph
        ;

        _proto3.locateChild = function locateChild(u, name) {
          if (u === 0xFFFFFFFF) {
            for (var _iterator6 = _createForOfIteratorHelperLoose(this._vertices.keys()), _step6; !(_step6 = _iterator6()).done;) {
              var v = _step6.value;
              var vert = this._vertices[v];

              if (vert._inEdges.length === 0 && this._names[v] === name) {
                return v;
              }
            }

            return 0xFFFFFFFF;
          }

          for (var _iterator7 = _createForOfIteratorHelperLoose(this._vertices[u]._outEdges), _step7; !(_step7 = _iterator7()).done;) {
            var oe = _step7.value;
            var child = oe.target;

            if (name === this._names[child]) {
              return child;
            }
          }

          return 0xFFFFFFFF;
        } //-----------------------------------------------------------------
        // AddressableGraph
        ;

        _proto3.addressable = function addressable(absPath) {
          return findRelative(this, 0xFFFFFFFF, absPath) !== 0xFFFFFFFF;
        };

        _proto3.locate = function locate(absPath) {
          return findRelative(this, 0xFFFFFFFF, absPath);
        };

        _proto3.locateRelative = function locateRelative(path, start) {
          if (start === void 0) {
            start = 0xFFFFFFFF;
          }

          return findRelative(this, start, path);
        };

        _proto3.path = function path(v) {
          return getPath(this, v);
        };

        return LayoutGraph;
      }());

      _export("UniformData", UniformData = function UniformData(uniformID, uniformType, offset) {
        if (uniformID === void 0) {
          uniformID = 0xFFFFFFFF;
        }

        if (uniformType === void 0) {
          uniformType = Type.UNKNOWN;
        }

        if (offset === void 0) {
          offset = 0;
        }

        this.uniformID = void 0;
        this.uniformType = void 0;
        this.offset = void 0;
        this.size = 0;
        this.uniformID = uniformID;
        this.uniformType = uniformType;
        this.offset = offset;
      });

      _export("UniformBlockData", UniformBlockData = function UniformBlockData() {
        this.bufferSize = 0;
        this.uniforms = [];
      });

      _export("DescriptorData", DescriptorData = function DescriptorData(descriptorID, type, count) {
        if (descriptorID === void 0) {
          descriptorID = 0;
        }

        if (type === void 0) {
          type = Type.UNKNOWN;
        }

        if (count === void 0) {
          count = 1;
        }

        this.descriptorID = void 0;
        this.type = void 0;
        this.count = void 0;
        this.descriptorID = descriptorID;
        this.type = type;
        this.count = count;
      });

      _export("DescriptorBlockData", DescriptorBlockData = function DescriptorBlockData(type, visibility, capacity) {
        if (type === void 0) {
          type = DescriptorTypeOrder.UNIFORM_BUFFER;
        }

        if (visibility === void 0) {
          visibility = ShaderStageFlagBit.NONE;
        }

        if (capacity === void 0) {
          capacity = 0;
        }

        this.type = void 0;
        this.visibility = void 0;
        this.offset = 0;
        this.capacity = void 0;
        this.descriptors = [];
        this.type = type;
        this.visibility = visibility;
        this.capacity = capacity;
      });

      _export("DescriptorSetLayoutData", DescriptorSetLayoutData = function DescriptorSetLayoutData(slot, capacity, descriptorBlocks, uniformBlocks, bindingMap) {
        if (slot === void 0) {
          slot = 0xFFFFFFFF;
        }

        if (capacity === void 0) {
          capacity = 0;
        }

        if (descriptorBlocks === void 0) {
          descriptorBlocks = [];
        }

        if (uniformBlocks === void 0) {
          uniformBlocks = new Map();
        }

        if (bindingMap === void 0) {
          bindingMap = new Map();
        }

        this.slot = void 0;
        this.capacity = void 0;
        this.uniformBlockCapacity = 0;
        this.samplerTextureCapacity = 0;
        this.descriptorBlocks = void 0;
        this.uniformBlocks = void 0;
        this.bindingMap = void 0;
        this.slot = slot;
        this.capacity = capacity;
        this.descriptorBlocks = descriptorBlocks;
        this.uniformBlocks = uniformBlocks;
        this.bindingMap = bindingMap;
      });

      _export("DescriptorSetData", DescriptorSetData = function DescriptorSetData(descriptorSetLayoutData, descriptorSetLayout, descriptorSet) {
        if (descriptorSetLayoutData === void 0) {
          descriptorSetLayoutData = new DescriptorSetLayoutData();
        }

        if (descriptorSetLayout === void 0) {
          descriptorSetLayout = null;
        }

        if (descriptorSet === void 0) {
          descriptorSet = null;
        }

        this.descriptorSetLayoutData = void 0;
        this.descriptorSetLayoutInfo = new DescriptorSetLayoutInfo();
        this.descriptorSetLayout = void 0;
        this.descriptorSet = void 0;
        this.descriptorSetLayoutData = descriptorSetLayoutData;
        this.descriptorSetLayout = descriptorSetLayout;
        this.descriptorSet = descriptorSet;
      });

      _export("PipelineLayoutData", PipelineLayoutData = function PipelineLayoutData() {
        this.descriptorSets = new Map();
      });

      _export("ShaderBindingData", ShaderBindingData = function ShaderBindingData() {
        this.descriptorBindings = new Map();
      });

      _export("ShaderLayoutData", ShaderLayoutData = function ShaderLayoutData() {
        this.layoutData = new Map();
        this.bindingData = new Map();
      });

      _export("TechniqueData", TechniqueData = function TechniqueData() {
        this.passes = [];
      });

      _export("EffectData", EffectData = function EffectData() {
        this.techniques = new Map();
      });

      _export("ShaderProgramData", ShaderProgramData = function ShaderProgramData() {
        this.layout = new PipelineLayoutData();
        this.pipelineLayout = null;
      });

      _export("RenderStageData", RenderStageData = function RenderStageData() {
        this.descriptorVisibility = new Map();
      });

      _export("RenderPhaseData", RenderPhaseData = function RenderPhaseData() {
        this.rootSignature = '';
        this.shaderPrograms = [];
        this.shaderIndex = new Map();
        this.pipelineLayout = null;
      }); //=================================================================
      // LayoutGraphData
      //=================================================================
      // PolymorphicGraph Concept


      _export("LayoutGraphDataValue", LayoutGraphDataValue = {
        RenderStage: 0,
        RenderPhase: 1
      });

      //-----------------------------------------------------------------
      // Graph Concept
      _export("LayoutGraphDataVertex", LayoutGraphDataVertex = function LayoutGraphDataVertex(id, object) {
        this._outEdges = [];
        this._inEdges = [];
        this._id = void 0;
        this._object = void 0;
        this.id = id;
        this.object = object;
        this._id = id;
        this._object = object;
      }); //-----------------------------------------------------------------
      // PropertyGraph Concept


      _export("LayoutGraphDataNameMap", LayoutGraphDataNameMap = /*#__PURE__*/function () {
        function LayoutGraphDataNameMap(names) {
          this._names = void 0;
          this.names = names;
          this._names = names;
        }

        var _proto4 = LayoutGraphDataNameMap.prototype;

        _proto4.get = function get(v) {
          return this._names[v];
        } // skip set, name is constant in AddressableGraph
        ;

        return LayoutGraphDataNameMap;
      }());

      _export("LayoutGraphDataUpdateMap", LayoutGraphDataUpdateMap = /*#__PURE__*/function () {
        function LayoutGraphDataUpdateMap(updateFrequencies) {
          this._updateFrequencies = void 0;
          this.updateFrequencies = updateFrequencies;
          this._updateFrequencies = updateFrequencies;
        }

        var _proto5 = LayoutGraphDataUpdateMap.prototype;

        _proto5.get = function get(v) {
          return this._updateFrequencies[v];
        };

        _proto5.set = function set(v, updateFrequencies) {
          this._updateFrequencies[v] = updateFrequencies;
        };

        return LayoutGraphDataUpdateMap;
      }());

      _export("LayoutGraphDataLayoutMap", LayoutGraphDataLayoutMap = /*#__PURE__*/function () {
        function LayoutGraphDataLayoutMap(layouts) {
          this._layouts = void 0;
          this.layouts = layouts;
          this._layouts = layouts;
        }

        var _proto6 = LayoutGraphDataLayoutMap.prototype;

        _proto6.get = function get(v) {
          return this._layouts[v];
        };

        return LayoutGraphDataLayoutMap;
      }()); //-----------------------------------------------------------------
      // ComponentGraph Concept


      _export("LayoutGraphDataComponent", LayoutGraphDataComponent = {
        Name: 0,
        Update: 1,
        Layout: 2
      });

      //-----------------------------------------------------------------
      // LayoutGraphData Implementation
      _export("LayoutGraphData", LayoutGraphData = /*#__PURE__*/function () {
        function LayoutGraphData() {
          this.directed_category = directional.bidirectional;
          this.edge_parallel_category = parallel.allow;
          this.traversal_category = traversal.incidence | traversal.bidirectional | traversal.adjacency | traversal.vertex_list;
          this.components = ['Name', 'Update', 'Layout'];
          this._vertices = [];
          this._names = [];
          this._updateFrequencies = [];
          this._layouts = [];
          this.valueNames = [];
          this.attributeIndex = new Map();
          this.constantIndex = new Map();
          this.shaderLayoutIndex = new Map();
          this.effects = new Map();
          this.constantMacros = '';
        }

        var _proto7 = LayoutGraphData.prototype;

        //-----------------------------------------------------------------
        // Graph
        // type vertex_descriptor = number;
        _proto7.nullVertex = function nullVertex() {
          return 0xFFFFFFFF;
        } // type edge_descriptor = ED;
        ;

        //-----------------------------------------------------------------
        // IncidenceGraph
        // type out_edge_iterator = OutEI;
        // type degree_size_type = number;
        _proto7.edge = function edge(u, v) {
          for (var _iterator8 = _createForOfIteratorHelperLoose(this._vertices[u]._outEdges), _step8; !(_step8 = _iterator8()).done;) {
            var oe = _step8.value;

            if (v === oe.target) {
              return true;
            }
          }

          return false;
        };

        _proto7.source = function source(e) {
          return e.source;
        };

        _proto7.target = function target(e) {
          return e.target;
        };

        _proto7.outEdges = function outEdges(v) {
          return new OutEI(this._vertices[v]._outEdges.values(), v);
        };

        _proto7.outDegree = function outDegree(v) {
          return this._vertices[v]._outEdges.length;
        } //-----------------------------------------------------------------
        // BidirectionalGraph
        // type in_edge_iterator = InEI;
        ;

        _proto7.inEdges = function inEdges(v) {
          return new InEI(this._vertices[v]._inEdges.values(), v);
        };

        _proto7.inDegree = function inDegree(v) {
          return this._vertices[v]._inEdges.length;
        };

        _proto7.degree = function degree(v) {
          return this.outDegree(v) + this.inDegree(v);
        } //-----------------------------------------------------------------
        // AdjacencyGraph
        // type adjacency_iterator = AdjI;
        ;

        _proto7.adjacentVertices = function adjacentVertices(v) {
          return new AdjI(this, this.outEdges(v));
        } //-----------------------------------------------------------------
        // VertexListGraph
        ;

        _proto7.vertices = function vertices() {
          return this._vertices.keys();
        };

        _proto7.numVertices = function numVertices() {
          return this._vertices.length;
        } //-----------------------------------------------------------------
        // EdgeListGraph
        ;

        _proto7.numEdges = function numEdges() {
          var numEdges = 0;

          for (var _iterator9 = _createForOfIteratorHelperLoose(this.vertices()), _step9; !(_step9 = _iterator9()).done;) {
            var v = _step9.value;
            numEdges += this.outDegree(v);
          }

          return numEdges;
        } //-----------------------------------------------------------------
        // MutableGraph
        ;

        _proto7.clear = function clear() {
          // Members
          this.valueNames.length = 0;
          this.attributeIndex.clear();
          this.constantIndex.clear();
          this.shaderLayoutIndex.clear();
          this.effects.clear();
          this.constantMacros = ''; // ComponentGraph

          this._names.length = 0;
          this._updateFrequencies.length = 0;
          this._layouts.length = 0; // Graph Vertices

          this._vertices.length = 0;
        };

        _proto7.addVertex = function addVertex(id, object, name, update, layout, u) {
          if (u === void 0) {
            u = 0xFFFFFFFF;
          }

          var vert = new LayoutGraphDataVertex(id, object);
          var v = this._vertices.length;

          this._vertices.push(vert);

          this._names.push(name);

          this._updateFrequencies.push(update);

          this._layouts.push(layout); // ReferenceGraph


          if (u !== 0xFFFFFFFF) {
            this.addEdge(u, v);
          }

          return v;
        };

        _proto7.clearVertex = function clearVertex(v) {
          // ReferenceGraph(Alias)
          var vert = this._vertices[v]; // clear out edges

          for (var _iterator10 = _createForOfIteratorHelperLoose(vert._outEdges), _step10; !(_step10 = _iterator10()).done;) {
            var oe = _step10.value;
            var target = this._vertices[oe.target];

            for (var i = 0; i !== target._inEdges.length;) {
              // remove all edges
              if (target._inEdges[i].target === v) {
                target._inEdges.splice(i, 1);
              } else {
                ++i;
              }
            }
          }

          vert._outEdges.length = 0; // clear in edges

          for (var _iterator11 = _createForOfIteratorHelperLoose(vert._inEdges), _step11; !(_step11 = _iterator11()).done;) {
            var ie = _step11.value;
            var source = this._vertices[ie.target];

            for (var _i4 = 0; _i4 !== source._outEdges.length;) {
              // remove all edges
              if (source._outEdges[_i4].target === v) {
                source._outEdges.splice(_i4, 1);
              } else {
                ++_i4;
              }
            }
          }

          vert._inEdges.length = 0;
        };

        _proto7.removeVertex = function removeVertex(u) {
          this._vertices.splice(u, 1);

          this._names.splice(u, 1);

          this._updateFrequencies.splice(u, 1);

          this._layouts.splice(u, 1);

          var sz = this._vertices.length;

          if (u === sz) {
            return;
          }

          for (var v = 0; v !== sz; ++v) {
            var vert = this._vertices[v];
            reindexEdgeList(vert._outEdges, u);
            reindexEdgeList(vert._inEdges, u);
          }
        };

        _proto7.addEdge = function addEdge(u, v) {
          // update in/out edge list
          this._vertices[u]._outEdges.push(new OutE(v));

          this._vertices[v]._inEdges.push(new OutE(u));

          return new ED(u, v);
        };

        _proto7.removeEdges = function removeEdges(u, v) {
          var source = this._vertices[u]; // remove out edges of u

          for (var i = 0; i !== source._outEdges.length;) {
            // remove all edges
            if (source._outEdges[i].target === v) {
              source._outEdges.splice(i, 1);
            } else {
              ++i;
            }
          } // remove in edges of v


          var target = this._vertices[v];

          for (var _i5 = 0; _i5 !== target._inEdges.length;) {
            // remove all edges
            if (target._inEdges[_i5].target === u) {
              target._inEdges.splice(_i5, 1);
            } else {
              ++_i5;
            }
          }
        };

        _proto7.removeEdge = function removeEdge(e) {
          var u = e.source;
          var v = e.target;
          var source = this._vertices[u];

          for (var i = 0; i !== source._outEdges.length;) {
            if (source._outEdges[i].target === v) {
              source._outEdges.splice(i, 1);

              break; // remove one edge
            } else {
              ++i;
            }
          }

          var target = this._vertices[v];

          for (var _i6 = 0; _i6 !== target._inEdges.length;) {
            if (target._inEdges[_i6].target === u) {
              target._inEdges.splice(_i6, 1);

              break; // remove one edge
            } else {
              ++_i6;
            }
          }
        } //-----------------------------------------------------------------
        // NamedGraph
        ;

        _proto7.vertexName = function vertexName(v) {
          return this._names[v];
        };

        _proto7.vertexNameMap = function vertexNameMap() {
          return new LayoutGraphDataNameMap(this._names);
        } //-----------------------------------------------------------------
        // PropertyGraph
        ;

        _proto7.get = function get(tag) {
          switch (tag) {
            // Components
            case 'Name':
              return new LayoutGraphDataNameMap(this._names);

            case 'Update':
              return new LayoutGraphDataUpdateMap(this._updateFrequencies);

            case 'Layout':
              return new LayoutGraphDataLayoutMap(this._layouts);

            default:
              throw Error('property map not found');
          }
        } //-----------------------------------------------------------------
        // ComponentGraph
        ;

        _proto7.component = function component(id, v) {
          switch (id) {
            case LayoutGraphDataComponent.Name:
              return this._names[v];

            case LayoutGraphDataComponent.Update:
              return this._updateFrequencies[v];

            case LayoutGraphDataComponent.Layout:
              return this._layouts[v];

            default:
              throw Error('component not found');
          }
        };

        _proto7.componentMap = function componentMap(id) {
          switch (id) {
            case LayoutGraphDataComponent.Name:
              return new LayoutGraphDataNameMap(this._names);

            case LayoutGraphDataComponent.Update:
              return new LayoutGraphDataUpdateMap(this._updateFrequencies);

            case LayoutGraphDataComponent.Layout:
              return new LayoutGraphDataLayoutMap(this._layouts);

            default:
              throw Error('component map not found');
          }
        } // skip setName, Name is constant in AddressableGraph
        ;

        _proto7.getName = function getName(v) {
          return this._names[v];
        };

        _proto7.getUpdate = function getUpdate(v) {
          return this._updateFrequencies[v];
        };

        _proto7.setUpdate = function setUpdate(v, value) {
          this._updateFrequencies[v] = value;
        };

        _proto7.getLayout = function getLayout(v) {
          return this._layouts[v];
        } //-----------------------------------------------------------------
        // PolymorphicGraph
        ;

        _proto7.holds = function holds(id, v) {
          return this._vertices[v]._id === id;
        };

        _proto7.id = function id(v) {
          return this._vertices[v]._id;
        };

        _proto7.object = function object(v) {
          return this._vertices[v]._object;
        };

        _proto7.value = function value(id, v) {
          if (this._vertices[v]._id === id) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        };

        _proto7.tryValue = function tryValue(id, v) {
          if (this._vertices[v]._id === id) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        };

        _proto7.visitVertex = function visitVertex(visitor, v) {
          var vert = this._vertices[v];

          switch (vert._id) {
            case LayoutGraphDataValue.RenderStage:
              return visitor.renderStage(vert._object);

            case LayoutGraphDataValue.RenderPhase:
              return visitor.renderPhase(vert._object);

            default:
              throw Error('polymorphic type not found');
          }
        };

        _proto7.getRenderStage = function getRenderStage(v) {
          if (this._vertices[v]._id === LayoutGraphDataValue.RenderStage) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        };

        _proto7.getRenderPhase = function getRenderPhase(v) {
          if (this._vertices[v]._id === LayoutGraphDataValue.RenderPhase) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        };

        _proto7.tryGetRenderStage = function tryGetRenderStage(v) {
          if (this._vertices[v]._id === LayoutGraphDataValue.RenderStage) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        };

        _proto7.tryGetRenderPhase = function tryGetRenderPhase(v) {
          if (this._vertices[v]._id === LayoutGraphDataValue.RenderPhase) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        } //-----------------------------------------------------------------
        // ReferenceGraph
        // type reference_descriptor = ED;
        // type child_iterator = OutEI;
        // type parent_iterator = InEI;
        ;

        _proto7.reference = function reference(u, v) {
          for (var _iterator12 = _createForOfIteratorHelperLoose(this._vertices[u]._outEdges), _step12; !(_step12 = _iterator12()).done;) {
            var oe = _step12.value;

            if (v === oe.target) {
              return true;
            }
          }

          return false;
        };

        _proto7.parent = function parent(e) {
          return e.source;
        };

        _proto7.child = function child(e) {
          return e.target;
        };

        _proto7.parents = function parents(v) {
          return new InEI(this._vertices[v]._inEdges.values(), v);
        };

        _proto7.children = function children(v) {
          return new OutEI(this._vertices[v]._outEdges.values(), v);
        };

        _proto7.numParents = function numParents(v) {
          return this._vertices[v]._inEdges.length;
        };

        _proto7.numChildren = function numChildren(v) {
          return this._vertices[v]._outEdges.length;
        };

        _proto7.getParent = function getParent(v) {
          if (v === 0xFFFFFFFF) {
            return 0xFFFFFFFF;
          }

          var list = this._vertices[v]._inEdges;

          if (list.length === 0) {
            return 0xFFFFFFFF;
          } else {
            return list[0].target;
          }
        };

        _proto7.isAncestor = function isAncestor(ancestor, descendent) {
          var pseudo = 0xFFFFFFFF;

          if (ancestor === descendent) {
            // when ancestor === descendent, is_ancestor is defined as false
            return false;
          }

          if (ancestor === pseudo) {
            // special case: pseudo root is always ancestor
            return true;
          }

          if (descendent === pseudo) {
            // special case: pseudo root is never descendent
            return false;
          }

          for (var parent = this.getParent(descendent); parent !== pseudo;) {
            if (ancestor === parent) {
              return true;
            }

            parent = this.getParent(parent);
          }

          return false;
        } //-----------------------------------------------------------------
        // MutableReferenceGraph
        ;

        _proto7.addReference = function addReference(u, v) {
          return this.addEdge(u, v);
        };

        _proto7.removeReference = function removeReference(e) {
          return this.removeEdge(e);
        };

        _proto7.removeReferences = function removeReferences(u, v) {
          return this.removeEdges(u, v);
        } //-----------------------------------------------------------------
        // ParentGraph
        ;

        _proto7.locateChild = function locateChild(u, name) {
          if (u === 0xFFFFFFFF) {
            for (var _iterator13 = _createForOfIteratorHelperLoose(this._vertices.keys()), _step13; !(_step13 = _iterator13()).done;) {
              var v = _step13.value;
              var vert = this._vertices[v];

              if (vert._inEdges.length === 0 && this._names[v] === name) {
                return v;
              }
            }

            return 0xFFFFFFFF;
          }

          for (var _iterator14 = _createForOfIteratorHelperLoose(this._vertices[u]._outEdges), _step14; !(_step14 = _iterator14()).done;) {
            var oe = _step14.value;
            var child = oe.target;

            if (name === this._names[child]) {
              return child;
            }
          }

          return 0xFFFFFFFF;
        } //-----------------------------------------------------------------
        // AddressableGraph
        ;

        _proto7.addressable = function addressable(absPath) {
          return findRelative(this, 0xFFFFFFFF, absPath) !== 0xFFFFFFFF;
        };

        _proto7.locate = function locate(absPath) {
          return findRelative(this, 0xFFFFFFFF, absPath);
        };

        _proto7.locateRelative = function locateRelative(path, start) {
          if (start === void 0) {
            start = 0xFFFFFFFF;
          }

          return findRelative(this, start, path);
        };

        _proto7.path = function path(v) {
          return getPath(this, v);
        };

        return LayoutGraphData;
      }());
    }
  };
});