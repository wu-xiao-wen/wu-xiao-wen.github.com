define("src/hephaistos/js/slider-min-debug", ["bui/slider/slider-debug"], function(e) {
    var t = BUI.namespace("Slider");
    return BUI.mix(t, {
        Slider: e("bui/slider/slider-debug")
    }), t
}), define("src/hephaistos/js/slider-min-debug", ["bui/slider/slider-debug"], function(e) {
    "use strict";

    function f(e, t) {
        return e > t && (e = t), e < 0 && (e = 0), e / t * 100
    }
    var t = document,
        n = e("bui/common"),
        r = "x-slider-handle",
        i = "x-slider-vertical",
        s = "x-slider-horizontal",
        o = "x-slider-back",
        u = r + "-start",
        a = r + "-end",
        l = n.Component.View.extend({
            renderUI: function() {
                var e = this,
                    t = e.get("isVertical");
                t ? e.get("el").addClass(i) : e.get("el").addClass(s)
            },
            setRange: function(e, t, n) {
                function d(e) {
                    return e + "%"
                }
                e > t && (e = t);
                var r = this,
                    i = r.get("backEl"),
                    s = r.get("isVertical"),
                    o = r.get("handleEl"),
                    u = o.length,
                    a = t - e,
                    f = s ? "height" : "width",
                    l = s ? "bottom" : "left",
                    c = n ? "animate" : "css",
                    h = {},
                    p = {};
                i && (h[f] = a + "%", h[l] = e + "%", i[c](h)), 1 === u ? (p[l] = d(t), o[c](p)) : 2 === u && (p[l] = d(e), o[0].style[l] !== p[l] && $(o[0])[c](p), p[l] = d(t), o[1].style[l] !== p[l] && $(o[1])[c](p))
            },
            _uiSetBackTpl: function(e) {
                var t = this,
                    n = t.get("el"),
                    r = $(e).appendTo(n);
                r.addClass(o), t.setInternal("backEl", r)
            },
            _uiSetHandleTpl: function(e) {
                var s, t = this,
                    n = t.get("el"),
                    i = t.get("range");
                i ? (t._createHandleEl(e, u), t._createHandleEl(e, a)) : t._createHandleEl(e), s = n.find("." + r), t.setInternal("handleEl", s)
            },
            _createHandleEl: function(e, t) {
                var n = this,
                    i = n.get("el"),
                    s = $(e).appendTo(i);
                s.addClass(r), s.attr("tabindex", "0"), t && s.addClass(t)
            }
        }, {
            ATTRS: {
                backEl: {},
                handleEl: {}
            }
        }),
        c = n.Component.Controller.extend({
            slideTo: function(e) {
                this.set("value", e)
            },
            bindUI: function() {
                var e = this,
                    t = e.get("el");
                t.find(".x-slider-handle").on("click", function(e) {
                    e.preventDefault()
                }), t.on("mousedown", function(n) {
                    var r = $(n.target),
                        i = t.offset();
                    r.hasClass("x-slider-handle") ? e._handleDrag(n) : (i = {
                        left: n.pageX - i.left,
                        top: n.pageY - i.top
                    }, e._slideByOffset(i, !0))
                })
            },
            _slideByOffset: function(e, t) {
                var r = this,
                    i = r.get("value"),
                    s = r._formatValue(e);
                i === s || n.isArray(s) && n.Array.equals(s, i) || (t ? r.set("value", s) : (r.setInternal("value", s), r._setValue(s, !1)))
            },
            _handleDrag: function(e) {
                function o(e) {
                    var t = n.get("draging");
                    if (t) {
                        e.preventDefault();
                        var r = e.pageX,
                            i = e.pageY,
                            s = {};
                        s.left = t.elX + (r - t.startX), s.top = t.elY + (i - t.startY), n._slideByOffset(s, !1)
                    }
                }

                function u() {
                    $(t).on("mousemove", o), $(t).on("mouseup", f)
                }

                function a() {
                    $(t).off("mousemove", o), $(t).off("mouseup", f)
                }

                function f(e) {
                    1 == e.which && (n.set("draging", !1), a())
                }
                var n = this,
                    r = n.get("isVertical"),
                    i = $(e.target),
                    s = i.position();
                1 == e.which && (n.set("draging", {
                    elX: s.left,
                    elY: r ? s.top + i.height() : s.top,
                    startX: e.pageX,
                    startY: e.pageY
                }), u())
            },
            _getCalcValue: function(e) {
                var a, l, t = this,
                    n = t.get("el"),
                    r = t.get("max"),
                    i = t.get("min"),
                    s = t.get("step"),
                    o = t.get("isVertical"),
                    u = o ? n.height() : n.width();
                if (a = o ? f(n.height() - e.top, u) : f(e.left, u), l = (r - i) * a / 100 + i, s) {
                    l = parseInt(l, 10);
                    var c = l % s;
                    c && (l += s - c)
                }
                return l
            },
            _formatValue: function(e) {
                var t = this,
                    r = t.get("value"),
                    i = t._getCalcValue(e);
                if (n.isNumber(r)) return i;
                if (n.isArray(r)) {
                    var s = Math.abs(r[0] - i),
                        o = Math.abs(r[1] - i);
                    return s < o ? [i, r[1]] : [r[0], i]
                }
                return r
            },
            _uiSetValue: function(e) {
                this._setValue(e, !0)
            },
            _setValue: function(e, t) {
                var u, a, r = this,
                    i = r.get("min"),
                    s = r.get("max"),
                    o = s - i;
                n.isNumber(e) ? (u = 0, a = f(e - i, o)) : n.isArray(e) && (u = f(e[0] - i, o), a = f(e[1] - i, o)), r._setRange(u, a, t), r.fire("change", {
                    value: e
                })
            },
            _setRange: function(e, t, n) {
                this.get("view").setRange(e, t, n)
            }
        }, {
            ATTRS: {
                min: {
                    value: 0
                },
                max: {
                    value: 100
                },
                value: {
                    view: !0
                },
                step: {
                    value: 1
                },
                handleTpl: {
                    view: !0,
                    value: '<a href="#"></a>'
                },
                isVertical: {
                    view: !0,
                    value: !1
                },
                range: {
                    view: !0,
                    value: !1
                },
                backTpl: {
                    view: !0,
                    value: "<div></div>"
                },
                xview: {
                    value: l
                }
            }
        }, {
            xclass: "slider"
        });
    return c
});