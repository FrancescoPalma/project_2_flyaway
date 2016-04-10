// var AmadeusRequest = function (url) {
//   this.url = url;
//   // this.data;

//   this.fetch = function (callback) {
//     var request = new XMLHttpRequest();
//     request.open("GET", url);
//     console.log("opening the request");
//     request.onload = function () {
//       console.log("loading the request");
//       if (request.status === 200) {
//           var jsonString = request.responseText;
//           var flights = JSON.parse(jsonString).results;
//           // this.data = flights;
//           console.log(flights)

//           var results = flights.results
//           var filteredData = [];
//           for(var flight of results ){
//             filteredData.push(flight)
//           }
//          console.log(filteredData)
//           if (callback) {
//             callback("simon is pingpong mad");
//           }
//         }
//       }
//     request.send(null);
//   }
// }

// var filteredData = [];











// module.exports = AmadeusRequest