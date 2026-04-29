System.register("q-bundled:///fs/cocos/spine/track-entry-listeners.js", [], function (_export, _context) {
  "use strict";

  var TrackEntryListeners;

  _export("TrackEntryListeners", void 0);

  return {
    setters: [],
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
      _export("TrackEntryListeners", TrackEntryListeners = class TrackEntryListeners {
        constructor() {
          this.start = void 0;
          this.interrupt = void 0;
          this.end = void 0;
          this.dispose = void 0;
          this.complete = void 0;
          this.event = void 0;
        }

        static getListeners(entry) {
          if (!entry.listener) {
            entry.listener = new TrackEntryListeners();
          }

          return entry.listener;
        }

      });
    }
  };
});