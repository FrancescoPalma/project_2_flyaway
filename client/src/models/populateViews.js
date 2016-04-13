var getFlightDetails = require('./flight_api').getFlightDetails;
var getTotalFlightPrice = require('./flight_api').getTotalFlightPrice;
var getFlightDuration = require('./flight_api').getFlightDuration;
var getNumberOfStopovers = require('./flight_api').getNumberOfStopovers;
var getOriginIata = require('./flight_api').getOriginIata;
var getDestinationIata = require('./flight_api').getDestinationIata;

var originCityName, destinationCityName, originIATA, destinationIATA, flightDuration, flightPrice, numberStopovers;

var divIds = ["origin-destination", "origin-iata", "destination-iata", "flight-duration", "number-stopovers", "flight-price"];

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
  // var div = document.createElement('div');

  card.id = 'pricingCard';

  for(var id of divIds) {
    var div = document.createElement('div');
    div.id = (id + index);
    card.appendChild(div);
  }

  flightResultsContainer.appendChild(card);
  getCardIds(index);
  console.log("card has been created")
}

function getCardIds(index) {
  originDestination = document.getElementById("origin-destination" + index);
  originIATA = document.getElementById("origin-iata" + index);
  destinationIATA = document.getElementById("destination-iata" + index);
  flightDuration = document.getElementById("flight-duration" + index);
  flightPrice = document.getElementById("flight-price" + index);
  numberStopovers = document.getElementById("number-stopovers" + index);
}

function writeCardContents(data, index) {
  originDestination.className = "standard top";
  originDestination.innerHTML = getOriginIata(data, index) + " - " + getDestinationIata(data, index);

  originIATA.className = "one-third-column";
  originIATA.innerHTML = "Origin: " + getOriginIata(data, index);

  destinationIATA.className = "one-third-column";
  destinationIATA.innerHTML = "Destination: " + getDestinationIata(data, index);

  flightDuration.className = "one-third-column";
  flightDuration.innerHTML = "Flight Duration: " + getFlightDuration(data, index) + "h";

  numberStopovers.className = "one-third-column";
  numberStopovers.innerHTML = "Stopovers: " + getNumberOfStopovers(data, index);

  flightPrice.className = "standard-text-middle middle"
  flightPrice.innerHTML = "£" + getTotalFlightPrice(data, index);
}

module.exports = {
  populateFlightsView: populateFlightsView
}

// for each result
// grab details
// print card with details