System.register("q-bundled:///fs/cocos/asset/asset-manager/request-item.js", [], function (_export, _context) {
  "use strict";

  var RequestItem;

  _export("default", void 0);

  return {
    setters: [],
    execute: function () {
      /*
       Copyright (c) 2019-2023 Xiamen Yaji Software Co., Ltd.
      
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
       * @en
       * A collection of information about a request.
       *
       * @zh
       * 请求的相关信息集合。
       *
       */
      _export("default", RequestItem = class RequestItem {
        constructor() {
          this.uuid = '';
          this.overrideUuid = '';
          this.url = '';
          this.ext = '.json';
          this.content = null;
          this.file = null;
          this.info = null;
          this.config = null;
          this.isNative = false;
          this.options = Object.create(null);
          this._id = '';
        }

        /**
         * @en
         * The id of request, combined from uuid and isNative.
         *
         * @zh
         * 请求的 id, 由 uuid 和 isNative 组合而成。
         */
        get id() {
          if (!this._id) {
            this._id = `${this.overrideUuid || this.uuid}@${this.isNative ? 'native' : 'import'}`;
          }

          return this._id;
        }
        /**
         * @engineInternal
         */


        /**
         * @en
         * Create a new request item from pool.
         *
         * @zh
         * 从对象池中创建 requestItem。
         *
         * @returns @en return a newly created RequestItem. @zh 返回一个刚创建的 `RequestItem`。
         *
         */
        static create() {
          let out;

          if (RequestItem._deadPool.length !== 0) {
            out = RequestItem._deadPool.pop();
          } else {
            out = new RequestItem();
          }

          return out;
        }

        /**
         * @en
         * Recycle this to be reused.
         *
         * @zh
         * 回收 requestItem 用于复用。
         *
         */
        recycle() {
          if (RequestItem._deadPool.length === RequestItem.MAX_DEAD_NUM) {
            return;
          }

          this._id = '';
          this.uuid = '';
          this.overrideUuid = '';
          this.url = '';
          this.ext = '.json';
          this.content = null;
          this.file = null;
          this.info = null;
          this.config = null;
          this.isNative = false;
          this.options = Object.create(null);

          RequestItem._deadPool.push(this);
        }

      });

      RequestItem.MAX_DEAD_NUM = 500;
      RequestItem._deadPool = [];
    }
  };
});