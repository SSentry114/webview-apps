System.register("q-bundled:///fs/cocos/gfx/webgl2/states/webgl2-sampler.js", ["../../base/states/sampler.js", "../webgl2-commands.js", "../webgl2-define.js"], function (_export, _context) {
  "use strict";

  var Sampler, WebGL2CmdFuncDestroySampler, WebGL2CmdFuncPrepareSamplerInfo, WebGL2DeviceManager, WebGL2Sampler;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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
      _export("WebGL2Sampler", WebGL2Sampler = /*#__PURE__*/function (_Sampler) {
        _inheritsLoose(WebGL2Sampler, _Sampler);

        function WebGL2Sampler(info, hash) {
          var _this;

          _this = _Sampler.call(this, info, hash) || this;
          _this._gpuSampler = null;
          _this._gpuSampler = {
            glSamplers: new Map(),
            minFilter: _this._info.minFilter,
            magFilter: _this._info.magFilter,
            mipFilter: _this._info.mipFilter,
            addressU: _this._info.addressU,
            addressV: _this._info.addressV,
            addressW: _this._info.addressW,
            glMinFilter: 0,
            glMagFilter: 0,
            glWrapS: 0,
            glWrapT: 0,
            glWrapR: 0,
            getGLSampler: function getGLSampler(device, minLod, maxLod) {
              var gl = device.gl;
              var samplerHash = minLod << 16 | maxLod;

              if (!this.glSamplers.has(samplerHash)) {
                var glSampler = gl.createSampler();

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

              var sampler = this.glSamplers.get(samplerHash);
              return sampler;
            }
          };
          WebGL2CmdFuncPrepareSamplerInfo(WebGL2DeviceManager.instance, _this._gpuSampler);
          return _this;
        }

        var _proto = WebGL2Sampler.prototype;

        _proto.destroy = function destroy() {
          if (this._gpuSampler) {
            WebGL2CmdFuncDestroySampler(WebGL2DeviceManager.instance, this._gpuSampler);
            this._gpuSampler = null;
          }
        };

        _createClass(WebGL2Sampler, [{
          key: "gpuSampler",
          get: function get() {
            return this._gpuSampler;
          }
        }]);

        return WebGL2Sampler;
      }(Sampler));
    }
  };
});