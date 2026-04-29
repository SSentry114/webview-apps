System.register("q-bundled:///fs/cocos/core/geometry/geometry-native-ext.js", ["../../../../virtual/internal%253Aconstants.js", "./line.js", "./plane.js", "./ray.js", "./triangle.js", "./sphere.js", "./aabb.js", "./capsule.js", "./frustum.js"], function (_export, _context) {
  "use strict";

  var NATIVE, Line, Plane, Ray, Triangle, Sphere, AABB, Capsule, Frustum, defineAttrFloat, defineAttrInt, descOf_type, _i, _arr, kls;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  /**
   * cache jsb attributes in js, reduce cross language invokations.
   */
  function cacheProperty(ctor, property) {
    var propDesc = Object.getOwnPropertyDescriptor(ctor.prototype, property);
    var propCacheKey = "_$cache_" + property;
    var propRealKey = "_$_" + property;
    Object.defineProperty(ctor.prototype, propRealKey, propDesc);
    Object.defineProperty(ctor.prototype, property, {
      get: function get() {
        if (this[propCacheKey] === undefined) {
          this[propCacheKey] = this[propRealKey];
        } // eslint-disable-next-line @typescript-eslint/no-unsafe-return


        return this[propCacheKey];
      },
      set: function set(value) {
        // this[propCacheKey] = value;
        this[propRealKey] = value;
      },
      configurable: true,
      enumerable: true
    });
  }
  /**
   * cache native object's `underlyingData()` result in __data
   */


  function cacheUnderlyingData(ctor) {
    // eslint-disable-next-line func-names
    ctor.prototype._arraybuffer = function () {
      if (!this.__data) {
        this.__data = this.underlyingData();
      }

      return this.__data;
    };
  }
  /**
   * linear layout info of JSB attributes
   *   stored at static field `__nativeFields__`
   * see: `DESC_UNDERLINE_DATA_*` in file jsb_geometry_manual.cpp
   */


  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      NATIVE = _virtualInternal253AconstantsJs.NATIVE;
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
    }, function (_capsuleJs) {
      Capsule = _capsuleJs.Capsule;
    }, function (_frustumJs) {
      Frustum = _frustumJs.Frustum;
    }],
    execute: function () {
      /**
       * define accessor for attr, read/write directly to the underlyingData as Float32Array[1]
       */
      defineAttrFloat = function defineAttrFloat(kls, attr) {
        // __nativeFields__ is defined in jsb_geometry_manual.cpp
        var desc = kls.__nativeFields__[attr];
        var cacheKey = "_$_" + attr;
        console.assert(desc.fieldSize === 4, "field " + attr + " size " + desc.fieldSize);
        Object.defineProperty(kls.prototype, desc.fieldName, {
          configurable: true,
          enumerable: true,
          get: function get() {
            if (this[cacheKey] === undefined) {
              this[cacheKey] = new Float32Array(this._arraybuffer(), desc.fieldOffset, 1);
            } // eslint-disable-next-line @typescript-eslint/no-unsafe-return


            return this[cacheKey][0];
          },
          set: function set(v) {
            if (this[cacheKey] === undefined) {
              this[cacheKey] = new Float32Array(this._arraybuffer(), desc.fieldOffset, 1);
            }

            this[cacheKey][0] = v;
          }
        });
      };
      /**
       *  define accessor for attr, read/write directly to the underlyingData as Int32Array[1]
       */


      defineAttrInt = function defineAttrInt(kls, attr) {
        // __nativeFields__ is defined in jsb_geometry_manual.cpp
        var desc = kls.__nativeFields__[attr];

        if (!desc) {
          console.error("attr " + attr + " not defined in class " + kls.toString());
        }

        var cacheKey = "_$_" + attr;
        console.assert(desc.fieldSize === 4, "field " + attr + " size " + desc.fieldSize);
        Object.defineProperty(kls.prototype, desc.fieldName, {
          configurable: true,
          enumerable: true,
          get: function get() {
            if (this[cacheKey] === undefined) {
              this[cacheKey] = new Int32Array(this._arraybuffer(), desc.fieldOffset, 1);
            } // eslint-disable-next-line @typescript-eslint/no-unsafe-return


            return this[cacheKey][0];
          },
          set: function set(v) {
            if (this[cacheKey] === undefined) {
              this[cacheKey] = new Int32Array(this._arraybuffer(), desc.fieldOffset, 1);
            }

            this[cacheKey][0] = v;
          }
        });
      };

      if (NATIVE) {
        // Line
        cacheProperty(ns.Line, 's');
        cacheProperty(ns.Line, 'e');
        Object.setPrototypeOf(ns.Line.prototype, Line.prototype); // Plane

        cacheUnderlyingData(ns.Plane);
        cacheProperty(ns.Plane, 'n');
        defineAttrFloat(ns.Plane, 'd');
        Object.setPrototypeOf(ns.Plane.prototype, Plane.prototype); // Ray

        cacheUnderlyingData(ns.Ray);
        cacheProperty(ns.Ray, 'o');
        cacheProperty(ns.Ray, 'd');
        Object.setPrototypeOf(ns.Ray.prototype, Ray.prototype); // Triangle

        cacheUnderlyingData(ns.Triangle);
        cacheProperty(ns.Triangle, 'a');
        cacheProperty(ns.Triangle, 'b');
        cacheProperty(ns.Triangle, 'c');
        Object.setPrototypeOf(ns.Triangle.prototype, Triangle.prototype); // Sphere

        cacheUnderlyingData(ns.Sphere);
        cacheProperty(ns.Sphere, '_center');
        defineAttrFloat(ns.Sphere, '_radius');
        Object.setPrototypeOf(ns.Sphere.prototype, Sphere.prototype); // AABB

        cacheUnderlyingData(ns.AABB);
        cacheProperty(ns.AABB, 'center');
        cacheProperty(ns.AABB, 'halfExtents');
        Object.setPrototypeOf(ns.AABB.prototype, AABB.prototype); // Capsule

        cacheUnderlyingData(ns.Capsule);
        defineAttrFloat(ns.Capsule, 'radius');
        defineAttrFloat(ns.Capsule, 'halfHeight');
        defineAttrInt(ns.Capsule, 'axis');
        cacheProperty(ns.Capsule, 'center');
        cacheProperty(ns.Capsule, 'rotation');
        cacheProperty(ns.Capsule, 'ellipseCenter0');
        cacheProperty(ns.Capsule, 'ellipseCenter1');
        Object.setPrototypeOf(ns.Capsule.prototype, Capsule.prototype); // Frustum
        // cacheUnderlyingData(ns.Frustum); // no needed

        cacheProperty(ns.Frustum, 'vertices');
        cacheProperty(ns.Frustum, 'planes');
        Object.setPrototypeOf(ns.Frustum.prototype, Frustum.prototype); // fix `_type`

        descOf_type = Object.getOwnPropertyDescriptor(ns.ShapeBase.prototype, '_type');

        for (_i = 0, _arr = [ns.Line, ns.Plane, ns.Ray, ns.Triangle, ns.Sphere, ns.AABB, ns.Capsule, ns.Frustum]; _i < _arr.length; _i++) {
          kls = _arr[_i];
          Object.defineProperty(kls.prototype, '_type', descOf_type);
        }
      }
    }
  };
});