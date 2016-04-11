/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./stylesheets/animate.css\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	__webpack_require__(6);
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./stylesheets/style.css\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./stylesheets/skeleton.css\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	window.onload = function() {
	  getStartedButton = document.getElementById('getStarted');
	  getStartedButton.onclick = function() {
	    var overlay = document.getElementById('overlay');
	    overlay.className += 'animated fadeOutLeft';
	    var destinationForm = document.getElementById('destinationForm');
	    setTimeout(function(){
	      destinationForm.style = 'position: absolute; z-index: 10;';
	      destinationForm.className = 'animated fadeInRight';
	    }, 3000);
	  }
	}


/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports) {



/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map