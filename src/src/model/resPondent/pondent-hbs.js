define(function(require, exports, module) { var Handlerbars = require("common/handlerbars"); var compile = Handlerbars.compile("<div class=\"fn-BS-CCC fn-LH30  fn-PaAl10 fn-MT10\">	<input type=\"hidden\" name=\"paySuitEntityDo.securityId\" value=\"{{securityId}}\" />	<input type=\"hidden\" name=\"paySuitEntityDo.entityRole\" value=\"accused\" />	<input type=\"hidden\" name=\"paySuitEntityDo.entityPosition\" value=\"1\" />	<table class=\"fn-table fn-table-input fn-table-input-sm fn-MT10\" width=\"100%\">		<tbody>			<tr>				<td align=\"right\" width=\"100\">身份：</td>				<td colspan=\"3\">					<select class=\"fn-select fn-W115\" data-role=\"personChange\" name=\"paySuitEntityDo.entityType\" {{#if securityId}}disabled=\"disabled\"{{/if}}>						<option value=\"normal\" {{#isEqual entityType \"normal\"}}selected=\"selected\"{{/isEqual}}>自然人</option>						<option value=\"legal\" {{#isEqual entityType \"legal\"}}selected=\"selected\"{{/isEqual}}>法人</option>					</select>					{{#if securityId}}						<input name=\"paySuitEntityDo.entityType\" type=\"hidden\" value=\"{{entityType}}\" />					{{/if}}				</td>			</tr>		</tbody>	</table>	<table class=\"fn-table fn-table-input fn-table-input-sm fn-MT10\" width=\"100%\">		<tbody {{#isEqual entityType \"legal\"}}class=\"fn-hide\"{{/isEqual}} data-role=\"normal\">			<tr>				<td align=\"right\" class=\"fn-LH30\" width=\"100\"><span class=\"global-require fn-VA1D\">*</span> 姓名：</td>				<td>					<div class=\"fn-MR30 kuma-form-item\">						<input type=\"text\" name=\"paySuitEntityDo.name\"  class=\"fn-input-text fn-input-text-sm fn-W100P JS-prosecute-required kuma-input\" data-required=\"true\" data-errormessage=\"请输入姓名。\" maxlength=\"25\" value=\"{{name}}\" />					</div>				</td>				<td align=\"right\" class=\"fn-LH30\">性别：</td>				<td>					<label>						<input type=\"radio\" name=\"paySuitEntityDo.gender\" value=\"male\" class=\"fn-VA2D\" {{#isEqual gender \"male\"}}checked=\"checked\"{{/isEqual}} /> 男					</label>					<label class=\"fn-ML20\">						<input type=\"radio\" name=\"paySuitEntityDo.gender\" value=\"female\" class=\"fn-VA2D\" {{#isEqual gender \"female\"}}checked=\"checked\"{{/isEqual}} /> 女					</label>				</td>			</tr>			<tr>				<td align=\"right\" class=\"fn-LH30\"><span class=\"global-require fn-VA1D\">*</span> 民族：</td>				<td>					<div class=\"fn-MR30 kuma-form-item\">						<input type=\"text\" name=\"paySuitEntityDo.nation\" class=\"fn-input-text fn-input-text-sm fn-W100P JS-prosecute-required kuma-input\" data-required=\"true\" data-errormessage-required=\"请输入民族。\" maxlength=\"30\" value=\"{{nation}}\"/>					</div>				</td>				<td align=\"right\" class=\"fn-LH30\"><span class=\"global-require fn-VA1D\">*</span> 出生年月：</td>				<td>					<div class=\"fn-MR30 kuma-form-item\">                        <input type=\"text\" name=\"paySuitEntityDo.birthday\" value=\"{{formatData \'yyyy-MM-dd\' birthday}}\" class=\"fn-input-text fn-input-text-sm fn-W100P JS-prosecute-required kuma-input\" data-required=\"true\" data-errormessage-required=\"请选择出生年月。\" readonly=\"readonly\" />                    </div>				</td>			</tr>			<tr>				<td align=\"right\" class=\"fn-LH30\">手机号码：</td>				<td>					<div class=\"fn-MR30 kuma-form-item\">						<input type=\"text\" name=\"paySuitEntityDo.mobile\" class=\"fn-input-text fn-input-text-sm fn-W100P kuma-input JS-prosecute-required\" 							 data-errormessage-required=\"请输入手机号码。\" data-rule=\"mobile\" data-errormessage-mobile=\"请填写正确的手机号码\"  maxlength=\"11\" value=\"{{mobile}}\"/>					</div>				</td>				<td align=\"right\" class=\"fn-LH30\">邮箱：</td>				<td>					<div class=\"fn-MR30 kuma-form-item\">						<input type=\"text\" class=\"fn-input-text fn-input-text-sm fn-W100P kuma-input JS-prosecute-required\"							data-rule=\"email\" name=\"paySuitEntityDo.email\" data-errormessage-required=\"请填写邮箱。\" data-errormessage-email=\"请填写正确的邮箱。\" value=\"{{email}}\"  maxlength=\"100\"/>							<div class=\"fn-color-e94e49 fn-H24 fn-H24 fn-hide fn-PT6\" data-test=\"test\"><i class=\"kuma-icon kuma-icon-error\"></i>&nbsp;手机号与邮箱至少必须填一个</div>					</div>				</td>			</tr>			<tr>				<td align=\"right\" class=\"fn-LH30\"><span class=\"global-require fn-VA1D\">*</span> 身份证号码：</td>				<td>					<div class=\"fn-MR30 kuma-form-item\">						<input type=\"text\" name=\"paySuitEntityDo.idCard\" class=\"fn-input-text fn-input-text-sm fn-W100P JS-prosecute-required kuma-input\" 							data-required=\"true\" data-errormessage-required=\"请输入身份证号。\" data-rule=\"cardid\" data-errormessage-cardid=\"请填写正确的身份证号。\"  maxlength=\"25\" value=\"{{idCard}}\"/>						<input type=\"hidden\" name=\"paySuitEntityDo.certType\" value=\"idcard\"/>					</div>				</td>			</tr>			<tr>				<td align=\"right\" class=\"fn-LH30\">其他电话号码：</td>				<td>					<div class=\"fn-MR30 kuma-form-item\">						<input type=\"text\" name=\"paySuitEntityDo.otherMobile \" class=\"fn-input-text fn-input-text-sm fn-W100P JS-prosecute-required kuma-input\" data-rule=\"mobile\" data-errormessage-mobile=\"请填写正确的手机号码\"  maxlength=\"11\" value=\"{{otherMobile }}\"/>					</div>				</td>				<td align=\"right\" class=\"fn-LH30\">其他邮箱：</td>				<td>					<div class=\"fn-MR30 kuma-form-item\">						<input type=\"text\" name=\"paySuitEntityDo.otherEmail\" class=\"fn-input-text fn-input-text-sm fn-W100P JS-prosecute-required kuma-input\" 							#if($isTest != \"y\")															#else															#end							maxlength=\"50\" value=\"{{otherEmail}}\"/>					</div>				</td>			</tr>		</tbody>		<tbody {{#isEqual entityType \"normal\"}}class=\"fn-hide\"{{/isEqual}} data-role=\"legal\">			<tr>				<td align=\"right\" class=\"fn-LH30\" width=\"100\"><span class=\"global-require fn-VA1D\">*</span> 公司名：</td>				<td colspan=\"1\">					<div class=\"fn-MR30 kuma-form-item\">                		<input type=\"text\" name=\"paySuitEntityDo.companyName\" class=\"fn-input-text fn-input-text-sm fn-W100P JS-prosecute-required kuma-input\" data-required=\"true\" data-errormessage=\"请输入公司名。\"  maxlength=\"36\" value=\"{{companyName}}\"/>                	</div>				</td>			</tr>			<tr>                <td> </td>                <td colspan=\"3\">                    可通过全国企业信用信息公示系统<a href=\"http://gsxt.saic.gov.cn\" class=\"global-link\" target=\"_blank\">(http://gsxt.saic.gov.cn)</a>查询企业名称、地址、法定代表人等信息                </td>            </tr>			<tr>				<td align=\"right\" class=\"fn-LH30\"><span class=\"global-require fn-VA1D\">*</span> 法定代表人：</td>				<td>					<div class=\"fn-MR30 kuma-form-item\">                		<input type=\"text\" name=\"paySuitEntityDo.legalRepresent\" class=\"fn-input-text fn-input-text-sm fn-W100P JS-prosecute-required kuma-input\" data-required=\"true\" data-errormessage=\"请输入法定代表人。\" maxlength=\"200\" value=\"{{legalRepresent}}\"/>                	</div>				</td>				<td align=\"right\" class=\"fn-LH30\">公司注册地：</td>				<td>					<div class=\"fn-MR30 kuma-form-item\">                		<input type=\"text\" name=\"paySuitEntityDo.companyAddress\" class=\"fn-input-text fn-input-text-sm fn-W100P JS-prosecute-required kuma-input\"                 	</div>				</td>			</tr>			<tr>				<td align=\"right\" class=\"fn-LH30\">联系人：</td>				<td>					<div class=\"fn-MR30 kuma-form-item\">                		<input type=\"text\" name=\"paySuitEntityDo.contact\" class=\"fn-input-text fn-input-text-sm fn-W100P JS-prosecute-required kuma-input\"                 			                	</div>				</td>				<td align=\"right\" class=\"fn-LH30\">职位：</td>				<td>					<div class=\"fn-MR30 kuma-form-item\">                		<input type=\"text\"  name=\"paySuitEntityDo.job\" class=\"fn-input-text fn-input-text-sm fn-W100P kuma-input\"  maxlength=\"25\" value=\"{{job}}\"/>                	</div>				</td>			</tr>			<tr>				<td align=\"right\" class=\"fn-LH30\">手机号码：</td>				<td>					<div class=\"fn-MR30 kuma-form-item\">                		<input type=\"text\" name=\"paySuitEntityDo.mobile\" class=\"fn-input-text fn-input-text-sm fn-W100P JS-prosecute-required kuma-input\"                 			                	</div>				</td>				<td align=\"right\" class=\"fn-LH30\">邮箱：</td>				<td>					<div class=\"fn-MR30 kuma-form-item\">                		<input type=\"text\" name=\"paySuitEntityDo.email\" class=\"fn-input-text fn-input-text-sm fn-W100P JS-prosecute-required kuma-input\"                			                			                            #if($isTest != \"y\")                                data-rule=\"email\" data-errormessage-email=\"请填写正确的邮箱\"                            #else                                data-rule=\"aliyunEmail\" data-errormessage-email=\"请填写正确的阿里云邮箱\"                            #end                			maxlength=\"50\" value=\"{{email}}\"/>                	</div>				</td>			</tr>			<tr>				<td align=\"right\" class=\"fn-LH30\">通讯地址：</td>				<td>					<div class=\"fn-MR30 kuma-form-item\">                		<input type=\"text\" name=\"paySuitEntityDo.mailAddress\" class=\"fn-input-text fn-input-text-sm fn-W100P JS-prosecute-required kuma-input\" data-required=\"true\" data-errormessage=\"请输入通讯地址。\"  maxlength=\"100\"  value=\"{{mailAddress}}\"/>                	</div>				</td>				<td align=\"right\" class=\"fn-LH30\">固定电话：</td>				<td>					<div class=\"fn-MR30 kuma-form-item\">                		<input type=\"text\" name=\"paySuitEntityDo.phone\" class=\"fn-input-text fn-input-text-sm fn-W100P JS-prosecute-required kuma-input kuma-input\" maxlength=\"15\" data-rule=\"tel\" data-errormessage-tel=\"请输入正确的格式(比如0571-88888888)。\" value=\"{{phone}}\"/>                	</div>				</td>			</tr>		</tbody>			</table></div>"); compile.source="<div class=\"fn-BS-CCC fn-LH30  fn-PaAl10 fn-MT10\">	<input type=\"hidden\" name=\"paySuitEntityDo.securityId\" value=\"{{securityId}}\" />	<input type=\"hidden\" name=\"paySuitEntityDo.entityRole\" value=\"accused\" />	<input type=\"hidden\" name=\"paySuitEntityDo.entityPosition\" value=\"1\" />	<table class=\"fn-table fn-table-input fn-table-input-sm fn-MT10\" width=\"100%\">		<tbody>			<tr>				<td align=\"right\" width=\"100\">身份：</td>				<td colspan=\"3\">					<select class=\"fn-select fn-W115\" data-role=\"personChange\" name=\"paySuitEntityDo.entityType\" {{#if securityId}}disabled=\"disabled\"{{/if}}>						<option value=\"normal\" {{#isEqual entityType \"normal\"}}selected=\"selected\"{{/isEqual}}>自然人</option>						<option value=\"legal\" {{#isEqual entityType \"legal\"}}selected=\"selected\"{{/isEqual}}>法人</option>					</select>					{{#if securityId}}						<input name=\"paySuitEntityDo.entityType\" type=\"hidden\" value=\"{{entityType}}\" />					{{/if}}				</td>			</tr>		</tbody>	</table>	<table class=\"fn-table fn-table-input fn-table-input-sm fn-MT10\" width=\"100%\">		<tbody {{#isEqual entityType \"legal\"}}class=\"fn-hide\"{{/isEqual}} data-role=\"normal\">			<tr>				<td align=\"right\" class=\"fn-LH30\" width=\"100\"><span class=\"global-require fn-VA1D\">*</span> 姓名：</td>				<td>					<div class=\"fn-MR30 kuma-form-item\">						<input type=\"text\" name=\"paySuitEntityDo.name\"  class=\"fn-input-text fn-input-text-sm fn-W100P JS-prosecute-required kuma-input\" data-required=\"true\" data-errormessage=\"请输入姓名。\" maxlength=\"25\" value=\"{{name}}\" />					</div>				</td>				<td align=\"right\" class=\"fn-LH30\">性别：</td>				<td>					<label>						<input type=\"radio\" name=\"paySuitEntityDo.gender\" value=\"male\" class=\"fn-VA2D\" {{#isEqual gender \"male\"}}checked=\"checked\"{{/isEqual}} /> 男					</label>					<label class=\"fn-ML20\">						<input type=\"radio\" name=\"paySuitEntityDo.gender\" value=\"female\" class=\"fn-VA2D\" {{#isEqual gender \"female\"}}checked=\"checked\"{{/isEqual}} /> 女					</label>				</td>			</tr>			<tr>				<td align=\"right\" class=\"fn-LH30\"><span class=\"global-require fn-VA1D\">*</span> 民族：</td>				<td>					<div class=\"fn-MR30 kuma-form-item\">						<input type=\"text\" name=\"paySuitEntityDo.nation\" class=\"fn-input-text fn-input-text-sm fn-W100P JS-prosecute-required kuma-input\" data-required=\"true\" data-errormessage-required=\"请输入民族。\" maxlength=\"30\" value=\"{{nation}}\"/>					</div>				</td>				<td align=\"right\" class=\"fn-LH30\"><span class=\"global-require fn-VA1D\">*</span> 出生年月：</td>				<td>					<div class=\"fn-MR30 kuma-form-item\">                        <input type=\"text\" name=\"paySuitEntityDo.birthday\" value=\"{{formatData \'yyyy-MM-dd\' birthday}}\" class=\"fn-input-text fn-input-text-sm fn-W100P JS-prosecute-required kuma-input\" data-required=\"true\" data-errormessage-required=\"请选择出生年月。\" readonly=\"readonly\" />                    </div>				</td>			</tr>			<tr>				<td align=\"right\" class=\"fn-LH30\">手机号码：</td>				<td>					<div class=\"fn-MR30 kuma-form-item\">						<input type=\"text\" name=\"paySuitEntityDo.mobile\" class=\"fn-input-text fn-input-text-sm fn-W100P kuma-input JS-prosecute-required\" 							 data-errormessage-required=\"请输入手机号码。\" data-rule=\"mobile\" data-errormessage-mobile=\"请填写正确的手机号码\"  maxlength=\"11\" value=\"{{mobile}}\"/>					</div>				</td>				<td align=\"right\" class=\"fn-LH30\">邮箱：</td>				<td>					<div class=\"fn-MR30 kuma-form-item\">						<input type=\"text\" class=\"fn-input-text fn-input-text-sm fn-W100P kuma-input JS-prosecute-required\"							data-rule=\"email\" name=\"paySuitEntityDo.email\" data-errormessage-required=\"请填写邮箱。\" data-errormessage-email=\"请填写正确的邮箱。\" value=\"{{email}}\"  maxlength=\"100\"/>							<div class=\"fn-color-e94e49 fn-H24 fn-H24 fn-hide fn-PT6\" data-test=\"test\"><i class=\"kuma-icon kuma-icon-error\"></i>&nbsp;手机号与邮箱至少必须填一个</div>					</div>				</td>			</tr>			<tr>				<td align=\"right\" class=\"fn-LH30\"><span class=\"global-require fn-VA1D\">*</span> 身份证号码：</td>				<td>					<div class=\"fn-MR30 kuma-form-item\">						<input type=\"text\" name=\"paySuitEntityDo.idCard\" class=\"fn-input-text fn-input-text-sm fn-W100P JS-prosecute-required kuma-input\" 							data-required=\"true\" data-errormessage-required=\"请输入身份证号。\" data-rule=\"cardid\" data-errormessage-cardid=\"请填写正确的身份证号。\"  maxlength=\"25\" value=\"{{idCard}}\"/>						<input type=\"hidden\" name=\"paySuitEntityDo.certType\" value=\"idcard\"/>					</div>				</td>			</tr>			<tr>				<td align=\"right\" class=\"fn-LH30\">其他电话号码：</td>				<td>					<div class=\"fn-MR30 kuma-form-item\">						<input type=\"text\" name=\"paySuitEntityDo.otherMobile \" class=\"fn-input-text fn-input-text-sm fn-W100P JS-prosecute-required kuma-input\" data-rule=\"mobile\" data-errormessage-mobile=\"请填写正确的手机号码\"  maxlength=\"11\" value=\"{{otherMobile }}\"/>					</div>				</td>				<td align=\"right\" class=\"fn-LH30\">其他邮箱：</td>				<td>					<div class=\"fn-MR30 kuma-form-item\">						<input type=\"text\" name=\"paySuitEntityDo.otherEmail\" class=\"fn-input-text fn-input-text-sm fn-W100P JS-prosecute-required kuma-input\" 							#if($isTest != \"y\")															#else															#end							maxlength=\"50\" value=\"{{otherEmail}}\"/>					</div>				</td>			</tr>		</tbody>		<tbody {{#isEqual entityType \"normal\"}}class=\"fn-hide\"{{/isEqual}} data-role=\"legal\">			<tr>				<td align=\"right\" class=\"fn-LH30\" width=\"100\"><span class=\"global-require fn-VA1D\">*</span> 公司名：</td>				<td colspan=\"1\">					<div class=\"fn-MR30 kuma-form-item\">                		<input type=\"text\" name=\"paySuitEntityDo.companyName\" class=\"fn-input-text fn-input-text-sm fn-W100P JS-prosecute-required kuma-input\" data-required=\"true\" data-errormessage=\"请输入公司名。\"  maxlength=\"36\" value=\"{{companyName}}\"/>                	</div>				</td>			</tr>			<tr>                <td> </td>                <td colspan=\"3\">                    可通过全国企业信用信息公示系统<a href=\"http://gsxt.saic.gov.cn\" class=\"global-link\" target=\"_blank\">(http://gsxt.saic.gov.cn)</a>查询企业名称、地址、法定代表人等信息                </td>            </tr>			<tr>				<td align=\"right\" class=\"fn-LH30\"><span class=\"global-require fn-VA1D\">*</span> 法定代表人：</td>				<td>					<div class=\"fn-MR30 kuma-form-item\">                		<input type=\"text\" name=\"paySuitEntityDo.legalRepresent\" class=\"fn-input-text fn-input-text-sm fn-W100P JS-prosecute-required kuma-input\" data-required=\"true\" data-errormessage=\"请输入法定代表人。\" maxlength=\"200\" value=\"{{legalRepresent}}\"/>                	</div>				</td>				<td align=\"right\" class=\"fn-LH30\">公司注册地：</td>				<td>					<div class=\"fn-MR30 kuma-form-item\">                		<input type=\"text\" name=\"paySuitEntityDo.companyAddress\" class=\"fn-input-text fn-input-text-sm fn-W100P JS-prosecute-required kuma-input\"                 	</div>				</td>			</tr>			<tr>				<td align=\"right\" class=\"fn-LH30\">联系人：</td>				<td>					<div class=\"fn-MR30 kuma-form-item\">                		<input type=\"text\" name=\"paySuitEntityDo.contact\" class=\"fn-input-text fn-input-text-sm fn-W100P JS-prosecute-required kuma-input\"                 			                	</div>				</td>				<td align=\"right\" class=\"fn-LH30\">职位：</td>				<td>					<div class=\"fn-MR30 kuma-form-item\">                		<input type=\"text\"  name=\"paySuitEntityDo.job\" class=\"fn-input-text fn-input-text-sm fn-W100P kuma-input\"  maxlength=\"25\" value=\"{{job}}\"/>                	</div>				</td>			</tr>			<tr>				<td align=\"right\" class=\"fn-LH30\">手机号码：</td>				<td>					<div class=\"fn-MR30 kuma-form-item\">                		<input type=\"text\" name=\"paySuitEntityDo.mobile\" class=\"fn-input-text fn-input-text-sm fn-W100P JS-prosecute-required kuma-input\"                 			                	</div>				</td>				<td align=\"right\" class=\"fn-LH30\">邮箱：</td>				<td>					<div class=\"fn-MR30 kuma-form-item\">                		<input type=\"text\" name=\"paySuitEntityDo.email\" class=\"fn-input-text fn-input-text-sm fn-W100P JS-prosecute-required kuma-input\"                			                			                            #if($isTest != \"y\")                                data-rule=\"email\" data-errormessage-email=\"请填写正确的邮箱\"                            #else                                data-rule=\"aliyunEmail\" data-errormessage-email=\"请填写正确的阿里云邮箱\"                            #end                			maxlength=\"50\" value=\"{{email}}\"/>                	</div>				</td>			</tr>			<tr>				<td align=\"right\" class=\"fn-LH30\">通讯地址：</td>				<td>					<div class=\"fn-MR30 kuma-form-item\">                		<input type=\"text\" name=\"paySuitEntityDo.mailAddress\" class=\"fn-input-text fn-input-text-sm fn-W100P JS-prosecute-required kuma-input\" data-required=\"true\" data-errormessage=\"请输入通讯地址。\"  maxlength=\"100\"  value=\"{{mailAddress}}\"/>                	</div>				</td>				<td align=\"right\" class=\"fn-LH30\">固定电话：</td>				<td>					<div class=\"fn-MR30 kuma-form-item\">                		<input type=\"text\" name=\"paySuitEntityDo.phone\" class=\"fn-input-text fn-input-text-sm fn-W100P JS-prosecute-required kuma-input kuma-input\" maxlength=\"15\" data-rule=\"tel\" data-errormessage-tel=\"请输入正确的格式(比如0571-88888888)。\" value=\"{{phone}}\"/>                	</div>				</td>			</tr>		</tbody>			</table></div>"; return compile; });