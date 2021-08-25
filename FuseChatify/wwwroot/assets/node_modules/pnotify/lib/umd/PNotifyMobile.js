(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("PNotifyMobile", ["exports", "PNotify"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./PNotify"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.PNotify);
    global.PNotifyMobile = mod.exports;
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

  function data() {
    return _extends({
      "_notice": null, // The PNotify notice.
      "_options": {} // The options for the notice.
    }, _PNotify2.default.modules.Mobile.defaults);
  };

  var methods = {
    initModule: function initModule(options) {
      var _this = this;

      this.set(options);

      var notice = this.get("_notice");
      var origXY = null,
          diffXY = null,
          noticeWidthHeight = null,
          noticeOpacity = null,
          csspos = "left",
          direction = "X",
          span = "Width";

      notice.on("touchstart", function (e) {
        if (!_this.get("swipeDismiss")) {
          return;
        }

        var stack = notice.get("stack");
        if (stack !== false) {
          switch (stack.dir1) {
            case "up":
            case "down":
              csspos = "left";
              direction = "X";
              span = "Width";
              break;
            case "left":
            case "right":
              csspos = "top";
              direction = "Y";
              span = "Height";
              break;
          }
        }

        origXY = e.touches[0]["screen" + direction];
        noticeWidthHeight = notice.refs.elem["scroll" + span];
        noticeOpacity = window.getComputedStyle(notice.refs.elem)["opacity"];
        notice.refs.container.style[csspos] = 0;
      });

      notice.on("touchmove", function (e) {
        if (!origXY || !_this.get("swipeDismiss")) {
          return;
        }

        var curXY = e.touches[0]["screen" + direction];

        diffXY = curXY - origXY;
        var opacity = (1 - Math.abs(diffXY) / noticeWidthHeight) * noticeOpacity;

        notice.refs.elem.style.opacity = opacity;
        notice.refs.container.style[csspos] = diffXY + "px";
      });

      notice.on("touchend", function () {
        if (!origXY || !_this.get("swipeDismiss")) {
          return;
        }

        notice.refs.container.classList.add("ui-pnotify-mobile-animate-left");
        if (Math.abs(diffXY) > 40) {
          var goLeft = diffXY < 0 ? noticeWidthHeight * -2 : noticeWidthHeight * 2;
          notice.refs.elem.style.opacity = 0;
          notice.refs.container.style[csspos] = goLeft + "px";
          notice.close();
        } else {
          notice.refs.elem.style.removeProperty("opacity");
          notice.refs.container.style.removeProperty(csspos);
        }
        origXY = null;
        diffXY = null;
        noticeWidthHeight = null;
        noticeOpacity = null;
      });

      notice.on("touchcancel", function () {
        if (!origXY || !_this.get("swipeDismiss")) {
          return;
        }

        notice.refs.elem.style.removeProperty("opacity");
        notice.refs.container.style.removeProperty(csspos);
        origXY = null;
        diffXY = null;
        noticeWidthHeight = null;
        noticeOpacity = null;
      });

      this.doMobileStyling();
    },
    update: function update() {
      this.doMobileStyling();
    },
    beforeOpen: function beforeOpen() {
      // Add an event listener to watch the window resizes.
      window.addEventListener("resize", this.get("_doMobileStylingBound"));
    },
    afterClose: function afterClose() {
      // Remove the event listener.
      window.removeEventListener("resize", this.get("_doMobileStylingBound"));

      // Remove any styling we added to close it.
      if (!this.get("swipeDismiss")) {
        return;
      }

      var notice = this.get("_notice");
      notice.refs.elem.style.removeProperty("opacity");
      notice.refs.container.style.removeProperty("left");
      notice.refs.container.style.removeProperty("top");
    },
    doMobileStyling: function doMobileStyling() {
      var notice = this.get("_notice");
      var stack = notice.get("stack");

      if (this.get("styling")) {
        if (stack !== false) {
          if (window.innerWidth <= 480) {
            if (!stack.mobileOrigSpacing1) {
              stack.mobileOrigSpacing1 = stack.spacing1;
            }
            stack.spacing1 = 0;
            if (!stack.mobileOrigFirstpos1) {
              stack.mobileOrigFirstpos1 = stack.firstpos1;
            }
            stack.firstpos1 = 0;
            if (!stack.mobileOrigSpacing2) {
              stack.mobileOrigSpacing2 = stack.spacing2;
            }
            stack.spacing2 = 0;
            if (!stack.mobileOrigFirstpos2) {
              stack.mobileOrigFirstpos2 = stack.firstpos2;
            }
            stack.firstpos2 = 0;
          } else {
            if (stack.mobileOrigSpacing1) {
              stack.spacing1 = stack.mobileOrigSpacing1;
              delete stack.mobileOrigSpacing1;
            }
            if (stack.mobileOrigFirstpos1) {
              stack.firstpos1 = stack.mobileOrigFirstpos1;
              delete stack.mobileOrigFirstpos1;
            }
            if (stack.mobileOrigSpacing2) {
              stack.spacing2 = stack.mobileOrigSpacing2;
              delete stack.mobileOrigSpacing2;
            }
            if (stack.mobileOrigFirstpos2) {
              stack.firstpos2 = stack.mobileOrigFirstpos2;
              delete stack.mobileOrigFirstpos2;
            }
          }
          switch (stack.dir1) {
            case "down":
              notice.addModuleClass("ui-pnotify-mobile-top");
              break;
            case "up":
              notice.addModuleClass("ui-pnotify-mobile-bottom");
              break;
            case "left":
              notice.addModuleClass("ui-pnotify-mobile-right");
              break;
            case "right":
              notice.addModuleClass("ui-pnotify-mobile-left");
              break;
          }
        }

        notice.addModuleClass("ui-pnotify-mobile-able");
      } else {
        notice.removeModuleClass("ui-pnotify-mobile-able", "ui-pnotify-mobile-top", "ui-pnotify-mobile-bottom", "ui-pnotify-mobile-right", "ui-pnotify-mobile-left");

        if (stack !== false) {
          if (stack.mobileOrigSpacing1) {
            stack.spacing1 = stack.mobileOrigSpacing1;
            delete stack.mobileOrigSpacing1;
          }
          if (stack.mobileOrigFirstpos1) {
            stack.firstpos1 = stack.mobileOrigFirstpos1;
            delete stack.mobileOrigFirstpos1;
          }
          if (stack.mobileOrigSpacing2) {
            stack.spacing2 = stack.mobileOrigSpacing2;
            delete stack.mobileOrigSpacing2;
          }
          if (stack.mobileOrigFirstpos2) {
            stack.firstpos2 = stack.mobileOrigFirstpos2;
            delete stack.mobileOrigFirstpos2;
          }
        }
      }
    }
  };

  function oncreate() {
    this.set({ "_doMobileStylingBound": this.doMobileStyling.bind(this) });
  };

  function setup(Component) {
    Component.key = "Mobile";

    Component.defaults = {
      // Let the user swipe the notice away.
      swipeDismiss: true,
      // Styles the notice to look good on mobile.
      styling: true
    };

    Component.init = function (notice) {
      return new Component({ target: document.body });
    };

    // Register the module with PNotify.
    _PNotify2.default.modules.Mobile = Component;
  };

  function add_css() {
    var style = createElement("style");
    style.id = 'svelte-258392323-style';
    style.textContent = "[ui-pnotify] .ui-pnotify-container{position:relative}[ui-pnotify] .ui-pnotify-mobile-animate-left{transition:left .1s ease}[ui-pnotify] .ui-pnotify-mobile-animate-top{transition:top .1s ease}@media(max-width: 480px){[ui-pnotify].ui-pnotify.ui-pnotify-mobile-able{font-size:1.2em;-webkit-font-smoothing:antialiased;-moz-font-smoothing:antialiased;-ms-font-smoothing:antialiased;font-smoothing:antialiased}body > [ui-pnotify].ui-pnotify.ui-pnotify-mobile-able{position:fixed}[ui-pnotify].ui-pnotify.ui-pnotify-mobile-able.ui-pnotify-mobile-top,[ui-pnotify].ui-pnotify.ui-pnotify-mobile-able.ui-pnotify-mobile-bottom{width:100% !important}[ui-pnotify].ui-pnotify.ui-pnotify-mobile-able.ui-pnotify-mobile-left,[ui-pnotify].ui-pnotify.ui-pnotify-mobile-able.ui-pnotify-mobile-right{height:100% !important}[ui-pnotify].ui-pnotify.ui-pnotify-mobile-able .ui-pnotify-shadow{-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none}[ui-pnotify].ui-pnotify.ui-pnotify-mobile-able.ui-pnotify-mobile-top .ui-pnotify-shadow{border-bottom-width:5px}[ui-pnotify].ui-pnotify.ui-pnotify-mobile-able.ui-pnotify-mobile-bottom .ui-pnotify-shadow{border-top-width:5px}[ui-pnotify].ui-pnotify.ui-pnotify-mobile-able.ui-pnotify-mobile-left .ui-pnotify-shadow{border-right-width:5px}[ui-pnotify].ui-pnotify.ui-pnotify-mobile-able.ui-pnotify-mobile-right .ui-pnotify-shadow{border-left-width:5px}[ui-pnotify].ui-pnotify.ui-pnotify-mobile-able .ui-pnotify-container{-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}[ui-pnotify].ui-pnotify.ui-pnotify-mobile-able.ui-pnotify-mobile-top .ui-pnotify-container,[ui-pnotify].ui-pnotify.ui-pnotify-mobile-able.ui-pnotify-mobile-bottom .ui-pnotify-container{width:auto !important}[ui-pnotify].ui-pnotify.ui-pnotify-mobile-able.ui-pnotify-mobile-left .ui-pnotify-container,[ui-pnotify].ui-pnotify.ui-pnotify-mobile-able.ui-pnotify-mobile-right .ui-pnotify-container{height:100% !important}}";
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

  function PNotifyMobile(options) {
    init(this, options);
    this._state = assign(data(), options.data);

    if (!document.getElementById("svelte-258392323-style")) add_css();

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

  assign(PNotifyMobile.prototype, methods, {
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

  PNotifyMobile.prototype._recompute = noop;

  setup(PNotifyMobile);

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
  exports.default = PNotifyMobile;
});