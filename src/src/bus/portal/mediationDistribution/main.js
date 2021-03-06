"use strict";
/**
 * 业务：我的诉讼[suit/myCase]
 * 
 
 */
define(function(require, exports, module) {

	//默认依赖一个全局都引用的业务模块
	require('bus/global/main');

	//依赖
	var $ = require('$'),
		delegate = require('common/delegate'),
		util = require('common/util'),
		FilterConditions = require('model/filterConditions/main'),
		Modal = require('model/modal/main'), //提示框
		CountDown = require('model/countDown/main'),
		Dialog = require('common/dialog'),
		domUtil = require('common/domUtil'),
		Ajax = require('model/ajax/main'),
		SwitchFilterBtn = require('model/switchFilterBtn/main'),
		SearchList = require('model/searchList/main'),
		Handlerbars = require('common/handlerbars');

	var statusMap = require('common/statusMap');

    $.ajaxSetup({ cache: false });
    
	//组件：
	new FilterConditions({element: '#filter-conditions'}).on('change', function(){
		searchListExp[0].searchListReload();
	});
	
	//组件：查询
	var searchListExp = SearchList.use('.searchList', {
		map: function (data) {
			var i = 0;
			for (; i < data.length; i++) {
				if (data[i].status) {
					data[i].statusEx = statusMap[data[i].status];
				}				
			}

			return data;
		}
	});
	//过滤条件
	function doSearch(){
      searchListExp[0].searchListReload();
   }
   new SwitchFilterBtn({element: '#filterCondition'}).on('switchSuccess', function(){
        doSearch();
    });
	
	//倒计时
	$('.JS-target-count-down').each(function(){
		var node = $(this),
			endTime = node.data('endTime'),
			countDownExp = new CountDown({
				target: endTime
			}),
			intervalID;
		//定时器
		intervalID = setInterval(function(){
			var data = countDownExp.use();
			//不存在 干掉定时器
			if(!data){
				return clearInterval(intervalID)
			}
			node.html(data.hour + ' 时 ' + data.minute + ' 分 ' + data.second + ' 秒 ');
		}, 1000);
	});


	//搜 索 按钮事件
	$("#search").on('click', function(){
		searchListExp[0].searchListReload();
	});

	//案件状态，更多和收起
	$('[data-action="toggleStatus"] span').on('click', function(e){
		var target =  $('[data-action="toggleStatus"]'); 

		if(target.find('.kuma-icon-triangle-down').size() > 0){
			$('.JS-tirgger-more').removeClass('fn-hide');
			target.find('a').text('收起');
			target.find('.kuma-icon-triangle-down').addClass('kuma-icon-triangle-up').removeClass("kuma-icon-triangle-down");
		}else{
			$('.JS-tirgger-more').addClass('fn-hide');
			target.find('a').text('更多');
			target.find('.kuma-icon-triangle-up').addClass('kuma-icon-triangle-down').removeClass("kuma-icon-triangle-up");
		}
	});
	
	//调解员编辑
	delegate.on('click', '[data-role="mediator"]', function(e){
		var param = $(e.target).data("param");
		new Ajax({
			request: '/hephaistos/mediatorDistributionRpc/queryAllCityInfo.json',
			mothed: 'ajax'
		}).on('ajaxSuccess', function(city){
			// 获取杭州的ID
			var cityId;
			$.each(city.data, function(){
				if(this.cityName === '杭州市'){
					cityId = this.securityId;
				};
			});
			new Ajax({
				request: "/hephaistos/mediatorDistributionRpc/MediatorListForDistribution.json",
	            param : $.extend({}, param, {cityId : cityId}),
	            paramName : 'filterMap',
	            mothed: 'ajax'
			}).on('ajaxSuccess', function(person){
				editMediator(e, person, city, param);
			}).submit();
		}).submit();
	});

	var mediatorList = Handlerbars.compile('#mediator-seed', true);

	function editMediator(e, person, city, param){
		var childParam = $(e.target).data("childParam");
        Dialog.showTemplate('#chose-mediator', $.extend(childParam, {city: city.data, person: person.data}), {
        	width:800, autoDestroy:true, autoShow:true, events: {
        		//下拉选择城市
        		'change [name="city"]' : function(e){
        			var me = this,
        				city = $(e.target).val();
					new Ajax({
						request: "/hephaistos/mediatorDistributionRpc/MediatorListForDistribution.json",
					    param : $.extend({}, param, {cityId : city}),
					    paramName : 'filterMap',
					    mothed: 'ajax'
					}).on('ajaxSuccess', function(person){
						me.$("#mediator-list").html(mediatorList({person: person.data}));
					}).submit();
        		},
        		//提交
        		'click .JS-trigger-submit': function(e){
        			var me = this,
        				mediatorId = this.$('[name="mediatorId"]:checked').val();
        			if(mediatorId){
            			new Ajax({
            				request: "/hephaistos/mediatorDistributionRpc/updateOrDistributionMediator.json",
            				param : $.extend({}, childParam, {mediatorId:mediatorId}),
            				paramName : 'filterMap'
            			}).on('ajaxSuccess', function(rtv, msg, con){
            				me.hide();
            				Modal.alert(1, msg, function(){
            					searchListExp[0].searchListAjax();
            				});
            			}).submit();
        			}else{
        				Modal.alert(0, '请选择调解员');
        			}
        		},
        		// 选中单选框
        		'click #mediator-list tr': function(e){
        			var tr = $(e.target).closest('tr');
        			tr.find('input[type="radio"]').prop('checked', true);
        		}
        		
        	}
    	});
	};

	// 诉前调解请求
	new Ajax({
		element: '#suit-content',
		autoDestroy: false,
		events: {
			// 结束诉前调解
			'click [data-role="mediationEnd"]': function(e){
				var me = this;
				// 去掉链接的默认操作
				e.preventDefault();
				// 设置RPC请求
				me.set('request', '/account/mySuitRpc/mediationEnd.json');
				// 设置请求参数
				me.set('param', $(e.target).data('param'));
				Modal.confirm('提示', '请确认是否提前结束调解，递交到法院立案审核，立案后还可以进行调解', function(){
					// 发送请求
					me.submit();
				});
			},
			// 延迟诉前调解期
			'click [data-role="mediationDelay"]': function(e){
				e.preventDefault();
				var me = this;
				me.set('request', '/account/mySuitRpc/mediationDelay.json');
				var param = $(e.target).data('param');
				var list = param.list = [];
				for(var i = 0; i < param.mediateDayDelayMax - ~~param.mediateDayDelay;){
					list[i] = ++i;
				};
				list.length === 1 && ( param.one = true );
				me.dia = Dialog.showTemplate('#chose-day', param, {
					width:240,
					events: {
						// 弹出层当中的确定
						'click [data-role="submit"]': function(){
							me.set('parseForm', this.element);
							me.submit();
						}
					}
				});
			}
		}
	}).on('ajaxSuccess', function(val, msg, request){
		var me = this;
		Modal.alert(1, msg, function(){
			// 当前页面刷新
			searchListExp[0].searchListAjax();
		});
		// 隐藏弹出层，如果有的话
		me.dia && me.dia.hide();
	});

});