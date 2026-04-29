System.register("q-bundled:///fs/cocos/physics-2d/builtin/shapes/polygon-shape-2d.js", ["./shape-2d.js", "../../../core/index.js", "../intersection-2d.js"], function (_export, _context) {
  "use strict";

  var BuiltinShape2D, Vec2, Intersection2D, BuiltinPolygonShape, tempVec2;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("BuiltinPolygonShape", void 0);

  return {
    setters: [function (_shape2dJs) {
      BuiltinShape2D = _shape2dJs.BuiltinShape2D;
    }, function (_coreIndexJs) {
      Vec2 = _coreIndexJs.Vec2;
    }, function (_intersection2dJs) {
      Intersection2D = _intersection2dJs.default;
    }],
    execute: function () {
      tempVec2 = new Vec2();

      _export("BuiltinPolygonShape", BuiltinPolygonShape = class BuiltinPolygonShape extends BuiltinShape2D {
        constructor(...args) {
          super(...args);
          this._worldPoints = [];
        }

        get worldPoints() {
          return this._worldPoints;
        }

        update() {
          const aabb = this._worldAabb;
          const collider = this.collider;
          const points = collider.points;
          const offset = collider.offset;
          const worldMatrix = collider.node.worldMatrix;
          const worldPoints = this._worldPoints;
          worldPoints.length = points.length;
          let minx = 1e6;
          let miny = 1e6;
          let maxx = -1e6;
          let maxy = -1e6;

          for (let i = 0, l = points.length; i < l; i++) {
            if (!worldPoints[i]) {
              worldPoints[i] = new Vec2();
            }

            tempVec2.x = points[i].x + offset.x;
            tempVec2.y = points[i].y + offset.y;
            Vec2.transformMat4(tempVec2, tempVec2, worldMatrix);
            const x = tempVec2.x;
            const y = tempVec2.y;
            worldPoints[i].x = x;
            worldPoints[i].y = y;
            if (x > maxx) maxx = x;
            if (x < minx) minx = x;
            if (y > maxy) maxy = y;
            if (y < miny) miny = y;
          }

          aabb.x = minx;
          aabb.y = miny;
          aabb.width = maxx - minx;
          aabb.height = maxy - miny;
        }

        containsPoint(p) {
          if (!this.worldAABB.contains(p)) {
            return false;
          }

          return Intersection2D.pointInPolygon(p, this.worldPoints);
        }

        intersectsRect(rect) {
          if (!this.worldAABB.intersects(rect)) {
            return false;
          }

          return Intersection2D.rectPolygon(rect, this.worldPoints);
        }

      });
    }
  };
});