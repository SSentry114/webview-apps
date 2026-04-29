System.register("q-bundled:///fs/cocos/rendering/custom/layout-graph-utils.js", ["../../core/index.js", "../../gfx/index.js", "./graph.js", "./layout-graph.js", "./types.js"], function (_export, _context) {
  "use strict";

  var assert, DescriptorSetInfo, DescriptorSetLayoutBinding, DescriptorSetLayoutInfo, DescriptorType, PipelineLayoutInfo, ShaderStageFlagBit, Type, Uniform, UniformBlock, DefaultVisitor, depthFirstSearch, DescriptorBlockData, DescriptorData, DescriptorDB, DescriptorSetData, DescriptorSetLayoutData, LayoutGraph, LayoutGraphDataValue, LayoutGraphValue, PipelineLayoutData, RenderPhase, RenderPhaseData, RenderStageData, ShaderProgramData, UpdateFrequency, getUpdateFrequencyName, getDescriptorTypeOrderName, Descriptor, DescriptorBlock, DescriptorBlockFlattened, DescriptorBlockIndex, DescriptorTypeOrder, ParameterType, PrintVisitor, DescriptorCounter, LayoutGraphPrintVisitor, VisibilityIndex, VisibilityBlock, VisibilityDB, VisibilityPass, VisibilityGraph, VectorGraphColorMap, LayoutGraphInfo, LayoutGraphBuilder2, INVALID_ID, _emptyDescriptorSetLayout, _emptyPipelineLayout;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  // get name of gfx.Type
  function getGfxTypeName(type) {
    switch (type) {
      case Type.UNKNOWN:
        return 'Unknown';

      case Type.BOOL:
        return 'Bool';

      case Type.BOOL2:
        return 'Bool2';

      case Type.BOOL3:
        return 'Bool3';

      case Type.BOOL4:
        return 'Bool4';

      case Type.INT:
        return 'Int';

      case Type.INT2:
        return 'Int2';

      case Type.INT3:
        return 'Int3';

      case Type.INT4:
        return 'Int4';

      case Type.UINT:
        return 'Uint';

      case Type.UINT2:
        return 'Uint2';

      case Type.UINT3:
        return 'Uint3';

      case Type.UINT4:
        return 'Uint4';

      case Type.FLOAT:
        return 'Float';

      case Type.FLOAT2:
        return 'Float2';

      case Type.FLOAT3:
        return 'Float3';

      case Type.FLOAT4:
        return 'Float4';

      case Type.MAT2:
        return 'Mat2';

      case Type.MAT2X3:
        return 'Mat2x3';

      case Type.MAT2X4:
        return 'Mat2x4';

      case Type.MAT3X2:
        return 'Mat3x2';

      case Type.MAT3:
        return 'Mat3';

      case Type.MAT3X4:
        return 'Mat3x4';

      case Type.MAT4X2:
        return 'Mat4x2';

      case Type.MAT4X3:
        return 'Mat4x3';

      case Type.MAT4:
        return 'Mat4';

      case Type.SAMPLER1D:
        return 'Sampler1D';

      case Type.SAMPLER1D_ARRAY:
        return 'Sampler1DArray';

      case Type.SAMPLER2D:
        return 'Sampler2D';

      case Type.SAMPLER2D_ARRAY:
        return 'Sampler2DArray';

      case Type.SAMPLER3D:
        return 'Sampler3D';

      case Type.SAMPLER_CUBE:
        return 'SamplerCube';

      case Type.SAMPLER:
        return 'Sampler';

      case Type.TEXTURE1D:
        return 'Texture1D';

      case Type.TEXTURE1D_ARRAY:
        return 'Texture1DArray';

      case Type.TEXTURE2D:
        return 'Texture2D';

      case Type.TEXTURE2D_ARRAY:
        return 'Texture2DArray';

      case Type.TEXTURE3D:
        return 'Texture3D';

      case Type.TEXTURE_CUBE:
        return 'TextureCube';

      case Type.IMAGE1D:
        return 'Image1D';

      case Type.IMAGE1D_ARRAY:
        return 'Image1DArray';

      case Type.IMAGE2D:
        return 'Image2D';

      case Type.IMAGE2D_ARRAY:
        return 'Image2DArray';

      case Type.IMAGE3D:
        return 'Image3D';

      case Type.IMAGE_CUBE:
        return 'ImageCube';

      case Type.SUBPASS_INPUT:
        return 'SubpassInput';

      case Type.COUNT:
        return 'Count';

      default:
        return 'Unknown';
    }
  } // get DescriptorType from DescriptorTypeOrder


  function getGfxDescriptorType(type) {
    switch (type) {
      case DescriptorTypeOrder.UNIFORM_BUFFER:
        return DescriptorType.UNIFORM_BUFFER;

      case DescriptorTypeOrder.DYNAMIC_UNIFORM_BUFFER:
        return DescriptorType.DYNAMIC_UNIFORM_BUFFER;

      case DescriptorTypeOrder.SAMPLER_TEXTURE:
        return DescriptorType.SAMPLER_TEXTURE;

      case DescriptorTypeOrder.SAMPLER:
        return DescriptorType.SAMPLER;

      case DescriptorTypeOrder.TEXTURE:
        return DescriptorType.TEXTURE;

      case DescriptorTypeOrder.STORAGE_BUFFER:
        return DescriptorType.STORAGE_BUFFER;

      case DescriptorTypeOrder.DYNAMIC_STORAGE_BUFFER:
        return DescriptorType.DYNAMIC_STORAGE_BUFFER;

      case DescriptorTypeOrder.STORAGE_IMAGE:
        return DescriptorType.STORAGE_IMAGE;

      case DescriptorTypeOrder.INPUT_ATTACHMENT:
        return DescriptorType.INPUT_ATTACHMENT;

      default:
        console.error('DescriptorType not found');
        return DescriptorType.INPUT_ATTACHMENT;
    }
  } // get DescriptorTypeOrder from DescriptorType


  function getDescriptorTypeOrder(type) {
    switch (type) {
      case DescriptorType.UNIFORM_BUFFER:
        return DescriptorTypeOrder.UNIFORM_BUFFER;

      case DescriptorType.DYNAMIC_UNIFORM_BUFFER:
        return DescriptorTypeOrder.DYNAMIC_UNIFORM_BUFFER;

      case DescriptorType.SAMPLER_TEXTURE:
        return DescriptorTypeOrder.SAMPLER_TEXTURE;

      case DescriptorType.SAMPLER:
        return DescriptorTypeOrder.SAMPLER;

      case DescriptorType.TEXTURE:
        return DescriptorTypeOrder.TEXTURE;

      case DescriptorType.STORAGE_BUFFER:
        return DescriptorTypeOrder.STORAGE_BUFFER;

      case DescriptorType.DYNAMIC_STORAGE_BUFFER:
        return DescriptorTypeOrder.DYNAMIC_STORAGE_BUFFER;

      case DescriptorType.STORAGE_IMAGE:
        return DescriptorTypeOrder.STORAGE_IMAGE;

      case DescriptorType.INPUT_ATTACHMENT:
        return DescriptorTypeOrder.INPUT_ATTACHMENT;

      case DescriptorType.UNKNOWN:
      default:
        console.error('DescriptorTypeOrder not found');
        return DescriptorTypeOrder.INPUT_ATTACHMENT;
    }
  } // find passID using name


  function getCustomPassID(lg, name) {
    return lg.locateChild(lg.nullVertex(), name || 'default');
  } // find phaseID using passID and phase name


  function getCustomPhaseID(lg, passID, name) {
    if (name === undefined) {
      return lg.locateChild(passID, 'default');
    }

    if (typeof name === 'number') {
      return lg.locateChild(passID, name.toString());
    }

    return lg.locateChild(passID, name);
  } // check ShaderStageFlagBit has certain bits


  function hasFlag(flags, flagToTest) {
    return (flags & flagToTest) !== 0;
  } // get name of visibility


  function getVisibilityName(stage) {
    let count = 0;
    let str = '';

    if (hasFlag(stage, ShaderStageFlagBit.VERTEX)) {
      if (count++) {
        str += ' | ';
      }

      str += 'Vertex';
    }

    if (hasFlag(stage, ShaderStageFlagBit.CONTROL)) {
      if (count++) {
        str += ' | ';
      }

      str += 'Control';
    }

    if (hasFlag(stage, ShaderStageFlagBit.EVALUATION)) {
      if (count++) {
        str += ' | ';
      }

      str += 'Evaluation';
    }

    if (hasFlag(stage, ShaderStageFlagBit.GEOMETRY)) {
      if (count++) {
        str += ' | ';
      }

      str += 'Geometry';
    }

    if (hasFlag(stage, ShaderStageFlagBit.FRAGMENT)) {
      if (count++) {
        str += ' | ';
      }

      str += 'Fragment';
    }

    if (hasFlag(stage, ShaderStageFlagBit.COMPUTE)) {
      if (count++) {
        str += ' | ';
      }

      str += 'Compute';
    }

    if (stage === ShaderStageFlagBit.ALL) {
      if (count++) {
        str += ' | ';
      }

      str += 'All';
    }

    return str;
  } // print LayoutGraphData


  // text tools, indent 4 spaces
  function indent(space) {
    return `${space}    `;
  } // text tools, unindent 4 spaces


  function unindent(space) {
    return space.substring(0, space.length > 4 ? space.length - 4 : 0);
  } // flatten DescriptorBlock to DescriptorBlockFlattened


  function convertDescriptorBlock(block) {
    const flattened = new DescriptorBlockFlattened(); // sort descriptors by name

    const descriptors = Array.from(block.descriptors).sort((a, b) => String(a[0]).localeCompare(b[0])); // flatten descriptors

    descriptors.forEach(v => {
      const name = v[0];
      const d = v[1];
      flattened.descriptorNames.push(name);
      flattened.descriptors.push(d);
    }); // sort uniforms by name

    const uniformBlocks = Array.from(block.uniformBlocks).sort((a, b) => String(a[0]).localeCompare(b[0])); // flatten uniforms

    uniformBlocks.forEach(v => {
      const name = v[0];
      const uniformBlock = v[1];
      flattened.uniformBlockNames.push(name);
      flattened.uniformBlocks.push(uniformBlock);
    }); // calculate count and capacity

    flattened.count = block.count;
    flattened.capacity = block.capacity;
    return flattened;
  } // cache of descriptor blocks


  // get pass name from effect
  function getPassName(pass) {
    if (pass.pass === undefined) {
      return 'default';
    }

    return pass.pass;
  } // get phase name from effect


  function getPhaseName(pass) {
    if (pass.phase === undefined) {
      return 'default';
    }

    if (typeof pass.phase === 'number') {
      return pass.phase.toString();
    }

    return pass.phase;
  } // key of Visibility


  // sort descriptorBlocks using DescriptorBlockIndex
  function sortDescriptorBlocks(lhs, rhs) {
    const lhsIndex = JSON.parse(lhs[0]);
    const rhsIndex = JSON.parse(rhs[0]);
    const lhsValue = lhsIndex.updateFrequency * 10000 + lhsIndex.parameterType * 1000 + lhsIndex.descriptorType * 100 + lhsIndex.visibility;
    const rhsValue = rhsIndex.updateFrequency * 10000 + rhsIndex.parameterType * 1000 + rhsIndex.descriptorType * 100 + rhsIndex.visibility;
    return lhsValue - rhsValue;
  } // build LayoutGraphData


  function buildLayoutGraphDataImpl(graph, builder) {
    for (const v of graph.vertices()) {
      const db = graph.getDescriptors(v);
      let minLevel = UpdateFrequency.PER_INSTANCE;
      let maxLevel = UpdateFrequency.PER_PASS;

      switch (graph.id(v)) {
        case LayoutGraphValue.RenderStage:
          {
            const vertID = builder.addRenderStage(graph.getName(v));

            if (vertID !== v) {
              console.error('vertex id mismatch');
            }

            minLevel = UpdateFrequency.PER_PASS;
            maxLevel = UpdateFrequency.PER_PASS;
            break;
          }

        case LayoutGraphValue.RenderPhase:
          {
            const parentID = graph.getParent(v);
            const vertID = builder.addRenderPhase(graph.getName(v), parentID);

            if (vertID !== v) {
              console.error('vertex id mismatch');
            }

            const phase = graph.getRenderPhase(v);

            for (const shaderName of phase.shaders) {
              builder.addShader(shaderName, v);
            }

            minLevel = UpdateFrequency.PER_INSTANCE;
            maxLevel = UpdateFrequency.PER_PHASE;
            break;
          }

        default:
          console.error('unknown vertex type');
          minLevel = UpdateFrequency.PER_INSTANCE;
          minLevel = UpdateFrequency.PER_PASS;
          break;
      }

      const flattenedBlocks = Array.from(db.blocks).sort(sortDescriptorBlocks);
      flattenedBlocks.forEach(value => {
        const key = value[0];
        const block = value[1];
        const index = JSON.parse(key);

        if (index.updateFrequency > maxLevel || index.updateFrequency < minLevel) {
          return;
        }

        const flattened = convertDescriptorBlock(block);

        if (block.capacity === 0) {
          console.error('block capacity is 0');
          return;
        }

        if (index.updateFrequency > UpdateFrequency.PER_BATCH) {
          builder.addDescriptorBlock(v, index, flattened);

          for (let i = 0; i < flattened.uniformBlockNames.length; ++i) {
            builder.addUniformBlock(v, index, flattened.uniformBlockNames[i], flattened.uniformBlocks[i]);
          }
        } else {
          builder.reserveDescriptorBlock(v, index, flattened);
        }
      });
    }
  } // get descriptor nameID from name


  function getOrCreateDescriptorID(lg, name) {
    const nameID = lg.attributeIndex.get(name);

    if (nameID === undefined) {
      const newID = lg.valueNames.length;
      lg.attributeIndex.set(name, newID);
      lg.valueNames.push(name);
      return newID;
    }

    return nameID;
  }

  function getOrCreateConstantID(lg, name) {
    const nameID = lg.constantIndex.get(name);

    if (nameID === undefined) {
      const newID = lg.valueNames.length;
      lg.constantIndex.set(name, newID);
      lg.valueNames.push(name);
      return newID;
    }

    return nameID;
  } // LayoutGraphData builder


  function buildLayoutGraphData(lg, lgData) {
    const builder = new LayoutGraphBuilder2(lgData);
    buildLayoutGraphDataImpl(lg, builder);
    builder.compile();
  }

  function createDescriptorInfo(layoutData, info) {
    for (let i = 0; i < layoutData.descriptorBlocks.length; ++i) {
      const block = layoutData.descriptorBlocks[i];
      let slot = block.offset;

      for (let j = 0; j < block.descriptors.length; ++j) {
        const d = block.descriptors[j];
        const binding = new DescriptorSetLayoutBinding();
        binding.binding = slot;
        binding.descriptorType = getGfxDescriptorType(block.type);
        binding.count = d.count;
        binding.stageFlags = block.visibility;
        binding.immutableSamplers = [];
        info.bindings.push(binding);
        slot += d.count;
      }
    }
  }

  function createDescriptorSetLayout(device, layoutData) {
    const info = new DescriptorSetLayoutInfo();
    createDescriptorInfo(layoutData, info);

    if (device) {
      return device.createDescriptorSetLayout(info);
    } else {
      return null;
    }
  }

  function createGfxDescriptorSetsAndPipelines(device, g) {
    for (let i = 0; i < g._layouts.length; ++i) {
      const ppl = g.getLayout(i);
      ppl.descriptorSets.forEach((value, key) => {
        const level = value;
        const layoutData = level.descriptorSetLayoutData;

        if (device) {
          const layout = createDescriptorSetLayout(device, layoutData);

          if (layout) {
            level.descriptorSetLayout = layout;
            level.descriptorSet = device.createDescriptorSet(new DescriptorSetInfo(layout));
          }
        } else {
          createDescriptorInfo(layoutData, level.descriptorSetLayoutInfo);
        }
      });
    }
  }

  function printLayoutGraphData(g) {
    const visitor = new PrintVisitor();
    const colorMap = new VectorGraphColorMap(g.numVertices());
    depthFirstSearch(g, visitor, colorMap);
    return visitor.oss;
  } // lookup DescriptorBlockData from Map


  function getDescriptorBlockData(map, index) {
    const key = JSON.stringify(index);
    const block = map.get(key);

    if (block) {
      return block;
    }

    const newBlock = new DescriptorBlockData(index.descriptorType, index.visibility, 0);
    map.set(key, newBlock);
    return newBlock;
  } // make DescriptorSetLayoutData from effect directly


  function makeDescriptorSetLayoutData(lg, rate, set, descriptors) {
    const map = new Map();
    const uniformBlocks = new Map();

    for (let i = 0; i < descriptors.blocks.length; i++) {
      const cb = descriptors.blocks[i];
      const block = getDescriptorBlockData(map, {
        updateFrequency: rate,
        parameterType: ParameterType.TABLE,
        descriptorType: DescriptorTypeOrder.UNIFORM_BUFFER,
        visibility: cb.stageFlags
      });
      const nameID = getOrCreateDescriptorID(lg, cb.name);
      block.descriptors.push(new DescriptorData(nameID, Type.UNKNOWN, 1)); // add uniform buffer

      uniformBlocks.set(nameID, new UniformBlock(set, 0xFFFFFFFF, cb.name, cb.members, 1));
    }

    for (let i = 0; i < descriptors.samplerTextures.length; i++) {
      const samplerTexture = descriptors.samplerTextures[i];
      const block = getDescriptorBlockData(map, {
        updateFrequency: rate,
        parameterType: ParameterType.TABLE,
        descriptorType: DescriptorTypeOrder.SAMPLER_TEXTURE,
        visibility: samplerTexture.stageFlags
      });
      const nameID = getOrCreateDescriptorID(lg, samplerTexture.name);
      block.descriptors.push(new DescriptorData(nameID, samplerTexture.type, samplerTexture.count));
    }

    for (let i = 0; i < descriptors.samplers.length; i++) {
      const sampler = descriptors.samplers[i];
      const block = getDescriptorBlockData(map, {
        updateFrequency: rate,
        parameterType: ParameterType.TABLE,
        descriptorType: DescriptorTypeOrder.SAMPLER,
        visibility: sampler.stageFlags
      });
      const nameID = getOrCreateDescriptorID(lg, sampler.name);
      block.descriptors.push(new DescriptorData(nameID, Type.SAMPLER, sampler.count));
    }

    for (let i = 0; i < descriptors.textures.length; i++) {
      const texture = descriptors.textures[i];
      const block = getDescriptorBlockData(map, {
        updateFrequency: rate,
        parameterType: ParameterType.TABLE,
        descriptorType: DescriptorTypeOrder.TEXTURE,
        visibility: texture.stageFlags
      });
      const nameID = getOrCreateDescriptorID(lg, texture.name);
      block.descriptors.push(new DescriptorData(nameID, texture.type, texture.count));
    }

    for (let i = 0; i < descriptors.buffers.length; i++) {
      const buffer = descriptors.buffers[i];
      const block = getDescriptorBlockData(map, {
        updateFrequency: rate,
        parameterType: ParameterType.TABLE,
        descriptorType: DescriptorTypeOrder.STORAGE_BUFFER,
        visibility: buffer.stageFlags
      });
      const nameID = getOrCreateDescriptorID(lg, buffer.name);
      block.descriptors.push(new DescriptorData(nameID, Type.UNKNOWN, 1));
    }

    for (let i = 0; i < descriptors.images.length; i++) {
      const image = descriptors.images[i];
      const block = getDescriptorBlockData(map, {
        updateFrequency: rate,
        parameterType: ParameterType.TABLE,
        descriptorType: DescriptorTypeOrder.STORAGE_IMAGE,
        visibility: image.stageFlags
      });
      const nameID = getOrCreateDescriptorID(lg, image.name);
      block.descriptors.push(new DescriptorData(nameID, image.type, image.count));
    }

    for (let i = 0; i < descriptors.subpassInputs.length; i++) {
      const subpassInput = descriptors.subpassInputs[i];
      const block = getDescriptorBlockData(map, {
        updateFrequency: rate,
        parameterType: ParameterType.TABLE,
        descriptorType: DescriptorTypeOrder.INPUT_ATTACHMENT,
        visibility: subpassInput.stageFlags
      });
      const nameID = getOrCreateDescriptorID(lg, subpassInput.name);
      block.descriptors.push(new DescriptorData(nameID, Type.UNKNOWN, subpassInput.count));
    } // sort blocks


    const flattenedBlocks = Array.from(map).sort(sortDescriptorBlocks);
    const data = new DescriptorSetLayoutData(set, 0); // calculate bindings

    let capacity = 0;

    for (const [key, block] of flattenedBlocks) {
      const index = JSON.parse(key);
      block.offset = capacity;

      for (const d of block.descriptors) {
        if (index.descriptorType === DescriptorTypeOrder.UNIFORM_BUFFER) {
          // update uniform buffer binding
          const ub = uniformBlocks.get(d.descriptorID);

          if (!ub) {
            console.error(`Uniform block not found for ${d.descriptorID}`);
            continue;
          }

          assert(ub.binding === 0xFFFFFFFF);
          ub.binding = block.capacity; // add uniform buffer to output

          data.uniformBlocks.set(d.descriptorID, ub);
        } // update block capacity


        const binding = data.bindingMap.get(d.descriptorID);

        if (binding !== undefined) {
          console.error(`Duplicated descriptor ${d.descriptorID}`);
        }

        data.bindingMap.set(d.descriptorID, block.offset + block.capacity);
        block.capacity += d.count;
      } // increate total capacity


      capacity += block.capacity;
      data.capacity += block.capacity;

      if (index.descriptorType === DescriptorTypeOrder.UNIFORM_BUFFER || index.descriptorType === DescriptorTypeOrder.DYNAMIC_UNIFORM_BUFFER) {
        data.uniformBlockCapacity += block.capacity;
      } else if (index.descriptorType === DescriptorTypeOrder.SAMPLER_TEXTURE) {
        data.samplerTextureCapacity += block.capacity;
      }

      data.descriptorBlocks.push(block);
    }

    return data;
  } // fill DescriptorSetLayoutInfo from DescriptorSetLayoutData


  function initializeDescriptorSetLayoutInfo(layoutData, info) {
    for (let i = 0; i < layoutData.descriptorBlocks.length; ++i) {
      const block = layoutData.descriptorBlocks[i];
      let slot = block.offset;

      for (let j = 0; j < block.descriptors.length; ++j) {
        const d = block.descriptors[j];
        const binding = new DescriptorSetLayoutBinding();
        binding.binding = slot;
        binding.descriptorType = getGfxDescriptorType(block.type);
        binding.count = d.count;
        binding.stageFlags = block.visibility;
        binding.immutableSamplers = [];
        info.bindings.push(binding);
        slot += d.count;
      }
    }
  }

  function populatePipelineLayoutInfo(layout, rate, info) {
    const set = layout.descriptorSets.get(rate);

    if (set && set.descriptorSetLayout) {
      info.setLayouts.push(set.descriptorSetLayout);
    } else {
      info.setLayouts.push(_emptyDescriptorSetLayout);
    }
  } // initialize layout graph module


  function initializeLayoutGraphData(device, lg) {
    // create descriptor sets
    _emptyDescriptorSetLayout = device.createDescriptorSetLayout(new DescriptorSetLayoutInfo());
    _emptyPipelineLayout = device.createPipelineLayout(new PipelineLayoutInfo());

    for (const v of lg.vertices()) {
      const layoutData = lg.getLayout(v);

      for (const [_, set] of layoutData.descriptorSets) {
        if (set.descriptorSetLayout !== null) {
          console.warn('descriptor set layout already initialized. It will be overwritten');
        }

        initializeDescriptorSetLayoutInfo(set.descriptorSetLayoutData, set.descriptorSetLayoutInfo);
        set.descriptorSetLayout = device.createDescriptorSetLayout(set.descriptorSetLayoutInfo);
      }
    } // create pipeline layouts


    for (const v of lg.vertices()) {
      if (!lg.holds(LayoutGraphDataValue.RenderPhase, v)) {
        continue;
      }

      const passID = lg.getParent(v);
      const phaseID = v;
      const passLayout = lg.getLayout(passID);
      const phaseLayout = lg.getLayout(phaseID);
      const info = new PipelineLayoutInfo();
      populatePipelineLayoutInfo(passLayout, UpdateFrequency.PER_PASS, info);
      populatePipelineLayoutInfo(phaseLayout, UpdateFrequency.PER_PHASE, info);
      populatePipelineLayoutInfo(phaseLayout, UpdateFrequency.PER_BATCH, info);
      populatePipelineLayoutInfo(phaseLayout, UpdateFrequency.PER_INSTANCE, info);
      const phase = lg.getRenderPhase(phaseID);
      phase.pipelineLayout = device.createPipelineLayout(info);
    }
  } // terminate layout graph module


  function terminateLayoutGraphData(lg) {
    for (const v of lg.vertices()) {
      const layoutData = lg.getLayout(v);

      for (const [_, set] of layoutData.descriptorSets) {
        if (set.descriptorSetLayout !== null) {
          set.descriptorSetLayout.destroy();
        }
      }
    }

    _emptyPipelineLayout.destroy();

    _emptyDescriptorSetLayout.destroy();
  } // get empty descriptor set layout


  function getEmptyDescriptorSetLayout() {
    return _emptyDescriptorSetLayout;
  } // get empty pipeline layout


  function getEmptyPipelineLayout() {
    return _emptyPipelineLayout;
  } // get descriptor set from LayoutGraphData (not from ProgramData)


  function getOrCreateDescriptorSetLayout(lg, passID, phaseID, rate) {
    if (rate < UpdateFrequency.PER_PASS) {
      const phaseData = lg.getLayout(phaseID);
      const data = phaseData.descriptorSets.get(rate);

      if (data) {
        if (!data.descriptorSetLayout) {
          console.error('descriptor set layout not initialized');
          return _emptyDescriptorSetLayout;
        }

        return data.descriptorSetLayout;
      }

      return _emptyDescriptorSetLayout;
    }

    assert(rate === UpdateFrequency.PER_PASS);
    assert(passID === lg.getParent(phaseID));
    const passData = lg.getLayout(passID);
    const data = passData.descriptorSets.get(rate);

    if (data) {
      if (!data.descriptorSetLayout) {
        console.error('descriptor set layout not initialized');
        return _emptyDescriptorSetLayout;
      }

      return data.descriptorSetLayout;
    }

    return _emptyDescriptorSetLayout;
  } // getDescriptorSetLayout from LayoutGraphData


  function getDescriptorSetLayout(lg, passID, phaseID, rate) {
    if (rate < UpdateFrequency.PER_PASS) {
      const phaseData = lg.getLayout(phaseID);
      const data = phaseData.descriptorSets.get(rate);

      if (data) {
        if (!data.descriptorSetLayout) {
          console.error('descriptor set layout not initialized');
          return null;
        }

        return data.descriptorSetLayout;
      }

      return null;
    }

    assert(rate === UpdateFrequency.PER_PASS);
    assert(passID === lg.getParent(phaseID));
    const passData = lg.getLayout(passID);
    const data = passData.descriptorSets.get(rate);

    if (data) {
      if (!data.descriptorSetLayout) {
        console.error('descriptor set layout not initialized');
        return null;
      }

      return data.descriptorSetLayout;
    }

    return null;
  } // get or create DescriptorBlockData from DescriptorSetLayoutData


  function getOrCreateDescriptorBlockData(data, type, vis) {
    const order = getDescriptorTypeOrder(type);

    for (const block of data.descriptorBlocks) {
      if (block.type === order && block.visibility === vis) {
        return block;
      }
    }

    const block = new DescriptorBlockData(order, vis);
    data.descriptorBlocks.push(block);
    return block;
  }

  function getProgramID(lg, phaseID, programName) {
    assert(phaseID !== lg.nullVertex());
    const phase = lg.getRenderPhase(phaseID);
    const programID = phase.shaderIndex.get(programName);

    if (programID === undefined) {
      return INVALID_ID;
    }

    return programID;
  }

  function getDescriptorNameID(lg, name) {
    const nameID = lg.attributeIndex.get(name);

    if (nameID === undefined) {
      return INVALID_ID;
    }

    return nameID;
  }

  function getDescriptorName(lg, nameID) {
    if (nameID >= lg.valueNames.length) {
      return '';
    }

    return lg.valueNames[nameID];
  }

  function getPerPassDescriptorSetLayoutData(lg, passID) {
    assert(passID !== lg.nullVertex());
    const node = lg.getLayout(passID);
    const set = node.descriptorSets.get(UpdateFrequency.PER_PASS);

    if (set === undefined) {
      return null;
    }

    return set.descriptorSetLayoutData;
  }

  function getPerPhaseDescriptorSetLayoutData(lg, phaseID) {
    assert(phaseID !== lg.nullVertex());
    const node = lg.getLayout(phaseID);
    const set = node.descriptorSets.get(UpdateFrequency.PER_PHASE);

    if (set === undefined) {
      return null;
    }

    return set.descriptorSetLayoutData;
  }

  function getPerBatchDescriptorSetLayoutData(lg, phaseID, programID) {
    assert(phaseID !== lg.nullVertex());
    const phase = lg.getRenderPhase(phaseID);
    assert(programID < phase.shaderPrograms.length);
    const program = phase.shaderPrograms[programID];
    const set = program.layout.descriptorSets.get(UpdateFrequency.PER_BATCH);

    if (set === undefined) {
      return null;
    }

    return set.descriptorSetLayoutData;
  }

  function getPerInstanceDescriptorSetLayoutData(lg, phaseID, programID) {
    assert(phaseID !== lg.nullVertex());
    const phase = lg.getRenderPhase(phaseID);
    assert(programID < phase.shaderPrograms.length);
    const program = phase.shaderPrograms[programID];
    const set = program.layout.descriptorSets.get(UpdateFrequency.PER_INSTANCE);

    if (set === undefined) {
      return null;
    }

    return set.descriptorSetLayoutData;
  }

  function getBinding(layout, nameID) {
    const binding = layout.bindingMap.get(nameID);

    if (binding === undefined) {
      return 0xFFFFFFFF;
    }

    return binding;
  }

  _export({
    getGfxDescriptorType: getGfxDescriptorType,
    getDescriptorTypeOrder: getDescriptorTypeOrder,
    getCustomPassID: getCustomPassID,
    getCustomPhaseID: getCustomPhaseID,
    PrintVisitor: void 0,
    VisibilityIndex: void 0,
    VisibilityBlock: void 0,
    VisibilityDB: void 0,
    VisibilityPass: void 0,
    VisibilityGraph: void 0,
    LayoutGraphInfo: void 0,
    getOrCreateDescriptorID: getOrCreateDescriptorID,
    getOrCreateConstantID: getOrCreateConstantID,
    buildLayoutGraphData: buildLayoutGraphData,
    createGfxDescriptorSetsAndPipelines: createGfxDescriptorSetsAndPipelines,
    printLayoutGraphData: printLayoutGraphData,
    makeDescriptorSetLayoutData: makeDescriptorSetLayoutData,
    initializeDescriptorSetLayoutInfo: initializeDescriptorSetLayoutInfo,
    initializeLayoutGraphData: initializeLayoutGraphData,
    terminateLayoutGraphData: terminateLayoutGraphData,
    getEmptyDescriptorSetLayout: getEmptyDescriptorSetLayout,
    getEmptyPipelineLayout: getEmptyPipelineLayout,
    getOrCreateDescriptorSetLayout: getOrCreateDescriptorSetLayout,
    getDescriptorSetLayout: getDescriptorSetLayout,
    getOrCreateDescriptorBlockData: getOrCreateDescriptorBlockData,
    getProgramID: getProgramID,
    getDescriptorNameID: getDescriptorNameID,
    getDescriptorName: getDescriptorName,
    getPerPassDescriptorSetLayoutData: getPerPassDescriptorSetLayoutData,
    getPerPhaseDescriptorSetLayoutData: getPerPhaseDescriptorSetLayoutData,
    getPerBatchDescriptorSetLayoutData: getPerBatchDescriptorSetLayoutData,
    getPerInstanceDescriptorSetLayoutData: getPerInstanceDescriptorSetLayoutData,
    getBinding: getBinding
  });

  return {
    setters: [function (_coreIndexJs) {
      assert = _coreIndexJs.assert;
    }, function (_gfxIndexJs) {
      DescriptorSetInfo = _gfxIndexJs.DescriptorSetInfo;
      DescriptorSetLayoutBinding = _gfxIndexJs.DescriptorSetLayoutBinding;
      DescriptorSetLayoutInfo = _gfxIndexJs.DescriptorSetLayoutInfo;
      DescriptorType = _gfxIndexJs.DescriptorType;
      PipelineLayoutInfo = _gfxIndexJs.PipelineLayoutInfo;
      ShaderStageFlagBit = _gfxIndexJs.ShaderStageFlagBit;
      Type = _gfxIndexJs.Type;
      Uniform = _gfxIndexJs.Uniform;
      UniformBlock = _gfxIndexJs.UniformBlock;
    }, function (_graphJs) {
      DefaultVisitor = _graphJs.DefaultVisitor;
      depthFirstSearch = _graphJs.depthFirstSearch;
    }, function (_layoutGraphJs) {
      DescriptorBlockData = _layoutGraphJs.DescriptorBlockData;
      DescriptorData = _layoutGraphJs.DescriptorData;
      DescriptorDB = _layoutGraphJs.DescriptorDB;
      DescriptorSetData = _layoutGraphJs.DescriptorSetData;
      DescriptorSetLayoutData = _layoutGraphJs.DescriptorSetLayoutData;
      LayoutGraph = _layoutGraphJs.LayoutGraph;
      LayoutGraphDataValue = _layoutGraphJs.LayoutGraphDataValue;
      LayoutGraphValue = _layoutGraphJs.LayoutGraphValue;
      PipelineLayoutData = _layoutGraphJs.PipelineLayoutData;
      RenderPhase = _layoutGraphJs.RenderPhase;
      RenderPhaseData = _layoutGraphJs.RenderPhaseData;
      RenderStageData = _layoutGraphJs.RenderStageData;
      ShaderProgramData = _layoutGraphJs.ShaderProgramData;
    }, function (_typesJs) {
      UpdateFrequency = _typesJs.UpdateFrequency;
      getUpdateFrequencyName = _typesJs.getUpdateFrequencyName;
      getDescriptorTypeOrderName = _typesJs.getDescriptorTypeOrderName;
      Descriptor = _typesJs.Descriptor;
      DescriptorBlock = _typesJs.DescriptorBlock;
      DescriptorBlockFlattened = _typesJs.DescriptorBlockFlattened;
      DescriptorBlockIndex = _typesJs.DescriptorBlockIndex;
      DescriptorTypeOrder = _typesJs.DescriptorTypeOrder;
      ParameterType = _typesJs.ParameterType;
    }],
    execute: function () {
      _export("INVALID_ID", INVALID_ID = 0xFFFFFFFF);

      _export("PrintVisitor", PrintVisitor = class PrintVisitor extends DefaultVisitor {
        constructor(...args) {
          super(...args);
          this.space = '';
          this.oss = '';
        }

        discoverVertex(u, g) {
          const ppl = g.getLayout(u);
          const name = g._names[u];
          const freq = g._updateFrequencies[u];
          this.oss += `${this.space}"${name}": `;

          if (g.holds(LayoutGraphDataValue.RenderStage, u)) {
            this.oss += `RenderStage {\n`;
          } else {
            this.oss += `RenderPhase {\n`;
          }

          this.space = indent(this.space); // eslint-disable-next-line no-loop-func

          ppl.descriptorSets.forEach((value, key) => {
            this.oss += `${this.space}DescriptorSet<${getUpdateFrequencyName(key)}> {\n`;
            this.space = indent(this.space);
            const uniformBlocks = value.descriptorSetLayoutData.uniformBlocks;
            uniformBlocks.forEach((uniformBlock, attrNameID) => {
              const name = g.valueNames[attrNameID];
              this.oss += `${this.space}UniformBlock "${name}" {\n`;

              for (const u of uniformBlock.members) {
                if (u.count > 1) {
                  this.oss += `${this.space}    ${u.name}[${u.count}]: ${getGfxTypeName(u.type)}\n`;
                } else {
                  this.oss += `${this.space}    ${u.name}: ${getGfxTypeName(u.type)}\n`;
                }
              }

              this.oss += `${this.space}}\n`;
            });
            const blocks = value.descriptorSetLayoutData.descriptorBlocks;

            for (let j = 0; j < blocks.length; ++j) {
              const block = blocks[j];
              this.oss += `${this.space}Block<${getDescriptorTypeOrderName(block.type)}, ${getVisibilityName(block.visibility)}> {\n`;
              this.oss += `${this.space}    offset: ${block.offset}\n`;
              this.oss += `${this.space}    capacity: ${block.capacity}\n`;
              this.oss += `${this.space}    count: ${block.descriptors.length}\n`;

              if (block.descriptors.length > 0) {
                this.oss += `${this.space}    Descriptors{ \n`;
                const count = 0;

                for (let k = 0; k < block.descriptors.length; ++k) {
                  const d = block.descriptors[k]; // if (count++) {

                  this.oss += this.space;
                  this.oss += '        ';
                  const n = g.valueNames[d.descriptorID];
                  this.oss += `"${n}`;

                  if (d.count !== 1) {
                    this.oss += `[${d.count}]`;
                  }

                  this.oss += '"'; // }

                  this.oss += '\n';
                }

                this.oss += `${this.space}    }\n`;
              }

              this.oss += `${this.space}}\n`;
            }

            this.space = unindent(this.space);
            this.oss += `${this.space}}\n`;
          });
        }

        finishVertex(v, g) {
          this.space = unindent(this.space);
          this.oss += `${this.space}}\n`;
        }

      });

      DescriptorCounter = class DescriptorCounter {
        constructor() {
          this.counter = new Map();
          this.inspector = new Map();
        }

        addDescriptor(key, name, count) {
          var _this$inspector$get;

          // key is DescriptorBlockIndex
          // name is Descriptor name
          // count is Descriptor count
          const v = this.counter.get(key);

          if (v === undefined) {
            this.counter.set(key, count);
            this.inspector.set(key, [name]);
            return;
          }

          this.counter.set(key, v + count);
          (_this$inspector$get = this.inspector.get(key)) === null || _this$inspector$get === void 0 ? void 0 : _this$inspector$get.push(name);
        } // counter is the num of descriptors in each block


      }; // print LayoutGraph (not LayoutGraphData)

      LayoutGraphPrintVisitor = class LayoutGraphPrintVisitor extends DefaultVisitor {
        constructor(...args) {
          super(...args);
          this.space = '';
          this.oss = '';
        }

        discoverVertex(v, g) {
          const info = g.getDescriptors(v);
          const name = g.getName(v);
          this.oss += `${this.space}"${name}": `;

          switch (g.id(v)) {
            case LayoutGraphValue.RenderStage:
              this.oss += `RenderStage {\n`;
              break;

            case LayoutGraphValue.RenderPhase:
              this.oss += `RenderPhase {\n`;
              break;

            default:
              this.oss += `unknown LayoutGraphValue {\n`;
              break;
          }

          this.space = indent(this.space);
          const sortedMap = new Map(Array.from(info.blocks).sort((a, b) => String(a[0]).localeCompare(b[0])));
          sortedMap.forEach((block, key) => {
            const index = JSON.parse(key);
            const flat = convertDescriptorBlock(block);
            this.oss += `${this.space}DescriptorBlock {\n`;
            this.space = indent(this.space);
            this.oss += `${this.space}updateRate: ${getUpdateFrequencyName(index.updateFrequency)}\n`;
            this.oss += `${this.space}type: ${getDescriptorTypeOrderName(index.descriptorType)}\n`;
            this.oss += `${this.space}visibility: ${getVisibilityName(index.visibility)}\n`;
            this.oss += `${this.space}descriptors: [${flat.descriptorNames.join(', ')}]\n`;
            this.oss += `${this.space}uniformBlocks: [`;

            for (let i = 0; i < flat.uniformBlocks.length; ++i) {
              if (i) {
                this.oss += ', ';
              }

              this.oss += `${flat.uniformBlocks[i].name}`;
            }

            this.oss += `]\n`;
            this.oss += `${this.space}count: ${flat.count}\n`;
            this.oss += `${this.space}capacity: ${flat.capacity}\n`;
            this.space = unindent(this.space);
            this.oss += `${this.space}}\n`;
          });
        }

        finishVertex(v, g) {
          this.space = unindent(this.space);
          this.oss += `${this.space}}\n`;
        }

      };

      _export("VisibilityIndex", VisibilityIndex = class VisibilityIndex {
        constructor(updateFrequency = UpdateFrequency.PER_INSTANCE, parameterType = ParameterType.TABLE, descriptorType = DescriptorTypeOrder.UNIFORM_BUFFER) {
          this.updateFrequency = void 0;
          this.parameterType = void 0;
          this.descriptorType = void 0;
          this.updateFrequency = updateFrequency;
          this.parameterType = parameterType;
          this.descriptorType = descriptorType;
        }

      }); // descriptors of same visibility


      _export("VisibilityBlock", VisibilityBlock = class VisibilityBlock {
        constructor() {
          this.descriptors = new Map();
        }

        mergeVisibility(name, vis) {
          // for each descriptor, merge visibility
          // rate must >= PER_PHASE
          const v0 = this.descriptors.get(name);

          if (v0 === undefined) {
            this.descriptors.set(name, vis);
          } else {
            this.descriptors.set(name, v0 | vis);
          }
        }

        getVisibility(name) {
          const v = this.descriptors.get(name);

          if (v === undefined) {
            console.error(`Can't find visibility for descriptor: ${name}`);
            return ShaderStageFlagBit.NONE;
          }

          return v;
        }

      }); // visibility database of phase


      _export("VisibilityDB", VisibilityDB = class VisibilityDB {
        constructor() {
          this.blocks = new Map();
        }

        getBlock(index) {
          const key = JSON.stringify(index);
          let block = this.blocks.get(key);

          if (block === undefined) {
            block = new VisibilityBlock();
            this.blocks.set(key, block);
          }

          return block;
        }

      }); // visibility database of pass


      _export("VisibilityPass", VisibilityPass = class VisibilityPass {
        constructor() {
          this.phases = new Map();
        }

        getPhase(phaseName) {
          const phase = this.phases.get(phaseName);

          if (phase === undefined) {
            const newPhase = new VisibilityDB();
            this.phases.set(phaseName, newPhase);
            return newPhase;
          }

          return phase;
        }

      });

      _export("VisibilityGraph", VisibilityGraph = class VisibilityGraph {
        constructor() {
          this.passes = new Map();
        }

        getPass(passName) {
          const pass = this.passes.get(passName);

          if (pass === undefined) {
            const newPass = new VisibilityPass();
            this.passes.set(passName, newPass);
            return newPass;
          }

          return pass;
        }

        merge(rate, order, infoArray, db) {
          const blockIndex = new VisibilityIndex(rate, ParameterType.TABLE, order);
          const block = db.getBlock(blockIndex);

          for (const info of infoArray) {
            block.mergeVisibility(info.name, info.stageFlags);
          }
        }

        mergeEffect(asset) {
          for (const tech of asset.techniques) {
            for (const pass of tech.passes) {
              const programName = pass.program;
              let shader = null;

              for (const shaderInfo of asset.shaders) {
                if (shaderInfo.name === programName) {
                  shader = shaderInfo;
                }
              }

              if (!shader) {
                continue;
              }

              if (shader.descriptors === undefined) {
                console.warn(`No descriptors in shader: ${programName}, please reimport ALL effects`);
                continue;
              }

              const passName = getPassName(pass);
              const passData = this.getPass(passName);
              const phaseName = getPhaseName(pass);
              const phaseData = passData.getPhase(phaseName);

              for (const list of shader.descriptors) {
                if (list.rate < UpdateFrequency.PER_PHASE) {
                  // do not merger PER_BATCH, PER_INSTANCE descriptors
                  continue;
                }

                this.merge(list.rate, DescriptorTypeOrder.UNIFORM_BUFFER, list.blocks, phaseData);
                this.merge(list.rate, DescriptorTypeOrder.STORAGE_BUFFER, list.buffers, phaseData);
                this.merge(list.rate, DescriptorTypeOrder.TEXTURE, list.textures, phaseData);
                this.merge(list.rate, DescriptorTypeOrder.SAMPLER_TEXTURE, list.samplerTextures, phaseData);
                this.merge(list.rate, DescriptorTypeOrder.SAMPLER, list.samplers, phaseData);
                this.merge(list.rate, DescriptorTypeOrder.STORAGE_IMAGE, list.images, phaseData);
                this.merge(list.rate, DescriptorTypeOrder.INPUT_ATTACHMENT, list.subpassInputs, phaseData);
              }
            }
          }
        }

      }); // graph coloring help class


      VectorGraphColorMap = class VectorGraphColorMap {
        constructor(sz) {
          this.colors = void 0;
          this.colors = new Array(sz);
        }

        get(u) {
          return this.colors[u];
        }

        put(u, value) {
          this.colors[u] = value;
        }

      }; // class to layout all descriptors

      _export("LayoutGraphInfo", LayoutGraphInfo = class LayoutGraphInfo {
        constructor(visg) {
          this.lg = new LayoutGraph();
          this.visg = void 0;
          this.enableDebug = false;
          this.visg = visg;
        }

        getPassID(passName) {
          const lg = this.lg;
          let passID = lg.locateChild(lg.nullVertex(), passName);

          if (passID === lg.nullVertex()) {
            passID = lg.addVertex(LayoutGraphValue.RenderStage, 0, passName, new DescriptorDB(), lg.nullVertex());
          }

          return passID;
        }

        getPhaseID(phaseName, passID) {
          const lg = this.lg;
          let phaseID = lg.locateChild(passID, phaseName);

          if (phaseID === lg.nullVertex()) {
            phaseID = lg.addVertex(LayoutGraphValue.RenderPhase, new RenderPhase(), phaseName, new DescriptorDB(), passID);
          }

          return phaseID;
        }

        getDescriptorBlock(key, descriptorDB) {
          const value = descriptorDB.blocks.get(key);

          if (value === undefined) {
            const uniformBlock = new DescriptorBlock();
            descriptorDB.blocks.set(key, uniformBlock);
            return uniformBlock;
          }

          return value;
        }

        checkConsistency(lhs, rhs) {
          if (lhs.count !== 1) {
            return false;
          }

          if (lhs.members.length !== rhs.members.length) {
            return false;
          }

          for (let i = 0; i < lhs.members.length; ++i) {
            if (lhs.members[i].name !== rhs.members[i].name) {
              return false;
            }

            if (lhs.members[i].type !== rhs.members[i].type) {
              return false;
            }

            if (lhs.members[i].count !== rhs.members[i].count) {
              return false;
            }
          }

          return true;
        }

        makeUniformBlock(info) {
          const uniformBlock = new UniformBlock(0, 0, info.name);
          uniformBlock.count = 1;

          for (const member of info.members) {
            uniformBlock.members.push(new Uniform(member.name, member.type, member.count));
          }

          return uniformBlock;
        }

        addDescriptor(block, name, type = Type.UNKNOWN) {
          const value = block.descriptors.get(name);

          if (value === undefined) {
            block.descriptors.set(name, new Descriptor(type));
            ++block.capacity;
            ++block.count;
            return;
          }

          if (value.type !== type) {
            console.warn(`Type mismatch for descriptor ${name}`);
          }
        }

        addUniformBlock(block, name, gfxBlock) {
          const value = block.uniformBlocks.get(name);

          if (value === undefined) {
            block.uniformBlocks.set(name, gfxBlock);
            return;
          }

          if (!this.checkConsistency(value, gfxBlock)) {
            console.warn(`Uniform block ${name} is inconsistent in the same block`);
          }
        }

        buildBlocks(visDB, rate, blocks, db, counter) {
          const visBlock = visDB.getBlock({
            updateFrequency: rate,
            parameterType: ParameterType.TABLE,
            descriptorType: DescriptorTypeOrder.UNIFORM_BUFFER
          });

          for (const info of blocks) {
            const blockIndex = new DescriptorBlockIndex(rate, ParameterType.TABLE, DescriptorTypeOrder.UNIFORM_BUFFER, rate >= UpdateFrequency.PER_PHASE ? visBlock.getVisibility(info.name) : info.stageFlags);
            const key = JSON.stringify(blockIndex);
            const block = this.getDescriptorBlock(key, db);

            if (blockIndex.updateFrequency > UpdateFrequency.PER_BATCH) {
              this.addDescriptor(block, info.name);
              this.addUniformBlock(block, info.name, this.makeUniformBlock(info));
            } else {
              counter.addDescriptor(key, info.name, 1);
            }
          }
        }

        buildBuffers(visDB, rate, infoArray, type, db, counter) {
          const visBlock = visDB.getBlock({
            updateFrequency: rate,
            parameterType: ParameterType.TABLE,
            descriptorType: DescriptorTypeOrder.STORAGE_BUFFER
          });

          for (const info of infoArray) {
            const blockIndex = new DescriptorBlockIndex(rate, ParameterType.TABLE, DescriptorTypeOrder.STORAGE_BUFFER, rate >= UpdateFrequency.PER_PHASE ? visBlock.getVisibility(info.name) : info.stageFlags);
            const key = JSON.stringify(blockIndex);
            const block = this.getDescriptorBlock(key, db);

            if (blockIndex.updateFrequency > UpdateFrequency.PER_BATCH) {
              this.addDescriptor(block, info.name, type);
            } else {
              counter.addDescriptor(key, info.name, 1);
            }
          }
        }

        buildNonTextures(visDB, rate, order, infoArray, type, db, counter) {
          const visBlock = visDB.getBlock({
            updateFrequency: rate,
            parameterType: ParameterType.TABLE,
            descriptorType: order
          });

          for (const info of infoArray) {
            const blockIndex = new DescriptorBlockIndex(rate, ParameterType.TABLE, order, rate >= UpdateFrequency.PER_PHASE ? visBlock.getVisibility(info.name) : info.stageFlags);
            const key = JSON.stringify(blockIndex);
            const block = this.getDescriptorBlock(key, db);

            if (blockIndex.updateFrequency > UpdateFrequency.PER_BATCH) {
              this.addDescriptor(block, info.name, type);
            } else {
              counter.addDescriptor(key, info.name, info.count);
            }
          }
        }

        buildTextures(visDB, rate, order, infoArray, db, counter) {
          const visBlock = visDB.getBlock({
            updateFrequency: rate,
            parameterType: ParameterType.TABLE,
            descriptorType: order
          });

          for (const info of infoArray) {
            const blockIndex = new DescriptorBlockIndex(rate, ParameterType.TABLE, order, rate >= UpdateFrequency.PER_PHASE ? visBlock.getVisibility(info.name) : info.stageFlags);
            const key = JSON.stringify(blockIndex);
            const block = this.getDescriptorBlock(key, db);

            if (blockIndex.updateFrequency > UpdateFrequency.PER_BATCH) {
              this.addDescriptor(block, info.name, info.type);
            } else {
              counter.addDescriptor(key, info.name, info.count);
            }
          }
        }

        addEffect(asset) {
          const lg = this.lg;

          for (const tech of asset.techniques) {
            for (const pass of tech.passes) {
              const programName = pass.program;
              let shader = null;

              for (const shaderInfo of asset.shaders) {
                if (shaderInfo.name === programName) {
                  shader = shaderInfo;
                }
              }

              if (!shader) {
                console.warn(`program: ${programName} not found`);
                continue;
              }

              if (shader.descriptors === undefined) {
                console.warn(`No descriptors in shader: ${programName}, please reimport ALL effects`);
                continue;
              } // get database


              const passName = getPassName(pass);
              const phaseName = getPhaseName(pass);
              const passID = this.getPassID(passName);
              const phaseID = this.getPhaseID(phaseName, passID);
              const passVis = this.visg.getPass(passName);
              const visDB = passVis.getPhase(phaseName);
              const db = lg.getDescriptors(phaseID);
              const counter = new DescriptorCounter(); // merge descriptors and reserve capacity

              for (const list of shader.descriptors) {
                this.buildBlocks(visDB, list.rate, list.blocks, db, counter);
                this.buildBuffers(visDB, list.rate, list.buffers, Type.UNKNOWN, db, counter);
                this.buildNonTextures(visDB, list.rate, DescriptorTypeOrder.SAMPLER, list.samplers, Type.SAMPLER, db, counter);
                this.buildNonTextures(visDB, list.rate, DescriptorTypeOrder.INPUT_ATTACHMENT, list.subpassInputs, Type.SAMPLER, db, counter);
                this.buildTextures(visDB, list.rate, DescriptorTypeOrder.TEXTURE, list.textures, db, counter);
                this.buildTextures(visDB, list.rate, DescriptorTypeOrder.SAMPLER_TEXTURE, list.samplerTextures, db, counter);
                this.buildTextures(visDB, list.rate, DescriptorTypeOrder.STORAGE_IMAGE, list.images, db, counter);
              } // update max capacity and debug info


              counter.counter.forEach((v, key) => {
                const block = this.getDescriptorBlock(key, db);

                if (v > block.capacity) {
                  block.capacity = Math.max(block.capacity, v);

                  if (this.enableDebug) {
                    const names = counter.inspector.get(key);

                    if (names === undefined) {
                      return;
                    }

                    block.descriptors.clear();

                    for (const name of names) {
                      block.descriptors.set(name, new Descriptor());
                    }
                  }
                }
              });
            }
          }
        }

        build() {
          const lg = this.lg;
          const visMap = new Map(); // merge phase to pass

          for (const v of lg.vertices()) {
            if (lg.id(v) === LayoutGraphValue.RenderStage) {
              // create visibility database
              visMap.set(v, new VisibilityDB());
              continue;
            }

            const phaseID = v;
            const parentID = lg.getParent(phaseID);

            if (lg.id(parentID) !== LayoutGraphValue.RenderStage) {
              console.error(`phase: ${lg.getName(phaseID)} has no parent stage`);
              return 1;
            }

            const phaseDB = lg.getDescriptors(phaseID);
            const passVisDB = visMap.get(parentID);

            if (!passVisDB) {
              console.error(`pass: ${lg.getName(parentID)} has no visibility database`);
              return 1;
            } // merge phase visibility to pass visibility


            for (const [key, block] of phaseDB.blocks) {
              const index = JSON.parse(key);

              if (index.updateFrequency <= UpdateFrequency.PER_PHASE) {
                continue;
              }

              const visIndex = new VisibilityIndex(index.updateFrequency, index.parameterType, index.descriptorType);
              const passVisBlock = passVisDB.getBlock(visIndex);

              for (const [name, d] of block.descriptors) {
                passVisBlock.mergeVisibility(name, index.visibility);
              }
            }
          }

          for (const v of lg.vertices()) {
            if (lg.id(v) === LayoutGraphValue.RenderStage) {
              continue;
            }

            const phaseID = v;
            const parentID = lg.getParent(phaseID);

            if (lg.id(parentID) !== LayoutGraphValue.RenderStage) {
              console.error(`phase: ${lg.getName(phaseID)} has no parent stage`);
              return 1;
            }

            const passDB = lg.getDescriptors(parentID);
            const phaseDB = lg.getDescriptors(phaseID);
            const passVisDB = visMap.get(parentID);

            if (passVisDB === undefined) {
              console.error(`pass: ${lg.getName(parentID)} has no visibility database`);
              return 1;
            }

            for (const [key0, block] of phaseDB.blocks) {
              const index0 = JSON.parse(key0);

              if (index0.updateFrequency <= UpdateFrequency.PER_PHASE) {
                continue;
              }

              const visIndex = new VisibilityIndex(index0.updateFrequency, index0.parameterType, index0.descriptorType);
              const passVisBlock = passVisDB.getBlock(visIndex);

              for (const [name, d] of block.descriptors) {
                const vis = passVisBlock.getVisibility(name);
                let passBlock;

                if (vis === index0.visibility) {
                  passBlock = this.getDescriptorBlock(key0, passDB);
                } else {
                  const index = new DescriptorBlockIndex(index0.updateFrequency, index0.parameterType, index0.descriptorType, vis);
                  const key = JSON.stringify(index);
                  passBlock = this.getDescriptorBlock(key, passDB);
                }

                this.addDescriptor(passBlock, name, d.type);

                if (index0.descriptorType !== DescriptorTypeOrder.UNIFORM_BUFFER) {
                  continue;
                }

                const b = block.uniformBlocks.get(name);

                if (!b) {
                  console.error(`uniform block: ${name} not found`);
                  return 1;
                }

                this.addUniformBlock(passBlock, name, b);
              }
            }
          } // update pass


          for (const passID of lg.vertices()) {
            if (lg.id(passID) !== LayoutGraphValue.RenderStage) {
              continue;
            }

            const passDB = lg.getDescriptors(passID); // update children phases

            for (const e of lg.children(passID)) {
              const phaseID = lg.child(e);
              const phaseDB = lg.getDescriptors(phaseID);

              for (const [key, passBlock] of passDB.blocks) {
                const index = JSON.parse(key);

                if (index.updateFrequency !== UpdateFrequency.PER_PASS) {
                  console.error(`phase: ${lg.getName(phaseID)} update frequency is not PER_PASS`);
                  return 1;
                }

                if (passBlock.count === 0) {
                  console.error(`pass: ${lg.getName(passID)} count is 0`);
                  return 1;
                }

                if (passBlock.capacity !== passBlock.count) {
                  console.error(`pass: ${lg.getName(passID)} capacity does not equal count`);
                  return 1;
                }

                const phaseBlock = this.getDescriptorBlock(key, phaseDB);
                phaseBlock.descriptors.clear();
                phaseBlock.uniformBlocks.clear();
                phaseBlock.capacity = passBlock.capacity;
                phaseBlock.count = passBlock.count;

                for (const [name, d] of passBlock.descriptors) {
                  phaseBlock.descriptors.set(name, d);
                }

                for (const [name, b] of passBlock.uniformBlocks) {
                  phaseBlock.uniformBlocks.set(name, b);
                }
              }
            }
          } // console.debug(this.print());


          return 0;
        }

        print() {
          const print = new LayoutGraphPrintVisitor();
          const colorMap = new VectorGraphColorMap(this.lg.numVertices());
          depthFirstSearch(this.lg, print, colorMap);
          return print.oss;
        }

      });

      LayoutGraphBuilder2 = class LayoutGraphBuilder2 {
        constructor(lg) {
          this.lg = void 0;
          this.lg = lg;
        }

        clear() {
          this.lg.clear();
        }

        addRenderStage(name) {
          return this.lg.addVertex(LayoutGraphDataValue.RenderStage, new RenderStageData(), name, UpdateFrequency.PER_PASS, new PipelineLayoutData());
        }

        addRenderPhase(name, parentID) {
          return this.lg.addVertex(LayoutGraphDataValue.RenderPhase, new RenderPhaseData(), name, UpdateFrequency.PER_PHASE, new PipelineLayoutData(), parentID);
        }

        addShader(name, parentPhaseID) {
          const lg = this.lg;
          const phaseData = lg.getRenderPhase(parentPhaseID); // 填充shaderData数据

          const shaderData = new ShaderProgramData();
          const id = phaseData.shaderPrograms.length;
          phaseData.shaderPrograms.push(shaderData);
          phaseData.shaderIndex.set(name, id); // 注册shader所在的phase的ID

          lg.shaderLayoutIndex.set(name, parentPhaseID);
        }

        getDescriptorSetData(ppl, rate) {
          const data = ppl.descriptorSets.get(rate);

          if (data === undefined) {
            const newData = new DescriptorSetData();
            ppl.descriptorSets.set(rate, newData);
            return newData;
          }

          return data;
        }

        addDescriptorBlock(nodeID, index, block) {
          if (block.capacity <= 0) {
            console.error('empty block');
            return;
          }

          if (block.descriptorNames.length !== block.descriptors.length) {
            console.error('error descriptor');
            return;
          }

          if (block.uniformBlockNames.length !== block.uniformBlocks.length) {
            console.error('error uniform');
            return;
          }

          if (!(index.updateFrequency >= UpdateFrequency.PER_INSTANCE && index.updateFrequency <= UpdateFrequency.PER_PASS)) {
            console.error('invalid update frequency');
            return;
          }

          const lg = this.lg;
          const ppl = lg.getLayout(nodeID);
          const setData = this.getDescriptorSetData(ppl, index.updateFrequency);
          const layout = setData.descriptorSetLayoutData;
          const dstBlock = new DescriptorBlockData(index.descriptorType, index.visibility, block.capacity);
          dstBlock.offset = layout.capacity;
          layout.descriptorBlocks.push(dstBlock);

          for (let j = 0; j < block.descriptors.length; ++j) {
            const name = block.descriptorNames[j];
            const d = block.descriptors[j];
            const nameID = getOrCreateDescriptorID(lg, name);
            const data = new DescriptorData(nameID, d.type, d.count);
            dstBlock.descriptors.push(data);
          }

          layout.capacity += block.capacity;

          if (index.descriptorType === DescriptorTypeOrder.UNIFORM_BUFFER || index.descriptorType === DescriptorTypeOrder.DYNAMIC_UNIFORM_BUFFER) {
            layout.uniformBlockCapacity += block.capacity;
          } else if (index.descriptorType === DescriptorTypeOrder.SAMPLER_TEXTURE) {
            layout.samplerTextureCapacity += block.capacity;
          }
        }

        addUniformBlock(nodeID, index, name, uniformBlock) {
          const g = this.lg;
          const ppl = g.getLayout(nodeID);
          const setData = this.getDescriptorSetData(ppl, index.updateFrequency);
          const layout = setData.descriptorSetLayoutData;
          const nameID = getOrCreateDescriptorID(g, name);
          layout.uniformBlocks.set(nameID, uniformBlock); // register constant names

          for (const member of uniformBlock.members) {
            getOrCreateConstantID(g, member.name);
          }
        }

        reserveDescriptorBlock(nodeID, index, block) {
          if (block.capacity <= 0) {
            console.error('empty block');
            return;
          }

          const g = this.lg;
          const ppl = g.getLayout(nodeID);
          const setData = this.getDescriptorSetData(ppl, index.updateFrequency);
          const layout = setData.descriptorSetLayoutData;
          const dstBlock = new DescriptorBlockData(index.descriptorType, index.visibility, block.capacity);
          dstBlock.offset = layout.capacity;
          layout.descriptorBlocks.push(dstBlock);
          layout.capacity += block.capacity;

          if (index.descriptorType === DescriptorTypeOrder.UNIFORM_BUFFER || index.descriptorType === DescriptorTypeOrder.DYNAMIC_UNIFORM_BUFFER) {
            layout.uniformBlockCapacity += block.capacity;
          } else if (index.descriptorType === DescriptorTypeOrder.SAMPLER_TEXTURE) {
            layout.samplerTextureCapacity += block.capacity;
          }
        }

        compile() {
          // console.debug(this.print());
          return 0;
        }

        print() {
          const g = this.lg;
          const visitor = new PrintVisitor();
          const colorMap = new VectorGraphColorMap(g.numVertices());
          depthFirstSearch(g, visitor, colorMap);
          return visitor.oss;
        }

      };
    }
  };
});