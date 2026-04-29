System.register("q-bundled:///fs/cocos/3d/skeletal-animation/skeletal-animation-data-hub.js", ["../../core/index.js", "../../animation/internal-symbols.js"], function (_export, _context) {
  "use strict";

  var cclegacy, BAKE_SKELETON_CURVE_SYMBOL, SkelAnimDataHub;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_coreIndexJs) {
      cclegacy = _coreIndexJs.cclegacy;
    }, function (_animationInternalSymbolsJs) {
      BAKE_SKELETON_CURVE_SYMBOL = _animationInternalSymbolsJs.BAKE_SKELETON_CURVE_SYMBOL;
    }],
    execute: function () {
      /**
       * @en
       * The data conversion tool for skeleton animation
       * @zh
       * 骨骼动画数据转换中心。
       * @internal
       */
      _export("SkelAnimDataHub", SkelAnimDataHub = /*#__PURE__*/function () {
        function SkelAnimDataHub() {}

        SkelAnimDataHub.getOrExtract = function getOrExtract(clip) {
          var data = SkelAnimDataHub.pool.get(clip);

          if (!data || data.samples !== clip.sample) {
            // release outdated render data
            if (data) {
              cclegacy.director.root.dataPoolManager.releaseAnimationClip(clip);
            }

            var frames = Math.ceil(clip.sample * clip.duration) + 1;
            var step = clip.sample;
            data = clip[BAKE_SKELETON_CURVE_SYMBOL](0, step, frames);
            SkelAnimDataHub.pool.set(clip, data);
          }

          return data;
        };

        SkelAnimDataHub.destroy = function destroy(clip) {
          SkelAnimDataHub.pool["delete"](clip);
        };

        return SkelAnimDataHub;
      }());

      SkelAnimDataHub.pool = new Map();
    }
  };
});