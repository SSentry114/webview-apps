System.register("q-bundled:///fs/cocos/core/geometry/ray.js", ["../math/index.js", "./enums.js"], function (_export, _context) {
  "use strict";

  var Vec3, enums, Ray;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_mathIndexJs) {
      Vec3 = _mathIndexJs.Vec3;
    }, function (_enumsJs) {
      enums = _enumsJs.default;
    }],
    execute: function () {
      /**
       * @en
       * Basic Geometry: Ray.
       * @zh
       * 基础几何：射线。
       */
      _export("Ray", Ray = /*#__PURE__*/function () {
        /**
         * @en
         * Creates a new ray.
         * @zh
         * 创建一条射线。
         * @param {number} ox @en The x component of start point. @zh 起点的 x 部分。
         * @param {number} oy @en The y component of start point. @zh 起点的 y 部分。
         * @param {number} oz @en The z component of start point. @zh 起点的 z 部分。
         * @param {number} dx @en The x component of direction point. @zh 方向的 x 部分。
         * @param {number} dy @en The y component of direction point. @zh 方向的 y 部分。
         * @param {number} dz @en The z component of direction point. @zh 方向的 z 部分。
         * @returns {Ray} @en The created ray object. @zh 新创建的射线。
         */
        Ray.create = function create(ox, oy, oz, dx, dy, dz) {
          if (ox === void 0) {
            ox = 0;
          }

          if (oy === void 0) {
            oy = 0;
          }

          if (oz === void 0) {
            oz = 0;
          }

          if (dx === void 0) {
            dx = 0;
          }

          if (dy === void 0) {
            dy = 0;
          }

          if (dz === void 0) {
            dz = 1;
          }

          return new Ray(ox, oy, oz, dx, dy, dz);
        }
        /**
         * @en
         * Creates a new ray initialized with the values from an existing ray.
         * @zh
         * 从一条射线克隆出一条新的射线。
         * @param a @en The Ray object to be cloned from. @zh 克隆的目标。
         * @returns @en The cloned Ray object. @zh 克隆出的新对象。
         */
        ;

        Ray.clone = function clone(a) {
          return new Ray(a.o.x, a.o.y, a.o.z, a.d.x, a.d.y, a.d.z);
        }
        /**
         * @en
         * Copies the values from one ray to another.
         * @zh
         * 复制一个 Ray 的值到另一个 Ray 中。
         * @param out @en The Ray object to copy to. @zh 接受操作的射线。
         * @param a @en The Ray object to copy from. @zh 被复制的射线。
         * @returns @en The Ray object to copy to, same as the `out` parameter. @zh 接受操作的射线，与 `out` 参数相同。
         */
        ;

        Ray.copy = function copy(out, a) {
          Vec3.copy(out.o, a.o);
          Vec3.copy(out.d, a.d);
          return out;
        }
        /**
         * @en
         * Creates a ray from two points.
         * @zh
         * 用两个点创建一条射线。
         * @param out @en The Ray object. @zh 接受操作的射线。
         * @param origin @en The start point of the ray. @zh 射线的起点。
         * @param target @en The target point on the ray. @zh 射线上的一点。
         * @returns @en The Ray object, same as the `out` parameter. @zh 接受操作的射线，与 `out` 参数相同。
         */
        ;

        Ray.fromPoints = function fromPoints(out, origin, target) {
          Vec3.copy(out.o, origin);
          Vec3.normalize(out.d, Vec3.subtract(out.d, target, origin));
          return out;
        }
        /**
         * @en
         * Sets the components of a ray to the given values.
         * @zh
         * 将给定射线的属性设置为给定的值。
         * @param out @en The Ray object to be modified @zh 接受操作的射线。
         * @param ox @en The x component of start point. @zh 起点的 x 部分。
         * @param oy @en The y component of start point. @zh 起点的 y 部分。
         * @param oz @en The z component of start point. @zh 起点的 z 部分。
         * @param dx @en The x component of direction point. @zh 方向的 x 部分。
         * @param dy @en The y component of direction point. @zh 方向的 y 部分。
         * @param dz @en The z component of direction point. @zh 方向的 z 部分。
         * @returns @en The Ray object, same as the `out` parameter. @zh 接受操作的射线，与 `out` 相同。
         */
        ;

        Ray.set = function set(out, ox, oy, oz, dx, dy, dz) {
          out.o.x = ox;
          out.o.y = oy;
          out.o.z = oz;
          out.d.x = dx;
          out.d.y = dy;
          out.d.z = dz;
          return out;
        }
        /**
         * @en
         * The origin of the ray.
         * @zh
         * 起点。
         */
        ;

        /**
         * @en
         * Constructs a ray.
         * @zh
         * 构造一条射线。
         * @param ox @en The x component of start point. @zh 起点的 x 部分。
         * @param oy @en The y component of start point. @zh 起点的 y 部分。
         * @param oz @en The z component of start point. @zh 起点的 z 部分。
         * @param dx @en The x component of direction point. @zh 方向的 x 部分。
         * @param dy @en The y component of direction point. @zh 方向的 y 部分。
         * @param dz @en The z component of direction point. @zh 方向的 z 部分。
         */
        function Ray(ox, oy, oz, dx, dy, dz) {
          if (ox === void 0) {
            ox = 0;
          }

          if (oy === void 0) {
            oy = 0;
          }

          if (oz === void 0) {
            oz = 0;
          }

          if (dx === void 0) {
            dx = 0;
          }

          if (dy === void 0) {
            dy = 0;
          }

          if (dz === void 0) {
            dz = -1;
          }

          this.o = void 0;
          this.d = void 0;
          this._type = void 0;
          this._type = enums.SHAPE_RAY;
          this.o = new Vec3(ox, oy, oz);
          this.d = new Vec3(dx, dy, dz);
        }
        /**
         * @en
         * Calculates a point on the ray with the specific distance from the origin point.
         * @zh
         * 根据给定的距离计算出射线上的一点。
         * @param out @en Another point on the ray. @zh 射线上的另一点。
         * @param distance @en The given distance. @zh 给定的距离。
         */


        var _proto = Ray.prototype;

        _proto.computeHit = function computeHit(out, distance) {
          Vec3.normalize(out, this.d);
          Vec3.scaleAndAdd(out, this.o, out, distance);
        };

        _createClass(Ray, [{
          key: "type",
          get:
          /**
           * @en
           * Gets the type of the ray, its value is `enums.SHAPE_RAY`.
           * @zh
           * 获取形状的类型，其值为`enums.SHAPE_RAY`。
           */
          function get() {
            return this._type;
          }
        }]);

        return Ray;
      }());
    }
  };
});