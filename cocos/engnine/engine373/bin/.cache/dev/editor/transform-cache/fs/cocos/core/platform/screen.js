System.register("q-bundled:///fs/cocos/core/platform/screen.js", ["pal/screen-adapter", "../global-exports.js", "../settings.js", "./debug.js"], function (_export, _context) {
  "use strict";

  var screenAdapter, legacyCC, Settings, settings, warnID, Screen, screen;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_palScreenAdapter) {
      screenAdapter = _palScreenAdapter.screenAdapter;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_settingsJs) {
      Settings = _settingsJs.Settings;
      settings = _settingsJs.settings;
    }, function (_debugJs) {
      warnID = _debugJs.warnID;
    }],
    execute: function () {
      /**
       * @en The screen API provides an easy way to do some screen managing stuff.
       * @zh screen 单例对象提供简单的方法来做屏幕管理相关的工作。
       */
      Screen = class Screen {
        /**
         * @internal
         */
        init() {
          var _settings$querySettin, _settings$querySettin2;

          const exactFitScreen = (_settings$querySettin = settings.querySettings(Settings.Category.SCREEN, 'exactFitScreen')) !== null && _settings$querySettin !== void 0 ? _settings$querySettin : true;
          const orientation = (_settings$querySettin2 = settings.querySettings(Settings.Category.SCREEN, 'orientation')) !== null && _settings$querySettin2 !== void 0 ? _settings$querySettin2 : 'auto';
          const isHeadlessMode = settings.querySettings(Settings.Category.RENDERING, 'renderMode') === 3;
          screenAdapter.init({
            exactFitScreen,
            configOrientation: orientation,
            isHeadlessMode
          }, () => {
            var _director$root;

            const director = legacyCC.director;

            if (!((_director$root = director.root) !== null && _director$root !== void 0 && _director$root.pipeline)) {
              warnID(1220);
              return;
            }

            director.root.pipeline.shadingScale = screenAdapter.resolutionScale;
          });
        }
        /**
         * @en the ratio of the resolution in physical pixels to the resolution in CSS pixels for the current display device
         * NOTE: For performance reasons, the engine will limit the maximum value of DPR on some platforms.
         * This property returns the DPR after the engine limit.
         * @zh 当前显示设备的物理像素分辨率与 CSS 像素分辨率之比。
         * 注意：出于性能考虑，引擎在一些平台会限制 DPR 的最高值，这个属性返回的是引擎限制后的 DPR。
         */


        get devicePixelRatio() {
          return screenAdapter.devicePixelRatio;
        }
        /**
         * @en Get and set the size of current window in physical pixels.
         * NOTE:
         * - Setting window size is only supported on Web platform for now.
         * - On Web platform, if the ContainerStrategy is PROPORTIONAL_TO_FRAME, we set windowSize on game frame,
         *    and get windowSize from the game container after adaptation.
         * @zh 获取和设置当前窗口的物理像素尺寸。
         * 注意
         * - 设置窗口尺寸目前只在 Web 平台上支持。
         * - Web 平台上，如果 ContainerStrategy 为 PROPORTIONAL_TO_FRAME, 则设置 windowSize 作用于 game frame, 而从适配之后 game container 尺寸获取 windowSize.
         */


        get windowSize() {
          return screenAdapter.windowSize;
        }

        set windowSize(size) {
          screenAdapter.windowSize = size;
        }
        /**
         * @en Get the current resolution of game.
         * This is a readonly property.
         * @zh 获取当前游戏的分辨率。
         * 这是一个只读属性。
         *
         * @readonly
         */


        get resolution() {
          return screenAdapter.resolution;
        } // /**
        //  * @en Get and set the resolution scale of screen, which will affect the quality of the rendering.
        //  * Note: if this value is set too high, the rendering performance of GPU will be reduced, this value is 1 by default.
        //  * @zh 获取和设置屏幕的分辨率缩放比，这将会影响最终渲染的质量。
        //  * 注意：如果这个值设置的太高，会降低 GPU 的渲染性能，该值默认为 1。
        //  */
        // public get resolutionScale () {
        //     return screenAdapter.resolutionScale;
        // }
        // public set resolutionScale (v: number) {
        //     screenAdapter.resolutionScale = v;
        // }

        /**
         * @en Whether it supports full screen.
         * @zh 是否支持全屏。
         * @returns {Boolean}
         */


        get supportsFullScreen() {
          return screenAdapter.supportFullScreen;
        }
        /**
         * @en Return true if it's in full screen state now.
         * @zh 当前是否处在全屏状态下。
         * @returns {boolean}
         */


        fullScreen() {
          return screenAdapter.isFullScreen;
        }
        /**
         * @en Request to enter full screen mode with the given element.
         * Many browsers forbid to enter full screen mode without an user intended interaction.
         * If failed to request fullscreen, another attempt will be made to request fullscreen the next time a user interaction occurs.
         * @zh 尝试使当前节点进入全屏模式，很多浏览器不允许程序触发这样的行为，必须在一个用户交互回调中才会生效。
         * 如果进入全屏失败，会在下一次用户发生交互时，再次尝试进入全屏。
         * @param element @zh 请求全屏状态的html元素。 @en The element to request full screen state.
         * @param onFullScreenChange @zh 全屏状态改变的回调函数。 @en callback function when full screen state changed.
         * @param onFullScreenError @zh 全屏错误的回调函数。 @en callback function when full screen error.
         * @return {Promise|undefined}
         * @deprecated since v3.3, please use `screen.requestFullScreen(): Promise<void>` instead.
         */


        requestFullScreen(element, onFullScreenChange, onFullScreenError) {
          if (arguments.length > 0) {
            warnID(1400, 'screen.requestFullScreen(element, onFullScreenChange?, onFullScreenError?)', 'screen.requestFullScreen(): Promise');
          }

          return screenAdapter.requestFullScreen().then(() => {
            // @ts-expect-error no parameter passed
            onFullScreenChange === null || onFullScreenChange === void 0 ? void 0 : onFullScreenChange();
          }).catch(err => {
            console.error(err); // @ts-expect-error no parameter passed

            onFullScreenError === null || onFullScreenError === void 0 ? void 0 : onFullScreenError();
          });
        }
        /**
         * @en Exit the full mode.
         * @zh 退出全屏模式。
         * @return {Promise}
         */


        exitFullScreen() {
          return screenAdapter.exitFullScreen();
        }
        /**
         * @en Automatically request full screen during the next touch/click event.
         * @zh 自动监听触摸、鼠标事件并在下一次事件触发时尝试进入全屏模式。
         * @param element @zh 请求全屏状态的html元素。 @en The element to request full screen state.
         * @param onFullScreenChange @zh 全屏状态改变的回调函数。 @en callback function when full screen state changed.
         *
         * @deprecated since v3.3, please use screen.requestFullScreen() instead.
         */


        autoFullScreen(element, onFullScreenChange) {
          var _this$requestFullScre;

          (_this$requestFullScre = this.requestFullScreen(element, onFullScreenChange)) === null || _this$requestFullScre === void 0 ? void 0 : _this$requestFullScre.catch(e => {});
        }
        /**
         * @param element
         * @deprecated since v3.3
         */


        disableAutoFullScreen(element) {// DO NOTHING
        } // TODO: to support registering fullscreen change
        // TODO: to support screen resize


      };

      _export("screen", screen = new Screen());

      legacyCC.screen = screen;
    }
  };
});