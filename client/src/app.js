require('./stylesheets/animate.css');
require('./stylesheets/main.sass');
require('./stylesheets/style.css');
require('./stylesheets/skeleton.css');
var getFlightData = require('./models/flight_api').getFlightData;
var getOutboundFlights = require('./models/flight_api').getOutboundFlights;
var getFlightPrice = require('./models/flight_api').getFlightPrice;

window.onload = function() {
  console.log("I'm loading");

<<<<<<< HEAD
  var searchField = document.querySelector('#search-box');
  var searchForm = document.querySelector('#search-form');
  var origin = document.querySelector('#search-box-origin');
  var destination = document.querySelector('#search-box-destination');
  var departureDate = document.querySelector('#departure-date');
  var returnDate = document.querySelector('#return-date');

  var departureDateLI = document.getElementById('departure-date');
  var returnDateLI = document.getElementById('return-date');
  var pricePerAdult = document.getElementById('price-per-adult');
  var origin = document.getElementById('origin');
  var arrival = document.getElementById('arrival');


  var detailsButton = document.querySelector('#details-button');
  detailsButton.onclick = function() {
    console.log("Oh, I was clicked.");
    console.log(getFlightData(origin.value, destination.value, departureDate.value));
    // var apiResult =
    // var outboundFlights = getOutboundFlights(apiResult, 0);
    // departureDateLI.innerHTML = outboundFlights.departs_at;
    // pricePerAdult.innerHTML = getFlightPrice(apiResult, 0);
    // origin.innerHTML = getOutboundFlights(apiResult, 0).origin.airport;
    // arrival.innerHTML = getOutboundFlights(apiResult, 1).destination.airport;
  }

=======
  // var detailsButtown = document.getElementById('detailsButton');
  // detailsButton.onclick = function() {
  //   console.log("Oh, I was clicked.");
  //   console.log(getFlightData(origin.value, destination.value, departureDate.value));
  // }

  $(document).ready(function() {
    getFlightData('SYD', 'LON', '2016-07-28');
  })

>>>>>>> a3ff39e01f87011603cd4473c1ab38f986b55bf4
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
