System.register("q-bundled:///fs/cocos/3d/skeletal-animation/skeletal-animation-blending.js", ["../../../../virtual/internal%253Aconstants.js", "../../core/index.js", "./limits.js"], function (_export, _context) {
  "use strict";

  var DEBUG, Vec3, Quat, assertIsTrue, MAX_ANIMATION_LAYER, BlendStateBuffer, BlendStateWriterInternal, TransformApplyFlag, TRANSFORM_APPLY_FLAGS_ALL, LegacyVec3PropertyBlendState, LegacyQuatPropertyBlendState, NodeBlendState, LegacyNodeBlendState, LegacyBlendStateBuffer, LayeredVec3PropertyBlendState, LayeredQuatPropertyBlendState, LayeredNodeBlendState, LayeredBlendStateBuffer;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function checkLayerIndex(layerIndex) {
    assertIsTrue(layerIndex < MAX_ANIMATION_LAYER);
  }

  function mixAveragedVec3(result, previous, accumulatedWeight, input, weight) {
    var newSum = accumulatedWeight + weight;

    if (weight === 1.0 && !accumulatedWeight) {
      Vec3.copy(result, input);
    } else if (newSum) {
      var t = weight / newSum;
      Vec3.lerp(result, result, input, t);
    }

    return newSum;
  }

  function mixAveragedQuat(result, previous, accumulatedWeight, input, weight) {
    var newSum = accumulatedWeight + weight;

    if (weight === 1.0 && !accumulatedWeight) {
      Quat.copy(result, input);
    } else if (newSum) {
      var t = weight / newSum;
      Quat.slerp(result, previous, input, t);
    }

    return newSum;
  }

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
      _export("BlendStateBuffer", BlendStateBuffer = /*#__PURE__*/function () {
        function BlendStateBuffer() {
          this._nodeBlendStates = new Map();
        }

        var _proto = BlendStateBuffer.prototype;

        _proto.createWriter = function createWriter(node, property, host, constants) {
          var propertyBlendState = this.ref(node, property);
          return new BlendStateWriterInternal(node, property, propertyBlendState, host, constants);
        };

        _proto.destroyWriter = function destroyWriter(writer) {
          var internal = writer;
          this.deRef(internal.node, internal.property);
        };

        _proto.ref = function ref(node, property) {
          var nodeBlendState = this._nodeBlendStates.get(node);

          if (!nodeBlendState) {
            nodeBlendState = this.createNodeBlendState();

            this._nodeBlendStates.set(node, nodeBlendState);
          }

          var propertyBlendState = nodeBlendState.refProperty(node, property);
          return propertyBlendState;
        };

        _proto.deRef = function deRef(node, property) {
          var nodeBlendState = this._nodeBlendStates.get(node);

          if (!nodeBlendState) {
            return;
          }

          nodeBlendState.deRefProperty(property);

          if (nodeBlendState.empty) {
            this._nodeBlendStates["delete"](node);
          }
        };

        _proto.apply = function apply() {
          this._nodeBlendStates.forEach(function (nodeBlendState, node) {
            nodeBlendState.apply(node);
          });
        };

        return BlendStateBuffer;
      }());

      BlendStateWriterInternal = /*#__PURE__*/function () {
        function BlendStateWriterInternal(_node, _property, _propertyBlendState, _host, _constants) {
          this._node = _node;
          this._property = _property;
          this._propertyBlendState = _propertyBlendState;
          this._host = _host;
          this._constants = _constants;
        }

        var _proto2 = BlendStateWriterInternal.prototype;

        _proto2.getValue = function getValue() {
          return this._node[this._property];
        };

        _proto2.setValue = function setValue(value) {
          var propertyBlendState = this._propertyBlendState,
              host = this._host;
          var weight = host.weight; // @ts-expect-error Complex typing

          propertyBlendState.blend(value, weight);
        };

        _createClass(BlendStateWriterInternal, [{
          key: "node",
          get: function get() {
            return this._node;
          }
        }, {
          key: "property",
          get: function get() {
            return this._property;
          }
        }]);

        return BlendStateWriterInternal;
      }();

      (function (TransformApplyFlag) {
        TransformApplyFlag[TransformApplyFlag["POSITION"] = 1] = "POSITION";
        TransformApplyFlag[TransformApplyFlag["ROTATION"] = 2] = "ROTATION";
        TransformApplyFlag[TransformApplyFlag["SCALE"] = 4] = "SCALE";
        TransformApplyFlag[TransformApplyFlag["EULER_ANGLES"] = 8] = "EULER_ANGLES";
      })(TransformApplyFlag || (TransformApplyFlag = {}));

      TRANSFORM_APPLY_FLAGS_ALL = TransformApplyFlag.POSITION | TransformApplyFlag.ROTATION | TransformApplyFlag.SCALE | TransformApplyFlag.EULER_ANGLES;

      LegacyVec3PropertyBlendState = /*#__PURE__*/function () {
        function LegacyVec3PropertyBlendState() {
          this.refCount = 0;
          this.accumulatedWeight = 0.0;
          this.result = new Vec3();
        }

        var _proto3 = LegacyVec3PropertyBlendState.prototype;

        _proto3.blend = function blend(value, weight) {
          this.accumulatedWeight = mixAveragedVec3(this.result, this.result, this.accumulatedWeight, value, weight);
        };

        _proto3.reset = function reset() {
          this.accumulatedWeight = 0.0;
          Vec3.zero(this.result);
        };

        return LegacyVec3PropertyBlendState;
      }();

      LegacyQuatPropertyBlendState = /*#__PURE__*/function () {
        function LegacyQuatPropertyBlendState() {
          this.refCount = 0;
          this.accumulatedWeight = 0.0;
          this.result = new Quat();
        }

        var _proto4 = LegacyQuatPropertyBlendState.prototype;

        _proto4.blend = function blend(value, weight) {
          this.accumulatedWeight = mixAveragedQuat(this.result, this.result, this.accumulatedWeight, value, weight);
        };

        _proto4.reset = function reset() {
          this.accumulatedWeight = 0.0;
          Quat.identity(this.result);
        };

        return LegacyQuatPropertyBlendState;
      }();

      NodeBlendState = /*#__PURE__*/function () {
        function NodeBlendState() {
          this._transformApplyFlags = 0;
          this._properties = {};
        }

        var _proto5 = NodeBlendState.prototype;

        _proto5.refProperty = function refProperty(node, property) {
          var _properties$property, _properties$property2;

          var properties = this._properties;
          var propertyBlendState;

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
        };

        _proto5.deRefProperty = function deRefProperty(property) {
          var properties = this._properties;
          var propertyBlendState = properties[property];

          if (!propertyBlendState) {
            return;
          }

          --propertyBlendState.refCount;

          if (propertyBlendState.refCount > 0) {
            return;
          }

          delete properties[property];
        };

        _proto5.apply = function apply(node) {
          var transformApplyFlags = this._transformApplyFlags,
              _this$_properties = this._properties,
              position = _this$_properties.position,
              scale = _this$_properties.scale,
              rotation = _this$_properties.rotation,
              eulerAngles = _this$_properties.eulerAngles;

          if (!transformApplyFlags) {
            return;
          }

          var t;
          var s;
          var r;

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
        };

        _createClass(NodeBlendState, [{
          key: "empty",
          get: function get() {
            var properties = this._properties;
            return !properties.position && !properties.rotation && !properties.eulerAngles && !properties.scale;
          }
        }]);

        return NodeBlendState;
      }();

      LegacyNodeBlendState = /*#__PURE__*/function (_NodeBlendState) {
        _inheritsLoose(LegacyNodeBlendState, _NodeBlendState);

        function LegacyNodeBlendState() {
          return _NodeBlendState.apply(this, arguments) || this;
        }

        var _proto6 = LegacyNodeBlendState.prototype;

        _proto6.apply = function apply(node) {
          var _this$_properties2 = this._properties,
              position = _this$_properties2.position,
              scale = _this$_properties2.scale,
              rotation = _this$_properties2.rotation,
              eulerAngles = _this$_properties2.eulerAngles;

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

          _NodeBlendState.prototype.apply.call(this, node);

          position === null || position === void 0 ? void 0 : position.reset();
          scale === null || scale === void 0 ? void 0 : scale.reset();
          rotation === null || rotation === void 0 ? void 0 : rotation.reset();
          eulerAngles === null || eulerAngles === void 0 ? void 0 : eulerAngles.reset();
        };

        _proto6._createVec3BlendState = function _createVec3BlendState(_currentValue) {
          return new LegacyVec3PropertyBlendState();
        };

        _proto6._createQuatBlendState = function _createQuatBlendState(_currentValue) {
          return new LegacyQuatPropertyBlendState();
        };

        return LegacyNodeBlendState;
      }(NodeBlendState);

      _export("LegacyBlendStateBuffer", LegacyBlendStateBuffer = /*#__PURE__*/function (_BlendStateBuffer) {
        _inheritsLoose(LegacyBlendStateBuffer, _BlendStateBuffer);

        function LegacyBlendStateBuffer() {
          return _BlendStateBuffer.apply(this, arguments) || this;
        }

        var _proto7 = LegacyBlendStateBuffer.prototype;

        _proto7.createNodeBlendState = function createNodeBlendState() {
          return new LegacyNodeBlendState();
        };

        return LegacyBlendStateBuffer;
      }(BlendStateBuffer));

      LayeredVec3PropertyBlendState = /*#__PURE__*/function () {
        function LayeredVec3PropertyBlendState(defaultValue) {
          this.refCount = 0;
          this.result = new Vec3();
          this._defaultValue = new Vec3();
          this._clipBlendResult = new Vec3();
          this._accumulatedWeight = 0.0;
          Vec3.copy(this._defaultValue, defaultValue);
          Vec3.copy(this.result, defaultValue);
        }

        var _proto8 = LayeredVec3PropertyBlendState.prototype;

        _proto8.blend = function blend(value, weight) {
          this._accumulatedWeight = mixAveragedVec3(this._clipBlendResult, this._clipBlendResult, this._accumulatedWeight, value, weight);
        };

        _proto8.commitLayerChange = function commitLayerChange(weight) {
          var result = this.result,
              clipBlendResult = this._clipBlendResult,
              accumulatedWeight = this._accumulatedWeight;

          if (accumulatedWeight < 1.0) {
            this.blend(this._defaultValue, 1.0 - accumulatedWeight);
          }

          Vec3.lerp(result, result, clipBlendResult, weight);
          Vec3.zero(this._clipBlendResult);
          this._accumulatedWeight = 0.0;
        };

        _proto8.reset = function reset() {
          Vec3.copy(this.result, this._defaultValue);
        };

        return LayeredVec3PropertyBlendState;
      }();

      LayeredQuatPropertyBlendState = /*#__PURE__*/function () {
        function LayeredQuatPropertyBlendState(defaultValue) {
          this.refCount = 0;
          this.result = new Quat();
          this._defaultValue = new Quat();
          this._clipBlendResult = new Quat();
          this._accumulatedWeight = 0.0;
          Quat.copy(this._defaultValue, defaultValue);
          Quat.copy(this.result, defaultValue);
        }

        var _proto9 = LayeredQuatPropertyBlendState.prototype;

        _proto9.blend = function blend(value, weight) {
          this._accumulatedWeight = mixAveragedQuat(this._clipBlendResult, this._clipBlendResult, this._accumulatedWeight, value, weight);
        };

        _proto9.commitLayerChange = function commitLayerChange(weight) {
          var result = this.result,
              clipBlendResult = this._clipBlendResult,
              accumulatedWeight = this._accumulatedWeight;

          if (accumulatedWeight < 1.0) {
            this.blend(this._defaultValue, 1.0 - accumulatedWeight);
          }

          Quat.slerp(result, result, clipBlendResult, weight);
          Quat.identity(this._clipBlendResult);
          this._accumulatedWeight = 0.0;
        };

        _proto9.reset = function reset() {
          Quat.copy(this.result, this._defaultValue);
        };

        return LayeredQuatPropertyBlendState;
      }();

      LayeredNodeBlendState = /*#__PURE__*/function (_NodeBlendState2) {
        _inheritsLoose(LayeredNodeBlendState, _NodeBlendState2);

        function LayeredNodeBlendState() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _NodeBlendState2.call.apply(_NodeBlendState2, [this].concat(args)) || this;
          _this._layerMask = ~0 >>> 0;
          return _this;
        }

        var _proto10 = LayeredNodeBlendState.prototype;

        _proto10.setLayerMask = function setLayerMask(layerIndex) {
          this._layerMask &= ~(1 << layerIndex);
        };

        _proto10.commitLayerChanges = function commitLayerChanges(layerIndex, weight) {
          if (!(this._layerMask & 1 << layerIndex)) {
            return;
          }

          var _this$_properties3 = this._properties,
              position = _this$_properties3.position,
              scale = _this$_properties3.scale,
              rotation = _this$_properties3.rotation,
              eulerAngles = _this$_properties3.eulerAngles;

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
        };

        _proto10.apply = function apply(node) {
          // Layered buffer always enable all flags.
          this._transformApplyFlags = TRANSFORM_APPLY_FLAGS_ALL;

          _NodeBlendState2.prototype.apply.call(this, node);

          var _this$_properties4 = this._properties,
              position = _this$_properties4.position,
              scale = _this$_properties4.scale,
              rotation = _this$_properties4.rotation,
              eulerAngles = _this$_properties4.eulerAngles;
          position === null || position === void 0 ? void 0 : position.reset();
          scale === null || scale === void 0 ? void 0 : scale.reset();
          rotation === null || rotation === void 0 ? void 0 : rotation.reset();
          eulerAngles === null || eulerAngles === void 0 ? void 0 : eulerAngles.reset();
        };

        _proto10._createVec3BlendState = function _createVec3BlendState(currentValue) {
          return new LayeredVec3PropertyBlendState(currentValue);
        };

        _proto10._createQuatBlendState = function _createQuatBlendState(currentValue) {
          return new LayeredQuatPropertyBlendState(currentValue);
        };

        return LayeredNodeBlendState;
      }(NodeBlendState);
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


      _export("LayeredBlendStateBuffer", LayeredBlendStateBuffer = /*#__PURE__*/function (_BlendStateBuffer2) {
        _inheritsLoose(LayeredBlendStateBuffer, _BlendStateBuffer2);

        function LayeredBlendStateBuffer() {
          return _BlendStateBuffer2.apply(this, arguments) || this;
        }

        var _proto11 = LayeredBlendStateBuffer.prototype;

        _proto11.setMask = function setMask(layerIndex, excludeNodes) {
          if (DEBUG) {
            checkLayerIndex(layerIndex);
          }

          this._nodeBlendStates.forEach(function (nodeBlendState, node) {
            if (excludeNodes.has(node)) {
              nodeBlendState.setLayerMask(layerIndex);
            }
          });
        };

        _proto11.commitLayerChanges = function commitLayerChanges(layerIndex, weight) {
          if (DEBUG) {
            checkLayerIndex(layerIndex);
          }

          this._nodeBlendStates.forEach(function (nodeBlendState, node) {
            nodeBlendState.commitLayerChanges(layerIndex, weight);
          });
        };

        _proto11.createNodeBlendState = function createNodeBlendState() {
          return new LayeredNodeBlendState();
        };

        return LayeredBlendStateBuffer;
      }(BlendStateBuffer));
    }
  };
});