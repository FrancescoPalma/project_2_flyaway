window.departureDate, window.returnDate;
window.onload = function() {
  var datepicker = new Datepickk();
  console.log(datepicker);
  var datePickerButton = document.querySelector('.date-picker-btn');
  datePickerButton.onclick = function(e) {
    e.preventDefault();
    datepicker.show();

    datepicker.onSelect = function() {
      datepicker.range = true;
      datepicker.button = "DONE";
      var getFirstDate = this.toLocaleDateString();
      var formatDate = getFirstDate.split('/');
      var day = formatDate[1];
      var month = formatDate[0];
      var newMonth;
      var year = formatDate[2];
      if (month.length < 2) {
        var newMonth = "0" + month;
      } else {
        newMonth = month;
      }
      console.log(newMonth);
      var formattedDate = year + "-" + newMonth + "-" + day;
      departureDate = formattedDate;

    datepicker.onSelect = function() {
      var getSecondDate = this.toLocaleDateString();
      var formatDate = getSecondDate.split('/');
      var day = formatDate[1];
      var month = formatDate[0];
      var year = formatDate[2];
      if (month.length < 2) {
        var newMonth = "0" + month;
      } else {
        newMonth = month;
      }
      console.log(newMonth);
      var formattedDate = year + "-" + newMonth + "-" + day;
      returnDate = formattedDate;
      }
    }
  }

}