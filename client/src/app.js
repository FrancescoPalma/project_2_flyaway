require('./stylesheets/animate.css');
require('./stylesheets/main.sass');
require('./stylesheets/style.css');
require('./stylesheets/skeleton.css');
require('./helpers/autocomplete_origin.js');
require('./helpers/autocomplete_destination.js');
require('./helpers/datepickk.js');

var populateFlightsView = require('./models/populateViews').populateFlightsView;
var changeBg = require('./helpers/slider.js');
var getFlickrImagesByTag = require('./models/flickr_api').getFlickrImagesByTag;
var getFlightData = require('./models/flight_api').getFlightData;

$(document).ready(function() {
  function showElement(id) { $(id).show(); }
  function hidePage() { $('.page').hide(); }
  $('#slider').hide();
  hidePage();
  showElement('#home');
  console.log(getFlightData('SYD', 'LON', '2016-05-06'));

  var origin = document.getElementById('origin');
  var destination = document.getElementById('destination');

  $('#get-started').click(function(e) {
    e.preventDefault();
    hidePage();
    showElement('#where-to-go');
  })

  $('#where-to-go-button').click(function(e) {
    e.preventDefault();
    $('#video').hide();
    getFlickrImagesByTag($('#where-to-go-input').val(), changeBg);
    $('#slider').show();
    hidePage();
    showElement('#flights-search-form');
  });

  $('#show-flight-results-button').click(function(e) {
    e.preventDefault();
    console.log('2016-04-13');
    console.log(departureDate);
    console.log(departureDate == '2016-04-13');
    // hidePage();
    getFlightData(origin.value.substring(0, 3), destination.value.substring(0, 3), departureDate, populateFlightsView);
    showElement('#flights-result-container');
  })

});
