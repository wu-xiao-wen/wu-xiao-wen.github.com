define(function(require,exports,module){
	"use strict"
	//引用
	var React = require('react'),
		ConnectActions = require('myReact/controller/connectActions'),
		ListenToActions = require('myReact/controller/listenToActions')

		
	var Pushbutton = React.createClass({

		getInitialState:function(){
			return {}
		},
		clickButton:function(e){
			e.preventDefault();
            e.stopPropagation();
            
             switch(this.props.btnName){
             	case "添加":
             	ConnectActions.add();
             	break;
             	case "修改":
             	this.props.callbackParent(this.props.data);
             	break;
             	case "删除":
             	ListenToActions.delete(this.props.data);
             	break;
             	default:
             	this.props.callbackParent();
             	
             }
		},
		render:function(){
			return(
				<button className = {this.props.className} onClick ={this.clickButton}>{this.props.btnName}</button>
			)
		}

	})
    module.exports = Pushbutton;
})