System.register("q-bundled:///fs/cocos/gfx/base/states/buffer-barrier.js", ["../../../core/index.js", "../define.js"], function (_export, _context) {
  "use strict";

  var murmurhash2_32_gc, GFXObject, ObjectType, BufferBarrierInfo, BufferBarrier;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_coreIndexJs) {
      murmurhash2_32_gc = _coreIndexJs.murmurhash2_32_gc;
    }, function (_defineJs) {
      GFXObject = _defineJs.GFXObject;
      ObjectType = _defineJs.ObjectType;
      BufferBarrierInfo = _defineJs.BufferBarrierInfo;
    }],
    execute: function () {
      /**
       * @en GFX buffer barrier.
       * @zh GFX buffer内存屏障。
       */
      _export("BufferBarrier", BufferBarrier = /*#__PURE__*/function (_GFXObject) {
        _inheritsLoose(BufferBarrier, _GFXObject);

        function BufferBarrier(info, hash) {
          var _this;

          _this = _GFXObject.call(this, ObjectType.BUFFER_BARRIER) || this;
          _this._info = new BufferBarrierInfo();
          _this._hash = 0;

          _this._info.copy(info);

          _this._hash = hash;
          return _this;
        }

        BufferBarrier.computeHash = function computeHash(info) {
          var res = info.prevAccesses + " " + info.nextAccesses;
          res += info.type;
          res += info.offset;
          res += info.size;
          res += info.discardContents;
          res += info.srcQueue ? info.srcQueue.type : 0;
          res += info.dstQueue ? info.dstQueue.type : 0;
          return murmurhash2_32_gc(res, 666);
        };

        _createClass(BufferBarrier, [{
          key: "info",
          get: function get() {
            return this._info;
          }
        }, {
          key: "hash",
          get: function get() {
            return this._hash;
          }
        }]);

        return BufferBarrier;
      }(GFXObject));
    }
  };
});