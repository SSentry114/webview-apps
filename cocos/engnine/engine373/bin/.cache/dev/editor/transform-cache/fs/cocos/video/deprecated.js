System.register("q-bundled:///fs/cocos/video/deprecated.js", ["../core/utils/x-deprecated.js", "./video-player.js"], function (_export, _context) {
  "use strict";

  var replaceProperty, VideoPlayer;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_coreUtilsXDeprecatedJs) {
      replaceProperty = _coreUtilsXDeprecatedJs.replaceProperty;
    }, function (_videoPlayerJs) {
      VideoPlayer = _videoPlayerJs.VideoPlayer;
    }],
    execute: function () {
      replaceProperty(VideoPlayer.prototype, 'VideoPlayer.prototype', [{
        name: 'onPasued',
        newName: 'onPaused'
      }]);
    }
  };
});