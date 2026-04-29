System.register("q-bundled:///virtual/internal%253Aconstants.js", [], function (_export, _context) {
  "use strict";

  var TEST, EDITOR, PREVIEW, JSB, NATIVE, HTML5, DEV, WECHAT, WECHAT_MINI_PROGRAM, BAIDU, XIAOMI, ALIPAY, TAOBAO, TAOBAO_MINIGAME, BYTEDANCE, OPPO, VIVO, HUAWEI, COCOSPLAY, QTT, LINKSURE, BUILD, DEBUG, MINIGAME, RUNTIME_BASED, SUPPORT_JIT, NET_MODE;

  function tryDefineGlobal(name, value) {
    var _global = typeof window === 'undefined' ? global : window;

    if (typeof _global[name] === 'undefined') {
      return _global[name] = value;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return _global[name];
    }
  }

  function defined(name) {
    var _global = typeof window === 'undefined' ? global : window;

    return typeof _global[name] === 'object';
  }

  return {
    setters: [],
    execute: function () {
      _export("TEST", TEST = tryDefineGlobal('CC_TEST', defined('tap') || defined('QUnit')));

      _export("EDITOR", EDITOR = tryDefineGlobal('CC_EDITOR', defined('Editor') && defined('process') && 'electron' in process.versions));

      _export("PREVIEW", PREVIEW = tryDefineGlobal('CC_PREVIEW', !EDITOR));

      _export("JSB", JSB = tryDefineGlobal('CC_JSB', defined('jsb')));

      _export("NATIVE", NATIVE = JSB);

      _export("HTML5", HTML5 = !(EDITOR && NATIVE));

      _export("DEV", DEV = tryDefineGlobal('CC_DEV', true));

      _export("WECHAT", WECHAT = false);

      tryDefineGlobal('CC_WECHAT', false);

      _export("WECHAT_MINI_PROGRAM", WECHAT_MINI_PROGRAM = false);

      _export("BAIDU", BAIDU = false);

      tryDefineGlobal('CC_BAIDU', false);

      _export("XIAOMI", XIAOMI = false);

      tryDefineGlobal('CC_XIAOMI', false);

      _export("ALIPAY", ALIPAY = false);

      tryDefineGlobal('CC_ALIPAY', false);

      _export("TAOBAO", TAOBAO = false);

      _export("TAOBAO_MINIGAME", TAOBAO_MINIGAME = false);

      _export("BYTEDANCE", BYTEDANCE = false);

      tryDefineGlobal('CC_BYTEDANCE', false);

      _export("OPPO", OPPO = false);

      tryDefineGlobal('CC_OPPO', false);

      _export("VIVO", VIVO = false);

      tryDefineGlobal('CC_VIVO', false);

      _export("HUAWEI", HUAWEI = false);

      tryDefineGlobal('CC_HUAWEI', false);

      _export("COCOSPLAY", COCOSPLAY = false);

      tryDefineGlobal('CC_COCOSPLAY', false);

      _export("QTT", QTT = false);

      tryDefineGlobal('CC_QTT', false);

      _export("LINKSURE", LINKSURE = false);

      tryDefineGlobal('CC_LINKSURE', false);

      _export("BUILD", BUILD = false);

      tryDefineGlobal('CC_BUILD', false);

      _export("DEBUG", DEBUG = true);

      tryDefineGlobal('CC_DEBUG', true);

      _export("MINIGAME", MINIGAME = false);

      tryDefineGlobal('CC_MINIGAME', false);

      _export("RUNTIME_BASED", RUNTIME_BASED = false);

      tryDefineGlobal('CC_RUNTIME_BASED', false);

      _export("SUPPORT_JIT", SUPPORT_JIT = false);

      tryDefineGlobal('CC_SUPPORT_JIT', false);

      _export("NET_MODE", NET_MODE = 0);
    }
  };
});