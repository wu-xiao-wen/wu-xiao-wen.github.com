"use strict";
define("common/attrs-debug", ["common/class-debug"], function(require, exports) {
    function K(k) {
        return k
    }

    function isObject(obj) {
        return obj === Object(obj) && !obj.nodeType && !obj.jquery
    }

    function indexOfArr(arr, ele, formIndex) {
        if (arr.indexOf) return arr.indexOf(ele, formIndex);
        var length = arr.length;
        for (formIndex = ~~formIndex; formIndex < length; formIndex++)
            if (arr[formIndex] === ele) return formIndex;
        return -1
    }

    function eachArr(arr, callback, context) {
        if (!arr.forEach) return arr.forEach(callback, context);
        for (var index = 0, length = arr.length; index < length; index++) callback.call(context, arr[index], index, arr)
    }

    function eachObj(obj, callback) {
        for (var key in obj) obj.hasOwnProperty(key) && callback(obj[key], key)
    }

    function extendObj(origin, target, flag) {
        return flag ? eachObj(target, function(val, key) {
            void 0 === origin[key] && (origin[key] = val)
        }) : eachObj(target, function(val, key) {
            origin[key] = val
        }), origin
    }

    function noSetGet(option) {
        return !option || !option.hasOwnProperty("set") && !option.hasOwnProperty("get")
    }

    function formatWritable(writable) {
        return void 0 === writable || !!writable
    }

    function mixOptin(value, option) {
        return option = option || {}, noSetGet(option) ? {
            value: option.value || value,
            writable: formatWritable(option.writable),
            enumerable: !0,
            configurable: !0,
            __isAttr__: !0
        } : {
            get: option.get || K,
            set: option.set || K,
            enumerable: !0,
            configurable: !0,
            __isAttr__: !0
        }
    }

    function fixSet(option, value, name, attrVal, attrs) {
        if (noSetGet(option)) {
            if (!formatWritable(attrVal && attrVal.writable)) throw "TypeError: Cannot redefine property: " + name;
            option.value = value
        } else attrVal && option.set.call(attrs, value)
    }

    function fixGet(option, attrs) {
        var val;
        return noSetGet(option) ? option && option.value : (val = option.get.call(attrs), val && val.__isAttr__ ? fixGet(val, attrs) : val)
    }
    var Class = require("common/class-debug"),
        objectDefineProperty = Object.defineProperty,
        isEcma5 = (Object.getOwnPropertyDescriptor, !!Object.create),
        REX = /\w+/g,
        unshift = Array.prototype.unshift,
        Attrs = Class.create({
            initBseAttr: function() {
                var me = this;
                me.__attrs__ = me.__attrs__ || {}, me.__attrsName__ = me.__attrsName__ || []
            },
            initAttrs: function(config) {
                var me = this;
                eachObj(extendObj(me.recursiveAttrs("attrs").origin, config), function(val, key) {
                    me.set(key, val)
                })
            },
            resetAttrs: function(config) {
                var me = this;
                eachObj(config, function(val, key) {
                    me.set(key, val)
                })
            },
            set: function(name, value, option) {
                var newOption, me = this,
                    attrs = me.getAttrs("attrs"),
                    attrsName = me.getAttrs("attrsName"),
                    attrVal = attrs[name],
                    hasVal = attrs.hasOwnProperty(name);
                return !hasVal && attrsName.push(name), !isObject(value) || !value.hasOwnProperty("value") && noSetGet(value) || (option = value, value = option.value), newOption = mixOptin(value, option), isEcma5 ? hasVal && !option ? attrs[name] = value : objectDefineProperty(attrs, name, newOption) : fixSet(hasVal && !option ? attrVal : attrs[name] = newOption, newOption.value, name, attrVal, attrs), me
            },
            get: function(name) {
                var me = this,
                    attrs = me.getAttrs("attrs");
                return isEcma5 ? attrs[name] : fixGet(attrs[name], attrs)
            },
            getAttrs: function(key) {
                var me = this,
                    some = me["__" + key + "__"];
                return some ? some : (me.initBseAttr(), me["__" + key + "__"])
            },
            eachAttrs: function(callback) {
                var me = this,
                    attrsName = (me.getAttrs("attrs"), me.getAttrs("attrsName"));
                return callback = callback || me.K, eachArr(attrsName, function(val, key) {
                    callback(me.get(val), val)
                }), me
            },
            removeAttrs: function(keys) {
                var me = this,
                    attrs = me.getAttrs("attrs"),
                    attrsName = me.getAttrs("attrsName");
                return keys.replace(REX, function(a) {
                    var index;
                    (index = indexOfArr(attrsName, a)) !== -1 && (attrsName.splice(index, 1), delete attrs[a])
                }), me
            },
            clearAttrs: function() {
                var me = this;
                return me.__attrs__ = {}, me.__attrsName__ = [], me
            },
            recursiveAttrs: function(key) {
                for (var superClass, attrs, me = this, prop = me.constructor.prototype, origin = {}, arr = [], tempArr = [];
                    (superClass = prop.constructor.superClass) && prop;) prop.hasOwnProperty(key) && (attrs = prop[key]) && (tempArr.length = 0, eachObj(attrs, function(val, key) {
                    void 0 === origin[key] && tempArr.push(key)
                }), unshift.apply(arr, tempArr), extendObj(origin, attrs, !0)), prop = superClass;
                return {
                    origin: origin,
                    arr: arr
                }
            }
        });
    return Attrs
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