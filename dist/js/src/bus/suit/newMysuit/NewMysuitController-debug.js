"use strict";
define("src/bus/suit/newMysuit/NewMysuitController-debug", ["common/jquery-debug", "common/limit-debug", "common/limit-dom-debug", "common/cookie-debug", "common/reflux-debug"], function(require, exports, module) {
    function parseNav() {
        var firstKey, firstUrl, map = {};
        return nav.forEach(function(val, index) {
            val.forEach(function(val, key) {
                val.val && (firstUrl || (firstKey = val.key, firstUrl = val.val), map[val.key] = val.val)
            })
        }), {
            firstKey: firstKey,
            firstUrl: firstUrl,
            map: map
        }
    }

    function firstNav() {
        var hashVal, nav = parseNav(),
            map = {},
            hash = window.location.hash.slice(1);
        return (hashVal = nav.map[hash]) ? (map.firstKey = hash, map.firstUrl = hashVal) : (map.firstKey = nav.firstKey, map.firstUrl = nav.firstUrl), map
    }
    var $ = require("common/jquery-debug"),
        limit = require("common/limit-debug"),
        Cookie = require("common/cookie-debug"),
        Reflux = require("common/reflux-debug"),
        mainNode = $("#suit-content"),
        nav = mainNode.data("nav"),
        navData = firstNav(),
        Actions = Reflux.createActions(["targetNav", "loginOut"]),
        Stroe = Reflux.createStore({
            listenables: [Actions],
            getInitialState: function() {
                return this.store
            },
            store: {
                head: mainNode.data("head"),
                nav: nav,
                navMap: mainNode.data("navMap"),
                indexLink: "/portal/main/domain/index.htm",
                loginOutLink: "/loginOut.do",
                navKey: navData.firstKey,
                iframeName: "newMysuitIframe",
                firstNav: navData.firstUrl
            },
            onTargetNav: function(e) {
                var key, me = this,
                    node = $(e.target);
                "_blank" !== node.prop("target") && (key = node.data("key"), me.store.navKey = key, me.trigger(me.store), window.location.hash = key)
            },
            onLoginOut: function() {
                var me = this,
                    toLoginOut = top.toLoginOut;
                limit.isFunction(toLoginOut) && toLoginOut(), Cookie.setPath("/"), Cookie.remove("InvestigationPID"), window.location.href = me.store.loginOutLink
            }
        });
    module.exports = {
        Actions: Actions,
        Stroe: Stroe,
        Reflux: Reflux
    }
});
"use strict";
define("common/jquery-debug", [], function(require, exports) {
    return jQuery
});
"use strict";
define("common/limit-debug", ["common/limit-dom-debug"], function(require, exports, module) {
    function equalBase(a, b, type) {
        var fn = WIN[type];
        return fn(a) === fn(b)
    }

    function equal(a, b) {
        return size(a) === size(b) && every(getLoopKey(a), function(val, key) {
            return isEqual(a[val], b[val])
        })
    }

    function fixCodePointAt(codeH, codeL) {
        return codeH = padStart((1023 & codeH).toString(2), "0", 10), codeL = padStart((1023 & codeL).toString(2), "0", 10), (parseInt(codeH + codeL, 2) + 65536).toString(16)
    }

    function parseUnicode(str16) {
        if (parseInt(str16, 16) <= 65535) return [str16];
        var origin = parseInt(str16, 16) - 65536,
            originH = origin >> 10,
            originL = 1023 & origin;
        return originH = (55296 | originH).toString(16).toUpperCase(), originL = (56320 | originL).toString(16).toUpperCase(), [originH, originL]
    }

    function stringIncludes(str, arg, index) {
        return str = limitToString(str), nativeStringIncludes ? nativeStringIncludes.call(str, arg, index) : str.indexOf(arg, index) !== -1
    }

    function padStartEnd(str, arg, leg, flag) {
        str = limitToString(str), arg = limitToString(arg), leg = ~~leg;
        var min, max = str.length,
            nativeMethod = flag ? nativePadStart : nativePadEnd;
        return max >= leg ? str : nativeMethod ? nativeMethod.call(str, arg, leg) : (min = Math.ceil((leg - max) / arg.length), flag ? (repeat(arg, min) + str).slice(-leg) : (str + repeat(arg, min)).slice(0, leg))
    }

    function padChar(n, len) {
        for (null == n && (n = ""), n += "", len = ~~len; n.length < len;) n += n;
        return n.slice(0, len)
    }

    function positive(num) {
        return num = ~~num, num < 0 ? 0 : num
    }

    function checkNum() {
        var flag = !0;
        return breakEach(concat.apply(arrayProto, arguments), function(val) {
            if (!limitIsFinite(val)) return log("warn", val, "the num is not a finite number"), flag = !1
        }), flag
    }

    function getMaxScale() {
        if (checkNum.apply(void 0, arguments)) return Math.max.apply(Math, map(arguments, function(val) {
            return (("" + val).split(".")[1] || "").length
        }))
    }

    function movePointRight(sign, leftStr, rightStr, scale) {
        return scale < rightStr.length ? sign + leftStr + rightStr.slice(0, scale) + "." + rightStr.slice(scale) : sign + leftStr + padEnd(rightStr, "0", scale)
    }

    function movePointLeft(sign, leftStr, rightStr, scale) {
        return leftStr.length > scale ? sign + leftStr.slice(0, -scale) + "." + leftStr.slice(-scale) + rightStr : sign + "0." + padStart(leftStr, "0", scale) + rightStr
    }

    function movePoint(num, scale) {
        if (checkNum(num)) {
            if (num += "", scale = ~~scale, 0 === scale) return num;
            var leftStr, rightStr, sign = "";
            return num = num.split("."), leftStr = num[0], rightStr = num[1] || "", "-" === leftStr.charAt(0) && (sign = "-", leftStr = leftStr.slice(1)), scale < 0 ? movePointLeft(sign, leftStr, rightStr, -scale) : movePointRight(sign, leftStr, rightStr, scale)
        }
    }

    function getNeedNum(args, falg) {
        var tar = args[0] + "",
            arg = args[1] + "",
            medTar = (tar.split(".")[1] || "").length,
            medArg = (arg.split(".")[1] || "").length,
            num = falg ? +movePoint(+tar.replace(".", "") * +arg.replace(".", ""), -(medTar + medArg)) : +movePoint(+tar.replace(".", "") / +arg.replace(".", ""), medArg - medTar);
        return args.splice(0, 2, num), num
    }

    function getLoopKey(obj) {
        return keys(isArrayLike(obj) ? toArray(obj) : obj)
    }

    function loop(obj, iterator, context, isBreak, begin) {
        for (var key, target = getLoopKey(obj), num = ~~begin, len = target.length; num < len && (key = target[num], iterator.call(context, obj[key], key, obj) !== !1 || !isBreak); num++);
    }

    function arrayIncludes(arr, target, index) {
        if (nativeArrayIncludes) {
            var result = !1;
            return loop(arr, limitIsNaN(target) ? function(val) {
                if (limitIsNaN(val)) return result = !0, !1
            } : function(val) {
                if (val === target) return result = !0, !1
            }, void 0, !0, index >= 0 ? index : arr.length + index), result
        }
        return nativeArrayIncludes.call(arr, target, index)
    }

    function fixFindAndFindIndex(arr, iterator, context) {
        var result = {
            key: -1,
            val: void 0
        };
        return breakEach(arr, function(val, key) {
            if (iterator.call(this, val, +key)) return result = {
                key: key,
                val: val
            }, !1
        }, context), result
    }

    function whiteBlack(factor, val1) {
        return some(factor, function(val2) {
            return every(val2, function(val3, key3) {
                return val3 === val1[key3]
            })
        })
    }
    var limitDom = require("common/limit-dom-debug"),
        limit = {},
        arrayProto = Array.prototype,
        objectProto = Object.prototype,
        functionProto = Function.prototype,
        stringProto = String.prototype,
        WIN = window,
        slice = (WIN.document, arrayProto.slice),
        splice = arrayProto.splice,
        concat = arrayProto.concat,
        unshift = arrayProto.unshift,
        push = arrayProto.push,
        toString = objectProto.toString,
        hasOwnProperty = objectProto.hasOwnProperty;
    limit.slice = slice;
    var nativeKeys = Object.keys,
        nativeCreate = Object.create,
        nativeForEach = arrayProto.forEach,
        nativeIndexOf = arrayProto.indexOf,
        nativeLastIndexOf = arrayProto.lastIndexOf,
        nativeMap = arrayProto.map,
        nativeFilter = arrayProto.filter,
        nativeEvery = arrayProto.every,
        nativeSome = arrayProto.some,
        nativeReduce = arrayProto.reduce,
        nativeReduceRight = arrayProto.reduceRight,
        nativeBind = functionProto.bind,
        nativeTrim = stringProto.trim,
        nativeCodePointAt = stringProto.codePointAt,
        nativeFromCodePoint = String.fromCodePoint,
        nativeStringIncludes = stringProto.includes,
        nativeStartsWith = stringProto.startsWith,
        nativeEndsWith = stringProto.endsWith,
        nativeRepeat = stringProto.repeat,
        nativePadStart = stringProto.padStart,
        nativePadEnd = stringProto.padEnd,
        nativeArrayIncludes = arrayProto.includes,
        nativeFind = arrayProto.find,
        nativeFindIndex = arrayProto.findIndex,
        nativeFill = arrayProto.fill,
        nativeCopyWithin = arrayProto.copyWithin,
        K = limit.K = function(k) {
            return k
        },
        cb = limit.cb = function(callback) {
            return isFunction(callback) ? callback : K
        },
        O = limit.O = {},
        logColor = {
            log: "background:#333;margin-left:11px;padding-right:17px;",
            error: "background:#F00;padding-right:3px;",
            warn: "background:#F70;margin-left:11px;padding-right:10px;"
        },
        log = limit.log = function() {
            if (!limit.logClosed) {
                var log, args = slice.call(arguments),
                    type = args.shift(),
                    con = console || O,
                    isChrome = limitDom.isChrome;
                contains(["error", "log", "warn"], type) || (args.unshift(type), type = "error"), log = con[type] || K;
                try {
                    isChrome && args.unshift(logColor[type] + "color:#FFF;padding-left:3px;border-radius:3px;"), args.unshift((isChrome ? "%c" : "") + "limitJS " + type + ":"), log.apply(con, args)
                } catch (e) {
                    log("limitJS ", args)
                }
            }
        },
        typeWarn = {
            toString: function(obj) {
                return log("warn", obj, "change into", "'" + obj + "'", "limit.toString is called")
            },
            toArray: function(obj) {
                return log("warn", obj, "change into []", "limit.toArray is called")
            },
            formatDate: function(timestamp, data) {
                return log("warn", "timestamp:", timestamp, "date:", date, "limit.formatDate is called")
            },
            bind: function(obj) {
                return log("warn", fun, "type is not function, limit.bind is called")
            }
        },
        isUndefined = limit.isUndefined = function(n) {
            return void 0 === n
        };
    limit.setDefault = function(n) {
        var result;
        return breakEach(arguments, function(val) {
            return result = val, isUndefined(val)
        }), result
    };
    var isNull = (limit.isDefined = function(n) {
            return !isUndefined(n)
        }, limit.isNull = function(n) {
            return null === n
        }),
        isFunction = limit.isFunction = function(n) {
            return "function" == typeof n
        };
    limit.isBoolean = function(n) {
        return n === !0 || n === !1 || "[object Boolean]" === toString.call(n)
    };
    "String,Number,Array,Date,RegExp,Error,Math".replace(/\w+/g, function(k) {
        limit["is" + k] = function(n) {
            return toString.call(n) === "[object " + k + "]"
        }
    });
    var isNumber = limit.isNumber,
        isArray = limit.isArray,
        isDate = limit.isDate,
        isMath = limit.isMath,
        isError = limit.isError,
        isRegExp = limit.isRegExp,
        isString = limit.isString,
        isObject = limit.isObject = function(n) {
            return isFunction(n) || "object" == typeof n && !!n
        },
        isArrayLike = (limit.isArguments = function(n) {
            return has(n, "callee")
        }, limit.isArrayLike = function(n) {
            return !!n && isNumber(n.length) && !isFunction(n) && !isWin(n)
        }),
        limitIsNaN = limit.isNaN = Number.isNaN || function(n) {
            return isNumber(n) && isNaN(n)
        },
        limitIsFinite = limit.isFinite = Number.isFinite || function(n) {
            return isNumber(n) && isFinite(n)
        },
        isInteger = limit.isInteger = Number.isInteger || function(n) {
            return limitIsFinite(n) && Math.floor(n) === n
        };
    limit.isSafeInteger = Number.isSafeInteger || function(n) {
        return isInteger(n) && -9007199254740992 < n && n < 9007199254740992
    };
    var isEmpty = limit.isEmpty = function(n) {
        return null == n || 0 === size(n)
    };
    limit.isElement = function(n) {
        return !!n && 1 === n.nodeType
    }, limit.isDocument = function(n) {
        return !!n && 9 === n.nodeType
    };
    var isWin = limit.isWin = function(n) {
            return !!n && n.window === n && n.self == n
        },
        equalBaseArr = ["String", "Number", "Boolean"],
        isEqual = limit.isEqual = function(a, b) {
            if (log("log", "limit.isEqual is called ", typeof a, ":", a, typeof b, ":", b), a === b) return !0;
            if (toString.call(a) !== toString.call(b)) return !1;
            if (limitIsNaN(a)) return !0;
            var type;
            return (type = isBase(a, equalBaseArr)) ? equalBase(a, b, type) : isDate(a) ? +a === +b : isRegExp(a) ? "" + a == "" + b : (!isFunction(a) || "" + a == "" + b) && equal(a, b)
        },
        baseArr = ["String", "Number", "Boolean", "Null", "Undefined", "RegExp", "Date", "Math", "Error"],
        isBase = limit.isBase = function(n, list) {
            !isArray(list) && (list = baseArr);
            var type = "";
            return some(list, function(val, key) {
                var fn = limit["is" + val];
                return fn && fn(n) && (type = val)
            }), type
        };
    limit.includes = function(obj, arg, index) {
        return isArray(obj) ? arrayIncludes(obj, arg, index) : stringIncludes(obj, arg, index)
    };
    var limitToString = limit.toString = function(obj) {
            return isString(obj) ? obj : (typeWarn.toString(obj), "" + obj)
        },
        REG_EXP_TRIM = /^\s+|\s+$/g;
    limit.trim = function(n) {
        return n = arguments.length ? n + "" : "", nativeTrim ? nativeTrim.call(n) : n.replace(REG_EXP_TRIM, "")
    };
    limit.codePointAt = function(str, index) {
        if (str = limitToString(str), index = ~~index, nativeCodePointAt) {
            var code = str.charCodeAt(index);
            return code >= 55296 && code <= 56319 ? fixCodePointAt(code, str.charCodeAt(++index)) : code.toString(16)
        }
        return nativeCodePointAt.call(str, index).toString(16)
    }, limit.fromCodePoint = function(code) {
        return isFinite(code) ? nativeFromCodePoint ? nativeFromCodePoint.call(String, code) : (code = map(parseUnicode(code.toString(16)), function(val) {
            return "\\u" + val
        }).join(""), new Function('return "' + code + '"')()) : (log("warn", code, "the code must be a number"), "")
    }, limit.startsWith = function(str, arg, index) {
        return str = limitToString(str), nativeStartsWith ? nativeStartsWith.call(str, arg, index) : (index = ~~index, str.indexOf(arg, index) === index)
    }, limit.endsWith = function(str, arg, index) {
        if (str = limitToString(str), nativeEndsWith) return nativeEndsWith.call(str, arg, index);
        index = 3 === arguments.length ? ~~index : str.length;
        var leg = index - arg.length;
        return str.lastIndexOf(arg, leg) === leg
    };
    var repeat = limit.repeat = function(str, leg) {
            if (str = limitToString(str), leg = positive(leg), nativeRepeat) return nativeRepeat.call(str, leg);
            var arr = new Array(leg),
                tem = [];
            return Array.prototype.push.apply(tem, arr), tem.map(function() {
                return str
            }).join("")
        },
        padStart = limit.padStart = function(str, arg, leg) {
            return padStartEnd(str, arg, leg, !0)
        },
        padEnd = limit.padEnd = function(str, arg, leg) {
            return padStartEnd(str, arg, leg, !1)
        },
        REG_THOUSAND_SEPARATOR = (limit.random = function(form, to) {
            form = ~~form, to = ~~to;
            var max = Math.max(form, to),
                min = Math.min(form, to);
            return Math.floor((max - min + 1) * Math.random() + min)
        }, /(\d{1,3})(?=(\d{3})+$)/g),
        REG_THOUSAND_SEPARATOR_POINT = /(\d{1,3})(?=(\d{3})+\.)/g,
        REG_THOUSAND_SEPARATOR_COMMA = /,/g;
    limit.thousandSeparator = function(num, med) {
        return limitIsFinite(num) ? (isNumber(med) || (med = 2), toFixed(num, med).replace(med ? REG_THOUSAND_SEPARATOR_POINT : REG_THOUSAND_SEPARATOR, "$1,")) : (log("warn", "limit.thousandSeparator is called ", typeof num, ":", num), "")
    }, limit.unThousandSeparator = function(str) {
        return isString(str) ? +str.replace(REG_THOUSAND_SEPARATOR_COMMA, "") : (log("warn", "limit.unThousandSeparator is called ", typeof str, ":", str), NaN)
    };
    var toFixed = limit.toFixed = function(num, scale) {
        scale = positive(scale);
        var num = movePoint(num, scale);
        return isUndefined(num) ? num : movePoint(Math.round(num), -scale)
    };
    limit.plus = function() {
        var maxScale = getMaxScale.apply(void 0, arguments);
        if (!isUndefined(maxScale)) return reduce.call(void 0, arguments, function(before, val) {
            return +movePoint(+movePoint(before, maxScale) + +movePoint(val, maxScale), -maxScale)
        })
    }, limit.minus = function() {
        var maxScale = getMaxScale.apply(void 0, arguments);
        if (!isUndefined(maxScale)) return reduce.call(void 0, arguments, function(before, val) {
            return +movePoint(+movePoint(before, maxScale) - +movePoint(val, maxScale), -maxScale)
        })
    };
    var multiply = limit.multiply = function() {
            if (checkNum.apply(void 0, arguments)) {
                var args = toArray(arguments),
                    num = getNeedNum(args, !0);
                return args.length <= 1 ? num : multiply.apply(void 0, args)
            }
        },
        except = limit.except = function() {
            if (checkNum.apply(void 0, arguments)) {
                var args = toArray(arguments),
                    num = getNeedNum(args, !1);
                return limitIsNaN(num) ? args[0] / args[1] : args.length <= 1 ? num : except.apply(void 0, args)
            }
        },
        has = limit.has = function(n, k) {
            return null != n && hasOwnProperty.call(n, k)
        },
        E = function() {},
        create = limit.create = function(prop) {
            return null == prop ? {} : nativeCreate ? nativeCreate(prop) : prop.__proto__ ? {
                __proto__: prop
            } : (E.prototype = prop, new E)
        },
        forIn = limit.forIn = function(obj, iterator, context) {
            if (null == obj) return obj;
            for (var key in obj) iterator.call(context, obj[key], key, obj);
            return obj
        },
        keys = limit.keys = function(obj) {
            if (null == obj) return [];
            if (nativeKeys) return nativeKeys.call(Object, obj);
            var arr = [];
            return forIn(obj, function(val, key) {
                has(obj, key) && arr.push(key)
            }), arr
        },
        size = limit.size = function(obj) {
            return getLoopKey(obj).length
        },
        each = limit.each = function(obj, iterator, context) {
            return iterator = cb(iterator), isArrayLike(obj) && nativeForEach ? nativeForEach.call(obj, function(val, key) {
                iterator.call(this, val, "" + key)
            }, context) : loop(obj, iterator, context)
        },
        breakEach = limit.breakEach = function(obj, iterator, context) {
            return loop(obj, iterator, context, !0)
        },
        extend = limit.extend = function(obj, isOwn) {
            function main(val, key) {
                obj[key] = val
            }
            return isObject(obj) ? (isOwn !== !0 ? each(slice.call(arguments, 1), function(val) {
                forIn(val, main)
            }) : each(slice.call(arguments, 2), function(val) {
                each(val, main)
            }), obj) : obj
        },
        copyArr = (limit.defaults = function(obj, isOwn) {
            function main(val, key) {
                isUndefined(obj[key]) && (obj[key] = val)
            }
            return isObject(obj) ? (isOwn !== !0 ? each(slice.call(arguments, 1), function(val) {
                forIn(val, main)
            }) : each(slice.call(arguments, 2), function(val) {
                each(val, main)
            }), obj) : obj
        }, limit.clone = function(obj) {
            return isBase(obj) ? copy(obj) : isFunction(obj) ? extend(function() {
                return obj.apply(this, arguments)
            }, obj) : isArray(obj) ? slice.call(obj) : extend({}, obj)
        }, ["String", "Number", "Boolean", "Null", "Undefined"]),
        copy = limit.copy = function(obj) {
            var type;
            if (type = isBase(obj, copyArr)) return isObject(obj) ? new WIN[type](obj.valueOf()) : obj;
            if (isMath(obj)) return obj;
            if (isRegExp(obj)) return new RegExp(obj.source, (obj.global ? "g" : "") + (obj.multiline ? "m" : "") + (obj.ignoreCase ? "i" : ""));
            if (isDate(obj)) return new Date(obj.getTime());
            if (isError(obj)) return new Error(obj.message);
            var value = {};
            return isArray(obj) && (value = []), isFunction(obj) && (value = function() {
                return obj.apply(this, arguments)
            }), forIn(obj, function(val, key) {
                value[key] = copy(val)
            }), value
        };
    limit.getObject = function(obj) {
        return breakEach(slice.call(arguments, 1), function(val) {
            try {
                obj = obj[val]
            } catch (e) {
                return obj = void 0, !1
            }
        }), obj
    };
    var is = limit.is = Object.is || function(a, b) {
            return !(!limitIsNaN(a) || !limitIsNaN(b)) || (0 === a && 0 === b ? 1 / a === 1 / b : a === b)
        },
        from = limit.from = Array.from || function(obj, iterator, context) {
            var arr = [];
            return iterator = cb(iterator), obj && obj.length ? (push.apply(arr, slice.call(obj)), map(arr, iterator, context)) : arr
        };
    limit.of = Array.of || function() {
        return slice.call(arguments)
    };
    var toArray = limit.toArray = function(obj) {
            return isArray(obj) ? obj : isArrayLike(obj) ? slice.call(obj) : (typeWarn.toArray(obj), [])
        },
        getArray = limit.getArray = function(arr) {
            switch (arr = toArray(arr), arr.length) {
                case 0:
                    return null;
                case 1:
                    return arr[0];
                default:
                    return arr
            }
        },
        indexOf = limit.indexOf = function(arr, ele, formIndex) {
            if (isEmpty(arr)) return -1;
            if (isArrayLike(arr) && (arr = toArray(arr)), nativeIndexOf && nativeIndexOf === arr.indexOf) return nativeIndexOf.apply(arr, slice.call(arguments, 1));
            var isArr = isArray(arr),
                index = -1;
            return loop(arr, function(val, key) {
                if (val === ele) return index = key, !1
            }, void 0, !0, ~~formIndex), isArr ? +index : index
        },
        forEach = (limit.lastIndexOf = function(arr, ele, formIndex) {
            if (arr = toArray(arr), nativeLastIndexOf) return nativeLastIndexOf.apply(arr, slice.call(arguments, 1));
            formIndex = ~~formIndex;
            var len = arr.length - 1,
                index = indexOf(arr.reverse(), ele, 3 === arguments.length ? len - formIndex : formIndex);
            return index === -1 ? -1 : len - index
        }, limit.forEach = function(arr, iterator, context) {
            return arr = toArray(arr), iterator = cb(iterator), each(arr, function(val, key) {
                iterator.call(this, val, +key, arr)
            }, context)
        }),
        map = limit.map = function(arr, iterator, context) {
            if (isEmpty(arr)) return arr;
            if (isArrayLike(arr) && (arr = toArray(arr)), iterator = cb(iterator), nativeMap && nativeMap === arr.map) return nativeMap.call(arr, iterator, context);
            var isArr = isArray(arr),
                result = isArr ? [] : {};
            return each(arr, function(val, key) {
                result[key] = iterator.call(this, val, key, arr)
            }, context), result
        },
        filter = limit.filter = function(arr, iterator, context) {
            if (isEmpty(arr)) return arr;
            if (isArrayLike(arr) && (arr = toArray(arr)), iterator = cb(iterator), nativeFilter && nativeFilter === arr.filter) return nativeFilter.call(arr, iterator, context);
            var isArr = isArray(arr),
                result = isArr ? [] : {};
            return isArr ? each(arr, function(val, key) {
                iterator.call(this, val, key, arr) && result.push(val)
            }, context) : each(arr, function(val, key) {
                iterator.call(this, val, key, arr) && (result[key] = val)
            }), result
        },
        every = limit.every = function(arr, iterator, context) {
            if (isEmpty(arr)) return !1;
            if (isArrayLike(arr) && (arr = toArray(arr)), iterator = cb(iterator), nativeEvery && nativeEvery === arr.every) return nativeEvery.call(arr, iterator, context);
            var result = !0,
                isArr = isArray(arr);
            return breakEach(arr, function(val, key) {
                if (!iterator.call(this, val, isArr ? +key : key, arr)) return result = !1
            }, context), result
        },
        some = limit.some = function(arr, iterator, context) {
            if (isEmpty(arr)) return !1;
            if (isArrayLike(arr) && (arr = toArray(arr)), iterator = cb(iterator), nativeSome && nativeSome === arr.some) return nativeSome.call(arr, iterator, context);
            var result = !1,
                isArr = isArray(arr);
            return breakEach(arr, function(val, key) {
                if (iterator.call(this, val, isArr ? +key : key, arr)) return result = !0, !1
            }, context), result
        },
        ERR_MSG_REDUCE = new TypeError("Reduce of empty array with no initial value"),
        reduce = limit.reduce = function(arr, iterator, init) {
            arr = toArray(arr);
            var args = slice.call(arguments, 1);
            if (args[0] = iterator = cb(iterator), nativeReduce) return nativeReduce.apply(arr, args);
            var len = args.length,
                index = 0,
                noInit = 1 === len,
                result = noInit ? arr[index++] : init;
            if (noInit && 0 === arr.length) throw ERR_MSG_REDUCE;
            return loop(arr, function(val, key) {
                result = iterator.call(this, result, val, +key, arr)
            }, void 0, !1, index), result
        },
        contains = (limit.reduceRight = function(arr, iterator, init) {
            arr = toArray(arr);
            var args = slice.call(arguments, 1);
            if (args[0] = iterator = cb(iterator), nativeReduceRight) return nativeReduceRight.apply(arr, args);
            var len = arr.length - 1;
            return args.unshift(arr.reverse()), args[1] = function(before, val, key, arr) {
                return iterator(before, val, len - key, arr)
            }, reduce.apply(void 0, args)
        }, limit.contains = function(arr, target) {
            var result = !1;
            return loop(arr, function(val) {
                if (is(val, target)) return result = !0, !1
            }, void 0, !0), result
        });
    limit.find = function(arr, iterator, context) {
        return arr = toArray(arr), iterator = cb(iterator), nativeFind ? nativeFind.call(arr, iterator, context) : fixFindAndFindIndex(arr, iterator, context).val
    }, limit.findIndex = function(arr, iterator, context) {
        return arr = toArray(arr), iterator = cb(iterator), nativeFindIndex ? nativeFind.call(arr, iterator, context) : fixFindAndFindIndex(arr, iterator, context).key
    };
    var difference = limit.difference = function(arr) {
        arr = toArray(arr);
        var result = concat.apply(arrayProto, slice.call(arguments, 1));
        return filter(arr, function(val) {
            return !contains(result, val)
        })
    };
    limit.without = function(arr) {
        var result = difference.apply(void 0, arguments);
        return arr.length = 0, push.apply(arr, result), arr
    };
    var flatten = (limit.union = function(arr, isEasy) {
        arr = toArray(arr);
        var target;
        return isEasy ? filter(arr.sort(), function(val, key) {
            return !(key && target === val || (target = val, 0))
        }) : (target = [], filter(arr, function(val, key) {
            return !contains(target, val) && (target.push(val), !0)
        }))
    }, limit.flatten = function() {
        var value = [];
        return forEach(arguments, function(val, key) {
            push.apply(value, isArray(val) ? flatten.apply(void 0, concat.apply(arrayProto, val)) : [val])
        }), value
    });
    limit.whiteList = function(arr) {
        var factor = concat.apply(arrayProto, slice.call(arguments, 1));
        return filter(arr, function(val1) {
            return whiteBlack(factor, val1)
        })
    }, limit.blackList = function(arr) {
        var factor = concat.apply(arrayProto, slice.call(arguments, 1));
        return filter(arr, function(val1) {
            return !whiteBlack(factor, val1)
        })
    }, limit.fill = function(arr, target, start, end) {
        if (arr = toArray(arr), nativeFill) return nativeFill.call(arr, target, start, end);
        var arrLen = arr.length;
        start = ~~start, end = ~~end, start = start <= 0 ? arrLen + start : start, end = end <= 0 ? arrLen + end : end, start < 0 && (start = 0), end > arrLen && (end = arrLen);
        var len = end - start;
        if (len > 0) {
            var arg = from(new Array(len), function() {
                return target
            });
            unshift.call(arg, start, len), splice.apply(arr, arg)
        }
        return arr
    }, limit.copyWithin = function(arr, target, start, end) {
        if (arr = toArray(arr), nativeCopyWithin) return nativeCopyWithin.call(arr, target, start, end)
    };
    var bind = limit.bind = function(fun) {
            function main() {
                if (this instanceof main) {
                    args.shift();
                    var context = create(fun.prototype),
                        tar = fun.apply(context, concat.apply(args, arguments));
                    return isObject(tar) ? tar : context
                }
                return fun.apply(args.shift(), concat.apply(args, arguments))
            }
            if (!isFunction(fun)) return typeWarn.bind(fun), K;
            if (nativeBind) return nativeBind.apply(fun, slice.call(arguments, 1));
            var args = slice.call(arguments, 1);
            return main.toString = function() {
                return "function () { [native code] }"
            }, main
        },
        delay = limit.delay = function(fun, wait) {
            var args = slice.call(arguments, 2);
            return unshift.call(args, fun, void 0), setTimeout(function() {
                bind.apply(void 0, args)()
            }, wait)
        },
        defer = limit.defer = function() {
            var args = slice.call(arguments);
            return args.splice(1, 0, 0), delay.apply(void 0, args)
        },
        defered = (limit.once = function(fun) {
            var args = slice.call(arguments, 2);
            return unshift.call(args, fun, arguments[1]),
                function main() {
                    return main.used ? void 0 : (main.used = !0, bind.apply(void 0, concat.apply(args, arguments))())
                }
        }, limit.defered = function() {
            function clean() {
                var one, temp;
                (one = list.shift()) ? (main.status = "pendding", defer(function() {
                    try {
                        var checkIsNull = ~~isNull(back[0]);
                        temp = back.slice(checkIsNull), back.length = 0, back[1] = one[one.allback ? "allback" : checkIsNull ? "sucback" : "errback"].apply(void 0, temp), back[0] = null
                    } catch (e) {
                        back[0] = e
                    }
                    clean()
                })) : main.status = "end"
            }
            var main = {},
                list = [],
                back = [null];
            return main.isDefered = !0, main.status = "init", main.then = function(sucback, errback) {
                return list.push({
                    sucback: sucback || K,
                    errback: errback || K
                }), main
            }, main.always = function(allback) {
                return list.push({
                    allback: allback || K
                }), main
            }, main.pass = function(err) {
                return arguments.length && (back[0] = err, push.apply(back, slice.call(arguments, 1))), clean(), main
            }, main
        });
    limit.when = function() {
        function endDo() {
            if (--guid <= 0) {
                var isSuc = isNull(getArray(errArgs));
                isSuc && sucArgs.unshift(null), theDefer.pass.apply(void 0, isSuc ? sucArgs : errArgs)
            }
        }
        var theDefer = defered(),
            guid = arguments.length,
            sucArgs = [],
            errArgs = [];
        return forEach(arguments, function(val, key) {
            val.isDefered ? (val.then(function() {
                sucArgs[key] = getArray(arguments)
            }, function() {
                errArgs[key] = getArray(arguments)
            }).always(endDo), "end" === val.status && val.pass()) : isFunction(val) ? defer(function() {
                try {
                    sucArgs[key] = val()
                } catch (e) {
                    errArgs[key] = e
                }
                endDo()
            }) : (sucArgs[key] = val, endDo())
        }), theDefer
    };
    var REG_EXP_DATA = /^(yyyy)(?:(.+)(MM))?(?:(.+)(dd))?(?:(.+)(HH))?(?:(.+)(mm))?(?:(.+)(ss))?(.+)?$/,
        FUN_DATAS = ["getFullYear", "getMonth", "getDate", "getHours", "getMinutes", "getSeconds"];
    return limit.formatDate = function(timestamp, formatStr) {
        !isNumber(timestamp) && (timestamp = +new Date), !isString(formatStr) && (formatStr = "yyyy-MM-dd HH:mm:ss");
        var date = new Date(timestamp);
        return limitIsNaN(+date) ? (typeWarn.formatDate(timestamp, data), "") : formatStr.replace(REG_EXP_DATA, function() {
            var arr = [];
            return forEach(slice.call(arguments, 1, -2), function(val, key) {
                var value;
                val && (key % 2 === 0 ? (value = date[FUN_DATAS[key / 2]](), "MM" === val && value++, "yyyy" !== val && (value = (padChar("0", 2) + value).slice(-2)), arr.push(value)) : arr.push(val))
            }), arr.join("")
        })
    }, limit
});
"use strict";
define("common/limit-dom-debug", [], function(require, exports) {
    var limitDom = {},
        WIN = window;
    WIN.document;
    return limitDom.isChrome = !!WIN.chrome, limitDom
});
define("common/reflux-debug", [], function(require, exports, module) {
    ! function(a) {
        if ("object" == typeof exports && "undefined" != typeof module) module.exports = a();
        else if ("function" == typeof define && define.amd) define([], a);
        else {
            var b;
            b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, b.Reflux = a()
        }
    }(function() {
        return function a(b, c, d) {
            function e(g, h) {
                if (!c[g]) {
                    if (!b[g]) {
                        var i = "function" == typeof require && require;
                        if (!h && i) return i(g, !0);
                        if (f) return f(g, !0);
                        var j = new Error("Cannot find module '" + g + "'");
                        throw j.code = "MODULE_NOT_FOUND", j
                    }
                    var k = c[g] = {
                        exports: {}
                    };
                    b[g][0].call(k.exports, function(a) {
                        var c = b[g][1][a];
                        return e(c ? c : a)
                    }, k, k.exports, a, b, c, d)
                }
                return c[g].exports
            }
            for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
            return e
        }({
            1: [function(a, b, c) {
                "use strict";

                function d(a, b, c) {
                    this.fn = a, this.context = b, this.once = c || !1
                }

                function e() {}
                var f = "function" != typeof Object.create && "~";
                e.prototype._events = void 0, e.prototype.listeners = function(a, b) {
                    var c = f ? f + a : a,
                        d = this._events && this._events[c];
                    if (b) return !!d;
                    if (!d) return [];
                    if (d.fn) return [d.fn];
                    for (var e = 0, g = d.length, h = new Array(g); g > e; e++) h[e] = d[e].fn;
                    return h
                }, e.prototype.emit = function(a, b, c, d, e, g) {
                    var h = f ? f + a : a;
                    if (!this._events || !this._events[h]) return !1;
                    var i, j, k = this._events[h],
                        l = arguments.length;
                    if ("function" == typeof k.fn) {
                        switch (k.once && this.removeListener(a, k.fn, void 0, !0), l) {
                            case 1:
                                return k.fn.call(k.context), !0;
                            case 2:
                                return k.fn.call(k.context, b), !0;
                            case 3:
                                return k.fn.call(k.context, b, c), !0;
                            case 4:
                                return k.fn.call(k.context, b, c, d), !0;
                            case 5:
                                return k.fn.call(k.context, b, c, d, e), !0;
                            case 6:
                                return k.fn.call(k.context, b, c, d, e, g), !0
                        }
                        for (j = 1, i = new Array(l - 1); l > j; j++) i[j - 1] = arguments[j];
                        k.fn.apply(k.context, i)
                    } else {
                        var m, n = k.length;
                        for (j = 0; n > j; j++) switch (k[j].once && this.removeListener(a, k[j].fn, void 0, !0), l) {
                            case 1:
                                k[j].fn.call(k[j].context);
                                break;
                            case 2:
                                k[j].fn.call(k[j].context, b);
                                break;
                            case 3:
                                k[j].fn.call(k[j].context, b, c);
                                break;
                            default:
                                if (!i)
                                    for (m = 1, i = new Array(l - 1); l > m; m++) i[m - 1] = arguments[m];
                                k[j].fn.apply(k[j].context, i)
                        }
                    }
                    return !0
                }, e.prototype.on = function(a, b, c) {
                    var e = new d(b, c || this),
                        g = f ? f + a : a;
                    return this._events || (this._events = f ? {} : Object.create(null)), this._events[g] ? this._events[g].fn ? this._events[g] = [this._events[g], e] : this._events[g].push(e) : this._events[g] = e, this
                }, e.prototype.once = function(a, b, c) {
                    var e = new d(b, c || this, (!0)),
                        g = f ? f + a : a;
                    return this._events || (this._events = f ? {} : Object.create(null)), this._events[g] ? this._events[g].fn ? this._events[g] = [this._events[g], e] : this._events[g].push(e) : this._events[g] = e, this
                }, e.prototype.removeListener = function(a, b, c, d) {
                    var e = f ? f + a : a;
                    if (!this._events || !this._events[e]) return this;
                    var g = this._events[e],
                        h = [];
                    if (b)
                        if (g.fn)(g.fn !== b || d && !g.once || c && g.context !== c) && h.push(g);
                        else
                            for (var i = 0, j = g.length; j > i; i++)(g[i].fn !== b || d && !g[i].once || c && g[i].context !== c) && h.push(g[i]);
                    return h.length ? this._events[e] = 1 === h.length ? h[0] : h : delete this._events[e], this
                }, e.prototype.removeAllListeners = function(a) {
                    return this._events ? (a ? delete this._events[f ? f + a : a] : this._events = f ? {} : Object.create(null), this) : this
                }, e.prototype.off = e.prototype.removeListener, e.prototype.addListener = e.prototype.on, e.prototype.setMaxListeners = function() {
                    return this
                }, e.prefixed = f, "undefined" != typeof b && (b.exports = e)
            }, {}],
            2: [function(a, b, c) {
                b.exports = {}
            }, {}],
            3: [function(a, b, c) {
                c.createdStores = [], c.createdActions = [], c.reset = function() {
                    for (; c.createdStores.length;) c.createdStores.pop();
                    for (; c.createdActions.length;) c.createdActions.pop()
                }
            }, {}],
            4: [function(a, b, c) {
                var d = a("./utils"),
                    e = a("./joins").instanceJoinCreator,
                    f = function(a) {
                        for (var b, c = 0, d = {}; c < (a.children || []).length; ++c) b = a.children[c], a[b] && (d[b] = a[b]);
                        return d
                    },
                    g = function(a) {
                        var b = {};
                        for (var c in a) {
                            var e = a[c],
                                h = f(e),
                                i = g(h);
                            b[c] = e;
                            for (var j in i) {
                                var k = i[j];
                                b[c + d.capitalize(j)] = k
                            }
                        }
                        return b
                    };
                b.exports = {
                    hasListener: function(a) {
                        for (var b, c, d, e = 0; e < (this.subscriptions || []).length; ++e)
                            for (d = [].concat(this.subscriptions[e].listenable), b = 0; b < d.length; b++)
                                if (c = d[b], c === a || c.hasListener && c.hasListener(a)) return !0;
                        return !1
                    },
                    listenToMany: function(a) {
                        var b = g(a);
                        for (var c in b) {
                            var e = d.callbackName(c),
                                f = this[e] ? e : this[c] ? c : void 0;
                            f && this.listenTo(b[c], f, this[e + "Default"] || this[f + "Default"] || f)
                        }
                    },
                    validateListening: function(a) {
                        return a === this ? "Listener is not able to listen to itself" : d.isFunction(a.listen) ? a.hasListener && a.hasListener(this) ? "Listener cannot listen to this listenable because of circular loop" : void 0 : a + " is missing a listen method"
                    },
                    listenTo: function(a, b, c) {
                        var e, f, g, h = this.subscriptions = this.subscriptions || [];
                        return d.throwIf(this.validateListening(a)), this.fetchInitialState(a, c), e = a.listen(this[b] || b, this), f = function() {
                            var a = h.indexOf(g);
                            d.throwIf(-1 === a, "Tried to remove listen already gone from subscriptions list!"), h.splice(a, 1), e()
                        }, g = {
                            stop: f,
                            listenable: a
                        }, h.push(g), g
                    },
                    stopListeningTo: function(a) {
                        for (var b, c = 0, e = this.subscriptions || []; c < e.length; c++)
                            if (b = e[c], b.listenable === a) return b.stop(), d.throwIf(-1 !== e.indexOf(b), "Failed to remove listen from subscriptions list!"), !0;
                        return !1
                    },
                    stopListeningToAll: function() {
                        for (var a, b = this.subscriptions || []; a = b.length;) b[0].stop(), d.throwIf(b.length !== a - 1, "Failed to remove listen from subscriptions list!")
                    },
                    fetchInitialState: function(a, b) {
                        b = b && this[b] || b;
                        var c = this;
                        if (d.isFunction(b) && d.isFunction(a.getInitialState)) {
                            var e = a.getInitialState();
                            e && d.isFunction(e.then) ? e.then(function() {
                                b.apply(c, arguments)
                            }) : b.call(this, e)
                        }
                    },
                    joinTrailing: e("last"),
                    joinLeading: e("first"),
                    joinConcat: e("all"),
                    joinStrict: e("strict")
                }
            }, {
                "./joins": 14,
                "./utils": 18
            }],
            5: [function(a, b, c) {
                var d = a("./utils"),
                    e = a("./ListenerMethods");
                b.exports = d.extend({
                    componentWillUnmount: e.stopListeningToAll
                }, e)
            }, {
                "./ListenerMethods": 4,
                "./utils": 18
            }],
            6: [function(a, b, c) {
                var d = a("./utils");
                b.exports = {
                    preEmit: function() {},
                    shouldEmit: function() {
                        return !0
                    },
                    listen: function(a, b) {
                        b = b || this;
                        var c = function(c) {
                                e || a.apply(b, c)
                            },
                            d = this,
                            e = !1;
                        return this.emitter.addListener(this.eventLabel, c),
                            function() {
                                e = !0, d.emitter.removeListener(d.eventLabel, c)
                            }
                    },
                    promise: function(a) {
                        var b = this,
                            c = this.children.indexOf("completed") >= 0 && this.children.indexOf("failed") >= 0;
                        if (!c) throw new Error('Publisher must have "completed" and "failed" child publishers');
                        a.then(function(a) {
                            return b.completed(a)
                        }, function(a) {
                            return b.failed(a)
                        })
                    },
                    listenAndPromise: function(a, b) {
                        var c = this;
                        b = b || this, this.willCallPromise = (this.willCallPromise || 0) + 1;
                        var d = this.listen(function() {
                            if (!a) throw new Error("Expected a function returning a promise but got " + a);
                            var d = arguments,
                                e = a.apply(b, d);
                            return c.promise.call(c, e)
                        }, b);
                        return function() {
                            c.willCallPromise--, d.call(c)
                        }
                    },
                    trigger: function() {
                        var a = arguments,
                            b = this.preEmit.apply(this, a);
                        a = void 0 === b ? a : d.isArguments(b) ? b : [].concat(b), this.shouldEmit.apply(this, a) && this.emitter.emit(this.eventLabel, a)
                    },
                    triggerAsync: function() {
                        var a = arguments,
                            b = this;
                        d.nextTick(function() {
                            b.trigger.apply(b, a)
                        })
                    },
                    triggerPromise: function() {
                        var a = this,
                            b = arguments,
                            c = this.children.indexOf("completed") >= 0 && this.children.indexOf("failed") >= 0,
                            e = d.createPromise(function(e, f) {
                                if (a.willCallPromise) return void d.nextTick(function() {
                                    var c = a.promise;
                                    a.promise = function(b) {
                                        return b.then(e, f), a.promise = c, a.promise.apply(a, arguments)
                                    }, a.trigger.apply(a, b)
                                });
                                if (c) var g = a.completed.listen(function(a) {
                                        g(), h(), e(a)
                                    }),
                                    h = a.failed.listen(function(a) {
                                        g(), h(), f(a)
                                    });
                                a.triggerAsync.apply(a, b), c || e()
                            });
                        return e
                    }
                }
            }, {
                "./utils": 18
            }],
            7: [function(a, b, c) {
                b.exports = {}
            }, {}],
            8: [function(a, b, c) {
                b.exports = function(a, b) {
                    for (var c in b)
                        if (Object.getOwnPropertyDescriptor && Object.defineProperty) {
                            var d = Object.getOwnPropertyDescriptor(b, c);
                            if (!d.value || "function" != typeof d.value || !b.hasOwnProperty(c)) continue;
                            a[c] = b[c].bind(a)
                        } else {
                            var e = b[c];
                            if ("function" != typeof e || !b.hasOwnProperty(c)) continue;
                            a[c] = e.bind(a)
                        }
                    return a
                }
            }, {}],
            9: [function(a, b, c) {
                var d = a("./ListenerMethods"),
                    e = a("./ListenerMixin"),
                    f = a("./utils");
                b.exports = function(a, b) {
                    return {
                        getInitialState: function() {
                            return f.isFunction(a.getInitialState) ? void 0 === b ? a.getInitialState() : f.object([b], [a.getInitialState()]) : {}
                        },
                        componentDidMount: function() {
                            f.extend(this, d);
                            var c = this,
                                e = void 0 === b ? this.setState : function(a) {
                                    ("undefined" == typeof c.isMounted || c.isMounted() === !0) && c.setState(f.object([b], [a]))
                                };
                            this.listenTo(a, e)
                        },
                        componentWillUnmount: e.componentWillUnmount
                    }
                }
            }, {
                "./ListenerMethods": 4,
                "./ListenerMixin": 5,
                "./utils": 18
            }],
            10: [function(a, b, c) {
                var d = a("./ListenerMethods"),
                    e = a("./ListenerMixin"),
                    f = a("./utils");
                b.exports = function(a, b, c) {
                    return c = f.isFunction(b) ? b : c, {
                        getInitialState: function() {
                            if (f.isFunction(a.getInitialState)) {
                                if (f.isFunction(b)) return c.call(this, a.getInitialState());
                                var d = c.call(this, a.getInitialState());
                                return "undefined" != typeof d ? f.object([b], [d]) : {}
                            }
                            return {}
                        },
                        componentDidMount: function() {
                            f.extend(this, d);
                            var e = this,
                                g = function(a) {
                                    if (f.isFunction(b)) e.setState(c.call(e, a));
                                    else {
                                        var d = c.call(e, a);
                                        e.setState(f.object([b], [d]))
                                    }
                                };
                            this.listenTo(a, g)
                        },
                        componentWillUnmount: e.componentWillUnmount
                    }
                }
            }, {
                "./ListenerMethods": 4,
                "./ListenerMixin": 5,
                "./utils": 18
            }],
            11: [function(a, b, c) {
                var d = a("./utils"),
                    e = a("./ActionMethods"),
                    f = a("./PublisherMethods"),
                    g = a("./Keep"),
                    h = {
                        preEmit: 1,
                        shouldEmit: 1
                    },
                    i = function(a) {
                        a = a || {}, d.isObject(a) || (a = {
                            actionName: a
                        });
                        for (var b in e)
                            if (!h[b] && f[b]) throw new Error("Cannot override API method " + b + " in Reflux.ActionMethods. Use another method name or override it on Reflux.PublisherMethods instead.");
                        for (var c in a)
                            if (!h[c] && f[c]) throw new Error("Cannot override API method " + c + " in action creation. Use another method name or override it on Reflux.PublisherMethods instead.");
                        a.children = a.children || [], a.asyncResult && (a.children = a.children.concat(["completed", "failed"]));
                        for (var j = 0, k = {}; j < a.children.length; j++) {
                            var l = a.children[j];
                            k[l] = i(l)
                        }
                        var m = d.extend({
                                eventLabel: "action",
                                emitter: new d.EventEmitter,
                                _isAction: !0
                            }, f, e, a),
                            n = function() {
                                var a = n.sync ? "trigger" : d.environment.hasPromises ? "triggerPromise" : "triggerAsync";
                                return n[a].apply(n, arguments)
                            };
                        return d.extend(n, k, m), g.createdActions.push(n), n
                    };
                b.exports = i
            }, {
                "./ActionMethods": 2,
                "./Keep": 3,
                "./PublisherMethods": 6,
                "./utils": 18
            }],
            12: [function(a, b, c) {
                var d = a("./utils"),
                    e = a("./Keep"),
                    f = a("./mixer"),
                    g = {
                        preEmit: 1,
                        shouldEmit: 1
                    },
                    h = a("./bindMethods");
                b.exports = function(b) {
                    function c() {
                        var a, c = 0;
                        if (this.subscriptions = [], this.emitter = new d.EventEmitter, this.eventLabel = "change", h(this, b), this.init && d.isFunction(this.init) && this.init(), this.listenables)
                            for (a = [].concat(this.listenables); c < a.length; c++) this.listenToMany(a[c])
                    }
                    var i = a("./StoreMethods"),
                        j = a("./PublisherMethods"),
                        k = a("./ListenerMethods");
                    b = b || {};
                    for (var l in i)
                        if (!g[l] && (j[l] || k[l])) throw new Error("Cannot override API method " + l + " in Reflux.StoreMethods. Use another method name or override it on Reflux.PublisherMethods / Reflux.ListenerMethods instead.");
                    for (var m in b)
                        if (!g[m] && (j[m] || k[m])) throw new Error("Cannot override API method " + m + " in store creation. Use another method name or override it on Reflux.PublisherMethods / Reflux.ListenerMethods instead.");
                    b = f(b), d.extend(c.prototype, k, j, i, b);
                    var n = new c;
                    return e.createdStores.push(n), n
                }
            }, {
                "./Keep": 3,
                "./ListenerMethods": 4,
                "./PublisherMethods": 6,
                "./StoreMethods": 7,
                "./bindMethods": 8,
                "./mixer": 17,
                "./utils": 18
            }],
            13: [function(a, b, c) {
                c.ActionMethods = a("./ActionMethods"), c.ListenerMethods = a("./ListenerMethods"), c.PublisherMethods = a("./PublisherMethods"), c.StoreMethods = a("./StoreMethods"), c.createAction = a("./createAction"), c.createStore = a("./createStore"), c.connect = a("./connect"), c.connectFilter = a("./connectFilter"), c.ListenerMixin = a("./ListenerMixin"), c.listenTo = a("./listenTo"), c.listenToMany = a("./listenToMany");
                var d = a("./joins").staticJoinCreator;
                c.joinTrailing = c.all = d("last"), c.joinLeading = d("first"), c.joinStrict = d("strict"), c.joinConcat = d("all");
                var e = c.utils = a("./utils");
                c.EventEmitter = e.EventEmitter, c.Promise = e.Promise, c.createActions = function(a) {
                    var b = {};
                    for (var d in a)
                        if (a.hasOwnProperty(d)) {
                            var f = a[d],
                                g = e.isObject(f) ? d : f;
                            b[g] = c.createAction(f)
                        }
                    return b
                }, c.setEventEmitter = function(a) {
                    c.EventEmitter = e.EventEmitter = a
                }, c.setPromise = function(a) {
                    c.Promise = e.Promise = a
                }, c.setPromiseFactory = function(a) {
                    e.createPromise = a
                }, c.nextTick = function(a) {
                    e.nextTick = a
                }, c.__keep = a("./Keep"), Function.prototype.bind || void 0
            }, {
                "./ActionMethods": 2,
                "./Keep": 3,
                "./ListenerMethods": 4,
                "./ListenerMixin": 5,
                "./PublisherMethods": 6,
                "./StoreMethods": 7,
                "./connect": 9,
                "./connectFilter": 10,
                "./createAction": 11,
                "./createStore": 12,
                "./joins": 14,
                "./listenTo": 15,
                "./listenToMany": 16,
                "./utils": 18
            }],
            14: [function(a, b, c) {
                function d(a, b, c) {
                    return function() {
                        var d, e = c.subscriptions,
                            f = e ? e.indexOf(a) : -1;
                        for (i.throwIf(-1 === f, "Tried to remove join already gone from subscriptions list!"), d = 0; d < b.length; d++) b[d]();
                        e.splice(f, 1)
                    }
                }

                function e(a) {
                    a.listenablesEmitted = new Array(a.numberOfListenables), a.args = new Array(a.numberOfListenables)
                }

                function f(a, b) {
                    return function() {
                        var c = h.call(arguments);
                        if (b.listenablesEmitted[a]) switch (b.strategy) {
                            case "strict":
                                throw new Error("Strict join failed because listener triggered twice.");
                            case "last":
                                b.args[a] = c;
                                break;
                            case "all":
                                b.args[a].push(c)
                        } else b.listenablesEmitted[a] = !0, b.args[a] = "all" === b.strategy ? [c] : c;
                        g(b)
                    }
                }

                function g(a) {
                    for (var b = 0; b < a.numberOfListenables; b++)
                        if (!a.listenablesEmitted[b]) return;
                    a.callback.apply(a.listener, a.args), e(a)
                }
                var h = Array.prototype.slice,
                    i = a("./utils"),
                    j = a("./createStore"),
                    k = {
                        strict: "joinStrict",
                        first: "joinLeading",
                        last: "joinTrailing",
                        all: "joinConcat"
                    };
                c.staticJoinCreator = function(a) {
                    return function() {
                        var b = h.call(arguments);
                        return j({
                            init: function() {
                                this[k[a]].apply(this, b.concat("triggerAsync"))
                            }
                        })
                    }
                }, c.instanceJoinCreator = function(a) {
                    return function() {
                        i.throwIf(arguments.length < 2, "Cannot create a join with less than 2 listenables!");
                        var b, c, g = h.call(arguments),
                            j = g.pop(),
                            k = g.length,
                            l = {
                                numberOfListenables: k,
                                callback: this[j] || j,
                                listener: this,
                                strategy: a
                            },
                            m = [];
                        for (b = 0; k > b; b++) i.throwIf(this.validateListening(g[b]));
                        for (b = 0; k > b; b++) m.push(g[b].listen(f(b, l), this));
                        return e(l), c = {
                            listenable: g
                        }, c.stop = d(c, m, this), this.subscriptions = (this.subscriptions || []).concat(c), c
                    }
                }
            }, {
                "./createStore": 12,
                "./utils": 18
            }],
            15: [function(a, b, c) {
                var d = a("./ListenerMethods");
                b.exports = function(a, b, c) {
                    return {
                        componentDidMount: function() {
                            for (var e in d)
                                if (this[e] !== d[e]) {
                                    if (this[e]) throw "Can't have other property '" + e + "' when using Reflux.listenTo!";
                                    this[e] = d[e]
                                }
                            this.listenTo(a, b, c)
                        },
                        componentWillUnmount: d.stopListeningToAll
                    }
                }
            }, {
                "./ListenerMethods": 4
            }],
            16: [function(a, b, c) {
                var d = a("./ListenerMethods");
                b.exports = function(a) {
                    return {
                        componentDidMount: function() {
                            for (var b in d)
                                if (this[b] !== d[b]) {
                                    if (this[b]) throw "Can't have other property '" + b + "' when using Reflux.listenToMany!";
                                    this[b] = d[b]
                                }
                            this.listenToMany(a)
                        },
                        componentWillUnmount: d.stopListeningToAll
                    }
                }
            }, {
                "./ListenerMethods": 4
            }],
            17: [function(a, b, c) {
                var d = a("./utils");
                b.exports = function(a) {
                    var b = {
                            init: [],
                            preEmit: [],
                            shouldEmit: []
                        },
                        c = function e(a) {
                            var c = {};
                            return a.mixins && a.mixins.forEach(function(a) {
                                d.extend(c, e(a))
                            }), d.extend(c, a), Object.keys(b).forEach(function(c) {
                                a.hasOwnProperty(c) && b[c].push(a[c])
                            }), c
                        }(a);
                    return b.init.length > 1 && (c.init = function() {
                        var a = arguments;
                        b.init.forEach(function(b) {
                            b.apply(this, a)
                        }, this)
                    }), b.preEmit.length > 1 && (c.preEmit = function() {
                        return b.preEmit.reduce(function(a, b) {
                            var c = b.apply(this, a);
                            return void 0 === c ? a : [c]
                        }.bind(this), arguments)
                    }), b.shouldEmit.length > 1 && (c.shouldEmit = function() {
                        var a = arguments;
                        return !b.shouldEmit.some(function(b) {
                            return !b.apply(this, a)
                        }, this)
                    }), Object.keys(b).forEach(function(a) {
                        1 === b[a].length && (c[a] = b[a][0])
                    }), c
                }
            }, {
                "./utils": 18
            }],
            18: [function(a, b, c) {
                c.environment = {};
                var d = c.isObject = function(a) {
                    var b = typeof a;
                    return "function" === b || "object" === b && !!a
                };
                c.extend = function(a) {
                    if (!d(a)) return a;
                    for (var b, c, e = 1, f = arguments.length; f > e; e++) {
                        b = arguments[e];
                        for (c in b)
                            if (Object.getOwnPropertyDescriptor && Object.defineProperty) {
                                var g = Object.getOwnPropertyDescriptor(b, c);
                                Object.defineProperty(a, c, g)
                            } else a[c] = b[c]
                    }
                    return a
                }, c.isFunction = function(a) {
                    return "function" == typeof a
                }, c.EventEmitter = a("eventemitter3"), c.nextTick = function(a) {
                    setTimeout(a, 0)
                }, c.capitalize = function(a) {
                    return a.charAt(0).toUpperCase() + a.slice(1)
                }, c.callbackName = function(a) {
                    return "on" + c.capitalize(a)
                }, c.object = function(a, b) {
                    for (var c = {}, d = 0; d < a.length; d++) c[a[d]] = b[d];
                    return c
                };
                try {
                    c.Promise = Promise, c.createPromise = function(a) {
                        return new c.Promise(a)
                    }
                } catch (e) {
                    c.Promise = null, c.createPromise = function() {}
                }
                c.environment.hasPromises = !!c.Promise, c.isArguments = function(a) {
                    return "object" == typeof a && "callee" in a && "number" == typeof a.length
                }, c.throwIf = function(a, b) {
                    if (a) throw Error(b || a)
                }
            }, {
                eventemitter3: 1
            }]
        }, {}, [13])(13)
    })
});