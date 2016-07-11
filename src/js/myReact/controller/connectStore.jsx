define(function(require,exports,module){
	"use strict"
	//依赖
	var React = require('react'),
		Reflux = require('reflux'),
		ConnectActions = require('./connectActions'),
		ConnectStore = Reflux.createStore({
			listenables:[ConnectActions],
			isShow:false,
			onAdd:function(){
				var me =this;
				me.trigger({
					boxStyle:me.isShow?false:true
				},function(){
					me.isShow = !isShow;
				})
			},
			onGetTarget:function(e){
				console.log($(e.target).attr('data-reactid'))
			}
		})

 module.exports = ConnectStore;
})