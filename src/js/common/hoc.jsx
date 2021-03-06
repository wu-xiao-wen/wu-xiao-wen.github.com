"use strict";
define(function(require, exports) {

	// 依赖
	const React = require('react');
	const Reflux = require('reflux');
	const limit = require('common/limit2.0');

	return (Wrapper, Controller) => {
		Controller = Reflux.connect(Controller.Store);
		let state = Controller.getInitialState();
		delete Controller.getInitialState;
		class WrapperComponent extends React.Component {
			constructor(...args){
				super(...args);
				// getInitialState
				this.state = limit.assign(state, this.props);
			}
		    render() {
		      return <Wrapper {...this.state} />;
		    }
		};
		limit.extend(WrapperComponent.prototype, Controller);
		return WrapperComponent;
	};

});