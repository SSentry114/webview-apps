System.register("q-bundled:///fs/cocos/webgpu/instantiated.js", ["../../../virtual/internal%253Aconstants.js", "../../../virtual/url%253Anative%252Fexternal%252Femscripten%252Fwebgpu%252Fwebgpu_wasm.wasm.js", "../../../virtual/url%253Anative%252Fexternal%252Femscripten%252Fwebgpu%252Fglslang.wasm.js", "./webgpu_wasm.js", "./glslang.js", "../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var WEBGPU, webgpuUrl, glslangUrl, wasmDevice, glslangLoader, legacyCC, glslalgWasmModule, gfx, webgpuAdapter, promiseForWebGPUInstantiation, intervalId;
  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      WEBGPU = _virtualInternal253AconstantsJs.WEBGPU;
    }, function (_virtualUrl253Anative252Fexternal252Femscripten252Fwebgpu252Fwebgpu_wasmWasmJs) {
      webgpuUrl = _virtualUrl253Anative252Fexternal252Femscripten252Fwebgpu252Fwebgpu_wasmWasmJs.default;
    }, function (_virtualUrl253Anative252Fexternal252Femscripten252Fwebgpu252FglslangWasmJs) {
      glslangUrl = _virtualUrl253Anative252Fexternal252Femscripten252Fwebgpu252FglslangWasmJs.default;
    }, function (_webgpu_wasmJs) {
      wasmDevice = _webgpu_wasmJs.default;
    }, function (_glslangJs) {
      glslangLoader = _glslangJs.default;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
      /* eslint-disable @typescript-eslint/no-floating-promises */

      /* eslint-disable no-void */

      /*
       Copyright (c) 2022-2023 Xiamen Yaji Software Co., Ltd.
      
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
      _export("glslalgWasmModule", glslalgWasmModule = {
        glslang: null
      });

      _export("gfx", gfx = legacyCC.gfx = {
        wasmBinary: null,
        nativeDevice: null
      });

      _export("webgpuAdapter", webgpuAdapter = {
        adapter: null,
        device: null
      });

      _export("promiseForWebGPUInstantiation", promiseForWebGPUInstantiation = (() => {
        if (WEBGPU) {
          return Promise.all([// @ts-expect-error The 'import.meta' meta-property is only allowed when the '--module' option is 'es2020', 'es2022', 'esnext', 'system', 'node16', or 'nodenext'.
          glslangLoader(new URL(glslangUrl, _context.meta.url).href).then(res => {
            glslalgWasmModule.glslang = res;
          }), new Promise(resolve => {
            // @ts-expect-error The 'import.meta' meta-property is only allowed when the '--module' option is 'es2020', 'es2022', 'esnext', 'system', 'node16', or 'nodenext'.
            fetch(new URL(webgpuUrl, _context.meta.url).href).then(response => {
              response.arrayBuffer().then(buffer => {
                gfx.wasmBinary = buffer;
                wasmDevice(gfx).then(() => {
                  legacyCC.WebGPUDevice = gfx.CCWGPUDevice;
                  resolve();
                });
              });
            });
          }), new Promise(resolve => {
            navigator.gpu.requestAdapter().then(adapter => {
              adapter.requestDevice().then(device => {
                webgpuAdapter.adapter = adapter;
                webgpuAdapter.device = device;
                console.log(gfx);
                resolve();
              });
            });
          })]).then(() => Promise.resolve());
        }

        return Promise.resolve();
      })());

      if (WEBGPU) {
        intervalId = setInterval(() => {
          if (legacyCC.game) {
            legacyCC.game.onPreInfrastructureInitDelegate.add(() => promiseForWebGPUInstantiation);
            clearInterval(intervalId);
          }
        }, 10);
      }
    }
  };
});