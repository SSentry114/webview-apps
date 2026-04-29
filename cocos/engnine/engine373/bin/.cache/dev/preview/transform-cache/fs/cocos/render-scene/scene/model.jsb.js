System.register("q-bundled:///fs/cocos/render-scene/scene/model.jsb.js", ["../../gfx/index.js"], function (_export, _context) {
  "use strict";

  var deviceManager, ModelType, Model, modelProto, oldCreateBoundingShape;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("ModelType", void 0);

  return {
    setters: [function (_gfxIndexJs) {
      deviceManager = _gfxIndexJs.deviceManager;
    }],
    execute: function () {
      (function (ModelType) {
        ModelType[ModelType["DEFAULT"] = 0] = "DEFAULT";
        ModelType[ModelType["SKINNING"] = 1] = "SKINNING";
        ModelType[ModelType["BAKED_SKINNING"] = 2] = "BAKED_SKINNING";
        ModelType[ModelType["BATCH_2D"] = 3] = "BATCH_2D";
        ModelType[ModelType["PARTICLE_BATCH"] = 4] = "PARTICLE_BATCH";
        ModelType[ModelType["LINE"] = 5] = "LINE";
      })(ModelType || _export("ModelType", ModelType = {}));

      _export("Model", Model = jsb.Model);

      modelProto = Model.prototype;

      modelProto._ctor = function () {
        this._device = deviceManager.gfxDevice;
      };

      oldCreateBoundingShape = modelProto.createBoundingShape;

      modelProto.createBoundingShape = function (minPos, maxPos) {
        if (!minPos || !maxPos) {
          return;
        }

        oldCreateBoundingShape.call(this, minPos, maxPos);
      };
    }
  };
});