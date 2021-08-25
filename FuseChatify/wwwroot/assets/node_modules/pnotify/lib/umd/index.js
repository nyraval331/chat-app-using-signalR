(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("index", ["exports", "PNotify", "PNotifyAnimate", "PNotifyButtons", "PNotifyCallbacks", "PNotifyConfirm", "PNotifyDesktop", "PNotifyHistory", "PNotifyMobile", "PNotifyNonBlock", "PNotifyStyleMaterial"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./PNotify"), require("./PNotifyAnimate"), require("./PNotifyButtons"), require("./PNotifyCallbacks"), require("./PNotifyConfirm"), require("./PNotifyDesktop"), require("./PNotifyHistory"), require("./PNotifyMobile"), require("./PNotifyNonBlock"), require("./PNotifyStyleMaterial"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.PNotify, global.PNotifyAnimate, global.PNotifyButtons, global.PNotifyCallbacks, global.PNotifyConfirm, global.PNotifyDesktop, global.PNotifyHistory, global.PNotifyMobile, global.PNotifyNonBlock, global.PNotifyStyleMaterial);
    global.index = mod.exports;
  }
})(this, function (exports, _PNotify, _PNotifyAnimate, _PNotifyButtons, _PNotifyCallbacks, _PNotifyConfirm, _PNotifyDesktop, _PNotifyHistory, _PNotifyMobile, _PNotifyNonBlock, _PNotifyStyleMaterial) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _PNotify2 = _interopRequireDefault(_PNotify);

  var _PNotifyAnimate2 = _interopRequireDefault(_PNotifyAnimate);

  var _PNotifyButtons2 = _interopRequireDefault(_PNotifyButtons);

  var _PNotifyCallbacks2 = _interopRequireDefault(_PNotifyCallbacks);

  var _PNotifyConfirm2 = _interopRequireDefault(_PNotifyConfirm);

  var _PNotifyDesktop2 = _interopRequireDefault(_PNotifyDesktop);

  var _PNotifyHistory2 = _interopRequireDefault(_PNotifyHistory);

  var _PNotifyMobile2 = _interopRequireDefault(_PNotifyMobile);

  var _PNotifyNonBlock2 = _interopRequireDefault(_PNotifyNonBlock);

  var _PNotifyStyleMaterial2 = _interopRequireDefault(_PNotifyStyleMaterial);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _PNotify2.default;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOltdfQ==