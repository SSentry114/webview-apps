System.register("q-bundled:///fs/cocos/game/splash-screen.js", ["../../../virtual/internal%253Aconstants.js", "../asset/assets/material.js", "../core/index.js", "../gfx/index.js", "../rendering/index.js", "../rendering/define.js", "../core/global-exports.js", "../xr/xr-enums.js"], function (_export, _context) {
  "use strict";

  var EDITOR, TAOBAO, Material, clamp01, Mat4, Vec2, Settings, settings, sys, cclegacy, easing, preTransforms, SamplerInfo, TextureInfo, InputAssemblerInfo, Attribute, BufferInfo, Rect, Color, BufferTextureCopy, BufferUsageBit, Format, MemoryUsageBit, TextureType, TextureUsageBit, Address, PipelineStateManager, SetIndex, ccwindow, legacyCC, XREye, SplashScreen, v2_0;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("SplashScreen", void 0);

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      TAOBAO = _virtualInternal253AconstantsJs.TAOBAO;
    }, function (_assetAssetsMaterialJs) {
      Material = _assetAssetsMaterialJs.Material;
    }, function (_coreIndexJs) {
      clamp01 = _coreIndexJs.clamp01;
      Mat4 = _coreIndexJs.Mat4;
      Vec2 = _coreIndexJs.Vec2;
      Settings = _coreIndexJs.Settings;
      settings = _coreIndexJs.settings;
      sys = _coreIndexJs.sys;
      cclegacy = _coreIndexJs.cclegacy;
      easing = _coreIndexJs.easing;
      preTransforms = _coreIndexJs.preTransforms;
    }, function (_gfxIndexJs) {
      SamplerInfo = _gfxIndexJs.SamplerInfo;
      TextureInfo = _gfxIndexJs.TextureInfo;
      InputAssemblerInfo = _gfxIndexJs.InputAssemblerInfo;
      Attribute = _gfxIndexJs.Attribute;
      BufferInfo = _gfxIndexJs.BufferInfo;
      Rect = _gfxIndexJs.Rect;
      Color = _gfxIndexJs.Color;
      BufferTextureCopy = _gfxIndexJs.BufferTextureCopy;
      BufferUsageBit = _gfxIndexJs.BufferUsageBit;
      Format = _gfxIndexJs.Format;
      MemoryUsageBit = _gfxIndexJs.MemoryUsageBit;
      TextureType = _gfxIndexJs.TextureType;
      TextureUsageBit = _gfxIndexJs.TextureUsageBit;
      Address = _gfxIndexJs.Address;
    }, function (_renderingIndexJs) {
      PipelineStateManager = _renderingIndexJs.PipelineStateManager;
    }, function (_renderingDefineJs) {
      SetIndex = _renderingDefineJs.SetIndex;
    }, function (_coreGlobalExportsJs) {
      ccwindow = _coreGlobalExportsJs.ccwindow;
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_xrXrEnumsJs) {
      XREye = _xrXrEnumsJs.XREye;
    }],
    execute: function () {
      v2_0 = new Vec2();

      _export("SplashScreen", SplashScreen = class SplashScreen {
        // layout
        // Percent
        // Percent
        // font size
        // line height
        // Percent
        // px
        // px
        get isFinished() {
          return this._curTime >= this.settings.totalTime;
        }

        set curTime(val) {
          this._curTime = val;
        }

        get curTime() {
          return this._curTime;
        }

        init() {
          var _settings$querySettin, _settings$querySettin2, _settings$querySettin3, _settings$querySettin4, _settings$querySettin5, _settings$querySettin6, _settings$querySettin7, _settings$querySettin8;

          this.settings = {
            displayRatio: (_settings$querySettin = settings.querySettings(Settings.Category.SPLASH_SCREEN, 'displayRatio')) !== null && _settings$querySettin !== void 0 ? _settings$querySettin : 0.4,
            totalTime: (_settings$querySettin2 = settings.querySettings(Settings.Category.SPLASH_SCREEN, 'totalTime')) !== null && _settings$querySettin2 !== void 0 ? _settings$querySettin2 : 3000,
            watermarkLocation: (_settings$querySettin3 = settings.querySettings(Settings.Category.SPLASH_SCREEN, 'watermarkLocation')) !== null && _settings$querySettin3 !== void 0 ? _settings$querySettin3 : 'default',
            autoFit: (_settings$querySettin4 = settings.querySettings(Settings.Category.SPLASH_SCREEN, 'autoFit')) !== null && _settings$querySettin4 !== void 0 ? _settings$querySettin4 : true,
            url: (_settings$querySettin5 = settings.querySettings(Settings.Category.SPLASH_SCREEN, 'url')) !== null && _settings$querySettin5 !== void 0 ? _settings$querySettin5 : '',
            type: (_settings$querySettin6 = settings.querySettings(Settings.Category.SPLASH_SCREEN, 'type')) !== null && _settings$querySettin6 !== void 0 ? _settings$querySettin6 : 'default',
            bgBase64: (_settings$querySettin7 = settings.querySettings(Settings.Category.SPLASH_SCREEN, 'bgBase64')) !== null && _settings$querySettin7 !== void 0 ? _settings$querySettin7 : '',
            base64src: (_settings$querySettin8 = settings.querySettings(Settings.Category.SPLASH_SCREEN, 'base64src')) !== null && _settings$querySettin8 !== void 0 ? _settings$querySettin8 : ''
          };
          this._curTime = 0; // TODO: Image can't load with base64 data on Taobao platform.

          if (EDITOR || TAOBAO || this.settings.base64src === '' || this.settings.totalTime <= 0) {
            this.settings.totalTime = 0;
          } else {
            this.device = cclegacy.director.root.device;
            this.swapchain = cclegacy.director.root.mainWindow.swapchain;
            this.preInit();
            this.initLayout();
            this.initWaterMark();
            const bgPromise = new Promise((resolve, reject) => {
              this.bgImage = new ccwindow.Image();

              this.bgImage.onload = () => {
                this.initBG();
                resolve();
              };

              this.bgImage.onerror = () => {
                reject();
              };

              this.bgImage.src = this.settings.bgBase64;
            });
            const logoPromise = new Promise((resolve, reject) => {
              this.logoImage = new ccwindow.Image();

              this.logoImage.onload = () => {
                this.initLogo();
                resolve();
              };

              this.logoImage.onerror = () => {
                reject();
              };

              this.logoImage.src = this.settings.base64src;
            });
            return Promise.all([bgPromise, logoPromise]);
          }

          return Promise.resolve([]);
        }

        preInit() {
          this.clearColors = [new Color(0, 0, 0, 255)]; // clean to black

          const {
            device,
            swapchain
          } = this;
          this.renderArea = new Rect(0, 0, swapchain.width, swapchain.height);
          this.cmdBuff = device.commandBuffer; // create input assembler
          // create vertex buffer

          const verts = new Float32Array([0.5, 0.5, 1, 0, -0.5, 0.5, 0, 0, 0.5, -0.5, 1, 1, -0.5, -0.5, 0, 1]);
          const vbStride = Float32Array.BYTES_PER_ELEMENT * 4;
          const vbSize = vbStride * 4;
          this.vertexBuffers = device.createBuffer(new BufferInfo(BufferUsageBit.VERTEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.DEVICE, vbSize, vbStride));
          this.vertexBuffers.update(verts); // create index buffer

          const indices = new Uint16Array([0, 1, 2, 1, 3, 2]);
          const ibStride = Uint16Array.BYTES_PER_ELEMENT;
          const ibSize = ibStride * 6;
          this.indicesBuffers = device.createBuffer(new BufferInfo(BufferUsageBit.INDEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.DEVICE, ibSize, ibStride));
          this.indicesBuffers.update(indices);
          const attributes = [new Attribute('a_position', Format.RG32F), new Attribute('a_texCoord', Format.RG32F)];
          const IAInfo = new InputAssemblerInfo(attributes, [this.vertexBuffers], this.indicesBuffers);
          this.quadAssmebler = device.createInputAssembler(IAInfo);
          this.projection = new Mat4();
          Mat4.ortho(this.projection, -1, 1, -1, 1, -1, 1, device.capabilities.clipSpaceMinZ, device.capabilities.clipSpaceSignY, swapchain.surfaceTransform);
          this.isMobile = sys.isMobile;
        }

        initLayout() {
          if (this.isMobile) {
            this.bgWidth = 812;
            this.bgHeight = 375;
            this.logoWidthTemp = 70;
            this.logoHeightTemp = 100;
            this.logoXTrans = 1 / 2; // Percent

            this.logoYTrans = 2 / 3; // Percent

            this.textSize = 12; // font size

            this.textHeight = this.textSize + this.textExpandSize; // line height

            this.textXTrans = 1 / 2; // Percent

            this.textYExtraTrans = 16; // px
          } else {
            this.bgWidth = 1920;
            this.bgHeight = 1080;
            this.logoWidthTemp = 140;
            this.logoHeightTemp = 200;
            this.logoXTrans = 1 / 2; // Percent

            this.logoYTrans = 1 / 6 + 2.5 / 6; // Percent

            this.textSize = 24; // font size

            this.textHeight = this.textSize + this.textExpandSize; // line height

            this.textXTrans = 1 / 2; // Percent

            this.textYExtraTrans = 32; // px
          }

          this.initScale();
        }

        initScale() {
          const dw = this.swapchain.width;
          const dh = this.swapchain.height;
          let desiredWidth = this.isMobile ? 375 : 1080;
          let desiredHeight = this.isMobile ? 812 : 1920;

          if (dw > dh) {
            const temp = desiredHeight;
            desiredHeight = desiredWidth;
            desiredWidth = temp;
          }

          if (dw / dh > 16 / 9) {
            this.scaleSize = dh / desiredHeight;
          } else {
            this.scaleSize = dw / desiredWidth;
          }
        }

        update(deltaTime) {
          const settings = this.settings;
          const {
            device,
            swapchain
          } = this;
          Mat4.ortho(this.projection, -1, 1, -1, 1, -1, 1, device.capabilities.clipSpaceMinZ, device.capabilities.clipSpaceSignY, swapchain.surfaceTransform);
          const dw = swapchain.width;
          const dh = swapchain.height;
          this.initScale();
          this._curTime += deltaTime * 1000;
          const percent = clamp01(this._curTime / settings.totalTime);
          const u_p = easing.cubicOut(percent); // update bg uniform

          let scaleX = 1;
          let scaleY = 1;

          if (dw < dh) {
            scaleX = dh * this.bgRatio;
            scaleY = dh;
          } else {
            scaleX = dw;
            scaleY = dw * this.bgRatio;
          }

          this.bgMat.setProperty('resolution', v2_0.set(dw, dh), 0);
          this.bgMat.setProperty('scale', v2_0.set(scaleX, scaleY), 0);
          this.bgMat.setProperty('translate', v2_0.set(dw * 0.5, dh * 0.5), 0);
          this.bgMat.setProperty('percent', 1.0);
          this.bgMat.setProperty('u_projection', this.projection);
          this.bgMat.passes[0].update(); // update logo uniform

          scaleX = 1;
          scaleY = 1;
          scaleX = this.logoWidth * this.scaleSize * settings.displayRatio;
          scaleY = this.logoHeight * this.scaleSize * settings.displayRatio;
          const logoYTrans = dh * this.logoYTrans;
          this.logoMat.setProperty('resolution', v2_0.set(dw, dh), 0);
          this.logoMat.setProperty('scale', v2_0.set(scaleX, scaleY), 0);
          this.logoMat.setProperty('translate', v2_0.set(dw * this.logoXTrans, logoYTrans), 0);
          this.logoMat.setProperty('percent', u_p);
          this.logoMat.setProperty('u_projection', this.projection);
          this.logoMat.passes[0].update(); // update watermark uniform

          if (this.watermarkMat) {
            const watermarkTW = this.watermarkTexture.width;
            const watermarkTH = this.watermarkTexture.height;
            scaleX = watermarkTW;
            scaleY = watermarkTH;
            const textYTrans = logoYTrans - (this.logoHeight * 0.5 * settings.displayRatio + this.textYExtraTrans) * this.scaleSize - watermarkTH * 0.5;
            this.watermarkMat.setProperty('resolution', v2_0.set(dw, dh), 0);
            this.watermarkMat.setProperty('scale', v2_0.set(scaleX, scaleY), 0);
            this.watermarkMat.setProperty('translate', v2_0.set(dw * this.textXTrans, textYTrans), 0);
            this.watermarkMat.setProperty('percent', u_p);
            this.watermarkMat.setProperty('u_projection', this.projection);
            this.watermarkMat.passes[0].update();
          }

          this.frame();
        }

        initBG() {
          const device = this.device;
          this.bgMat = new Material();
          this.bgMat.initialize({
            effectName: 'util/splash-screen'
          });
          const samplerInfo = new SamplerInfo();
          samplerInfo.addressU = Address.CLAMP;
          samplerInfo.addressV = Address.CLAMP;
          samplerInfo.addressW = Address.CLAMP;
          this.sampler = device.getSampler(samplerInfo);
          this.bgTexture = device.createTexture(new TextureInfo(TextureType.TEX2D, TextureUsageBit.SAMPLED | TextureUsageBit.TRANSFER_DST, Format.RGBA8, this.bgImage.width, this.bgImage.height));
          const pass = this.bgMat.passes[0];
          const binding = pass.getBinding('mainTexture');
          pass.bindTexture(binding, this.bgTexture);
          this.shader = pass.getShaderVariant();
          const descriptorSet = pass.descriptorSet;
          descriptorSet.bindSampler(binding, this.sampler);
          descriptorSet.update();
          const region = new BufferTextureCopy();
          region.texExtent.width = this.bgImage.width;
          region.texExtent.height = this.bgImage.height;
          region.texExtent.depth = 1;
          device.copyTexImagesToTexture([this.bgImage], this.bgTexture, [region]);
        }

        initLogo() {
          const device = this.device;
          this.logoMat = new Material();
          this.logoMat.initialize({
            effectName: 'util/splash-screen'
          });
          const samplerInfo = new SamplerInfo();
          samplerInfo.addressU = Address.CLAMP;
          samplerInfo.addressV = Address.CLAMP;
          samplerInfo.addressW = Address.CLAMP;
          this.sampler = device.getSampler(samplerInfo);
          this.logoTexture = device.createTexture(new TextureInfo(TextureType.TEX2D, TextureUsageBit.SAMPLED | TextureUsageBit.TRANSFER_DST, Format.RGBA8, this.logoImage.width, this.logoImage.height));
          const pass = this.logoMat.passes[0];
          const binding = pass.getBinding('mainTexture');
          pass.bindTexture(binding, this.logoTexture);
          this.shader = pass.getShaderVariant();
          const descriptorSet = pass.descriptorSet;
          descriptorSet.bindSampler(binding, this.sampler);
          descriptorSet.update();
          const region = new BufferTextureCopy();
          region.texExtent.width = this.logoImage.width;
          region.texExtent.height = this.logoImage.height;
          region.texExtent.depth = 1;
          device.copyTexImagesToTexture([this.logoImage], this.logoTexture, [region]);
          const logoRatio = this.logoImage.width / this.logoImage.height;

          if (logoRatio < 1) {
            this.logoWidth = this.logoWidthTemp;
            this.logoHeight = this.logoWidthTemp / logoRatio;
          } else {
            this.logoWidth = this.logoHeightTemp * logoRatio;
            this.logoHeight = this.logoHeightTemp;
          }
        }

        initWaterMark() {
          // create texture from image
          const watermarkImg = ccwindow.document.createElement('canvas');
          watermarkImg.height = this.textHeight * this.scaleSize;
          watermarkImg.style.width = `${watermarkImg.width}`;
          watermarkImg.style.height = `${watermarkImg.height}`;
          const text = 'Created with Cocos';
          const ctx = watermarkImg.getContext('2d');
          ctx.font = `${this.textSize * this.scaleSize}px Arial`;
          ctx.textBaseline = 'top';
          ctx.textAlign = 'center';
          ctx.fillStyle = '#707070';
          const textLength = ctx.measureText(text).width + 10;
          watermarkImg.width = textLength; // Tips: Set canvas width will clean context style

          ctx.font = `${this.textSize * this.scaleSize}px Arial`;
          ctx.textBaseline = 'top';
          ctx.textAlign = 'center';
          ctx.fillStyle = '#707070';
          ctx.fillText(text, watermarkImg.width / 2, 0);
          const region = new BufferTextureCopy();
          region.texExtent.width = watermarkImg.width;
          region.texExtent.height = watermarkImg.height;
          region.texExtent.depth = 1;
          this.watermarkTexture = this.device.createTexture(new TextureInfo(TextureType.TEX2D, TextureUsageBit.SAMPLED | TextureUsageBit.TRANSFER_DST, Format.RGBA8, watermarkImg.width, watermarkImg.height));
          this.device.copyTexImagesToTexture([watermarkImg], this.watermarkTexture, [region]); // create material

          this.watermarkMat = new Material();
          this.watermarkMat.initialize({
            effectName: 'util/splash-screen'
          });
          const pass = this.watermarkMat.passes[0];
          const binding = pass.getBinding('mainTexture');
          pass.bindTexture(binding, this.watermarkTexture);
          pass.descriptorSet.update();
        }

        frame() {
          const {
            device,
            swapchain
          } = this;

          if (!sys.isXR || xr.entry.isRenderAllowable()) {
            const renderSize = sys.isXR ? 2 : 1;

            for (let xrEye = 0; xrEye < renderSize; xrEye++) {
              if (sys.isXR) {
                xr.entry.renderLoopStart(xrEye);
                const xrFov = xr.entry.getEyeFov(xrEye); // device's fov may be asymmetry

                let radioLeft = 1.0;
                let radioRight = 1.0;

                if (xrEye === XREye.LEFT) {
                  radioLeft = Math.abs(Math.tan(xrFov[0])) / Math.abs(Math.tan(xrFov[1]));
                } else if (xrEye === XREye.RIGHT) {
                  radioRight = Math.abs(Math.tan(xrFov[1])) / Math.abs(Math.tan(xrFov[0]));
                }

                Mat4.ortho(this.projection, -radioLeft, radioRight, -1, 1, -1, 1, device.capabilities.clipSpaceMinZ, device.capabilities.clipSpaceSignY, swapchain.surfaceTransform); // keep scale to [-1, 1] only use offset

                this.projection.m00 = preTransforms[swapchain.surfaceTransform][0];
                this.projection.m05 = preTransforms[swapchain.surfaceTransform][3] * device.capabilities.clipSpaceSignY;
                this.bgMat.setProperty('u_projection', this.projection);
                this.bgMat.passes[0].update();
                this.logoMat.setProperty('u_projection', this.projection);
                this.logoMat.passes[0].update();

                if (this.watermarkMat) {
                  this.watermarkMat.setProperty('u_projection', this.projection);
                  this.watermarkMat.passes[0].update();
                }
              } // for legacy pipeline


              device.enableAutoBarrier(true);
              device.acquire([swapchain]); // record command

              const cmdBuff = this.cmdBuff;
              const framebuffer = cclegacy.director.root.mainWindow.framebuffer;
              const renderArea = this.renderArea;
              renderArea.width = swapchain.width;
              renderArea.height = swapchain.height;
              cmdBuff.begin();
              cmdBuff.beginRenderPass(framebuffer.renderPass, framebuffer, renderArea, this.clearColors, 1.0, 0);
              const bgPass = this.bgMat.passes[0];
              const bgPso = PipelineStateManager.getOrCreatePipelineState(device, bgPass, this.shader, framebuffer.renderPass, this.quadAssmebler);
              cmdBuff.bindPipelineState(bgPso);
              cmdBuff.bindDescriptorSet(SetIndex.MATERIAL, bgPass.descriptorSet);
              cmdBuff.bindInputAssembler(this.quadAssmebler);
              cmdBuff.draw(this.quadAssmebler);
              const logoPass = this.logoMat.passes[0];
              const logoPso = PipelineStateManager.getOrCreatePipelineState(device, logoPass, this.shader, framebuffer.renderPass, this.quadAssmebler);
              cmdBuff.bindPipelineState(logoPso);
              cmdBuff.bindDescriptorSet(SetIndex.MATERIAL, logoPass.descriptorSet);
              cmdBuff.bindInputAssembler(this.quadAssmebler);
              cmdBuff.draw(this.quadAssmebler);

              if (this.watermarkMat) {
                const wartermarkPass = this.watermarkMat.passes[0];
                const watermarkPso = PipelineStateManager.getOrCreatePipelineState(device, wartermarkPass, this.shader, framebuffer.renderPass, this.quadAssmebler);
                cmdBuff.bindPipelineState(watermarkPso);
                cmdBuff.bindDescriptorSet(SetIndex.MATERIAL, wartermarkPass.descriptorSet);
                cmdBuff.bindInputAssembler(this.quadAssmebler);
                cmdBuff.draw(this.quadAssmebler);
              }

              cmdBuff.endRenderPass();
              cmdBuff.end();
              device.flushCommands([cmdBuff]);
              device.queue.submit([cmdBuff]);
              device.present();
              device.enableAutoBarrier(!legacyCC.rendering);

              if (sys.isXR) {
                xr.entry.renderLoopEnd(xrEye);
              }
            }
          }
        }

        destroy() {
          this.device = null;
          this.swapchain = null;
          this.clearColors = null;
          if (this.bgImage.destroy) this.bgImage.destroy();
          this.bgImage = null;
          this.bgMat.destroy();
          this.bgMat = null;
          this.bgTexture.destroy();
          this.bgTexture = null;
          if (this.logoImage.destroy) this.logoImage.destroy();
          this.logoImage = null;
          this.renderArea = null;
          this.cmdBuff = null;
          this.shader = null;
          this.logoMat.destroy();
          this.logoMat = null;
          this.logoTexture.destroy();
          this.logoTexture = null;
          this.quadAssmebler.destroy();
          this.quadAssmebler = null;
          this.vertexBuffers.destroy();
          this.vertexBuffers = null;
          this.indicesBuffers.destroy();
          this.indicesBuffers = null;
          this.sampler = null;
          /** text */

          if (this.watermarkTexture) {
            this.watermarkMat.destroy();
            this.watermarkMat = null;
            this.watermarkTexture.destroy();
            this.watermarkTexture = null;
          }

          this.settings = null;
        }

        static get instance() {
          if (!SplashScreen._ins) {
            SplashScreen._ins = new SplashScreen();
          }

          return SplashScreen._ins;
        }

        constructor() {
          this._curTime = 0;
          this.isMobile = false;
          this.bgWidth = 1920;
          this.bgHeight = 1080;
          this.bgRatio = 16 / 9;
          this.logoWidthTemp = 140;
          this.logoHeightTemp = 200;
          this.logoWidth = 0;
          this.logoHeight = 0;
          this.logoXTrans = 1 / 2;
          this.logoYTrans = 1 / 6 + 2.5 / 6;
          this.textSize = 24;
          this.textHeight = 24;
          this.textXTrans = 1 / 2;
          this.textYExtraTrans = 32;
          this.textExpandSize = 4;
          this.scaleSize = 1;
        }

      });

      SplashScreen._ins = void 0;
      cclegacy.internal.SplashScreen = SplashScreen;
    }
  };
});