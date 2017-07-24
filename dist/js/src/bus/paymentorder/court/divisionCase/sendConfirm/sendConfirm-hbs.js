define("src/bus/paymentorder/court/divisionCase/sendConfirm/sendConfirm-hbs",["common/handlerbars"],function(require,exports,module){var Handlerbars=require("common/handlerbars"),compile=Handlerbars.compile('\t<div class="fn-PaAl25 fn-color-666">\t\t<div class="global-tab fn-BBS-ebebeb"><i></i>线下送达登记</div>\t\t<div class="fn-MT10">\t\t\t<form class="kuma-form" id="sendConfirm-form" >\t\t\t\t<table class="fn-table fn-table-input fn-table-input-sm">\t\t\t\t\t<tr>\t\t\t\t\t\t<td align="right"  width="100" ><span class="global-require fn-VA1D">*</span>送达方式：</td>\t\t\t\t\t\t<td width="*">\t\t\t\t\t\t\t<div class="kuma-form-item">\t\t            \t\t\t<select class="fn-select fn-W140 kuma-input JS-target-required" data-errormessage-required="请选择送达方式" data-required="true" name="lassenDocumentConfirmDo.receiveType">\t\t\t            \t\t\t<option value="offline_send">线下邮寄</option>\t\t\t            \t\t\t<option value="arrive_court">到庭</option>\t\t            \t\t\t</select>\t\t            \t\t</div>\t\t\t\t\t\t</td>\t\t\t\t\t</tr>\t\t\t\t\t<tr>\t\t\t\t\t\t<td align="right"><span class="global-require fn-VA1D">*</span>送达地址：</td>\t\t\t\t\t\t<td width="*">\t\t\t\t\t\t\t<div class="kuma-form-item">\t\t\t\t\t\t\t\t<input type="text" class="fn-input-text fn-W260 fn-input-text-sm kuma-input JS-target-required" data-required="true" name="lassenDocumentConfirmDo.receiveAddress" data-errormessage-required="请输入送达地址。" maxlength="200"/>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</td>\t\t\t\t\t</tr>\t\t\t\t\t\t\t\t\t\t<tr>\t\t\t\t\t\t<td align="right"><span class="global-require fn-VA1D">*</span>送达确认时间：</td>\t\t\t\t\t\t<td width="*">\t\t\t\t\t\t\t<div class="kuma-form-item">\t\t\t\t\t\t\t\t<input type="text" class="fn-input-text fn-W260 fn-input-text-sm kuma-input JS-target-required JS-need-calendar" readonly="readonly" value="" data-required="true" name="lassenDocumentConfirmDo.receiveTime" data-errormessage-required="请选择送达确认时间。"/>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</td>\t\t\t\t\t</tr>\t\t\t\t\t<tr>\t\t\t\t\t\t<td align="right" valign="top" class="fn-LH36"><span class="global-require fn-VA1D">*</span>送达详情：</td>\t\t\t\t\t\t<td>\t\t\t\t\t\t\t<div class="kuma-form-item">\t\t\t\t\t\t\t\t<textarea rows="3" name="lassenDocumentConfirmDo.content" maxlength="1000" class="fn-textarea fn-W260 JS-target-required" data-required="true" data-errormessage-required="请输入送达详情。"></textarea>\t\t\t\t\t\t\t</div>\t\t\t\t    \t</td>\t\t\t\t\t</tr>\t\t\t\t\t<tr>\t\t\t\t\t\t<td align="right"><span class="global-require fn-VA1D">*</span>证明文件：</td>\t\t\t\t\t\t<td><div class="kuma-form-item">\t                            <input type="button" class="fn-btn fn-btn-upload fn-btn-sm fn-W100 JS-need-upload" value="上传附件" \t                            data-style=\'{"display": "inline-block"}\' \t                            data-img-view="true"\t                            data-input-name="fileId" />\t                            <input type="hidden" name="fileId" class="JS-target-required" data-skip-hidden="false"  \t                            data-required="true" data-errormessage="请上传证明文件。" value="" />\t                        </div>\t                    </td>\t\t\t\t\t</tr>\t\t\t\t\t<tr>\t\t\t\t\t\t<td align="right"></td>\t\t\t\t\t\t<td>\t\t\t\t\t\t\t<input type="button" class="fn-btn fn-btn-primary fn-btn-sm fn-W80 fn-H30 fn-LH30" data-role="sure" value="确   定"/>\t\t\t\t\t\t</td>\t\t\t\t\t</tr>\t\t\t\t</table>\t\t\t</form>\t\t</div>\t</div>');return compile.source='\t<div class="fn-PaAl25 fn-color-666">\t\t<div class="global-tab fn-BBS-ebebeb"><i></i>线下送达登记</div>\t\t<div class="fn-MT10">\t\t\t<form class="kuma-form" id="sendConfirm-form" >\t\t\t\t<table class="fn-table fn-table-input fn-table-input-sm">\t\t\t\t\t<tr>\t\t\t\t\t\t<td align="right"  width="100" ><span class="global-require fn-VA1D">*</span>送达方式：</td>\t\t\t\t\t\t<td width="*">\t\t\t\t\t\t\t<div class="kuma-form-item">\t\t            \t\t\t<select class="fn-select fn-W140 kuma-input JS-target-required" data-errormessage-required="请选择送达方式" data-required="true" name="lassenDocumentConfirmDo.receiveType">\t\t\t            \t\t\t<option value="offline_send">线下邮寄</option>\t\t\t            \t\t\t<option value="arrive_court">到庭</option>\t\t            \t\t\t</select>\t\t            \t\t</div>\t\t\t\t\t\t</td>\t\t\t\t\t</tr>\t\t\t\t\t<tr>\t\t\t\t\t\t<td align="right"><span class="global-require fn-VA1D">*</span>送达地址：</td>\t\t\t\t\t\t<td width="*">\t\t\t\t\t\t\t<div class="kuma-form-item">\t\t\t\t\t\t\t\t<input type="text" class="fn-input-text fn-W260 fn-input-text-sm kuma-input JS-target-required" data-required="true" name="lassenDocumentConfirmDo.receiveAddress" data-errormessage-required="请输入送达地址。" maxlength="200"/>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</td>\t\t\t\t\t</tr>\t\t\t\t\t\t\t\t\t\t<tr>\t\t\t\t\t\t<td align="right"><span class="global-require fn-VA1D">*</span>送达确认时间：</td>\t\t\t\t\t\t<td width="*">\t\t\t\t\t\t\t<div class="kuma-form-item">\t\t\t\t\t\t\t\t<input type="text" class="fn-input-text fn-W260 fn-input-text-sm kuma-input JS-target-required JS-need-calendar" readonly="readonly" value="" data-required="true" name="lassenDocumentConfirmDo.receiveTime" data-errormessage-required="请选择送达确认时间。"/>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</td>\t\t\t\t\t</tr>\t\t\t\t\t<tr>\t\t\t\t\t\t<td align="right" valign="top" class="fn-LH36"><span class="global-require fn-VA1D">*</span>送达详情：</td>\t\t\t\t\t\t<td>\t\t\t\t\t\t\t<div class="kuma-form-item">\t\t\t\t\t\t\t\t<textarea rows="3" name="lassenDocumentConfirmDo.content" maxlength="1000" class="fn-textarea fn-W260 JS-target-required" data-required="true" data-errormessage-required="请输入送达详情。"></textarea>\t\t\t\t\t\t\t</div>\t\t\t\t    \t</td>\t\t\t\t\t</tr>\t\t\t\t\t<tr>\t\t\t\t\t\t<td align="right"><span class="global-require fn-VA1D">*</span>证明文件：</td>\t\t\t\t\t\t<td><div class="kuma-form-item">\t                            <input type="button" class="fn-btn fn-btn-upload fn-btn-sm fn-W100 JS-need-upload" value="上传附件" \t                            data-style=\'{"display": "inline-block"}\' \t                            data-img-view="true"\t                            data-input-name="fileId" />\t                            <input type="hidden" name="fileId" class="JS-target-required" data-skip-hidden="false"  \t                            data-required="true" data-errormessage="请上传证明文件。" value="" />\t                        </div>\t                    </td>\t\t\t\t\t</tr>\t\t\t\t\t<tr>\t\t\t\t\t\t<td align="right"></td>\t\t\t\t\t\t<td>\t\t\t\t\t\t\t<input type="button" class="fn-btn fn-btn-primary fn-btn-sm fn-W80 fn-H30 fn-LH30" data-role="sure" value="确   定"/>\t\t\t\t\t\t</td>\t\t\t\t\t</tr>\t\t\t\t</table>\t\t\t</form>\t\t</div>\t</div>',compile});
define("common/handlerbars",[],function(require,exports,module){});