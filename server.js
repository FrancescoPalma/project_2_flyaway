var express = require('express');
var app = express();
var path = require('path');
var moment = require('moment-timezone');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.json());
app.use(express.static('client/build'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, + 'client/build/index.html'));
})

app.get('/flights', function(req,res){
  var url = 'mongodb://localhost:27017/flightInformation';
  MongoClient.connect(url, function(err, db){
    if(err){
      console.log(err);
      return;
    }
    var collection = db.collection('flights');
    collection.find({}).toArray(function(err, docs){
      res.json(docs);
      db.close();
    })
  })
});

app.get('/hotels', function(req,res){
  var url = 'mongodb://localhost:27017/flightInformation';
  MongoClient.connect(url, function(err, db){
    if(err){
      console.log(err);
      return;
    }
    var collection = db.collection('hotels');
    collection.find({}).toArray(function(err, docs){
      res.json(docs);
      db.close();
    })
  })
});

app.use(express.static('client/build'));

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
