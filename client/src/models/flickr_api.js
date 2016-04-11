require('../helpers/flickrapi.dev.js');

var flickr = new Flickr({
  api_key: "b6b35718f3c50d1c2c6d04ead7f016b2"
});

function getFlickrImagesByTag() {
  flickr.photos.search({
    text: "red+panda"
  }, function(err, result) {
    if(err) { throw new Error(err); }
    return result;
  })
}

function getImagesUrl(data) {
  var urls = [];
  for(var photo of data.photos.photo) {
    var id = photo.id;
    var farmId = photo.farm;
    var serverId = photo.server;
    var secret = photo.secret;
    urls.push("https://farm" + farmId + "{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg")
  }
}
module.exports = {
  getFlickrImagesByTag: getFlickrImagesByTag
}

// https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
