System.register("q-bundled:///fs/cocos/render-scene/scene/lod-group.js", ["../../core/index.js", "../../gfx/index.js", "./camera.js"], function (_export, _context) {
  "use strict";

  var Vec3, assertIsTrue, deviceManager, CameraProjection, LODData, LODGroup;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_coreIndexJs) {
      Vec3 = _coreIndexJs.Vec3;
      assertIsTrue = _coreIndexJs.assertIsTrue;
    }, function (_gfxIndexJs) {
      deviceManager = _gfxIndexJs.deviceManager;
    }, function (_cameraJs) {
      CameraProjection = _cameraJs.CameraProjection;
    }],
    execute: function () {
      /**
       * @engineInternal
       */
      _export("LODData", LODData = /*#__PURE__*/function () {
        function LODData() {
          this.screenUsagePercentage = 1.0;
          this._models = [];
        }

        var _proto = LODData.prototype;

        _proto.addModel = function addModel(model) {
          this._models.splice(0, 0, model);
        };

        _proto.eraseModel = function eraseModel(model) {
          var removeIndex = this._models.indexOf(model);

          if (removeIndex >= 0) {
            this._models.splice(removeIndex, 1);
          }
        };

        _proto.clearModels = function clearModels() {
          this._models.length = 0;
        };

        _createClass(LODData, [{
          key: "models",
          get: function get() {
            return this._models;
          }
        }]);

        return LODData;
      }());
      /**
       * @engineInternal
       */


      _export("LODGroup", LODGroup = /*#__PURE__*/function () {
        /**
         * @en Object Size in local space, may be auto-calculated value from object bounding box or value from user input.
        */

        /**
         *@en The array of LODs
         */

        /**
         * For editor only, users maybe operate several LOD's object
         */
        function LODGroup() {
          this.scene = void 0;
          this.node = null;
          this._device = void 0;
          this.enabled = true;
          this._localBoundaryCenter = new Vec3(0, 0, 0);
          this._objectSize = 1;
          this._lodDataArray = [];
          this._lockedLODLevelVec = [];
          this._isLockLevelChanged = false;
          this._device = deviceManager.gfxDevice;
        }

        var _proto2 = LODGroup.prototype;

        _proto2.attachToScene = function attachToScene(scene) {
          this.scene = scene;
        };

        _proto2.detachFromScene = function detachFromScene() {
          this.scene = null;
        };

        _proto2.lockLODLevels = function lockLODLevels(lockLev) {
          if (lockLev.length !== this._lockedLODLevelVec.length) {
            this._isLockLevelChanged = true;
          } else {
            var size = lockLev.length;
            var index = 0;

            for (; index < size; index++) {
              if (lockLev[index] !== this._lockedLODLevelVec[index]) {
                this._isLockLevelChanged = true;
                break;
              }
            }
          }

          this._lockedLODLevelVec = lockLev;
        };

        _proto2.isLockLevelChanged = function isLockLevelChanged() {
          return this._isLockLevelChanged;
        };

        _proto2.resetLockChangeFlag = function resetLockChangeFlag() {
          this._isLockLevelChanged = false;
        };

        _proto2.getLockedLODLevels = function getLockedLODLevels() {
          return this._lockedLODLevelVec;
        };

        _proto2.clearLODs = function clearLODs() {
          this._lodDataArray.length = 0;
        };

        _proto2.insertLOD = function insertLOD(index, lod) {
          this._lodDataArray.splice(index, 0, lod);
        };

        _proto2.updateLOD = function updateLOD(index, lod) {
          this._lodDataArray[index] = lod;
        };

        _proto2.eraseLOD = function eraseLOD(index) {
          this._lodDataArray.splice(index, 1);
        }
        /**
         *
         * @param camera current perspective camera
         * @returns visible LOD index in lodGroup
         */
        ;

        _proto2.getVisibleLODLevel = function getVisibleLODLevel(camera) {
          var screenUsagePercentage = this.getScreenUsagePercentage(camera);
          var lodIndex = -1;

          for (var i = 0; i < this.lodCount; ++i) {
            var lod = this.lodDataArray[i];

            if (screenUsagePercentage >= lod.screenUsagePercentage) {
              lodIndex = i;
              break;
            }
          }

          return lodIndex;
        }
        /**
         *
         * @param camera current perspective camera
         * @returns height of current lod group relative to camera position in screen space, aka. relativeHeight
         */
        ;

        _proto2.getScreenUsagePercentage = function getScreenUsagePercentage(camera) {
          if (!this.node) return 0;
          var distance;

          if (camera.projectionType === CameraProjection.PERSPECTIVE) {
            distance = Vec3.len(this.localBoundaryCenter.transformMat4(this.node.worldMatrix).subtract(camera.node.worldPosition));
          }

          return this.distanceToScreenUsagePercentage(camera, distance, this.getWorldSpaceSize());
        };

        _proto2.distanceToScreenUsagePercentage = function distanceToScreenUsagePercentage(camera, distance, size) {
          if (camera.projectionType === CameraProjection.PERSPECTIVE) {
            assertIsTrue(typeof distance === 'number', 'distance must be present for perspective projection');
            return size * camera.matProj.m05 / (distance * 2.0); // note: matProj.m11 is 1 / tan(fov / 2.0)
          } else {
            return size * camera.matProj.m05 * 0.5;
          }
        };

        _proto2.getWorldSpaceSize = function getWorldSpaceSize() {
          var scale = this.node.scale;
          var maxScale = Math.max(Math.abs(scale.x), Math.abs(scale.y), Math.abs(scale.z));
          return maxScale * this.objectSize;
        };

        _createClass(LODGroup, [{
          key: "localBoundaryCenter",
          get: function get() {
            return this._localBoundaryCenter.clone();
          },
          set: function set(val) {
            this._localBoundaryCenter.set(val);
          }
        }, {
          key: "lodCount",
          get: function get() {
            return this._lodDataArray.length;
          }
        }, {
          key: "objectSize",
          get: function get() {
            return this._objectSize;
          },
          set: function set(val) {
            this._objectSize = val;
          }
        }, {
          key: "lodDataArray",
          get: function get() {
            return this._lodDataArray;
          }
        }]);

        return LODGroup;
      }());
    }
  };
});