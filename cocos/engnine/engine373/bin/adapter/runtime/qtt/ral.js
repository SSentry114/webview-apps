(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _features = {};
var _getCallbacks = {};
var _setCallbacks = {};
var _FEATURE_UNSUPPORT = -1;
var _default = exports["default"] = {
  FEATURE_UNSUPPORT: _FEATURE_UNSUPPORT,
  CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC: {
    name: "canvas.context2d.textbaseline.alphabetic",
    enable: 1,
    disable: 0
  },
  CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT: {
    name: "canvas.context2d.textbaseline.default",
    alphabetic: 1,
    bottom: 0
  },
  setFeature: function setFeature(featureName, property, value) {
    var feature = _features[featureName];
    if (!feature) {
      feature = _features[featureName] = {};
    }
    feature[property] = value;
  },
  getFeatureProperty: function getFeatureProperty(featureName, property) {
    var feature = _features[featureName];
    return feature ? feature[property] : undefined;
  },
  registerFeatureProperty: function registerFeatureProperty(key, getFunction, setFunction) {
    if (typeof key !== "string") {
      return false;
    }
    if (typeof getFunction !== "function" && typeof setFunction !== "function") {
      return false;
    }
    if (typeof getFunction === "function" && typeof _getCallbacks[key] === "function") {
      return false;
    }
    if (typeof setFunction === "function" && typeof _setCallbacks[key] === "function") {
      return false;
    }
    if (typeof getFunction === "function") {
      _getCallbacks[key] = getFunction;
    }
    if (typeof setFunction === "function") {
      _setCallbacks[key] = setFunction;
    }
    return true;
  },
  unregisterFeatureProperty: function unregisterFeatureProperty(key, getBool, setBool) {
    if (typeof key !== "string") {
      return false;
    }
    if (typeof getBool !== "boolean" || typeof setBool !== "boolean") {
      return false;
    }
    if (getBool === true && typeof _getCallbacks[key] === "function") {
      _getCallbacks[key] = undefined;
    }
    if (setBool === true && typeof _setCallbacks[key] === "function") {
      _setCallbacks[key] = undefined;
    }
    return true;
  },
  getFeaturePropertyInt: function getFeaturePropertyInt(key) {
    if (typeof key !== "string") {
      return _FEATURE_UNSUPPORT;
    }
    var getFunction = _getCallbacks[key];
    if (getFunction === undefined) {
      return _FEATURE_UNSUPPORT;
    }
    var value = getFunction();
    if (typeof value !== "number") {
      return _FEATURE_UNSUPPORT;
    }
    if (value < _FEATURE_UNSUPPORT) {
      value = _FEATURE_UNSUPPORT;
    }
    return value;
  },
  setFeaturePropertyInt: function setFeaturePropertyInt(key, value) {
    if (typeof key !== "string" && typeof value !== "number" && value < 0) {
      return false;
    }
    var setFunction = _setCallbacks[key];
    if (setFunction === undefined) {
      return false;
    }
    var returnCode = setFunction(value);
    if (typeof returnCode !== "number" && typeof returnCode !== 'boolean') {
      return false;
    }
    return returnCode ? true : false;
  }
};

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var _CANPLAY_CALLBACK = "canplayCallbacks";
var _ENDED_CALLBACK = "endedCallbacks";
var _ERROR_CALLBACK = "errorCallbacks";
var _PAUSE_CALLBACK = "pauseCallbacks";
var _PLAY_CALLBACK = "playCallbacks";
var _SEEKED_CALLBACK = "seekedCallbacks";
var _SEEKING_CALLBACK = "seekingCallbacks";
var _STOP_CALLBACK = "stopCallbacks";
var _TIME_UPDATE_CALLBACK = "timeUpdateCallbacks";
var _WAITING_CALLBACK = "waitingCallbacks";
var _ERROR_CODE = {
  ERROR_SYSTEM: 10001,
  ERROR_NET: 10002,
  ERROR_FILE: 10003,
  ERROR_FORMAT: 10004,
  ERROR_UNKNOWN: -1
};
var _STATE = {
  ERROR: -1,
  INITIALIZING: 0,
  PLAYING: 1,
  PAUSED: 2
};
var _audioEngine = undefined;
var _weakMap = new WeakMap();
var _offCallback = function _offCallback(target, type, callback) {
  var privateThis = _weakMap.get(target);
  if (typeof callback !== "function" || !privateThis) {
    return -1;
  }
  var callbacks = privateThis[type] || [];
  for (var i = 0, len = callbacks.length; i < len; ++i) {
    if (callback === callbacks[i]) {
      callbacks.splice(i, 1);
      return callback.length + 1;
    }
  }
  return 0;
};
var _onCallback = function _onCallback(target, type, callback) {
  var privateThis = _weakMap.get(target);
  if (typeof callback !== "function" || !privateThis) {
    return -1;
  }
  var callbacks = privateThis[type];
  if (!callbacks) {
    callbacks = privateThis[type] = [callback];
  } else {
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      if (callback === callbacks[i]) {
        return 0;
      }
    }
    callbacks.push(callback);
  }
  return callbacks.length;
};
var _dispatchCallback = function _dispatchCallback(target, type) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var privateThis = _weakMap.get(target);
  if (privateThis) {
    var callbacks = privateThis[type] || [];
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(target, args);
    }
  }
};
function InnerAudioContext() {
  this.startTime = 0;
  this.autoplay = false;
  _weakMap.set(this, {
    src: "",
    volume: 1,
    loop: false,
    seekPosition: -1
  });
  Object.defineProperty(this, "loop", {
    set: function set(value) {
      value = !!value;
      var privateThis = _weakMap.get(this);
      if (privateThis) {
        var audioID = privateThis.audioID;
        if (typeof audioID === "number" && audioID >= 0) {
          _audioEngine.setLoop(audioID, value);
        }
        privateThis.loop = value;
      }
    },
    get: function get() {
      var privateThis = _weakMap.get(this);
      return privateThis ? privateThis.loop : false;
    }
  });
  Object.defineProperty(this, "volume", {
    set: function set(value) {
      if (typeof value === "number") {
        if (value < 0) {
          value = 0;
        } else if (value > 1) {
          value = 1;
        }
      } else {
        value = 1;
      }
      var privateThis = _weakMap.get(this);
      if (privateThis) {
        var audioID = privateThis.audioID;
        if (typeof audioID === "number" && audioID >= 0) {
          _audioEngine.setVolume(audioID, value);
        }
        privateThis.volume = value;
      }
    },
    get: function get() {
      var privateThis = _weakMap.get(this);
      return privateThis ? privateThis.volume : 1;
    }
  });
  Object.defineProperty(this, "src", {
    set: function set(value) {
      var privateThis = _weakMap.get(this);
      if (!privateThis) {
        return;
      }
      var oldSrc = privateThis.src;
      privateThis.src = value;
      if (typeof value === "string") {
        var audioID = privateThis.audioID;
        if (typeof audioID === "number" && audioID >= 0 && _audioEngine.getState(audioID) === _STATE.PAUSED && oldSrc !== value) {
          _audioEngine.stop(audioID);
          privateThis.audioID = -1;
        }
        var self = this;
        _audioEngine.preload(value, function () {
          setTimeout(function () {
            if (self.src === value) {
              _dispatchCallback(self, _CANPLAY_CALLBACK);
              if (self.autoplay) {
                self.play();
              }
            }
          });
        });
      }
    },
    get: function get() {
      var privateThis = _weakMap.get(this);
      return privateThis ? privateThis.src : "";
    }
  });
  Object.defineProperty(this, "duration", {
    get: function get() {
      var privateThis = _weakMap.get(this);
      if (privateThis) {
        var audioID = privateThis.audioID;
        if (typeof audioID === "number" && audioID >= 0) {
          return _audioEngine.getDuration(audioID);
        }
      }
      return NaN;
    },
    set: function set() {}
  });
  Object.defineProperty(this, "currentTime", {
    get: function get() {
      var privateThis = _weakMap.get(this);
      if (privateThis) {
        var audioID = privateThis.audioID;
        if (typeof audioID === "number" && audioID >= 0) {
          return _audioEngine.getCurrentTime(audioID);
        }
      }
      return 0;
    },
    set: function set() {}
  });
  Object.defineProperty(this, "paused", {
    get: function get() {
      var privateThis = _weakMap.get(this);
      if (privateThis) {
        var audioID = privateThis.audioID;
        if (typeof audioID === "number" && audioID >= 0) {
          return _audioEngine.getState(audioID) === _STATE.PAUSED;
        }
      }
      return true;
    },
    set: function set() {}
  });
  Object.defineProperty(this, "buffered", {
    get: function get() {
      var privateThis = _weakMap.get(this);
      if (privateThis) {
        var audioID = privateThis.audioID;
        if (typeof audioID === "number" && audioID >= 0) {
          return _audioEngine.getBuffered(audioID);
        }
      }
      return 0;
    },
    set: function set() {}
  });
}
var _prototype = InnerAudioContext.prototype;
_prototype.destroy = function () {
  var privateThis = _weakMap.get(this);
  if (privateThis) {
    var audioID = privateThis.audioID;
    if (typeof audioID === "number" && audioID >= 0) {
      _audioEngine.stop(audioID);
      privateThis.audioID = -1;
      _dispatchCallback(this, _STOP_CALLBACK);
    }
    privateThis[_CANPLAY_CALLBACK] = [];
    privateThis[_ENDED_CALLBACK] = [];
    privateThis[_ERROR_CALLBACK] = [];
    privateThis[_PAUSE_CALLBACK] = [];
    privateThis[_PLAY_CALLBACK] = [];
    privateThis[_SEEKED_CALLBACK] = [];
    privateThis[_SEEKING_CALLBACK] = [];
    privateThis[_STOP_CALLBACK] = [];
    privateThis[_TIME_UPDATE_CALLBACK] = [];
    privateThis[_WAITING_CALLBACK] = [];
    clearInterval(privateThis.intervalID);
  }
};
_prototype.play = function () {
  var privateThis = _weakMap.get(this);
  if (!privateThis) {
    return;
  }
  var src = privateThis.src;
  var audioID = privateThis.audioID;
  if (typeof src !== "string" || src === "") {
    _dispatchCallback(this, _ERROR_CALLBACK, [{
      errMsg: "invalid src",
      errCode: _ERROR_CODE.ERROR_FILE
    }]);
    return;
  }
  if (typeof audioID === "number" && audioID >= 0) {
    if (_audioEngine.getState(audioID) === _STATE.PAUSED) {
      _audioEngine.resume(audioID);
      _dispatchCallback(this, _PLAY_CALLBACK);
      return;
    } else {
      _audioEngine.stop(audioID);
      privateThis.audioID = -1;
    }
  }
  audioID = _audioEngine.play(src, this.loop, this.volume);
  if (audioID === -1) {
    _dispatchCallback(this, _ERROR_CALLBACK, [{
      errMsg: "unknown",
      errCode: _ERROR_CODE.ERROR_UNKNOWN
    }]);
    return;
  }
  privateThis.audioID = audioID;
  if (privateThis.seekPosition >= 0) {
    _audioEngine.setCurrentTime(audioID, privateThis.seekPosition);
    privateThis.seekPosition = -1;
  } else {
    if (typeof this.startTime === "number" && this.startTime > 0) {
      _audioEngine.setCurrentTime(audioID, this.startTime);
    }
  }
  _dispatchCallback(this, _WAITING_CALLBACK);
  var self = this;
  _audioEngine.setCanPlayCallback(audioID, function () {
    if (src === self.src) {
      _dispatchCallback(self, _CANPLAY_CALLBACK);
      _dispatchCallback(self, _PLAY_CALLBACK);
    }
  });
  _audioEngine.setWaitingCallback(audioID, function () {
    if (src === self.src) {
      _dispatchCallback(self, _WAITING_CALLBACK);
    }
  });
  _audioEngine.setErrorCallback(audioID, function () {
    if (src === self.src) {
      privateThis.audioID = -1;
      _dispatchCallback(self, _ERROR_CALLBACK);
    }
  });
  _audioEngine.setFinishCallback(audioID, function () {
    if (src === self.src) {
      privateThis.audioID = -1;
      _dispatchCallback(self, _ENDED_CALLBACK);
    }
  });
};
_prototype.pause = function () {
  var privateThis = _weakMap.get(this);
  if (privateThis) {
    var audioID = privateThis.audioID;
    if (typeof audioID === "number" && audioID >= 0) {
      _audioEngine.pause(audioID);
      _dispatchCallback(this, _PAUSE_CALLBACK);
    }
  }
};
_prototype.seek = function (position) {
  var privateThis = _weakMap.get(this);
  if (privateThis && typeof position === "number" && position >= 0) {
    var audioID = privateThis.audioID;
    if (typeof audioID === "number" && audioID >= 0) {
      _audioEngine.setCurrentTime(audioID, position);
      _dispatchCallback(this, _SEEKING_CALLBACK);
      _dispatchCallback(this, _SEEKED_CALLBACK);
    } else {
      privateThis.seekPosition = position;
    }
  }
};
_prototype.stop = function () {
  var privateThis = _weakMap.get(this);
  if (privateThis) {
    var audioID = privateThis.audioID;
    if (typeof audioID === "number" && audioID >= 0) {
      _audioEngine.stop(audioID);
      privateThis.audioID = -1;
      _dispatchCallback(this, _STOP_CALLBACK);
    }
  }
};
_prototype.offCanplay = function (callback) {
  _offCallback(this, _CANPLAY_CALLBACK, callback);
};
_prototype.offEnded = function (callback) {
  _offCallback(this, _ENDED_CALLBACK, callback);
};
_prototype.offError = function (callback) {
  _offCallback(this, _ERROR_CALLBACK, callback);
};
_prototype.offPause = function (callback) {
  _offCallback(this, _PAUSE_CALLBACK, callback);
};
_prototype.offPlay = function (callback) {
  _offCallback(this, _PLAY_CALLBACK, callback);
};
_prototype.offSeeked = function (callback) {
  _offCallback(this, _SEEKED_CALLBACK, callback);
};
_prototype.offSeeking = function (callback) {
  _offCallback(this, _SEEKING_CALLBACK, callback);
};
_prototype.offStop = function (callback) {
  _offCallback(this, _STOP_CALLBACK, callback);
};
_prototype.offTimeUpdate = function (callback) {
  var result = _offCallback(this, _TIME_UPDATE_CALLBACK, callback);
  if (result === 1) {
    clearInterval(_weakMap.get(this).intervalID);
  }
};
_prototype.offWaiting = function (callback) {
  _offCallback(this, _WAITING_CALLBACK, callback);
};
_prototype.onCanplay = function (callback) {
  _onCallback(this, _CANPLAY_CALLBACK, callback);
};
_prototype.onEnded = function (callback) {
  _onCallback(this, _ENDED_CALLBACK, callback);
};
_prototype.onError = function (callback) {
  _onCallback(this, _ERROR_CALLBACK, callback);
};
_prototype.onPause = function (callback) {
  _onCallback(this, _PAUSE_CALLBACK, callback);
};
_prototype.onPlay = function (callback) {
  _onCallback(this, _PLAY_CALLBACK, callback);
};
_prototype.onSeeked = function (callback) {
  _onCallback(this, _SEEKED_CALLBACK, callback);
};
_prototype.onSeeking = function (callback) {
  _onCallback(this, "seekingCallbacks", callback);
};
_prototype.onStop = function (callback) {
  _onCallback(this, _STOP_CALLBACK, callback);
};
_prototype.onTimeUpdate = function (callback) {
  var result = _onCallback(this, _TIME_UPDATE_CALLBACK, callback);
  if (result === 1) {
    var privateThis = _weakMap.get(this);
    var self = this;
    var intervalID = setInterval(function () {
      var privateThis = _weakMap.get(self);
      if (privateThis) {
        var audioID = privateThis.audioID;
        if (typeof audioID === "number" && audioID >= 0 && _audioEngine.getState(audioID) === _STATE.PLAYING) {
          _dispatchCallback(self, _TIME_UPDATE_CALLBACK);
        }
      } else {
        clearInterval(intervalID);
      }
    }, 500);
    privateThis.intervalID = intervalID;
  }
};
_prototype.onWaiting = function (callback) {
  _onCallback(this, _WAITING_CALLBACK, callback);
};
function _default(AudioEngine) {
  if (_audioEngine === undefined) {
    _audioEngine = Object.assign({}, AudioEngine);
    Object.keys(AudioEngine).forEach(function (name) {
      if (typeof AudioEngine[name] === "function") {
        AudioEngine[name] = function () {
          console.warn("AudioEngine." + name + " is deprecated");
          return _audioEngine[name].apply(AudioEngine, arguments);
        };
      }
    });
  }
  return new InnerAudioContext();
}
;

},{}],3:[function(require,module,exports){
"use strict";

var _util = _interopRequireDefault(require("../../util"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _rt = loadRuntime();
_util["default"].exportTo("onShow", _rt, ral);
_util["default"].exportTo("onHide", _rt, ral);
_util["default"].exportTo("offShow", _rt, ral);
_util["default"].exportTo("offHide", _rt, ral);

},{"../../util":21}],4:[function(require,module,exports){
"use strict";

var _util = _interopRequireDefault(require("../../util"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _rt = loadRuntime();
_util["default"].exportTo("loadSubpackage", _rt, ral);

},{"../../util":21}],5:[function(require,module,exports){
"use strict";

var _util = _interopRequireDefault(require("../../util"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _rt = loadRuntime();
_util["default"].exportTo("env", _rt, ral);
_util["default"].exportTo("getSystemInfo", _rt, ral);
_util["default"].exportTo("getSystemInfoSync", _rt, ral);

},{"../../util":21}],6:[function(require,module,exports){
"use strict";

var _jsb = window.jsb;
if (!_jsb) {
  _jsb = {};
}
var _rt = loadRuntime();
var _touches = [];
var _getTouchIndex = function _getTouchIndex(touch) {
  var element;
  for (var index = 0; index < _touches.length; index++) {
    element = _touches[index];
    if (touch.identifier === element.identifier) {
      return index;
    }
  }
  return -1;
};
var _copyObject = function _copyObject(fromObj, toObject) {
  for (var key in fromObj) {
    if (fromObj.hasOwnProperty(key)) {
      toObject[key] = fromObj[key];
    }
  }
};
var _listenerMap = {
  "touchstart": [],
  "touchmove": [],
  "touchend": [],
  "touchcancel": []
};
function _addListener(key, value) {
  var listenerArr = _listenerMap[key];
  for (var index = 0, length = listenerArr.length; index < length; index++) {
    if (value === listenerArr[index]) {
      return;
    }
  }
  listenerArr.push(value);
}
function _removeListener(key, value) {
  var listenerArr = _listenerMap[key] || [];
  var length = listenerArr.length;
  for (var index = 0; index < length; ++index) {
    if (value === listenerArr[index]) {
      listenerArr.splice(index, 1);
      return;
    }
  }
}
var _hasDellWith = false;
var _systemInfo = _rt.getSystemInfoSync();
if (window.innerWidth && _systemInfo.windowWidth !== window.innerWidth) {
  _hasDellWith = true;
}
var _touchEventHandlerFactory = function _touchEventHandlerFactory(type) {
  return function (changedTouches) {
    if (typeof changedTouches === "function") {
      _addListener(type, changedTouches);
      return;
    }
    var touchEvent = new TouchEvent(type);
    var index;
    if (type === "touchstart") {
      changedTouches.forEach(function (touch) {
        index = _getTouchIndex(touch);
        if (index >= 0) {
          _copyObject(touch, _touches[index]);
        } else {
          var tmp = {};
          _copyObject(touch, tmp);
          _touches.push(tmp);
        }
      });
    } else if (type === "touchmove") {
      changedTouches.forEach(function (element) {
        index = _getTouchIndex(element);
        if (index >= 0) {
          _copyObject(element, _touches[index]);
        }
      });
    } else if (type === "touchend" || type === "touchcancel") {
      changedTouches.forEach(function (element) {
        index = _getTouchIndex(element);
        if (index >= 0) {
          _touches.splice(index, 1);
        }
      });
    }
    var touches = [].concat(_touches);
    var _changedTouches = [];
    changedTouches.forEach(function (touch) {
      var length = touches.length;
      for (var _index = 0; _index < length; ++_index) {
        var _touch = touches[_index];
        if (touch.identifier === _touch.identifier) {
          _changedTouches.push(_touch);
          return;
        }
      }
      _changedTouches.push(touch);
    });
    touchEvent.touches = touches;
    touchEvent.targetTouches = touches;
    touchEvent.changedTouches = _changedTouches;
    if (_hasDellWith) {
      touches.forEach(function (touch) {
        touch.clientX /= window.devicePixelRatio;
        touch.clientY /= window.devicePixelRatio;
        touch.pageX /= window.devicePixelRatio;
        touch.pageY /= window.devicePixelRatio;
      });
      if (type === "touchcancel" || type === "touchend") {
        _changedTouches.forEach(function (touch) {
          touch.clientX /= window.devicePixelRatio;
          touch.clientY /= window.devicePixelRatio;
          touch.pageX /= window.devicePixelRatio;
          touch.pageY /= window.devicePixelRatio;
        });
      }
    }
    var listenerArr = _listenerMap[type];
    var length = listenerArr.length;
    for (var _index2 = 0; _index2 < length; _index2++) {
      listenerArr[_index2](touchEvent);
    }
  };
};
if (_rt.onTouchStart) {
  ral.onTouchStart = _rt.onTouchStart;
  ral.offTouchStart = _rt.offTouchStart;
} else {
  _jsb.onTouchStart = _touchEventHandlerFactory('touchstart');
  _jsb.offTouchStart = function (callback) {
    _removeListener("touchstart", callback);
  };
  ral.onTouchStart = _jsb.onTouchStart.bind(_jsb);
  ral.offTouchStart = _jsb.offTouchStart.bind(_jsb);
}
if (_rt.onTouchMove) {
  ral.onTouchMove = _rt.onTouchMove;
  ral.offTouchMove = _rt.offTouchMove;
} else {
  _jsb.onTouchMove = _touchEventHandlerFactory('touchmove');
  _jsb.offTouchMove = function (callback) {
    _removeListener("touchmove", callback);
  };
  ral.onTouchMove = _jsb.onTouchMove.bind(_jsb);
  ral.offTouchMove = _jsb.offTouchMove.bind(_jsb);
}
if (_rt.onTouchCancel) {
  ral.onTouchCancel = _rt.onTouchCancel;
  ral.offTouchCancel = _rt.offTouchCancel;
} else {
  _jsb.onTouchCancel = _touchEventHandlerFactory('touchcancel');
  _jsb.offTouchCancel = function (callback) {
    _removeListener("touchcancel", callback);
  };
  ral.onTouchCancel = _jsb.onTouchCancel.bind(_jsb);
  ral.offTouchCancel = _jsb.offTouchCancel.bind(_jsb);
}
if (_rt.onTouchEnd) {
  ral.onTouchEnd = _rt.onTouchEnd;
  ral.offTouchEnd = _rt.offTouchEnd;
} else {
  _jsb.onTouchEnd = _touchEventHandlerFactory('touchend');
  _jsb.offTouchEnd = function (callback) {
    _removeListener("touchend", callback);
  };
  ral.onTouchEnd = _jsb.onTouchEnd.bind(_jsb);
  ral.offTouchEnd = _jsb.offTouchEnd.bind(_jsb);
}

},{}],7:[function(require,module,exports){
"use strict";

var _util = _interopRequireDefault(require("../../util"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _rt = loadRuntime();
var _listeners = [];
ral.device = ral.device || {};
if (_rt.offAccelerometerChange) {
  if (_rt._compatibleMode === 1) {
    var _systemInfo = _rt.getSystemInfoSync();
    var _isAndroid = _systemInfo.platform.toLowerCase() === "android";
    var _compatibleAccelerometerChange = function _compatibleAccelerometerChange(e) {
      if (_isAndroid) {
        e.x /= -10;
        e.y /= -10;
        e.z /= -10;
      } else {
        e.x /= 10;
        e.y /= 10;
        e.z /= 10;
      }
      _listeners.forEach(function (listener) {
        listener(e);
      });
    };
    var _onAccelerometerChange = _rt.onAccelerometerChange.bind(_rt);
    ral.onAccelerometerChange = function (listener) {
      if (typeof listener === "function") {
        var length = _listeners.length;
        for (var index = 0; index < length; ++index) {
          if (listener === _listeners[index]) {
            return;
          }
        }
        _listeners.push(listener);
        if (_listeners.length === 1) {
          _onAccelerometerChange(_compatibleAccelerometerChange);
        }
      }
    };
    var _offAccelerometerChange = _rt.offAccelerometerChange.bind(_rt);
    ral.offAccelerometerChange = function (listener) {
      var length = _listeners.length;
      for (var index = 0; index < length; ++index) {
        if (listener === _listeners[index]) {
          _listeners.splice(index, 1);
          if (_listeners.length === 0) {
            _offAccelerometerChange(_compatibleAccelerometerChange);
          }
          break;
        }
      }
    };
  } else {
    ral.onAccelerometerChange = _rt.onAccelerometerChange.bind(_rt);
    ral.offAccelerometerChange = _rt.offAccelerometerChange.bind(_rt);
  }
  ral.stopAccelerometer = _rt.stopAccelerometer.bind(_rt);
  var _startAccelerometer = _rt.startAccelerometer.bind(_rt);
  ral.startAccelerometer = function (obj) {
    return _startAccelerometer(Object.assign({
      type: "accelerationIncludingGravity"
    }, obj));
  };
} else {
  ral.onAccelerometerChange = function (listener) {
    if (typeof listener === "function") {
      var length = _listeners.length;
      for (var index = 0; index < length; ++index) {
        if (listener === _listeners[index]) {
          return;
        }
      }
      _listeners.push(listener);
    }
  };
  ral.offAccelerometerChange = function (listener) {
    var length = _listeners.length;
    for (var index = 0; index < length; ++index) {
      if (listener === _listeners[index]) {
        _listeners.splice(index, 1);
        return;
      }
    }
  };
  var _systemInfo2 = _rt.getSystemInfoSync();
  var _isAndroid2 = _systemInfo2.platform.toLowerCase() === "android";
  jsb.device.dispatchDeviceMotionEvent = function (event) {
    var acceleration = Object.assign({}, event._accelerationIncludingGravity);
    if (_isAndroid2) {
      acceleration.x /= -10;
      acceleration.y /= -10;
      acceleration.z /= -10;
    } else {
      acceleration.x /= 10;
      acceleration.y /= 10;
      acceleration.z /= 10;
    }
    _listeners.forEach(function (listener) {
      listener({
        x: acceleration.x,
        y: acceleration.y,
        z: acceleration.z
      });
    });
  };
  ral.stopAccelerometer = function () {
    jsb.device.setMotionEnabled(false);
  };
  ral.startAccelerometer = function () {
    jsb.device.setMotionEnabled(true);
  };
}

},{"../../util":21}],8:[function(require,module,exports){
"use strict";

var _util = _interopRequireDefault(require("../../util"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _rt = loadRuntime();
_util["default"].exportTo("getBatteryInfo", _rt, ral);
_util["default"].exportTo("getBatteryInfoSync", _rt, ral);

},{"../../util":21}],9:[function(require,module,exports){
"use strict";

var _util = _interopRequireDefault(require("../../util"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _rt = loadRuntime();
_util["default"].exportTo("getFileSystemManager", _rt, ral);

},{"../../util":21}],10:[function(require,module,exports){
"use strict";

var _util = _interopRequireDefault(require("../util"));
var _feature = _interopRequireDefault(require("../feature"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
if (window.jsb) {
  window.ral = Object.assign({}, window.jsb);
} else {
  window.ral = {};
}
require("./base/lifecycle");
require("./base/subpackage");
require("./base/system-info");
require("./base/touch-event");
require("./device/accelerometer");
require("./device/battery");
require("./file/file-system-manager");
require("./interface/keyboard");
require("./interface/window");
require("./media/audio");
require("./media/video");
require("./network/download");
require("./rendering/canvas");
require("./rendering/webgl");
require("./rendering/font");
require("./rendering/frame");
require("./rendering/image");
for (var key in _feature["default"]) {
  if (key === "setFeature" || key === "registerFeatureProperty" || key === "unregisterFeatureProperty") {
    continue;
  }
  if (_feature["default"].hasOwnProperty(key)) {
    _util["default"].exportTo(key, _feature["default"], ral);
  }
}

},{"../feature":1,"../util":21,"./base/lifecycle":3,"./base/subpackage":4,"./base/system-info":5,"./base/touch-event":6,"./device/accelerometer":7,"./device/battery":8,"./file/file-system-manager":9,"./interface/keyboard":11,"./interface/window":12,"./media/audio":13,"./media/video":14,"./network/download":15,"./rendering/canvas":16,"./rendering/font":17,"./rendering/frame":18,"./rendering/image":19,"./rendering/webgl":20}],11:[function(require,module,exports){
"use strict";

var _util = _interopRequireDefault(require("../../util"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _rt = loadRuntime();
_util["default"].exportTo("onKeyboardInput", _rt, ral);
_util["default"].exportTo("onKeyboardConfirm", _rt, ral);
_util["default"].exportTo("onKeyboardComplete", _rt, ral);
_util["default"].exportTo("offKeyboardInput", _rt, ral);
_util["default"].exportTo("offKeyboardConfirm", _rt, ral);
_util["default"].exportTo("offKeyboardComplete", _rt, ral);
_util["default"].exportTo("hideKeyboard", _rt, ral);
_util["default"].exportTo("showKeyboard", _rt, ral);
_util["default"].exportTo("updateKeyboard", _rt, ral);

},{"../../util":21}],12:[function(require,module,exports){
"use strict";

var _rt = loadRuntime();
var _onWindowResize = _rt.onWindowResize;
ral.onWindowResize = function (callBack) {
  _onWindowResize(function (size) {
    callBack(size.width || size.windowWidth, size.height || size.windowHeight);
  });
};
window.resize = function () {
  console.warn('window.resize() is deprecated');
};

},{}],13:[function(require,module,exports){
"use strict";

var _innerContext = _interopRequireDefault(require("../../inner-context"));
var _util = _interopRequireDefault(require("../../util"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _rt = loadRuntime();
_util["default"].exportTo("AudioEngine", _rt, ral);
_util["default"].exportTo("createInnerAudioContext", _rt, ral, function () {
  if (_rt.AudioEngine) {
    ral.createInnerAudioContext = function () {
      return (0, _innerContext["default"])(_rt.AudioEngine);
    };
  }
});

},{"../../inner-context":2,"../../util":21}],14:[function(require,module,exports){
"use strict";

var _util = _interopRequireDefault(require("../../util"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _rt = loadRuntime();
_util["default"].exportTo("createVideo", _rt, ral);

},{"../../util":21}],15:[function(require,module,exports){
"use strict";

var _util = _interopRequireDefault(require("../../util"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _rt = loadRuntime();
_util["default"].exportTo("downloadFile", _rt, ral);

},{"../../util":21}],16:[function(require,module,exports){
"use strict";

var _util = _interopRequireDefault(require("../../util"));
var _feature = _interopRequireDefault(require("../../feature"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _rt = loadRuntime();
_util["default"].exportTo("createCanvas", _rt, ral, function () {
  var featureValue = "unsupported";
  if (document && typeof document.createElement === "function") {
    featureValue = "wrapper";
    ral.createCanvas = function () {
      return document.createElement("canvas");
    };
  }
  _feature["default"].setFeature("ral.createCanvas", "spec", featureValue);
});
var _rt_getFeature = _rt.getFeature;
var _rt_setFeature = _rt.setFeature;
_feature["default"].registerFeatureProperty(_feature["default"].CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC.name, function () {
  if (typeof _rt_getFeature === "function") {
    var value = _rt_getFeature(_feature["default"].CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC.name);
    switch (value) {
      case 1:
        return _feature["default"].CANVAS_CONTEXT2D_TEXTBASELINE_ALPHABETIC.enable;
      default:
        break;
    }
  }
  return _feature["default"].FEATURE_UNSUPPORT;
}, undefined);
_feature["default"].registerFeatureProperty(_feature["default"].CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT.name, function () {
  if (typeof _rt_getFeature === "function") {
    var value = _rt_getFeature(_feature["default"].CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT.name);
    switch (value) {
      case 1:
        return _feature["default"].CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT.alphabetic;
      case 0:
        return _feature["default"].CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT.bottom;
      default:
        break;
    }
  }
  return _feature["default"].FEATURE_UNSUPPORT;
}, function (value) {
  if (typeof _rt_setFeature === "function") {
    switch (value) {
      case _feature["default"].CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT.alphabetic:
        value = 1;
        break;
      case _feature["default"].CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT.bottom:
        value = 0;
        break;
      default:
        return false;
    }
    return _rt_setFeature(_feature["default"].CANVAS_CONTEXT2D_TEXTBASELINE_DEFAULT.name, value);
  }
  return false;
});

},{"../../feature":1,"../../util":21}],17:[function(require,module,exports){
"use strict";

var _util = _interopRequireDefault(require("../../util"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _rt = loadRuntime();
_util["default"].exportTo("loadFont", _rt, ral);

},{"../../util":21}],18:[function(require,module,exports){
"use strict";

var _rt = loadRuntime();
if (window.jsb && jsb.setPreferredFramesPerSecond) {
  ral.setPreferredFramesPerSecond = jsb.setPreferredFramesPerSecond.bind(jsb);
} else if (_rt.setPreferredFramesPerSecond) {
  ral.setPreferredFramesPerSecond = _rt.setPreferredFramesPerSecond.bind(_rt);
} else {
  ral.setPreferredFramesPerSecond = function () {
    console.error("The setPreferredFramesPerSecond is not define!");
  };
}

},{}],19:[function(require,module,exports){
"use strict";

var _util = _interopRequireDefault(require("../../util"));
var _feature = _interopRequireDefault(require("../../feature"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _rt = loadRuntime();
_util["default"].exportTo("loadImageData", _rt, ral);
_util["default"].exportTo("createImage", _rt, ral, function () {
  var featureValue = "unsupported";
  if (document && typeof document.createElement === "function") {
    featureValue = "wrapper";
    ral.createImage = function () {
      return document.createElement("image");
    };
  }
  _feature["default"].setFeature("ral.createImage", "spec", featureValue);
});

},{"../../feature":1,"../../util":21}],20:[function(require,module,exports){
"use strict";

if (window.__gl) {
  var gl = window.__gl;
  var _glTexImage2D = gl.texImage2D;
  gl.texImage2D = function (target, level, internalformat, width, height, border, format, type, pixels) {
    var argc = arguments.length;
    if (argc === 6) {
      var image = border;
      type = height;
      format = width;
      if (image instanceof HTMLImageElement) {
        var error = console.error;
        console.error = function () {};
        _glTexImage2D.apply(void 0, arguments);
        console.error = error;
        gl.texImage2D_image(target, level, image._imageMeta);
      } else if (image instanceof HTMLCanvasElement) {
        var _error = console.error;
        console.error = function () {};
        _glTexImage2D.apply(void 0, arguments);
        console.error = _error;
        var context2D = image.getContext('2d');
        gl.texImage2D_canvas(target, level, internalformat, format, type, context2D);
      } else if (image instanceof ImageData) {
        _glTexImage2D(target, level, internalformat, image.width, image.height, 0, format, type, image.data);
      } else {
        console.error("Invalid pixel argument passed to gl.texImage2D!");
      }
    } else if (argc === 9) {
      _glTexImage2D(target, level, internalformat, width, height, border, format, type, pixels);
    } else {
      console.error("gl.texImage2D: invalid argument count!");
    }
  };
  var _glTexSubImage2D = gl.texSubImage2D;
  gl.texSubImage2D = function (target, level, xoffset, yoffset, width, height, format, type, pixels) {
    var argc = arguments.length;
    if (argc === 7) {
      var image = format;
      type = height;
      format = width;
      if (image instanceof HTMLImageElement) {
        var error = console.error;
        console.error = function () {};
        _glTexSubImage2D.apply(void 0, arguments);
        console.error = error;
        gl.texSubImage2D_image(target, level, xoffset, yoffset, image._imageMeta);
      } else if (image instanceof HTMLCanvasElement) {
        var _error2 = console.error;
        console.error = function () {};
        _glTexSubImage2D.apply(void 0, arguments);
        console.error = _error2;
        var context2D = image.getContext('2d');
        gl.texSubImage2D_canvas(target, level, xoffset, yoffset, format, type, context2D);
      } else if (image instanceof ImageData) {
        _glTexSubImage2D(target, level, xoffset, yoffset, image.width, image.height, format, type, image.data);
      } else {
        console.error("Invalid pixel argument passed to gl.texImage2D!");
      }
    } else if (argc === 9) {
      _glTexSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels);
    } else {
      console.error(new Error("gl.texImage2D: invalid argument count!").stack);
    }
  };
}

},{}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _default = exports["default"] = {
  exportTo: function exportTo(name, from, to, errCallback, successCallback) {
    if (_typeof(from) !== "object" || _typeof(to) !== "object") {
      console.warn("invalid exportTo: ", name);
      return;
    }
    var fromProperty = from[name];
    if (typeof fromProperty !== "undefined") {
      if (typeof fromProperty === "function") {
        to[name] = fromProperty.bind(from);
        Object.assign(to[name], fromProperty);
      } else {
        to[name] = fromProperty;
      }
      if (typeof successCallback === "function") {
        successCallback();
      }
    } else {
      to[name] = function () {
        console.error(name + " is not support!");
        return {};
      };
      if (typeof errCallback === "function") {
        errCallback();
      }
    }
  }
};

},{}]},{},[10]);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJyYWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xudmFyIF9mZWF0dXJlcyA9IHt9O1xudmFyIF9nZXRDYWxsYmFja3MgPSB7fTtcbnZhciBfc2V0Q2FsbGJhY2tzID0ge307XG52YXIgX0ZFQVRVUkVfVU5TVVBQT1JUID0gLTE7XG52YXIgX2RlZmF1bHQgPSBleHBvcnRzW1wiZGVmYXVsdFwiXSA9IHtcbiAgRkVBVFVSRV9VTlNVUFBPUlQ6IF9GRUFUVVJFX1VOU1VQUE9SVCxcbiAgQ0FOVkFTX0NPTlRFWFQyRF9URVhUQkFTRUxJTkVfQUxQSEFCRVRJQzoge1xuICAgIG5hbWU6IFwiY2FudmFzLmNvbnRleHQyZC50ZXh0YmFzZWxpbmUuYWxwaGFiZXRpY1wiLFxuICAgIGVuYWJsZTogMSxcbiAgICBkaXNhYmxlOiAwXG4gIH0sXG4gIENBTlZBU19DT05URVhUMkRfVEVYVEJBU0VMSU5FX0RFRkFVTFQ6IHtcbiAgICBuYW1lOiBcImNhbnZhcy5jb250ZXh0MmQudGV4dGJhc2VsaW5lLmRlZmF1bHRcIixcbiAgICBhbHBoYWJldGljOiAxLFxuICAgIGJvdHRvbTogMFxuICB9LFxuICBzZXRGZWF0dXJlOiBmdW5jdGlvbiBzZXRGZWF0dXJlKGZlYXR1cmVOYW1lLCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgICB2YXIgZmVhdHVyZSA9IF9mZWF0dXJlc1tmZWF0dXJlTmFtZV07XG4gICAgaWYgKCFmZWF0dXJlKSB7XG4gICAgICBmZWF0dXJlID0gX2ZlYXR1cmVzW2ZlYXR1cmVOYW1lXSA9IHt9O1xuICAgIH1cbiAgICBmZWF0dXJlW3Byb3BlcnR5XSA9IHZhbHVlO1xuICB9LFxuICBnZXRGZWF0dXJlUHJvcGVydHk6IGZ1bmN0aW9uIGdldEZlYXR1cmVQcm9wZXJ0eShmZWF0dXJlTmFtZSwgcHJvcGVydHkpIHtcbiAgICB2YXIgZmVhdHVyZSA9IF9mZWF0dXJlc1tmZWF0dXJlTmFtZV07XG4gICAgcmV0dXJuIGZlYXR1cmUgPyBmZWF0dXJlW3Byb3BlcnR5XSA6IHVuZGVmaW5lZDtcbiAgfSxcbiAgcmVnaXN0ZXJGZWF0dXJlUHJvcGVydHk6IGZ1bmN0aW9uIHJlZ2lzdGVyRmVhdHVyZVByb3BlcnR5KGtleSwgZ2V0RnVuY3Rpb24sIHNldEZ1bmN0aW9uKSB7XG4gICAgaWYgKHR5cGVvZiBrZXkgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBnZXRGdW5jdGlvbiAhPT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBzZXRGdW5jdGlvbiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZ2V0RnVuY3Rpb24gPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgX2dldENhbGxiYWNrc1trZXldID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBzZXRGdW5jdGlvbiA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBfc2V0Q2FsbGJhY2tzW2tleV0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGdldEZ1bmN0aW9uID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIF9nZXRDYWxsYmFja3Nba2V5XSA9IGdldEZ1bmN0aW9uO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHNldEZ1bmN0aW9uID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIF9zZXRDYWxsYmFja3Nba2V5XSA9IHNldEZ1bmN0aW9uO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgdW5yZWdpc3RlckZlYXR1cmVQcm9wZXJ0eTogZnVuY3Rpb24gdW5yZWdpc3RlckZlYXR1cmVQcm9wZXJ0eShrZXksIGdldEJvb2wsIHNldEJvb2wpIHtcbiAgICBpZiAodHlwZW9mIGtleSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGdldEJvb2wgIT09IFwiYm9vbGVhblwiIHx8IHR5cGVvZiBzZXRCb29sICE9PSBcImJvb2xlYW5cIikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoZ2V0Qm9vbCA9PT0gdHJ1ZSAmJiB0eXBlb2YgX2dldENhbGxiYWNrc1trZXldID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIF9nZXRDYWxsYmFja3Nba2V5XSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHNldEJvb2wgPT09IHRydWUgJiYgdHlwZW9mIF9zZXRDYWxsYmFja3Nba2V5XSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBfc2V0Q2FsbGJhY2tzW2tleV0gPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBnZXRGZWF0dXJlUHJvcGVydHlJbnQ6IGZ1bmN0aW9uIGdldEZlYXR1cmVQcm9wZXJ0eUludChrZXkpIHtcbiAgICBpZiAodHlwZW9mIGtleSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgcmV0dXJuIF9GRUFUVVJFX1VOU1VQUE9SVDtcbiAgICB9XG4gICAgdmFyIGdldEZ1bmN0aW9uID0gX2dldENhbGxiYWNrc1trZXldO1xuICAgIGlmIChnZXRGdW5jdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gX0ZFQVRVUkVfVU5TVVBQT1JUO1xuICAgIH1cbiAgICB2YXIgdmFsdWUgPSBnZXRGdW5jdGlvbigpO1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIpIHtcbiAgICAgIHJldHVybiBfRkVBVFVSRV9VTlNVUFBPUlQ7XG4gICAgfVxuICAgIGlmICh2YWx1ZSA8IF9GRUFUVVJFX1VOU1VQUE9SVCkge1xuICAgICAgdmFsdWUgPSBfRkVBVFVSRV9VTlNVUFBPUlQ7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcbiAgc2V0RmVhdHVyZVByb3BlcnR5SW50OiBmdW5jdGlvbiBzZXRGZWF0dXJlUHJvcGVydHlJbnQoa2V5LCB2YWx1ZSkge1xuICAgIGlmICh0eXBlb2Yga2V5ICE9PSBcInN0cmluZ1wiICYmIHR5cGVvZiB2YWx1ZSAhPT0gXCJudW1iZXJcIiAmJiB2YWx1ZSA8IDApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIHNldEZ1bmN0aW9uID0gX3NldENhbGxiYWNrc1trZXldO1xuICAgIGlmIChzZXRGdW5jdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciByZXR1cm5Db2RlID0gc2V0RnVuY3Rpb24odmFsdWUpO1xuICAgIGlmICh0eXBlb2YgcmV0dXJuQ29kZSAhPT0gXCJudW1iZXJcIiAmJiB0eXBlb2YgcmV0dXJuQ29kZSAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5Db2RlID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG59O1xuXG59LHt9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBfZGVmYXVsdDtcbnZhciBfQ0FOUExBWV9DQUxMQkFDSyA9IFwiY2FucGxheUNhbGxiYWNrc1wiO1xudmFyIF9FTkRFRF9DQUxMQkFDSyA9IFwiZW5kZWRDYWxsYmFja3NcIjtcbnZhciBfRVJST1JfQ0FMTEJBQ0sgPSBcImVycm9yQ2FsbGJhY2tzXCI7XG52YXIgX1BBVVNFX0NBTExCQUNLID0gXCJwYXVzZUNhbGxiYWNrc1wiO1xudmFyIF9QTEFZX0NBTExCQUNLID0gXCJwbGF5Q2FsbGJhY2tzXCI7XG52YXIgX1NFRUtFRF9DQUxMQkFDSyA9IFwic2Vla2VkQ2FsbGJhY2tzXCI7XG52YXIgX1NFRUtJTkdfQ0FMTEJBQ0sgPSBcInNlZWtpbmdDYWxsYmFja3NcIjtcbnZhciBfU1RPUF9DQUxMQkFDSyA9IFwic3RvcENhbGxiYWNrc1wiO1xudmFyIF9USU1FX1VQREFURV9DQUxMQkFDSyA9IFwidGltZVVwZGF0ZUNhbGxiYWNrc1wiO1xudmFyIF9XQUlUSU5HX0NBTExCQUNLID0gXCJ3YWl0aW5nQ2FsbGJhY2tzXCI7XG52YXIgX0VSUk9SX0NPREUgPSB7XG4gIEVSUk9SX1NZU1RFTTogMTAwMDEsXG4gIEVSUk9SX05FVDogMTAwMDIsXG4gIEVSUk9SX0ZJTEU6IDEwMDAzLFxuICBFUlJPUl9GT1JNQVQ6IDEwMDA0LFxuICBFUlJPUl9VTktOT1dOOiAtMVxufTtcbnZhciBfU1RBVEUgPSB7XG4gIEVSUk9SOiAtMSxcbiAgSU5JVElBTElaSU5HOiAwLFxuICBQTEFZSU5HOiAxLFxuICBQQVVTRUQ6IDJcbn07XG52YXIgX2F1ZGlvRW5naW5lID0gdW5kZWZpbmVkO1xudmFyIF93ZWFrTWFwID0gbmV3IFdlYWtNYXAoKTtcbnZhciBfb2ZmQ2FsbGJhY2sgPSBmdW5jdGlvbiBfb2ZmQ2FsbGJhY2sodGFyZ2V0LCB0eXBlLCBjYWxsYmFjaykge1xuICB2YXIgcHJpdmF0ZVRoaXMgPSBfd2Vha01hcC5nZXQodGFyZ2V0KTtcbiAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiIHx8ICFwcml2YXRlVGhpcykge1xuICAgIHJldHVybiAtMTtcbiAgfVxuICB2YXIgY2FsbGJhY2tzID0gcHJpdmF0ZVRoaXNbdHlwZV0gfHwgW107XG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjYWxsYmFja3MubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAoY2FsbGJhY2sgPT09IGNhbGxiYWNrc1tpXSkge1xuICAgICAgY2FsbGJhY2tzLnNwbGljZShpLCAxKTtcbiAgICAgIHJldHVybiBjYWxsYmFjay5sZW5ndGggKyAxO1xuICAgIH1cbiAgfVxuICByZXR1cm4gMDtcbn07XG52YXIgX29uQ2FsbGJhY2sgPSBmdW5jdGlvbiBfb25DYWxsYmFjayh0YXJnZXQsIHR5cGUsIGNhbGxiYWNrKSB7XG4gIHZhciBwcml2YXRlVGhpcyA9IF93ZWFrTWFwLmdldCh0YXJnZXQpO1xuICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIgfHwgIXByaXZhdGVUaGlzKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9XG4gIHZhciBjYWxsYmFja3MgPSBwcml2YXRlVGhpc1t0eXBlXTtcbiAgaWYgKCFjYWxsYmFja3MpIHtcbiAgICBjYWxsYmFja3MgPSBwcml2YXRlVGhpc1t0eXBlXSA9IFtjYWxsYmFja107XG4gIH0gZWxzZSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNhbGxiYWNrcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgaWYgKGNhbGxiYWNrID09PSBjYWxsYmFja3NbaV0pIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgfVxuICAgIGNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbiAgfVxuICByZXR1cm4gY2FsbGJhY2tzLmxlbmd0aDtcbn07XG52YXIgX2Rpc3BhdGNoQ2FsbGJhY2sgPSBmdW5jdGlvbiBfZGlzcGF0Y2hDYWxsYmFjayh0YXJnZXQsIHR5cGUpIHtcbiAgdmFyIGFyZ3MgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IFtdO1xuICB2YXIgcHJpdmF0ZVRoaXMgPSBfd2Vha01hcC5nZXQodGFyZ2V0KTtcbiAgaWYgKHByaXZhdGVUaGlzKSB7XG4gICAgdmFyIGNhbGxiYWNrcyA9IHByaXZhdGVUaGlzW3R5cGVdIHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjYWxsYmFja3MubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIGNhbGxiYWNrc1tpXS5hcHBseSh0YXJnZXQsIGFyZ3MpO1xuICAgIH1cbiAgfVxufTtcbmZ1bmN0aW9uIElubmVyQXVkaW9Db250ZXh0KCkge1xuICB0aGlzLnN0YXJ0VGltZSA9IDA7XG4gIHRoaXMuYXV0b3BsYXkgPSBmYWxzZTtcbiAgX3dlYWtNYXAuc2V0KHRoaXMsIHtcbiAgICBzcmM6IFwiXCIsXG4gICAgdm9sdW1lOiAxLFxuICAgIGxvb3A6IGZhbHNlLFxuICAgIHNlZWtQb3NpdGlvbjogLTFcbiAgfSk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImxvb3BcIiwge1xuICAgIHNldDogZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgICB2YWx1ZSA9ICEhdmFsdWU7XG4gICAgICB2YXIgcHJpdmF0ZVRoaXMgPSBfd2Vha01hcC5nZXQodGhpcyk7XG4gICAgICBpZiAocHJpdmF0ZVRoaXMpIHtcbiAgICAgICAgdmFyIGF1ZGlvSUQgPSBwcml2YXRlVGhpcy5hdWRpb0lEO1xuICAgICAgICBpZiAodHlwZW9mIGF1ZGlvSUQgPT09IFwibnVtYmVyXCIgJiYgYXVkaW9JRCA+PSAwKSB7XG4gICAgICAgICAgX2F1ZGlvRW5naW5lLnNldExvb3AoYXVkaW9JRCwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHByaXZhdGVUaGlzLmxvb3AgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgdmFyIHByaXZhdGVUaGlzID0gX3dlYWtNYXAuZ2V0KHRoaXMpO1xuICAgICAgcmV0dXJuIHByaXZhdGVUaGlzID8gcHJpdmF0ZVRoaXMubG9vcCA6IGZhbHNlO1xuICAgIH1cbiAgfSk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcInZvbHVtZVwiLCB7XG4gICAgc2V0OiBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgaWYgKHZhbHVlIDwgMCkge1xuICAgICAgICAgIHZhbHVlID0gMDtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA+IDEpIHtcbiAgICAgICAgICB2YWx1ZSA9IDE7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gMTtcbiAgICAgIH1cbiAgICAgIHZhciBwcml2YXRlVGhpcyA9IF93ZWFrTWFwLmdldCh0aGlzKTtcbiAgICAgIGlmIChwcml2YXRlVGhpcykge1xuICAgICAgICB2YXIgYXVkaW9JRCA9IHByaXZhdGVUaGlzLmF1ZGlvSUQ7XG4gICAgICAgIGlmICh0eXBlb2YgYXVkaW9JRCA9PT0gXCJudW1iZXJcIiAmJiBhdWRpb0lEID49IDApIHtcbiAgICAgICAgICBfYXVkaW9FbmdpbmUuc2V0Vm9sdW1lKGF1ZGlvSUQsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBwcml2YXRlVGhpcy52b2x1bWUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgdmFyIHByaXZhdGVUaGlzID0gX3dlYWtNYXAuZ2V0KHRoaXMpO1xuICAgICAgcmV0dXJuIHByaXZhdGVUaGlzID8gcHJpdmF0ZVRoaXMudm9sdW1lIDogMTtcbiAgICB9XG4gIH0pO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJzcmNcIiwge1xuICAgIHNldDogZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgICB2YXIgcHJpdmF0ZVRoaXMgPSBfd2Vha01hcC5nZXQodGhpcyk7XG4gICAgICBpZiAoIXByaXZhdGVUaGlzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBvbGRTcmMgPSBwcml2YXRlVGhpcy5zcmM7XG4gICAgICBwcml2YXRlVGhpcy5zcmMgPSB2YWx1ZTtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdmFyIGF1ZGlvSUQgPSBwcml2YXRlVGhpcy5hdWRpb0lEO1xuICAgICAgICBpZiAodHlwZW9mIGF1ZGlvSUQgPT09IFwibnVtYmVyXCIgJiYgYXVkaW9JRCA+PSAwICYmIF9hdWRpb0VuZ2luZS5nZXRTdGF0ZShhdWRpb0lEKSA9PT0gX1NUQVRFLlBBVVNFRCAmJiBvbGRTcmMgIT09IHZhbHVlKSB7XG4gICAgICAgICAgX2F1ZGlvRW5naW5lLnN0b3AoYXVkaW9JRCk7XG4gICAgICAgICAgcHJpdmF0ZVRoaXMuYXVkaW9JRCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgX2F1ZGlvRW5naW5lLnByZWxvYWQodmFsdWUsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChzZWxmLnNyYyA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgX2Rpc3BhdGNoQ2FsbGJhY2soc2VsZiwgX0NBTlBMQVlfQ0FMTEJBQ0spO1xuICAgICAgICAgICAgICBpZiAoc2VsZi5hdXRvcGxheSkge1xuICAgICAgICAgICAgICAgIHNlbGYucGxheSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICB2YXIgcHJpdmF0ZVRoaXMgPSBfd2Vha01hcC5nZXQodGhpcyk7XG4gICAgICByZXR1cm4gcHJpdmF0ZVRoaXMgPyBwcml2YXRlVGhpcy5zcmMgOiBcIlwiO1xuICAgIH1cbiAgfSk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImR1cmF0aW9uXCIsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHZhciBwcml2YXRlVGhpcyA9IF93ZWFrTWFwLmdldCh0aGlzKTtcbiAgICAgIGlmIChwcml2YXRlVGhpcykge1xuICAgICAgICB2YXIgYXVkaW9JRCA9IHByaXZhdGVUaGlzLmF1ZGlvSUQ7XG4gICAgICAgIGlmICh0eXBlb2YgYXVkaW9JRCA9PT0gXCJudW1iZXJcIiAmJiBhdWRpb0lEID49IDApIHtcbiAgICAgICAgICByZXR1cm4gX2F1ZGlvRW5naW5lLmdldER1cmF0aW9uKGF1ZGlvSUQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gTmFOO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQoKSB7fVxuICB9KTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiY3VycmVudFRpbWVcIiwge1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgdmFyIHByaXZhdGVUaGlzID0gX3dlYWtNYXAuZ2V0KHRoaXMpO1xuICAgICAgaWYgKHByaXZhdGVUaGlzKSB7XG4gICAgICAgIHZhciBhdWRpb0lEID0gcHJpdmF0ZVRoaXMuYXVkaW9JRDtcbiAgICAgICAgaWYgKHR5cGVvZiBhdWRpb0lEID09PSBcIm51bWJlclwiICYmIGF1ZGlvSUQgPj0gMCkge1xuICAgICAgICAgIHJldHVybiBfYXVkaW9FbmdpbmUuZ2V0Q3VycmVudFRpbWUoYXVkaW9JRCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAwO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQoKSB7fVxuICB9KTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwicGF1c2VkXCIsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHZhciBwcml2YXRlVGhpcyA9IF93ZWFrTWFwLmdldCh0aGlzKTtcbiAgICAgIGlmIChwcml2YXRlVGhpcykge1xuICAgICAgICB2YXIgYXVkaW9JRCA9IHByaXZhdGVUaGlzLmF1ZGlvSUQ7XG4gICAgICAgIGlmICh0eXBlb2YgYXVkaW9JRCA9PT0gXCJudW1iZXJcIiAmJiBhdWRpb0lEID49IDApIHtcbiAgICAgICAgICByZXR1cm4gX2F1ZGlvRW5naW5lLmdldFN0YXRlKGF1ZGlvSUQpID09PSBfU1RBVEUuUEFVU0VEO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gc2V0KCkge31cbiAgfSk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImJ1ZmZlcmVkXCIsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHZhciBwcml2YXRlVGhpcyA9IF93ZWFrTWFwLmdldCh0aGlzKTtcbiAgICAgIGlmIChwcml2YXRlVGhpcykge1xuICAgICAgICB2YXIgYXVkaW9JRCA9IHByaXZhdGVUaGlzLmF1ZGlvSUQ7XG4gICAgICAgIGlmICh0eXBlb2YgYXVkaW9JRCA9PT0gXCJudW1iZXJcIiAmJiBhdWRpb0lEID49IDApIHtcbiAgICAgICAgICByZXR1cm4gX2F1ZGlvRW5naW5lLmdldEJ1ZmZlcmVkKGF1ZGlvSUQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gMDtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gc2V0KCkge31cbiAgfSk7XG59XG52YXIgX3Byb3RvdHlwZSA9IElubmVyQXVkaW9Db250ZXh0LnByb3RvdHlwZTtcbl9wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHByaXZhdGVUaGlzID0gX3dlYWtNYXAuZ2V0KHRoaXMpO1xuICBpZiAocHJpdmF0ZVRoaXMpIHtcbiAgICB2YXIgYXVkaW9JRCA9IHByaXZhdGVUaGlzLmF1ZGlvSUQ7XG4gICAgaWYgKHR5cGVvZiBhdWRpb0lEID09PSBcIm51bWJlclwiICYmIGF1ZGlvSUQgPj0gMCkge1xuICAgICAgX2F1ZGlvRW5naW5lLnN0b3AoYXVkaW9JRCk7XG4gICAgICBwcml2YXRlVGhpcy5hdWRpb0lEID0gLTE7XG4gICAgICBfZGlzcGF0Y2hDYWxsYmFjayh0aGlzLCBfU1RPUF9DQUxMQkFDSyk7XG4gICAgfVxuICAgIHByaXZhdGVUaGlzW19DQU5QTEFZX0NBTExCQUNLXSA9IFtdO1xuICAgIHByaXZhdGVUaGlzW19FTkRFRF9DQUxMQkFDS10gPSBbXTtcbiAgICBwcml2YXRlVGhpc1tfRVJST1JfQ0FMTEJBQ0tdID0gW107XG4gICAgcHJpdmF0ZVRoaXNbX1BBVVNFX0NBTExCQUNLXSA9IFtdO1xuICAgIHByaXZhdGVUaGlzW19QTEFZX0NBTExCQUNLXSA9IFtdO1xuICAgIHByaXZhdGVUaGlzW19TRUVLRURfQ0FMTEJBQ0tdID0gW107XG4gICAgcHJpdmF0ZVRoaXNbX1NFRUtJTkdfQ0FMTEJBQ0tdID0gW107XG4gICAgcHJpdmF0ZVRoaXNbX1NUT1BfQ0FMTEJBQ0tdID0gW107XG4gICAgcHJpdmF0ZVRoaXNbX1RJTUVfVVBEQVRFX0NBTExCQUNLXSA9IFtdO1xuICAgIHByaXZhdGVUaGlzW19XQUlUSU5HX0NBTExCQUNLXSA9IFtdO1xuICAgIGNsZWFySW50ZXJ2YWwocHJpdmF0ZVRoaXMuaW50ZXJ2YWxJRCk7XG4gIH1cbn07XG5fcHJvdG90eXBlLnBsYXkgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBwcml2YXRlVGhpcyA9IF93ZWFrTWFwLmdldCh0aGlzKTtcbiAgaWYgKCFwcml2YXRlVGhpcykge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgc3JjID0gcHJpdmF0ZVRoaXMuc3JjO1xuICB2YXIgYXVkaW9JRCA9IHByaXZhdGVUaGlzLmF1ZGlvSUQ7XG4gIGlmICh0eXBlb2Ygc3JjICE9PSBcInN0cmluZ1wiIHx8IHNyYyA9PT0gXCJcIikge1xuICAgIF9kaXNwYXRjaENhbGxiYWNrKHRoaXMsIF9FUlJPUl9DQUxMQkFDSywgW3tcbiAgICAgIGVyck1zZzogXCJpbnZhbGlkIHNyY1wiLFxuICAgICAgZXJyQ29kZTogX0VSUk9SX0NPREUuRVJST1JfRklMRVxuICAgIH1dKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHR5cGVvZiBhdWRpb0lEID09PSBcIm51bWJlclwiICYmIGF1ZGlvSUQgPj0gMCkge1xuICAgIGlmIChfYXVkaW9FbmdpbmUuZ2V0U3RhdGUoYXVkaW9JRCkgPT09IF9TVEFURS5QQVVTRUQpIHtcbiAgICAgIF9hdWRpb0VuZ2luZS5yZXN1bWUoYXVkaW9JRCk7XG4gICAgICBfZGlzcGF0Y2hDYWxsYmFjayh0aGlzLCBfUExBWV9DQUxMQkFDSyk7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIF9hdWRpb0VuZ2luZS5zdG9wKGF1ZGlvSUQpO1xuICAgICAgcHJpdmF0ZVRoaXMuYXVkaW9JRCA9IC0xO1xuICAgIH1cbiAgfVxuICBhdWRpb0lEID0gX2F1ZGlvRW5naW5lLnBsYXkoc3JjLCB0aGlzLmxvb3AsIHRoaXMudm9sdW1lKTtcbiAgaWYgKGF1ZGlvSUQgPT09IC0xKSB7XG4gICAgX2Rpc3BhdGNoQ2FsbGJhY2sodGhpcywgX0VSUk9SX0NBTExCQUNLLCBbe1xuICAgICAgZXJyTXNnOiBcInVua25vd25cIixcbiAgICAgIGVyckNvZGU6IF9FUlJPUl9DT0RFLkVSUk9SX1VOS05PV05cbiAgICB9XSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHByaXZhdGVUaGlzLmF1ZGlvSUQgPSBhdWRpb0lEO1xuICBpZiAocHJpdmF0ZVRoaXMuc2Vla1Bvc2l0aW9uID49IDApIHtcbiAgICBfYXVkaW9FbmdpbmUuc2V0Q3VycmVudFRpbWUoYXVkaW9JRCwgcHJpdmF0ZVRoaXMuc2Vla1Bvc2l0aW9uKTtcbiAgICBwcml2YXRlVGhpcy5zZWVrUG9zaXRpb24gPSAtMTtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuc3RhcnRUaW1lID09PSBcIm51bWJlclwiICYmIHRoaXMuc3RhcnRUaW1lID4gMCkge1xuICAgICAgX2F1ZGlvRW5naW5lLnNldEN1cnJlbnRUaW1lKGF1ZGlvSUQsIHRoaXMuc3RhcnRUaW1lKTtcbiAgICB9XG4gIH1cbiAgX2Rpc3BhdGNoQ2FsbGJhY2sodGhpcywgX1dBSVRJTkdfQ0FMTEJBQ0spO1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIF9hdWRpb0VuZ2luZS5zZXRDYW5QbGF5Q2FsbGJhY2soYXVkaW9JRCwgZnVuY3Rpb24gKCkge1xuICAgIGlmIChzcmMgPT09IHNlbGYuc3JjKSB7XG4gICAgICBfZGlzcGF0Y2hDYWxsYmFjayhzZWxmLCBfQ0FOUExBWV9DQUxMQkFDSyk7XG4gICAgICBfZGlzcGF0Y2hDYWxsYmFjayhzZWxmLCBfUExBWV9DQUxMQkFDSyk7XG4gICAgfVxuICB9KTtcbiAgX2F1ZGlvRW5naW5lLnNldFdhaXRpbmdDYWxsYmFjayhhdWRpb0lELCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHNyYyA9PT0gc2VsZi5zcmMpIHtcbiAgICAgIF9kaXNwYXRjaENhbGxiYWNrKHNlbGYsIF9XQUlUSU5HX0NBTExCQUNLKTtcbiAgICB9XG4gIH0pO1xuICBfYXVkaW9FbmdpbmUuc2V0RXJyb3JDYWxsYmFjayhhdWRpb0lELCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHNyYyA9PT0gc2VsZi5zcmMpIHtcbiAgICAgIHByaXZhdGVUaGlzLmF1ZGlvSUQgPSAtMTtcbiAgICAgIF9kaXNwYXRjaENhbGxiYWNrKHNlbGYsIF9FUlJPUl9DQUxMQkFDSyk7XG4gICAgfVxuICB9KTtcbiAgX2F1ZGlvRW5naW5lLnNldEZpbmlzaENhbGxiYWNrKGF1ZGlvSUQsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoc3JjID09PSBzZWxmLnNyYykge1xuICAgICAgcHJpdmF0ZVRoaXMuYXVkaW9JRCA9IC0xO1xuICAgICAgX2Rpc3BhdGNoQ2FsbGJhY2soc2VsZiwgX0VOREVEX0NBTExCQUNLKTtcbiAgICB9XG4gIH0pO1xufTtcbl9wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBwcml2YXRlVGhpcyA9IF93ZWFrTWFwLmdldCh0aGlzKTtcbiAgaWYgKHByaXZhdGVUaGlzKSB7XG4gICAgdmFyIGF1ZGlvSUQgPSBwcml2YXRlVGhpcy5hdWRpb0lEO1xuICAgIGlmICh0eXBlb2YgYXVkaW9JRCA9PT0gXCJudW1iZXJcIiAmJiBhdWRpb0lEID49IDApIHtcbiAgICAgIF9hdWRpb0VuZ2luZS5wYXVzZShhdWRpb0lEKTtcbiAgICAgIF9kaXNwYXRjaENhbGxiYWNrKHRoaXMsIF9QQVVTRV9DQUxMQkFDSyk7XG4gICAgfVxuICB9XG59O1xuX3Byb3RvdHlwZS5zZWVrID0gZnVuY3Rpb24gKHBvc2l0aW9uKSB7XG4gIHZhciBwcml2YXRlVGhpcyA9IF93ZWFrTWFwLmdldCh0aGlzKTtcbiAgaWYgKHByaXZhdGVUaGlzICYmIHR5cGVvZiBwb3NpdGlvbiA9PT0gXCJudW1iZXJcIiAmJiBwb3NpdGlvbiA+PSAwKSB7XG4gICAgdmFyIGF1ZGlvSUQgPSBwcml2YXRlVGhpcy5hdWRpb0lEO1xuICAgIGlmICh0eXBlb2YgYXVkaW9JRCA9PT0gXCJudW1iZXJcIiAmJiBhdWRpb0lEID49IDApIHtcbiAgICAgIF9hdWRpb0VuZ2luZS5zZXRDdXJyZW50VGltZShhdWRpb0lELCBwb3NpdGlvbik7XG4gICAgICBfZGlzcGF0Y2hDYWxsYmFjayh0aGlzLCBfU0VFS0lOR19DQUxMQkFDSyk7XG4gICAgICBfZGlzcGF0Y2hDYWxsYmFjayh0aGlzLCBfU0VFS0VEX0NBTExCQUNLKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJpdmF0ZVRoaXMuc2Vla1Bvc2l0aW9uID0gcG9zaXRpb247XG4gICAgfVxuICB9XG59O1xuX3Byb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24gKCkge1xuICB2YXIgcHJpdmF0ZVRoaXMgPSBfd2Vha01hcC5nZXQodGhpcyk7XG4gIGlmIChwcml2YXRlVGhpcykge1xuICAgIHZhciBhdWRpb0lEID0gcHJpdmF0ZVRoaXMuYXVkaW9JRDtcbiAgICBpZiAodHlwZW9mIGF1ZGlvSUQgPT09IFwibnVtYmVyXCIgJiYgYXVkaW9JRCA+PSAwKSB7XG4gICAgICBfYXVkaW9FbmdpbmUuc3RvcChhdWRpb0lEKTtcbiAgICAgIHByaXZhdGVUaGlzLmF1ZGlvSUQgPSAtMTtcbiAgICAgIF9kaXNwYXRjaENhbGxiYWNrKHRoaXMsIF9TVE9QX0NBTExCQUNLKTtcbiAgICB9XG4gIH1cbn07XG5fcHJvdG90eXBlLm9mZkNhbnBsYXkgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgX29mZkNhbGxiYWNrKHRoaXMsIF9DQU5QTEFZX0NBTExCQUNLLCBjYWxsYmFjayk7XG59O1xuX3Byb3RvdHlwZS5vZmZFbmRlZCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICBfb2ZmQ2FsbGJhY2sodGhpcywgX0VOREVEX0NBTExCQUNLLCBjYWxsYmFjayk7XG59O1xuX3Byb3RvdHlwZS5vZmZFcnJvciA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICBfb2ZmQ2FsbGJhY2sodGhpcywgX0VSUk9SX0NBTExCQUNLLCBjYWxsYmFjayk7XG59O1xuX3Byb3RvdHlwZS5vZmZQYXVzZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICBfb2ZmQ2FsbGJhY2sodGhpcywgX1BBVVNFX0NBTExCQUNLLCBjYWxsYmFjayk7XG59O1xuX3Byb3RvdHlwZS5vZmZQbGF5ID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIF9vZmZDYWxsYmFjayh0aGlzLCBfUExBWV9DQUxMQkFDSywgY2FsbGJhY2spO1xufTtcbl9wcm90b3R5cGUub2ZmU2Vla2VkID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIF9vZmZDYWxsYmFjayh0aGlzLCBfU0VFS0VEX0NBTExCQUNLLCBjYWxsYmFjayk7XG59O1xuX3Byb3RvdHlwZS5vZmZTZWVraW5nID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIF9vZmZDYWxsYmFjayh0aGlzLCBfU0VFS0lOR19DQUxMQkFDSywgY2FsbGJhY2spO1xufTtcbl9wcm90b3R5cGUub2ZmU3RvcCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICBfb2ZmQ2FsbGJhY2sodGhpcywgX1NUT1BfQ0FMTEJBQ0ssIGNhbGxiYWNrKTtcbn07XG5fcHJvdG90eXBlLm9mZlRpbWVVcGRhdGUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgdmFyIHJlc3VsdCA9IF9vZmZDYWxsYmFjayh0aGlzLCBfVElNRV9VUERBVEVfQ0FMTEJBQ0ssIGNhbGxiYWNrKTtcbiAgaWYgKHJlc3VsdCA9PT0gMSkge1xuICAgIGNsZWFySW50ZXJ2YWwoX3dlYWtNYXAuZ2V0KHRoaXMpLmludGVydmFsSUQpO1xuICB9XG59O1xuX3Byb3RvdHlwZS5vZmZXYWl0aW5nID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIF9vZmZDYWxsYmFjayh0aGlzLCBfV0FJVElOR19DQUxMQkFDSywgY2FsbGJhY2spO1xufTtcbl9wcm90b3R5cGUub25DYW5wbGF5ID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIF9vbkNhbGxiYWNrKHRoaXMsIF9DQU5QTEFZX0NBTExCQUNLLCBjYWxsYmFjayk7XG59O1xuX3Byb3RvdHlwZS5vbkVuZGVkID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIF9vbkNhbGxiYWNrKHRoaXMsIF9FTkRFRF9DQUxMQkFDSywgY2FsbGJhY2spO1xufTtcbl9wcm90b3R5cGUub25FcnJvciA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICBfb25DYWxsYmFjayh0aGlzLCBfRVJST1JfQ0FMTEJBQ0ssIGNhbGxiYWNrKTtcbn07XG5fcHJvdG90eXBlLm9uUGF1c2UgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgX29uQ2FsbGJhY2sodGhpcywgX1BBVVNFX0NBTExCQUNLLCBjYWxsYmFjayk7XG59O1xuX3Byb3RvdHlwZS5vblBsYXkgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgX29uQ2FsbGJhY2sodGhpcywgX1BMQVlfQ0FMTEJBQ0ssIGNhbGxiYWNrKTtcbn07XG5fcHJvdG90eXBlLm9uU2Vla2VkID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIF9vbkNhbGxiYWNrKHRoaXMsIF9TRUVLRURfQ0FMTEJBQ0ssIGNhbGxiYWNrKTtcbn07XG5fcHJvdG90eXBlLm9uU2Vla2luZyA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICBfb25DYWxsYmFjayh0aGlzLCBcInNlZWtpbmdDYWxsYmFja3NcIiwgY2FsbGJhY2spO1xufTtcbl9wcm90b3R5cGUub25TdG9wID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIF9vbkNhbGxiYWNrKHRoaXMsIF9TVE9QX0NBTExCQUNLLCBjYWxsYmFjayk7XG59O1xuX3Byb3RvdHlwZS5vblRpbWVVcGRhdGUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgdmFyIHJlc3VsdCA9IF9vbkNhbGxiYWNrKHRoaXMsIF9USU1FX1VQREFURV9DQUxMQkFDSywgY2FsbGJhY2spO1xuICBpZiAocmVzdWx0ID09PSAxKSB7XG4gICAgdmFyIHByaXZhdGVUaGlzID0gX3dlYWtNYXAuZ2V0KHRoaXMpO1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgaW50ZXJ2YWxJRCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBwcml2YXRlVGhpcyA9IF93ZWFrTWFwLmdldChzZWxmKTtcbiAgICAgIGlmIChwcml2YXRlVGhpcykge1xuICAgICAgICB2YXIgYXVkaW9JRCA9IHByaXZhdGVUaGlzLmF1ZGlvSUQ7XG4gICAgICAgIGlmICh0eXBlb2YgYXVkaW9JRCA9PT0gXCJudW1iZXJcIiAmJiBhdWRpb0lEID49IDAgJiYgX2F1ZGlvRW5naW5lLmdldFN0YXRlKGF1ZGlvSUQpID09PSBfU1RBVEUuUExBWUlORykge1xuICAgICAgICAgIF9kaXNwYXRjaENhbGxiYWNrKHNlbGYsIF9USU1FX1VQREFURV9DQUxMQkFDSyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJRCk7XG4gICAgICB9XG4gICAgfSwgNTAwKTtcbiAgICBwcml2YXRlVGhpcy5pbnRlcnZhbElEID0gaW50ZXJ2YWxJRDtcbiAgfVxufTtcbl9wcm90b3R5cGUub25XYWl0aW5nID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIF9vbkNhbGxiYWNrKHRoaXMsIF9XQUlUSU5HX0NBTExCQUNLLCBjYWxsYmFjayk7XG59O1xuZnVuY3Rpb24gX2RlZmF1bHQoQXVkaW9FbmdpbmUpIHtcbiAgaWYgKF9hdWRpb0VuZ2luZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgX2F1ZGlvRW5naW5lID0gT2JqZWN0LmFzc2lnbih7fSwgQXVkaW9FbmdpbmUpO1xuICAgIE9iamVjdC5rZXlzKEF1ZGlvRW5naW5lKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIEF1ZGlvRW5naW5lW25hbWVdID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgQXVkaW9FbmdpbmVbbmFtZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKFwiQXVkaW9FbmdpbmUuXCIgKyBuYW1lICsgXCIgaXMgZGVwcmVjYXRlZFwiKTtcbiAgICAgICAgICByZXR1cm4gX2F1ZGlvRW5naW5lW25hbWVdLmFwcGx5KEF1ZGlvRW5naW5lLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHJldHVybiBuZXcgSW5uZXJBdWRpb0NvbnRleHQoKTtcbn1cbjtcblxufSx7fV0sMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxudmFyIF91dGlsID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vLi4vdXRpbFwiKSk7XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KGUpIHsgcmV0dXJuIGUgJiYgZS5fX2VzTW9kdWxlID8gZSA6IHsgXCJkZWZhdWx0XCI6IGUgfTsgfVxudmFyIF9ydCA9IGxvYWRSdW50aW1lKCk7XG5fdXRpbFtcImRlZmF1bHRcIl0uZXhwb3J0VG8oXCJvblNob3dcIiwgX3J0LCByYWwpO1xuX3V0aWxbXCJkZWZhdWx0XCJdLmV4cG9ydFRvKFwib25IaWRlXCIsIF9ydCwgcmFsKTtcbl91dGlsW1wiZGVmYXVsdFwiXS5leHBvcnRUbyhcIm9mZlNob3dcIiwgX3J0LCByYWwpO1xuX3V0aWxbXCJkZWZhdWx0XCJdLmV4cG9ydFRvKFwib2ZmSGlkZVwiLCBfcnQsIHJhbCk7XG5cbn0se1wiLi4vLi4vdXRpbFwiOjIxfV0sNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxudmFyIF91dGlsID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vLi4vdXRpbFwiKSk7XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KGUpIHsgcmV0dXJuIGUgJiYgZS5fX2VzTW9kdWxlID8gZSA6IHsgXCJkZWZhdWx0XCI6IGUgfTsgfVxudmFyIF9ydCA9IGxvYWRSdW50aW1lKCk7XG5fdXRpbFtcImRlZmF1bHRcIl0uZXhwb3J0VG8oXCJsb2FkU3VicGFja2FnZVwiLCBfcnQsIHJhbCk7XG5cbn0se1wiLi4vLi4vdXRpbFwiOjIxfV0sNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxudmFyIF91dGlsID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vLi4vdXRpbFwiKSk7XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KGUpIHsgcmV0dXJuIGUgJiYgZS5fX2VzTW9kdWxlID8gZSA6IHsgXCJkZWZhdWx0XCI6IGUgfTsgfVxudmFyIF9ydCA9IGxvYWRSdW50aW1lKCk7XG5fdXRpbFtcImRlZmF1bHRcIl0uZXhwb3J0VG8oXCJlbnZcIiwgX3J0LCByYWwpO1xuX3V0aWxbXCJkZWZhdWx0XCJdLmV4cG9ydFRvKFwiZ2V0U3lzdGVtSW5mb1wiLCBfcnQsIHJhbCk7XG5fdXRpbFtcImRlZmF1bHRcIl0uZXhwb3J0VG8oXCJnZXRTeXN0ZW1JbmZvU3luY1wiLCBfcnQsIHJhbCk7XG5cbn0se1wiLi4vLi4vdXRpbFwiOjIxfV0sNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxudmFyIF9qc2IgPSB3aW5kb3cuanNiO1xuaWYgKCFfanNiKSB7XG4gIF9qc2IgPSB7fTtcbn1cbnZhciBfcnQgPSBsb2FkUnVudGltZSgpO1xudmFyIF90b3VjaGVzID0gW107XG52YXIgX2dldFRvdWNoSW5kZXggPSBmdW5jdGlvbiBfZ2V0VG91Y2hJbmRleCh0b3VjaCkge1xuICB2YXIgZWxlbWVudDtcbiAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IF90b3VjaGVzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgIGVsZW1lbnQgPSBfdG91Y2hlc1tpbmRleF07XG4gICAgaWYgKHRvdWNoLmlkZW50aWZpZXIgPT09IGVsZW1lbnQuaWRlbnRpZmllcikge1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59O1xudmFyIF9jb3B5T2JqZWN0ID0gZnVuY3Rpb24gX2NvcHlPYmplY3QoZnJvbU9iaiwgdG9PYmplY3QpIHtcbiAgZm9yICh2YXIga2V5IGluIGZyb21PYmopIHtcbiAgICBpZiAoZnJvbU9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICB0b09iamVjdFtrZXldID0gZnJvbU9ialtrZXldO1xuICAgIH1cbiAgfVxufTtcbnZhciBfbGlzdGVuZXJNYXAgPSB7XG4gIFwidG91Y2hzdGFydFwiOiBbXSxcbiAgXCJ0b3VjaG1vdmVcIjogW10sXG4gIFwidG91Y2hlbmRcIjogW10sXG4gIFwidG91Y2hjYW5jZWxcIjogW11cbn07XG5mdW5jdGlvbiBfYWRkTGlzdGVuZXIoa2V5LCB2YWx1ZSkge1xuICB2YXIgbGlzdGVuZXJBcnIgPSBfbGlzdGVuZXJNYXBba2V5XTtcbiAgZm9yICh2YXIgaW5kZXggPSAwLCBsZW5ndGggPSBsaXN0ZW5lckFyci5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgaWYgKHZhbHVlID09PSBsaXN0ZW5lckFycltpbmRleF0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbiAgbGlzdGVuZXJBcnIucHVzaCh2YWx1ZSk7XG59XG5mdW5jdGlvbiBfcmVtb3ZlTGlzdGVuZXIoa2V5LCB2YWx1ZSkge1xuICB2YXIgbGlzdGVuZXJBcnIgPSBfbGlzdGVuZXJNYXBba2V5XSB8fCBbXTtcbiAgdmFyIGxlbmd0aCA9IGxpc3RlbmVyQXJyLmxlbmd0aDtcbiAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgKytpbmRleCkge1xuICAgIGlmICh2YWx1ZSA9PT0gbGlzdGVuZXJBcnJbaW5kZXhdKSB7XG4gICAgICBsaXN0ZW5lckFyci5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxufVxudmFyIF9oYXNEZWxsV2l0aCA9IGZhbHNlO1xudmFyIF9zeXN0ZW1JbmZvID0gX3J0LmdldFN5c3RlbUluZm9TeW5jKCk7XG5pZiAod2luZG93LmlubmVyV2lkdGggJiYgX3N5c3RlbUluZm8ud2luZG93V2lkdGggIT09IHdpbmRvdy5pbm5lcldpZHRoKSB7XG4gIF9oYXNEZWxsV2l0aCA9IHRydWU7XG59XG52YXIgX3RvdWNoRXZlbnRIYW5kbGVyRmFjdG9yeSA9IGZ1bmN0aW9uIF90b3VjaEV2ZW50SGFuZGxlckZhY3RvcnkodHlwZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKGNoYW5nZWRUb3VjaGVzKSB7XG4gICAgaWYgKHR5cGVvZiBjaGFuZ2VkVG91Y2hlcyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBfYWRkTGlzdGVuZXIodHlwZSwgY2hhbmdlZFRvdWNoZXMpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdG91Y2hFdmVudCA9IG5ldyBUb3VjaEV2ZW50KHR5cGUpO1xuICAgIHZhciBpbmRleDtcbiAgICBpZiAodHlwZSA9PT0gXCJ0b3VjaHN0YXJ0XCIpIHtcbiAgICAgIGNoYW5nZWRUb3VjaGVzLmZvckVhY2goZnVuY3Rpb24gKHRvdWNoKSB7XG4gICAgICAgIGluZGV4ID0gX2dldFRvdWNoSW5kZXgodG91Y2gpO1xuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgIF9jb3B5T2JqZWN0KHRvdWNoLCBfdG91Y2hlc1tpbmRleF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciB0bXAgPSB7fTtcbiAgICAgICAgICBfY29weU9iamVjdCh0b3VjaCwgdG1wKTtcbiAgICAgICAgICBfdG91Y2hlcy5wdXNoKHRtcCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJ0b3VjaG1vdmVcIikge1xuICAgICAgY2hhbmdlZFRvdWNoZXMuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICBpbmRleCA9IF9nZXRUb3VjaEluZGV4KGVsZW1lbnQpO1xuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgIF9jb3B5T2JqZWN0KGVsZW1lbnQsIF90b3VjaGVzW2luZGV4XSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJ0b3VjaGVuZFwiIHx8IHR5cGUgPT09IFwidG91Y2hjYW5jZWxcIikge1xuICAgICAgY2hhbmdlZFRvdWNoZXMuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICBpbmRleCA9IF9nZXRUb3VjaEluZGV4KGVsZW1lbnQpO1xuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgIF90b3VjaGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICB2YXIgdG91Y2hlcyA9IFtdLmNvbmNhdChfdG91Y2hlcyk7XG4gICAgdmFyIF9jaGFuZ2VkVG91Y2hlcyA9IFtdO1xuICAgIGNoYW5nZWRUb3VjaGVzLmZvckVhY2goZnVuY3Rpb24gKHRvdWNoKSB7XG4gICAgICB2YXIgbGVuZ3RoID0gdG91Y2hlcy5sZW5ndGg7XG4gICAgICBmb3IgKHZhciBfaW5kZXggPSAwOyBfaW5kZXggPCBsZW5ndGg7ICsrX2luZGV4KSB7XG4gICAgICAgIHZhciBfdG91Y2ggPSB0b3VjaGVzW19pbmRleF07XG4gICAgICAgIGlmICh0b3VjaC5pZGVudGlmaWVyID09PSBfdG91Y2guaWRlbnRpZmllcikge1xuICAgICAgICAgIF9jaGFuZ2VkVG91Y2hlcy5wdXNoKF90b3VjaCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBfY2hhbmdlZFRvdWNoZXMucHVzaCh0b3VjaCk7XG4gICAgfSk7XG4gICAgdG91Y2hFdmVudC50b3VjaGVzID0gdG91Y2hlcztcbiAgICB0b3VjaEV2ZW50LnRhcmdldFRvdWNoZXMgPSB0b3VjaGVzO1xuICAgIHRvdWNoRXZlbnQuY2hhbmdlZFRvdWNoZXMgPSBfY2hhbmdlZFRvdWNoZXM7XG4gICAgaWYgKF9oYXNEZWxsV2l0aCkge1xuICAgICAgdG91Y2hlcy5mb3JFYWNoKGZ1bmN0aW9uICh0b3VjaCkge1xuICAgICAgICB0b3VjaC5jbGllbnRYIC89IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvO1xuICAgICAgICB0b3VjaC5jbGllbnRZIC89IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvO1xuICAgICAgICB0b3VjaC5wYWdlWCAvPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcbiAgICAgICAgdG91Y2gucGFnZVkgLz0gd2luZG93LmRldmljZVBpeGVsUmF0aW87XG4gICAgICB9KTtcbiAgICAgIGlmICh0eXBlID09PSBcInRvdWNoY2FuY2VsXCIgfHwgdHlwZSA9PT0gXCJ0b3VjaGVuZFwiKSB7XG4gICAgICAgIF9jaGFuZ2VkVG91Y2hlcy5mb3JFYWNoKGZ1bmN0aW9uICh0b3VjaCkge1xuICAgICAgICAgIHRvdWNoLmNsaWVudFggLz0gd2luZG93LmRldmljZVBpeGVsUmF0aW87XG4gICAgICAgICAgdG91Y2guY2xpZW50WSAvPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcbiAgICAgICAgICB0b3VjaC5wYWdlWCAvPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcbiAgICAgICAgICB0b3VjaC5wYWdlWSAvPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBsaXN0ZW5lckFyciA9IF9saXN0ZW5lck1hcFt0eXBlXTtcbiAgICB2YXIgbGVuZ3RoID0gbGlzdGVuZXJBcnIubGVuZ3RoO1xuICAgIGZvciAodmFyIF9pbmRleDIgPSAwOyBfaW5kZXgyIDwgbGVuZ3RoOyBfaW5kZXgyKyspIHtcbiAgICAgIGxpc3RlbmVyQXJyW19pbmRleDJdKHRvdWNoRXZlbnQpO1xuICAgIH1cbiAgfTtcbn07XG5pZiAoX3J0Lm9uVG91Y2hTdGFydCkge1xuICByYWwub25Ub3VjaFN0YXJ0ID0gX3J0Lm9uVG91Y2hTdGFydDtcbiAgcmFsLm9mZlRvdWNoU3RhcnQgPSBfcnQub2ZmVG91Y2hTdGFydDtcbn0gZWxzZSB7XG4gIF9qc2Iub25Ub3VjaFN0YXJ0ID0gX3RvdWNoRXZlbnRIYW5kbGVyRmFjdG9yeSgndG91Y2hzdGFydCcpO1xuICBfanNiLm9mZlRvdWNoU3RhcnQgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICBfcmVtb3ZlTGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGNhbGxiYWNrKTtcbiAgfTtcbiAgcmFsLm9uVG91Y2hTdGFydCA9IF9qc2Iub25Ub3VjaFN0YXJ0LmJpbmQoX2pzYik7XG4gIHJhbC5vZmZUb3VjaFN0YXJ0ID0gX2pzYi5vZmZUb3VjaFN0YXJ0LmJpbmQoX2pzYik7XG59XG5pZiAoX3J0Lm9uVG91Y2hNb3ZlKSB7XG4gIHJhbC5vblRvdWNoTW92ZSA9IF9ydC5vblRvdWNoTW92ZTtcbiAgcmFsLm9mZlRvdWNoTW92ZSA9IF9ydC5vZmZUb3VjaE1vdmU7XG59IGVsc2Uge1xuICBfanNiLm9uVG91Y2hNb3ZlID0gX3RvdWNoRXZlbnRIYW5kbGVyRmFjdG9yeSgndG91Y2htb3ZlJyk7XG4gIF9qc2Iub2ZmVG91Y2hNb3ZlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgX3JlbW92ZUxpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGNhbGxiYWNrKTtcbiAgfTtcbiAgcmFsLm9uVG91Y2hNb3ZlID0gX2pzYi5vblRvdWNoTW92ZS5iaW5kKF9qc2IpO1xuICByYWwub2ZmVG91Y2hNb3ZlID0gX2pzYi5vZmZUb3VjaE1vdmUuYmluZChfanNiKTtcbn1cbmlmIChfcnQub25Ub3VjaENhbmNlbCkge1xuICByYWwub25Ub3VjaENhbmNlbCA9IF9ydC5vblRvdWNoQ2FuY2VsO1xuICByYWwub2ZmVG91Y2hDYW5jZWwgPSBfcnQub2ZmVG91Y2hDYW5jZWw7XG59IGVsc2Uge1xuICBfanNiLm9uVG91Y2hDYW5jZWwgPSBfdG91Y2hFdmVudEhhbmRsZXJGYWN0b3J5KCd0b3VjaGNhbmNlbCcpO1xuICBfanNiLm9mZlRvdWNoQ2FuY2VsID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgX3JlbW92ZUxpc3RlbmVyKFwidG91Y2hjYW5jZWxcIiwgY2FsbGJhY2spO1xuICB9O1xuICByYWwub25Ub3VjaENhbmNlbCA9IF9qc2Iub25Ub3VjaENhbmNlbC5iaW5kKF9qc2IpO1xuICByYWwub2ZmVG91Y2hDYW5jZWwgPSBfanNiLm9mZlRvdWNoQ2FuY2VsLmJpbmQoX2pzYik7XG59XG5pZiAoX3J0Lm9uVG91Y2hFbmQpIHtcbiAgcmFsLm9uVG91Y2hFbmQgPSBfcnQub25Ub3VjaEVuZDtcbiAgcmFsLm9mZlRvdWNoRW5kID0gX3J0Lm9mZlRvdWNoRW5kO1xufSBlbHNlIHtcbiAgX2pzYi5vblRvdWNoRW5kID0gX3RvdWNoRXZlbnRIYW5kbGVyRmFjdG9yeSgndG91Y2hlbmQnKTtcbiAgX2pzYi5vZmZUb3VjaEVuZCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgIF9yZW1vdmVMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGNhbGxiYWNrKTtcbiAgfTtcbiAgcmFsLm9uVG91Y2hFbmQgPSBfanNiLm9uVG91Y2hFbmQuYmluZChfanNiKTtcbiAgcmFsLm9mZlRvdWNoRW5kID0gX2pzYi5vZmZUb3VjaEVuZC5iaW5kKF9qc2IpO1xufVxuXG59LHt9XSw3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgX3V0aWwgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi8uLi91dGlsXCIpKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoZSkgeyByZXR1cm4gZSAmJiBlLl9fZXNNb2R1bGUgPyBlIDogeyBcImRlZmF1bHRcIjogZSB9OyB9XG52YXIgX3J0ID0gbG9hZFJ1bnRpbWUoKTtcbnZhciBfbGlzdGVuZXJzID0gW107XG5yYWwuZGV2aWNlID0gcmFsLmRldmljZSB8fCB7fTtcbmlmIChfcnQub2ZmQWNjZWxlcm9tZXRlckNoYW5nZSkge1xuICBpZiAoX3J0Ll9jb21wYXRpYmxlTW9kZSA9PT0gMSkge1xuICAgIHZhciBfc3lzdGVtSW5mbyA9IF9ydC5nZXRTeXN0ZW1JbmZvU3luYygpO1xuICAgIHZhciBfaXNBbmRyb2lkID0gX3N5c3RlbUluZm8ucGxhdGZvcm0udG9Mb3dlckNhc2UoKSA9PT0gXCJhbmRyb2lkXCI7XG4gICAgdmFyIF9jb21wYXRpYmxlQWNjZWxlcm9tZXRlckNoYW5nZSA9IGZ1bmN0aW9uIF9jb21wYXRpYmxlQWNjZWxlcm9tZXRlckNoYW5nZShlKSB7XG4gICAgICBpZiAoX2lzQW5kcm9pZCkge1xuICAgICAgICBlLnggLz0gLTEwO1xuICAgICAgICBlLnkgLz0gLTEwO1xuICAgICAgICBlLnogLz0gLTEwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZS54IC89IDEwO1xuICAgICAgICBlLnkgLz0gMTA7XG4gICAgICAgIGUueiAvPSAxMDtcbiAgICAgIH1cbiAgICAgIF9saXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgbGlzdGVuZXIoZSk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBfb25BY2NlbGVyb21ldGVyQ2hhbmdlID0gX3J0Lm9uQWNjZWxlcm9tZXRlckNoYW5nZS5iaW5kKF9ydCk7XG4gICAgcmFsLm9uQWNjZWxlcm9tZXRlckNoYW5nZSA9IGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHZhciBsZW5ndGggPSBfbGlzdGVuZXJzLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgKytpbmRleCkge1xuICAgICAgICAgIGlmIChsaXN0ZW5lciA9PT0gX2xpc3RlbmVyc1tpbmRleF0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX2xpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICAgICAgaWYgKF9saXN0ZW5lcnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgX29uQWNjZWxlcm9tZXRlckNoYW5nZShfY29tcGF0aWJsZUFjY2VsZXJvbWV0ZXJDaGFuZ2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgX29mZkFjY2VsZXJvbWV0ZXJDaGFuZ2UgPSBfcnQub2ZmQWNjZWxlcm9tZXRlckNoYW5nZS5iaW5kKF9ydCk7XG4gICAgcmFsLm9mZkFjY2VsZXJvbWV0ZXJDaGFuZ2UgPSBmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgIHZhciBsZW5ndGggPSBfbGlzdGVuZXJzLmxlbmd0aDtcbiAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7ICsraW5kZXgpIHtcbiAgICAgICAgaWYgKGxpc3RlbmVyID09PSBfbGlzdGVuZXJzW2luZGV4XSkge1xuICAgICAgICAgIF9saXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICBpZiAoX2xpc3RlbmVycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIF9vZmZBY2NlbGVyb21ldGVyQ2hhbmdlKF9jb21wYXRpYmxlQWNjZWxlcm9tZXRlckNoYW5nZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICByYWwub25BY2NlbGVyb21ldGVyQ2hhbmdlID0gX3J0Lm9uQWNjZWxlcm9tZXRlckNoYW5nZS5iaW5kKF9ydCk7XG4gICAgcmFsLm9mZkFjY2VsZXJvbWV0ZXJDaGFuZ2UgPSBfcnQub2ZmQWNjZWxlcm9tZXRlckNoYW5nZS5iaW5kKF9ydCk7XG4gIH1cbiAgcmFsLnN0b3BBY2NlbGVyb21ldGVyID0gX3J0LnN0b3BBY2NlbGVyb21ldGVyLmJpbmQoX3J0KTtcbiAgdmFyIF9zdGFydEFjY2VsZXJvbWV0ZXIgPSBfcnQuc3RhcnRBY2NlbGVyb21ldGVyLmJpbmQoX3J0KTtcbiAgcmFsLnN0YXJ0QWNjZWxlcm9tZXRlciA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gX3N0YXJ0QWNjZWxlcm9tZXRlcihPYmplY3QuYXNzaWduKHtcbiAgICAgIHR5cGU6IFwiYWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eVwiXG4gICAgfSwgb2JqKSk7XG4gIH07XG59IGVsc2Uge1xuICByYWwub25BY2NlbGVyb21ldGVyQ2hhbmdlID0gZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgaWYgKHR5cGVvZiBsaXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB2YXIgbGVuZ3RoID0gX2xpc3RlbmVycy5sZW5ndGg7XG4gICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyArK2luZGV4KSB7XG4gICAgICAgIGlmIChsaXN0ZW5lciA9PT0gX2xpc3RlbmVyc1tpbmRleF0pIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIF9saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuICB9O1xuICByYWwub2ZmQWNjZWxlcm9tZXRlckNoYW5nZSA9IGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgIHZhciBsZW5ndGggPSBfbGlzdGVuZXJzLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyArK2luZGV4KSB7XG4gICAgICBpZiAobGlzdGVuZXIgPT09IF9saXN0ZW5lcnNbaW5kZXhdKSB7XG4gICAgICAgIF9saXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgdmFyIF9zeXN0ZW1JbmZvMiA9IF9ydC5nZXRTeXN0ZW1JbmZvU3luYygpO1xuICB2YXIgX2lzQW5kcm9pZDIgPSBfc3lzdGVtSW5mbzIucGxhdGZvcm0udG9Mb3dlckNhc2UoKSA9PT0gXCJhbmRyb2lkXCI7XG4gIGpzYi5kZXZpY2UuZGlzcGF0Y2hEZXZpY2VNb3Rpb25FdmVudCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHZhciBhY2NlbGVyYXRpb24gPSBPYmplY3QuYXNzaWduKHt9LCBldmVudC5fYWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eSk7XG4gICAgaWYgKF9pc0FuZHJvaWQyKSB7XG4gICAgICBhY2NlbGVyYXRpb24ueCAvPSAtMTA7XG4gICAgICBhY2NlbGVyYXRpb24ueSAvPSAtMTA7XG4gICAgICBhY2NlbGVyYXRpb24ueiAvPSAtMTA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjY2VsZXJhdGlvbi54IC89IDEwO1xuICAgICAgYWNjZWxlcmF0aW9uLnkgLz0gMTA7XG4gICAgICBhY2NlbGVyYXRpb24ueiAvPSAxMDtcbiAgICB9XG4gICAgX2xpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgbGlzdGVuZXIoe1xuICAgICAgICB4OiBhY2NlbGVyYXRpb24ueCxcbiAgICAgICAgeTogYWNjZWxlcmF0aW9uLnksXG4gICAgICAgIHo6IGFjY2VsZXJhdGlvbi56XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcbiAgcmFsLnN0b3BBY2NlbGVyb21ldGVyID0gZnVuY3Rpb24gKCkge1xuICAgIGpzYi5kZXZpY2Uuc2V0TW90aW9uRW5hYmxlZChmYWxzZSk7XG4gIH07XG4gIHJhbC5zdGFydEFjY2VsZXJvbWV0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAganNiLmRldmljZS5zZXRNb3Rpb25FbmFibGVkKHRydWUpO1xuICB9O1xufVxuXG59LHtcIi4uLy4uL3V0aWxcIjoyMX1dLDg6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfdXRpbCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uLy4uL3V0aWxcIikpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChlKSB7IHJldHVybiBlICYmIGUuX19lc01vZHVsZSA/IGUgOiB7IFwiZGVmYXVsdFwiOiBlIH07IH1cbnZhciBfcnQgPSBsb2FkUnVudGltZSgpO1xuX3V0aWxbXCJkZWZhdWx0XCJdLmV4cG9ydFRvKFwiZ2V0QmF0dGVyeUluZm9cIiwgX3J0LCByYWwpO1xuX3V0aWxbXCJkZWZhdWx0XCJdLmV4cG9ydFRvKFwiZ2V0QmF0dGVyeUluZm9TeW5jXCIsIF9ydCwgcmFsKTtcblxufSx7XCIuLi8uLi91dGlsXCI6MjF9XSw5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgX3V0aWwgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi8uLi91dGlsXCIpKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoZSkgeyByZXR1cm4gZSAmJiBlLl9fZXNNb2R1bGUgPyBlIDogeyBcImRlZmF1bHRcIjogZSB9OyB9XG52YXIgX3J0ID0gbG9hZFJ1bnRpbWUoKTtcbl91dGlsW1wiZGVmYXVsdFwiXS5leHBvcnRUbyhcImdldEZpbGVTeXN0ZW1NYW5hZ2VyXCIsIF9ydCwgcmFsKTtcblxufSx7XCIuLi8uLi91dGlsXCI6MjF9XSwxMDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxudmFyIF91dGlsID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vdXRpbFwiKSk7XG52YXIgX2ZlYXR1cmUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi9mZWF0dXJlXCIpKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoZSkgeyByZXR1cm4gZSAmJiBlLl9fZXNNb2R1bGUgPyBlIDogeyBcImRlZmF1bHRcIjogZSB9OyB9XG5pZiAod2luZG93LmpzYikge1xuICB3aW5kb3cucmFsID0gT2JqZWN0LmFzc2lnbih7fSwgd2luZG93LmpzYik7XG59IGVsc2Uge1xuICB3aW5kb3cucmFsID0ge307XG59XG5yZXF1aXJlKFwiLi9iYXNlL2xpZmVjeWNsZVwiKTtcbnJlcXVpcmUoXCIuL2Jhc2Uvc3VicGFja2FnZVwiKTtcbnJlcXVpcmUoXCIuL2Jhc2Uvc3lzdGVtLWluZm9cIik7XG5yZXF1aXJlKFwiLi9iYXNlL3RvdWNoLWV2ZW50XCIpO1xucmVxdWlyZShcIi4vZGV2aWNlL2FjY2VsZXJvbWV0ZXJcIik7XG5yZXF1aXJlKFwiLi9kZXZpY2UvYmF0dGVyeVwiKTtcbnJlcXVpcmUoXCIuL2ZpbGUvZmlsZS1zeXN0ZW0tbWFuYWdlclwiKTtcbnJlcXVpcmUoXCIuL2ludGVyZmFjZS9rZXlib2FyZFwiKTtcbnJlcXVpcmUoXCIuL2ludGVyZmFjZS93aW5kb3dcIik7XG5yZXF1aXJlKFwiLi9tZWRpYS9hdWRpb1wiKTtcbnJlcXVpcmUoXCIuL21lZGlhL3ZpZGVvXCIpO1xucmVxdWlyZShcIi4vbmV0d29yay9kb3dubG9hZFwiKTtcbnJlcXVpcmUoXCIuL3JlbmRlcmluZy9jYW52YXNcIik7XG5yZXF1aXJlKFwiLi9yZW5kZXJpbmcvd2ViZ2xcIik7XG5yZXF1aXJlKFwiLi9yZW5kZXJpbmcvZm9udFwiKTtcbnJlcXVpcmUoXCIuL3JlbmRlcmluZy9mcmFtZVwiKTtcbnJlcXVpcmUoXCIuL3JlbmRlcmluZy9pbWFnZVwiKTtcbmZvciAodmFyIGtleSBpbiBfZmVhdHVyZVtcImRlZmF1bHRcIl0pIHtcbiAgaWYgKGtleSA9PT0gXCJzZXRGZWF0dXJlXCIgfHwga2V5ID09PSBcInJlZ2lzdGVyRmVhdHVyZVByb3BlcnR5XCIgfHwga2V5ID09PSBcInVucmVnaXN0ZXJGZWF0dXJlUHJvcGVydHlcIikge1xuICAgIGNvbnRpbnVlO1xuICB9XG4gIGlmIChfZmVhdHVyZVtcImRlZmF1bHRcIl0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgIF91dGlsW1wiZGVmYXVsdFwiXS5leHBvcnRUbyhrZXksIF9mZWF0dXJlW1wiZGVmYXVsdFwiXSwgcmFsKTtcbiAgfVxufVxuXG59LHtcIi4uL2ZlYXR1cmVcIjoxLFwiLi4vdXRpbFwiOjIxLFwiLi9iYXNlL2xpZmVjeWNsZVwiOjMsXCIuL2Jhc2Uvc3VicGFja2FnZVwiOjQsXCIuL2Jhc2Uvc3lzdGVtLWluZm9cIjo1LFwiLi9iYXNlL3RvdWNoLWV2ZW50XCI6NixcIi4vZGV2aWNlL2FjY2VsZXJvbWV0ZXJcIjo3LFwiLi9kZXZpY2UvYmF0dGVyeVwiOjgsXCIuL2ZpbGUvZmlsZS1zeXN0ZW0tbWFuYWdlclwiOjksXCIuL2ludGVyZmFjZS9rZXlib2FyZFwiOjExLFwiLi9pbnRlcmZhY2Uvd2luZG93XCI6MTIsXCIuL21lZGlhL2F1ZGlvXCI6MTMsXCIuL21lZGlhL3ZpZGVvXCI6MTQsXCIuL25ldHdvcmsvZG93bmxvYWRcIjoxNSxcIi4vcmVuZGVyaW5nL2NhbnZhc1wiOjE2LFwiLi9yZW5kZXJpbmcvZm9udFwiOjE3LFwiLi9yZW5kZXJpbmcvZnJhbWVcIjoxOCxcIi4vcmVuZGVyaW5nL2ltYWdlXCI6MTksXCIuL3JlbmRlcmluZy93ZWJnbFwiOjIwfV0sMTE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfdXRpbCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uLy4uL3V0aWxcIikpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChlKSB7IHJldHVybiBlICYmIGUuX19lc01vZHVsZSA/IGUgOiB7IFwiZGVmYXVsdFwiOiBlIH07IH1cbnZhciBfcnQgPSBsb2FkUnVudGltZSgpO1xuX3V0aWxbXCJkZWZhdWx0XCJdLmV4cG9ydFRvKFwib25LZXlib2FyZElucHV0XCIsIF9ydCwgcmFsKTtcbl91dGlsW1wiZGVmYXVsdFwiXS5leHBvcnRUbyhcIm9uS2V5Ym9hcmRDb25maXJtXCIsIF9ydCwgcmFsKTtcbl91dGlsW1wiZGVmYXVsdFwiXS5leHBvcnRUbyhcIm9uS2V5Ym9hcmRDb21wbGV0ZVwiLCBfcnQsIHJhbCk7XG5fdXRpbFtcImRlZmF1bHRcIl0uZXhwb3J0VG8oXCJvZmZLZXlib2FyZElucHV0XCIsIF9ydCwgcmFsKTtcbl91dGlsW1wiZGVmYXVsdFwiXS5leHBvcnRUbyhcIm9mZktleWJvYXJkQ29uZmlybVwiLCBfcnQsIHJhbCk7XG5fdXRpbFtcImRlZmF1bHRcIl0uZXhwb3J0VG8oXCJvZmZLZXlib2FyZENvbXBsZXRlXCIsIF9ydCwgcmFsKTtcbl91dGlsW1wiZGVmYXVsdFwiXS5leHBvcnRUbyhcImhpZGVLZXlib2FyZFwiLCBfcnQsIHJhbCk7XG5fdXRpbFtcImRlZmF1bHRcIl0uZXhwb3J0VG8oXCJzaG93S2V5Ym9hcmRcIiwgX3J0LCByYWwpO1xuX3V0aWxbXCJkZWZhdWx0XCJdLmV4cG9ydFRvKFwidXBkYXRlS2V5Ym9hcmRcIiwgX3J0LCByYWwpO1xuXG59LHtcIi4uLy4uL3V0aWxcIjoyMX1dLDEyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgX3J0ID0gbG9hZFJ1bnRpbWUoKTtcbnZhciBfb25XaW5kb3dSZXNpemUgPSBfcnQub25XaW5kb3dSZXNpemU7XG5yYWwub25XaW5kb3dSZXNpemUgPSBmdW5jdGlvbiAoY2FsbEJhY2spIHtcbiAgX29uV2luZG93UmVzaXplKGZ1bmN0aW9uIChzaXplKSB7XG4gICAgY2FsbEJhY2soc2l6ZS53aWR0aCB8fCBzaXplLndpbmRvd1dpZHRoLCBzaXplLmhlaWdodCB8fCBzaXplLndpbmRvd0hlaWdodCk7XG4gIH0pO1xufTtcbndpbmRvdy5yZXNpemUgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnNvbGUud2Fybignd2luZG93LnJlc2l6ZSgpIGlzIGRlcHJlY2F0ZWQnKTtcbn07XG5cbn0se31dLDEzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgX2lubmVyQ29udGV4dCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uLy4uL2lubmVyLWNvbnRleHRcIikpO1xudmFyIF91dGlsID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vLi4vdXRpbFwiKSk7XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KGUpIHsgcmV0dXJuIGUgJiYgZS5fX2VzTW9kdWxlID8gZSA6IHsgXCJkZWZhdWx0XCI6IGUgfTsgfVxudmFyIF9ydCA9IGxvYWRSdW50aW1lKCk7XG5fdXRpbFtcImRlZmF1bHRcIl0uZXhwb3J0VG8oXCJBdWRpb0VuZ2luZVwiLCBfcnQsIHJhbCk7XG5fdXRpbFtcImRlZmF1bHRcIl0uZXhwb3J0VG8oXCJjcmVhdGVJbm5lckF1ZGlvQ29udGV4dFwiLCBfcnQsIHJhbCwgZnVuY3Rpb24gKCkge1xuICBpZiAoX3J0LkF1ZGlvRW5naW5lKSB7XG4gICAgcmFsLmNyZWF0ZUlubmVyQXVkaW9Db250ZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuICgwLCBfaW5uZXJDb250ZXh0W1wiZGVmYXVsdFwiXSkoX3J0LkF1ZGlvRW5naW5lKTtcbiAgICB9O1xuICB9XG59KTtcblxufSx7XCIuLi8uLi9pbm5lci1jb250ZXh0XCI6MixcIi4uLy4uL3V0aWxcIjoyMX1dLDE0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgX3V0aWwgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi8uLi91dGlsXCIpKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoZSkgeyByZXR1cm4gZSAmJiBlLl9fZXNNb2R1bGUgPyBlIDogeyBcImRlZmF1bHRcIjogZSB9OyB9XG52YXIgX3J0ID0gbG9hZFJ1bnRpbWUoKTtcbl91dGlsW1wiZGVmYXVsdFwiXS5leHBvcnRUbyhcImNyZWF0ZVZpZGVvXCIsIF9ydCwgcmFsKTtcblxufSx7XCIuLi8uLi91dGlsXCI6MjF9XSwxNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxudmFyIF91dGlsID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vLi4vdXRpbFwiKSk7XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KGUpIHsgcmV0dXJuIGUgJiYgZS5fX2VzTW9kdWxlID8gZSA6IHsgXCJkZWZhdWx0XCI6IGUgfTsgfVxudmFyIF9ydCA9IGxvYWRSdW50aW1lKCk7XG5fdXRpbFtcImRlZmF1bHRcIl0uZXhwb3J0VG8oXCJkb3dubG9hZEZpbGVcIiwgX3J0LCByYWwpO1xuXG59LHtcIi4uLy4uL3V0aWxcIjoyMX1dLDE2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgX3V0aWwgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi8uLi91dGlsXCIpKTtcbnZhciBfZmVhdHVyZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uLy4uL2ZlYXR1cmVcIikpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChlKSB7IHJldHVybiBlICYmIGUuX19lc01vZHVsZSA/IGUgOiB7IFwiZGVmYXVsdFwiOiBlIH07IH1cbnZhciBfcnQgPSBsb2FkUnVudGltZSgpO1xuX3V0aWxbXCJkZWZhdWx0XCJdLmV4cG9ydFRvKFwiY3JlYXRlQ2FudmFzXCIsIF9ydCwgcmFsLCBmdW5jdGlvbiAoKSB7XG4gIHZhciBmZWF0dXJlVmFsdWUgPSBcInVuc3VwcG9ydGVkXCI7XG4gIGlmIChkb2N1bWVudCAmJiB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgZmVhdHVyZVZhbHVlID0gXCJ3cmFwcGVyXCI7XG4gICAgcmFsLmNyZWF0ZUNhbnZhcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIH07XG4gIH1cbiAgX2ZlYXR1cmVbXCJkZWZhdWx0XCJdLnNldEZlYXR1cmUoXCJyYWwuY3JlYXRlQ2FudmFzXCIsIFwic3BlY1wiLCBmZWF0dXJlVmFsdWUpO1xufSk7XG52YXIgX3J0X2dldEZlYXR1cmUgPSBfcnQuZ2V0RmVhdHVyZTtcbnZhciBfcnRfc2V0RmVhdHVyZSA9IF9ydC5zZXRGZWF0dXJlO1xuX2ZlYXR1cmVbXCJkZWZhdWx0XCJdLnJlZ2lzdGVyRmVhdHVyZVByb3BlcnR5KF9mZWF0dXJlW1wiZGVmYXVsdFwiXS5DQU5WQVNfQ09OVEVYVDJEX1RFWFRCQVNFTElORV9BTFBIQUJFVElDLm5hbWUsIGZ1bmN0aW9uICgpIHtcbiAgaWYgKHR5cGVvZiBfcnRfZ2V0RmVhdHVyZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIHZhbHVlID0gX3J0X2dldEZlYXR1cmUoX2ZlYXR1cmVbXCJkZWZhdWx0XCJdLkNBTlZBU19DT05URVhUMkRfVEVYVEJBU0VMSU5FX0FMUEhBQkVUSUMubmFtZSk7XG4gICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gX2ZlYXR1cmVbXCJkZWZhdWx0XCJdLkNBTlZBU19DT05URVhUMkRfVEVYVEJBU0VMSU5FX0FMUEhBQkVUSUMuZW5hYmxlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBfZmVhdHVyZVtcImRlZmF1bHRcIl0uRkVBVFVSRV9VTlNVUFBPUlQ7XG59LCB1bmRlZmluZWQpO1xuX2ZlYXR1cmVbXCJkZWZhdWx0XCJdLnJlZ2lzdGVyRmVhdHVyZVByb3BlcnR5KF9mZWF0dXJlW1wiZGVmYXVsdFwiXS5DQU5WQVNfQ09OVEVYVDJEX1RFWFRCQVNFTElORV9ERUZBVUxULm5hbWUsIGZ1bmN0aW9uICgpIHtcbiAgaWYgKHR5cGVvZiBfcnRfZ2V0RmVhdHVyZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIHZhbHVlID0gX3J0X2dldEZlYXR1cmUoX2ZlYXR1cmVbXCJkZWZhdWx0XCJdLkNBTlZBU19DT05URVhUMkRfVEVYVEJBU0VMSU5FX0RFRkFVTFQubmFtZSk7XG4gICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gX2ZlYXR1cmVbXCJkZWZhdWx0XCJdLkNBTlZBU19DT05URVhUMkRfVEVYVEJBU0VMSU5FX0RFRkFVTFQuYWxwaGFiZXRpYztcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuIF9mZWF0dXJlW1wiZGVmYXVsdFwiXS5DQU5WQVNfQ09OVEVYVDJEX1RFWFRCQVNFTElORV9ERUZBVUxULmJvdHRvbTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gX2ZlYXR1cmVbXCJkZWZhdWx0XCJdLkZFQVRVUkVfVU5TVVBQT1JUO1xufSwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgX3J0X3NldEZlYXR1cmUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgIGNhc2UgX2ZlYXR1cmVbXCJkZWZhdWx0XCJdLkNBTlZBU19DT05URVhUMkRfVEVYVEJBU0VMSU5FX0RFRkFVTFQuYWxwaGFiZXRpYzpcbiAgICAgICAgdmFsdWUgPSAxO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgX2ZlYXR1cmVbXCJkZWZhdWx0XCJdLkNBTlZBU19DT05URVhUMkRfVEVYVEJBU0VMSU5FX0RFRkFVTFQuYm90dG9tOlxuICAgICAgICB2YWx1ZSA9IDA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gX3J0X3NldEZlYXR1cmUoX2ZlYXR1cmVbXCJkZWZhdWx0XCJdLkNBTlZBU19DT05URVhUMkRfVEVYVEJBU0VMSU5FX0RFRkFVTFQubmFtZSwgdmFsdWUpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn0pO1xuXG59LHtcIi4uLy4uL2ZlYXR1cmVcIjoxLFwiLi4vLi4vdXRpbFwiOjIxfV0sMTc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfdXRpbCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uLy4uL3V0aWxcIikpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChlKSB7IHJldHVybiBlICYmIGUuX19lc01vZHVsZSA/IGUgOiB7IFwiZGVmYXVsdFwiOiBlIH07IH1cbnZhciBfcnQgPSBsb2FkUnVudGltZSgpO1xuX3V0aWxbXCJkZWZhdWx0XCJdLmV4cG9ydFRvKFwibG9hZEZvbnRcIiwgX3J0LCByYWwpO1xuXG59LHtcIi4uLy4uL3V0aWxcIjoyMX1dLDE4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgX3J0ID0gbG9hZFJ1bnRpbWUoKTtcbmlmICh3aW5kb3cuanNiICYmIGpzYi5zZXRQcmVmZXJyZWRGcmFtZXNQZXJTZWNvbmQpIHtcbiAgcmFsLnNldFByZWZlcnJlZEZyYW1lc1BlclNlY29uZCA9IGpzYi5zZXRQcmVmZXJyZWRGcmFtZXNQZXJTZWNvbmQuYmluZChqc2IpO1xufSBlbHNlIGlmIChfcnQuc2V0UHJlZmVycmVkRnJhbWVzUGVyU2Vjb25kKSB7XG4gIHJhbC5zZXRQcmVmZXJyZWRGcmFtZXNQZXJTZWNvbmQgPSBfcnQuc2V0UHJlZmVycmVkRnJhbWVzUGVyU2Vjb25kLmJpbmQoX3J0KTtcbn0gZWxzZSB7XG4gIHJhbC5zZXRQcmVmZXJyZWRGcmFtZXNQZXJTZWNvbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc29sZS5lcnJvcihcIlRoZSBzZXRQcmVmZXJyZWRGcmFtZXNQZXJTZWNvbmQgaXMgbm90IGRlZmluZSFcIik7XG4gIH07XG59XG5cbn0se31dLDE5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgX3V0aWwgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi8uLi91dGlsXCIpKTtcbnZhciBfZmVhdHVyZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uLy4uL2ZlYXR1cmVcIikpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChlKSB7IHJldHVybiBlICYmIGUuX19lc01vZHVsZSA/IGUgOiB7IFwiZGVmYXVsdFwiOiBlIH07IH1cbnZhciBfcnQgPSBsb2FkUnVudGltZSgpO1xuX3V0aWxbXCJkZWZhdWx0XCJdLmV4cG9ydFRvKFwibG9hZEltYWdlRGF0YVwiLCBfcnQsIHJhbCk7XG5fdXRpbFtcImRlZmF1bHRcIl0uZXhwb3J0VG8oXCJjcmVhdGVJbWFnZVwiLCBfcnQsIHJhbCwgZnVuY3Rpb24gKCkge1xuICB2YXIgZmVhdHVyZVZhbHVlID0gXCJ1bnN1cHBvcnRlZFwiO1xuICBpZiAoZG9jdW1lbnQgJiYgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGZlYXR1cmVWYWx1ZSA9IFwid3JhcHBlclwiO1xuICAgIHJhbC5jcmVhdGVJbWFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1hZ2VcIik7XG4gICAgfTtcbiAgfVxuICBfZmVhdHVyZVtcImRlZmF1bHRcIl0uc2V0RmVhdHVyZShcInJhbC5jcmVhdGVJbWFnZVwiLCBcInNwZWNcIiwgZmVhdHVyZVZhbHVlKTtcbn0pO1xuXG59LHtcIi4uLy4uL2ZlYXR1cmVcIjoxLFwiLi4vLi4vdXRpbFwiOjIxfV0sMjA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmlmICh3aW5kb3cuX19nbCkge1xuICB2YXIgZ2wgPSB3aW5kb3cuX19nbDtcbiAgdmFyIF9nbFRleEltYWdlMkQgPSBnbC50ZXhJbWFnZTJEO1xuICBnbC50ZXhJbWFnZTJEID0gZnVuY3Rpb24gKHRhcmdldCwgbGV2ZWwsIGludGVybmFsZm9ybWF0LCB3aWR0aCwgaGVpZ2h0LCBib3JkZXIsIGZvcm1hdCwgdHlwZSwgcGl4ZWxzKSB7XG4gICAgdmFyIGFyZ2MgPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGlmIChhcmdjID09PSA2KSB7XG4gICAgICB2YXIgaW1hZ2UgPSBib3JkZXI7XG4gICAgICB0eXBlID0gaGVpZ2h0O1xuICAgICAgZm9ybWF0ID0gd2lkdGg7XG4gICAgICBpZiAoaW1hZ2UgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50KSB7XG4gICAgICAgIHZhciBlcnJvciA9IGNvbnNvbGUuZXJyb3I7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IgPSBmdW5jdGlvbiAoKSB7fTtcbiAgICAgICAgX2dsVGV4SW1hZ2UyRC5hcHBseSh2b2lkIDAsIGFyZ3VtZW50cyk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgZ2wudGV4SW1hZ2UyRF9pbWFnZSh0YXJnZXQsIGxldmVsLCBpbWFnZS5faW1hZ2VNZXRhKTtcbiAgICAgIH0gZWxzZSBpZiAoaW1hZ2UgaW5zdGFuY2VvZiBIVE1MQ2FudmFzRWxlbWVudCkge1xuICAgICAgICB2YXIgX2Vycm9yID0gY29uc29sZS5lcnJvcjtcbiAgICAgICAgY29uc29sZS5lcnJvciA9IGZ1bmN0aW9uICgpIHt9O1xuICAgICAgICBfZ2xUZXhJbWFnZTJELmFwcGx5KHZvaWQgMCwgYXJndW1lbnRzKTtcbiAgICAgICAgY29uc29sZS5lcnJvciA9IF9lcnJvcjtcbiAgICAgICAgdmFyIGNvbnRleHQyRCA9IGltYWdlLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIGdsLnRleEltYWdlMkRfY2FudmFzKHRhcmdldCwgbGV2ZWwsIGludGVybmFsZm9ybWF0LCBmb3JtYXQsIHR5cGUsIGNvbnRleHQyRCk7XG4gICAgICB9IGVsc2UgaWYgKGltYWdlIGluc3RhbmNlb2YgSW1hZ2VEYXRhKSB7XG4gICAgICAgIF9nbFRleEltYWdlMkQodGFyZ2V0LCBsZXZlbCwgaW50ZXJuYWxmb3JtYXQsIGltYWdlLndpZHRoLCBpbWFnZS5oZWlnaHQsIDAsIGZvcm1hdCwgdHlwZSwgaW1hZ2UuZGF0YSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiSW52YWxpZCBwaXhlbCBhcmd1bWVudCBwYXNzZWQgdG8gZ2wudGV4SW1hZ2UyRCFcIik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChhcmdjID09PSA5KSB7XG4gICAgICBfZ2xUZXhJbWFnZTJEKHRhcmdldCwgbGV2ZWwsIGludGVybmFsZm9ybWF0LCB3aWR0aCwgaGVpZ2h0LCBib3JkZXIsIGZvcm1hdCwgdHlwZSwgcGl4ZWxzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5lcnJvcihcImdsLnRleEltYWdlMkQ6IGludmFsaWQgYXJndW1lbnQgY291bnQhXCIpO1xuICAgIH1cbiAgfTtcbiAgdmFyIF9nbFRleFN1YkltYWdlMkQgPSBnbC50ZXhTdWJJbWFnZTJEO1xuICBnbC50ZXhTdWJJbWFnZTJEID0gZnVuY3Rpb24gKHRhcmdldCwgbGV2ZWwsIHhvZmZzZXQsIHlvZmZzZXQsIHdpZHRoLCBoZWlnaHQsIGZvcm1hdCwgdHlwZSwgcGl4ZWxzKSB7XG4gICAgdmFyIGFyZ2MgPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGlmIChhcmdjID09PSA3KSB7XG4gICAgICB2YXIgaW1hZ2UgPSBmb3JtYXQ7XG4gICAgICB0eXBlID0gaGVpZ2h0O1xuICAgICAgZm9ybWF0ID0gd2lkdGg7XG4gICAgICBpZiAoaW1hZ2UgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50KSB7XG4gICAgICAgIHZhciBlcnJvciA9IGNvbnNvbGUuZXJyb3I7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IgPSBmdW5jdGlvbiAoKSB7fTtcbiAgICAgICAgX2dsVGV4U3ViSW1hZ2UyRC5hcHBseSh2b2lkIDAsIGFyZ3VtZW50cyk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgZ2wudGV4U3ViSW1hZ2UyRF9pbWFnZSh0YXJnZXQsIGxldmVsLCB4b2Zmc2V0LCB5b2Zmc2V0LCBpbWFnZS5faW1hZ2VNZXRhKTtcbiAgICAgIH0gZWxzZSBpZiAoaW1hZ2UgaW5zdGFuY2VvZiBIVE1MQ2FudmFzRWxlbWVudCkge1xuICAgICAgICB2YXIgX2Vycm9yMiA9IGNvbnNvbGUuZXJyb3I7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IgPSBmdW5jdGlvbiAoKSB7fTtcbiAgICAgICAgX2dsVGV4U3ViSW1hZ2UyRC5hcHBseSh2b2lkIDAsIGFyZ3VtZW50cyk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IgPSBfZXJyb3IyO1xuICAgICAgICB2YXIgY29udGV4dDJEID0gaW1hZ2UuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgZ2wudGV4U3ViSW1hZ2UyRF9jYW52YXModGFyZ2V0LCBsZXZlbCwgeG9mZnNldCwgeW9mZnNldCwgZm9ybWF0LCB0eXBlLCBjb250ZXh0MkQpO1xuICAgICAgfSBlbHNlIGlmIChpbWFnZSBpbnN0YW5jZW9mIEltYWdlRGF0YSkge1xuICAgICAgICBfZ2xUZXhTdWJJbWFnZTJEKHRhcmdldCwgbGV2ZWwsIHhvZmZzZXQsIHlvZmZzZXQsIGltYWdlLndpZHRoLCBpbWFnZS5oZWlnaHQsIGZvcm1hdCwgdHlwZSwgaW1hZ2UuZGF0YSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiSW52YWxpZCBwaXhlbCBhcmd1bWVudCBwYXNzZWQgdG8gZ2wudGV4SW1hZ2UyRCFcIik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChhcmdjID09PSA5KSB7XG4gICAgICBfZ2xUZXhTdWJJbWFnZTJEKHRhcmdldCwgbGV2ZWwsIHhvZmZzZXQsIHlvZmZzZXQsIHdpZHRoLCBoZWlnaHQsIGZvcm1hdCwgdHlwZSwgcGl4ZWxzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5lcnJvcihuZXcgRXJyb3IoXCJnbC50ZXhJbWFnZTJEOiBpbnZhbGlkIGFyZ3VtZW50IGNvdW50IVwiKS5zdGFjayk7XG4gICAgfVxuICB9O1xufVxuXG59LHt9XSwyMTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xuZnVuY3Rpb24gX3R5cGVvZihvKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAobykgeyByZXR1cm4gdHlwZW9mIG87IH0gOiBmdW5jdGlvbiAobykgeyByZXR1cm4gbyAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgbyAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2YgbzsgfSwgX3R5cGVvZihvKTsgfVxudmFyIF9kZWZhdWx0ID0gZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB7XG4gIGV4cG9ydFRvOiBmdW5jdGlvbiBleHBvcnRUbyhuYW1lLCBmcm9tLCB0bywgZXJyQ2FsbGJhY2ssIHN1Y2Nlc3NDYWxsYmFjaykge1xuICAgIGlmIChfdHlwZW9mKGZyb20pICE9PSBcIm9iamVjdFwiIHx8IF90eXBlb2YodG8pICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJpbnZhbGlkIGV4cG9ydFRvOiBcIiwgbmFtZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBmcm9tUHJvcGVydHkgPSBmcm9tW25hbWVdO1xuICAgIGlmICh0eXBlb2YgZnJvbVByb3BlcnR5ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBpZiAodHlwZW9mIGZyb21Qcm9wZXJ0eSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRvW25hbWVdID0gZnJvbVByb3BlcnR5LmJpbmQoZnJvbSk7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odG9bbmFtZV0sIGZyb21Qcm9wZXJ0eSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b1tuYW1lXSA9IGZyb21Qcm9wZXJ0eTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2Ygc3VjY2Vzc0NhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgc3VjY2Vzc0NhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvW25hbWVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKG5hbWUgKyBcIiBpcyBub3Qgc3VwcG9ydCFcIik7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICAgIH07XG4gICAgICBpZiAodHlwZW9mIGVyckNhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgZXJyQ2FsbGJhY2soKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbn0se31dfSx7fSxbMTBdKTtcbiJdLCJmaWxlIjoicmFsLmpzIn0=
