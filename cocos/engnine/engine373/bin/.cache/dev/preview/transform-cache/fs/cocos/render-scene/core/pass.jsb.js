System.register("q-bundled:///fs/cocos/render-scene/core/pass.jsb.js", [], function (_export, _context) {
  "use strict";

  var BatchingSchemes, Pass;

  _export("BatchingSchemes", void 0);

  return {
    setters: [],
    execute: function () {
      (function (BatchingSchemes) {
        BatchingSchemes[BatchingSchemes["NONE"] = 0] = "NONE";
        BatchingSchemes[BatchingSchemes["INSTANCING"] = 1] = "INSTANCING";
        BatchingSchemes[BatchingSchemes["VB_MERGING"] = 2] = "VB_MERGING";
      })(BatchingSchemes || _export("BatchingSchemes", BatchingSchemes = {}));

      _export("Pass", Pass = jsb.Pass);
    }
  };
});