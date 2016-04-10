var pick = require('lodash/pick');
function getFlightData() {
  console.log("getFlights called");
  var url = 'https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=bX8HkNGmgrYd81Z9ne6OyMp4WhAiYoyS&origin=LON&destination=SYD&departure_date=2016-06-25&currency=GBP&number_of_results=5';

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      var jsonString = xhr.responseText;
      var data = JSON.parse(jsonString);
      console.log("Data is ready to be processed. Sending it now...");
      processFlightData(data)
    }
  }
  xhr.open("GET", url);
  console.log("I'm calling the FlightsAPI");
  xhr.send(null);
}

function processFlightData() {
  console.log("Hello from processFlightData");
  var flights = getFlightData();
  console.log(flights);
  function getValues(flightPackageNum, flights) {
    for(var flight in flights){
      console.log("im inside the for loop");
      return flights.results[flightPackageNum].itineraries[0].outbound.flights[flight].departs_at
    }
  }
}

module.exports = processFlightData;