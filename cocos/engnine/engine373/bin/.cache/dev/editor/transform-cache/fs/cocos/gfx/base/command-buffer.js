System.register("q-bundled:///fs/cocos/gfx/base/command-buffer.js", ["./define.js"], function (_export, _context) {
  "use strict";

  var GFXObject, ObjectType, CommandBufferType, CommandBuffer;

  _export("CommandBuffer", void 0);

  return {
    setters: [function (_defineJs) {
      GFXObject = _defineJs.GFXObject;
      ObjectType = _defineJs.ObjectType;
      CommandBufferType = _defineJs.CommandBufferType;
    }],
    execute: function () {
      /*
       Copyright (c) 2020-2023 Xiamen Yaji Software Co., Ltd.
      
       https://www.cocos.com/
      
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
      */

      /**
       * @en GFX command buffer.
       * @zh GFX 命令缓冲。
       */
      _export("CommandBuffer", CommandBuffer = class CommandBuffer extends GFXObject {
        /**
         * @en Type of the command buffer.
         * @zh 命令缓冲类型。
         */
        get type() {
          return this._type;
        }
        /**
         * @en Type of the command buffer.
         * @zh 命令缓冲类型。
         */


        get queue() {
          return this._queue;
        }
        /**
         * @en Number of draw calls currently recorded.
         * @zh 绘制调用次数。
         */


        get numDrawCalls() {
          return this._numDrawCalls;
        }
        /**
         * @en Number of instances currently recorded.
         * @zh 绘制 Instance 数量。
         */


        get numInstances() {
          return this._numInstances;
        }
        /**
         * @en Number of triangles currently recorded.
         * @zh 绘制三角形数量。
         */


        get numTris() {
          return this._numTris;
        }

        constructor() {
          super(ObjectType.COMMAND_BUFFER);
          this._queue = null;
          this._type = CommandBufferType.PRIMARY;
          this._numDrawCalls = 0;
          this._numInstances = 0;
          this._numTris = 0;
        }

      });
    }
  };
});