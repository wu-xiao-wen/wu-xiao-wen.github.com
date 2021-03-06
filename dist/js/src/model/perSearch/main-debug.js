"use strict";
define("src/model/perSearch/main-debug", ["common/myWidget-debug", "model/paginator/main-debug", "model/modal/main-debug"], function(require, exports, module) {
    var MyWidget = require("common/myWidget-debug"),
        Paginator = require("model/paginator/main-debug"),
        Modal = require("model/modal/main-debug"),
        PerSearch = MyWidget.extend({
            clssName: "PerSearch",
            attrs: {
                request: "/lassen/demo/test1Rpc/queryTest.json",
                size: 10,
                nowTarget: 1,
                param: null,
                paramName: "perSearch",
                template: null,
                pageParentNode: null,
                autoStart: !0,
                hidePage: !1,
                map: MyWidget.K,
                mapResponse: MyWidget.K
            },
            destroy: function() {
                var me = this;
                me.content.empty(), me.searchListPaginator && me.searchListPaginator.destroy(), PerSearch.superclass.destroy.call(me)
            },
            initProps: function() {
                var me = this;
                me.searchListSerilize(), me.content = me.$(".content"), me.template = MyWidget.handlerbars.compile(me.get("template") || me.$(".template").html() || "")
            },
            searchListSerilize: function() {
                var me = this;
                me.searchListParam = MyWidget.serialize(me.$(".param")), $.extend(me.searchListParam, me.get("param"));
                var page = me.searchListParam.page = {};
                return page.begin = (me.get("nowTarget") - 1) * me.get("size"), page.length = me.get("size"), me
            },
            setup: function() {
                var me = this;
                return me.get("autoStart") && me.searchListAjax(), me
            },
            searchListAjax: function(flag) {
                var me = this;
                return MyWidget.ajax(me.get("request"), MyWidget.paseParam(me.get("paramName"), me.searchListParam), "post", function(err, response) {
                    if (err) Modal.alert(0, err), me.trigger("ajaxError", response);
                    else {
                        var response = me.get("mapResponse")(response);
                        if (response.success) {
                            var size = me.get("size"),
                                data = me.get("map")(response.data);
                            me.content.html(me.template(data)), flag && me.searchListDestroyPage(), me.get("hidePage") || (me.searchListPaginator ? me.get("count") !== response.count && me.searchListPaginator.paginatorReload({
                                totle: response.count
                            }) : (me.searchListPaginator = new Paginator({
                                parentNode: me.get("pageParentNode") || me.element,
                                size: size,
                                totle: response.count,
                                nowTarget: me.get("nowTarget")
                            }).on("change", function(index) {
                                me.searchListParam.page.begin = (index - 1) * me.get("size"), me.searchListAjax()
                            }), response.count && me.searchListPaginator.render(), me.set("count", response.count), location.href.indexOf("lawyerDetail.htm") !== -1 && $(".paginator").addClass("fn-ML215"))), me.trigger("ajaxSuccess", response)
                        } else Modal.alert(0, response.errMsg), me.trigger("ajaxError", response)
                    }
                }), me
            },
            searchListReload: function() {
                var me = this;
                return me.searchListPaginator && me.searchListPaginator.set("nowTarget", 0), me.searchListSerilize().searchListAjax(!0), me
            },
            searchListDestroyPage: function() {
                var me = this;
                return me.searchListPaginator && me.searchListPaginator.destroy(), delete me.searchListPaginator, me
            }
        });
    return PerSearch
});