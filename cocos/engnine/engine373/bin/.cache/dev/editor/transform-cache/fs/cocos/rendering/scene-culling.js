System.register("q-bundled:///fs/cocos/rendering/scene-culling.js", ["../render-scene/scene/camera.js", "../core/index.js", "./define.js", "../render-scene/scene/shadows.js"], function (_export, _context) {
  "use strict";

  var CameraUsage, SKYBOX_FLAG, Vec3, Pool, geometry, cclegacy, UBOShadow, ShadowType, CSMOptimizationMode, _tempVec3, _sphere, roPool;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function getRenderObject(model, camera) {
    let depth = 0;

    if (model.node) {
      Vec3.subtract(_tempVec3, model.node.worldPosition, camera.position);
      depth = Vec3.dot(_tempVec3, camera.forward);
    }

    const ro = roPool.alloc();
    ro.model = model;
    ro.depth = depth;
    return ro;
  }

  function validPunctualLightsCulling(pipeline, camera) {
    const sceneData = pipeline.pipelineSceneData;
    const validPunctualLights = sceneData.validPunctualLights;
    validPunctualLights.length = 0;
    const {
      spotLights
    } = camera.scene;

    for (let i = 0; i < spotLights.length; i++) {
      const light = spotLights[i];

      if (light.baked) {
        continue;
      }

      geometry.Sphere.set(_sphere, light.position.x, light.position.y, light.position.z, light.range);

      if (geometry.intersect.sphereFrustum(_sphere, camera.frustum)) {
        validPunctualLights.push(light);
      }
    }

    const {
      sphereLights
    } = camera.scene;

    for (let i = 0; i < sphereLights.length; i++) {
      const light = sphereLights[i];

      if (light.baked) {
        continue;
      }

      geometry.Sphere.set(_sphere, light.position.x, light.position.y, light.position.z, light.range);

      if (geometry.intersect.sphereFrustum(_sphere, camera.frustum)) {
        validPunctualLights.push(light);
      }
    } // in jsb, std::vector is not synchronized, so we need to assign it manually


    sceneData.validPunctualLights = validPunctualLights;
  }

  function shadowCulling(camera, sceneData, layer) {
    const scene = camera.scene;
    const mainLight = scene.mainLight;
    const csmLayers = sceneData.csmLayers;
    const csmLayerObjects = csmLayers.layerObjects;
    const dirLightFrustum = layer.validFrustum;
    const dirShadowObjects = layer.shadowObjects;
    dirShadowObjects.length = 0;
    const visibility = camera.visibility;

    for (let i = csmLayerObjects.length - 1; i >= 0; i--) {
      const obj = csmLayerObjects.array[i];

      if (!obj) {
        csmLayerObjects.fastRemove(i);
        continue;
      }

      const model = obj.model;

      if (!model || !model.enabled || !model.node) {
        csmLayerObjects.fastRemove(i);
        continue;
      }

      if ((visibility & model.node.layer) !== model.node.layer && !(visibility & model.visFlags)) {
        csmLayerObjects.fastRemove(i);
        continue;
      }

      if (!model.worldBounds || !model.castShadow) {
        csmLayerObjects.fastRemove(i);
        continue;
      }

      const accurate = geometry.intersect.aabbFrustum(model.worldBounds, dirLightFrustum);

      if (!accurate) {
        continue;
      }

      dirShadowObjects.push(obj);

      if (layer.level < mainLight.csmLevel) {
        if (mainLight.csmOptimizationMode === CSMOptimizationMode.RemoveDuplicates && geometry.intersect.aabbFrustumCompletelyInside(model.worldBounds, dirLightFrustum)) {
          csmLayerObjects.fastRemove(i);
        }
      }
    }
  }

  function sceneCulling(pipeline, camera) {
    const scene = camera.scene;
    const mainLight = scene.mainLight;
    const sceneData = pipeline.pipelineSceneData;
    const shadows = sceneData.shadows;
    const skybox = sceneData.skybox;
    const csmLayers = sceneData.csmLayers;
    const renderObjects = sceneData.renderObjects;
    roPool.freeArray(renderObjects);
    renderObjects.length = 0;
    const castShadowObjects = csmLayers.castShadowObjects;
    castShadowObjects.length = 0;
    const csmLayerObjects = csmLayers.layerObjects;
    csmLayerObjects.clear();

    if (shadows.enabled) {
      pipeline.pipelineUBO.updateShadowUBORange(UBOShadow.SHADOW_COLOR_OFFSET, shadows.shadowColor);

      if (shadows.type === ShadowType.ShadowMap) {
        // update CSM layers
        if (mainLight && mainLight.node) {
          csmLayers.update(sceneData, camera);
        }
      }
    }

    if (camera.clearFlag & SKYBOX_FLAG) {
      if (skybox.enabled && skybox.model) {
        renderObjects.push(getRenderObject(skybox.model, camera));
      } else if (camera.cameraUsage !== CameraUsage.EDITOR && camera.cameraUsage !== CameraUsage.SCENE_VIEW) {
        cclegacy.warnID(15100, camera.name);
      }
    }

    const models = scene.models;
    const visibility = camera.visibility;

    function enqueueRenderObject(model) {
      // filter model by view visibility
      if (model.enabled) {
        if (scene.isCulledByLod(camera, model)) {
          return;
        }

        if (model.castShadow) {
          castShadowObjects.push(getRenderObject(model, camera));
          csmLayerObjects.push(getRenderObject(model, camera));
        }

        if (model.node && (visibility & model.node.layer) === model.node.layer || visibility & model.visFlags) {
          // frustum culling
          if (model.worldBounds && !geometry.intersect.aabbFrustum(model.worldBounds, camera.frustum)) {
            return;
          }

          renderObjects.push(getRenderObject(model, camera));
        }
      }
    }

    for (let i = 0; i < models.length; i++) {
      enqueueRenderObject(models[i]);
    }
  }

  _export({
    validPunctualLightsCulling: validPunctualLightsCulling,
    shadowCulling: shadowCulling,
    sceneCulling: sceneCulling
  });

  return {
    setters: [function (_renderSceneSceneCameraJs) {
      CameraUsage = _renderSceneSceneCameraJs.CameraUsage;
      SKYBOX_FLAG = _renderSceneSceneCameraJs.SKYBOX_FLAG;
    }, function (_coreIndexJs) {
      Vec3 = _coreIndexJs.Vec3;
      Pool = _coreIndexJs.Pool;
      geometry = _coreIndexJs.geometry;
      cclegacy = _coreIndexJs.cclegacy;
    }, function (_defineJs) {
      UBOShadow = _defineJs.UBOShadow;
    }, function (_renderSceneSceneShadowsJs) {
      ShadowType = _renderSceneSceneShadowsJs.ShadowType;
      CSMOptimizationMode = _renderSceneSceneShadowsJs.CSMOptimizationMode;
    }],
    execute: function () {
      _tempVec3 = new Vec3();
      _sphere = geometry.Sphere.create(0, 0, 0, 1);
      roPool = new Pool(() => ({
        model: null,
        depth: 0
      }), 128);
    }
  };
});