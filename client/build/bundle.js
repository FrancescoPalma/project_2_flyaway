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

	var getAccomodation = __webpack_require__(1).getAccomodation;
	window.onload = function() {
	  console.log("Hello from app.js");
	  console.log("calling the accomodation API");
	  getAccomodation();
	}


/***/ },
/* 1 */
/***/ function(module, exports) {

	
	function getAccomodation() {
	  console.log("getFlights called");
	  var url = "https://zilyo.p.mashape.com/search?isinstantbook=true&nelatitude=22.37&nelongitude=-154.48000000000002&provider=airbnb%2Chousetrip&swlatitude=18.55&swlongitude=-160.52999999999997";
	
	  var xhr = new XMLHttpRequest();
	  xhr.onreadystatechange = function() {
	    if (xhr.readyState == XMLHttpRequest.DONE) {
	      var jsonString = xhr.responseText;
	      var data = JSON.parse(jsonString);
	      console.log(data.result);
	    }
	  }
	  xhr.open("GET", url);
	  xhr.setRequestHeader("X-Mashape-Key", "qM9ApJg7jWmshX5ZkYcjawEa1uBbp1YQTqujsnSsZplpTWDp0F");
	  xhr.setRequestHeader("Accept", "application/json");
	  xhr.send(null);
	}
	
	module.exports = {
	  getAccomodation: getAccomodation
	}
	  // unirest.get("https://zilyo.p.mashape.com/search?isinstantbook=true&nelatitude=22.37&nelongitude=-154.48000000000002&provider=airbnb%2Chousetrip&swlatitude=18.55&swlongitude=-160.52999999999997")
	  // .header("X-Mashape-Key", "qM9ApJg7jWmshX5ZkYcjawEa1uBbp1YQTqujsnSsZplpTWDp0F")
	  // .header("Accept", "application/json")
	  // .end(function (result) {
	  //   console.log(result.status, result.headers, result.body);
	  // });

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map