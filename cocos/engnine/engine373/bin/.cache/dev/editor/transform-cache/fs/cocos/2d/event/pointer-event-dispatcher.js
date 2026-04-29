System.register("q-bundled:///fs/cocos/2d/event/pointer-event-dispatcher.js", ["../../input/index.js", "../../scene-graph/node-event-processor.js", "../../core/index.js", "../../input/types/event-enum.js", "../../input/input.js"], function (_export, _context) {
  "use strict";

  var Input, input, DispatcherEventType, NodeEventProcessor, js, InputEventType, EventDispatcherPriority, PointerEventDispatcher, mouseEvents, touchEvents, pointerEventDispatcher;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_inputIndexJs) {
      Input = _inputIndexJs.Input;
      input = _inputIndexJs.input;
    }, function (_sceneGraphNodeEventProcessorJs) {
      DispatcherEventType = _sceneGraphNodeEventProcessorJs.DispatcherEventType;
      NodeEventProcessor = _sceneGraphNodeEventProcessorJs.NodeEventProcessor;
    }, function (_coreIndexJs) {
      js = _coreIndexJs.js;
    }, function (_inputTypesEventEnumJs) {
      InputEventType = _inputTypesEventEnumJs.InputEventType;
    }, function (_inputInputJs) {
      EventDispatcherPriority = _inputInputJs.EventDispatcherPriority;
    }],
    execute: function () {
      mouseEvents = [Input.EventType.MOUSE_DOWN, Input.EventType.MOUSE_MOVE, Input.EventType.MOUSE_UP, Input.EventType.MOUSE_WHEEL];
      touchEvents = [Input.EventType.TOUCH_START, Input.EventType.TOUCH_MOVE, Input.EventType.TOUCH_END, Input.EventType.TOUCH_CANCEL];
      PointerEventDispatcher = class PointerEventDispatcher {
        constructor() {
          this.priority = EventDispatcherPriority.UI;
          this._isListDirty = false;
          this._inDispatchCount = 0;
          this._pointerEventProcessorList = [];
          this._processorListToAdd = [];
          this._processorListToRemove = [];

          // @ts-expect-error Property '_registerEventDispatcher' is private and only accessible within class 'Input'.
          input._registerEventDispatcher(this);

          NodeEventProcessor.callbacksInvoker.on(DispatcherEventType.ADD_POINTER_EVENT_PROCESSOR, this.addPointerEventProcessor, this);
          NodeEventProcessor.callbacksInvoker.on(DispatcherEventType.REMOVE_POINTER_EVENT_PROCESSOR, this.removePointerEventProcessor, this);
          NodeEventProcessor.callbacksInvoker.on(DispatcherEventType.MARK_LIST_DIRTY, this._markListDirty, this);
        }

        dispatchEvent(event) {
          const eventType = event.type;

          if (touchEvents.includes(eventType)) {
            return this.dispatchEventTouch(event);
          } else if (mouseEvents.includes(eventType)) {
            return this.dispatchEventMouse(event);
          }

          return true;
        }

        addPointerEventProcessor(pointerEventProcessor) {
          if (this._inDispatchCount === 0) {
            if (!this._pointerEventProcessorList.includes(pointerEventProcessor)) {
              this._pointerEventProcessorList.push(pointerEventProcessor);

              this._isListDirty = true;
            }
          } else if (!this._processorListToAdd.includes(pointerEventProcessor)) {
            this._processorListToAdd.push(pointerEventProcessor);
          }

          js.array.remove(this._processorListToRemove, pointerEventProcessor);
        }

        removePointerEventProcessor(pointerEventProcessor) {
          if (this._inDispatchCount === 0) {
            js.array.remove(this._pointerEventProcessorList, pointerEventProcessor);
            this._isListDirty = true;
          } else if (!this._processorListToRemove.includes(pointerEventProcessor)) {
            this._processorListToRemove.push(pointerEventProcessor);
          }

          js.array.remove(this._processorListToAdd, pointerEventProcessor);
        }

        dispatchEventMouse(eventMouse) {
          this._inDispatchCount++;

          this._sortPointerEventProcessorList();

          const pointerEventProcessorList = this._pointerEventProcessorList;
          const length = pointerEventProcessorList.length;
          let dispatchToNextEventDispatcher = true;

          for (let i = 0; i < length; ++i) {
            const pointerEventProcessor = pointerEventProcessorList[i];

            if (pointerEventProcessor.isEnabled && pointerEventProcessor.shouldHandleEventMouse // @ts-expect-error access private method
            && pointerEventProcessor._handleEventMouse(eventMouse)) {
              dispatchToNextEventDispatcher = false;

              if (!eventMouse.preventSwallow) {
                break;
              } else {
                eventMouse.preventSwallow = false; // reset swallow state
              }
            }
          }

          if (--this._inDispatchCount <= 0) {
            this._updatePointerEventProcessorList();
          }

          return dispatchToNextEventDispatcher;
        }

        dispatchEventTouch(eventTouch) {
          this._inDispatchCount++;

          this._sortPointerEventProcessorList();

          const pointerEventProcessorList = this._pointerEventProcessorList;
          const length = pointerEventProcessorList.length;
          const touch = eventTouch.touch;
          let dispatchToNextEventDispatcher = true;

          for (let i = 0; i < length; ++i) {
            const pointerEventProcessor = pointerEventProcessorList[i];

            if (pointerEventProcessor.isEnabled && pointerEventProcessor.shouldHandleEventTouch) {
              if (eventTouch.type === InputEventType.TOUCH_START) {
                // @ts-expect-error access private method
                if (pointerEventProcessor._handleEventTouch(eventTouch)) {
                  pointerEventProcessor.claimedTouchIdList.push(touch.getID());
                  dispatchToNextEventDispatcher = false;

                  if (!eventTouch.preventSwallow) {
                    break;
                  } else {
                    eventTouch.preventSwallow = false; // reset swallow state
                  }
                }
              } else if (pointerEventProcessor.claimedTouchIdList.length > 0) {
                const index = pointerEventProcessor.claimedTouchIdList.indexOf(touch.getID());

                if (index !== -1) {
                  // @ts-expect-error access private method
                  pointerEventProcessor._handleEventTouch(eventTouch);

                  if (eventTouch.type === InputEventType.TOUCH_END || eventTouch.type === InputEventType.TOUCH_CANCEL) {
                    js.array.removeAt(pointerEventProcessor.claimedTouchIdList, index);
                  }

                  dispatchToNextEventDispatcher = false;

                  if (!eventTouch.preventSwallow) {
                    break;
                  } else {
                    eventTouch.preventSwallow = false; // reset swallow state
                  }
                }
              }
            }
          }

          if (--this._inDispatchCount <= 0) {
            this._updatePointerEventProcessorList();
          }

          return dispatchToNextEventDispatcher;
        }

        _updatePointerEventProcessorList() {
          const listToAdd = this._processorListToAdd;
          const addLength = listToAdd.length;

          for (let i = 0; i < addLength; ++i) {
            this.addPointerEventProcessor(listToAdd[i]);
          }

          listToAdd.length = 0;
          const listToRemove = this._processorListToRemove;
          const removeLength = listToRemove.length;

          for (let i = 0; i < removeLength; ++i) {
            this.removePointerEventProcessor(listToRemove[i]);
          }

          listToRemove.length = 0;
        }

        _sortPointerEventProcessorList() {
          if (!this._isListDirty) {
            return;
          }

          const pointerEventProcessorList = this._pointerEventProcessorList;
          const length = pointerEventProcessorList.length;

          for (let i = 0; i < length; ++i) {
            const pointerEventProcessor = pointerEventProcessorList[i];
            const node = pointerEventProcessor.node;

            if (node._uiProps) {
              const trans = node._uiProps.uiTransformComp;
              pointerEventProcessor.cachedCameraPriority = trans.cameraPriority;
            }
          }

          pointerEventProcessorList.sort(this._sortByPriority);
          this._isListDirty = false;
        }

        _sortByPriority(p1, p2) {
          const node1 = p1.node;
          const node2 = p2.node;

          if (!p2 || !node2 || !node2.activeInHierarchy || !node2._uiProps.uiTransformComp) {
            return -1;
          } else if (!p1 || !node1 || !node1.activeInHierarchy || !node1._uiProps.uiTransformComp) {
            return 1;
          }

          if (p1.cachedCameraPriority !== p2.cachedCameraPriority) {
            return p2.cachedCameraPriority - p1.cachedCameraPriority;
          }

          let n1 = node1;
          let n2 = node2;
          let ex = false; // @ts-expect-error _id is a protected property

          while (((_n1$parent = n1.parent) === null || _n1$parent === void 0 ? void 0 : _n1$parent._id) !== ((_n2$parent = n2.parent) === null || _n2$parent === void 0 ? void 0 : _n2$parent._id)) {
            var _n1$parent, _n2$parent, _n, _n$parent, _n2, _n2$parent2;

            n1 = ((_n = n1) === null || _n === void 0 ? void 0 : (_n$parent = _n.parent) === null || _n$parent === void 0 ? void 0 : _n$parent.parent) === null ? (ex = true) && node2 : n1 && n1.parent;
            n2 = ((_n2 = n2) === null || _n2 === void 0 ? void 0 : (_n2$parent2 = _n2.parent) === null || _n2$parent2 === void 0 ? void 0 : _n2$parent2.parent) === null ? (ex = true) && node1 : n2 && n2.parent;
          } // @ts-expect-error protected property _id


          if (n1._id === n2._id) {
            // @ts-expect-error protected property _id
            if (n1._id === node2._id) {
              return -1;
            } // @ts-expect-error protected property _id


            if (n1._id === node1._id) {
              return 1;
            }
          }

          const priority1 = n1 ? n1.getSiblingIndex() : 0;
          const priority2 = n2 ? n2.getSiblingIndex() : 0;
          return ex ? priority1 - priority2 : priority2 - priority1;
        }

        _markListDirty() {
          this._isListDirty = true;
        }

      };

      _export("pointerEventDispatcher", pointerEventDispatcher = new PointerEventDispatcher());
    }
  };
});