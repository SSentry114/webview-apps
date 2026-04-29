System.register("q-bundled:///fs/cocos/rendering/custom/web-pipeline.js", ["pal/system-info", "../../../../virtual/internal%253Aconstants.js", "../../gfx/index.js", "../../core/index.js", "./types.js", "./render-graph.js", "../pipeline-scene-data.js", "../../render-scene/scene/index.js", "../../render-scene/scene/light.js", "./executor.js", "../global-descriptor-set-manager.js", "../define.js", "../../../pal/system-info/enum-type/index.js", "./compiler.js", "../pipeline-ubo.js", "../../asset/asset-manager/index.js", "./builtin-pipelines.js", "./custom-pipeline.js", "../pipeline-funcs.js", "../debug-view.js", "./utils.js", "./define.js", "./layout-graph-utils.js"], function (_export, _context) {
  "use strict";

  var systemInfo, DEBUG, Color, Feature, Format, FormatFeatureBit, ClearFlagBit, deviceManager, API, Type, SamplerInfo, Filter, Address, DescriptorSetInfo, LoadOp, StoreOp, Mat4, toRadian, Vec3, Vec4, assert, macro, cclegacy, AccessType, AttachmentType, ComputeView, LightingMode, QueueHint, RasterView, ResourceDimension, ResourceFlags, ResourceResidency, SceneFlags, UpdateFrequency, Blit, ClearView, Dispatch, ManagedBuffer, ManagedResource, RasterPass, RasterSubpass, RenderData, RenderGraph, RenderGraphComponent, RenderGraphValue, RenderQueue, RenderSwapchain, ResourceDesc, ResourceGraph, ResourceGraphValue, ResourceStates, ResourceTraits, SceneData, Subpass, PipelineSceneData, Camera, ShadowType, CSMLevel, PCFType, LightType, Executor, GlobalDSManager, isEnableEffect, supportsR32FloatTexture, UBOSkinning, OS, Compiler, PipelineUBO, builtinResMgr, DeferredPipelineBuilder, ForwardPipelineBuilder, CustomPipelineBuilder, decideProfilerCamera, DebugViewCompositeType, getUBOTypeCount, initGlobalDescBinding, createGfxDescriptorSetsAndPipelines, WebSetter, WebRasterQueueBuilder, WebRasterSubpassBuilder, WebRasterPassBuilder, WebComputeQueueBuilder, WebComputePassBuilder, WebMovePassBuilder, WebCopyPassBuilder, WebPipeline, _uboVec, _uboVec3, _uboCol, _matView, _mulMatView, uniformOffset, _samplerPointInfo;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function setShadowUBOLightView(setter, camera, light, level, layout = 'default') {
    const director = cclegacy.director;
    const pipeline = director.root.pipeline;
    const device = pipeline.device;
    const sceneData = pipeline.pipelineSceneData;
    const shadowInfo = sceneData.shadows;
    const csmLayers = sceneData.csmLayers;
    const packing = supportsR32FloatTexture(device) ? 0.0 : 1.0;
    const cap = pipeline.device.capabilities;
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
          const mainLight = light;

          if (shadowInfo.enabled && mainLight && mainLight.shadowEnabled) {
            if (shadowInfo.type === ShadowType.ShadowMap) {
              let near = 0.1;
              let far = 0;
              let matShadowView;
              let matShadowProj;
              let matShadowViewProj;
              let levelCount = 0;

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
                const layer = csmLayers.layers[level];
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
          const spotLight = light;

          if (shadowInfo.enabled && spotLight && spotLight.shadowEnabled) {
            const matViewOffset = setter.getUniformOffset('cc_matLightView', Type.MAT4);
            const matViewProOffset = setter.getUniformOffset('cc_matLightViewProj', Type.MAT4);

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
    const shadowMapSize = shadowInfo.size.x;

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

  function setShadowUBOView(setter, camera, layout = 'default') {
    const director = cclegacy.director;
    const pipeline = director.root.pipeline;
    const device = pipeline.device;
    const scene = cclegacy.director.getScene().renderScene;
    const mainLight = camera && camera.scene ? camera.scene.mainLight : scene.mainLight;
    const sceneData = pipeline.pipelineSceneData;
    const shadowInfo = sceneData.shadows;
    const csmLayers = sceneData.csmLayers;
    const csmSupported = sceneData.csmSupported;
    const packing = supportsR32FloatTexture(device) ? 0.0 : 1.0;
    const hasCCShadow = setter.addConstant('CCShadow', layout);
    const hasCCCSM = setter.addConstant('CCCSM', layout);

    if (mainLight && shadowInfo.enabled) {
      if (shadowInfo.type === ShadowType.ShadowMap) {
        if (mainLight.shadowEnabled) {
          if (mainLight.shadowFixedArea || mainLight.csmLevel === CSMLevel.LEVEL_1 || !csmSupported) {
            if (hasCCShadow) {
              setter.setCurrConstant('CCShadow', layout);
              const matShadowView = csmLayers.specialLayer.matShadowView;
              const matShadowProj = csmLayers.specialLayer.matShadowProj;
              const matShadowViewProj = csmLayers.specialLayer.matShadowViewProj;
              const near = mainLight.shadowNear;
              const far = mainLight.shadowFar;
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
              const layerThreshold = getPCFRadius(shadowInfo, mainLight);
              setter.setCurrConstant('CCCSM', layout);

              for (let i = 0; i < mainLight.csmLevel; i++) {
                const matShadowView = csmLayers.layers[i].matShadowView;
                uniformOffset = setter.getUniformOffset('cc_csmViewDir0', Type.FLOAT4, i);

                if (setter.hasUniform(uniformOffset)) {
                  _uboVec.set(matShadowView.m00, matShadowView.m04, matShadowView.m08, layerThreshold);

                  setter.offsetVec4(_uboVec, uniformOffset);
                }

                uniformOffset = setter.getUniformOffset('cc_csmViewDir1', Type.FLOAT4, i);

                if (setter.hasUniform(uniformOffset)) {
                  _uboVec.set(matShadowView.m01, matShadowView.m05, matShadowView.m09, 0.0);

                  setter.offsetVec4(_uboVec, uniformOffset);
                }

                uniformOffset = setter.getUniformOffset('cc_csmViewDir2', Type.FLOAT4, i);

                if (setter.hasUniform(uniformOffset)) {
                  _uboVec.set(matShadowView.m02, matShadowView.m06, matShadowView.m10, 0.0);

                  setter.offsetVec4(_uboVec, uniformOffset);
                }

                uniformOffset = setter.getUniformOffset('cc_csmAtlas', Type.FLOAT4, i);

                if (setter.hasUniform(uniformOffset)) {
                  const csmAtlas = csmLayers.layers[i].csmAtlas;
                  setter.offsetVec4(csmAtlas, uniformOffset);
                }

                uniformOffset = setter.getUniformOffset('cc_csmSplitsInfo', Type.FLOAT, i);

                if (setter.hasUniform(uniformOffset)) {
                  setter.offsetFloat(csmLayers.layers[i].splitCameraFar / mainLight.shadowDistance, uniformOffset);
                }

                uniformOffset = setter.getUniformOffset('cc_matCSMViewProj', Type.MAT4, i);

                if (setter.hasUniform(uniformOffset)) {
                  const matShadowViewProj = csmLayers.layers[i].matShadowViewProj;
                  setter.offsetMat4(matShadowViewProj, uniformOffset);
                }

                const matShadowProj = csmLayers.layers[i].matShadowProj;
                uniformOffset = setter.getUniformOffset('cc_csmProjDepthInfo', Type.FLOAT4, i);

                if (setter.hasUniform(uniformOffset)) {
                  _uboVec.set(matShadowProj.m10, matShadowProj.m14, matShadowProj.m11, matShadowProj.m15);

                  setter.offsetVec4(_uboVec, uniformOffset);
                }

                uniformOffset = setter.getUniformOffset('cc_csmProjInfo', Type.FLOAT4, i);

                if (setter.hasUniform(uniformOffset)) {
                  _uboVec.set(matShadowProj.m00, matShadowProj.m05, 1.0 / matShadowProj.m00, 1.0 / matShadowProj.m05);

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

  function setCameraUBOValues(setter, camera, cfg, scene, layoutName = 'default') {
    const director = cclegacy.director;
    const root = director.root;
    const pipeline = root.pipeline;
    const shadowInfo = cfg.shadows;
    const skybox = cfg.skybox;
    const shadingScale = cfg.shadingScale; // Camera

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

    const mainLight = scene.mainLight;

    if (mainLight) {
      uniformOffset = setter.getUniformOffset('cc_mainLitDir', Type.FLOAT4);

      if (setter.hasUniform(uniformOffset)) {
        const shadowEnable = mainLight.shadowEnabled && shadowInfo.type === ShadowType.ShadowMap ? 1.0 : 0.0;

        _uboVec.set(mainLight.direction.x, mainLight.direction.y, mainLight.direction.z, shadowEnable);

        setter.offsetVec4(_uboVec, uniformOffset);
      }

      uniformOffset = setter.getUniformOffset('cc_mainLitColor', Type.FLOAT4);

      if (setter.hasUniform(uniformOffset)) {
        let r = mainLight.color.x;
        let g = mainLight.color.y;
        let b = mainLight.color.z;

        if (mainLight.useColorTemperature) {
          r *= mainLight.colorTemperatureRGB.x;
          g *= mainLight.colorTemperatureRGB.y;
          b *= mainLight.colorTemperatureRGB.z;
        }

        let w = mainLight.illuminance;

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

    const ambient = cfg.ambient;
    uniformOffset = setter.getUniformOffset('cc_ambientSky', Type.FLOAT4);

    if (setter.hasUniform(uniformOffset)) {
      const skyColor = ambient.skyColor;

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

    const fog = cfg.fog;
    uniformOffset = setter.getUniformOffset('cc_fogColor', Type.FLOAT4);

    if (setter.hasUniform(uniformOffset)) {
      const colorTempRGB = fog.colorArray;

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

  function setTextureUBOView(setter, camera, cfg, layout = 'default') {
    const skybox = cfg.skybox;
    const director = cclegacy.director;
    const root = director.root;

    if (skybox.reflectionMap) {
      const texture = skybox.reflectionMap.getGFXTexture();
      const sampler = root.device.getSampler(skybox.reflectionMap.getSamplerInfo());
      setter.setTexture('cc_environment', texture);
      setter.setSampler('cc_environment', sampler);
    } else {
      const envmap = skybox.envmap ? skybox.envmap : builtinResMgr.get('default-cube-texture');

      if (envmap) {
        const texture = envmap.getGFXTexture();
        const sampler = root.device.getSampler(envmap.getSamplerInfo());
        setter.setTexture('cc_environment', texture);
        setter.setSampler('cc_environment', sampler);
      }
    }

    const diffuseMap = skybox.diffuseMap ? skybox.diffuseMap : builtinResMgr.get('default-cube-texture');

    if (diffuseMap) {
      const texture = diffuseMap.getGFXTexture();
      const sampler = root.device.getSampler(diffuseMap.getSamplerInfo());
      setter.setTexture('cc_diffuseMap', texture);
      setter.setSampler('cc_diffuseMap', sampler);
    }

    const pointSampler = root.device.getSampler(_samplerPointInfo);

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
      const childNodes = lg.children(parentID);

      if (childNodes.next().value && childNodes.next().value.target !== lg.nullVertex()) {
        const ququeLayoutID = childNodes.next().value.target;
        return lg.getName(ququeLayoutID);
      }
    }

    return '';
  }

  function isManaged(residency) {
    return residency === ResourceResidency.MANAGED || residency === ResourceResidency.MEMORYLESS;
  }

  _export({
    WebSetter: void 0,
    WebRasterQueueBuilder: void 0,
    WebRasterSubpassBuilder: void 0,
    WebRasterPassBuilder: void 0,
    WebComputeQueueBuilder: void 0,
    WebComputePassBuilder: void 0,
    WebMovePassBuilder: void 0,
    WebCopyPassBuilder: void 0,
    WebPipeline: void 0
  });

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

      _export("WebSetter", WebSetter = class WebSetter {
        constructor(data, lg) {
          this._data = void 0;
          this._lg = void 0;
          this._currBlock = void 0;
          this._currStage = void 0;
          this._currCount = void 0;
          this._currConstant = [];
          this._data = data;
          this._lg = lg;
        }

        _copyToBuffer(target, offset, type) {
          assert(offset !== -1);
          const arr = this.getCurrConstant();

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
        }

        _applyCurrConstantBuffer(name, target, type, idx = 0) {
          const offset = this.getUniformOffset(name, type, idx);

          this._copyToBuffer(target, offset, type);
        }

        hasUniform(offset) {
          return offset !== -1;
        }

        getUniformOffset(name, type, idx = 0) {
          const currBlock = this._getCurrUniformBlock();

          if (!currBlock) return -1;
          let offset = 0;
          const typeCount = getUBOTypeCount(type);

          for (const uniform of currBlock.members) {
            const currCount = getUBOTypeCount(uniform.type);

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
        }

        _getCurrUniformBlock() {
          const block = this._currBlock;

          const nodeId = this._lg.locateChild(0xFFFFFFFF, this._currStage);

          const ppl = this._lg.getLayout(nodeId);

          const layout = ppl.descriptorSets.get(UpdateFrequency.PER_PASS).descriptorSetLayoutData;

          const nameID = this._lg.attributeIndex.get(block);

          return layout.uniformBlocks.get(nameID);
        }

        _getCurrDescriptorBlock(block) {
          const nodeId = this._lg.locateChild(0xFFFFFFFF, this._currStage);

          const ppl = this._lg.getLayout(nodeId);

          const layout = ppl.descriptorSets.get(UpdateFrequency.PER_PASS).descriptorSetLayoutData;

          const nameID = this._lg.attributeIndex.get(block);

          for (const block of layout.descriptorBlocks) {
            for (let i = 0; i !== block.descriptors.length; ++i) {
              if (nameID === block.descriptors[i].descriptorID) {
                return block.offset + i;
              }
            }
          }

          return -1;
        }

        setCurrConstant(block, stage = 'default') {
          this._currBlock = block;
          this._currStage = stage;

          const nameID = this._lg.attributeIndex.get(block);

          this._currCount = 0;

          const currBlock = this._getCurrUniformBlock();

          if (!currBlock) return false;

          for (const uniform of currBlock.members) {
            this._currCount += getUBOTypeCount(uniform.type) * uniform.count;
          }

          this._currConstant = this._data.constants.get(nameID);
          return true;
        }

        getCurrConstant() {
          return this._currConstant;
        }

        addConstant(block, stage = 'default') {
          this._currBlock = block;
          this._currStage = stage;

          const num = this._lg.attributeIndex.get(block);

          this._currCount = 0;

          const currBlock = this._getCurrUniformBlock();

          if (!currBlock) return false;

          for (const uniform of currBlock.members) {
            this._currCount += getUBOTypeCount(uniform.type) * uniform.count;
          }

          if (!this._data.constants.get(num)) {
            const value = new Array(this._currCount);
            value.fill(0);

            this._data.constants.set(num, value);
          }

          this.setCurrConstant(block);
          return true;
        }

        setMat4(name, mat, idx = 0) {
          this._applyCurrConstantBuffer(name, mat, Type.MAT4, idx);
        }

        offsetMat4(mat, offset) {
          this._copyToBuffer(mat, offset, Type.MAT4);
        }

        setQuaternion(name, quat, idx = 0) {
          this._applyCurrConstantBuffer(name, quat, Type.FLOAT4, idx);
        }

        offsetQuaternion(quat, offset) {
          this._copyToBuffer(quat, offset, Type.FLOAT4);
        }

        setColor(name, color, idx = 0) {
          this._applyCurrConstantBuffer(name, color, Type.FLOAT4, idx);
        }

        offsetColor(color, offset) {
          this._copyToBuffer(color, offset, Type.FLOAT4);
        }

        setVec4(name, vec, idx = 0) {
          this._applyCurrConstantBuffer(name, vec, Type.FLOAT4, idx);
        }

        offsetVec4(vec, offset) {
          this._copyToBuffer(vec, offset, Type.FLOAT4);
        }

        setVec2(name, vec, idx = 0) {
          this._applyCurrConstantBuffer(name, vec, Type.FLOAT2, idx);
        }

        offsetVec2(vec, offset) {
          this._copyToBuffer(vec, offset, Type.FLOAT2);
        }

        setFloat(name, v, idx = 0) {
          this._applyCurrConstantBuffer(name, v, Type.FLOAT, idx);
        }

        offsetFloat(v, offset) {
          this._copyToBuffer(v, offset, Type.FLOAT);
        }

        setBuffer(name, buffer) {}

        setTexture(name, texture) {
          if (this._getCurrDescriptorBlock(name) === -1) {
            return;
          }

          const num = this._lg.attributeIndex.get(name);

          this._data.textures.set(num, texture);
        }

        setReadWriteBuffer(name, buffer) {}

        setReadWriteTexture(name, texture) {}

        setSampler(name, sampler) {
          if (this._getCurrDescriptorBlock(name) === -1) {
            return;
          }

          const num = this._lg.attributeIndex.get(name);

          this._data.samplers.set(num, sampler);
        }

        hasSampler(name) {
          const id = this._lg.attributeIndex.get(name);

          if (id === undefined) {
            return false;
          }

          return this._data.samplers.has(id);
        }

        hasTexture(name) {
          const id = this._lg.attributeIndex.get(name);

          if (id === undefined) {
            return false;
          }

          return this._data.textures.has(id);
        }

        setCustomBehavior(name) {
          throw new Error('Method not implemented.');
        } // protected


      });

      _export("WebRasterQueueBuilder", WebRasterQueueBuilder = class WebRasterQueueBuilder extends WebSetter {
        constructor(data, renderGraph, layoutGraph, vertID, queue, pipeline) {
          super(data, layoutGraph);
          this._renderGraph = void 0;
          this._vertID = void 0;
          this._queue = void 0;
          this._pipeline = void 0;
          this._renderGraph = renderGraph;
          this._vertID = vertID;
          this._queue = queue;
          this._pipeline = pipeline;
        }

        setArrayBuffer(name, arrayBuffer) {
          throw new Error('Method not implemented.');
        }

        get name() {
          return this._renderGraph.getName(this._vertID);
        }

        set name(name) {
          this._renderGraph.setName(this._vertID, name);
        }

        getLayoutName() {
          const parId = this._renderGraph.getParent(this._vertID);

          const layoutName = isEnableEffect() ? this._renderGraph.getLayout(parId) : 'default';
          return layoutName;
        }

        addSceneOfCamera(camera, light, sceneFlags = SceneFlags.NONE, name = 'Camera') {
          const sceneData = new SceneData(name, sceneFlags, light);
          sceneData.camera = camera;

          this._renderGraph.addVertex(RenderGraphValue.Scene, sceneData, name, '', new RenderData(), false, this._vertID);

          const layoutName = this.getLayoutName();
          setCameraUBOValues(this, camera, this._pipeline, camera.scene ? camera.scene : cclegacy.director.getScene().renderScene, layoutName);

          if (sceneFlags & SceneFlags.SHADOW_CASTER) {
            setShadowUBOLightView(this, camera, light.light, light.level, layoutName);
          } else {
            setShadowUBOView(this, camera, layoutName);
          }

          setTextureUBOView(this, camera, this._pipeline);
          initGlobalDescBinding(this._data, layoutName);
        }

        addScene(sceneName, sceneFlags = SceneFlags.NONE) {
          const sceneData = new SceneData(sceneName, sceneFlags);

          this._renderGraph.addVertex(RenderGraphValue.Scene, sceneData, sceneName, '', new RenderData(), false, this._vertID);
        }

        addFullscreenQuad(material, passID, sceneFlags = SceneFlags.NONE, name = 'Quad') {
          this._renderGraph.addVertex(RenderGraphValue.Blit, new Blit(material, passID, sceneFlags, null), name, '', new RenderData(), false, this._vertID);

          const layoutName = this.getLayoutName();
          setCameraUBOValues(this, null, this._pipeline, cclegacy.director.getScene().renderScene, layoutName);

          if (sceneFlags & SceneFlags.SHADOW_CASTER) {// setShadowUBOLightView(this, light.light!, light.level);
          } else {
            setShadowUBOView(this, null, layoutName);
          }

          setTextureUBOView(this, null, this._pipeline);
          initGlobalDescBinding(this._data, layoutName);
        }

        addCameraQuad(camera, material, passID, sceneFlags = SceneFlags.NONE) {
          this._renderGraph.addVertex(RenderGraphValue.Blit, new Blit(material, passID, sceneFlags, camera), 'CameraQuad', '', new RenderData(), false, this._vertID);

          const layoutName = this.getLayoutName();
          setCameraUBOValues(this, camera, this._pipeline, camera.scene ? camera.scene : cclegacy.director.getScene().renderScene, layoutName);

          if (sceneFlags & SceneFlags.SHADOW_CASTER) {// setShadowUBOLightView(this, light.light!, light.level);
          } else {
            setShadowUBOView(this, camera, layoutName);
          }

          setTextureUBOView(this, camera, this._pipeline);
          initGlobalDescBinding(this._data, layoutName);
        }

        clearRenderTarget(name, color = new Color()) {
          this._renderGraph.addVertex(RenderGraphValue.Clear, [new ClearView(name, ClearFlagBit.COLOR, color)], 'ClearRenderTarget', '', new RenderData(), false, this._vertID);
        }

        setViewport(viewport) {
          this._renderGraph.addVertex(RenderGraphValue.Viewport, viewport, 'Viewport', '', new RenderData(), false, this._vertID);
        }

        addCustomCommand(customBehavior) {
          throw new Error('Method not implemented.');
        }

      });

      _export("WebRasterSubpassBuilder", WebRasterSubpassBuilder = class WebRasterSubpassBuilder extends WebSetter {
        constructor(data, renderGraph, layoutGraph, vertID, subpass, pipeline) {
          super(data, layoutGraph);
          this._renderGraph = void 0;
          this._vertID = void 0;
          this._layoutID = void 0;
          this._subpass = void 0;
          this._pipeline = void 0;
          this._layoutGraph = void 0;
          this._renderGraph = renderGraph;
          this._layoutGraph = layoutGraph;
          this._vertID = vertID;
          this._subpass = subpass;
          this._pipeline = pipeline;

          const layoutName = this._renderGraph.component(RenderGraphComponent.Layout, this._vertID);

          this._layoutID = layoutGraph.locateChild(layoutGraph.nullVertex(), layoutName);
        }

        setArrayBuffer(name, arrayBuffer) {
          throw new Error('Method not implemented.');
        }

        get name() {
          return this._renderGraph.getName(this._vertID);
        }

        set name(name) {
          this._renderGraph.setName(this._vertID, name);
        }

        addRenderTarget(name, accessType, slotName, loadOp = LoadOp.CLEAR, storeOp = StoreOp.STORE, clearColor = new Color()) {
          throw new Error('Method not implemented.');
        }

        addDepthStencil(name, accessType, slotName, loadOp = LoadOp.CLEAR, storeOp = StoreOp.STORE, depth = 1, stencil = 0, clearFlag = ClearFlagBit.DEPTH_STENCIL) {
          throw new Error('Method not implemented.');
        }

        addTexture(name, slotName) {
          throw new Error('Method not implemented.');
        }

        addStorageBuffer(name, accessType, slotName) {
          throw new Error('Method not implemented.');
        }

        addStorageImage(name, accessType, slotName) {
          throw new Error('Method not implemented.');
        }

        addRasterView(name, view) {
          throw new Error('Method not implemented.');
        }

        addComputeView(name, view) {
          throw new Error('Method not implemented.');
        }

        setViewport(viewport) {
          throw new Error('Method not implemented.');
        }

        addQueue(hint = QueueHint.RENDER_OPAQUE, layoutName = 'default') {
          if (DEBUG) {
            const layoutId = this._layoutGraph.locateChild(this._layoutID, layoutName);

            assert(layoutId !== 0xFFFFFFFF);
          }

          const queue = new RenderQueue(hint);
          const data = new RenderData();

          const queueID = this._renderGraph.addVertex(RenderGraphValue.Queue, queue, '', layoutName, data, false, this._vertID);

          return new WebRasterQueueBuilder(data, this._renderGraph, this._layoutGraph, queueID, queue, this._pipeline);
        }

        get showStatistics() {
          return this._subpass.showStatistics;
        }

        set showStatistics(enable) {
          this._subpass.showStatistics = enable;
        }

      });

      _export("WebRasterPassBuilder", WebRasterPassBuilder = class WebRasterPassBuilder extends WebSetter {
        constructor(data, renderGraph, layoutGraph, resourceGraph, vertID, pass, pipeline) {
          super(data, layoutGraph);
          this._renderGraph = void 0;
          this._vertID = void 0;
          this._layoutID = void 0;
          this._pass = void 0;
          this._pipeline = void 0;
          this._layoutGraph = void 0;
          this._resourceGraph = void 0;
          this._renderGraph = renderGraph;
          this._layoutGraph = layoutGraph;
          this._resourceGraph = resourceGraph;
          this._vertID = vertID;
          this._pass = pass;
          this._pipeline = pipeline;

          const layoutName = this._renderGraph.component(RenderGraphComponent.Layout, this._vertID);

          this._layoutID = layoutGraph.locateChild(layoutGraph.nullVertex(), layoutName);
        }

        addRasterView(name, view) {
          this._pass.rasterViews.set(name, view);
        }

        addComputeView(name, view) {
          if (DEBUG) {
            assert(view.name);
            assert(name && this._resourceGraph.contains(name));
            const descriptorName = view.name;

            const descriptorID = this._layoutGraph.attributeIndex.get(descriptorName);

            assert(descriptorID !== undefined);
          }

          if (this._pass.computeViews.has(name)) {
            var _this$_pass$computeVi;

            (_this$_pass$computeVi = this._pass.computeViews.get(name)) === null || _this$_pass$computeVi === void 0 ? void 0 : _this$_pass$computeVi.push(view);
          } else {
            this._pass.computeViews.set(name, [view]);
          }
        }

        setArrayBuffer(name, arrayBuffer) {
          throw new Error('Method not implemented.');
        }

        setVersion(name, version) {
          this._pass.versionName = name;
          this._pass.version = version;
        }

        get name() {
          return this._renderGraph.getName(this._vertID);
        }

        set name(name) {
          this._renderGraph.setName(this._vertID, name);
        }

        addRenderTarget(name, slotName, loadOp = LoadOp.CLEAR, storeOp = StoreOp.STORE, clearColor = new Color()) {
          if (DEBUG) {
            assert(name && this._resourceGraph.contains(name));
          }

          let clearFlag = ClearFlagBit.COLOR;

          if (loadOp === LoadOp.LOAD) {
            clearFlag = ClearFlagBit.NONE;
          }

          const view = new RasterView(slotName, AccessType.WRITE, AttachmentType.RENDER_TARGET, loadOp, storeOp, clearFlag, clearColor);

          this._pass.rasterViews.set(name, view);
        }

        addDepthStencil(name, slotName, loadOp = LoadOp.CLEAR, storeOp = StoreOp.STORE, depth = 1, stencil = 0, clearFlag = ClearFlagBit.DEPTH_STENCIL) {
          if (DEBUG) {
            assert(name && this._resourceGraph.contains(name));
          }

          const view = new RasterView(slotName, AccessType.WRITE, AttachmentType.DEPTH_STENCIL, loadOp, storeOp, clearFlag, new Color(depth, stencil, 0, 0));

          this._pass.rasterViews.set(name, view);
        }

        _addComputeResource(name, accessType, slotName) {
          const view = new ComputeView(slotName);
          view.accessType = accessType;

          if (DEBUG) {
            assert(view.name);
            assert(name && this._resourceGraph.contains(name));
            const descriptorName = view.name;

            const descriptorID = this._layoutGraph.attributeIndex.get(descriptorName);

            assert(descriptorID !== undefined);
          }

          if (this._pass.computeViews.has(name)) {
            var _this$_pass$computeVi2;

            (_this$_pass$computeVi2 = this._pass.computeViews.get(name)) === null || _this$_pass$computeVi2 === void 0 ? void 0 : _this$_pass$computeVi2.push(view);
          } else {
            this._pass.computeViews.set(name, [view]);
          }
        }

        addTexture(name, slotName) {
          this._addComputeResource(name, AccessType.READ, slotName);
        }

        addStorageBuffer(name, accessType, slotName) {
          this._addComputeResource(name, accessType, slotName);
        }

        addStorageImage(name, accessType, slotName) {
          this._addComputeResource(name, accessType, slotName);
        }

        addRasterSubpass(layoutName = '') {
          const name = 'Raster';

          const subpassID = this._pass.subpassGraph.numVertices();

          this._pass.subpassGraph.addVertex(name, new Subpass());

          const subpass = new RasterSubpass(subpassID);
          const data = new RenderData();

          const vertID = this._renderGraph.addVertex(RenderGraphValue.RasterSubpass, subpass, name, layoutName, data, false);

          const result = new WebRasterSubpassBuilder(data, this._renderGraph, this._layoutGraph, vertID, subpass, this._pipeline);
          return result;
        }

        addComputeSubpass(layoutName = '') {
          throw new Error('Method not implemented.');
        }

        addQueue(hint = QueueHint.RENDER_OPAQUE, layoutName = 'default') {
          if (DEBUG) {
            const layoutId = this._layoutGraph.locateChild(this._layoutID, layoutName);

            assert(layoutId !== 0xFFFFFFFF);
          }

          const queue = new RenderQueue(hint);
          const data = new RenderData();

          const queueID = this._renderGraph.addVertex(RenderGraphValue.Queue, queue, '', layoutName, data, false, this._vertID);

          return new WebRasterQueueBuilder(data, this._renderGraph, this._layoutGraph, queueID, queue, this._pipeline);
        }

        addFullscreenQuad(material, passID, sceneFlags = SceneFlags.NONE, name = 'FullscreenQuad') {
          const queue = new RenderQueue(QueueHint.RENDER_TRANSPARENT);

          const queueId = this._renderGraph.addVertex(RenderGraphValue.Queue, queue, 'Queue', '', new RenderData(), false, this._vertID);

          this._renderGraph.addVertex(RenderGraphValue.Blit, new Blit(material, passID, sceneFlags, null), name, '', new RenderData(), false, queueId);
        }

        addCameraQuad(camera, material, passID, sceneFlags, name = 'CameraQuad') {
          const queue = new RenderQueue(QueueHint.RENDER_TRANSPARENT);

          const queueId = this._renderGraph.addVertex(RenderGraphValue.Queue, queue, 'Queue', '', new RenderData(), false, this._vertID);

          this._renderGraph.addVertex(RenderGraphValue.Blit, new Blit(material, passID, sceneFlags, camera), name, '', new RenderData(), false, queueId);
        }

        setViewport(viewport) {
          this._pass.viewport.copy(viewport);
        }

        get showStatistics() {
          return this._pass.showStatistics;
        }

        set showStatistics(enable) {
          this._pass.showStatistics = enable;
        }

      });

      _export("WebComputeQueueBuilder", WebComputeQueueBuilder = class WebComputeQueueBuilder extends WebSetter {
        constructor(data, renderGraph, layoutGraph, vertID, queue, pipeline) {
          super(data, layoutGraph);
          this._renderGraph = void 0;
          this._vertID = void 0;
          this._queue = void 0;
          this._pipeline = void 0;
          this._renderGraph = renderGraph;
          this._vertID = vertID;
          this._queue = queue;
          this._pipeline = pipeline;
        }

        setArrayBuffer(name, arrayBuffer) {
          throw new Error('Method not implemented.');
        }

        get name() {
          return this._renderGraph.getName(this._vertID);
        }

        set name(name) {
          this._renderGraph.setName(this._vertID, name);
        }

        addDispatch(threadGroupCountX, threadGroupCountY, threadGroupCountZ, material = null, passID = 0, name = 'Dispatch') {
          this._renderGraph.addVertex(RenderGraphValue.Dispatch, new Dispatch(material, passID, threadGroupCountX, threadGroupCountY, threadGroupCountZ), name, '', new RenderData(), false, this._vertID);
        }

      });

      _export("WebComputePassBuilder", WebComputePassBuilder = class WebComputePassBuilder extends WebSetter {
        constructor(data, renderGraph, layoutGraph, resourceGraph, vertID, pass, pipeline) {
          super(data, layoutGraph);
          this._renderGraph = void 0;
          this._layoutGraph = void 0;
          this._resourceGraph = void 0;
          this._vertID = void 0;
          this._layoutID = void 0;
          this._pass = void 0;
          this._pipeline = void 0;
          this._renderGraph = renderGraph;
          this._layoutGraph = layoutGraph;
          this._resourceGraph = resourceGraph;
          this._vertID = vertID;
          this._pass = pass;
          this._pipeline = pipeline;

          const layoutName = this._renderGraph.component(RenderGraphComponent.Layout, this._vertID);

          this._layoutID = layoutGraph.locateChild(layoutGraph.nullVertex(), layoutName);
        }

        setArrayBuffer(name, arrayBuffer) {
          throw new Error('Method not implemented.');
        }

        get name() {
          return this._renderGraph.getName(this._vertID);
        }

        set name(name) {
          this._renderGraph.setName(this._vertID, name);
        }

        addTexture(name, slotName) {
          throw new Error('Method not implemented.');
        }

        addStorageBuffer(name, accessType, slotName) {
          throw new Error('Method not implemented.');
        }

        addStorageImage(name, accessType, slotName) {
          throw new Error('Method not implemented.');
        }

        addComputeView(name, view) {
          if (DEBUG) {
            assert(name && this._resourceGraph.contains(name));
          }

          if (this._pass.computeViews.has(name)) {
            var _this$_pass$computeVi3;

            (_this$_pass$computeVi3 = this._pass.computeViews.get(name)) === null || _this$_pass$computeVi3 === void 0 ? void 0 : _this$_pass$computeVi3.push(view);
          } else {
            this._pass.computeViews.set(name, [view]);
          }
        }

        addQueue(layoutName = 'default') {
          if (DEBUG) {
            const layoutId = this._layoutGraph.locateChild(this._layoutID, layoutName);

            assert(layoutId !== 0xFFFFFFFF);
          }

          const queue = new RenderQueue();
          const data = new RenderData();

          const queueID = this._renderGraph.addVertex(RenderGraphValue.Queue, queue, '', layoutName, data, false, this._vertID);

          return new WebComputeQueueBuilder(data, this._renderGraph, this._layoutGraph, queueID, queue, this._pipeline);
        }

      });

      _export("WebMovePassBuilder", WebMovePassBuilder = class WebMovePassBuilder {
        constructor(renderGraph, vertID, pass) {
          this._renderGraph = void 0;
          this._vertID = void 0;
          this._pass = void 0;
          this._renderGraph = renderGraph;
          this._vertID = vertID;
          this._pass = pass;
        }

        setCustomBehavior(name) {
          throw new Error('Method not implemented.');
        }

        get name() {
          return this._renderGraph.getName(this._vertID);
        }

        set name(name) {
          this._renderGraph.setName(this._vertID, name);
        }

        addPair(pair) {
          this._pass.movePairs.push(pair);
        }

      });

      _export("WebCopyPassBuilder", WebCopyPassBuilder = class WebCopyPassBuilder {
        constructor(renderGraph, vertID, pass) {
          this._renderGraph = void 0;
          this._vertID = void 0;
          this._pass = void 0;
          this._renderGraph = renderGraph;
          this._vertID = vertID;
          this._pass = pass;
        }

        setCustomBehavior(name) {
          throw new Error('Method not implemented.');
        }

        get name() {
          return this._renderGraph.getName(this._vertID);
        }

        set name(name) {
          this._renderGraph.setName(this._vertID, name);
        }

        addPair(pair) {
          this._pass.copyPairs.push(pair);
        }

      });

      _export("WebPipeline", WebPipeline = class WebPipeline {
        constructor(layoutGraph) {
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

        addRenderTexture(name, format, width, height, renderWindow) {
          return this.addRenderWindow(name, format, width, height, renderWindow);
        }

        addRenderWindow(name, format, width, height, renderWindow) {
          const desc = new ResourceDesc();
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
        }

        updateRenderWindow(name, renderWindow) {
          const resId = this.resourceGraph.vertex(name);
          const currFbo = this.resourceGraph._vertices[resId]._object;

          if (currFbo !== renderWindow.framebuffer) {
            this.resourceGraph._vertices[resId]._object = renderWindow.framebuffer;
          }
        }

        updateStorageBuffer(name, size, format = Format.UNKNOWN) {
          const resId = this.resourceGraph.vertex(name);
          const desc = this.resourceGraph.getDesc(resId);
          desc.width = size;

          if (format !== Format.UNKNOWN) {
            desc.format = format;
          }
        }

        updateRenderTarget(name, width, height, format = Format.UNKNOWN) {
          const resId = this.resourceGraph.vertex(name);
          const desc = this.resourceGraph.getDesc(resId);
          desc.width = width;
          desc.height = height;
          if (format !== Format.UNKNOWN) desc.format = format;
        }

        updateDepthStencil(name, width, height, format = Format.UNKNOWN) {
          const resId = this.resourceGraph.vertex(name);
          const desc = this.resourceGraph.getDesc(resId);
          desc.width = width;
          desc.height = height;
          if (format !== Format.UNKNOWN) desc.format = format;
        }

        updateStorageTexture(name, width, height, format = Format.UNKNOWN) {
          const resId = this.resourceGraph.vertex(name);
          const desc = this.resourceGraph.getDesc(resId);
          desc.width = width;
          desc.height = height;

          if (format !== Format.UNKNOWN) {
            desc.format = format;
          }
        }

        updateShadingRateTexture(name, width, height) {
          const resId = this.resourceGraph.vertex(name);
          const desc = this.resourceGraph.getDesc(resId);
          desc.width = width;
          desc.height = height;
        }

        containsResource(name) {
          return this._resourceGraph.contains(name);
        }

        addComputePass(layoutName) {
          throw new Error('Method not implemented.');
        }

        addMovePass() {
          throw new Error('Method not implemented.');
        }

        addCopyPass() {
          throw new Error('Method not implemented.');
        }

        createSceneTransversal(camera, scene) {
          throw new Error('Method not implemented.');
        }

        _generateConstantMacros(clusterEnabled) {
          let str = '';
          str += `#define CC_DEVICE_SUPPORT_FLOAT_TEXTURE ${this._device.getFormatFeatures(Format.RGBA32F) & (FormatFeatureBit.RENDER_TARGET | FormatFeatureBit.SAMPLED_TEXTURE) ? 1 : 0}\n`;
          str += `#define CC_ENABLE_CLUSTERED_LIGHT_CULLING ${clusterEnabled ? 1 : 0}\n`;
          str += `#define CC_DEVICE_MAX_VERTEX_UNIFORM_VECTORS ${this._device.capabilities.maxVertexUniformVectors}\n`;
          str += `#define CC_DEVICE_MAX_FRAGMENT_UNIFORM_VECTORS ${this._device.capabilities.maxFragmentUniformVectors}\n`;
          str += `#define CC_DEVICE_CAN_BENEFIT_FROM_INPUT_ATTACHMENT ${this._device.hasFeature(Feature.INPUT_ATTACHMENT_BENEFIT) ? 1 : 0}\n`;
          str += `#define CC_PLATFORM_ANDROID_AND_WEBGL ${systemInfo.os === OS.ANDROID && systemInfo.isBrowser ? 1 : 0}\n`;
          str += `#define CC_ENABLE_WEBGL_HIGHP_STRUCT_VALUES ${macro.ENABLE_WEBGL_HIGHP_STRUCT_VALUES ? 1 : 0}\n`;
          const jointUniformCapacity = UBOSkinning.JOINT_UNIFORM_CAPACITY;
          str += `#define CC_JOINT_UNIFORM_CAPACITY ${jointUniformCapacity}\n`;
          this._constantMacros = str;
          this._layoutGraph.constantMacros = this._constantMacros;
        }

        setCustomPipelineName(name) {
          this._customPipelineName = name;

          if (this._customPipelineName === 'Deferred') {
            this._usesDeferredPipeline = true;
          }
        }

        getGlobalDescriptorSetData() {
          const stageId = this.layoutGraph.locateChild(this.layoutGraph.nullVertex(), 'default');
          assert(stageId !== 0xFFFFFFFF);
          const layout = this.layoutGraph.getLayout(stageId);
          const layoutData = layout.descriptorSets.get(UpdateFrequency.PER_PASS);
          return layoutData;
        }

        _initCombineSignY() {
          const device = this._device;
          this._combineSignY = device.capabilities.screenSpaceSignY * 0.5 + 0.5 << 1 | device.capabilities.clipSpaceSignY * 0.5 + 0.5;
        }

        getCombineSignY() {
          return this._combineSignY;
        }

        get globalDescriptorSetData() {
          return this._globalDescSetData;
        }

        activate(swapchain) {
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

          const isFloat = supportsR32FloatTexture(this._device) ? 0 : 1;
          this.setMacroInt('CC_SHADOWMAP_FORMAT', isFloat); // 0: SHADOWMAP_LINER_DEPTH_OFF, 1: SHADOWMAP_LINER_DEPTH_ON.

          const isLinear = this._device.gfxAPI === API.WEBGL ? 1 : 0;
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
        }

        destroy() {
          var _this$_globalDSManage, _this$_globalDSManage2, _this$_pipelineSceneD;

          (_this$_globalDSManage = this._globalDSManager) === null || _this$_globalDSManage === void 0 ? void 0 : _this$_globalDSManage.globalDescriptorSet.destroy();
          (_this$_globalDSManage2 = this._globalDSManager) === null || _this$_globalDSManage2 === void 0 ? void 0 : _this$_globalDSManage2.destroy();
          (_this$_pipelineSceneD = this._pipelineSceneData) === null || _this$_pipelineSceneD === void 0 ? void 0 : _this$_pipelineSceneD.destroy();
          return true;
        }

        get device() {
          return this._device;
        }

        get lightingMode() {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return this._lightingMode;
        }

        set lightingMode(mode) {
          this._lightingMode = mode;
        }

        get usesDeferredPipeline() {
          return this._usesDeferredPipeline;
        }

        get macros() {
          return this._macros;
        }

        get globalDSManager() {
          return this._globalDSManager;
        }

        get descriptorSetLayout() {
          return this._globalDSManager.descriptorSetLayout;
        }

        get descriptorSet() {
          return this._globalDSManager.globalDescriptorSet;
        }

        get globalDescriptorSet() {
          return this._globalDescriptorSet;
        }

        get commandBuffers() {
          return [this._device.commandBuffer];
        }

        get pipelineSceneData() {
          return this._pipelineSceneData;
        }

        get constantMacros() {
          return this._constantMacros;
        }

        get profiler() {
          return this._profiler;
        }

        set profiler(profiler) {
          this._profiler = profiler;
        }

        get geometryRenderer() {
          throw new Error('Method not implemented.');
        }

        get shadingScale() {
          return this._pipelineSceneData.shadingScale;
        }

        set shadingScale(scale) {
          this._pipelineSceneData.shadingScale = scale;
        }

        getMacroString(name) {
          const str = this._macros[name];

          if (str === undefined) {
            return '';
          }

          return str;
        }

        getMacroInt(name) {
          const value = this._macros[name];

          if (value === undefined) {
            return 0;
          }

          return value;
        }

        getMacroBool(name) {
          const value = this._macros[name];

          if (value === undefined) {
            return false;
          }

          return value;
        }

        getSamplerInfo(name) {
          if (this.containsResource(name)) {
            const verId = this._resourceGraph.vertex(name);

            return this._resourceGraph.getSampler(verId);
          }

          return null;
        }

        setMacroString(name, value) {
          this._macros[name] = value;
        }

        setMacroInt(name, value) {
          this._macros[name] = value;
        }

        setMacroBool(name, value) {
          this._macros[name] = value;
        }

        onGlobalPipelineStateChanged() {// do nothing
        }

        beginSetup() {
          if (!this._renderGraph) this._renderGraph = new RenderGraph();
        }

        endSetup() {
          this.compile();
        }

        addStorageBuffer(name, format, size, residency = ResourceResidency.MANAGED) {
          const desc = new ResourceDesc();
          desc.dimension = ResourceDimension.BUFFER;
          desc.width = size;
          desc.height = 1;
          desc.depthOrArraySize = 1;
          desc.mipLevels = 1;
          desc.format = format;
          desc.flags = ResourceFlags.STORAGE;
          return this._resourceGraph.addVertex(ResourceGraphValue.ManagedBuffer, new ManagedBuffer(), name, desc, new ResourceTraits(residency), new ResourceStates(), new SamplerInfo());
        }

        addRenderTarget(name, format, width, height, residency = ResourceResidency.MANAGED) {
          const desc = new ResourceDesc();
          desc.dimension = ResourceDimension.TEXTURE2D;
          desc.width = width;
          desc.height = height;
          desc.depthOrArraySize = 1;
          desc.mipLevels = 1;
          desc.format = format;
          desc.flags = ResourceFlags.COLOR_ATTACHMENT | ResourceFlags.SAMPLED;
          return this._resourceGraph.addVertex(ResourceGraphValue.Managed, new ManagedResource(), name, desc, new ResourceTraits(residency), new ResourceStates(), new SamplerInfo(Filter.LINEAR, Filter.LINEAR, Filter.NONE, Address.CLAMP, Address.CLAMP, Address.CLAMP));
        }

        addDepthStencil(name, format, width, height, residency = ResourceResidency.MANAGED) {
          const desc = new ResourceDesc();
          desc.dimension = ResourceDimension.TEXTURE2D;
          desc.width = width;
          desc.height = height;
          desc.depthOrArraySize = 1;
          desc.mipLevels = 1;
          desc.format = format;
          desc.flags = ResourceFlags.DEPTH_STENCIL_ATTACHMENT | ResourceFlags.SAMPLED;
          return this._resourceGraph.addVertex(ResourceGraphValue.Managed, new ManagedResource(), name, desc, new ResourceTraits(residency), new ResourceStates(), new SamplerInfo(Filter.POINT, Filter.POINT, Filter.NONE));
        }

        addStorageTexture(name, format, width, height, residency = ResourceResidency.MANAGED) {
          const desc = new ResourceDesc();
          desc.dimension = ResourceDimension.TEXTURE2D;
          desc.width = width;
          desc.height = height;
          desc.depthOrArraySize = 1;
          desc.mipLevels = 1;
          desc.format = format;
          desc.flags = ResourceFlags.STORAGE | ResourceFlags.SAMPLED;
          return this._resourceGraph.addVertex(ResourceGraphValue.Managed, new ManagedResource(), name, desc, new ResourceTraits(residency), new ResourceStates(), new SamplerInfo(Filter.POINT, Filter.POINT, Filter.NONE));
        }

        addShadingRateTexture(name, width, height, residency = ResourceResidency.MANAGED) {
          const desc = new ResourceDesc();
          desc.dimension = ResourceDimension.TEXTURE2D;
          desc.width = width;
          desc.height = height;
          desc.depthOrArraySize = 1;
          desc.mipLevels = 1;
          desc.format = Format.R8UI;
          desc.flags = ResourceFlags.SHADING_RATE | ResourceFlags.STORAGE | ResourceFlags.SAMPLED;
          return this._resourceGraph.addVertex(ResourceGraphValue.Managed, new ManagedResource(), name, desc, new ResourceTraits(residency), new ResourceStates(), new SamplerInfo(Filter.LINEAR, Filter.LINEAR, Filter.NONE, Address.CLAMP, Address.CLAMP, Address.CLAMP));
        }

        beginFrame() {// noop
        }

        endFrame() {
          var _this$renderGraph;

          // this._renderGraph = null;
          (_this$renderGraph = this.renderGraph) === null || _this$renderGraph === void 0 ? void 0 : _this$renderGraph.clear();
        }

        compile() {
          if (!this._renderGraph) {
            throw new Error('RenderGraph cannot be built without being created');
          }

          if (!this._compiler) {
            this._compiler = new Compiler(this, this._resourceGraph, this._layoutGraph);
          }

          this._compiler.compile(this._renderGraph);
        }

        execute() {
          if (!this._renderGraph) {
            throw new Error('Cannot run without creating rendergraph');
          }

          if (!this._executor) {
            this._executor = new Executor(this, this._pipelineUBO, this._device, this._resourceGraph, this.layoutGraph, this.width, this.height);
          }

          this._executor.resize(this.width, this.height);

          this._executor.execute(this._renderGraph);
        }

        _applySize(cameras) {
          let newWidth = this._width;
          let newHeight = this._height;
          cameras.forEach(camera => {
            const window = camera.window;
            newWidth = Math.max(window.width, newWidth);
            newHeight = Math.max(window.height, newHeight);

            if (!this._cameras.includes(camera)) {
              this._cameras.push(camera);
            }
          });

          if (newWidth !== this._width || newHeight !== this._height) {
            this._width = newWidth;
            this._height = newHeight;
          }
        }

        get width() {
          return this._width;
        }

        get height() {
          return this._height;
        }

        render(cameras) {
          if (cameras.length === 0) {
            return;
          }

          this._applySize(cameras);

          decideProfilerCamera(cameras); // build graph

          this.beginFrame();
          this.execute();
          this.endFrame();
        }

        addRasterPass(width, height, layoutName = 'default') {
          if (DEBUG) {
            const stageId = this.layoutGraph.locateChild(this.layoutGraph.nullVertex(), layoutName);
            assert(stageId !== 0xFFFFFFFF);
            const layout = this.layoutGraph.getLayout(stageId);
            assert(layout);
            assert(layout.descriptorSets.get(UpdateFrequency.PER_PASS));
          }

          const name = 'Raster';
          const pass = new RasterPass();
          pass.viewport.width = width;
          pass.viewport.height = height;
          const data = new RenderData();

          const vertID = this._renderGraph.addVertex(RenderGraphValue.RasterPass, pass, name, layoutName, data, false);

          const result = new WebRasterPassBuilder(data, this._renderGraph, this._layoutGraph, this._resourceGraph, vertID, pass, this._pipelineSceneData);

          this._updateRasterPassConstants(result, width, height, isEnableEffect() ? layoutName : 'default');

          initGlobalDescBinding(data, layoutName);
          return result;
        }

        getDescriptorSetLayout(shaderName, freq) {
          const lg = this._layoutGraph;
          const phaseID = lg.shaderLayoutIndex.get(shaderName);
          const pplLayout = lg.getLayout(phaseID);
          const setLayout = pplLayout.descriptorSets.get(freq);
          return setLayout.descriptorSetLayout;
        }

        get renderGraph() {
          return this._renderGraph;
        }

        get resourceGraph() {
          return this._resourceGraph;
        }

        get layoutGraph() {
          return this._layoutGraph;
        }

        _updateRasterPassConstants(setter, width, height, layoutName = 'default') {
          const director = cclegacy.director;
          const root = director.root;
          const shadingWidth = width;
          const shadingHeight = height;
          const pipeline = root.pipeline;
          const layoutGraph = pipeline.layoutGraph; // Global

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

          const debugView = root.debugView;
          uniformOffset = setter.getUniformOffset('cc_debug_view_mode', Type.FLOAT4);

          if (debugView) {
            if (setter.hasUniform(uniformOffset)) {
              const debugPackVec = [debugView.singleMode, 0.0, 0.0, 0.0];

              for (let i = DebugViewCompositeType.DIRECT_DIFFUSE; i < DebugViewCompositeType.MAX_BIT_COUNT; i++) {
                const idx = i >> 3;
                const bit = i % 8;
                debugPackVec[idx + 1] += (debugView.isCompositeModeEnabled(i) ? 1.0 : 0.0) * 10.0 ** bit;
              }

              debugPackVec[3] += (debugView.lightingWithAlbedo ? 1.0 : 0.0) * 10.0 ** 6.0;
              debugPackVec[3] += (debugView.csmLayerColoration ? 1.0 : 0.0) * 10.0 ** 7.0;

              _uboVec.set(debugPackVec[0], debugPackVec[1], debugPackVec[2], debugPackVec[3]);

              setter.offsetVec4(_uboVec, uniformOffset);
            }
          } else if (setter.hasUniform(uniformOffset)) {
            _uboVec.set(0.0, 0.0, 0.0, 0.0);

            setter.offsetVec4(_uboVec, uniformOffset);
          }
        }

      });

      WebPipeline.MAX_BLOOM_FILTER_PASS_NUM = 6;
      WebPipeline.CSM_UNIFORM_VECTORS = 61;
      WebPipeline.GLOBAL_UNIFORM_VECTORS = 64;
    }
  };
});