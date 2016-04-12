var getFlightData = require('./flight_api').getFlightData;
var getFlightDetails = require('./flight_api').getFlightDetails;
var getTotalFlightPrice = require('./flight_api').getTotalFlightPrice;

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
  var departureSearchResults = getFlightData(origin, destination, departureDate);
  var returnSearchResults = getFlightData(destination, origin, returnDate);
  var flightDetails = getFlightDetails;

  //are there stopovers?
  if (departureSearchResults.results[0].itineraries.length > 1) {
    stopoversOnDeparture = true;
  }

  if (returnSearchResults.results[0].itineraries.length > 1) {
    stopoversOnReturn = true;
  }

  // originCityName.innerHTML = IATAAPI reverse lookup
  // destinationCityName.innerHTML = IATAAPI reverse lookup
  onewayOriginIATA.innerHTML = getOriginIata(departureSearchResults, index);
  onewayDestinationIATA.innerHTML = getDestinationIata(departureSearchResults, index);
  returnOriginIATA.innerHTML = getOriginIata(departureSearchResults, index);
  returnDestinationIATA.innerHTML = getDestinationIata(departureSearchResults, index);
  totalPrice.innerHTML = getTotalFlightPrice(departureSearchResults, index) + getTotalFlightPrice(returnSearchResults, index);
  onewayFlightDuration.innerHTML =
  returnFlightDuration.innerHTML =
  onewayFlightPrice.innerHTML =
  returnFlightPrice.innerHTML =
  onewayNumberStopovers.innerHTML =
  returnNumberStopovers.innerHTML =

}

// for each result
// grab details
// print card with details