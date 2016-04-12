require('./stylesheets/animate.css');
require('./stylesheets/main.sass');
require('./stylesheets/style.css');
require('./stylesheets/skeleton.css');
var getFlightData = require('./models/flight_api').getFlightData;
var getOutboundFlights = require('./models/flight_api').getOutboundFlights;
var getFlightPrice = require('./models/flight_api').getFlightPrice;

window.onload = function() {
  console.log("Started the app.js. Calling the flights api");
  console.log(getFlightData('SYD', 'LON', '2016-07-28'));
}
