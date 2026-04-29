System.register("q-bundled:///fs/cocos/physics-2d/box2d/platform/physics-debug-draw.js", ["@cocos/box2d", "../../../core/index.js", "../../framework/index.js"], function (_export, _context) {
  "use strict";

  var b2, Color, PHYSICS_2D_PTM_RATIO, PhysicsDebugDraw, _tmp_vec2, _tmp_color, GREEN_COLOR, RED_COLOR;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("PhysicsDebugDraw", void 0);

  return {
    setters: [function (_cocosBox2d) {
      b2 = _cocosBox2d.default;
    }, function (_coreIndexJs) {
      Color = _coreIndexJs.Color;
    }, function (_frameworkIndexJs) {
      PHYSICS_2D_PTM_RATIO = _frameworkIndexJs.PHYSICS_2D_PTM_RATIO;
    }],
    execute: function () {
      _tmp_vec2 = new b2.Vec2();
      _tmp_color = new Color();
      GREEN_COLOR = Color.GREEN;
      RED_COLOR = Color.RED;

      _export("PhysicsDebugDraw", PhysicsDebugDraw = class PhysicsDebugDraw extends b2.Draw {
        constructor(drawer) {
          super();
          this._drawer = null;
          this._xf = new b2.Transform();
          this._dxf = new b2.Transform();
          this._drawer = drawer;
        }

        _DrawPolygon(vertices, vertexCount) {
          const drawer = this._drawer;

          for (let i = 0; i < vertexCount; i++) {
            b2.Transform.MulXV(this._xf, vertices[i], _tmp_vec2);
            const x = _tmp_vec2.x * PHYSICS_2D_PTM_RATIO;
            const y = _tmp_vec2.y * PHYSICS_2D_PTM_RATIO;
            if (i === 0) drawer.moveTo(x, y);else {
              drawer.lineTo(x, y);
            }
          }

          drawer.close();
        }

        DrawPolygon(vertices, vertexCount, color) {
          this._applyStrokeColor(color);

          this._DrawPolygon(vertices, vertexCount);

          this._drawer.stroke();
        }

        DrawSolidPolygon(vertices, vertexCount, color) {
          this._applyFillColor(color);

          this._DrawPolygon(vertices, vertexCount);

          this._drawer.fill();

          this._drawer.stroke();
        }

        _DrawCircle(center, radius) {
          const p = this._xf.p;

          this._drawer.circle((center.x + p.x) * PHYSICS_2D_PTM_RATIO, (center.y + p.y) * PHYSICS_2D_PTM_RATIO, radius * PHYSICS_2D_PTM_RATIO);
        }

        DrawCircle(center, radius, color) {
          this._applyStrokeColor(color);

          this._DrawCircle(center, radius);

          this._drawer.stroke();
        }

        DrawSolidCircle(center, radius, axis, color) {
          this._applyFillColor(color);

          this._DrawCircle(center, radius);

          this._drawer.fill();
        }

        DrawSegment(p1, p2, color) {
          const drawer = this._drawer;

          if (p1.x === p2.x && p1.y === p2.y) {
            this._applyFillColor(color);

            this._DrawCircle(p1, 2 / PHYSICS_2D_PTM_RATIO);

            drawer.fill();
            return;
          }

          this._applyStrokeColor(color);

          b2.Transform.MulXV(this._xf, p1, _tmp_vec2);
          drawer.moveTo(_tmp_vec2.x * PHYSICS_2D_PTM_RATIO, _tmp_vec2.y * PHYSICS_2D_PTM_RATIO);
          b2.Transform.MulXV(this._xf, p2, _tmp_vec2);
          drawer.lineTo(_tmp_vec2.x * PHYSICS_2D_PTM_RATIO, _tmp_vec2.y * PHYSICS_2D_PTM_RATIO);
          drawer.stroke();
        }

        DrawTransform(xf) {
          const drawer = this._drawer;
          drawer.strokeColor = RED_COLOR;
          _tmp_vec2.x = _tmp_vec2.y = 0;
          b2.Transform.MulXV(xf, _tmp_vec2, _tmp_vec2);
          drawer.moveTo(_tmp_vec2.x * PHYSICS_2D_PTM_RATIO, _tmp_vec2.y * PHYSICS_2D_PTM_RATIO);
          _tmp_vec2.x = 1;
          _tmp_vec2.y = 0;
          b2.Transform.MulXV(xf, _tmp_vec2, _tmp_vec2);
          drawer.lineTo(_tmp_vec2.x * PHYSICS_2D_PTM_RATIO, _tmp_vec2.y * PHYSICS_2D_PTM_RATIO);
          drawer.stroke();
          drawer.strokeColor = GREEN_COLOR;
          _tmp_vec2.x = _tmp_vec2.y = 0;
          b2.Transform.MulXV(xf, _tmp_vec2, _tmp_vec2);
          drawer.moveTo(_tmp_vec2.x * PHYSICS_2D_PTM_RATIO, _tmp_vec2.y * PHYSICS_2D_PTM_RATIO);
          _tmp_vec2.x = 0;
          _tmp_vec2.y = 1;
          b2.Transform.MulXV(xf, _tmp_vec2, _tmp_vec2);
          drawer.lineTo(_tmp_vec2.x * PHYSICS_2D_PTM_RATIO, _tmp_vec2.y * PHYSICS_2D_PTM_RATIO);
          drawer.stroke();
        }

        DrawPoint(center, radius, color) {}

        DrawParticles() {}

        _applyStrokeColor(color) {
          this._drawer.strokeColor = _tmp_color.set(color.r * 255, color.g * 255, color.b * 255, 150);
        }

        _applyFillColor(color) {
          this._drawer.fillColor = _tmp_color.set(color.r * 255, color.g * 255, color.b * 255, 150);
        }

        PushTransform(xf) {
          this._xf = xf;
        }

        PopTransform() {
          this._xf = this._dxf;
        }

      });
    }
  };
});