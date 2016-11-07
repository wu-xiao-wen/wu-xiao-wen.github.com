"use strict";
define("js/model/es6reactModules/controller-debug", ["common/controller-debug"], function(require, exports, module) {
    var Control = require("common/controller-debug");
    return Control({
        store: {
            a: "a1"
        },
        getInitialState: function() {
            return this.store
        },
        onAdd: function() {
            var me = this,
                store = me.store;
            me.ajax({
                request: "/portal/mediatorRpc/queryMediator.json",
                param: {
                    filterMap: JSON.stringify({
                        cityId: "",
                        mediatorType: "",
                        page: {
                            begin: 0,
                            length: 8
                        }
                    })
                }
            }).then(function() {
                store.b = "b2", me.updateComponent()
            }, function() {})
        }
    })
});