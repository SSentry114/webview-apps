System.register("q-bundled:///fs/cocos/spine/assembler/simple.js", ["../lib/spine-core.js", "../../2d/renderer/vertex-format.js", "../skeleton.js", "../../core/index.js", "../../gfx/index.js", "../../core/global-exports.js", "../../2d/renderer/static-vb-accessor.js", "../../2d/renderer/render-data.js", "../../game/index.js"], function (_export, _context) {
  "use strict";

  var spine, getAttributeStride, vfmtPosUvColor4B, vfmtPosUvTwoColor4B, SpineMaterialType, Color, Vec3, BlendFactor, legacyCC, StaticVBAccessor, RenderData, director, _quadTriangles, _slotColor, _boneColor, _originColor, _meshColor, _finalColor, _darkColor, _tempPos, _tempUv, _premultipliedAlpha, _multiplier, _slotRangeStart, _slotRangeEnd, _useTint, _debugSlots, _debugBones, _debugMesh, _nodeR, _nodeG, _nodeB, _nodeA, _finalColor32, _darkColor32, _perVertexSize, _perClipVertexSize, _vertexFloatCount, _vertexCount, _vertexOffset, _vertexFloatOffset, _indexCount, _indexOffset, _actualVCount, _actualICount, _tempr, _tempg, _tempb, _inRange, _mustFlush, _tempVecPos, _r, _g, _b, _fr, _fg, _fb, _fa, _dr, _dg, _db, _da, _comp, _renderData, _ibuf, _vbuf, _vUintBuf, _needColor, _vertexEffect, _currentMaterial, _currentTexture, _accessor, _tintAccessor, simple;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _getSlotMaterial(blendMode) {
    var src;
    var dst;

    switch (blendMode) {
      case spine.BlendMode.Additive:
        src = _premultipliedAlpha ? BlendFactor.ONE : BlendFactor.SRC_ALPHA;
        dst = BlendFactor.ONE;
        break;

      case spine.BlendMode.Multiply:
        src = BlendFactor.DST_COLOR;
        dst = BlendFactor.ONE_MINUS_SRC_ALPHA;
        break;

      case spine.BlendMode.Screen:
        src = BlendFactor.ONE;
        dst = BlendFactor.ONE_MINUS_SRC_COLOR;
        break;

      case spine.BlendMode.Normal:
      default:
        src = _premultipliedAlpha ? BlendFactor.ONE : BlendFactor.SRC_ALPHA;
        dst = BlendFactor.ONE_MINUS_SRC_ALPHA;
        break;
    }

    return _comp.getMaterialForBlendAndTint(src, dst, _useTint ? SpineMaterialType.TWO_COLORED : SpineMaterialType.COLORED_TEXTURED);
  }

  function _handleColor(color) {
    // temp rgb has multiply 255, so need divide 255;
    _fa = color.fa * _nodeA;
    _multiplier = _premultipliedAlpha ? _fa / 255 : 1;
    _r = _nodeR * _multiplier;
    _g = _nodeG * _multiplier;
    _b = _nodeB * _multiplier;
    _fr = color.fr * _r;
    _fg = color.fg * _g;
    _fb = color.fb * _b;
    _finalColor32 = (_fa << 24 >>> 0) + (_fb << 16) + (_fg << 8) + _fr;
    _dr = color.dr * _r;
    _dg = color.dg * _g;
    _db = color.db * _b;
    _da = _premultipliedAlpha ? 255 : 0;
    _darkColor32 = (_da << 24 >>> 0) + (_db << 16) + (_dg << 8) + _dr;
  }

  function _spineColorToUint32(spineColor) {
    return (spineColor.a << 24 >>> 0) + (spineColor.b << 16) + (spineColor.g << 8) + spineColor.r;
  }

  function _spineRGBAToUint32(r, g, b, a) {
    return (a << 24 >>> 0) + (b << 16) + (g << 8) + r;
  }

  function _vfmtFloatSize(useTint) {
    var attributes = useTint ? vfmtPosUvTwoColor4B : vfmtPosUvColor4B;
    return getAttributeStride(attributes) >> 2;
  }

  function updateComponentRenderData(comp, batcher) {
    if (!comp._skeleton || comp.renderData === null) return;
    var nodeColor = comp.color;
    _nodeR = nodeColor.r / 255;
    _nodeG = nodeColor.g / 255;
    _nodeB = nodeColor.b / 255;
    _nodeA = comp.node._uiProps.opacity;
    _useTint = comp.useTint || comp.isAnimationCached(); // x y u v color1 color2 or x y u v color

    _perVertexSize = _vfmtFloatSize(_useTint); // Reuse draw list

    comp.drawList.reset();
    _comp = comp;
    _renderData = comp.renderData;
    _currentMaterial = null;
    _mustFlush = true;
    _premultipliedAlpha = comp.premultipliedAlpha;
    _multiplier = 1.0;
    _needColor = false;
    _vertexEffect = comp._effectDelegate && comp._effectDelegate._vertexEffect;

    if (nodeColor._val !== 0xffffffff || _premultipliedAlpha) {
      _needColor = true;
    }

    var nodeMat = null;

    if (comp.enableBatch) {
      nodeMat = comp.node.worldMatrix;
    }

    if (comp.isAnimationCached()) {
      // Traverse input assembler.
      cacheTraverse(nodeMat);
    } else {
      if (_vertexEffect) _vertexEffect.begin(comp._skeleton);
      realTimeTraverse(nodeMat);
      if (_vertexEffect) _vertexEffect.end();
    } // Ensure mesh buffer update


    var accessor = _useTint ? _tintAccessor : _accessor;
    accessor.getMeshBuffer(_renderData.chunk.bufferId).setDirty(); // Clear temp var.

    _comp = undefined;
    _vertexEffect = null;
  }

  function updateChunkForClip(clippedVertices, clippedTriangles) {
    var oldVertexCount = _vertexCount;
    var oldIndexCount = _indexCount;
    var rd = _renderData;
    _indexCount = clippedTriangles.length;
    _vertexCount = clippedVertices.length / _perClipVertexSize;
    _vertexFloatCount = _vertexCount * _perVertexSize; // Augment render data size, clipper could create more triangles than expected

    _actualVCount += _vertexCount - oldVertexCount;
    _actualICount += _indexCount - oldIndexCount;
    var oldIndices = _ibuf;
    var oldChunkOffset = rd.chunk.vertexOffset;
    var updateIBuf = false;

    if (_actualVCount > rd.vertexCount) {
      rd.resizeAndCopy(_actualVCount, _actualICount > rd.indexCount ? _actualICount : rd.indexCount);
      _vbuf = rd.chunk.vb;
      _vUintBuf = new Uint32Array(_vbuf.buffer, _vbuf.byteOffset, _vbuf.length);
      updateIBuf = true;
    }

    if (_actualICount > _ibuf.length) {
      _ibuf = rd.indices = new Uint16Array(_actualICount);
      updateIBuf = true;
    } // Vertex buffer chunk have been moved, so need to correct all indices


    if (updateIBuf) {
      var correction = rd.chunk.vertexOffset - oldChunkOffset;

      for (var i = 0; i < _indexOffset; ++i) {
        _ibuf[i] = oldIndices[i] + correction;
      }
    }
  }

  function fillVertices(skeletonColor, attachmentColor, slotColor, clipper, slot) {
    _finalColor.a = slotColor.a * attachmentColor.a * skeletonColor.a * _nodeA * 255;
    _multiplier = _premultipliedAlpha ? _finalColor.a : 255;
    _tempr = _nodeR * attachmentColor.r * skeletonColor.r * _multiplier;
    _tempg = _nodeG * attachmentColor.g * skeletonColor.g * _multiplier;
    _tempb = _nodeB * attachmentColor.b * skeletonColor.b * _multiplier;
    _finalColor.r = _tempr * slotColor.r;
    _finalColor.g = _tempg * slotColor.g;
    _finalColor.b = _tempb * slotColor.b;

    if (slot.darkColor == null) {
      _darkColor.set(0, 0, 0, 1);
    } else {
      _darkColor.r = slot.darkColor.r * _tempr;
      _darkColor.g = slot.darkColor.g * _tempg;
      _darkColor.b = slot.darkColor.b * _tempb;
    }

    _darkColor.a = _premultipliedAlpha ? 255 : 0;

    if (_useTint) {
      if (!clipper.isClipping()) {
        _finalColor32 = _spineColorToUint32(_finalColor);
        _darkColor32 = _spineColorToUint32(_darkColor);

        if (_vertexEffect) {
          for (var v = _vertexFloatOffset, n = _vertexFloatOffset + _vertexFloatCount; v < n; v += _perVertexSize) {
            _tempPos.x = _vbuf[v];
            _tempPos.y = _vbuf[v + 1];
            _tempUv.x = _vbuf[v + 3];
            _tempUv.y = _vbuf[v + 4];

            _vertexEffect.transform(_tempPos, _tempUv, _finalColor, _darkColor);

            _vbuf[v] = _tempPos.x; // x

            _vbuf[v + 1] = _tempPos.y; // y

            _vbuf[v + 3] = _tempUv.x; // u

            _vbuf[v + 4] = _tempUv.y; // v

            _vUintBuf[v + 5] = _finalColor32;
            _vUintBuf[v + 6] = _darkColor32;
          }
        } else {
          for (var _v = _vertexFloatOffset, _n = _vertexFloatOffset + _vertexFloatCount; _v < _n; _v += _perVertexSize) {
            _vUintBuf[_v + 5] = _finalColor32; // light color

            _vUintBuf[_v + 6] = _darkColor32; // dark color
          }
        }
      } else {
        _perClipVertexSize = _useTint ? 12 : 8; // const

        var vertices = _vbuf.subarray(_vertexFloatOffset);

        var uvs = _vbuf.subarray(_vertexFloatOffset + 3);

        clipper.clipTriangles(vertices, _vertexFloatCount, _ibuf.subarray(_indexOffset), _indexCount, uvs, _finalColor, _darkColor, _useTint, _perVertexSize);
        var clippedVertices = clipper.clippedVertices;
        var clippedTriangles = clipper.clippedTriangles; // Update vertex and index count, reallocate vertex buffer chunk if needed

        updateChunkForClip(clippedVertices, clippedTriangles); // fill indices

        if (clippedTriangles.length > 0) {
          _ibuf.set(clippedTriangles, _indexOffset);
        } // fill vertices contain x y u v light color dark color


        if (_vertexEffect) {
          for (var _v2 = 0, _n2 = clippedVertices.length, offset = _vertexFloatOffset; _v2 < _n2; _v2 += _perClipVertexSize, offset += _perVertexSize) {
            _tempPos.x = clippedVertices[_v2];
            _tempPos.y = clippedVertices[_v2 + 1];
            _tempUv.x = clippedVertices[_v2 + 6];
            _tempUv.y = clippedVertices[_v2 + 7];

            _vertexEffect.transform(_tempPos, _tempUv, _finalColor, _darkColor);

            _vbuf[offset] = _tempPos.x; // x

            _vbuf[offset + 1] = _tempPos.y; // y

            _vbuf[offset + 3] = _tempUv.x; // u

            _vbuf[offset + 4] = _tempUv.y; // v

            _vUintBuf[offset + 5] = _spineRGBAToUint32(clippedVertices[_v2 + 2], clippedVertices[_v2 + 3], clippedVertices[_v2 + 4], clippedVertices[_v2 + 5]);
            _vUintBuf[offset + 6] = _spineRGBAToUint32(clippedVertices[_v2 + 8], clippedVertices[_v2 + 9], clippedVertices[_v2 + 10], clippedVertices[_v2 + 11]);
          }
        } else {
          // x y r g b a u v (rr gg bb aa)
          for (var _v3 = 0, _n3 = clippedVertices.length, _offset = _vertexFloatOffset; _v3 < _n3; _v3 += _perClipVertexSize, _offset += _perVertexSize) {
            _vbuf[_offset] = clippedVertices[_v3]; // x

            _vbuf[_offset + 1] = clippedVertices[_v3 + 1]; // y

            _vbuf[_offset + 3] = clippedVertices[_v3 + 6]; // u

            _vbuf[_offset + 4] = clippedVertices[_v3 + 7]; // v

            _vUintBuf[_offset + 5] = _spineRGBAToUint32(clippedVertices[_v3 + 2], clippedVertices[_v3 + 3], clippedVertices[_v3 + 4], clippedVertices[_v3 + 5]);
            _vUintBuf[_offset + 6] = _spineRGBAToUint32(clippedVertices[_v3 + 8], clippedVertices[_v3 + 9], clippedVertices[_v3 + 10], clippedVertices[_v3 + 11]);
          }
        }
      }
    } else if (!clipper.isClipping()) {
      _finalColor32 = _spineColorToUint32(_finalColor);

      if (_vertexEffect) {
        for (var _v4 = _vertexFloatOffset, _n4 = _vertexFloatOffset + _vertexFloatCount; _v4 < _n4; _v4 += _perVertexSize) {
          _tempPos.x = _vbuf[_v4];
          _tempPos.y = _vbuf[_v4 + 1];
          _tempUv.x = _vbuf[_v4 + 3];
          _tempUv.y = _vbuf[_v4 + 4];

          _vertexEffect.transform(_tempPos, _tempUv, _finalColor, _darkColor);

          _vbuf[_v4] = _tempPos.x; // x

          _vbuf[_v4 + 1] = _tempPos.y; // y

          _vbuf[_v4 + 3] = _tempUv.x; // u

          _vbuf[_v4 + 4] = _tempUv.y; // v

          _vUintBuf[_v4 + 5] = _finalColor32;
        }
      } else {
        for (var _v5 = _vertexFloatOffset, _n5 = _vertexFloatOffset + _vertexFloatCount; _v5 < _n5; _v5 += _perVertexSize) {
          _vUintBuf[_v5 + 5] = _finalColor32;
        }
      }
    } else {
      _perClipVertexSize = _useTint ? 12 : 8; // const

      var _vertices = _vbuf.subarray(_vertexFloatOffset);

      var _uvs = _vbuf.subarray(_vertexFloatOffset + 3);

      clipper.clipTriangles(_vertices, _vertexFloatCount, _ibuf.subarray(_indexOffset), _indexCount, _uvs, _finalColor, _darkColor, _useTint, _perVertexSize);
      var _clippedVertices = clipper.clippedVertices;
      var _clippedTriangles = clipper.clippedTriangles; // Update vertex and index count, reallocate vertex buffer chunk if needed

      updateChunkForClip(_clippedVertices, _clippedTriangles); // fill indices

      if (_clippedTriangles.length > 0) {
        _ibuf.set(_clippedTriangles, _indexOffset);
      } // fill vertices contain x y u v light color dark color


      if (_vertexEffect) {
        for (var _v6 = 0, _n6 = _clippedVertices.length, _offset2 = _vertexFloatOffset; _v6 < _n6; _v6 += _perClipVertexSize, _offset2 += _perVertexSize) {
          _tempPos.x = _clippedVertices[_v6];
          _tempPos.y = _clippedVertices[_v6 + 1];
          _tempUv.x = _clippedVertices[_v6 + 6];
          _tempUv.y = _clippedVertices[_v6 + 7];

          _vertexEffect.transform(_tempPos, _tempUv, _finalColor, _darkColor);

          _vbuf[_offset2] = _tempPos.x; // x

          _vbuf[_offset2 + 1] = _tempPos.y; // y

          _vbuf[_offset2 + 3] = _tempUv.x; // u

          _vbuf[_offset2 + 4] = _tempUv.y; // v

          _vUintBuf[_offset2 + 5] = _spineRGBAToUint32(_clippedVertices[_v6 + 2], _clippedVertices[_v6 + 3], _clippedVertices[_v6 + 4], _clippedVertices[_v6 + 5]);
        }
      } else {
        // x y r g b a u v (rr gg bb aa)
        for (var _v7 = 0, _n7 = _clippedVertices.length, _offset3 = _vertexFloatOffset; _v7 < _n7; _v7 += _perClipVertexSize, _offset3 += _perVertexSize) {
          _vbuf[_offset3] = _clippedVertices[_v7]; // x

          _vbuf[_offset3 + 1] = _clippedVertices[_v7 + 1]; // y

          _vbuf[_offset3 + 3] = _clippedVertices[_v7 + 6]; // u

          _vbuf[_offset3 + 4] = _clippedVertices[_v7 + 7]; // v

          _vUintBuf[_offset3 + 5] = _spineRGBAToUint32(_clippedVertices[_v7 + 2], _clippedVertices[_v7 + 3], _clippedVertices[_v7 + 4], _clippedVertices[_v7 + 5]);
        }
      }
    }
  }

  function realTimeTraverse(worldMat) {
    var rd = _renderData;
    _vbuf = rd.chunk.vb;
    _vUintBuf = new Uint32Array(_vbuf.buffer, _vbuf.byteOffset, _vbuf.length);
    _ibuf = rd.indices;
    _actualVCount = _comp.maxVertexCount;
    _actualICount = _comp.maxIndexCount;
    var locSkeleton = _comp._skeleton;
    var skeletonColor = locSkeleton.color;
    var graphics = _comp._debugRenderer;
    var clipper = _comp._clipper;
    var material = null;
    var attachment;
    var uvs;
    var triangles;
    var isRegion;
    var isMesh;
    var isClip;
    var slot;
    _slotRangeStart = _comp._startSlotIndex;
    _slotRangeEnd = _comp._endSlotIndex;
    _inRange = false;
    if (_slotRangeStart === -1) _inRange = true;
    _debugSlots = _comp.debugSlots;
    _debugBones = _comp.debugBones;
    _debugMesh = _comp.debugMesh;

    if (graphics && (_debugBones || _debugSlots || _debugMesh)) {
      graphics.clear();
      graphics.lineWidth = 5;
    } // x y u v r1 g1 b1 a1 r2 g2 b2 a2 or x y u v r g b a


    _perClipVertexSize = 12;
    _vertexFloatCount = 0;
    _vertexOffset = 0;
    _vertexFloatOffset = 0;
    _indexCount = 0;
    _indexOffset = 0;
    var prevDrawIndexOffset = 0;

    for (var slotIdx = 0, slotCount = locSkeleton.drawOrder.length; slotIdx < slotCount; slotIdx++) {
      slot = locSkeleton.drawOrder[slotIdx];

      if (slot === undefined || !slot.bone.active) {
        continue;
      }

      if (_slotRangeStart >= 0 && _slotRangeStart === slot.data.index) {
        _inRange = true;
      }

      if (!_inRange) {
        clipper.clipEndWithSlot(slot);
        continue;
      }

      if (_slotRangeEnd >= 0 && _slotRangeEnd === slot.data.index) {
        _inRange = false;
      }

      _vertexFloatCount = 0;
      _indexCount = 0;
      attachment = slot.getAttachment();

      if (!attachment) {
        clipper.clipEndWithSlot(slot);
        continue;
      }

      isRegion = attachment instanceof spine.RegionAttachment;
      isMesh = attachment instanceof spine.MeshAttachment;
      isClip = attachment instanceof spine.ClippingAttachment;

      if (isClip) {
        clipper.clipStart(slot, attachment);
        continue;
      }

      if (!isRegion && !isMesh) {
        clipper.clipEndWithSlot(slot);
        continue;
      }

      var texture = attachment.region.texture.getRealTexture();
      material = _getSlotMaterial(slot.data.blendMode);

      if (!material) {
        clipper.clipEndWithSlot(slot);
        continue;
      }

      if (!_currentMaterial) _currentMaterial = material;

      if (_mustFlush || material.hash !== _currentMaterial.hash || texture && _currentTexture !== texture) {
        _mustFlush = false;

        var _cumulatedCount = _indexOffset - prevDrawIndexOffset; // Submit draw data


        if (_cumulatedCount > 0) {
          _comp._requestDrawData(_currentMaterial, _currentTexture, prevDrawIndexOffset, _cumulatedCount);

          prevDrawIndexOffset = _indexOffset;
        }

        _currentTexture = texture;
        _currentMaterial = material;
      }

      if (isRegion) {
        triangles = _quadTriangles;
        _vertexCount = 4;
        _vertexFloatCount = _vertexCount * _perVertexSize;
        _indexCount = 6; // compute vertex and fill x y

        attachment.computeWorldVertices(slot.bone, _vbuf, _vertexFloatOffset, _perVertexSize); // draw debug slots if enabled graphics

        if (graphics && _debugSlots) {
          graphics.strokeColor = _slotColor;
          graphics.moveTo(_vbuf[_vertexFloatOffset], _vbuf[_vertexFloatOffset + 1]);

          for (var ii = _vertexFloatOffset + _perVertexSize, nn = _vertexFloatOffset + _vertexFloatCount; ii < nn; ii += _perVertexSize) {
            graphics.lineTo(_vbuf[ii], _vbuf[ii + 1]);
          }

          graphics.close();
          graphics.stroke();
        }
      } else if (isMesh) {
        var mattachment = attachment;
        triangles = mattachment.triangles; // insure capacity

        _vertexCount = mattachment.worldVerticesLength >> 1;
        _vertexFloatCount = _vertexCount * _perVertexSize;
        _indexCount = triangles.length; // compute vertex and fill x y

        mattachment.computeWorldVertices(slot, 0, mattachment.worldVerticesLength, _vbuf, _vertexFloatOffset, _perVertexSize); // draw debug mesh if enabled graphics

        if (graphics && _debugMesh) {
          graphics.strokeColor = _meshColor;

          for (var _ii = 0, _nn = triangles.length; _ii < _nn; _ii += 3) {
            var v1 = triangles[_ii] * _perVertexSize + _vertexFloatOffset;
            var v2 = triangles[_ii + 1] * _perVertexSize + _vertexFloatOffset;
            var v3 = triangles[_ii + 2] * _perVertexSize + _vertexFloatOffset;
            graphics.moveTo(_vbuf[v1], _vbuf[v1 + 1]);
            graphics.lineTo(_vbuf[v2], _vbuf[v2 + 1]);
            graphics.lineTo(_vbuf[v3], _vbuf[v3 + 1]);
            graphics.close();
            graphics.stroke();
          }
        }
      }

      if (_vertexFloatCount === 0 || _indexCount === 0) {
        clipper.clipEndWithSlot(slot);
        continue;
      }

      var meshAttachment = attachment; // fill indices

      _ibuf = rd.indices;

      _ibuf.set(triangles, _indexOffset); // fill u v


      uvs = meshAttachment.uvs;

      for (var v = _vertexFloatOffset, n = _vertexFloatOffset + _vertexFloatCount, u = 0; v < n; v += _perVertexSize, u += 2) {
        _vbuf[v + 3] = uvs[u]; // u

        _vbuf[v + 4] = uvs[u + 1]; // v
      } // ATTENTION: This process could change _ibuf and _vbuf reference due to clipping


      fillVertices(skeletonColor, meshAttachment.color, slot.color, clipper, slot);

      if (_indexCount > 0) {
        var chunkOffset = rd.chunk.vertexOffset;

        for (var _ii2 = _indexOffset, _nn2 = _indexOffset + _indexCount; _ii2 < _nn2; _ii2++) {
          _ibuf[_ii2] += _vertexOffset + chunkOffset;
        }

        if (worldMat) {
          for (var _ii3 = _vertexFloatOffset, _nn3 = _vertexFloatOffset + _vertexFloatCount; _ii3 < _nn3; _ii3 += _perVertexSize) {
            _tempVecPos.x = _vbuf[_ii3];
            _tempVecPos.y = _vbuf[_ii3 + 1];
            _tempVecPos.z = 0;

            _tempVecPos.transformMat4(worldMat);

            _vbuf[_ii3] = _tempVecPos.x;
            _vbuf[_ii3 + 1] = _tempVecPos.y;
            _vbuf[_ii3 + 2] = _tempVecPos.z;
          }
        }
      }

      _vertexFloatOffset += _vertexFloatCount;
      _vertexOffset += _vertexCount;
      _indexOffset += _indexCount;
      _vertexCount = 0;
      _indexCount = 0;
      clipper.clipEndWithSlot(slot);
    }

    var cumulatedCount = _indexOffset - prevDrawIndexOffset;

    if (_currentTexture && cumulatedCount > 0) {
      _comp._requestDrawData(_currentMaterial, _currentTexture, prevDrawIndexOffset, cumulatedCount);
    }

    clipper.clipEnd();

    if (graphics && _debugBones) {
      var bone;
      graphics.strokeColor = _boneColor;
      graphics.fillColor = _slotColor; // Root bone color is same as slot color.

      for (var i = 0, _n8 = locSkeleton.bones.length; i < _n8; i++) {
        bone = locSkeleton.bones[i];
        var x = bone.data.length * bone.a + bone.worldX;
        var y = bone.data.length * bone.c + bone.worldY; // Bone lengths.

        graphics.moveTo(bone.worldX, bone.worldY);
        graphics.lineTo(x, y);
        graphics.stroke(); // Bone origins.

        graphics.circle(bone.worldX, bone.worldY, Math.PI * 1.5);
        graphics.fill();

        if (i === 0) {
          graphics.fillColor = _originColor;
        }
      }
    }
  }

  function cacheTraverse(worldMat) {
    var frame = _comp._curFrame;
    if (!frame) return;
    var segments = frame.segments;
    if (segments.length === 0) return;
    _perClipVertexSize = 12;
    _vertexFloatOffset = 0;
    _indexCount = 0;
    _vertexOffset = 0;
    _indexOffset = 0;
    var material = null;
    var vertices = frame.vertices;
    var indices = frame.indices;
    var chunkOffset = 0;
    var frameVFOffset = 0;
    var frameIndexOffset = 0;
    var segVFCount = 0;
    var colors = frame.colors;
    var colorOffset = 0;
    var nowColor = colors[colorOffset++];
    var maxVFOffset = nowColor.vfOffset;

    _handleColor(nowColor);

    var prevDrawIndexOffset = 0;
    var rd = _renderData;
    var vbuf = rd.chunk.vb;
    _vUintBuf = new Uint32Array(vbuf.buffer, vbuf.byteOffset, vbuf.length);
    var ibuf = rd.indices;

    for (var i = 0, n = segments.length; i < n; i++) {
      var segInfo = segments[i];
      material = _getSlotMaterial(segInfo.blendMode);
      if (!material) continue;
      if (!_currentMaterial) _currentMaterial = material;

      if (_mustFlush || material.hash !== _currentMaterial.hash || segInfo.tex && segInfo.tex !== _currentTexture) {
        _mustFlush = false;

        var _cumulatedCount2 = _indexOffset - prevDrawIndexOffset; // Submit draw data


        if (_cumulatedCount2 > 0) {
          _comp._requestDrawData(_currentMaterial, _currentTexture, prevDrawIndexOffset, _cumulatedCount2);

          prevDrawIndexOffset = _indexOffset;
        }

        _currentMaterial = material;
        _currentTexture = segInfo.tex;
      }

      _vertexCount = segInfo.vertexCount;
      _indexCount = segInfo.indexCount; // Fill indices

      chunkOffset = rd.chunk.vertexOffset;

      for (var ii = _indexOffset, il = _indexOffset + _indexCount; ii < il; ii++) {
        ibuf[ii] = chunkOffset + _vertexOffset + indices[frameIndexOffset++];
      } // Fill vertices


      segVFCount = segInfo.vfCount;
      vbuf.set(vertices.subarray(frameVFOffset, frameVFOffset + segVFCount), frameVFOffset);

      if (worldMat) {
        for (var _ii4 = frameVFOffset, _il = frameVFOffset + segVFCount; _ii4 < _il; _ii4 += _perVertexSize) {
          _tempVecPos.x = vbuf[_ii4];
          _tempVecPos.y = vbuf[_ii4 + 1];
          _tempVecPos.z = 0;

          _tempVecPos.transformMat4(worldMat);

          vbuf[_ii4] = _tempVecPos.x;
          vbuf[_ii4 + 1] = _tempVecPos.y;
          vbuf[_ii4 + 2] = _tempVecPos.z;
        }
      } // Update color


      if (_needColor) {
        // handle color
        // tip: step of frameColorOffset should fix with vertex attributes, (xyzuvrcc--xyuvcc)
        var frameColorOffset = frameVFOffset / 7 * 6;

        for (var _ii5 = frameVFOffset, iEnd = frameVFOffset + segVFCount; _ii5 < iEnd; _ii5 += _perVertexSize, frameColorOffset += 6) {
          if (frameColorOffset >= maxVFOffset) {
            nowColor = colors[colorOffset++];

            _handleColor(nowColor);

            maxVFOffset = nowColor.vfOffset;
          }

          _vUintBuf[_ii5 + 5] = _finalColor32;
          _vUintBuf[_ii5 + 6] = _darkColor32;
        }
      } // Segment increment


      frameVFOffset += segVFCount;
      _vertexOffset += _vertexCount;
      _indexOffset += _indexCount;
      _vertexCount = 0;
      _indexCount = 0;
    }

    var cumulatedCount = _indexOffset - prevDrawIndexOffset;

    if (_currentTexture && cumulatedCount > 0) {
      _comp._requestDrawData(_currentMaterial, _currentTexture, prevDrawIndexOffset, cumulatedCount);
    }
  }

  return {
    setters: [function (_libSpineCoreJs) {
      spine = _libSpineCoreJs.default;
    }, function (_dRendererVertexFormatJs) {
      getAttributeStride = _dRendererVertexFormatJs.getAttributeStride;
      vfmtPosUvColor4B = _dRendererVertexFormatJs.vfmtPosUvColor4B;
      vfmtPosUvTwoColor4B = _dRendererVertexFormatJs.vfmtPosUvTwoColor4B;
    }, function (_skeletonJs) {
      SpineMaterialType = _skeletonJs.SpineMaterialType;
    }, function (_coreIndexJs) {
      Color = _coreIndexJs.Color;
      Vec3 = _coreIndexJs.Vec3;
    }, function (_gfxIndexJs) {
      BlendFactor = _gfxIndexJs.BlendFactor;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_dRendererStaticVbAccessorJs) {
      StaticVBAccessor = _dRendererStaticVbAccessorJs.StaticVBAccessor;
    }, function (_dRendererRenderDataJs) {
      RenderData = _dRendererRenderDataJs.RenderData;
    }, function (_gameIndexJs) {
      director = _gameIndexJs.director;
    }],
    execute: function () {
      _quadTriangles = [0, 1, 2, 2, 3, 0];
      _slotColor = new Color(0, 0, 255, 255);
      _boneColor = new Color(255, 0, 0, 255);
      _originColor = new Color(0, 255, 0, 255);
      _meshColor = new Color(255, 255, 0, 255);
      _finalColor = new spine.Color(1, 1, 1, 1);
      _darkColor = new spine.Color(1, 1, 1, 1);
      _tempPos = new spine.Vector2();
      _tempUv = new spine.Vector2();
      _vertexFloatCount = 0;
      _vertexCount = 0;
      _vertexOffset = 0;
      _vertexFloatOffset = 0;
      _indexCount = 0;
      _indexOffset = 0;
      _actualVCount = 0;
      _actualICount = 0;
      _tempVecPos = new Vec3(0, 0, 0);
      _vertexEffect = null;
      _currentMaterial = null;
      _currentTexture = null;
      _accessor = null;
      _tintAccessor = null;
      /**
       * simple 组装器
       * 可通过 `UI.simple` 获取该组装器。
       * @internal Since v3.7.2 this is an engine private object.
       */

      _export("simple", simple = {
        vCount: 32767,
        ensureAccessor: function ensureAccessor(useTint) {
          var accessor = useTint ? _tintAccessor : _accessor;

          if (!accessor) {
            var device = director.root.device;
            var batcher = director.root.batcher2D;
            var attributes = useTint ? vfmtPosUvTwoColor4B : vfmtPosUvColor4B;

            if (useTint) {
              accessor = _tintAccessor = new StaticVBAccessor(device, attributes, this.vCount); // Register to batcher so that batcher can upload buffers after batching process

              batcher.registerBufferAccessor(Number.parseInt('SPINETINT', 36), _tintAccessor);
            } else {
              accessor = _accessor = new StaticVBAccessor(device, attributes, this.vCount); // Register to batcher so that batcher can upload buffers after batching process

              batcher.registerBufferAccessor(Number.parseInt('SPINE', 36), _accessor);
            }
          }

          return accessor;
        },
        createData: function createData(comp) {
          var rd = comp.renderData;

          if (!rd) {
            var useTint = comp.useTint || comp.isAnimationCached();
            var accessor = this.ensureAccessor(useTint);
            var skins = comp._skeleton.data.skins;
            var vCount = 0;
            var iCount = 0;

            for (var i = 0; i < skins.length; ++i) {
              var attachments = skins[i].attachments;

              for (var j = 0; j < attachments.length; j++) {
                var entry = attachments[j];

                for (var key in entry) {
                  var skin = entry[key];

                  if (skin instanceof spine.RegionAttachment) {
                    vCount += 4;
                    iCount += 6;
                  } else if (skin instanceof spine.MeshAttachment) {
                    vCount += skin.worldVerticesLength >> 1;
                    iCount += skin.triangles.length;
                  }
                }
              }
            }

            rd = RenderData.add(useTint ? vfmtPosUvTwoColor4B : vfmtPosUvColor4B, accessor);
            rd.resize(vCount, iCount);

            if (!rd.indices || iCount !== rd.indices.length) {
              rd.indices = new Uint16Array(iCount);
            }

            comp.maxVertexCount = vCount;
            comp.maxIndexCount = iCount;
          }

          return rd;
        },
        updateRenderData: function updateRenderData(comp, batcher) {
          _comp = comp;
          var skeleton = comp._skeleton;

          if (!comp.isAnimationCached() && skeleton) {
            skeleton.updateWorldTransform();
          }

          if (skeleton) {
            updateComponentRenderData(comp, batcher);
          }
        },
        updateColor: function updateColor(comp) {
          if (!comp) return;
          _comp = comp;

          _comp.markForUpdateRenderData();
        },
        fillBuffers: function fillBuffers(comp, renderer) {// Fill indices
        }
      });

      legacyCC.internal.SpineAssembler = simple;
    }
  };
});