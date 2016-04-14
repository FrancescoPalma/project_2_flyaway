var getFlightDetails = require('./flight_api').getFlightDetails;
var getTotalFlightPrice = require('./flight_api').getTotalFlightPrice;
var getFlightDuration = require('./flight_api').getFlightDuration;
var getNumberOfStopovers = require('./flight_api').getNumberOfStopovers;
var getOriginIata = require('./flight_api').getOriginIata;
var getDestinationIata = require('./flight_api').getDestinationIata;

var originCityName, destinationCityName, originIATA, destinationIATA, flightDuration, flightPrice, numberStopovers, button, card;

var divIds = ["origin-cityname", "destination-cityname", "origin-iata", "destination-iata", "flight-duration", "flight-price", "number-stopovers"];

function populateFlightsView(data) {
  console.log("PopulateFlightsView has been called");
  for(itinerary in data.results) {
    console.log("creating a card");
    createCard(itinerary);
    console.log("writing stuff to a card");
    writeCardContents(data, itinerary);
    button.onclick = function() {
      this.parentNode.className = 'flight-card';
      this.parentNode.className = 'flight-card selected';
      console.log("logging the arrow: ", document.getElementById('move-next'));
      document.getElementById('move-next').style.display = 'block';
    }
  }
  // var buttons =  document.querySelectorAll('#select-flight-button');
}

function createCard(index) {
  var flightResultsContainer = document.querySelector('.flight-results-container');
  card = document.createElement('section');
  var div = document.createElement('div');

  card.className = 'flight-card';
  button = document.createElement('button');
  button.id = 'select-flight-button';
  button.innerHTML = "SELECT";
  button.className = "nice-button select-card";

  for(var id of divIds) {
    var div = document.createElement('div');
    div.id = (id + index);
    card.appendChild(div);
  }

  flightResultsContainer.appendChild(card);
  card.appendChild(button);
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
  button = document.getElementById('select-flight-button');
}

function writeCardContents(data, index) {
  originCityName.className = 'origin-city';
  originCityName.innerHTML = "From: " + origin.value.substring(6, origin.value.length);

  destinationCityName.className = 'destination-city';
  destinationCityName.innerHTML = 'To: ' + destination.value.substring(6, destination.value.length);

  originIATA.className = 'origin-iata';
  originIATA.innerHTML = "Origin IATA: " + getOriginIata(data, index);

  destinationIATA.className = 'destination-iata';
  destinationIATA.innerHTML = "Destination IATA:  " + getDestinationIata(data, index);

  flightDuration.className = 'flight-duration';
  flightDuration.innerHTML = "Flight Duration: " + getFlightDuration(data, index) + "h";

  flightPrice.className = 'flight-price';
  flightPrice.innerHTML = "Flight Price: £" + getTotalFlightPrice(data, index);

  numberStopovers.className = 'number-stopovers';
  numberStopovers.innerHTML = "Stopovers: " + getNumberOfStopovers(data, index);
}

module.exports = {
  populateFlightsView: populateFlightsView
}

// for each result
// grab details
// print card with details