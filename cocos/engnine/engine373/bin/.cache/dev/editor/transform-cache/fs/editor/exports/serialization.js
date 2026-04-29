System.register("q-bundled:///fs/editor/exports/serialization.js", ["../../cocos/serialization/ccon.js"], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_cocosSerializationCconJs) {
      _export({
        CCON: _cocosSerializationCconJs.CCON,
        encodeCCONJson: _cocosSerializationCconJs.encodeCCONJson,
        encodeCCONBinary: _cocosSerializationCconJs.encodeCCONBinary,
        BufferBuilder: _cocosSerializationCconJs.BufferBuilder,
        decodeCCONBinary: _cocosSerializationCconJs.decodeCCONBinary,
        parseCCONJson: _cocosSerializationCconJs.parseCCONJson
      });
    }],
    execute: function () {}
  };
});