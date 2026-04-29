System.register("q-bundled:///fs/cocos/core/geometry/deprecated-3.0.0.js", ["../utils/x-deprecated.js", "./intersect.js", "./line.js", "./plane.js", "./ray.js", "./triangle.js", "./sphere.js", "./aabb.js", "./obb.js", "./capsule.js", "./frustum.js"], function (_export, _context) {
  "use strict";

  var replaceProperty, intersect, Line, Plane, Ray, Triangle, Sphere, AABB, OBB, Capsule, Frustum, line, plane, ray, triangle, sphere, aabb, obb, capsule, frustum;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function deprecatedClassMessage(oldClassName, newClassName) {
    console.warn(`${oldClassName} is deprecated, please use ${newClassName} instead.`);
  }
  /**
   * @en
   * Alias of [[geometry.Line]]
   * @zh
   * [[geometry.Line]] 别名类
   *
   * @deprecated Since v3.0, please use Line instead
   */


  _export({
    line: void 0,
    plane: void 0,
    ray: void 0,
    triangle: void 0,
    sphere: void 0,
    aabb: void 0,
    obb: void 0,
    capsule: void 0,
    frustum: void 0
  });

  return {
    setters: [function (_utilsXDeprecatedJs) {
      replaceProperty = _utilsXDeprecatedJs.replaceProperty;
    }, function (_intersectJs) {
      intersect = _intersectJs.default;
    }, function (_lineJs) {
      Line = _lineJs.Line;
    }, function (_planeJs) {
      Plane = _planeJs.Plane;
    }, function (_rayJs) {
      Ray = _rayJs.Ray;
    }, function (_triangleJs) {
      Triangle = _triangleJs.Triangle;
    }, function (_sphereJs) {
      Sphere = _sphereJs.Sphere;
    }, function (_aabbJs) {
      AABB = _aabbJs.AABB;
    }, function (_obbJs) {
      OBB = _obbJs.OBB;
    }, function (_capsuleJs) {
      Capsule = _capsuleJs.Capsule;
    }, function (_frustumJs) {
      Frustum = _frustumJs.Frustum;
    }],
    execute: function () {
      replaceProperty(intersect, 'intersect', [{
        name: 'ray_aabb',
        newName: 'rayAABB'
      }, {
        name: 'ray_plane',
        newName: 'rayPlane'
      }, {
        name: 'ray_triangle',
        newName: 'rayTriangle'
      }, {
        name: 'ray_sphere',
        newName: 'raySphere'
      }, {
        name: 'ray_obb',
        newName: 'rayOBB'
      }, {
        name: 'ray_capsule',
        newName: 'rayCapsule'
      }, {
        name: 'ray_subMesh',
        newName: 'raySubMesh'
      }, {
        name: 'ray_mesh',
        newName: 'rayMesh'
      }, {
        name: 'ray_model',
        newName: 'rayModel'
      }, {
        name: 'line_plane',
        newName: 'linePlane'
      }, {
        name: 'line_triangle',
        newName: 'lineTriangle'
      }, {
        name: 'line_aabb',
        newName: 'lineAABB'
      }, {
        name: 'line_obb',
        newName: 'lineOBB'
      }, {
        name: 'line_sphere',
        newName: 'lineSphere'
      }, {
        name: 'aabb_aabb',
        newName: 'aabbWithAABB'
      }, {
        name: 'aabb_obb',
        newName: 'aabbWithOBB'
      }, {
        name: 'aabb_plane',
        newName: 'aabbPlane'
      }, {
        name: 'aabb_frustum',
        newName: 'aabbFrustum'
      }, {
        name: 'aabbFrustum_accurate',
        newName: 'aabbFrustumAccurate'
      }, {
        name: 'obb_point',
        newName: 'obbPoint'
      }, {
        name: 'obb_plane',
        newName: 'obbPlane'
      }, {
        name: 'obb_frustum',
        newName: 'obbFrustum'
      }, {
        name: 'obbFrustum_accurate',
        newName: 'obbFrustumAccurate'
      }, {
        name: 'obb_obb',
        newName: 'obbWithOBB'
      }, {
        name: 'obb_capsule',
        newName: 'obbCapsule'
      }, {
        name: 'sphere_plane',
        newName: 'spherePlane'
      }, {
        name: 'sphere_frustum',
        newName: 'sphereFrustum'
      }, {
        name: 'sphereFrustum_accurate',
        newName: 'sphereFrustumAccurate'
      }, {
        name: 'sphere_sphere',
        newName: 'sphereWithSphere'
      }, {
        name: 'sphere_aabb',
        newName: 'sphereAABB'
      }, {
        name: 'sphere_obb',
        newName: 'sphereOBB'
      }, {
        name: 'sphere_capsule',
        newName: 'sphereCapsule'
      }, {
        name: 'capsule_capsule',
        newName: 'capsuleWithCapsule'
      }]);

      _export("line", line = class line extends Line {
        constructor() {
          super();
          deprecatedClassMessage('line', 'Line');
        }

      });
      /**
       * @en
       * Alias of [[geometry.Plane]]
       *
       * @zh
       * [[geometry.Plane]] 别名类
       *
       * @deprecated Since v3.0, please use Plane instead
       */


      _export("plane", plane = class plane extends Plane {
        constructor() {
          super();
          deprecatedClassMessage('plane', 'Plane');
        }

      });
      /**
       * @en
       * Alias of [[geometry.Ray]]
       * @zh
       * [[geometry.Ray]] 别名类
       * @deprecated Since v3.0, please use Ray instead
       */


      _export("ray", ray = class ray extends Ray {
        constructor() {
          super();
          deprecatedClassMessage('ray', 'Ray');
        }

      });
      /**
       * @en
       * Alias of [[geometry.Triangle]]
       *
       * @zh
       * [[geometry.Triangle]] 别名类
       * @deprecated Since v3.0, please use Triangle instead
       */


      _export("triangle", triangle = class triangle extends Triangle {
        constructor() {
          super();
          deprecatedClassMessage('triangle', 'Triangle');
        }

      });
      /**
       * @en
       * Alias of [[geometry.Sphere]]
       *
       * @zh
       * [[geometry.Sphere]] 别名类
       * @deprecated Since v3.0, please use Sphere instead
       */


      _export("sphere", sphere = class sphere extends Sphere {
        constructor() {
          super();
          deprecatedClassMessage('sphere', 'Sphere');
        }

      });
      /**
       * @en
       * Alias of [[geometry.AABB]]
       *
       * @zh
       * [[geometry.AABB]] 别名类
       * @deprecated Since v3.0, please use AABB instead
       */


      _export("aabb", aabb = class aabb extends AABB {
        constructor() {
          super();
          deprecatedClassMessage('aabb', 'AABB');
        }

      });
      /**
       * @en
       * Alias of [[geometry.OBB]]
       *
       * @zh
       * [[geometry.OBB]] 别名类
       * @deprecated Since v3.0, please use OBB instead
       */


      _export("obb", obb = class obb extends OBB {
        constructor() {
          super();
          deprecatedClassMessage('obb', 'OBB');
        }

      });
      /**
       * @en
       * Alias of [[geometry.Capsule]]
       *
       * @zh
       * [[geometry.Capsule]] 别名类
       * @deprecated Since v3.0, please use Capsule instead
       */


      _export("capsule", capsule = class capsule extends Capsule {
        constructor() {
          super();
          deprecatedClassMessage('capsule', 'Capsule');
        }

      });
      /**
       * @en
       * Alias of [[geometry.Frustum]]
       *
       * @zh
       * [[geometry.Frustum]] 别名类
       * @deprecated Since v3.0, please use Frustum instead
       */


      _export("frustum", frustum = class frustum extends Frustum {
        constructor() {
          super();
          deprecatedClassMessage('frustum', 'Frustum');
        }

      });
    }
  };
});