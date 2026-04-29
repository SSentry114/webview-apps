System.register("q-bundled:///fs/cocos/physics/framework/collision-matrix.js", ["./physics-enum.js"], function (_export, _context) {
  "use strict";

  var PhysicsGroup, CollisionMatrix;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_physicsEnumJs) {
      PhysicsGroup = _physicsEnumJs.PhysicsGroup;
    }],
    execute: function () {
      _export("CollisionMatrix", CollisionMatrix = function CollisionMatrix(strategy) {
        if (strategy === 1) {
          var self = this;

          var _loop = function _loop(i) {
            var key = "_" + (1 << i);
            self[key] = 0;
            self.updateArray = [];
            Object.defineProperty(self, 1 << i, {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-return
              get: function get() {
                return this[key];
              },
              set: function set(v) {
                if (this[key] !== v) {
                  this[key] = v;

                  if (this.updateArray.indexOf(i) < 0) {
                    this.updateArray.push(i);
                  }
                }
              }
            });
          };

          for (var i = 0; i < 32; i++) {
            _loop(i);
          } // eslint-disable-next-line dot-notation


          this['_1'] = PhysicsGroup.DEFAULT;
        } else {
          for (var _i = 0; _i < 32; _i++) {
            var key = 1 << _i;
            this["" + key] = 0;
          }

          this['1'] = PhysicsGroup.DEFAULT;
        }
      });
    }
  };
});