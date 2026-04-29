System.register("q-bundled:///fs/cocos/core/utils/coordinates-converts-utils.js", ["../math/index.js", "./x-deprecated.js", "../global-exports.js"], function (_export, _context) {
  "use strict";

  var Vec3, replaceProperty, legacyCC, _vec3, convertUtils;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  /**
   * @en
   * Conversion of non-UI nodes to UI Node (Local) Space coordinate system.
   * @zh
   * 非 UI 节点转换到 UI 节点(局部) 空间坐标系。
   * @deprecated since Cocos Creator 3D v1.2, please use [[Camera.convertToUINode]]
   * @param mainCamera @en The main camera @zh 主相机
   * @param wpos @en The world space location. @zh 世界空间位置。
   * @param uiNode @en The UI node. @zh UI 节点。
   * @param out @en The output local position in UI @zh 返回 UI 节点局部坐标。
   */
  function WorldNode3DToLocalNodeUI(mainCamera, wpos, uiNode, out) {
    if (!out) {
      out = new Vec3();
    }

    mainCamera.convertToUINode(wpos, uiNode, out);
    var pos = uiNode.position;
    out.add(pos);
    return out;
  }
  /**
   * @en
   * Conversion of non-UI nodes to UI Node (World) Space coordinate system.
   * @zh
   * 非 UI 节点转换到 UI 节点(世界)空间坐标系。
   * @deprecated since Cocos Creator 3D v1.2, please use [[Camera.convertToUINode]]
   * @param mainCamera @en The main camera @zh 主相机
   * @param wpos @en The world space location. @zh 世界空间位置。
   * @param out @en The output world position in UI @zh 返回 UI 空间世界坐标。
   */


  function WorldNode3DToWorldNodeUI(mainCamera, wpos, out) {
    if (!out) {
      out = new Vec3();
    }

    mainCamera.worldToScreen(wpos, out);
    out.x /= legacyCC.view.getScaleX();
    out.y /= legacyCC.view.getScaleY();
    return out;
  }
  /**
   * @en It will be removed in v1.2. Please use [[Camera.convertToUINode]]。
   * @zh 将在 v1.2 移除，请使用 Camera 的 `convertToUINode`。
   * @deprecated since Cocos Creator 3D v1.2
   */


  _export({
    WorldNode3DToLocalNodeUI: WorldNode3DToLocalNodeUI,
    WorldNode3DToWorldNodeUI: WorldNode3DToWorldNodeUI
  });

  return {
    setters: [function (_mathIndexJs) {
      Vec3 = _mathIndexJs.Vec3;
    }, function (_xDeprecatedJs) {
      replaceProperty = _xDeprecatedJs.replaceProperty;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }],
    execute: function () {
      _vec3 = new Vec3();

      _export("convertUtils", convertUtils = {
        WorldNode3DToLocalNodeUI: WorldNode3DToLocalNodeUI,
        WorldNode3DToWorldNodeUI: WorldNode3DToWorldNodeUI
      });

      legacyCC.pipelineUtils = convertUtils;
      replaceProperty(legacyCC.pipelineUtils, 'cc.pipelineUtils', [{
        name: 'WorldNode3DToLocalNodeUI',
        newName: 'convertToUINode',
        targetName: 'cc.Camera.prototype',
        customFunction: function customFunction() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var camera = args[0];
          var out = args[3] || _vec3;
          camera.convertToUINode(args[1], args[2], out);
          out.add(args[2].position); // eslint-disable-next-line @typescript-eslint/no-unsafe-return

          return args[3] || out.clone();
        }
      }]);
    }
  };
});