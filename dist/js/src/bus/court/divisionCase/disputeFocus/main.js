define("src/bus/court/divisionCase/disputeFocus/main",["bus/global/main","common/jquery","common/delegate","model/ajax/main","model/modal/main"],function(require,exports,module){require("bus/global/main");var $=require("common/jquery"),delegate=require("common/delegate"),Ajax=require("model/ajax/main"),Modal=require("model/modal/main");delegate.on("click",".JS-trigger-click-submit",function(){return $("input[name='focus1']").val()||$("input[name='focus2']").val()||$("input[name='focus3']").val()||$("input[name='focus4']").val()||$("input[name='focus5']").val()?void new Ajax({request:"/court/courtFocusRpc/submitCourtFocus.json?securityCaseId="+encodeURIComponent($("input[name='securityCaseId']").val()),paramName:"courtFocusDo",parseForm:"#disputeFocus-form"}).on("ajaxSuccess",function(rtv,msg,con){Modal.alert(1,msg)}).submit():void Modal.alert(0,"请输入至少一个问题")})});
"use strict";define("common/jquery",[],function(require,exports){return jQuery});