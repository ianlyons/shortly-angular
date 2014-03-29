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
  app.use(express.cookieParser('shhhh, very secret'));
  app.use(express.session());
});

//util.checkUser,
app.get('/',  handler.renderIndex);
app.get('/create', handler.renderIndex);

app.get('/links', handler.fetchLinks);
app.post('/links', handler.saveLink);

app.get('/login', handler.loginUserForm);
app.post('/login', handler.loginUser);
app.get('/logout', handler.logoutUser);

app.get('/signup', handler.signupUserForm);
app.post('/signup', handler.signupUser);

app.get('/*', handler.navToLink);
