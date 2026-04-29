System.register("q-bundled:///fs/pal/input/touch-manager.js", ["../../cocos/core/platform/macro.js", "../../cocos/input/types/index.js", "../../cocos/core/math/vec2.js"], function (_export, _context) {
  "use strict";

  var macro, Touch, Vec2, TouchManager, tempVec2, touchManager;

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
      TouchManager = class TouchManager {
        /**
         * A map from touch ID to touch object.
         */
        constructor() {
          this._touchMap = void 0;
          this._maxTouches = 8;
          this._touchMap = new Map();
        }
        /**
         * The original touch object can't be modified, so we need to return the cloned touch object.
         * @param touch
         * @returns
         */


        _cloneTouch(touch) {
          const touchID = touch.getID();
          touch.getStartLocation(tempVec2);
          const clonedTouch = new Touch(tempVec2.x, tempVec2.y, touchID);
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


        _createTouch(touchID, x, y) {
          if (this._touchMap.has(touchID)) {
            console.log('Cannot create the same touch object.');
            return undefined;
          }

          const checkResult = this._checkTouchMapSizeMoreThanMax(touchID);

          if (checkResult) {
            console.log('The touches is more than MAX_TOUCHES.'); // TODO: logID 2300

            return undefined;
          }

          const touch = new Touch(x, y, touchID);

          this._touchMap.set(touchID, touch);

          this._updateTouch(touch, x, y);

          return this._cloneTouch(touch);
        }
        /**
         * Release the touch object at the touch end or touch cancel event callback.
         * @param touchID
         * @returns
         */


        releaseTouch(touchID) {
          if (!this._touchMap.has(touchID)) {
            return;
          }

          this._touchMap.delete(touchID);
        }
        /**
         * Get touch object by touch ID.
         * @param touchID
         * @returns
         */


        getTouch(touchID, x, y) {
          let touch = this._touchMap.get(touchID);

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


        getAllTouches() {
          const touches = [];

          this._touchMap.forEach(touch => {
            if (touch) {
              const clonedTouch = this._cloneTouch(touch);

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


        _updateTouch(touch, x, y) {
          touch.getLocation(tempVec2);
          touch.setPrevPoint(tempVec2);
          touch.setPoint(x, y);
        }

        _checkTouchMapSizeMoreThanMax(touchID) {
          if (this._touchMap.has(touchID)) {
            return false;
          }

          const maxSize = macro.ENABLE_MULTI_TOUCH ? this._maxTouches : 1;

          if (this._touchMap.size < maxSize) {
            return false;
          } // Handle when exceed the max number of touches


          const now = performance.now();

          this._touchMap.forEach(touch => {
            if (now - touch.lastModified > macro.TOUCH_TIMEOUT) {
              console.log(`The touches is more than MAX_TOUCHES, release touch id ${touch.getID()}.`); // TODO: need to handle touch cancel event when exceed the max number of touches ?

              this.releaseTouch(touch.getID());
            }
          });

          return maxSize >= this._touchMap.size;
        }

      };

      _export("touchManager", touchManager = new TouchManager());
    }
  };
});