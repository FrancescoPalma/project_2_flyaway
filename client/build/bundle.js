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
	var getFlightData = __webpack_require__(11).getFlightData;
	
	window.onload = function() {
	  console.log("I'm loading");
	  var searchField = document.getElementById('searchBox');
	  var searchForm = document.getElementById('searchForm');
	  var origin = document.querySelector('.searchBoxdp');
	  var destination = document.querySelector('.searchBoxds');
	  // console.log(document.querySelector('.numpeople').value);
	  var departureDate = document.querySelector('.first-date');
	  var returnDate = document.querySelector('.second-date');
	
	  // var detailsButtown = document.getElementById('detailsButton');
	  // detailsButton.onclick = function() {
	  //   console.log("Oh, I was clicked.");
	  //   console.log(getFlightData(origin.value, destination.value, departureDate.value));
	  // }
	
	  $(document).ready(function() {
	    getFlightData('SYD', 'LON', '2016-07-28');
	  })
	
	  // var getStartedButton = document.getElementById('getStarted');
	  // getStartedButton.onclick = function() {
	  //   var overlay = document.getElementById('overlay');
	  //   overlay.className += 'animated fadeOutLeft';
	  //   var destinationForm = document.getElementById('destinationForm');
	  //   setTimeout(function(){
	  //     destinationForm.style = 'position: absolute; z-index: 10;';
	  //     destinationForm.className = 'animated fadeInRight';
	  //   }, 3000);
	  // }
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

/***/ },
/* 10 */,
/* 11 */
/***/ function(module, exports) {

	function getFlightData(origin, destination, departureDate) {
	  console.log("getFlights called");
	  var url = "https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=bX8HkNGmgrYd81Z9ne6OyMp4WhAiYoyS&origin=" + origin + "&destination=" + destination + "&departure_date=" + departureDate + "&currency=GBP&number_of_results=5";
	  // 2016-06-25
	  var xhr = new XMLHttpRequest();
	  xhr.onreadystatechange = function() {
	    if (xhr.readyState == XMLHttpRequest.DONE) {
	      var jsonString = xhr.responseText;
	      var data = JSON.parse(jsonString);
	      console.log("Data is ready.");
	      console.log(data);
	    }
	  }
	  xhr.open("GET", url);
	  console.log("I'm calling the FlightsAPI");
	  xhr.send(null);
	}
	
	function breakBigObject(data) {
	  var array = [];
	  for(var object of data.results){
	    array.push(object);
	  }
	  return array;
	}
	
	function getOutboundFlights(data, index) {
	  return data.results[index].itineraries[0].outbound.flights
	}
	
	function getFlightPrice(data, index) {
	  return data.results[index].fare.total_price
	}
	
	module.exports = {
	  getFlightData: getFlightData,
	  breakBigObject: breakBigObject,
	  getOutboundFlights: getOutboundFlights,
	  getFlightPrice: getFlightPrice
	}

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map