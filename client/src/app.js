var getAccomodation = require('./models/accomodation_api').getAccomodation;
window.onload = function() {
  console.log("Hello from app.js");
  console.log("calling the accomodation API");
  getAccomodation();
}
