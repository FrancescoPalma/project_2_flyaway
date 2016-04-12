require('./stylesheets/animate.css');
require('./stylesheets/main.sass');
require('./stylesheets/style.css');
require('./stylesheets/skeleton.css');

var changeBg = require('./helpers/slider.js');
var getFlickrImagesByTag = require('./models/flickr_api').getFlickrImagesByTag;
var getFlightData = require('./models/flight_api').getFlightData;
var getOutboundFlights = require('./models/flight_api').getOutboundFlights;
var getFlightPrice = require('./models/flight_api').getFlightPrice;
var moment = require('moment');

$(document).ready(function() {
  function showElement(id) { $(id).show(); }
  function hidePage() { $('.page').hide(); }
  getFlightData('LON', 'SYD', '2016-07-20');
  $('#slider').hide();
  hidePage();
  showElement('#home');

  $('#get-started').click(function(e) {
    e.preventDefault();
    hidePage();
    showElement('#where-to-go');
  })

  $('#destination-button').click(function(e) {
    $('#video').hide();
    getFlickrImagesByTag($('#destination-input').val(), changeBg);
    $('#slider').show();
    hidePage();
    showElement('#trip-details');
  });
})
