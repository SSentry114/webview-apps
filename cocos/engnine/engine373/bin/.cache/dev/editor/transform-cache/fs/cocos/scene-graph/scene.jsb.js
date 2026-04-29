System.register("q-bundled:///fs/cocos/scene-graph/scene.jsb.js", ["../core/data/decorators/index.js", "../../../virtual/internal%253Aconstants.js", "../core/global-exports.js", "./node.js", "./prefab/utils.js", "../core/platform/debug.js", "../core/utils/jsb-utils.js", "./scene-globals.js"], function (_export, _context) {
  "use strict";

  var ccclass, editable, serializable, EDITOR, TEST, legacyCC, Node, applyTargetOverrides, expandNestedPrefabInstanceNode, assert, updateChildrenForDeserialize, SceneGlobals, Scene, sceneProto, oldLoad, SceneProto, globalsDescriptor;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      editable = _coreDataDecoratorsIndexJs.editable;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      TEST = _virtualInternal253AconstantsJs.TEST;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_nodeJs) {
      Node = _nodeJs.Node;
    }, function (_prefabUtilsJs) {
      applyTargetOverrides = _prefabUtilsJs.applyTargetOverrides;
      expandNestedPrefabInstanceNode = _prefabUtilsJs.expandNestedPrefabInstanceNode;
    }, function (_corePlatformDebugJs) {
      assert = _corePlatformDebugJs.assert;
    }, function (_coreUtilsJsbUtilsJs) {
      updateChildrenForDeserialize = _coreUtilsJsbUtilsJs.updateChildrenForDeserialize;
    }, function (_sceneGlobalsJs) {
      SceneGlobals = _sceneGlobalsJs.SceneGlobals;
    }],
    execute: function () {
      _export("Scene", Scene = jsb.Scene);

      legacyCC.Scene = Scene;
      sceneProto = Scene.prototype;
      Object.defineProperty(sceneProto, '_globals', {
        enumerable: true,
        configurable: true,

        get() {
          return this.getSceneGlobals();
        },

        set(v) {
          this._globalRef = v;
          this.setSceneGlobals(v);
        }

      });
      Object.defineProperty(sceneProto, 'globals', {
        enumerable: true,
        configurable: true,

        get() {
          return this.getSceneGlobals();
        }

      });
      Object.defineProperty(sceneProto, '_renderScene', {
        enumerable: true,
        configurable: true,

        get() {
          if (!this._renderSceneInternal) {
            this._renderSceneInternal = this.getRenderScene();
          }

          return this._renderSceneInternal;
        }

      });
      Object.defineProperty(sceneProto, 'renderScene', {
        enumerable: true,
        configurable: true,

        get() {
          if (!this._renderSceneInternal) {
            this._renderSceneInternal = this.getRenderScene();
          }

          return this._renderSceneInternal;
        }

      });

      sceneProto._ctor = function () {
        Node.prototype._ctor.apply(this, arguments);

        this._inited = false;
        this._renderSceneInternal = null;
        this._globalRef = null;
        this._prefabSyncedInLiveReload = false;
      };

      sceneProto._onBatchCreated = function (dontSyncChildPrefab) {
        // Don't invoke Node.prototype._onBatchCreated because we refactor Node&BaseNode, BaseNode is empty just for
        // instanceof check in ts engine. After ts engine removes BaseNode, we could remove BaseNode.h/.cpp too.
        if (this._parent) {
          this._siblingIndex = this._parent.children.indexOf(this);
        } //


        const len = this._children.length;

        for (let i = 0; i < len; ++i) {
          this.children[i]._siblingIndex = i;

          this._children[i]._onBatchCreated(dontSyncChildPrefab);
        }
      };

      oldLoad = sceneProto._load;

      sceneProto._load = function () {
        this._scene = this;

        if (!this._inited) {
          if (TEST) {
            assert(!this._activeInHierarchy, 'Should deactivate ActionManager and EventManager by default');
          }

          expandNestedPrefabInstanceNode(this);
          applyTargetOverrides(this);

          this._onBatchCreated(EDITOR && this._prefabSyncedInLiveReload);

          this._inited = true;
        }

        updateChildrenForDeserialize(this);
        oldLoad.call(this);
      };

      sceneProto._activate = function (active) {
        active = active !== false;

        if (EDITOR) {
          // register all nodes to editor
          this._registerIfAttached(active);
        }

        legacyCC.director._nodeActivator.activateNode(this, active); // The test environment does not currently support the renderer


        if (!TEST || EDITOR) {
          this._globals.activate(this);

          if (this._renderScene) {
            this._renderScene.activate();
          }
        }
      }; // handle meta data, it is generated automatically


      SceneProto = Scene.prototype;
      globalsDescriptor = Object.getOwnPropertyDescriptor(SceneProto, 'globals');
      editable(SceneProto, 'globals', globalsDescriptor);
      editable(SceneProto, 'autoReleaseAssets', () => false);
      serializable(SceneProto, 'autoReleaseAssets', () => false);
      serializable(SceneProto, '_globals', () => new SceneGlobals());
      ccclass('cc.Scene')(Scene);
    }
  };
});