define("src/bus/court/divisionCase/objectionsDeal/main-debug", ["bus/global/main-debug", "common/jquery-debug", "common/delegate-debug", "common/dialog-debug", "model/modal/main-debug"], function(require, exports, module) {
    function beZero(num) {
        return num < 10 ? "0" + num : num
    }

    function format(date) {
        return date.getFullYear(date) + "-" + beZero(date.getMonth() + 1) + "-" + beZero(date.getDate()) + " " + beZero(date.getHours()) + ":" + beZero(date.getMinutes())
    }
    require("bus/global/main-debug");
    var $ = require("common/jquery-debug"),
        delegate = require("common/delegate-debug"),
        Dialog = require("common/dialog-debug"),
        Modal = require("model/modal/main-debug");
    delegate.on("click", ".JS-trigger-click-detail", function() {
        var tr = $(this).closest("tr"),
            data = tr.data("json") || tr.attr("data-json");
        data.applyTimeEx = data.applyTime && format(new Date(data.applyTime)), data.deal ? Dialog.showTemplate("#template-detail", data, {
            width: 400
        }) : Dialog.showTemplate("#template-wait", data, {
            width: 400
        })
    }), $(document).on("click", "#submit-wait", function(e) {
        e.preventDefault();
        var self = this,
            table = $(this).closest("table"),
            save = {};
        return table.find("select, textarea").each(function() {
            save[$(this).attr("name")] = $.trim($(this).val())
        }), save.opinion && save.opinion.replace(/[^x00-xff]/g, "xx").length > 1e3 ? void Modal.alert(0, "意见的字符长度不能超过1000") : void $.ajax({
            type: "POST",
            url: "/court/LassenSuitObjectionRpc/editSuitObjection.json?securityCaseId=" + encodeURIComponent($("input[name='securityCaseId']").val()),
            data: {
                objectionDo: JSON.stringify(save)
            }
        }).done(function(res) {
            $(self).closest(".kuma-dialog").find(".kuma-dialog-close").click(), res.hasError ? Modal.alert(0, res.errors[0].msg) : res.content.isSuccess ? (Modal.alert(1, "提交成功"), setTimeout(function() {
                location.reload()
            }, 300)) : Modal.alert(0, res.content.message)
        })
    })
});
"use strict";
define("common/jquery-debug", [], function(require, exports) {
    return jQuery
});