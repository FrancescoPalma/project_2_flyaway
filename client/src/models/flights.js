var Flight = function(params){
  this.departure = params.departure;
  this.arrival = params.arrival;
  this.departCountry = params.departCountry;
  this.arrivalCountry = params.arrivalCountry;
  this.departingDate = params.departingDate;
  this.departingTime = params.departingTime;
  this.arrivingDate = params.arrivingDate;
  this.arrivingTimes = params.arrivingTimes;
  this.price = params.price;
};

Flight.prototype = {
  save: function(){
    var url = 'http://localhost:3000/flights';
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function(){
      if(request.status === 200){
      }
    }
    request.send(JSON.stringify(this));
  }
}


module.exports = Flight;

