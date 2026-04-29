System.register("q-bundled:///fs/pal/audio/minigame/player-minigame.js", ["pal/minigame", "../../../../virtual/internal%253Aconstants.js", "../../../cocos/core/event/index.js", "../type.js", "../../../cocos/core/index.js", "../operation-queue.js", "../../../cocos/game/index.js"], function (_export, _context) {
  "use strict";

  var minigame, TAOBAO, TAOBAO_MINIGAME, EventTarget, AudioEvent, AudioState, AudioType, clamp, clamp01, enqueueOperation, Game, game, OneShotAudioMinigame, _class, AudioPlayerMinigame;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  _export("OneShotAudioMinigame", void 0);

  return {
    setters: [function (_palMinigame) {
      minigame = _palMinigame.minigame;
    }, function (_virtualInternal253AconstantsJs) {
      TAOBAO = _virtualInternal253AconstantsJs.TAOBAO;
      TAOBAO_MINIGAME = _virtualInternal253AconstantsJs.TAOBAO_MINIGAME;
    }, function (_cocosCoreEventIndexJs) {
      EventTarget = _cocosCoreEventIndexJs.EventTarget;
    }, function (_typeJs) {
      AudioEvent = _typeJs.AudioEvent;
      AudioState = _typeJs.AudioState;
      AudioType = _typeJs.AudioType;
    }, function (_cocosCoreIndexJs) {
      clamp = _cocosCoreIndexJs.clamp;
      clamp01 = _cocosCoreIndexJs.clamp01;
    }, function (_operationQueueJs) {
      enqueueOperation = _operationQueueJs.enqueueOperation;
    }, function (_cocosGameIndexJs) {
      Game = _cocosGameIndexJs.Game;
      game = _cocosGameIndexJs.game;
    }],
    execute: function () {
      _export("OneShotAudioMinigame", OneShotAudioMinigame = class OneShotAudioMinigame {
        get onPlay() {
          return this._onPlayCb;
        }

        set onPlay(cb) {
          this._onPlayCb = cb;
        }

        get onEnd() {
          return this._onEndCb;
        }

        set onEnd(cb) {
          this._onEndCb = cb;
        }

        constructor(nativeAudio, volume) {
          this._innerAudioContext = void 0;
          this._onPlayCb = void 0;
          this._onEndCb = void 0;
          this._innerAudioContext = nativeAudio;
          nativeAudio.volume = volume;
          nativeAudio.onPlay(() => {
            var _this$_onPlayCb;

            (_this$_onPlayCb = this._onPlayCb) === null || _this$_onPlayCb === void 0 ? void 0 : _this$_onPlayCb.call(this);
          });
          nativeAudio.onEnded(() => {
            var _this$_onEndCb;

            (_this$_onEndCb = this._onEndCb) === null || _this$_onEndCb === void 0 ? void 0 : _this$_onEndCb.call(this);
            nativeAudio.destroy(); // @ts-expect-error Type 'null' is not assignable to type 'InnerAudioContext'.

            this._innerAudioContext = null;
          });
        }

        play() {
          this._innerAudioContext.play();
        }

        stop() {
          this._innerAudioContext.stop();
        }

      });

      _export("AudioPlayerMinigame", AudioPlayerMinigame = (_class = class AudioPlayerMinigame {
        _resetSeekCache() {
          this._cacheTime = 0;
          this._needSeek = false;
          this._seeking = false;
        }
        /**
         * @deprecated since v3.5.0, this is an engine private interface that will be removed in the future.
         */


        constructor(innerAudioContext) {
          this._innerAudioContext = void 0;
          this._state = AudioState.INIT;
          this._cacheTime = 0;
          this._needSeek = false;
          this._seeking = false;
          this._onPlay = void 0;
          this._onPause = void 0;
          this._onStop = void 0;
          this._onSeeked = void 0;
          this._onEnded = void 0;
          this._readyToHandleOnShow = false;
          this._eventTarget = new EventTarget();
          this._operationQueue = [];
          this._innerAudioContext = innerAudioContext;
          this._eventTarget = new EventTarget(); // event

          game.on(Game.EVENT_PAUSE, this._onInterruptedBegin, this);
          game.on(Game.EVENT_RESUME, this._onInterruptedEnd, this);
          const eventTarget = this._eventTarget;

          this._onPlay = () => {
            this._state = AudioState.PLAYING;
            eventTarget.emit(AudioEvent.PLAYED);

            if (this._needSeek) {
              this.seek(this._cacheTime).catch(e => {});
            }
          };

          innerAudioContext.onPlay(this._onPlay);

          this._onPause = () => {
            this._state = AudioState.PAUSED;

            try {
              const currentTime = this._innerAudioContext.currentTime;

              if (currentTime !== null && currentTime !== undefined) {
                this._cacheTime = currentTime;
              }
            } catch {// Do nothing, cacheTime is not updated.
            }

            eventTarget.emit(AudioEvent.PAUSED);
          };

          innerAudioContext.onPause(this._onPause);

          this._onStop = () => {
            this._state = AudioState.STOPPED; // Reset all properties

            this._resetSeekCache();

            eventTarget.emit(AudioEvent.STOPPED);
            const currentTime = this._innerAudioContext ? this._innerAudioContext.currentTime : 0;

            if (currentTime !== 0) {
              this._innerAudioContext.seek(0);
            }
          };

          innerAudioContext.onStop(this._onStop);

          this._onSeeked = () => {
            eventTarget.emit(AudioEvent.SEEKED);
            this._seeking = false;

            if (this._needSeek) {
              this._needSeek = false;

              if (this._cacheTime.toFixed(3) !== this._innerAudioContext.currentTime.toFixed(3)) {
                this.seek(this._cacheTime).catch(e => {});
              } else {
                this._needSeek = false;
              }
            }
          };

          innerAudioContext.onSeeked(this._onSeeked);

          this._onEnded = () => {
            this._state = AudioState.INIT;

            this._resetSeekCache();

            eventTarget.emit(AudioEvent.ENDED);
          };

          innerAudioContext.onEnded(this._onEnded);
        }

        destroy() {
          game.off(Game.EVENT_PAUSE, this._onInterruptedBegin, this);
          game.off(Game.EVENT_RESUME, this._onInterruptedEnd, this);

          if (this._innerAudioContext) {
            ['Play', 'Pause', 'Stop', 'Seeked', 'Ended'].forEach(event => {
              this._offEvent(event);
            }); // NOTE: innewAudioContext might not stop the audio playing, have to call it explicitly.

            this._innerAudioContext.stop();

            this._innerAudioContext.destroy(); // @ts-expect-error Type 'null' is not assignable to type 'InnerAudioContext'


            this._innerAudioContext = null;
          }
        }

        _onInterruptedBegin() {
          if (this._state === AudioState.PLAYING) {
            this.pause().then(() => {
              this._state = AudioState.INTERRUPTED;
              this._readyToHandleOnShow = true;

              this._eventTarget.emit(AudioEvent.INTERRUPTION_BEGIN);
            }).catch(e => {});
          }
        }

        _onInterruptedEnd() {
          // We don't know whether onShow or resolve callback in pause promise is called at first.
          if (!this._readyToHandleOnShow) {
            this._eventTarget.once(AudioEvent.INTERRUPTION_BEGIN, this._onInterruptedEnd, this);

            return;
          }

          if (this._state === AudioState.INTERRUPTED) {
            this.play().then(() => {
              this._eventTarget.emit(AudioEvent.INTERRUPTION_END);
            }).catch(e => {});
          }

          this._readyToHandleOnShow = false;
        }

        _offEvent(eventName) {
          if (this[`_on${eventName}`]) {
            this._innerAudioContext[`off${eventName}`](this[`_on${eventName}`]);

            this[`_on${eventName}`] = null;
          }
        }

        get src() {
          return this._innerAudioContext ? this._innerAudioContext.src : '';
        }

        get type() {
          return AudioType.MINIGAME_AUDIO;
        }

        static load(url) {
          return new Promise(resolve => {
            AudioPlayerMinigame.loadNative(url).then(innerAudioContext => {
              resolve(new AudioPlayerMinigame(innerAudioContext));
            }).catch(e => {});
          });
        }

        static loadNative(url) {
          return new Promise((resolve, reject) => {
            const innerAudioContext = minigame.createInnerAudioContext();
            const timer = setTimeout(() => {
              clearEvent();
              resolve(innerAudioContext);
            }, 8000);

            function clearEvent() {
              innerAudioContext.offCanplay(success);
              innerAudioContext.offError(fail);
            }

            function success() {
              clearEvent();
              clearTimeout(timer);
              resolve(innerAudioContext);
            }

            function fail(err) {
              clearEvent();
              clearTimeout(timer);
              console.error('failed to load innerAudioContext');
              reject(new Error(err));
            }

            innerAudioContext.onCanplay(success);
            innerAudioContext.onError(fail);
            innerAudioContext.src = url;
          });
        }

        static loadOneShotAudio(url, volume) {
          return new Promise((resolve, reject) => {
            AudioPlayerMinigame.loadNative(url).then(innerAudioContext => {
              // @ts-expect-error AudioPlayer should be a friend class in OneShotAudio
              resolve(new OneShotAudioMinigame(innerAudioContext, volume));
            }).catch(reject);
          });
        }

        get state() {
          return this._state;
        }

        get loop() {
          return this._innerAudioContext.loop;
        }

        set loop(val) {
          this._innerAudioContext.loop = val;
        }

        get volume() {
          return this._innerAudioContext.volume;
        }

        set volume(val) {
          val = clamp01(val);
          this._innerAudioContext.volume = val;
        }

        get duration() {
          // KNOWN ISSUES: duration doesn't work well
          // On WeChat platform, duration is 0 at the time audio is loaded.
          return this._innerAudioContext.duration;
        }

        get currentTime() {
          if (this._state !== AudioState.PLAYING || this._needSeek || this._seeking) {
            return this._cacheTime;
          }

          return this._innerAudioContext.currentTime;
        }

        get sampleRate() {
          return 0;
        }

        getPCMData(channelIndex) {
          return undefined;
        }

        seek(time) {
          return new Promise(resolve => {
            // KNOWN ISSUES: on Baidu: currentTime returns without numbers on decimal places
            if (this._state === AudioState.PLAYING && !this._seeking) {
              time = clamp(time, 0, this.duration);
              this._seeking = true;

              this._innerAudioContext.seek(time);
            } else if (this._cacheTime !== time) {
              // Skip the invalid seek
              this._cacheTime = time;
              this._needSeek = true;
            }

            resolve();
          });
        }

        play() {
          return new Promise(resolve => {
            this._eventTarget.once(AudioEvent.PLAYED, resolve);

            this._innerAudioContext.play();
          });
        }

        pause() {
          return new Promise(resolve => {
            if (this.state !== AudioState.PLAYING) {
              resolve();
            } else {
              this._eventTarget.once(AudioEvent.PAUSED, resolve);

              this._innerAudioContext.pause();
            }
          });
        }

        stop() {
          // NOTE: on Taobao, it is designed that innerAudioContext is useless after calling stop.
          // so we implement stop as pase + seek.
          if (TAOBAO || TAOBAO_MINIGAME) {
            var _this$_onStop;

            this._innerAudioContext.pause();

            this._innerAudioContext.seek(0);

            (_this$_onStop = this._onStop) === null || _this$_onStop === void 0 ? void 0 : _this$_onStop.call(this);
            return Promise.resolve();
          }

          return new Promise(resolve => {
            this._eventTarget.once(AudioEvent.STOPPED, resolve);

            this._innerAudioContext.stop();
          });
        }

        onInterruptionBegin(cb) {
          this._eventTarget.on(AudioEvent.INTERRUPTION_BEGIN, cb);
        }

        offInterruptionBegin(cb) {
          this._eventTarget.off(AudioEvent.INTERRUPTION_BEGIN, cb);
        }

        onInterruptionEnd(cb) {
          this._eventTarget.on(AudioEvent.INTERRUPTION_END, cb);
        }

        offInterruptionEnd(cb) {
          this._eventTarget.off(AudioEvent.INTERRUPTION_END, cb);
        }

        onEnded(cb) {
          this._eventTarget.on(AudioEvent.ENDED, cb);
        }

        offEnded(cb) {
          this._eventTarget.off(AudioEvent.ENDED, cb);
        }

      }, (_applyDecoratedDescriptor(_class.prototype, "seek", [enqueueOperation], Object.getOwnPropertyDescriptor(_class.prototype, "seek"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "play", [enqueueOperation], Object.getOwnPropertyDescriptor(_class.prototype, "play"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "pause", [enqueueOperation], Object.getOwnPropertyDescriptor(_class.prototype, "pause"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "stop", [enqueueOperation], Object.getOwnPropertyDescriptor(_class.prototype, "stop"), _class.prototype)), _class));
    }
  };
});