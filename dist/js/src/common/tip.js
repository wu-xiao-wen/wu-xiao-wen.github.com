"use strict";define("src/common/tip",["common/jquery","tip"],function(require,exports){var $=require("common/jquery"),nwTip=require("tip"),Tip=nwTip.extend({Statics:{use:function(query,config){var me=this,list=[];return $(query||".JS-need-tip").each(function(){var node=$(this),content=node.data("content")||config.content;if(content){var the=new me($.extend({trigger:node,content:node.data("content")},config));list.push(the),node.data("myWidget",the)}}),list},remove:function(query){$(query||".JS-need-tip").each(function(){$(this).data("myWidget").destroy()})}}});return Tip});
"use strict";define("common/jquery",[],function(require,exports){return jQuery});