System.register("q-bundled:///fs/cocos/rendering/deprecated.js", ["../core/index.js", "./render-pipeline.js"], function (_export, _context) {
  "use strict";

  var markAsWarning, RenderPipeline;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_coreIndexJs) {
      markAsWarning = _coreIndexJs.markAsWarning;
    }, function (_renderPipelineJs) {
      RenderPipeline = _renderPipelineJs.RenderPipeline;
    }],
    execute: function () {
      // deprecate RenderPipeline API
      markAsWarning(RenderPipeline.prototype, 'RenderPipeline.prototype', [{
        name: 'geometryRenderer',
        suggest: 'please use camera.geometryRenderer instead.'
      }]);
    }
  };
});