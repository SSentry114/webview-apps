System.register("q-bundled:///fs/cocos/3d/misc/buffer.js", ["../../gfx/index.js", "../../core/index.js"], function (_export, _context) {
  "use strict";

  var Format, FormatInfos, FormatType, sys, _typeMap;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _getDataViewType(info) {
    const type = _typeMap[info.type] || _typeMap.default;
    const bytes = info.size / info.count * 8;
    return `${type}${bytes}`;
  } // default params bahaves just like on an plain, compact Float32Array


  function writeBuffer(target, data, format = Format.R32F, offset = 0, stride = 0) {
    const info = FormatInfos[format];

    if (!stride) {
      stride = info.size;
    }

    const writer = `set${_getDataViewType(info)}`;
    const componentBytesLength = info.size / info.count;
    const nSeg = Math.floor(data.length / info.count);
    const isLittleEndian = sys.isLittleEndian;

    for (let iSeg = 0; iSeg < nSeg; ++iSeg) {
      const x = offset + stride * iSeg;

      for (let iComponent = 0; iComponent < info.count; ++iComponent) {
        const y = x + componentBytesLength * iComponent;
        target[writer](y, data[info.count * iSeg + iComponent], isLittleEndian);
      }
    }
  }

  function readBuffer(target, format = Format.R32F, offset = 0, length = target.byteLength - offset, stride = 0, out = []) {
    const info = FormatInfos[format];

    if (!stride) {
      stride = info.size;
    }

    const reader = `get${_getDataViewType(info)}`;
    const componentBytesLength = info.size / info.count;
    const nSeg = Math.floor(length / stride);
    const isLittleEndian = sys.isLittleEndian;

    for (let iSeg = 0; iSeg < nSeg; ++iSeg) {
      const x = offset + stride * iSeg;

      for (let iComponent = 0; iComponent < info.count; ++iComponent) {
        const y = x + componentBytesLength * iComponent;
        out[info.count * iSeg + iComponent] = target[reader](y, isLittleEndian);
      }
    }

    return out;
  }

  function mapBuffer(target, callback, format = Format.R32F, offset = 0, length = target.byteLength - offset, stride = 0, out) {
    if (!out) {
      out = new DataView(target.buffer.slice(target.byteOffset, target.byteOffset + target.byteLength));
    }

    const info = FormatInfos[format];

    if (!stride) {
      stride = info.size;
    }

    const writer = `set${_getDataViewType(info)}`;
    const reader = `get${_getDataViewType(info)}`;
    const componentBytesLength = info.size / info.count;
    const nSeg = Math.floor(length / stride);
    const isLittleEndian = sys.isLittleEndian;

    for (let iSeg = 0; iSeg < nSeg; ++iSeg) {
      const x = offset + stride * iSeg;

      for (let iComponent = 0; iComponent < info.count; ++iComponent) {
        const y = x + componentBytesLength * iComponent;
        const cur = target[reader](y, isLittleEndian); // iComponent is usually more useful than y

        out[writer](y, callback(cur, iComponent, target), isLittleEndian);
      }
    }

    return out;
  }

  _export({
    writeBuffer: writeBuffer,
    readBuffer: readBuffer,
    mapBuffer: mapBuffer
  });

  return {
    setters: [function (_gfxIndexJs) {
      Format = _gfxIndexJs.Format;
      FormatInfos = _gfxIndexJs.FormatInfos;
      FormatType = _gfxIndexJs.FormatType;
    }, function (_coreIndexJs) {
      sys = _coreIndexJs.sys;
    }],
    execute: function () {
      _typeMap = {
        [FormatType.UNORM]: 'Uint',
        [FormatType.SNORM]: 'Int',
        [FormatType.UINT]: 'Uint',
        [FormatType.INT]: 'Int',
        [FormatType.UFLOAT]: 'Float',
        [FormatType.FLOAT]: 'Float',
        default: 'Uint'
      };
    }
  };
});