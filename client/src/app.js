require('./stylesheets/animate.css');
require('./stylesheets/main.sass');
require('./stylesheets/style.css');
require('./stylesheets/skeleton.css');
require('./helpers/autocomplete_origin.js');
require('./helpers/autocomplete_destination.js');

var getFlightData = require('./models/flight_api').getFlightData;
var populateFlightsView = require('./models/populateViews').populateFlightsView;
var changeBg = require('./helpers/slider.js');
var getFlickrImagesByTag = require('./models/flickr_api').getFlickrImagesByTag;
var getFlightData = require('./models/flight_api').getFlightData;
var getOutboundFlights = require('./models/flight_api').getOutboundFlights;
var getFlightPrice = require('./models/flight_api').getFlightPrice;

$(document).ready(function() {
  function showElement(id) { $(id).show(); }
  function hidePage() { $('.page').hide(); }
  $('#slider').hide();
  hidePage();
  showElement('#home');

  $('#get-started').click(function(e) {
    e.preventDefault();
    hidePage();
    getFlightData('EDI', 'PAR', '2016-07-04', populateFlightsView);
    showElement('#flight-results');
  })

  var datepicker = new Datepickk();
  console.log(datepicker);

  var datePickerButton = document.querySelector('.date-picker-btn');
  datePickerButton.onclick = function(e) {
    e.preventDefault();
    datepicker.show();

    datepicker.onSelect = function() {
      datepicker.range = true;
      var getFirstDate = this.toLocaleDateString();
      var formatDate = getFirstDate.split('/');
      var day = formatDate[1];
      var month = formatDate[0];
      var year = formatDate[2];
      var formattedDate = year + "-" + month + "-" + day;

      var displayFirstDate = document.getElementById('first-date');
      displayFirstDate.innerHTML = formattedDate;

      datepicker.onSelect = function() {
        var getSecondDate = this.toLocaleDateString();
        var formatDate = getSecondDate.split('/');
        var day = formatDate[1];
        var month = formatDate[0];
        var year = formatDate[2];
        var formattedDate = year + "-" + month + "-" + day;
        var displayDate = document.getElementById('second-date');
        displayDate.innerHTML = formattedDate;
      }
    }
  }

  $('#destination-button').click(function(e) {
    $('#video').hide();
    getFlickrImagesByTag($('#destination-input').val(), changeBg);
    $('#slider').show();
    hidePage();
    showElement('#trip-details');
  });

  var departingFromBox = document.getElementById('search-box-origin');
  var goingToBox = document.getElementById('search-box-destination');

  goingToBox.onlick = function(e) {
    e.preventDefault();
    console.log("hello form ric");
  }

  // $('#show-flight-details-button').click(function(e) {
  //   hidePage();
  //   showElement('#flight-results');
  // })
});
