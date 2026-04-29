System.register("q-bundled:///fs/cocos/gfx/webgl2/states/webgl2-sampler.js", ["../../base/states/sampler.js", "../webgl2-commands.js", "../webgl2-define.js"], function (_export, _context) {
  "use strict";

  var Sampler, WebGL2CmdFuncDestroySampler, WebGL2CmdFuncPrepareSamplerInfo, WebGL2DeviceManager, WebGL2Sampler;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("WebGL2Sampler", void 0);

  return {
    setters: [function (_baseStatesSamplerJs) {
      Sampler = _baseStatesSamplerJs.Sampler;
    }, function (_webgl2CommandsJs) {
      WebGL2CmdFuncDestroySampler = _webgl2CommandsJs.WebGL2CmdFuncDestroySampler;
      WebGL2CmdFuncPrepareSamplerInfo = _webgl2CommandsJs.WebGL2CmdFuncPrepareSamplerInfo;
    }, function (_webgl2DefineJs) {
      WebGL2DeviceManager = _webgl2DefineJs.WebGL2DeviceManager;
    }],
    execute: function () {
      _export("WebGL2Sampler", WebGL2Sampler = class WebGL2Sampler extends Sampler {
        get gpuSampler() {
          return this._gpuSampler;
        }

        constructor(info, hash) {
          super(info, hash);
          this._gpuSampler = null;
          this._gpuSampler = {
            glSamplers: new Map(),
            minFilter: this._info.minFilter,
            magFilter: this._info.magFilter,
            mipFilter: this._info.mipFilter,
            addressU: this._info.addressU,
            addressV: this._info.addressV,
            addressW: this._info.addressW,
            glMinFilter: 0,
            glMagFilter: 0,
            glWrapS: 0,
            glWrapT: 0,
            glWrapR: 0,

            getGLSampler(device, minLod, maxLod) {
              const {
                gl
              } = device;
              const samplerHash = minLod << 16 | maxLod;

              if (!this.glSamplers.has(samplerHash)) {
                const glSampler = gl.createSampler();

                if (glSampler) {
                  this.glSamplers.set(samplerHash, glSampler);
                  gl.samplerParameteri(glSampler, gl.TEXTURE_MIN_FILTER, this.glMinFilter);
                  gl.samplerParameteri(glSampler, gl.TEXTURE_MAG_FILTER, this.glMagFilter);
                  gl.samplerParameteri(glSampler, gl.TEXTURE_WRAP_S, this.glWrapS);
                  gl.samplerParameteri(glSampler, gl.TEXTURE_WRAP_T, this.glWrapT);
                  gl.samplerParameteri(glSampler, gl.TEXTURE_WRAP_R, this.glWrapR);
                  gl.samplerParameterf(glSampler, gl.TEXTURE_MIN_LOD, minLod);
                  gl.samplerParameterf(glSampler, gl.TEXTURE_MAX_LOD, maxLod);
                }
              }

              const sampler = this.glSamplers.get(samplerHash);
              return sampler;
            }

          };
          WebGL2CmdFuncPrepareSamplerInfo(WebGL2DeviceManager.instance, this._gpuSampler);
        }

        destroy() {
          if (this._gpuSampler) {
            WebGL2CmdFuncDestroySampler(WebGL2DeviceManager.instance, this._gpuSampler);
            this._gpuSampler = null;
          }
        }

      });
    }
  };
});