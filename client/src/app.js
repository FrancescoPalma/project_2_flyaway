require('./stylesheets/animate.css');
require('./stylesheets/main.sass');
require('./stylesheets/style.css');
require('./stylesheets/skeleton.css');
window.onload = function() {
  var searchField = document.getElementById('searchBox');
  var searchForm = document.getElementById('searchForm');
  console.log( searchField );

  searchForm.onsubmit = function(event) {
    console.log(searchForm);
    event.preventDefault();
    console.log(document.querySelector('.searchBoxdp').value);
    console.log(document.querySelector('.searchBoxds').value);
    console.log(document.querySelector('.numpeople').value);
    console.log(document.querySelector('.first-date').value);
    console.log(document.querySelector('.second-date').value);
  }


  var getStartedButton = document.getElementById('getStarted');
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
