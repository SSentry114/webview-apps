System.register("q-bundled:///fs/cocos/audio/deprecated.js", ["./audio-source.js", "../core/index.js", "./audio-clip.js"], function (_export, _context) {
  "use strict";

  var AudioSource, replaceProperty, markAsWarning, AudioClip;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_audioSourceJs) {
      AudioSource = _audioSourceJs.AudioSource;
    }, function (_coreIndexJs) {
      replaceProperty = _coreIndexJs.replaceProperty;
      markAsWarning = _coreIndexJs.markAsWarning;
    }, function (_audioClipJs) {
      AudioClip = _audioClipJs.AudioClip;
    }],
    execute: function () {
      // remove AudioClip static property
      replaceProperty(AudioClip, 'AudioClip', [{
        name: 'PlayingState',
        newName: 'AudioState',
        target: AudioSource,
        targetName: 'AudioSource'
      }]); // deprecate AudioClip property

      markAsWarning(AudioClip.prototype, 'AudioClip.prototype', ['state', 'play', 'pause', 'stop', 'playOneShot', 'setCurrentTime', 'setVolume', 'setLoop', 'getCurrentTime', 'getVolume', 'getLoop'].map(item => ({
        name: item,
        suggest: `please use AudioSource.prototype.${item} instead`
      })));
    }
  };
});