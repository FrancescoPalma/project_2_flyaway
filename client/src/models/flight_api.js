var pick = require('lodash/pick');
function getFlightData(origin, destination, departureDate) {
  console.log("getFlights called");
  var url = "https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=bX8HkNGmgrYd81Z9ne6OyMp4WhAiYoyS&origin=" + origin + "&destination=" + destination + "&departure_date=" + departureDate + "&currency=GBP&number_of_results=2";
  // 2016-06-27

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      var jsonString = xhr.responseText;
      var data = JSON.parse(jsonString);
      console.log("Data is ready.");
      console.log(data);
    }
  }
  xhr.open("GET", url);
  console.log("I'm calling the FlightsAPI");
  xhr.send(null);
}

function breakBigObject(data) {
  var array = [];
  for(var object of data.results){
    array.push(object);
  }
  return array;
}

function getOutboundFlights(data, index) {
  return data.results[index].itineraries[0].outbound.flights
}

function getFlightPrice(data, index) {
  return data.results[index].fare.total_price
}

module.exports = {
  getFlightData: getFlightData,
  breakBigObject: breakBigObject,
  getOutboundFlights: getOutboundFlights,
  getFlightPrice: getFlightPrice
}

// return flights.results[flightPackageNum].itineraries[0].outbound.flights[flight].departs_at