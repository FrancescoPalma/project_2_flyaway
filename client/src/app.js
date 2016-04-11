require('./stylesheets/animate.css');
require('./stylesheets/main.sass');
require('./stylesheets/style.css');
require('./stylesheets/skeleton.css');
var getFlightData = require('./models/flight_api').getFlightData;
var getFlickrImagesByTag = require('./models/flickr_api').getFlickrImagesByTag;
window.onload = function() {
  console.log(getFlickrImagesByTag());
  getStartedButton = document.getElementById('getStarted');
  getStartedButton.onclick = function() {
    var overlay = document.getElementById('overlay');
    overlay.className += 'animated fadeOutLeft';
    var destinationForm = document.getElementById('destinationForm');
    setTimeout(function(){
      destinationForm.style = 'position: absolute; z-index: 10;';
      destinationForm.className = 'animated fadeInRight';
    }, 3000);
  }
}
