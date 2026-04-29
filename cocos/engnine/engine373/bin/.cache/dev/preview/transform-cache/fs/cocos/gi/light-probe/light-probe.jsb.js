System.register("q-bundled:///fs/cocos/gi/light-probe/light-probe.jsb.js", ["../../core/index.js", "./delaunay.js"], function (_export, _context) {
  "use strict";

  var _decorator, Tetrahedron, Vertex, ccclass, serializable, type, LightProbes, LightProbesData, LightProbesDataProto;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_coreIndexJs) {
      _decorator = _coreIndexJs._decorator;
    }, function (_delaunayJs) {
      Tetrahedron = _delaunayJs.Tetrahedron;
      Vertex = _delaunayJs.Vertex;
    }],
    execute: function () {
      ccclass = _decorator.ccclass;
      serializable = _decorator.serializable;
      type = _decorator.type;

      _export("LightProbes", LightProbes = jsb.LightProbes);

      ccclass('cc.LightProbes')(LightProbes);

      _export("LightProbesData", LightProbesData = jsb.LightProbesData);

      LightProbesDataProto = LightProbesData.prototype; // @ts-expect-error

      type([Vertex])(LightProbesDataProto, '_probes', function () {
        return [];
      });
      serializable(LightProbesDataProto, '_probes', function () {
        return [];
      }); // @ts-expect-error

      type([Tetrahedron])(LightProbesDataProto, '_tetrahedrons', function () {
        return [];
      });
      serializable(LightProbesDataProto, '_tetrahedrons', function () {
        return [];
      });
      ccclass('cc.LightProbesData')(LightProbesData);
    }
  };
});