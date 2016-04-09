var FlightList = function(){
  this.flights = [];
  this.onUpdate = null;
}

FlightList.prototype = {
  populate: function(){
    var url = 'https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=bX8HkNGmgrYd81Z9ne6OyMp4WhAiYoyS&origin=LON&destination=SYD&departure_date=2016-06-25&currency=GBP&number_of_results=5'
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function() {
        if (request.status === 200) {
            var jsonString = request.responseText;
            var flightss = JSON.parse(jsonString);
            this.flights = flights;
            this.onUpdate(flights);
        }
    }.bind(this);
    request.send(null);
  }
}