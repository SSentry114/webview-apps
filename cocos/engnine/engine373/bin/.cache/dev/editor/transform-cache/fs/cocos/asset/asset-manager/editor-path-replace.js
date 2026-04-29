System.register("q-bundled:///fs/cocos/asset/asset-manager/editor-path-replace.js", ["../../../../virtual/internal%253Aconstants.js", "../../core/index.js", "./shared.js"], function (_export, _context) {
  "use strict";

  var EDITOR, NATIVE, PREVIEW, TEST, assert, Settings, settings, fetchPipeline, pipeline, cache, resolveMap, replaceExtension, fetchText, queryExtension;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      NATIVE = _virtualInternal253AconstantsJs.NATIVE;
      PREVIEW = _virtualInternal253AconstantsJs.PREVIEW;
      TEST = _virtualInternal253AconstantsJs.TEST;
    }, function (_coreIndexJs) {
      assert = _coreIndexJs.assert;
      Settings = _coreIndexJs.Settings;
      settings = _coreIndexJs.settings;
    }, function (_sharedJs) {
      fetchPipeline = _sharedJs.fetchPipeline;
      pipeline = _sharedJs.pipeline;
    }],
    execute: function () {
      if ((EDITOR || PREVIEW) && !TEST) {
        cache = {};
        resolveMap = {};

        replaceExtension = (task, done) => {
          task.output = task.input;
          (async () => {
            for (let i = 0; i < task.input.length; i++) {
              const item = task.input[i];

              if (!item.uuid || item.isNative) {
                continue;
              }

              try {
                const extension = await queryExtension(item.overrideUuid || item.uuid);

                if (extension) {
                  item.ext = extension;
                  item.url = item.url.replace('.json', extension);
                }
              } catch (err) {
                continue;
              }
            }
          })().then(() => {
            done(null, null);
          }).catch(reason => {
            done(reason, null);
          });
        };

        fetchText = url => new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);

          xhr.onload = () => {
            if (xhr.status !== 200) {
              reject();
              return;
            }

            resolve(xhr.response);
          };

          xhr.send(null);
        });

        queryExtension = async uuid => {
          if (uuid in cache) {
            if (cache[uuid] !== null) {
              return cache[uuid];
            }

            return new Promise(resolve => {
              resolveMap[uuid] = resolveMap[uuid] || [];
              resolveMap[uuid].push(resolve);
            });
          }

          cache[uuid] = null;

          try {
            let text = '';

            if (EDITOR) {
              const info = await Editor.Message.request('asset-db', 'query-asset-info', uuid);

              if (info && info.library['.cconb']) {
                text = '.cconb';
              }
            } else {
              let previewServer = '';

              if (NATIVE) {
                previewServer = settings.querySettings(Settings.Category.PATH, 'previewServer') || '';
                assert(previewServer);
              }

              text = await fetchText(`${previewServer}/query-extname/${uuid}`);
            }

            cache[uuid] = text;

            if (resolveMap[uuid]) {
              resolveMap[uuid].forEach(func => func(text));
              resolveMap[uuid] = [];
            }

            return text;
          } catch (error) {
            console.error(error);
            cache[uuid] = '';
            return '';
          }
        };

        pipeline.insert(replaceExtension, 1);
        fetchPipeline.insert(replaceExtension, 1);
      }
    }
  };
});