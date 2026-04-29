System.register("q-bundled:///fs/cocos/gfx/webgpu/webgpu-define.js", ["../../../../virtual/internal%253Aconstants.js", "../../webgpu/instantiated.js", "./override.js", "../base/define.js", "../../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var WEBGPU, gfx, webgpuAdapter, glslalgWasmModule, promiseForWebGPUInstantiation, CommandBuffer, Device, Buffer, ShaderStageFlagBit, BufferUsageBit, ccwindow;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      WEBGPU = _virtualInternal253AconstantsJs.WEBGPU;
    }, function (_webgpuInstantiatedJs) {
      gfx = _webgpuInstantiatedJs.gfx;
      webgpuAdapter = _webgpuInstantiatedJs.webgpuAdapter;
      glslalgWasmModule = _webgpuInstantiatedJs.glslalgWasmModule;
      promiseForWebGPUInstantiation = _webgpuInstantiatedJs.promiseForWebGPUInstantiation;
    }, function (_overrideJs) {
      CommandBuffer = _overrideJs.CommandBuffer;
      Device = _overrideJs.Device;
      Buffer = _overrideJs.Buffer;
    }, function (_baseDefineJs) {
      ShaderStageFlagBit = _baseDefineJs.ShaderStageFlagBit;
      BufferUsageBit = _baseDefineJs.BufferUsageBit;
    }, function (_coreGlobalExportsJs) {
      ccwindow = _coreGlobalExportsJs.ccwindow;
    }],
    execute: function () {
      WEBGPU && promiseForWebGPUInstantiation.then(function () {
        var originDeviceInitializeFunc = Device.prototype.initialize;

        Device.prototype.initialize = function (info) {
          var adapter = webgpuAdapter.adapter;
          var device = webgpuAdapter.device;
          gfx.preinitializedWebGPUDevice = device;
          device.lost.then(function (info) {
            console.error('Device was lost.', info);
            throw new Error('Something bad happened');
          });
          console.log(adapter);
          originDeviceInitializeFunc.call(this, info);
          return true;
        };

        Device.prototype.flushCommands = function () {};

        var oldCreateTexture = Device.prototype.createTexture;

        Device.prototype.createTexture = function (info) {
          if ('texture' in info) {
            return this.createTextureView(info);
          } else {
            return oldCreateTexture.call(this, info);
          }
        };

        var oldCreateBuffer = Device.prototype.createBuffer;

        Device.prototype.createBuffer = function (info) {
          if ('buffer' in info) {
            return this.createBufferView(info);
          } else {
            return oldCreateBuffer.call(this, info);
          }
        };

        var oldDraw = CommandBuffer.prototype.draw;

        CommandBuffer.prototype.draw = function (info) {
          if ('attributesHash' in info) {
            return this.draw(info.drawInfo);
          } else {
            return this.drawByInfo(info);
          }
        };

        var oldUpdateBuffer = Buffer.prototype.update;

        Buffer.prototype.update = function (data, size) {
          if (this.usage & BufferUsageBit.INDIRECT) {
            this.updateIndirect(data.drawInfos);
          } else {
            var updateSize = size === undefined ? data.byteLength : size;

            if ('buffer' in data) {
              oldUpdateBuffer.call(this, new Uint8Array(data.buffer, data.byteOffset, data.byteLength), updateSize);
            } else {
              oldUpdateBuffer.call(this, new Uint8Array(data), updateSize);
            }
          }
        };

        var oldCmdUpdateBuffer = CommandBuffer.prototype.updateBuffer;

        CommandBuffer.prototype.updateBuffer = function (buffer, data, size) {
          if (this.usage & BufferUsageBit.INDIRECT) {
            this.updateIndirect(buffer, data.drawInfos);
          } else {
            var updateSize = size === undefined ? data.byteLength : size;

            if ('buffer' in data) {
              oldCmdUpdateBuffer.call(this, buffer, new Uint8Array(data.buffer, data.byteOffset, data.byteLength), updateSize);
            } else {
              oldCmdUpdateBuffer.call(this, buffer, new Uint8Array(data), updateSize);
            }
          }
        };

        var oldBindDescriptorSet = CommandBuffer.prototype.bindDescriptorSet;

        CommandBuffer.prototype.bindDescriptorSet = function (set, descriptorSet, dynamicOffsets) {
          if (dynamicOffsets === undefined) {
            oldBindDescriptorSet.call(this, set, descriptorSet, []);
          } else if ('buffer' in dynamicOffsets) {
            oldBindDescriptorSet.call(this, set, descriptorSet, new Uint32Array(dynamicOffsets.buffer, dynamicOffsets.byteOffset, dynamicOffsets.byteLength));
          } else {
            oldBindDescriptorSet.call(this, set, descriptorSet, new Uint32Array(dynamicOffsets));
          }
        };

        var oldCmdCopyBuffersToTexture = CommandBuffer.prototype.copyBuffersToTexture;

        CommandBuffer.prototype.copyBuffersToTexture = function (buffers, texture, regions) {
          var ucharBuffers = [];

          for (var i = 0; i < buffers.length; ++i) {
            var buffer = buffers[i];

            if ('buffer' in buffer) {
              ucharBuffers.push(new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength));
            } else {
              ucharBuffers.push(new Uint8Array(buffer));
            }
          }

          oldCmdCopyBuffersToTexture.call(this, ucharBuffers, texture, regions);
        };

        var oldDeviceCopyBuffersToTexture = Device.prototype.copyBuffersToTexture;

        Device.prototype.copyBuffersToTexture = function (buffers, texture, regions) {
          var ucharBuffers = [];

          for (var i = 0; i < buffers.length; ++i) {
            var buffer = buffers[i];

            if ('buffer' in buffer) {
              ucharBuffers.push(new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength));
            } else {
              ucharBuffers.push(new Uint8Array(buffer));
            }
          }

          oldDeviceCopyBuffersToTexture.call(this, ucharBuffers, texture, regions);
        };

        Device.prototype.copyTexImagesToTexture = function (texImages, texture, regions) {
          var buffers = [];

          for (var i = 0; i < regions.length; i++) {
            if ('getContext' in texImages[i]) {
              var _canvasElem$getContex;

              var canvasElem = texImages[i];
              var imageData = (_canvasElem$getContex = canvasElem.getContext('2d')) === null || _canvasElem$getContex === void 0 ? void 0 : _canvasElem$getContex.getImageData(0, 0, texImages[i].width, texImages[i].height);
              var buff = imageData.data.buffer;
              var data = void 0;
              var rawBuffer = void 0;

              if ('buffer' in buff) {
                // es-lint as any
                data = new Uint8Array(buff.buffer, buff.byteOffset, buff.byteLength);
              } else {
                rawBuffer = buff;
                data = new Uint8Array(rawBuffer);
              }

              buffers[i] = data;
            } else if (texImages[i] instanceof HTMLImageElement || texImages[i] instanceof ImageBitmap) {
              var img = texImages[i];
              var canvas = ccwindow.document.createElement('canvas');
              canvas.width = img.width;
              canvas.height = img.height;
              var ctx = canvas.getContext('2d');
              ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(img, 0, 0);

              var _imageData = ctx === null || ctx === void 0 ? void 0 : ctx.getImageData(0, 0, img.width, img.height);

              var _buff = _imageData.data.buffer;

              var _data = void 0;

              var _rawBuffer = void 0;

              if ('buffer' in _buff) {
                // es-lint as any
                _data = new Uint8Array(_buff.buffer, _buff.byteOffset, _buff.byteLength);
              } else {
                _rawBuffer = _buff;
                _data = new Uint8Array(_rawBuffer);
              }

              buffers[i] = _data;
            } else {
              console.log('imageBmp copy not impled!');
            }
          }

          oldDeviceCopyBuffersToTexture.call(this, buffers, texture, regions);
        };

        function seperateCombinedSamplerTexture(shaderSource) {
          // sampler and texture
          var samplerTexturArr = shaderSource.match(/(.*?)\(set = \d+, binding = \d+\) uniform(.*?)sampler\w* \w+;/g);
          var count = samplerTexturArr !== null && samplerTexturArr !== void 0 && samplerTexturArr.length ? samplerTexturArr === null || samplerTexturArr === void 0 ? void 0 : samplerTexturArr.length : 0;
          var code = shaderSource;
          var referredFuncMap = new Map();
          var samplerSet = new Set();
          samplerTexturArr === null || samplerTexturArr === void 0 ? void 0 : samplerTexturArr.every(function (str) {
            // `(?<=)` not compatible with str.match on safari.
            // let textureName = str.match(/(?<=uniform(.*?)sampler\w* )(\w+)(?=;)/g)!.toString();
            var textureNameRegExpStr = '(?<=uniform(.*?)sampler\\w* )(\\w+)(?=;)';
            var textureName = new RegExp(textureNameRegExpStr, 'g').exec(str)[0];
            var samplerStr = str.replace(textureName, textureName + "Sampler"); // let samplerFunc = samplerStr.match(/(?<=uniform(.*?))sampler(\w*)/g)!.toString();

            var samplerRegExpStr = '(?<=uniform(.*?))sampler(\\w*)';
            var samplerFunc = new RegExp(samplerRegExpStr, 'g').exec(str)[0];
            samplerFunc = samplerFunc.replace('sampler', '');

            if (samplerFunc === '') {
              textureName = textureName.replace('Sampler', '');
            } else {
              var samplerReplaceReg = new RegExp('(?<=uniform(.*?))(sampler\\w*)', 'g');
              samplerStr = samplerStr.replace(samplerReplaceReg, 'sampler'); // layout (set = a, binding = b) uniform sampler2D cctex;
              // to:
              // layout (set = a, binding = b) uniform sampler cctexSampler;
              // layout (set = a, binding = b + maxTextureNum) uniform texture2D cctex;

              var samplerReg = new RegExp('(?<=binding = )(\\d+)(?=\\))', 'g');
              var samplerBindingStr = samplerReg.exec(str)[0];
              var samplerBinding = Number(samplerBindingStr) + 16;
              samplerStr = samplerStr.replace(samplerReg, samplerBinding.toString());
              var textureReg = new RegExp('(?<=uniform(.*?))(sampler)(?=\\w*)', 'g');
              var textureStr = str.replace(textureReg, 'texture');
              code = code.replace(str, textureStr + "\n" + samplerStr);
            }

            if (!samplerSet.has(textureName + "Sampler")) {
              samplerSet.add(textureName + "Sampler"); // gathering referred func

              var referredFuncStr = "([\\w]+)[\\s]*\\([0-9a-zA-Z_\\s,]*?sampler" + samplerFunc + "[^\\)]+\\)[\\s]*{";

              if (samplerFunc === '') {
                referredFuncStr = "([\\w]+)[\\s]*\\([0-9a-zA-Z_\\s,]*?sampler([\\S]+)[^\\)]+\\)[\\s]*{";
              }

              var referredFuncRe = new RegExp(referredFuncStr, 'g');

              var _reArr = referredFuncRe.exec(code);

              while (_reArr) {
                // first to see if it's wrapped by #if 0 \n ... \n #ndif
                var smpFunc = samplerFunc;

                if (smpFunc === '') {
                  smpFunc = _reArr[2];
                }

                var searchTarget = code.slice(0, _reArr.index);
                var defValQueue = [];
                var searchIndex = 1;

                while (searchIndex > 0) {
                  var ifIndex = searchTarget.indexOf('#if', searchIndex);
                  var elseIndex = searchTarget.indexOf('#else', searchIndex);
                  var endIndex = searchTarget.indexOf('#endif', searchIndex);

                  if (ifIndex === -1 && elseIndex === -1 && endIndex === -1) {
                    break;
                  }

                  if (ifIndex === -1) ifIndex = Number.MAX_SAFE_INTEGER;
                  if (elseIndex === -1) elseIndex = Number.MAX_SAFE_INTEGER;
                  if (endIndex === -1) endIndex = Number.MAX_SAFE_INTEGER; // next start with '#' is #if(def)

                  if (ifIndex < elseIndex && ifIndex < endIndex) {
                    var ifdef = new RegExp("#if(def)?[\\s]+(!)?([\\S]+)([\\s+]?(==)?(!=)[\\s+]?([\\S]+))?", 'gm').exec(searchTarget.slice(ifIndex));
                    defValQueue[defValQueue.length] = {
                      str: ifdef[3],
                      b: true,
                      condition: ifdef
                    };
                    searchIndex = ifIndex + 1;
                    continue;
                  }

                  if (elseIndex < endIndex && elseIndex < ifIndex) {
                    defValQueue[defValQueue.length - 1].b = false;
                    searchIndex = elseIndex + 1;
                    continue;
                  }

                  if (endIndex < elseIndex && endIndex < ifIndex) {
                    defValQueue.pop();
                    searchIndex = endIndex + 1;
                    continue;
                  }
                }

                var defCheck = true;

                for (var i = 0; i < defValQueue.length; i++) {
                  var _ifdef = defValQueue[i].condition;
                  var evalRes = false;

                  if (_ifdef[1]) {
                    evalRes = !!new RegExp("#define[\\s]+" + _ifdef[3], 'gm').exec(searchTarget);
                  } else {
                    var defVal = new RegExp("#define[\\s]+" + _ifdef[3] + "[\\s]+([\\S]+).*", 'gm').exec(searchTarget)[1];

                    if (_ifdef[4]) {
                      var conditionVal = _ifdef[7];
                      evalRes = _ifdef[5] ? defVal === conditionVal : defVal !== conditionVal;
                    } else if (_ifdef[3]) {
                      evalRes = defVal !== '0' && !_ifdef[2];
                    }
                  }

                  if (defValQueue[i].b !== evalRes) {
                    defCheck = false;
                    break;
                  }
                }

                var key = _reArr[1] + "_" + smpFunc + "_" + textureName + "Sampler";

                if (!referredFuncMap.has(key) && defCheck) {
                  referredFuncMap.set(key, [_reArr[1], smpFunc, textureName + "Sampler"]);
                }

                _reArr = referredFuncRe.exec(code);
              }
            } // cctex in main() called directly
            // .*?texture\(


            var regStr = "texture\\(\\b(" + textureName + ")\\b";
            var re = new RegExp(regStr);
            var reArr = re.exec(code);

            while (reArr) {
              code = code.replace(re, "texture(sampler" + samplerFunc + "(" + textureName + "," + textureName + "Sampler)");
              reArr = re.exec(code);
            }

            return true;
          });
          var functionTemplates = new Map();
          var functionDeps = new Map();
          var forwardDecls = ''; // function

          referredFuncMap.forEach(function (pair) {
            //pre: if existed, replace
            //getVec3DisplacementFromTexture\(cc_TangentDisplacements[^\\n]+
            var textureStr = pair[2].slice(0, -7);
            var codePieceStr = pair[0] + "\\((.*?)" + textureStr + "[^\\n]+";
            var codePieceRe = new RegExp(codePieceStr);
            var res = codePieceRe.exec(code);

            while (res) {
              var replaceStr = res[0].replace(pair[0] + "(", pair[0] + "_" + pair[1] + "_" + pair[2] + "_specialized(");
              replaceStr = replaceStr.replace(textureStr + ",", '');
              code = code.replace(codePieceRe, replaceStr);
              res = codePieceRe.exec(code);
            } // 1. fn definition


            var fnDeclReStr = "[\\n|\\W][\\w]+[\\W]+" + pair[0] + "[\\s]*\\((.*?)sampler" + pair[1] + "[^{]+";
            var fnDeclRe = new RegExp(fnDeclReStr);
            var fnDecl = fnDeclRe.exec(code);
            var redefFunc = '';

            if (!functionTemplates.has(pair[0] + "_" + pair[1])) {
              var funcBodyStart = code.slice(fnDecl.index);

              var funcRedefine = function funcRedefine(funcStr) {
                var samplerType = "sampler" + pair[1];
                var textureRe = new RegExp(".*?" + samplerType + "[\\s]+([\\S]+)[,\\)]").exec(funcStr);
                var textureName = textureRe[1];
                var paramReStr = samplerType + "[\\s]+" + textureName;
                var funcDef = funcStr.replace(new RegExp(paramReStr), "texture" + pair[1] + " " + textureName);
                funcDef = funcDef.replace(pair[0], pair[0] + "SAMPLER_SPEC"); // 2. texture(...) inside, builtin funcs

                var textureOpArr = ['texture', 'textureSize', 'texelFetch', 'textureLod'];

                for (var i = 0; i < textureOpArr.length; i++) {
                  var texFuncReStr = "(" + textureOpArr[i] + ")\\(" + textureName + ",";
                  var texFuncRe = new RegExp(texFuncReStr, 'g');
                  funcDef = funcDef.replace(texFuncRe, "$1(" + samplerType + "(" + textureName + "TEXTURE_HOLDER, " + textureName + "SAMPLER_HOLDER),");
                }

                return funcDef;
              };

              var firstIfStatement = funcBodyStart.indexOf('#if');
              var firstElseStatement = funcBodyStart.indexOf('#e'); //#endif, #else, #elif maybe?

              if (firstElseStatement !== -1 && firstIfStatement > firstElseStatement || firstElseStatement === -1 && firstElseStatement !== -1) {
                // ooops, now func body starts in a #if statement.
                var startIndex = 0;
                var _count = 1; // already in #if

                while (_count > 0 && startIndex < funcBodyStart.length) {
                  var nextSymbolIdx = funcBodyStart.indexOf('#', startIndex);
                  var startSliceIdx = startIndex === 0 ? startIndex : startIndex - 1;

                  if (funcBodyStart[nextSymbolIdx + 1] === 'i') {
                    // #if
                    _count++;
                    redefFunc += funcBodyStart.slice(startSliceIdx, nextSymbolIdx);
                  } else if (funcBodyStart[nextSymbolIdx + 1] === 'e' && funcBodyStart[nextSymbolIdx + 2] === 'l') {
                    //#elif, #else
                    if (_count === 1) {
                      var tempFuncStr = funcBodyStart.slice(startSliceIdx, nextSymbolIdx - 1);
                      var funcDefStr = funcRedefine(tempFuncStr);
                      redefFunc += "\n" + funcDefStr;
                    } else {
                      redefFunc += "\n" + funcBodyStart.slice(startSliceIdx, nextSymbolIdx);
                    }
                  } else if (funcBodyStart[nextSymbolIdx + 1] === 'e' && funcBodyStart[nextSymbolIdx + 2] === 'n') {
                    //#endif
                    _count--;

                    if (_count === 0) {
                      var _tempFuncStr = funcBodyStart.slice(startSliceIdx, nextSymbolIdx - 1);

                      var _funcDefStr = funcRedefine(_tempFuncStr);

                      redefFunc += "\n" + _funcDefStr;
                    } else {
                      redefFunc += "\n" + funcBodyStart.slice(startSliceIdx, nextSymbolIdx);
                    }
                  } else {
                    // #define, dont care
                    redefFunc += funcBodyStart.slice(startSliceIdx, nextSymbolIdx);
                  }

                  startIndex = nextSymbolIdx + 1;
                } //`(?:.(?!layout))+${pair[2]};`


                var searchTarget = code.slice(0, fnDecl.index);

                var _res = new RegExp("#if.+[\\s]*$").exec(searchTarget);

                redefFunc = "" + _res[0] + redefFunc + "\n#endif";
              } else {
                var _count2 = 0;
                var matchBegin = false;
                var _startIndex = 0;
                var endIndex = 0;

                for (var i = 0; i < funcBodyStart.length; ++i) {
                  if (funcBodyStart[i] === '{') {
                    ++_count2;

                    if (!matchBegin) {
                      matchBegin = true;
                      _startIndex = i;
                    }
                  } else if (funcBodyStart[i] === '}') {
                    --_count2;
                  }

                  if (matchBegin && _count2 === 0) {
                    endIndex = i;
                    break;
                  }
                }

                var rawFunc = "" + fnDecl[0] + funcBodyStart.slice(_startIndex, endIndex + 1);
                redefFunc = funcRedefine(rawFunc);
              }

              functionTemplates.set(pair[0] + "_" + pair[1], redefFunc);
            } else {
              redefFunc = functionTemplates.get(pair[0] + "_" + pair[1]);
            }

            var depsFuncs = [];
            var iterator = referredFuncMap.values();
            var val = iterator.next().value;

            while (val) {
              var funcDepReStr = "\\b(" + val[0] + ")\\b";

              if (redefFunc.search(funcDepReStr) !== -1) {
                depsFuncs[depsFuncs.length] = val[0];
              }

              val = iterator.next().value;
            } // for (let i = 0; i < referredFuncMap.values.length; ++i) {
            //     const funcDepReStr = `\\b(${referredFuncMap.values[i].fnName as string})\\b`;
            //     if (redefFunc.search(funcDepReStr) !== -1) {
            //         depsFuncs[depsFuncs.length] = referredFuncMap.values[i].fnName;
            //     }
            // }


            functionDeps.set(pair[0] + "_" + pair[1], depsFuncs);
            var specializedFuncs = new Map();

            var specialize = function specialize(funcs) {
              funcs.every(function (str) {
                if (!specializedFuncs.has(pair[0] + "_" + pair[2] + "_specialized")) {
                  var samplerReStr = "(\\w+)SAMPLER_HOLDER";
                  var textureName = pair[2].slice(0, pair[2].length - 7); // xxxxSampler

                  var _textureStr = "(\\w+)TEXTURE_HOLDER";
                  var funcTemplate = functionTemplates.get(str);
                  funcTemplate = funcTemplate.replace(new RegExp(samplerReStr, 'g'), pair[2]);
                  funcTemplate = funcTemplate.replace(new RegExp(_textureStr, 'g'), textureName);
                  funcTemplate = funcTemplate.replace(new RegExp('SAMPLER_SPEC', 'g'), "_" + pair[1] + "_" + pair[2] + "_specialized");
                  funcTemplate = funcTemplate.replace(new RegExp("texture" + pair[1] + "\\s+\\w+,", 'g'), ''); // funcTemplate = funcTemplate.replace('SAMPLER_SPEC', `_${pair[2]}_specialized`);

                  for (var _i = 0; _i < depsFuncs.length; ++_i) {
                    var depFuncStr = depsFuncs[_i] + "([\\W]?)*\\([^,)]+(,)?";
                    funcTemplate = funcTemplate.replace(new RegExp(depFuncStr, 'g'), depsFuncs[_i] + "_" + pair[1] + "_" + pair[2] + "_specialized(");
                  }

                  var declStr = fnDecl[0].replace(pair[0], str + "_" + pair[2] + "_specialized");
                  declStr = declStr.replace(new RegExp("sampler" + pair[1] + "[^,)]+(,)?", 'g'), "");
                  declStr += ";";
                  specializedFuncs.set(declStr, funcTemplate);
                } else {
                  return specialize(functionDeps.get(str));
                }

                return true;
              });
              return true;
            };

            specialize([pair[0] + "_" + pair[1]]); //(?:.(?!layout))+cc_PositionDisplacementsSampler;

            var samplerDefReStr = "(?:.(?!layout))+" + pair[2] + ";";
            var samplerDef = new RegExp(samplerDefReStr).exec(code);
            var funcImpls = '';

            for (var _iterator = _createForOfIteratorHelperLoose(specializedFuncs), _step; !(_step = _iterator()).done;) {
              var _step$value = _step.value,
                  key = _step$value[0],
                  value = _step$value[1];
              forwardDecls += "\n" + key + "\n";
              funcImpls += "\n" + value + "\n";
            }

            code = code.replace(samplerDef[0], samplerDef[0] + "\n" + funcImpls);
          }); // some function appears before it's defined so forward declaration is needed

          forwardDecls += '\nvec3 SRGBToLinear (vec3 gamma);\nfloat getDisplacementWeight(int index);\n';
          var highpIdx = code.indexOf('precision highp');
          var mediumpIdx = code.indexOf('precision mediump');
          var lowpIdx = code.indexOf('precision lowp'); ///////////////////////////////////////////////////////////
          // isNan, isInf has been removed in dawn:tint

          var functionDefs = '';
          var precisionKeyWord = 'highp'; // const getPrecision = (idx: number) => {
          //     if (highpIdx !== -1 && highpIdx < idx) {
          //         precisionKeyWord = 'highp';
          //     } else if (mediumpIdx !== -1 && mediumpIdx < idx && highpIdx < mediumpIdx) {
          //         precisionKeyWord = 'mediump';
          //     } else if (lowpIdx !== -1 && lowpIdx < idx && mediumpIdx < lowpIdx && highpIdx < lowpIdx) {
          //         precisionKeyWord = 'lowp';
          //     }
          // };

          var isNanIndex = code.indexOf('isnan');

          if (isNanIndex !== -1) {
            // getPrecision(isNanIndex);
            functionDefs += "\n\n             bool isNan(" + precisionKeyWord + " float val) {\n                 return (val < 0.0 || 0.0 < val || val == 0.0) ? false : true;\n             }\n             \n";
            code = code.replace(/isnan\(/gi, 'isNan(');
          }

          var isInfIndex = code.indexOf('isinf');

          if (isInfIndex !== -1) {
            // getPrecision(isInfIndex);
            functionDefs += "\n\n             bool isInf(" + precisionKeyWord + " float x) {\n                 return x == x * 2.0 && x != 0.0;\n             }\n             \n";
            code = code.replace(/isinf\(/gi, 'isInf(');
          } ///////////////////////////////////////////////////////////


          var firstPrecisionIdx = code.indexOf('precision');
          firstPrecisionIdx = code.indexOf(';', firstPrecisionIdx);
          firstPrecisionIdx += 1;
          code = code.slice(0, firstPrecisionIdx) + "\n" + forwardDecls + "\n" + functionDefs + "\n" + code.slice(firstPrecisionIdx);
          return code;
        }

        var createShader = Device.prototype.createShader;

        Device.prototype.createShader = function (shaderInfo) {
          var spvDatas = [];

          for (var i = 0; i < shaderInfo.stages.length; ++i) {
            shaderInfo.stages[i].source = seperateCombinedSamplerTexture(shaderInfo.stages[i].source);
            var stageStr = shaderInfo.stages[i].stage === ShaderStageFlagBit.VERTEX ? 'vertex' : shaderInfo.stages[i].stage === ShaderStageFlagBit.FRAGMENT ? 'fragment' : 'compute';
            var sourceCode = "#version 450\n" + shaderInfo.stages[i].source;
            var spv = glslalgWasmModule.glslang.compileGLSL(sourceCode, stageStr, true, '1.3');
            spvDatas.push(spv);
          }

          var shader = this.createShaderNative(shaderInfo, spvDatas);
          return shader;
        }; // if property being frequently get in TS, try cache it
        // attention: invalid if got this object from a native object,
        // eg. inputAssembler.indexBuffer.objectID


        function cacheReadOnlyWGPUProperties(type, props) {
          var descriptor = {
            writable: true
          };
          props.map(function (prop) {
            return Object.defineProperty(type['prototype'], "_" + prop, descriptor);
          }); // trick for emscripten object only, which contains a `name` indicates what type it is.

          var typename = type['name'].replace('CCWGPU', '');
          var oldCreate = Device.prototype["create" + typename];

          Device.prototype["create" + typename] = function (info) {
            var res = oldCreate.call(this, info);

            var _loop = function _loop() {
              var prop = _step2.value;
              res["_" + prop] = res["" + prop];
              Object.defineProperty(res, "" + prop, {
                get: function get() {
                  return this["_" + prop];
                }
              });
            };

            for (var _iterator2 = _createForOfIteratorHelperLoose(props), _step2; !(_step2 = _iterator2()).done;) {
              _loop();
            }

            return res;
          };

          var oldInit = type['prototype']['initialize'];

          type['prototype']['initialize'] = function (info) {
            oldInit.call(this, info);

            for (var _iterator3 = _createForOfIteratorHelperLoose(props), _step3; !(_step3 = _iterator3()).done;) {
              var prop = _step3.value;
              this["_" + prop] = this["" + prop];
            }
          };
        }

        ;
        cacheReadOnlyWGPUProperties(Buffer, ['objectID']);
      });
    }
  };
});