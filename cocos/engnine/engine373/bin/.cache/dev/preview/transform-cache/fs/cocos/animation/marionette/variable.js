System.register("q-bundled:///fs/cocos/animation/marionette/variable.js", [], function (_export, _context) {
  "use strict";

  var VariableType, TriggerResetMode, VarInstance;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  _export({
    VariableType: void 0,
    TriggerResetMode: void 0
  });

  return {
    setters: [],
    execute: function () {
      (function (VariableType) {
        VariableType[VariableType["FLOAT"] = 0] = "FLOAT";
        VariableType[VariableType["BOOLEAN"] = 1] = "BOOLEAN";
        VariableType[VariableType["TRIGGER"] = 2] = "TRIGGER";
        VariableType[VariableType["INTEGER"] = 3] = "INTEGER";
      })(VariableType || _export("VariableType", VariableType = {}));

      (function (TriggerResetMode) {
        TriggerResetMode[TriggerResetMode["AFTER_CONSUMED"] = 0] = "AFTER_CONSUMED";
        TriggerResetMode[TriggerResetMode["NEXT_FRAME_OR_AFTER_CONSUMED"] = 1] = "NEXT_FRAME_OR_AFTER_CONSUMED";
      })(TriggerResetMode || _export("TriggerResetMode", TriggerResetMode = {}));

      _export("VarInstance", VarInstance = /*#__PURE__*/function () {
        function VarInstance(type, value) {
          this.type = void 0;
          this.resetMode = TriggerResetMode.AFTER_CONSUMED;
          this._value = void 0;
          this._refs = [];
          this.type = type;
          this._value = value;
        }

        var _proto = VarInstance.prototype;

        _proto.bind = function bind(fn, thisArg) {
          for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            args[_key - 2] = arguments[_key];
          }

          this._refs.push({
            fn: fn,
            thisArg: thisArg,
            args: args
          });

          return this._value;
        };

        _createClass(VarInstance, [{
          key: "value",
          get: function get() {
            return this._value;
          },
          set: function set(value) {
            this._value = value;

            for (var _iterator = _createForOfIteratorHelperLoose(this._refs), _step; !(_step = _iterator()).done;) {
              var _step$value = _step.value,
                  fn = _step$value.fn,
                  thisArg = _step$value.thisArg,
                  args = _step$value.args;
              fn.call.apply(fn, [thisArg, value].concat(args));
            }
          }
        }]);

        return VarInstance;
      }());
    }
  };
});