define("src/modules/component.lightpop/index-debug", ["common/jquery-debug", "confirmbox-debug", "src/modules/component.lightpop/testsize-debug", "overlay-debug"], function(require, exports, module) {
    function showMessage(type, message, callback, modal) {
        var size = sizeTest.test(message, {
                fontSize: "14px"
            }),
            maxWidth = Math.max(.7 * $(window).width(), 500);
        size.width > maxWidth && (size.width = maxWidth);
        var o = ConfirmBox.iconView("", function() {
            $.isFunction(callback) && callback(), $(window).off("scroll", onScroll)
        }, {
            iconType: type,
            msgTile: message,
            hasMask: !1,
            simple: !0,
            zIndex: 999,
            timeout: "error" === type ? 3500 : 1500,
            width: size.width + 100,
            confirmTpl: "",
            cancelTpl: "",
            closeTpl: "error" === type ? "×" : ""
        });
        modal && (exports.loading(), mask.element.css("background", "rgba(255,255,255,.8)"), o.before("hide", function() {
            exports.loaded(), mask.element.css("background", "none")
        }));
        var onScroll = function() {
            try {
                o._setPosition()
            } catch (e) {
                $(window).off("scroll", onScroll)
            }
        };
        $(window).on("scroll", onScroll)
    }
    var $ = require("common/jquery-debug"),
        ConfirmBox = require("confirmbox-debug"),
        sizeTest = require("src/modules/component.lightpop/testsize-debug"),
        Overlay = require("overlay-debug"),
        mask = new Overlay({
            width: "100%",
            height: "100%",
            className: "ui-mask",
            zIndex: 800,
            style: {
                position: "fixed",
                top: 0,
                left: 0
            }
        }),
        maskCount = 0;
    exports.success = function(message, callback) {
        showMessage("success", message, callback)
    }, exports.error = function(message, callback) {
        showMessage("error", message, callback, !0)
    }, exports.loading = function() {
        !maskCount && mask.show(), maskCount++
    }, exports.loaded = function() {
        maskCount--, !maskCount && mask.hide()
    }
});
"use strict";
define("common/jquery-debug", [], function(require, exports) {
    return jQuery
});
define("src/modules/component.lightpop/testsize-debug", ["common/jquery-debug"], function(require, exports, module) {
    var $ = require("common/jquery-debug"),
        style = {
            position: "absolute",
            top: -1e3,
            visibility: "hidden"
        },
        testDiv = $("<div>").css(style).appendTo("body");
    exports.test = function(html, css) {
        testDiv.removeAttr("style").css(style), $.isPlainObject(css) && testDiv.css(css), testDiv.html(html);
        var size = {
            width: testDiv.width(),
            height: testDiv.height()
        };
        return size
    }
});