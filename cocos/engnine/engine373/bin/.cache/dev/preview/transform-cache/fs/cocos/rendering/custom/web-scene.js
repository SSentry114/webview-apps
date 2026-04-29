System.register("q-bundled:///fs/cocos/rendering/custom/web-scene.js", ["../../core/geometry/index.js", "../../core/math/index.js", "../../render-scene/scene/index.js", "../define.js", "./types.js"], function (_export, _context) {
  "use strict";

  var Frustum, intersect, Vec3, ShadowType, SKYBOX_FLAG, UBOShadow, TaskType, RenderObject, RenderInfo, WebSceneTask, WebSceneTransversal;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
      _export("RenderObject", RenderObject = function RenderObject(model, depth) {
        this.model = void 0;
        this.depth = void 0;
        this.model = model;
        this.depth = depth;
      });

      _export("RenderInfo", RenderInfo = function RenderInfo() {
        this.priority = 0;
        this.hash = -1;
        this.depth = -1;
        this.shaderId = -1;
        this.subModel = void 0;
        this.passIdx = -1;
      });

      _export("WebSceneTask", WebSceneTask = /*#__PURE__*/function () {
        function WebSceneTask(scneData, ubo, camera, visitor) {
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

        var _proto = WebSceneTask.prototype;

        _proto._getRenderObject = function _getRenderObject(model, camera) {
          var depth = 0;

          if (model.node) {
            var _tempVec3 = new Vec3();

            Vec3.subtract(_tempVec3, model.node.worldPosition, camera.position);
            depth = Vec3.dot(_tempVec3, camera.forward);
          }

          var ro = new RenderObject(model, depth);
          return ro;
        };

        _proto._sceneCulling = function _sceneCulling() {
          if (!this.camera) {
            return;
          }

          var scene = this.renderScene;
          var camera = this.camera;
          var mainLight = scene.mainLight;
          var sceneData = this._sceneData;
          var shadows = sceneData.shadows;
          var skybox = sceneData.skybox;
          var csmLayers = sceneData.csmLayers;
          var renderObjects = sceneData.renderObjects;
          renderObjects.length = 0;
          var castShadowObjects = csmLayers.castShadowObjects;
          castShadowObjects.length = 0;
          var csmLayerObjects = csmLayers.layerObjects;
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

          var models = scene.models;
          var visibility = camera.visibility;

          for (var i = 0; i < models.length; i++) {
            var model = models[i]; // filter model by view visibility

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
        };

        _proto.start = function start() {
          this._sceneCulling();
        };

        _proto.join = function join() {// for web-pipeline, do nothing
        };

        _proto.submit = function submit() {};

        _createClass(WebSceneTask, [{
          key: "taskType",
          get: function get() {
            return TaskType.SYNC;
          }
        }, {
          key: "camera",
          get: function get() {
            return this._camera;
          }
        }, {
          key: "renderScene",
          get: function get() {
            return this._scene;
          }
        }, {
          key: "visitor",
          get: function get() {
            return this._visitor;
          }
        }, {
          key: "dirLightFrustum",
          get: function get() {
            return this._dirLightFrustum;
          }
        }, {
          key: "sceneData",
          get: function get() {
            return this._sceneData;
          }
        }]);

        return WebSceneTask;
      }());

      _export("WebSceneTransversal", WebSceneTransversal = /*#__PURE__*/function () {
        var _proto2 = WebSceneTransversal.prototype;

        _proto2.preRenderPass = function preRenderPass(visitor) {
          return new WebSceneTask(this._sceneData, this._ubo, this._camera, visitor);
        };

        _proto2.postRenderPass = function postRenderPass(visitor) {
          return new WebSceneTask(this._sceneData, this._ubo, this._camera, visitor);
        };

        function WebSceneTransversal(camera, sceneData, ubo) {
          this._scene = null;
          this._camera = null;
          this._ubo = void 0;
          this._sceneData = void 0;
          this._camera = camera;
          if (camera) this._scene = camera.scene;
          this._sceneData = sceneData;
          this._ubo = ubo;
        }

        _proto2.transverse = function transverse(visitor) {
          return new WebSceneTask(this._sceneData, this._ubo, this._camera, visitor);
        };

        return WebSceneTransversal;
      }());
    }
  };
});