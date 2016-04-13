var getFlightDetails = require('./flight_api').getFlightDetails;
var getTotalFlightPrice = require('./flight_api').getTotalFlightPrice;
var getFlightDuration = require('./flight_api').getFlightDuration;
var getNumberOfStopovers = require('./flight_api').getNumberOfStopovers;
var getOriginIata = require('./flight_api').getOriginIata;
var getDestinationIata = require('./flight_api').getDestinationIata;

var originCityName, destinationCityName, originIATA, destinationIATA, flightDuration, flightPrice, numberStopovers;

var divIds = ["origin-cityname", "destination-cityname", "origin-iata", "destination-iata", "flight-duration", "flight-price", "number-stopovers"];

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
  var div = document.createElement('div');

  card.className = 'temp-card';

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
  originCityName = document.getElementById("origin-cityname" + index);
  destinationCityName = document.getElementById("destination-cityname" + index);
  originIATA = document.getElementById("origin-iata" + index);
  destinationIATA = document.getElementById("destination-iata" + index);
  flightDuration = document.getElementById("flight-duration" + index);
  flightPrice = document.getElementById("flight-price" + index);
  numberStopovers = document.getElementById("number-stopovers" + index);
}

function writeCardContents(data, index) {
  originCityName.innerHTML = 'From: ' + getOriginIata(data, index);
  destinationCityName.innerHTML = 'To: ' + getDestinationIata(data, index);
  originIATA.innerHTML = "Origin IATA " + getOriginIata(data, index);
  destinationIATA.innerHTML = "Destination IATA " + getDestinationIata(data, index);
  flightDuration.innerHTML = "Flight Duration " + getFlightDuration(data, index) + "h";
  flightPrice.innerHTML = "Flight Price " + getTotalFlightPrice(data, index);
  numberStopovers.innerHTML = "Stopovers " + getNumberOfStopovers(data, index);
}

module.exports = {
  populateFlightsView: populateFlightsView
}

// for each result
// grab details
// print card with details