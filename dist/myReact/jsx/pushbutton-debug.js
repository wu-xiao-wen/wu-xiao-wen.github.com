"use strict";
define("js/bus/myReact/jsx/pushbutton-debug", ["common/react-debug", "bus/myReact/controller/connectActions-debug", "bus/myReact/controller/listenToActions-debug"], function(require, exports, module) {
    var React = require("common/react-debug"),
        ConnectActions = require("bus/myReact/controller/connectActions-debug"),
        ListenToActions = require("bus/myReact/controller/listenToActions-debug"),
        Pushbutton = React.createClass({
            displayName: "Pushbutton",
            getInitialState: function() {
                return {}
            },
            clickButton: function(e) {
                switch (e.preventDefault(), e.stopPropagation(), this.props.btnName) {
                    case "添加":
                        ConnectActions.add();
                        break;
                    case "修改":
                        this.props.callbackParent(this.props.data);
                        break;
                    case "删除":
                        ListenToActions["delete"](this.props.data);
                        break;
                    default:
                        this.props.callbackParent()
                }
            },
            render: function() {
                return React.createElement("button", {
                    className: this.props.className,
                    onClick: this.clickButton
                }, this.props.btnName)
            }
        });
    module.exports = Pushbutton
});