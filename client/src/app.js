var SearchFormView = require('./views/landing_page.js');
var test = new SearchFormView;
require('./stylesheets/main.scss');

window.onload = function() {
  test.sayHi();
}
