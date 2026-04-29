System.register("q-bundled:///fs/cocos/asset/asset-manager/url-transformer.js", ["../../../../virtual/internal%253Aconstants.js", "../../core/index.js", "./helper.js", "./request-item.js", "./shared.js"], function (_export, _context) {
  "use strict";

  var EDITOR, PREVIEW, warnID, js, path, cclegacy, decodeUuid, RequestItem, assetsOverrideMap, bundles, presets, RequestType, infos;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function parse(task) {
    var options = task.options;
    var input = Array.isArray(task.input) ? task.input : [task.input];
    task.output = [];

    var _loop = function _loop(i) {
      var _info2;

      var item = input[i];
      var out = RequestItem.create();
      var config = null;
      var info = null;

      if (typeof item === 'string') {
        item = Object.create(null);
        item[options.__requestType__ || RequestType.UUID] = input[i];
      }

      if (typeof item === 'object') {
        // local options will overlap glabal options
        js.addon(item, options);

        if (item.preset) {
          js.addon(item, presets[item.preset]);
        }

        for (var key in item) {
          switch (key) {
            case RequestType.UUID:
              {
                var _ret2 = function () {
                  var _info;

                  var uuid = out.uuid = decodeUuid(item.uuid);

                  if (!item.bundle) {
                    var bundle = bundles.find(function (bundle) {
                      return !!bundle.getAssetInfo(uuid);
                    });
                    item.bundle = bundle && bundle.name;
                  }

                  if (bundles.has(item.bundle)) {
                    config = bundles.get(item.bundle).config;
                    info = config.getAssetInfo(uuid);

                    if (info && info.redirect) {
                      if (!bundles.has(info.redirect)) {
                        throw new Error("Please load bundle " + info.redirect + " first");
                      }

                      config = bundles.get(info.redirect).config;
                      info = config.getAssetInfo(uuid);
                    }

                    out.config = config;
                    out.info = info;
                  }

                  out.ext = item.ext || ((_info = info) === null || _info === void 0 ? void 0 : _info.extension) || '.json';
                  return "break";
                }();

                if (_ret2 === "break") break;
              }

            case '__requestType__':
            case 'ext':
            case 'bundle':
            case 'preset':
            case 'type':
              break;

            case RequestType.DIR:
              if (bundles.has(item.bundle)) {
                bundles.get(item.bundle).config.getDirWithPath(item.dir, item.type, infos);

                for (var _iterator = _createForOfIteratorHelperLoose(infos), _step; !(_step = _iterator()).done;) {
                  var assetInfo = _step.value;
                  input.push({
                    uuid: assetInfo.uuid,
                    __isNative__: false,
                    ext: assetInfo.extension || '.json',
                    bundle: item.bundle
                  });
                }

                infos.length = 0;
              }

              out.recycle();
              out = null;
              break;

            case RequestType.PATH:
              if (bundles.has(item.bundle)) {
                config = bundles.get(item.bundle).config;
                info = config.getInfoWithPath(item.path, item.type);

                if (info && info.redirect) {
                  if (!bundles.has(info.redirect)) {
                    throw new Error("you need to load bundle " + info.redirect + " first");
                  }

                  config = bundles.get(info.redirect).config;
                  info = config.getAssetInfo(info.uuid);
                }

                if (!info) {
                  out.recycle();
                  throw new Error("Bundle " + item.bundle + " doesn't contain " + item.path);
                }

                out.config = config;
                out.uuid = info.uuid;
                out.info = info;
              }

              out.ext = item.ext || ((_info2 = info) === null || _info2 === void 0 ? void 0 : _info2.extension) || '.json';
              break;

            case RequestType.SCENE:
              if (!item.bundle) {
                var bundle = bundles.find(function (bundle) {
                  return !!bundle.getSceneInfo(item.scene);
                });
                item.bundle = bundle && bundle.name;
              }

              if (bundles.has(item.bundle)) {
                config = bundles.get(item.bundle).config;
                info = config.getSceneInfo(item.scene);

                if (info && info.redirect) {
                  if (!bundles.has(info.redirect)) {
                    throw new Error("you need to load bundle " + info.redirect + " first");
                  }

                  config = bundles.get(info.redirect).config;
                  info = config.getAssetInfo(info.uuid);
                }

                if (!info) {
                  out.recycle();
                  throw new Error("Bundle " + config.name + " doesn't contain scene " + item.scene);
                }

                out.config = config;
                out.uuid = info.uuid;
                out.info = info;
              }

              break;

            case '__isNative__':
              out.isNative = item.__isNative__;
              break;

            case RequestType.URL:
              out.url = item.url;
              out.uuid = item.uuid || item.url;
              out.ext = item.ext || path.extname(item.url);
              out.isNative = item.__isNative__ !== undefined ? item.__isNative__ : true;
              break;

            default:
              out.options[key] = item[key];
          }

          if (!out) {
            break;
          }
        }
      }

      if (!out) {
        return "continue";
      }

      task.output.push(out);

      if (!out.uuid && !out.url) {
        throw new Error("Can not parse this input:" + JSON.stringify(item));
      }
    };

    for (var i = 0; i < input.length; i++) {
      var _ret = _loop(i);

      if (_ret === "continue") continue;
    }

    return null;
  }

  function replaceOverrideAsset(task) {
    var input = task.output = task.input;

    for (var i = 0; i < input.length; i++) {
      var item = input[i];

      if (assetsOverrideMap.has(item.uuid)) {
        var _ret3 = function () {
          var uuid = assetsOverrideMap.get(item.uuid);

          if (EDITOR || PREVIEW) {
            // In EDITOR, there is no bundle, so just change uuid.
            item.overrideUuid = uuid;
            item.ext = item.isNative ? item.ext : '.json';
            return "continue";
          }

          var bundle = bundles.find(function (bundle) {
            return !!bundle.getAssetInfo(uuid);
          });

          if (bundle) {
            var _info3;

            item.overrideUuid = uuid;
            var config = bundle.config;
            var info = config.getAssetInfo(uuid);

            if (info && info.redirect) {
              if (!bundles.has(info.redirect)) {
                throw new Error("Please load bundle " + info.redirect + " first");
              }

              config = bundles.get(info.redirect).config;
              info = config.getAssetInfo(uuid);
            }

            item.config = config;
            item.info = info;
            item.ext = item.isNative ? item.ext : ((_info3 = info) === null || _info3 === void 0 ? void 0 : _info3.extension) || '.json';
          } else {
            warnID(16201, uuid, item.uuid);
          }
        }();

        if (_ret3 === "continue") continue;
      }
    }
  }

  function combine(task) {
    var input = task.output = task.input;

    for (var i = 0; i < input.length; i++) {
      var item = input[i];

      if (item.url) {
        continue;
      }

      var url = '';
      var base = '';
      var config = item.config;

      if (item.isNative) {
        base = config && config.nativeBase ? config.base + config.nativeBase : cclegacy.assetManager.generalNativeBase;
      } else {
        base = config && config.importBase ? config.base + config.importBase : cclegacy.assetManager.generalImportBase;
      }

      var uuid = item.overrideUuid || item.uuid;
      var ver = '';

      if (item.info) {
        if (item.isNative) {
          ver = item.info.nativeVer ? "." + item.info.nativeVer : '';
        } else {
          ver = item.info.ver ? "." + item.info.ver : '';
        }
      } // ugly hack, WeChat does not support loading font likes 'myfont.dw213.ttf'. So append hash to directory


      if (item.ext === '.ttf') {
        url = base + "/" + uuid.slice(0, 2) + "/" + uuid + ver + "/" + item.options.__nativeName__;
      } else {
        url = base + "/" + uuid.slice(0, 2) + "/" + uuid + ver + item.ext;
      }

      item.url = url;
    }

    return null;
  }

  _export({
    parse: parse,
    replaceOverrideAsset: replaceOverrideAsset,
    combine: combine
  });

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      PREVIEW = _virtualInternal253AconstantsJs.PREVIEW;
    }, function (_coreIndexJs) {
      warnID = _coreIndexJs.warnID;
      js = _coreIndexJs.js;
      path = _coreIndexJs.path;
      cclegacy = _coreIndexJs.cclegacy;
    }, function (_helperJs) {
      decodeUuid = _helperJs.decodeUuid;
    }, function (_requestItemJs) {
      RequestItem = _requestItemJs.default;
    }, function (_sharedJs) {
      assetsOverrideMap = _sharedJs.assetsOverrideMap;
      bundles = _sharedJs.bundles;
      presets = _sharedJs.presets;
      RequestType = _sharedJs.RequestType;
    }],
    execute: function () {
      infos = [];
    }
  };
});