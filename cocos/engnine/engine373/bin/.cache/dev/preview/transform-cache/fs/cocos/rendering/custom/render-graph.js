System.register("q-bundled:///fs/cocos/rendering/custom/render-graph.js", ["./graph.js", "../../gfx/index.js", "./types.js"], function (_export, _context) {
  "use strict";

  var AdjI, ED, InEI, OutE, OutEI, directional, parallel, reindexEdgeList, traversal, AccessFlagBit, ClearFlagBit, Color, Format, SampleCount, TextureFlagBit, Viewport, LightInfo, QueueHint, ResourceDimension, ResourceFlags, ResourceResidency, SceneFlags, ResourceDesc, ResourceTraits, RenderSwapchain, ResourceStates, ManagedBuffer, ManagedTexture, ManagedResource, Subpass, SubpassGraphVertex, SubpassGraphNameMap, SubpassGraphSubpassMap, SubpassGraphComponent, SubpassGraph, RasterSubpass, ComputeSubpass, RasterPass, PersistentRenderPassAndFramebuffer, ResourceGraphValue, ResourceGraphVertex, ResourceGraphNameMap, ResourceGraphDescMap, ResourceGraphTraitsMap, ResourceGraphStatesMap, ResourceGraphSamplerMap, ResourceGraphComponent, ResourceGraph, ComputePass, CopyPass, MovePass, RaytracePass, ClearView, RenderQueue, SceneData, Dispatch, Blit, RenderData, RenderGraphValue, RenderGraphVertex, RenderGraphNameMap, RenderGraphLayoutMap, RenderGraphDataMap, RenderGraphValidMap, RenderGraphComponent, RenderGraph;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function getResourceGraphValueName(e) {
    switch (e) {
      case ResourceGraphValue.Managed:
        return 'Managed';

      case ResourceGraphValue.ManagedBuffer:
        return 'ManagedBuffer';

      case ResourceGraphValue.ManagedTexture:
        return 'ManagedTexture';

      case ResourceGraphValue.PersistentBuffer:
        return 'PersistentBuffer';

      case ResourceGraphValue.PersistentTexture:
        return 'PersistentTexture';

      case ResourceGraphValue.Framebuffer:
        return 'Framebuffer';

      case ResourceGraphValue.Swapchain:
        return 'Swapchain';

      default:
        return '';
    }
  }

  function getRenderGraphValueName(e) {
    switch (e) {
      case RenderGraphValue.RasterPass:
        return 'RasterPass';

      case RenderGraphValue.RasterSubpass:
        return 'RasterSubpass';

      case RenderGraphValue.ComputeSubpass:
        return 'ComputeSubpass';

      case RenderGraphValue.Compute:
        return 'Compute';

      case RenderGraphValue.Copy:
        return 'Copy';

      case RenderGraphValue.Move:
        return 'Move';

      case RenderGraphValue.Raytrace:
        return 'Raytrace';

      case RenderGraphValue.Queue:
        return 'Queue';

      case RenderGraphValue.Scene:
        return 'Scene';

      case RenderGraphValue.Blit:
        return 'Blit';

      case RenderGraphValue.Dispatch:
        return 'Dispatch';

      case RenderGraphValue.Clear:
        return 'Clear';

      case RenderGraphValue.Viewport:
        return 'Viewport';

      default:
        return '';
    }
  }

  _export({
    getResourceGraphValueName: getResourceGraphValueName,
    getRenderGraphValueName: getRenderGraphValueName
  });

  return {
    setters: [function (_graphJs) {
      AdjI = _graphJs.AdjI;
      ED = _graphJs.ED;
      InEI = _graphJs.InEI;
      OutE = _graphJs.OutE;
      OutEI = _graphJs.OutEI;
      directional = _graphJs.directional;
      parallel = _graphJs.parallel;
      reindexEdgeList = _graphJs.reindexEdgeList;
      traversal = _graphJs.traversal;
    }, function (_gfxIndexJs) {
      AccessFlagBit = _gfxIndexJs.AccessFlagBit;
      ClearFlagBit = _gfxIndexJs.ClearFlagBit;
      Color = _gfxIndexJs.Color;
      Format = _gfxIndexJs.Format;
      SampleCount = _gfxIndexJs.SampleCount;
      TextureFlagBit = _gfxIndexJs.TextureFlagBit;
      Viewport = _gfxIndexJs.Viewport;
    }, function (_typesJs) {
      LightInfo = _typesJs.LightInfo;
      QueueHint = _typesJs.QueueHint;
      ResourceDimension = _typesJs.ResourceDimension;
      ResourceFlags = _typesJs.ResourceFlags;
      ResourceResidency = _typesJs.ResourceResidency;
      SceneFlags = _typesJs.SceneFlags;
    }],
    execute: function () {
      _export("ResourceDesc", ResourceDesc = function ResourceDesc() {
        this.dimension = ResourceDimension.BUFFER;
        this.alignment = 0;
        this.width = 0;
        this.height = 0;
        this.depthOrArraySize = 0;
        this.mipLevels = 0;
        this.format = Format.UNKNOWN;
        this.sampleCount = SampleCount.ONE;
        this.textureFlags = TextureFlagBit.NONE;
        this.flags = ResourceFlags.NONE;
      });

      _export("ResourceTraits", ResourceTraits = function ResourceTraits(residency) {
        if (residency === void 0) {
          residency = ResourceResidency.MANAGED;
        }

        this.residency = void 0;
        this.residency = residency;
      });

      _export("RenderSwapchain", RenderSwapchain = function RenderSwapchain(swapchain) {
        if (swapchain === void 0) {
          swapchain = null;
        }

        this.swapchain = void 0;
        this.currentID = 0;
        this.numBackBuffers = 0;
        this.generation = 0xFFFFFFFF;
        this.swapchain = swapchain;
      }
      /*pointer*/
      );

      _export("ResourceStates", ResourceStates = function ResourceStates() {
        this.states = AccessFlagBit.NONE;
      });

      _export("ManagedBuffer", ManagedBuffer = function ManagedBuffer(buffer) {
        if (buffer === void 0) {
          buffer = null;
        }

        this.buffer = void 0;
        this.fenceValue = 0;
        this.buffer = buffer;
      }
      /*refcount*/
      );

      _export("ManagedTexture", ManagedTexture = function ManagedTexture(texture) {
        if (texture === void 0) {
          texture = null;
        }

        this.texture = void 0;
        this.fenceValue = 0;
        this.texture = texture;
      }
      /*refcount*/
      );

      _export("ManagedResource", ManagedResource = function ManagedResource() {
        this.unused = 0;
      });

      _export("Subpass", Subpass = function Subpass() {
        this.rasterViews = new Map();
        this.computeViews = new Map();
      }); //=================================================================
      // SubpassGraph
      //=================================================================
      // Graph Concept


      _export("SubpassGraphVertex", SubpassGraphVertex = function SubpassGraphVertex() {
        this._outEdges = [];
        this._inEdges = [];
      }); //-----------------------------------------------------------------
      // PropertyGraph Concept


      _export("SubpassGraphNameMap", SubpassGraphNameMap = /*#__PURE__*/function () {
        function SubpassGraphNameMap(names) {
          this._names = void 0;
          this.names = names;
          this._names = names;
        }

        var _proto = SubpassGraphNameMap.prototype;

        _proto.get = function get(v) {
          return this._names[v];
        };

        _proto.set = function set(v, names) {
          this._names[v] = names;
        };

        return SubpassGraphNameMap;
      }());

      _export("SubpassGraphSubpassMap", SubpassGraphSubpassMap = /*#__PURE__*/function () {
        function SubpassGraphSubpassMap(subpasses) {
          this._subpasses = void 0;
          this.subpasses = subpasses;
          this._subpasses = subpasses;
        }

        var _proto2 = SubpassGraphSubpassMap.prototype;

        _proto2.get = function get(v) {
          return this._subpasses[v];
        };

        return SubpassGraphSubpassMap;
      }()); //-----------------------------------------------------------------
      // ComponentGraph Concept


      _export("SubpassGraphComponent", SubpassGraphComponent = {
        Name: 0,
        Subpass: 1
      });

      //-----------------------------------------------------------------
      // SubpassGraph Implementation
      _export("SubpassGraph", SubpassGraph = /*#__PURE__*/function () {
        function SubpassGraph() {
          this.directed_category = directional.bidirectional;
          this.edge_parallel_category = parallel.allow;
          this.traversal_category = traversal.incidence | traversal.bidirectional | traversal.adjacency | traversal.vertex_list;
          this.components = ['Name', 'Subpass'];
          this._vertices = [];
          this._names = [];
          this._subpasses = [];
        }

        var _proto3 = SubpassGraph.prototype;

        //-----------------------------------------------------------------
        // Graph
        // type vertex_descriptor = number;
        _proto3.nullVertex = function nullVertex() {
          return 0xFFFFFFFF;
        } // type edge_descriptor = ED;
        ;

        //-----------------------------------------------------------------
        // IncidenceGraph
        // type out_edge_iterator = OutEI;
        // type degree_size_type = number;
        _proto3.edge = function edge(u, v) {
          for (var _iterator = _createForOfIteratorHelperLoose(this._vertices[u]._outEdges), _step; !(_step = _iterator()).done;) {
            var oe = _step.value;

            if (v === oe.target) {
              return true;
            }
          }

          return false;
        };

        _proto3.source = function source(e) {
          return e.source;
        };

        _proto3.target = function target(e) {
          return e.target;
        };

        _proto3.outEdges = function outEdges(v) {
          return new OutEI(this._vertices[v]._outEdges.values(), v);
        };

        _proto3.outDegree = function outDegree(v) {
          return this._vertices[v]._outEdges.length;
        } //-----------------------------------------------------------------
        // BidirectionalGraph
        // type in_edge_iterator = InEI;
        ;

        _proto3.inEdges = function inEdges(v) {
          return new InEI(this._vertices[v]._inEdges.values(), v);
        };

        _proto3.inDegree = function inDegree(v) {
          return this._vertices[v]._inEdges.length;
        };

        _proto3.degree = function degree(v) {
          return this.outDegree(v) + this.inDegree(v);
        } //-----------------------------------------------------------------
        // AdjacencyGraph
        // type adjacency_iterator = AdjI;
        ;

        _proto3.adjacentVertices = function adjacentVertices(v) {
          return new AdjI(this, this.outEdges(v));
        } //-----------------------------------------------------------------
        // VertexListGraph
        ;

        _proto3.vertices = function vertices() {
          return this._vertices.keys();
        };

        _proto3.numVertices = function numVertices() {
          return this._vertices.length;
        } //-----------------------------------------------------------------
        // EdgeListGraph
        ;

        _proto3.numEdges = function numEdges() {
          var numEdges = 0;

          for (var _iterator2 = _createForOfIteratorHelperLoose(this.vertices()), _step2; !(_step2 = _iterator2()).done;) {
            var v = _step2.value;
            numEdges += this.outDegree(v);
          }

          return numEdges;
        } //-----------------------------------------------------------------
        // MutableGraph
        ;

        _proto3.clear = function clear() {
          // ComponentGraph
          this._names.length = 0;
          this._subpasses.length = 0; // Graph Vertices

          this._vertices.length = 0;
        };

        _proto3.addVertex = function addVertex(name, subpass) {
          var vert = new SubpassGraphVertex();
          var v = this._vertices.length;

          this._vertices.push(vert);

          this._names.push(name);

          this._subpasses.push(subpass);

          return v;
        };

        _proto3.clearVertex = function clearVertex(v) {
          var vert = this._vertices[v]; // clear out edges

          for (var _iterator3 = _createForOfIteratorHelperLoose(vert._outEdges), _step3; !(_step3 = _iterator3()).done;) {
            var oe = _step3.value;
            var target = this._vertices[oe.target];

            for (var i = 0; i !== target._inEdges.length;) {
              // remove all edges
              if (target._inEdges[i].target === v) {
                target._inEdges.splice(i, 1);
              } else {
                ++i;
              }
            }
          }

          vert._outEdges.length = 0; // clear in edges

          for (var _iterator4 = _createForOfIteratorHelperLoose(vert._inEdges), _step4; !(_step4 = _iterator4()).done;) {
            var ie = _step4.value;
            var source = this._vertices[ie.target];

            for (var _i = 0; _i !== source._outEdges.length;) {
              // remove all edges
              if (source._outEdges[_i].target === v) {
                source._outEdges.splice(_i, 1);
              } else {
                ++_i;
              }
            }
          }

          vert._inEdges.length = 0;
        };

        _proto3.removeVertex = function removeVertex(u) {
          this._vertices.splice(u, 1);

          this._names.splice(u, 1);

          this._subpasses.splice(u, 1);

          var sz = this._vertices.length;

          if (u === sz) {
            return;
          }

          for (var v = 0; v !== sz; ++v) {
            var vert = this._vertices[v];
            reindexEdgeList(vert._outEdges, u);
            reindexEdgeList(vert._inEdges, u);
          }
        };

        _proto3.addEdge = function addEdge(u, v) {
          // update in/out edge list
          this._vertices[u]._outEdges.push(new OutE(v));

          this._vertices[v]._inEdges.push(new OutE(u));

          return new ED(u, v);
        };

        _proto3.removeEdges = function removeEdges(u, v) {
          var source = this._vertices[u]; // remove out edges of u

          for (var i = 0; i !== source._outEdges.length;) {
            // remove all edges
            if (source._outEdges[i].target === v) {
              source._outEdges.splice(i, 1);
            } else {
              ++i;
            }
          } // remove in edges of v


          var target = this._vertices[v];

          for (var _i2 = 0; _i2 !== target._inEdges.length;) {
            // remove all edges
            if (target._inEdges[_i2].target === u) {
              target._inEdges.splice(_i2, 1);
            } else {
              ++_i2;
            }
          }
        };

        _proto3.removeEdge = function removeEdge(e) {
          var u = e.source;
          var v = e.target;
          var source = this._vertices[u];

          for (var i = 0; i !== source._outEdges.length;) {
            if (source._outEdges[i].target === v) {
              source._outEdges.splice(i, 1);

              break; // remove one edge
            } else {
              ++i;
            }
          }

          var target = this._vertices[v];

          for (var _i3 = 0; _i3 !== target._inEdges.length;) {
            if (target._inEdges[_i3].target === u) {
              target._inEdges.splice(_i3, 1);

              break; // remove one edge
            } else {
              ++_i3;
            }
          }
        } //-----------------------------------------------------------------
        // NamedGraph
        ;

        _proto3.vertexName = function vertexName(v) {
          return this._names[v];
        };

        _proto3.vertexNameMap = function vertexNameMap() {
          return new SubpassGraphNameMap(this._names);
        } //-----------------------------------------------------------------
        // PropertyGraph
        ;

        _proto3.get = function get(tag) {
          switch (tag) {
            // Components
            case 'Name':
              return new SubpassGraphNameMap(this._names);

            case 'Subpass':
              return new SubpassGraphSubpassMap(this._subpasses);

            default:
              throw Error('property map not found');
          }
        } //-----------------------------------------------------------------
        // ComponentGraph
        ;

        _proto3.component = function component(id, v) {
          switch (id) {
            case SubpassGraphComponent.Name:
              return this._names[v];

            case SubpassGraphComponent.Subpass:
              return this._subpasses[v];

            default:
              throw Error('component not found');
          }
        };

        _proto3.componentMap = function componentMap(id) {
          switch (id) {
            case SubpassGraphComponent.Name:
              return new SubpassGraphNameMap(this._names);

            case SubpassGraphComponent.Subpass:
              return new SubpassGraphSubpassMap(this._subpasses);

            default:
              throw Error('component map not found');
          }
        };

        _proto3.getName = function getName(v) {
          return this._names[v];
        };

        _proto3.setName = function setName(v, value) {
          this._names[v] = value;
        };

        _proto3.getSubpass = function getSubpass(v) {
          return this._subpasses[v];
        };

        return SubpassGraph;
      }());

      _export("RasterSubpass", RasterSubpass = function RasterSubpass(subpassID) {
        this.rasterViews = new Map();
        this.computeViews = new Map();
        this.subpassID = void 0;
        this.viewport = new Viewport();
        this.showStatistics = false;
        this.subpassID = subpassID;
      });

      _export("ComputeSubpass", ComputeSubpass = function ComputeSubpass(subpassID) {
        this.rasterViews = new Map();
        this.computeViews = new Map();
        this.subpassID = void 0;
        this.subpassID = subpassID;
      });

      _export("RasterPass", RasterPass = function RasterPass() {
        this.rasterViews = new Map();
        this.computeViews = new Map();
        this.subpassGraph = new SubpassGraph();
        this.width = 0;
        this.height = 0;
        this.viewport = new Viewport();
        this.versionName = '';
        this.version = 0;
        this.showStatistics = false;
      });

      _export("PersistentRenderPassAndFramebuffer", PersistentRenderPassAndFramebuffer = function PersistentRenderPassAndFramebuffer(renderPass, framebuffer) {
        this.renderPass = void 0;
        this.framebuffer = void 0;
        this.clearColors = [];
        this.clearDepth = 0;
        this.clearStencil = 0;
        this.renderPass = renderPass;
        this.framebuffer = framebuffer;
      }
      /*refcount*/
      ); //=================================================================
      // ResourceGraph
      //=================================================================
      // PolymorphicGraph Concept


      _export("ResourceGraphValue", ResourceGraphValue = {
        Managed: 0,
        ManagedBuffer: 1,
        ManagedTexture: 2,
        PersistentBuffer: 3,
        PersistentTexture: 4,
        Framebuffer: 5,
        Swapchain: 6
      });

      //-----------------------------------------------------------------
      // Graph Concept
      _export("ResourceGraphVertex", ResourceGraphVertex = function ResourceGraphVertex(id, object) {
        this._outEdges = [];
        this._inEdges = [];
        this._id = void 0;
        this._object = void 0;
        this.id = id;
        this.object = object;
        this._id = id;
        this._object = object;
      }); //-----------------------------------------------------------------
      // PropertyGraph Concept


      _export("ResourceGraphNameMap", ResourceGraphNameMap = /*#__PURE__*/function () {
        function ResourceGraphNameMap(names) {
          this._names = void 0;
          this.names = names;
          this._names = names;
        }

        var _proto4 = ResourceGraphNameMap.prototype;

        _proto4.get = function get(v) {
          return this._names[v];
        };

        _proto4.set = function set(v, names) {
          this._names[v] = names;
        };

        return ResourceGraphNameMap;
      }());

      _export("ResourceGraphDescMap", ResourceGraphDescMap = /*#__PURE__*/function () {
        function ResourceGraphDescMap(descs) {
          this._descs = void 0;
          this.descs = descs;
          this._descs = descs;
        }

        var _proto5 = ResourceGraphDescMap.prototype;

        _proto5.get = function get(v) {
          return this._descs[v];
        };

        return ResourceGraphDescMap;
      }());

      _export("ResourceGraphTraitsMap", ResourceGraphTraitsMap = /*#__PURE__*/function () {
        function ResourceGraphTraitsMap(traits) {
          this._traits = void 0;
          this.traits = traits;
          this._traits = traits;
        }

        var _proto6 = ResourceGraphTraitsMap.prototype;

        _proto6.get = function get(v) {
          return this._traits[v];
        };

        return ResourceGraphTraitsMap;
      }());

      _export("ResourceGraphStatesMap", ResourceGraphStatesMap = /*#__PURE__*/function () {
        function ResourceGraphStatesMap(states) {
          this._states = void 0;
          this.states = states;
          this._states = states;
        }

        var _proto7 = ResourceGraphStatesMap.prototype;

        _proto7.get = function get(v) {
          return this._states[v];
        };

        return ResourceGraphStatesMap;
      }());

      _export("ResourceGraphSamplerMap", ResourceGraphSamplerMap = /*#__PURE__*/function () {
        function ResourceGraphSamplerMap(samplerInfo) {
          this._samplerInfo = void 0;
          this.samplerInfo = samplerInfo;
          this._samplerInfo = samplerInfo;
        }

        var _proto8 = ResourceGraphSamplerMap.prototype;

        _proto8.get = function get(v) {
          return this._samplerInfo[v];
        };

        return ResourceGraphSamplerMap;
      }()); //-----------------------------------------------------------------
      // ComponentGraph Concept


      _export("ResourceGraphComponent", ResourceGraphComponent = {
        Name: 0,
        Desc: 1,
        Traits: 2,
        States: 3,
        Sampler: 4
      });

      //-----------------------------------------------------------------
      // ResourceGraph Implementation
      _export("ResourceGraph", ResourceGraph = /*#__PURE__*/function () {
        function ResourceGraph() {
          this.directed_category = directional.bidirectional;
          this.edge_parallel_category = parallel.allow;
          this.traversal_category = traversal.incidence | traversal.bidirectional | traversal.adjacency | traversal.vertex_list;
          this.components = ['Name', 'Desc', 'Traits', 'States', 'Sampler'];
          this._vertices = [];
          this._names = [];
          this._descs = [];
          this._traits = [];
          this._states = [];
          this._samplerInfo = [];
          this._valueIndex = new Map();
          this.renderPasses = new Map();
          this.nextFenceValue = 0;
          this.version = 0;
        }

        var _proto9 = ResourceGraph.prototype;

        //-----------------------------------------------------------------
        // Graph
        // type vertex_descriptor = number;
        _proto9.nullVertex = function nullVertex() {
          return 0xFFFFFFFF;
        } // type edge_descriptor = ED;
        ;

        //-----------------------------------------------------------------
        // IncidenceGraph
        // type out_edge_iterator = OutEI;
        // type degree_size_type = number;
        _proto9.edge = function edge(u, v) {
          for (var _iterator5 = _createForOfIteratorHelperLoose(this._vertices[u]._outEdges), _step5; !(_step5 = _iterator5()).done;) {
            var oe = _step5.value;

            if (v === oe.target) {
              return true;
            }
          }

          return false;
        };

        _proto9.source = function source(e) {
          return e.source;
        };

        _proto9.target = function target(e) {
          return e.target;
        };

        _proto9.outEdges = function outEdges(v) {
          return new OutEI(this._vertices[v]._outEdges.values(), v);
        };

        _proto9.outDegree = function outDegree(v) {
          return this._vertices[v]._outEdges.length;
        } //-----------------------------------------------------------------
        // BidirectionalGraph
        // type in_edge_iterator = InEI;
        ;

        _proto9.inEdges = function inEdges(v) {
          return new InEI(this._vertices[v]._inEdges.values(), v);
        };

        _proto9.inDegree = function inDegree(v) {
          return this._vertices[v]._inEdges.length;
        };

        _proto9.degree = function degree(v) {
          return this.outDegree(v) + this.inDegree(v);
        } //-----------------------------------------------------------------
        // AdjacencyGraph
        // type adjacency_iterator = AdjI;
        ;

        _proto9.adjacentVertices = function adjacentVertices(v) {
          return new AdjI(this, this.outEdges(v));
        } //-----------------------------------------------------------------
        // VertexListGraph
        ;

        _proto9.vertices = function vertices() {
          return this._vertices.keys();
        };

        _proto9.numVertices = function numVertices() {
          return this._vertices.length;
        } //-----------------------------------------------------------------
        // EdgeListGraph
        ;

        _proto9.numEdges = function numEdges() {
          var numEdges = 0;

          for (var _iterator6 = _createForOfIteratorHelperLoose(this.vertices()), _step6; !(_step6 = _iterator6()).done;) {
            var v = _step6.value;
            numEdges += this.outDegree(v);
          }

          return numEdges;
        } //-----------------------------------------------------------------
        // MutableGraph
        ;

        _proto9.clear = function clear() {
          // Members
          this.renderPasses.clear();
          this.nextFenceValue = 0;
          this.version = 0; // UuidGraph

          this._valueIndex.clear(); // ComponentGraph


          this._names.length = 0;
          this._descs.length = 0;
          this._traits.length = 0;
          this._states.length = 0;
          this._samplerInfo.length = 0; // Graph Vertices

          this._vertices.length = 0;
        };

        _proto9.addVertex = function addVertex(id, object, name, desc, traits, states, sampler) {
          var vert = new ResourceGraphVertex(id, object);
          var v = this._vertices.length;

          this._vertices.push(vert);

          this._names.push(name);

          this._descs.push(desc);

          this._traits.push(traits);

          this._states.push(states);

          this._samplerInfo.push(sampler); // UuidGraph


          this._valueIndex.set(name, v);

          return v;
        };

        _proto9.clearVertex = function clearVertex(v) {
          var vert = this._vertices[v]; // clear out edges

          for (var _iterator7 = _createForOfIteratorHelperLoose(vert._outEdges), _step7; !(_step7 = _iterator7()).done;) {
            var oe = _step7.value;
            var target = this._vertices[oe.target];

            for (var i = 0; i !== target._inEdges.length;) {
              // remove all edges
              if (target._inEdges[i].target === v) {
                target._inEdges.splice(i, 1);
              } else {
                ++i;
              }
            }
          }

          vert._outEdges.length = 0; // clear in edges

          for (var _iterator8 = _createForOfIteratorHelperLoose(vert._inEdges), _step8; !(_step8 = _iterator8()).done;) {
            var ie = _step8.value;
            var source = this._vertices[ie.target];

            for (var _i4 = 0; _i4 !== source._outEdges.length;) {
              // remove all edges
              if (source._outEdges[_i4].target === v) {
                source._outEdges.splice(_i4, 1);
              } else {
                ++_i4;
              }
            }
          }

          vert._inEdges.length = 0;
        };

        _proto9.removeVertex = function removeVertex(u) {
          {
            // UuidGraph
            var key = this._names[u];

            this._valueIndex["delete"](key);

            this._valueIndex.forEach(function (v) {
              if (v > u) {
                --v;
              }
            });
          }

          this._vertices.splice(u, 1);

          this._names.splice(u, 1);

          this._descs.splice(u, 1);

          this._traits.splice(u, 1);

          this._states.splice(u, 1);

          this._samplerInfo.splice(u, 1);

          var sz = this._vertices.length;

          if (u === sz) {
            return;
          }

          for (var v = 0; v !== sz; ++v) {
            var vert = this._vertices[v];
            reindexEdgeList(vert._outEdges, u);
            reindexEdgeList(vert._inEdges, u);
          }
        };

        _proto9.addEdge = function addEdge(u, v) {
          // update in/out edge list
          this._vertices[u]._outEdges.push(new OutE(v));

          this._vertices[v]._inEdges.push(new OutE(u));

          return new ED(u, v);
        };

        _proto9.removeEdges = function removeEdges(u, v) {
          var source = this._vertices[u]; // remove out edges of u

          for (var i = 0; i !== source._outEdges.length;) {
            // remove all edges
            if (source._outEdges[i].target === v) {
              source._outEdges.splice(i, 1);
            } else {
              ++i;
            }
          } // remove in edges of v


          var target = this._vertices[v];

          for (var _i5 = 0; _i5 !== target._inEdges.length;) {
            // remove all edges
            if (target._inEdges[_i5].target === u) {
              target._inEdges.splice(_i5, 1);
            } else {
              ++_i5;
            }
          }
        };

        _proto9.removeEdge = function removeEdge(e) {
          var u = e.source;
          var v = e.target;
          var source = this._vertices[u];

          for (var i = 0; i !== source._outEdges.length;) {
            if (source._outEdges[i].target === v) {
              source._outEdges.splice(i, 1);

              break; // remove one edge
            } else {
              ++i;
            }
          }

          var target = this._vertices[v];

          for (var _i6 = 0; _i6 !== target._inEdges.length;) {
            if (target._inEdges[_i6].target === u) {
              target._inEdges.splice(_i6, 1);

              break; // remove one edge
            } else {
              ++_i6;
            }
          }
        } //-----------------------------------------------------------------
        // NamedGraph
        ;

        _proto9.vertexName = function vertexName(v) {
          return this._names[v];
        };

        _proto9.vertexNameMap = function vertexNameMap() {
          return new ResourceGraphNameMap(this._names);
        } //-----------------------------------------------------------------
        // PropertyGraph
        ;

        _proto9.get = function get(tag) {
          switch (tag) {
            // Components
            case 'Name':
              return new ResourceGraphNameMap(this._names);

            case 'Desc':
              return new ResourceGraphDescMap(this._descs);

            case 'Traits':
              return new ResourceGraphTraitsMap(this._traits);

            case 'States':
              return new ResourceGraphStatesMap(this._states);

            case 'Sampler':
              return new ResourceGraphSamplerMap(this._samplerInfo);

            default:
              throw Error('property map not found');
          }
        } //-----------------------------------------------------------------
        // ComponentGraph
        ;

        _proto9.component = function component(id, v) {
          switch (id) {
            case ResourceGraphComponent.Name:
              return this._names[v];

            case ResourceGraphComponent.Desc:
              return this._descs[v];

            case ResourceGraphComponent.Traits:
              return this._traits[v];

            case ResourceGraphComponent.States:
              return this._states[v];

            case ResourceGraphComponent.Sampler:
              return this._samplerInfo[v];

            default:
              throw Error('component not found');
          }
        };

        _proto9.componentMap = function componentMap(id) {
          switch (id) {
            case ResourceGraphComponent.Name:
              return new ResourceGraphNameMap(this._names);

            case ResourceGraphComponent.Desc:
              return new ResourceGraphDescMap(this._descs);

            case ResourceGraphComponent.Traits:
              return new ResourceGraphTraitsMap(this._traits);

            case ResourceGraphComponent.States:
              return new ResourceGraphStatesMap(this._states);

            case ResourceGraphComponent.Sampler:
              return new ResourceGraphSamplerMap(this._samplerInfo);

            default:
              throw Error('component map not found');
          }
        };

        _proto9.getName = function getName(v) {
          return this._names[v];
        };

        _proto9.setName = function setName(v, value) {
          this._names[v] = value;
        };

        _proto9.getDesc = function getDesc(v) {
          return this._descs[v];
        };

        _proto9.getTraits = function getTraits(v) {
          return this._traits[v];
        };

        _proto9.getStates = function getStates(v) {
          return this._states[v];
        };

        _proto9.getSampler = function getSampler(v) {
          return this._samplerInfo[v];
        } //-----------------------------------------------------------------
        // PolymorphicGraph
        ;

        _proto9.holds = function holds(id, v) {
          return this._vertices[v]._id === id;
        };

        _proto9.id = function id(v) {
          return this._vertices[v]._id;
        };

        _proto9.object = function object(v) {
          return this._vertices[v]._object;
        };

        _proto9.value = function value(id, v) {
          if (this._vertices[v]._id === id) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        };

        _proto9.tryValue = function tryValue(id, v) {
          if (this._vertices[v]._id === id) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        };

        _proto9.visitVertex = function visitVertex(visitor, v) {
          var vert = this._vertices[v];

          switch (vert._id) {
            case ResourceGraphValue.Managed:
              return visitor.managed(vert._object);

            case ResourceGraphValue.ManagedBuffer:
              return visitor.managedBuffer(vert._object);

            case ResourceGraphValue.ManagedTexture:
              return visitor.managedTexture(vert._object);

            case ResourceGraphValue.PersistentBuffer:
              return visitor.persistentBuffer(vert._object);

            case ResourceGraphValue.PersistentTexture:
              return visitor.persistentTexture(vert._object);

            case ResourceGraphValue.Framebuffer:
              return visitor.framebuffer(vert._object);

            case ResourceGraphValue.Swapchain:
              return visitor.swapchain(vert._object);

            default:
              throw Error('polymorphic type not found');
          }
        };

        _proto9.getManaged = function getManaged(v) {
          if (this._vertices[v]._id === ResourceGraphValue.Managed) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        };

        _proto9.getManagedBuffer = function getManagedBuffer(v) {
          if (this._vertices[v]._id === ResourceGraphValue.ManagedBuffer) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        };

        _proto9.getManagedTexture = function getManagedTexture(v) {
          if (this._vertices[v]._id === ResourceGraphValue.ManagedTexture) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        };

        _proto9.getPersistentBuffer = function getPersistentBuffer(v) {
          if (this._vertices[v]._id === ResourceGraphValue.PersistentBuffer) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        };

        _proto9.getPersistentTexture = function getPersistentTexture(v) {
          if (this._vertices[v]._id === ResourceGraphValue.PersistentTexture) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        };

        _proto9.getFramebuffer = function getFramebuffer(v) {
          if (this._vertices[v]._id === ResourceGraphValue.Framebuffer) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        };

        _proto9.getSwapchain = function getSwapchain(v) {
          if (this._vertices[v]._id === ResourceGraphValue.Swapchain) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        };

        _proto9.tryGetManaged = function tryGetManaged(v) {
          if (this._vertices[v]._id === ResourceGraphValue.Managed) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        };

        _proto9.tryGetManagedBuffer = function tryGetManagedBuffer(v) {
          if (this._vertices[v]._id === ResourceGraphValue.ManagedBuffer) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        };

        _proto9.tryGetManagedTexture = function tryGetManagedTexture(v) {
          if (this._vertices[v]._id === ResourceGraphValue.ManagedTexture) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        };

        _proto9.tryGetPersistentBuffer = function tryGetPersistentBuffer(v) {
          if (this._vertices[v]._id === ResourceGraphValue.PersistentBuffer) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        };

        _proto9.tryGetPersistentTexture = function tryGetPersistentTexture(v) {
          if (this._vertices[v]._id === ResourceGraphValue.PersistentTexture) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        };

        _proto9.tryGetFramebuffer = function tryGetFramebuffer(v) {
          if (this._vertices[v]._id === ResourceGraphValue.Framebuffer) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        };

        _proto9.tryGetSwapchain = function tryGetSwapchain(v) {
          if (this._vertices[v]._id === ResourceGraphValue.Swapchain) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        } //-----------------------------------------------------------------
        // UuidGraph
        ;

        _proto9.contains = function contains(key) {
          return this._valueIndex.has(key);
        };

        _proto9.vertex = function vertex(key) {
          return this._valueIndex.get(key);
        };

        _proto9.find = function find(key) {
          var v = this._valueIndex.get(key);

          if (v === undefined) return 0xFFFFFFFF;
          return v;
        };

        return ResourceGraph;
      }());

      _export("ComputePass", ComputePass = function ComputePass() {
        this.computeViews = new Map();
      });

      _export("CopyPass", CopyPass = function CopyPass() {
        this.copyPairs = [];
      });

      _export("MovePass", MovePass = function MovePass() {
        this.movePairs = [];
      });

      _export("RaytracePass", RaytracePass = function RaytracePass() {
        this.computeViews = new Map();
      });

      _export("ClearView", ClearView = function ClearView(slotName, clearFlags, clearColor) {
        if (slotName === void 0) {
          slotName = '';
        }

        if (clearFlags === void 0) {
          clearFlags = ClearFlagBit.ALL;
        }

        if (clearColor === void 0) {
          clearColor = new Color();
        }

        this.slotName = void 0;
        this.clearFlags = void 0;
        this.clearColor = void 0;
        this.slotName = slotName;
        this.clearFlags = clearFlags;
        this.clearColor = clearColor;
      });

      _export("RenderQueue", RenderQueue = function RenderQueue(hint, phaseID) {
        if (hint === void 0) {
          hint = QueueHint.RENDER_OPAQUE;
        }

        if (phaseID === void 0) {
          phaseID = 0xFFFFFFFF;
        }

        this.hint = void 0;
        this.phaseID = void 0;
        this.hint = hint;
        this.phaseID = phaseID;
      });

      _export("SceneData", SceneData = function SceneData(name, flags, light) {
        if (name === void 0) {
          name = '';
        }

        if (flags === void 0) {
          flags = SceneFlags.NONE;
        }

        if (light === void 0) {
          light = new LightInfo();
        }

        this.name = void 0;
        this.camera = null;
        this.light = void 0;
        this.flags = void 0;
        this.scenes = [];
        this.name = name;
        this.light = light;
        this.flags = flags;
      });

      _export("Dispatch", Dispatch = function Dispatch(material, passID, threadGroupCountX, threadGroupCountY, threadGroupCountZ) {
        this.material = void 0;
        this.passID = void 0;
        this.threadGroupCountX = void 0;
        this.threadGroupCountY = void 0;
        this.threadGroupCountZ = void 0;
        this.material = material;
        this.passID = passID;
        this.threadGroupCountX = threadGroupCountX;
        this.threadGroupCountY = threadGroupCountY;
        this.threadGroupCountZ = threadGroupCountZ;
      }
      /*refcount*/
      );

      _export("Blit", Blit = function Blit(material, passID, sceneFlags, camera) {
        this.material = void 0;
        this.passID = void 0;
        this.sceneFlags = void 0;
        this.camera = void 0;
        this.material = material;
        this.passID = passID;
        this.sceneFlags = sceneFlags;
        this.camera = camera;
      }
      /*refcount*/
      );

      _export("RenderData", RenderData = function RenderData() {
        this.constants = new Map();
        this.buffers = new Map();
        this.textures = new Map();
        this.samplers = new Map();
        this.custom = '';
      }); //=================================================================
      // RenderGraph
      //=================================================================
      // PolymorphicGraph Concept


      _export("RenderGraphValue", RenderGraphValue = {
        RasterPass: 0,
        RasterSubpass: 1,
        ComputeSubpass: 2,
        Compute: 3,
        Copy: 4,
        Move: 5,
        Raytrace: 6,
        Queue: 7,
        Scene: 8,
        Blit: 9,
        Dispatch: 10,
        Clear: 11,
        Viewport: 12
      });

      //-----------------------------------------------------------------
      // Graph Concept
      _export("RenderGraphVertex", RenderGraphVertex = function RenderGraphVertex(id, object) {
        this._outEdges = [];
        this._inEdges = [];
        this._children = [];
        this._parents = [];
        this._id = void 0;
        this._object = void 0;
        this.id = id;
        this.object = object;
        this._id = id;
        this._object = object;
      }); //-----------------------------------------------------------------
      // PropertyGraph Concept


      _export("RenderGraphNameMap", RenderGraphNameMap = /*#__PURE__*/function () {
        function RenderGraphNameMap(names) {
          this._names = void 0;
          this.names = names;
          this._names = names;
        }

        var _proto10 = RenderGraphNameMap.prototype;

        _proto10.get = function get(v) {
          return this._names[v];
        };

        _proto10.set = function set(v, names) {
          this._names[v] = names;
        };

        return RenderGraphNameMap;
      }());

      _export("RenderGraphLayoutMap", RenderGraphLayoutMap = /*#__PURE__*/function () {
        function RenderGraphLayoutMap(layoutNodes) {
          this._layoutNodes = void 0;
          this.layoutNodes = layoutNodes;
          this._layoutNodes = layoutNodes;
        }

        var _proto11 = RenderGraphLayoutMap.prototype;

        _proto11.get = function get(v) {
          return this._layoutNodes[v];
        };

        _proto11.set = function set(v, layoutNodes) {
          this._layoutNodes[v] = layoutNodes;
        };

        return RenderGraphLayoutMap;
      }());

      _export("RenderGraphDataMap", RenderGraphDataMap = /*#__PURE__*/function () {
        function RenderGraphDataMap(data) {
          this._data = void 0;
          this.data = data;
          this._data = data;
        }

        var _proto12 = RenderGraphDataMap.prototype;

        _proto12.get = function get(v) {
          return this._data[v];
        };

        return RenderGraphDataMap;
      }());

      _export("RenderGraphValidMap", RenderGraphValidMap = /*#__PURE__*/function () {
        function RenderGraphValidMap(valid) {
          this._valid = void 0;
          this.valid = valid;
          this._valid = valid;
        }

        var _proto13 = RenderGraphValidMap.prototype;

        _proto13.get = function get(v) {
          return this._valid[v];
        };

        _proto13.set = function set(v, valid) {
          this._valid[v] = valid;
        };

        return RenderGraphValidMap;
      }()); //-----------------------------------------------------------------
      // ComponentGraph Concept


      _export("RenderGraphComponent", RenderGraphComponent = {
        Name: 0,
        Layout: 1,
        Data: 2,
        Valid: 3
      });

      //-----------------------------------------------------------------
      // RenderGraph Implementation
      _export("RenderGraph", RenderGraph = /*#__PURE__*/function () {
        function RenderGraph() {
          this.directed_category = directional.bidirectional;
          this.edge_parallel_category = parallel.allow;
          this.traversal_category = traversal.incidence | traversal.bidirectional | traversal.adjacency | traversal.vertex_list;
          this.components = ['Name', 'Layout', 'Data', 'Valid'];
          this._vertices = [];
          this._names = [];
          this._layoutNodes = [];
          this._data = [];
          this._valid = [];
          this.index = new Map();
        }

        var _proto14 = RenderGraph.prototype;

        //-----------------------------------------------------------------
        // Graph
        // type vertex_descriptor = number;
        _proto14.nullVertex = function nullVertex() {
          return 0xFFFFFFFF;
        } // type edge_descriptor = ED;
        ;

        //-----------------------------------------------------------------
        // IncidenceGraph
        // type out_edge_iterator = OutEI;
        // type degree_size_type = number;
        _proto14.edge = function edge(u, v) {
          for (var _iterator9 = _createForOfIteratorHelperLoose(this._vertices[u]._outEdges), _step9; !(_step9 = _iterator9()).done;) {
            var oe = _step9.value;

            if (v === oe.target) {
              return true;
            }
          }

          return false;
        };

        _proto14.source = function source(e) {
          return e.source;
        };

        _proto14.target = function target(e) {
          return e.target;
        };

        _proto14.outEdges = function outEdges(v) {
          return new OutEI(this._vertices[v]._outEdges.values(), v);
        };

        _proto14.outDegree = function outDegree(v) {
          return this._vertices[v]._outEdges.length;
        } //-----------------------------------------------------------------
        // BidirectionalGraph
        // type in_edge_iterator = InEI;
        ;

        _proto14.inEdges = function inEdges(v) {
          return new InEI(this._vertices[v]._inEdges.values(), v);
        };

        _proto14.inDegree = function inDegree(v) {
          return this._vertices[v]._inEdges.length;
        };

        _proto14.degree = function degree(v) {
          return this.outDegree(v) + this.inDegree(v);
        } //-----------------------------------------------------------------
        // AdjacencyGraph
        // type adjacency_iterator = AdjI;
        ;

        _proto14.adjacentVertices = function adjacentVertices(v) {
          return new AdjI(this, this.outEdges(v));
        } //-----------------------------------------------------------------
        // VertexListGraph
        ;

        _proto14.vertices = function vertices() {
          return this._vertices.keys();
        };

        _proto14.numVertices = function numVertices() {
          return this._vertices.length;
        } //-----------------------------------------------------------------
        // EdgeListGraph
        ;

        _proto14.numEdges = function numEdges() {
          var numEdges = 0;

          for (var _iterator10 = _createForOfIteratorHelperLoose(this.vertices()), _step10; !(_step10 = _iterator10()).done;) {
            var v = _step10.value;
            numEdges += this.outDegree(v);
          }

          return numEdges;
        } //-----------------------------------------------------------------
        // MutableGraph
        ;

        _proto14.clear = function clear() {
          // Members
          this.index.clear(); // ComponentGraph

          this._names.length = 0;
          this._layoutNodes.length = 0;
          this._data.length = 0;
          this._valid.length = 0; // Graph Vertices

          this._vertices.length = 0;
        };

        _proto14.addVertex = function addVertex(id, object, name, layout, data, valid, u) {
          if (u === void 0) {
            u = 0xFFFFFFFF;
          }

          var vert = new RenderGraphVertex(id, object);
          var v = this._vertices.length;

          this._vertices.push(vert);

          this._names.push(name);

          this._layoutNodes.push(layout);

          this._data.push(data);

          this._valid.push(valid); // ReferenceGraph


          if (u !== 0xFFFFFFFF) {
            this._vertices[u]._children.push(new OutE(v));

            vert._parents.push(new OutE(u));
          }

          return v;
        };

        _proto14.clearVertex = function clearVertex(v) {
          // ReferenceGraph(Separated)
          var vert = this._vertices[v]; // clear out edges

          for (var _iterator11 = _createForOfIteratorHelperLoose(vert._outEdges), _step11; !(_step11 = _iterator11()).done;) {
            var oe = _step11.value;
            var target = this._vertices[oe.target];

            for (var i = 0; i !== target._inEdges.length;) {
              // remove all edges
              if (target._inEdges[i].target === v) {
                target._inEdges.splice(i, 1);
              } else {
                ++i;
              }
            }
          }

          vert._outEdges.length = 0; // clear in edges

          for (var _iterator12 = _createForOfIteratorHelperLoose(vert._inEdges), _step12; !(_step12 = _iterator12()).done;) {
            var ie = _step12.value;
            var source = this._vertices[ie.target];

            for (var _i7 = 0; _i7 !== source._outEdges.length;) {
              // remove all edges
              if (source._outEdges[_i7].target === v) {
                source._outEdges.splice(_i7, 1);
              } else {
                ++_i7;
              }
            }
          }

          vert._inEdges.length = 0; // clear child edges

          for (var _iterator13 = _createForOfIteratorHelperLoose(vert._children), _step13; !(_step13 = _iterator13()).done;) {
            var _oe = _step13.value;
            var _target = this._vertices[_oe.target];

            for (var _i8 = 0; _i8 !== _target._parents.length;) {
              // remove all edges
              if (_target._parents[_i8].target === v) {
                _target._parents.splice(_i8, 1);
              } else {
                ++_i8;
              }
            }
          }

          vert._children.length = 0; // clear parent edges

          for (var _iterator14 = _createForOfIteratorHelperLoose(vert._parents), _step14; !(_step14 = _iterator14()).done;) {
            var _ie = _step14.value;
            var _source = this._vertices[_ie.target];

            for (var _i9 = 0; _i9 !== _source._children.length;) {
              // remove all edges
              if (_source._children[_i9].target === v) {
                _source._children.splice(_i9, 1);
              } else {
                ++_i9;
              }
            }
          }

          vert._parents.length = 0;
        };

        _proto14.removeVertex = function removeVertex(u) {
          this._vertices.splice(u, 1);

          this._names.splice(u, 1);

          this._layoutNodes.splice(u, 1);

          this._data.splice(u, 1);

          this._valid.splice(u, 1);

          var sz = this._vertices.length;

          if (u === sz) {
            return;
          }

          for (var v = 0; v !== sz; ++v) {
            var vert = this._vertices[v];
            reindexEdgeList(vert._outEdges, u);
            reindexEdgeList(vert._inEdges, u); // ReferenceGraph (Separated)

            reindexEdgeList(vert._children, u);
            reindexEdgeList(vert._parents, u);
          }
        };

        _proto14.addEdge = function addEdge(u, v) {
          // update in/out edge list
          this._vertices[u]._outEdges.push(new OutE(v));

          this._vertices[v]._inEdges.push(new OutE(u));

          return new ED(u, v);
        };

        _proto14.removeEdges = function removeEdges(u, v) {
          var source = this._vertices[u]; // remove out edges of u

          for (var i = 0; i !== source._outEdges.length;) {
            // remove all edges
            if (source._outEdges[i].target === v) {
              source._outEdges.splice(i, 1);
            } else {
              ++i;
            }
          } // remove in edges of v


          var target = this._vertices[v];

          for (var _i10 = 0; _i10 !== target._inEdges.length;) {
            // remove all edges
            if (target._inEdges[_i10].target === u) {
              target._inEdges.splice(_i10, 1);
            } else {
              ++_i10;
            }
          }
        };

        _proto14.removeEdge = function removeEdge(e) {
          var u = e.source;
          var v = e.target;
          var source = this._vertices[u];

          for (var i = 0; i !== source._outEdges.length;) {
            if (source._outEdges[i].target === v) {
              source._outEdges.splice(i, 1);

              break; // remove one edge
            } else {
              ++i;
            }
          }

          var target = this._vertices[v];

          for (var _i11 = 0; _i11 !== target._inEdges.length;) {
            if (target._inEdges[_i11].target === u) {
              target._inEdges.splice(_i11, 1);

              break; // remove one edge
            } else {
              ++_i11;
            }
          }
        } //-----------------------------------------------------------------
        // NamedGraph
        ;

        _proto14.vertexName = function vertexName(v) {
          return this._names[v];
        };

        _proto14.vertexNameMap = function vertexNameMap() {
          return new RenderGraphNameMap(this._names);
        } //-----------------------------------------------------------------
        // PropertyGraph
        ;

        _proto14.get = function get(tag) {
          switch (tag) {
            // Components
            case 'Name':
              return new RenderGraphNameMap(this._names);

            case 'Layout':
              return new RenderGraphLayoutMap(this._layoutNodes);

            case 'Data':
              return new RenderGraphDataMap(this._data);

            case 'Valid':
              return new RenderGraphValidMap(this._valid);

            default:
              throw Error('property map not found');
          }
        } //-----------------------------------------------------------------
        // ComponentGraph
        ;

        _proto14.component = function component(id, v) {
          switch (id) {
            case RenderGraphComponent.Name:
              return this._names[v];

            case RenderGraphComponent.Layout:
              return this._layoutNodes[v];

            case RenderGraphComponent.Data:
              return this._data[v];

            case RenderGraphComponent.Valid:
              return this._valid[v];

            default:
              throw Error('component not found');
          }
        };

        _proto14.componentMap = function componentMap(id) {
          switch (id) {
            case RenderGraphComponent.Name:
              return new RenderGraphNameMap(this._names);

            case RenderGraphComponent.Layout:
              return new RenderGraphLayoutMap(this._layoutNodes);

            case RenderGraphComponent.Data:
              return new RenderGraphDataMap(this._data);

            case RenderGraphComponent.Valid:
              return new RenderGraphValidMap(this._valid);

            default:
              throw Error('component map not found');
          }
        };

        _proto14.getName = function getName(v) {
          return this._names[v];
        };

        _proto14.setName = function setName(v, value) {
          this._names[v] = value;
        };

        _proto14.getLayout = function getLayout(v) {
          return this._layoutNodes[v];
        };

        _proto14.setLayout = function setLayout(v, value) {
          this._layoutNodes[v] = value;
        };

        _proto14.getData = function getData(v) {
          return this._data[v];
        };

        _proto14.getValid = function getValid(v) {
          return this._valid[v];
        };

        _proto14.setValid = function setValid(v, value) {
          this._valid[v] = value;
        } //-----------------------------------------------------------------
        // PolymorphicGraph
        ;

        _proto14.holds = function holds(id, v) {
          return this._vertices[v]._id === id;
        };

        _proto14.id = function id(v) {
          return this._vertices[v]._id;
        };

        _proto14.object = function object(v) {
          return this._vertices[v]._object;
        };

        _proto14.value = function value(id, v) {
          if (this._vertices[v]._id === id) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        };

        _proto14.tryValue = function tryValue(id, v) {
          if (this._vertices[v]._id === id) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        };

        _proto14.visitVertex = function visitVertex(visitor, v) {
          var vert = this._vertices[v];

          switch (vert._id) {
            case RenderGraphValue.RasterPass:
              return visitor.rasterPass(vert._object);

            case RenderGraphValue.RasterSubpass:
              return visitor.rasterSubpass(vert._object);

            case RenderGraphValue.ComputeSubpass:
              return visitor.computeSubpass(vert._object);

            case RenderGraphValue.Compute:
              return visitor.compute(vert._object);

            case RenderGraphValue.Copy:
              return visitor.copy(vert._object);

            case RenderGraphValue.Move:
              return visitor.move(vert._object);

            case RenderGraphValue.Raytrace:
              return visitor.raytrace(vert._object);

            case RenderGraphValue.Queue:
              return visitor.queue(vert._object);

            case RenderGraphValue.Scene:
              return visitor.scene(vert._object);

            case RenderGraphValue.Blit:
              return visitor.blit(vert._object);

            case RenderGraphValue.Dispatch:
              return visitor.dispatch(vert._object);

            case RenderGraphValue.Clear:
              return visitor.clear(vert._object);

            case RenderGraphValue.Viewport:
              return visitor.viewport(vert._object);

            default:
              throw Error('polymorphic type not found');
          }
        };

        _proto14.getRasterPass = function getRasterPass(v) {
          if (this._vertices[v]._id === RenderGraphValue.RasterPass) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        };

        _proto14.getRasterSubpass = function getRasterSubpass(v) {
          if (this._vertices[v]._id === RenderGraphValue.RasterSubpass) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        };

        _proto14.getComputeSubpass = function getComputeSubpass(v) {
          if (this._vertices[v]._id === RenderGraphValue.ComputeSubpass) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        };

        _proto14.getCompute = function getCompute(v) {
          if (this._vertices[v]._id === RenderGraphValue.Compute) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        };

        _proto14.getCopy = function getCopy(v) {
          if (this._vertices[v]._id === RenderGraphValue.Copy) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        };

        _proto14.getMove = function getMove(v) {
          if (this._vertices[v]._id === RenderGraphValue.Move) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        };

        _proto14.getRaytrace = function getRaytrace(v) {
          if (this._vertices[v]._id === RenderGraphValue.Raytrace) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        };

        _proto14.getQueue = function getQueue(v) {
          if (this._vertices[v]._id === RenderGraphValue.Queue) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        };

        _proto14.getScene = function getScene(v) {
          if (this._vertices[v]._id === RenderGraphValue.Scene) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        };

        _proto14.getBlit = function getBlit(v) {
          if (this._vertices[v]._id === RenderGraphValue.Blit) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        };

        _proto14.getDispatch = function getDispatch(v) {
          if (this._vertices[v]._id === RenderGraphValue.Dispatch) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        };

        _proto14.getClear = function getClear(v) {
          if (this._vertices[v]._id === RenderGraphValue.Clear) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        };

        _proto14.getViewport = function getViewport(v) {
          if (this._vertices[v]._id === RenderGraphValue.Viewport) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        };

        _proto14.tryGetRasterPass = function tryGetRasterPass(v) {
          if (this._vertices[v]._id === RenderGraphValue.RasterPass) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        };

        _proto14.tryGetRasterSubpass = function tryGetRasterSubpass(v) {
          if (this._vertices[v]._id === RenderGraphValue.RasterSubpass) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        };

        _proto14.tryGetComputeSubpass = function tryGetComputeSubpass(v) {
          if (this._vertices[v]._id === RenderGraphValue.ComputeSubpass) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        };

        _proto14.tryGetCompute = function tryGetCompute(v) {
          if (this._vertices[v]._id === RenderGraphValue.Compute) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        };

        _proto14.tryGetCopy = function tryGetCopy(v) {
          if (this._vertices[v]._id === RenderGraphValue.Copy) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        };

        _proto14.tryGetMove = function tryGetMove(v) {
          if (this._vertices[v]._id === RenderGraphValue.Move) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        };

        _proto14.tryGetRaytrace = function tryGetRaytrace(v) {
          if (this._vertices[v]._id === RenderGraphValue.Raytrace) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        };

        _proto14.tryGetQueue = function tryGetQueue(v) {
          if (this._vertices[v]._id === RenderGraphValue.Queue) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        };

        _proto14.tryGetScene = function tryGetScene(v) {
          if (this._vertices[v]._id === RenderGraphValue.Scene) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        };

        _proto14.tryGetBlit = function tryGetBlit(v) {
          if (this._vertices[v]._id === RenderGraphValue.Blit) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        };

        _proto14.tryGetDispatch = function tryGetDispatch(v) {
          if (this._vertices[v]._id === RenderGraphValue.Dispatch) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        };

        _proto14.tryGetClear = function tryGetClear(v) {
          if (this._vertices[v]._id === RenderGraphValue.Clear) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        };

        _proto14.tryGetViewport = function tryGetViewport(v) {
          if (this._vertices[v]._id === RenderGraphValue.Viewport) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        } //-----------------------------------------------------------------
        // ReferenceGraph
        // type reference_descriptor = ED;
        // type child_iterator = OutEI;
        // type parent_iterator = InEI;
        ;

        _proto14.reference = function reference(u, v) {
          for (var _iterator15 = _createForOfIteratorHelperLoose(this._vertices[u]._children), _step15; !(_step15 = _iterator15()).done;) {
            var oe = _step15.value;

            if (v === oe.target) {
              return true;
            }
          }

          return false;
        };

        _proto14.parent = function parent(e) {
          return e.source;
        };

        _proto14.child = function child(e) {
          return e.target;
        };

        _proto14.parents = function parents(v) {
          return new InEI(this._vertices[v]._parents.values(), v);
        };

        _proto14.children = function children(v) {
          return new OutEI(this._vertices[v]._children.values(), v);
        };

        _proto14.numParents = function numParents(v) {
          return this._vertices[v]._parents.length;
        };

        _proto14.numChildren = function numChildren(v) {
          return this._vertices[v]._children.length;
        };

        _proto14.getParent = function getParent(v) {
          if (v === 0xFFFFFFFF) {
            return 0xFFFFFFFF;
          }

          var list = this._vertices[v]._parents;

          if (list.length === 0) {
            return 0xFFFFFFFF;
          } else {
            return list[0].target;
          }
        };

        _proto14.isAncestor = function isAncestor(ancestor, descendent) {
          var pseudo = 0xFFFFFFFF;

          if (ancestor === descendent) {
            // when ancestor === descendent, is_ancestor is defined as false
            return false;
          }

          if (ancestor === pseudo) {
            // special case: pseudo root is always ancestor
            return true;
          }

          if (descendent === pseudo) {
            // special case: pseudo root is never descendent
            return false;
          }

          for (var parent = this.getParent(descendent); parent !== pseudo;) {
            if (ancestor === parent) {
              return true;
            }

            parent = this.getParent(parent);
          }

          return false;
        } //-----------------------------------------------------------------
        // MutableReferenceGraph
        ;

        _proto14.addReference = function addReference(u, v) {
          // update in/out edge list
          this._vertices[u]._children.push(new OutE(v));

          this._vertices[v]._parents.push(new OutE(u));

          return new ED(u, v);
        };

        _proto14.removeReference = function removeReference(e) {
          var u = e.source;
          var v = e.target;
          var source = this._vertices[u];

          for (var i = 0; i !== source._children.length;) {
            if (source._children[i].target === v) {
              source._children.splice(i, 1);

              break; // remove one edge
            } else {
              ++i;
            }
          }

          var target = this._vertices[v];

          for (var _i12 = 0; _i12 !== target._parents.length;) {
            if (target._parents[_i12].target === u) {
              target._parents.splice(_i12, 1);

              break; // remove one edge
            } else {
              ++_i12;
            }
          }
        };

        _proto14.removeReferences = function removeReferences(u, v) {
          var source = this._vertices[u]; // remove out edges of u

          for (var i = 0; i !== source._children.length;) {
            // remove all edges
            if (source._children[i].target === v) {
              source._children.splice(i, 1);
            } else {
              ++i;
            }
          } // remove in edges of v


          var target = this._vertices[v];

          for (var _i13 = 0; _i13 !== target._parents.length;) {
            // remove all edges
            if (target._parents[_i13].target === u) {
              target._parents.splice(_i13, 1);
            } else {
              ++_i13;
            }
          }
        };

        return RenderGraph;
      }());
    }
  };
});