(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("PNotifyNonBlock", ["exports", "PNotify"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./PNotify"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.PNotify);
    global.PNotifyNonBlock = mod.exports;
  }
})(this, function (exports, _PNotify) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _PNotify2 = _interopRequireDefault(_PNotify);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  // Some useful regexes.
  var regexOn = /^on/,
      regexMouseEvents = /^(dbl)?click$|^mouse(move|down|up|over|out|enter|leave)$|^contextmenu$/,
      regexUiEvents = /^(focus|blur|select|change|reset)$|^key(press|down|up)$/,
      regexHtmlEvents = /^(scroll|resize|(un)?load|abort|error)$/;

  // Fire a DOM event.
  var domEvent = function domEvent(elem, event, origEvent) {
    var eventObject = void 0;
    event = event.toLowerCase();
    if (document.createEvent && elem.dispatchEvent) {
      // FireFox, Opera, Safari, Chrome
      event = event.replace(regexOn, '');
      if (event.match(regexMouseEvents)) {
        // This allows the click event to fire on the notice. There is
        // probably a much better way to do it.
        elem.getBoundingClientRect();
        eventObject = document.createEvent("MouseEvents");
        eventObject.initMouseEvent(event, origEvent.bubbles, origEvent.cancelable, origEvent.view, origEvent.detail, origEvent.screenX, origEvent.screenY, origEvent.clientX, origEvent.clientY, origEvent.ctrlKey, origEvent.altKey, origEvent.shiftKey, origEvent.metaKey, origEvent.button, origEvent.relatedTarget);
      } else if (event.match(regexUiEvents)) {
        eventObject = document.createEvent("UIEvents");
        eventObject.initUIEvent(event, origEvent.bubbles, origEvent.cancelable, origEvent.view, origEvent.detail);
      } else if (event.match(regexHtmlEvents)) {
        eventObject = document.createEvent("HTMLEvents");
        eventObject.initEvent(event, origEvent.bubbles, origEvent.cancelable);
      }
      if (!eventObject) {
        return;
      };
      elem.dispatchEvent(eventObject);
    } else {
      // Internet Explorer
      if (!event.match(regexOn)) {
        event = "on" + event;
      };
      eventObject = document.createEventObject(origEvent);
      elem.fireEvent(event, eventObject);
    }
  };

  // This keeps track of the last element the mouse was over, so
  // mouseleave, mouseenter, etc can be called.
  var nonBlockLastElem = void 0;

  function data() {
    return _extends({
      "_notice": null, // The PNotify notice.
      "_options": {} // The options for the notice.
    }, _PNotify2.default.modules.NonBlock.defaults);
  };

  var methods = {
    initModule: function initModule(options) {
      this.set(options);
    }
  };

  function oncreate() {
    var _this = this;

    var cursorStyleCache = [];

    var cacheCursorStyle = function cacheCursorStyle(elem) {
      for (var i = 0; i < cursorStyleCache.length; i++) {
        if (cursorStyleCache[i].elem === elem) {
          return;
        }
      }
      cursorStyleCache.push({
        elem: elem,
        cursorStyleValue: elem.style.getPropertyValue("cursor"),
        cursorStylePriority: elem.style.getPropertyPriority("cursor")
      });
    };

    var resetCursorStyles = function resetCursorStyles() {
      for (var i = 0; i < cursorStyleCache.length; i++) {
        cursorStyleCache[i].elem.style.setProperty("cursor", cursorStyleCache[i].cursorStyleValue, cursorStyleCache[i].cursorStylePriority);
      }
      cursorStyleCache.length = 0;
    };

    // This is used to pass events through the notice if it is non-blocking.
    var nonBlockPass = function nonBlockPass(notice, event, eventName) {
      // This needs a new cursor from the element below.
      var elemInNotice = document.elementFromPoint(event.clientX, event.clientY);

      // Figure out the cursor.
      notice.refs.elem.classList.add("ui-pnotify-nonblock-hide");
      var elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      notice.refs.elem.classList.remove("ui-pnotify-nonblock-hide");
      var cursorStyle = window.getComputedStyle(elemBelow)["cursor"];

      // Put it on the element.
      cacheCursorStyle(elemInNotice);
      elemInNotice.style.setProperty("cursor", cursorStyle === "auto" ? "default" : cursorStyle, "important");

      // If the element changed, call mouseenter, mouseleave, etc.
      if (!nonBlockLastElem || nonBlockLastElem != elemBelow) {
        if (nonBlockLastElem) {
          domEvent(nonBlockLastElem, "mouseleave", event);
          domEvent(nonBlockLastElem, "mouseout", event);
        }
        domEvent(elemBelow, "mouseenter", event);
        domEvent(elemBelow, "mouseover", event);
      }
      domEvent(elemBelow, eventName, event);
      // Remember the latest element the mouse was over.
      nonBlockLastElem = elemBelow;
    };

    var notice = this.get("_notice");

    notice.on("mouseenter", function (event) {
      if (_this.get("nonblock") && event.stopPropagation) {
        event.stopPropagation();
        // If it's non-blocking, animate to the other opacity.
        notice.addModuleClass("ui-pnotify-nonblock-fade");
      }
    });
    notice.on("mouseleave", function (event) {
      if (_this.get("nonblock") && event.stopPropagation) {
        event.stopPropagation();
      }
      nonBlockLastElem = null;
      resetCursorStyles();
      // Animate back to the normal opacity.
      if (_this.get("nonblock")) {
        notice.removeModuleClass("ui-pnotify-nonblock-fade");
      }
    });
    notice.on("mouseover", function (event) {
      if (_this.get("nonblock") && event.stopPropagation) {
        event.stopPropagation();
      }
    });
    notice.on("mouseout", function (event) {
      if (_this.get("nonblock") && event.stopPropagation) {
        event.stopPropagation();
      }
    });
    notice.on("mousemove", function (event) {
      if (_this.get("nonblock") && event.stopPropagation) {
        event.stopPropagation();
        nonBlockPass(notice, event, "onmousemove");
      }
    });
    notice.on("mousedown", function (event) {
      if (_this.get("nonblock") && event.stopPropagation) {
        event.stopPropagation();
        event.preventDefault();
        nonBlockPass(notice, event, "onmousedown");
      }
    });
    notice.on("mouseup", function (event) {
      if (_this.get("nonblock") && event.stopPropagation) {
        event.stopPropagation();
        event.preventDefault();
        nonBlockPass(notice, event, "onmouseup");
      }
    });
    notice.on("click", function (event) {
      if (_this.get("nonblock") && event.stopPropagation) {
        event.stopPropagation();
        nonBlockPass(notice, event, "onclick");
      }
    });
    notice.on("dblclick", function (event) {
      if (_this.get("nonblock") && event.stopPropagation) {
        event.stopPropagation();
        nonBlockPass(notice, event, "ondblclick");
      }
    });
  };

  function setup(Component) {
    Component.key = "NonBlock";

    Component.defaults = {
      // Create a non-blocking notice. It lets the user click elements underneath it.
      nonblock: false
    };

    Component.init = function (notice) {
      return new Component({ target: document.body, data: {
          "_notice": notice
        } });
    };

    // Register the module with PNotify.
    _PNotify2.default.modules.NonBlock = Component;
  };

  function add_css() {
    var style = createElement("style");
    style.id = 'svelte-862694281-style';
    style.textContent = "[ui-pnotify].ui-pnotify.ui-pnotify-nonblock-fade{opacity:.2 !important}[ui-pnotify].ui-pnotify.ui-pnotify-nonblock-hide{display:none !important}";
    appendNode(style, document.head);
  }

  function create_main_fragment(state, component) {

    return {
      c: noop,

      m: noop,

      p: noop,

      u: noop,

      d: noop
    };
  }

  function PNotifyNonBlock(options) {
    init(this, options);
    this._state = assign(data(), options.data);

    if (!document.getElementById("svelte-862694281-style")) add_css();

    var _oncreate = oncreate.bind(this);

    if (!options.root) {
      this._oncreate = [];
    }

    this._fragment = create_main_fragment(this._state, this);

    this.root._oncreate.push(_oncreate);

    if (options.target) {
      this._fragment.c();
      this._fragment.m(options.target, options.anchor || null);

      callAll(this._oncreate);
    }
  }

  assign(PNotifyNonBlock.prototype, methods, {
    destroy: destroy,
    get: get,
    fire: fire,
    observe: observe,
    on: on,
    set: set,
    teardown: destroy,
    _set: _set,
    _mount: _mount,
    _unmount: _unmount,
    _differs: _differs
  });

  PNotifyNonBlock.prototype._recompute = noop;

  setup(PNotifyNonBlock);

  function createElement(name) {
    return document.createElement(name);
  }

  function appendNode(node, target) {
    target.appendChild(node);
  }

  function noop() {}

  function init(component, options) {
    component._observers = { pre: blankObject(), post: blankObject() };
    component._handlers = blankObject();
    component._bind = options._bind;

    component.options = options;
    component.root = options.root || component;
    component.store = component.root.store || options.store;
  }

  function assign(target) {
    var k,
        source,
        i = 1,
        len = arguments.length;
    for (; i < len; i++) {
      source = arguments[i];
      for (k in source) {
        target[k] = source[k];
      }
    }

    return target;
  }

  function callAll(fns) {
    while (fns && fns.length) {
      fns.shift()();
    }
  }

  function destroy(detach) {
    this.destroy = noop;
    this.fire('destroy');
    this.set = this.get = noop;

    if (detach !== false) this._fragment.u();
    this._fragment.d();
    this._fragment = this._state = null;
  }

  function get(key) {
    return key ? this._state[key] : this._state;
  }

  function fire(eventName, data) {
    var handlers = eventName in this._handlers && this._handlers[eventName].slice();
    if (!handlers) return;

    for (var i = 0; i < handlers.length; i += 1) {
      handlers[i].call(this, data);
    }
  }

  function observe(key, callback, options) {
    var group = options && options.defer ? this._observers.post : this._observers.pre;

    (group[key] || (group[key] = [])).push(callback);

    if (!options || options.init !== false) {
      callback.__calling = true;
      callback.call(this, this._state[key]);
      callback.__calling = false;
    }

    return {
      cancel: function cancel() {
        var index = group[key].indexOf(callback);
        if (~index) group[key].splice(index, 1);
      }
    };
  }

  function on(eventName, handler) {
    if (eventName === 'teardown') return this.on('destroy', handler);

    var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
    handlers.push(handler);

    return {
      cancel: function cancel() {
        var index = handlers.indexOf(handler);
        if (~index) handlers.splice(index, 1);
      }
    };
  }

  function set(newState) {
    this._set(assign({}, newState));
    if (this.root._lock) return;
    this.root._lock = true;
    callAll(this.root._beforecreate);
    callAll(this.root._oncreate);
    callAll(this.root._aftercreate);
    this.root._lock = false;
  }

  function _set(newState) {
    var oldState = this._state,
        changed = {},
        dirty = false;

    for (var key in newState) {
      if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
    }
    if (!dirty) return;

    this._state = assign({}, oldState, newState);
    this._recompute(changed, this._state);
    if (this._bind) this._bind(changed, this._state);

    if (this._fragment) {
      dispatchObservers(this, this._observers.pre, changed, this._state, oldState);
      this._fragment.p(changed, this._state);
      dispatchObservers(this, this._observers.post, changed, this._state, oldState);
    }
  }

  function _mount(target, anchor) {
    this._fragment.m(target, anchor);
  }

  function _unmount() {
    if (this._fragment) this._fragment.u();
  }

  function _differs(a, b) {
    return a != a ? b == b : a !== b || a && (typeof a === "undefined" ? "undefined" : _typeof(a)) === 'object' || typeof a === 'function';
  }

  function blankObject() {
    return Object.create(null);
  }

  function dispatchObservers(component, group, changed, newState, oldState) {
    for (var key in group) {
      if (!changed[key]) continue;

      var newValue = newState[key];
      var oldValue = oldState[key];

      var callbacks = group[key];
      if (!callbacks) continue;

      for (var i = 0; i < callbacks.length; i += 1) {
        var callback = callbacks[i];
        if (callback.__calling) continue;

        callback.__calling = true;
        callback.call(component, newValue, oldValue);
        callback.__calling = false;
      }
    }
  }
  exports.default = PNotifyNonBlock;
});