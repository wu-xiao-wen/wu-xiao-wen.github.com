define(function(require, exports, module) { var Handlerbars = require("common/handlerbars"); var compile = Handlerbars.compile("<div class=\"fn-PL20 fn-PR20 fn-PB20 fn-PT20 fn-color-666\">    <input type=\"hidden\" name=\"securityCaseId\" value=\"{{securityCaseId}}\" />    <div class=\"global-tab fn-BBS-ebebeb\"><i></i>请选择文件</div>    <table width=\"100%\" class=\"fn-table fn-table-input fn-table-input-sm fn-MT20\">        <tr>            <td align=\"right\" class=\"fn-LH25\" width=\"100\"><span class=\"global-require fn-VA1D\">*</span> 导入模板：</td>            <td>                <div class=\"fn-MR30 kuma-form-item\">                    <input type=\"button\" class=\"fn-btn fn-btn-upload fn-btn-sm fn-W80  JS-prosecute-required\" value=\"选择文件\" data-widget=\"upload\" data-style=\'{\"display\": \"inline-block\"}\' data-input-name=\"securityFileId\" data-size=\"1\" data-rule=\"(\.xls|\.xlsx)$\" data-required=\"true\" data-errormessage=\"请选择文件\"/>                    <input type=\"hidden\" name=\"securityFileId\" data-skip-hidden=\"false\" data-widget=\"validator\" data-required=\"true\" data-errormessage=\"请上传文件。\" />                </div>            </td>        </tr>        <tr>            <td> </td>            <td>请下载<a href=\"javascript:;\" class=\"fn-color-047dc6\" target=\"_bank\">《信用卡数据模板》</a>模板，按照模板填写数据再上传</td>        </tr>        <tr>            <td> </td>            <td>                <div class=\"fn-MT20\">                    <input type=\"button\"class=\"fn-input-button fn-W120\" data-role=\"submit\" value=\"上传文件并计算\"/>                </div>            </td>        </tr>    </table></div>"); compile.source="<div class=\"fn-PL20 fn-PR20 fn-PB20 fn-PT20 fn-color-666\">    <input type=\"hidden\" name=\"securityCaseId\" value=\"{{securityCaseId}}\" />    <div class=\"global-tab fn-BBS-ebebeb\"><i></i>请选择文件</div>    <table width=\"100%\" class=\"fn-table fn-table-input fn-table-input-sm fn-MT20\">        <tr>            <td align=\"right\" class=\"fn-LH25\" width=\"100\"><span class=\"global-require fn-VA1D\">*</span> 导入模板：</td>            <td>                <div class=\"fn-MR30 kuma-form-item\">                    <input type=\"button\" class=\"fn-btn fn-btn-upload fn-btn-sm fn-W80  JS-prosecute-required\" value=\"选择文件\" data-widget=\"upload\" data-style=\'{\"display\": \"inline-block\"}\' data-input-name=\"securityFileId\" data-size=\"1\" data-rule=\"(\.xls|\.xlsx)$\" data-required=\"true\" data-errormessage=\"请选择文件\"/>                    <input type=\"hidden\" name=\"securityFileId\" data-skip-hidden=\"false\" data-widget=\"validator\" data-required=\"true\" data-errormessage=\"请上传文件。\" />                </div>            </td>        </tr>        <tr>            <td> </td>            <td>请下载<a href=\"javascript:;\" class=\"fn-color-047dc6\" target=\"_bank\">《信用卡数据模板》</a>模板，按照模板填写数据再上传</td>        </tr>        <tr>            <td> </td>            <td>                <div class=\"fn-MT20\">                    <input type=\"button\"class=\"fn-input-button fn-W120\" data-role=\"submit\" value=\"上传文件并计算\"/>                </div>            </td>        </tr>    </table></div>"; return compile; });