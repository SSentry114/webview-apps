System.register("q-bundled:///fs/cocos/physics/bullet/instantiated.js", ["@cocos/bullet", "../../../../virtual/internal%253Aconstants.js", "../../game/index.js", "../../core/index.js", "./bullet-env.js"], function (_export, _context) {
  "use strict";

  var bulletModule, bulletType, WECHAT, RUNTIME_BASED, WECHAT_MINI_PROGRAM, game, sys, pageSize, pageCount, importFunc, bulletLibs, EBulletType, EBulletTriangleRaycastFlag, bt;

  function waitForAmmoInstantiation() {
    // refer https://stackoverflow.com/questions/47879864/how-can-i-check-if-a-browser-supports-webassembly
    const supported = (() => {
      // iOS 15.4 has some wasm memory issue, can not use wasm for bullet
      const isiOS15_4 = (sys.os === sys.OS.IOS || sys.os === sys.OS.OSX) && sys.isBrowser && /(OS 15_4)|(Version\/15.4)/.test(window.navigator.userAgent);

      if (isiOS15_4) {
        return false;
      }

      try {
        if (typeof WebAssembly === 'object' && typeof WebAssembly.instantiate === 'function') {
          const module = new WebAssembly.Module(new Uint8Array([0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00]));

          if (module instanceof WebAssembly.Module) {
            return new WebAssembly.Instance(module) instanceof WebAssembly.Instance;
          }
        }
      } catch (e) {
        return false;
      }

      return false;
    })();

    return Promise.resolve().then(() => {
      if (bulletType === 'fallback') {
        return bulletModule(supported);
      }

      return bulletLibs;
    }).then(module => {
      if (typeof module === 'string') {
        console.info('[Physics][Bullet]: Using wasm Bullet libs.');

        const infoReport = msg => {
          console.info(msg);
        };

        const errorReport = msg => {
          console.error(msg);
        };

        const memory = new WebAssembly.Memory({
          initial: pageCount
        });
        const importObject = {
          cc: importFunc,
          wasi_snapshot_preview1: {
            fd_close: infoReport,
            fd_seek: infoReport,
            fd_write: infoReport
          },
          env: {
            memory
          }
        };
        return new Promise((resolve, reject) => {
          function instantiateWasm(buff) {
            WebAssembly.instantiate(buff, importObject).then(results => {
              const btInstance = results.instance.exports;
              Object.assign(bt, btInstance);
              resolve();
            }, errorReport);
          }

          if (WECHAT || WECHAT_MINI_PROGRAM || RUNTIME_BASED) {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            const wasmFilePath = `cocos-js/${module}`;
            instantiateWasm(wasmFilePath);
          } else {
            fetch(module).then(response => {
              response.arrayBuffer().then(buff => {
                instantiateWasm(buff);
              }, errorReport);
            }, errorReport);
          }
        });
      } else {
        console.info('[Physics][Bullet]: Using asmjs Bullet libs.');
        const env = importFunc;
        const wasmMemory = {};
        wasmMemory.buffer = new ArrayBuffer(pageSize * pageCount);
        env.memory = wasmMemory;
        const btInstance = module(env, wasmMemory);
        Object.assign(bt, btInstance);
        return new Promise((resolve, reject) => {
          resolve();
        });
      }
    });
  }

  _export({
    waitForAmmoInstantiation: waitForAmmoInstantiation,
    EBulletType: void 0,
    EBulletTriangleRaycastFlag: void 0
  });

  return {
    setters: [function (_cocosBullet) {
      bulletModule = _cocosBullet.default;
      bulletType = _cocosBullet.bulletType;
    }, function (_virtualInternal253AconstantsJs) {
      WECHAT = _virtualInternal253AconstantsJs.WECHAT;
      RUNTIME_BASED = _virtualInternal253AconstantsJs.RUNTIME_BASED;
      WECHAT_MINI_PROGRAM = _virtualInternal253AconstantsJs.WECHAT_MINI_PROGRAM;
    }, function (_gameIndexJs) {
      game = _gameIndexJs.game;
    }, function (_coreIndexJs) {
      sys = _coreIndexJs.sys;
    }, function (_bulletEnvJs) {
      pageSize = _bulletEnvJs.pageSize;
      pageCount = _bulletEnvJs.pageCount;
      importFunc = _bulletEnvJs.importFunc;
    }],
    execute: function () {
      /*
       Copyright (c) 2020-2023 Xiamen Yaji Software Co., Ltd.
      
       https://www.cocos.com/
      
       Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated documentation files (the "Software"), to deal
       in the Software without restriction, including without limitation the rights to
       use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
       of the Software, and to permit persons to whom the Software is furnished to do so,
       subject to the following conditions:
      
       The above copyright notice and this permission notice shall be included in
       all copies or substantial portions of the Software.
      
       THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
      */
      // eslint-disable-next-line import/no-extraneous-dependencies
      bulletLibs = bulletModule;

      if (globalThis.BULLET) {
        console.log('[Physics][Bullet]: Using the external Bullet libs.');
        bulletLibs = globalThis.BULLET;
      } //corresponds to bulletType in bullet-compile


      (function (EBulletType) {
        EBulletType[EBulletType["EBulletTypeVec3"] = 0] = "EBulletTypeVec3";
        EBulletType[EBulletType["EBulletTypeQuat"] = 1] = "EBulletTypeQuat";
        EBulletType[EBulletType["EBulletTypeTransform"] = 2] = "EBulletTypeTransform";
        EBulletType[EBulletType["EBulletTypeMotionState"] = 3] = "EBulletTypeMotionState";
        EBulletType[EBulletType["EBulletTypeCollisionObject"] = 4] = "EBulletTypeCollisionObject";
        EBulletType[EBulletType["EBulletTypeCollisionShape"] = 5] = "EBulletTypeCollisionShape";
        EBulletType[EBulletType["EBulletTypeStridingMeshInterface"] = 6] = "EBulletTypeStridingMeshInterface";
        EBulletType[EBulletType["EBulletTypeTriangleMesh"] = 7] = "EBulletTypeTriangleMesh";
        EBulletType[EBulletType["EBulletTypeCollisionDispatcher"] = 8] = "EBulletTypeCollisionDispatcher";
        EBulletType[EBulletType["EBulletTypeDbvtBroadPhase"] = 9] = "EBulletTypeDbvtBroadPhase";
        EBulletType[EBulletType["EBulletTypeSequentialImpulseConstraintSolver"] = 10] = "EBulletTypeSequentialImpulseConstraintSolver";
        EBulletType[EBulletType["EBulletTypeCollisionWorld"] = 11] = "EBulletTypeCollisionWorld";
        EBulletType[EBulletType["EBulletTypeTypedConstraint"] = 12] = "EBulletTypeTypedConstraint";
      })(EBulletType || _export("EBulletType", EBulletType = {}));

      (function (EBulletTriangleRaycastFlag) {
        EBulletTriangleRaycastFlag[EBulletTriangleRaycastFlag["NONE"] = 0] = "NONE";
        EBulletTriangleRaycastFlag[EBulletTriangleRaycastFlag["FilterBackfaces"] = 1] = "FilterBackfaces";
        EBulletTriangleRaycastFlag[EBulletTriangleRaycastFlag["KeepUnflippedNormal"] = 2] = "KeepUnflippedNormal";
        EBulletTriangleRaycastFlag[EBulletTriangleRaycastFlag["UseSubSimplexConvexCastRaytest"] = 4] = "UseSubSimplexConvexCastRaytest";
        EBulletTriangleRaycastFlag[EBulletTriangleRaycastFlag["UseGjkConvexCastRaytest"] = 8] = "UseGjkConvexCastRaytest";
      })(EBulletTriangleRaycastFlag || _export("EBulletTriangleRaycastFlag", EBulletTriangleRaycastFlag = {}));

      _export("bt", bt = {});

      globalThis.Bullet = bt;
      bt.BODY_CACHE_NAME = 'body';
      game.onPostInfrastructureInitDelegate.add(waitForAmmoInstantiation);
    }
  };
});