
    //WHERE IS IT GETTING SENT TO - FLIGHTS API FOR THE MONTH OF MAY
    var url = 'https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=bX8HkNGmgrYd81Z9ne6OyMp4WhAiYoyS&origin=LON&destination=SYD&departure_date=2016-06-25&currency=GBP&number_of_results=3'
    //MAKE A REQUEST
    var request = new XMLHttpRequest();
    //WHERE IS THIS REQUEST GOING
    request.open("GET", url);
    console.log("opening the request");
    //WHAT TO DO WHEN IT COMPLETES
    request.onload = function () {
      console.log("loading the request");
        if (request.status === 200) {
            var jsonString = request.responseText;
            var flights = JSON.parse(jsonString);
            console.log("parsed the request");
            // main(flightss.results);
          console.log(flights)
        }

    }
    request.send(null);
};




