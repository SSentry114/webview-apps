System.register("q-bundled:///fs/cocos/scene-graph/prefab/prefab-info.js", ["../../core/data/decorators/index.js", "../../../../virtual/internal%253Aconstants.js", "../../core/index.js", "../../core/data/index.js", "../component.js", "../node.js"], function (_export, _context) {
  "use strict";

  var ccclass, serializable, editable, type, EDITOR, cclegacy, CCObject, Component, Node, _dec, _class, _class2, _initializer, _dec2, _dec3, _dec4, _dec5, _dec6, _class4, _class5, _initializer2, _initializer3, _initializer4, _initializer5, _initializer6, _dec7, _class7, _class8, _initializer7, _dec8, _dec9, _class10, _class11, _initializer8, _initializer9, _initializer10, _dec10, _dec11, _dec12, _class13, _class14, _initializer11, _initializer12, _dec13, _dec14, _dec15, _class16, _class17, _initializer13, _initializer14, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _class19, _class20, _initializer15, _initializer16, _initializer17, _initializer18, _initializer19, _initializer20, _dec22, _dec23, _dec24, _dec25, _class22, _class23, _initializer21, _initializer22, _initializer23, _initializer24, _initializer25, _initializer26, TargetInfo, TargetOverrideInfo, CompPrefabInfo, PropertyOverrideInfo, MountedChildrenInfo, MountedComponentsInfo, PrefabInstance, PrefabInfo;

  function _applyDecoratedInitializer(target, property, decorators, initializer) {
    return decorators.slice().reverse().reduce(function (decoratedInitializer, decorator) {
      return decorator(target, property, decoratedInitializer) || decoratedInitializer;
    }, initializer);
  }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function compareStringArray(array1, array2) {
    if (!array1 || !array2) {
      return false;
    }

    if (array1.length !== array2.length) {
      return false;
    }

    return array1.every((value, index) => value === array2[index]);
  }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      editable = _coreDataDecoratorsIndexJs.editable;
      type = _coreDataDecoratorsIndexJs.type;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_coreIndexJs) {
      cclegacy = _coreIndexJs.cclegacy;
    }, function (_coreDataIndexJs) {
      CCObject = _coreDataIndexJs.CCObject;
    }, function (_componentJs) {
      Component = _componentJs.Component;
    }, function (_nodeJs) {
      Node = _nodeJs.Node;
    }],
    execute: function () {
      _export("TargetInfo", TargetInfo = (_dec = ccclass('cc.TargetInfo'), _dec(_class = (_class2 = class TargetInfo {
        constructor() {
          this.localID = _initializer && _initializer();
        }

      }, (_initializer = _applyDecoratedInitializer(_class2.prototype, "localID", [serializable], function () {
        return [];
      })), _class2)) || _class));

      _export("TargetOverrideInfo", TargetOverrideInfo = (_dec2 = ccclass('cc.TargetOverrideInfo'), _dec3 = type(CCObject), _dec4 = type(TargetInfo), _dec5 = type(Node), _dec6 = type(TargetInfo), _dec2(_class4 = (_class5 = class TargetOverrideInfo {
        constructor() {
          this.source = _initializer2 && _initializer2();
          this.sourceInfo = _initializer3 && _initializer3();
          this.propertyPath = _initializer4 && _initializer4();
          this.target = _initializer5 && _initializer5();
          this.targetInfo = _initializer6 && _initializer6();
        }

      }, (_initializer2 = _applyDecoratedInitializer(_class5.prototype, "source", [serializable, _dec3], function () {
        return null;
      }), _initializer3 = _applyDecoratedInitializer(_class5.prototype, "sourceInfo", [serializable, _dec4], function () {
        return null;
      }), _initializer4 = _applyDecoratedInitializer(_class5.prototype, "propertyPath", [serializable], function () {
        return [];
      }), _initializer5 = _applyDecoratedInitializer(_class5.prototype, "target", [serializable, _dec5], function () {
        return null;
      }), _initializer6 = _applyDecoratedInitializer(_class5.prototype, "targetInfo", [serializable, _dec6], function () {
        return null;
      })), _class5)) || _class4));

      _export("CompPrefabInfo", CompPrefabInfo = (_dec7 = ccclass('cc.CompPrefabInfo'), _dec7(_class7 = (_class8 = class CompPrefabInfo {
        constructor() {
          this.fileId = _initializer7 && _initializer7();
        }

      }, (_initializer7 = _applyDecoratedInitializer(_class8.prototype, "fileId", [serializable, editable], function () {
        return '';
      })), _class8)) || _class7));

      _export("PropertyOverrideInfo", PropertyOverrideInfo = (_dec8 = ccclass('CCPropertyOverrideInfo'), _dec9 = type(TargetInfo), _dec8(_class10 = (_class11 = class PropertyOverrideInfo {
        constructor() {
          this.targetInfo = _initializer8 && _initializer8();
          this.propertyPath = _initializer9 && _initializer9();
          this.value = _initializer10 && _initializer10();
        }

        // eslint-disable-next-line consistent-return
        isTarget(localID, propPath) {
          if (EDITOR) {
            var _this$targetInfo;

            return compareStringArray((_this$targetInfo = this.targetInfo) === null || _this$targetInfo === void 0 ? void 0 : _this$targetInfo.localID, localID) && compareStringArray(this.propertyPath, propPath);
          }
        }

      }, (_initializer8 = _applyDecoratedInitializer(_class11.prototype, "targetInfo", [serializable, _dec9], function () {
        return null;
      }), _initializer9 = _applyDecoratedInitializer(_class11.prototype, "propertyPath", [serializable], function () {
        return [];
      }), _initializer10 = _applyDecoratedInitializer(_class11.prototype, "value", [serializable], null)), _class11)) || _class10));

      _export("MountedChildrenInfo", MountedChildrenInfo = (_dec10 = ccclass('cc.MountedChildrenInfo'), _dec11 = type(TargetInfo), _dec12 = type([Node]), _dec10(_class13 = (_class14 = class MountedChildrenInfo {
        constructor() {
          this.targetInfo = _initializer11 && _initializer11();
          this.nodes = _initializer12 && _initializer12();
        }

        // eslint-disable-next-line consistent-return
        isTarget(localID) {
          if (EDITOR) {
            var _this$targetInfo2;

            return compareStringArray((_this$targetInfo2 = this.targetInfo) === null || _this$targetInfo2 === void 0 ? void 0 : _this$targetInfo2.localID, localID);
          }
        }

      }, (_initializer11 = _applyDecoratedInitializer(_class14.prototype, "targetInfo", [serializable, _dec11], function () {
        return null;
      }), _initializer12 = _applyDecoratedInitializer(_class14.prototype, "nodes", [serializable, _dec12], function () {
        return [];
      })), _class14)) || _class13));

      _export("MountedComponentsInfo", MountedComponentsInfo = (_dec13 = ccclass('cc.MountedComponentsInfo'), _dec14 = type(TargetInfo), _dec15 = type([Component]), _dec13(_class16 = (_class17 = class MountedComponentsInfo {
        constructor() {
          this.targetInfo = _initializer13 && _initializer13();
          this.components = _initializer14 && _initializer14();
        }

        // eslint-disable-next-line consistent-return
        isTarget(localID) {
          if (EDITOR) {
            var _this$targetInfo3;

            return compareStringArray((_this$targetInfo3 = this.targetInfo) === null || _this$targetInfo3 === void 0 ? void 0 : _this$targetInfo3.localID, localID);
          }
        }

      }, (_initializer13 = _applyDecoratedInitializer(_class17.prototype, "targetInfo", [serializable, _dec14], function () {
        return null;
      }), _initializer14 = _applyDecoratedInitializer(_class17.prototype, "components", [serializable, _dec15], function () {
        return [];
      })), _class17)) || _class16));
      /**
       * Prefab实例类
       * @internal
       */


      _export("PrefabInstance", PrefabInstance = (_dec16 = ccclass('cc.PrefabInstance'), _dec17 = type(Node), _dec18 = type([MountedChildrenInfo]), _dec19 = type([MountedComponentsInfo]), _dec20 = type([PropertyOverrideInfo]), _dec21 = type([TargetInfo]), _dec16(_class19 = (_class20 = class PrefabInstance {
        constructor() {
          this.fileId = _initializer15 && _initializer15();
          this.prefabRootNode = _initializer16 && _initializer16();
          this.mountedChildren = _initializer17 && _initializer17();
          this.mountedComponents = _initializer18 && _initializer18();
          this.propertyOverrides = _initializer19 && _initializer19();
          this.removedComponents = _initializer20 && _initializer20();
          this.targetMap = {};
          this.expanded = false;
        }

        // eslint-disable-next-line consistent-return
        findPropertyOverride(localID, propPath) {
          if (EDITOR) {
            for (let i = 0; i < this.propertyOverrides.length; i++) {
              const propertyOverride = this.propertyOverrides[i];

              if (propertyOverride.isTarget(localID, propPath)) {
                return propertyOverride;
              }
            }

            return null;
          }
        }

        removePropertyOverride(localID, propPath) {
          if (EDITOR) {
            for (let i = 0; i < this.propertyOverrides.length; i++) {
              const propertyOverride = this.propertyOverrides[i];

              if (propertyOverride.isTarget(localID, propPath)) {
                this.propertyOverrides.splice(i, 1);
                break;
              }
            }
          }
        }

      }, (_initializer15 = _applyDecoratedInitializer(_class20.prototype, "fileId", [serializable], function () {
        return '';
      }), _initializer16 = _applyDecoratedInitializer(_class20.prototype, "prefabRootNode", [serializable, _dec17], null), _initializer17 = _applyDecoratedInitializer(_class20.prototype, "mountedChildren", [serializable, _dec18], function () {
        return [];
      }), _initializer18 = _applyDecoratedInitializer(_class20.prototype, "mountedComponents", [serializable, _dec19], function () {
        return [];
      }), _initializer19 = _applyDecoratedInitializer(_class20.prototype, "propertyOverrides", [serializable, _dec20], function () {
        return [];
      }), _initializer20 = _applyDecoratedInitializer(_class20.prototype, "removedComponents", [serializable, _dec21], function () {
        return [];
      })), _class20)) || _class19));

      _export("PrefabInfo", PrefabInfo = (_dec22 = ccclass('cc.PrefabInfo'), _dec23 = type(Node), _dec24 = type(PrefabInstance), _dec25 = type([TargetOverrideInfo]), _dec22(_class22 = (_class23 = class PrefabInfo {
        constructor() {
          this.root = _initializer21 && _initializer21();
          this.asset = _initializer22 && _initializer22();
          this.fileId = _initializer23 && _initializer23();
          this.instance = _initializer24 && _initializer24();
          this.targetOverrides = _initializer25 && _initializer25();
          this.nestedPrefabInstanceRoots = _initializer26 && _initializer26();
        }

      }, (_initializer21 = _applyDecoratedInitializer(_class23.prototype, "root", [serializable, _dec23], null), _initializer22 = _applyDecoratedInitializer(_class23.prototype, "asset", [serializable], null), _initializer23 = _applyDecoratedInitializer(_class23.prototype, "fileId", [serializable, editable], function () {
        return '';
      }), _initializer24 = _applyDecoratedInitializer(_class23.prototype, "instance", [serializable, _dec24], null), _initializer25 = _applyDecoratedInitializer(_class23.prototype, "targetOverrides", [serializable, _dec25], null), _initializer26 = _applyDecoratedInitializer(_class23.prototype, "nestedPrefabInstanceRoots", [serializable], null)), _class23)) || _class22));

      cclegacy._PrefabInfo = PrefabInfo;
    }
  };
});