System.register("q-bundled:///fs/cocos/asset/asset-manager/deserialize.js", ["../../../../virtual/internal%253Aconstants.js", "../../misc/missing-script.js", "../../serialization/deserialize.js", "../../core/index.js", "./depend-maps.js", "./helper.js"], function (_export, _context) {
  "use strict";

  var EDITOR, MissingScript, deserialize, Details, error, js, dependMap, nativeDependMap, decodeUuid, missingClass;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function deserializeAsset(json, options) {
    let classFinder;

    if (EDITOR) {
      classFinder = (type, data, owner, propName) => {
        const res = missingClass.classFinder(type, data, owner, propName);

        if (res) {
          return res;
        }

        return MissingScript;
      };

      classFinder.onDereferenced = missingClass.classFinder.onDereferenced;
    } else {
      classFinder = MissingScript.safeFindClass;
    }

    const tdInfo = Details.pool.get();
    let asset;

    try {
      asset = deserialize(json, tdInfo, {
        classFinder,
        customEnv: options
      });
    } catch (e) {
      error(e);
      Details.pool.put(tdInfo);
      throw e;
    }

    asset._uuid = options.__uuid__ || '';

    if (EDITOR) {
      missingClass.reportMissingClass(asset);
      missingClass.reset();
    }

    const uuidList = tdInfo.uuidList;
    const objList = tdInfo.uuidObjList;
    const propList = tdInfo.uuidPropList;
    const typeList = tdInfo.uuidTypeList || [];
    const depends = [];

    for (let i = 0; i < uuidList.length; i++) {
      const dependUuid = uuidList[i];
      depends[i] = {
        uuid: decodeUuid(dependUuid),
        owner: objList[i],
        prop: propList[i],
        type: js.getClassById(typeList[i])
      };
    } // non-native deps


    dependMap.set(asset, depends); // native dep

    if (asset._native) {
      nativeDependMap.add(asset);
    }

    Details.pool.put(tdInfo);
    return asset;
  }

  _export("default", deserializeAsset);

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_miscMissingScriptJs) {
      MissingScript = _miscMissingScriptJs.MissingScript;
    }, function (_serializationDeserializeJs) {
      deserialize = _serializationDeserializeJs.deserialize;
      Details = _serializationDeserializeJs.Details;
    }, function (_coreIndexJs) {
      error = _coreIndexJs.error;
      js = _coreIndexJs.js;
    }, function (_dependMapsJs) {
      dependMap = _dependMapsJs.dependMap;
      nativeDependMap = _dependMapsJs.nativeDependMap;
    }, function (_helperJs) {
      decodeUuid = _helperJs.decodeUuid;
    }],
    execute: function () {
      missingClass = EDITOR && EditorExtends.MissingReporter.classInstance;
    }
  };
});