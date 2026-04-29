System.register("q-bundled:///fs/cocos/core/effect-settings.js", ["../../../virtual/internal%253Aconstants.js", "./global-exports.js"], function (_export, _context) {
  "use strict";

  var HTML5, legacyCC, EffectSettings, effectSettings;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      HTML5 = _virtualInternal253AconstantsJs.HTML5;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }],
    execute: function () {
      _export("EffectSettings", EffectSettings = /*#__PURE__*/function () {
        function EffectSettings() {
          this._data = null;
        }

        var _proto = EffectSettings.prototype;

        _proto.init = function init(path) {
          var _this = this;

          if (path === void 0) {
            path = '';
          }

          if (!legacyCC.rendering || !legacyCC.rendering.enableEffectImport || !path) {
            return Promise.resolve();
          }

          return new Promise(function (resolve, reject) {
            if (!HTML5 && !path.startsWith('http')) {
              fsUtils.readArrayBuffer(path, function (err, arrayBuffer) {
                if (err) {
                  reject(err);
                  return;
                }

                _this._data = arrayBuffer;
                resolve();
              });
            } else {
              var xhr = new XMLHttpRequest();
              xhr.open('GET', path);
              xhr.responseType = 'arraybuffer';

              xhr.onload = function () {
                _this._data = xhr.response;
                resolve();
              };

              xhr.onerror = function () {
                reject(new Error('request effect settings failed!'));
              };

              xhr.send(null);
            }
          });
        };

        _createClass(EffectSettings, [{
          key: "data",
          get: function get() {
            return this._data;
          }
        }]);

        return EffectSettings;
      }());

      _export("effectSettings", effectSettings = new EffectSettings());

      legacyCC.effectSettings = effectSettings;
    }
  };
});