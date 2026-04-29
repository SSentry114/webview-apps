System.register("q-bundled:///fs/cocos/render-scene/scene/octree.js", ["../../core/index.js"], function (_export, _context) {
  "use strict";

  var Vec3, Octree;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_coreIndexJs) {
      Vec3 = _coreIndexJs.Vec3;
    }],
    execute: function () {
      /**
       * @en The octree culling configuration of the render scene
       * @zh 渲染场景的八叉树剔除配置
       */
      _export("Octree", Octree = /*#__PURE__*/function () {
        function Octree() {
          this._enabled = false;
          this._minPos = new Vec3(0, 0, 0);
          this._maxPos = new Vec3(0, 0, 0);
          this._depth = 0;
        }

        var _proto = Octree.prototype;

        _proto.initialize = function initialize(octreeInfo) {
          this._enabled = octreeInfo.enabled;
          this._minPos = octreeInfo.minPos;
          this._maxPos = octreeInfo.maxPos;
          this._depth = octreeInfo.depth;
        };

        _createClass(Octree, [{
          key: "enabled",
          get: function get() {
            return this._enabled;
          }
          /**
           * @en Minimum position of the scene's bounding box
           * @zh 场景包围盒最小值
           */
          ,
          set:
          /**
           * @en Whether octree culling is enabled in the render scene
           * @zh 是否开启八叉树加速剔除
           */
          function set(val) {
            this._enabled = val;
          }
        }, {
          key: "minPos",
          get: function get() {
            return this._minPos;
          },
          set: function set(val) {
            this._minPos = val;
          }
          /**
           * @en Maximum position of the scene's bounding box
           * @zh 场景包围盒最大值
           */

        }, {
          key: "maxPos",
          get: function get() {
            return this._maxPos;
          },
          set: function set(val) {
            this._maxPos = val;
          }
          /**
           * @en The depth of the octree
           * @zh 八叉树深度
           */

        }, {
          key: "depth",
          get: function get() {
            return this._depth;
          },
          set: function set(val) {
            this._depth = val;
          }
        }]);

        return Octree;
      }());
    }
  };
});