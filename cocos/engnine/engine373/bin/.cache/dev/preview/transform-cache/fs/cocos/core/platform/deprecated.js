System.register("q-bundled:///fs/cocos/core/platform/deprecated.js", ["../utils/index.js", "./sys.js", "../global-exports.js", "./screen.js"], function (_export, _context) {
  "use strict";

  var markAsWarning, removeProperty, replaceProperty, sys, legacyCC, screen;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_utilsIndexJs) {
      markAsWarning = _utilsIndexJs.markAsWarning;
      removeProperty = _utilsIndexJs.removeProperty;
      replaceProperty = _utilsIndexJs.replaceProperty;
    }, function (_sysJs) {
      sys = _sysJs.sys;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_screenJs) {
      screen = _screenJs.screen;
    }],
    execute: function () {
      markAsWarning(legacyCC, 'cc', [{
        name: 'winSize',
        suggest: 'please use view.getVisibleSize() instead.'
      }]); // #endregion deprecation on view
      // deprecate capabilities field

      markAsWarning(sys, 'sys', [{
        name: 'capabilities',
        suggest: 'please use sys.hasFeature() method instead.'
      }]); // deprecate languageCode field

      replaceProperty(sys, 'sys', ['UNKNOWN', 'ENGLISH', 'CHINESE', 'FRENCH', 'ITALIAN', 'GERMAN', 'SPANISH', 'DUTCH', 'RUSSIAN', 'KOREAN', 'JAPANESE', 'HUNGARIAN', 'PORTUGUESE', 'ARABIC', 'NORWEGIAN', 'POLISH', 'TURKISH', 'UKRAINIAN', 'ROMANIAN', 'BULGARIAN'].map(function (item) {
        return {
          name: "LANGUAGE_" + item,
          newName: item,
          target: sys.Language,
          targetName: 'sys.Language'
        };
      })); // deprecate os field

      replaceProperty(sys, 'sys', ['UNKNOWN', 'IOS', 'ANDROID', 'WINDOWS', 'LINUX', 'OSX'].map(function (item) {
        return {
          name: "OS_" + item,
          newName: item,
          target: sys.OS,
          targetName: 'sys.OS'
        };
      })); // deprecate browserType field

      replaceProperty(sys, 'sys', ['UNKNOWN', 'WECHAT', 'ANDROID', 'IE', 'EDGE', 'QQ', 'MOBILE_QQ', 'UC', 'UCBS', 'BAIDU_APP', 'BAIDU', 'MAXTHON', 'OPERA', 'OUPENG', 'MIUI', 'FIREFOX', 'SAFARI', 'CHROME', 'LIEBAO', 'QZONE', 'SOUGOU', 'HUAWEI'].map(function (item) {
        return {
          name: "BROWSER_TYPE_" + item,
          newName: item,
          target: sys.BrowserType,
          targetName: 'sys.BrowserType'
        };
      }));
      replaceProperty(sys, 'sys', [{
        name: 'BROWSER_TYPE_360',
        newName: 'BROWSER_360',
        target: sys.BrowserType,
        targetName: 'sys.BrowserType'
      }]); // deprecate platform field

      replaceProperty(sys, 'sys', ['UNKNOWN', 'EDITOR_PAGE', 'EDITOR_CORE', 'MOBILE_BROWSER', 'DESKTOP_BROWSER', 'WIN32', 'MACOS', 'IOS', 'ANDROID', 'OHOS', 'WECHAT_GAME', 'BAIDU_MINI_GAME', 'XIAOMI_QUICK_GAME', 'ALIPAY_MINI_GAME', 'BYTEDANCE_MINI_GAME', 'OPPO_MINI_GAME', 'VIVO_MINI_GAME', 'HUAWEI_QUICK_GAME', 'COCOSPLAY', 'LINKSURE_MINI_GAME', 'QTT_MINI_GAME'].map(function (item) {
        return {
          name: item,
          target: sys.Platform,
          targetName: 'sys.Platform'
        };
      })); // remove platform field

      replaceProperty(sys, 'sys', [{
        name: 'IPHONE',
        newName: 'IOS',
        target: sys.Platform,
        targetName: 'sys.Platform'
      }, {
        name: 'IPAD',
        newName: 'IOS',
        target: sys.Platform,
        targetName: 'sys.Platform'
      }]);
      removeProperty(sys, 'sys', ['LINUX', 'BLACKBERRY', 'NACL', 'EMSCRIPTEN', 'TIZEN', 'WINRT', 'WP8', 'QQ_PLAY', 'FB_PLAYABLE_ADS'].map(function (item) {
        return {
          name: item
        };
      }));
      replaceProperty(sys, 'sys', [{
        name: 'windowPixelResolution',
        target: screen,
        targetName: 'screen',
        newName: 'windowSize'
      }]); // deprecate screen API

      markAsWarning(screen, 'screen', [{
        name: 'autoFullScreen',
        suggest: 'please use screen.requestFullScreen() instead.'
      }, {
        name: 'disableAutoFullScreen'
      }]);
    }
  };
});