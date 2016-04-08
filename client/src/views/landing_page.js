function Test() {
  var hello = "Hello!";
  this.sayHi = function() {
    console.log(hello);
  }
}
module.exports = Test;