System.register("q-bundled:///fs/cocos/rendering/lod-group-editor-utility.js", ["../core/index.js", "../render-scene/scene/index.js", "../render-scene/index.js"], function (_export, _context) {
  "use strict";

  var Vec3, assertIsTrue, CameraProjection, scene, LODGroupEditorUtility;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("LODGroupEditorUtility", void 0);

  return {
    setters: [function (_coreIndexJs) {
      Vec3 = _coreIndexJs.Vec3;
      assertIsTrue = _coreIndexJs.assertIsTrue;
    }, function (_renderSceneSceneIndexJs) {
      CameraProjection = _renderSceneSceneIndexJs.CameraProjection;
    }, function (_renderSceneIndexJs) {
      scene = _renderSceneIndexJs.scene;
    }],
    execute: function () {
      _export("LODGroupEditorUtility", LODGroupEditorUtility = class LODGroupEditorUtility {
        /**
         * @en Get the lod level used under the current camera, -1 indicates no lod is used.
         * @zh 获取当前摄像机下，使用哪一级的LOD，-1 表示没有lod被使用
         * @param lodGroup current LOD Group component.
         * @param camera current perspective camera.
         * @returns visible LOD index in lodGroup.
         */
        static getVisibleLOD(lodGroup, camera) {
          const screenOccupancyPercentage = this.getRelativeHeight(lodGroup, camera) || 0;
          let lodIndex = -1;

          for (let i = 0; i < lodGroup.lodCount; ++i) {
            const lod = lodGroup.getLOD(i);

            if (lod && screenOccupancyPercentage >= lod.screenUsagePercentage) {
              lodIndex = i;
              break;
            }
          }

          return lodIndex;
        }
        /**
         * @en Get the percentage of objects used on the screen under the current camera.
         * @zh 获取当前摄像机下，物体在屏幕上的占用比率
         * @param lodGroup current LOD Group component
         * @param camera current perspective camera
         * @returns height of current lod group relative to camera position in screen space, aka. relativeHeight
         */


        static getRelativeHeight(lodGroup, camera) {
          if (!lodGroup.node) return null;
          let distance;

          if (camera.projectionType === scene.CameraProjection.PERSPECTIVE) {
            distance = Vec3.len(lodGroup.localBoundaryCenter.transformMat4(lodGroup.node.worldMatrix).subtract(camera.node.position));
          }

          return this.distanceToRelativeHeight(camera, distance, this.getWorldSpaceSize(lodGroup));
        }
        /**
         * @zh 强制使用某几级的LOD
         * @en Force multi LOD level to use.
         * lodIndexArray @en The LOD level array. Passing [] will return to standard LOD processing. @zh 要使用的LOD层级数组，传[]时将使用标准的处理流程。
         */


        static forceLODs(lodGroup, lodIndexArray) {
          lodGroup.lodGroup.lockLODLevels(lodIndexArray);
        }

        static distanceToRelativeHeight(camera, distance, size) {
          if (camera.projectionType === CameraProjection.PERSPECTIVE) {
            assertIsTrue(typeof distance === 'number', 'distance must be present for perspective projection');
            return size * camera.matProj.m05 / (distance * 2.0); // note: matProj.m05 is 1 / tan(fov / 2.0)
          } else {
            return size * camera.matProj.m05 * 0.5;
          }
        }

        static relativeHeightToDistance(camera, relativeHeight, size) {
          assertIsTrue(camera.projectionType === CameraProjection.PERSPECTIVE, 'Camera type must be perspective.');
          return size * camera.matProj.m05 / (relativeHeight * 2.0); // note: matProj.m05 is 1 / tan(fov / 2.0)
        }

        static getWorldSpaceSize(lodGroup) {
          const scale = lodGroup.node.scale;
          const maxScale = Math.max(Math.abs(scale.x), Math.abs(scale.y), Math.abs(scale.z));
          return maxScale * lodGroup.objectSize;
        }

      });
    }
  };
});