"use strict";
define("js/common/domUtil-debug", ["common/jquery-debug", "common/util-debug", "common/limit-debug", "common/handlerbars-debug"], function(require, exports, module) {
    function request(URL, DATA, TYPE, CALLBACK, CONFIG) {
        return CONFIG = CONFIG || {}, void 0 === CONFIG.needPop && (CONFIG.needPop = !0), CONFIG.needPop && Poploading.show(CONFIG), $.ajax({
            url: URL,
            dataType: "json",
            type: TYPE,
            data: DATA,
            timeout: 1e5,
            cache: !1,
            success: function(json) {
                CONFIG.needPop && Poploading.hide(), CALLBACK(json)
            },
            error: function(e) {
                CONFIG.needPop && Poploading.hide()
            }
        })
    }

    function requestParam(URL, DATA, TYPE, CALLBACK, CONFIG) {
        return "function" == typeof DATA ? (CALLBACK = maybeCallback(DATA), DATA = {}, TYPE = "post") : "function" == typeof TYPE ? (CALLBACK = maybeCallback(TYPE), TYPE = "post") : CALLBACK = maybeCallback(CALLBACK), [URL, DATA, TYPE, CALLBACK, CONFIG]
    }
    var $ = require("common/jquery-debug"),
        util = require("common/util-debug"),
        limit = require("common/limit-debug"),
        handlerbars = require("common/handlerbars-debug"),
        domUtil = {},
        maybeCallback = util.maybeCallback,
        REX = /^(.+)\.(.+)/,
        K = util.K;
    domUtil.isWebkit = !!navigator.vendor, domUtil.util = util, domUtil.jQuery = $, domUtil.handlerbars = handlerbars, domUtil.closest = function(node, query) {
        return $(node).closest(query)
    }, domUtil.show = function(query) {
        $(query).removeClass("fn-hide")
    }, domUtil.hide = function(query) {
        $(query).addClass("fn-hide")
    }, domUtil.redraw = function(query) {
        domUtil.hide(query), setTimeout(function() {
            domUtil.show(query)
        }, 0)
    }, domUtil.disabledTrue = function(query) {
        var nodes = $(query).find("input,select,textarea,button");
        nodes.prop("disabled", !0)
    }, domUtil.disabledFalse = function(query) {
        var nodes = $(query).find("input,select,textarea,button");
        nodes.prop("disabled", !1)
    }, domUtil.getInputValue = function(table, name) {
        return table.find('[name="' + name + '"]').val()
    }, domUtil.getEscapeUrl = function(url) {
        return encodeURIComponent(url)
    }, domUtil.resetForm = function(query) {
        var form = $(query)[0];
        form && form.reset && form.reset(), util.breakEachArr(form, function(val) {
            if ("hidden" === val.type) {
                var defaultValue = $(val).data("defaultValue");
                void 0 !== defaultValue && (val.value = defaultValue)
            }
        })
    }, domUtil.redirect = function(url) {
        location.href = url
    }, domUtil.paseParam = function(name, obj, factory) {
        var rev = {};
        return factory = factory || K, rev[name] = JSON.stringify(factory(obj)), rev
    }, domUtil.ajax = function(URL, DATA, TYPE, CALLBACK, CONFIG) {
        var args = requestParam(URL, DATA, TYPE, CALLBACK, CONFIG),
            callback = args[3];
        args[3] = function(json) {
            json.hasError ? callback(json.errors && json.errors[0] && json.errors[0].msg || "ajax请求，系统异常！", json.errors) : callback(null, json.content)
        }, request.apply(null, args)
    }, domUtil.http = function(URL, DATA, TYPE, CALLBACK, CONFIG) {
        var args = requestParam(URL, DATA, TYPE, CALLBACK, CONFIG),
            callback = args[3];
        args[3] = function(json) {
            var content;
            json.hasError ? callback(json.errors && json.errors[0] && json.errors[0].msg || "ajax请求，系统异常！", json.errors) : (content = json.content, content.isSuccess ? callback(null, content.retValue, content.message, content) : callback(content.message, content))
        }, request.apply(null, args)
    }, domUtil.unSerialize = function(FORM, JSON, FACTOR) {
        var name, val, obj, i = 0;
        for (FACTOR = FACTOR || util.K, JSON = FACTOR(JSON), "FORM" !== FORM.nodeName && (FORM = $(FORM).find("input,select,textarea,button")); obj = FORM[i++];)(name = obj.name) && (val = JSON[name]) && ("checkbox" === obj.type ? limit.contains(val.split(","), obj.value) ? obj.checked = !0 : obj.checked = !1 : "radio" === obj.type ? obj.value === val ? obj.checked = !0 : obj.checked = !1 : obj.value = obj.defaultValue = val)
    };
    var serialize = domUtil.serialize = function(form, factory) {
        form = $(form);
        var obj, name, formList, exclude, i = 0,
            parseArr = [],
            json = {};
        for (factory = factory || util.K, formList = form.find("[data-serialize-name]"), exclude = form.find(".JS-serialize-exclude"), form = form.find("input,select,textarea,button").not(exclude.find("input,select,textarea,button")).not(formList.find("input,select,textarea,button")); obj = form[i]; i++)
            if ((name = obj.name) && obj.disabled === !1) {
                switch (obj.type) {
                    case "radio":
                        if (!obj.checked) continue;
                        break;
                    case "checkbox":
                        obj.checked && (json[name] || (json[name] = [], parseArr.push(name)), json[name].push($.trim(obj.value)));
                        continue
                }
                json[name] = $.trim(form.eq(i).val())
            }
        return util.breakEachArr(parseArr, function(item) {
            json[item] = json[item].join(",")
        }), util.breakEachObj(json, function(val, key, obj) {
            if (REX.test(key)) {
                var tempObj = obj[RegExp.$1] || (obj[RegExp.$1] = {});
                tempObj[RegExp.$2] = val, delete obj[key]
            }
        }), formList.each(function() {
            var list, obj, node = $(this),
                serializeName = node.data("serializeName");
            (list = json[serializeName]) || (list = json[serializeName] = []), obj = serialize(node), !limit.isEmpty(obj) && list.push(obj)
        }), factory(json)
    };
    domUtil.selectSerialize = function(node, list) {
        node.length = 0, util.breakEachArr(list, function(val, key) {
            var option = new Option(val.key, val.value, (!!val.selected), (!!val.selected));
            option.disabled = !!val.disabled, node.add(option)
        })
    }, domUtil.onChange = function(node, cb) {
        function changeMain() {
            var newVal = node.val();
            newVal !== oldVal && cb.call(node, newVal, oldVal), oldVal = newVal
        }
        node = $(node);
        var oldVal = node.val();
        node.on("input.eventChange", changeMain), 9 === document.documentMode && node.on("keyup.eventChange", function(e) {
            8 === e.keyCode && changeMain()
        }), 8 === document.documentMode && node.on("propertychange.eventChange", function(e) {
            "value" === e.originalEvent.propertyName && changeMain()
        })
    }, domUtil.offChange = function(node) {
        node = $(node), node.off("input.eventChange").off("keyup.eventChange").off("propertychange.eventChange")
    }, domUtil.winScrollY = function(num) {
        return 0 === arguments.length ? window.scrollY || document.documentElement.scrollTop : (document.documentElement.scrollTop = num, void window.scrollTo(0, num))
    }, domUtil.winInnerHeight = function() {
        return window.innerHeight || document.documentElement.clientHeight
    }
});