System.register("q-bundled:///fs/pal/env/native/env.js", ["../../../../virtual/internal%253Aconstants.js"], function (_export, _context) {
  "use strict";

  var PREVIEW, ccwindow, ccdocument;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function findCanvas() {
    const container = ccdocument.createElement('div');
    const frame = ccdocument.documentElement;
    const canvas = ccwindow.__canvas;
    return {
      frame,
      canvas,
      container
    };
  }

  function loadJsFile(path) {
    if (PREVIEW) {
      // NOTE: in native preview (simulator), we need to request script with url http://x.x.x.x:xxxx/plugins/xxx.js
      // so that the editor preview server would resolve the plugin script and return the code.
      // here we use window.eval() function to execute the code of plugin script.
      return new Promise((resolve, reject) => {
        const sourceURL = window.location.href + path;
        const xhr = new XMLHttpRequest();

        xhr.onload = () => {
          if (xhr.status !== 200) {
            reject(new Error(`load js file failed: ${sourceURL}, error status: ${xhr.status}`));
            return;
          } // eslint-disable-next-line no-eval


          window.eval(`${xhr.response}\n//# sourceURL=${sourceURL}`);
          resolve();
        };

        xhr.onerror = () => {
          reject(new Error(`load js file failed: ${sourceURL}`));
        };

        xhr.open('GET', sourceURL, true);
        xhr.send(null);
      });
    } // eslint-disable-next-line import/no-dynamic-require


    return require(`${path}`);
  }

  _export({
    findCanvas: findCanvas,
    loadJsFile: loadJsFile
  });

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      PREVIEW = _virtualInternal253AconstantsJs.PREVIEW;
    }],
    execute: function () {
      ccwindow = typeof globalThis.jsb !== 'undefined' ? typeof jsb.window !== 'undefined' ? jsb.window : window : window;
      ccdocument = ccwindow.document;
    }
  };
});