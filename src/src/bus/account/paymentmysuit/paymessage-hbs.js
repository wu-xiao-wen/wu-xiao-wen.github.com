define(function(require, exports, module) { var Handlerbars = require("common/handlerbars"); var compile = Handlerbars.compile("<div class=\"fn-PT20 fn-PL20 fn-PR20 \" >	<div class=\"global-tab fn-BBS-ebebeb\">            <i></i>缴费信息    </div>    <input type=\"hidden\" name=\"securityId\" value=\"{{resultDo.securityId}}\">    <table class=\"fn-table  fn-table-text fn-MT20 fn-MB20\" width=\"100%\">    	<tr>    		<td width=\"75\" align=\"right\" >支付令：</td>    		<td>    		<a href=\"/paymentorder/paymentOrderView.htm?securityId={{securityCaseId}}\" target=\"_blank\" class=\"fn-color-047DC6 fn-LH20\">{{caseCode}}<br/>{{title}}</a>    		</td>    	</tr>    	<tr>    		<td align=\"right\">    			申请金额：    		</td>    		<td>    			￥{{parseAmount amount}}    		</td>    	</tr>    	<tr>    		<td align=\"right\">    			缴费金额：    		</td>    		<td>    			<span class=\"fn-left fn-color-F00 fn-FS20 \">￥{{parseAmount price}}</span>       		</td>    	</tr>    	<tr>    		<td colspan=\"2\" class=\"fn-TAC\">    			<input type=\"button\"  data-tigger=\"pay\" class=\"fn-btn fn-btn-sm fn-btn-primary fn-W75 fn-LH28 fn-FWN\" value=\"缴费\"/>    			    		</td>    	</tr>    </table></div>"); compile.source="<div class=\"fn-PT20 fn-PL20 fn-PR20 \" >	<div class=\"global-tab fn-BBS-ebebeb\">            <i></i>缴费信息    </div>    <input type=\"hidden\" name=\"securityId\" value=\"{{resultDo.securityId}}\">    <table class=\"fn-table  fn-table-text fn-MT20 fn-MB20\" width=\"100%\">    	<tr>    		<td width=\"75\" align=\"right\" >支付令：</td>    		<td>    		<a href=\"/paymentorder/paymentOrderView.htm?securityId={{securityCaseId}}\" target=\"_blank\" class=\"fn-color-047DC6 fn-LH20\">{{caseCode}}<br/>{{title}}</a>    		</td>    	</tr>    	<tr>    		<td align=\"right\">    			申请金额：    		</td>    		<td>    			￥{{parseAmount amount}}    		</td>    	</tr>    	<tr>    		<td align=\"right\">    			缴费金额：    		</td>    		<td>    			<span class=\"fn-left fn-color-F00 fn-FS20 \">￥{{parseAmount price}}</span>       		</td>    	</tr>    	<tr>    		<td colspan=\"2\" class=\"fn-TAC\">    			<input type=\"button\"  data-tigger=\"pay\" class=\"fn-btn fn-btn-sm fn-btn-primary fn-W75 fn-LH28 fn-FWN\" value=\"缴费\"/>    			    		</td>    	</tr>    </table></div>"; return compile; });