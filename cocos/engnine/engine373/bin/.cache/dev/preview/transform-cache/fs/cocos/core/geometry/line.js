System.register("q-bundled:///fs/cocos/core/geometry/line.js", ["../math/index.js", "./enums.js"], function (_export, _context) {
  "use strict";

  var Vec3, enums, Line;

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
       * Basic Geometry: Line.
       * @zh
       * 基础几何：直线。
       */
      _export("Line", Line = /*#__PURE__*/function () {
        /**
         * @en
         * Creates a new line.
         * @zh
         * 创建一条新的直线。
         * @param sx @en The x coordinate of the start position. @zh 起点的 x 坐标。
         * @param sy @en The y coordinate of the start position. @zh 起点的 y 坐标。
         * @param sz @en The z coordinate of the start position. @zh 起点的 z 坐标。
         * @param ex @en The x coordinate of the end position. @zh 终点的 x 坐标。
         * @param ey @en The y coordinate of the end position. @zh 终点的 y 坐标。
         * @param ez @en the z coordinate of the end position. @zh 终点的 z 坐标。
         * @returns @en The created line. @zh 创建的直线。
         */
        Line.create = function create(sx, sy, sz, ex, ey, ez) {
          return new Line(sx, sy, sz, ex, ey, ez);
        }
        /**
         * @en
         * Creates a new Line initialized with values from an existing Line.
         * @zh
         * 克隆一条新的直线。
         * @param a @en The line to clone from. @zh 克隆的来源 Line 对象。
         * @returns @en The cloned line. @zh 克隆出的新 Line 对象。
         */
        ;

        Line.clone = function clone(a) {
          return new Line(a.s.x, a.s.y, a.s.z, a.e.x, a.e.y, a.e.z);
        }
        /**
         * @en
         * Copies the values from one Line to another.
         * @zh
         * 复制一条直线的值到另一条直线中。
         * @param out @en The output line to store the copied data. @zh 用来存储拷贝数据的 Line 对象。
         * @param a @en The line to copy from. @zh 从这个 Line 对象拷贝信息。
         * @returns @en The `out` parameter. @zh 传入的 `out` 对象。
         */
        ;

        Line.copy = function copy(out, a) {
          Vec3.copy(out.s, a.s);
          Vec3.copy(out.e, a.e);
          return out;
        }
        /**
         * @en
         * Creates a line from two points.
         * @zh
         * 用两个点创建一条直线。
         * @param out @en The output line. @zh 接受新数据的 Line 对象。
         * @param start @en The start point. @zh 起点。
         * @param end @en The end point. @zh 终点。
         * @returns @en The `out` parameter. @zh 传入的 out 对象。
         */
        ;

        Line.fromPoints = function fromPoints(out, start, end) {
          Vec3.copy(out.s, start);
          Vec3.copy(out.e, end);
          return out;
        }
        /**
         * @en
         * Sets the start point and the end point of a line with the given values.
         * @zh
         * 将给定线段的起点和终点设置为给定值。
         * @param out @en The output line to set properties. to @zh 接受新数据的 Line 对象。
         * @param sx @en The x coordinate of the start position. @zh 起点的 x 坐标。
         * @param sy @en The y coordinate of the start position. @zh 起点的 y 坐标。
         * @param sz @en The z coordinate of the start position. @zh 起点的 z 坐标。
         * @param ex @en The x coordinate of the end position. @zh 终点的 x 坐标。
         * @param ey @en The y coordinate of the end position. @zh 终点的 y 坐标。
         * @param ez @en the z coordinate of the end position. @zh 终点的 z 坐标。
         * @returns @en The `out` parameter. @zh 传入的 `out` 对象。
         */
        ;

        Line.set = function set(out, sx, sy, sz, ex, ey, ez) {
          out.s.x = sx;
          out.s.y = sy;
          out.s.z = sz;
          out.e.x = ex;
          out.e.y = ey;
          out.e.z = ez;
          return out;
        }
        /**
         * @en Calculates the length of the given line.
         * @zh 计算线的长度。
         * @param a @en The line to calculate length. @zh 用于计算长度的线段。
         * @returns @en The length of the given line. @zh 线段的长度。
         */
        ;

        Line.len = function len(a) {
          return Vec3.distance(a.s, a.e);
        }
        /**
         * @en The start point.
         * @zh 起点。
         */
        ;

        /**
         * @en Constructs a line.
         * @zh 构造一条线。
         * @param sx @en The x coordinate of the start position. @zh 起点的 x 坐标。
         * @param sy @en The y coordinate of the start position. @zh 起点的 y 坐标。
         * @param sz @en The z coordinate of the start position. @zh 起点的 z 坐标。
         * @param ex @en The x coordinate of the end position. @zh 终点的 x 坐标。
         * @param ey @en The y coordinate of the end position. @zh 终点的 y 坐标。
         * @param ez @en the z coordinate of the end position. @zh 终点的 z 坐标。
         */
        function Line(sx, sy, sz, ex, ey, ez) {
          if (sx === void 0) {
            sx = 0;
          }

          if (sy === void 0) {
            sy = 0;
          }

          if (sz === void 0) {
            sz = 0;
          }

          if (ex === void 0) {
            ex = 0;
          }

          if (ey === void 0) {
            ey = 0;
          }

          if (ez === void 0) {
            ez = -1;
          }

          this.s = void 0;
          this.e = void 0;
          this._type = void 0;
          this._type = enums.SHAPE_LINE;
          this.s = new Vec3(sx, sy, sz);
          this.e = new Vec3(ex, ey, ez);
        }
        /**
         * @en Calculates the length of the line.
         * @zh 计算线段的长度。
         * @returns @en The length of the line. @zh 线段的长度。
         */


        var _proto = Line.prototype;

        _proto.length = function length() {
          return Vec3.distance(this.s, this.e);
        };

        _createClass(Line, [{
          key: "type",
          get:
          /**
           * @en Gets the type of the shape. Always returns `enums.SHAPE_LINE`.
           * @zh 获取形状的类型，总是返回 `enums.SHAPE_LINE`。
           */
          function get() {
            return this._type;
          }
        }]);

        return Line;
      }());
    }
  };
});