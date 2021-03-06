"use strict";
/**
 * 业务：选择诉讼类型[lawsuit/start/chooseType]
 * 2015,05,19 邵红亮
 */
define(function(require, exports, module) {

	//默认依赖一个全局都引用的业务模块
	require('bus/global/main');

	//依赖
	var $ = require('$');

	//变量
	var SBODY = $('body');

	//函数:取消选择
	function checkedFalse(){
		$('.JS-trigger-hover').removeClass('trigger-chosed');
		$('[type="radio"]').prop('checked', false);
	}

	//事件
	SBODY.on('mouseenter', '.JS-trigger-hover', function(){
		var node = $(this);
		node.addClass('tigger-show');
	});
	SBODY.on('mouseleave', '.JS-trigger-hover', function(){
		var node = $(this);
		node.removeClass('tigger-show');
	});
	SBODY.on('click', '.JS-trigger-chose', function(){
		var node = $(this),
			target = node.closest('.JS-trigger-hover');
		checkedFalse();
		target.addClass('trigger-chosed');
		target.find('[type="radio"]').prop('checked', true);
	});
	SBODY.on('click', '.JS-trigger-chosed', checkedFalse);

});