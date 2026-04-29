System.register("q-bundled:///fs/cocos/2d/renderer/linear-buffer-accessor.js", ["./mesh-buffer.js", "./buffer-accessor.js", "../../core/index.js"], function (_export, _context) {
  "use strict";

  var MeshBuffer, BufferAccessor, assertID, macro, assertIsNonNullable, LinearBufferAccessor;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_meshBufferJs) {
      MeshBuffer = _meshBufferJs.MeshBuffer;
    }, function (_bufferAccessorJs) {
      BufferAccessor = _bufferAccessorJs.BufferAccessor;
    }, function (_coreIndexJs) {
      assertID = _coreIndexJs.assertID;
      macro = _coreIndexJs.macro;
      assertIsNonNullable = _coreIndexJs.assertIsNonNullable;
    }],
    execute: function () {
      _export("LinearBufferAccessor", LinearBufferAccessor = /*#__PURE__*/function (_BufferAccessor) {
        _inheritsLoose(LinearBufferAccessor, _BufferAccessor);

        function LinearBufferAccessor(device, attributes) {
          var _this;

          _this = _BufferAccessor.call(this, device, attributes) || this; // Initialize first mesh buffer

          _this.byteStart = 0;
          _this.indexStart = 0;
          _this.vertexStart = 0;
          _this._currentId = -1;

          _this._allocateBuffer();

          return _this;
        }

        var _proto = LinearBufferAccessor.prototype;

        _proto.destroy = function destroy() {
          // Destroy mesh buffers
          for (var i = 0; i < this._buffers.length; ++i) {
            this._buffers[i].destroy();
          }

          this._buffers.length = 0;

          _BufferAccessor.prototype.destroy.call(this);
        };

        _proto.reset = function reset() {
          this.byteStart = 0;
          this.indexStart = 0;
          this.vertexStart = 0;

          for (var i = 0; i <= this._currentId; ++i) {
            var buf = this._buffers[i];
            buf.byteOffset = 0;
            buf.indexOffset = 0;
            buf.vertexOffset = 0;

            this._buffers[i].reset();
          }

          this._currentId = 0;
        };

        _proto.request = function request(vertexCount, indexCount) {
          if (vertexCount === void 0) {
            vertexCount = 4;
          }

          if (indexCount === void 0) {
            indexCount = 6;
          }

          var buf = this._buffers[this._currentId];

          this._allocateChunk(vertexCount, indexCount); // Mesh buffer might be switched, can't use initial offsets


          buf.vertexOffset += vertexCount;
          buf.indexOffset += indexCount;
          buf.byteOffset += vertexCount * this.vertexFormatBytes;
          buf.setDirty();
        };

        _proto.appendBuffers = function appendBuffers(vertices, indices) {
          var vertexCount = vertices.length / this._floatsPerVertex;

          this._allocateChunk(vertexCount, indices.length);

          var buf = this._buffers[this._currentId]; // Float offset calculation only valid for Float32 vertex buffer

          buf.vData.set(vertices, buf.byteOffset >> 2);
          var iData = buf.iData;
          var vertexId = buf.vertexOffset;
          var indexOffset = buf.indexOffset;

          for (var i = 0; i < indices.length; ++i, ++indexOffset) {
            iData[indexOffset] = vertexId + indices[i];
          }

          buf.vertexOffset += vertexCount;
          buf.indexOffset += indices.length;
          buf.byteOffset += vertices.byteLength;
          buf.setDirty();
        };

        _proto.recordBatch = function recordBatch() {
          var buf = this._buffers[this._currentId];
          var vCount = buf.indexOffset - this.indexStart;

          if (!vCount) {
            return null;
          }

          var ia = buf.requireFreeIA(this._device);
          ia.firstIndex = this.indexStart;
          ia.indexCount = vCount; // Reset mesh buffer data cursor

          this.vertexStart = buf.vertexOffset;
          this.indexStart = buf.indexOffset;
          this.byteStart = buf.byteOffset;
          return ia;
        };

        _proto.uploadBuffers = function uploadBuffers() {
          assertIsNonNullable(this._buffers[this._currentId]);

          for (var i = 0; i <= this._currentId; ++i) {
            this._buffers[i].uploadBuffers();
          }
        };

        _proto._allocateChunk = function _allocateChunk(vertexCount, indexCount) {
          var switchedBuffer = false;
          var buf = this._buffers[this._currentId];
          var byteOffset = buf.byteOffset + vertexCount * this.vertexFormatBytes;
          var indexOffset = buf.indexOffset + indexCount;
          var byteLength = buf.vData.byteLength;
          var indicesLength = buf.iData.length;

          if (byteOffset > byteLength || indexOffset > indicesLength) {
            var success = buf.checkCapacity(vertexCount, indexCount); // No enough space in the current mesh buffer

            if (!success) {
              this._allocateBuffer();

              switchedBuffer = true;
            }
          }

          return switchedBuffer;
        };

        _proto._allocateBuffer = function _allocateBuffer() {
          var id = this._currentId + 1;
          var l = this._buffers.length; // Validate length of buffer array

          assertID(id <= l, 9003); // Out of bound, new mesh buffer required

          if (id === l) {
            var buffer = new MeshBuffer();
            var vCount = Math.floor(macro.BATCHER2D_MEM_INCREMENT * 1024 / this._vertexFormatBytes);
            var iCount = vCount * LinearBufferAccessor.IB_SCALE;
            buffer.initialize(this._device, this._attributes, vCount * this._floatsPerVertex, iCount);

            this._buffers.push(buffer);
          }

          this.byteStart = 0;
          this.indexStart = 0;
          this.vertexStart = 0;
          this._currentId = id;
        };

        _createClass(LinearBufferAccessor, [{
          key: "byteOffset",
          get: // ib size scale based on vertex count
          // Buffer cursors for the current mesh buffer
          function get() {
            return this._buffers[this._currentId].byteOffset;
          }
        }, {
          key: "vertexOffset",
          get: function get() {
            return this._buffers[this._currentId].vertexOffset;
          }
        }, {
          key: "indexOffset",
          get: function get() {
            return this._buffers[this._currentId].indexOffset;
          }
        }, {
          key: "currentBuffer",
          get: function get() {
            return this._buffers[this._currentId];
          }
        }]);

        return LinearBufferAccessor;
      }(BufferAccessor));

      LinearBufferAccessor.IB_SCALE = 4;
    }
  };
});