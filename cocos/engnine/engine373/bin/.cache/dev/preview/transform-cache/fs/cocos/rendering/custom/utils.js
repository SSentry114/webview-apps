System.register("q-bundled:///fs/cocos/rendering/custom/utils.js", ["../../gfx/index.js"], function (_export, _context) {
  "use strict";

  var Type;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function isUICamera(camera) {
    var scene = camera.scene;
    var batches = scene.batches;

    for (var i = 0; i < batches.length; i++) {
      var batch = batches[i];

      if (camera.visibility & batch.visFlags) {
        return true;
      }
    }

    return false;
  } // eslint-disable-next-line @typescript-eslint/no-unused-vars


  function replacer(key, value) {
    if (value instanceof Map) {
      return {
        meta_t: 'Map',
        value: Array.from(value.entries()).sort(function (a, b) {
          return String(a[0]).localeCompare(b[0]);
        })
      };
    } else if (value instanceof Set) {
      return {
        meta_t: 'Set',
        value: Array.from(value).sort()
      };
    }

    return value;
  } // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars


  function reviver(key, value) {
    if (typeof value === 'object' && value !== null) {
      if (value.meta_t === 'Map') {
        return new Map(value.value);
      } else if (value.meta_t === 'Set') {
        return new Set(value.value);
      }
    } // eslint-disable-next-line @typescript-eslint/no-unsafe-return


    return value;
  }

  function stringify(data, space) {
    return JSON.stringify(data, replacer, space);
  }

  function parse(text) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(text, reviver);
  }

  function getUBOTypeCount(type) {
    switch (type) {
      case Type.BOOL:
      case Type.INT:
      case Type.UINT:
      case Type.FLOAT:
        return 1;

      case Type.INT2:
      case Type.FLOAT2:
      case Type.UINT2:
      case Type.BOOL2:
        return 2;

      case Type.FLOAT3:
      case Type.BOOL3:
      case Type.UINT3:
      case Type.INT3:
        return 3;

      case Type.BOOL4:
      case Type.FLOAT4:
      case Type.UINT4:
      case Type.INT4:
        return 4;

      case Type.MAT2:
        return 4;

      case Type.MAT2X3:
      case Type.MAT3X2:
        return 6;

      case Type.MAT2X4:
      case Type.MAT4X2:
        return 8;

      case Type.MAT3:
        return 9;

      case Type.MAT3X4:
      case Type.MAT4X3:
        return 12;

      case Type.MAT4:
        return 16;

      default:
        return 0;
    }
  }

  _export({
    isUICamera: isUICamera,
    replacer: replacer,
    reviver: reviver,
    stringify: stringify,
    parse: parse,
    getUBOTypeCount: getUBOTypeCount
  });

  return {
    setters: [function (_gfxIndexJs) {
      Type = _gfxIndexJs.Type;
    }],
    execute: function () {}
  };
});