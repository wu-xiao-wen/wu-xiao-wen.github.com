"use strict";
define("src/model/ajax/main-debug", ["common/jquery-debug", "common/myWidget-debug", "model/modal/main-debug"], function(require, exports, module) {
    var $ = require("common/jquery-debug"),
        MyWidget = require("common/myWidget-debug"),
        Modal = require("model/modal/main-debug"),
        Ajax = MyWidget.extend({
            clssName: "Ajax",
            attrs: {
                request: "",
                paramName: null,
                autoDestroy: !0,
                autoErrorAlert: !0,
                autoSuccessAlert: !1,
                autoSubmit: !1,
                method: "http",
                type: "post",
                param: {},
                paramParse: MyWidget.K,
                parseForm: "",
                needText: !1,
                needPop: !0
            },
            events: {},
            initProps: function() {},
            setup: function() {
                var me = this;
                me.get("autoSubmit") && me.submit()
            },
            serializeForm: function() {
                var me = this,
                    param = me.get("param"),
                    parseForm = [me.element].concat(me.get("parseForm"));
                return me.breakEachArr(parseForm, function(form) {
                    form = $(form), form.length && $.extend(param, me.serialize(form))
                }), me.get("paramParse")(param)
            },
            submit: function() {
                var me = this,
                    paramName = me.get("paramName"),
                    DO = me.serializeForm(),
                    param = paramName ? me.paseParam(paramName, DO) : DO;
                return me.trigger("ajaxSubmitBefore", DO) && me[me.get("method")](me.get("request"), param, me.get("type"), function(err, rtv, msg, con) {
                    var args = me.setArray(arguments);
                    args.push(DO), err ? (me.get("autoErrorAlert") && Modal.alert(0, err), args.unshift("ajaxError"), me.trigger.apply(me, args)) : (me.get("autoSuccessAlert") && Modal.alert(1, msg), args.shift(), args.unshift("ajaxSuccess"), me.trigger.apply(me, args)), me.get("autoDestroy") && me.destroy()
                }, {
                    needText: me.get("needText"),
                    needPop: me.get("needPop")
                }), me
            },
            Statics: {
                when: function() {
                    var me = this,
                        arr = [];
                    return me.breakEachArr(arguments, function(val) {
                        var def = $.Deferred();
                        new Ajax(val).on("ajaxSuccess", function(val, msg, res) {
                            def.resolve({
                                val: val,
                                msg: msg,
                                res: res
                            })
                        }).on("ajaxError", function(err) {
                            def.reject({
                                err: err
                            })
                        }).submit(), arr.push(def)
                    }), $.when.apply($, arr)
                }
            }
        });
    return Ajax
});
"use strict";
define("common/jquery-debug", [], function(require, exports) {
    return jQuery
});