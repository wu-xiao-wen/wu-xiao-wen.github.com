"use strict";
define("src/model/paymentFact/view-debug", ["common/jquery-debug", "common/myWidget-debug", "src/model/paymentFact/paymentFactView-hbs-debug", "common/handlerbars-debug"], function(require, exports, module) {
    var $ = require("common/jquery-debug"),
        MyWidget = require("common/myWidget-debug"),
        paymentFactViewHbs = require("src/model/paymentFact/paymentFactView-hbs-debug"),
        PaymentFactView = MyWidget.extend({
            clssName: "PaymentFactView",
            attrs: {
                signedModeStatus: {
                    dataMessage: "数据电文",
                    contract: "合同书",
                    oral: "口头"
                }
            },
            events: {},
            initProps: function() {},
            setup: function() {
                var me = this,
                    data = me.element.data("data");
                me.element.html(paymentFactViewHbs($.extend(data, {
                    signedMode: me.get("signedModeStatus")[data.signedMode]
                })))
            }
        });
    return PaymentFactView
});
"use strict";
define("common/jquery-debug", [], function(require, exports) {
    return jQuery
});
define("src/model/paymentFact/paymentFactView-hbs-debug", ["common/handlerbars-debug"], function(require, exports, module) {
    var Handlerbars = require("common/handlerbars-debug"),
        compile = Handlerbars.compile('<table width="100%" class="fn-table fn-table-text">    <tr>        <td width="120" align="right">合同编号：</td>        <td>{{contractNum}}</td>    </tr>    <tr>        <td align="right">合同名称：</td>        <td>{{contractTitle}}</td>    </tr>    <tr>        <td align="right">合同签订日期：</td>        <td>{{contractDate}}</td>    </tr>    <tr>        <td align="right">签订方式：</td>        <td>{{signedMode}}</td>    </tr>    <tr>        <td align="right">贷款用途：</td>        <td>{{loanUse}}</td>    </tr>    <tr>        <td align="right">说明：</td>        <td>{{Explanation}}</td>    </tr></table>');
    return compile.source = '<table width="100%" class="fn-table fn-table-text">    <tr>        <td width="120" align="right">合同编号：</td>        <td>{{contractNum}}</td>    </tr>    <tr>        <td align="right">合同名称：</td>        <td>{{contractTitle}}</td>    </tr>    <tr>        <td align="right">合同签订日期：</td>        <td>{{contractDate}}</td>    </tr>    <tr>        <td align="right">签订方式：</td>        <td>{{signedMode}}</td>    </tr>    <tr>        <td align="right">贷款用途：</td>        <td>{{loanUse}}</td>    </tr>    <tr>        <td align="right">说明：</td>        <td>{{Explanation}}</td>    </tr></table>', compile
});
define("common/handlerbars-debug", [], function(require, exports, module) {});