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

	__webpack_require__(1);
	__webpack_require__(5);
	__webpack_require__(7);
	__webpack_require__(9);
	window.onload = function() {
	  var searchField = document.getElementById('searchBox');
	  var searchForm = document.getElementById('searchForm');
	  console.log( searchField );
	
	  searchForm.onsubmit = function(event) {
	    console.log(searchForm);
	    event.preventDefault();
	    console.log(document.querySelector('.searchBoxdp').value);
	    console.log(document.querySelector('.searchBoxds').value);
	    console.log(document.querySelector('.numpeople').value);
	    console.log(document.querySelector('.first-date').value);
	    console.log(document.querySelector('.second-date').value);
	  }
	
	
	  var getStartedButton = document.getElementById('getStarted');
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
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 6 */,
/* 7 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 8 */,
/* 9 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map