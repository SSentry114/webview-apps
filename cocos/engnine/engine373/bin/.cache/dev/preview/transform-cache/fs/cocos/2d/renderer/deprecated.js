System.register("q-bundled:///fs/cocos/2d/renderer/deprecated.js", ["./vertex-format.js", "./batcher-2d.js", "./draw-batch.js", "../../core/index.js", "./mesh-buffer.js", "./render-data.js"], function (_export, _context) {
  "use strict";

  var VertexFormat, Batcher2D, DrawBatch2D, markAsWarning, replaceProperty, removeProperty, warnID, MeshBuffer, MeshRenderData, UIDrawBatch, QuadRenderData;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_vertexFormatJs) {
      VertexFormat = _vertexFormatJs;
    }, function (_batcher2dJs) {
      Batcher2D = _batcher2dJs.Batcher2D;
    }, function (_drawBatchJs) {
      DrawBatch2D = _drawBatchJs.DrawBatch2D;
    }, function (_coreIndexJs) {
      markAsWarning = _coreIndexJs.markAsWarning;
      replaceProperty = _coreIndexJs.replaceProperty;
      removeProperty = _coreIndexJs.removeProperty;
      warnID = _coreIndexJs.warnID;
    }, function (_meshBufferJs) {
      MeshBuffer = _meshBufferJs.MeshBuffer;
    }, function (_renderDataJs) {
      MeshRenderData = _renderDataJs.MeshRenderData;
    }],
    execute: function () {
      _export("UIVertexFormat", VertexFormat);

      _export("UI", Batcher2D);

      /**
       * @deprecated since v3.6.0, this is an engine private interface that will be removed in the future.
       * @internal
       */
      _export("UIDrawBatch", UIDrawBatch = /*#__PURE__*/function (_DrawBatch2D) {
        _inheritsLoose(UIDrawBatch, _DrawBatch2D);

        function UIDrawBatch() {
          return _DrawBatch2D.apply(this, arguments) || this;
        }

        return UIDrawBatch;
      }(DrawBatch2D));

      markAsWarning(MeshBuffer.prototype, 'MeshBuffer', ['byteStart', 'vertexStart', 'indicesStart', 'request'].map(function (item) {
        return {
          name: item,
          suggest: "please use meshBuffer.accessor." + item + " instead"
        };
      }));
      replaceProperty(MeshBuffer.prototype, 'MeshBuffer', [{
        name: 'indicesOffset',
        newName: 'indexOffset'
      }]);
      removeProperty(MeshBuffer.prototype, 'MeshBuffer', [{
        name: 'vertexBuffers'
      }, {
        name: 'indexBuffer'
      }]);
      replaceProperty(Batcher2D.prototype, 'Batcher2D', [{
        name: 'currBufferBatch',
        newName: 'currBufferAccessor'
      }, {
        name: 'acquireBufferBatch',
        newName: 'switchBufferAccessor'
      }]);
      removeProperty(MeshRenderData.prototype, 'MeshRenderData', [{
        name: 'formatByte'
      }, {
        name: 'byteStart'
      }, {
        name: 'byteCount'
      }]);
      replaceProperty(MeshRenderData.prototype, 'MeshRenderData', [{
        name: 'indicesStart',
        newName: 'indexStart'
      }]);

      _export("QuadRenderData", QuadRenderData = /*#__PURE__*/function (_MeshRenderData) {
        _inheritsLoose(QuadRenderData, _MeshRenderData);

        function QuadRenderData(vertexFormat) {
          var _this;

          _this = _MeshRenderData.call(this, vertexFormat) || this;
          warnID(9006);
          return _this;
        }

        return QuadRenderData;
      }(MeshRenderData));
    }
  };
});