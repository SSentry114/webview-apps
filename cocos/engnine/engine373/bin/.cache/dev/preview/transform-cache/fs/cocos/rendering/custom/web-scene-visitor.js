System.register("q-bundled:///fs/cocos/rendering/custom/web-scene-visitor.js", [], function (_export, _context) {
  "use strict";

  var WebSceneVisitor;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [],
    execute: function () {
      /****************************************************************************
       Copyright (c) 2021-2023 Xiamen Yaji Software Co., Ltd.
      
       http://www.cocos.com
      
       Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated documentation files (the "Software"), to deal
       in the Software without restriction, including without limitation the rights to
       use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
       of the Software, and to permit persons to whom the Software is furnished to do so,
       subject to the following conditions:
      
       The above copyright notice and this permission notice shall be included in
       all copies or substantial portions of the Software.
      
       THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
      ****************************************************************************/
      _export("WebSceneVisitor", WebSceneVisitor = /*#__PURE__*/function () {
        function WebSceneVisitor(commandBuffer, pipelineSceneData) {
          this._pipelineSceneData = void 0;
          this._commandBuffer = void 0;
          this._pipelineSceneData = pipelineSceneData;
          this._commandBuffer = commandBuffer;
        }

        var _proto = WebSceneVisitor.prototype;

        _proto.setViewport = function setViewport(vp) {
          this._commandBuffer.setViewport(vp);
        };

        _proto.setScissor = function setScissor(rect) {
          this._commandBuffer.setScissor(rect);
        };

        _proto.bindPipelineState = function bindPipelineState(pso) {
          this._commandBuffer.bindPipelineState(pso);
        };

        _proto.bindDescriptorSet = function bindDescriptorSet(set, descriptorSet, dynamicOffsets) {
          this._commandBuffer.bindDescriptorSet(set, descriptorSet, dynamicOffsets);
        };

        _proto.bindInputAssembler = function bindInputAssembler(ia) {
          this._commandBuffer.bindInputAssembler(ia);
        };

        _proto.draw = function draw(info) {
          this._commandBuffer.draw(info);
        };

        _proto.updateBuffer = function updateBuffer(buffer, data, size) {
          this._commandBuffer.updateBuffer(buffer, data, size);
        };

        _createClass(WebSceneVisitor, [{
          key: "pipelineSceneData",
          get: function get() {
            return this._pipelineSceneData;
          }
        }]);

        return WebSceneVisitor;
      }());
    }
  };
});