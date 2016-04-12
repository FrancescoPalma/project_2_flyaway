var getFlightData = require('./flight_api').getFlightData;
var getFlightDetails = require('./flight_api').getFlightDetails;
var getTotalFlightPrice = require('./flight_api').getTotalFlightPrice;
var getOneWayFlightDuration = require('./flight_api').getOneWayFlightDuration;
var getNumberOfStopovers = require('./flight_api').getNumberOfStopovers;

var originCityName = $("origin-cityname");
var destinationCityName = $("destination-cityname");
var onewayOriginIATA = $("oneway-origin-iata");
var onewayDestinationIATA = $("oneway-destination-iata");
var returnOriginIATA$ = $("return-origin-iata");
var returnDestinationIATA$ = $("return-destination-iata");
var totalPrice = $("total-price");
var onewayFlightDuration = $("oneway-flight-duration");
var returnFlightDuration = $("return-flight-duration");
var onewayFlightPrice = $("oneway-flight-price");
var returnFlightPrice = $("return-flight-price");
var onewayNumberStopovers = $("oneway-number-stovers");
var returnNumberStopovers = $("return-number-stovers");

function populateFlightsView(origin, destination, departureDate, returnDate) {
  var stopoversOnDeparture = false;
  var stopoversOnReturn = false;
  // var departureSearchResults = getFlightData(origin, destination, departureDate);
  // var returnSearchResults = getFlightData(destination, origin, returnDate);
  // var flightDetails = getFlightDetails;
  var flightResultsContainer = $('.flight-results-container');
  var card = document.createElement('section');
  card.className = 'temp-card';
  card.innerHTML = '<div id="origin-cityname"></div><div id="destination-cityname"></div><div id="oneway-origin-iata"></div><div id="oneway-destination-iata"></div><div id="return-origin-iata"></div><div id="return-destination-iata"></div><div id="total-price"></div><div id="oneway-flight-duration"></div><div id="return-flight-duration"></div><div id="oneway-flight-price"></div><div id="return-flight-price"></div><div id="oneway-number-stopovers"></div><div id="return-number-stopovers"></div>'

  flightResultsContainer.append(card);
  // document.body.appendChild(card);


  // originCityName.innerHTML = IATAAPI reverse lookup
  // destinationCityName.innerHTML = IATAAPI reverse lookup


}

function writeCardContents(data, index) {
  // onewayOriginIATA.innerHTML = getOriginIata(departureSearchResults, index);
  // onewayDestinationIATA.innerHTML = getDestinationIata(departureSearchResults, index);
  returnOriginIATA.innerHTML = getOriginIata(departureSearchResults, index);
  returnDestinationIATA.innerHTML = getDestinationIata(departureSearchResults, index);
  totalPrice.innerHTML = getTotalFlightPrice(departureSearchResults, index) + getTotalFlightPrice(returnSearchResults, index);
  onewayFlightDuration.innerHTML = getOneWayFlightDuration(data, index);
  returnFlightDuration.innerHTML = getOneWayFlightDuration(data, index);
  onewayFlightPrice.innerHTML = getOneWayFlightPrice(data, index);
  returnFlightPrice.innerHTML = getFlightPrice(data, index);
  onewayNumberStopovers.innerHTML = getNumberOfStopovers(data, index);
  returnNumberStopovers.innerHTML = getNumberOfStopovers(data, index);
}

module.exports = {
  populateFlightsView: populateFlightsView
}

// for each result
// grab details
// print card with details