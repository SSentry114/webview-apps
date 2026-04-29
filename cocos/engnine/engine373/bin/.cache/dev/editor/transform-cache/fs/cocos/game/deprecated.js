System.register("q-bundled:///fs/cocos/game/deprecated.js", ["../core/utils/x-deprecated.js", "./director.js", "./game.js", "../asset/asset-manager/index.js"], function (_export, _context) {
  "use strict";

  var removeProperty, markAsWarning, replaceProperty, Director, director, game, assetManager;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_coreUtilsXDeprecatedJs) {
      removeProperty = _coreUtilsXDeprecatedJs.removeProperty;
      markAsWarning = _coreUtilsXDeprecatedJs.markAsWarning;
      replaceProperty = _coreUtilsXDeprecatedJs.replaceProperty;
    }, function (_directorJs) {
      Director = _directorJs.Director;
      director = _directorJs.director;
    }, function (_gameJs) {
      game = _gameJs.game;
    }, function (_assetAssetManagerIndexJs) {
      assetManager = _assetAssetManagerIndexJs.assetManager;
    }],
    execute: function () {
      // Director
      markAsWarning(Director.prototype, 'director', [{
        name: 'calculateDeltaTime'
      }, {
        name: 'getDeltaTime',
        suggest: 'Use game.deltaTime instead'
      }, {
        name: 'getTotalTime',
        suggest: 'Use game.totalTime instead'
      }, {
        name: 'getCurrentTime',
        suggest: 'Use game.frameStartTime instead'
      }]);
      removeProperty(Director.prototype, 'director', [{
        name: 'setAnimationInterval',
        suggest: 'please use game.frameRate instead'
      }, {
        name: 'getAnimationInterval',
        suggest: 'please use game.frameRate instead'
      }, {
        name: 'getRunningScene',
        suggest: 'please use getScene instead'
      }, {
        name: 'setDepthTest',
        suggest: 'please use camera API instead'
      }, {
        name: 'setClearColor',
        suggest: 'please use camera API instead'
      }, {
        name: 'getWinSize',
        suggest: 'please use view.getVisibleSize instead'
      }, {
        name: 'getWinSizeInPixels'
      }, {
        name: 'purgeCachedData',
        suggest: 'please use assetManager.releaseAll instead'
      }, {
        name: 'convertToGL'
      }, {
        name: 'convertToUI'
      }]);
      replaceProperty(director, 'director', [{
        name: '_getSceneUuid',
        targetName: 'assetManager.main',
        newName: 'getSceneInfo',
        customFunction: sceneName => {
          if (assetManager.main) {
            var _assetManager$main$ge;

            return (_assetManager$main$ge = assetManager.main.getSceneInfo(sceneName)) === null || _assetManager$main$ge === void 0 ? void 0 : _assetManager$main$ge.uuid;
          }

          return '';
        }
      }]); // game

      markAsWarning(game, 'game', [{
        name: 'collisionMatrix'
      }, {
        name: 'groupList'
      }]);
      replaceProperty(game, 'game', [{
        name: '_sceneInfos',
        targetName: 'assetManager.main',
        newName: 'getSceneInfo',
        customGetter: () => {
          const scenes = [];

          if (assetManager.main) {
            assetManager.main.config.scenes.forEach(val => {
              scenes.push(val);
            });
          }

          return scenes;
        }
      }]);
    }
  };
});