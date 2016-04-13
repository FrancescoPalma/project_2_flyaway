var getFlightDetails = require('./flight_api').getFlightDetails;
var getTotalFlightPrice = require('./flight_api').getTotalFlightPrice;
var getOneWayFlightDuration = require('./flight_api').getOneWayFlightDuration;
var getNumberOfStopovers = require('./flight_api').getNumberOfStopovers;
var getOriginIata = require('./flight_api').getOriginIata;
var getDestinationIata = require('./flight_api').getDestinationIata;

var originCityName, destinationCityName, onewayOriginIATA, onewayDestinationIATA, returnOriginIATA, returnDestinationIATA, totalPrice, onewayFlightDuration, returnFlightDuration, onewayFlightPrice, returnFlightPrice, onewayNumberStopovers, returnNumberStopovers;

var divIds = ["origin-cityname", "destination-cityname", "oneway-origin-iata", "oneway-destination-iata", "return-origin-iata", "return-destination-iata", "total-price", "oneway-flight-duration", "return-flight-duration", "oneway-flight-price", "return-flight-price", "oneway-number-stopovers", "return-number-stopovers"];

function populateFlightsView(data) {
  console.log("PopulateFlightsView has been called");
  for(itinerary in data.results) {
    console.log("creating a card");
    createCard(itinerary);
    console.log("writing stuff to a card");
    writeCardContents(data, itinerary);
  }
}

function createCard(index) {
  var flightResultsContainer = document.querySelector('.flight-results-container');
  var card = document.createElement('section');
  card.className = 'temp-card';
  for(id of divIds) {
    card.innerHTML += (id + index);
  }
  flightResultsContainer.appendChild(card);
  getCardIds();
  console.log("card has been created")
}

function getCardIds(index) {
  originCityName = document.getElementById("origin-cityname" + index);
  destinationCityName = document.getElementById("destination-cityname" + index);
  onewayOriginIATA = document.getElementById("oneway-origin-iata" + index);
  onewayDestinationIATA = document.getElementById("oneway-destination-iata" + index);
  returnOriginIATA = document.getElementById("return-origin-iata" + index);
  returnDestinationIATA = document.getElementById("return-destination-iata" + index);
  totalPrice = document.getElementById("total-price" + index);
  onewayFlightDuration = document.getElementById("oneway-flight-duration" + index);
  returnFlightDuration = document.getElementById("return-flight-duration" + index);
  onewayFlightPrice = document.getElementById("oneway-flight-price" + index);
  returnFlightPrice = document.getElementById("return-flight-price" + index);
  onewayNumberStopovers = document.getElementById("oneway-number-stopovers" + index);
  returnNumberStopovers = document.getElementById("return-number-stopovers" + index);
}

function writeCardContents(data, index) {
  returnOriginIATA.innerHTML = getOriginIata(data, index);
  returnDestinationIATA.innerHTML = getDestinationIata(data, index);
  totalPrice.innerHTML = getTotalFlightPrice(data, index) + getTotalFlightPrice(data, index);
  onewayFlightDuration.innerHTML = getOneWayFlightDuration(data, index);
  returnFlightDuration.innerHTML = getOneWayFlightDuration(data, index);
  onewayFlightPrice.innerHTML = getTotalFlightPrice(data, index);
  returnFlightPrice.innerHTML = getTotalFlightPrice(data, index);
  onewayNumberStopovers.innerHTML = getNumberOfStopovers(data, index);
  returnNumberStopovers.innerHTML = getNumberOfStopovers(data, index);
}

module.exports = {
  populateFlightsView: populateFlightsView
}

// for each result
// grab details
// print card with details