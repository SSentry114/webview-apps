System.register("q-bundled:///fs/cocos/animation/compression/compressed-data.js", ["../../curves/keys-shared-curves", "../../data/decorators", "../../math", "../define.js", "../tracks/track.js"], function (_export, _context) {
  "use strict";

  var KeySharedQuatCurves, KeySharedRealCurves, ccclass, serializable, Quat, Vec2, Vec3, Vec4, CLASS_NAME_PREFIX_ANIM, trackBindingTag, CompressedDataEvaluator, _dec, _class, _class2, _initializer, _initializer2, _initializer3, _initializer4, CompressedData, CompressedDataTrackType;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedInitializer(target, property, decorators, initializer) {
    return decorators.slice().reverse().reduce(function (decoratedInitializer, decorator) {
      return decorator(target, property, decoratedInitializer) || decoratedInitializer;
    }, initializer);
  }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  _export("CompressedDataEvaluator", void 0);

  return {
    setters: [function (_curvesKeysSharedCurves) {
      KeySharedQuatCurves = _curvesKeysSharedCurves.KeySharedQuatCurves;
      KeySharedRealCurves = _curvesKeysSharedCurves.KeySharedRealCurves;
    }, function (_dataDecorators) {
      ccclass = _dataDecorators.ccclass;
      serializable = _dataDecorators.serializable;
    }, function (_math) {
      Quat = _math.Quat;
      Vec2 = _math.Vec2;
      Vec3 = _math.Vec3;
      Vec4 = _math.Vec4;
    }, function (_defineJs) {
      CLASS_NAME_PREFIX_ANIM = _defineJs.CLASS_NAME_PREFIX_ANIM;
    }, function (_tracksTrackJs) {
      trackBindingTag = _tracksTrackJs.trackBindingTag;
    }],
    execute: function () {
      _export("CompressedData", CompressedData = (_dec = ccclass(`${CLASS_NAME_PREFIX_ANIM}CompressedData`), _dec(_class = (_class2 = class CompressedData {
        constructor() {
          this._curves = _initializer && _initializer();
          this._tracks = _initializer2 && _initializer2();
          this._quatCurves = _initializer3 && _initializer3();
          this._quatTracks = _initializer4 && _initializer4();
        }

        compressRealTrack(track) {
          const curve = track.channel.curve;
          const mayBeCompressed = KeySharedRealCurves.allowedForCurve(curve);

          if (!mayBeCompressed) {
            return false;
          }

          this._tracks.push({
            type: CompressedDataTrackType.FLOAT,
            binding: track[trackBindingTag],
            components: [this._addRealCurve(curve)]
          });

          return true;
        }

        compressVectorTrack(vectorTrack) {
          const nComponents = vectorTrack.componentsCount;
          const channels = vectorTrack.channels();
          const mayBeCompressed = channels.every(({
            curve
          }) => KeySharedRealCurves.allowedForCurve(curve));

          if (!mayBeCompressed) {
            return false;
          }

          const components = new Array(nComponents);

          for (let i = 0; i < nComponents; ++i) {
            const channel = channels[i];
            components[i] = this._addRealCurve(channel.curve);
          }

          this._tracks.push({
            type: nComponents === 2 ? CompressedDataTrackType.VEC2 : nComponents === 3 ? CompressedDataTrackType.VEC3 : CompressedDataTrackType.VEC4,
            binding: vectorTrack[trackBindingTag],
            components
          });

          return true;
        }

        compressQuatTrack(track) {
          const curve = track.channel.curve;
          const mayBeCompressed = KeySharedQuatCurves.allowedForCurve(curve);

          if (!mayBeCompressed) {
            return false;
          }

          this._quatTracks.push({
            binding: track[trackBindingTag],
            pointer: this._addQuatCurve(curve)
          });

          return true;
        }

        createEval(binder) {
          const compressedDataEvalStatus = {
            keySharedCurvesEvalStatuses: [],
            trackEvalStatuses: [],
            keysSharedQuatCurvesEvalStatues: [],
            quatTrackEvalStatuses: []
          };
          const {
            keySharedCurvesEvalStatuses,
            trackEvalStatuses,
            keysSharedQuatCurvesEvalStatues,
            quatTrackEvalStatuses
          } = compressedDataEvalStatus;

          for (const curves of this._curves) {
            keySharedCurvesEvalStatuses.push({
              curves,
              result: new Array(curves.curveCount).fill(0.0)
            });
          }

          for (const track of this._tracks) {
            const trackTarget = binder(track.binding);

            if (!trackTarget) {
              continue;
            }

            let immediate;

            switch (track.type) {
              default:
              case CompressedDataTrackType.FLOAT:
                break;

              case CompressedDataTrackType.VEC2:
                immediate = new Vec2();
                break;

              case CompressedDataTrackType.VEC3:
                immediate = new Vec3();
                break;

              case CompressedDataTrackType.VEC4:
                immediate = new Vec4();
                break;
            }

            trackEvalStatuses.push({
              type: track.type,
              target: trackTarget,
              curves: track.components,
              immediate
            });
          }

          for (const curves of this._quatCurves) {
            keysSharedQuatCurvesEvalStatues.push({
              curves,
              result: Array.from({
                length: curves.curveCount
              }, () => new Quat())
            });
          }

          for (const track of this._quatTracks) {
            const trackTarget = binder(track.binding);

            if (!trackTarget) {
              continue;
            }

            quatTrackEvalStatuses.push({
              target: trackTarget,
              curve: track.pointer
            });
          }

          return new CompressedDataEvaluator(compressedDataEvalStatus);
        }

        collectAnimatedJoints() {
          const joints = [];

          for (const track of this._tracks) {
            const trsPath = track.binding.parseTrsPath();

            if (trsPath) {
              joints.push(trsPath.node);
            }
          }

          return joints;
        }

        _addRealCurve(curve) {
          const times = Array.from(curve.times());

          let iKeySharedCurves = this._curves.findIndex(shared => shared.matchCurve(curve));

          if (iKeySharedCurves < 0) {
            iKeySharedCurves = this._curves.length;
            const keySharedCurves = new KeySharedRealCurves(times);

            this._curves.push(keySharedCurves);
          }

          const iCurve = this._curves[iKeySharedCurves].curveCount;

          this._curves[iKeySharedCurves].addCurve(curve);

          return {
            shared: iKeySharedCurves,
            component: iCurve
          };
        }
        /**
         * @internal
         */


        _addQuatCurve(curve) {
          const times = Array.from(curve.times());

          let iKeySharedCurves = this._quatCurves.findIndex(shared => shared.matchCurve(curve));

          if (iKeySharedCurves < 0) {
            iKeySharedCurves = this._quatCurves.length;
            const keySharedCurves = new KeySharedQuatCurves(times);

            this._quatCurves.push(keySharedCurves);
          }

          const iCurve = this._quatCurves[iKeySharedCurves].curveCount;

          this._quatCurves[iKeySharedCurves].addCurve(curve);

          return {
            shared: iKeySharedCurves,
            curve: iCurve
          };
        }

        validate() {
          return this._tracks.length > 0;
        }

      }, (_initializer = _applyDecoratedInitializer(_class2.prototype, "_curves", [serializable], function () {
        return [];
      }), _initializer2 = _applyDecoratedInitializer(_class2.prototype, "_tracks", [serializable], function () {
        return [];
      }), _initializer3 = _applyDecoratedInitializer(_class2.prototype, "_quatCurves", [serializable], function () {
        return [];
      }), _initializer4 = _applyDecoratedInitializer(_class2.prototype, "_quatTracks", [serializable], function () {
        return [];
      })), _class2)) || _class));

      _export("CompressedDataEvaluator", CompressedDataEvaluator = class CompressedDataEvaluator {
        constructor(compressedDataEvalStatus) {
          this._compressedDataEvalStatus = void 0;
          this._compressedDataEvalStatus = compressedDataEvalStatus;
        }

        evaluate(time) {
          const {
            keySharedCurvesEvalStatuses,
            trackEvalStatuses: compressedTrackEvalStatuses,
            keysSharedQuatCurvesEvalStatues,
            quatTrackEvalStatuses
          } = this._compressedDataEvalStatus;

          const getPreEvaluated = pointer => keySharedCurvesEvalStatuses[pointer.shared].result[pointer.component];

          for (const {
            curves,
            result
          } of keySharedCurvesEvalStatuses) {
            curves.evaluate(time, result);
          }

          for (const {
            type,
            target,
            immediate,
            curves
          } of compressedTrackEvalStatuses) {
            let value = immediate;

            switch (type) {
              default:
                break;

              case CompressedDataTrackType.FLOAT:
                value = getPreEvaluated(curves[0]);
                break;

              case CompressedDataTrackType.VEC2:
                Vec2.set(value, getPreEvaluated(curves[0]), getPreEvaluated(curves[1]));
                break;

              case CompressedDataTrackType.VEC3:
                Vec3.set(value, getPreEvaluated(curves[0]), getPreEvaluated(curves[1]), getPreEvaluated(curves[2]));
                break;

              case CompressedDataTrackType.VEC4:
                Vec4.set(value, getPreEvaluated(curves[0]), getPreEvaluated(curves[1]), getPreEvaluated(curves[2]), getPreEvaluated(curves[4]));
                break;
            }

            target.setValue(value);
          }

          for (const {
            curves,
            result
          } of keysSharedQuatCurvesEvalStatues) {
            curves.evaluate(time, result);
          }

          for (const {
            target,
            curve
          } of quatTrackEvalStatuses) {
            target.setValue(keysSharedQuatCurvesEvalStatues[curve.shared].result[curve.curve]);
          }
        }

      });

      (function (CompressedDataTrackType) {
        CompressedDataTrackType[CompressedDataTrackType["FLOAT"] = 0] = "FLOAT";
        CompressedDataTrackType[CompressedDataTrackType["VEC2"] = 1] = "VEC2";
        CompressedDataTrackType[CompressedDataTrackType["VEC3"] = 2] = "VEC3";
        CompressedDataTrackType[CompressedDataTrackType["VEC4"] = 3] = "VEC4";
      })(CompressedDataTrackType || (CompressedDataTrackType = {}));
    }
  };
});