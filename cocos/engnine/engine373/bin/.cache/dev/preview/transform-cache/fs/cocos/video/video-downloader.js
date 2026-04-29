System.register("q-bundled:///fs/cocos/video/video-downloader.js", ["../asset/asset-manager/downloader.js", "../asset/asset-manager/factory.js", "../core/platform/debug.js", "./assets/video-clip.js", "../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var downloader, factory, log, VideoClip, ccwindow, ccdocument;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  // eslint-disable-next-line consistent-return
  function downloadVideo(url, options, onComplete) {
    var video = ccdocument.createElement('video');
    var source = ccdocument.createElement('source');
    video.appendChild(source);
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.responseType = 'blob';

    req.onload = function onload() {
      if (this.status === 200 || this.status === 0) {
        source.src = URL.createObjectURL(this.response);
        onComplete(null, video);
      } else {
        onComplete(new Error(req.status + "(no response)"));
      }
    };

    req.onerror = function onerror() {
      var message = "load video failure - " + url;
      log(message);
      onComplete(new Error(message));
    };

    req.send();
  }

  function createVideoClip(id, data, options, onComplete) {
    var out = new VideoClip();
    out._nativeUrl = id;
    out._nativeAsset = data;
    onComplete(null, out);
  }

  _export("downloadVideo", downloadVideo);

  return {
    setters: [function (_assetAssetManagerDownloaderJs) {
      downloader = _assetAssetManagerDownloaderJs.default;
    }, function (_assetAssetManagerFactoryJs) {
      factory = _assetAssetManagerFactoryJs.default;
    }, function (_corePlatformDebugJs) {
      log = _corePlatformDebugJs.log;
    }, function (_assetsVideoClipJs) {
      VideoClip = _assetsVideoClipJs.VideoClip;
    }, function (_coreGlobalExportsJs) {
      ccwindow = _coreGlobalExportsJs.ccwindow;
    }],
    execute: function () {
      ccdocument = ccwindow.document;
      downloader.register({
        // Video
        '.mp4': downloadVideo,
        '.avi': downloadVideo,
        '.mov': downloadVideo,
        '.mpg': downloadVideo,
        '.mpeg': downloadVideo,
        '.rm': downloadVideo,
        '.rmvb': downloadVideo
      });
      factory.register({
        // Video
        '.mp4': createVideoClip,
        '.avi': createVideoClip,
        '.mov': createVideoClip,
        '.mpg': createVideoClip,
        '.mpeg': createVideoClip,
        '.rm': createVideoClip,
        '.rmvb': createVideoClip
      });
    }
  };
});