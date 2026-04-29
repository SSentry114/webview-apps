System.register("q-bundled:///fs/cocos/particle/particle-utils.js", ["../serialization/index.js", "../core/index.js", "../game/director.js", "../scene-graph/index.js", "./particle-system.js"], function (_export, _context) {
  "use strict";

  var _instantiate, Pool, Director, director, Node, ParticleSystem, ParticleUtils;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_serializationIndexJs) {
      _instantiate = _serializationIndexJs.instantiate;
    }, function (_coreIndexJs) {
      Pool = _coreIndexJs.Pool;
    }, function (_gameDirectorJs) {
      Director = _gameDirectorJs.Director;
      director = _gameDirectorJs.director;
    }, function (_sceneGraphIndexJs) {
      Node = _sceneGraphIndexJs.Node;
    }, function (_particleSystemJs) {
      ParticleSystem = _particleSystemJs.ParticleSystem;
    }],
    execute: function () {
      /**
       * @en Contains some util functions for particle system. Such as create and destroy particle system.
       * @zh 该类包含一些粒子系统的工具函数，例如创建和销毁粒子系统。
       */
      _export("ParticleUtils", ParticleUtils = /*#__PURE__*/function () {
        function ParticleUtils() {}

        /**
         * @en Instantiate particle system from prefab.
         * @zh 从 prefab 实例化粒子系统。
         */
        ParticleUtils.instantiate = function instantiate(prefab) {
          if (!this.registeredSceneEvent) {
            director.on(Director.EVENT_BEFORE_SCENE_LAUNCH, this.onSceneUnload, this);
            this.registeredSceneEvent = true;
          }

          if (!this.particleSystemPool.has(prefab._uuid)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            this.particleSystemPool.set(prefab._uuid, new Pool(function () {
              return _instantiate(prefab) || new Node();
            }, 1, function (prefab) {
              return prefab.destroy();
            }));
          }

          return this.particleSystemPool.get(prefab._uuid).alloc();
        }
        /**
         * @en Destroy particle system prefab.
         * @zh 销毁创建出来的粒子系统prefab。
         * @param prefab @en Particle system prefab to destroy. @zh 要销毁的粒子系统prefab。
         */
        ;

        ParticleUtils.destroy = function destroy(prefab) {
          if (this.particleSystemPool.has(prefab._prefab.asset._uuid)) {
            this.stop(prefab);
            this.particleSystemPool.get(prefab._prefab.asset._uuid).free(prefab);
          }
        }
        /**
         * @en Play particle system.
         * @zh 播放粒子系统。
         * @param rootNode @en Root node contains the particle system. @zh 包含粒子系统的根节点。
         */
        ;

        ParticleUtils.play = function play(rootNode) {
          for (var _iterator = _createForOfIteratorHelperLoose(rootNode.getComponentsInChildren(ParticleSystem)), _step; !(_step = _iterator()).done;) {
            var ps = _step.value;
            ps.play();
          }
        }
        /**
         * @en Stop particle system.
         * @zh 停止播放粒子系统。
         * @param rootNode @en Root node contains the particle system. @zh 包含粒子系统的根节点。
         */
        ;

        ParticleUtils.stop = function stop(rootNode) {
          for (var _iterator2 = _createForOfIteratorHelperLoose(rootNode.getComponentsInChildren(ParticleSystem)), _step2; !(_step2 = _iterator2()).done;) {
            var ps = _step2.value;
            ps.stop();
          }
        };

        ParticleUtils.onSceneUnload = function onSceneUnload() {
          this.particleSystemPool.forEach(function (value) {
            return value.destroy();
          });
          this.particleSystemPool.clear();
        };

        return ParticleUtils;
      }());

      ParticleUtils.particleSystemPool = new Map();
      ParticleUtils.registeredSceneEvent = false;
    }
  };
});