System.register("q-bundled:///fs/pal/audio/type.js", [], function (_export, _context) {
  "use strict";

  var AudioEvent, AudioType, AudioState, AudioPCMDataView;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  _export({
    AudioEvent: void 0,
    AudioType: void 0,
    AudioState: void 0
  });

  return {
    setters: [],
    execute: function () {
      (function (AudioEvent) {
        AudioEvent["PLAYED"] = "play";
        AudioEvent["PAUSED"] = "pause";
        AudioEvent["STOPPED"] = "stop";
        AudioEvent["SEEKED"] = "seeked";
        AudioEvent["ENDED"] = "ended";
        AudioEvent["INTERRUPTION_BEGIN"] = "interruptionBegin";
        AudioEvent["INTERRUPTION_END"] = "interruptionEnd";
        AudioEvent["USER_GESTURE"] = "on_gesture";
      })(AudioEvent || _export("AudioEvent", AudioEvent = {}));

      (function (AudioType) {
        AudioType[AudioType["DOM_AUDIO"] = 0] = "DOM_AUDIO";
        AudioType[AudioType["WEB_AUDIO"] = 1] = "WEB_AUDIO";
        AudioType[AudioType["MINIGAME_AUDIO"] = 2] = "MINIGAME_AUDIO";
        AudioType[AudioType["NATIVE_AUDIO"] = 3] = "NATIVE_AUDIO";
        AudioType[AudioType["UNKNOWN_AUDIO"] = 4] = "UNKNOWN_AUDIO";
      })(AudioType || _export("AudioType", AudioType = {}));

      (function (AudioState) {
        AudioState[AudioState["INIT"] = 0] = "INIT";
        AudioState[AudioState["PLAYING"] = 1] = "PLAYING";
        AudioState[AudioState["PAUSED"] = 2] = "PAUSED";
        AudioState[AudioState["STOPPED"] = 3] = "STOPPED";
        AudioState[AudioState["INTERRUPTED"] = 4] = "INTERRUPTED";
      })(AudioState || _export("AudioState", AudioState = {}));

      _export("AudioPCMDataView", AudioPCMDataView = /*#__PURE__*/function () {
        function AudioPCMDataView() {
          this._bufferView = void 0;
          this._normalizeFactor = 1;

          if (arguments.length === 2) {
            this._bufferView = arguments.length <= 0 ? undefined : arguments[0];
            this._normalizeFactor = arguments.length <= 1 ? undefined : arguments[1];
          } else {
            var _arrayBuffer = arguments.length <= 0 ? undefined : arguments[0];

            var _Ctor = arguments.length <= 1 ? undefined : arguments[1];

            var _normalizeFactor = arguments.length <= 2 ? undefined : arguments[2];

            this._bufferView = new _Ctor(_arrayBuffer);
            this._normalizeFactor = _normalizeFactor;
          }
        }

        var _proto = AudioPCMDataView.prototype;

        _proto.getData = function getData(offset) {
          return this._bufferView[offset] * this._normalizeFactor;
        };

        _createClass(AudioPCMDataView, [{
          key: "length",
          get: function get() {
            return this._bufferView.length;
          }
        }]);

        return AudioPCMDataView;
      }());
    }
  };
});