System.register("q-bundled:///fs/cocos/core/platform/debug.js", ["../../../../virtual/internal%253Aconstants.js", "../../../DebugInfos.js", "../global-exports.js"], function (_export, _context) {
  "use strict";

  var EDITOR, JSB, DEV, DEBUG, debugInfos, legacyCC, ccwindow, ccdocument, ERROR_MAP_URL, logList, ccLog, ccWarn, ccError, ccAssert, ccDebug, logFormatter, warnFormatter, errorFormatter, assertFormatter, DebugMode;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  /**
   * @en Format a string.
   * @zh 格式化字符串。
   * @param message @zh 包含零个或多个需要替换的JavaScript字符串。@en JavaScript objects to replace substitution strings in msg.
   * @param optionalParams  @zh 用来替换在message中需要替换的JavaScript对象。@en JavaScript objects with which to replace substitution strings within msg.
   */
  function formatString(message, ...optionalParams) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return legacyCC.js.formatStr.apply(null, [message].concat(optionalParams));
  }
  /**
   * @en Outputs a message to the Cocos Creator Console (editor) or Web Console (runtime). This gives you additional control over the format of the output.
   * @zh 输出一条消息到 Cocos Creator 编辑器的 Console 或运行时 Web 端的 Console 中。这为你提供了对输出格式的额外控制。
   * @param message @zh 包含零个或多个需要替换的JavaScript字符串。@en JavaScript objects to replace substitution strings in msg.
   * @param optionalParams  @zh 用来替换在message中需要替换的JavaScript对象。@en JavaScript objects with which to replace substitution strings within msg.
   */


  function log(message, ...optionalParams) {
    return ccLog(message, ...optionalParams);
  }
  /**
   * @en
   * Outputs a warning message to the Cocos Creator Console (editor) or Web Console (runtime).
   * - In Cocos Creator, warning is yellow.
   * - In Chrome, warning have a yellow warning icon with the message text.
   * @zh
   * 输出警告消息到 Cocos Creator 编辑器的 Console 或运行时 Web 端的 Console 中。<br/>
   * - 在 Cocos Creator 中，警告信息显示是黄色的。<br/>
   * - 在 Chrome 中，警告信息有着黄色的图标以及黄色的消息文本。<br/>
   * @param message @zh 包含零个或多个需要替换的JavaScript字符串。@en JavaScript objects to replace substitution strings in msg.
   * @param optionalParams  @zh 用来替换在message中需要替换的JavaScript对象。@en JavaScript objects with which to replace substitution strings within msg.
   * This gives you additional control over the format of the output.
   */


  function warn(message, ...optionalParams) {
    return ccWarn(message, ...optionalParams);
  }
  /**
   * @en
   * Outputs an error message to the Cocos Creator Console (editor) or Web Console (runtime).<br/>
   * - In Cocos Creator, error is red.<br/>
   * - In Chrome, error have a red icon along with red message text.<br/>
   * @zh
   * 输出错误消息到 Cocos Creator 编辑器的 Console 或运行时页面端的 Console 中。<br/>
   * - 在 Cocos Creator 中，错误信息显示是红色的。<br/>
   * - 在 Chrome 中，错误信息有红色的图标以及红色的消息文本。<br/>
   * @param message @zh 包含零个或多个需要替换的JavaScript字符串。@en JavaScript objects to replace substitution strings in msg.
   * @param optionalParams  @zh 用来替换在message中需要替换的JavaScript对象。@en JavaScript objects with which to replace substitution strings within msg.
   * This gives you additional control over the format of the output.
   */


  function error(message, ...optionalParams) {
    return ccError(message, ...optionalParams);
  }
  /**
   * @en
   * Assert the condition and output error messages if the condition is not true.
   * @zh
   * 对检查测试条件进行检查，如果条件不为 true 则输出错误消息
   * @param value @zh 需要检查的条件。 @en The condition to check on.
   * @param message @zh 包含零个或多个需要替换的JavaScript字符串。@en JavaScript objects to replace substitution strings in msg.
   * @param optionalParams  @zh 用来替换在message中需要替换的JavaScript对象。@en JavaScript objects with which to replace substitution strings within msg.
   * This gives you additional control over the format of the output.
   */


  function assert(value, message, ...optionalParams) {
    return ccAssert(value, message, ...optionalParams);
  }
  /**
   * @en Outputs a message at the "debug" log level.
   * @zh 输出一条“调试”日志等级的消息。
   * @param data @zh 输出的消息对象。 @en The output message object.
   */


  function debug(...data) {
    return ccDebug(...data);
  }
  /**
   * @engineInternal
   */


  function _resetDebugSetting(mode) {
    // reset
    ccLog = ccWarn = ccError = ccAssert = ccDebug = () => {};

    if (mode === DebugMode.NONE) {
      return;
    }

    if (mode > DebugMode.ERROR) {
      // Log to web page.
      const logToWebPage = msg => {
        if (!legacyCC.game.canvas) {
          return;
        }

        if (!logList) {
          const logDiv = ccdocument.createElement('Div');
          logDiv.setAttribute('id', 'logInfoDiv');
          logDiv.setAttribute('width', '200');
          logDiv.setAttribute('height', legacyCC.game.canvas.height);
          const logDivStyle = logDiv.style;
          logDivStyle.zIndex = '99999';
          logDivStyle.position = 'absolute';
          logDivStyle.top = logDivStyle.left = '0';
          logList = ccdocument.createElement('textarea');
          logList.setAttribute('rows', '20');
          logList.setAttribute('cols', '30');
          logList.setAttribute('disabled', 'true');
          const logListStyle = logList.style;
          logListStyle.backgroundColor = 'transparent';
          logListStyle.borderBottom = '1px solid #cccccc';
          logListStyle.borderTopWidth = logListStyle.borderLeftWidth = logListStyle.borderRightWidth = '0px';
          logListStyle.borderTopStyle = logListStyle.borderLeftStyle = logListStyle.borderRightStyle = 'none';
          logListStyle.padding = '0px';
          logListStyle.margin = '0px';
          logDiv.appendChild(logList);
          legacyCC.game.canvas.parentNode.appendChild(logDiv);
        }

        logList.value = `${logList.value + msg}\r\n`;
        logList.scrollTop = logList.scrollHeight;
      };

      ccError = (message, ...optionalParams) => {
        logToWebPage(`ERROR :  ${formatString(message, ...optionalParams)}`);
      };

      ccAssert = (condition, message, ...optionalParams) => {
        if (!condition) {
          logToWebPage(`ASSERT: ${formatString(message, ...optionalParams)}`);
        }
      };

      if (mode !== DebugMode.ERROR_FOR_WEB_PAGE) {
        ccWarn = (message, ...optionalParams) => {
          logToWebPage(`WARN :  ${formatString(message, ...optionalParams)}`);
        };
      }

      if (mode === DebugMode.INFO_FOR_WEB_PAGE) {
        ccLog = (message, ...optionalParams) => {
          logToWebPage(formatString(message, ...optionalParams));
        };
      }
    } else if (console) {
      // Log to console.
      // For JSB
      if (!console.error) {
        console.error = console.log;
      }

      if (!console.warn) {
        console.warn = console.log;
      }

      if (EDITOR || console.error.bind) {
        // use bind to avoid pollute call stacks
        ccError = console.error.bind(console);
      } else {
        ccError = JSB ? console.error : (message, ...optionalParams) => console.error.apply(console, [message, ...optionalParams]);
      }

      ccAssert = (condition, message, ...optionalParams) => {
        if (!condition) {
          const errorText = formatString(message, ...optionalParams);

          if (DEV) {
            // eslint-disable-next-line no-debugger
            debugger;
          } else {
            throw new Error(errorText);
          }
        }
      };
    }

    if (mode !== DebugMode.ERROR) {
      if (EDITOR) {
        ccWarn = console.warn.bind(console);
      } else if (console.warn.bind) {
        // use bind to avoid pollute call stacks
        ccWarn = console.warn.bind(console);
      } else {
        ccWarn = JSB ? console.warn : (message, ...optionalParams) => console.warn.apply(console, [message, ...optionalParams]);
      }
    }

    if (EDITOR) {
      ccLog = console.log.bind(console);
    } else if (mode <= DebugMode.INFO) {
      if (JSB) {
        // @ts-expect-error We have no typing for this
        if (scriptEngineType === 'JavaScriptCore') {
          // console.log has to use `console` as its context for iOS 8~9. Therefore, apply it.
          ccLog = (message, ...optionalParams) => console.log.apply(console, [message, ...optionalParams]);
        } else {
          ccLog = console.log;
        }
      } else if (console.log.bind) {
        // use bind to avoid pollute call stacks
        ccLog = console.log.bind(console);
      } else {
        ccLog = (message, ...optionalParams) => console.log.apply(console, [message, ...optionalParams]);
      }
    }

    if (mode <= DebugMode.VERBOSE) {
      if (typeof console.debug === 'function') {
        const vendorDebug = console.debug.bind(console);

        ccDebug = (...data) => vendorDebug(...data);
      }
    }
  }

  function _throw(error_) {
    if (EDITOR) {
      return error(error_);
    } else {
      const stack = error_.stack;

      if (stack) {
        error(JSB ? `${error_}\n${stack}` : stack);
      } else {
        error(error_);
      }

      return undefined;
    }
  }

  function getTypedFormatter(type) {
    return (id, ...args) => {
      const msg = DEBUG ? debugInfos[id] || 'unknown id' : `${type} ${id}, please go to ${ERROR_MAP_URL}#${id} to see details.`;

      if (args.length === 0) {
        return msg;
      } // eslint-disable-next-line @typescript-eslint/no-unsafe-return


      return DEBUG ? formatString(msg, ...args) : `${msg} Arguments: ${args.join(', ')}`;
    };
  }

  function logID(id, ...optionalParams) {
    log(logFormatter(id, ...optionalParams));
  }

  function warnID(id, ...optionalParams) {
    warn(warnFormatter(id, ...optionalParams));
  }

  function errorID(id, ...optionalParams) {
    error(errorFormatter(id, ...optionalParams));
  }

  function assertID(condition, id, ...optionalParams) {
    if (condition) {
      return;
    }

    assert(false, assertFormatter(id, ...optionalParams));
  }
  /**
   * @en Enum for debug modes.
   * @zh 调试模式。
   */


  /**
   * @en Gets error message with the error id and possible parameters.
   * @zh 通过 error id 和必要的参数来获取错误信息。
   * @param errorId @zh 错误的ID。@en Error id.
   * @param param @zh 输出日志。@en Output log.
   */
  function getError(errorId, ...param) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return errorFormatter(errorId, ...param);
  }
  /**
   * @en Returns whether or not to display the FPS and debug information.
   * @zh 是否显示 FPS 信息和部分调试信息。
   * @deprecated @zh 从v3.6开始不再支持，请使用 profiler.isShowingStates。@en Since v3.6, Please use profiler.isShowingStates instead.
   */


  function isDisplayStats() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return legacyCC.profiler ? legacyCC.profiler.isShowingStats() : false;
  }
  /**
   * @en Sets whether display the FPS and debug informations on the bottom-left corner.
   * @zh 设置是否在左下角显示 FPS 和部分调试。
   * @deprecated @zh 从v3.6开始不再支持，请使用 profiler.showStats。@en Since v3.6, Please use profiler.showStats instead.
   */


  function setDisplayStats(displayStats) {
    if (legacyCC.profiler) {
      displayStats ? legacyCC.profiler.showStats() : legacyCC.profiler.hideStats();
    }
  }

  _export({
    log: log,
    warn: warn,
    error: error,
    assert: assert,
    debug: debug,
    _resetDebugSetting: _resetDebugSetting,
    _throw: _throw,
    logID: logID,
    warnID: warnID,
    errorID: errorID,
    assertID: assertID,
    getError: getError,
    isDisplayStats: isDisplayStats,
    setDisplayStats: setDisplayStats,
    DebugMode: void 0
  });

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      JSB = _virtualInternal253AconstantsJs.JSB;
      DEV = _virtualInternal253AconstantsJs.DEV;
      DEBUG = _virtualInternal253AconstantsJs.DEBUG;
    }, function (_DebugInfosJs) {
      debugInfos = _DebugInfosJs.default;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
      ccwindow = _globalExportsJs.ccwindow;
    }],
    execute: function () {
      ccdocument = ccwindow.document;
      ERROR_MAP_URL = 'https://github.com/cocos-creator/engine/blob/develop/EngineErrorMap.md'; // The html element displays log in web page (DebugMode.INFO_FOR_WEB_PAGE)

      logList = null;
      ccLog = console.log.bind(console);
      ccWarn = ccLog;
      ccError = ccLog;

      ccAssert = (condition, message, ...optionalParams) => {
        if (!condition) {
          console.log(`ASSERT: ${formatString(message, ...optionalParams)}`);
        }
      };

      ccDebug = ccLog;
      logFormatter = getTypedFormatter('Log');
      warnFormatter = getTypedFormatter('Warning');
      errorFormatter = getTypedFormatter('Error');
      assertFormatter = getTypedFormatter('Assert');

      (function (DebugMode) {
        DebugMode[DebugMode["NONE"] = 0] = "NONE";
        DebugMode[DebugMode["VERBOSE"] = 1] = "VERBOSE";
        DebugMode[DebugMode["INFO"] = 2] = "INFO";
        DebugMode[DebugMode["WARN"] = 3] = "WARN";
        DebugMode[DebugMode["ERROR"] = 4] = "ERROR";
        DebugMode[DebugMode["INFO_FOR_WEB_PAGE"] = 5] = "INFO_FOR_WEB_PAGE";
        DebugMode[DebugMode["WARN_FOR_WEB_PAGE"] = 6] = "WARN_FOR_WEB_PAGE";
        DebugMode[DebugMode["ERROR_FOR_WEB_PAGE"] = 7] = "ERROR_FOR_WEB_PAGE";
      })(DebugMode || _export("DebugMode", DebugMode = {}));
    }
  };
});