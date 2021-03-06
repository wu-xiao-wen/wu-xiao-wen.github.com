! function() {
    var config = {
        base: "/src/js/",
        paths: {
            github: "http://wu-xiao-wen.github.io/src/js",
            arale: "https://a.alipayobjects.com/arale"
        },
        alias: {
            class: "common/class",
            events: "common/events",
            aspect: "common/aspect",
            attrs: "common/attrs",
            base: "common/base",
            widget: "common/widget",
            limit: "common/limit",
            react: "common/react",
            reactDOM: "common/react-dom",
            reflux: "common/reflux",
            $: "common/jquery",
            handlebars: "alinw/handlebars/1.3.0/handlebars",
            dialog: "alinw/dialog/2.0.6/dialog",
            araleBase: "arale/base/1.1.1/base",
            araleWidget: "arale/widget/1.1.1/widget"
        },
        charset: "utf-8",
        debug: !0
    };
    return "undefined" != typeof seajs && (config.paths = {
        github: "http://wu-xiao-wen.github.io/src/js",
        arale: "https://a.alipayobjects.com/arale"
    }, seajs.config(config)), "function" == typeof define && define("libs/seaConfig-debug", [], function(require, exports, module) {
        module.exports = config
    }), config
}();