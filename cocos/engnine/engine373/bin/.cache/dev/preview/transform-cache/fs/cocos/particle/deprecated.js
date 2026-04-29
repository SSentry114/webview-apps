System.register("q-bundled:///fs/cocos/particle/deprecated.js", ["../core/index.js", "./burst.js", "./particle-system.js", "./billboard.js", "./line.js"], function (_export, _context) {
  "use strict";

  var removeProperty, replaceProperty, js, cclegacy, Burst, ParticleSystem, Billboard, Line;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_coreIndexJs) {
      removeProperty = _coreIndexJs.removeProperty;
      replaceProperty = _coreIndexJs.replaceProperty;
      js = _coreIndexJs.js;
      cclegacy = _coreIndexJs.cclegacy;
    }, function (_burstJs) {
      Burst = _burstJs.default;
    }, function (_particleSystemJs) {
      ParticleSystem = _particleSystemJs.ParticleSystem;
    }, function (_billboardJs) {
      Billboard = _billboardJs.Billboard;
    }, function (_lineJs) {
      Line = _lineJs.Line;
    }],
    execute: function () {
      removeProperty(Burst.prototype, 'Burst.prototype', [{
        name: 'minCount'
      }, {
        name: 'maxCount'
      }]);
      replaceProperty(ParticleSystem.prototype, 'ParticleSystem.prototype', [{
        name: 'enableCulling',
        newName: 'dataCulling'
      }]);
      /**
       * Alias of [[ParticleSystem]]
       * @deprecated Since v1.2
       */

      _export("ParticleSystemComponent", ParticleSystem);

      cclegacy.ParticleSystemComponent = ParticleSystem;
      js.setClassAlias(ParticleSystem, 'cc.ParticleSystemComponent');
      /**
       * Alias of [[Billboard]]
       * @deprecated Since v1.2
       */

      _export("BillboardComponent", Billboard);

      cclegacy.BillboardComponent = Billboard;
      js.setClassAlias(Billboard, 'cc.BillboardComponent');
      /**
       * Alias of [[Line]]
       * @deprecated Since v1.2
       */

      _export("LineComponent", Line);

      cclegacy.LineComponent = Line;
      js.setClassAlias(Line, 'cc.LineComponent');
    }
  };
});