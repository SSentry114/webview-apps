System.register("q-bundled:///fs/cocos/rendering/render-batched-queue.js", ["./pipeline-state-manager.js", "./define.js"], function (_export, _context) {
  "use strict";

  var PipelineStateManager, SetIndex, RenderBatchedQueue;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("RenderBatchedQueue", void 0);

  return {
    setters: [function (_pipelineStateManagerJs) {
      PipelineStateManager = _pipelineStateManagerJs.PipelineStateManager;
    }, function (_defineJs) {
      SetIndex = _defineJs.SetIndex;
    }],
    execute: function () {
      /**
       * @en The render queue for dynamic batching
       * @zh 渲染合批队列。
       */
      _export("RenderBatchedQueue", RenderBatchedQueue = class RenderBatchedQueue {
        constructor() {
          this.queue = new Set();
        }

        /**
         * @en Clear the render queue
         * @zh 清空渲染队列。
         */
        clear() {
          const it = this.queue.values();
          let res = it.next();

          while (!res.done) {
            res.value.clear();
            res = it.next();
          }

          this.queue.clear();
        }

        uploadBuffers(cmdBuff) {
          const it = this.queue.values();
          let res = it.next();

          while (!res.done) {
            for (let b = 0; b < res.value.batches.length; ++b) {
              const batch = res.value.batches[b];

              if (!batch.mergeCount) {
                continue;
              }

              for (let v = 0; v < batch.vbs.length; ++v) {
                batch.vbs[v].update(batch.vbDatas[v]);
              }

              cmdBuff.updateBuffer(batch.vbIdx, batch.vbIdxData.buffer);
              cmdBuff.updateBuffer(batch.ubo, batch.uboData);
            }

            res = it.next();
          }
        }
        /**
         * @en Record command buffer for the current queue
         * @zh 记录命令缓冲。
         * @param cmdBuff The command buffer to store the result
         */


        recordCommandBuffer(device, renderPass, cmdBuff, descriptorSet = null, dynamicOffsets) {
          const it = this.queue.values();
          let res = it.next();

          while (!res.done) {
            let boundPSO = false;

            for (let b = 0; b < res.value.batches.length; ++b) {
              const batch = res.value.batches[b];

              if (!batch.mergeCount) {
                continue;
              }

              if (!boundPSO) {
                const shader = batch.shader;
                const pso = PipelineStateManager.getOrCreatePipelineState(device, batch.pass, shader, renderPass, batch.ia);
                cmdBuff.bindPipelineState(pso);
                cmdBuff.bindDescriptorSet(SetIndex.MATERIAL, batch.pass.descriptorSet);
                boundPSO = true;
              }

              if (descriptorSet) cmdBuff.bindDescriptorSet(SetIndex.GLOBAL, descriptorSet);

              if (dynamicOffsets) {
                cmdBuff.bindDescriptorSet(SetIndex.LOCAL, batch.descriptorSet, dynamicOffsets);
              } else {
                cmdBuff.bindDescriptorSet(SetIndex.LOCAL, batch.descriptorSet, res.value.dynamicOffsets);
              }

              cmdBuff.bindInputAssembler(batch.ia);
              cmdBuff.draw(batch.ia);
            }

            res = it.next();
          }
        }

      });
    }
  };
});