"use strict";

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(self, call) {
    if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !call || "object" != typeof call && "function" != typeof call ? self : call
}

function _inherits(subClass, superClass) {
    if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
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
define("js/common/hoc-debug", ["common/react-debug", "common/reflux-debug", "common/limit2-debug.0"], function(require, exports) {
    var React = require("common/react-debug"),
        Reflux = require("common/reflux-debug"),
        limit = require("common/limit2-debug.0");
    return function(Wrapper, Controller) {
        Controller = Reflux.connect(Controller.Store);
        var state = Controller.getInitialState();
        delete Controller.getInitialState;
        var WrapperComponent = function(_React$Component) {
            function WrapperComponent() {
                var _Object$getPrototypeO;
                _classCallCheck(this, WrapperComponent);
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(WrapperComponent)).call.apply(_Object$getPrototypeO, [this].concat(args)));
                return _this.state = limit.assign(state, _this.props), _this
            }
            return _inherits(WrapperComponent, _React$Component), _createClass(WrapperComponent, [{
                key: "render",
                value: function() {
                    return React.createElement(Wrapper, this.state)
                }
            }]), WrapperComponent
        }(React.Component);
        return limit.extend(WrapperComponent.prototype, Controller), WrapperComponent
    }
});