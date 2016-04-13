require('./stylesheets/animate.css');
require('./stylesheets/main.sass');
require('./stylesheets/style.css');
require('./stylesheets/skeleton.css');

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
    getFlightData('SYD', 'NYC', '2016-07-04', populateFlightsView);
    showElement('#flight-results');
  })

  $('#destination-button').click(function(e) {
    $('#video').hide();
    getFlickrImagesByTag($('#destination-input').val(), changeBg);
    $('#slider').show();
    hidePage();
    showElement('#trip-details');
  });

  $('#show-flight-details-button').click(function(e) {
    hidePage();
    showElement('#flight-results');
  })
});
