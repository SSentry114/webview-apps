System.register("q-bundled:///fs/cocos/2d/renderer/buffer-accessor.js", ["./vertex-format.js"], function (_export, _context) {
  "use strict";

  var getAttributeStride, BufferAccessor;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_vertexFormatJs) {
      getAttributeStride = _vertexFormatJs.getAttributeStride;
    }],
    execute: function () {
      _export("BufferAccessor", BufferAccessor = /*#__PURE__*/function () {
        function BufferAccessor(device, attributes) {
          this._device = null;
          this._attributes = null;
          this._vertexFormatBytes = void 0;
          this._floatsPerVertex = void 0;
          this._buffers = [];
          this._device = device;
          this._attributes = attributes;
          this._floatsPerVertex = getAttributeStride(attributes) >> 2;
          this._vertexFormatBytes = this._floatsPerVertex * Float32Array.BYTES_PER_ELEMENT;
        }

        var _proto = BufferAccessor.prototype;

        _proto.initialize = function initialize() {};

        _proto.reset = function reset() {};

        _proto.request = function request(vertexCount, indexCount) {
          if (vertexCount === void 0) {
            vertexCount = 4;
          }

          if (indexCount === void 0) {
            indexCount = 6;
          }
        };

        _proto.appendBuffers = function appendBuffers(vertices, indices) {};

        _proto.uploadBuffers = function uploadBuffers() {};

        _proto.destroy = function destroy() {
          this._attributes.length = 0;
        };

        _createClass(BufferAccessor, [{
          key: "attributes",
          get: function get() {
            return this._attributes;
          }
        }, {
          key: "vertexFormatBytes",
          get: function get() {
            return this._vertexFormatBytes;
          }
        }, {
          key: "floatsPerVertex",
          get: function get() {
            return this._floatsPerVertex;
          }
        }]);

        return BufferAccessor;
      }());
    }
  };
});