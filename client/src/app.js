var SearchFormView = require('./views/landing_page.js');
var test = new SearchFormView;
module.hot.accept();
require('css!./stylesheets/main.scss');

window.onload = function() {
  test.sayHi();
}
