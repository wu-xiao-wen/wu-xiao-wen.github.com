"use strict";define("src/bus/court/divisionCase/divisionCase/main",["bus/global/main","common/jquery","common/handlerbars","model/ajax/main","common/validator","model/imgView/main","model/cascadeSelect/main","common/scroller"],function(require,exports,module){function displayResult(){var result={};result.deptName=$("input[name='deptName']").val(),result.trialName=$("input[name='trialName']").val(),result.clerkName=$("input[name='clerkName']").val(),result.remark=$("[name='remark']").val();var templat=handlerbars.compile($("#template").html());$(".content").html(templat(result)),$("#caseManage-form").remove()}require("bus/global/main");var $=require("common/jquery"),handlerbars=require("common/handlerbars"),Ajax=require("model/ajax/main"),Validator=require("common/validator"),ImgView=require("model/imgView/main"),CascadeSelect=require("model/cascadeSelect/main"),Scroller=require("common/scroller"),validatorExp=Validator.use("#caseManage-form");if($("#save").on("click",function(){validatorExp.execute(function(flag,err){flag||new Ajax({request:"../LassenCourtAssignRpc/saveLassenCourtAssign.json?securityCaseId="+encodeURIComponent($("input[name='securityCaseId']").val()),paramName:"lassenCourtAssignDo",parseForm:$("#caseManage-form")}).on("ajaxSuccess",function(rtv,msg,con){displayResult(rtv,msg,con)}).submit()})}),new ImgView,$("#load-more-details").on("click",function(){$("#more-details").removeClass("fn-hide"),Scroller.use(".JS-need-scroller"),$("#load-more-details").css("display","none")}),$(".JS-trigger-more-information").on("click",function(e){$("#court-more-information").removeClass("fn-hide"),Scroller.use(".JS-need-scroller"),$(e.target).parent().remove()}),$('[name="trialId"]').on("change",function(e){var trialCourt=$(e.target);$('[name="trialName"]').val(trialCourt.find("option:selected").text())}),$('[name="clerkId"]').on("change",function(e){var clerk=$(e.target);$('[name="clerkName"]').val(clerk.find("option:selected").text())}),$('[name="deptId"]').on("change",function(e){var dept=$(e.target);$('[name="deptName"]').val(dept.find("option:selected").text()),$('[name="trialName"]').val(""),$('[name="clerkName"]').val("")}),$(".cascadeSelect").size()>0){var deptUserJson=$('[name="deptUserJson"]').val();new CascadeSelect({deptUserJson:eval(deptUserJson),needInit:!0})}});
"use strict";define("common/jquery",[],function(require,exports){return jQuery});
define("common/handlerbars",[],function(require,exports,module){});