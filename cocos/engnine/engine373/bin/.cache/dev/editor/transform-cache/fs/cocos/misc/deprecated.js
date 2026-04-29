System.register("q-bundled:///fs/cocos/misc/deprecated.js", ["./camera-component.js", "../core/index.js", "./model-renderer.js", "./renderer.js"], function (_export, _context) {
  "use strict";

  var Camera, replaceProperty, cclegacy, js, markAsWarning, ModelRenderer, Renderer;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_cameraComponentJs) {
      Camera = _cameraComponentJs.Camera;
    }, function (_coreIndexJs) {
      replaceProperty = _coreIndexJs.replaceProperty;
      cclegacy = _coreIndexJs.cclegacy;
      js = _coreIndexJs.js;
      markAsWarning = _coreIndexJs.markAsWarning;
    }, function (_modelRendererJs) {
      ModelRenderer = _modelRendererJs.ModelRenderer;
    }, function (_rendererJs) {
      Renderer = _rendererJs.Renderer;
    }],
    execute: function () {
      replaceProperty(Camera, 'Camera', [{
        name: 'CameraClearFlag',
        newName: 'ClearFlag'
      }]);
      replaceProperty(Camera.prototype, 'Camera.prototype', [{
        name: 'color',
        newName: 'clearColor'
      }, {
        name: 'depth',
        newName: 'clearDepth'
      }, {
        name: 'stencil',
        newName: 'clearStencil'
      }]); // deprecate Renderer API

      markAsWarning(Renderer.prototype, 'Renderer.prototype', [{
        name: 'getMaterial',
        suggest: 'please use renderer.getSharedMaterial instead.'
      }]);
      /**
       * Alias of [[Camera]]
       * @deprecated Since v1.2
       */

      _export("CameraComponent", Camera);

      cclegacy.CameraComponent = Camera;
      js.setClassAlias(Camera, 'cc.CameraComponent');
      /**
       * Alias of [[Renderer]]
       * @deprecated Since v3.6
       */

      _export("RenderableComponent", ModelRenderer);

      cclegacy.RenderableComponent = ModelRenderer;
      js.setClassAlias(ModelRenderer, 'cc.RenderableComponent');
    }
  };
});