"use strict";

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
}
var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor)
        }
    }
    return function(Constructor, protoProps, staticProps) {
        return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), Constructor
    }
}();
define("bus/class/classTest-debug", [], function(require, exports, module) {
    var Point = function() {
        function Point(x, y) {
            _classCallCheck(this, Point), Object.assign(this, {
                x: x,
                y: y
            })
        }
        return _createClass(Point, [{
            key: "toString",
            value: function() {
                return "(" + this.x + "," + this.y + ")"
            }
        }]), Point
    }();
    Point.prototype.toString = function() {
        return "(" + this.x + "," + this.y + ")"
    };
    var view = function view() {
            _classCallCheck(this, view)
        },
        v = new view;
    v.constructor === view.prototype.constructor
});