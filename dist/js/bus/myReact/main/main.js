"use strict";define("js/bus/myReact/main/main",["react","reactDOM","bus/myReact/jsx/reactContainer"],function(require,exports,module){var React=require("react"),ReactDOM=require("reactDOM"),Container=require("bus/myReact/jsx/reactContainer");ReactDOM.render(React.createElement(Container,{sourceData:"bus/myReact/data.json"}),document.getElementById("test"))});