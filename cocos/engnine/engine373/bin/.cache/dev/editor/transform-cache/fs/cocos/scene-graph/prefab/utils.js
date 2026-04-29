System.register("q-bundled:///fs/cocos/scene-graph/prefab/utils.js", ["../../../../virtual/internal%253Aconstants.js", "../../core/index.js", "../../core/value-types/index.js", "./prefab-info.js"], function (_export, _context) {
  "use strict";

  var EDITOR, SUPPORT_JIT, cclegacy, errorID, warn, editorExtrasTag, ValueType;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function createNodeWithPrefab(node) {
    // @ts-expect-error: private member access
    const prefabInfo = node._prefab;

    if (!prefabInfo) {
      return;
    }

    const prefabInstance = prefabInfo.instance;

    if (!prefabInstance) {
      return;
    }

    if (!prefabInfo.asset) {
      if (EDITOR) {// TODO show message in editor
      } else {
        errorID(3701, node.name);
      }

      prefabInfo.instance = undefined;
      return;
    } // save root's preserved props to avoid overwritten by prefab


    const _objFlags = node._objFlags; // @ts-expect-error: private member access

    const _parent = node._parent; // @ts-expect-error: private member access

    const _id = node._id; // @ts-expect-error: private member access

    const _prefab = node._prefab;
    const editorExtras = node[editorExtrasTag]; // instantiate prefab

    cclegacy.game._isCloning = true;

    if (SUPPORT_JIT) {
      // @ts-expect-error: private member access
      prefabInfo.asset._doInstantiate(node);
    } else {
      // root in prefab asset is always synced
      const prefabRoot = prefabInfo.asset.data; // use node as the instantiated prefabRoot to make references to prefabRoot in prefab redirect to node

      prefabRoot._iN$t = node; // instantiate prefab and apply to node

      cclegacy.instantiate._clone(prefabRoot, prefabRoot);
    }

    cclegacy.game._isCloning = false; // restore preserved props

    node._objFlags = _objFlags; // @ts-expect-error: private member access

    node._parent = _parent; // @ts-expect-error: private member access

    node._id = _id;

    if (EDITOR) {
      node[editorExtrasTag] = editorExtras;
    } // @ts-expect-error: private member access


    if (node._prefab) {
      // just keep the instance
      // @ts-expect-error: private member access
      node._prefab.instance = _prefab === null || _prefab === void 0 ? void 0 : _prefab.instance;
    }
  } // TODO: more efficient id->Node/Component map


  function generateTargetMap(node, targetMap, isRoot) {
    var _node$_prefab;

    if (!targetMap) {
      return;
    }

    if (!node) {
      return;
    }

    let curTargetMap = targetMap; // @ts-expect-error: private member access

    const prefabInstance = (_node$_prefab = node._prefab) === null || _node$_prefab === void 0 ? void 0 : _node$_prefab.instance;

    if (!isRoot && prefabInstance) {
      targetMap[prefabInstance.fileId] = {};
      curTargetMap = targetMap[prefabInstance.fileId];
    } // @ts-expect-error: private member access


    const prefabInfo = node._prefab;

    if (prefabInfo) {
      curTargetMap[prefabInfo.fileId] = node;
    }

    const components = node.components;

    for (let i = 0; i < components.length; i++) {
      const comp = components[i];

      if (comp.__prefab) {
        curTargetMap[comp.__prefab.fileId] = comp;
      }
    }

    for (let i = 0; i < node.children.length; i++) {
      const childNode = node.children[i];
      generateTargetMap(childNode, curTargetMap, false);
    }
  }

  function getTarget(localID, targetMap) {
    if (!localID) {
      return null;
    }

    let target = null;
    let targetIter = targetMap;

    for (let i = 0; i < localID.length; i++) {
      if (!targetIter) {
        return null;
      }

      targetIter = targetIter[localID[i]];
    }

    target = targetIter;
    return target;
  }

  function applyMountedChildren(node, mountedChildren, targetMap) {
    if (!mountedChildren) {
      return;
    }

    for (let i = 0; i < mountedChildren.length; i++) {
      const childInfo = mountedChildren[i];

      if (childInfo && childInfo.targetInfo) {
        const target = getTarget(childInfo.targetInfo.localID, targetMap);

        if (!target) {
          continue;
        }

        let curTargetMap = targetMap;
        const localID = childInfo.targetInfo.localID;

        if (localID.length > 0) {
          for (let i = 0; i < localID.length - 1; i++) {
            curTargetMap = curTargetMap[localID[i]];
          }
        }

        if (childInfo.nodes) {
          for (let i = 0; i < childInfo.nodes.length; i++) {
            const childNode = childInfo.nodes[i]; // @ts-expect-error private member access

            if (!childNode || target._children.includes(childNode)) {
              continue;
            } // @ts-expect-error private member access


            target._children.push(childNode); // @ts-expect-error: private member access


            childNode._parent = target;

            if (EDITOR) {
              if (!childNode[editorExtrasTag]) {
                childNode[editorExtrasTag] = {};
              } // @ts-expect-error editor polyfill


              childNode[editorExtrasTag].mountedRoot = node;
            } // mounted node need to add to the target map


            generateTargetMap(childNode, curTargetMap, false); // siblingIndex update is in _onBatchCreated function, and it p needs a parent.
            // @ts-expect-error private member access

            childNode._siblingIndex = target._children.length - 1;
            expandPrefabInstanceNode(childNode, true);
          }
        }
      }
    }
  }

  function applyMountedComponents(node, mountedComponents, targetMap) {
    if (!mountedComponents) {
      return;
    }

    for (let i = 0; i < mountedComponents.length; i++) {
      const componentsInfo = mountedComponents[i];

      if (componentsInfo && componentsInfo.targetInfo) {
        const target = getTarget(componentsInfo.targetInfo.localID, targetMap);

        if (!target) {
          continue;
        }

        if (componentsInfo.components) {
          for (let i = 0; i < componentsInfo.components.length; i++) {
            const comp = componentsInfo.components[i];

            if (!comp) {
              continue;
            }

            comp.node = target;

            if (EDITOR) {
              if (!comp[editorExtrasTag]) {
                comp[editorExtrasTag] = {};
              } // @ts-expect-error editor polyfill


              comp[editorExtrasTag].mountedRoot = node;
            } // @ts-expect-error private member access


            target._components.push(comp);
          }
        }
      }
    }
  }

  function applyRemovedComponents(node, removedComponents, targetMap) {
    if (!removedComponents) {
      return;
    }

    for (let i = 0; i < removedComponents.length; i++) {
      const targetInfo = removedComponents[i];

      if (targetInfo) {
        const target = getTarget(targetInfo.localID, targetMap);

        if (!target || !target.node) {
          continue;
        }

        const index = target.node.components.indexOf(target);

        if (index >= 0) {
          // @ts-expect-error private member access
          target.node._components.splice(index, 1);
        }
      }
    }
  }

  function applyPropertyOverrides(node, propertyOverrides, targetMap) {
    if (propertyOverrides.length <= 0) {
      return;
    }

    let target = null;

    for (let i = 0; i < propertyOverrides.length; i++) {
      const propOverride = propertyOverrides[i];

      if (propOverride && propOverride.targetInfo) {
        const targetInfo = propOverride.targetInfo;
        target = getTarget(targetInfo.localID, targetMap);

        if (!target) {
          // Can't find target
          continue;
        }

        let targetPropOwner = target;
        const propertyPath = propOverride.propertyPath.slice();

        if (propertyPath.length > 0) {
          const targetPropName = propertyPath.pop();

          if (!targetPropName) {
            continue;
          }

          for (let i = 0; i < propertyPath.length; i++) {
            const propName = propertyPath[i];
            targetPropOwner = targetPropOwner[propName];

            if (!targetPropOwner) {
              break;
            }
          }

          if (!targetPropOwner) {
            continue;
          }

          if (Array.isArray(targetPropOwner)) {
            // if set element of a array, the length of a array must has been defined.
            if (targetPropName === 'length') {
              targetPropOwner[targetPropName] = propOverride.value;
            } else {
              const index = Number.parseInt(targetPropName);

              if (Number.isInteger(index) && index < targetPropOwner.length) {
                targetPropOwner[targetPropName] = propOverride.value;
              }
            }
          } else if (targetPropOwner[targetPropName] instanceof ValueType) {
            targetPropOwner[targetPropName].set(propOverride.value);
          } else {
            targetPropOwner[targetPropName] = propOverride.value;
          }
        } else if (EDITOR) {
          warn('property path is empty');
        }
      }
    }
  }

  function applyTargetOverrides(node) {
    var _node$_prefab2;

    // @ts-expect-error private member access
    const targetOverrides = (_node$_prefab2 = node._prefab) === null || _node$_prefab2 === void 0 ? void 0 : _node$_prefab2.targetOverrides;

    if (targetOverrides) {
      for (let i = 0; i < targetOverrides.length; i++) {
        var _targetOverride$targe, _targetOverride$targe2;

        const targetOverride = targetOverrides[i];
        let source = targetOverride.source;
        const sourceInfo = targetOverride.sourceInfo;

        if (sourceInfo) {
          var _targetOverride$sourc, _targetOverride$sourc2;

          // @ts-expect-error private member access
          const sourceInstance = (_targetOverride$sourc = targetOverride.source) === null || _targetOverride$sourc === void 0 ? void 0 : (_targetOverride$sourc2 = _targetOverride$sourc._prefab) === null || _targetOverride$sourc2 === void 0 ? void 0 : _targetOverride$sourc2.instance;

          if (sourceInstance && sourceInstance.targetMap) {
            source = getTarget(sourceInfo.localID, sourceInstance.targetMap);
          }
        }

        if (!source) {
          // Can't find source
          continue;
        }

        let target = null;
        const targetInfo = targetOverride.targetInfo;

        if (!targetInfo) {
          continue;
        } // @ts-expect-error private member access


        const targetInstance = (_targetOverride$targe = targetOverride.target) === null || _targetOverride$targe === void 0 ? void 0 : (_targetOverride$targe2 = _targetOverride$targe._prefab) === null || _targetOverride$targe2 === void 0 ? void 0 : _targetOverride$targe2.instance;

        if (!targetInstance || !targetInstance.targetMap) {
          continue;
        }

        target = getTarget(targetInfo.localID, targetInstance.targetMap);

        if (!target) {
          // Can't find target
          continue;
        }

        const propertyPath = targetOverride.propertyPath.slice();
        let targetPropOwner = source;

        if (propertyPath.length > 0) {
          const targetPropName = propertyPath.pop();

          if (!targetPropName) {
            return;
          }

          for (let i = 0; i < propertyPath.length; i++) {
            const propName = propertyPath[i];
            targetPropOwner = targetPropOwner[propName];

            if (!targetPropOwner) {
              break;
            }
          }

          if (!targetPropOwner) {
            continue;
          }

          targetPropOwner[targetPropName] = target;
        }
      }
    }
  }

  function expandPrefabInstanceNode(node, recursively = false) {
    // @ts-expect-error private member access
    const prefabInfo = node._prefab;
    const prefabInstance = prefabInfo === null || prefabInfo === void 0 ? void 0 : prefabInfo.instance;

    if (prefabInstance && !prefabInstance.expanded) {
      createNodeWithPrefab(node); // nested prefab should expand before parent(property override order)

      if (recursively) {
        if (node && node.children) {
          node.children.forEach(child => {
            expandPrefabInstanceNode(child, true);
          });
        }
      }

      const targetMap = {};
      prefabInstance.targetMap = targetMap;
      generateTargetMap(node, targetMap, true);
      applyMountedChildren(node, prefabInstance.mountedChildren, targetMap);
      applyRemovedComponents(node, prefabInstance.removedComponents, targetMap);
      applyMountedComponents(node, prefabInstance.mountedComponents, targetMap);
      applyPropertyOverrides(node, prefabInstance.propertyOverrides, targetMap);
      prefabInstance.expanded = true;
    } else if (recursively) {
      if (node && node.children) {
        node.children.forEach(child => {
          expandPrefabInstanceNode(child, true);
        });
      }
    }
  }

  function expandNestedPrefabInstanceNode(node) {
    // @ts-expect-error private member access
    const prefabInfo = node._prefab;

    if (prefabInfo && prefabInfo.nestedPrefabInstanceRoots) {
      prefabInfo.nestedPrefabInstanceRoots.forEach(instanceNode => {
        expandPrefabInstanceNode(instanceNode); // when expanding the prefab,it's children will be change,so need to apply after expanded

        if (!EDITOR) {
          var _instanceNode$_prefab, _instanceNode$_prefab2;

          // @ts-expect-error private member access
          applyNodeAndComponentId(instanceNode, (_instanceNode$_prefab = instanceNode._prefab) === null || _instanceNode$_prefab === void 0 ? void 0 : (_instanceNode$_prefab2 = _instanceNode$_prefab.instance) === null || _instanceNode$_prefab2 === void 0 ? void 0 : _instanceNode$_prefab2.fileId);
        }
      });
    }
  } // make sure prefab instance's children id is fixed


  function applyNodeAndComponentId(prefabInstanceNode, rootId) {
    const {
      components,
      children
    } = prefabInstanceNode;

    for (let i = 0; i < components.length; i++) {
      var _comp$__prefab$fileId, _comp$__prefab;

      const comp = components[i];
      const fileID = (_comp$__prefab$fileId = (_comp$__prefab = comp.__prefab) === null || _comp$__prefab === void 0 ? void 0 : _comp$__prefab.fileId) !== null && _comp$__prefab$fileId !== void 0 ? _comp$__prefab$fileId : '';
      comp._id = `${rootId}${fileID}`;
    }

    for (let i = 0; i < children.length; i++) {
      const child = children[i]; // @ts-expect-error private member access

      const prefabInfo = child._prefab;
      const fileId = prefabInfo !== null && prefabInfo !== void 0 && prefabInfo.instance ? prefabInfo.instance.fileId : prefabInfo === null || prefabInfo === void 0 ? void 0 : prefabInfo.fileId;
      if (!fileId) continue; // @ts-expect-error private member access

      child._id = `${rootId}${fileId}`; // ignore prefab instance,because it will be apply in 'nestedPrefabInstanceRoots' for loop;

      if (!(prefabInfo !== null && prefabInfo !== void 0 && prefabInfo.instance)) {
        applyNodeAndComponentId(child, rootId);
      }
    }
  }

  _export({
    createNodeWithPrefab: createNodeWithPrefab,
    generateTargetMap: generateTargetMap,
    getTarget: getTarget,
    applyMountedChildren: applyMountedChildren,
    applyMountedComponents: applyMountedComponents,
    applyRemovedComponents: applyRemovedComponents,
    applyPropertyOverrides: applyPropertyOverrides,
    applyTargetOverrides: applyTargetOverrides,
    expandPrefabInstanceNode: expandPrefabInstanceNode,
    expandNestedPrefabInstanceNode: expandNestedPrefabInstanceNode,
    applyNodeAndComponentId: applyNodeAndComponentId
  });

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      SUPPORT_JIT = _virtualInternal253AconstantsJs.SUPPORT_JIT;
    }, function (_coreIndexJs) {
      cclegacy = _coreIndexJs.cclegacy;
      errorID = _coreIndexJs.errorID;
      warn = _coreIndexJs.warn;
      editorExtrasTag = _coreIndexJs.editorExtrasTag;
    }, function (_coreValueTypesIndexJs) {
      ValueType = _coreValueTypesIndexJs.ValueType;
    }, function (_prefabInfoJs) {
      var _exportObj = {};

      for (var _key in _prefabInfoJs) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _prefabInfoJs[_key];
      }

      _export(_exportObj);
    }],
    execute: function () {}
  };
});