System.register("q-bundled:///fs/cocos/2d/assembler/utils.js", ["../../core/index.js", "../../gfx/index.js"], function (_export, _context) {
  "use strict";

  var Color, Mat4, clamp, FormatInfos, m;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function fillMeshVertices3D(node, renderer, renderData, color) {
    var chunk = renderData.chunk;
    var dataList = renderData.data;
    var vData = chunk.vb;
    var vertexCount = renderData.vertexCount;
    node.getWorldMatrix(m);
    var vertexOffset = 0;

    for (var i = 0; i < vertexCount; i++) {
      var vert = dataList[i];
      var x = vert.x;
      var y = vert.y;
      var rhw = m.m03 * x + m.m07 * y + m.m15;
      rhw = rhw ? Math.abs(1 / rhw) : 1;
      vData[vertexOffset + 0] = (m.m00 * x + m.m04 * y + m.m12) * rhw;
      vData[vertexOffset + 1] = (m.m01 * x + m.m05 * y + m.m13) * rhw;
      vData[vertexOffset + 2] = (m.m02 * x + m.m06 * y + m.m14) * rhw;
      Color.toArray(vData, color, vertexOffset + 5);
      vertexOffset += 9;
    } // fill index data


    var bid = chunk.bufferId;
    var vid = chunk.vertexOffset;
    var meshBuffer = chunk.meshBuffer;
    var ib = chunk.meshBuffer.iData;
    var indexOffset = meshBuffer.indexOffset;

    for (var _i = 0, count = vertexCount / 4; _i < count; _i++) {
      var start = vid + _i * 4;
      ib[indexOffset++] = start;
      ib[indexOffset++] = start + 1;
      ib[indexOffset++] = start + 2;
      ib[indexOffset++] = start + 1;
      ib[indexOffset++] = start + 3;
      ib[indexOffset++] = start + 2;
    }

    meshBuffer.indexOffset += renderData.indexCount;
    meshBuffer.setDirty();
  }

  function updateOpacity(renderData, opacity) {
    var vfmt = renderData.vertexFormat;
    var vb = renderData.chunk.vb;
    var attr;
    var format;
    var stride; // Color component offset

    var offset = 0;

    for (var i = 0; i < vfmt.length; ++i) {
      attr = vfmt[i];
      format = FormatInfos[attr.format];

      if (format.hasAlpha) {
        stride = renderData.floatStride;

        if (format.size / format.count === 1) {
          var alpha = ~~clamp(Math.round(opacity * 255), 0, 255); // Uint color RGBA8

          for (var color = offset; color < vb.length; color += stride) {
            vb[color] = (vb[color] & 0xffffff00 | alpha) >>> 0;
          }
        } else if (format.size / format.count === 4) {
          // RGBA32 color, alpha at position 3
          for (var _alpha = offset + 3; _alpha < vb.length; _alpha += stride) {
            vb[_alpha] = opacity;
          }
        }
      }

      offset += format.size >> 2;
    }
  }

  _export({
    fillMeshVertices3D: fillMeshVertices3D,
    updateOpacity: updateOpacity
  });

  return {
    setters: [function (_coreIndexJs) {
      Color = _coreIndexJs.Color;
      Mat4 = _coreIndexJs.Mat4;
      clamp = _coreIndexJs.clamp;
    }, function (_gfxIndexJs) {
      FormatInfos = _gfxIndexJs.FormatInfos;
    }],
    execute: function () {
      m = new Mat4();
    }
  };
});