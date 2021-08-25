;

(function () {
  'use strict';

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _get2 = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
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

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var PNotify = window.PNotify;

  // Translate v3 options to v4 options.
  var translateOptions = function translateOptions(options, module, moduleName) {
    // Merge the classic default options.
    var newOptions = module ? _extends({}, moduleName ? PNotifyCompat.prototype.options[moduleName] : {}, options) : _extends({}, PNotifyCompat.prototype.options, options);
    var translateName = function translateName(badName) {
      var goodName = badName,
          underscoreIndex = void 0;
      while ((underscoreIndex = goodName.indexOf('_')) !== -1) {
        goodName = goodName.slice(0, underscoreIndex) + goodName.slice(underscoreIndex + 1, underscoreIndex + 2).toUpperCase() + goodName.slice(underscoreIndex + 2);
      }
      return goodName;
    };

    // Translate all options to the new style.
    for (var name in newOptions) {
      if (newOptions.hasOwnProperty(name) && name.indexOf('_') !== -1) {
        var goodName = translateName(name);
        newOptions[goodName] = newOptions[name];
        delete newOptions[name];
      }
    }

    if (!module) {
      // Options that have changed.
      if (newOptions.hasOwnProperty('addclass')) {
        newOptions.addClass = newOptions.addclass;
        delete newOptions.addclass;
      }
      if (newOptions.hasOwnProperty('cornerclass')) {
        newOptions.cornerClass = newOptions.cornerclass;
        delete newOptions.cornerClass;
      }
      if (newOptions.hasOwnProperty('textEscape')) {
        newOptions.textTrusted = !newOptions.textEscape;
        delete newOptions.textEscape;
      }
      if (newOptions.hasOwnProperty('titleEscape')) {
        newOptions.titleTrusted = !newOptions.titleEscape;
        delete newOptions.titleEscape;
      }

      // Styling and icons.
      if (newOptions.hasOwnProperty('styling')) {
        if (newOptions.styling === 'bootstrap3') {
          newOptions.icons = 'bootstrap3';
        } else if (newOptions.styling === 'fontawesome') {
          newOptions.styling = 'bootstrap3';
          newOptions.icons = 'fontawesome4';
        }
      }

      // Stacks.
      if (newOptions.hasOwnProperty('stack')) {
        if (newOptions.stack.overlay_close) {
          newOptions.stack.overlayClose = newOptions.stack.overlay_close;
        }
      }

      // Translate module options.
      newOptions.modules = {};
      if (newOptions.hasOwnProperty('animate')) {
        newOptions.modules.Animate = translateOptions(newOptions.animate, true, 'animate');
        delete newOptions.animate;
      }
      if (newOptions.hasOwnProperty('buttons')) {
        newOptions.modules.Buttons = translateOptions(newOptions.buttons, true, 'buttons');
        delete newOptions.buttons;
        if (newOptions.modules.Buttons.classes) {
          newOptions.modules.Buttons.classes = translateOptions(newOptions.modules.Buttons.classes, true);
        }
      }
      if (newOptions.hasOwnProperty('confirm')) {
        newOptions.modules.Confirm = translateOptions(newOptions.confirm, true, 'confirm');
        delete newOptions.confirm;
      }
      if (newOptions.hasOwnProperty('desktop')) {
        newOptions.modules.Desktop = translateOptions(newOptions.desktop, true, 'desktop');
        delete newOptions.desktop;
      }
      if (newOptions.hasOwnProperty('history')) {
        newOptions.modules.History = translateOptions(newOptions.history, true, 'history');
        delete newOptions.history;
      }
      if (newOptions.hasOwnProperty('mobile')) {
        newOptions.modules.Mobile = translateOptions(newOptions.mobile, true, 'mobile');
        delete newOptions.mobile;
      }
      if (newOptions.hasOwnProperty('nonblock')) {
        newOptions.modules.NonBlock = translateOptions(newOptions.nonblock, true, 'nonblock');
        delete newOptions.nonblock;
      }
      if (newOptions.hasOwnProperty('reference')) {
        newOptions.modules.Reference = translateOptions(newOptions.reference, true, 'reference');
        delete newOptions.reference;
      }
      if (newOptions.hasOwnProperty('beforeInit')) {
        if (!newOptions.modules.Callbacks) {
          newOptions.modules.Callbacks = {};
        }
        newOptions.modules.Callbacks.beforeInit = newOptions.beforeInit;
        delete newOptions.beforeInit;
      }
      if (newOptions.hasOwnProperty('afterInit')) {
        if (!newOptions.modules.Callbacks) {
          newOptions.modules.Callbacks = {};
        }
        newOptions.modules.Callbacks.afterInit = newOptions.afterInit;
        delete newOptions.afterInit;
      }
      if (newOptions.hasOwnProperty('beforeOpen')) {
        if (!newOptions.modules.Callbacks) {
          newOptions.modules.Callbacks = {};
        }
        newOptions.modules.Callbacks.beforeOpen = newOptions.beforeOpen;
        delete newOptions.beforeOpen;
      }
      if (newOptions.hasOwnProperty('afterOpen')) {
        if (!newOptions.modules.Callbacks) {
          newOptions.modules.Callbacks = {};
        }
        newOptions.modules.Callbacks.afterOpen = newOptions.afterOpen;
        delete newOptions.afterOpen;
      }
      if (newOptions.hasOwnProperty('beforeClose')) {
        if (!newOptions.modules.Callbacks) {
          newOptions.modules.Callbacks = {};
        }
        newOptions.modules.Callbacks.beforeClose = newOptions.beforeClose;
        delete newOptions.beforeClose;
      }
      if (newOptions.hasOwnProperty('afterClose')) {
        if (!newOptions.modules.Callbacks) {
          newOptions.modules.Callbacks = {};
        }
        newOptions.modules.Callbacks.afterClose = newOptions.afterClose;
        delete newOptions.afterClose;
      }
    }

    return newOptions;
  };

  // The compatibility class.

  var PNotifyCompat = function (_PNotify) {
    _inherits(PNotifyCompat, _PNotify);

    function PNotifyCompat(options) {
      _classCallCheck(this, PNotifyCompat);

      if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== "object") {
        options = { "text": options };
      }

      // These need to be called directly, since we're not using PNotify.alert().
      if (PNotify.modules.Callbacks && options.before_init) {
        options.before_init(options);
      }

      options = translateOptions(options);

      var _this = _possibleConstructorReturn(this, (PNotifyCompat.__proto__ || Object.getPrototypeOf(PNotifyCompat)).call(this, { target: document.body, data: options }));

      // Override the get function to retunr the element like it did in v3.
      var _get = _this.get;
      _this.get = function (option) {
        if (option === undefined) {
          return _extends(window.jQuery ? window.jQuery(this.refs.elem) : this.refs.elem, _get.call(this));
        }
        return _get.call(this, option);
      };

      // Confirm module events.
      _this.on('pnotify.confirm', function (e) {
        if (window.jQuery) {
          window.jQuery(_this.refs.elem).trigger('pnotify.confirm', [_this, e.value]);
        }
      });
      _this.on('pnotify.cancel', function (e) {
        if (window.jQuery) {
          window.jQuery(_this.refs.elem).trigger('pnotify.cancel', _this);
        }
      });

      if (PNotify.modules.Callbacks) {
        PNotify.modules.Callbacks.getCallbacks(_this, null, 'afterInit')(_this);
      }
      return _this;
    }

    _createClass(PNotifyCompat, [{
      key: 'update',
      value: function update(options) {
        options = translateOptions(options);
        return _get2(PNotifyCompat.prototype.__proto__ || Object.getPrototypeOf(PNotifyCompat.prototype), 'update', this).call(this, options);
      }
    }]);

    return PNotifyCompat;
  }(PNotify);

  // Lets you change defaults the old way.
  PNotifyCompat.prototype.options = {
    text_escape: false,
    title_escape: false
  };

  // Forward static functions.
  PNotifyCompat.reload = function () {
    return PNotifyCompat;
  };
  PNotifyCompat.removeAll = function () {
    return PNotify.removeAll();
  };
  PNotifyCompat.removeStack = function (stack) {
    return PNotify.removeStack(stack);
  };
  PNotifyCompat.positionAll = function (animate) {
    return PNotify.positionAll(animate);
  };

  // Desktop module permission method.
  PNotifyCompat.desktop = {
    permission: function permission() {
      PNotify.modules.Desktop.permission();
    }
  };

  // Old style showLast() in History module.
  if (window.jQuery) {
    window.jQuery(function () {
      window.jQuery(document.body).on('pnotify.history-last', function () {
        PNotify.modules.History.showLast();
      });
    });
  }

  window.PNotifyCompat = PNotifyCompat;
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBOb3RpZnlDb21wYXQuanMiXSwibmFtZXMiOlsiUE5vdGlmeSIsIndpbmRvdyIsInRyYW5zbGF0ZU9wdGlvbnMiLCJvcHRpb25zIiwibW9kdWxlIiwibW9kdWxlTmFtZSIsIm5ld09wdGlvbnMiLCJQTm90aWZ5Q29tcGF0IiwicHJvdG90eXBlIiwidHJhbnNsYXRlTmFtZSIsImJhZE5hbWUiLCJnb29kTmFtZSIsInVuZGVyc2NvcmVJbmRleCIsImluZGV4T2YiLCJzbGljZSIsInRvVXBwZXJDYXNlIiwibmFtZSIsImhhc093blByb3BlcnR5IiwiYWRkQ2xhc3MiLCJhZGRjbGFzcyIsImNvcm5lckNsYXNzIiwiY29ybmVyY2xhc3MiLCJ0ZXh0VHJ1c3RlZCIsInRleHRFc2NhcGUiLCJ0aXRsZVRydXN0ZWQiLCJ0aXRsZUVzY2FwZSIsInN0eWxpbmciLCJpY29ucyIsInN0YWNrIiwib3ZlcmxheV9jbG9zZSIsIm92ZXJsYXlDbG9zZSIsIm1vZHVsZXMiLCJBbmltYXRlIiwiYW5pbWF0ZSIsIkJ1dHRvbnMiLCJidXR0b25zIiwiY2xhc3NlcyIsIkNvbmZpcm0iLCJjb25maXJtIiwiRGVza3RvcCIsImRlc2t0b3AiLCJIaXN0b3J5IiwiaGlzdG9yeSIsIk1vYmlsZSIsIm1vYmlsZSIsIk5vbkJsb2NrIiwibm9uYmxvY2siLCJSZWZlcmVuY2UiLCJyZWZlcmVuY2UiLCJDYWxsYmFja3MiLCJiZWZvcmVJbml0IiwiYWZ0ZXJJbml0IiwiYmVmb3JlT3BlbiIsImFmdGVyT3BlbiIsImJlZm9yZUNsb3NlIiwiYWZ0ZXJDbG9zZSIsImJlZm9yZV9pbml0IiwidGFyZ2V0IiwiZG9jdW1lbnQiLCJib2R5IiwiZGF0YSIsIl9nZXQiLCJnZXQiLCJvcHRpb24iLCJ1bmRlZmluZWQiLCJqUXVlcnkiLCJyZWZzIiwiZWxlbSIsImNhbGwiLCJvbiIsImUiLCJ0cmlnZ2VyIiwidmFsdWUiLCJnZXRDYWxsYmFja3MiLCJ0ZXh0X2VzY2FwZSIsInRpdGxlX2VzY2FwZSIsInJlbG9hZCIsInJlbW92ZUFsbCIsInJlbW92ZVN0YWNrIiwicG9zaXRpb25BbGwiLCJwZXJtaXNzaW9uIiwic2hvd0xhc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBSUEsVUFBVUMsT0FBT0QsT0FBckI7O0FBRUE7QUFDQSxNQUFNRSxtQkFBbUIsU0FBbkJBLGdCQUFtQixDQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBa0JDLFVBQWxCLEVBQWlDO0FBQ3hEO0FBQ0EsUUFBTUMsYUFBYUYsU0FBUyxTQUFjLEVBQWQsRUFBa0JDLGFBQWFFLGNBQWNDLFNBQWQsQ0FBd0JMLE9BQXhCLENBQWdDRSxVQUFoQyxDQUFiLEdBQTJELEVBQTdFLEVBQWlGRixPQUFqRixDQUFULEdBQXFHLFNBQWMsRUFBZCxFQUFrQkksY0FBY0MsU0FBZCxDQUF3QkwsT0FBMUMsRUFBbURBLE9BQW5ELENBQXhIO0FBQ0EsUUFBTU0sZ0JBQWdCLFNBQWhCQSxhQUFnQixDQUFDQyxPQUFELEVBQWE7QUFDakMsVUFBSUMsV0FBV0QsT0FBZjtBQUFBLFVBQXdCRSx3QkFBeEI7QUFDQSxhQUFPLENBQUNBLGtCQUFrQkQsU0FBU0UsT0FBVCxDQUFpQixHQUFqQixDQUFuQixNQUE4QyxDQUFDLENBQXRELEVBQXlEO0FBQ3ZERixtQkFBV0EsU0FBU0csS0FBVCxDQUFlLENBQWYsRUFBa0JGLGVBQWxCLElBQXFDRCxTQUFTRyxLQUFULENBQWVGLGtCQUFrQixDQUFqQyxFQUFvQ0Esa0JBQWtCLENBQXRELEVBQXlERyxXQUF6RCxFQUFyQyxHQUE4R0osU0FBU0csS0FBVCxDQUFlRixrQkFBa0IsQ0FBakMsQ0FBekg7QUFDRDtBQUNELGFBQU9ELFFBQVA7QUFDRCxLQU5EOztBQVFBO0FBQ0EsU0FBSyxJQUFJSyxJQUFULElBQWlCVixVQUFqQixFQUE2QjtBQUMzQixVQUFJQSxXQUFX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VjtBQUNBLHFJQUFvQkEsT0FBcEI7QUFDRDs7OztJQTVDeUJILE87O0FBK0M1QjtBQUNBTyxnQkFBY0MsU0FBZCxDQUF3QkwsT0FBeEIsR0FBa0M7QUFDaEN1RSxpQkFBYSxLQURtQjtBQUVoQ0Msa0JBQWM7QUFGa0IsR0FBbEM7O0FBS0E7QUFDQXBFLGdCQUFjcUUsTUFBZCxHQUF1QjtBQUFBLFdBQU1yRSxhQUFOO0FBQUEsR0FBdkI7QUFDQUEsZ0JBQWNzRSxTQUFkLEdBQTBCO0FBQUEsV0FBTTdFLFFBQVE2RSxTQUFSLEVBQU47QUFBQSxHQUExQjtBQUNBdEUsZ0JBQWN1RSxXQUFkLEdBQTRCLFVBQUNsRCxLQUFEO0FBQUEsV0FBVzVCLFFBQVE4RSxXQUFSLENBQW9CbEQsS0FBcEIsQ0FBWDtBQUFBLEdBQTVCO0FBQ0FyQixnQkFBY3dFLFdBQWQsR0FBNEIsVUFBQzlDLE9BQUQ7QUFBQSxXQUFhakMsUUFBUStFLFdBQVIsQ0FBb0I5QyxPQUFwQixDQUFiO0FBQUEsR0FBNUI7O0FBRUE7QUFDQTFCLGdCQUFjaUMsT0FBZCxHQUF3QjtBQUN0QndDLGdCQUFZLHNCQUFNO0FBQ2hCaEYsY0FBUStCLE9BQVIsQ0FBZ0JRLE9BQWhCLENBQXdCeUMsVUFBeEI7QUFDRDtBQUhxQixHQUF4Qjs7QUFNQTtBQUNBLE1BQUkvRSxPQUFPZ0UsTUFBWCxFQUFtQjtBQUNqQmhFLFdBQU9nRSxNQUFQLENBQWMsWUFBTTtBQUNsQmhFLGFBQU9nRSxNQUFQLENBQWNQLFNBQVNDLElBQXZCLEVBQTZCVSxFQUE3QixDQUFnQyxzQkFBaEMsRUFBd0QsWUFBVztBQUNqRXJFLGdCQUFRK0IsT0FBUixDQUFnQlUsT0FBaEIsQ0FBd0J3QyxRQUF4QjtBQUNELE9BRkQ7QUFHRCxLQUpEO0FBS0Q7O0FBRURoRixTQUFPTSxhQUFQLEdBQXVCQSxhQUF2QiIsImZpbGUiOiJzcmMvUE5vdGlmeUNvbXBhdC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgUE5vdGlmeSA9IHdpbmRvdy5QTm90aWZ5O1xuXG4vLyBUcmFuc2xhdGUgdjMgb3B0aW9ucyB0byB2NCBvcHRpb25zLlxuY29uc3QgdHJhbnNsYXRlT3B0aW9ucyA9IChvcHRpb25zLCBtb2R1bGUsIG1vZHVsZU5hbWUpID0+IHtcbiAgLy8gTWVyZ2UgdGhlIGNsYXNzaWMgZGVmYXVsdCBvcHRpb25zLlxuICBjb25zdCBuZXdPcHRpb25zID0gbW9kdWxlID8gT2JqZWN0LmFzc2lnbih7fSwgbW9kdWxlTmFtZSA/IFBOb3RpZnlDb21wYXQucHJvdG90eXBlLm9wdGlvbnNbbW9kdWxlTmFtZV0gOiB7fSwgb3B0aW9ucykgOiBPYmplY3QuYXNzaWduKHt9LCBQTm90aWZ5Q29tcGF0LnByb3RvdHlwZS5vcHRpb25zLCBvcHRpb25zKTtcbiAgY29uc3QgdHJhbnNsYXRlTmFtZSA9IChiYWROYW1lKSA9PiB7XG4gICAgbGV0IGdvb2ROYW1lID0gYmFkTmFtZSwgdW5kZXJzY29yZUluZGV4O1xuICAgIHdoaWxlICgodW5kZXJzY29yZUluZGV4ID0gZ29vZE5hbWUuaW5kZXhPZignXycpKSAhPT0gLTEpIHtcbiAgICAgIGdvb2ROYW1lID0gZ29vZE5hbWUuc2xpY2UoMCwgdW5kZXJzY29yZUluZGV4KSArIGdvb2ROYW1lLnNsaWNlKHVuZGVyc2NvcmVJbmRleCArIDEsIHVuZGVyc2NvcmVJbmRleCArIDIpLnRvVXBwZXJDYXNlKCkgKyBnb29kTmFtZS5zbGljZSh1bmRlcnNjb3JlSW5kZXggKyAyKTtcbiAgICB9XG4gICAgcmV0dXJuIGdvb2ROYW1lO1xuICB9O1xuXG4gIC8vIFRyYW5zbGF0ZSBhbGwgb3B0aW9ucyB0byB0aGUgbmV3IHN0eWxlLlxuICBmb3IgKGxldCBuYW1lIGluIG5ld09wdGlvbnMpIHtcbiAgICBpZiAobmV3T3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShuYW1lKSAmJiBuYW1lLmluZGV4T2YoJ18nKSAhPT0gLTEpIHtcbiAgICAgIGNvbnN0IGdvb2ROYW1lID0gdHJhbnNsYXRlTmFtZShuYW1lKTtcbiAgICAgIG5ld09wdGlvbnNbZ29vZE5hbWVdID0gbmV3T3B0aW9uc1tuYW1lXTtcbiAgICAgIGRlbGV0ZSBuZXdPcHRpb25zW25hbWVdO1xuICAgIH1cbiAgfVxuXG4gIGlmICghbW9kdWxlKSB7XG4gICAgLy8gT3B0aW9ucyB0aGF0IGhhdmUgY2hhbmdlZC5cbiAgICBpZiAobmV3T3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYWRkY2xhc3MnKSkge1xuICAgICAgbmV3T3B0aW9ucy5hZGRDbGFzcyA9IG5ld09wdGlvbnMuYWRkY2xhc3M7XG4gICAgICBkZWxldGUgbmV3T3B0aW9ucy5hZGRjbGFzcztcbiAgICB9XG4gICAgaWYgKG5ld09wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2Nvcm5lcmNsYXNzJykpIHtcbiAgICAgIG5ld09wdGlvbnMuY29ybmVyQ2xhc3MgPSBuZXdPcHRpb25zLmNvcm5lcmNsYXNzO1xuICAgICAgZGVsZXRlIG5ld09wdGlvbnMuY29ybmVyQ2xhc3M7XG4gICAgfVxuICAgIGlmIChuZXdPcHRpb25zLmhhc093blByb3BlcnR5KCd0ZXh0RXNjYXBlJykpIHtcbiAgICAgIG5ld09wdGlvbnMudGV4dFRydXN0ZWQgPSAhbmV3T3B0aW9ucy50ZXh0RXNjYXBlO1xuICAgICAgZGVsZXRlIG5ld09wdGlvbnMudGV4dEVzY2FwZTtcbiAgICB9XG4gICAgaWYgKG5ld09wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3RpdGxlRXNjYXBlJykpIHtcbiAgICAgIG5ld09wdGlvbnMudGl0bGVUcnVzdGVkID0gIW5ld09wdGlvbnMudGl0bGVFc2NhcGU7XG4gICAgICBkZWxldGUgbmV3T3B0aW9ucy50aXRsZUVzY2FwZTtcbiAgICB9XG5cbiAgICAvLyBTdHlsaW5nIGFuZCBpY29ucy5cbiAgICBpZiAobmV3T3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnc3R5bGluZycpKSB7XG4gICAgICBpZiAobmV3T3B0aW9ucy5zdHlsaW5nID09PSAnYm9vdHN0cmFwMycpIHtcbiAgICAgICAgbmV3T3B0aW9ucy5pY29ucyA9ICdib290c3RyYXAzJztcbiAgICAgIH0gZWxzZSBpZiAobmV3T3B0aW9ucy5zdHlsaW5nID09PSAnZm9udGF3ZXNvbWUnKSB7XG4gICAgICAgIG5ld09wdGlvbnMuc3R5bGluZyA9ICdib290c3RyYXAzJztcbiAgICAgICAgbmV3T3B0aW9ucy5pY29ucyA9ICdmb250YXdlc29tZTQnO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFN0YWNrcy5cbiAgICBpZiAobmV3T3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnc3RhY2snKSkge1xuICAgICAgaWYgKG5ld09wdGlvbnMuc3RhY2sub3ZlcmxheV9jbG9zZSkge1xuICAgICAgICBuZXdPcHRpb25zLnN0YWNrLm92ZXJsYXlDbG9zZSA9IG5ld09wdGlvbnMuc3RhY2sub3ZlcmxheV9jbG9zZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBUcmFuc2xhdGUgbW9kdWxlIG9wdGlvbnMuXG4gICAgbmV3T3B0aW9ucy5tb2R1bGVzID0ge307XG4gICAgaWYgKG5ld09wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2FuaW1hdGUnKSkge1xuICAgICAgbmV3T3B0aW9ucy5tb2R1bGVzLkFuaW1hdGUgPSB0cmFuc2xhdGVPcHRpb25zKG5ld09wdGlvbnMuYW5pbWF0ZSwgdHJ1ZSwgJ2FuaW1hdGUnKTtcbiAgICAgIGRlbGV0ZSBuZXdPcHRpb25zLmFuaW1hdGU7XG4gICAgfVxuICAgIGlmIChuZXdPcHRpb25zLmhhc093blByb3BlcnR5KCdidXR0b25zJykpIHtcbiAgICAgIG5ld09wdGlvbnMubW9kdWxlcy5CdXR0b25zID0gdHJhbnNsYXRlT3B0aW9ucyhuZXdPcHRpb25zLmJ1dHRvbnMsIHRydWUsICdidXR0b25zJyk7XG4gICAgICBkZWxldGUgbmV3T3B0aW9ucy5idXR0b25zO1xuICAgICAgaWYgKG5ld09wdGlvbnMubW9kdWxlcy5CdXR0b25zLmNsYXNzZXMpIHtcbiAgICAgICAgbmV3T3B0aW9ucy5tb2R1bGVzLkJ1dHRvbnMuY2xhc3NlcyA9IHRyYW5zbGF0ZU9wdGlvbnMobmV3T3B0aW9ucy5tb2R1bGVzLkJ1dHRvbnMuY2xhc3NlcywgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChuZXdPcHRpb25zLmhhc093blByb3BlcnR5KCdjb25maXJtJykpIHtcbiAgICAgIG5ld09wdGlvbnMubW9kdWxlcy5Db25maXJtID0gdHJhbnNsYXRlT3B0aW9ucyhuZXdPcHRpb25zLmNvbmZpcm0sIHRydWUsICdjb25maXJtJyk7XG4gICAgICBkZWxldGUgbmV3T3B0aW9ucy5jb25maXJtO1xuICAgIH1cbiAgICBpZiAobmV3T3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnZGVza3RvcCcpKSB7XG4gICAgICBuZXdPcHRpb25zLm1vZHVsZXMuRGVza3RvcCA9IHRyYW5zbGF0ZU9wdGlvbnMobmV3T3B0aW9ucy5kZXNrdG9wLCB0cnVlLCAnZGVza3RvcCcpO1xuICAgICAgZGVsZXRlIG5ld09wdGlvbnMuZGVza3RvcDtcbiAgICB9XG4gICAgaWYgKG5ld09wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2hpc3RvcnknKSkge1xuICAgICAgbmV3T3B0aW9ucy5tb2R1bGVzLkhpc3RvcnkgPSB0cmFuc2xhdGVPcHRpb25zKG5ld09wdGlvbnMuaGlzdG9yeSwgdHJ1ZSwgJ2hpc3RvcnknKTtcbiAgICAgIGRlbGV0ZSBuZXdPcHRpb25zLmhpc3Rvcnk7XG4gICAgfVxuICAgIGlmIChuZXdPcHRpb25zLmhhc093blByb3BlcnR5KCdtb2JpbGUnKSkge1xuICAgICAgbmV3T3B0aW9ucy5tb2R1bGVzLk1vYmlsZSA9IHRyYW5zbGF0ZU9wdGlvbnMobmV3T3B0aW9ucy5tb2JpbGUsIHRydWUsICdtb2JpbGUnKTtcbiAgICAgIGRlbGV0ZSBuZXdPcHRpb25zLm1vYmlsZTtcbiAgICB9XG4gICAgaWYgKG5ld09wdGlvbnMuaGFzT3duUHJvcGVydHkoJ25vbmJsb2NrJykpIHtcbiAgICAgIG5ld09wdGlvbnMubW9kdWxlcy5Ob25CbG9jayA9IHRyYW5zbGF0ZU9wdGlvbnMobmV3T3B0aW9ucy5ub25ibG9jaywgdHJ1ZSwgJ25vbmJsb2NrJyk7XG4gICAgICBkZWxldGUgbmV3T3B0aW9ucy5ub25ibG9jaztcbiAgICB9XG4gICAgaWYgKG5ld09wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3JlZmVyZW5jZScpKSB7XG4gICAgICBuZXdPcHRpb25zLm1vZHVsZXMuUmVmZXJlbmNlID0gdHJhbnNsYXRlT3B0aW9ucyhuZXdPcHRpb25zLnJlZmVyZW5jZSwgdHJ1ZSwgJ3JlZmVyZW5jZScpO1xuICAgICAgZGVsZXRlIG5ld09wdGlvbnMucmVmZXJlbmNlO1xuICAgIH1cbiAgICBpZiAobmV3T3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYmVmb3JlSW5pdCcpKSB7XG4gICAgICBpZiAoIW5ld09wdGlvbnMubW9kdWxlcy5DYWxsYmFja3MpIHtcbiAgICAgICAgbmV3T3B0aW9ucy5tb2R1bGVzLkNhbGxiYWNrcyA9IHt9O1xuICAgICAgfVxuICAgICAgbmV3T3B0aW9ucy5tb2R1bGVzLkNhbGxiYWNrcy5iZWZvcmVJbml0ID0gbmV3T3B0aW9ucy5iZWZvcmVJbml0O1xuICAgICAgZGVsZXRlIG5ld09wdGlvbnMuYmVmb3JlSW5pdDtcbiAgICB9XG4gICAgaWYgKG5ld09wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2FmdGVySW5pdCcpKSB7XG4gICAgICBpZiAoIW5ld09wdGlvbnMubW9kdWxlcy5DYWxsYmFja3MpIHtcbiAgICAgICAgbmV3T3B0aW9ucy5tb2R1bGVzLkNhbGxiYWNrcyA9IHt9O1xuICAgICAgfVxuICAgICAgbmV3T3B0aW9ucy5tb2R1bGVzLkNhbGxiYWNrcy5hZnRlckluaXQgPSBuZXdPcHRpb25zLmFmdGVySW5pdDtcbiAgICAgIGRlbGV0ZSBuZXdPcHRpb25zLmFmdGVySW5pdDtcbiAgICB9XG4gICAgaWYgKG5ld09wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2JlZm9yZU9wZW4nKSkge1xuICAgICAgaWYgKCFuZXdPcHRpb25zLm1vZHVsZXMuQ2FsbGJhY2tzKSB7XG4gICAgICAgIG5ld09wdGlvbnMubW9kdWxlcy5DYWxsYmFja3MgPSB7fTtcbiAgICAgIH1cbiAgICAgIG5ld09wdGlvbnMubW9kdWxlcy5DYWxsYmFja3MuYmVmb3JlT3BlbiA9IG5ld09wdGlvbnMuYmVmb3JlT3BlbjtcbiAgICAgIGRlbGV0ZSBuZXdPcHRpb25zLmJlZm9yZU9wZW47XG4gICAgfVxuICAgIGlmIChuZXdPcHRpb25zLmhhc093blByb3BlcnR5KCdhZnRlck9wZW4nKSkge1xuICAgICAgaWYgKCFuZXdPcHRpb25zLm1vZHVsZXMuQ2FsbGJhY2tzKSB7XG4gICAgICAgIG5ld09wdGlvbnMubW9kdWxlcy5DYWxsYmFja3MgPSB7fTtcbiAgICAgIH1cbiAgICAgIG5ld09wdGlvbnMubW9kdWxlcy5DYWxsYmFja3MuYWZ0ZXJPcGVuID0gbmV3T3B0aW9ucy5hZnRlck9wZW47XG4gICAgICBkZWxldGUgbmV3T3B0aW9ucy5hZnRlck9wZW47XG4gICAgfVxuICAgIGlmIChuZXdPcHRpb25zLmhhc093blByb3BlcnR5KCdiZWZvcmVDbG9zZScpKSB7XG4gICAgICBpZiAoIW5ld09wdGlvbnMubW9kdWxlcy5DYWxsYmFja3MpIHtcbiAgICAgICAgbmV3T3B0aW9ucy5tb2R1bGVzLkNhbGxiYWNrcyA9IHt9O1xuICAgICAgfVxuICAgICAgbmV3T3B0aW9ucy5tb2R1bGVzLkNhbGxiYWNrcy5iZWZvcmVDbG9zZSA9IG5ld09wdGlvbnMuYmVmb3JlQ2xvc2U7XG4gICAgICBkZWxldGUgbmV3T3B0aW9ucy5iZWZvcmVDbG9zZTtcbiAgICB9XG4gICAgaWYgKG5ld09wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2FmdGVyQ2xvc2UnKSkge1xuICAgICAgaWYgKCFuZXdPcHRpb25zLm1vZHVsZXMuQ2FsbGJhY2tzKSB7XG4gICAgICAgIG5ld09wdGlvbnMubW9kdWxlcy5DYWxsYmFja3MgPSB7fTtcbiAgICAgIH1cbiAgICAgIG5ld09wdGlvbnMubW9kdWxlcy5DYWxsYmFja3MuYWZ0ZXJDbG9zZSA9IG5ld09wdGlvbnMuYWZ0ZXJDbG9zZTtcbiAgICAgIGRlbGV0ZSBuZXdPcHRpb25zLmFmdGVyQ2xvc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ld09wdGlvbnM7XG59XG5cbi8vIFRoZSBjb21wYXRpYmlsaXR5IGNsYXNzLlxuY2xhc3MgUE5vdGlmeUNvbXBhdCBleHRlbmRzIFBOb3RpZnkge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICBvcHRpb25zID0ge1widGV4dFwiOiBvcHRpb25zfTtcbiAgICB9XG5cbiAgICAvLyBUaGVzZSBuZWVkIHRvIGJlIGNhbGxlZCBkaXJlY3RseSwgc2luY2Ugd2UncmUgbm90IHVzaW5nIFBOb3RpZnkuYWxlcnQoKS5cbiAgICBpZiAoUE5vdGlmeS5tb2R1bGVzLkNhbGxiYWNrcyAmJiBvcHRpb25zLmJlZm9yZV9pbml0KSB7XG4gICAgICBvcHRpb25zLmJlZm9yZV9pbml0KG9wdGlvbnMpO1xuICAgIH1cblxuICAgIG9wdGlvbnMgPSB0cmFuc2xhdGVPcHRpb25zKG9wdGlvbnMpO1xuXG4gICAgc3VwZXIoe3RhcmdldDogZG9jdW1lbnQuYm9keSwgZGF0YTogb3B0aW9uc30pO1xuXG4gICAgLy8gT3ZlcnJpZGUgdGhlIGdldCBmdW5jdGlvbiB0byByZXR1bnIgdGhlIGVsZW1lbnQgbGlrZSBpdCBkaWQgaW4gdjMuXG4gICAgY29uc3QgX2dldCA9IHRoaXMuZ2V0O1xuICAgIHRoaXMuZ2V0ID0gZnVuY3Rpb24ob3B0aW9uKSB7XG4gICAgICBpZiAob3B0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24od2luZG93LmpRdWVyeSA/IHdpbmRvdy5qUXVlcnkodGhpcy5yZWZzLmVsZW0pIDogdGhpcy5yZWZzLmVsZW0sIF9nZXQuY2FsbCh0aGlzKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gX2dldC5jYWxsKHRoaXMsIG9wdGlvbik7XG4gICAgfTtcblxuICAgIC8vIENvbmZpcm0gbW9kdWxlIGV2ZW50cy5cbiAgICB0aGlzLm9uKCdwbm90aWZ5LmNvbmZpcm0nLCAoZSkgPT4ge1xuICAgICAgaWYgKHdpbmRvdy5qUXVlcnkpIHtcbiAgICAgICAgd2luZG93LmpRdWVyeSh0aGlzLnJlZnMuZWxlbSkudHJpZ2dlcigncG5vdGlmeS5jb25maXJtJywgW3RoaXMsIGUudmFsdWVdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLm9uKCdwbm90aWZ5LmNhbmNlbCcsIChlKSA9PiB7XG4gICAgICBpZiAod2luZG93LmpRdWVyeSkge1xuICAgICAgICB3aW5kb3cualF1ZXJ5KHRoaXMucmVmcy5lbGVtKS50cmlnZ2VyKCdwbm90aWZ5LmNhbmNlbCcsIHRoaXMpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKFBOb3RpZnkubW9kdWxlcy5DYWxsYmFja3MpIHtcbiAgICAgIFBOb3RpZnkubW9kdWxlcy5DYWxsYmFja3MuZ2V0Q2FsbGJhY2tzKHRoaXMsIG51bGwsICdhZnRlckluaXQnKSh0aGlzKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGUob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB0cmFuc2xhdGVPcHRpb25zKG9wdGlvbnMpO1xuICAgIHJldHVybiBzdXBlci51cGRhdGUob3B0aW9ucyk7XG4gIH1cbn1cblxuLy8gTGV0cyB5b3UgY2hhbmdlIGRlZmF1bHRzIHRoZSBvbGQgd2F5LlxuUE5vdGlmeUNvbXBhdC5wcm90b3R5cGUub3B0aW9ucyA9IHtcbiAgdGV4dF9lc2NhcGU6IGZhbHNlLFxuICB0aXRsZV9lc2NhcGU6IGZhbHNlXG59O1xuXG4vLyBGb3J3YXJkIHN0YXRpYyBmdW5jdGlvbnMuXG5QTm90aWZ5Q29tcGF0LnJlbG9hZCA9ICgpID0+IFBOb3RpZnlDb21wYXQ7XG5QTm90aWZ5Q29tcGF0LnJlbW92ZUFsbCA9ICgpID0+IFBOb3RpZnkucmVtb3ZlQWxsKCk7XG5QTm90aWZ5Q29tcGF0LnJlbW92ZVN0YWNrID0gKHN0YWNrKSA9PiBQTm90aWZ5LnJlbW92ZVN0YWNrKHN0YWNrKTtcblBOb3RpZnlDb21wYXQucG9zaXRpb25BbGwgPSAoYW5pbWF0ZSkgPT4gUE5vdGlmeS5wb3NpdGlvbkFsbChhbmltYXRlKTtcblxuLy8gRGVza3RvcCBtb2R1bGUgcGVybWlzc2lvbiBtZXRob2QuXG5QTm90aWZ5Q29tcGF0LmRlc2t0b3AgPSB7XG4gIHBlcm1pc3Npb246ICgpID0+IHtcbiAgICBQTm90aWZ5Lm1vZHVsZXMuRGVza3RvcC5wZXJtaXNzaW9uKCk7XG4gIH1cbn07XG5cbi8vIE9sZCBzdHlsZSBzaG93TGFzdCgpIGluIEhpc3RvcnkgbW9kdWxlLlxuaWYgKHdpbmRvdy5qUXVlcnkpIHtcbiAgd2luZG93LmpRdWVyeSgoKSA9PiB7XG4gICAgd2luZG93LmpRdWVyeShkb2N1bWVudC5ib2R5KS5vbigncG5vdGlmeS5oaXN0b3J5LWxhc3QnLCBmdW5jdGlvbigpIHtcbiAgICAgIFBOb3RpZnkubW9kdWxlcy5IaXN0b3J5LnNob3dMYXN0KCk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG53aW5kb3cuUE5vdGlmeUNvbXBhdCA9IFBOb3RpZnlDb21wYXQ7XG4iXX0=