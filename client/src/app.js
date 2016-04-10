var getFlightData = require('./models/flight_api').getFlightData;

window.onload = function() {
  console.log(getFlightData());
  console.log("hello");
}

