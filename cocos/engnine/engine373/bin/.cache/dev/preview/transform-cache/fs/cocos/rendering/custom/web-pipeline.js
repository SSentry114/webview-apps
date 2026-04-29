System.register("q-bundled:///fs/cocos/rendering/custom/web-pipeline.js", ["pal/system-info", "../../../../virtual/internal%253Aconstants.js", "../../gfx/index.js", "../../core/index.js", "./types.js", "./render-graph.js", "../pipeline-scene-data.js", "../../render-scene/scene/index.js", "../../render-scene/scene/light.js", "./executor.js", "../global-descriptor-set-manager.js", "../define.js", "../../../pal/system-info/enum-type/index.js", "./compiler.js", "../pipeline-ubo.js", "../../asset/asset-manager/index.js", "./builtin-pipelines.js", "./custom-pipeline.js", "../pipeline-funcs.js", "../debug-view.js", "./utils.js", "./define.js", "./layout-graph-utils.js"], function (_export, _context) {
  "use strict";

  var systemInfo, DEBUG, Color, Feature, Format, FormatFeatureBit, ClearFlagBit, deviceManager, API, Type, SamplerInfo, Filter, Address, DescriptorSetInfo, LoadOp, StoreOp, Mat4, toRadian, Vec3, Vec4, assert, macro, cclegacy, AccessType, AttachmentType, ComputeView, LightingMode, QueueHint, RasterView, ResourceDimension, ResourceFlags, ResourceResidency, SceneFlags, UpdateFrequency, Blit, ClearView, Dispatch, ManagedBuffer, ManagedResource, RasterPass, RasterSubpass, RenderData, RenderGraph, RenderGraphComponent, RenderGraphValue, RenderQueue, RenderSwapchain, ResourceDesc, ResourceGraph, ResourceGraphValue, ResourceStates, ResourceTraits, SceneData, Subpass, PipelineSceneData, Camera, ShadowType, CSMLevel, PCFType, LightType, Executor, GlobalDSManager, isEnableEffect, supportsR32FloatTexture, UBOSkinning, OS, Compiler, PipelineUBO, builtinResMgr, DeferredPipelineBuilder, ForwardPipelineBuilder, CustomPipelineBuilder, decideProfilerCamera, DebugViewCompositeType, getUBOTypeCount, initGlobalDescBinding, createGfxDescriptorSetsAndPipelines, _uboVec, _uboVec3, _uboCol, _matView, _mulMatView, uniformOffset, _samplerPointInfo, WebSetter, WebRasterQueueBuilder, WebRasterSubpassBuilder, WebRasterPassBuilder, WebComputeQueueBuilder, WebComputePassBuilder, WebMovePassBuilder, WebCopyPassBuilder, WebPipeline;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function setShadowUBOLightView(setter, camera, light, level, layout) {
    if (layout === void 0) {
      layout = 'default';
    }

    var director = cclegacy.director;
    var pipeline = director.root.pipeline;
    var device = pipeline.device;
    var sceneData = pipeline.pipelineSceneData;
    var shadowInfo = sceneData.shadows;
    var csmLayers = sceneData.csmLayers;
    var packing = supportsR32FloatTexture(device) ? 0.0 : 1.0;
    var cap = pipeline.device.capabilities;
    setter.addConstant('CCCSM', layout); // ShadowMap

    if (!setter.addConstant('CCShadow', layout)) return;

    if (shadowInfo.enabled) {
      if (shadowInfo.type === ShadowType.ShadowMap) {
        // update CSM layers
        if (light && light.node) {
          csmLayers.update(sceneData, camera);
        }
      }
    }

    switch (light.type) {
      case LightType.DIRECTIONAL:
        {
          var mainLight = light;

          if (shadowInfo.enabled && mainLight && mainLight.shadowEnabled) {
            if (shadowInfo.type === ShadowType.ShadowMap) {
              var near = 0.1;
              var far = 0;
              var matShadowView;
              var matShadowProj;
              var matShadowViewProj;
              var levelCount = 0;

              if (mainLight.shadowFixedArea || mainLight.csmLevel === CSMLevel.LEVEL_1) {
                matShadowView = csmLayers.specialLayer.matShadowView;
                matShadowProj = csmLayers.specialLayer.matShadowProj;
                matShadowViewProj = csmLayers.specialLayer.matShadowViewProj;

                if (mainLight.shadowFixedArea) {
                  near = mainLight.shadowNear;
                  far = mainLight.shadowFar;
                  levelCount = 0;
                } else {
                  near = 0.1;
                  far = csmLayers.specialLayer.shadowCameraFar;
                  levelCount = 1;
                }

                uniformOffset = setter.getUniformOffset('cc_shadowLPNNInfo', Type.FLOAT4);

                if (setter.hasUniform(uniformOffset)) {
                  _uboVec.set(0.0, packing, mainLight.shadowNormalBias, 0);

                  setter.offsetVec4(_uboVec, uniformOffset);
                }
              } else {
                var layer = csmLayers.layers[level];
                matShadowView = layer.matShadowView;
                matShadowProj = layer.matShadowProj;
                matShadowViewProj = layer.matShadowViewProj;
                near = layer.splitCameraNear;
                far = layer.splitCameraFar;
                levelCount = mainLight.csmLevel;
              }

              uniformOffset = setter.getUniformOffset('cc_matLightView', Type.MAT4);

              if (setter.hasUniform(uniformOffset)) {
                setter.offsetMat4(matShadowView, uniformOffset);
              }

              uniformOffset = setter.getUniformOffset('cc_shadowProjDepthInfo', Type.FLOAT4);

              if (setter.hasUniform(uniformOffset)) {
                _uboVec.set(matShadowProj.m10, matShadowProj.m14, matShadowProj.m11, matShadowProj.m15);

                setter.offsetVec4(_uboVec, uniformOffset);
              }

              uniformOffset = setter.getUniformOffset('cc_shadowProjInfo', Type.FLOAT4);

              if (setter.hasUniform(uniformOffset)) {
                _uboVec.set(matShadowProj.m00, matShadowProj.m05, 1.0 / matShadowProj.m00, 1.0 / matShadowProj.m05);

                setter.offsetVec4(_uboVec, uniformOffset);
              }

              uniformOffset = setter.getUniformOffset('cc_matLightViewProj', Type.MAT4);

              if (setter.hasUniform(uniformOffset)) {
                setter.offsetMat4(matShadowViewProj, uniformOffset);
              }

              uniformOffset = setter.getUniformOffset('cc_shadowNFLSInfo', Type.FLOAT4);

              if (setter.hasUniform(uniformOffset)) {
                _uboVec.set(near, far, 0, 1.0 - mainLight.shadowSaturation);

                setter.offsetVec4(_uboVec, uniformOffset);
              }

              uniformOffset = setter.getUniformOffset('cc_shadowLPNNInfo', Type.FLOAT4);

              if (setter.hasUniform(uniformOffset)) {
                _uboVec.set(0.0, packing, mainLight.shadowNormalBias, levelCount);

                setter.offsetVec4(_uboVec, uniformOffset);
              }

              uniformOffset = setter.getUniformOffset('cc_shadowWHPBInfo', Type.FLOAT4);

              if (setter.hasUniform(uniformOffset)) {
                _uboVec.set(shadowInfo.size.x, shadowInfo.size.y, mainLight.shadowPcf, mainLight.shadowBias);

                setter.offsetVec4(_uboVec, uniformOffset);
              }
            }
          }

          break;
        }

      case LightType.SPOT:
        {
          var spotLight = light;

          if (shadowInfo.enabled && spotLight && spotLight.shadowEnabled) {
            var matViewOffset = setter.getUniformOffset('cc_matLightView', Type.MAT4);
            var matViewProOffset = setter.getUniformOffset('cc_matLightViewProj', Type.MAT4);

            if (setter.hasUniform(matViewOffset) || setter.hasUniform(matViewProOffset)) {
              Mat4.invert(_matView, light.node.getWorldMatrix());
            }

            if (setter.hasUniform(matViewOffset)) setter.offsetMat4(_matView, matViewOffset);

            if (setter.hasUniform(matViewProOffset)) {
              Mat4.perspective(_mulMatView, light.angle, 1.0, 0.001, light.range, true, cap.clipSpaceMinZ, cap.clipSpaceSignY, 0);
              Mat4.multiply(_matView, _mulMatView, _matView);
              setter.offsetMat4(_matView, matViewProOffset);
            }

            uniformOffset = setter.getUniformOffset('cc_shadowNFLSInfo', Type.FLOAT4);

            if (setter.hasUniform(uniformOffset)) {
              _uboVec.set(0.01, light.range, 0.0, 0.0);

              setter.offsetVec4(_uboVec, uniformOffset);
            }

            uniformOffset = setter.getUniformOffset('cc_shadowWHPBInfo', Type.FLOAT4);

            if (setter.hasUniform(uniformOffset)) {
              _uboVec.set(shadowInfo.size.x, shadowInfo.size.y, spotLight.shadowPcf, spotLight.shadowBias);

              setter.offsetVec4(_uboVec, uniformOffset);
            }

            uniformOffset = setter.getUniformOffset('cc_shadowLPNNInfo', Type.FLOAT4);

            if (setter.hasUniform(uniformOffset)) {
              _uboVec.set(1.0, packing, spotLight.shadowNormalBias, 0.0);

              setter.offsetVec4(_uboVec, uniformOffset);
            }
          }

          break;
        }

      default:
    }

    uniformOffset = setter.getUniformOffset('cc_shadowColor', Type.FLOAT4);

    if (setter.hasUniform(uniformOffset)) {
      _uboCol.copy(shadowInfo.shadowColor);

      setter.offsetColor(_uboCol, uniformOffset);
    }
  }

  function getPCFRadius(shadowInfo, mainLight) {
    var shadowMapSize = shadowInfo.size.x;

    switch (mainLight.shadowPcf) {
      case PCFType.HARD:
        return 0.0;

      case PCFType.SOFT:
        return 1.0 / (shadowMapSize * 0.5);

      case PCFType.SOFT_2X:
        return 2.0 / (shadowMapSize * 0.5);
      // case PCFType.SOFT_4X:
      //     return 3.0  / (shadowMapSize * 0.5);

      default:
    }

    return 0.0;
  }

  function setShadowUBOView(setter, camera, layout) {
    if (layout === void 0) {
      layout = 'default';
    }

    var director = cclegacy.director;
    var pipeline = director.root.pipeline;
    var device = pipeline.device;
    var scene = cclegacy.director.getScene().renderScene;
    var mainLight = camera && camera.scene ? camera.scene.mainLight : scene.mainLight;
    var sceneData = pipeline.pipelineSceneData;
    var shadowInfo = sceneData.shadows;
    var csmLayers = sceneData.csmLayers;
    var csmSupported = sceneData.csmSupported;
    var packing = supportsR32FloatTexture(device) ? 0.0 : 1.0;
    var hasCCShadow = setter.addConstant('CCShadow', layout);
    var hasCCCSM = setter.addConstant('CCCSM', layout);

    if (mainLight && shadowInfo.enabled) {
      if (shadowInfo.type === ShadowType.ShadowMap) {
        if (mainLight.shadowEnabled) {
          if (mainLight.shadowFixedArea || mainLight.csmLevel === CSMLevel.LEVEL_1 || !csmSupported) {
            if (hasCCShadow) {
              setter.setCurrConstant('CCShadow', layout);
              var matShadowView = csmLayers.specialLayer.matShadowView;
              var matShadowProj = csmLayers.specialLayer.matShadowProj;
              var matShadowViewProj = csmLayers.specialLayer.matShadowViewProj;
              var near = mainLight.shadowNear;
              var far = mainLight.shadowFar;
              uniformOffset = setter.getUniformOffset('cc_matLightView', Type.MAT4);

              if (setter.hasUniform(uniformOffset)) {
                setter.offsetMat4(matShadowView, uniformOffset);
              }

              uniformOffset = setter.getUniformOffset('cc_shadowProjDepthInfo', Type.FLOAT4);

              if (setter.hasUniform(uniformOffset)) {
                _uboVec.set(matShadowProj.m10, matShadowProj.m14, matShadowProj.m11, matShadowProj.m15);

                setter.offsetVec4(_uboVec, uniformOffset);
              }

              uniformOffset = setter.getUniformOffset('cc_shadowProjInfo', Type.FLOAT4);

              if (setter.hasUniform(uniformOffset)) {
                _uboVec.set(matShadowProj.m00, matShadowProj.m05, 1.0 / matShadowProj.m00, 1.0 / matShadowProj.m05);

                setter.offsetVec4(_uboVec, uniformOffset);
              }

              uniformOffset = setter.getUniformOffset('cc_matLightViewProj', Type.MAT4);

              if (setter.hasUniform(uniformOffset)) {
                setter.offsetMat4(matShadowViewProj, uniformOffset);
              }

              uniformOffset = setter.getUniformOffset('cc_shadowNFLSInfo', Type.FLOAT4);

              if (setter.hasUniform(uniformOffset)) {
                _uboVec.set(near, far, 0, 1.0 - mainLight.shadowSaturation);

                setter.offsetVec4(_uboVec, uniformOffset);
              }

              uniformOffset = setter.getUniformOffset('cc_shadowLPNNInfo', Type.FLOAT4);

              if (setter.hasUniform(uniformOffset)) {
                _uboVec.set(0.0, packing, mainLight.shadowNormalBias, 0);

                setter.offsetVec4(_uboVec, uniformOffset);
              }
            }
          } else {
            if (hasCCCSM) {
              var layerThreshold = getPCFRadius(shadowInfo, mainLight);
              setter.setCurrConstant('CCCSM', layout);

              for (var i = 0; i < mainLight.csmLevel; i++) {
                var _matShadowView = csmLayers.layers[i].matShadowView;
                uniformOffset = setter.getUniformOffset('cc_csmViewDir0', Type.FLOAT4, i);

                if (setter.hasUniform(uniformOffset)) {
                  _uboVec.set(_matShadowView.m00, _matShadowView.m04, _matShadowView.m08, layerThreshold);

                  setter.offsetVec4(_uboVec, uniformOffset);
                }

                uniformOffset = setter.getUniformOffset('cc_csmViewDir1', Type.FLOAT4, i);

                if (setter.hasUniform(uniformOffset)) {
                  _uboVec.set(_matShadowView.m01, _matShadowView.m05, _matShadowView.m09, 0.0);

                  setter.offsetVec4(_uboVec, uniformOffset);
                }

                uniformOffset = setter.getUniformOffset('cc_csmViewDir2', Type.FLOAT4, i);

                if (setter.hasUniform(uniformOffset)) {
                  _uboVec.set(_matShadowView.m02, _matShadowView.m06, _matShadowView.m10, 0.0);

                  setter.offsetVec4(_uboVec, uniformOffset);
                }

                uniformOffset = setter.getUniformOffset('cc_csmAtlas', Type.FLOAT4, i);

                if (setter.hasUniform(uniformOffset)) {
                  var csmAtlas = csmLayers.layers[i].csmAtlas;
                  setter.offsetVec4(csmAtlas, uniformOffset);
                }

                uniformOffset = setter.getUniformOffset('cc_csmSplitsInfo', Type.FLOAT, i);

                if (setter.hasUniform(uniformOffset)) {
                  setter.offsetFloat(csmLayers.layers[i].splitCameraFar / mainLight.shadowDistance, uniformOffset);
                }

                uniformOffset = setter.getUniformOffset('cc_matCSMViewProj', Type.MAT4, i);

                if (setter.hasUniform(uniformOffset)) {
                  var _matShadowViewProj = csmLayers.layers[i].matShadowViewProj;
                  setter.offsetMat4(_matShadowViewProj, uniformOffset);
                }

                var _matShadowProj = csmLayers.layers[i].matShadowProj;
                uniformOffset = setter.getUniformOffset('cc_csmProjDepthInfo', Type.FLOAT4, i);

                if (setter.hasUniform(uniformOffset)) {
                  _uboVec.set(_matShadowProj.m10, _matShadowProj.m14, _matShadowProj.m11, _matShadowProj.m15);

                  setter.offsetVec4(_uboVec, uniformOffset);
                }

                uniformOffset = setter.getUniformOffset('cc_csmProjInfo', Type.FLOAT4, i);

                if (setter.hasUniform(uniformOffset)) {
                  _uboVec.set(_matShadowProj.m00, _matShadowProj.m05, 1.0 / _matShadowProj.m00, 1.0 / _matShadowProj.m05);

                  setter.offsetVec4(_uboVec, uniformOffset);
                }
              }
            }

            if (hasCCShadow) {
              setter.setCurrConstant('CCShadow', layout);
              uniformOffset = setter.getUniformOffset('cc_shadowNFLSInfo', Type.FLOAT4);

              if (setter.hasUniform(uniformOffset)) {
                _uboVec.set(0, 0, 0, 1.0 - mainLight.shadowSaturation);

                setter.offsetVec4(_uboVec, uniformOffset);
              }

              uniformOffset = setter.getUniformOffset('cc_shadowLPNNInfo', Type.FLOAT4);

              if (setter.hasUniform(uniformOffset)) {
                _uboVec.set(0.0, packing, mainLight.shadowNormalBias, mainLight.csmLevel);

                setter.offsetVec4(_uboVec, uniformOffset);
              }
            }
          }

          if (hasCCShadow) {
            setter.setCurrConstant('CCShadow', layout);
            uniformOffset = setter.getUniformOffset('cc_shadowWHPBInfo', Type.FLOAT4);

            if (setter.hasUniform(uniformOffset)) {
              _uboVec.set(shadowInfo.size.x, shadowInfo.size.y, mainLight.shadowPcf, mainLight.shadowBias);

              setter.offsetVec4(_uboVec, uniformOffset);
            }
          }
        }
      } else if (hasCCShadow) {
        setter.setCurrConstant('CCShadow', layout);
        uniformOffset = setter.getUniformOffset('cc_planarNDInfo', Type.FLOAT4);

        if (setter.hasUniform(uniformOffset)) {
          Vec3.normalize(_uboVec3, shadowInfo.normal);

          _uboVec.set(_uboVec3.x, _uboVec3.y, _uboVec3.z, -shadowInfo.distance);

          setter.offsetVec4(_uboVec, uniformOffset);
        }
      }

      if (hasCCShadow) {
        setter.setCurrConstant('CCShadow', layout);
        uniformOffset = setter.getUniformOffset('cc_shadowColor', Type.FLOAT4);

        if (setter.hasUniform(uniformOffset)) {
          setter.offsetColor(shadowInfo.shadowColor, uniformOffset);
        }
      }
    }
  }

  function setCameraUBOValues(setter, camera, cfg, scene, layoutName) {
    if (layoutName === void 0) {
      layoutName = 'default';
    }

    var director = cclegacy.director;
    var root = director.root;
    var pipeline = root.pipeline;
    var shadowInfo = cfg.shadows;
    var skybox = cfg.skybox;
    var shadingScale = cfg.shadingScale; // Camera

    if (!setter.addConstant('CCCamera', layoutName)) return;

    if (camera) {
      uniformOffset = setter.getUniformOffset('cc_matView', Type.MAT4);

      if (setter.hasUniform(uniformOffset)) {
        setter.offsetMat4(camera.matView, uniformOffset);
      }

      uniformOffset = setter.getUniformOffset('cc_matViewInv', Type.MAT4);

      if (setter.hasUniform(uniformOffset)) {
        setter.offsetMat4(camera.node.worldMatrix, uniformOffset);
      }

      uniformOffset = setter.getUniformOffset('cc_matProj', Type.MAT4);

      if (setter.hasUniform(uniformOffset)) {
        setter.offsetMat4(camera.matProj, uniformOffset);
      }

      uniformOffset = setter.getUniformOffset('cc_matProjInv', Type.MAT4);

      if (setter.hasUniform(uniformOffset)) {
        setter.offsetMat4(camera.matProjInv, uniformOffset);
      }

      uniformOffset = setter.getUniformOffset('cc_matViewProj', Type.MAT4);

      if (setter.hasUniform(uniformOffset)) {
        setter.offsetMat4(camera.matViewProj, uniformOffset);
      }

      uniformOffset = setter.getUniformOffset('cc_matViewProjInv', Type.MAT4);

      if (setter.hasUniform(uniformOffset)) {
        setter.offsetMat4(camera.matViewProjInv, uniformOffset);
      }

      uniformOffset = setter.getUniformOffset('cc_surfaceTransform', Type.FLOAT4);

      if (setter.hasUniform(uniformOffset)) {
        _uboVec.set(camera.surfaceTransform, 0.0, Math.cos(toRadian(skybox.getRotationAngle())), Math.sin(toRadian(skybox.getRotationAngle())));

        setter.offsetVec4(_uboVec, uniformOffset);
      }

      uniformOffset = setter.getUniformOffset('cc_exposure', Type.FLOAT4);

      if (setter.hasUniform(uniformOffset)) {
        _uboVec.set(camera.exposure, 1.0 / camera.exposure, cfg.isHDR ? 1.0 : 0.0, 1.0 / Camera.standardExposureValue);

        setter.offsetVec4(_uboVec, uniformOffset);
      }
    }

    uniformOffset = setter.getUniformOffset('cc_cameraPos', Type.FLOAT4);

    if (setter.hasUniform(uniformOffset)) {
      if (camera) {
        _uboVec.set(camera.position.x, camera.position.y, camera.position.z, pipeline.getCombineSignY());
      } else {
        _uboVec.set(0, 0, 0, pipeline.getCombineSignY());
      }

      setter.offsetVec4(_uboVec, uniformOffset);
    }

    uniformOffset = setter.getUniformOffset('cc_screenScale', Type.FLOAT4);

    if (setter.hasUniform(uniformOffset)) {
      _uboVec.set(cfg.shadingScale, cfg.shadingScale, 1.0 / cfg.shadingScale, 1.0 / cfg.shadingScale);

      setter.offsetVec4(_uboVec, uniformOffset);
    }

    var mainLight = scene.mainLight;

    if (mainLight) {
      uniformOffset = setter.getUniformOffset('cc_mainLitDir', Type.FLOAT4);

      if (setter.hasUniform(uniformOffset)) {
        var shadowEnable = mainLight.shadowEnabled && shadowInfo.type === ShadowType.ShadowMap ? 1.0 : 0.0;

        _uboVec.set(mainLight.direction.x, mainLight.direction.y, mainLight.direction.z, shadowEnable);

        setter.offsetVec4(_uboVec, uniformOffset);
      }

      uniformOffset = setter.getUniformOffset('cc_mainLitColor', Type.FLOAT4);

      if (setter.hasUniform(uniformOffset)) {
        var r = mainLight.color.x;
        var g = mainLight.color.y;
        var b = mainLight.color.z;

        if (mainLight.useColorTemperature) {
          r *= mainLight.colorTemperatureRGB.x;
          g *= mainLight.colorTemperatureRGB.y;
          b *= mainLight.colorTemperatureRGB.z;
        }

        var w = mainLight.illuminance;

        if (cfg.isHDR && camera) {
          w *= camera.exposure;
        }

        _uboVec.set(r, g, b, w);

        setter.offsetVec4(_uboVec, uniformOffset);
      }
    } else {
      uniformOffset = setter.getUniformOffset('cc_mainLitDir', Type.FLOAT4);

      if (setter.hasUniform(uniformOffset)) {
        _uboVec.set(0, 0, 1, 0);

        setter.offsetVec4(_uboVec, uniformOffset);
      }

      uniformOffset = setter.getUniformOffset('cc_mainLitColor', Type.FLOAT4);

      if (setter.hasUniform(uniformOffset)) {
        _uboVec.set(0, 0, 0, 0);

        setter.offsetVec4(_uboVec, uniformOffset);
      }
    }

    var ambient = cfg.ambient;
    uniformOffset = setter.getUniformOffset('cc_ambientSky', Type.FLOAT4);

    if (setter.hasUniform(uniformOffset)) {
      var skyColor = ambient.skyColor;

      if (cfg.isHDR) {
        skyColor.w = ambient.skyIllum * (camera ? camera.exposure : 1);
      } else {
        skyColor.w = ambient.skyIllum;
      }

      _uboVec.set(skyColor.x, skyColor.y, skyColor.z, skyColor.w);

      setter.offsetVec4(_uboVec, uniformOffset);
    }

    uniformOffset = setter.getUniformOffset('cc_ambientGround', Type.FLOAT4);

    if (setter.hasUniform(uniformOffset)) {
      var _skybox$envmap;

      _uboVec.set(ambient.groundAlbedo.x, ambient.groundAlbedo.y, ambient.groundAlbedo.z, skybox.envmap ? (_skybox$envmap = skybox.envmap) === null || _skybox$envmap === void 0 ? void 0 : _skybox$envmap.mipmapLevel : 1.0);

      setter.offsetVec4(_uboVec, uniformOffset);
    }

    var fog = cfg.fog;
    uniformOffset = setter.getUniformOffset('cc_fogColor', Type.FLOAT4);

    if (setter.hasUniform(uniformOffset)) {
      var colorTempRGB = fog.colorArray;

      _uboVec.set(colorTempRGB.x, colorTempRGB.y, colorTempRGB.z, colorTempRGB.z);

      setter.offsetVec4(_uboVec, uniformOffset);
    }

    uniformOffset = setter.getUniformOffset('cc_fogBase', Type.FLOAT4);

    if (setter.hasUniform(uniformOffset)) {
      _uboVec.set(fog.fogStart, fog.fogEnd, fog.fogDensity, 0.0);

      setter.offsetVec4(_uboVec, uniformOffset);
    }

    uniformOffset = setter.getUniformOffset('cc_fogAdd', Type.FLOAT4);

    if (setter.hasUniform(uniformOffset)) {
      _uboVec.set(fog.fogTop, fog.fogRange, fog.fogAtten, 0.0);

      setter.offsetVec4(_uboVec, uniformOffset);
    }

    if (camera) {
      uniformOffset = setter.getUniformOffset('cc_nearFar', Type.FLOAT4);

      if (setter.hasUniform(uniformOffset)) {
        _uboVec.set(camera.nearClip, camera.farClip, 0.0, 0.0);

        setter.offsetVec4(_uboVec, uniformOffset);
      }

      uniformOffset = setter.getUniformOffset('cc_viewPort', Type.FLOAT4);

      if (setter.hasUniform(uniformOffset)) {
        _uboVec.set(camera.viewport.x, camera.viewport.y, shadingScale * camera.window.width * camera.viewport.z, shadingScale * camera.window.height * camera.viewport.w);

        setter.offsetVec4(_uboVec, uniformOffset);
      }
    }
  }

  function setTextureUBOView(setter, camera, cfg, layout) {
    if (layout === void 0) {
      layout = 'default';
    }

    var skybox = cfg.skybox;
    var director = cclegacy.director;
    var root = director.root;

    if (skybox.reflectionMap) {
      var texture = skybox.reflectionMap.getGFXTexture();
      var sampler = root.device.getSampler(skybox.reflectionMap.getSamplerInfo());
      setter.setTexture('cc_environment', texture);
      setter.setSampler('cc_environment', sampler);
    } else {
      var envmap = skybox.envmap ? skybox.envmap : builtinResMgr.get('default-cube-texture');

      if (envmap) {
        var _texture = envmap.getGFXTexture();

        var _sampler = root.device.getSampler(envmap.getSamplerInfo());

        setter.setTexture('cc_environment', _texture);
        setter.setSampler('cc_environment', _sampler);
      }
    }

    var diffuseMap = skybox.diffuseMap ? skybox.diffuseMap : builtinResMgr.get('default-cube-texture');

    if (diffuseMap) {
      var _texture2 = diffuseMap.getGFXTexture();

      var _sampler2 = root.device.getSampler(diffuseMap.getSamplerInfo());

      setter.setTexture('cc_diffuseMap', _texture2);
      setter.setSampler('cc_diffuseMap', _sampler2);
    }

    var pointSampler = root.device.getSampler(_samplerPointInfo);

    if (!setter.hasSampler('cc_shadowMap')) {
      setter.setSampler('cc_shadowMap', pointSampler);
    }

    if (!setter.hasTexture('cc_shadowMap')) {
      setter.setTexture('cc_shadowMap', builtinResMgr.get('default-texture').getGFXTexture());
    }

    if (!setter.hasSampler('cc_spotShadowMap')) {
      setter.setSampler('cc_spotShadowMap', pointSampler);
    }

    if (!setter.hasTexture('cc_spotShadowMap')) {
      setter.setTexture('cc_spotShadowMap', builtinResMgr.get('default-texture').getGFXTexture());
    }
  }

  function getFirstChildLayoutName(lg, parentID) {
    if (lg.numVertices() && parentID !== 0xFFFFFFFF && lg.numChildren(parentID)) {
      var childNodes = lg.children(parentID);

      if (childNodes.next().value && childNodes.next().value.target !== lg.nullVertex()) {
        var ququeLayoutID = childNodes.next().value.target;
        return lg.getName(ququeLayoutID);
      }
    }

    return '';
  }

  function isManaged(residency) {
    return residency === ResourceResidency.MANAGED || residency === ResourceResidency.MEMORYLESS;
  }

  return {
    setters: [function (_palSystemInfo) {
      systemInfo = _palSystemInfo.systemInfo;
    }, function (_virtualInternal253AconstantsJs) {
      DEBUG = _virtualInternal253AconstantsJs.DEBUG;
    }, function (_gfxIndexJs) {
      Color = _gfxIndexJs.Color;
      Feature = _gfxIndexJs.Feature;
      Format = _gfxIndexJs.Format;
      FormatFeatureBit = _gfxIndexJs.FormatFeatureBit;
      ClearFlagBit = _gfxIndexJs.ClearFlagBit;
      deviceManager = _gfxIndexJs.deviceManager;
      API = _gfxIndexJs.API;
      Type = _gfxIndexJs.Type;
      SamplerInfo = _gfxIndexJs.SamplerInfo;
      Filter = _gfxIndexJs.Filter;
      Address = _gfxIndexJs.Address;
      DescriptorSetInfo = _gfxIndexJs.DescriptorSetInfo;
      LoadOp = _gfxIndexJs.LoadOp;
      StoreOp = _gfxIndexJs.StoreOp;
    }, function (_coreIndexJs) {
      Mat4 = _coreIndexJs.Mat4;
      toRadian = _coreIndexJs.toRadian;
      Vec3 = _coreIndexJs.Vec3;
      Vec4 = _coreIndexJs.Vec4;
      assert = _coreIndexJs.assert;
      macro = _coreIndexJs.macro;
      cclegacy = _coreIndexJs.cclegacy;
    }, function (_typesJs) {
      AccessType = _typesJs.AccessType;
      AttachmentType = _typesJs.AttachmentType;
      ComputeView = _typesJs.ComputeView;
      LightingMode = _typesJs.LightingMode;
      QueueHint = _typesJs.QueueHint;
      RasterView = _typesJs.RasterView;
      ResourceDimension = _typesJs.ResourceDimension;
      ResourceFlags = _typesJs.ResourceFlags;
      ResourceResidency = _typesJs.ResourceResidency;
      SceneFlags = _typesJs.SceneFlags;
      UpdateFrequency = _typesJs.UpdateFrequency;
    }, function (_renderGraphJs) {
      Blit = _renderGraphJs.Blit;
      ClearView = _renderGraphJs.ClearView;
      Dispatch = _renderGraphJs.Dispatch;
      ManagedBuffer = _renderGraphJs.ManagedBuffer;
      ManagedResource = _renderGraphJs.ManagedResource;
      RasterPass = _renderGraphJs.RasterPass;
      RasterSubpass = _renderGraphJs.RasterSubpass;
      RenderData = _renderGraphJs.RenderData;
      RenderGraph = _renderGraphJs.RenderGraph;
      RenderGraphComponent = _renderGraphJs.RenderGraphComponent;
      RenderGraphValue = _renderGraphJs.RenderGraphValue;
      RenderQueue = _renderGraphJs.RenderQueue;
      RenderSwapchain = _renderGraphJs.RenderSwapchain;
      ResourceDesc = _renderGraphJs.ResourceDesc;
      ResourceGraph = _renderGraphJs.ResourceGraph;
      ResourceGraphValue = _renderGraphJs.ResourceGraphValue;
      ResourceStates = _renderGraphJs.ResourceStates;
      ResourceTraits = _renderGraphJs.ResourceTraits;
      SceneData = _renderGraphJs.SceneData;
      Subpass = _renderGraphJs.Subpass;
    }, function (_pipelineSceneDataJs) {
      PipelineSceneData = _pipelineSceneDataJs.PipelineSceneData;
    }, function (_renderSceneSceneIndexJs) {
      Camera = _renderSceneSceneIndexJs.Camera;
      ShadowType = _renderSceneSceneIndexJs.ShadowType;
      CSMLevel = _renderSceneSceneIndexJs.CSMLevel;
      PCFType = _renderSceneSceneIndexJs.PCFType;
    }, function (_renderSceneSceneLightJs) {
      LightType = _renderSceneSceneLightJs.LightType;
    }, function (_executorJs) {
      Executor = _executorJs.Executor;
    }, function (_globalDescriptorSetManagerJs) {
      GlobalDSManager = _globalDescriptorSetManagerJs.GlobalDSManager;
    }, function (_defineJs) {
      isEnableEffect = _defineJs.isEnableEffect;
      supportsR32FloatTexture = _defineJs.supportsR32FloatTexture;
      UBOSkinning = _defineJs.UBOSkinning;
    }, function (_palSystemInfoEnumTypeIndexJs) {
      OS = _palSystemInfoEnumTypeIndexJs.OS;
    }, function (_compilerJs) {
      Compiler = _compilerJs.Compiler;
    }, function (_pipelineUboJs) {
      PipelineUBO = _pipelineUboJs.PipelineUBO;
    }, function (_assetAssetManagerIndexJs) {
      builtinResMgr = _assetAssetManagerIndexJs.builtinResMgr;
    }, function (_builtinPipelinesJs) {
      DeferredPipelineBuilder = _builtinPipelinesJs.DeferredPipelineBuilder;
      ForwardPipelineBuilder = _builtinPipelinesJs.ForwardPipelineBuilder;
    }, function (_customPipelineJs) {
      CustomPipelineBuilder = _customPipelineJs.CustomPipelineBuilder;
    }, function (_pipelineFuncsJs) {
      decideProfilerCamera = _pipelineFuncsJs.decideProfilerCamera;
    }, function (_debugViewJs) {
      DebugViewCompositeType = _debugViewJs.DebugViewCompositeType;
    }, function (_utilsJs) {
      getUBOTypeCount = _utilsJs.getUBOTypeCount;
    }, function (_defineJs2) {
      initGlobalDescBinding = _defineJs2.initGlobalDescBinding;
    }, function (_layoutGraphUtilsJs) {
      createGfxDescriptorSetsAndPipelines = _layoutGraphUtilsJs.createGfxDescriptorSetsAndPipelines;
    }],
    execute: function () {
      _uboVec = new Vec4();
      _uboVec3 = new Vec3();
      _uboCol = new Color();
      _matView = new Mat4();
      _mulMatView = new Mat4();
      uniformOffset = -1;
      _samplerPointInfo = new SamplerInfo(Filter.POINT, Filter.POINT, Filter.NONE, Address.CLAMP, Address.CLAMP, Address.CLAMP);

      _export("WebSetter", WebSetter = /*#__PURE__*/function () {
        function WebSetter(data, lg) {
          this._data = void 0;
          this._lg = void 0;
          this._currBlock = void 0;
          this._currStage = void 0;
          this._currCount = void 0;
          this._currConstant = [];
          this._data = data;
          this._lg = lg;
        }

        var _proto = WebSetter.prototype;

        _proto._copyToBuffer = function _copyToBuffer(target, offset, type) {
          assert(offset !== -1);
          var arr = this.getCurrConstant();

          switch (type) {
            case Type.FLOAT4:
              Vec4.toArray(arr, target, offset);
              break;

            case Type.MAT4:
              Mat4.toArray(arr, target, offset);
              break;

            case Type.FLOAT:
              arr[offset] = target;
              break;

            case Type.SAMPLER2D:
              break;

            case Type.TEXTURE2D:
              break;

            case Type.FLOAT2:
              arr[offset + 0] = target.x;
              arr[offset + 1] = target.y;
              break;

            default:
          }
        };

        _proto._applyCurrConstantBuffer = function _applyCurrConstantBuffer(name, target, type, idx) {
          if (idx === void 0) {
            idx = 0;
          }

          var offset = this.getUniformOffset(name, type, idx);

          this._copyToBuffer(target, offset, type);
        };

        _proto.hasUniform = function hasUniform(offset) {
          return offset !== -1;
        };

        _proto.getUniformOffset = function getUniformOffset(name, type, idx) {
          if (idx === void 0) {
            idx = 0;
          }

          var currBlock = this._getCurrUniformBlock();

          if (!currBlock) return -1;
          var offset = 0;
          var typeCount = getUBOTypeCount(type);

          for (var _iterator = _createForOfIteratorHelperLoose(currBlock.members), _step; !(_step = _iterator()).done;) {
            var uniform = _step.value;
            var currCount = getUBOTypeCount(uniform.type);

            if (uniform.name === name) {
              if (typeCount === currCount) {
                return offset + idx * currCount;
              } else if (typeCount === currCount * uniform.count) {
                return offset;
              } else if (typeCount < currCount * uniform.count) {
                return offset + idx;
              }

              if (DEBUG) assert(false);
            }

            offset += currCount * uniform.count;
          }

          return -1;
        };

        _proto._getCurrUniformBlock = function _getCurrUniformBlock() {
          var block = this._currBlock;

          var nodeId = this._lg.locateChild(0xFFFFFFFF, this._currStage);

          var ppl = this._lg.getLayout(nodeId);

          var layout = ppl.descriptorSets.get(UpdateFrequency.PER_PASS).descriptorSetLayoutData;

          var nameID = this._lg.attributeIndex.get(block);

          return layout.uniformBlocks.get(nameID);
        };

        _proto._getCurrDescriptorBlock = function _getCurrDescriptorBlock(block) {
          var nodeId = this._lg.locateChild(0xFFFFFFFF, this._currStage);

          var ppl = this._lg.getLayout(nodeId);

          var layout = ppl.descriptorSets.get(UpdateFrequency.PER_PASS).descriptorSetLayoutData;

          var nameID = this._lg.attributeIndex.get(block);

          for (var _iterator2 = _createForOfIteratorHelperLoose(layout.descriptorBlocks), _step2; !(_step2 = _iterator2()).done;) {
            var _block = _step2.value;

            for (var i = 0; i !== _block.descriptors.length; ++i) {
              if (nameID === _block.descriptors[i].descriptorID) {
                return _block.offset + i;
              }
            }
          }

          return -1;
        };

        _proto.setCurrConstant = function setCurrConstant(block, stage) {
          if (stage === void 0) {
            stage = 'default';
          }

          this._currBlock = block;
          this._currStage = stage;

          var nameID = this._lg.attributeIndex.get(block);

          this._currCount = 0;

          var currBlock = this._getCurrUniformBlock();

          if (!currBlock) return false;

          for (var _iterator3 = _createForOfIteratorHelperLoose(currBlock.members), _step3; !(_step3 = _iterator3()).done;) {
            var uniform = _step3.value;
            this._currCount += getUBOTypeCount(uniform.type) * uniform.count;
          }

          this._currConstant = this._data.constants.get(nameID);
          return true;
        };

        _proto.getCurrConstant = function getCurrConstant() {
          return this._currConstant;
        };

        _proto.addConstant = function addConstant(block, stage) {
          if (stage === void 0) {
            stage = 'default';
          }

          this._currBlock = block;
          this._currStage = stage;

          var num = this._lg.attributeIndex.get(block);

          this._currCount = 0;

          var currBlock = this._getCurrUniformBlock();

          if (!currBlock) return false;

          for (var _iterator4 = _createForOfIteratorHelperLoose(currBlock.members), _step4; !(_step4 = _iterator4()).done;) {
            var uniform = _step4.value;
            this._currCount += getUBOTypeCount(uniform.type) * uniform.count;
          }

          if (!this._data.constants.get(num)) {
            var value = new Array(this._currCount);
            value.fill(0);

            this._data.constants.set(num, value);
          }

          this.setCurrConstant(block);
          return true;
        };

        _proto.setMat4 = function setMat4(name, mat, idx) {
          if (idx === void 0) {
            idx = 0;
          }

          this._applyCurrConstantBuffer(name, mat, Type.MAT4, idx);
        };

        _proto.offsetMat4 = function offsetMat4(mat, offset) {
          this._copyToBuffer(mat, offset, Type.MAT4);
        };

        _proto.setQuaternion = function setQuaternion(name, quat, idx) {
          if (idx === void 0) {
            idx = 0;
          }

          this._applyCurrConstantBuffer(name, quat, Type.FLOAT4, idx);
        };

        _proto.offsetQuaternion = function offsetQuaternion(quat, offset) {
          this._copyToBuffer(quat, offset, Type.FLOAT4);
        };

        _proto.setColor = function setColor(name, color, idx) {
          if (idx === void 0) {
            idx = 0;
          }

          this._applyCurrConstantBuffer(name, color, Type.FLOAT4, idx);
        };

        _proto.offsetColor = function offsetColor(color, offset) {
          this._copyToBuffer(color, offset, Type.FLOAT4);
        };

        _proto.setVec4 = function setVec4(name, vec, idx) {
          if (idx === void 0) {
            idx = 0;
          }

          this._applyCurrConstantBuffer(name, vec, Type.FLOAT4, idx);
        };

        _proto.offsetVec4 = function offsetVec4(vec, offset) {
          this._copyToBuffer(vec, offset, Type.FLOAT4);
        };

        _proto.setVec2 = function setVec2(name, vec, idx) {
          if (idx === void 0) {
            idx = 0;
          }

          this._applyCurrConstantBuffer(name, vec, Type.FLOAT2, idx);
        };

        _proto.offsetVec2 = function offsetVec2(vec, offset) {
          this._copyToBuffer(vec, offset, Type.FLOAT2);
        };

        _proto.setFloat = function setFloat(name, v, idx) {
          if (idx === void 0) {
            idx = 0;
          }

          this._applyCurrConstantBuffer(name, v, Type.FLOAT, idx);
        };

        _proto.offsetFloat = function offsetFloat(v, offset) {
          this._copyToBuffer(v, offset, Type.FLOAT);
        };

        _proto.setBuffer = function setBuffer(name, buffer) {};

        _proto.setTexture = function setTexture(name, texture) {
          if (this._getCurrDescriptorBlock(name) === -1) {
            return;
          }

          var num = this._lg.attributeIndex.get(name);

          this._data.textures.set(num, texture);
        };

        _proto.setReadWriteBuffer = function setReadWriteBuffer(name, buffer) {};

        _proto.setReadWriteTexture = function setReadWriteTexture(name, texture) {};

        _proto.setSampler = function setSampler(name, sampler) {
          if (this._getCurrDescriptorBlock(name) === -1) {
            return;
          }

          var num = this._lg.attributeIndex.get(name);

          this._data.samplers.set(num, sampler);
        };

        _proto.hasSampler = function hasSampler(name) {
          var id = this._lg.attributeIndex.get(name);

          if (id === undefined) {
            return false;
          }

          return this._data.samplers.has(id);
        };

        _proto.hasTexture = function hasTexture(name) {
          var id = this._lg.attributeIndex.get(name);

          if (id === undefined) {
            return false;
          }

          return this._data.textures.has(id);
        };

        _proto.setCustomBehavior = function setCustomBehavior(name) {
          throw new Error('Method not implemented.');
        } // protected
        ;

        return WebSetter;
      }());

      _export("WebRasterQueueBuilder", WebRasterQueueBuilder = /*#__PURE__*/function (_WebSetter) {
        _inheritsLoose(WebRasterQueueBuilder, _WebSetter);

        function WebRasterQueueBuilder(data, renderGraph, layoutGraph, vertID, queue, pipeline) {
          var _this;

          _this = _WebSetter.call(this, data, layoutGraph) || this;
          _this._renderGraph = void 0;
          _this._vertID = void 0;
          _this._queue = void 0;
          _this._pipeline = void 0;
          _this._renderGraph = renderGraph;
          _this._vertID = vertID;
          _this._queue = queue;
          _this._pipeline = pipeline;
          return _this;
        }

        var _proto2 = WebRasterQueueBuilder.prototype;

        _proto2.setArrayBuffer = function setArrayBuffer(name, arrayBuffer) {
          throw new Error('Method not implemented.');
        };

        _proto2.getLayoutName = function getLayoutName() {
          var parId = this._renderGraph.getParent(this._vertID);

          var layoutName = isEnableEffect() ? this._renderGraph.getLayout(parId) : 'default';
          return layoutName;
        };

        _proto2.addSceneOfCamera = function addSceneOfCamera(camera, light, sceneFlags, name) {
          if (sceneFlags === void 0) {
            sceneFlags = SceneFlags.NONE;
          }

          if (name === void 0) {
            name = 'Camera';
          }

          var sceneData = new SceneData(name, sceneFlags, light);
          sceneData.camera = camera;

          this._renderGraph.addVertex(RenderGraphValue.Scene, sceneData, name, '', new RenderData(), false, this._vertID);

          var layoutName = this.getLayoutName();
          setCameraUBOValues(this, camera, this._pipeline, camera.scene ? camera.scene : cclegacy.director.getScene().renderScene, layoutName);

          if (sceneFlags & SceneFlags.SHADOW_CASTER) {
            setShadowUBOLightView(this, camera, light.light, light.level, layoutName);
          } else {
            setShadowUBOView(this, camera, layoutName);
          }

          setTextureUBOView(this, camera, this._pipeline);
          initGlobalDescBinding(this._data, layoutName);
        };

        _proto2.addScene = function addScene(sceneName, sceneFlags) {
          if (sceneFlags === void 0) {
            sceneFlags = SceneFlags.NONE;
          }

          var sceneData = new SceneData(sceneName, sceneFlags);

          this._renderGraph.addVertex(RenderGraphValue.Scene, sceneData, sceneName, '', new RenderData(), false, this._vertID);
        };

        _proto2.addFullscreenQuad = function addFullscreenQuad(material, passID, sceneFlags, name) {
          if (sceneFlags === void 0) {
            sceneFlags = SceneFlags.NONE;
          }

          if (name === void 0) {
            name = 'Quad';
          }

          this._renderGraph.addVertex(RenderGraphValue.Blit, new Blit(material, passID, sceneFlags, null), name, '', new RenderData(), false, this._vertID);

          var layoutName = this.getLayoutName();
          setCameraUBOValues(this, null, this._pipeline, cclegacy.director.getScene().renderScene, layoutName);

          if (sceneFlags & SceneFlags.SHADOW_CASTER) {// setShadowUBOLightView(this, light.light!, light.level);
          } else {
            setShadowUBOView(this, null, layoutName);
          }

          setTextureUBOView(this, null, this._pipeline);
          initGlobalDescBinding(this._data, layoutName);
        };

        _proto2.addCameraQuad = function addCameraQuad(camera, material, passID, sceneFlags) {
          if (sceneFlags === void 0) {
            sceneFlags = SceneFlags.NONE;
          }

          this._renderGraph.addVertex(RenderGraphValue.Blit, new Blit(material, passID, sceneFlags, camera), 'CameraQuad', '', new RenderData(), false, this._vertID);

          var layoutName = this.getLayoutName();
          setCameraUBOValues(this, camera, this._pipeline, camera.scene ? camera.scene : cclegacy.director.getScene().renderScene, layoutName);

          if (sceneFlags & SceneFlags.SHADOW_CASTER) {// setShadowUBOLightView(this, light.light!, light.level);
          } else {
            setShadowUBOView(this, camera, layoutName);
          }

          setTextureUBOView(this, camera, this._pipeline);
          initGlobalDescBinding(this._data, layoutName);
        };

        _proto2.clearRenderTarget = function clearRenderTarget(name, color) {
          if (color === void 0) {
            color = new Color();
          }

          this._renderGraph.addVertex(RenderGraphValue.Clear, [new ClearView(name, ClearFlagBit.COLOR, color)], 'ClearRenderTarget', '', new RenderData(), false, this._vertID);
        };

        _proto2.setViewport = function setViewport(viewport) {
          this._renderGraph.addVertex(RenderGraphValue.Viewport, viewport, 'Viewport', '', new RenderData(), false, this._vertID);
        };

        _proto2.addCustomCommand = function addCustomCommand(customBehavior) {
          throw new Error('Method not implemented.');
        };

        _createClass(WebRasterQueueBuilder, [{
          key: "name",
          get: function get() {
            return this._renderGraph.getName(this._vertID);
          },
          set: function set(name) {
            this._renderGraph.setName(this._vertID, name);
          }
        }]);

        return WebRasterQueueBuilder;
      }(WebSetter));

      _export("WebRasterSubpassBuilder", WebRasterSubpassBuilder = /*#__PURE__*/function (_WebSetter2) {
        _inheritsLoose(WebRasterSubpassBuilder, _WebSetter2);

        function WebRasterSubpassBuilder(data, renderGraph, layoutGraph, vertID, subpass, pipeline) {
          var _this2;

          _this2 = _WebSetter2.call(this, data, layoutGraph) || this;
          _this2._renderGraph = void 0;
          _this2._vertID = void 0;
          _this2._layoutID = void 0;
          _this2._subpass = void 0;
          _this2._pipeline = void 0;
          _this2._layoutGraph = void 0;
          _this2._renderGraph = renderGraph;
          _this2._layoutGraph = layoutGraph;
          _this2._vertID = vertID;
          _this2._subpass = subpass;
          _this2._pipeline = pipeline;

          var layoutName = _this2._renderGraph.component(RenderGraphComponent.Layout, _this2._vertID);

          _this2._layoutID = layoutGraph.locateChild(layoutGraph.nullVertex(), layoutName);
          return _this2;
        }

        var _proto3 = WebRasterSubpassBuilder.prototype;

        _proto3.setArrayBuffer = function setArrayBuffer(name, arrayBuffer) {
          throw new Error('Method not implemented.');
        };

        _proto3.addRenderTarget = function addRenderTarget(name, accessType, slotName, loadOp, storeOp, clearColor) {
          if (loadOp === void 0) {
            loadOp = LoadOp.CLEAR;
          }

          if (storeOp === void 0) {
            storeOp = StoreOp.STORE;
          }

          if (clearColor === void 0) {
            clearColor = new Color();
          }

          throw new Error('Method not implemented.');
        };

        _proto3.addDepthStencil = function addDepthStencil(name, accessType, slotName, loadOp, storeOp, depth, stencil, clearFlag) {
          if (loadOp === void 0) {
            loadOp = LoadOp.CLEAR;
          }

          if (storeOp === void 0) {
            storeOp = StoreOp.STORE;
          }

          if (depth === void 0) {
            depth = 1;
          }

          if (stencil === void 0) {
            stencil = 0;
          }

          if (clearFlag === void 0) {
            clearFlag = ClearFlagBit.DEPTH_STENCIL;
          }

          throw new Error('Method not implemented.');
        };

        _proto3.addTexture = function addTexture(name, slotName) {
          throw new Error('Method not implemented.');
        };

        _proto3.addStorageBuffer = function addStorageBuffer(name, accessType, slotName) {
          throw new Error('Method not implemented.');
        };

        _proto3.addStorageImage = function addStorageImage(name, accessType, slotName) {
          throw new Error('Method not implemented.');
        };

        _proto3.addRasterView = function addRasterView(name, view) {
          throw new Error('Method not implemented.');
        };

        _proto3.addComputeView = function addComputeView(name, view) {
          throw new Error('Method not implemented.');
        };

        _proto3.setViewport = function setViewport(viewport) {
          throw new Error('Method not implemented.');
        };

        _proto3.addQueue = function addQueue(hint, layoutName) {
          if (hint === void 0) {
            hint = QueueHint.RENDER_OPAQUE;
          }

          if (layoutName === void 0) {
            layoutName = 'default';
          }

          if (DEBUG) {
            var layoutId = this._layoutGraph.locateChild(this._layoutID, layoutName);

            assert(layoutId !== 0xFFFFFFFF);
          }

          var queue = new RenderQueue(hint);
          var data = new RenderData();

          var queueID = this._renderGraph.addVertex(RenderGraphValue.Queue, queue, '', layoutName, data, false, this._vertID);

          return new WebRasterQueueBuilder(data, this._renderGraph, this._layoutGraph, queueID, queue, this._pipeline);
        };

        _createClass(WebRasterSubpassBuilder, [{
          key: "name",
          get: function get() {
            return this._renderGraph.getName(this._vertID);
          },
          set: function set(name) {
            this._renderGraph.setName(this._vertID, name);
          }
        }, {
          key: "showStatistics",
          get: function get() {
            return this._subpass.showStatistics;
          },
          set: function set(enable) {
            this._subpass.showStatistics = enable;
          }
        }]);

        return WebRasterSubpassBuilder;
      }(WebSetter));

      _export("WebRasterPassBuilder", WebRasterPassBuilder = /*#__PURE__*/function (_WebSetter3) {
        _inheritsLoose(WebRasterPassBuilder, _WebSetter3);

        function WebRasterPassBuilder(data, renderGraph, layoutGraph, resourceGraph, vertID, pass, pipeline) {
          var _this3;

          _this3 = _WebSetter3.call(this, data, layoutGraph) || this;
          _this3._renderGraph = void 0;
          _this3._vertID = void 0;
          _this3._layoutID = void 0;
          _this3._pass = void 0;
          _this3._pipeline = void 0;
          _this3._layoutGraph = void 0;
          _this3._resourceGraph = void 0;
          _this3._renderGraph = renderGraph;
          _this3._layoutGraph = layoutGraph;
          _this3._resourceGraph = resourceGraph;
          _this3._vertID = vertID;
          _this3._pass = pass;
          _this3._pipeline = pipeline;

          var layoutName = _this3._renderGraph.component(RenderGraphComponent.Layout, _this3._vertID);

          _this3._layoutID = layoutGraph.locateChild(layoutGraph.nullVertex(), layoutName);
          return _this3;
        }

        var _proto4 = WebRasterPassBuilder.prototype;

        _proto4.addRasterView = function addRasterView(name, view) {
          this._pass.rasterViews.set(name, view);
        };

        _proto4.addComputeView = function addComputeView(name, view) {
          if (DEBUG) {
            assert(view.name);
            assert(name && this._resourceGraph.contains(name));
            var descriptorName = view.name;

            var descriptorID = this._layoutGraph.attributeIndex.get(descriptorName);

            assert(descriptorID !== undefined);
          }

          if (this._pass.computeViews.has(name)) {
            var _this$_pass$computeVi;

            (_this$_pass$computeVi = this._pass.computeViews.get(name)) === null || _this$_pass$computeVi === void 0 ? void 0 : _this$_pass$computeVi.push(view);
          } else {
            this._pass.computeViews.set(name, [view]);
          }
        };

        _proto4.setArrayBuffer = function setArrayBuffer(name, arrayBuffer) {
          throw new Error('Method not implemented.');
        };

        _proto4.setVersion = function setVersion(name, version) {
          this._pass.versionName = name;
          this._pass.version = version;
        };

        _proto4.addRenderTarget = function addRenderTarget(name, slotName, loadOp, storeOp, clearColor) {
          if (loadOp === void 0) {
            loadOp = LoadOp.CLEAR;
          }

          if (storeOp === void 0) {
            storeOp = StoreOp.STORE;
          }

          if (clearColor === void 0) {
            clearColor = new Color();
          }

          if (DEBUG) {
            assert(name && this._resourceGraph.contains(name));
          }

          var clearFlag = ClearFlagBit.COLOR;

          if (loadOp === LoadOp.LOAD) {
            clearFlag = ClearFlagBit.NONE;
          }

          var view = new RasterView(slotName, AccessType.WRITE, AttachmentType.RENDER_TARGET, loadOp, storeOp, clearFlag, clearColor);

          this._pass.rasterViews.set(name, view);
        };

        _proto4.addDepthStencil = function addDepthStencil(name, slotName, loadOp, storeOp, depth, stencil, clearFlag) {
          if (loadOp === void 0) {
            loadOp = LoadOp.CLEAR;
          }

          if (storeOp === void 0) {
            storeOp = StoreOp.STORE;
          }

          if (depth === void 0) {
            depth = 1;
          }

          if (stencil === void 0) {
            stencil = 0;
          }

          if (clearFlag === void 0) {
            clearFlag = ClearFlagBit.DEPTH_STENCIL;
          }

          if (DEBUG) {
            assert(name && this._resourceGraph.contains(name));
          }

          var view = new RasterView(slotName, AccessType.WRITE, AttachmentType.DEPTH_STENCIL, loadOp, storeOp, clearFlag, new Color(depth, stencil, 0, 0));

          this._pass.rasterViews.set(name, view);
        };

        _proto4._addComputeResource = function _addComputeResource(name, accessType, slotName) {
          var view = new ComputeView(slotName);
          view.accessType = accessType;

          if (DEBUG) {
            assert(view.name);
            assert(name && this._resourceGraph.contains(name));
            var descriptorName = view.name;

            var descriptorID = this._layoutGraph.attributeIndex.get(descriptorName);

            assert(descriptorID !== undefined);
          }

          if (this._pass.computeViews.has(name)) {
            var _this$_pass$computeVi2;

            (_this$_pass$computeVi2 = this._pass.computeViews.get(name)) === null || _this$_pass$computeVi2 === void 0 ? void 0 : _this$_pass$computeVi2.push(view);
          } else {
            this._pass.computeViews.set(name, [view]);
          }
        };

        _proto4.addTexture = function addTexture(name, slotName) {
          this._addComputeResource(name, AccessType.READ, slotName);
        };

        _proto4.addStorageBuffer = function addStorageBuffer(name, accessType, slotName) {
          this._addComputeResource(name, accessType, slotName);
        };

        _proto4.addStorageImage = function addStorageImage(name, accessType, slotName) {
          this._addComputeResource(name, accessType, slotName);
        };

        _proto4.addRasterSubpass = function addRasterSubpass(layoutName) {
          if (layoutName === void 0) {
            layoutName = '';
          }

          var name = 'Raster';

          var subpassID = this._pass.subpassGraph.numVertices();

          this._pass.subpassGraph.addVertex(name, new Subpass());

          var subpass = new RasterSubpass(subpassID);
          var data = new RenderData();

          var vertID = this._renderGraph.addVertex(RenderGraphValue.RasterSubpass, subpass, name, layoutName, data, false);

          var result = new WebRasterSubpassBuilder(data, this._renderGraph, this._layoutGraph, vertID, subpass, this._pipeline);
          return result;
        };

        _proto4.addComputeSubpass = function addComputeSubpass(layoutName) {
          if (layoutName === void 0) {
            layoutName = '';
          }

          throw new Error('Method not implemented.');
        };

        _proto4.addQueue = function addQueue(hint, layoutName) {
          if (hint === void 0) {
            hint = QueueHint.RENDER_OPAQUE;
          }

          if (layoutName === void 0) {
            layoutName = 'default';
          }

          if (DEBUG) {
            var layoutId = this._layoutGraph.locateChild(this._layoutID, layoutName);

            assert(layoutId !== 0xFFFFFFFF);
          }

          var queue = new RenderQueue(hint);
          var data = new RenderData();

          var queueID = this._renderGraph.addVertex(RenderGraphValue.Queue, queue, '', layoutName, data, false, this._vertID);

          return new WebRasterQueueBuilder(data, this._renderGraph, this._layoutGraph, queueID, queue, this._pipeline);
        };

        _proto4.addFullscreenQuad = function addFullscreenQuad(material, passID, sceneFlags, name) {
          if (sceneFlags === void 0) {
            sceneFlags = SceneFlags.NONE;
          }

          if (name === void 0) {
            name = 'FullscreenQuad';
          }

          var queue = new RenderQueue(QueueHint.RENDER_TRANSPARENT);

          var queueId = this._renderGraph.addVertex(RenderGraphValue.Queue, queue, 'Queue', '', new RenderData(), false, this._vertID);

          this._renderGraph.addVertex(RenderGraphValue.Blit, new Blit(material, passID, sceneFlags, null), name, '', new RenderData(), false, queueId);
        };

        _proto4.addCameraQuad = function addCameraQuad(camera, material, passID, sceneFlags, name) {
          if (name === void 0) {
            name = 'CameraQuad';
          }

          var queue = new RenderQueue(QueueHint.RENDER_TRANSPARENT);

          var queueId = this._renderGraph.addVertex(RenderGraphValue.Queue, queue, 'Queue', '', new RenderData(), false, this._vertID);

          this._renderGraph.addVertex(RenderGraphValue.Blit, new Blit(material, passID, sceneFlags, camera), name, '', new RenderData(), false, queueId);
        };

        _proto4.setViewport = function setViewport(viewport) {
          this._pass.viewport.copy(viewport);
        };

        _createClass(WebRasterPassBuilder, [{
          key: "name",
          get: function get() {
            return this._renderGraph.getName(this._vertID);
          },
          set: function set(name) {
            this._renderGraph.setName(this._vertID, name);
          }
        }, {
          key: "showStatistics",
          get: function get() {
            return this._pass.showStatistics;
          },
          set: function set(enable) {
            this._pass.showStatistics = enable;
          }
        }]);

        return WebRasterPassBuilder;
      }(WebSetter));

      _export("WebComputeQueueBuilder", WebComputeQueueBuilder = /*#__PURE__*/function (_WebSetter4) {
        _inheritsLoose(WebComputeQueueBuilder, _WebSetter4);

        function WebComputeQueueBuilder(data, renderGraph, layoutGraph, vertID, queue, pipeline) {
          var _this4;

          _this4 = _WebSetter4.call(this, data, layoutGraph) || this;
          _this4._renderGraph = void 0;
          _this4._vertID = void 0;
          _this4._queue = void 0;
          _this4._pipeline = void 0;
          _this4._renderGraph = renderGraph;
          _this4._vertID = vertID;
          _this4._queue = queue;
          _this4._pipeline = pipeline;
          return _this4;
        }

        var _proto5 = WebComputeQueueBuilder.prototype;

        _proto5.setArrayBuffer = function setArrayBuffer(name, arrayBuffer) {
          throw new Error('Method not implemented.');
        };

        _proto5.addDispatch = function addDispatch(threadGroupCountX, threadGroupCountY, threadGroupCountZ, material, passID, name) {
          if (material === void 0) {
            material = null;
          }

          if (passID === void 0) {
            passID = 0;
          }

          if (name === void 0) {
            name = 'Dispatch';
          }

          this._renderGraph.addVertex(RenderGraphValue.Dispatch, new Dispatch(material, passID, threadGroupCountX, threadGroupCountY, threadGroupCountZ), name, '', new RenderData(), false, this._vertID);
        };

        _createClass(WebComputeQueueBuilder, [{
          key: "name",
          get: function get() {
            return this._renderGraph.getName(this._vertID);
          },
          set: function set(name) {
            this._renderGraph.setName(this._vertID, name);
          }
        }]);

        return WebComputeQueueBuilder;
      }(WebSetter));

      _export("WebComputePassBuilder", WebComputePassBuilder = /*#__PURE__*/function (_WebSetter5) {
        _inheritsLoose(WebComputePassBuilder, _WebSetter5);

        function WebComputePassBuilder(data, renderGraph, layoutGraph, resourceGraph, vertID, pass, pipeline) {
          var _this5;

          _this5 = _WebSetter5.call(this, data, layoutGraph) || this;
          _this5._renderGraph = void 0;
          _this5._layoutGraph = void 0;
          _this5._resourceGraph = void 0;
          _this5._vertID = void 0;
          _this5._layoutID = void 0;
          _this5._pass = void 0;
          _this5._pipeline = void 0;
          _this5._renderGraph = renderGraph;
          _this5._layoutGraph = layoutGraph;
          _this5._resourceGraph = resourceGraph;
          _this5._vertID = vertID;
          _this5._pass = pass;
          _this5._pipeline = pipeline;

          var layoutName = _this5._renderGraph.component(RenderGraphComponent.Layout, _this5._vertID);

          _this5._layoutID = layoutGraph.locateChild(layoutGraph.nullVertex(), layoutName);
          return _this5;
        }

        var _proto6 = WebComputePassBuilder.prototype;

        _proto6.setArrayBuffer = function setArrayBuffer(name, arrayBuffer) {
          throw new Error('Method not implemented.');
        };

        _proto6.addTexture = function addTexture(name, slotName) {
          throw new Error('Method not implemented.');
        };

        _proto6.addStorageBuffer = function addStorageBuffer(name, accessType, slotName) {
          throw new Error('Method not implemented.');
        };

        _proto6.addStorageImage = function addStorageImage(name, accessType, slotName) {
          throw new Error('Method not implemented.');
        };

        _proto6.addComputeView = function addComputeView(name, view) {
          if (DEBUG) {
            assert(name && this._resourceGraph.contains(name));
          }

          if (this._pass.computeViews.has(name)) {
            var _this$_pass$computeVi3;

            (_this$_pass$computeVi3 = this._pass.computeViews.get(name)) === null || _this$_pass$computeVi3 === void 0 ? void 0 : _this$_pass$computeVi3.push(view);
          } else {
            this._pass.computeViews.set(name, [view]);
          }
        };

        _proto6.addQueue = function addQueue(layoutName) {
          if (layoutName === void 0) {
            layoutName = 'default';
          }

          if (DEBUG) {
            var layoutId = this._layoutGraph.locateChild(this._layoutID, layoutName);

            assert(layoutId !== 0xFFFFFFFF);
          }

          var queue = new RenderQueue();
          var data = new RenderData();

          var queueID = this._renderGraph.addVertex(RenderGraphValue.Queue, queue, '', layoutName, data, false, this._vertID);

          return new WebComputeQueueBuilder(data, this._renderGraph, this._layoutGraph, queueID, queue, this._pipeline);
        };

        _createClass(WebComputePassBuilder, [{
          key: "name",
          get: function get() {
            return this._renderGraph.getName(this._vertID);
          },
          set: function set(name) {
            this._renderGraph.setName(this._vertID, name);
          }
        }]);

        return WebComputePassBuilder;
      }(WebSetter));

      _export("WebMovePassBuilder", WebMovePassBuilder = /*#__PURE__*/function () {
        function WebMovePassBuilder(renderGraph, vertID, pass) {
          this._renderGraph = void 0;
          this._vertID = void 0;
          this._pass = void 0;
          this._renderGraph = renderGraph;
          this._vertID = vertID;
          this._pass = pass;
        }

        var _proto7 = WebMovePassBuilder.prototype;

        _proto7.setCustomBehavior = function setCustomBehavior(name) {
          throw new Error('Method not implemented.');
        };

        _proto7.addPair = function addPair(pair) {
          this._pass.movePairs.push(pair);
        };

        _createClass(WebMovePassBuilder, [{
          key: "name",
          get: function get() {
            return this._renderGraph.getName(this._vertID);
          },
          set: function set(name) {
            this._renderGraph.setName(this._vertID, name);
          }
        }]);

        return WebMovePassBuilder;
      }());

      _export("WebCopyPassBuilder", WebCopyPassBuilder = /*#__PURE__*/function () {
        function WebCopyPassBuilder(renderGraph, vertID, pass) {
          this._renderGraph = void 0;
          this._vertID = void 0;
          this._pass = void 0;
          this._renderGraph = renderGraph;
          this._vertID = vertID;
          this._pass = pass;
        }

        var _proto8 = WebCopyPassBuilder.prototype;

        _proto8.setCustomBehavior = function setCustomBehavior(name) {
          throw new Error('Method not implemented.');
        };

        _proto8.addPair = function addPair(pair) {
          this._pass.copyPairs.push(pair);
        };

        _createClass(WebCopyPassBuilder, [{
          key: "name",
          get: function get() {
            return this._renderGraph.getName(this._vertID);
          },
          set: function set(name) {
            this._renderGraph.setName(this._vertID, name);
          }
        }]);

        return WebCopyPassBuilder;
      }());

      _export("WebPipeline", WebPipeline = /*#__PURE__*/function () {
        function WebPipeline(layoutGraph) {
          this._width = 0;
          this._height = 0;
          this._usesDeferredPipeline = false;
          this._globalDescriptorSet = null;
          this._globalDescriptorSetLayout = null;
          this._macros = {};
          this._pipelineSceneData = new PipelineSceneData();
          this._constantMacros = '';
          this._lightingMode = LightingMode.DEFAULT;
          this._profiler = null;
          this._pipelineUBO = new PipelineUBO();
          this._cameras = [];
          this._layoutGraph = void 0;
          this._resourceGraph = new ResourceGraph();
          this._renderGraph = null;
          this._compiler = null;
          this._executor = null;
          this._customPipelineName = '';
          this.builder = null;
          this._combineSignY = 0;
          this._layoutGraph = layoutGraph;
        }

        var _proto9 = WebPipeline.prototype;

        _proto9.addRenderTexture = function addRenderTexture(name, format, width, height, renderWindow) {
          return this.addRenderWindow(name, format, width, height, renderWindow);
        };

        _proto9.addRenderWindow = function addRenderWindow(name, format, width, height, renderWindow) {
          var desc = new ResourceDesc();
          desc.dimension = ResourceDimension.TEXTURE2D;
          desc.width = width;
          desc.height = height;
          desc.depthOrArraySize = 1;
          desc.mipLevels = 1;
          desc.format = format;
          desc.flags = ResourceFlags.COLOR_ATTACHMENT;

          if (renderWindow.swapchain === null) {
            assert(renderWindow.framebuffer.colorTextures.length === 1 && renderWindow.framebuffer.colorTextures[0] !== null);
            return this._resourceGraph.addVertex(ResourceGraphValue.Framebuffer, renderWindow.framebuffer, name, desc, new ResourceTraits(ResourceResidency.EXTERNAL), new ResourceStates(), new SamplerInfo());
          } else {
            return this._resourceGraph.addVertex(ResourceGraphValue.Swapchain, new RenderSwapchain(renderWindow.swapchain), name, desc, new ResourceTraits(ResourceResidency.BACKBUFFER), new ResourceStates(), new SamplerInfo());
          }
        };

        _proto9.updateRenderWindow = function updateRenderWindow(name, renderWindow) {
          var resId = this.resourceGraph.vertex(name);
          var currFbo = this.resourceGraph._vertices[resId]._object;

          if (currFbo !== renderWindow.framebuffer) {
            this.resourceGraph._vertices[resId]._object = renderWindow.framebuffer;
          }
        };

        _proto9.updateStorageBuffer = function updateStorageBuffer(name, size, format) {
          if (format === void 0) {
            format = Format.UNKNOWN;
          }

          var resId = this.resourceGraph.vertex(name);
          var desc = this.resourceGraph.getDesc(resId);
          desc.width = size;

          if (format !== Format.UNKNOWN) {
            desc.format = format;
          }
        };

        _proto9.updateRenderTarget = function updateRenderTarget(name, width, height, format) {
          if (format === void 0) {
            format = Format.UNKNOWN;
          }

          var resId = this.resourceGraph.vertex(name);
          var desc = this.resourceGraph.getDesc(resId);
          desc.width = width;
          desc.height = height;
          if (format !== Format.UNKNOWN) desc.format = format;
        };

        _proto9.updateDepthStencil = function updateDepthStencil(name, width, height, format) {
          if (format === void 0) {
            format = Format.UNKNOWN;
          }

          var resId = this.resourceGraph.vertex(name);
          var desc = this.resourceGraph.getDesc(resId);
          desc.width = width;
          desc.height = height;
          if (format !== Format.UNKNOWN) desc.format = format;
        };

        _proto9.updateStorageTexture = function updateStorageTexture(name, width, height, format) {
          if (format === void 0) {
            format = Format.UNKNOWN;
          }

          var resId = this.resourceGraph.vertex(name);
          var desc = this.resourceGraph.getDesc(resId);
          desc.width = width;
          desc.height = height;

          if (format !== Format.UNKNOWN) {
            desc.format = format;
          }
        };

        _proto9.updateShadingRateTexture = function updateShadingRateTexture(name, width, height) {
          var resId = this.resourceGraph.vertex(name);
          var desc = this.resourceGraph.getDesc(resId);
          desc.width = width;
          desc.height = height;
        };

        _proto9.containsResource = function containsResource(name) {
          return this._resourceGraph.contains(name);
        };

        _proto9.addComputePass = function addComputePass(layoutName) {
          throw new Error('Method not implemented.');
        };

        _proto9.addMovePass = function addMovePass() {
          throw new Error('Method not implemented.');
        };

        _proto9.addCopyPass = function addCopyPass() {
          throw new Error('Method not implemented.');
        };

        _proto9.createSceneTransversal = function createSceneTransversal(camera, scene) {
          throw new Error('Method not implemented.');
        };

        _proto9._generateConstantMacros = function _generateConstantMacros(clusterEnabled) {
          var str = '';
          str += "#define CC_DEVICE_SUPPORT_FLOAT_TEXTURE " + (this._device.getFormatFeatures(Format.RGBA32F) & (FormatFeatureBit.RENDER_TARGET | FormatFeatureBit.SAMPLED_TEXTURE) ? 1 : 0) + "\n";
          str += "#define CC_ENABLE_CLUSTERED_LIGHT_CULLING " + (clusterEnabled ? 1 : 0) + "\n";
          str += "#define CC_DEVICE_MAX_VERTEX_UNIFORM_VECTORS " + this._device.capabilities.maxVertexUniformVectors + "\n";
          str += "#define CC_DEVICE_MAX_FRAGMENT_UNIFORM_VECTORS " + this._device.capabilities.maxFragmentUniformVectors + "\n";
          str += "#define CC_DEVICE_CAN_BENEFIT_FROM_INPUT_ATTACHMENT " + (this._device.hasFeature(Feature.INPUT_ATTACHMENT_BENEFIT) ? 1 : 0) + "\n";
          str += "#define CC_PLATFORM_ANDROID_AND_WEBGL " + (systemInfo.os === OS.ANDROID && systemInfo.isBrowser ? 1 : 0) + "\n";
          str += "#define CC_ENABLE_WEBGL_HIGHP_STRUCT_VALUES " + (macro.ENABLE_WEBGL_HIGHP_STRUCT_VALUES ? 1 : 0) + "\n";
          var jointUniformCapacity = UBOSkinning.JOINT_UNIFORM_CAPACITY;
          str += "#define CC_JOINT_UNIFORM_CAPACITY " + jointUniformCapacity + "\n";
          this._constantMacros = str;
          this._layoutGraph.constantMacros = this._constantMacros;
        };

        _proto9.setCustomPipelineName = function setCustomPipelineName(name) {
          this._customPipelineName = name;

          if (this._customPipelineName === 'Deferred') {
            this._usesDeferredPipeline = true;
          }
        };

        _proto9.getGlobalDescriptorSetData = function getGlobalDescriptorSetData() {
          var stageId = this.layoutGraph.locateChild(this.layoutGraph.nullVertex(), 'default');
          assert(stageId !== 0xFFFFFFFF);
          var layout = this.layoutGraph.getLayout(stageId);
          var layoutData = layout.descriptorSets.get(UpdateFrequency.PER_PASS);
          return layoutData;
        };

        _proto9._initCombineSignY = function _initCombineSignY() {
          var device = this._device;
          this._combineSignY = device.capabilities.screenSpaceSignY * 0.5 + 0.5 << 1 | device.capabilities.clipSpaceSignY * 0.5 + 0.5;
        };

        _proto9.getCombineSignY = function getCombineSignY() {
          return this._combineSignY;
        };

        _proto9.activate = function activate(swapchain) {
          this._device = deviceManager.gfxDevice;
          createGfxDescriptorSetsAndPipelines(this._device, this._layoutGraph);
          this._globalDSManager = new GlobalDSManager(this._device);
          this._globalDescSetData = this.getGlobalDescriptorSetData();
          this._globalDescriptorSetLayout = this._globalDescSetData.descriptorSetLayout;
          this._globalDescriptorSet = isEnableEffect() ? this._device.createDescriptorSet(new DescriptorSetInfo(this._globalDescriptorSetLayout)) : this._globalDescSetData.descriptorSet;
          this._globalDSManager.globalDescriptorSet = this.globalDescriptorSet;
          this.setMacroBool('CC_USE_HDR', this._pipelineSceneData.isHDR);

          this._generateConstantMacros(false);

          this._pipelineSceneData.activate(this._device);

          this._pipelineUBO.activate(this._device, this);

          this._initCombineSignY();

          var isFloat = supportsR32FloatTexture(this._device) ? 0 : 1;
          this.setMacroInt('CC_SHADOWMAP_FORMAT', isFloat); // 0: SHADOWMAP_LINER_DEPTH_OFF, 1: SHADOWMAP_LINER_DEPTH_ON.

          var isLinear = this._device.gfxAPI === API.WEBGL ? 1 : 0;
          this.setMacroInt('CC_SHADOWMAP_USE_LINEAR_DEPTH', isLinear); // 0: UNIFORM_VECTORS_LESS_EQUAL_64, 1: UNIFORM_VECTORS_GREATER_EQUAL_125.

          this.pipelineSceneData.csmSupported = this.device.capabilities.maxFragmentUniformVectors >= WebPipeline.CSM_UNIFORM_VECTORS + WebPipeline.GLOBAL_UNIFORM_VECTORS;
          this.setMacroBool('CC_SUPPORT_CASCADED_SHADOW_MAP', this.pipelineSceneData.csmSupported); // 0: CC_SHADOW_NONE, 1: CC_SHADOW_PLANAR, 2: CC_SHADOW_MAP

          this.setMacroInt('CC_SHADOW_TYPE', 0); // 0: PCFType.HARD, 1: PCFType.SOFT, 2: PCFType.SOFT_2X, 3: PCFType.SOFT_4X

          this.setMacroInt('CC_DIR_SHADOW_PCF_TYPE', PCFType.HARD); // 0: CC_DIR_LIGHT_SHADOW_NONE, 1: CC_DIR_LIGHT_SHADOW_UNIFORM, 2: CC_DIR_LIGHT_SHADOW_CASCADED, 3: CC_DIR_LIGHT_SHADOW_VARIANCE

          this.setMacroInt('CC_DIR_LIGHT_SHADOW_TYPE', 0); // 0: CC_CASCADED_LAYERS_TRANSITION_OFF, 1: CC_CASCADED_LAYERS_TRANSITION_ON

          this.setMacroBool('CC_CASCADED_LAYERS_TRANSITION', false); // enable the deferred pipeline

          if (this.usesDeferredPipeline) {
            this.setMacroInt('CC_PIPELINE_TYPE', 1);
          }

          this._forward = new ForwardPipelineBuilder();
          this._deferred = new DeferredPipelineBuilder();
          this.builder = new CustomPipelineBuilder();
          return true;
        };

        _proto9.destroy = function destroy() {
          var _this$_globalDSManage, _this$_globalDSManage2, _this$_pipelineSceneD;

          (_this$_globalDSManage = this._globalDSManager) === null || _this$_globalDSManage === void 0 ? void 0 : _this$_globalDSManage.globalDescriptorSet.destroy();
          (_this$_globalDSManage2 = this._globalDSManager) === null || _this$_globalDSManage2 === void 0 ? void 0 : _this$_globalDSManage2.destroy();
          (_this$_pipelineSceneD = this._pipelineSceneData) === null || _this$_pipelineSceneD === void 0 ? void 0 : _this$_pipelineSceneD.destroy();
          return true;
        };

        _proto9.getMacroString = function getMacroString(name) {
          var str = this._macros[name];

          if (str === undefined) {
            return '';
          }

          return str;
        };

        _proto9.getMacroInt = function getMacroInt(name) {
          var value = this._macros[name];

          if (value === undefined) {
            return 0;
          }

          return value;
        };

        _proto9.getMacroBool = function getMacroBool(name) {
          var value = this._macros[name];

          if (value === undefined) {
            return false;
          }

          return value;
        };

        _proto9.getSamplerInfo = function getSamplerInfo(name) {
          if (this.containsResource(name)) {
            var verId = this._resourceGraph.vertex(name);

            return this._resourceGraph.getSampler(verId);
          }

          return null;
        };

        _proto9.setMacroString = function setMacroString(name, value) {
          this._macros[name] = value;
        };

        _proto9.setMacroInt = function setMacroInt(name, value) {
          this._macros[name] = value;
        };

        _proto9.setMacroBool = function setMacroBool(name, value) {
          this._macros[name] = value;
        };

        _proto9.onGlobalPipelineStateChanged = function onGlobalPipelineStateChanged() {// do nothing
        };

        _proto9.beginSetup = function beginSetup() {
          if (!this._renderGraph) this._renderGraph = new RenderGraph();
        };

        _proto9.endSetup = function endSetup() {
          this.compile();
        };

        _proto9.addStorageBuffer = function addStorageBuffer(name, format, size, residency) {
          if (residency === void 0) {
            residency = ResourceResidency.MANAGED;
          }

          var desc = new ResourceDesc();
          desc.dimension = ResourceDimension.BUFFER;
          desc.width = size;
          desc.height = 1;
          desc.depthOrArraySize = 1;
          desc.mipLevels = 1;
          desc.format = format;
          desc.flags = ResourceFlags.STORAGE;
          return this._resourceGraph.addVertex(ResourceGraphValue.ManagedBuffer, new ManagedBuffer(), name, desc, new ResourceTraits(residency), new ResourceStates(), new SamplerInfo());
        };

        _proto9.addRenderTarget = function addRenderTarget(name, format, width, height, residency) {
          if (residency === void 0) {
            residency = ResourceResidency.MANAGED;
          }

          var desc = new ResourceDesc();
          desc.dimension = ResourceDimension.TEXTURE2D;
          desc.width = width;
          desc.height = height;
          desc.depthOrArraySize = 1;
          desc.mipLevels = 1;
          desc.format = format;
          desc.flags = ResourceFlags.COLOR_ATTACHMENT | ResourceFlags.SAMPLED;
          return this._resourceGraph.addVertex(ResourceGraphValue.Managed, new ManagedResource(), name, desc, new ResourceTraits(residency), new ResourceStates(), new SamplerInfo(Filter.LINEAR, Filter.LINEAR, Filter.NONE, Address.CLAMP, Address.CLAMP, Address.CLAMP));
        };

        _proto9.addDepthStencil = function addDepthStencil(name, format, width, height, residency) {
          if (residency === void 0) {
            residency = ResourceResidency.MANAGED;
          }

          var desc = new ResourceDesc();
          desc.dimension = ResourceDimension.TEXTURE2D;
          desc.width = width;
          desc.height = height;
          desc.depthOrArraySize = 1;
          desc.mipLevels = 1;
          desc.format = format;
          desc.flags = ResourceFlags.DEPTH_STENCIL_ATTACHMENT | ResourceFlags.SAMPLED;
          return this._resourceGraph.addVertex(ResourceGraphValue.Managed, new ManagedResource(), name, desc, new ResourceTraits(residency), new ResourceStates(), new SamplerInfo(Filter.POINT, Filter.POINT, Filter.NONE));
        };

        _proto9.addStorageTexture = function addStorageTexture(name, format, width, height, residency) {
          if (residency === void 0) {
            residency = ResourceResidency.MANAGED;
          }

          var desc = new ResourceDesc();
          desc.dimension = ResourceDimension.TEXTURE2D;
          desc.width = width;
          desc.height = height;
          desc.depthOrArraySize = 1;
          desc.mipLevels = 1;
          desc.format = format;
          desc.flags = ResourceFlags.STORAGE | ResourceFlags.SAMPLED;
          return this._resourceGraph.addVertex(ResourceGraphValue.Managed, new ManagedResource(), name, desc, new ResourceTraits(residency), new ResourceStates(), new SamplerInfo(Filter.POINT, Filter.POINT, Filter.NONE));
        };

        _proto9.addShadingRateTexture = function addShadingRateTexture(name, width, height, residency) {
          if (residency === void 0) {
            residency = ResourceResidency.MANAGED;
          }

          var desc = new ResourceDesc();
          desc.dimension = ResourceDimension.TEXTURE2D;
          desc.width = width;
          desc.height = height;
          desc.depthOrArraySize = 1;
          desc.mipLevels = 1;
          desc.format = Format.R8UI;
          desc.flags = ResourceFlags.SHADING_RATE | ResourceFlags.STORAGE | ResourceFlags.SAMPLED;
          return this._resourceGraph.addVertex(ResourceGraphValue.Managed, new ManagedResource(), name, desc, new ResourceTraits(residency), new ResourceStates(), new SamplerInfo(Filter.LINEAR, Filter.LINEAR, Filter.NONE, Address.CLAMP, Address.CLAMP, Address.CLAMP));
        };

        _proto9.beginFrame = function beginFrame() {// noop
        };

        _proto9.endFrame = function endFrame() {
          var _this$renderGraph;

          // this._renderGraph = null;
          (_this$renderGraph = this.renderGraph) === null || _this$renderGraph === void 0 ? void 0 : _this$renderGraph.clear();
        };

        _proto9.compile = function compile() {
          if (!this._renderGraph) {
            throw new Error('RenderGraph cannot be built without being created');
          }

          if (!this._compiler) {
            this._compiler = new Compiler(this, this._resourceGraph, this._layoutGraph);
          }

          this._compiler.compile(this._renderGraph);
        };

        _proto9.execute = function execute() {
          if (!this._renderGraph) {
            throw new Error('Cannot run without creating rendergraph');
          }

          if (!this._executor) {
            this._executor = new Executor(this, this._pipelineUBO, this._device, this._resourceGraph, this.layoutGraph, this.width, this.height);
          }

          this._executor.resize(this.width, this.height);

          this._executor.execute(this._renderGraph);
        };

        _proto9._applySize = function _applySize(cameras) {
          var _this6 = this;

          var newWidth = this._width;
          var newHeight = this._height;
          cameras.forEach(function (camera) {
            var window = camera.window;
            newWidth = Math.max(window.width, newWidth);
            newHeight = Math.max(window.height, newHeight);

            if (!_this6._cameras.includes(camera)) {
              _this6._cameras.push(camera);
            }
          });

          if (newWidth !== this._width || newHeight !== this._height) {
            this._width = newWidth;
            this._height = newHeight;
          }
        };

        _proto9.render = function render(cameras) {
          if (cameras.length === 0) {
            return;
          }

          this._applySize(cameras);

          decideProfilerCamera(cameras); // build graph

          this.beginFrame();
          this.execute();
          this.endFrame();
        };

        _proto9.addRasterPass = function addRasterPass(width, height, layoutName) {
          if (layoutName === void 0) {
            layoutName = 'default';
          }

          if (DEBUG) {
            var stageId = this.layoutGraph.locateChild(this.layoutGraph.nullVertex(), layoutName);
            assert(stageId !== 0xFFFFFFFF);
            var layout = this.layoutGraph.getLayout(stageId);
            assert(layout);
            assert(layout.descriptorSets.get(UpdateFrequency.PER_PASS));
          }

          var name = 'Raster';
          var pass = new RasterPass();
          pass.viewport.width = width;
          pass.viewport.height = height;
          var data = new RenderData();

          var vertID = this._renderGraph.addVertex(RenderGraphValue.RasterPass, pass, name, layoutName, data, false);

          var result = new WebRasterPassBuilder(data, this._renderGraph, this._layoutGraph, this._resourceGraph, vertID, pass, this._pipelineSceneData);

          this._updateRasterPassConstants(result, width, height, isEnableEffect() ? layoutName : 'default');

          initGlobalDescBinding(data, layoutName);
          return result;
        };

        _proto9.getDescriptorSetLayout = function getDescriptorSetLayout(shaderName, freq) {
          var lg = this._layoutGraph;
          var phaseID = lg.shaderLayoutIndex.get(shaderName);
          var pplLayout = lg.getLayout(phaseID);
          var setLayout = pplLayout.descriptorSets.get(freq);
          return setLayout.descriptorSetLayout;
        };

        _proto9._updateRasterPassConstants = function _updateRasterPassConstants(setter, width, height, layoutName) {
          if (layoutName === void 0) {
            layoutName = 'default';
          }

          var director = cclegacy.director;
          var root = director.root;
          var shadingWidth = width;
          var shadingHeight = height;
          var pipeline = root.pipeline;
          var layoutGraph = pipeline.layoutGraph; // Global

          if (!setter.addConstant('CCGlobal', layoutName)) return;
          uniformOffset = setter.getUniformOffset('cc_time', Type.FLOAT4);

          if (setter.hasUniform(uniformOffset)) {
            _uboVec.set(root.cumulativeTime, root.frameTime, director.getTotalFrames());

            setter.offsetVec4(_uboVec, uniformOffset);
          }

          uniformOffset = setter.getUniformOffset('cc_screenSize', Type.FLOAT4);

          if (setter.hasUniform(uniformOffset)) {
            _uboVec.set(shadingWidth, shadingHeight, 1.0 / shadingWidth, 1.0 / shadingHeight);

            setter.offsetVec4(_uboVec, uniformOffset);
          }

          uniformOffset = setter.getUniformOffset('cc_nativeSize', Type.FLOAT4);

          if (setter.hasUniform(uniformOffset)) {
            _uboVec.set(shadingWidth, shadingHeight, 1.0 / shadingWidth, 1.0 / shadingHeight);

            setter.offsetVec4(_uboVec, uniformOffset);
          }

          var debugView = root.debugView;
          uniformOffset = setter.getUniformOffset('cc_debug_view_mode', Type.FLOAT4);

          if (debugView) {
            if (setter.hasUniform(uniformOffset)) {
              var debugPackVec = [debugView.singleMode, 0.0, 0.0, 0.0];

              for (var i = DebugViewCompositeType.DIRECT_DIFFUSE; i < DebugViewCompositeType.MAX_BIT_COUNT; i++) {
                var idx = i >> 3;
                var bit = i % 8;
                debugPackVec[idx + 1] += (debugView.isCompositeModeEnabled(i) ? 1.0 : 0.0) * Math.pow(10.0, bit);
              }

              debugPackVec[3] += (debugView.lightingWithAlbedo ? 1.0 : 0.0) * Math.pow(10.0, 6.0);
              debugPackVec[3] += (debugView.csmLayerColoration ? 1.0 : 0.0) * Math.pow(10.0, 7.0);

              _uboVec.set(debugPackVec[0], debugPackVec[1], debugPackVec[2], debugPackVec[3]);

              setter.offsetVec4(_uboVec, uniformOffset);
            }
          } else if (setter.hasUniform(uniformOffset)) {
            _uboVec.set(0.0, 0.0, 0.0, 0.0);

            setter.offsetVec4(_uboVec, uniformOffset);
          }
        };

        _createClass(WebPipeline, [{
          key: "globalDescriptorSetData",
          get: function get() {
            return this._globalDescSetData;
          }
        }, {
          key: "device",
          get: function get() {
            return this._device;
          }
        }, {
          key: "lightingMode",
          get: function get() {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return this._lightingMode;
          },
          set: function set(mode) {
            this._lightingMode = mode;
          }
        }, {
          key: "usesDeferredPipeline",
          get: function get() {
            return this._usesDeferredPipeline;
          }
        }, {
          key: "macros",
          get: function get() {
            return this._macros;
          }
        }, {
          key: "globalDSManager",
          get: function get() {
            return this._globalDSManager;
          }
        }, {
          key: "descriptorSetLayout",
          get: function get() {
            return this._globalDSManager.descriptorSetLayout;
          }
        }, {
          key: "descriptorSet",
          get: function get() {
            return this._globalDSManager.globalDescriptorSet;
          }
        }, {
          key: "globalDescriptorSet",
          get: function get() {
            return this._globalDescriptorSet;
          }
        }, {
          key: "commandBuffers",
          get: function get() {
            return [this._device.commandBuffer];
          }
        }, {
          key: "pipelineSceneData",
          get: function get() {
            return this._pipelineSceneData;
          }
        }, {
          key: "constantMacros",
          get: function get() {
            return this._constantMacros;
          }
        }, {
          key: "profiler",
          get: function get() {
            return this._profiler;
          },
          set: function set(profiler) {
            this._profiler = profiler;
          }
        }, {
          key: "geometryRenderer",
          get: function get() {
            throw new Error('Method not implemented.');
          }
        }, {
          key: "shadingScale",
          get: function get() {
            return this._pipelineSceneData.shadingScale;
          },
          set: function set(scale) {
            this._pipelineSceneData.shadingScale = scale;
          }
        }, {
          key: "width",
          get: function get() {
            return this._width;
          }
        }, {
          key: "height",
          get: function get() {
            return this._height;
          }
        }, {
          key: "renderGraph",
          get: function get() {
            return this._renderGraph;
          }
        }, {
          key: "resourceGraph",
          get: function get() {
            return this._resourceGraph;
          }
        }, {
          key: "layoutGraph",
          get: function get() {
            return this._layoutGraph;
          }
        }]);

        return WebPipeline;
      }());

      WebPipeline.MAX_BLOOM_FILTER_PASS_NUM = 6;
      WebPipeline.CSM_UNIFORM_VECTORS = 61;
      WebPipeline.GLOBAL_UNIFORM_VECTORS = 64;
    }
  };
});