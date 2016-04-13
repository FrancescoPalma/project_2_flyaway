require('./stylesheets/animate.css');
require('./stylesheets/main.sass');
require('./stylesheets/style.css');
require('./stylesheets/skeleton.css');
require('./helpers/autocomplete_origin.js');
require('./helpers/autocomplete_destination.js');
require('./helpers/datepickk.js');

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
    showElement('#where-to-go');
  })

  $('#where-to-go-button').click(function(e) {
    $('#video').hide();
    getFlickrImagesByTag($('#where-to-go-input').val(), changeBg);
    $('#slider').show();
    hidePage();
    showElement('#flights-search-form');
  });

});
