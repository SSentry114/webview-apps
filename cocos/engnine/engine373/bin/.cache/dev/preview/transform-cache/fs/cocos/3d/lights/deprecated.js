System.register("q-bundled:///fs/cocos/3d/lights/deprecated.js", ["./light-component.js", "./spot-light-component.js", "./sphere-light-component.js", "./directional-light-component.js", "../../core/index.js"], function (_export, _context) {
  "use strict";

  var Light, SpotLight, SphereLight, DirectionalLight, cclegacy, js, replaceProperty;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_lightComponentJs) {
      Light = _lightComponentJs.Light;
    }, function (_spotLightComponentJs) {
      SpotLight = _spotLightComponentJs.SpotLight;
    }, function (_sphereLightComponentJs) {
      SphereLight = _sphereLightComponentJs.SphereLight;
    }, function (_directionalLightComponentJs) {
      DirectionalLight = _directionalLightComponentJs.DirectionalLight;
    }, function (_coreIndexJs) {
      cclegacy = _coreIndexJs.cclegacy;
      js = _coreIndexJs.js;
      replaceProperty = _coreIndexJs.replaceProperty;
    }],
    execute: function () {
      /**
       * Alias of [[Light]]
       * @deprecated Since v1.2
       */
      _export("LightComponent", Light);

      cclegacy.LightComponent = Light;
      js.setClassAlias(Light, 'cc.LightComponent');
      /**
       * Alias of [[DirectionalLight]]
       * @deprecated Since v1.2
       */

      _export("DirectionalLightComponent", DirectionalLight);

      cclegacy.DirectionalLightComponent = DirectionalLight;
      js.setClassAlias(DirectionalLight, 'cc.DirectionalLightComponent');
      /**
       * Alias of [[SphereLight]]
       * @deprecated Since v1.2
       */

      _export("SphereLightComponent", SphereLight);

      cclegacy.SphereLightComponent = SphereLight;
      js.setClassAlias(SphereLight, 'cc.SphereLightComponent');
      /**
       * Alias of [[SpotLight]]
       * @deprecated Since v1.2
       */

      _export("SpotLightComponent", SpotLight);

      cclegacy.SpotLightComponent = SpotLight;
      js.setClassAlias(SpotLight, 'cc.SpotLightComponent');
      replaceProperty(SpotLight.prototype, 'SpotLight.prototype', [{
        name: 'luminousPower',
        newName: 'luminousFlux',
        customGetter: function customGetter() {
          // @ts-expect-error deprecation method
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return this.luminousFlux;
        },
        customSetter: function customSetter(value) {
          // @ts-expect-error deprecation method
          this.luminousFlux = value;
        }
      }]);
      replaceProperty(SphereLight.prototype, 'SphereLight.prototype', [{
        name: 'luminousPower',
        newName: 'luminousFlux',
        customGetter: function customGetter() {
          // @ts-expect-error deprecation method
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return this.luminousFlux;
        },
        customSetter: function customSetter(value) {
          // @ts-expect-error deprecation method
          this.luminousFlux = value;
        }
      }]);
      replaceProperty(Light.PhotometricTerm, 'Light.PhotometricTerm', [{
        name: 'LUMINOUS_POWER',
        newName: 'LUMINOUS_FLUX'
      }]);
    }
  };
});