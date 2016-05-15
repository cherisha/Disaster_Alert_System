
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , alerts = require('./routes/alerts')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
var favicon = require('serve-favicon');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(favicon(__dirname + '/public/img/icon.ico'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res){
	res.sendfile("index.html");
});

app.get('/map', function(req, res){
	res.sendfile("map.html");
});

app.get('/all-disasters', function(req, res){
	res.sendfile("all.html");
});

app.get('/volcanos', function(req, res){
	res.sendfile("volcanos.html");
});

app.get('/tornados', function(req, res){
	res.sendfile("tornados.html");
});

app.get('/earthquakes', function(req, res){
	res.sendfile("earthquakes.html");
});

app.get('/tsunamis', function(req, res){
	res.sendfile("tsunamis.html");
});

app.get('/disasters', alerts.getDisasters);
app.get('/mapJSON', alerts.getAlertsJSON);
app.get('/disaster-counts', alerts.getDisasterCounts);
app.post('/email-message', user.sendEmail);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
  alerts.getAlerts(true);
});
