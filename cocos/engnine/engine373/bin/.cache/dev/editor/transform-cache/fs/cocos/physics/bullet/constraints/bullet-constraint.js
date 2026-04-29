System.register("q-bundled:///fs/cocos/physics/bullet/constraints/bullet-constraint.js", ["../instantiated.js"], function (_export, _context) {
  "use strict";

  var bt, EBulletType, BulletConstraint;

  _export("BulletConstraint", void 0);

  return {
    setters: [function (_instantiatedJs) {
      bt = _instantiatedJs.bt;
      EBulletType = _instantiatedJs.EBulletType;
    }],
    execute: function () {
      /*
       Copyright (c) 2020-2023 Xiamen Yaji Software Co., Ltd.
      
       https://www.cocos.com/
      
       Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated documentation files (the "Software"), to deal
       in the Software without restriction, including without limitation the rights to
       use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
       of the Software, and to permit persons to whom the Software is furnished to do so,
       subject to the following conditions:
      
       The above copyright notice and this permission notice shall be included in
       all copies or substantial portions of the Software.
      
       THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
      */

      /* eslint-disable new-cap */
      _export("BulletConstraint", BulletConstraint = class BulletConstraint {
        constructor() {
          this.dirty = 0;
          this.index = -1;
          this._impl = 0;
          this._collided = false;
        }

        setConnectedBody(v) {// TODO: support dynamic change connected body
        }

        setEnableCollision(v) {
          if (this._collided !== v) {
            this._collided = v;
            this.updateByReAdd();
          }
        }

        get impl() {
          return this._impl;
        }

        get constraint() {
          return this._com;
        }

        updateByReAdd() {
          if (this._rigidBody && this.index >= 0) {
            const sb = this._rigidBody.body.sharedBody;
            sb.wrappedWorld.removeConstraint(this);
            sb.wrappedWorld.addConstraint(this);
          }
        }

        initialize(v) {
          this._com = v;
          this._rigidBody = v.attachedBody;
          this._collided = v.enableCollision;
          this.onComponentSet();
        } // virtual


        onEnable() {
          const sb = this._rigidBody.body.sharedBody;
          sb.wrappedWorld.addConstraint(this);
          sb.addJoint(this, 0);
          const connect = this.constraint.connectedBody;

          if (connect) {
            const sb2 = connect.body.sharedBody;
            sb2.addJoint(this, 1);
          }
        }

        onDisable() {
          const sb = this._rigidBody.body.sharedBody;
          sb.wrappedWorld.removeConstraint(this);
          sb.removeJoint(this, 0);
          const connect = this.constraint.connectedBody;

          if (connect) {
            const sb2 = connect.body.sharedBody;
            sb2.removeJoint(this, 1);
          }
        }

        onDestroy() {
          bt._safe_delete(this._impl, EBulletType.EBulletTypeTypedConstraint);

          this._com = null;
          this._rigidBody = null;
        }

      });
    }
  };
});