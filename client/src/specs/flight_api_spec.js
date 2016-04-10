var assert = require('chai').assert;
var processFlightData = require('../models/flight_api').processFlightData;
var breakBigObject = require('../models/flight_api').breakBigObject;
var getOutboundFlights = require('../models/flight_api').getOutboundFlights;
var getFlightPrice = require('../models/flight_api').getFlightPrice;
var data = require('./flight_api_sample_data.json');

describe('Flight Data Processing', function() {

  describe('breakBigObject', function() {
    it('should break down the data', function () {
      var result = breakBigObject(data);
      assert.equal(result.length, 5);
    });
  });

  describe('getOutboundFlights', function() {
    it('should return outbound flights', function() {
      var result = getOutboundFlights(data, 0);
      assert.equal(result.length, 2)
    });
  });

  describe('getFlightPrice', function() {
    it('should return the flight price', function () {
      assert.equal(578.65, getFlightPrice(data, 0));
    });
  });

});