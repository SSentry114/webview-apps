System.register("q-bundled:///fs/pal/system-info/native/system-info.js", ["../../../cocos/core/event/index.js", "../enum-type/index.js"], function (_export, _context) {
  "use strict";

  var EventTarget, BrowserType, NetworkType, Platform, Language, Feature, SystemInfo, networkTypeMap, platformMap, systemInfo;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_cocosCoreEventIndexJs) {
      EventTarget = _cocosCoreEventIndexJs.EventTarget;
    }, function (_enumTypeIndexJs) {
      BrowserType = _enumTypeIndexJs.BrowserType;
      NetworkType = _enumTypeIndexJs.NetworkType;
      Platform = _enumTypeIndexJs.Platform;
      Language = _enumTypeIndexJs.Language;
      Feature = _enumTypeIndexJs.Feature;
    }],
    execute: function () {
      networkTypeMap = {
        0: NetworkType.NONE,
        1: NetworkType.LAN,
        2: NetworkType.WWAN
      };
      platformMap = {
        0: Platform.WIN32,
        // 1 is Linux platform in native engine
        2: Platform.MACOS,
        3: Platform.ANDROID,
        // 4 is IPHONE
        4: Platform.IOS,
        // 5 is IPAD
        5: Platform.IOS,
        6: Platform.OHOS
      };
      SystemInfo = class SystemInfo extends EventTarget {
        // TODO: need to wrap the function __isObjectValid()
        get networkType() {
          return networkTypeMap[jsb.device.getNetworkType()];
        }

        constructor() {
          super();
          this.isNative = void 0;
          this.isBrowser = void 0;
          this.isMobile = void 0;
          this.isLittleEndian = void 0;
          this.platform = void 0;
          this.language = void 0;
          this.nativeLanguage = void 0;
          this.os = void 0;
          this.osVersion = void 0;
          this.osMainVersion = void 0;
          this.browserType = void 0;
          this.browserVersion = void 0;
          this.isXR = void 0;
          this._featureMap = void 0;
          this._initPromise = void 0;
          this.isNative = true;
          this.isBrowser = false; // @ts-expect-error __getPlatform()

          this.platform = platformMap[__getPlatform()];
          this.isMobile = this.platform === Platform.ANDROID || this.platform === Platform.IOS || this.platform === Platform.OHOS; // init isLittleEndian

          this.isLittleEndian = (() => {
            const buffer = new ArrayBuffer(2);
            new DataView(buffer).setInt16(0, 256, true); // Int16Array uses the platform's endianness.

            return new Int16Array(buffer)[0] === 256;
          })(); // init languageCode and language
          // @ts-expect-error __getCurrentLanguageCode() defined in JSB


          const currLanguage = __getCurrentLanguageCode();

          this.nativeLanguage = currLanguage ? currLanguage.toLowerCase() : Language.UNKNOWN; // @ts-expect-error __getCurrentLanguage() defined in JSB

          this.language = __getCurrentLanguage(); // @ts-expect-error __getOS() defined in JSB

          this.os = __getOS(); // @ts-expect-error __getOSVersion() defined in JSB

          this.osVersion = __getOSVersion();
          this.osMainVersion = parseInt(this.osVersion); // init browserType and browserVersion

          this.browserType = BrowserType.UNKNOWN;
          this.browserVersion = '';
          this.isXR = typeof xr !== 'undefined' && typeof xr.XrEntry !== 'undefined';
          this._featureMap = {
            [Feature.WEBP]: true,
            [Feature.IMAGE_BITMAP]: false,
            [Feature.WEB_VIEW]: this.isMobile,
            [Feature.VIDEO_PLAYER]: this.isMobile,
            [Feature.SAFE_AREA]: this.isMobile,
            [Feature.INPUT_TOUCH]: this.isMobile,
            [Feature.EVENT_KEYBOARD]: true,
            [Feature.EVENT_MOUSE]: !this.isMobile,
            [Feature.EVENT_TOUCH]: true,
            [Feature.EVENT_ACCELEROMETER]: this.isMobile,
            [Feature.EVENT_GAMEPAD]: true,
            [Feature.EVENT_HANDLE]: this.isXR,
            [Feature.EVENT_HMD]: this.isXR,
            [Feature.EVENT_HANDHELD]: typeof xr !== 'undefined' && typeof xr.ARModule !== 'undefined'
          };
          this._initPromise = [];

          this._registerEvent();
        }

        _registerEvent() {
          jsb.onPause = () => {
            this.emit('hide');
          };

          jsb.onResume = () => {
            this.emit('show');
          };

          jsb.onClose = () => {
            this.emit('close');
          };
        }

        _setFeature(feature, value) {
          return this._featureMap[feature] = value;
        }

        init() {
          return Promise.all(this._initPromise);
        }

        hasFeature(feature) {
          return this._featureMap[feature];
        }

        getBatteryLevel() {
          return jsb.device.getBatteryLevel();
        }

        triggerGC() {
          jsb.garbageCollect();
        }

        openURL(url) {
          jsb.openURL(url);
        }

        now() {
          if (Date.now) {
            return Date.now();
          }

          return +new Date();
        }

        restartJSVM() {
          // @ts-expect-error __restartVM() is defined in JSB
          __restartVM();
        }

        close() {
          // @ts-expect-error __close() is defined in JSB
          __close();
        }

      };

      _export("systemInfo", systemInfo = new SystemInfo());
    }
  };
});