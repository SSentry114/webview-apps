System.register("q-bundled:///fs/cocos/ui/editbox/edit-box-impl.js", ["pal/screen-adapter", "../../2d/assets/index.js", "../../game/director.js", "../../game/index.js", "../../core/index.js", "../view.js", "../../input/types/index.js", "../../core/utils/misc.js", "../../2d/components/label.js", "./tabIndexUtil.js", "./types.js", "./edit-box-impl-base.js", "../../../pal/system-info/enum-type/index.js", "../../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var screenAdapter, BitmapFont, director, game, Mat4, Vec3, visibleRect, sys, view, KeyCode, contains, Label, tabIndexUtil, InputFlag, InputMode, KeyboardReturnType, EditBoxImplBase, BrowserType, OS, ccwindow, EditBoxImpl, ccdocument, SCROLLY, LEFT_PADDING, DELAY_TIME, _matrix, _matrix_temp, _vec3, _currentEditBoxImpl, _domCount;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("EditBoxImpl", void 0);

  return {
    setters: [function (_palScreenAdapter) {
      screenAdapter = _palScreenAdapter.screenAdapter;
    }, function (_dAssetsIndexJs) {
      BitmapFont = _dAssetsIndexJs.BitmapFont;
    }, function (_gameDirectorJs) {
      director = _gameDirectorJs.director;
    }, function (_gameIndexJs) {
      game = _gameIndexJs.game;
    }, function (_coreIndexJs) {
      Mat4 = _coreIndexJs.Mat4;
      Vec3 = _coreIndexJs.Vec3;
      visibleRect = _coreIndexJs.visibleRect;
      sys = _coreIndexJs.sys;
    }, function (_viewJs) {
      view = _viewJs.view;
    }, function (_inputTypesIndexJs) {
      KeyCode = _inputTypesIndexJs.KeyCode;
    }, function (_coreUtilsMiscJs) {
      contains = _coreUtilsMiscJs.contains;
    }, function (_dComponentsLabelJs) {
      Label = _dComponentsLabelJs.Label;
    }, function (_tabIndexUtilJs) {
      tabIndexUtil = _tabIndexUtilJs.tabIndexUtil;
    }, function (_typesJs) {
      InputFlag = _typesJs.InputFlag;
      InputMode = _typesJs.InputMode;
      KeyboardReturnType = _typesJs.KeyboardReturnType;
    }, function (_editBoxImplBaseJs) {
      EditBoxImplBase = _editBoxImplBaseJs.EditBoxImplBase;
    }, function (_palSystemInfoEnumTypeIndexJs) {
      BrowserType = _palSystemInfoEnumTypeIndexJs.BrowserType;
      OS = _palSystemInfoEnumTypeIndexJs.OS;
    }, function (_coreGlobalExportsJs) {
      ccwindow = _coreGlobalExportsJs.ccwindow;
    }],
    execute: function () {
      ccdocument = ccwindow.document; // https://segmentfault.com/q/1010000002914610

      SCROLLY = 40;
      LEFT_PADDING = 2;
      DELAY_TIME = 400;
      _matrix = new Mat4();
      _matrix_temp = new Mat4();
      _vec3 = new Vec3();
      _currentEditBoxImpl = null;
      _domCount = 0;

      _export("EditBoxImpl", EditBoxImpl = class EditBoxImpl extends EditBoxImplBase {
        constructor(...args) {
          super(...args);
          this._delegate = null;
          this._inputMode = -1;
          this._inputFlag = -1;
          this._returnType = -1;
          this.__eventListeners = {};
          this.__autoResize = false;
          this.__orientationChanged = void 0;
          this._edTxt = null;
          this._isTextArea = false;
          this._textLabelFont = null;
          this._textLabelFontSize = null;
          this._textLabelFontColor = null;
          this._textLabelAlign = null;
          this._placeholderLabelFont = null;
          this._placeholderLabelFontSize = null;
          this._placeholderLabelFontColor = null;
          this._placeholderLabelAlign = null;
          this._placeholderLineHeight = null;
          this._placeholderStyleSheet = null;
          this._domId = `EditBoxId_${++_domCount}`;
        }

        init(delegate) {
          if (!delegate) {
            return;
          }

          this._delegate = delegate;

          if (delegate.inputMode === InputMode.ANY) {
            this._createTextArea();
          } else {
            this._createInput();
          }

          tabIndexUtil.add(this);
          this.setTabIndex(delegate.tabIndex);

          this._initStyleSheet();

          this._registerEventListeners();

          this._addDomToGameContainer();
        }

        clear() {
          this._removeEventListeners();

          this._removeDomFromGameContainer();

          tabIndexUtil.remove(this); // clear while editing

          if (_currentEditBoxImpl === this) {
            _currentEditBoxImpl = null;
          }

          this._delegate = null;
        }

        update() {
          this._updateMatrix();
        }

        setTabIndex(index) {
          this._edTxt.tabIndex = index;
          tabIndexUtil.resort();
        }

        setSize(width, height) {
          const elem = this._edTxt;

          if (elem) {
            elem.style.width = `${width}px`;
            elem.style.height = `${height}px`;
          }
        }

        beginEditing() {
          if (_currentEditBoxImpl && _currentEditBoxImpl !== this) {
            _currentEditBoxImpl.setFocus(false);
          }

          this._editing = true;
          _currentEditBoxImpl = this;

          this._delegate._editBoxEditingDidBegan();

          this._showDom();

          this._edTxt.focus();
        }

        endEditing() {
          this._edTxt.blur();
        }

        _createInput() {
          this._isTextArea = false;
          this._edTxt = ccdocument.createElement('input');
        }

        _createTextArea() {
          this._isTextArea = true;
          this._edTxt = ccdocument.createElement('textarea');
        }

        _addDomToGameContainer() {
          if (game.container && this._edTxt) {
            game.container.appendChild(this._edTxt);
            ccdocument.head.appendChild(this._placeholderStyleSheet);
          }
        }

        _removeDomFromGameContainer() {
          const hasElem = contains(game.container, this._edTxt);

          if (hasElem && this._edTxt) {
            game.container.removeChild(this._edTxt);
          }

          const hasStyleSheet = contains(ccdocument.head, this._placeholderStyleSheet);

          if (hasStyleSheet) {
            ccdocument.head.removeChild(this._placeholderStyleSheet);
          }

          this._edTxt = null;
          this._placeholderStyleSheet = null;
        }

        _showDom() {
          this._updateMaxLength();

          this._updateInputType();

          this._updateStyleSheet();

          if (this._edTxt && this._delegate) {
            this._edTxt.style.display = '';

            this._delegate._hideLabels();
          }

          if (sys.isMobile) {
            this._showDomOnMobile();
          }
        }

        _hideDom() {
          const elem = this._edTxt;

          if (elem && this._delegate) {
            elem.style.display = 'none';

            this._delegate._showLabels();
          }

          if (sys.isMobile) {
            this._hideDomOnMobile();
          }
        }

        _showDomOnMobile() {
          if (sys.os !== OS.ANDROID && sys.os !== OS.OHOS) {
            return;
          }

          screenAdapter.handleResizeEvent = false;

          this._adjustWindowScroll();
        }

        _hideDomOnMobile() {
          if (sys.os === OS.ANDROID || sys.os === OS.OHOS) {
            screenAdapter.handleResizeEvent = true;
          }

          this._scrollBackWindow();
        }

        _adjustWindowScroll() {
          setTimeout(() => {
            if (ccwindow.scrollY < SCROLLY) {
              this._edTxt.scrollIntoView({
                block: 'start',
                inline: 'nearest',
                behavior: 'smooth'
              });
            }
          }, DELAY_TIME);
        }

        _scrollBackWindow() {
          setTimeout(() => {
            if (sys.browserType === BrowserType.WECHAT && sys.os === OS.IOS) {
              if (ccwindow.top) {
                ccwindow.top.scrollTo(0, 0);
              }

              return;
            }

            ccwindow.scrollTo(0, 0);
          }, DELAY_TIME);
        }

        _updateMatrix() {
          if (!this._edTxt) {
            return;
          }

          const node = this._delegate.node;
          let scaleX = view.getScaleX();
          let scaleY = view.getScaleY();
          const viewport = view.getViewportRect(); // TODO: implement editBox in PAL

          const dpr = screenAdapter.devicePixelRatio;
          node.getWorldMatrix(_matrix);
          const transform = node._uiProps.uiTransformComp;

          if (transform) {
            Vec3.set(_vec3, -transform.anchorX * transform.width, -transform.anchorY * transform.height, _vec3.z);
          }

          Mat4.transform(_matrix, _matrix, _vec3);

          if (!node._uiProps.uiTransformComp) {
            return;
          }

          const camera = director.root.batcher2D.getFirstRenderCamera(node);
          if (!camera) return; // camera.getWorldToCameraMatrix(_matrix_temp);

          camera.node.getWorldRT(_matrix_temp);
          const m12 = _matrix_temp.m12;
          const m13 = _matrix_temp.m13;
          const center = visibleRect.center;
          _matrix_temp.m12 = center.x - (_matrix_temp.m00 * m12 + _matrix_temp.m04 * m13);
          _matrix_temp.m13 = center.y - (_matrix_temp.m01 * m12 + _matrix_temp.m05 * m13);
          Mat4.multiply(_matrix_temp, _matrix_temp, _matrix);
          scaleX /= dpr;
          scaleY /= dpr;
          const container = game.container;
          const a = _matrix_temp.m00 * scaleX;
          const b = _matrix.m01;
          const c = _matrix.m04;
          const d = _matrix_temp.m05 * scaleY;
          let offsetX = parseInt(container && container.style.paddingLeft || '0');
          offsetX += viewport.x / dpr;
          let offsetY = parseInt(container && container.style.paddingBottom || '0');
          offsetY += viewport.y / dpr;
          const tx = _matrix_temp.m12 * scaleX + offsetX;
          const ty = _matrix_temp.m13 * scaleY + offsetY;
          const matrix = `matrix(${a},${-b},${-c},${d},${tx},${-ty})`;
          this._edTxt.style.transform = matrix;
          this._edTxt.style['-webkit-transform'] = matrix;
          this._edTxt.style['transform-origin'] = '0px 100% 0px';
          this._edTxt.style['-webkit-transform-origin'] = '0px 100% 0px';
        }

        _updateInputType() {
          const delegate = this._delegate;
          const inputMode = delegate.inputMode;
          const inputFlag = delegate.inputFlag;
          const returnType = delegate.returnType;
          let elem = this._edTxt;

          if (this._inputMode === inputMode && this._inputFlag === inputFlag && this._returnType === returnType) {
            return;
          } // update cache


          this._inputMode = inputMode;
          this._inputFlag = inputFlag;
          this._returnType = returnType; // FIX ME: TextArea actually dose not support password type.

          if (this._isTextArea) {
            // input flag
            let transform = 'none';

            if (inputFlag === InputFlag.INITIAL_CAPS_ALL_CHARACTERS) {
              transform = 'uppercase';
            } else if (inputFlag === InputFlag.INITIAL_CAPS_WORD) {
              transform = 'capitalize';
            }

            elem.style.textTransform = transform;
            return;
          }

          elem = elem; // begin to updateInputType

          if (inputFlag === InputFlag.PASSWORD) {
            elem.type = 'password';
            elem.style.textTransform = 'none';
            return;
          } // input mode


          let type = elem.type;

          if (inputMode === InputMode.EMAIL_ADDR) {
            type = 'email';
          } else if (inputMode === InputMode.NUMERIC || inputMode === InputMode.DECIMAL) {
            type = 'number';
          } else if (inputMode === InputMode.PHONE_NUMBER) {
            type = 'number';
            elem.pattern = '[0-9]*';
            elem.addEventListener('wheel', () => false);
          } else if (inputMode === InputMode.URL) {
            type = 'url';
          } else {
            type = 'text';

            if (returnType === KeyboardReturnType.SEARCH) {
              type = 'search';
            }
          }

          elem.type = type; // input flag

          let textTransform = 'none';

          if (inputFlag === InputFlag.INITIAL_CAPS_ALL_CHARACTERS) {
            textTransform = 'uppercase';
          } else if (inputFlag === InputFlag.INITIAL_CAPS_WORD) {
            textTransform = 'capitalize';
          }

          elem.style.textTransform = textTransform;
        }

        _updateMaxLength() {
          let maxLength = this._delegate.maxLength;

          if (maxLength < 0) {
            maxLength = 65535;
          }

          this._edTxt.maxLength = maxLength;
        }

        _initStyleSheet() {
          if (!this._edTxt) {
            return;
          }

          let elem = this._edTxt;
          elem.style.color = '#000000';
          elem.style.border = '0px';
          elem.style.background = 'transparent';
          elem.style.width = '100%';
          elem.style.height = '100%';
          elem.style.outline = 'medium';
          elem.style.padding = '0';
          elem.style.textTransform = 'none';
          elem.style.display = 'none';
          elem.style.position = 'absolute';
          elem.style.bottom = '0px';
          elem.style.left = `${LEFT_PADDING}px`;
          elem.className = 'cocosEditBox';
          elem.style.fontFamily = 'Arial';
          elem.id = this._domId;

          if (!this._isTextArea) {
            elem = elem;
            elem.type = 'text';
            elem.style['-moz-appearance'] = 'textfield';
          } else {
            elem.style.resize = 'none';
            elem.style.overflowY = 'scroll';
          }

          this._placeholderStyleSheet = ccdocument.createElement('style');
        }

        _updateStyleSheet() {
          const delegate = this._delegate;
          const elem = this._edTxt;

          if (elem && delegate) {
            elem.value = delegate.string;

            this._updateTextLabel(delegate.textLabel); // NOTE: we don't show placeholder any more when editBox is editing
            // elem.placeholder = delegate.placeholder;
            // this._updatePlaceholderLabel(delegate.placeholderLabel);

          }
        }

        _updateTextLabel(textLabel) {
          if (!textLabel) {
            return;
          }

          let font = textLabel.font;

          if (font && !(font instanceof BitmapFont)) {
            font = font._fontFamily;
          } else {
            font = textLabel.fontFamily;
          }

          const fontSize = textLabel.fontSize * textLabel.node.scale.y;

          if (this._textLabelFont === font && this._textLabelFontSize === fontSize && this._textLabelFontColor === textLabel.fontColor && this._textLabelAlign === textLabel.horizontalAlign) {
            return;
          }

          this._textLabelFont = font;
          this._textLabelFontSize = fontSize;
          this._textLabelFontColor = textLabel.fontColor;
          this._textLabelAlign = textLabel.horizontalAlign;

          if (!this._edTxt) {
            return;
          }

          const elem = this._edTxt;
          elem.style.fontSize = `${fontSize}px`;
          elem.style.color = textLabel.color.toCSS();
          elem.style.fontFamily = font;

          switch (textLabel.horizontalAlign) {
            case Label.HorizontalAlign.LEFT:
              elem.style.textAlign = 'left';
              break;

            case Label.HorizontalAlign.CENTER:
              elem.style.textAlign = 'center';
              break;

            case Label.HorizontalAlign.RIGHT:
              elem.style.textAlign = 'right';
              break;

            default:
              break;
          }
        }

        _updatePlaceholderLabel(placeholderLabel) {
          if (!placeholderLabel) {
            return;
          }

          let font = placeholderLabel.font;

          if (font && !(font instanceof BitmapFont)) {
            font = placeholderLabel.font._fontFamily;
          } else {
            font = placeholderLabel.fontFamily;
          }

          const fontSize = placeholderLabel.fontSize * placeholderLabel.node.scale.y;

          if (this._placeholderLabelFont === font && this._placeholderLabelFontSize === fontSize && this._placeholderLabelFontColor === placeholderLabel.fontColor && this._placeholderLabelAlign === placeholderLabel.horizontalAlign && this._placeholderLineHeight === placeholderLabel.fontSize) {
            return;
          }

          this._placeholderLabelFont = font;
          this._placeholderLabelFontSize = fontSize;
          this._placeholderLabelFontColor = placeholderLabel.fontColor;
          this._placeholderLabelAlign = placeholderLabel.horizontalAlign;
          this._placeholderLineHeight = placeholderLabel.fontSize;
          const styleEl = this._placeholderStyleSheet;
          const fontColor = placeholderLabel.color.toCSS();
          const lineHeight = placeholderLabel.fontSize;
          let horizontalAlign = '';

          switch (placeholderLabel.horizontalAlign) {
            case Label.HorizontalAlign.LEFT:
              horizontalAlign = 'left';
              break;

            case Label.HorizontalAlign.CENTER:
              horizontalAlign = 'center';
              break;

            case Label.HorizontalAlign.RIGHT:
              horizontalAlign = 'right';
              break;

            default:
              break;
          }

          styleEl.innerHTML = `#${this._domId}::-webkit-input-placeholder{text-transform: initial;-family: ${font};font-size: ${fontSize}px;color: ${fontColor};line-height: ${lineHeight}px;text-align: ${horizontalAlign};}` + `#${this._domId}::-moz-placeholder{text-transform: initial;-family: ${font};font-size: ${fontSize}px;color: ${fontColor};line-height: ${lineHeight}px;text-align: ${horizontalAlign};}` + `#${this._domId}::-ms-input-placeholder{text-transform: initial;-family: ${font};font-size: ${fontSize}px;color: ${fontColor};line-height: ${lineHeight}px;text-align: ${horizontalAlign};}`; // EDGE_BUG_FIX: hide clear button, because clearing input box in Edge does not emit input event
          // issue refference: https://github.com/angular/angular/issues/26307

          if (sys.browserType === BrowserType.EDGE) {
            styleEl.innerHTML += `#${this._domId}::-ms-clear{display: none;}`;
          }
        }

        _registerEventListeners() {
          if (!this._edTxt) {
            return;
          }

          const elem = this._edTxt;
          let inputLock = false;
          const cbs = this.__eventListeners;

          cbs.compositionStart = () => {
            inputLock = true;
          };

          cbs.compositionEnd = () => {
            inputLock = false;

            this._delegate._editBoxTextChanged(elem.value);
          };

          cbs.onInput = () => {
            if (inputLock) {
              return;
            }

            const delegate = this._delegate; // input of number type doesn't support maxLength attribute

            const maxLength = delegate.maxLength;

            if (maxLength >= 0) {
              elem.value = elem.value.slice(0, maxLength);
            }

            delegate._editBoxTextChanged(elem.value);
          };

          cbs.onClick = () => {
            if (this._editing) {
              if (sys.isMobile) {
                this._adjustWindowScroll();
              }
            }
          };

          cbs.onKeydown = e => {
            if (e.keyCode === KeyCode.ENTER) {
              e.propagationStopped = true;

              this._delegate._editBoxEditingReturn();

              if (!this._isTextArea) {
                elem.blur();
              }
            } else if (e.keyCode === KeyCode.TAB) {
              e.propagationStopped = true;
              e.preventDefault();
              tabIndexUtil.next(this);
            }
          };

          cbs.onBlur = () => {
            // on mobile, sometimes input element doesn't fire compositionend event
            if (sys.isMobile && inputLock) {
              cbs.compositionEnd();
            }

            this._editing = false;
            _currentEditBoxImpl = null;

            this._hideDom();

            this._delegate._editBoxEditingDidEnded();
          };

          elem.addEventListener('compositionstart', cbs.compositionStart);
          elem.addEventListener('compositionend', cbs.compositionEnd);
          elem.addEventListener('input', cbs.onInput);
          elem.addEventListener('keydown', cbs.onKeydown);
          elem.addEventListener('blur', cbs.onBlur);
          elem.addEventListener('touchstart', cbs.onClick);
        }

        _removeEventListeners() {
          if (!this._edTxt) {
            return;
          }

          const elem = this._edTxt;
          const cbs = this.__eventListeners;
          elem.removeEventListener('compositionstart', cbs.compositionStart);
          elem.removeEventListener('compositionend', cbs.compositionEnd);
          elem.removeEventListener('input', cbs.onInput);
          elem.removeEventListener('keydown', cbs.onKeydown);
          elem.removeEventListener('blur', cbs.onBlur);
          elem.removeEventListener('touchstart', cbs.onClick);
          cbs.compositionStart = null;
          cbs.compositionEnd = null;
          cbs.onInput = null;
          cbs.onKeydown = null;
          cbs.onBlur = null;
          cbs.onClick = null;
        }

      });
    }
  };
});