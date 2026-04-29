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
      ccclass = _decorator.ccclass;
      serializable = _decorator.serializable;

      _export("Vertex", Vertex = jsb.Vertex);

      VertexProto = Vertex.prototype;
      serializable(VertexProto, 'position', function () {
        return new Vec3(0, 0, 0);
      });
      serializable(VertexProto, 'normal', function () {
        return new Vec3(0, 0, 0);
      });
      serializable(VertexProto, 'coefficients', function () {
        return [];
      });
      ccclass('cc.Vertex')(Vertex);

      _export("CircumSphere", CircumSphere = jsb.CircumSphere);

      CircumSphereProto = CircumSphere.prototype;
      serializable(CircumSphereProto, 'center', function () {
        return new Vec3(0, 0, 0);
      });
      serializable(CircumSphereProto, 'radiusSquared', function () {
        return 0.0;
      });
      ccclass('cc.CircumSphere')(CircumSphere);

      _export("Tetrahedron", Tetrahedron = jsb.Tetrahedron);

      TetrahedronProto = Tetrahedron.prototype;
      serializable(TetrahedronProto, 'invalid', function () {
        return false;
      });
      serializable(TetrahedronProto, 'vertex0', function () {
        return -1;
      });
      serializable(TetrahedronProto, 'vertex1', function () {
        return -1;
      });
      serializable(TetrahedronProto, 'vertex2', function () {
        return -1;
      });
      serializable(TetrahedronProto, 'vertex3', function () {
        return -1;
      });
      serializable(TetrahedronProto, 'neighbours', function () {
        return [-1, -1, -1, -1];
      });
      serializable(TetrahedronProto, 'matrix', function () {
        return new Mat3();
      });
      serializable(TetrahedronProto, 'offset', function () {
        return new Vec3(0.0, 0.0, 0.0);
      });
      serializable(TetrahedronProto, 'sphere', function () {
        return new CircumSphere();
      });
      ccclass('cc.Tetrahedron')(Tetrahedron);
    }
  };
});