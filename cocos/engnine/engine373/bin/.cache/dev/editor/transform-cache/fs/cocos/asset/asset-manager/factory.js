System.register("q-bundled:///fs/cocos/asset/asset-manager/factory.js", ["../../../../virtual/internal%253Aconstants.js", "../assets/image-asset.js", "../assets/json-asset.js", "../assets/text-asset.js", "../assets/asset.js", "../assets/buffer-asset.js", "./bundle.js", "./cache.js", "./shared.js", "./utilities.js", "../../core/index.js"], function (_export, _context) {
  "use strict";

  var EDITOR, ImageAsset, JsonAsset, TextAsset, Asset, BufferAsset, Bundle, resources, Cache, assets, BuiltinBundleName, bundles, cache, js, Factory;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function createImageAsset(id, data, options, onComplete) {
    let out = null;
    let err = null;

    try {
      out = new ImageAsset();
      out._nativeUrl = id;
      out._nativeAsset = data;
    } catch (e) {
      err = e;
    }

    onComplete(err, out);
  }

  function createJsonAsset(id, data, options, onComplete) {
    const out = new JsonAsset();
    out.json = data;
    onComplete(null, out);
  }

  function createTextAsset(id, data, options, onComplete) {
    const out = new TextAsset();
    out.text = data;
    onComplete(null, out);
  }

  function createBufferAsset(id, data, options, onComplete) {
    const out = new BufferAsset();
    out._nativeUrl = id;
    out._nativeAsset = data;
    onComplete(null, out);
  }

  function createAsset(id, data, options, onComplete) {
    const out = new Asset();
    out._nativeUrl = id;
    out._nativeAsset = data;
    onComplete(null, out);
  }

  function createBundle(id, data, options, onComplete) {
    let bundle = bundles.get(data.name);

    if (!bundle) {
      bundle = data.name === BuiltinBundleName.RESOURCES ? resources : new Bundle();
      data.base = data.base || `${id}/`;
      bundle.init(data);
    } //HACK: Can not import scripts in GameView due to the difference of Scripting System between the GameView and Preview


    if (!EDITOR) {
      _context.import(`virtual:///prerequisite-imports/${bundle.name}`).then(() => {
        onComplete(null, bundle);
      }).catch(onComplete);
    } else {
      onComplete(null, bundle);
    }
  }

  _export("Factory", void 0);

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_assetsImageAssetJs) {
      ImageAsset = _assetsImageAssetJs.ImageAsset;
    }, function (_assetsJsonAssetJs) {
      JsonAsset = _assetsJsonAssetJs.default;
    }, function (_assetsTextAssetJs) {
      TextAsset = _assetsTextAssetJs.default;
    }, function (_assetsAssetJs) {
      Asset = _assetsAssetJs.Asset;
    }, function (_assetsBufferAssetJs) {
      BufferAsset = _assetsBufferAssetJs.BufferAsset;
    }, function (_bundleJs) {
      Bundle = _bundleJs.default;
      resources = _bundleJs.resources;
    }, function (_cacheJs) {
      Cache = _cacheJs.default;
    }, function (_sharedJs) {
      assets = _sharedJs.assets;
      BuiltinBundleName = _sharedJs.BuiltinBundleName;
      bundles = _sharedJs.bundles;
    }, function (_utilitiesJs) {
      cache = _utilitiesJs.cache;
    }, function (_coreIndexJs) {
      js = _coreIndexJs.js;
    }],
    execute: function () {
      _export("Factory", Factory = class Factory {
        constructor() {
          this._creating = new Cache();
          this._producers = {
            // Images
            '.png': createImageAsset,
            '.jpg': createImageAsset,
            '.bmp': createImageAsset,
            '.jpeg': createImageAsset,
            '.gif': createImageAsset,
            '.ico': createImageAsset,
            '.tiff': createImageAsset,
            '.webp': createImageAsset,
            '.image': createImageAsset,
            '.pvr': createImageAsset,
            '.pkm': createImageAsset,
            // Txt
            '.txt': createTextAsset,
            '.xml': createTextAsset,
            '.vsh': createTextAsset,
            '.fsh': createTextAsset,
            '.atlas': createTextAsset,
            '.tmx': createTextAsset,
            '.tsx': createTextAsset,
            '.fnt': createTextAsset,
            '.json': createJsonAsset,
            '.ExportJson': createJsonAsset,
            // Binary
            '.binary': createBufferAsset,
            '.bin': createBufferAsset,
            '.dbbin': createBufferAsset,
            '.skel': createBufferAsset,
            bundle: createBundle,
            default: createAsset
          };
        }

        register(type, handler) {
          if (typeof type === 'object') {
            js.mixin(this._producers, type);
          } else {
            this._producers[type] = handler;
          }
        }

        create(id, data, type, options, onComplete) {
          const handler = this._producers[type] || this._producers.default;
          const asset = assets.get(id);

          if (!options.reloadAsset && asset) {
            onComplete(null, asset);
            return;
          }

          const creating = this._creating.get(id);

          if (creating) {
            creating.push(onComplete);
            return;
          }

          this._creating.add(id, [onComplete]);

          handler(id, data, options, (err, result) => {
            if (!err && result instanceof Asset) {
              result._uuid = id;
              cache(id, result, options.cacheAsset);
            }

            const callbacks = this._creating.remove(id);

            for (let i = 0, l = callbacks.length; i < l; i++) {
              callbacks[i](err, result);
            }
          });
        }

      });

      _export("default", new Factory());
    }
  };
});