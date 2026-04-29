System.register("q-bundled:///fs/cocos/rendering/custom/define.js", ["../../../../virtual/internal%253Aconstants.js", "../../gfx/index.js", "../../render-scene/scene/index.js", "../define.js", "./types.js", "../../core/index.js", "../../asset/assets/index.js", "../pipeline-funcs.js"], function (_export, _context) {
  "use strict";

  var EDITOR, BufferInfo, Buffer, BufferUsageBit, ClearFlagBit, Color, LoadOp, Format, Rect, Sampler, StoreOp, Texture, Viewport, MemoryUsageBit, Camera, CSMLevel, LightType, ShadowType, SKYBOX_FLAG, supportsR32FloatTexture, AccessType, AttachmentType, ComputeView, LightInfo, QueueHint, RasterView, ResourceResidency, SceneFlags, UpdateFrequency, Vec4, macro, geometry, toRadian, cclegacy, assert, Material, getProfilerCamera, SRGBToLinear, AntiAliasing, _cameras, FxaaData, fxaaData, MAX_BLOOM_FILTER_PASS_NUM, BLOOM_PREFILTERPASS_INDEX, BLOOM_DOWNSAMPLEPASS_INDEX, BLOOM_UPSAMPLEPASS_INDEX, BLOOM_COMBINEPASS_INDEX, BloomData, bloomData, PostInfo, postInfo, CameraInfo, GBufferInfo, LightingInfo, lightingInfo, layouts;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function validPunctualLightsCulling(pipeline, camera) {
    var sceneData = pipeline.pipelineSceneData;
    var validPunctualLights = sceneData.validPunctualLights;
    validPunctualLights.length = 0;

    var _sphere = geometry.Sphere.create(0, 0, 0, 1);

    var _ref = camera.scene,
        spotLights = _ref.spotLights;

    for (var i = 0; i < spotLights.length; i++) {
      var light = spotLights[i];

      if (light.baked) {
        continue;
      }

      geometry.Sphere.set(_sphere, light.position.x, light.position.y, light.position.z, light.range);

      if (geometry.intersect.sphereFrustum(_sphere, camera.frustum)) {
        validPunctualLights.push(light);
      }
    }

    var _ref2 = camera.scene,
        sphereLights = _ref2.sphereLights;

    for (var _i = 0; _i < sphereLights.length; _i++) {
      var _light = sphereLights[_i];

      if (_light.baked) {
        continue;
      }

      geometry.Sphere.set(_sphere, _light.position.x, _light.position.y, _light.position.z, _light.range);

      if (geometry.intersect.sphereFrustum(_sphere, camera.frustum)) {
        validPunctualLights.push(_light);
      }
    }
  }

  function getCameraUniqueID(camera) {
    if (!_cameras.includes(camera)) {
      _cameras.push(camera);
    }

    return _cameras.indexOf(camera);
  }

  function getLoadOpOfClearFlag(clearFlag, attachment) {
    var loadOp = LoadOp.CLEAR;

    if (!(clearFlag & ClearFlagBit.COLOR) && attachment === AttachmentType.RENDER_TARGET) {
      if (clearFlag & SKYBOX_FLAG) {
        loadOp = LoadOp.CLEAR;
      } else {
        loadOp = LoadOp.LOAD;
      }
    }

    if ((clearFlag & ClearFlagBit.DEPTH_STENCIL) !== ClearFlagBit.DEPTH_STENCIL && attachment === AttachmentType.DEPTH_STENCIL) {
      if (!(clearFlag & ClearFlagBit.DEPTH)) loadOp = LoadOp.LOAD;
      if (!(clearFlag & ClearFlagBit.STENCIL)) loadOp = LoadOp.LOAD;
    }

    return loadOp;
  }

  function getRenderArea(camera, width, height, light, level) {
    if (light === void 0) {
      light = null;
    }

    if (level === void 0) {
      level = 0;
    }

    var out = new Rect();
    var vp = camera ? camera.viewport : new Rect(0, 0, 1, 1);
    var w = width;
    var h = height;
    out.x = vp.x * w;
    out.y = vp.y * h;
    out.width = vp.width * w;
    out.height = vp.height * h;

    if (light) {
      switch (light.type) {
        case LightType.DIRECTIONAL:
          {
            var mainLight = light;

            if (mainLight.shadowFixedArea || mainLight.csmLevel === CSMLevel.LEVEL_1) {
              out.x = 0;
              out.y = 0;
              out.width = w;
              out.height = h;
            } else {
              var screenSpaceSignY = cclegacy.director.root.device.capabilities.screenSpaceSignY;
              out.x = level % 2 * 0.5 * w;

              if (screenSpaceSignY) {
                out.y = (1 - Math.floor(level / 2)) * 0.5 * h;
              } else {
                out.y = Math.floor(level / 2) * 0.5 * h;
              }

              out.width = 0.5 * w;
              out.height = 0.5 * h;
            }

            break;
          }

        case LightType.SPOT:
          {
            out.x = 0;
            out.y = 0;
            out.width = w;
            out.height = h;
            break;
          }

        default:
      }
    }

    return out;
  }

  function buildFxaaPass(camera, ppl, inputRT) {
    if (!fxaaData) {
      fxaaData = new FxaaData();
    }

    var cameraID = getCameraUniqueID(camera);
    var cameraName = "Camera" + cameraID;
    var width = camera.window.width;
    var height = camera.window.height;
    var area = getRenderArea(camera, width, height);
    width = area.width;
    height = area.height; // Start

    var clearColor = new Color(0, 0, 0, 1);

    if (camera.clearFlag & ClearFlagBit.COLOR) {
      clearColor.x = camera.clearColor.x;
      clearColor.y = camera.clearColor.y;
      clearColor.z = camera.clearColor.z;
    }

    clearColor.w = camera.clearColor.w;
    var fxaaPassRTName = "dsFxaaPassColor" + cameraName;
    var fxaaPassDSName = "dsFxaaPassDS" + cameraName; // ppl.updateRenderWindow(inputRT, camera.window);

    if (!ppl.containsResource(fxaaPassRTName)) {
      ppl.addRenderTarget(fxaaPassRTName, Format.RGBA8, width, height, ResourceResidency.MANAGED);
      ppl.addDepthStencil(fxaaPassDSName, Format.DEPTH_STENCIL, width, height, ResourceResidency.MANAGED);
    }

    ppl.updateRenderTarget(fxaaPassRTName, width, height);
    ppl.updateDepthStencil(fxaaPassDSName, width, height);
    var fxaaPassIdx = 0;
    var fxaaPass = ppl.addRasterPass(width, height, 'fxaa');
    fxaaPass.name = "CameraFxaaPass" + cameraID;
    fxaaPass.setViewport(new Viewport(area.x, area.y, width, height));

    if (ppl.containsResource(inputRT)) {
      fxaaPass.addTexture(inputRT, 'sceneColorMap');
    }

    fxaaPass.addRenderTarget(fxaaPassRTName, '_', LoadOp.CLEAR, StoreOp.STORE, clearColor);
    fxaaData.fxaaMaterial.setProperty('texSize', new Vec4(width, height, 1.0 / width, 1.0 / height), fxaaPassIdx);
    fxaaPass.addQueue(QueueHint.RENDER_TRANSPARENT).addCameraQuad(camera, fxaaData.fxaaMaterial, fxaaPassIdx, SceneFlags.NONE);
    return {
      rtName: fxaaPassRTName,
      dsName: fxaaPassDSName
    };
  }

  function buildBloomPass(camera, ppl, inputRT, threshold, iterations, intensity) {
    if (threshold === void 0) {
      threshold = 0.1;
    }

    if (iterations === void 0) {
      iterations = 2;
    }

    if (intensity === void 0) {
      intensity = 0.8;
    }

    if (!bloomData) {
      bloomData = new BloomData();
    }

    bloomData.threshold = threshold;
    bloomData.iterations = iterations;
    bloomData.intensity = intensity;
    var cameraID = getCameraUniqueID(camera);
    var cameraName = "Camera" + cameraID;
    var width = camera.window.width;
    var height = camera.window.height;
    var area = getRenderArea(camera, width, height);
    width = area.width;
    height = area.height; // Start bloom

    var bloomClearColor = new Color(0, 0, 0, 1);

    if (camera.clearFlag & ClearFlagBit.COLOR) {
      bloomClearColor.x = camera.clearColor.x;
      bloomClearColor.y = camera.clearColor.y;
      bloomClearColor.z = camera.clearColor.z;
    }

    bloomClearColor.w = camera.clearColor.w; // ==== Bloom prefilter ===

    var bloomPassPrefilterRTName = "dsBloomPassPrefilterColor" + cameraName;
    var bloomPassPrefilterDSName = "dsBloomPassPrefilterDS" + cameraName;
    width >>= 1;
    height >>= 1;

    if (!ppl.containsResource(bloomPassPrefilterRTName)) {
      ppl.addRenderTarget(bloomPassPrefilterRTName, Format.RGBA8, width, height, ResourceResidency.MANAGED);
      ppl.addDepthStencil(bloomPassPrefilterDSName, Format.DEPTH_STENCIL, width, height, ResourceResidency.MANAGED);
    }

    ppl.updateRenderTarget(bloomPassPrefilterRTName, width, height);
    ppl.updateDepthStencil(bloomPassPrefilterDSName, width, height);
    var bloomPrefilterPass = ppl.addRasterPass(width, height, 'bloom-prefilter');
    bloomPrefilterPass.name = "CameraBloomPrefilterPass" + cameraID;
    bloomPrefilterPass.setViewport(new Viewport(area.x, area.y, width, height));

    if (ppl.containsResource(inputRT)) {
      bloomPrefilterPass.addTexture(inputRT, 'outputResultMap');
    }

    bloomPrefilterPass.addRenderTarget(bloomPassPrefilterRTName, '_', LoadOp.CLEAR, StoreOp.STORE, bloomClearColor);
    bloomData.bloomMaterial.setProperty('texSize', new Vec4(0, 0, bloomData.threshold, 0), 0);
    bloomPrefilterPass.addQueue(QueueHint.RENDER_TRANSPARENT).addCameraQuad(camera, bloomData.bloomMaterial, 0, SceneFlags.NONE); // === Bloom downSampler ===

    for (var i = 0; i < bloomData.iterations; ++i) {
      var texSize = new Vec4(width, height, 0, 0);
      var bloomPassDownSampleRTName = "dsBloomPassDownSampleColor" + cameraName + i;
      var bloomPassDownSampleDSName = "dsBloomPassDownSampleDS" + cameraName + i;
      width >>= 1;
      height >>= 1;

      if (!ppl.containsResource(bloomPassDownSampleRTName)) {
        ppl.addRenderTarget(bloomPassDownSampleRTName, Format.RGBA8, width, height, ResourceResidency.MANAGED);
        ppl.addDepthStencil(bloomPassDownSampleDSName, Format.DEPTH_STENCIL, width, height, ResourceResidency.MANAGED);
      }

      ppl.updateRenderTarget(bloomPassDownSampleRTName, width, height);
      ppl.updateDepthStencil(bloomPassDownSampleDSName, width, height);
      var bloomDownSamplePass = ppl.addRasterPass(width, height, "bloom-downsample" + i);
      bloomDownSamplePass.name = "CameraBloomDownSamplePass" + cameraID + i;
      bloomDownSamplePass.setViewport(new Viewport(area.x, area.y, width, height));

      if (i === 0) {
        bloomDownSamplePass.addTexture(bloomPassPrefilterRTName, 'bloomTexture');
      } else {
        bloomDownSamplePass.addTexture("dsBloomPassDownSampleColor" + cameraName + (i - 1), 'bloomTexture');
      }

      bloomDownSamplePass.addRenderTarget(bloomPassDownSampleRTName, '_', LoadOp.CLEAR, StoreOp.STORE, bloomClearColor);
      bloomData.bloomMaterial.setProperty('texSize', texSize, BLOOM_DOWNSAMPLEPASS_INDEX + i);
      bloomDownSamplePass.addQueue(QueueHint.RENDER_TRANSPARENT).addCameraQuad(camera, bloomData.bloomMaterial, BLOOM_DOWNSAMPLEPASS_INDEX + i, SceneFlags.NONE);
    } // === Bloom upSampler ===


    for (var _i2 = 0; _i2 < bloomData.iterations; ++_i2) {
      var _texSize = new Vec4(width, height, 0, 0);

      var bloomPassUpSampleRTName = "dsBloomPassUpSampleColor" + cameraName + (bloomData.iterations - 1 - _i2);
      var bloomPassUpSampleDSName = "dsBloomPassUpSampleDS" + cameraName + (bloomData.iterations - 1 - _i2);
      width <<= 1;
      height <<= 1;

      if (!ppl.containsResource(bloomPassUpSampleRTName)) {
        ppl.addRenderTarget(bloomPassUpSampleRTName, Format.RGBA8, width, height, ResourceResidency.MANAGED);
        ppl.addDepthStencil(bloomPassUpSampleDSName, Format.DEPTH_STENCIL, width, height, ResourceResidency.MANAGED);
      }

      ppl.updateRenderTarget(bloomPassUpSampleRTName, width, height);
      ppl.updateDepthStencil(bloomPassUpSampleDSName, width, height);
      var bloomUpSamplePass = ppl.addRasterPass(width, height, "bloom-upsample" + _i2);
      bloomUpSamplePass.name = "CameraBloomUpSamplePass" + cameraID + (bloomData.iterations - 1 - _i2);
      bloomUpSamplePass.setViewport(new Viewport(area.x, area.y, width, height));

      if (_i2 === 0) {
        bloomUpSamplePass.addTexture("dsBloomPassDownSampleColor" + cameraName + (bloomData.iterations - 1), 'bloomTexture');
      } else {
        bloomUpSamplePass.addTexture("dsBloomPassUpSampleColor" + cameraName + (bloomData.iterations - _i2), 'bloomTexture');
      }

      bloomUpSamplePass.addRenderTarget(bloomPassUpSampleRTName, '_', LoadOp.CLEAR, StoreOp.STORE, bloomClearColor);
      bloomData.bloomMaterial.setProperty('texSize', _texSize, BLOOM_UPSAMPLEPASS_INDEX + _i2);
      bloomUpSamplePass.addQueue(QueueHint.RENDER_TRANSPARENT).addCameraQuad(camera, bloomData.bloomMaterial, BLOOM_UPSAMPLEPASS_INDEX + _i2, SceneFlags.NONE);
    } // === Bloom Combine Pass ===


    var bloomPassCombineRTName = "dsBloomPassCombineColor" + cameraName;
    var bloomPassCombineDSName = "dsBloomPassCombineDS" + cameraName;
    width = area.width;
    height = area.height;

    if (!ppl.containsResource(bloomPassCombineRTName)) {
      ppl.addRenderTarget(bloomPassCombineRTName, Format.RGBA8, width, height, ResourceResidency.MANAGED);
      ppl.addDepthStencil(bloomPassCombineDSName, Format.DEPTH_STENCIL, width, height, ResourceResidency.MANAGED);
    }

    ppl.updateRenderTarget(bloomPassCombineRTName, width, height);
    ppl.updateDepthStencil(bloomPassCombineDSName, width, height);
    var bloomCombinePass = ppl.addRasterPass(width, height, 'bloom-combine');
    bloomCombinePass.name = "CameraBloomCombinePass" + cameraID;
    bloomCombinePass.setViewport(new Viewport(area.x, area.y, width, height));
    bloomCombinePass.addTexture(inputRT, 'outputResultMap');
    bloomCombinePass.addTexture("dsBloomPassUpSampleColor" + cameraName + 0, 'bloomTexture');
    bloomCombinePass.addRenderTarget(bloomPassCombineRTName, '_', LoadOp.CLEAR, StoreOp.STORE, bloomClearColor);
    bloomData.bloomMaterial.setProperty('texSize', new Vec4(0, 0, 0, bloomData.intensity), BLOOM_COMBINEPASS_INDEX);
    bloomCombinePass.addQueue(QueueHint.RENDER_TRANSPARENT).addCameraQuad(camera, bloomData.bloomMaterial, BLOOM_COMBINEPASS_INDEX, SceneFlags.NONE);
    return {
      rtName: bloomPassCombineRTName,
      dsName: bloomPassCombineDSName
    };
  }

  function buildPostprocessPass(camera, ppl, inputTex, antiAliasing) {
    if (antiAliasing === void 0) {
      antiAliasing = AntiAliasing.NONE;
    }

    if (!postInfo || postInfo && postInfo.antiAliasing !== antiAliasing) {
      postInfo = new PostInfo(antiAliasing);
    }

    var cameraID = getCameraUniqueID(camera);
    var area = getRenderArea(camera, camera.window.width, camera.window.height);
    var width = area.width;
    var height = area.height;
    var postprocessPassRTName = "postprocessPassRTName" + cameraID;
    var postprocessPassDS = "postprocessPassDS" + cameraID;

    if (!ppl.containsResource(postprocessPassRTName)) {
      ppl.addRenderWindow(postprocessPassRTName, Format.BGRA8, width, height, camera.window);
      ppl.addDepthStencil(postprocessPassDS, Format.DEPTH_STENCIL, width, height, ResourceResidency.MANAGED);
    }

    ppl.updateRenderWindow(postprocessPassRTName, camera.window);
    ppl.updateDepthStencil(postprocessPassDS, width, height);
    var postprocessPass = ppl.addRasterPass(width, height, 'post-process');
    postprocessPass.name = "CameraPostprocessPass" + cameraID;
    postprocessPass.setViewport(new Viewport(area.x, area.y, area.width, area.height));

    if (ppl.containsResource(inputTex)) {
      postprocessPass.addTexture(inputTex, 'outputResultMap');
    }

    var postClearColor = new Color(0, 0, 0, camera.clearColor.w);

    if (camera.clearFlag & ClearFlagBit.COLOR) {
      postClearColor.x = camera.clearColor.x;
      postClearColor.y = camera.clearColor.y;
      postClearColor.z = camera.clearColor.z;
    }

    postprocessPass.addRenderTarget(postprocessPassRTName, '_', getLoadOpOfClearFlag(camera.clearFlag, AttachmentType.RENDER_TARGET), StoreOp.STORE, postClearColor);
    postprocessPass.addDepthStencil(postprocessPassDS, '_', getLoadOpOfClearFlag(camera.clearFlag, AttachmentType.DEPTH_STENCIL), StoreOp.STORE, camera.clearDepth, camera.clearStencil, camera.clearFlag);
    postprocessPass.addQueue(QueueHint.NONE).addFullscreenQuad(postInfo.postMaterial, 0, SceneFlags.NONE);

    if (getProfilerCamera() === camera) {
      postprocessPass.showStatistics = true;
    }

    return {
      rtName: postprocessPassRTName,
      dsName: postprocessPassDS
    };
  }

  function buildForwardPass(camera, ppl, isOffScreen) {
    if (EDITOR) {
      ppl.setMacroInt('CC_PIPELINE_TYPE', 0);
    }

    var cameraID = getCameraUniqueID(camera);
    var cameraName = "Camera" + cameraID;
    var cameraInfo = buildShadowPasses(cameraName, camera, ppl);
    var area = getRenderArea(camera, camera.window.width, camera.window.height);
    var width = area.width;
    var height = area.height;
    var forwardPassRTName = "dsForwardPassColor" + cameraName;
    var forwardPassDSName = "dsForwardPassDS" + cameraName;

    if (!ppl.containsResource(forwardPassRTName)) {
      if (!isOffScreen) {
        ppl.addRenderWindow(forwardPassRTName, Format.BGRA8, width, height, camera.window);
      } else {
        ppl.addRenderTarget(forwardPassRTName, Format.RGBA16F, width, height, ResourceResidency.MANAGED);
      }

      ppl.addDepthStencil(forwardPassDSName, Format.DEPTH_STENCIL, width, height, ResourceResidency.MANAGED);
    }

    if (!isOffScreen) {
      ppl.updateRenderWindow(forwardPassRTName, camera.window);
      ppl.updateDepthStencil(forwardPassDSName, width, height);
    } else {
      ppl.updateRenderTarget(forwardPassRTName, width, height);
      ppl.updateDepthStencil(forwardPassDSName, width, height);
    }

    var forwardPass = ppl.addRasterPass(width, height, 'default');
    forwardPass.name = "CameraForwardPass" + cameraID;
    forwardPass.setViewport(new Viewport(area.x, area.y, width, height));

    for (var _iterator = _createForOfIteratorHelperLoose(cameraInfo.mainLightShadowNames), _step; !(_step = _iterator()).done;) {
      var dirShadowName = _step.value;

      if (ppl.containsResource(dirShadowName)) {
        forwardPass.addTexture(dirShadowName, 'cc_shadowMap');
      }
    }

    for (var _iterator2 = _createForOfIteratorHelperLoose(cameraInfo.spotLightShadowNames), _step2; !(_step2 = _iterator2()).done;) {
      var spotShadowName = _step2.value;

      if (ppl.containsResource(spotShadowName)) {
        forwardPass.addTexture(spotShadowName, 'cc_spotShadowMap');
      }
    }

    forwardPass.addRenderTarget(forwardPassRTName, '_', isOffScreen ? LoadOp.CLEAR : getLoadOpOfClearFlag(camera.clearFlag, AttachmentType.RENDER_TARGET), StoreOp.STORE, new Color(camera.clearColor.x, camera.clearColor.y, camera.clearColor.z, camera.clearColor.w));
    forwardPass.addDepthStencil(forwardPassDSName, '_', isOffScreen ? LoadOp.CLEAR : getLoadOpOfClearFlag(camera.clearFlag, AttachmentType.DEPTH_STENCIL), StoreOp.STORE, camera.clearDepth, camera.clearStencil, camera.clearFlag);
    forwardPass.addQueue(QueueHint.RENDER_OPAQUE).addSceneOfCamera(camera, new LightInfo(), SceneFlags.OPAQUE_OBJECT | SceneFlags.PLANAR_SHADOW | SceneFlags.CUTOUT_OBJECT | SceneFlags.DEFAULT_LIGHTING | SceneFlags.DRAW_INSTANCING);
    var sceneFlags = SceneFlags.TRANSPARENT_OBJECT | SceneFlags.GEOMETRY;

    if (!isOffScreen) {
      sceneFlags |= SceneFlags.UI;
      forwardPass.showStatistics = true;
    }

    forwardPass.addQueue(QueueHint.RENDER_TRANSPARENT).addSceneOfCamera(camera, new LightInfo(), sceneFlags);
    return {
      rtName: forwardPassRTName,
      dsName: forwardPassDSName
    };
  }

  function buildShadowPass(passName, ppl, camera, light, level, width, height) {
    var fboW = width;
    var fboH = height;
    var area = getRenderArea(camera, width, height, light, level);
    width = area.width;
    height = area.height;
    var device = ppl.device;
    var shadowMapName = passName;

    if (!ppl.containsResource(shadowMapName)) {
      var format = supportsR32FloatTexture(device) ? Format.R32F : Format.RGBA8;
      ppl.addRenderTarget(shadowMapName, format, fboW, fboH, ResourceResidency.MANAGED);
      ppl.addDepthStencil(shadowMapName + "Depth", Format.DEPTH_STENCIL, fboW, fboH, ResourceResidency.MANAGED);
    }

    ppl.updateRenderTarget(shadowMapName, fboW, fboH);
    ppl.updateDepthStencil(shadowMapName + "Depth", fboW, fboH);
    var pass = ppl.addRasterPass(width, height, 'default');
    pass.name = passName;
    pass.setViewport(new Viewport(area.x, area.y, area.width, area.height));
    pass.addRenderTarget(shadowMapName, '_', LoadOp.CLEAR, StoreOp.STORE, new Color(1, 1, 1, camera.clearColor.w));
    pass.addDepthStencil(shadowMapName + "Depth", '_', LoadOp.CLEAR, StoreOp.DISCARD, camera.clearDepth, camera.clearStencil, ClearFlagBit.DEPTH_STENCIL);
    var queue = pass.addQueue(QueueHint.RENDER_OPAQUE);
    queue.addSceneOfCamera(camera, new LightInfo(light, level), SceneFlags.SHADOW_CASTER);
  }

  function buildReflectionProbePasss(camera, ppl, isOffScreen) {
    var probes = cclegacy.internal.reflectionProbeManager.getProbes();

    if (probes.length === 0) {
      return;
    }

    for (var i = 0; i < probes.length; i++) {
      var probe = probes[i];

      if (probe.needRender) {
        for (var faceIdx = 0; faceIdx < probe.bakedCubeTextures.length; faceIdx++) {
          buildReflectionProbePass(camera, ppl, probe, probe.bakedCubeTextures[faceIdx].window, faceIdx);
        }

        probe.needRender = false;
      }
    }
  }

  function buildReflectionProbePass(camera, ppl, probe, renderWindow, faceIdx) {
    var cameraName = "Camera" + faceIdx;
    var area = probe.renderArea();
    var width = area.x;
    var height = area.y;
    var probeCamera = probe.camera;
    var probePassRTName = "reflectionProbePassColor" + cameraName;
    var probePassDSName = "reflectionProbePassDS" + cameraName;
    probe.updateCameraDir(faceIdx);

    if (!ppl.containsResource(probePassRTName)) {
      ppl.addRenderWindow(probePassRTName, Format.RGBA8, width, height, renderWindow);
      ppl.addDepthStencil(probePassDSName, Format.DEPTH_STENCIL, width, height, ResourceResidency.MANAGED);
    }

    ppl.updateRenderWindow(probePassRTName, renderWindow);
    ppl.updateDepthStencil(probePassDSName, width, height);
    var probePass = ppl.addRasterPass(width, height, 'default');
    probePass.name = "ReflectionProbePass" + faceIdx;
    probePass.setViewport(new Viewport(0, 0, width, height));
    probePass.addRenderTarget(probePassRTName, '_', getLoadOpOfClearFlag(probeCamera.clearFlag, AttachmentType.RENDER_TARGET), StoreOp.STORE, new Color(probeCamera.clearColor.x, probeCamera.clearColor.y, probeCamera.clearColor.z, probeCamera.clearColor.w));
    probePass.addDepthStencil(probePassDSName, '_', getLoadOpOfClearFlag(probeCamera.clearFlag, AttachmentType.DEPTH_STENCIL), StoreOp.STORE, probeCamera.clearDepth, probeCamera.clearStencil, probeCamera.clearFlag);
    var passBuilder = probePass.addQueue(QueueHint.RENDER_OPAQUE);
    passBuilder.addSceneOfCamera(camera, new LightInfo(), SceneFlags.REFLECTION_PROBE);
    updateCameraUBO(passBuilder, probeCamera, ppl);
  }

  function buildShadowPasses(cameraName, camera, ppl) {
    validPunctualLightsCulling(ppl, camera);
    var pipeline = ppl;
    var shadowInfo = pipeline.pipelineSceneData.shadows;
    var validPunctualLights = ppl.pipelineSceneData.validPunctualLights;
    var cameraInfo = new CameraInfo();
    var shadows = ppl.pipelineSceneData.shadows;

    if (!shadowInfo.enabled || shadowInfo.type !== ShadowType.ShadowMap) {
      return cameraInfo;
    }

    cameraInfo.shadowEnabled = true;
    var _validLights = [];
    var n = 0;
    var m = 0;

    for (; n < shadowInfo.maxReceived && m < validPunctualLights.length;) {
      var light = validPunctualLights[m];

      if (light.type === LightType.SPOT) {
        var spotLight = light;

        if (spotLight.shadowEnabled) {
          _validLights.push(light);

          n++;
        }
      }

      m++;
    }

    var _ref3 = camera.scene,
        mainLight = _ref3.mainLight; // build shadow map

    var mapWidth = shadows.size.x;
    var mapHeight = shadows.size.y;

    if (mainLight && mainLight.shadowEnabled) {
      cameraInfo.mainLightShadowNames[0] = "MainLightShadow" + cameraName;

      if (mainLight.shadowFixedArea) {
        buildShadowPass(cameraInfo.mainLightShadowNames[0], ppl, camera, mainLight, 0, mapWidth, mapHeight);
      } else {
        var csmLevel = pipeline.pipelineSceneData.csmSupported ? mainLight.csmLevel : 1;

        for (var i = 0; i < csmLevel; i++) {
          cameraInfo.mainLightShadowNames[i] = "MainLightShadow" + cameraName;
          buildShadowPass(cameraInfo.mainLightShadowNames[i], ppl, camera, mainLight, i, mapWidth, mapHeight);
        }
      }
    }

    for (var l = 0; l < _validLights.length; l++) {
      var _light2 = _validLights[l];
      var passName = "SpotLightShadow" + l.toString() + cameraName;
      cameraInfo.spotLightShadowNames[l] = passName;
      buildShadowPass(passName, ppl, camera, _light2, 0, mapWidth, mapHeight);
    }

    return cameraInfo;
  }

  // deferred passes
  function buildGBufferPass(camera, ppl) {
    var cameraID = getCameraUniqueID(camera);
    var area = getRenderArea(camera, camera.window.width, camera.window.height);
    var width = area.width;
    var height = area.height;
    var gBufferPassRTName = "gBufferPassColorCamera";
    var gBufferPassNormal = "gBufferPassNormal";
    var gBufferPassEmissive = "gBufferPassEmissive";
    var gBufferPassDSName = "gBufferPassDSCamera";

    if (!ppl.containsResource(gBufferPassRTName)) {
      var colFormat = Format.RGBA16F;
      ppl.addRenderTarget(gBufferPassRTName, colFormat, width, height, ResourceResidency.MANAGED);
      ppl.addRenderTarget(gBufferPassNormal, colFormat, width, height, ResourceResidency.MANAGED);
      ppl.addRenderTarget(gBufferPassEmissive, colFormat, width, height, ResourceResidency.MANAGED);
      ppl.addDepthStencil(gBufferPassDSName, Format.DEPTH_STENCIL, width, height, ResourceResidency.MANAGED);
    }

    ppl.updateRenderTarget(gBufferPassRTName, width, height);
    ppl.updateRenderTarget(gBufferPassNormal, width, height);
    ppl.updateRenderTarget(gBufferPassEmissive, width, height);
    ppl.updateDepthStencil(gBufferPassDSName, width, height); // gbuffer pass

    var gBufferPass = ppl.addRasterPass(width, height, 'default');
    gBufferPass.name = "CameraGBufferPass" + cameraID;
    gBufferPass.setViewport(new Viewport(area.x, area.y, area.width, area.height));
    var rtColor = new Color(0, 0, 0, 0);

    if (camera.clearFlag & ClearFlagBit.COLOR) {
      if (ppl.pipelineSceneData.isHDR) {
        SRGBToLinear(rtColor, camera.clearColor);
      } else {
        rtColor.x = camera.clearColor.x;
        rtColor.y = camera.clearColor.y;
        rtColor.z = camera.clearColor.z;
      }
    }

    gBufferPass.addRenderTarget(gBufferPassRTName, '_', LoadOp.CLEAR, StoreOp.STORE, rtColor);
    gBufferPass.addRenderTarget(gBufferPassNormal, '_', LoadOp.CLEAR, StoreOp.STORE, new Color(0, 0, 0, 0));
    gBufferPass.addRenderTarget(gBufferPassEmissive, '_', LoadOp.CLEAR, StoreOp.STORE, new Color(0, 0, 0, 0));
    gBufferPass.addDepthStencil(gBufferPassDSName, '_', LoadOp.CLEAR, StoreOp.STORE, camera.clearDepth, camera.clearStencil, camera.clearFlag);
    gBufferPass.addQueue(QueueHint.RENDER_OPAQUE).addSceneOfCamera(camera, new LightInfo(), SceneFlags.OPAQUE_OBJECT | SceneFlags.CUTOUT_OBJECT);
    var gBufferInfo = new GBufferInfo();
    gBufferInfo.color = gBufferPassRTName;
    gBufferInfo.normal = gBufferPassNormal;
    gBufferInfo.emissive = gBufferPassEmissive;
    gBufferInfo.ds = gBufferPassDSName;
    return gBufferInfo;
  }

  // deferred lighting pass
  function buildLightingPass(camera, ppl, gBuffer) {
    if (!lightingInfo) {
      lightingInfo = new LightingInfo();
    }

    var cameraID = getCameraUniqueID(camera);
    var cameraName = "Camera" + cameraID;
    var cameraInfo = buildShadowPasses(cameraName, camera, ppl);
    var area = getRenderArea(camera, camera.window.width, camera.window.height);
    var width = area.width;
    var height = area.height;
    var deferredLightingPassRTName = "deferredLightingPassRTName";
    var deferredLightingPassDS = "deferredLightingPassDS";

    if (!ppl.containsResource(deferredLightingPassRTName)) {
      ppl.addRenderTarget(deferredLightingPassRTName, Format.RGBA8, width, height, ResourceResidency.MANAGED);
      ppl.addDepthStencil(deferredLightingPassDS, Format.DEPTH_STENCIL, width, height, ResourceResidency.MANAGED);
    }

    ppl.updateRenderTarget(deferredLightingPassRTName, width, height);
    ppl.updateDepthStencil(deferredLightingPassDS, width, height); // lighting pass

    var lightingPass = ppl.addRasterPass(width, height, 'deferred-lighting');
    lightingPass.name = "CameraLightingPass" + cameraID;
    lightingPass.setViewport(new Viewport(area.x, area.y, width, height));

    for (var _iterator3 = _createForOfIteratorHelperLoose(cameraInfo.mainLightShadowNames), _step3; !(_step3 = _iterator3()).done;) {
      var dirShadowName = _step3.value;

      if (ppl.containsResource(dirShadowName)) {
        lightingPass.addTexture(dirShadowName, 'cc_shadowMap');
      }
    }

    for (var _iterator4 = _createForOfIteratorHelperLoose(cameraInfo.spotLightShadowNames), _step4; !(_step4 = _iterator4()).done;) {
      var spotShadowName = _step4.value;

      if (ppl.containsResource(spotShadowName)) {
        lightingPass.addTexture(spotShadowName, 'cc_spotShadowMap');
      }
    }

    if (ppl.containsResource(gBuffer.color)) {
      lightingPass.addTexture(gBuffer.color, 'gbuffer_albedoMap');
      lightingPass.addTexture(gBuffer.normal, 'gbuffer_normalMap');
      lightingPass.addTexture(gBuffer.emissive, 'gbuffer_emissiveMap');
      lightingPass.addTexture(gBuffer.ds, 'depth_stencil');
    }

    var lightingClearColor = new Color(0, 0, 0, 0);

    if (camera.clearFlag & ClearFlagBit.COLOR) {
      lightingClearColor.x = camera.clearColor.x;
      lightingClearColor.y = camera.clearColor.y;
      lightingClearColor.z = camera.clearColor.z;
    }

    lightingClearColor.w = 0;
    lightingPass.addRenderTarget(deferredLightingPassRTName, '_', LoadOp.CLEAR, StoreOp.STORE, lightingClearColor);
    lightingPass.addQueue(QueueHint.RENDER_TRANSPARENT).addCameraQuad(camera, lightingInfo.deferredLightingMaterial, 0, SceneFlags.VOLUMETRIC_LIGHTING); // lightingPass.addQueue(QueueHint.RENDER_TRANSPARENT).addSceneOfCamera(camera, new LightInfo(),
    //     SceneFlags.TRANSPARENT_OBJECT | SceneFlags.PLANAR_SHADOW | SceneFlags.GEOMETRY);

    return {
      rtName: deferredLightingPassRTName,
      dsName: deferredLightingPassDS
    };
  }

  function getClearFlags(attachment, clearFlag, loadOp) {
    switch (attachment) {
      case AttachmentType.DEPTH_STENCIL:
        if (loadOp === LoadOp.CLEAR) {
          if (clearFlag & ClearFlagBit.DEPTH_STENCIL) {
            return clearFlag;
          } else {
            return ClearFlagBit.DEPTH_STENCIL;
          }
        } else {
          return ClearFlagBit.NONE;
        }

      case AttachmentType.RENDER_TARGET:
      default:
        if (loadOp === LoadOp.CLEAR) {
          return ClearFlagBit.COLOR;
        } else {
          return ClearFlagBit.NONE;
        }

    }
  }

  function buildUIPass(camera, ppl) {
    var cameraID = getCameraUniqueID(camera);
    var cameraName = "Camera" + cameraID;
    var area = getRenderArea(camera, camera.window.width, camera.window.height);
    var width = area.width;
    var height = area.height;
    var dsUIAndProfilerPassRTName = "dsUIAndProfilerPassColor" + cameraName;
    var dsUIAndProfilerPassDSName = "dsUIAndProfilerPassDS" + cameraName;

    if (!ppl.containsResource(dsUIAndProfilerPassRTName)) {
      ppl.addRenderWindow(dsUIAndProfilerPassRTName, Format.BGRA8, width, height, camera.window);
      ppl.addDepthStencil(dsUIAndProfilerPassDSName, Format.DEPTH_STENCIL, width, height, ResourceResidency.MANAGED);
    }

    ppl.updateRenderWindow(dsUIAndProfilerPassRTName, camera.window);
    ppl.updateDepthStencil(dsUIAndProfilerPassDSName, width, height);
    var uiAndProfilerPass = ppl.addRasterPass(width, height, 'default');
    uiAndProfilerPass.name = "CameraUIAndProfilerPass" + cameraID;
    uiAndProfilerPass.setViewport(new Viewport(area.x, area.y, width, height));
    uiAndProfilerPass.addRenderTarget(dsUIAndProfilerPassRTName, '_', getLoadOpOfClearFlag(camera.clearFlag, AttachmentType.RENDER_TARGET), StoreOp.STORE, new Color(camera.clearColor.x, camera.clearColor.y, camera.clearColor.z, camera.clearColor.w));
    uiAndProfilerPass.addDepthStencil(dsUIAndProfilerPassDSName, '_', getLoadOpOfClearFlag(camera.clearFlag, AttachmentType.DEPTH_STENCIL), StoreOp.STORE, camera.clearDepth, camera.clearStencil, camera.clearFlag);
    var sceneFlags = SceneFlags.UI;
    uiAndProfilerPass.addQueue(QueueHint.RENDER_TRANSPARENT).addSceneOfCamera(camera, new LightInfo(), sceneFlags);

    if (getProfilerCamera() === camera) {
      uiAndProfilerPass.showStatistics = true;
    }
  }

  function buildNativeForwardPass(camera, ppl) {
    var cameraID = getCameraUniqueID(camera);
    var cameraName = "Camera" + cameraID;
    var area = getRenderArea(camera, camera.window.width, camera.window.height);
    var width = area.width;
    var height = area.height; // Resources

    var forwardPassRTName = "dsForwardPassColor" + cameraName;
    var forwardPassDSName = "dsForwardPassDS" + cameraName;

    if (!ppl.containsResource(forwardPassRTName)) {
      ppl.addRenderTexture(forwardPassRTName, Format.BGRA8, width, height, camera.window);
      ppl.addDepthStencil(forwardPassDSName, Format.DEPTH_STENCIL, width, height, ResourceResidency.MANAGED);
    }

    ppl.updateRenderWindow(forwardPassRTName, camera.window);
    ppl.updateDepthStencil(forwardPassDSName, width, height); // Passes

    var forwardPass = ppl.addRasterPass(width, height, 'default');
    forwardPass.name = "CameraForwardPass" + cameraID;
    forwardPass.setViewport(new Viewport(area.x, area.y, width, height));
    var cameraRenderTargetLoadOp = getLoadOpOfClearFlag(camera.clearFlag, AttachmentType.RENDER_TARGET);
    var cameraDepthStencilLoadOp = getLoadOpOfClearFlag(camera.clearFlag, AttachmentType.DEPTH_STENCIL);
    forwardPass.addRasterView(forwardPassRTName, new RasterView('_', AccessType.WRITE, AttachmentType.RENDER_TARGET, cameraRenderTargetLoadOp, StoreOp.STORE, getClearFlags(AttachmentType.RENDER_TARGET, camera.clearFlag, cameraRenderTargetLoadOp), new Color(camera.clearColor.x, camera.clearColor.y, camera.clearColor.z, camera.clearColor.w)));
    forwardPass.addRasterView(forwardPassDSName, new RasterView('_', AccessType.WRITE, AttachmentType.DEPTH_STENCIL, cameraDepthStencilLoadOp, StoreOp.STORE, getClearFlags(AttachmentType.DEPTH_STENCIL, camera.clearFlag, cameraDepthStencilLoadOp), new Color(camera.clearDepth, camera.clearStencil, 0, 0)));
    forwardPass.addQueue(QueueHint.RENDER_OPAQUE).addSceneOfCamera(camera, new LightInfo(), SceneFlags.OPAQUE_OBJECT | SceneFlags.PLANAR_SHADOW | SceneFlags.CUTOUT_OBJECT | SceneFlags.DEFAULT_LIGHTING | SceneFlags.DRAW_INSTANCING);
    forwardPass.addQueue(QueueHint.RENDER_TRANSPARENT).addSceneOfCamera(camera, new LightInfo(), SceneFlags.TRANSPARENT_OBJECT | SceneFlags.GEOMETRY);
    forwardPass.addQueue(QueueHint.RENDER_TRANSPARENT).addSceneOfCamera(camera, new LightInfo(), SceneFlags.UI);
    forwardPass.showStatistics = true;
  }

  function buildNativeDeferredPipeline(camera, ppl) {
    var cameraID = getCameraUniqueID(camera);
    var area = getRenderArea(camera, camera.window.width, camera.window.height);
    var width = area.width;
    var height = area.height;

    if (!ppl.containsResource('Albedo')) {
      // GBuffers
      ppl.addRenderTarget('Albedo', Format.RGBA16F, width, height, ResourceResidency.MANAGED);
      ppl.addRenderTarget('Normal', Format.RGBA16F, width, height, ResourceResidency.MANAGED);
      ppl.addRenderTarget('Emissive', Format.RGBA16F, width, height, ResourceResidency.MANAGED);
      ppl.addDepthStencil('DepthStencil', Format.DEPTH_STENCIL, width, height, ResourceResidency.MANAGED); // Lighting

      ppl.addRenderTexture('Color', Format.BGRA8, width, height, camera.window);
    }

    if (!lightingInfo) {
      lightingInfo = new LightingInfo();
    } // GeometryPass


    {
      var gBufferPass = ppl.addRasterPass(width, height, 'default');
      gBufferPass.name = 'GeometryPass';
      gBufferPass.setViewport(new Viewport(area.x, area.y, area.width, area.height));
      gBufferPass.addRasterView('Albedo', new RasterView('_', AccessType.WRITE, AttachmentType.RENDER_TARGET, LoadOp.CLEAR, StoreOp.STORE, ClearFlagBit.COLOR));
      gBufferPass.addRasterView('Normal', new RasterView('_', AccessType.WRITE, AttachmentType.RENDER_TARGET, LoadOp.CLEAR, StoreOp.STORE, ClearFlagBit.COLOR));
      gBufferPass.addRasterView('Emissive', new RasterView('_', AccessType.WRITE, AttachmentType.RENDER_TARGET, LoadOp.CLEAR, StoreOp.STORE, ClearFlagBit.COLOR));
      gBufferPass.addRasterView('DepthStencil', new RasterView('_', AccessType.WRITE, AttachmentType.DEPTH_STENCIL, LoadOp.CLEAR, StoreOp.STORE, ClearFlagBit.DEPTH_STENCIL, new Color(1, 0, 0, 0)));
      gBufferPass.addQueue(QueueHint.RENDER_OPAQUE).addSceneOfCamera(camera, new LightInfo(), SceneFlags.OPAQUE_OBJECT | SceneFlags.CUTOUT_OBJECT);
    } // LightingPass

    {
      var lightingPass = ppl.addRasterPass(width, height, 'default');
      lightingPass.name = 'LightingPass';
      lightingPass.setViewport(new Viewport(area.x, area.y, width, height));
      var lightingClearColor = new Color(0, 0, 0, 0);

      if (camera.clearFlag & ClearFlagBit.COLOR) {
        lightingClearColor.x = camera.clearColor.x;
        lightingClearColor.y = camera.clearColor.y;
        lightingClearColor.z = camera.clearColor.z;
      }

      lightingClearColor.w = 1;
      lightingPass.addRasterView('Color', new RasterView('_', AccessType.WRITE, AttachmentType.RENDER_TARGET, LoadOp.CLEAR, StoreOp.STORE, camera.clearFlag, lightingClearColor));
      lightingPass.addComputeView('Albedo', new ComputeView('gbuffer_albedoMap'));
      lightingPass.addComputeView('Normal', new ComputeView('gbuffer_normalMap'));
      lightingPass.addComputeView('Emissive', new ComputeView('gbuffer_emissiveMap'));
      lightingPass.addComputeView('DepthStencil', new ComputeView('depth_stencil'));
      lightingPass.addQueue(QueueHint.RENDER_TRANSPARENT).addCameraQuad(camera, lightingInfo.deferredLightingMaterial, 0, SceneFlags.VOLUMETRIC_LIGHTING);
      lightingPass.addQueue(QueueHint.RENDER_TRANSPARENT).addSceneOfCamera(camera, new LightInfo(), SceneFlags.TRANSPARENT_OBJECT | SceneFlags.PLANAR_SHADOW | SceneFlags.GEOMETRY);
    }
  }

  function updateCameraUBO(setter, camera, ppl) {
    var pipeline = cclegacy.director.root.pipeline;
    var sceneData = ppl.pipelineSceneData;
    var skybox = sceneData.skybox;
    setter.addConstant('CCCamera');
    setter.setMat4('cc_matView', camera.matView);
    setter.setMat4('cc_matViewInv', camera.node.worldMatrix);
    setter.setMat4('cc_matProj', camera.matProj);
    setter.setMat4('cc_matProjInv', camera.matProjInv);
    setter.setMat4('cc_matViewProj', camera.matViewProj);
    setter.setMat4('cc_matViewProjInv', camera.matViewProjInv);
    setter.setVec4('cc_cameraPos', new Vec4(camera.position.x, camera.position.y, camera.position.z, pipeline.getCombineSignY())); // eslint-disable-next-line max-len

    setter.setVec4('cc_surfaceTransform', new Vec4(camera.surfaceTransform, 0.0, Math.cos(toRadian(skybox.getRotationAngle())), Math.sin(toRadian(skybox.getRotationAngle())))); // eslint-disable-next-line max-len

    setter.setVec4('cc_screenScale', new Vec4(sceneData.shadingScale, sceneData.shadingScale, 1.0 / sceneData.shadingScale, 1.0 / sceneData.shadingScale));
    setter.setVec4('cc_exposure', new Vec4(camera.exposure, 1.0 / camera.exposure, sceneData.isHDR ? 1.0 : 0.0, 1.0 / Camera.standardExposureValue));
  }

  function bindDescValue(desc, binding, value) {
    if (value instanceof Buffer) {
      desc.bindBuffer(binding, value);
    } else if (value instanceof Texture) {
      desc.bindTexture(binding, value);
    } else if (value instanceof Sampler) {
      desc.bindSampler(binding, value);
    }
  }

  function bindGlobalDesc(desc, binding, value) {
    bindDescValue(desc, binding, value);
  }

  function getDescBinding(descId, descData) {
    var layoutData = descData; // find descriptor binding

    for (var _iterator5 = _createForOfIteratorHelperLoose(layoutData.descriptorSetLayoutData.descriptorBlocks), _step5; !(_step5 = _iterator5()).done;) {
      var block = _step5.value;

      for (var i = 0; i !== block.descriptors.length; ++i) {
        if (descId === block.descriptors[i].descriptorID) {
          return block.offset + i;
        }
      }
    }

    return -1;
  }

  function getDescBindingFromName(bindingName) {
    var pipeline = cclegacy.director.root.pipeline;
    var layoutGraph = pipeline.layoutGraph;
    var vertIds = layoutGraph.vertices();
    var descId = layoutGraph.attributeIndex.get(bindingName);
    var currDesData;

    for (var _iterator6 = _createForOfIteratorHelperLoose(vertIds), _step6; !(_step6 = _iterator6()).done;) {
      var i = _step6.value;
      var layout = layoutGraph.getLayout(i);

      for (var _iterator7 = _createForOfIteratorHelperLoose(layout.descriptorSets), _step7; !(_step7 = _iterator7()).done;) {
        var _step7$value = _step7.value,
            k = _step7$value[0],
            descData = _step7$value[1];
        var layoutData = descData.descriptorSetLayoutData;
        var blocks = layoutData.descriptorBlocks;

        for (var _iterator8 = _createForOfIteratorHelperLoose(blocks), _step8; !(_step8 = _iterator8()).done;) {
          var b = _step8.value;

          for (var _iterator9 = _createForOfIteratorHelperLoose(b.descriptors), _step9; !(_step9 = _iterator9()).done;) {
            var ds = _step9.value;

            if (ds.descriptorID === descId) {
              currDesData = descData;
              return getDescBinding(descId, currDesData);
            }
          }
        }
      }
    }

    return -1;
  }

  function applyGlobalDescBinding(data, layout, isUpdate) {
    if (isUpdate === void 0) {
      isUpdate = false;
    }

    var constants = data.constants;
    var samplers = data.samplers;
    var textures = data.textures;
    var device = cclegacy.director.root.device;
    var descriptorSetData = getDescriptorSetDataFromLayout(layout);
    var descriptorSet = descriptorSetData.descriptorSet;

    for (var _iterator10 = _createForOfIteratorHelperLoose(constants), _step10; !(_step10 = _iterator10()).done;) {
      var _step10$value = _step10.value,
          key = _step10$value[0],
          value = _step10$value[1];
      var bindId = getDescBinding(key, descriptorSetData);

      if (bindId === -1) {
        continue;
      }

      var buffer = descriptorSet.getBuffer(bindId);
      var haveBuff = true;

      if (!buffer && !isUpdate) {
        buffer = device.createBuffer(new BufferInfo(BufferUsageBit.UNIFORM | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, value.length * 4, value.length * 4));
        haveBuff = false;
      }

      if (isUpdate) buffer.update(new Float32Array(value));
      if (!haveBuff) bindGlobalDesc(descriptorSet, bindId, buffer);
    }

    for (var _iterator11 = _createForOfIteratorHelperLoose(textures), _step11; !(_step11 = _iterator11()).done;) {
      var _step11$value = _step11.value,
          _key = _step11$value[0],
          _value = _step11$value[1];

      var _bindId = getDescBinding(_key, descriptorSetData);

      if (_bindId === -1) {
        continue;
      }

      var tex = descriptorSet.getTexture(_bindId);

      if (!tex || isUpdate) {
        bindGlobalDesc(descriptorSet, _bindId, _value);
      }
    }

    for (var _iterator12 = _createForOfIteratorHelperLoose(samplers), _step12; !(_step12 = _iterator12()).done;) {
      var _step12$value = _step12.value,
          _key2 = _step12$value[0],
          _value2 = _step12$value[1];

      var _bindId2 = getDescBinding(_key2, descriptorSetData);

      if (_bindId2 === -1) {
        continue;
      }

      var sampler = descriptorSet.getSampler(_bindId2);

      if (!sampler || isUpdate) {
        bindGlobalDesc(descriptorSet, _bindId2, _value2);
      }
    }
  }

  function getDescriptorSetDataFromLayout(layoutName) {
    var descLayout = layouts.get(layoutName);

    if (descLayout) {
      return descLayout;
    }

    var webPip = cclegacy.director.root.pipeline;
    var stageId = webPip.layoutGraph.locateChild(webPip.layoutGraph.nullVertex(), layoutName);
    assert(stageId !== 0xFFFFFFFF);
    var layout = webPip.layoutGraph.getLayout(stageId);
    var layoutData = layout.descriptorSets.get(UpdateFrequency.PER_PASS);
    layouts.set(layoutName, layoutData);
    return layoutData;
  }

  function getDescriptorSetDataFromLayoutId(id) {
    var webPip = cclegacy.director.root.pipeline;
    var layout = webPip.layoutGraph.getLayout(id);
    var layoutData = layout.descriptorSets.get(UpdateFrequency.PER_PASS);
    return layoutData;
  }

  function initGlobalDescBinding(data, layoutName) {
    if (layoutName === void 0) {
      layoutName = 'default';
    }

    applyGlobalDescBinding(data, layoutName);
  }

  function updateGlobalDescBinding(data, layoutName) {
    if (layoutName === void 0) {
      layoutName = 'default';
    }

    applyGlobalDescBinding(data, layoutName, true);
  }

  function mergeSrcToTargetDesc(fromDesc, toDesc, isForce) {
    if (isForce === void 0) {
      isForce = false;
    }

    fromDesc.update();
    var fromGpuDesc = fromDesc.gpuDescriptorSet;
    var toGpuDesc = toDesc.gpuDescriptorSet;
    var extResId = [];

    if (isForce) {
      toGpuDesc.gpuDescriptors = fromGpuDesc.gpuDescriptors;
      toGpuDesc.descriptorIndices = fromGpuDesc.descriptorIndices;
      return extResId;
    }

    for (var i = 0; i < toGpuDesc.gpuDescriptors.length; i++) {
      var fromRes = fromGpuDesc.gpuDescriptors[i];
      if (!fromRes) continue;
      var currRes = toGpuDesc.gpuDescriptors[i];

      if (!currRes.gpuBuffer && fromRes.gpuBuffer) {
        currRes.gpuBuffer = fromRes.gpuBuffer;
        extResId.push(i);
      } else if ('gpuTextureView' in currRes && !currRes.gpuTextureView) {
        currRes.gpuTextureView = fromRes.gpuTextureView;
        currRes.gpuSampler = fromRes.gpuSampler;
        extResId.push(i);
      } else if ('gpuTexture' in currRes && !currRes.gpuTexture) {
        currRes.gpuTexture = fromRes.gpuTexture;
        currRes.gpuSampler = fromRes.gpuSampler;
        extResId.push(i);
      }
    }

    return extResId;
  }

  _export({
    validPunctualLightsCulling: validPunctualLightsCulling,
    getCameraUniqueID: getCameraUniqueID,
    getLoadOpOfClearFlag: getLoadOpOfClearFlag,
    getRenderArea: getRenderArea,
    buildFxaaPass: buildFxaaPass,
    buildBloomPass: buildBloomPass,
    buildPostprocessPass: buildPostprocessPass,
    buildForwardPass: buildForwardPass,
    buildShadowPass: buildShadowPass,
    buildReflectionProbePasss: buildReflectionProbePasss,
    buildReflectionProbePass: buildReflectionProbePass,
    buildShadowPasses: buildShadowPasses,
    buildGBufferPass: buildGBufferPass,
    buildLightingPass: buildLightingPass,
    buildUIPass: buildUIPass,
    buildNativeForwardPass: buildNativeForwardPass,
    buildNativeDeferredPipeline: buildNativeDeferredPipeline,
    updateCameraUBO: updateCameraUBO,
    getDescBinding: getDescBinding,
    getDescBindingFromName: getDescBindingFromName,
    getDescriptorSetDataFromLayout: getDescriptorSetDataFromLayout,
    getDescriptorSetDataFromLayoutId: getDescriptorSetDataFromLayoutId,
    initGlobalDescBinding: initGlobalDescBinding,
    updateGlobalDescBinding: updateGlobalDescBinding,
    mergeSrcToTargetDesc: mergeSrcToTargetDesc,
    AntiAliasing: void 0
  });

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_gfxIndexJs) {
      BufferInfo = _gfxIndexJs.BufferInfo;
      Buffer = _gfxIndexJs.Buffer;
      BufferUsageBit = _gfxIndexJs.BufferUsageBit;
      ClearFlagBit = _gfxIndexJs.ClearFlagBit;
      Color = _gfxIndexJs.Color;
      LoadOp = _gfxIndexJs.LoadOp;
      Format = _gfxIndexJs.Format;
      Rect = _gfxIndexJs.Rect;
      Sampler = _gfxIndexJs.Sampler;
      StoreOp = _gfxIndexJs.StoreOp;
      Texture = _gfxIndexJs.Texture;
      Viewport = _gfxIndexJs.Viewport;
      MemoryUsageBit = _gfxIndexJs.MemoryUsageBit;
    }, function (_renderSceneSceneIndexJs) {
      Camera = _renderSceneSceneIndexJs.Camera;
      CSMLevel = _renderSceneSceneIndexJs.CSMLevel;
      LightType = _renderSceneSceneIndexJs.LightType;
      ShadowType = _renderSceneSceneIndexJs.ShadowType;
      SKYBOX_FLAG = _renderSceneSceneIndexJs.SKYBOX_FLAG;
    }, function (_defineJs) {
      supportsR32FloatTexture = _defineJs.supportsR32FloatTexture;
    }, function (_typesJs) {
      AccessType = _typesJs.AccessType;
      AttachmentType = _typesJs.AttachmentType;
      ComputeView = _typesJs.ComputeView;
      LightInfo = _typesJs.LightInfo;
      QueueHint = _typesJs.QueueHint;
      RasterView = _typesJs.RasterView;
      ResourceResidency = _typesJs.ResourceResidency;
      SceneFlags = _typesJs.SceneFlags;
      UpdateFrequency = _typesJs.UpdateFrequency;
    }, function (_coreIndexJs) {
      Vec4 = _coreIndexJs.Vec4;
      macro = _coreIndexJs.macro;
      geometry = _coreIndexJs.geometry;
      toRadian = _coreIndexJs.toRadian;
      cclegacy = _coreIndexJs.cclegacy;
      assert = _coreIndexJs.assert;
    }, function (_assetAssetsIndexJs) {
      Material = _assetAssetsIndexJs.Material;
    }, function (_pipelineFuncsJs) {
      getProfilerCamera = _pipelineFuncsJs.getProfilerCamera;
      SRGBToLinear = _pipelineFuncsJs.SRGBToLinear;
    }],
    execute: function () {
      (function (AntiAliasing) {
        AntiAliasing[AntiAliasing["NONE"] = 0] = "NONE";
        AntiAliasing[AntiAliasing["FXAA"] = 1] = "FXAA";
        AntiAliasing[AntiAliasing["FXAAHQ"] = 2] = "FXAAHQ";
      })(AntiAliasing || _export("AntiAliasing", AntiAliasing = {}));

      _cameras = [];

      FxaaData = /*#__PURE__*/function () {
        var _proto = FxaaData.prototype;

        _proto._updateFxaaPass = function _updateFxaaPass() {
          if (!this.fxaaMaterial) return;
          var combinePass = this.fxaaMaterial.passes[0];
          combinePass.beginChangeStatesSilently();
          combinePass.tryCompile();
          combinePass.endChangeStatesSilently();
        };

        _proto._init = function _init() {
          if (this.fxaaMaterial) return;
          this.fxaaMaterial = new Material();
          this.fxaaMaterial._uuid = 'builtin-fxaa-material';
          this.fxaaMaterial.initialize({
            effectName: 'pipeline/fxaa-hq'
          });

          for (var i = 0; i < this.fxaaMaterial.passes.length; ++i) {
            this.fxaaMaterial.passes[i].tryCompile();
          }

          this._updateFxaaPass();
        };

        function FxaaData() {
          this._init();
        }

        return FxaaData;
      }();

      fxaaData = null;

      _export("MAX_BLOOM_FILTER_PASS_NUM", MAX_BLOOM_FILTER_PASS_NUM = 6);

      _export("BLOOM_PREFILTERPASS_INDEX", BLOOM_PREFILTERPASS_INDEX = 0);

      _export("BLOOM_DOWNSAMPLEPASS_INDEX", BLOOM_DOWNSAMPLEPASS_INDEX = 1);

      _export("BLOOM_UPSAMPLEPASS_INDEX", BLOOM_UPSAMPLEPASS_INDEX = BLOOM_DOWNSAMPLEPASS_INDEX + MAX_BLOOM_FILTER_PASS_NUM);

      _export("BLOOM_COMBINEPASS_INDEX", BLOOM_COMBINEPASS_INDEX = BLOOM_UPSAMPLEPASS_INDEX + MAX_BLOOM_FILTER_PASS_NUM);

      BloomData = /*#__PURE__*/function () {
        var _proto2 = BloomData.prototype;

        _proto2._updateBloomPass = function _updateBloomPass() {
          if (!this.bloomMaterial) return;
          var prefilterPass = this.bloomMaterial.passes[BLOOM_PREFILTERPASS_INDEX];
          prefilterPass.beginChangeStatesSilently();
          prefilterPass.tryCompile();
          prefilterPass.endChangeStatesSilently();

          for (var i = 0; i < MAX_BLOOM_FILTER_PASS_NUM; ++i) {
            var downsamplePass = this.bloomMaterial.passes[BLOOM_DOWNSAMPLEPASS_INDEX + i];
            downsamplePass.beginChangeStatesSilently();
            downsamplePass.tryCompile();
            downsamplePass.endChangeStatesSilently();
            var upsamplePass = this.bloomMaterial.passes[BLOOM_UPSAMPLEPASS_INDEX + i];
            upsamplePass.beginChangeStatesSilently();
            upsamplePass.tryCompile();
            upsamplePass.endChangeStatesSilently();
          }

          var combinePass = this.bloomMaterial.passes[BLOOM_COMBINEPASS_INDEX];
          combinePass.beginChangeStatesSilently();
          combinePass.tryCompile();
          combinePass.endChangeStatesSilently();
        };

        _proto2._init = function _init() {
          if (this.bloomMaterial) return;
          this.bloomMaterial = new Material();
          this.bloomMaterial._uuid = 'builtin-bloom-material';
          this.bloomMaterial.initialize({
            effectName: 'pipeline/bloom'
          });

          for (var i = 0; i < this.bloomMaterial.passes.length; ++i) {
            this.bloomMaterial.passes[i].tryCompile();
          }

          this._updateBloomPass();
        };

        function BloomData() {
          this.threshold = 0.1;
          this.iterations = 2;
          this.intensity = 0.8;

          this._init();
        }

        return BloomData;
      }();

      bloomData = null;

      PostInfo = /*#__PURE__*/function () {
        var _proto3 = PostInfo.prototype;

        _proto3._init = function _init() {
          this.postMaterial = new Material();
          this.postMaterial.name = 'builtin-post-process-material';

          if (macro.ENABLE_ANTIALIAS_FXAA) {
            this.antiAliasing = AntiAliasing.FXAA;
          }

          this.postMaterial.initialize({
            effectName: 'pipeline/post-process',
            defines: {
              // Anti-aliasing type, currently only fxaa, so 1 means fxaa
              ANTIALIAS_TYPE: this.antiAliasing
            }
          });

          for (var i = 0; i < this.postMaterial.passes.length; ++i) {
            this.postMaterial.passes[i].tryCompile();
          }
        };

        function PostInfo(antiAliasing) {
          if (antiAliasing === void 0) {
            antiAliasing = AntiAliasing.NONE;
          }

          this.antiAliasing = AntiAliasing.NONE;
          this.antiAliasing = antiAliasing;

          this._init();
        }

        return PostInfo;
      }();

      postInfo = null;

      CameraInfo = function CameraInfo() {
        this.shadowEnabled = false;
        this.mainLightShadowNames = new Array();
        this.spotLightShadowNames = new Array();
      };

      _export("GBufferInfo", GBufferInfo = function GBufferInfo() {});

      LightingInfo = /*#__PURE__*/function () {
        var _proto4 = LightingInfo.prototype;

        _proto4._init = function _init() {
          this.deferredLightingMaterial = new Material();
          this.deferredLightingMaterial.name = 'builtin-deferred-material';
          this.deferredLightingMaterial.initialize({
            effectName: 'pipeline/deferred-lighting',
            defines: {
              CC_RECEIVE_SHADOW: 1
            }
          });

          for (var i = 0; i < this.deferredLightingMaterial.passes.length; ++i) {
            this.deferredLightingMaterial.passes[i].tryCompile();
          }
        };

        function LightingInfo() {
          this._init();
        }

        return LightingInfo;
      }();

      lightingInfo = null;
      layouts = new Map();
    }
  };
});