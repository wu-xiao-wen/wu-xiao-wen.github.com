"use strict";
define("common/events-debug", ["common/class-debug"], function(require, exports) {
    function getNameSpace(type) {
        if (Rex.test(type)) return {
            eventType: RegExp.$1,
            nameSpace: RegExp.$2
        }
    }

    function removeTarget(arr, tar) {
        var index = indexOf(arr, tar);
        index !== -1 && arr.splice(index, 1)
    }

    function indexOf(arr, ele, formIndex) {
        if (arr.indexOf) {
            var length = arr.length;
            for (formIndex = ~~formIndex; formIndex < length; formIndex++)
                if (arr[formIndex] === ele) return formIndex;
            return -1
        }
        return arr.indexOf(ele, formIndex)
    }

    function forEach(arr, callback) {
        if (arr.forEach) return arr.forEach(callback);
        for (var index = 0, length = arr.length; index < length; index++) callback(arr[index], index, arr)
    }

    function eachTrigger(arr, context, args) {
        var val = !0;
        return forEach(arr.slice(0), function(f) {
            f.apply(context, args) === !1 && (val = !1)
        }), val
    }
    var Class = require("common/class-debug"),
        Rex = /(\w+)\.?(.*)/,
        arrProSlice = Array.prototype.slice,
        Events = Class.create({
            add: function(type, callback) {
                var meEventsSpace, meEventsNameSpace, me = this,
                    meEvents = me.__events__,
                    ns = getNameSpace(type);
                return ns && (meEvents || (meEvents = me.__events__ = {}), (meEventsSpace = meEvents[ns.eventType]) || (meEventsSpace = meEvents[ns.eventType] = []), meEventsSpace.push(callback), ns.nameSpace && ((meEventsNameSpace = meEventsSpace[ns.nameSpace]) || (meEventsNameSpace = meEventsSpace[ns.nameSpace] = []), meEventsNameSpace.push(callback))), me
            },
            remove: function(type) {
                var meEventsSpace, meEventsNameSpace, me = this,
                    meEvents = me.__events__,
                    ns = getNameSpace(type);
                ns && meEvents && (meEventsSpace = meEvents[ns.eventType]) && (ns.nameSpace ? ((meEventsNameSpace = meEventsSpace[ns.nameSpace]) && forEach(meEventsNameSpace, function(a) {
                    removeTarget(meEventsSpace, a)
                }), delete meEventsSpace[ns.nameSpace]) : delete meEvents[ns.eventType])
            },
            on: function(type, callback) {
                var me = this;
                return forEach(type.split(","), function(a) {
                    me.add(a, callback)
                }), me
            },
            off: function(type) {
                var me = this;
                return forEach(type.split(","), function(a) {
                    me.remove(a)
                }), me
            },
            once: function(type, callback) {
                var me = this;
                return forEach(type.split(","), function(a) {
                    me.on(a, function() {
                        me.off(a), callback.call(this)
                    })
                }), me
            },
            trigger: function(type, context) {
                var meEventsSpace, meEventsNameSpace, me = this,
                    meEvents = me.__events__,
                    args = arrProSlice.call(arguments),
                    ns = getNameSpace(args.shift());
                return !(ns && meEvents && (meEventsSpace = meEvents[ns.eventType])) || (ns.nameSpace ? (meEventsNameSpace = meEventsSpace[ns.nameSpace]) && eachTrigger(meEventsNameSpace, me, args) : eachTrigger(meEventsSpace, me, args))
            },
            clearEvents: function() {
                var me = this;
                return delete me.__events__, me
            }
        });
    return Events
});
"use strict";
define("common/class-debug", [], function(require, exports) {
    function noName(key) {
        return "extend" !== key && "superClass" !== key
    }

    function mix(CUR, TAR, NEEDPROP, CALLBACK) {
        CALLBACK = "function" == typeof CALLBACK ? CALLBACK : K;
        for (var i in TAR)(TAR.hasOwnProperty(i) || NEEDPROP) && CALLBACK(i) && (CUR[i] = TAR[i]);
        return CUR
    }

    function E() {}

    function createPro(PRO) {
        var create = Object.create;
        return create ? create(PRO) : PRO.__proto__ ? {
            __proto__: PRO
        } : (E.prototype = PRO, new E)
    }

    function extend(SUB, PAR) {
        return SUB.prototype = createPro(PAR.prototype), SUB.prototype.constructor = SUB, SUB.superClass = PAR.prototype, SUB
    }

    function implement(CLS, PROP) {
        return "Implements,Statics".replace(Rex, function(a) {
            PROP && (!PROP[a] && (PROP[a] = emptyArr), PROP.hasOwnProperty(a) && Class[a](CLS, PROP[a]), delete PROP[a])
        }), mix(CLS.prototype, PROP), CLS
    }
    var Class = {},
        emptyArr = [],
        K = function(k) {
            return k
        },
        Rex = /\w+/g;
    return Class.create = function(PROP) {
        function subClass() {
            var init = this.init;
            return init && init.apply(this, arguments)
        }
        return implement(subClass, PROP), subClass.prototype.constructor = subClass, subClass.extend = function(PROP) {
            return Class.extend(subClass, PROP)
        }, subClass
    }, Class.extend = function(PAR, PROP) {
        if ("function" != typeof PAR) throw "Class extend error!! parent class need a function";
        return implement(extend(Class.create(), PAR), PROP)
    }, Class.instanceOf = function(OBJ, CLS) {
        return OBJ instanceof CLS && OBJ.constructor === CLS
    }, Class.Statics = function(CLS, ARR) {
        ARR = [].concat(ARR);
        var item;
        for (CLS.superClass && mix(CLS, CLS.superClass.constructor, !1, noName); item = ARR.shift();) mix(CLS, item, !1, noName)
    }, Class.Implements = function(CLS, ARR) {
        var item, prop = CLS.prototype;
        for (ARR = [].concat(ARR); item = ARR.shift();) mix(prop, item.prototype || item, !0)
    }, Class
});