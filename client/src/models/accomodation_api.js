
function getAccomodation() {
  console.log("getFlights called");
  var url = "https://zilyo.p.mashape.com/search?isinstantbook=true&nelatitude=22.37&nelongitude=-154.48000000000002&provider=airbnb%2Chousetrip&swlatitude=18.55&swlongitude=-160.52999999999997";

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      var jsonString = xhr.responseText;
      var data = JSON.parse(jsonString);
      // returns object with 14(max) objects(properties)
      return data.result;
    }
  }
  xhr.open("GET", url);
  xhr.setRequestHeader("X-Mashape-Key", "qM9ApJg7jWmshX5ZkYcjawEa1uBbp1YQTqujsnSsZplpTWDp0F");
  xhr.setRequestHeader("Accept", "application/json");
  xhr.send(null);
}

module.exports = {
  getAccomodation: getAccomodation
}