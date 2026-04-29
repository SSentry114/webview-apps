System.register("q-bundled:///fs/cocos/asset/asset-manager/download-script.js", ["../../core/index.js", "../../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var getError, ccwindow, ccdocument, downloaded;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function downloadScript(url, options, onComplete) {
    // no need to load script again
    if (downloaded[url]) {
      if (onComplete) {
        onComplete(null);
      }

      return null;
    }

    var script = ccdocument.createElement('script');

    if (ccwindow.location.protocol !== 'file:') {
      script.crossOrigin = 'anonymous';
    }

    script.async = options.scriptAsyncLoading || false;
    script.src = url;

    function loadHandler() {
      script.parentNode.removeChild(script);
      script.removeEventListener('load', loadHandler, false);
      script.removeEventListener('error', errorHandler, false);
      downloaded[url] = true;

      if (onComplete) {
        onComplete(null);
      }
    }

    function errorHandler() {
      script.parentNode.removeChild(script);
      script.removeEventListener('load', loadHandler, false);
      script.removeEventListener('error', errorHandler, false);

      if (onComplete) {
        onComplete(new Error(getError(4928, url)));
      }
    }

    script.addEventListener('load', loadHandler, false);
    script.addEventListener('error', errorHandler, false);
    ccdocument.body.appendChild(script);
    return script;
  }

  _export("default", downloadScript);

  return {
    setters: [function (_coreIndexJs) {
      getError = _coreIndexJs.getError;
    }, function (_coreGlobalExportsJs) {
      ccwindow = _coreGlobalExportsJs.ccwindow;
    }],
    execute: function () {
      ccdocument = ccwindow.document;
      downloaded = {};
    }
  };
});