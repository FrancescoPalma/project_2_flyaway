var processFlightData = require('./models/flight_api');

window.onload = function() {
  var data = processFlightData(0, [0, 1]);
  console.log(data);
  console.log("hello");
}

