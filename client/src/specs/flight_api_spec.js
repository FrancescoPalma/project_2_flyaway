var assert = require('chai').assert;
var breakBigObject = require('../models/flight_api').breakBigObject;
var getFlightDetails = require('../models/flight_api').getFlightDetails;
var getTotalFlightPrice = require('../models/flight_api').getTotalFlightPrice;
var getOriginIata = require('../models/flight_api').getOriginIata;
var getDestinationIata = require('../models/flight_api').getDestinationIata;
var data = require('./flight_api_sample_data.json');

describe('Flight Data Processing', function() {

  describe('breakBigObject', function() {
    it('should break down the data', function () {
      var result = breakBigObject(data);
      assert.equal(result.length, 5);
    });
  });

  describe('getFlightDetails', function() {
    it('should return outbound flights', function() {
      var result = getFlightDetails(data, 0);
      assert.equal(result.length, 2)
    });
  });

  describe('getTotalFlightPrice', function() {
    it('should return the flight price', function () {
      assert.equal(578.65, getTotalFlightPrice(data, 0));
    });
  });

  describe('DataFetch Functions', function() {
    it('should return the origin IATA', function () {
      assert.equal('LHR', getOriginIata(data, 0));
    });

    it('should return the destination IATA', function () {
      assert.equal('SYD', getDestinationIata(data, 0));
    });

  });


});