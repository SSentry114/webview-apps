System.register("q-bundled:///fs/cocos/2d/assembler/label/ttf.js", ["../../../core/index.js", "./ttfUtils.js"], function (_export, _context) {
  "use strict";

  var Color, js, ttfUtils, WHITE, QUAD_INDICES, ttf;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_coreIndexJs) {
      Color = _coreIndexJs.Color;
      js = _coreIndexJs.js;
    }, function (_ttfUtilsJs) {
      ttfUtils = _ttfUtilsJs.ttfUtils;
    }],
    execute: function () {
      WHITE = Color.WHITE.clone();
      QUAD_INDICES = Uint16Array.from([0, 1, 2, 1, 3, 2]);
      /**
       * ttf 组装器
       * 可通过 `UI.ttf` 获取该组装器。
       */

      _export("ttf", ttf = {
        createData: function createData(comp) {
          var renderData = comp.requestRenderData();
          renderData.dataLength = 4;
          renderData.resize(4, 6);
          var vData = renderData.chunk.vb;
          vData[3] = vData[21] = vData[22] = vData[31] = 0;
          vData[4] = vData[12] = vData[13] = vData[30] = 1;
          var offset = 5;

          for (var i = 0; i < 4; i++) {
            Color.toArray(vData, WHITE, offset);
            offset += 9;
          }

          renderData.vertexRow = 2;
          renderData.vertexCol = 2;
          renderData.chunk.setIndexBuffer(QUAD_INDICES);
          return renderData;
        },
        fillBuffers: function fillBuffers(comp, renderer) {
          var renderData = comp.renderData;
          var chunk = renderData.chunk;
          var dataList = renderData.data;
          var node = comp.node;
          var vData = chunk.vb; // normal version

          var m = node.worldMatrix;
          var stride = renderData.floatStride;
          var offset = 0;
          var length = dataList.length;

          for (var i = 0; i < length; i++) {
            var curData = dataList[i];
            var x = curData.x;
            var y = curData.y;
            var rhw = m.m03 * x + m.m07 * y + m.m15;
            rhw = rhw ? Math.abs(1 / rhw) : 1;
            offset = i * stride;
            vData[offset + 0] = (m.m00 * x + m.m04 * y + m.m12) * rhw;
            vData[offset + 1] = (m.m01 * x + m.m05 * y + m.m13) * rhw;
            vData[offset + 2] = (m.m02 * x + m.m06 * y + m.m14) * rhw;
          } // quick version


          var vid = chunk.vertexOffset;
          var meshBuffer = chunk.meshBuffer;
          var ib = chunk.meshBuffer.iData;
          var indexOffset = meshBuffer.indexOffset;
          ib[indexOffset++] = vid;
          ib[indexOffset++] = vid + 1;
          ib[indexOffset++] = vid + 2;
          ib[indexOffset++] = vid + 2;
          ib[indexOffset++] = vid + 1;
          ib[indexOffset++] = vid + 3;
          meshBuffer.indexOffset += 6; // slow version
          // const chunk = renderData.chunk;
          // renderer.getBufferAccessor().appendIndices(chunk);
        },
        updateVertexData: function updateVertexData(comp) {
          var renderData = comp.renderData;

          if (!renderData) {
            return;
          }

          var uiTrans = comp.node._uiProps.uiTransformComp;
          var width = uiTrans.width;
          var height = uiTrans.height;
          var appX = uiTrans.anchorX * width;
          var appY = uiTrans.anchorY * height;
          var data = renderData.data;
          data[0].x = -appX; // l

          data[0].y = -appY; // b

          data[1].x = width - appX; // r

          data[1].y = -appY; // b

          data[2].x = -appX; // l

          data[2].y = height - appY; // t

          data[3].x = width - appX; // r

          data[3].y = height - appY; // t
        },
        updateUVs: function updateUVs(comp) {
          var renderData = comp.renderData;

          if (!renderData || !comp.ttfSpriteFrame) {
            return;
          }

          var vData = renderData.chunk.vb;
          var uv = comp.ttfSpriteFrame.uv;
          vData[3] = uv[0];
          vData[4] = uv[1];
          vData[12] = uv[2];
          vData[13] = uv[3];
          vData[21] = uv[4];
          vData[22] = uv[5];
          vData[30] = uv[6];
          vData[31] = uv[7];
        },
        updateColor: function updateColor(comp) {}
      });

      js.addon(ttf, ttfUtils);
    }
  };
});