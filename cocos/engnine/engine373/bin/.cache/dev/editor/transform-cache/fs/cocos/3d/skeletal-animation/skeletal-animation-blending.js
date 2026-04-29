System.register("q-bundled:///fs/cocos/3d/skeletal-animation/skeletal-animation-blending.js", ["../../../../virtual/internal%253Aconstants.js", "../../core/index.js", "./limits.js"], function (_export, _context) {
  "use strict";

  var DEBUG, Vec3, Quat, assertIsTrue, MAX_ANIMATION_LAYER, BlendStateBuffer, BlendStateWriterInternal, LegacyVec3PropertyBlendState, LegacyQuatPropertyBlendState, NodeBlendState, LegacyNodeBlendState, LegacyBlendStateBuffer, LayeredVec3PropertyBlendState, LayeredQuatPropertyBlendState, LayeredNodeBlendState, LayeredBlendStateBuffer, TransformApplyFlag, TRANSFORM_APPLY_FLAGS_ALL;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function checkLayerIndex(layerIndex) {
    assertIsTrue(layerIndex < MAX_ANIMATION_LAYER);
  }

  function mixAveragedVec3(result, previous, accumulatedWeight, input, weight) {
    const newSum = accumulatedWeight + weight;

    if (weight === 1.0 && !accumulatedWeight) {
      Vec3.copy(result, input);
    } else if (newSum) {
      const t = weight / newSum;
      Vec3.lerp(result, result, input, t);
    }

    return newSum;
  }

  function mixAveragedQuat(result, previous, accumulatedWeight, input, weight) {
    const newSum = accumulatedWeight + weight;

    if (weight === 1.0 && !accumulatedWeight) {
      Quat.copy(result, input);
    } else if (newSum) {
      const t = weight / newSum;
      Quat.slerp(result, previous, input, t);
    }

    return newSum;
  }

  _export({
    BlendStateBuffer: void 0,
    LegacyBlendStateBuffer: void 0,
    LayeredBlendStateBuffer: void 0
  });

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      DEBUG = _virtualInternal253AconstantsJs.DEBUG;
    }, function (_coreIndexJs) {
      Vec3 = _coreIndexJs.Vec3;
      Quat = _coreIndexJs.Quat;
      assertIsTrue = _coreIndexJs.assertIsTrue;
    }, function (_limitsJs) {
      MAX_ANIMATION_LAYER = _limitsJs.MAX_ANIMATION_LAYER;
    }],
    execute: function () {
      _export("BlendStateBuffer", BlendStateBuffer = class BlendStateBuffer {
        constructor() {
          this._nodeBlendStates = new Map();
        }

        createWriter(node, property, host, constants) {
          const propertyBlendState = this.ref(node, property);
          return new BlendStateWriterInternal(node, property, propertyBlendState, host, constants);
        }

        destroyWriter(writer) {
          const internal = writer;
          this.deRef(internal.node, internal.property);
        }

        ref(node, property) {
          let nodeBlendState = this._nodeBlendStates.get(node);

          if (!nodeBlendState) {
            nodeBlendState = this.createNodeBlendState();

            this._nodeBlendStates.set(node, nodeBlendState);
          }

          const propertyBlendState = nodeBlendState.refProperty(node, property);
          return propertyBlendState;
        }

        deRef(node, property) {
          const nodeBlendState = this._nodeBlendStates.get(node);

          if (!nodeBlendState) {
            return;
          }

          nodeBlendState.deRefProperty(property);

          if (nodeBlendState.empty) {
            this._nodeBlendStates.delete(node);
          }
        }

        apply() {
          this._nodeBlendStates.forEach((nodeBlendState, node) => {
            nodeBlendState.apply(node);
          });
        }

      });

      BlendStateWriterInternal = class BlendStateWriterInternal {
        constructor(_node, _property, _propertyBlendState, _host, _constants) {
          this._node = _node;
          this._property = _property;
          this._propertyBlendState = _propertyBlendState;
          this._host = _host;
          this._constants = _constants;
        }

        get node() {
          return this._node;
        }

        get property() {
          return this._property;
        }

        getValue() {
          return this._node[this._property];
        }

        setValue(value) {
          const {
            _propertyBlendState: propertyBlendState,
            _host: host
          } = this;
          const weight = host.weight; // @ts-expect-error Complex typing

          propertyBlendState.blend(value, weight);
        }

      };

      (function (TransformApplyFlag) {
        TransformApplyFlag[TransformApplyFlag["POSITION"] = 1] = "POSITION";
        TransformApplyFlag[TransformApplyFlag["ROTATION"] = 2] = "ROTATION";
        TransformApplyFlag[TransformApplyFlag["SCALE"] = 4] = "SCALE";
        TransformApplyFlag[TransformApplyFlag["EULER_ANGLES"] = 8] = "EULER_ANGLES";
      })(TransformApplyFlag || (TransformApplyFlag = {}));

      TRANSFORM_APPLY_FLAGS_ALL = TransformApplyFlag.POSITION | TransformApplyFlag.ROTATION | TransformApplyFlag.SCALE | TransformApplyFlag.EULER_ANGLES;
      LegacyVec3PropertyBlendState = class LegacyVec3PropertyBlendState {
        constructor() {
          this.refCount = 0;
          this.accumulatedWeight = 0.0;
          this.result = new Vec3();
        }

        blend(value, weight) {
          this.accumulatedWeight = mixAveragedVec3(this.result, this.result, this.accumulatedWeight, value, weight);
        }

        reset() {
          this.accumulatedWeight = 0.0;
          Vec3.zero(this.result);
        }

      };
      LegacyQuatPropertyBlendState = class LegacyQuatPropertyBlendState {
        constructor() {
          this.refCount = 0;
          this.accumulatedWeight = 0.0;
          this.result = new Quat();
        }

        blend(value, weight) {
          this.accumulatedWeight = mixAveragedQuat(this.result, this.result, this.accumulatedWeight, value, weight);
        }

        reset() {
          this.accumulatedWeight = 0.0;
          Quat.identity(this.result);
        }

      };
      NodeBlendState = class NodeBlendState {
        constructor() {
          this._transformApplyFlags = 0;
          this._properties = {};
        }

        get empty() {
          const {
            _properties: properties
          } = this;
          return !properties.position && !properties.rotation && !properties.eulerAngles && !properties.scale;
        }

        refProperty(node, property) {
          var _properties$property, _properties$property2;

          const {
            _properties: properties
          } = this;
          let propertyBlendState;

          switch (property) {
            default:
            case 'position':
            case 'scale':
            case 'eulerAngles':
              propertyBlendState = (_properties$property = properties[property]) !== null && _properties$property !== void 0 ? _properties$property : properties[property] = this._createVec3BlendState(node[property]);
              break;

            case 'rotation':
              propertyBlendState = (_properties$property2 = properties[property]) !== null && _properties$property2 !== void 0 ? _properties$property2 : properties[property] = this._createQuatBlendState(node.rotation);
              break;
          }

          ++propertyBlendState.refCount;
          return propertyBlendState;
        }

        deRefProperty(property) {
          const {
            _properties: properties
          } = this;
          const propertyBlendState = properties[property];

          if (!propertyBlendState) {
            return;
          }

          --propertyBlendState.refCount;

          if (propertyBlendState.refCount > 0) {
            return;
          }

          delete properties[property];
        }

        apply(node) {
          const {
            _transformApplyFlags: transformApplyFlags,
            _properties: {
              position,
              scale,
              rotation,
              eulerAngles
            }
          } = this;

          if (!transformApplyFlags) {
            return;
          }

          let t;
          let s;
          let r;

          if (position && transformApplyFlags & TransformApplyFlag.POSITION) {
            t = position.result;
          }

          if (scale && transformApplyFlags & TransformApplyFlag.SCALE) {
            s = scale.result;
          }

          if (eulerAngles && transformApplyFlags & TransformApplyFlag.EULER_ANGLES) {
            r = eulerAngles.result;
          }

          if (rotation && transformApplyFlags & TransformApplyFlag.ROTATION) {
            r = rotation.result;
          }

          if (r || t || s) {
            node.setRTS(r, t, s);
          }

          this._transformApplyFlags = 0;
        }

      };
      LegacyNodeBlendState = class LegacyNodeBlendState extends NodeBlendState {
        apply(node) {
          const {
            _properties: {
              position,
              scale,
              rotation,
              eulerAngles
            }
          } = this;

          if (position && position.accumulatedWeight) {
            this._transformApplyFlags |= TransformApplyFlag.POSITION;

            if (position.accumulatedWeight < 1.0) {
              position.blend(node.position, 1.0 - position.accumulatedWeight);
            }
          }

          if (scale && scale.accumulatedWeight) {
            this._transformApplyFlags |= TransformApplyFlag.SCALE;

            if (scale.accumulatedWeight < 1.0) {
              scale.blend(node.scale, 1.0 - scale.accumulatedWeight);
            }
          }

          if (eulerAngles && eulerAngles.accumulatedWeight) {
            this._transformApplyFlags |= TransformApplyFlag.EULER_ANGLES;

            if (eulerAngles.accumulatedWeight < 1.0) {
              eulerAngles.blend(node.eulerAngles, 1.0 - eulerAngles.accumulatedWeight);
            }
          }

          if (rotation && rotation.accumulatedWeight) {
            this._transformApplyFlags |= TransformApplyFlag.ROTATION;

            if (rotation.accumulatedWeight < 1.0) {
              rotation.blend(node.rotation, 1.0 - rotation.accumulatedWeight);
            }
          }

          super.apply(node);
          position === null || position === void 0 ? void 0 : position.reset();
          scale === null || scale === void 0 ? void 0 : scale.reset();
          rotation === null || rotation === void 0 ? void 0 : rotation.reset();
          eulerAngles === null || eulerAngles === void 0 ? void 0 : eulerAngles.reset();
        }

        _createVec3BlendState(_currentValue) {
          return new LegacyVec3PropertyBlendState();
        }

        _createQuatBlendState(_currentValue) {
          return new LegacyQuatPropertyBlendState();
        }

      };

      _export("LegacyBlendStateBuffer", LegacyBlendStateBuffer = class LegacyBlendStateBuffer extends BlendStateBuffer {
        createNodeBlendState() {
          return new LegacyNodeBlendState();
        }

      });

      LayeredVec3PropertyBlendState = class LayeredVec3PropertyBlendState {
        constructor(defaultValue) {
          this.refCount = 0;
          this.result = new Vec3();
          this._defaultValue = new Vec3();
          this._clipBlendResult = new Vec3();
          this._accumulatedWeight = 0.0;
          Vec3.copy(this._defaultValue, defaultValue);
          Vec3.copy(this.result, defaultValue);
        }

        blend(value, weight) {
          this._accumulatedWeight = mixAveragedVec3(this._clipBlendResult, this._clipBlendResult, this._accumulatedWeight, value, weight);
        }

        commitLayerChange(weight) {
          const {
            result,
            _clipBlendResult: clipBlendResult,
            _accumulatedWeight: accumulatedWeight
          } = this;

          if (accumulatedWeight < 1.0) {
            this.blend(this._defaultValue, 1.0 - accumulatedWeight);
          }

          Vec3.lerp(result, result, clipBlendResult, weight);
          Vec3.zero(this._clipBlendResult);
          this._accumulatedWeight = 0.0;
        }

        reset() {
          Vec3.copy(this.result, this._defaultValue);
        }

      };
      LayeredQuatPropertyBlendState = class LayeredQuatPropertyBlendState {
        constructor(defaultValue) {
          this.refCount = 0;
          this.result = new Quat();
          this._defaultValue = new Quat();
          this._clipBlendResult = new Quat();
          this._accumulatedWeight = 0.0;
          Quat.copy(this._defaultValue, defaultValue);
          Quat.copy(this.result, defaultValue);
        }

        blend(value, weight) {
          this._accumulatedWeight = mixAveragedQuat(this._clipBlendResult, this._clipBlendResult, this._accumulatedWeight, value, weight);
        }

        commitLayerChange(weight) {
          const {
            result,
            _clipBlendResult: clipBlendResult,
            _accumulatedWeight: accumulatedWeight
          } = this;

          if (accumulatedWeight < 1.0) {
            this.blend(this._defaultValue, 1.0 - accumulatedWeight);
          }

          Quat.slerp(result, result, clipBlendResult, weight);
          Quat.identity(this._clipBlendResult);
          this._accumulatedWeight = 0.0;
        }

        reset() {
          Quat.copy(this.result, this._defaultValue);
        }

      };
      LayeredNodeBlendState = class LayeredNodeBlendState extends NodeBlendState {
        constructor(...args) {
          super(...args);
          this._layerMask = ~0 >>> 0;
        }

        setLayerMask(layerIndex) {
          this._layerMask &= ~(1 << layerIndex);
        }

        commitLayerChanges(layerIndex, weight) {
          if (!(this._layerMask & 1 << layerIndex)) {
            return;
          }

          const {
            _properties: {
              position,
              scale,
              rotation,
              eulerAngles
            }
          } = this;

          if (position) {
            position.commitLayerChange(weight);
          }

          if (scale) {
            scale.commitLayerChange(weight);
          }

          if (rotation) {
            rotation.commitLayerChange(weight);
          }

          if (eulerAngles) {
            eulerAngles.commitLayerChange(weight);
          }
        }

        apply(node) {
          // Layered buffer always enable all flags.
          this._transformApplyFlags = TRANSFORM_APPLY_FLAGS_ALL;
          super.apply(node);
          const {
            _properties: {
              position,
              scale,
              rotation,
              eulerAngles
            }
          } = this;
          position === null || position === void 0 ? void 0 : position.reset();
          scale === null || scale === void 0 ? void 0 : scale.reset();
          rotation === null || rotation === void 0 ? void 0 : rotation.reset();
          eulerAngles === null || eulerAngles === void 0 ? void 0 : eulerAngles.reset();
        }

        _createVec3BlendState(currentValue) {
          return new LayeredVec3PropertyBlendState(currentValue);
        }

        _createQuatBlendState(currentValue) {
          return new LayeredQuatPropertyBlendState(currentValue);
        }

      };
      /**
       * The blend state buffer is an internal facility
       * used by Creator to implements animation blending.
       *
       * The workflow of a blend state buffer is described as following:
       *
       * - Create writers onto the buffer.
       *
       *   Through `createWriter()`.
       *
       * - Set layer masks.
       *
       *   Each layer should set its mask, if any.
       *
       * - Call the following steps in every buffer frame.
       *
       * - Change to layer: sample animation.
       *
       *   The animations would write into the "clip blending buffer"
       *   through `BlendStateWriter` created by the buffer.
       *   The writing process can be weighted. The weight represents the contribution to the blending.
       *   Let's call this kind of blending "clip blending".
       *
       * - Commit layer changes.
       *
       *   While all animations within the layer are sampled. The clip blending buffer holds
       *   the blend result of the layer.
       *   Then, a `commitLayerChanges()` call should be made to commit the changes to final result buffer,
       *   using another algorithm. Let's call this kind of blending "layer blending".
       *
       * - Apply.
       *
       *   After ran above steps for all layers. An `apply()` call
       *   causes the final result buffer content flush into scene.
       *
       * The following demonstrates the algorithms used in "clip blending" and "layer blending", respectively.
       *
       * ### Algorithm used in clip blending and legacy animation system(i.e in cross fading).
       *
       * In short: the weights of samples are normalized,
       * and the samples are scaled multiplied by their normalized weight,
       * and then add up them all together.
       *
       * Let:
       * - `N` be the count of samples to blend;
       * - `v_n` be n-th sample's value;
       * - `w_n` be n-th sample's weight;
       * - `v_current` be current value.
       * - `W_n` be the accumulated weights from 0 to n-th sample.
       *
       * The blend result after mix with n-th sample, denoted by `R_n`, is calculated as:
       *
       * ```
       * R_n = sum(i=0, n, v_i * (w_i / W_n))
       *     = (R_(n-1) * W_(n-1) + v_n * w_n) / (W_(n-1) + w_n)
       * ```
       *
       * The final blend result produced in addition blend with current pose:
       *
       * ```
       * R_final = R_N * W_N + V_current * (1 - W_N) | if W_N < 1
       * R_final = R_N                               | Otherwise
       * ```
       *
       * ### Algorithm used in layer blending(Marionette animation system).
       *
       * In short: each layer is added onto previous content,
       * the previous layer and itself are weighted by its weight.
       *
       * Let:
       * - `N` be the count of samples to blend;
       * - `V_n` be n-th sample's output;
       * - `w_n` be n-th sample's weight;
       * - `V_default` be the default pose.
       *
       * The blend result after mix with n-th sample, denoted by `R_n`, is calculated as:
       *
       * ```
       * R_0 = V_default * (1 - w_0) + V_0 * w_0
       * R_n = R_(n-1) * (1 - w_n) + V_n * w_n    | if n ≠ 0
       * ```
       *
       * The final blend result is simply the N-th result, or the default pose is no input samples:
       *
       * ```
       * R_final = R_N         | if N ≠ 0
       * R_final = V_default   | if N = 0
       * ```
       * ```
       */

      _export("LayeredBlendStateBuffer", LayeredBlendStateBuffer = class LayeredBlendStateBuffer extends BlendStateBuffer {
        setMask(layerIndex, excludeNodes) {
          if (DEBUG) {
            checkLayerIndex(layerIndex);
          }

          this._nodeBlendStates.forEach((nodeBlendState, node) => {
            if (excludeNodes.has(node)) {
              nodeBlendState.setLayerMask(layerIndex);
            }
          });
        }

        commitLayerChanges(layerIndex, weight) {
          if (DEBUG) {
            checkLayerIndex(layerIndex);
          }

          this._nodeBlendStates.forEach((nodeBlendState, node) => {
            nodeBlendState.commitLayerChanges(layerIndex, weight);
          });
        }

        createNodeBlendState() {
          return new LayeredNodeBlendState();
        }

      });
    }
  };
});