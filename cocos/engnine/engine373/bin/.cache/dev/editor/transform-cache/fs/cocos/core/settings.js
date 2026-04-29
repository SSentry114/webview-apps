System.register("q-bundled:///fs/cocos/core/settings.js", ["../../../virtual/internal%253Aconstants.js", "./global-exports.js"], function (_export, _context) {
  "use strict";

  var HTML5, TAOBAO, TAOBAO_MINIGAME, legacyCC, Settings, Category, settings;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("Settings", void 0);

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      HTML5 = _virtualInternal253AconstantsJs.HTML5;
      TAOBAO = _virtualInternal253AconstantsJs.TAOBAO;
      TAOBAO_MINIGAME = _virtualInternal253AconstantsJs.TAOBAO_MINIGAME;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }],
    execute: function () {
      (function (Category) {
        Category["PATH"] = "path";
        Category["ENGINE"] = "engine";
        Category["ASSETS"] = "assets";
        Category["SCRIPTING"] = "scripting";
        Category["PHYSICS"] = "physics";
        Category["RENDERING"] = "rendering";
        Category["LAUNCH"] = "launch";
        Category["SCREEN"] = "screen";
        Category["SPLASH_SCREEN"] = "splashScreen";
        Category["ANIMATION"] = "animation";
        Category["PROFILING"] = "profiling";
        Category["PLUGINS"] = "plugins";
        Category["XR"] = "xr";
      })(Category || (Category = {}));

      /**
       * @zh
       * 配置模块用于获取 settings.json 配置文件中的配置信息，同时你可以覆盖一些配置从而影响引擎的启动和运行，可参考 [game.init] 的参数选项说明。你可以通过 [settings] 访问此模块单例。
       * @en
       * The Settings module is used to get the configuration information in the settings.json configuration file,
       * and you can override some of the configuration to affect the launch and running of the engine, as described in the [game.init] parameter options.
       * You can access this single instance of the module via [settings].
       */
      _export("Settings", Settings = class Settings {
        constructor() {
          this._settings = {};
          this._override = {};
        }

        /**
         * Initialization
         * @internal
         */
        init(path = '', overrides = {}) {
          for (const categoryName in overrides) {
            const category = overrides[categoryName];

            if (category) {
              for (const name in category) {
                this.overrideSettings(categoryName, name, category[name]);
              }
            }
          }

          if (!path) return Promise.resolve();
          return new Promise((resolve, reject) => {
            if (!HTML5 && !path.startsWith('http')) {
              // TODO: readJsonSync not working on Taobao IDE
              if (TAOBAO || TAOBAO_MINIGAME) {
                globalThis.fsUtils.readJson(path, (err, result) => {
                  if (err) {
                    reject(err);
                    return;
                  }

                  this._settings = result;
                  resolve();
                });
              } else {
                const result = fsUtils.readJsonSync(path);

                if (result instanceof Error) {
                  reject(result);
                } else {
                  this._settings = result;
                  resolve();
                }
              }
            } else {
              const xhr = new XMLHttpRequest();
              xhr.open('GET', path);
              xhr.responseType = 'text';

              xhr.onload = () => {
                this._settings = JSON.parse(xhr.response);
                resolve();
              };

              xhr.onerror = () => {
                reject(new Error('request settings failed!'));
              };

              xhr.send(null);
            }
          });
        }
        /**
         * @zh
         * 覆盖一部分配置数据。
         *
         * @en
         * Override some configuration info in Settings module.
         *
         * @param category @en The category you want to override. @zh 想要覆盖的分组。
         * @param name @en The name of the configuration in the category you want to override. @zh 分组中想要覆盖的具体配置名称。
         * @param value @en The value of the configuration you want to override. @zh 想要覆盖的具体值。
         *
         * @example
         * ```ts
         * console.log(settings.querySettings(Settings.Category.ASSETS, 'server')); // print https://www.cocos.com
         * settings.overrideSettings(Settings.Category.ASSETS, 'server', 'http://www.test.com');
         * console.log(settings.querySettings(Settings.Category.ASSETS, 'server')); // print http://www.test.com
         * ```
         */


        overrideSettings(category, name, value) {
          if (!(category in this._override)) {
            this._override[category] = {};
          }

          this._override[category][name] = value;
        }
        /**
         * @zh
         * 查询配置模块中具体分组中的具体配置值。
         *
         * @en
         * Query specific configuration values in specific category in the settings module.
         *
         * @param category @en The name of category to query. @zh 想要查询的分组名称。
         * @param name @en The name of configuration in category to query. @zh 分组中想要查询的具体的配置名称。
         * @returns @en The value of configuration to query. @zh 想要查询的具体配置值。
         *
         * @example
         * ```ts
         * console.log(settings.querySettings(Settings.Category.ENGINE, 'debug')); // print false
         * ```
         */


        querySettings(category, name) {
          if (category in this._override) {
            const categorySettings = this._override[category];

            if (categorySettings && name in categorySettings) {
              return categorySettings[name];
            }
          }

          if (category in this._settings) {
            const categorySettings = this._settings[category];

            if (categorySettings && name in categorySettings) {
              return categorySettings[name];
            }
          }

          return null;
        }

      });

      Settings.Category = Category;

      /**
       * @zh
       * Settings 模块单例，你能通过此单例访问 settings.json 中的配置数据。
       * @en
       * Settings module singleton, through this you can access the configuration data in settings.json.
       */
      _export("settings", settings = new Settings());

      legacyCC.settings = settings;
    }
  };
});