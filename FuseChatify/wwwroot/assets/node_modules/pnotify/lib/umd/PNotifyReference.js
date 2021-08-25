(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define("PNotifyReference", ["exports", "PNotify"], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require("./PNotify"));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.PNotify);
		global.PNotifyReference = mod.exports;
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
			"_options": {}, // The options for the notice.
			"_mouseIsIn": false
		}, _PNotify2.default.modules.Reference.defaults);
	};

	var methods = {
		initModule: function initModule(options) {
			var _this = this;

			// Set our options.
			this.set(options);
			// Now that the notice is available to us, we can listen to events fired
			// from it.
			this.get("_notice").on("mouseenter", function () {
				return _this.set({ "_mouseIsIn": true });
			});
			this.get("_notice").on("mouseleave", function () {
				return _this.set({ "_mouseIsIn": false });
			});
		},
		doSomething: function doSomething() {
			// Spin the notice around.
			var cur_angle = 0,
			    notice = this.get("_notice"),
			    timer = setInterval(function () {
				cur_angle += 10;
				if (cur_angle == 360) {
					cur_angle = 0;
					clearInterval(timer);
				}
				notice.refs.elem.style.transform = 'rotate(' + cur_angle + 'deg)';
			}, 20);
		},
		update: function update() {
			// Called when the notice is updating its options.
		},
		beforeOpen: function beforeOpen() {
			// Called before the notice is opened.
		},
		afterOpen: function afterOpen() {
			// Called after the notice is opened.
		},
		beforeClose: function beforeClose() {
			// Called before the notice is closed.
		},
		afterClose: function afterClose() {
			// Called after the notice is closed.
		},
		beforeDestroy: function beforeDestroy() {
			// Called before the notice is destroyed.
		},
		afterDestroy: function afterDestroy() {
			// Called after the notice is destroyed.
		}
	};

	function oncreate() {
		// This is the second way to init a module. Because we put markup in the
		// template, we have to fire this event to tell the core that we are ready
		// to receive our options.
		this.fire("init", { module: this });
	};

	function setup(Component) {
		// This is the key you use for registering your module with PNotify.
		Component.key = "Reference";

		// This if the default values of your options.
		Component.defaults = {
			// Provide a thing for stuff. Turned off by default.
			putThing: false,
			// If you are displaying any text, you should use a labels options to
			// support internationalization.
			labels: {
				text: "Spin Around"
			}
		};

		// This is the first way to init a module. If you aren't placing any
		// markup in the template, you would do this.
		// Component.init = (notice) => {
		//   return new Component({target: document.body, data: {
		//     "_notice": notice
		//   }});
		// };

		// Register the module with PNotify.
		_PNotify2.default.modules.Reference = Component;
		// Append our markup to the container.
		_PNotify2.default.modulesAppendContainer.push(Component);

		// This is where you would add any styling or icons classes you are using in your code.
		_extends(_PNotify2.default.icons.brighttheme, {
			athing: "bt-icon bt-icon-refresh"
		});
		_extends(_PNotify2.default.icons.bootstrap3, {
			athing: "glyphicon glyphicon-refresh"
		});
		_extends(_PNotify2.default.icons.fontawesome4, {
			athing: "fa fa-refresh"
		});
		_extends(_PNotify2.default.icons.fontawesome5, {
			athing: "fas fa-sync"
		});
		if (!_PNotify2.default.icons.material) {
			_PNotify2.default.icons.material = {};
		}
		_extends(_PNotify2.default.icons.material, {
			athing: "material-icons pnotify-material-icon-refresh"
		});
	};

	function encapsulateStyles(node) {
		setAttribute(node, "svelte-3806210750", "");
	}

	function add_css() {
		var style = createElement("style");
		style.id = 'svelte-3806210750-style';
		style.textContent = ".ui-pnotify-reference-button[svelte-3806210750]{float:right}.ui-pnotify-reference-clearing[svelte-3806210750]{clear:right;line-height:0}";
		appendNode(style, document.head);
	}

	function create_main_fragment(state, component) {
		var if_block_anchor;

		var if_block = state.putThing && create_if_block(state, component);

		return {
			c: function create() {
				if (if_block) if_block.c();
				if_block_anchor = createComment();
			},

			m: function mount(target, anchor) {
				if (if_block) if_block.m(target, anchor);
				insertNode(if_block_anchor, target, anchor);
			},

			p: function update(changed, state) {
				if (state.putThing) {
					if (if_block) {
						if_block.p(changed, state);
					} else {
						if_block = create_if_block(state, component);
						if_block.c();
						if_block.m(if_block_anchor.parentNode, if_block_anchor);
					}
				} else if (if_block) {
					if_block.u();
					if_block.d();
					if_block = null;
				}
			},

			u: function unmount() {
				if (if_block) if_block.u();
				detachNode(if_block_anchor);
			},

			d: function destroy() {
				if (if_block) if_block.d();
			}
		};
	}

	// (2:0) {{#if putThing}}
	function create_if_block(state, component) {
		var button,
		    i,
		    i_class_value,
		    text,
		    text_1_value = state.labels.text,
		    text_1,
		    button_disabled_value,
		    text_3,
		    div;

		function click_handler(event) {
			component.doSomething();
		}

		return {
			c: function create() {
				button = createElement("button");
				i = createElement("i");
				text = createText(" ");
				text_1 = createText(text_1_value);
				text_3 = createText("\n  \n  ");
				div = createElement("div");
				this.h();
			},

			h: function hydrate() {
				encapsulateStyles(button);
				encapsulateStyles(i);
				i.className = i_class_value = state._notice.get('_icons').athing;
				button.className = "ui-pnotify-reference-button btn btn-default";
				button.type = "button";
				button.disabled = button_disabled_value = !state._mouseIsIn;
				addListener(button, "click", click_handler);
				encapsulateStyles(div);
				div.className = "ui-pnotify-reference-clearing";
			},

			m: function mount(target, anchor) {
				insertNode(button, target, anchor);
				appendNode(i, button);
				appendNode(text, button);
				appendNode(text_1, button);
				component.refs.thingElem = button;
				insertNode(text_3, target, anchor);
				insertNode(div, target, anchor);
			},

			p: function update(changed, state) {
				if (changed._notice && i_class_value !== (i_class_value = state._notice.get('_icons').athing)) {
					i.className = i_class_value;
				}

				if (changed.labels && text_1_value !== (text_1_value = state.labels.text)) {
					text_1.data = text_1_value;
				}

				if (changed._mouseIsIn && button_disabled_value !== (button_disabled_value = !state._mouseIsIn)) {
					button.disabled = button_disabled_value;
				}
			},

			u: function unmount() {
				detachNode(button);
				detachNode(text_3);
				detachNode(div);
			},

			d: function destroy() {
				removeListener(button, "click", click_handler);
				if (component.refs.thingElem === button) component.refs.thingElem = null;
			}
		};
	}

	function PNotifyReference(options) {
		init(this, options);
		this.refs = {};
		this._state = assign(data(), options.data);

		if (!document.getElementById("svelte-3806210750-style")) add_css();

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

	assign(PNotifyReference.prototype, methods, {
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

	PNotifyReference.prototype._recompute = noop;

	setup(PNotifyReference);

	function setAttribute(node, attribute, value) {
		node.setAttribute(attribute, value);
	}

	function createElement(name) {
		return document.createElement(name);
	}

	function appendNode(node, target) {
		target.appendChild(node);
	}

	function createComment() {
		return document.createComment('');
	}

	function insertNode(node, target, anchor) {
		target.insertBefore(node, anchor);
	}

	function detachNode(node) {
		node.parentNode.removeChild(node);
	}

	function createText(data) {
		return document.createTextNode(data);
	}

	function addListener(node, event, handler) {
		node.addEventListener(event, handler, false);
	}

	function removeListener(node, event, handler) {
		node.removeEventListener(event, handler, false);
	}

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

	function noop() {}

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
	exports.default = PNotifyReference;
});