System.register("q-bundled:///fs/cocos/3d/framework/deprecated.js", ["../../core/index.js", "./mesh-renderer.js"], function (_export, _context) {
  "use strict";

  var removeProperty, js, cclegacy, MeshRenderer;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_coreIndexJs) {
      removeProperty = _coreIndexJs.removeProperty;
      js = _coreIndexJs.js;
      cclegacy = _coreIndexJs.cclegacy;
    }, function (_meshRendererJs) {
      MeshRenderer = _meshRendererJs.MeshRenderer;
    }],
    execute: function () {
      removeProperty(MeshRenderer.prototype, 'MeshRenderer.prototype', [{
        name: 'enableDynamicBatching'
      }, {
        name: 'recieveShadows'
      }]);
      /**
       * Alias of [[MeshRenderer]]
       * @deprecated Since v1.2
       */

      _export("ModelComponent", MeshRenderer);

      cclegacy.ModelComponent = MeshRenderer;
      js.setClassAlias(MeshRenderer, 'cc.ModelComponent');
    }
  };
});