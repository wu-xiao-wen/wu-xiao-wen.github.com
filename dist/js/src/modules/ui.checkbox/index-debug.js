define("src/modules/ui.checkbox/index-debug", ["common/jquery-debug", "crystal-debug"], function(require, exports, module) {
    var crystal = (require("common/jquery-debug"), require("crystal-debug"));
    return crystal.moduleFactory({
        attrs: {
            model: null,
            stringValue: !1,
            field: "value"
        },
        events: {
            change: "_onChange"
        },
        setup: function() {
            var me = this;
            me.render();
            var next = me.element.next();
            next.is("s") || me.element.after("<s></s>")
        },
        _onRenderModel: function(model) {
            var me = this,
                el = me.element;
            if ("radio" === el.attr("type")) el.prop("checked", model[me.get("field")] == el.val());
            else if ("checkbox" === el.attr("type")) {
                var truly = !me.get("stringValue") || "true";
                el.prop("checked", model[me.get("field")] === truly)
            }
        },
        _onChange: function() {
            var me = this,
                el = me.element,
                model = me.get("model");
            model && ("radio" === el.attr("type") ? el.prop("checked") && (model[me.get("field")] = el.val()) : "checkbox" === el.attr("type") && (el.prop("checked") ? model[me.get("field")] = !me.get("stringValue") || "true" : model[me.get("field")] = !!me.get("stringValue") && "false"))
        }
    })
});
"use strict";
define("common/jquery-debug", [], function(require, exports) {
    return jQuery
});