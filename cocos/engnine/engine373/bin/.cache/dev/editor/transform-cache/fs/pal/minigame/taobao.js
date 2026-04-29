System.register("q-bundled:///fs/pal/minigame/taobao.js", ["../screen-adapter/enum-type/index.js", "../utils.js", "../system-info/enum-type/index.js"], function (_export, _context) {
  "use strict";

  var Orientation, cloneObject, createInnerAudioContextPolyfill, versionCompare, Language, languageMap, minigame, systemInfo, landscapeOrientation, polyfilledCreateInnerAudio, _accelerometerCb, locCanvas, originalGetContext, hasAdapter;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function adapterGL(gl) {
    if (hasAdapter) {
      return;
    }

    hasAdapter = true;

    if (!my.isIDE) {
      // TODO: Premultiplication is already used on Taobao, do not use premultiplication on the phone.
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false); // TODO: adapter gl.getUniformLocation
      // Android return value: undefined.   iOS return value: {ID: -1}.

      if (my.getSystemInfoSync().platform.toLocaleLowerCase() === 'ios') {
        const originalGetUniformLocation = gl.getUniformLocation.bind(gl);

        gl.getUniformLocation = function (program, name) {
          const glLoc = originalGetUniformLocation(program, name);

          if (glLoc && glLoc.ID === -1) {
            return undefined;
          } // eslint-disable-next-line @typescript-eslint/no-unsafe-return


          return originalGetUniformLocation(program, name);
        };
      }
    }
  }

  return {
    setters: [function (_screenAdapterEnumTypeIndexJs) {
      Orientation = _screenAdapterEnumTypeIndexJs.Orientation;
    }, function (_utilsJs) {
      cloneObject = _utilsJs.cloneObject;
      createInnerAudioContextPolyfill = _utilsJs.createInnerAudioContextPolyfill;
      versionCompare = _utilsJs.versionCompare;
    }, function (_systemInfoEnumTypeIndexJs) {
      Language = _systemInfoEnumTypeIndexJs.Language;
    }],
    execute: function () {
      //taobao IDE language   ("Chinese")
      //taobao phone language (Andrond: "cn", iPad: 'zh_CN')
      languageMap = {
        Chinese: Language.CHINESE,
        cn: Language.CHINESE,
        zh_CN: Language.CHINESE
      };

      // @ts-expect-error can't init minigame when it's declared
      _export("minigame", minigame = {});

      cloneObject(minigame, my); // #region SystemInfo

      systemInfo = minigame.getSystemInfoSync();
      systemInfo.language = languageMap[systemInfo.language] || systemInfo.language;

      minigame.getSystemInfoSync = () => systemInfo;

      minigame.isDevTool = my.isIDE;
      Object.defineProperty(minigame, 'isLandscape', {
        get() {
          const locSystemInfo = minigame.getSystemInfoSync();

          if (typeof locSystemInfo.deviceOrientation === 'string') {
            return locSystemInfo.deviceOrientation.startsWith('landscape');
          } else {
            return locSystemInfo.screenWidth > locSystemInfo.screenHeight;
          }
        }

      }); // init landscapeOrientation as LANDSCAPE_RIGHT

      landscapeOrientation = Orientation.LANDSCAPE_RIGHT; // NOTE: onDeviceOrientationChange is not supported on this platform
      // my.onDeviceOrientationChange((res) => {
      //     if (res.value === 'landscape') {
      //         landscapeOrientation = Orientation.LANDSCAPE_RIGHT;
      //     } else if (res.value === 'landscapeReverse') {
      //         landscapeOrientation = Orientation.LANDSCAPE_LEFT;
      //     }
      // });

      Object.defineProperty(minigame, 'orientation', {
        get() {
          return minigame.isLandscape ? landscapeOrientation : Orientation.PORTRAIT;
        }

      }); // #endregion SystemInfo
      // @ts-expect-error TODO: move into minigame.d.ts

      minigame.isSupportLandscape = function () {
        const locSysInfo = minigame.getSystemInfoSync();

        if (typeof locSysInfo.deviceOrientation === 'string' && locSysInfo.deviceOrientation.startsWith('landscape')) {
          if (versionCompare(locSysInfo.version, '10.15.10') < 0) {
            console.warn('The current Taobao client version does not support Landscape, the minimum requirement is 10.15.10');
          }
        }
      }; // @ts-expect-error TODO: Check whether the landscape screen is supported


      minigame.isSupportLandscape(); // #region Audio

      polyfilledCreateInnerAudio = createInnerAudioContextPolyfill(my, {
        onPlay: true,
        // Fix: onPlay won't execute.
        onPause: true,
        // NOTE: calling pause() twice onPause won't execute twice.
        onStop: false,
        onSeek: false
      }, true);

      minigame.createInnerAudioContext = function () {
        const audio = polyfilledCreateInnerAudio(); // @ts-expect-error InnerAudioContext has onCanPlay

        audio.onCanplay = audio.onCanPlay.bind(audio); // @ts-expect-error InnerAudioContext has onCanPlay

        delete audio.onCanPlay;
        return audio;
      }; // #region Audio
      // #region Font


      minigame.loadFont = function (url) {
        // my.loadFont crash when url is not in user data path
        return 'Arial';
      }; // #endregion Font
      // #region Accelerometer


      minigame.onAccelerometerChange = function (cb) {
        minigame.offAccelerometerChange(); // onAccelerometerChange would start accelerometer
        // so we won't call this method here

        _accelerometerCb = res => {
          let x = res.x;
          let y = res.y;

          if (minigame.isLandscape) {
            const orientationFactor = landscapeOrientation === Orientation.LANDSCAPE_RIGHT ? 1 : -1;
            x = -res.y * orientationFactor;
            y = res.x * orientationFactor;
          }

          const resClone = {
            x,
            y,
            z: res.z
          };
          cb(resClone);
        };
      };

      minigame.offAccelerometerChange = function (cb) {
        if (_accelerometerCb) {
          my.offAccelerometerChange(_accelerometerCb);
          _accelerometerCb = undefined;
        }
      };

      minigame.startAccelerometer = function (res) {
        if (_accelerometerCb) {
          my.onAccelerometerChange(_accelerometerCb);
        } else {
          // my.startAccelerometer() is not implemented.
          console.error('minigame.onAccelerometerChange() should be invoked before minigame.startAccelerometer() on taobao platform');
        }
      };

      minigame.stopAccelerometer = function (res) {
        // my.stopAccelerometer() is not implemented.
        minigame.offAccelerometerChange();
      }; // #endregion Accelerometer
      // #region SafeArea
      // It should be a value that is not multiplied by dpr


      minigame.getSafeArea = function () {
        const systemInfo = minigame.getSystemInfoSync();

        if (typeof systemInfo.safeArea !== 'undefined') {
          return systemInfo.safeArea;
        }

        console.warn('getSafeArea is not supported on this platform');
        return {
          top: 0,
          left: 0,
          bottom: systemInfo.windowHeight,
          right: systemInfo.windowWidth,
          width: systemInfo.windowWidth,
          height: systemInfo.windowHeight
        };
      }; // #endregion SafeArea
      // TODO: A filpY operation will be performed after ReadPixels on Taobao.


      if (!my.isIDE) {
        // @ts-expect-error canvas defined in global
        locCanvas = $global.screencanvas;

        if (locCanvas) {
          originalGetContext = locCanvas.getContext.bind(locCanvas);

          locCanvas.getContext = function (name, param) {
            if (typeof name === 'string' && typeof param === 'object' && name.startsWith('webgl')) {
              Object.assign(param, {
                enable_flip_y_after_read_pixels: false
              });
              const gl = originalGetContext(name, param);
              adapterGL(gl); // eslint-disable-next-line @typescript-eslint/no-unsafe-return

              return gl;
            } // eslint-disable-next-line @typescript-eslint/no-unsafe-return


            return originalGetContext(name, param);
          };
        }
      }

      hasAdapter = false;
    }
  };
});