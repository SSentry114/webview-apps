System.register("q-bundled:///fs/cocos/gi/light-probe/delaunay.jsb.js", ["../../core/index.js"], function (_export, _context) {
  "use strict";

  var Mat3, Vec3, _decorator, ccclass, serializable, Vertex, VertexProto, CircumSphere, CircumSphereProto, Tetrahedron, TetrahedronProto;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_coreIndexJs) {
      Mat3 = _coreIndexJs.Mat3;
      Vec3 = _coreIndexJs.Vec3;
      _decorator = _coreIndexJs._decorator;
    }],
    execute: function () {
      ({
        ccclass,
        serializable
      } = _decorator);

      _export("Vertex", Vertex = jsb.Vertex);

      VertexProto = Vertex.prototype;
      serializable(VertexProto, 'position', () => new Vec3(0, 0, 0));
      serializable(VertexProto, 'normal', () => new Vec3(0, 0, 0));
      serializable(VertexProto, 'coefficients', () => []);
      ccclass('cc.Vertex')(Vertex);

      _export("CircumSphere", CircumSphere = jsb.CircumSphere);

      CircumSphereProto = CircumSphere.prototype;
      serializable(CircumSphereProto, 'center', () => new Vec3(0, 0, 0));
      serializable(CircumSphereProto, 'radiusSquared', () => 0.0);
      ccclass('cc.CircumSphere')(CircumSphere);

      _export("Tetrahedron", Tetrahedron = jsb.Tetrahedron);

      TetrahedronProto = Tetrahedron.prototype;
      serializable(TetrahedronProto, 'invalid', () => false);
      serializable(TetrahedronProto, 'vertex0', () => -1);
      serializable(TetrahedronProto, 'vertex1', () => -1);
      serializable(TetrahedronProto, 'vertex2', () => -1);
      serializable(TetrahedronProto, 'vertex3', () => -1);
      serializable(TetrahedronProto, 'neighbours', () => [-1, -1, -1, -1]);
      serializable(TetrahedronProto, 'matrix', () => new Mat3());
      serializable(TetrahedronProto, 'offset', () => new Vec3(0.0, 0.0, 0.0));
      serializable(TetrahedronProto, 'sphere', () => new CircumSphere());
      ccclass('cc.Tetrahedron')(Tetrahedron);
    }
  };
});