System.register("q-bundled:///fs/pal/screen-adapter/minigame/screen-adapter.js", ["../../../../virtual/internal%253Aconstants.js", "pal/minigame", "pal/system-info", "../../../cocos/core/platform/debug.js", "../../../cocos/core/event/event-target.js", "../../../cocos/core/math/index.js", "../../system-info/enum-type/index.js", "../enum-type/index.js"], function (_export, _context) {
  "use strict";

  var ALIPAY, BYTEDANCE, COCOSPLAY, VIVO, WECHAT, WECHAT_MINI_PROGRAM, minigame, systemInfo, warnID, EventTarget, Size, OS, Orientation, ScreenAdapter, rotateLandscape, fs, screenOrientation, screenAdapter;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      ALIPAY = _virtualInternal253AconstantsJs.ALIPAY;
      BYTEDANCE = _virtualInternal253AconstantsJs.BYTEDANCE;
      COCOSPLAY = _virtualInternal253AconstantsJs.COCOSPLAY;
      VIVO = _virtualInternal253AconstantsJs.VIVO;
      WECHAT = _virtualInternal253AconstantsJs.WECHAT;
      WECHAT_MINI_PROGRAM = _virtualInternal253AconstantsJs.WECHAT_MINI_PROGRAM;
    }, function (_palMinigame) {
      minigame = _palMinigame.minigame;
    }, function (_palSystemInfo) {
      systemInfo = _palSystemInfo.systemInfo;
    }, function (_cocosCorePlatformDebugJs) {
      warnID = _cocosCorePlatformDebugJs.warnID;
    }, function (_cocosCoreEventEventTargetJs) {
      EventTarget = _cocosCoreEventEventTargetJs.EventTarget;
    }, function (_cocosCoreMathIndexJs) {
      Size = _cocosCoreMathIndexJs.Size;
    }, function (_systemInfoEnumTypeIndexJs) {
      OS = _systemInfoEnumTypeIndexJs.OS;
    }, function (_enumTypeIndexJs) {
      Orientation = _enumTypeIndexJs.Orientation;
    }],
    execute: function () {
      // HACK: In some platform like CocosPlay or Alipay iOS end
      // the windowSize need to rotate when init screenAdapter if it's landscape
      rotateLandscape = false;

      try {
        if (ALIPAY) {
          if (systemInfo.os === OS.IOS && !minigame.isDevTool) {
            // @ts-expect-error TODO: use pal/fs
            fs = my.getFileSystemManager();
            screenOrientation = JSON.parse(fs.readFileSync({
              filePath: 'game.json',
              encoding: 'utf8'
            }).data).screenOrientation;
            rotateLandscape = screenOrientation === 'landscape';
          }
        }
      } catch (e) {
        console.error(e);
      }

      ScreenAdapter = class ScreenAdapter extends EventTarget {
        get supportFullScreen() {
          return false;
        }

        get isFullScreen() {
          return false;
        }

        get devicePixelRatio() {
          const sysInfo = minigame.getSystemInfoSync();
          return sysInfo.pixelRatio;
        }

        get windowSize() {
          const sysInfo = minigame.getSystemInfoSync();
          const dpr = this.devicePixelRatio;
          let screenWidth = sysInfo.windowWidth;
          let screenHeight = sysInfo.windowHeight;

          if (BYTEDANCE) {
            screenWidth = sysInfo.screenWidth;
            screenHeight = sysInfo.screenHeight;
          }

          if (ALIPAY && rotateLandscape && screenWidth < screenHeight) {
            const temp = screenWidth;
            screenWidth = screenHeight;
            screenHeight = temp;
          }

          return new Size(screenWidth * dpr, screenHeight * dpr);
        }

        set windowSize(size) {
          warnID(1221);
        }

        get resolution() {
          const windowSize = this.windowSize;
          const resolutionScale = this.resolutionScale;
          return new Size(windowSize.width * resolutionScale, windowSize.height * resolutionScale);
        }

        get resolutionScale() {
          return this._resolutionScale;
        }

        set resolutionScale(value) {
          var _this$_cbToUpdateFram;

          if (value === this._resolutionScale) {
            return;
          }

          this._resolutionScale = value;
          (_this$_cbToUpdateFram = this._cbToUpdateFrameBuffer) === null || _this$_cbToUpdateFram === void 0 ? void 0 : _this$_cbToUpdateFram.call(this);
        }

        get orientation() {
          return minigame.orientation;
        }

        set orientation(value) {
          console.warn('Setting orientation is not supported yet.');
        }

        get safeAreaEdge() {
          const minigameSafeArea = minigame.getSafeArea();
          const windowSize = this.windowSize; // NOTE: safe area info on vivo platform is in physical pixel.
          // No need to multiply with DPR.

          const dpr = VIVO ? 1 : this.devicePixelRatio;
          let topEdge = minigameSafeArea.top * dpr;
          let bottomEdge = windowSize.height - minigameSafeArea.bottom * dpr;
          let leftEdge = minigameSafeArea.left * dpr;
          let rightEdge = windowSize.width - minigameSafeArea.right * dpr;
          const orientation = this.orientation; // Make it symmetrical.

          if (orientation === Orientation.PORTRAIT) {
            if (topEdge < bottomEdge) {
              topEdge = bottomEdge;
            } else {
              bottomEdge = topEdge;
            }
          } else if (leftEdge < rightEdge) {
            leftEdge = rightEdge;
          } else {
            rightEdge = leftEdge;
          }

          return {
            top: topEdge,
            bottom: bottomEdge,
            left: leftEdge,
            right: rightEdge
          };
        }

        get isProportionalToFrame() {
          return this._isProportionalToFrame;
        }

        set isProportionalToFrame(v) {}

        constructor() {
          super(); // TODO: onResize or onOrientationChange is not supported well

          this.isFrameRotated = false;
          this.handleResizeEvent = true;
          this._cbToUpdateFrameBuffer = void 0;
          this._resolutionScale = 1;
          this._isProportionalToFrame = false;

          if (WECHAT || WECHAT_MINI_PROGRAM || COCOSPLAY) {
            var _minigame$onWindowRes;

            (_minigame$onWindowRes = minigame.onWindowResize) === null || _minigame$onWindowRes === void 0 ? void 0 : _minigame$onWindowRes.call(minigame, () => {
              this.emit('window-resize', this.windowSize.width, this.windowSize.height);
            });
          }
        }

        init(options, cbToRebuildFrameBuffer) {
          this._cbToUpdateFrameBuffer = cbToRebuildFrameBuffer;

          this._cbToUpdateFrameBuffer();
        }

        requestFullScreen() {
          return Promise.reject(new Error('request fullscreen is not supported on this platform.'));
        }

        exitFullScreen() {
          return Promise.reject(new Error('exit fullscreen is not supported on this platform.'));
        }

      };

      _export("screenAdapter", screenAdapter = new ScreenAdapter());
    }
  };
});