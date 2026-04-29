System.register("q-bundled:///fs/cocos/asset/asset-manager/editor-path-replace.js", ["../../../../virtual/internal%253Aconstants.js", "../../core/index.js", "./shared.js"], function (_export, _context) {
  "use strict";

  var EDITOR, NATIVE, PREVIEW, TEST, assert, Settings, settings, fetchPipeline, pipeline, cache, resolveMap, replaceExtension, fetchText, queryExtension;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

        replaceExtension = function replaceExtension(task, done) {
          task.output = task.input;

          _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var i, item, extension;
            return regeneratorRuntime.wrap(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    i = 0;

                  case 1:
                    if (!(i < task.input.length)) {
                      _context2.next = 18;
                      break;
                    }

                    item = task.input[i];

                    if (!(!item.uuid || item.isNative)) {
                      _context2.next = 5;
                      break;
                    }

                    return _context2.abrupt("continue", 15);

                  case 5:
                    _context2.prev = 5;
                    _context2.next = 8;
                    return queryExtension(item.overrideUuid || item.uuid);

                  case 8:
                    extension = _context2.sent;

                    if (extension) {
                      item.ext = extension;
                      item.url = item.url.replace('.json', extension);
                    }

                    _context2.next = 15;
                    break;

                  case 12:
                    _context2.prev = 12;
                    _context2.t0 = _context2["catch"](5);
                    return _context2.abrupt("continue", 15);

                  case 15:
                    i++;
                    _context2.next = 1;
                    break;

                  case 18:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee, null, [[5, 12]]);
          }))().then(function () {
            done(null, null);
          })["catch"](function (reason) {
            done(reason, null);
          });
        };

        fetchText = function fetchText(url) {
          return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);

            xhr.onload = function () {
              if (xhr.status !== 200) {
                reject();
                return;
              }

              resolve(xhr.response);
            };

            xhr.send(null);
          });
        };

        queryExtension = /*#__PURE__*/function () {
          var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(uuid) {
            var text, info, previewServer;
            return regeneratorRuntime.wrap(function _callee2$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    if (!(uuid in cache)) {
                      _context3.next = 4;
                      break;
                    }

                    if (!(cache[uuid] !== null)) {
                      _context3.next = 3;
                      break;
                    }

                    return _context3.abrupt("return", cache[uuid]);

                  case 3:
                    return _context3.abrupt("return", new Promise(function (resolve) {
                      resolveMap[uuid] = resolveMap[uuid] || [];
                      resolveMap[uuid].push(resolve);
                    }));

                  case 4:
                    cache[uuid] = null;
                    _context3.prev = 5;
                    text = '';

                    if (!EDITOR) {
                      _context3.next = 14;
                      break;
                    }

                    _context3.next = 10;
                    return Editor.Message.request('asset-db', 'query-asset-info', uuid);

                  case 10:
                    info = _context3.sent;

                    if (info && info.library['.cconb']) {
                      text = '.cconb';
                    }

                    _context3.next = 19;
                    break;

                  case 14:
                    previewServer = '';

                    if (NATIVE) {
                      previewServer = settings.querySettings(Settings.Category.PATH, 'previewServer') || '';
                      assert(previewServer);
                    }

                    _context3.next = 18;
                    return fetchText(previewServer + "/query-extname/" + uuid);

                  case 18:
                    text = _context3.sent;

                  case 19:
                    cache[uuid] = text;

                    if (resolveMap[uuid]) {
                      resolveMap[uuid].forEach(function (func) {
                        return func(text);
                      });
                      resolveMap[uuid] = [];
                    }

                    return _context3.abrupt("return", text);

                  case 24:
                    _context3.prev = 24;
                    _context3.t0 = _context3["catch"](5);
                    console.error(_context3.t0);
                    cache[uuid] = '';
                    return _context3.abrupt("return", '');

                  case 29:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee2, null, [[5, 24]]);
          }));

          return function queryExtension(_x) {
            return _ref2.apply(this, arguments);
          };
        }();

        pipeline.insert(replaceExtension, 1);
        fetchPipeline.insert(replaceExtension, 1);
      }
    }
  };
});