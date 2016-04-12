function getFlightData(origin, destination, departureDate) {

  var url = "https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=bX8HkNGmgrYd81Z9ne6OyMp4WhAiYoyS&origin=" + origin + "&destination=" + destination + "&departure_date=" + departureDate + "&currency=GBP&number_of_results=6";

  var xhr = new XMLHttpRequest();
  console.log(url);

  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      var jsonString = xhr.responseText;
      var data = JSON.parse(jsonString);
      console.log(data);
    }
  }
  xhr.open("GET", url);
  console.log("Sent get request");
  xhr.send(null);
}

function breakBigObject(data) {
  var array = [];
  for(var object of data.results){
    array.push(object);
  }
  return array;
}

function getFlightDetails(data, index) {
  return data.results[index].itineraries[0].outbound.flights
}

function getTotalFlightPrice(data, index) {
  return data.results[index].fare.total_price
}

function getOriginIata(data, index) {
  return data.results[index].itineraries[0].outbound.flights[0].origin.airport
}

function getDestinationIata(data, index) {
  if (data.results[index].itineraries[0].outbound.flights.length === 1) {
    return data.results[index].itineraries[0].outbound.flights[0].destination.airport;
  } else {
    var size = data.results[index].itineraries[0].outbound.flights.length;
    return data.results[index].itineraries[0].outbound.flights[size - 1].destination.airport;
  }
}


module.exports = {
  getFlightData: getFlightData,
  breakBigObject: breakBigObject,
  getFlightDetails: getFlightDetails,
  getTotalFlightPrice: getTotalFlightPrice,
  getOriginIata: getOriginIata,
  getDestinationIata: getDestinationIata
}