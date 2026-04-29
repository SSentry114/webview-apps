System.register("q-bundled:///fs/cocos/render-scene/deprecated.js", ["../core/index.js", "./core/render-scene.js", "../scene-graph/layers.js", "../core/global-exports.js", "./core/pass.js", "./scene/camera.js", "./scene/shadows.js", "./scene/index.js", "./scene/submodel.js"], function (_export, _context) {
  "use strict";

  var replaceProperty, removeProperty, RenderScene, Layers, legacyCC, Pass, Camera, Shadows, SpotLight, Model, SubModel, CameraVisFlags, VisibilityFlags;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_coreIndexJs) {
      replaceProperty = _coreIndexJs.replaceProperty;
      removeProperty = _coreIndexJs.removeProperty;
    }, function (_coreRenderSceneJs) {
      RenderScene = _coreRenderSceneJs.RenderScene;
    }, function (_sceneGraphLayersJs) {
      Layers = _sceneGraphLayersJs.Layers;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_corePassJs) {
      Pass = _corePassJs.Pass;
    }, function (_sceneCameraJs) {
      Camera = _sceneCameraJs.Camera;
    }, function (_sceneShadowsJs) {
      Shadows = _sceneShadowsJs.Shadows;
    }, function (_sceneIndexJs) {
      SpotLight = _sceneIndexJs.SpotLight;
      Model = _sceneIndexJs.Model;
    }, function (_sceneSubmodelJs) {
      SubModel = _sceneSubmodelJs.SubModel;
    }],
    execute: function () {
      removeProperty(RenderScene.prototype, 'RenderScene.prototype', [{
        name: 'raycastUI2DNode'
      }, {
        name: 'raycastUINode'
      }]);
      removeProperty(RenderScene.prototype, 'RenderScene.prototype', [{
        name: 'raycastAll',
        suggest: 'using intersect.rayModel in geometry'
      }, {
        name: 'raycastAllModels',
        suggest: 'using intersect.rayModel in geometry'
      }, {
        name: 'raycastSingleModel',
        suggest: 'using intersect.rayModel in geometry'
      }, {
        name: 'raycastAllCanvas',
        suggest: 'using intersect.rayAABB in geometry'
      }, {
        name: 'rayResultCanvas'
      }, {
        name: 'rayResultModels'
      }, {
        name: 'rayResultAll'
      }, {
        name: 'rayResultSingleModel'
      }]);
      removeProperty(Model.prototype, 'Model.prototype', [{
        name: 'isInstancingEnabled'
      }, {
        name: 'instancedAttributes'
      }]);

      _export("CameraVisFlags", CameraVisFlags = {});

      removeProperty(CameraVisFlags, 'CameraVisFlags', [{
        name: 'GENERAL'
      }]);
      replaceProperty(CameraVisFlags, 'CameraVisFlags', [{
        name: 'PROFILER',
        newName: 'PROFILER',
        target: Layers.BitMask,
        targetName: 'PROFILER'
      }, {
        name: 'GIZMOS',
        newName: 'GIZMOS',
        target: Layers.BitMask,
        targetName: 'GIZMOS'
      }, {
        name: 'EDITOR',
        newName: 'EDITOR',
        target: Layers.BitMask,
        targetName: 'EDITOR'
      }, {
        name: 'UI',
        newName: 'UI',
        target: Layers.BitMask,
        targetName: 'UI_3D'
      }, {
        name: 'UI2D',
        newName: 'UI2D',
        target: Layers.BitMask,
        targetName: 'UI_2D'
      }]);
      legacyCC.CameraVisFlags = CameraVisFlags;

      _export("VisibilityFlags", VisibilityFlags = {});

      removeProperty(VisibilityFlags, 'VisibilityFlags', [{
        name: 'GENERAL'
      }]);
      replaceProperty(VisibilityFlags, 'VisibilityFlags', [{
        name: 'ALWALS',
        newName: 'ALWALS',
        target: Layers.Enum,
        targetName: 'ALWALS'
      }, {
        name: 'PROFILER',
        newName: 'PROFILER',
        target: Layers.Enum,
        targetName: 'PROFILER'
      }, {
        name: 'GIZMOS',
        newName: 'GIZMOS',
        target: Layers.Enum,
        targetName: 'GIZMOS'
      }, {
        name: 'EDITOR',
        newName: 'EDITOR',
        target: Layers.Enum,
        targetName: 'EDITOR'
      }, {
        name: 'UI',
        newName: 'UI',
        target: Layers.Enum,
        targetName: 'UI_3D'
      }, {
        name: 'UI2D',
        newName: 'UI2D',
        target: Layers.Enum,
        targetName: 'UI_2D'
      }]);
      legacyCC.VisibilityFlags = VisibilityFlags;
      replaceProperty(Pass.prototype, 'Pass.prototype', [{
        name: 'getBindingTypeFromHandle',
        newName: 'getDescriptorTypeFromHandle'
      }]);
      removeProperty(Camera.prototype, 'Camera.prototype', [{
        name: 'getSplitFrustum'
      }, {
        name: 'setMatView'
      }, {
        name: 'setMatViewInv'
      }, {
        name: 'setMatProjInv'
      }, {
        name: 'setMatViewProjInv'
      }, {
        name: 'setMatProj'
      }, {
        name: 'setMatViewProj'
      }, {
        name: 'getMatViewInv'
      }]);
      removeProperty(Shadows.prototype, 'Shadows.prototype', [{
        name: 'aspect'
      }, {
        name: 'selfShadow'
      }, {
        name: 'linear'
      }, {
        name: 'packing'
      }, {
        name: 'autoAdapt'
      }, {
        name: 'fixedArea'
      }, {
        name: 'pcf'
      }, {
        name: 'bias'
      }, {
        name: 'normalBias'
      }, {
        name: 'near'
      }, {
        name: 'far'
      }, {
        name: 'shadowDistance'
      }, {
        name: 'invisibleOcclusionRange'
      }, {
        name: 'orthoSize'
      }, {
        name: 'saturation'
      }]);
      removeProperty(SpotLight.prototype, 'SpotLight.prototype', [{
        name: 'aspect'
      }]);
      replaceProperty(SubModel.prototype, 'SubModel.prototype', [{
        name: 'subMeshData',
        newName: 'subMesh'
      }]);
      removeProperty(SubModel.prototype, 'SubModel.prototype', [{
        name: 'getSubModel',
        suggest: 'Use `subModels[i]` instead'
      }, {
        name: 'subModelNum',
        suggest: 'Use `subModels.length` instead'
      }]);
    }
  };
});