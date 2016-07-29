"use strict";
define("js/model/Paging/main-debug", ["common/widget-debug"], function(require, exports, module) {
    function checkMaxMin(index, max) {
        return index >= max && (index = max), index < 1 && (index = 1), index
    }
    var MyWidget = require("common/widget-debug"),
        Paginator = (MyWidget.jQuery, MyWidget.extend({
            clssName: "Paginator",
            attrs: {
                totle: 100,
                size: 10,
                nowTarget: 1,
                minLength: 9,
                className: "paginator",
                diff: 3
            },
            events: {
                "click .JS-click-active": function(e) {
                    var me = this,
                        node = MyWidget.closest(e.target, ".JS-click-active"),
                        index = node.data("nowTarget");
                    node.hasClass("active") || node.hasClass("other") || me.paginatorJump(index, e)
                },
                "click .JS-click-jump": function(e) {
                    var me = this,
                        index = ~~me.$(".JS-target-page").val();
                    me.paginatorJump(index, e)
                },
                "click .JS-click-prev": "paginatorPrevNext",
                "click .JS-click-next": "paginatorPrevNext"
            },
            initProps: function() {
                var me = this;
                me.paginatorRenderData()
            },
            setup: function() {
                var me = this;
                me.paginatorRender()
            },
            paginatorRenderData: function() {
                var paginatorData, paginatorMax, list, me = this,
                    totle = me.get("totle"),
                    size = me.get("size"),
                    minLength = me.get("minLength"),
                    nowTarget = me.get("nowTarget"),
                    diff = me.get("diff"),
                    index = 1;
                for (paginatorData = me.paginatorData = {}, paginatorData.count = totle, paginatorMax = me.paginatorMax = paginatorData.totle = Math.ceil(totle / size), paginatorData.nowTarget = checkMaxMin(nowTarget, paginatorMax), list = paginatorData.list = []; index <= paginatorMax; index++) paginatorMax <= minLength ? list.push(index) : 1 === index || index === paginatorMax ? (nowTarget === index && index === paginatorMax && (list.push("..."), list.push(index - 2), list.push(index - 1)), list.push(index), nowTarget === index && 1 === index && (list.push(index + 1), list.push(index + 2), list.push("..."))) : index <= diff && index === nowTarget ? (index === diff && list.push(index - 1), list.push(index), list.push(index + 1), list.push("...")) : index >= paginatorMax - diff + 1 && index === nowTarget ? (list.push("..."), list.push(index - 1), list.push(index), index === paginatorMax - diff + 1 && list.push(index + 1)) : index === nowTarget && (list.push("..."), list.push(index - 1), list.push(index), list.push(index + 1), list.push("..."));
                return me
            },
            paginatorRender: function() {
                var me = this;
                return me.element.html(template(me.paginatorData)), me
            },
            paginatorPrevNext: function(e) {
                e.stopPropagation();
                var me = this;
                if (e && e.target) {
                    var node = MyWidget.closest(e.target, "[data-label]"),
                        label = node.data("label"),
                        nowTarget = me.get("nowTarget"),
                        index = "prev" === label ? --nowTarget : ++nowTarget;
                    node.hasClass("disabled") || me.paginatorJump(index, e)
                } else me.log("缺少事件对象。")
            },
            paginatorJump: function(index, e) {
                var me = this;
                return index = checkMaxMin(index, me.paginatorMax), me.set("nowTarget", index), me.paginatorRenderData().paginatorRender(), me.trigger("change", index, e), me
            },
            paginatorReload: function(config) {
                var me = this;
                return me.resetConfig(config), me.paginatorRenderData().paginatorRender(), me
            },
            destroy: function() {
                var me = this;
                me.element.html(""), Paginator.superclass.destroy.call(this)
            }
        }));
    return Paginator
});