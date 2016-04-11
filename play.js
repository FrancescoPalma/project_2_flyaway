var MongoClient = require('mongodb').MongoClient

// Connection URL
var url = 'mongodb://localhost:27017/flightInformation';

MongoClient.connect(url, function(err, db) {
  var collection = db.collection('flights');
  collection.find({}).toArray(function(err, docs) {
    db.close();
  });
});