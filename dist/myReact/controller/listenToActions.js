"use strict";define("js/bus/myReact/controller/listenToActions",["common/react","common/reflux"],function(require,exports,module){var Reflux=(require("common/react"),require("common/reflux")),ListenToActions=Reflux.createActions(["dataChange","getInitData","delete"]);module.exports=ListenToActions});