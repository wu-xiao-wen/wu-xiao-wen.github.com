"use strict";define("src/bus/suit/simCase/common/main",["common/jquery","model/placeHolder/main","common/delegate"],function(require,exports,module){function maxlength(){var self=$(this),length=self.attr("maxlength");setTimeout(function(){var val=self.val();val.length>length&&self.val(val.slice(0,length)),self.trigger("realTime")},0)}var $=require("common/jquery"),PlaceHolder=require("model/placeHolder/main"),delegate=require("common/delegate"),documentMode=document.documentMode;!documentMode||8!==documentMode&&9!==documentMode||(delegate.on("keydown","[maxlength]",maxlength),delegate.on("paste","[maxlength]",maxlength),$("[placeholder]").each(function(){new PlaceHolder({element:this})}))});
"use strict";define("common/jquery",[],function(require,exports){return jQuery});