require('./stylesheets/animate.css');
require('./stylesheets/main.sass');
require('./stylesheets/style.css');
require('./stylesheets/skeleton.css');
var getFlightData = require('./models/flight_api').getFlightData;
var getOutboundFlights = require('./models/flight_api').getOutboundFlights;
var getFlightPrice = require('./models/flight_api').getFlightPrice;

window.onload = function() {
  console.log("I'm loading");

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

  var datepicker = new Datepickk();
  console.log(datepicker);

  var datePickerButton = document.querySelector('.date-picker-btn');
  datePickerButton.onclick = function(e) {
    e.preventDefault();
    datepicker.show();

    datepicker.onSelect = function() {
      var getFirstDate = this.toLocaleDateString();
      console.log(getFirstDate);
      var formatDate = getFirstDate.split('/');
      var day = formatDate[1];
      var month = formatDate[0];
      var year = formatDate[2];
      var formattedDate = year + "-" + month + "-" + day;

      var displayFirstDate = document.getElementById('first-date'); 
      displayFirstDate.innerText = "From: " + formattedDate; 
      
      datepicker.onSelect = function() {
        var getSecondDate = this.toLocaleDateString();
        var formatDate = getSecondDate.split('/');
        var day = formatDate[1];
        var month = formatDate[0];
        var year = formatDate[2];
        var formattedDate = year + "-" + month + "-" + day;
        var displayDate = document.getElementById('second-date');
        displayDate.innerText = "Until: " + formattedDate;
      }
    }
  }

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
