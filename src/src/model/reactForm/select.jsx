"use strict";
/**
 * 组件类
 */
define(function(require, exports, module) {

	// 依赖
	var Common = require('./common'),
		limit = require('limit'),
		React = require('react');

	// 类	
	var InputText = React.createClass({
		mixins: [Common],
		render: function(){
			return (
				<select 
					style={ {width:this.props.width} }
					name={this.props.name} 
					className={"fn-select " + this.props.className} 
					value={this.state[this.props.name]} 
					onChange={this.changeHandler}>
						{this.props.empty && <option value="">请选择</option>}
					{limit.map(this.props.options, function(val){
						return <option key={val.value} value={val.value}>{val.key}</option>;
					})}
				</select>
			);
		}
	});

	// 接口
	module.exports = InputText;

});