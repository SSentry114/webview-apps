System.register("q-bundled:///fs/pal/input/touch-manager.js", ["../../cocos/core/platform/macro.js", "../../cocos/input/types/index.js", "../../cocos/core/math/vec2.js"], function (_export, _context) {
  "use strict";

  var macro, Touch, Vec2, tempVec2, TouchManager, touchManager;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_cocosCorePlatformMacroJs) {
      macro = _cocosCorePlatformMacroJs.macro;
    }, function (_cocosInputTypesIndexJs) {
      Touch = _cocosInputTypesIndexJs.Touch;
    }, function (_cocosCoreMathVec2Js) {
      Vec2 = _cocosCoreMathVec2Js.Vec2;
    }],
    execute: function () {
      tempVec2 = new Vec2();

      TouchManager = /*#__PURE__*/function () {
        /**
         * A map from touch ID to touch object.
         */
        function TouchManager() {
          this._touchMap = void 0;
          this._maxTouches = 8;
          this._touchMap = new Map();
        }
        /**
         * The original touch object can't be modified, so we need to return the cloned touch object.
         * @param touch
         * @returns
         */


        var _proto = TouchManager.prototype;

        _proto._cloneTouch = function _cloneTouch(touch) {
          var touchID = touch.getID();
          touch.getStartLocation(tempVec2);
          var clonedTouch = new Touch(tempVec2.x, tempVec2.y, touchID);
          touch.getLocation(tempVec2);
          clonedTouch.setPoint(tempVec2.x, tempVec2.y);
          touch.getPreviousLocation(tempVec2);
          clonedTouch.setPrevPoint(tempVec2);
          return clonedTouch;
        }
        /**
         * Create the touch object at the touch start event callback.
         * we have some policy to create the touch object:
         * - If the number of touches doesn't exceed the max count, we create a touch object.
         * - If the number of touches exceeds the max count, we discard the timeout touch to create a new one.
         * - If the number of touches exceeds the max count and there is no timeout touch, we can't create any touch object.
         * @param touchID
         * @param x
         * @param y
         * @returns
         */
        ;

        _proto._createTouch = function _createTouch(touchID, x, y) {
          if (this._touchMap.has(touchID)) {
            console.log('Cannot create the same touch object.');
            return undefined;
          }

          var checkResult = this._checkTouchMapSizeMoreThanMax(touchID);

          if (checkResult) {
            console.log('The touches is more than MAX_TOUCHES.'); // TODO: logID 2300

            return undefined;
          }

          var touch = new Touch(x, y, touchID);

          this._touchMap.set(touchID, touch);

          this._updateTouch(touch, x, y);

          return this._cloneTouch(touch);
        }
        /**
         * Release the touch object at the touch end or touch cancel event callback.
         * @param touchID
         * @returns
         */
        ;

        _proto.releaseTouch = function releaseTouch(touchID) {
          if (!this._touchMap.has(touchID)) {
            return;
          }

          this._touchMap["delete"](touchID);
        }
        /**
         * Get touch object by touch ID.
         * @param touchID
         * @returns
         */
        ;

        _proto.getTouch = function getTouch(touchID, x, y) {
          var touch = this._touchMap.get(touchID);

          if (!touch) {
            touch = this._createTouch(touchID, x, y);
          } else {
            this._updateTouch(touch, x, y);
          }

          return touch ? this._cloneTouch(touch) : undefined;
        }
        /**
         * Get all the current touches objects.
         * @returns
         */
        ;

        _proto.getAllTouches = function getAllTouches() {
          var _this = this;

          var touches = [];

          this._touchMap.forEach(function (touch) {
            if (touch) {
              var clonedTouch = _this._cloneTouch(touch);

              touches.push(clonedTouch);
            }
          });

          return touches;
        }
        /**
         * Update the location and previous location of current touch ID.
         * @param touchID
         * @param x The current location X
         * @param y The current location Y
         */
        ;

        _proto._updateTouch = function _updateTouch(touch, x, y) {
          touch.getLocation(tempVec2);
          touch.setPrevPoint(tempVec2);
          touch.setPoint(x, y);
        };

        _proto._checkTouchMapSizeMoreThanMax = function _checkTouchMapSizeMoreThanMax(touchID) {
          var _this2 = this;

          if (this._touchMap.has(touchID)) {
            return false;
          }

          var maxSize = macro.ENABLE_MULTI_TOUCH ? this._maxTouches : 1;

          if (this._touchMap.size < maxSize) {
            return false;
          } // Handle when exceed the max number of touches


          var now = performance.now();

          this._touchMap.forEach(function (touch) {
            if (now - touch.lastModified > macro.TOUCH_TIMEOUT) {
              console.log("The touches is more than MAX_TOUCHES, release touch id " + touch.getID() + "."); // TODO: need to handle touch cancel event when exceed the max number of touches ?

              _this2.releaseTouch(touch.getID());
            }
          });

          return maxSize >= this._touchMap.size;
        };

        return TouchManager;
      }();

      _export("touchManager", touchManager = new TouchManager());
    }
  };
});