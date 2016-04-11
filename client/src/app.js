require('./stylesheets/animate.css');
require('./stylesheets/main.sass');
require('./stylesheets/style.css');
require('./stylesheets/skeleton.css');
window.onload = function() {
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