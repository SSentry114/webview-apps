System.register("q-bundled:///fs/cocos/animation/marionette/variable.js", [], function (_export, _context) {
  "use strict";

  var VarInstance, VariableType, TriggerResetMode;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export({
    VarInstance: void 0,
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

      _export("VarInstance", VarInstance = class VarInstance {
        constructor(type, value) {
          this.type = void 0;
          this.resetMode = TriggerResetMode.AFTER_CONSUMED;
          this._value = void 0;
          this._refs = [];
          this.type = type;
          this._value = value;
        }

        get value() {
          return this._value;
        }

        set value(value) {
          this._value = value;

          for (const {
            fn,
            thisArg,
            args
          } of this._refs) {
            fn.call(thisArg, value, ...args);
          }
        }

        bind(fn, thisArg, ...args) {
          this._refs.push({
            fn: fn,
            thisArg,
            args
          });

          return this._value;
        }

      });
    }
  };
});