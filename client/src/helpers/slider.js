function changeBg(imageArray) {
  var imgCount = 0;
  var img_array = imageArray;
    _nxtIndex = 0,
    _curIndex = 0,
    interval = 5000;

  function nextIndex() {
    _nxtIndex = (_nxtIndex + 1) % img_array.length;
    return _nxtIndex;
  };

  function shiftIndexes() {
    _curIndex = _nxtIndex;
    nextIndex();
  }

  function createImgTags(){
      imgCount = img_array.length;
      var html = '';
      var slider = document.getElementById('slider');
      console.log(slider);
      for(var i=0; i<imgCount;i++){
          html +='<div id="background-slide'+i+'" class="background-slider"></div>';
      }
      console.log(html);
      $(slider).html(html);
  }
  function assignBackgrounds() {
    imgCount = img_array.length;
    for (var i = 0; i < imgCount; i++) {

      jQuery('#background-slide' + i).css('backgroundImage', function() {
        return 'url(' + img_array[nextIndex()] + ')';
      });
      if (i == 0) {
        jQuery('#background-slide' + i).css('opacity', 1);
      } else {
        jQuery('#background-slide' + i).css('opacity', 0);
      }
    }
  }

  function startBackgroundOpacityToggle() {
    //console.log("in startBackgroundOpacityToggle. _curIndex = "+_curIndex);
    elem = jQuery('#background-slide' + _curIndex);
    elem.animate({
      opacity: (elem.css('opacity') == 0) ? 1 : 0
    }, {
      duration: 3500,
      start: finishBackgroundOpacityToggle
    });
  };

  function finishBackgroundOpacityToggle() {
    //console.log("in finishBackgroundOpacity. _nxtIndex = "+_nxtIndex);
    elem = jQuery('#background-slide' + _nxtIndex);
    elem.animate({
      opacity: (elem.css('opacity') == 0) ? 1 : 0
    }, {
      duration: 3500,
      complete: runSlider
    });

  };

  function runSlider() {
    shiftIndexes();
    setTimeout(startBackgroundOpacityToggle, interval);
  }

  createImgTags();
  assignBackgrounds();
  runSlider();
};

  module.exports = changeBg;