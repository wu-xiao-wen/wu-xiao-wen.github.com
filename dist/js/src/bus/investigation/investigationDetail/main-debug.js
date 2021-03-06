"use strict";
define("src/bus/investigation/investigationDetail/main-debug", ["bus/global/main-debug", "common/jquery-debug", "common/dialog-debug", "common/delegate-debug", "model/searchList/main-debug", "model/ajax/main-debug", "common/cookie-debug", "common/tip-debug", "common/validator-debug", "src/bus/investigation/investigationDetail/secondCheck-hbs-debug", "common/handlerbars-debug", "model/timer/main-debug"], function(require, exports, module) {
    require("bus/global/main-debug");
    var $ = require("common/jquery-debug"),
        Dialog = require("common/dialog-debug"),
        Delegate = require("common/delegate-debug"),
        Ajax = (require("model/searchList/main-debug"), require("model/ajax/main-debug")),
        Cookie = require("common/cookie-debug"),
        Validator = (require("common/tip-debug"), require("common/validator-debug")),
        secondCheckHbs = require("src/bus/investigation/investigationDetail/secondCheck-hbs-debug"),
        Timer = require("model/timer/main-debug");
    Cookie.setPath("/"), $("body").on("click", "#logoutbtn", function(event) {
        event.preventDefault(), Cookie.remove("InvestigationPID"), window.location.href = "/loginOut.do"
    }), Delegate.on("click", '[data-target="resourceList"]', function() {
        var self = $(this),
            resourceId = self.data("resourceId");
        new Ajax({
            request: "/mercury/investigationRpc/checkDownLoadCount.json"
        }).on("ajaxSuccess", function() {
            "true" === Cookie.get("InvestigationPID") ? window.open("/investfileOperation/download.json?fileIdStr=" + resourceId) : new Ajax({
                request: "/mercury/investigationRpc/checkIdCardCount.json"
            }).on("ajaxSuccess", function() {
                new Ajax({
                    request: "/mercury/investigationRpc/sendMobileMsg.json"
                }).on("ajaxSuccess", function() {
                    var dialog = Dialog.show(secondCheckHbs(), {
                        width: 500,
                        events: {
                            'click [data-trigger="getTime"]': function(e) {
                                var me = this;
                                new Ajax({
                                    request: "/mercury/investigationRpc/sendMobileMsg.json"
                                }).on("ajaxSuccess", function() {
                                    $("#messageText").text("验证码会在倒计时60秒内发送至你的手机,有效期为5分钟");
                                    var target = e.target;
                                    $(target).addClass("fn-hide"), $('[data-trigger="time"]').removeClass("fn-hide"), me.timer = new Timer({
                                        time: 60
                                    }).on("progress", function(key) {
                                        $('[data-trigger="time"]').val("倒计时：" + key + "s")
                                    }).on("end", function() {
                                        $("#messageText").text("如果未收到验证码，请点击获取验证码按钮"), $('[data-trigger="time"]').addClass("fn-hide"), $('[data-trigger="getTime"]').removeClass("fn-hide")
                                    })
                                }).submit()
                            },
                            'click [data-trigger="submit"]': function() {
                                this.validatorExp.execute(function(isErr) {
                                    isErr || new Ajax({
                                        request: "/mercury/investigationRpc/checkAuthority.json",
                                        parseForm: dialog.element
                                    }).on("ajaxSuccess", function(val, msg, res) {
                                        Cookie.set("InvestigationPID", res.isSuccess, 1800), dialog.hide(), window.open("/investfileOperation/download.json?fileIdStr=" + resourceId)
                                    }).submit()
                                })
                            }
                        },
                        autoShow: !1
                    }).after("show", function() {
                        this.validatorExp = Validator.use("#small-page", '[data-widget="validator"]'), this.timer = new Timer({
                            time: 60
                        }).on("progress", function(key) {
                            $('[data-trigger="time"]').val("倒计时：" + key + "s")
                        }).on("end", function() {
                            $('[data-trigger="time"]').addClass("fn-hide"), $('[data-trigger="getTime"]').removeClass("fn-hide"), $("#messageText").text("如果未收到验证码，请点击获取验证码按钮")
                        })
                    }).before("hide", function() {
                        this.timer.destroy()
                    }).show()
                }).submit()
            }).submit()
        }).submit()
    })
});
define("src/bus/investigation/investigationDetail/secondCheck-hbs-debug", ["common/handlerbars-debug"], function(require, exports, module) {
    var Handlerbars = require("common/handlerbars-debug"),
        compile = Handlerbars.compile('<form id="small-page">\t\t<div class="fn-PaAl15" >\t\t<div class="global-tab fn-BBS-ebebeb" >\t\t\t<i></i>\t\t\t<span class="JS-target-title">二次身份验证</span>\t\t</div>\t\t<table class="fn-table fn-table-input fn-table-input-sm fn-MT20" width="100%" >\t\t \t<tbody data-target="normal">\t\t  \t\t<tr>\t\t  \t\t\t<td align="right" valign="top" class="fn-LH30" width="80">\t\t\t  \t\t\t<span class="global-require fn-VA1D">\t\t\t  \t\t\t  *\t\t\t  \t\t\t</span>\t\t\t  \t\t\t身份证号:\t\t  \t\t\t</td>\t\t  \t\t\t<td>\t\t  \t\t\t\t<div class="fn-MR30 kuma-form-item">\t\t  \t\t\t\t\t<input type="text" name="idCardNum" class="fn-input-text fn-input-text-sm fn-W100P kuma-input "  maxlength="4"  data-rule="lastcardid" data-widget="validator" data-required="true"   data-errormessage-required="请输入身份证号后4位"  data-errormessage-lastcardid="请输入正确的身份证后4位" placeholder="请输入身份证后4位" autoComplete="off" value=""/>\t\t  \t\t\t\t</div>\t\t  \t\t\t</td>\t\t\t  \t\t</tr>\t\t\t\t<tr>\t\t\t\t\t<td align="right" valign="top" class="fn-LH30" width="80">\t\t\t  \t\t\t<span class="global-require fn-VA1D">\t\t\t  \t\t\t  *\t\t\t  \t\t\t</span>\t\t\t  \t\t\t校验码:\t\t  \t\t\t</td>\t\t  \t\t\t<td>\t\t  \t\t\t\t<div class="fn-MR10 kuma-form-item fn-display-inlineBlock">\t\t  \t\t\t\t\t<input type="text" name="mobile" class="fn-input-text fn-input-text-sm fn-W80 kuma-input "  maxlength="6"    data-widget="validator" data-required="true" data-errormessage="校验码不能为空" placeholder="请输入校验码" value="" autoComplete="off"/>\t\t  \t\t\t\t</div>\t\t  \t\t\t\t<div class="fn-MR30 kuma-form-item fn-display-inlineBlock ">\t\t  \t\t\t\t\t<input type="button" class="fn-input-text fn-input-text-sm fn-W80 fn-CuPo fn-hide" data-trigger="getTime" value="获取验证码" >\t\t  \t\t\t\t</div>\t\t  \t\t\t\t<div class="fn-MR30 kuma-form-item fn-display-inlineBlock">\t\t  \t\t\t\t\t<input type="button" name="time" data-trigger="time" class="fn-input-text fn-input-text-sm fn-W80 fn-TAC "  disabled="disabled"  maxlength="4" value="倒计时：60s"/>\t\t  \t\t\t\t</div>\t\t  \t\t\t</td>\t\t\t\t</tr>\t\t\t\t<tr>\t\t\t\t\t<td align="right" valign="top" class="fn-LH30" width="80"></td>\t\t\t\t\t<td align="left" valign="top" class="fn-LH30">\t\t\t\t\t\t<div class="message"><i class="kuma-icon kuma-icon-information fn-color-48c5ff  "></i>\t\t\t\t\t\t\t<span id="messageText">\t\t\t\t\t\t\t\t验证码会在倒计时60秒内发送至你的手机,有效期为5分钟。\t\t\t\t\t\t\t</span>\t\t\t\t\t\t</div>\t\t\t\t\t</td>\t\t\t\t</tr>\t\t\t\t<tr>\t\t\t\t\t<td align="right" valign="top" class="fn-LH30" width="80"></td>\t\t\t\t\t<td align="left" valign="top" class="fn-LH30">\t\t\t\t\t\t<div class="message"><i class="kuma-icon kuma-icon-information fn-color-48c5ff  "></i>\t\t\t\t\t\t\t<span id="messageText">\t\t\t\t\t\t\t每个月只能发起1000人/次的协查申请。\t\t\t\t\t\t\t</span>\t\t\t\t\t\t</div>\t\t\t\t\t</td>\t\t\t\t</tr>\t\t\t\t<tr>\t\t\t\t\t<td align="right" valign="top" class="fn-LH30" width="80"></td>\t\t\t\t\t<td align="left" valign="top" class="fn-LH30">\t\t\t\t\t\t<div class="message"><i class="kuma-icon kuma-icon-information fn-color-48c5ff  "></i>\t\t\t\t\t\t\t<span id="messageText">\t\t\t\t\t\t\t\t每天的协查文件下载次数不能超过100次。\t\t\t\t\t\t\t</span>\t\t\t\t\t\t</div>\t\t\t\t\t</td>\t\t\t\t</tr>\t\t \t</tbody>\t\t \t<tfoot>\t\t \t\t<tr class="child-last">\t\t \t\t\t<td colspan="2" align="center">\t\t \t\t\t\t<input type="button" class="fn-btn fn-btn-primary fn-W100" data-trigger="submit" value="提交">\t\t \t\t\t</td>\t\t \t\t</tr>\t\t \t</tfoot>\t\t\t</table>\t</div></form>');
    return compile.source = '<form id="small-page">\t\t<div class="fn-PaAl15" >\t\t<div class="global-tab fn-BBS-ebebeb" >\t\t\t<i></i>\t\t\t<span class="JS-target-title">二次身份验证</span>\t\t</div>\t\t<table class="fn-table fn-table-input fn-table-input-sm fn-MT20" width="100%" >\t\t \t<tbody data-target="normal">\t\t  \t\t<tr>\t\t  \t\t\t<td align="right" valign="top" class="fn-LH30" width="80">\t\t\t  \t\t\t<span class="global-require fn-VA1D">\t\t\t  \t\t\t  *\t\t\t  \t\t\t</span>\t\t\t  \t\t\t身份证号:\t\t  \t\t\t</td>\t\t  \t\t\t<td>\t\t  \t\t\t\t<div class="fn-MR30 kuma-form-item">\t\t  \t\t\t\t\t<input type="text" name="idCardNum" class="fn-input-text fn-input-text-sm fn-W100P kuma-input "  maxlength="4"  data-rule="lastcardid" data-widget="validator" data-required="true"   data-errormessage-required="请输入身份证号后4位"  data-errormessage-lastcardid="请输入正确的身份证后4位" placeholder="请输入身份证后4位" autoComplete="off" value=""/>\t\t  \t\t\t\t</div>\t\t  \t\t\t</td>\t\t\t  \t\t</tr>\t\t\t\t<tr>\t\t\t\t\t<td align="right" valign="top" class="fn-LH30" width="80">\t\t\t  \t\t\t<span class="global-require fn-VA1D">\t\t\t  \t\t\t  *\t\t\t  \t\t\t</span>\t\t\t  \t\t\t校验码:\t\t  \t\t\t</td>\t\t  \t\t\t<td>\t\t  \t\t\t\t<div class="fn-MR10 kuma-form-item fn-display-inlineBlock">\t\t  \t\t\t\t\t<input type="text" name="mobile" class="fn-input-text fn-input-text-sm fn-W80 kuma-input "  maxlength="6"    data-widget="validator" data-required="true" data-errormessage="校验码不能为空" placeholder="请输入校验码" value="" autoComplete="off"/>\t\t  \t\t\t\t</div>\t\t  \t\t\t\t<div class="fn-MR30 kuma-form-item fn-display-inlineBlock ">\t\t  \t\t\t\t\t<input type="button" class="fn-input-text fn-input-text-sm fn-W80 fn-CuPo fn-hide" data-trigger="getTime" value="获取验证码" >\t\t  \t\t\t\t</div>\t\t  \t\t\t\t<div class="fn-MR30 kuma-form-item fn-display-inlineBlock">\t\t  \t\t\t\t\t<input type="button" name="time" data-trigger="time" class="fn-input-text fn-input-text-sm fn-W80 fn-TAC "  disabled="disabled"  maxlength="4" value="倒计时：60s"/>\t\t  \t\t\t\t</div>\t\t  \t\t\t</td>\t\t\t\t</tr>\t\t\t\t<tr>\t\t\t\t\t<td align="right" valign="top" class="fn-LH30" width="80"></td>\t\t\t\t\t<td align="left" valign="top" class="fn-LH30">\t\t\t\t\t\t<div class="message"><i class="kuma-icon kuma-icon-information fn-color-48c5ff  "></i>\t\t\t\t\t\t\t<span id="messageText">\t\t\t\t\t\t\t\t验证码会在倒计时60秒内发送至你的手机,有效期为5分钟。\t\t\t\t\t\t\t</span>\t\t\t\t\t\t</div>\t\t\t\t\t</td>\t\t\t\t</tr>\t\t\t\t<tr>\t\t\t\t\t<td align="right" valign="top" class="fn-LH30" width="80"></td>\t\t\t\t\t<td align="left" valign="top" class="fn-LH30">\t\t\t\t\t\t<div class="message"><i class="kuma-icon kuma-icon-information fn-color-48c5ff  "></i>\t\t\t\t\t\t\t<span id="messageText">\t\t\t\t\t\t\t每个月只能发起1000人/次的协查申请。\t\t\t\t\t\t\t</span>\t\t\t\t\t\t</div>\t\t\t\t\t</td>\t\t\t\t</tr>\t\t\t\t<tr>\t\t\t\t\t<td align="right" valign="top" class="fn-LH30" width="80"></td>\t\t\t\t\t<td align="left" valign="top" class="fn-LH30">\t\t\t\t\t\t<div class="message"><i class="kuma-icon kuma-icon-information fn-color-48c5ff  "></i>\t\t\t\t\t\t\t<span id="messageText">\t\t\t\t\t\t\t\t每天的协查文件下载次数不能超过100次。\t\t\t\t\t\t\t</span>\t\t\t\t\t\t</div>\t\t\t\t\t</td>\t\t\t\t</tr>\t\t \t</tbody>\t\t \t<tfoot>\t\t \t\t<tr class="child-last">\t\t \t\t\t<td colspan="2" align="center">\t\t \t\t\t\t<input type="button" class="fn-btn fn-btn-primary fn-W100" data-trigger="submit" value="提交">\t\t \t\t\t</td>\t\t \t\t</tr>\t\t \t</tfoot>\t\t\t</table>\t</div></form>', compile
});
"use strict";
define("common/jquery-debug", [], function(require, exports) {
    return jQuery
});
define("common/handlerbars-debug", [], function(require, exports, module) {});