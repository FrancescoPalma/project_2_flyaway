require('./stylesheets/animate.css');
require('./stylesheets/main.sass');
require('./stylesheets/style.css');
require('./stylesheets/skeleton.css');
var getFlightData = require('./models/flight_api').getFlightData;

window.onload = function() {
  console.log("I'm loading");
  var searchField = document.getElementById('searchBox');
  var searchForm = document.getElementById('searchForm');
  var origin = document.querySelector('.searchBoxdp');
  var destination = document.querySelector('.searchBoxds');
  // console.log(document.querySelector('.numpeople').value);
  var departureDate = document.querySelector('.first-date');
  var returnDate = document.querySelector('.second-date');

  var detailsButtown = document.getElementById('detailsButton');
  detailsButton.onclick = function() {
    console.log("Oh, I was clicked.");
    console.log(getFlightData(origin.value, destination.value, departureDate.value));
  }

  $(document).ready(function() {

  })

  // var getStartedButton = document.getElementById('getStarted');
  // getStartedButton.onclick = function() {
  //   var overlay = document.getElementById('overlay');
  //   overlay.className += 'animated fadeOutLeft';
  //   var destinationForm = document.getElementById('destinationForm');
  //   setTimeout(function(){
  //     destinationForm.style = 'position: absolute; z-index: 10;';
  //     destinationForm.className = 'animated fadeInRight';
  //   }, 3000);
  // }
}
