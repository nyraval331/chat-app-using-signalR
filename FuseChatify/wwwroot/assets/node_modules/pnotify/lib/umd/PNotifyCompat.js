(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('PNotifyCompat', ['exports', "PNotify"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./PNotify"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.PNotify);
    global.PNotifyCompat = mod.exports;
  }
})(this, function (exports, _PNotify2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _PNotify3 = _interopRequireDefault(_PNotify2);

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

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

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

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

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
      if (_PNotify3.default.modules.Callbacks && options.before_init) {
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

      if (_PNotify3.default.modules.Callbacks) {
        _PNotify3.default.modules.Callbacks.getCallbacks(_this, null, 'afterInit')(_this);
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
  }(_PNotify3.default);

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
    return _PNotify3.default.removeAll();
  };
  PNotifyCompat.removeStack = function (stack) {
    return _PNotify3.default.removeStack(stack);
  };
  PNotifyCompat.positionAll = function (animate) {
    return _PNotify3.default.positionAll(animate);
  };

  // Desktop module permission method.
  PNotifyCompat.desktop = {
    permission: function permission() {
      _PNotify3.default.modules.Desktop.permission();
    }
  };

  // Old style showLast() in History module.
  if (window.jQuery) {
    window.jQuery(function () {
      window.jQuery(document.body).on('pnotify.history-last', function () {
        _PNotify3.default.modules.History.showLast();
      });
    });
  }

  exports.default = PNotifyCompat;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBOb3RpZnlDb21wYXQuanMiXSwibmFtZXMiOlsidHJhbnNsYXRlT3B0aW9ucyIsIm9wdGlvbnMiLCJtb2R1bGUiLCJtb2R1bGVOYW1lIiwibmV3T3B0aW9ucyIsIlBOb3RpZnlDb21wYXQiLCJwcm90b3R5cGUiLCJ0cmFuc2xhdGVOYW1lIiwiYmFkTmFtZSIsImdvb2ROYW1lIiwidW5kZXJzY29yZUluZGV4IiwiaW5kZXhPZiIsInNsaWNlIiwidG9VcHBlckNhc2UiLCJuYW1lIiwiaGFzT3duUHJvcGVydHkiLCJhZGRDbGFzcyIsImFkZGNsYXNzIiwiY29ybmVyQ2xhc3MiLCJjb3JuZXJjbGFzcyIsInRleHRUcnVzdGVkIiwidGV4dEVzY2FwZSIsInRpdGxlVHJ1c3RlZCIsInRpdGxlRXNjYXBlIiwic3R5bGluZyIsImljb25zIiwic3RhY2siLCJvdmVybGF5X2Nsb3NlIiwib3ZlcmxheUNsb3NlIiwibW9kdWxlcyIsIkFuaW1hdGUiLCJhbmltYXRlIiwiQnV0dG9ucyIsImJ1dHRvbnMiLCJjbGFzc2VzIiwiQ29uZmlybSIsImNvbmZpcm0iLCJEZXNrdG9wIiwiZGVza3RvcCIsIkhpc3RvcnkiLCJoaXN0b3J5IiwiTW9iaWxlIiwibW9iaWxlIiwiTm9uQmxvY2siLCJub25ibG9jayIsIlJlZmVyZW5jZSIsInJlZmVyZW5jZSIsIkNhbGxiYWNrcyIsImJlZm9yZUluaXQiLCJhZnRlckluaXQiLCJiZWZvcmVPcGVuIiwiYWZ0ZXJPcGVuIiwiYmVmb3JlQ2xvc2UiLCJhZnRlckNsb3NlIiwiYmVmb3JlX2luaXQiLCJ0YXJnZXQiLCJkb2N1bWVudCIsImJvZHkiLCJkYXRhIiwiX2dldCIsImdldCIsIm9wdGlvbiIsInVuZGVmaW5lZCIsIndpbmRvdyIsImpRdWVyeSIsInJlZnMiLCJlbGVtIiwiY2FsbCIsIm9uIiwiZSIsInRyaWdnZXIiLCJ2YWx1ZSIsImdldENhbGxiYWNrcyIsInRleHRfZXNjYXBlIiwidGl0bGVfZXNjYXBlIiwicmVsb2FkIiwicmVtb3ZlQWxsIiwicmVtb3ZlU3RhY2siLCJwb3NpdGlvbkFsbCIsInBlcm1pc3Npb24iLCJzaG93TGFzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7QUFDQSxNQUFNQSxtQkFBbUIsU0FBbkJBLGdCQUFtQixDQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBa0JDLFVBQWxCLEVBQWlDO0FBQ3hEO0FBQ0EsUUFBTUMsYUFBYUYsU0FBUyxTQUFjLEVBQWQsRUFBa0JDLGFBQWFFLGNBQWNDLFNBQWQsQ0FBd0JMLE9BQXhCLENBQWdDRSxVQUFoQyxDQUFiLEdBQTJELEVBQTdFLEVBQWlGRixPQUFqRixDQUFULEdBQXFHLFNBQWMsRUFBZCxFQUFrQkksY0FBY0MsU0FBZCxDQUF3QkwsT0FBMUMsRUFBbURBLE9BQW5ELENBQXhIO0FBQ0EsUUFBTU0sZ0JBQWdCLFNBQWhCQSxhQUFnQixDQUFDQyxPQUFELEVBQWE7QUFDakMsVUFBSUMsV0FBV0QsT0FBZjtBQUFBLFVBQXdCRSx3QkFBeEI7QUFDQSxhQUFPLENBQUNBLGtCQUFrQkQsU0FBU0UsT0FBVCxDQUFpQixHQUFqQixDQUFuQixNQUE4QyxDQUFDLENBQXRELEVBQXlEO0FBQ3ZERixtQkFBV0EsU0FBU0csS0FBVCxDQUFlLENBQWYsRUFBa0JGLGVBQWxCLElBQXFDRCxTQUFTRyxLQUFULENBQWVGLGtCQUFrQixDQUFqQyxFQUFvQ0Esa0JBQWtCLENBQXRELEVBQXlERyxXQUF6RCxFQUFyQyxHQUE4R0osU0FBU0csS0FBVCxDQUFlRixrQkFBa0IsQ0FBakMsQ0FBekg7QUFDRDtBQUNELGFBQU9ELFFBQVA7QUFDRCxLQU5EOztBQVFBO0FBQ0EsU0FBSyxJQUFJSyxJQUFULElBQWlCVixVQUFqQixFQUE2QjtBQUMzQixVQUFJQSxXQUFXVyxjQUFYLENBQTBCRCxJQUEx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R0g7QUFDQUksZ0JBQWNDLFNBQWQsQ0FBd0JMLE9BQXhCLEdBQWtDO0FBQ2hDd0UsaUJBQWEsS0FEbUI7QUFFaENDLGtCQUFjO0FBRmtCLEdBQWxDOztBQUtBO0FBQ0FyRSxnQkFBY3NFLE1BQWQsR0FBdUI7QUFBQSxXQUFNdEUsYUFBTjtBQUFBLEdBQXZCO0FBQ0FBLGdCQUFjdUUsU0FBZCxHQUEwQjtBQUFBLFdBQU0sa0JBQVFBLFNBQVIsRUFBTjtBQUFBLEdBQTFCO0FBQ0F2RSxnQkFBY3dFLFdBQWQsR0FBNEIsVUFBQ25ELEtBQUQ7QUFBQSxXQUFXLGtCQUFRbUQsV0FBUixDQUFvQm5ELEtBQXBCLENBQVg7QUFBQSxHQUE1QjtBQUNBckIsZ0JBQWN5RSxXQUFkLEdBQTRCLFVBQUMvQyxPQUFEO0FBQUEsV0FBYSxrQkFBUStDLFdBQVIsQ0FBb0IvQyxPQUFwQixDQUFiO0FBQUEsR0FBNUI7O0FBRUE7QUFDQTFCLGdCQUFjaUMsT0FBZCxHQUF3QjtBQUN0QnlDLGdCQUFZLHNCQUFNO0FBQ2hCLHdCQUFRbEQsT0FBUixDQUFnQlEsT0FBaEIsQ0FBd0IwQyxVQUF4QjtBQUNEO0FBSHFCLEdBQXhCOztBQU1BO0FBQ0EsTUFBSWhCLE9BQU9DLE1BQVgsRUFBbUI7QUFDakJELFdBQU9DLE1BQVAsQ0FBYyxZQUFNO0FBQ2xCRCxhQUFPQyxNQUFQLENBQWNSLFNBQVNDLElBQXZCLEVBQTZCVyxFQUE3QixDQUFnQyxzQkFBaEMsRUFBd0QsWUFBVztBQUNqRSwwQkFBUXZDLE9BQVIsQ0FBZ0JVLE9BQWhCLENBQXdCeUMsUUFBeEI7QUFDRCxPQUZEO0FBR0QsS0FKRDtBQUtEOztvQkFFYzNFLGEiLCJmaWxlIjoic3JjL1BOb3RpZnlDb21wYXQuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBOb3RpZnkgZnJvbSBcIi4vUE5vdGlmeS5odG1sXCI7XG5cbi8vIFRyYW5zbGF0ZSB2MyBvcHRpb25zIHRvIHY0IG9wdGlvbnMuXG5jb25zdCB0cmFuc2xhdGVPcHRpb25zID0gKG9wdGlvbnMsIG1vZHVsZSwgbW9kdWxlTmFtZSkgPT4ge1xuICAvLyBNZXJnZSB0aGUgY2xhc3NpYyBkZWZhdWx0IG9wdGlvbnMuXG4gIGNvbnN0IG5ld09wdGlvbnMgPSBtb2R1bGUgPyBPYmplY3QuYXNzaWduKHt9LCBtb2R1bGVOYW1lID8gUE5vdGlmeUNvbXBhdC5wcm90b3R5cGUub3B0aW9uc1ttb2R1bGVOYW1lXSA6IHt9LCBvcHRpb25zKSA6IE9iamVjdC5hc3NpZ24oe30sIFBOb3RpZnlDb21wYXQucHJvdG90eXBlLm9wdGlvbnMsIG9wdGlvbnMpO1xuICBjb25zdCB0cmFuc2xhdGVOYW1lID0gKGJhZE5hbWUpID0+IHtcbiAgICBsZXQgZ29vZE5hbWUgPSBiYWROYW1lLCB1bmRlcnNjb3JlSW5kZXg7XG4gICAgd2hpbGUgKCh1bmRlcnNjb3JlSW5kZXggPSBnb29kTmFtZS5pbmRleE9mKCdfJykpICE9PSAtMSkge1xuICAgICAgZ29vZE5hbWUgPSBnb29kTmFtZS5zbGljZSgwLCB1bmRlcnNjb3JlSW5kZXgpICsgZ29vZE5hbWUuc2xpY2UodW5kZXJzY29yZUluZGV4ICsgMSwgdW5kZXJzY29yZUluZGV4ICsgMikudG9VcHBlckNhc2UoKSArIGdvb2ROYW1lLnNsaWNlKHVuZGVyc2NvcmVJbmRleCArIDIpO1xuICAgIH1cbiAgICByZXR1cm4gZ29vZE5hbWU7XG4gIH07XG5cbiAgLy8gVHJhbnNsYXRlIGFsbCBvcHRpb25zIHRvIHRoZSBuZXcgc3R5bGUuXG4gIGZvciAobGV0IG5hbWUgaW4gbmV3T3B0aW9ucykge1xuICAgIGlmIChuZXdPcHRpb25zLmhhc093blByb3BlcnR5KG5hbWUpICYmIG5hbWUuaW5kZXhPZignXycpICE9PSAtMSkge1xuICAgICAgY29uc3QgZ29vZE5hbWUgPSB0cmFuc2xhdGVOYW1lKG5hbWUpO1xuICAgICAgbmV3T3B0aW9uc1tnb29kTmFtZV0gPSBuZXdPcHRpb25zW25hbWVdO1xuICAgICAgZGVsZXRlIG5ld09wdGlvbnNbbmFtZV07XG4gICAgfVxuICB9XG5cbiAgaWYgKCFtb2R1bGUpIHtcbiAgICAvLyBPcHRpb25zIHRoYXQgaGF2ZSBjaGFuZ2VkLlxuICAgIGlmIChuZXdPcHRpb25zLmhhc093blByb3BlcnR5KCdhZGRjbGFzcycpKSB7XG4gICAgICBuZXdPcHRpb25zLmFkZENsYXNzID0gbmV3T3B0aW9ucy5hZGRjbGFzcztcbiAgICAgIGRlbGV0ZSBuZXdPcHRpb25zLmFkZGNsYXNzO1xuICAgIH1cbiAgICBpZiAobmV3T3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnY29ybmVyY2xhc3MnKSkge1xuICAgICAgbmV3T3B0aW9ucy5jb3JuZXJDbGFzcyA9IG5ld09wdGlvbnMuY29ybmVyY2xhc3M7XG4gICAgICBkZWxldGUgbmV3T3B0aW9ucy5jb3JuZXJDbGFzcztcbiAgICB9XG4gICAgaWYgKG5ld09wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3RleHRFc2NhcGUnKSkge1xuICAgICAgbmV3T3B0aW9ucy50ZXh0VHJ1c3RlZCA9ICFuZXdPcHRpb25zLnRleHRFc2NhcGU7XG4gICAgICBkZWxldGUgbmV3T3B0aW9ucy50ZXh0RXNjYXBlO1xuICAgIH1cbiAgICBpZiAobmV3T3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgndGl0bGVFc2NhcGUnKSkge1xuICAgICAgbmV3T3B0aW9ucy50aXRsZVRydXN0ZWQgPSAhbmV3T3B0aW9ucy50aXRsZUVzY2FwZTtcbiAgICAgIGRlbGV0ZSBuZXdPcHRpb25zLnRpdGxlRXNjYXBlO1xuICAgIH1cblxuICAgIC8vIFN0eWxpbmcgYW5kIGljb25zLlxuICAgIGlmIChuZXdPcHRpb25zLmhhc093blByb3BlcnR5KCdzdHlsaW5nJykpIHtcbiAgICAgIGlmIChuZXdPcHRpb25zLnN0eWxpbmcgPT09ICdib290c3RyYXAzJykge1xuICAgICAgICBuZXdPcHRpb25zLmljb25zID0gJ2Jvb3RzdHJhcDMnO1xuICAgICAgfSBlbHNlIGlmIChuZXdPcHRpb25zLnN0eWxpbmcgPT09ICdmb250YXdlc29tZScpIHtcbiAgICAgICAgbmV3T3B0aW9ucy5zdHlsaW5nID0gJ2Jvb3RzdHJhcDMnO1xuICAgICAgICBuZXdPcHRpb25zLmljb25zID0gJ2ZvbnRhd2Vzb21lNCc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU3RhY2tzLlxuICAgIGlmIChuZXdPcHRpb25zLmhhc093blByb3BlcnR5KCdzdGFjaycpKSB7XG4gICAgICBpZiAobmV3T3B0aW9ucy5zdGFjay5vdmVybGF5X2Nsb3NlKSB7XG4gICAgICAgIG5ld09wdGlvbnMuc3RhY2sub3ZlcmxheUNsb3NlID0gbmV3T3B0aW9ucy5zdGFjay5vdmVybGF5X2Nsb3NlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRyYW5zbGF0ZSBtb2R1bGUgb3B0aW9ucy5cbiAgICBuZXdPcHRpb25zLm1vZHVsZXMgPSB7fTtcbiAgICBpZiAobmV3T3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYW5pbWF0ZScpKSB7XG4gICAgICBuZXdPcHRpb25zLm1vZHVsZXMuQW5pbWF0ZSA9IHRyYW5zbGF0ZU9wdGlvbnMobmV3T3B0aW9ucy5hbmltYXRlLCB0cnVlLCAnYW5pbWF0ZScpO1xuICAgICAgZGVsZXRlIG5ld09wdGlvbnMuYW5pbWF0ZTtcbiAgICB9XG4gICAgaWYgKG5ld09wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2J1dHRvbnMnKSkge1xuICAgICAgbmV3T3B0aW9ucy5tb2R1bGVzLkJ1dHRvbnMgPSB0cmFuc2xhdGVPcHRpb25zKG5ld09wdGlvbnMuYnV0dG9ucywgdHJ1ZSwgJ2J1dHRvbnMnKTtcbiAgICAgIGRlbGV0ZSBuZXdPcHRpb25zLmJ1dHRvbnM7XG4gICAgICBpZiAobmV3T3B0aW9ucy5tb2R1bGVzLkJ1dHRvbnMuY2xhc3Nlcykge1xuICAgICAgICBuZXdPcHRpb25zLm1vZHVsZXMuQnV0dG9ucy5jbGFzc2VzID0gdHJhbnNsYXRlT3B0aW9ucyhuZXdPcHRpb25zLm1vZHVsZXMuQnV0dG9ucy5jbGFzc2VzLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG5ld09wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2NvbmZpcm0nKSkge1xuICAgICAgbmV3T3B0aW9ucy5tb2R1bGVzLkNvbmZpcm0gPSB0cmFuc2xhdGVPcHRpb25zKG5ld09wdGlvbnMuY29uZmlybSwgdHJ1ZSwgJ2NvbmZpcm0nKTtcbiAgICAgIGRlbGV0ZSBuZXdPcHRpb25zLmNvbmZpcm07XG4gICAgfVxuICAgIGlmIChuZXdPcHRpb25zLmhhc093blByb3BlcnR5KCdkZXNrdG9wJykpIHtcbiAgICAgIG5ld09wdGlvbnMubW9kdWxlcy5EZXNrdG9wID0gdHJhbnNsYXRlT3B0aW9ucyhuZXdPcHRpb25zLmRlc2t0b3AsIHRydWUsICdkZXNrdG9wJyk7XG4gICAgICBkZWxldGUgbmV3T3B0aW9ucy5kZXNrdG9wO1xuICAgIH1cbiAgICBpZiAobmV3T3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnaGlzdG9yeScpKSB7XG4gICAgICBuZXdPcHRpb25zLm1vZHVsZXMuSGlzdG9yeSA9IHRyYW5zbGF0ZU9wdGlvbnMobmV3T3B0aW9ucy5oaXN0b3J5LCB0cnVlLCAnaGlzdG9yeScpO1xuICAgICAgZGVsZXRlIG5ld09wdGlvbnMuaGlzdG9yeTtcbiAgICB9XG4gICAgaWYgKG5ld09wdGlvbnMuaGFzT3duUHJvcGVydHkoJ21vYmlsZScpKSB7XG4gICAgICBuZXdPcHRpb25zLm1vZHVsZXMuTW9iaWxlID0gdHJhbnNsYXRlT3B0aW9ucyhuZXdPcHRpb25zLm1vYmlsZSwgdHJ1ZSwgJ21vYmlsZScpO1xuICAgICAgZGVsZXRlIG5ld09wdGlvbnMubW9iaWxlO1xuICAgIH1cbiAgICBpZiAobmV3T3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnbm9uYmxvY2snKSkge1xuICAgICAgbmV3T3B0aW9ucy5tb2R1bGVzLk5vbkJsb2NrID0gdHJhbnNsYXRlT3B0aW9ucyhuZXdPcHRpb25zLm5vbmJsb2NrLCB0cnVlLCAnbm9uYmxvY2snKTtcbiAgICAgIGRlbGV0ZSBuZXdPcHRpb25zLm5vbmJsb2NrO1xuICAgIH1cbiAgICBpZiAobmV3T3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgncmVmZXJlbmNlJykpIHtcbiAgICAgIG5ld09wdGlvbnMubW9kdWxlcy5SZWZlcmVuY2UgPSB0cmFuc2xhdGVPcHRpb25zKG5ld09wdGlvbnMucmVmZXJlbmNlLCB0cnVlLCAncmVmZXJlbmNlJyk7XG4gICAgICBkZWxldGUgbmV3T3B0aW9ucy5yZWZlcmVuY2U7XG4gICAgfVxuICAgIGlmIChuZXdPcHRpb25zLmhhc093blByb3BlcnR5KCdiZWZvcmVJbml0JykpIHtcbiAgICAgIGlmICghbmV3T3B0aW9ucy5tb2R1bGVzLkNhbGxiYWNrcykge1xuICAgICAgICBuZXdPcHRpb25zLm1vZHVsZXMuQ2FsbGJhY2tzID0ge307XG4gICAgICB9XG4gICAgICBuZXdPcHRpb25zLm1vZHVsZXMuQ2FsbGJhY2tzLmJlZm9yZUluaXQgPSBuZXdPcHRpb25zLmJlZm9yZUluaXQ7XG4gICAgICBkZWxldGUgbmV3T3B0aW9ucy5iZWZvcmVJbml0O1xuICAgIH1cbiAgICBpZiAobmV3T3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYWZ0ZXJJbml0JykpIHtcbiAgICAgIGlmICghbmV3T3B0aW9ucy5tb2R1bGVzLkNhbGxiYWNrcykge1xuICAgICAgICBuZXdPcHRpb25zLm1vZHVsZXMuQ2FsbGJhY2tzID0ge307XG4gICAgICB9XG4gICAgICBuZXdPcHRpb25zLm1vZHVsZXMuQ2FsbGJhY2tzLmFmdGVySW5pdCA9IG5ld09wdGlvbnMuYWZ0ZXJJbml0O1xuICAgICAgZGVsZXRlIG5ld09wdGlvbnMuYWZ0ZXJJbml0O1xuICAgIH1cbiAgICBpZiAobmV3T3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYmVmb3JlT3BlbicpKSB7XG4gICAgICBpZiAoIW5ld09wdGlvbnMubW9kdWxlcy5DYWxsYmFja3MpIHtcbiAgICAgICAgbmV3T3B0aW9ucy5tb2R1bGVzLkNhbGxiYWNrcyA9IHt9O1xuICAgICAgfVxuICAgICAgbmV3T3B0aW9ucy5tb2R1bGVzLkNhbGxiYWNrcy5iZWZvcmVPcGVuID0gbmV3T3B0aW9ucy5iZWZvcmVPcGVuO1xuICAgICAgZGVsZXRlIG5ld09wdGlvbnMuYmVmb3JlT3BlbjtcbiAgICB9XG4gICAgaWYgKG5ld09wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2FmdGVyT3BlbicpKSB7XG4gICAgICBpZiAoIW5ld09wdGlvbnMubW9kdWxlcy5DYWxsYmFja3MpIHtcbiAgICAgICAgbmV3T3B0aW9ucy5tb2R1bGVzLkNhbGxiYWNrcyA9IHt9O1xuICAgICAgfVxuICAgICAgbmV3T3B0aW9ucy5tb2R1bGVzLkNhbGxiYWNrcy5hZnRlck9wZW4gPSBuZXdPcHRpb25zLmFmdGVyT3BlbjtcbiAgICAgIGRlbGV0ZSBuZXdPcHRpb25zLmFmdGVyT3BlbjtcbiAgICB9XG4gICAgaWYgKG5ld09wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2JlZm9yZUNsb3NlJykpIHtcbiAgICAgIGlmICghbmV3T3B0aW9ucy5tb2R1bGVzLkNhbGxiYWNrcykge1xuICAgICAgICBuZXdPcHRpb25zLm1vZHVsZXMuQ2FsbGJhY2tzID0ge307XG4gICAgICB9XG4gICAgICBuZXdPcHRpb25zLm1vZHVsZXMuQ2FsbGJhY2tzLmJlZm9yZUNsb3NlID0gbmV3T3B0aW9ucy5iZWZvcmVDbG9zZTtcbiAgICAgIGRlbGV0ZSBuZXdPcHRpb25zLmJlZm9yZUNsb3NlO1xuICAgIH1cbiAgICBpZiAobmV3T3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYWZ0ZXJDbG9zZScpKSB7XG4gICAgICBpZiAoIW5ld09wdGlvbnMubW9kdWxlcy5DYWxsYmFja3MpIHtcbiAgICAgICAgbmV3T3B0aW9ucy5tb2R1bGVzLkNhbGxiYWNrcyA9IHt9O1xuICAgICAgfVxuICAgICAgbmV3T3B0aW9ucy5tb2R1bGVzLkNhbGxiYWNrcy5hZnRlckNsb3NlID0gbmV3T3B0aW9ucy5hZnRlckNsb3NlO1xuICAgICAgZGVsZXRlIG5ld09wdGlvbnMuYWZ0ZXJDbG9zZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3T3B0aW9ucztcbn1cblxuLy8gVGhlIGNvbXBhdGliaWxpdHkgY2xhc3MuXG5jbGFzcyBQTm90aWZ5Q29tcGF0IGV4dGVuZHMgUE5vdGlmeSB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgIT09IFwib2JqZWN0XCIpIHtcbiAgICAgIG9wdGlvbnMgPSB7XCJ0ZXh0XCI6IG9wdGlvbnN9O1xuICAgIH1cblxuICAgIC8vIFRoZXNlIG5lZWQgdG8gYmUgY2FsbGVkIGRpcmVjdGx5LCBzaW5jZSB3ZSdyZSBub3QgdXNpbmcgUE5vdGlmeS5hbGVydCgpLlxuICAgIGlmIChQTm90aWZ5Lm1vZHVsZXMuQ2FsbGJhY2tzICYmIG9wdGlvbnMuYmVmb3JlX2luaXQpIHtcbiAgICAgIG9wdGlvbnMuYmVmb3JlX2luaXQob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgb3B0aW9ucyA9IHRyYW5zbGF0ZU9wdGlvbnMob3B0aW9ucyk7XG5cbiAgICBzdXBlcih7dGFyZ2V0OiBkb2N1bWVudC5ib2R5LCBkYXRhOiBvcHRpb25zfSk7XG5cbiAgICAvLyBPdmVycmlkZSB0aGUgZ2V0IGZ1bmN0aW9uIHRvIHJldHVuciB0aGUgZWxlbWVudCBsaWtlIGl0IGRpZCBpbiB2My5cbiAgICBjb25zdCBfZ2V0ID0gdGhpcy5nZXQ7XG4gICAgdGhpcy5nZXQgPSBmdW5jdGlvbihvcHRpb24pIHtcbiAgICAgIGlmIChvcHRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih3aW5kb3cualF1ZXJ5ID8gd2luZG93LmpRdWVyeSh0aGlzLnJlZnMuZWxlbSkgOiB0aGlzLnJlZnMuZWxlbSwgX2dldC5jYWxsKHRoaXMpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfZ2V0LmNhbGwodGhpcywgb3B0aW9uKTtcbiAgICB9O1xuXG4gICAgLy8gQ29uZmlybSBtb2R1bGUgZXZlbnRzLlxuICAgIHRoaXMub24oJ3Bub3RpZnkuY29uZmlybScsIChlKSA9PiB7XG4gICAgICBpZiAod2luZG93LmpRdWVyeSkge1xuICAgICAgICB3aW5kb3cualF1ZXJ5KHRoaXMucmVmcy5lbGVtKS50cmlnZ2VyKCdwbm90aWZ5LmNvbmZpcm0nLCBbdGhpcywgZS52YWx1ZV0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMub24oJ3Bub3RpZnkuY2FuY2VsJywgKGUpID0+IHtcbiAgICAgIGlmICh3aW5kb3cualF1ZXJ5KSB7XG4gICAgICAgIHdpbmRvdy5qUXVlcnkodGhpcy5yZWZzLmVsZW0pLnRyaWdnZXIoJ3Bub3RpZnkuY2FuY2VsJywgdGhpcyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoUE5vdGlmeS5tb2R1bGVzLkNhbGxiYWNrcykge1xuICAgICAgUE5vdGlmeS5tb2R1bGVzLkNhbGxiYWNrcy5nZXRDYWxsYmFja3ModGhpcywgbnVsbCwgJ2FmdGVySW5pdCcpKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZShvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHRyYW5zbGF0ZU9wdGlvbnMob3B0aW9ucyk7XG4gICAgcmV0dXJuIHN1cGVyLnVwZGF0ZShvcHRpb25zKTtcbiAgfVxufVxuXG4vLyBMZXRzIHlvdSBjaGFuZ2UgZGVmYXVsdHMgdGhlIG9sZCB3YXkuXG5QTm90aWZ5Q29tcGF0LnByb3RvdHlwZS5vcHRpb25zID0ge1xuICB0ZXh0X2VzY2FwZTogZmFsc2UsXG4gIHRpdGxlX2VzY2FwZTogZmFsc2Vcbn07XG5cbi8vIEZvcndhcmQgc3RhdGljIGZ1bmN0aW9ucy5cblBOb3RpZnlDb21wYXQucmVsb2FkID0gKCkgPT4gUE5vdGlmeUNvbXBhdDtcblBOb3RpZnlDb21wYXQucmVtb3ZlQWxsID0gKCkgPT4gUE5vdGlmeS5yZW1vdmVBbGwoKTtcblBOb3RpZnlDb21wYXQucmVtb3ZlU3RhY2sgPSAoc3RhY2spID0+IFBOb3RpZnkucmVtb3ZlU3RhY2soc3RhY2spO1xuUE5vdGlmeUNvbXBhdC5wb3NpdGlvbkFsbCA9IChhbmltYXRlKSA9PiBQTm90aWZ5LnBvc2l0aW9uQWxsKGFuaW1hdGUpO1xuXG4vLyBEZXNrdG9wIG1vZHVsZSBwZXJtaXNzaW9uIG1ldGhvZC5cblBOb3RpZnlDb21wYXQuZGVza3RvcCA9IHtcbiAgcGVybWlzc2lvbjogKCkgPT4ge1xuICAgIFBOb3RpZnkubW9kdWxlcy5EZXNrdG9wLnBlcm1pc3Npb24oKTtcbiAgfVxufTtcblxuLy8gT2xkIHN0eWxlIHNob3dMYXN0KCkgaW4gSGlzdG9yeSBtb2R1bGUuXG5pZiAod2luZG93LmpRdWVyeSkge1xuICB3aW5kb3cualF1ZXJ5KCgpID0+IHtcbiAgICB3aW5kb3cualF1ZXJ5KGRvY3VtZW50LmJvZHkpLm9uKCdwbm90aWZ5Lmhpc3RvcnktbGFzdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgUE5vdGlmeS5tb2R1bGVzLkhpc3Rvcnkuc2hvd0xhc3QoKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBOb3RpZnlDb21wYXQ7XG4iXX0=