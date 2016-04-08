var Test = require('../models/test.js');
var assert = require('assert');

var test = new Test('Ric');

describe('Test', function() {
  it('should return 4', function () {
    assert.equal(4, test.add(2, 2));
  });

  it('should subtract', function () {
    assert.equal(10, test.subtract(20, 10));
  });

  it('should return false', function () {
    assert.equal(false, test.subtract(20, 30));
  });

  it('should multiply', function () {
    assert.equal(9, test.multiply(3, 3));
  });

});