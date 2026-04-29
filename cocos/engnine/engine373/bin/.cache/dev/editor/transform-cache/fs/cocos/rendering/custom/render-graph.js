System.register("q-bundled:///fs/cocos/rendering/custom/render-graph.js", ["./graph.js", "../../gfx/index.js", "./types.js"], function (_export, _context) {
  "use strict";

  var AdjI, ED, InEI, OutE, OutEI, directional, parallel, reindexEdgeList, traversal, AccessFlagBit, ClearFlagBit, Color, Format, SampleCount, TextureFlagBit, Viewport, LightInfo, QueueHint, ResourceDimension, ResourceFlags, ResourceResidency, SceneFlags, ResourceDesc, ResourceTraits, RenderSwapchain, ResourceStates, ManagedBuffer, ManagedTexture, ManagedResource, Subpass, SubpassGraphVertex, SubpassGraphNameMap, SubpassGraphSubpassMap, SubpassGraph, RasterSubpass, ComputeSubpass, RasterPass, PersistentRenderPassAndFramebuffer, ResourceGraphVertex, ResourceGraphNameMap, ResourceGraphDescMap, ResourceGraphTraitsMap, ResourceGraphStatesMap, ResourceGraphSamplerMap, ResourceGraph, ComputePass, CopyPass, MovePass, RaytracePass, ClearView, RenderQueue, SceneData, Dispatch, Blit, RenderData, RenderGraphVertex, RenderGraphNameMap, RenderGraphLayoutMap, RenderGraphDataMap, RenderGraphValidMap, RenderGraph, SubpassGraphComponent, ResourceGraphValue, ResourceGraphComponent, RenderGraphValue, RenderGraphComponent;

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
    ResourceDesc: void 0,
    ResourceTraits: void 0,
    RenderSwapchain: void 0,
    ResourceStates: void 0,
    ManagedBuffer: void 0,
    ManagedTexture: void 0,
    ManagedResource: void 0,
    Subpass: void 0,
    SubpassGraphVertex: void 0,
    SubpassGraphNameMap: void 0,
    SubpassGraphSubpassMap: void 0,
    SubpassGraph: void 0,
    RasterSubpass: void 0,
    ComputeSubpass: void 0,
    RasterPass: void 0,
    PersistentRenderPassAndFramebuffer: void 0,
    getResourceGraphValueName: getResourceGraphValueName,
    ResourceGraphVertex: void 0,
    ResourceGraphNameMap: void 0,
    ResourceGraphDescMap: void 0,
    ResourceGraphTraitsMap: void 0,
    ResourceGraphStatesMap: void 0,
    ResourceGraphSamplerMap: void 0,
    ResourceGraph: void 0,
    ComputePass: void 0,
    CopyPass: void 0,
    MovePass: void 0,
    RaytracePass: void 0,
    ClearView: void 0,
    RenderQueue: void 0,
    SceneData: void 0,
    Dispatch: void 0,
    Blit: void 0,
    RenderData: void 0,
    getRenderGraphValueName: getRenderGraphValueName,
    RenderGraphVertex: void 0,
    RenderGraphNameMap: void 0,
    RenderGraphLayoutMap: void 0,
    RenderGraphDataMap: void 0,
    RenderGraphValidMap: void 0,
    RenderGraph: void 0
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
      /****************************************************************************
       Copyright (c) 2021-2023 Xiamen Yaji Software Co., Ltd.
      
       http://www.cocos.com
      
       Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated documentation files (the "Software"), to deal
       in the Software without restriction, including without limitation the rights to
       use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
       of the Software, and to permit persons to whom the Software is furnished to do so,
       subject to the following conditions:
      
       The above copyright notice and this permission notice shall be included in
       all copies or substantial portions of the Software.
      
       THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
      ****************************************************************************/

      /**
       * ========================= !DO NOT CHANGE THE FOLLOWING SECTION MANUALLY! =========================
       * The following section is auto-generated.
       * ========================= !DO NOT CHANGE THE FOLLOWING SECTION MANUALLY! =========================
       */

      /* eslint-disable max-len */
      _export("ResourceDesc", ResourceDesc = class ResourceDesc {
        constructor() {
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
        }

      });

      _export("ResourceTraits", ResourceTraits = class ResourceTraits {
        constructor(residency = ResourceResidency.MANAGED) {
          this.residency = void 0;
          this.residency = residency;
        }

      });

      _export("RenderSwapchain", RenderSwapchain = class RenderSwapchain {
        constructor(swapchain = null) {
          this.swapchain = void 0;
          this.currentID = 0;
          this.numBackBuffers = 0;
          this.generation = 0xFFFFFFFF;
          this.swapchain = swapchain;
        }
        /*pointer*/


      });

      _export("ResourceStates", ResourceStates = class ResourceStates {
        constructor() {
          this.states = AccessFlagBit.NONE;
        }

      });

      _export("ManagedBuffer", ManagedBuffer = class ManagedBuffer {
        constructor(buffer = null) {
          this.buffer = void 0;
          this.fenceValue = 0;
          this.buffer = buffer;
        }
        /*refcount*/


      });

      _export("ManagedTexture", ManagedTexture = class ManagedTexture {
        constructor(texture = null) {
          this.texture = void 0;
          this.fenceValue = 0;
          this.texture = texture;
        }
        /*refcount*/


      });

      _export("ManagedResource", ManagedResource = class ManagedResource {
        constructor() {
          this.unused = 0;
        }

      });

      _export("Subpass", Subpass = class Subpass {
        constructor() {
          this.rasterViews = new Map();
          this.computeViews = new Map();
        }

      }); //=================================================================
      // SubpassGraph
      //=================================================================
      // Graph Concept


      _export("SubpassGraphVertex", SubpassGraphVertex = class SubpassGraphVertex {
        constructor() {
          this._outEdges = [];
          this._inEdges = [];
        }

      }); //-----------------------------------------------------------------
      // PropertyGraph Concept


      _export("SubpassGraphNameMap", SubpassGraphNameMap = class SubpassGraphNameMap {
        constructor(names) {
          this._names = void 0;
          this.names = names;
          this._names = names;
        }

        get(v) {
          return this._names[v];
        }

        set(v, names) {
          this._names[v] = names;
        }

      });

      _export("SubpassGraphSubpassMap", SubpassGraphSubpassMap = class SubpassGraphSubpassMap {
        constructor(subpasses) {
          this._subpasses = void 0;
          this.subpasses = subpasses;
          this._subpasses = subpasses;
        }

        get(v) {
          return this._subpasses[v];
        }

      }); //-----------------------------------------------------------------
      // ComponentGraph Concept


      _export("SubpassGraphComponent", SubpassGraphComponent = {
        Name: 0,
        Subpass: 1
      });

      //-----------------------------------------------------------------
      // SubpassGraph Implementation
      _export("SubpassGraph", SubpassGraph = class SubpassGraph {
        constructor() {
          this.directed_category = directional.bidirectional;
          this.edge_parallel_category = parallel.allow;
          this.traversal_category = traversal.incidence | traversal.bidirectional | traversal.adjacency | traversal.vertex_list;
          this.components = ['Name', 'Subpass'];
          this._vertices = [];
          this._names = [];
          this._subpasses = [];
        }

        //-----------------------------------------------------------------
        // Graph
        // type vertex_descriptor = number;
        nullVertex() {
          return 0xFFFFFFFF;
        } // type edge_descriptor = ED;


        //-----------------------------------------------------------------
        // IncidenceGraph
        // type out_edge_iterator = OutEI;
        // type degree_size_type = number;
        edge(u, v) {
          for (const oe of this._vertices[u]._outEdges) {
            if (v === oe.target) {
              return true;
            }
          }

          return false;
        }

        source(e) {
          return e.source;
        }

        target(e) {
          return e.target;
        }

        outEdges(v) {
          return new OutEI(this._vertices[v]._outEdges.values(), v);
        }

        outDegree(v) {
          return this._vertices[v]._outEdges.length;
        } //-----------------------------------------------------------------
        // BidirectionalGraph
        // type in_edge_iterator = InEI;


        inEdges(v) {
          return new InEI(this._vertices[v]._inEdges.values(), v);
        }

        inDegree(v) {
          return this._vertices[v]._inEdges.length;
        }

        degree(v) {
          return this.outDegree(v) + this.inDegree(v);
        } //-----------------------------------------------------------------
        // AdjacencyGraph
        // type adjacency_iterator = AdjI;


        adjacentVertices(v) {
          return new AdjI(this, this.outEdges(v));
        } //-----------------------------------------------------------------
        // VertexListGraph


        vertices() {
          return this._vertices.keys();
        }

        numVertices() {
          return this._vertices.length;
        } //-----------------------------------------------------------------
        // EdgeListGraph


        numEdges() {
          let numEdges = 0;

          for (const v of this.vertices()) {
            numEdges += this.outDegree(v);
          }

          return numEdges;
        } //-----------------------------------------------------------------
        // MutableGraph


        clear() {
          // ComponentGraph
          this._names.length = 0;
          this._subpasses.length = 0; // Graph Vertices

          this._vertices.length = 0;
        }

        addVertex(name, subpass) {
          const vert = new SubpassGraphVertex();
          const v = this._vertices.length;

          this._vertices.push(vert);

          this._names.push(name);

          this._subpasses.push(subpass);

          return v;
        }

        clearVertex(v) {
          const vert = this._vertices[v]; // clear out edges

          for (const oe of vert._outEdges) {
            const target = this._vertices[oe.target];

            for (let i = 0; i !== target._inEdges.length;) {
              // remove all edges
              if (target._inEdges[i].target === v) {
                target._inEdges.splice(i, 1);
              } else {
                ++i;
              }
            }
          }

          vert._outEdges.length = 0; // clear in edges

          for (const ie of vert._inEdges) {
            const source = this._vertices[ie.target];

            for (let i = 0; i !== source._outEdges.length;) {
              // remove all edges
              if (source._outEdges[i].target === v) {
                source._outEdges.splice(i, 1);
              } else {
                ++i;
              }
            }
          }

          vert._inEdges.length = 0;
        }

        removeVertex(u) {
          this._vertices.splice(u, 1);

          this._names.splice(u, 1);

          this._subpasses.splice(u, 1);

          const sz = this._vertices.length;

          if (u === sz) {
            return;
          }

          for (let v = 0; v !== sz; ++v) {
            const vert = this._vertices[v];
            reindexEdgeList(vert._outEdges, u);
            reindexEdgeList(vert._inEdges, u);
          }
        }

        addEdge(u, v) {
          // update in/out edge list
          this._vertices[u]._outEdges.push(new OutE(v));

          this._vertices[v]._inEdges.push(new OutE(u));

          return new ED(u, v);
        }

        removeEdges(u, v) {
          const source = this._vertices[u]; // remove out edges of u

          for (let i = 0; i !== source._outEdges.length;) {
            // remove all edges
            if (source._outEdges[i].target === v) {
              source._outEdges.splice(i, 1);
            } else {
              ++i;
            }
          } // remove in edges of v


          const target = this._vertices[v];

          for (let i = 0; i !== target._inEdges.length;) {
            // remove all edges
            if (target._inEdges[i].target === u) {
              target._inEdges.splice(i, 1);
            } else {
              ++i;
            }
          }
        }

        removeEdge(e) {
          const u = e.source;
          const v = e.target;
          const source = this._vertices[u];

          for (let i = 0; i !== source._outEdges.length;) {
            if (source._outEdges[i].target === v) {
              source._outEdges.splice(i, 1);

              break; // remove one edge
            } else {
              ++i;
            }
          }

          const target = this._vertices[v];

          for (let i = 0; i !== target._inEdges.length;) {
            if (target._inEdges[i].target === u) {
              target._inEdges.splice(i, 1);

              break; // remove one edge
            } else {
              ++i;
            }
          }
        } //-----------------------------------------------------------------
        // NamedGraph


        vertexName(v) {
          return this._names[v];
        }

        vertexNameMap() {
          return new SubpassGraphNameMap(this._names);
        } //-----------------------------------------------------------------
        // PropertyGraph


        get(tag) {
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


        component(id, v) {
          switch (id) {
            case SubpassGraphComponent.Name:
              return this._names[v];

            case SubpassGraphComponent.Subpass:
              return this._subpasses[v];

            default:
              throw Error('component not found');
          }
        }

        componentMap(id) {
          switch (id) {
            case SubpassGraphComponent.Name:
              return new SubpassGraphNameMap(this._names);

            case SubpassGraphComponent.Subpass:
              return new SubpassGraphSubpassMap(this._subpasses);

            default:
              throw Error('component map not found');
          }
        }

        getName(v) {
          return this._names[v];
        }

        setName(v, value) {
          this._names[v] = value;
        }

        getSubpass(v) {
          return this._subpasses[v];
        }

      });

      _export("RasterSubpass", RasterSubpass = class RasterSubpass {
        constructor(subpassID) {
          this.rasterViews = new Map();
          this.computeViews = new Map();
          this.subpassID = void 0;
          this.viewport = new Viewport();
          this.showStatistics = false;
          this.subpassID = subpassID;
        }

      });

      _export("ComputeSubpass", ComputeSubpass = class ComputeSubpass {
        constructor(subpassID) {
          this.rasterViews = new Map();
          this.computeViews = new Map();
          this.subpassID = void 0;
          this.subpassID = subpassID;
        }

      });

      _export("RasterPass", RasterPass = class RasterPass {
        constructor() {
          this.rasterViews = new Map();
          this.computeViews = new Map();
          this.subpassGraph = new SubpassGraph();
          this.width = 0;
          this.height = 0;
          this.viewport = new Viewport();
          this.versionName = '';
          this.version = 0;
          this.showStatistics = false;
        }

      });

      _export("PersistentRenderPassAndFramebuffer", PersistentRenderPassAndFramebuffer = class PersistentRenderPassAndFramebuffer {
        constructor(renderPass, framebuffer) {
          this.renderPass = void 0;
          this.framebuffer = void 0;
          this.clearColors = [];
          this.clearDepth = 0;
          this.clearStencil = 0;
          this.renderPass = renderPass;
          this.framebuffer = framebuffer;
        }
        /*refcount*/


      }); //=================================================================
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
      _export("ResourceGraphVertex", ResourceGraphVertex = class ResourceGraphVertex {
        constructor(id, object) {
          this._outEdges = [];
          this._inEdges = [];
          this._id = void 0;
          this._object = void 0;
          this.id = id;
          this.object = object;
          this._id = id;
          this._object = object;
        }

      }); //-----------------------------------------------------------------
      // PropertyGraph Concept


      _export("ResourceGraphNameMap", ResourceGraphNameMap = class ResourceGraphNameMap {
        constructor(names) {
          this._names = void 0;
          this.names = names;
          this._names = names;
        }

        get(v) {
          return this._names[v];
        }

        set(v, names) {
          this._names[v] = names;
        }

      });

      _export("ResourceGraphDescMap", ResourceGraphDescMap = class ResourceGraphDescMap {
        constructor(descs) {
          this._descs = void 0;
          this.descs = descs;
          this._descs = descs;
        }

        get(v) {
          return this._descs[v];
        }

      });

      _export("ResourceGraphTraitsMap", ResourceGraphTraitsMap = class ResourceGraphTraitsMap {
        constructor(traits) {
          this._traits = void 0;
          this.traits = traits;
          this._traits = traits;
        }

        get(v) {
          return this._traits[v];
        }

      });

      _export("ResourceGraphStatesMap", ResourceGraphStatesMap = class ResourceGraphStatesMap {
        constructor(states) {
          this._states = void 0;
          this.states = states;
          this._states = states;
        }

        get(v) {
          return this._states[v];
        }

      });

      _export("ResourceGraphSamplerMap", ResourceGraphSamplerMap = class ResourceGraphSamplerMap {
        constructor(samplerInfo) {
          this._samplerInfo = void 0;
          this.samplerInfo = samplerInfo;
          this._samplerInfo = samplerInfo;
        }

        get(v) {
          return this._samplerInfo[v];
        }

      }); //-----------------------------------------------------------------
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
      _export("ResourceGraph", ResourceGraph = class ResourceGraph {
        constructor() {
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

        //-----------------------------------------------------------------
        // Graph
        // type vertex_descriptor = number;
        nullVertex() {
          return 0xFFFFFFFF;
        } // type edge_descriptor = ED;


        //-----------------------------------------------------------------
        // IncidenceGraph
        // type out_edge_iterator = OutEI;
        // type degree_size_type = number;
        edge(u, v) {
          for (const oe of this._vertices[u]._outEdges) {
            if (v === oe.target) {
              return true;
            }
          }

          return false;
        }

        source(e) {
          return e.source;
        }

        target(e) {
          return e.target;
        }

        outEdges(v) {
          return new OutEI(this._vertices[v]._outEdges.values(), v);
        }

        outDegree(v) {
          return this._vertices[v]._outEdges.length;
        } //-----------------------------------------------------------------
        // BidirectionalGraph
        // type in_edge_iterator = InEI;


        inEdges(v) {
          return new InEI(this._vertices[v]._inEdges.values(), v);
        }

        inDegree(v) {
          return this._vertices[v]._inEdges.length;
        }

        degree(v) {
          return this.outDegree(v) + this.inDegree(v);
        } //-----------------------------------------------------------------
        // AdjacencyGraph
        // type adjacency_iterator = AdjI;


        adjacentVertices(v) {
          return new AdjI(this, this.outEdges(v));
        } //-----------------------------------------------------------------
        // VertexListGraph


        vertices() {
          return this._vertices.keys();
        }

        numVertices() {
          return this._vertices.length;
        } //-----------------------------------------------------------------
        // EdgeListGraph


        numEdges() {
          let numEdges = 0;

          for (const v of this.vertices()) {
            numEdges += this.outDegree(v);
          }

          return numEdges;
        } //-----------------------------------------------------------------
        // MutableGraph


        clear() {
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
        }

        addVertex(id, object, name, desc, traits, states, sampler) {
          const vert = new ResourceGraphVertex(id, object);
          const v = this._vertices.length;

          this._vertices.push(vert);

          this._names.push(name);

          this._descs.push(desc);

          this._traits.push(traits);

          this._states.push(states);

          this._samplerInfo.push(sampler); // UuidGraph


          this._valueIndex.set(name, v);

          return v;
        }

        clearVertex(v) {
          const vert = this._vertices[v]; // clear out edges

          for (const oe of vert._outEdges) {
            const target = this._vertices[oe.target];

            for (let i = 0; i !== target._inEdges.length;) {
              // remove all edges
              if (target._inEdges[i].target === v) {
                target._inEdges.splice(i, 1);
              } else {
                ++i;
              }
            }
          }

          vert._outEdges.length = 0; // clear in edges

          for (const ie of vert._inEdges) {
            const source = this._vertices[ie.target];

            for (let i = 0; i !== source._outEdges.length;) {
              // remove all edges
              if (source._outEdges[i].target === v) {
                source._outEdges.splice(i, 1);
              } else {
                ++i;
              }
            }
          }

          vert._inEdges.length = 0;
        }

        removeVertex(u) {
          {
            // UuidGraph
            const key = this._names[u];

            this._valueIndex.delete(key);

            this._valueIndex.forEach(v => {
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

          const sz = this._vertices.length;

          if (u === sz) {
            return;
          }

          for (let v = 0; v !== sz; ++v) {
            const vert = this._vertices[v];
            reindexEdgeList(vert._outEdges, u);
            reindexEdgeList(vert._inEdges, u);
          }
        }

        addEdge(u, v) {
          // update in/out edge list
          this._vertices[u]._outEdges.push(new OutE(v));

          this._vertices[v]._inEdges.push(new OutE(u));

          return new ED(u, v);
        }

        removeEdges(u, v) {
          const source = this._vertices[u]; // remove out edges of u

          for (let i = 0; i !== source._outEdges.length;) {
            // remove all edges
            if (source._outEdges[i].target === v) {
              source._outEdges.splice(i, 1);
            } else {
              ++i;
            }
          } // remove in edges of v


          const target = this._vertices[v];

          for (let i = 0; i !== target._inEdges.length;) {
            // remove all edges
            if (target._inEdges[i].target === u) {
              target._inEdges.splice(i, 1);
            } else {
              ++i;
            }
          }
        }

        removeEdge(e) {
          const u = e.source;
          const v = e.target;
          const source = this._vertices[u];

          for (let i = 0; i !== source._outEdges.length;) {
            if (source._outEdges[i].target === v) {
              source._outEdges.splice(i, 1);

              break; // remove one edge
            } else {
              ++i;
            }
          }

          const target = this._vertices[v];

          for (let i = 0; i !== target._inEdges.length;) {
            if (target._inEdges[i].target === u) {
              target._inEdges.splice(i, 1);

              break; // remove one edge
            } else {
              ++i;
            }
          }
        } //-----------------------------------------------------------------
        // NamedGraph


        vertexName(v) {
          return this._names[v];
        }

        vertexNameMap() {
          return new ResourceGraphNameMap(this._names);
        } //-----------------------------------------------------------------
        // PropertyGraph


        get(tag) {
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


        component(id, v) {
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
        }

        componentMap(id) {
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
        }

        getName(v) {
          return this._names[v];
        }

        setName(v, value) {
          this._names[v] = value;
        }

        getDesc(v) {
          return this._descs[v];
        }

        getTraits(v) {
          return this._traits[v];
        }

        getStates(v) {
          return this._states[v];
        }

        getSampler(v) {
          return this._samplerInfo[v];
        } //-----------------------------------------------------------------
        // PolymorphicGraph


        holds(id, v) {
          return this._vertices[v]._id === id;
        }

        id(v) {
          return this._vertices[v]._id;
        }

        object(v) {
          return this._vertices[v]._object;
        }

        value(id, v) {
          if (this._vertices[v]._id === id) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        }

        tryValue(id, v) {
          if (this._vertices[v]._id === id) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        }

        visitVertex(visitor, v) {
          const vert = this._vertices[v];

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
        }

        getManaged(v) {
          if (this._vertices[v]._id === ResourceGraphValue.Managed) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        }

        getManagedBuffer(v) {
          if (this._vertices[v]._id === ResourceGraphValue.ManagedBuffer) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        }

        getManagedTexture(v) {
          if (this._vertices[v]._id === ResourceGraphValue.ManagedTexture) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        }

        getPersistentBuffer(v) {
          if (this._vertices[v]._id === ResourceGraphValue.PersistentBuffer) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        }

        getPersistentTexture(v) {
          if (this._vertices[v]._id === ResourceGraphValue.PersistentTexture) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        }

        getFramebuffer(v) {
          if (this._vertices[v]._id === ResourceGraphValue.Framebuffer) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        }

        getSwapchain(v) {
          if (this._vertices[v]._id === ResourceGraphValue.Swapchain) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        }

        tryGetManaged(v) {
          if (this._vertices[v]._id === ResourceGraphValue.Managed) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        }

        tryGetManagedBuffer(v) {
          if (this._vertices[v]._id === ResourceGraphValue.ManagedBuffer) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        }

        tryGetManagedTexture(v) {
          if (this._vertices[v]._id === ResourceGraphValue.ManagedTexture) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        }

        tryGetPersistentBuffer(v) {
          if (this._vertices[v]._id === ResourceGraphValue.PersistentBuffer) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        }

        tryGetPersistentTexture(v) {
          if (this._vertices[v]._id === ResourceGraphValue.PersistentTexture) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        }

        tryGetFramebuffer(v) {
          if (this._vertices[v]._id === ResourceGraphValue.Framebuffer) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        }

        tryGetSwapchain(v) {
          if (this._vertices[v]._id === ResourceGraphValue.Swapchain) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        } //-----------------------------------------------------------------
        // UuidGraph


        contains(key) {
          return this._valueIndex.has(key);
        }

        vertex(key) {
          return this._valueIndex.get(key);
        }

        find(key) {
          const v = this._valueIndex.get(key);

          if (v === undefined) return 0xFFFFFFFF;
          return v;
        }

      });

      _export("ComputePass", ComputePass = class ComputePass {
        constructor() {
          this.computeViews = new Map();
        }

      });

      _export("CopyPass", CopyPass = class CopyPass {
        constructor() {
          this.copyPairs = [];
        }

      });

      _export("MovePass", MovePass = class MovePass {
        constructor() {
          this.movePairs = [];
        }

      });

      _export("RaytracePass", RaytracePass = class RaytracePass {
        constructor() {
          this.computeViews = new Map();
        }

      });

      _export("ClearView", ClearView = class ClearView {
        constructor(slotName = '', clearFlags = ClearFlagBit.ALL, clearColor = new Color()) {
          this.slotName = void 0;
          this.clearFlags = void 0;
          this.clearColor = void 0;
          this.slotName = slotName;
          this.clearFlags = clearFlags;
          this.clearColor = clearColor;
        }

      });

      _export("RenderQueue", RenderQueue = class RenderQueue {
        constructor(hint = QueueHint.RENDER_OPAQUE, phaseID = 0xFFFFFFFF) {
          this.hint = void 0;
          this.phaseID = void 0;
          this.hint = hint;
          this.phaseID = phaseID;
        }

      });

      _export("SceneData", SceneData = class SceneData {
        constructor(name = '', flags = SceneFlags.NONE, light = new LightInfo()) {
          this.name = void 0;
          this.camera = null;
          this.light = void 0;
          this.flags = void 0;
          this.scenes = [];
          this.name = name;
          this.light = light;
          this.flags = flags;
        }

      });

      _export("Dispatch", Dispatch = class Dispatch {
        constructor(material, passID, threadGroupCountX, threadGroupCountY, threadGroupCountZ) {
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


      });

      _export("Blit", Blit = class Blit {
        constructor(material, passID, sceneFlags, camera) {
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


      });

      _export("RenderData", RenderData = class RenderData {
        constructor() {
          this.constants = new Map();
          this.buffers = new Map();
          this.textures = new Map();
          this.samplers = new Map();
          this.custom = '';
        }

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
      _export("RenderGraphVertex", RenderGraphVertex = class RenderGraphVertex {
        constructor(id, object) {
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
        }

      }); //-----------------------------------------------------------------
      // PropertyGraph Concept


      _export("RenderGraphNameMap", RenderGraphNameMap = class RenderGraphNameMap {
        constructor(names) {
          this._names = void 0;
          this.names = names;
          this._names = names;
        }

        get(v) {
          return this._names[v];
        }

        set(v, names) {
          this._names[v] = names;
        }

      });

      _export("RenderGraphLayoutMap", RenderGraphLayoutMap = class RenderGraphLayoutMap {
        constructor(layoutNodes) {
          this._layoutNodes = void 0;
          this.layoutNodes = layoutNodes;
          this._layoutNodes = layoutNodes;
        }

        get(v) {
          return this._layoutNodes[v];
        }

        set(v, layoutNodes) {
          this._layoutNodes[v] = layoutNodes;
        }

      });

      _export("RenderGraphDataMap", RenderGraphDataMap = class RenderGraphDataMap {
        constructor(data) {
          this._data = void 0;
          this.data = data;
          this._data = data;
        }

        get(v) {
          return this._data[v];
        }

      });

      _export("RenderGraphValidMap", RenderGraphValidMap = class RenderGraphValidMap {
        constructor(valid) {
          this._valid = void 0;
          this.valid = valid;
          this._valid = valid;
        }

        get(v) {
          return this._valid[v];
        }

        set(v, valid) {
          this._valid[v] = valid;
        }

      }); //-----------------------------------------------------------------
      // ComponentGraph Concept


      _export("RenderGraphComponent", RenderGraphComponent = {
        Name: 0,
        Layout: 1,
        Data: 2,
        Valid: 3
      });

      //-----------------------------------------------------------------
      // RenderGraph Implementation
      _export("RenderGraph", RenderGraph = class RenderGraph {
        constructor() {
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

        //-----------------------------------------------------------------
        // Graph
        // type vertex_descriptor = number;
        nullVertex() {
          return 0xFFFFFFFF;
        } // type edge_descriptor = ED;


        //-----------------------------------------------------------------
        // IncidenceGraph
        // type out_edge_iterator = OutEI;
        // type degree_size_type = number;
        edge(u, v) {
          for (const oe of this._vertices[u]._outEdges) {
            if (v === oe.target) {
              return true;
            }
          }

          return false;
        }

        source(e) {
          return e.source;
        }

        target(e) {
          return e.target;
        }

        outEdges(v) {
          return new OutEI(this._vertices[v]._outEdges.values(), v);
        }

        outDegree(v) {
          return this._vertices[v]._outEdges.length;
        } //-----------------------------------------------------------------
        // BidirectionalGraph
        // type in_edge_iterator = InEI;


        inEdges(v) {
          return new InEI(this._vertices[v]._inEdges.values(), v);
        }

        inDegree(v) {
          return this._vertices[v]._inEdges.length;
        }

        degree(v) {
          return this.outDegree(v) + this.inDegree(v);
        } //-----------------------------------------------------------------
        // AdjacencyGraph
        // type adjacency_iterator = AdjI;


        adjacentVertices(v) {
          return new AdjI(this, this.outEdges(v));
        } //-----------------------------------------------------------------
        // VertexListGraph


        vertices() {
          return this._vertices.keys();
        }

        numVertices() {
          return this._vertices.length;
        } //-----------------------------------------------------------------
        // EdgeListGraph


        numEdges() {
          let numEdges = 0;

          for (const v of this.vertices()) {
            numEdges += this.outDegree(v);
          }

          return numEdges;
        } //-----------------------------------------------------------------
        // MutableGraph


        clear() {
          // Members
          this.index.clear(); // ComponentGraph

          this._names.length = 0;
          this._layoutNodes.length = 0;
          this._data.length = 0;
          this._valid.length = 0; // Graph Vertices

          this._vertices.length = 0;
        }

        addVertex(id, object, name, layout, data, valid, u = 0xFFFFFFFF) {
          const vert = new RenderGraphVertex(id, object);
          const v = this._vertices.length;

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
        }

        clearVertex(v) {
          // ReferenceGraph(Separated)
          const vert = this._vertices[v]; // clear out edges

          for (const oe of vert._outEdges) {
            const target = this._vertices[oe.target];

            for (let i = 0; i !== target._inEdges.length;) {
              // remove all edges
              if (target._inEdges[i].target === v) {
                target._inEdges.splice(i, 1);
              } else {
                ++i;
              }
            }
          }

          vert._outEdges.length = 0; // clear in edges

          for (const ie of vert._inEdges) {
            const source = this._vertices[ie.target];

            for (let i = 0; i !== source._outEdges.length;) {
              // remove all edges
              if (source._outEdges[i].target === v) {
                source._outEdges.splice(i, 1);
              } else {
                ++i;
              }
            }
          }

          vert._inEdges.length = 0; // clear child edges

          for (const oe of vert._children) {
            const target = this._vertices[oe.target];

            for (let i = 0; i !== target._parents.length;) {
              // remove all edges
              if (target._parents[i].target === v) {
                target._parents.splice(i, 1);
              } else {
                ++i;
              }
            }
          }

          vert._children.length = 0; // clear parent edges

          for (const ie of vert._parents) {
            const source = this._vertices[ie.target];

            for (let i = 0; i !== source._children.length;) {
              // remove all edges
              if (source._children[i].target === v) {
                source._children.splice(i, 1);
              } else {
                ++i;
              }
            }
          }

          vert._parents.length = 0;
        }

        removeVertex(u) {
          this._vertices.splice(u, 1);

          this._names.splice(u, 1);

          this._layoutNodes.splice(u, 1);

          this._data.splice(u, 1);

          this._valid.splice(u, 1);

          const sz = this._vertices.length;

          if (u === sz) {
            return;
          }

          for (let v = 0; v !== sz; ++v) {
            const vert = this._vertices[v];
            reindexEdgeList(vert._outEdges, u);
            reindexEdgeList(vert._inEdges, u); // ReferenceGraph (Separated)

            reindexEdgeList(vert._children, u);
            reindexEdgeList(vert._parents, u);
          }
        }

        addEdge(u, v) {
          // update in/out edge list
          this._vertices[u]._outEdges.push(new OutE(v));

          this._vertices[v]._inEdges.push(new OutE(u));

          return new ED(u, v);
        }

        removeEdges(u, v) {
          const source = this._vertices[u]; // remove out edges of u

          for (let i = 0; i !== source._outEdges.length;) {
            // remove all edges
            if (source._outEdges[i].target === v) {
              source._outEdges.splice(i, 1);
            } else {
              ++i;
            }
          } // remove in edges of v


          const target = this._vertices[v];

          for (let i = 0; i !== target._inEdges.length;) {
            // remove all edges
            if (target._inEdges[i].target === u) {
              target._inEdges.splice(i, 1);
            } else {
              ++i;
            }
          }
        }

        removeEdge(e) {
          const u = e.source;
          const v = e.target;
          const source = this._vertices[u];

          for (let i = 0; i !== source._outEdges.length;) {
            if (source._outEdges[i].target === v) {
              source._outEdges.splice(i, 1);

              break; // remove one edge
            } else {
              ++i;
            }
          }

          const target = this._vertices[v];

          for (let i = 0; i !== target._inEdges.length;) {
            if (target._inEdges[i].target === u) {
              target._inEdges.splice(i, 1);

              break; // remove one edge
            } else {
              ++i;
            }
          }
        } //-----------------------------------------------------------------
        // NamedGraph


        vertexName(v) {
          return this._names[v];
        }

        vertexNameMap() {
          return new RenderGraphNameMap(this._names);
        } //-----------------------------------------------------------------
        // PropertyGraph


        get(tag) {
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


        component(id, v) {
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
        }

        componentMap(id) {
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
        }

        getName(v) {
          return this._names[v];
        }

        setName(v, value) {
          this._names[v] = value;
        }

        getLayout(v) {
          return this._layoutNodes[v];
        }

        setLayout(v, value) {
          this._layoutNodes[v] = value;
        }

        getData(v) {
          return this._data[v];
        }

        getValid(v) {
          return this._valid[v];
        }

        setValid(v, value) {
          this._valid[v] = value;
        } //-----------------------------------------------------------------
        // PolymorphicGraph


        holds(id, v) {
          return this._vertices[v]._id === id;
        }

        id(v) {
          return this._vertices[v]._id;
        }

        object(v) {
          return this._vertices[v]._object;
        }

        value(id, v) {
          if (this._vertices[v]._id === id) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        }

        tryValue(id, v) {
          if (this._vertices[v]._id === id) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        }

        visitVertex(visitor, v) {
          const vert = this._vertices[v];

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
        }

        getRasterPass(v) {
          if (this._vertices[v]._id === RenderGraphValue.RasterPass) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        }

        getRasterSubpass(v) {
          if (this._vertices[v]._id === RenderGraphValue.RasterSubpass) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        }

        getComputeSubpass(v) {
          if (this._vertices[v]._id === RenderGraphValue.ComputeSubpass) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        }

        getCompute(v) {
          if (this._vertices[v]._id === RenderGraphValue.Compute) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        }

        getCopy(v) {
          if (this._vertices[v]._id === RenderGraphValue.Copy) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        }

        getMove(v) {
          if (this._vertices[v]._id === RenderGraphValue.Move) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        }

        getRaytrace(v) {
          if (this._vertices[v]._id === RenderGraphValue.Raytrace) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        }

        getQueue(v) {
          if (this._vertices[v]._id === RenderGraphValue.Queue) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        }

        getScene(v) {
          if (this._vertices[v]._id === RenderGraphValue.Scene) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        }

        getBlit(v) {
          if (this._vertices[v]._id === RenderGraphValue.Blit) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        }

        getDispatch(v) {
          if (this._vertices[v]._id === RenderGraphValue.Dispatch) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        }

        getClear(v) {
          if (this._vertices[v]._id === RenderGraphValue.Clear) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        }

        getViewport(v) {
          if (this._vertices[v]._id === RenderGraphValue.Viewport) {
            return this._vertices[v]._object;
          } else {
            throw Error('value id not match');
          }
        }

        tryGetRasterPass(v) {
          if (this._vertices[v]._id === RenderGraphValue.RasterPass) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        }

        tryGetRasterSubpass(v) {
          if (this._vertices[v]._id === RenderGraphValue.RasterSubpass) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        }

        tryGetComputeSubpass(v) {
          if (this._vertices[v]._id === RenderGraphValue.ComputeSubpass) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        }

        tryGetCompute(v) {
          if (this._vertices[v]._id === RenderGraphValue.Compute) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        }

        tryGetCopy(v) {
          if (this._vertices[v]._id === RenderGraphValue.Copy) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        }

        tryGetMove(v) {
          if (this._vertices[v]._id === RenderGraphValue.Move) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        }

        tryGetRaytrace(v) {
          if (this._vertices[v]._id === RenderGraphValue.Raytrace) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        }

        tryGetQueue(v) {
          if (this._vertices[v]._id === RenderGraphValue.Queue) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        }

        tryGetScene(v) {
          if (this._vertices[v]._id === RenderGraphValue.Scene) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        }

        tryGetBlit(v) {
          if (this._vertices[v]._id === RenderGraphValue.Blit) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        }

        tryGetDispatch(v) {
          if (this._vertices[v]._id === RenderGraphValue.Dispatch) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        }

        tryGetClear(v) {
          if (this._vertices[v]._id === RenderGraphValue.Clear) {
            return this._vertices[v]._object;
          } else {
            return null;
          }
        }

        tryGetViewport(v) {
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


        reference(u, v) {
          for (const oe of this._vertices[u]._children) {
            if (v === oe.target) {
              return true;
            }
          }

          return false;
        }

        parent(e) {
          return e.source;
        }

        child(e) {
          return e.target;
        }

        parents(v) {
          return new InEI(this._vertices[v]._parents.values(), v);
        }

        children(v) {
          return new OutEI(this._vertices[v]._children.values(), v);
        }

        numParents(v) {
          return this._vertices[v]._parents.length;
        }

        numChildren(v) {
          return this._vertices[v]._children.length;
        }

        getParent(v) {
          if (v === 0xFFFFFFFF) {
            return 0xFFFFFFFF;
          }

          const list = this._vertices[v]._parents;

          if (list.length === 0) {
            return 0xFFFFFFFF;
          } else {
            return list[0].target;
          }
        }

        isAncestor(ancestor, descendent) {
          const pseudo = 0xFFFFFFFF;

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

          for (let parent = this.getParent(descendent); parent !== pseudo;) {
            if (ancestor === parent) {
              return true;
            }

            parent = this.getParent(parent);
          }

          return false;
        } //-----------------------------------------------------------------
        // MutableReferenceGraph


        addReference(u, v) {
          // update in/out edge list
          this._vertices[u]._children.push(new OutE(v));

          this._vertices[v]._parents.push(new OutE(u));

          return new ED(u, v);
        }

        removeReference(e) {
          const u = e.source;
          const v = e.target;
          const source = this._vertices[u];

          for (let i = 0; i !== source._children.length;) {
            if (source._children[i].target === v) {
              source._children.splice(i, 1);

              break; // remove one edge
            } else {
              ++i;
            }
          }

          const target = this._vertices[v];

          for (let i = 0; i !== target._parents.length;) {
            if (target._parents[i].target === u) {
              target._parents.splice(i, 1);

              break; // remove one edge
            } else {
              ++i;
            }
          }
        }

        removeReferences(u, v) {
          const source = this._vertices[u]; // remove out edges of u

          for (let i = 0; i !== source._children.length;) {
            // remove all edges
            if (source._children[i].target === v) {
              source._children.splice(i, 1);
            } else {
              ++i;
            }
          } // remove in edges of v


          const target = this._vertices[v];

          for (let i = 0; i !== target._parents.length;) {
            // remove all edges
            if (target._parents[i].target === u) {
              target._parents.splice(i, 1);
            } else {
              ++i;
            }
          }
        }

      });
    }
  };
});