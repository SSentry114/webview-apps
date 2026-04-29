System.register("q-bundled:///fs/cocos/rendering/render-instanced-queue.js", ["./pipeline-state-manager.js", "./define.js"], function (_export, _context) {
  "use strict";

  var PipelineStateManager, SetIndex, RenderInstancedQueue;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_pipelineStateManagerJs) {
      PipelineStateManager = _pipelineStateManagerJs.PipelineStateManager;
    }, function (_defineJs) {
      SetIndex = _defineJs.SetIndex;
    }],
    execute: function () {
      /**
       * @en Render queue for instanced batching
       * @zh 渲染合批队列。
       */
      _export("RenderInstancedQueue", RenderInstancedQueue = /*#__PURE__*/function () {
        function RenderInstancedQueue() {
          this.queue = new Set();
          this._renderQueue = [];
        }

        var _proto = RenderInstancedQueue.prototype;

        /**
         * @en Clear the render queue
         * @zh 清空渲染队列。
         */
        _proto.clear = function clear() {
          var it = this.queue.values();
          var res = it.next();

          while (!res.done) {
            res.value.clear();
            res = it.next();
          }

          this._renderQueue.length = 0;
          this.queue.clear();
        };

        _proto.sort = function sort() {
          var it = this.queue.values();
          var res = it.next();

          while (!res.done) {
            if (!res.value.pass.blendState.targets[0].blend) {
              this._renderQueue.push(res.value);
            }

            res = it.next();
          }

          it = this.queue.values();
          res = it.next();

          while (!res.done) {
            if (res.value.pass.blendState.targets[0].blend) {
              this._renderQueue.push(res.value);
            }

            res = it.next();
          }
        };

        _proto.uploadBuffers = function uploadBuffers(cmdBuff) {
          var it = this.queue.values();
          var res = it.next();

          while (!res.done) {
            if (res.value.hasPendingModels) res.value.uploadBuffers(cmdBuff);
            res = it.next();
          }
        }
        /**
         * @en Record command buffer for the current queue
         * @zh 记录命令缓冲。
         * @param cmdBuff The command buffer to store the result
         */
        ;

        _proto.recordCommandBuffer = function recordCommandBuffer(device, renderPass, cmdBuff, descriptorSet, dynamicOffsets) {
          if (descriptorSet === void 0) {
            descriptorSet = null;
          }

          var it = this._renderQueue.length === 0 ? this.queue.values() : this._renderQueue.values();
          var res = it.next();

          while (!res.done) {
            var _res$value = res.value,
                instances = _res$value.instances,
                pass = _res$value.pass,
                hasPendingModels = _res$value.hasPendingModels;

            if (hasPendingModels) {
              cmdBuff.bindDescriptorSet(SetIndex.MATERIAL, pass.descriptorSet);
              var lastPSO = null;

              for (var b = 0; b < instances.length; ++b) {
                var instance = instances[b];

                if (!instance.count) {
                  continue;
                }

                var shader = instance.shader;
                var pso = PipelineStateManager.getOrCreatePipelineState(device, pass, shader, renderPass, instance.ia);

                if (lastPSO !== pso) {
                  cmdBuff.bindPipelineState(pso);
                  lastPSO = pso;
                }

                if (descriptorSet) cmdBuff.bindDescriptorSet(SetIndex.GLOBAL, descriptorSet);

                if (dynamicOffsets) {
                  cmdBuff.bindDescriptorSet(SetIndex.LOCAL, instance.descriptorSet, dynamicOffsets);
                } else {
                  cmdBuff.bindDescriptorSet(SetIndex.LOCAL, instance.descriptorSet, res.value.dynamicOffsets);
                }

                cmdBuff.bindInputAssembler(instance.ia);
                cmdBuff.draw(instance.ia);
              }
            }

            res = it.next();
          }
        };

        return RenderInstancedQueue;
      }());
    }
  };
});