System.register("q-bundled:///fs/cocos/rendering/custom/compiler.js", ["../../core/index.js", "./effect.js", "./graph.js", "./types.js"], function (_export, _context) {
  "use strict";

  var assert, VectorGraphColorMap, DefaultVisitor, depthFirstSearch, ReferenceGraphView, AccessType, ResourceResidency, PassVisitor, PassManagerVisitor, ResourceVisitor, CompilerContext, Compiler, ResourceManagerVisitor;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  return {
    setters: [function (_coreIndexJs) {
      assert = _coreIndexJs.assert;
    }, function (_effectJs) {
      VectorGraphColorMap = _effectJs.VectorGraphColorMap;
    }, function (_graphJs) {
      DefaultVisitor = _graphJs.DefaultVisitor;
      depthFirstSearch = _graphJs.depthFirstSearch;
      ReferenceGraphView = _graphJs.ReferenceGraphView;
    }, function (_typesJs) {
      AccessType = _typesJs.AccessType;
      ResourceResidency = _typesJs.ResourceResidency;
    }],
    execute: function () {
      PassVisitor = /*#__PURE__*/function () {
        // output resourcetexture id
        function PassVisitor(context) {
          this.queueID = 0xFFFFFFFF;
          this.sceneID = 0xFFFFFFFF;
          this.passID = 0xFFFFFFFF;
          this.resID = 0xFFFFFFFF;
          this.context = void 0;
          this._currPass = null;
          this.context = context;
        }

        var _proto = PassVisitor.prototype;

        _proto._isRasterPass = function _isRasterPass(u) {
          return !!this.context.renderGraph.tryGetRasterPass(u);
        };

        _proto._isQueue = function _isQueue(u) {
          return !!this.context.renderGraph.tryGetQueue(u);
        };

        _proto._isScene = function _isScene(u) {
          return !!this.context.renderGraph.tryGetScene(u);
        };

        _proto._isBlit = function _isBlit(u) {
          return !!this.context.renderGraph.tryGetBlit(u);
        };

        _proto._fetchValidPass = function _fetchValidPass() {
          var rg = this.context.renderGraph;

          if (rg.getValid(this.sceneID)) {
            return;
          }

          var outputId = this.resID;
          var outputName = this.context.resourceGraph.vertexName(outputId);
          var readViews = new Map();
          var pass = this._currPass;

          for (var _iterator = _createForOfIteratorHelperLoose(pass.rasterViews), _step; !(_step = _iterator()).done;) {
            var _step$value = _step.value,
                readName = _step$value[0],
                _raster = _step$value[1];

            // find the pass
            if (readName === outputName && _raster.accessType !== AccessType.READ) {
              assert(!rg.getValid(this.sceneID), 'The same pass cannot output multiple resources with the same name at the same time');
              rg.setValid(this.passID, true);
              rg.setValid(this.queueID, true);
              rg.setValid(this.sceneID, true);
              continue;
            }

            if (_raster.accessType !== AccessType.WRITE) {
              readViews.set(readName, _raster);
            }
          }

          if (rg.getValid(this.sceneID)) {
            var resVisitor;
            var resourceGraph;
            var vertID;

            for (var _iterator2 = _createForOfIteratorHelperLoose(readViews), _step2; !(_step2 = _iterator2()).done;) {
              var _step2$value = _step2.value,
                  rasterName = _step2$value[0],
                  raster = _step2$value[1];
              resVisitor = new ResourceVisitor(this.context);
              resourceGraph = this.context.resourceGraph;
              vertID = resourceGraph.find(rasterName);

              if (vertID !== 0xFFFFFFFF) {
                resVisitor.resID = vertID;
                resourceGraph.visitVertex(resVisitor, vertID);
              }
            }

            for (var _iterator3 = _createForOfIteratorHelperLoose(pass.computeViews), _step3; !(_step3 = _iterator3()).done;) {
              var _step3$value = _step3.value,
                  computeName = _step3$value[0],
                  cViews = _step3$value[1];
              resVisitor = new ResourceVisitor(this.context);
              resourceGraph = this.context.resourceGraph;
              vertID = resourceGraph.find(computeName);

              if (vertID !== 0xFFFFFFFF) {
                resVisitor.resID = vertID;
                resourceGraph.visitVertex(resVisitor, vertID);
              }
            }
          }
        };

        _proto.applyID = function applyID(id, resId) {
          this.resID = resId;

          if (this._isRasterPass(id)) {
            this.passID = id;
          } else if (this._isQueue(id)) {
            this.queueID = id;
          } else if (this._isScene(id) || this._isBlit(id)) {
            this.sceneID = id;
          }
        };

        _proto.rasterPass = function rasterPass(pass) {
          // const rg = this.context.renderGraph;
          // Since the pass is valid, there is no need to continue traversing.
          // if (rg.getValid(this.passID)) {
          //     return;
          // }
          this._currPass = pass;
        };

        _proto.rasterSubpass = function rasterSubpass(value) {};

        _proto.computeSubpass = function computeSubpass(value) {};

        _proto.compute = function compute(value) {};

        _proto.copy = function copy(value) {};

        _proto.move = function move(value) {};

        _proto.raytrace = function raytrace(value) {};

        _proto.queue = function queue(value) {};

        _proto.scene = function scene(value) {
          this._fetchValidPass();
        };

        _proto.blit = function blit(value) {
          this._fetchValidPass();
        };

        _proto.dispatch = function dispatch(value) {};

        _proto.clear = function clear(value) {};

        _proto.viewport = function viewport(value) {};

        return PassVisitor;
      }();

      PassManagerVisitor = /*#__PURE__*/function (_DefaultVisitor) {
        _inheritsLoose(PassManagerVisitor, _DefaultVisitor);

        function PassManagerVisitor(context, resId) {
          var _this;

          _this = _DefaultVisitor.call(this) || this;
          _this._colorMap = void 0;
          _this._graphView = void 0;
          _this._passVisitor = void 0;
          _this.resId = 0xFFFFFFFF;
          _this.resId = resId;
          _this._passVisitor = new PassVisitor(context);
          _this._graphView = new ReferenceGraphView(context.renderGraph);
          _this._colorMap = new VectorGraphColorMap(context.renderGraph.numVertices());
          return _this;
        }

        var _proto2 = PassManagerVisitor.prototype;

        _proto2.discoverVertex = function discoverVertex(u, gv) {
          var g = gv.g;

          this._passVisitor.applyID(u, this.resId);

          g.visitVertex(this._passVisitor, u);
        };

        _createClass(PassManagerVisitor, [{
          key: "graphView",
          get: function get() {
            return this._graphView;
          }
        }, {
          key: "colorMap",
          get: function get() {
            return this._colorMap;
          }
        }]);

        return PassManagerVisitor;
      }(DefaultVisitor);

      ResourceVisitor = /*#__PURE__*/function () {
        function ResourceVisitor(context) {
          this._context = void 0;
          this.resID = 0xFFFFFFFF;
          this._context = context;
        }

        var _proto3 = ResourceVisitor.prototype;

        _proto3.managedBuffer = function managedBuffer(value) {// noop
        };

        _proto3.managedTexture = function managedTexture(value) {// noop
        };

        _proto3.managed = function managed(value) {
          this.dependency();
        };

        _proto3.persistentBuffer = function persistentBuffer(value) {};

        _proto3.dependency = function dependency() {
          var visitor = new PassManagerVisitor(this._context, this.resID);
          depthFirstSearch(visitor.graphView, visitor, visitor.colorMap);
        };

        _proto3.persistentTexture = function persistentTexture(value) {
          this.dependency();
        };

        _proto3.framebuffer = function framebuffer(value) {
          this.dependency();
        };

        _proto3.swapchain = function swapchain(value) {
          this.dependency();
        };

        return ResourceVisitor;
      }();

      CompilerContext = function CompilerContext(pipeline, resGraph, renderGraph, layoutGraph) {
        this.resourceGraph = void 0;
        this.pipeline = void 0;
        this.renderGraph = void 0;
        this.layoutGraph = void 0;
        this.pipeline = pipeline;
        this.resourceGraph = resGraph;
        this.renderGraph = renderGraph;
        this.layoutGraph = layoutGraph;
      };

      _export("Compiler", Compiler = /*#__PURE__*/function () {
        function Compiler(pipeline, resGraph, layoutGraph) {
          this._resourceGraph = void 0;
          this._pipeline = void 0;
          this._layoutGraph = void 0;
          this._pipeline = pipeline;
          this._resourceGraph = resGraph;
          this._layoutGraph = layoutGraph;
        }

        var _proto4 = Compiler.prototype;

        _proto4.compile = function compile(rg) {
          var context = new CompilerContext(this._pipeline, this._resourceGraph, rg, this._layoutGraph);
          var visitor = new ResourceManagerVisitor(context);
          depthFirstSearch(this._resourceGraph, visitor, visitor.colorMap);
        };

        return Compiler;
      }());

      _export("ResourceManagerVisitor", ResourceManagerVisitor = /*#__PURE__*/function (_DefaultVisitor2) {
        _inheritsLoose(ResourceManagerVisitor, _DefaultVisitor2);

        function ResourceManagerVisitor(context) {
          var _this2;

          _this2 = _DefaultVisitor2.call(this) || this;
          _this2._colorMap = void 0;
          _this2._resourceGraph = void 0;
          _this2._resVisitor = void 0;
          _this2._colorMap = new VectorGraphColorMap(context.resourceGraph.numVertices());
          _this2._resourceGraph = context.resourceGraph;
          _this2._resVisitor = new ResourceVisitor(context);
          return _this2;
        }

        var _proto5 = ResourceManagerVisitor.prototype;

        _proto5.discoverVertex = function discoverVertex(u, gv) {
          var traits = this._resourceGraph.getTraits(u);

          if (traits.residency === ResourceResidency.MANAGED || traits.residency === ResourceResidency.MEMORYLESS) {
            return;
          }

          this._resVisitor.resID = u;

          this._resourceGraph.visitVertex(this._resVisitor, u);
        };

        _createClass(ResourceManagerVisitor, [{
          key: "colorMap",
          get: function get() {
            return this._colorMap;
          }
        }]);

        return ResourceManagerVisitor;
      }(DefaultVisitor));
    }
  };
});