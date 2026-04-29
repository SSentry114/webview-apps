System.register("q-bundled:///fs/cocos/rendering/custom/compiler.js", ["../../core/index.js", "./effect.js", "./graph.js", "./types.js"], function (_export, _context) {
  "use strict";

  var assert, VectorGraphColorMap, DefaultVisitor, depthFirstSearch, ReferenceGraphView, AccessType, ResourceResidency, PassVisitor, PassManagerVisitor, ResourceVisitor, CompilerContext, Compiler, ResourceManagerVisitor;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export({
    Compiler: void 0,
    ResourceManagerVisitor: void 0
  });

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
      PassVisitor = class PassVisitor {
        // output resourcetexture id
        constructor(context) {
          this.queueID = 0xFFFFFFFF;
          this.sceneID = 0xFFFFFFFF;
          this.passID = 0xFFFFFFFF;
          this.resID = 0xFFFFFFFF;
          this.context = void 0;
          this._currPass = null;
          this.context = context;
        }

        _isRasterPass(u) {
          return !!this.context.renderGraph.tryGetRasterPass(u);
        }

        _isQueue(u) {
          return !!this.context.renderGraph.tryGetQueue(u);
        }

        _isScene(u) {
          return !!this.context.renderGraph.tryGetScene(u);
        }

        _isBlit(u) {
          return !!this.context.renderGraph.tryGetBlit(u);
        }

        _fetchValidPass() {
          const rg = this.context.renderGraph;

          if (rg.getValid(this.sceneID)) {
            return;
          }

          const outputId = this.resID;
          const outputName = this.context.resourceGraph.vertexName(outputId);
          const readViews = new Map();
          const pass = this._currPass;

          for (const [readName, raster] of pass.rasterViews) {
            // find the pass
            if (readName === outputName && raster.accessType !== AccessType.READ) {
              assert(!rg.getValid(this.sceneID), 'The same pass cannot output multiple resources with the same name at the same time');
              rg.setValid(this.passID, true);
              rg.setValid(this.queueID, true);
              rg.setValid(this.sceneID, true);
              continue;
            }

            if (raster.accessType !== AccessType.WRITE) {
              readViews.set(readName, raster);
            }
          }

          if (rg.getValid(this.sceneID)) {
            let resVisitor;
            let resourceGraph;
            let vertID;

            for (const [rasterName, raster] of readViews) {
              resVisitor = new ResourceVisitor(this.context);
              resourceGraph = this.context.resourceGraph;
              vertID = resourceGraph.find(rasterName);

              if (vertID !== 0xFFFFFFFF) {
                resVisitor.resID = vertID;
                resourceGraph.visitVertex(resVisitor, vertID);
              }
            }

            for (const [computeName, cViews] of pass.computeViews) {
              resVisitor = new ResourceVisitor(this.context);
              resourceGraph = this.context.resourceGraph;
              vertID = resourceGraph.find(computeName);

              if (vertID !== 0xFFFFFFFF) {
                resVisitor.resID = vertID;
                resourceGraph.visitVertex(resVisitor, vertID);
              }
            }
          }
        }

        applyID(id, resId) {
          this.resID = resId;

          if (this._isRasterPass(id)) {
            this.passID = id;
          } else if (this._isQueue(id)) {
            this.queueID = id;
          } else if (this._isScene(id) || this._isBlit(id)) {
            this.sceneID = id;
          }
        }

        rasterPass(pass) {
          // const rg = this.context.renderGraph;
          // Since the pass is valid, there is no need to continue traversing.
          // if (rg.getValid(this.passID)) {
          //     return;
          // }
          this._currPass = pass;
        }

        rasterSubpass(value) {}

        computeSubpass(value) {}

        compute(value) {}

        copy(value) {}

        move(value) {}

        raytrace(value) {}

        queue(value) {}

        scene(value) {
          this._fetchValidPass();
        }

        blit(value) {
          this._fetchValidPass();
        }

        dispatch(value) {}

        clear(value) {}

        viewport(value) {}

      };
      PassManagerVisitor = class PassManagerVisitor extends DefaultVisitor {
        constructor(context, resId) {
          super();
          this._colorMap = void 0;
          this._graphView = void 0;
          this._passVisitor = void 0;
          this.resId = 0xFFFFFFFF;
          this.resId = resId;
          this._passVisitor = new PassVisitor(context);
          this._graphView = new ReferenceGraphView(context.renderGraph);
          this._colorMap = new VectorGraphColorMap(context.renderGraph.numVertices());
        }

        get graphView() {
          return this._graphView;
        }

        get colorMap() {
          return this._colorMap;
        }

        discoverVertex(u, gv) {
          const g = gv.g;

          this._passVisitor.applyID(u, this.resId);

          g.visitVertex(this._passVisitor, u);
        }

      };
      ResourceVisitor = class ResourceVisitor {
        constructor(context) {
          this._context = void 0;
          this.resID = 0xFFFFFFFF;
          this._context = context;
        }

        managedBuffer(value) {// noop
        }

        managedTexture(value) {// noop
        }

        managed(value) {
          this.dependency();
        }

        persistentBuffer(value) {}

        dependency() {
          const visitor = new PassManagerVisitor(this._context, this.resID);
          depthFirstSearch(visitor.graphView, visitor, visitor.colorMap);
        }

        persistentTexture(value) {
          this.dependency();
        }

        framebuffer(value) {
          this.dependency();
        }

        swapchain(value) {
          this.dependency();
        }

      };
      CompilerContext = class CompilerContext {
        constructor(pipeline, resGraph, renderGraph, layoutGraph) {
          this.resourceGraph = void 0;
          this.pipeline = void 0;
          this.renderGraph = void 0;
          this.layoutGraph = void 0;
          this.pipeline = pipeline;
          this.resourceGraph = resGraph;
          this.renderGraph = renderGraph;
          this.layoutGraph = layoutGraph;
        }

      };

      _export("Compiler", Compiler = class Compiler {
        constructor(pipeline, resGraph, layoutGraph) {
          this._resourceGraph = void 0;
          this._pipeline = void 0;
          this._layoutGraph = void 0;
          this._pipeline = pipeline;
          this._resourceGraph = resGraph;
          this._layoutGraph = layoutGraph;
        }

        compile(rg) {
          const context = new CompilerContext(this._pipeline, this._resourceGraph, rg, this._layoutGraph);
          const visitor = new ResourceManagerVisitor(context);
          depthFirstSearch(this._resourceGraph, visitor, visitor.colorMap);
        }

      });

      _export("ResourceManagerVisitor", ResourceManagerVisitor = class ResourceManagerVisitor extends DefaultVisitor {
        constructor(context) {
          super();
          this._colorMap = void 0;
          this._resourceGraph = void 0;
          this._resVisitor = void 0;
          this._colorMap = new VectorGraphColorMap(context.resourceGraph.numVertices());
          this._resourceGraph = context.resourceGraph;
          this._resVisitor = new ResourceVisitor(context);
        }

        get colorMap() {
          return this._colorMap;
        }

        discoverVertex(u, gv) {
          const traits = this._resourceGraph.getTraits(u);

          if (traits.residency === ResourceResidency.MANAGED || traits.residency === ResourceResidency.MEMORYLESS) {
            return;
          }

          this._resVisitor.resID = u;

          this._resourceGraph.visitVertex(this._resVisitor, u);
        }

      });
    }
  };
});