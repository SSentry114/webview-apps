System.register("q-bundled:///fs/cocos/rendering/custom/index.js", ["./web-pipeline.js", "../../core/platform/macro.js", "./builtin-pipelines.js", "./custom-pipeline.js", "./layout-graph.js", "./binary-archive.js", "./web-program-library.js", "./layout-graph-utils.js", "./types.js", "./pipeline.js", "./archive.js"], function (_export, _context) {
  "use strict";

  var WebPipeline, macro, DeferredPipelineBuilder, ForwardPipelineBuilder, CustomPipelineBuilder, NativePipelineBuilder, LayoutGraphData, loadLayoutGraphData, BinaryInputArchive, WebProgramLibrary, initializeLayoutGraphData, terminateLayoutGraphData, getCustomPassID, getCustomPhaseID, _pipeline, INVALID_ID, defaultLayoutGraph, enableEffectImport, programLib, customPipelineBuilderMap;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function createCustomPipeline() {
    var layoutGraph = defaultLayoutGraph;
    var ppl = new WebPipeline(layoutGraph);
    var pplName = macro.CUSTOM_PIPELINE_NAME;
    ppl.setCustomPipelineName(pplName);
    programLib.pipeline = ppl;
    _pipeline = ppl;
    return ppl;
  }

  function setCustomPipeline(name, builder) {
    customPipelineBuilderMap.set(name, builder);
  }

  function getCustomPipeline(name) {
    var builder = customPipelineBuilderMap.get(name) || null;

    if (builder === null) {
      builder = customPipelineBuilderMap.get('Forward');
    }

    return builder;
  }

  function addCustomBuiltinPipelines(map) {
    map.set('Forward', new ForwardPipelineBuilder());
    map.set('Deferred', new DeferredPipelineBuilder());
    map.set('Custom', new CustomPipelineBuilder());
    map.set('Native', new NativePipelineBuilder());
  }

  function init(device, arrayBuffer) {
    if (arrayBuffer) {
      var readBinaryData = new BinaryInputArchive(arrayBuffer);
      loadLayoutGraphData(readBinaryData, defaultLayoutGraph);
    }

    initializeLayoutGraphData(device, defaultLayoutGraph);
  }

  function destroy() {
    terminateLayoutGraphData(defaultLayoutGraph);
  }

  function getPassID(name) {
    return getCustomPassID(defaultLayoutGraph, name);
  }

  function getPhaseID(passID, name) {
    return getCustomPhaseID(defaultLayoutGraph, passID, name);
  }

  function completePhaseName(name) {
    if (typeof name === 'number') {
      return name.toString();
    } else if (typeof name === 'string') {
      return name;
    } else {
      return 'default';
    }
  }

  _export({
    createCustomPipeline: createCustomPipeline,
    setCustomPipeline: setCustomPipeline,
    getCustomPipeline: getCustomPipeline,
    init: init,
    destroy: destroy,
    getPassID: getPassID,
    getPhaseID: getPhaseID,
    completePhaseName: completePhaseName
  });

  return {
    setters: [function (_webPipelineJs) {
      WebPipeline = _webPipelineJs.WebPipeline;
    }, function (_corePlatformMacroJs) {
      macro = _corePlatformMacroJs.macro;
    }, function (_builtinPipelinesJs) {
      DeferredPipelineBuilder = _builtinPipelinesJs.DeferredPipelineBuilder;
      ForwardPipelineBuilder = _builtinPipelinesJs.ForwardPipelineBuilder;
    }, function (_customPipelineJs) {
      CustomPipelineBuilder = _customPipelineJs.CustomPipelineBuilder;
      NativePipelineBuilder = _customPipelineJs.NativePipelineBuilder;
    }, function (_layoutGraphJs) {
      LayoutGraphData = _layoutGraphJs.LayoutGraphData;
      loadLayoutGraphData = _layoutGraphJs.loadLayoutGraphData;
    }, function (_binaryArchiveJs) {
      BinaryInputArchive = _binaryArchiveJs.BinaryInputArchive;
    }, function (_webProgramLibraryJs) {
      WebProgramLibrary = _webProgramLibraryJs.WebProgramLibrary;
    }, function (_layoutGraphUtilsJs) {
      initializeLayoutGraphData = _layoutGraphUtilsJs.initializeLayoutGraphData;
      terminateLayoutGraphData = _layoutGraphUtilsJs.terminateLayoutGraphData;
      getCustomPassID = _layoutGraphUtilsJs.getCustomPassID;
      getCustomPhaseID = _layoutGraphUtilsJs.getCustomPhaseID;
    }, function (_typesJs) {
      var _exportObj = {};

      for (var _key in _typesJs) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _typesJs[_key];
      }

      _export(_exportObj);
    }, function (_pipelineJs) {
      var _exportObj2 = {};

      for (var _key2 in _pipelineJs) {
        if (_key2 !== "default" && _key2 !== "__esModule") _exportObj2[_key2] = _pipelineJs[_key2];
      }

      _export(_exportObj2);
    }, function (_archiveJs) {
      var _exportObj3 = {};

      for (var _key3 in _archiveJs) {
        if (_key3 !== "default" && _key3 !== "__esModule") _exportObj3[_key3] = _archiveJs[_key3];
      }

      _export(_exportObj3);
    }],
    execute: function () {
      _pipeline = null;

      _export("INVALID_ID", INVALID_ID = 0xFFFFFFFF);

      defaultLayoutGraph = new LayoutGraphData();

      _export("enableEffectImport", enableEffectImport = true);

      _export("programLib", programLib = new WebProgramLibrary(defaultLayoutGraph));

      _export("customPipelineBuilderMap", customPipelineBuilderMap = new Map());

      addCustomBuiltinPipelines(customPipelineBuilderMap);
    }
  };
});