System.register("q-bundled:///fs/cocos/rendering/custom/web-scene.js", ["../../core/geometry/index.js", "../../core/math/index.js", "../../render-scene/scene/index.js", "../define.js", "./types.js"], function (_export, _context) {
  "use strict";

  var Frustum, intersect, Vec3, ShadowType, SKYBOX_FLAG, UBOShadow, TaskType, RenderObject, RenderInfo, WebSceneTask, WebSceneTransversal;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export({
    RenderObject: void 0,
    RenderInfo: void 0,
    WebSceneTask: void 0,
    WebSceneTransversal: void 0
  });

  return {
    setters: [function (_coreGeometryIndexJs) {
      Frustum = _coreGeometryIndexJs.Frustum;
      intersect = _coreGeometryIndexJs.intersect;
    }, function (_coreMathIndexJs) {
      Vec3 = _coreMathIndexJs.Vec3;
    }, function (_renderSceneSceneIndexJs) {
      ShadowType = _renderSceneSceneIndexJs.ShadowType;
      SKYBOX_FLAG = _renderSceneSceneIndexJs.SKYBOX_FLAG;
    }, function (_defineJs) {
      UBOShadow = _defineJs.UBOShadow;
    }, function (_typesJs) {
      TaskType = _typesJs.TaskType;
    }],
    execute: function () {
      _export("RenderObject", RenderObject = class RenderObject {
        constructor(model, depth) {
          this.model = void 0;
          this.depth = void 0;
          this.model = model;
          this.depth = depth;
        }

      });

      _export("RenderInfo", RenderInfo = class RenderInfo {
        constructor() {
          this.priority = 0;
          this.hash = -1;
          this.depth = -1;
          this.shaderId = -1;
          this.subModel = void 0;
          this.passIdx = -1;
        }

      });

      _export("WebSceneTask", WebSceneTask = class WebSceneTask {
        constructor(scneData, ubo, camera, visitor) {
          this._scene = null;
          this._camera = null;
          this._visitor = void 0;
          this._sceneData = void 0;
          this._dirLightFrustum = new Frustum();
          this._ubo = void 0;

          if (camera) {
            this._scene = camera.scene;
            this._camera = camera;
          }

          this._visitor = visitor;
          this._sceneData = scneData;
          this._ubo = ubo;
        }

        get taskType() {
          return TaskType.SYNC;
        }

        _getRenderObject(model, camera) {
          let depth = 0;

          if (model.node) {
            const _tempVec3 = new Vec3();

            Vec3.subtract(_tempVec3, model.node.worldPosition, camera.position);
            depth = Vec3.dot(_tempVec3, camera.forward);
          }

          const ro = new RenderObject(model, depth);
          return ro;
        }

        _sceneCulling() {
          if (!this.camera) {
            return;
          }

          const scene = this.renderScene;
          const camera = this.camera;
          const mainLight = scene.mainLight;
          const sceneData = this._sceneData;
          const shadows = sceneData.shadows;
          const skybox = sceneData.skybox;
          const csmLayers = sceneData.csmLayers;
          const renderObjects = sceneData.renderObjects;
          renderObjects.length = 0;
          const castShadowObjects = csmLayers.castShadowObjects;
          castShadowObjects.length = 0;
          const csmLayerObjects = csmLayers.layerObjects;
          csmLayerObjects.clear();

          if (shadows.enabled) {
            this._ubo.updateShadowUBORange(UBOShadow.SHADOW_COLOR_OFFSET, shadows.shadowColor);

            if (shadows.type === ShadowType.ShadowMap) {
              // update CSM layers
              if (mainLight && mainLight.node) {
                csmLayers.update(sceneData, camera);
              }
            }
          }

          if (skybox.enabled && skybox.model && camera.clearFlag & SKYBOX_FLAG) {
            renderObjects.push(this._getRenderObject(skybox.model, camera));
          }

          const models = scene.models;
          const visibility = camera.visibility;

          for (let i = 0; i < models.length; i++) {
            const model = models[i]; // filter model by view visibility

            if (model.enabled) {
              if (scene && scene.isCulledByLod(camera, model)) {
                continue;
              }

              if (model.castShadow) {
                castShadowObjects.push(this._getRenderObject(model, camera));
                csmLayerObjects.push(this._getRenderObject(model, camera));
              }

              if (model.node && (visibility & model.node.layer) === model.node.layer || visibility & model.visFlags) {
                // frustum culling
                if (model.worldBounds && !intersect.aabbFrustum(model.worldBounds, camera.frustum)) {
                  continue;
                }

                renderObjects.push(this._getRenderObject(model, camera));
              }
            }
          }
        }

        start() {
          this._sceneCulling();
        }

        join() {// for web-pipeline, do nothing
        }

        submit() {}

        get camera() {
          return this._camera;
        }

        get renderScene() {
          return this._scene;
        }

        get visitor() {
          return this._visitor;
        }

        get dirLightFrustum() {
          return this._dirLightFrustum;
        }

        get sceneData() {
          return this._sceneData;
        }

      });

      _export("WebSceneTransversal", WebSceneTransversal = class WebSceneTransversal {
        preRenderPass(visitor) {
          return new WebSceneTask(this._sceneData, this._ubo, this._camera, visitor);
        }

        postRenderPass(visitor) {
          return new WebSceneTask(this._sceneData, this._ubo, this._camera, visitor);
        }

        constructor(camera, sceneData, ubo) {
          this._scene = null;
          this._camera = null;
          this._ubo = void 0;
          this._sceneData = void 0;
          this._camera = camera;
          if (camera) this._scene = camera.scene;
          this._sceneData = sceneData;
          this._ubo = ubo;
        }

        transverse(visitor) {
          return new WebSceneTask(this._sceneData, this._ubo, this._camera, visitor);
        }

      });
    }
  };
});