System.register("q-bundled:///fs/cocos/particle/particle-utils.js", ["../serialization/index.js", "../core/index.js", "../game/director.js", "../scene-graph/index.js", "./particle-system.js"], function (_export, _context) {
  "use strict";

  var instantiate, Pool, Director, director, Node, ParticleSystem, ParticleUtils;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("ParticleUtils", void 0);

  return {
    setters: [function (_serializationIndexJs) {
      instantiate = _serializationIndexJs.instantiate;
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
      _export("ParticleUtils", ParticleUtils = class ParticleUtils {
        /**
         * @en Instantiate particle system from prefab.
         * @zh 从 prefab 实例化粒子系统。
         */
        static instantiate(prefab) {
          if (!this.registeredSceneEvent) {
            director.on(Director.EVENT_BEFORE_SCENE_LAUNCH, this.onSceneUnload, this);
            this.registeredSceneEvent = true;
          }

          if (!this.particleSystemPool.has(prefab._uuid)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            this.particleSystemPool.set(prefab._uuid, new Pool(() => instantiate(prefab) || new Node(), 1, prefab => prefab.destroy()));
          }

          return this.particleSystemPool.get(prefab._uuid).alloc();
        }
        /**
         * @en Destroy particle system prefab.
         * @zh 销毁创建出来的粒子系统prefab。
         * @param prefab @en Particle system prefab to destroy. @zh 要销毁的粒子系统prefab。
         */


        static destroy(prefab) {
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


        static play(rootNode) {
          for (const ps of rootNode.getComponentsInChildren(ParticleSystem)) {
            ps.play();
          }
        }
        /**
         * @en Stop particle system.
         * @zh 停止播放粒子系统。
         * @param rootNode @en Root node contains the particle system. @zh 包含粒子系统的根节点。
         */


        static stop(rootNode) {
          for (const ps of rootNode.getComponentsInChildren(ParticleSystem)) {
            ps.stop();
          }
        }

        static onSceneUnload() {
          this.particleSystemPool.forEach(value => value.destroy());
          this.particleSystemPool.clear();
        }

      });

      ParticleUtils.particleSystemPool = new Map();
      ParticleUtils.registeredSceneEvent = false;
    }
  };
});