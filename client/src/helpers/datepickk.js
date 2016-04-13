window.onload = function() {
  var datepicker = new Datepickk();
  console.log(datepicker);

  var datePickerButton = document.querySelector('.date-picker-btn');
  datePickerButton.onclick = function(e) {
    e.preventDefault();
    datepicker.show();

    datepicker.onSelect = function() {
      datepicker.range = true;
      var getFirstDate = this.toLocaleDateString();
      var formatDate = getFirstDate.split('/');
      var day = formatDate[1];
      var month = formatDate[0];
      var year = formatDate[2];
      var formattedDate = year + "-" + month + "-" + day;

      var displayFirstDate = document.getElementById('first-date');
      displayFirstDate.innerHTML = formattedDate;

      datepicker.onSelect = function() {
        var getSecondDate = this.toLocaleDateString();
        var formatDate = getSecondDate.split('/');
        var day = formatDate[1];
        var month = formatDate[0];
        var year = formatDate[2];
        var formattedDate = year + "-" + month + "-" + day;
        var displayDate = document.getElementById('second-date');
        displayDate.innerHTML = formattedDate;
      }
    }
  }

}