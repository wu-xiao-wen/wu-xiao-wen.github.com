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
define("js/common/widgets-debug", ["common/react-dom-debug", "common/react-debug", "common/limit2-debug.0"], function(require, exports, module) {
    var ReactDOM = require("common/react-dom-debug"),
        React = require("common/react-debug"),
        limit = require("common/limit2-debug.0"),
        Widget = function() {
            function Widget(config) {
                _classCallCheck(this, Widget), this.config = config, this.element = $(config.element), this.render()
            }
            return _createClass(Widget, [{
                key: "render",
                value: function() {
                    var me = this,
                        Component = me.getComponent(),
                        attr = me.parseAttr();
                    ReactDOM.render(React.createElement(Component, attr), me.element[0])
                }
            }, {
                key: "parseAttr",
                value: function() {
                    var me = this,
                        obj = {},
                        config = limit.assign({}, me.config),
                        element = me.element,
                        dataset = void 0,
                        main = function(val, key) {
                            return setAttr(obj, key, element)
                        };
                    return (dataset = element.prop("dataset")) ? limit.each(dataset, main) : parseAttrByAttributes(element.prop("attributes"), main), delete config.element, limit.assign(obj, config)
                }
            }]), Widget
        }(),
        setAttr = function(obj, key, element) {
            "element" !== key && (obj[key] = element.data(key))
        },
        REX_DATA = /^data((?:-.+)+)$/,
        REX_FIRST = /-([a-z])/g,
        parseAttrByAttributes = function(attributes, callback) {
            limit.each(attributes, function(val, index) {
                var key = val.nodeName;
                REX_DATA.test(key) && (key = RegExp.$1.slice(1).replace(REX_FIRST, function(a, b) {
                    return b.toUpperCase()
                }), callback(val.nodeValue, key))
            })
        };
    return Widget
});