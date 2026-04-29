System.register("q-bundled:///fs/cocos/3d/assets/deprecated.js", ["../../core/index.js", "./mesh.js"], function (_export, _context) {
  "use strict";

  var removeProperty, replaceProperty, Mesh;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_coreIndexJs) {
      removeProperty = _coreIndexJs.removeProperty;
      replaceProperty = _coreIndexJs.replaceProperty;
    }, function (_meshJs) {
      Mesh = _meshJs.Mesh;
    }],
    execute: function () {
      replaceProperty(Mesh.prototype, 'Mesh.prototype', [{
        name: 'renderingMesh',
        newName: 'renderingSubMeshes'
      }]);
      removeProperty(Mesh.prototype, 'Mesh.prototype', [{
        name: 'hasFlatBuffers'
      }, {
        name: 'destroyFlatBuffers'
      }]);
    }
  };
});