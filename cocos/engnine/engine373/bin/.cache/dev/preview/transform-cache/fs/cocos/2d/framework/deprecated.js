System.register("q-bundled:///fs/cocos/2d/framework/deprecated.js", ["../../core/index.js", "./ui-component.js", "./ui-transform.js", "./ui-renderer.js", "./canvas.js"], function (_export, _context) {
  "use strict";

  var markAsWarning, removeProperty, replaceProperty, js, Color, cclegacy, UIComponent, UITransform, UIRenderer, Canvas;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_coreIndexJs) {
      markAsWarning = _coreIndexJs.markAsWarning;
      removeProperty = _coreIndexJs.removeProperty;
      replaceProperty = _coreIndexJs.replaceProperty;
      js = _coreIndexJs.js;
      Color = _coreIndexJs.Color;
      cclegacy = _coreIndexJs.cclegacy;
    }, function (_uiComponentJs) {
      UIComponent = _uiComponentJs.UIComponent;
    }, function (_uiTransformJs) {
      UITransform = _uiTransformJs.UITransform;
    }, function (_uiRendererJs) {
      UIRenderer = _uiRendererJs.UIRenderer;
    }, function (_canvasJs) {
      Canvas = _canvasJs.Canvas;
    }],
    execute: function () {
      removeProperty(UIComponent.prototype, 'UIComponent', [{
        name: '_visibility'
      }, {
        name: 'setVisibility'
      }]);
      removeProperty(UIRenderer.prototype, 'Renderable2D.prototype', [{
        name: 'srcBlendFactor'
      }, {
        name: 'dstBlendFactor'
      }]);
      replaceProperty(Canvas.prototype, 'Canvas.prototype', [{
        name: 'camera',
        newName: 'cameraComponent.camera',
        customGetter: function customGetter() {
          // @ts-expect-error deprecation method
          return this._cameraComponent.camera;
        }
      }, {
        name: 'clearFlag',
        newName: 'cameraComponent.clearFlags',
        customGetter: function customGetter() {
          // @ts-expect-error deprecation method
          return this._cameraComponent ? this._cameraComponent.clearFlags : 0;
        },
        customSetter: function customSetter(val) {
          // @ts-expect-error deprecation method
          if (this._cameraComponent) this._cameraComponent.clearFlags = val;
        }
      }, {
        name: 'color',
        newName: 'cameraComponent.clearColor',
        customGetter: function customGetter() {
          // @ts-expect-error deprecation method
          return this._cameraComponent ? this._cameraComponent.clearColor : Color.BLACK;
        },
        customSetter: function customSetter(val) {
          // @ts-expect-error deprecation method
          if (this._cameraComponent) this._cameraComponent.clearColor = val;
        }
      }, {
        name: 'priority',
        newName: 'cameraComponent.priority',
        customGetter: function customGetter() {
          // @ts-expect-error deprecation method
          return this._cameraComponent ? this._cameraComponent.priority : 0;
        },
        customSetter: function customSetter(val) {
          // @ts-expect-error deprecation method
          if (this._cameraComponent) this._cameraComponent.priority = val;
        }
      }, {
        name: 'targetTexture',
        newName: 'cameraComponent.targetTexture',
        customGetter: function customGetter() {
          // @ts-expect-error deprecation method
          return this._cameraComponent ? this._cameraComponent.targetTexture : null;
        },
        customSetter: function customSetter(value) {
          // @ts-expect-error deprecation method
          if (this._cameraComponent) this._cameraComponent.targetTexture = value;
        }
      }, {
        name: 'visibility',
        newName: 'cameraComponent.visibility',
        customGetter: function customGetter() {
          // @ts-expect-error deprecation method
          return this._cameraComponent ? this._cameraComponent.visibility : 0;
        }
      }]);
      markAsWarning(UITransform.prototype, 'UITransform.prototype', [{
        name: 'priority',
        suggest: "Please use setSiblingIndex to change index of the current node in its parent's children array."
      }]);
      /**
       * Alias of [[UITransform]]
       * @deprecated Since v1.2
       */

      _export("UITransformComponent", UITransform);

      cclegacy.UITransformComponent = UITransform;
      js.setClassAlias(UITransform, 'cc.UITransformComponent');
      /**
       * Alias of [[Renderable2D]]
       * @deprecated Since v1.2
       */

      _export("RenderComponent", UIRenderer);
      /**
       * Alias of [[Renderable2D]]
       * @deprecated Since v3.0
       */


      _export("UIRenderable", UIRenderer);

      js.setClassAlias(UIRenderer, 'cc.RenderComponent');
      /**
       * Alias of [[Canvas]]
       * @deprecated Since v1.2
       */

      _export("CanvasComponent", Canvas);

      cclegacy.CanvasComponent = Canvas;
      js.setClassAlias(Canvas, 'cc.CanvasComponent');
      /**
       * Alias of [[Renderable2D]]
       * @deprecated Since v3.6
       */

      _export("Renderable2D", UIRenderer);

      cclegacy.internal.Renderable2D = UIRenderer;
      js.setClassAlias(UIRenderer, 'cc.Renderable2D');
    }
  };
});