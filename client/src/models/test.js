function Test(name) {
  this.name = name;
}

Test.prototype.add = function (a, b) {
  return a + b;
}

Test.prototype.multiply = function (a, b) {
  return a * b;
}

Test.prototype.subtract = function (a, b) {
  if (b > a) {
    return false;
  }
  return a - b;
}

module.exports = Test;