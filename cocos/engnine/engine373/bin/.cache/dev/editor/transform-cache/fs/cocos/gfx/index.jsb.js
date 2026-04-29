System.register("q-bundled:///fs/cocos/gfx/index.jsb.js", ["../core/index.js", "./base/define.js", "./base/pipeline-state.js", "./base/descriptor-set.js", "./base/buffer.js", "./base/command-buffer.js", "./base/device.js", "./base/swapchain.js", "./base/framebuffer.js", "./base/input-assembler.js", "./base/descriptor-set-layout.js", "./base/pipeline-layout.js", "./base/queue.js", "./base/render-pass.js", "./base/shader.js", "./base/texture.js", "./base/states/sampler.js", "./base/states/general-barrier.js", "./base/states/texture-barrier.js", "./device-manager.js", "./deprecated-3.0.0.js"], function (_export, _context) {
  "use strict";

  var cclegacy, defines, pso, polyfillCC;
  return {
    setters: [function (_coreIndexJs) {
      cclegacy = _coreIndexJs.cclegacy;
    }, function (_baseDefineJs) {
      defines = _baseDefineJs;
      var _exportObj = {};

      for (var _key in _baseDefineJs) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _baseDefineJs[_key];
      }

      _export(_exportObj);
    }, function (_basePipelineStateJs) {
      pso = _basePipelineStateJs;
      var _exportObj2 = {};

      for (var _key2 in _basePipelineStateJs) {
        if (_key2 !== "default" && _key2 !== "__esModule") _exportObj2[_key2] = _basePipelineStateJs[_key2];
      }

      _export(_exportObj2);
    }, function (_baseDescriptorSetJs) {
      var _exportObj3 = {};

      for (var _key3 in _baseDescriptorSetJs) {
        if (_key3 !== "default" && _key3 !== "__esModule") _exportObj3[_key3] = _baseDescriptorSetJs[_key3];
      }

      _export(_exportObj3);
    }, function (_baseBufferJs) {
      var _exportObj4 = {};

      for (var _key4 in _baseBufferJs) {
        if (_key4 !== "default" && _key4 !== "__esModule") _exportObj4[_key4] = _baseBufferJs[_key4];
      }

      _export(_exportObj4);
    }, function (_baseCommandBufferJs) {
      var _exportObj5 = {};

      for (var _key5 in _baseCommandBufferJs) {
        if (_key5 !== "default" && _key5 !== "__esModule") _exportObj5[_key5] = _baseCommandBufferJs[_key5];
      }

      _export(_exportObj5);
    }, function (_baseDeviceJs) {
      var _exportObj6 = {};

      for (var _key6 in _baseDeviceJs) {
        if (_key6 !== "default" && _key6 !== "__esModule") _exportObj6[_key6] = _baseDeviceJs[_key6];
      }

      _export(_exportObj6);
    }, function (_baseSwapchainJs) {
      var _exportObj7 = {};

      for (var _key7 in _baseSwapchainJs) {
        if (_key7 !== "default" && _key7 !== "__esModule") _exportObj7[_key7] = _baseSwapchainJs[_key7];
      }

      _export(_exportObj7);
    }, function (_baseFramebufferJs) {
      var _exportObj8 = {};

      for (var _key8 in _baseFramebufferJs) {
        if (_key8 !== "default" && _key8 !== "__esModule") _exportObj8[_key8] = _baseFramebufferJs[_key8];
      }

      _export(_exportObj8);
    }, function (_baseInputAssemblerJs) {
      var _exportObj9 = {};

      for (var _key9 in _baseInputAssemblerJs) {
        if (_key9 !== "default" && _key9 !== "__esModule") _exportObj9[_key9] = _baseInputAssemblerJs[_key9];
      }

      _export(_exportObj9);
    }, function (_baseDescriptorSetLayoutJs) {
      var _exportObj10 = {};

      for (var _key10 in _baseDescriptorSetLayoutJs) {
        if (_key10 !== "default" && _key10 !== "__esModule") _exportObj10[_key10] = _baseDescriptorSetLayoutJs[_key10];
      }

      _export(_exportObj10);
    }, function (_basePipelineLayoutJs) {
      var _exportObj11 = {};

      for (var _key11 in _basePipelineLayoutJs) {
        if (_key11 !== "default" && _key11 !== "__esModule") _exportObj11[_key11] = _basePipelineLayoutJs[_key11];
      }

      _export(_exportObj11);
    }, function (_baseQueueJs) {
      var _exportObj12 = {};

      for (var _key12 in _baseQueueJs) {
        if (_key12 !== "default" && _key12 !== "__esModule") _exportObj12[_key12] = _baseQueueJs[_key12];
      }

      _export(_exportObj12);
    }, function (_baseRenderPassJs) {
      var _exportObj13 = {};

      for (var _key13 in _baseRenderPassJs) {
        if (_key13 !== "default" && _key13 !== "__esModule") _exportObj13[_key13] = _baseRenderPassJs[_key13];
      }

      _export(_exportObj13);
    }, function (_baseShaderJs) {
      var _exportObj14 = {};

      for (var _key14 in _baseShaderJs) {
        if (_key14 !== "default" && _key14 !== "__esModule") _exportObj14[_key14] = _baseShaderJs[_key14];
      }

      _export(_exportObj14);
    }, function (_baseTextureJs) {
      var _exportObj15 = {};

      for (var _key15 in _baseTextureJs) {
        if (_key15 !== "default" && _key15 !== "__esModule") _exportObj15[_key15] = _baseTextureJs[_key15];
      }

      _export(_exportObj15);
    }, function (_baseStatesSamplerJs) {
      var _exportObj16 = {};

      for (var _key16 in _baseStatesSamplerJs) {
        if (_key16 !== "default" && _key16 !== "__esModule") _exportObj16[_key16] = _baseStatesSamplerJs[_key16];
      }

      _export(_exportObj16);
    }, function (_baseStatesGeneralBarrierJs) {
      var _exportObj17 = {};

      for (var _key17 in _baseStatesGeneralBarrierJs) {
        if (_key17 !== "default" && _key17 !== "__esModule") _exportObj17[_key17] = _baseStatesGeneralBarrierJs[_key17];
      }

      _export(_exportObj17);
    }, function (_baseStatesTextureBarrierJs) {
      var _exportObj18 = {};

      for (var _key18 in _baseStatesTextureBarrierJs) {
        if (_key18 !== "default" && _key18 !== "__esModule") _exportObj18[_key18] = _baseStatesTextureBarrierJs[_key18];
      }

      _export(_exportObj18);
    }, function (_deviceManagerJs) {
      var _exportObj19 = {};

      for (var _key19 in _deviceManagerJs) {
        if (_key19 !== "default" && _key19 !== "__esModule") _exportObj19[_key19] = _deviceManagerJs[_key19];
      }

      _export(_exportObj19);
    }, function (_deprecated300Js) {}],
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
      polyfillCC = Object.assign({}, defines);
      polyfillCC.Device = gfx.Device;
      polyfillCC.Swapchain = gfx.Swapchain;
      polyfillCC.Buffer = gfx.Buffer;
      polyfillCC.Texture = gfx.Texture;
      polyfillCC.Sampler = gfx.Sampler;
      polyfillCC.Shader = gfx.Shader;
      polyfillCC.InputAssembler = gfx.InputAssembler;
      polyfillCC.RenderPass = gfx.RenderPass;
      polyfillCC.Framebuffer = gfx.Framebuffer;
      polyfillCC.DescriptorSet = gfx.DescriptorSet;
      polyfillCC.DescriptorSetLayout = gfx.DescriptorSetLayout;
      polyfillCC.PipelineLayout = gfx.PipelineLayout;
      polyfillCC.PipelineState = gfx.PipelineState;
      polyfillCC.CommandBuffer = gfx.CommandBuffer;
      polyfillCC.Queue = gfx.Queue;
      cclegacy.gfx = polyfillCC;
      polyfillCC.BlendTarget = pso.BlendTarget;
      polyfillCC.BlendState = pso.BlendState;
      polyfillCC.RasterizerState = pso.RasterizerState;
      polyfillCC.DepthStencilState = pso.DepthStencilState;
      polyfillCC.PipelineStateInfo = pso.PipelineStateInfo;
    }
  };
});