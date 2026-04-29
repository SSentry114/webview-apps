System.register("q-bundled:///fs/cocos/asset/asset-manager/fetch.js", ["../../core/index.js", "./pack-manager.js", "./shared.js", "./task.js", "./utilities.js"], function (_export, _context) {
  "use strict";

  var error, cclegacy, packManager, assets, fetchPipeline, Task, clear, forEach, getDepends;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function fetch(task, done) {
    let firstTask = false;

    if (!task.progress) {
      task.progress = {
        finish: 0,
        total: task.input.length,
        canInvoke: true
      };
      firstTask = true;
    }

    const {
      options,
      progress
    } = task;
    const depends = [];
    const total = progress.total;
    const exclude = options.__exclude__ = options.__exclude__ || Object.create(null);
    task.output = [];
    forEach(task.input, (item, cb) => {
      if (!item.isNative && assets.has(item.uuid)) {
        const asset = assets.get(item.uuid);
        item.content = asset.addRef();
        task.output.push(item);

        if (progress.canInvoke) {
          task.dispatch('progress', ++progress.finish, progress.total, item);
        }

        cb();
        return;
      }

      packManager.load(item, task.options, (err, data) => {
        if (err) {
          if (!task.isFinished) {
            if (!cclegacy.assetManager.force || firstTask) {
              error(err.message, err.stack);
              progress.canInvoke = false;
              done(err);
            } else {
              task.output.push(item);

              if (progress.canInvoke) {
                task.dispatch('progress', ++progress.finish, progress.total, item);
              }
            }
          }
        } else if (!task.isFinished) {
          item.file = data;
          task.output.push(item);

          if (!item.isNative) {
            exclude[item.uuid] = true;
            getDepends(item.uuid, data, exclude, depends, item.config);
            progress.total = total + depends.length;
          }

          if (progress.canInvoke) {
            task.dispatch('progress', ++progress.finish, progress.total, item);
          }
        }

        cb();
      });
    }, () => {
      if (task.isFinished) {
        clear(task, true);
        task.dispatch('error');
        return;
      }

      if (depends.length > 0) {
        // stage 2 , download depend asset
        const subTask = Task.create({
          input: depends,
          progress,
          options,
          onProgress: task.onProgress,
          onError: Task.prototype.recycle,
          onComplete: err => {
            if (!err) {
              task.output.push(...subTask.output);
              subTask.recycle();
            }

            if (firstTask) {
              decreaseRef(task);
            }

            done(err);
          }
        });
        fetchPipeline.async(subTask);
        return;
      }

      if (firstTask) {
        decreaseRef(task);
      }

      done();
    });
  }

  function decreaseRef(task) {
    const output = task.output;

    for (let i = 0, l = output.length; i < l; i++) {
      if (output[i].content) {
        output[i].content.decRef(false);
      }
    }
  }

  _export("default", fetch);

  return {
    setters: [function (_coreIndexJs) {
      error = _coreIndexJs.error;
      cclegacy = _coreIndexJs.cclegacy;
    }, function (_packManagerJs) {
      packManager = _packManagerJs.default;
    }, function (_sharedJs) {
      assets = _sharedJs.assets;
      fetchPipeline = _sharedJs.fetchPipeline;
    }, function (_taskJs) {
      Task = _taskJs.default;
    }, function (_utilitiesJs) {
      clear = _utilitiesJs.clear;
      forEach = _utilitiesJs.forEach;
      getDepends = _utilitiesJs.getDepends;
    }],
    execute: function () {}
  };
});