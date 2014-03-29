var express = require('express');
var fs = require('fs');
var util = require('./lib/utility');

var handler = require('./lib/request-handler');

var app = express();

var port = process.env.PORT || 4569;
// var port = 4568;

app.listen(port);

console.log('Server now listening on port ' + port);

app.configure(function() {
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
});

app.get('/links', handler.fetchLinks);
// app.get('/links', util.checkUser, handler.fetchLinks); // add this back once we re-implement auth
app.post('/links', handler.saveLink);
