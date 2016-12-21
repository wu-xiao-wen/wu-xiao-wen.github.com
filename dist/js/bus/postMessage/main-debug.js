"use strict";
define("bus/postMessage/main-debug", [], function(require, exports, module) {
    window.onload = function() {
        var fram = document.getElementById("iframe1");
        fram.contentWindow.postMessage("welcome to my home!~~", "http://127.0.0.1:8007")
    }, $("#sendMessage").on("click", function() {
        var fram = document.getElementById("iframe1");
        fram.contentWindow.postMessage("吴凯哥哥来了", "http://127.0.0.1:8007")
    }), $("#openNewDemo").on("click", function() {
        var newDemo = window.open("http://127.0.0.1:8009/src/html/iframe2.html", "newDemo");
        window.setTimeout(function() {
            newDemo.postMessage("我是新打开的页面数据", "http://127.0.0.1:8009")
        }, 2e3)
    }), $(window).on("message", function(event) {
        "http://127.0.0.1:8007" === event.originalEvent.origin && (alert("接收子窗口的数据"), $("#message").html(event.originalEvent.data))
    })
});