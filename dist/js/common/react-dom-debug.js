define("js/common/react-dom-debug", ["react-debug"], function(require, exports, module) {
    ! function(f) {
        if ("object" == typeof exports && "undefined" != typeof module) module.exports = f(require("react-debug"));
        else if ("function" == typeof define && define.amd) define(["react"], f);
        else {
            var g;
            g = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, g.ReactDOM = f(g.React)
        }
    }(function(React) {
        return React.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
    })
});