"use strict";

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
}
var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor)
        }
    }
    return function(Constructor, protoProps, staticProps) {
        return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), Constructor
    }
}();
define("js/common/promise-debug", ["common/limit-debug"], function(require, exports) {
    var limit = require("common/limit-debug"),
        WIN = window;
    if (WIN.Promise) return Promise.prototype.Catch = function(fn) {
        return this.then(null, fn)
    }, Promise;
    var MyPromise = function() {
        function MyPromise() {
            var _this = this;
            if (_classCallCheck(this, MyPromise), this.PromiseStatus = "pedding", this.PromiseValue = void 0, this.Stack = [], limit.isFunction(arguments.length <= 0 ? void 0 : arguments[0])) {
                this.promiseList = [];
                var fun = arguments.length <= 0 ? void 0 : arguments[0],
                    resolve = function(val) {
                        limit.each([_this].concat(_this.promiseList), function(promise) {
                            "pedding" === promise.PromiseStatus && (promise.PromiseStatus = "resolved", promise.PromiseValue = val, promise._clean())
                        })
                    },
                    reject = function(val) {
                        limit.each([_this].concat(_this.promiseList), function(promise) {
                            "pedding" === promise.PromiseStatus && (promise.PromiseStatus = "rejected", promise.PromiseValue = val, promise._clean())
                        }), setTimeout(function() {
                            if (!_this.promiseList.length) throw "(in promise) " + val
                        }, 0)
                    };
                try {
                    fun(resolve, reject)
                } catch (e) {
                    this.PromiseStatus = "rejected", this.PromiseValue = e
                }
            } else this.PromiseStatus = arguments.length <= 0 ? void 0 : arguments[0], this.PromiseValue = arguments.length <= 1 ? void 0 : arguments[1]
        }
        return _createClass(MyPromise, [{
            key: "then",
            value: function(suc, err) {
                suc = limit.cb(suc), err = limit.cb(err);
                var me = this;
                if (me.promiseList) {
                    var originMe = me;
                    me = new MyPromise(me.PromiseStatus, me.PromiseValue), originMe.promiseList.push(me)
                }
                return me.Stack.push({
                    suc: suc,
                    err: err
                }), "pedding" === me.PromiseStatus || me.cleanStatus || me._clean(), me
            }
        }, {
            key: "Catch",
            value: function(err) {
                return this.then(null, err)
            }
        }, {
            key: "_clean",
            value: function() {
                var me = this,
                    one = me.Stack.shift();
                return me.cleanStatus = "init", one ? setTimeout(function() {
                    try {
                        switch (me.PromiseStatus) {
                            case "resolved":
                                me.PromiseValue = one.suc(me.PromiseValue);
                                break;
                            case "rejected":
                                me.PromiseValue = one.err(me.PromiseValue)
                        }
                        me.PromiseStatus = "resolved"
                    } catch (e) {
                        me.PromiseStatus = "rejected", me.PromiseValue = e, me.Stack.length || setTimeout(function() {
                            throw "(in promise) " + e
                        }, 0)
                    }
                    me._clean()
                }, 0) : delete me.cleanStatus, me
            }
        }], [{
            key: "all",
            value: function(list) {
                function main(arg, key) {
                    args[key] = arg, --guid || back(args)
                }
                var guid = list.length,
                    back = void 0,
                    args = [];
                return new MyPromise(function(resolve, reject) {
                    back = resolve, limit.each(list, function(val, key) {
                        val.PromiseStatus ? val.then(function(sucVal) {
                            main(sucVal, key)
                        }, function(errVal) {
                            reject(errVal)
                        }) : main(val, key)
                    })
                })
            }
        }, {
            key: "race",
            value: function(list) {
                return new MyPromise(function(resolve, reject) {
                    limit.each(list, function(val) {
                        MyPromise.resolve(val).then(function(sucVal) {
                            return resolve(sucVal)
                        }, function(errVal) {
                            return reject(errVal)
                        })
                    })
                })
            }
        }, {
            key: "resolve",
            value: function(val) {
                return new MyPromise(val && val.then ? function(resolve, reject) {
                    val.then(resolve, reject)
                } : function(resolve, reject) {
                    resolve(val)
                })
            }
        }, {
            key: "reject",
            value: function(val) {
                return new MyPromise(function(resolve, reject) {
                    reject(val)
                })
            }
        }]), MyPromise
    }();
    return MyPromise
});