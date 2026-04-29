System.register("q-bundled:///fs/cocos/rendering/pipeline-event.js", ["../core/index.js"], function (_export, _context) {
  "use strict";

  var EventTarget, PipelineEventProcessor, PipelineEventType;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export({
    PipelineEventProcessor: void 0,
    PipelineEventType: void 0
  });

  return {
    setters: [function (_coreIndexJs) {
      EventTarget = _coreIndexJs.EventTarget;
    }],
    execute: function () {
      (function (PipelineEventType) {
        PipelineEventType["RENDER_FRAME_BEGIN"] = "render-frame-begin";
        PipelineEventType["RENDER_FRAME_END"] = "render-frame-end";
        PipelineEventType["RENDER_CAMERA_BEGIN"] = "render-camera-begin";
        PipelineEventType["RENDER_CAMERA_END"] = "render-camera-end";
        PipelineEventType["ATTACHMENT_SCALE_CAHNGED"] = "attachment-scale-changed";
      })(PipelineEventType || _export("PipelineEventType", PipelineEventType = {}));

      _export("PipelineEventProcessor", PipelineEventProcessor = class PipelineEventProcessor extends EventTarget {
        constructor(...args) {
          super(...args);
          this.eventTargetOn = super.on;
          this.eventTargetOnce = super.once;
        }

        on(type, callback, target, once) {
          return this.eventTargetOn(type, callback, target, once);
        }

        once(type, callback, target) {
          return this.eventTargetOnce(type, callback, target);
        }

      });
    }
  };
});