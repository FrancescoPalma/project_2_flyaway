require('../helpers/flickrapi.dev.js');

var flickr = new Flickr({
  api_key: "b6b35718f3c50d1c2c6d04ead7f016b2"
});

function getFlickrImagesByTag(tags, callback) {
  console.log("called the get FlickerAPI with: ", tags);
  flickr.photos.search({
    text: tags,
    privacy_filter: 1,
    safe_search: 1,
    // tag_mode: 'all',
    // sort: 'relevance',
    group_id: '41425956@N00',
    per_page: 20,
    page: 1,
  }, function(err, result) {
    if(err) { throw new Error(err); }
    var data = result;
    var imageURLS = getImagesUrl(data);
    callback(imageURLS);
  })
}

function getImagesUrl(data) {
  var urls = [];
  var photos = data.photos.photo
  for(var photo of photos) {
    var id = photo.id;
    var farmId = photo.farm;
    var serverId = photo.server;
    var secret = photo.secret;
    urls.push("https://farm" + farmId + ".staticflickr.com/" + serverId + "/" + id + "_" + secret + "_h.jpg");
  }
  return urls;
}

module.exports = {
  getFlickrImagesByTag: getFlickrImagesByTag
}
