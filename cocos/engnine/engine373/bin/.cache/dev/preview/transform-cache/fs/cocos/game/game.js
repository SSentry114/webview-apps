System.register("q-bundled:///fs/cocos/game/game.js", ["../../../virtual/internal%253Aconstants.js", "pal/system-info", "pal/env", "pal/pacer", "../asset/asset-manager/asset-manager.js", "../core/index.js", "../input/index.js", "../gfx/index.js", "./splash-screen.js", "../rendering/index.js", "../scene-graph/index.js", "../asset/asset-manager/builtin-res-mgr.js", "./director.js", "../rendering/define.js", "../core/effect-settings.js"], function (_export, _context) {
  "use strict";

  var DEBUG, EDITOR, NATIVE, PREVIEW, TEST, systemInfo, findCanvas, loadJsFile, Pacer, assetManager, EventTarget, AsyncDelegate, sys, macro, VERSION, cclegacy, screen, Settings, settings, assert, garbageCollectionManager, DebugMode, warn, _resetDebugSetting, input, deviceManager, LegacyRenderMode, SplashScreen, RenderPipeline, Layers, builtinResMgr, Director, director, bindingMappingInfo, effectSettings, Game, game;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      DEBUG = _virtualInternal253AconstantsJs.DEBUG;
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      NATIVE = _virtualInternal253AconstantsJs.NATIVE;
      PREVIEW = _virtualInternal253AconstantsJs.PREVIEW;
      TEST = _virtualInternal253AconstantsJs.TEST;
    }, function (_palSystemInfo) {
      systemInfo = _palSystemInfo.systemInfo;
    }, function (_palEnv) {
      findCanvas = _palEnv.findCanvas;
      loadJsFile = _palEnv.loadJsFile;
    }, function (_palPacer) {
      Pacer = _palPacer.Pacer;
    }, function (_assetAssetManagerAssetManagerJs) {
      assetManager = _assetAssetManagerAssetManagerJs.default;
    }, function (_coreIndexJs) {
      EventTarget = _coreIndexJs.EventTarget;
      AsyncDelegate = _coreIndexJs.AsyncDelegate;
      sys = _coreIndexJs.sys;
      macro = _coreIndexJs.macro;
      VERSION = _coreIndexJs.VERSION;
      cclegacy = _coreIndexJs.cclegacy;
      screen = _coreIndexJs.screen;
      Settings = _coreIndexJs.Settings;
      settings = _coreIndexJs.settings;
      assert = _coreIndexJs.assert;
      garbageCollectionManager = _coreIndexJs.garbageCollectionManager;
      DebugMode = _coreIndexJs.DebugMode;
      warn = _coreIndexJs.warn;
      _resetDebugSetting = _coreIndexJs._resetDebugSetting;
    }, function (_inputIndexJs) {
      input = _inputIndexJs.input;
    }, function (_gfxIndexJs) {
      deviceManager = _gfxIndexJs.deviceManager;
      LegacyRenderMode = _gfxIndexJs.LegacyRenderMode;
    }, function (_splashScreenJs) {
      SplashScreen = _splashScreenJs.SplashScreen;
    }, function (_renderingIndexJs) {
      RenderPipeline = _renderingIndexJs.RenderPipeline;
    }, function (_sceneGraphIndexJs) {
      Layers = _sceneGraphIndexJs.Layers;
    }, function (_assetAssetManagerBuiltinResMgrJs) {
      builtinResMgr = _assetAssetManagerBuiltinResMgrJs.builtinResMgr;
    }, function (_directorJs) {
      Director = _directorJs.Director;
      director = _directorJs.director;
    }, function (_renderingDefineJs) {
      bindingMappingInfo = _renderingDefineJs.bindingMappingInfo;
    }, function (_coreEffectSettingsJs) {
      effectSettings = _coreEffectSettingsJs.effectSettings;
    }],
    execute: function () {
      /**
       * @en An object to boot the game.
       * @zh 包含游戏主体信息并负责驱动游戏的游戏对象。
       */
      _export("Game", Game = /*#__PURE__*/function (_EventTarget) {
        _inheritsLoose(Game, _EventTarget);

        function Game() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _EventTarget.call.apply(_EventTarget, [this].concat(args)) || this;
          _this.frame = null;
          _this.container = null;
          _this.canvas = null;
          _this.renderType = -1;
          _this.eventTargetOn = _EventTarget.prototype.on;
          _this.eventTargetOnce = _EventTarget.prototype.once;
          _this.config = {};
          _this.onStart = null;
          _this.frameTime = 1000 / 60;
          _this._isCloning = false;
          _this._inited = false;
          _this._engineInited = false;
          _this._rendererInitialized = false;
          _this._paused = true;
          _this._pausedByEngine = false;
          _this._frameRate = 60;
          _this._pacer = null;
          _this._initTime = 0;
          _this._startTime = 0;
          _this._deltaTime = 0.0;
          _this._useFixedDeltaTime = false;
          _this._shouldLoadLaunchScene = true;
          _this.onPreBaseInitDelegate = new AsyncDelegate();
          _this.onPostBaseInitDelegate = new AsyncDelegate();
          _this.onPreInfrastructureInitDelegate = new AsyncDelegate();
          _this.onPostInfrastructureInitDelegate = new AsyncDelegate();
          _this.onPreSubsystemInitDelegate = new AsyncDelegate();
          _this.onPostSubsystemInitDelegate = new AsyncDelegate();
          _this.onPreProjectInitDelegate = new AsyncDelegate();
          _this.onPostProjectInitDelegate = new AsyncDelegate();
          return _this;
        }

        var _proto = Game.prototype;

        // @Methods
        //  @Game play control

        /**
         * @en Set frame rate of game.
         * @zh 设置游戏帧率。
         * @deprecated since v3.3.0 please use [[game.frameRate]]
         */
        _proto.setFrameRate = function setFrameRate(frameRate) {
          this.frameRate = frameRate;
        }
        /**
         * @en Get frame rate set for the game, it doesn't represent the real frame rate.
         * @zh 获取设置的游戏帧率（不等同于实际帧率）。
         * @return frame rate
         * @deprecated since v3.3.0 please use [[game.frameRate]]
         */
        ;

        _proto.getFrameRate = function getFrameRate() {
          return this.frameRate;
        }
        /**
         * @en Run the game frame by frame with a fixed delta time correspond to frame rate.
         * @zh 以固定帧间隔执行一帧游戏循环，帧间隔与设定的帧率匹配。
         */
        ;

        _proto.step = function step() {
          director.tick(this._calculateDT(true));
        }
        /**
         * @en Called by the engine to pause the game.
         * @zh 提供给引擎调用暂停游戏接口。
         */
        ;

        _proto.pauseByEngine = function pauseByEngine() {
          if (this._paused) {
            return;
          }

          this._pausedByEngine = true;
          this.pause();
        }
        /**
         * @en Resume paused game by engine call.
         * @zh 提供给引擎调用恢复暂停游戏接口。
         */
        ;

        _proto.resumeByEngine = function resumeByEngine() {
          if (this._pausedByEngine) {
            this.resume();
            this._pausedByEngine = false;
          }
        }
        /**
         * @en Pause the game main loop. This will pause:
         * - game logic execution
         * - rendering process
         * - input event dispatching (excluding Web and Minigame platforms)
         *
         * This is different with `director.pause()` which only pause the game logic execution.
         *
         * @zh 暂停游戏主循环。包含：
         * - 游戏逻辑
         * - 渲染
         * - 输入事件派发（Web 和小游戏平台除外）
         *
         * 这点和只暂停游戏逻辑的 `director.pause()` 不同。
         */
        ;

        _proto.pause = function pause() {
          var _this$_pacer;

          if (this._paused) {
            return;
          }

          this._paused = true;
          (_this$_pacer = this._pacer) === null || _this$_pacer === void 0 ? void 0 : _this$_pacer.stop();
          this.emit(Game.EVENT_PAUSE);
        }
        /**
         * @en Resume the game from pause. This will resume:<br>
         * game logic execution, rendering process, event manager, background music and all audio effects.<br>
         * @zh 恢复游戏主循环。包含：游戏逻辑，渲染，事件处理，背景音乐和所有音效。
         */
        ;

        _proto.resume = function resume() {
          var _this$_pacer2;

          if (!this._paused) {
            return;
          } // @ts-expect-error _clearEvents is a private method.


          input._clearEvents();

          this._paused = false;
          (_this$_pacer2 = this._pacer) === null || _this$_pacer2 === void 0 ? void 0 : _this$_pacer2.start();
          this.emit(Game.EVENT_RESUME);
        }
        /**
         * @en Check whether the game is paused.
         * @zh 判断游戏是否暂停。
         */
        ;

        _proto.isPaused = function isPaused() {
          return this._paused;
        }
        /**
         * @en Restart game.
         * @zh 重新开始游戏
         */
        ;

        _proto.restart = function restart() {
          var _this2 = this;

          var endFramePromise = new Promise(function (resolve) {
            director.once(Director.EVENT_END_FRAME, function () {
              return resolve();
            });
          });
          return endFramePromise.then(function () {
            director.reset();

            cclegacy.Object._deferredDestroy();

            _this2.pause();

            _this2.resume();

            _this2._shouldLoadLaunchScene = true;
            SplashScreen.instance.curTime = 0;

            _this2._safeEmit(Game.EVENT_RESTART);
          });
        }
        /**
         * @en End game, it will close the game window
         * @zh 退出游戏
         */
        ;

        _proto.end = function end() {
          systemInfo.close();
        }
        /**
         * @en
         * Register an callback of a specific event type on the game object.<br>
         * This type of event should be triggered via `emit`.<br>
         * @zh
         * 注册 game 的特定事件类型回调。这种类型的事件应该被 `emit` 触发。<br>
         *
         * @param type - A string representing the event type to listen for.
         * @param callback - The callback that will be invoked when the event is dispatched.<br>
         *                              The callback is ignored if it is a duplicate (the callbacks are unique).
         * @param target - The target (this object) to invoke the callback, can be null
         * @param once - After the first invocation, whether the callback should be unregistered.
         * @return - Just returns the incoming callback so you can save the anonymous function easier.
         */
        ;

        _proto.on = function on(type, callback, target, once) {
          // Make sure EVENT_ENGINE_INITED callbacks to be invoked
          if (this._engineInited && type === Game.EVENT_ENGINE_INITED || this._inited && type === Game.EVENT_GAME_INITED || this._rendererInitialized && type === Game.EVENT_RENDERER_INITED) {
            callback.call(target);
          }

          return this.eventTargetOn(type, callback, target, once);
        }
        /**
         * @en
         * Register an callback of a specific event type on the game object,<br>
         * the callback will remove itself after the first time it is triggered.<br>
         * @zh
         * 注册 game 的特定事件类型回调，回调会在第一时间被触发后删除自身。
         *
         * @param type - A string representing the event type to listen for.
         * @param callback - The callback that will be invoked when the event is dispatched.<br>
         *                              The callback is ignored if it is a duplicate (the callbacks are unique).
         * @param target - The target (this object) to invoke the callback, can be null
         */
        ;

        _proto.once = function once(type, callback, target) {
          // Make sure EVENT_ENGINE_INITED callbacks to be invoked
          if (this._engineInited && type === Game.EVENT_ENGINE_INITED) {
            return callback.call(target);
          }

          return this.eventTargetOnce(type, callback, target);
        }
        /**
         * @en Init game with configuration object. Initialization process like below:
         * -PreBaseInitEvent
         * -BaseModuleInitialization(logging, sys, settings)
         * -PostBaseInitEvent
         * -PreInfrastructureInitEvent
         * -InfrastructureModuleInitialization(assetManager, builtinResMgr, gfxDevice, screen, Layer, macro)
         * -PostInfrastructureInitEvent
         * -PreSubsystemInitEvent
         * -SubsystemModuleInitialization(animation, physics, tween, ui, middleware, etc)
         * -PostSubsystemInitEvent
         * -EngineInitedEvent
         * -PreProjectDataInitEvent
         * -ProjectDataInitialization(GamePlayScripts, resources, etc)
         * -PostProjectDataInitEvent
         * -GameInitedEvent
         *
         * @zh 使用指定的配置初始化引擎。初始化流程如下：
         * -PreBaseInitEvent
         * -BaseModuleInitialization(logging, sys, settings)
         * -PostBaseInitEvent
         * -PreInfrastructureInitEvent
         * -InfrastructureModuleInitialization(assetManager, builtinResMgr, gfxDevice, screen, Layer, macro)
         * -PostInfrastructureInitEvent
         * -PreSubsystemInitEvent
         * -SubsystemModuleInitialization(animation, physics, tween, ui, middleware, etc)
         * -PostSubsystemInitEvent
         * -EngineInitedEvent
         * -PreProjectDataInitEvent
         * -ProjectDataInitialization(GamePlayScripts, resources, etc)
         * -PostProjectDataInitEvent
         * -GameInitedEvent
         * @param config - Pass configuration object
         */
        ;

        _proto.init = function init(config) {
          var _this3 = this;

          this._compatibleWithOldParams(config); // DONT change the order unless you know what's you doing


          return Promise.resolve() // #region Base
          .then(function () {
            _this3.emit(Game.EVENT_PRE_BASE_INIT);

            return _this3.onPreBaseInitDelegate.dispatch();
          }).then(function () {
            if (DEBUG) {
              console.time('Init Base');
            }

            var debugMode = config.debugMode || DebugMode.NONE;

            _resetDebugSetting(debugMode);
          }).then(function () {
            return sys.init();
          }).then(function () {
            _this3._initEvents();
          }).then(function () {
            return settings.init(config.settingsPath, config.overrideSettings);
          }).then(function () {
            if (DEBUG) {
              console.timeEnd('Init Base');
            }

            _this3.emit(Game.EVENT_POST_BASE_INIT);

            return _this3.onPostBaseInitDelegate.dispatch();
          }) // #endregion Base
          // #region Infrastructure
          .then(function () {
            _this3.emit(Game.EVENT_PRE_INFRASTRUCTURE_INIT);

            return _this3.onPreInfrastructureInitDelegate.dispatch();
          }).then(function () {
            if (DEBUG) {
              console.time('Init Infrastructure');
            }

            macro.init();

            _this3._initXR();

            var adapter = findCanvas();

            if (adapter) {
              _this3.canvas = adapter.canvas;
              _this3.frame = adapter.frame;
              _this3.container = adapter.container;
            }

            screen.init();
            garbageCollectionManager.init();
            deviceManager.init(_this3.canvas, bindingMappingInfo);

            if (macro.CUSTOM_PIPELINE_NAME === '') {
              cclegacy.rendering = undefined;
            }

            assetManager.init();
            builtinResMgr.init();
            Layers.init();

            _this3.initPacer();

            if (DEBUG) {
              console.timeEnd('Init Infrastructure');
            }
          }).then(function () {
            _this3.emit(Game.EVENT_POST_INFRASTRUCTURE_INIT);

            return _this3.onPostInfrastructureInitDelegate.dispatch();
          }) // #endregion Infrastructure
          // #region Subsystem
          .then(function () {
            _this3.emit(Game.EVENT_PRE_SUBSYSTEM_INIT);

            return _this3.onPreSubsystemInitDelegate.dispatch();
          }).then(function () {
            return effectSettings.init(settings.querySettings(Settings.Category.RENDERING, 'effectSettingsPath'));
          }).then(function () {
            // initialize custom render pipeline
            if (!cclegacy.rendering || !cclegacy.rendering.enableEffectImport) {
              return;
            }

            var renderMode = settings.querySettings(Settings.Category.RENDERING, 'renderMode');

            if (renderMode === LegacyRenderMode.HEADLESS) {
              cclegacy.rendering.init(deviceManager.gfxDevice, null);
              return;
            }

            var data = effectSettings.data;

            if (data === null) {
              console.error('Effect settings not found, effects will not be imported.');
              return;
            }

            cclegacy.rendering.init(deviceManager.gfxDevice, data);
          }).then(function () {
            if (DEBUG) {
              console.time('Init SubSystem');
            }

            director.init();
            return builtinResMgr.loadBuiltinAssets();
          }).then(function () {
            if (DEBUG) {
              console.timeEnd('Init SubSystem');
            }

            _this3.emit(Game.EVENT_POST_SUBSYSTEM_INIT);

            return _this3.onPostSubsystemInitDelegate.dispatch();
          }).then(function () {
            console.log("Cocos Creator v" + VERSION);

            _this3.emit(Game.EVENT_ENGINE_INITED);

            _this3._engineInited = true;
          }) // #endregion Subsystem
          // #region Project
          .then(function () {
            _this3.emit(Game.EVENT_PRE_PROJECT_INIT);

            return _this3.onPreProjectInitDelegate.dispatch();
          }).then(function () {
            if (DEBUG) {
              console.time('Init Project');
            }

            var jsList = settings.querySettings(Settings.Category.PLUGINS, 'jsList');
            var promise = Promise.resolve();

            if (jsList) {
              jsList.forEach(function (jsListFile) {
                promise = promise.then(function () {
                  return loadJsFile((PREVIEW ? 'plugins' : 'src') + "/" + jsListFile);
                });
              });
            }

            return promise;
          }).then(function () {
            var scriptPackages = settings.querySettings(Settings.Category.SCRIPTING, 'scriptPackages');

            if (scriptPackages) {
              return Promise.all(scriptPackages.map(function (pack) {
                return _context["import"]("" + pack);
              }));
            }

            return Promise.resolve([]);
          }).then(function () {
            return _this3._loadProjectBundles();
          }).then(function () {
            return _this3._loadCCEScripts();
          }).then(function () {
            return _this3._setupRenderPipeline();
          }).then(function () {
            return _this3._loadPreloadAssets();
          }).then(function () {
            builtinResMgr.compileBuiltinMaterial();
            return SplashScreen.instance.init();
          }).then(function () {
            if (DEBUG) {
              console.timeEnd('Init Project');
            }

            _this3.emit(Game.EVENT_POST_PROJECT_INIT);

            return _this3.onPostProjectInitDelegate.dispatch();
          }) // #endregion Project
          .then(function () {
            _this3._inited = true;

            _this3._safeEmit(Game.EVENT_GAME_INITED);
          });
        };

        _proto._initXR = function _initXR() {
          var _settings$querySettin;

          if (typeof globalThis.__globalXR === 'undefined') {
            globalThis.__globalXR = {};
          }

          var globalXR = globalThis.__globalXR;
          globalXR.webxrCompatible = (_settings$querySettin = settings.querySettings(Settings.Category.XR, 'webxrCompatible')) !== null && _settings$querySettin !== void 0 ? _settings$querySettin : false;

          if (sys.isXR) {
            var _settings$querySettin2, _settings$querySettin3;

            // XrEntry must not be destroyed
            xr.entry = xr.XrEntry.getInstance();
            var xrMSAA = (_settings$querySettin2 = settings.querySettings(Settings.Category.RENDERING, 'msaa')) !== null && _settings$querySettin2 !== void 0 ? _settings$querySettin2 : 1;
            var xrRenderingScale = (_settings$querySettin3 = settings.querySettings(Settings.Category.RENDERING, 'renderingScale')) !== null && _settings$querySettin3 !== void 0 ? _settings$querySettin3 : 1.0;
            xr.entry.setMultisamplesRTT(xrMSAA);
            xr.entry.setRenderingScale(xrRenderingScale);
          }
        };

        _proto._compatibleWithOldParams = function _compatibleWithOldParams(config) {
          var overrideSettings = config.overrideSettings = config.overrideSettings || {};

          if ('showFPS' in config) {
            overrideSettings.profiling = overrideSettings.profiling || {};
            overrideSettings.profiling.showFPS = config.showFPS;
          }

          if ('frameRate' in config) {
            overrideSettings.screen = overrideSettings.screen || {};
            overrideSettings.screen.frameRate = config.frameRate;
          }

          if ('renderMode' in config) {
            overrideSettings.rendering = overrideSettings.rendering || {};
            overrideSettings.rendering.renderMode = config.renderMode;
          }

          if ('renderPipeline' in config) {
            overrideSettings.rendering = overrideSettings.rendering || {};
            overrideSettings.rendering.renderPipeline = config.renderPipeline;
          }

          if ('assetOptions' in config) {
            overrideSettings.assets = overrideSettings.assets || {};
            Object.assign(overrideSettings.assets, config.assetOptions);
          }

          if ('customJointTextureLayouts' in config) {
            overrideSettings.animation = overrideSettings.animation || {};
            overrideSettings.animation.customJointTextureLayouts = config.customJointTextureLayouts;
          }

          if ('physics' in config) {
            overrideSettings.physics = overrideSettings.physics || {};
            Object.assign(overrideSettings.physics, config.physics);
          }

          if ('orientation' in config) {
            overrideSettings.screen = overrideSettings.screen || {};
            overrideSettings.screen.orientation = config.orientation;
          }

          if ('exactFitScreen' in config) {
            overrideSettings.screen = overrideSettings.screen || {};
            overrideSettings.screen.exactFitScreen = config.exactFitScreen;
          }
        };

        _proto._loadPreloadAssets = function _loadPreloadAssets() {
          var preloadAssets = settings.querySettings(Settings.Category.ASSETS, 'preloadAssets');
          if (!preloadAssets) return Promise.resolve([]);
          return Promise.all(preloadAssets.map(function (uuid) {
            return new Promise(function (resolve, reject) {
              assetManager.loadAny(uuid, function (err) {
                if (err) {
                  reject(err);
                  return;
                }

                resolve();
              });
            });
          }));
        }
        /**
         * @internal only for browser preview
         */
        ;

        _proto._loadCCEScripts = function _loadCCEScripts() {
          return new Promise(function (resolve, reject) {
            // Since there is no script in the bundle during preview, we need to load the user's script in the following way
            if (PREVIEW && !TEST && !EDITOR && !NATIVE) {
              var bundneName = 'cce:/internal/x/prerequisite-imports';

              _context["import"]("" + bundneName).then(function () {
                return resolve();
              }, function (reason) {
                return reject(reason);
              });
            } else {
              resolve();
            }
          });
        }
        /**
         * @internal only for game-view
         */
        ;

        _proto._loadProjectBundles = function _loadProjectBundles() {
          var preloadBundles = settings.querySettings(Settings.Category.ASSETS, 'preloadBundles');
          if (!preloadBundles) return Promise.resolve([]);
          return Promise.all(preloadBundles.map(function (_ref) {
            var bundle = _ref.bundle,
                version = _ref.version;
            return new Promise(function (resolve, reject) {
              var opts = {};
              if (version) opts.version = version;
              assetManager.loadBundle(bundle, opts, function (err) {
                if (err) {
                  reject(err);
                  return;
                }

                resolve();
              });
            });
          }));
        }
        /**
         * @en Run game with configuration object and onStart function.
         * @zh 运行游戏，并且指定引擎配置和 onStart 的回调。
         * @param onStart - function to be executed after game initialized
         */
        ;

        _proto.run = function run(onStart) {
          if (onStart) {
            this.onStart = onStart;
          }

          if (!this._inited || EDITOR && !cclegacy.GAME_VIEW) {
            return;
          }

          this.resume();
        } // @Methods
        ;

        _proto._calculateDT = function _calculateDT(useFixedDeltaTime) {
          this._useFixedDeltaTime = useFixedDeltaTime;

          if (useFixedDeltaTime) {
            this._startTime = performance.now();
            return this.frameTime / 1000;
          }

          var now = performance.now();
          this._deltaTime = now > this._startTime ? (now - this._startTime) / 1000 : 0;

          if (this._deltaTime > Game.DEBUG_DT_THRESHOLD) {
            this._deltaTime = this.frameTime / 1000;
          }

          this._startTime = now;
          return this._deltaTime;
        };

        _proto._updateCallback = function _updateCallback() {
          var _this4 = this;

          if (!this._inited) return;

          if (!SplashScreen.instance.isFinished) {
            SplashScreen.instance.update(this._calculateDT(false));
          } else if (this._shouldLoadLaunchScene) {
            this._shouldLoadLaunchScene = false;
            var launchScene = settings.querySettings(Settings.Category.LAUNCH, 'launchScene');

            if (launchScene) {
              // load scene
              director.loadScene(launchScene, function () {
                var _this4$onStart;

                console.log("Success to load scene: " + launchScene);
                _this4._initTime = performance.now();
                director.startAnimation();
                (_this4$onStart = _this4.onStart) === null || _this4$onStart === void 0 ? void 0 : _this4$onStart.call(_this4);
              });
            } else {
              var _this$onStart;

              this._initTime = performance.now();
              director.startAnimation();
              (_this$onStart = this.onStart) === null || _this$onStart === void 0 ? void 0 : _this$onStart.call(this);
            }
          } else {
            director.tick(this._calculateDT(false));
          }
        };

        _proto.initPacer = function initPacer() {
          var _settings$querySettin4;

          var frameRate = (_settings$querySettin4 = settings.querySettings(Settings.Category.SCREEN, 'frameRate')) !== null && _settings$querySettin4 !== void 0 ? _settings$querySettin4 : 60;
          assert(typeof frameRate === 'number');
          this._pacer = new Pacer();
          this._pacer.onTick = this._updateCallback.bind(this);
          this.frameRate = frameRate;
        };

        _proto._initEvents = function _initEvents() {
          systemInfo.on('show', this._onShow, this);
          systemInfo.on('hide', this._onHide, this);
        };

        _proto._onHide = function _onHide() {
          this.emit(Game.EVENT_HIDE);
          this.pauseByEngine();
        };

        _proto._onShow = function _onShow() {
          this.emit(Game.EVENT_SHOW);
          this.resumeByEngine();
        } //  @ Persist root node section

        /**
         * @en
         * Add a persistent root node to the game, the persistent node won't be destroyed during scene transition.<br>
         * The target node must be placed in the root level of hierarchy, otherwise this API won't have any effect.
         * @zh
         * 声明常驻根节点，该节点不会在场景切换中被销毁。<br>
         * 目标节点必须位于为层级的根节点，否则无效。
         * @param node - The node to be made persistent
         * @deprecated Since v3.6.0, please use director.addPersistRootNode instead.
         */
        ;

        _proto.addPersistRootNode = function addPersistRootNode(node) {
          director.addPersistRootNode(node);
        }
        /**
         * @en Remove a persistent root node.
         * @zh 取消常驻根节点。
         * @param node - The node to be removed from persistent node list
         * @deprecated Since v3.6.0, please use director.removePersistRootNode instead.
         */
        ;

        _proto.removePersistRootNode = function removePersistRootNode(node) {
          director.removePersistRootNode(node);
        }
        /**
         * @en Check whether the node is a persistent root node.
         * @zh 检查节点是否是常驻根节点。
         * @param node - The node to be checked.
         * @deprecated Since v3.6.0, please use director.isPersistRootNode instead.
         */
        ;

        _proto.isPersistRootNode = function isPersistRootNode(node) {
          return director.isPersistRootNode(node);
        };

        _proto._setupRenderPipeline = function _setupRenderPipeline() {
          var _this5 = this;

          var renderPipeline = settings.querySettings(Settings.Category.RENDERING, 'renderPipeline');

          if (!renderPipeline) {
            return this._setRenderPipeline();
          }

          return new Promise(function (resolve, reject) {
            assetManager.loadAny(renderPipeline, function (err, asset) {
              return err || !(asset instanceof RenderPipeline) ? reject(err) : resolve(asset);
            });
          }).then(function (asset) {
            _this5._setRenderPipeline(asset);
          })["catch"](function (reason) {
            warn(reason);
            warn("Failed load render pipeline: " + renderPipeline + ", engine failed to initialize, will fallback to default pipeline");

            _this5._setRenderPipeline();
          });
        };

        _proto._setRenderPipeline = function _setRenderPipeline(rppl) {
          if (!director.root.setRenderPipeline(rppl)) {
            this._setRenderPipeline();
          }

          this._rendererInitialized = true;

          this._safeEmit(Game.EVENT_RENDERER_INITED);
        };

        _proto._safeEmit = function _safeEmit(event) {
          if (EDITOR) {
            try {
              this.emit(event);
            } catch (e) {
              warn(e);
            }
          } else {
            this.emit(event);
          }
        };

        _createClass(Game, [{
          key: "inited",
          get:
          /**
           * @en Indicates whether the engine and the renderer has been initialized
           * @zh 引擎和渲染器是否以完成初始化
           */
          function get() {
            return this._inited;
          }
          /**
           * @en Expected frame rate of the game.
           * @zh 游戏的设定帧率。
           */

        }, {
          key: "frameRate",
          get: function get() {
            return this._frameRate;
          },
          set: function set(frameRate) {
            if (typeof frameRate !== 'number') {
              frameRate = parseInt(frameRate, 10);

              if (Number.isNaN(frameRate)) {
                frameRate = 60;
              }
            }

            this._frameRate = frameRate;
            this.frameTime = 1000 / frameRate;
            if (this._pacer) this._pacer.targetFrameRate = this._frameRate;
          }
          /**
           * @en The delta time since last frame, unit: s.
           * @zh 获取上一帧的增量时间，以秒为单位。
           */

        }, {
          key: "deltaTime",
          get: function get() {
            return this._useFixedDeltaTime ? this.frameTime / 1000 : this._deltaTime;
          }
          /**
           * @en The total passed time since game start, unit: ms
           * @zh 获取从游戏开始到现在总共经过的时间，以毫秒为单位
           */

        }, {
          key: "totalTime",
          get: function get() {
            return performance.now() - this._initTime;
          }
          /**
           * @en The start time of the current frame in milliseconds.
           * @zh 获取当前帧开始的时间（以 ms 为单位）。
           */

        }, {
          key: "frameStartTime",
          get: function get() {
            return this._startTime;
          }
          /**
           * @en The expected delta time of each frame in milliseconds
           * @zh 期望帧率对应的每帧时间（以 ms 为单位）
           */

        }]);

        return Game;
      }(EventTarget));

      Game.EVENT_HIDE = 'game_on_hide';
      Game.EVENT_SHOW = 'game_on_show';
      Game.EVENT_LOW_MEMORY = 'game_on_low_memory';
      Game.EVENT_GAME_INITED = 'game_inited';
      Game.EVENT_ENGINE_INITED = 'engine_inited';
      Game.EVENT_RENDERER_INITED = 'renderer_inited';
      Game.EVENT_PRE_BASE_INIT = 'pre_base_init';
      Game.EVENT_POST_BASE_INIT = 'post_base_init';
      Game.EVENT_PRE_INFRASTRUCTURE_INIT = 'pre_infrastructure_init';
      Game.EVENT_POST_INFRASTRUCTURE_INIT = 'post_infrastructure_init';
      Game.EVENT_PRE_SUBSYSTEM_INIT = 'pre_subsystem_init';
      Game.EVENT_POST_SUBSYSTEM_INIT = 'post_subsystem_init';
      Game.EVENT_PRE_PROJECT_INIT = 'pre_project_init';
      Game.EVENT_POST_PROJECT_INIT = 'post_project_init';
      Game.EVENT_RESTART = 'game_on_restart';
      Game.EVENT_PAUSE = 'game_on_pause';
      Game.EVENT_RESUME = 'game_on_resume';
      Game.RENDER_TYPE_CANVAS = 0;
      Game.RENDER_TYPE_WEBGL = 1;
      Game.RENDER_TYPE_OPENGL = 2;
      Game.RENDER_TYPE_HEADLESS = 3;
      Game.DEBUG_DT_THRESHOLD = 1;
      cclegacy.Game = Game;
      /**
       * @en
       * This is a Game instance.
       * @zh
       * 这是一个 Game 类的实例，包含游戏主体信息并负责驱动游戏的游戏对象。
       */

      _export("game", game = cclegacy.game = new Game());
    }
  };
});