"use strict";define("src/bus/hephaistos/disputeconfig/disputeparam/disputeconfig",["common/jquery","common/myWidget","","model/modal/main","common/handlerbars","model/ajax/main"],function(require,exports,module){function initUseTpl(data){var me=this;new UseTpl({request:me.get("requestDisputSave"),template:me.get("tpl"),data:data,paramName:me.get("paramName")}).on("ajaxSuccess",function(){me.trigger("ajaxSuccess")}).show()}var $=require("common/jquery"),MyWidget=require("common/myWidget"),UseTpl=require(""),Ajax=(require("model/modal/main"),require("common/handlerbars"),require("model/ajax/main")),Disputeconfig=MyWidget.extend({className:"Disputeconfig",attrs:{},events:{'click [data-role="edit"]':function(e){this.disputeEdit($(e.target).data("param"))}},setup:function(){var me=this;me.triggerNode&&me.delegateEvents(me.triggerNode,"click",function(){initUseTpl.call(me)})},disputeEdit:function(param){var me=this;return new Ajax({request:me.get("requestDisputGet"),param:param}).on("ajaxSuccess",function(val,msg){initUseTpl.call(me,val)}).submit(),me}});return Disputeconfig});
"use strict";define("common/jquery",[],function(require,exports){return jQuery});
define("common/handlerbars",[],function(require,exports,module){});