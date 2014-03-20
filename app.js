/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var cors = require('cors');

var app = express();


// all environments
app.set('port', process.env.PORT || 9001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://aurora.quantonz.com:9000/adventurers');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');

    next();
}

app.use(allowCrossDomain);

app.use(cors);

var options = {
  host: "http://localhost",
  port: 9000,
  path: "/adventurers",
  method: "POST"
};

app.post("/", function(req, res, nex) {
  console.log("Input!: " + req.body.charName);
  var chname = req.body.charName;
  var chtoken = rand(9);

  var jason = JSON.stringify({name: chname, token: chtoken});

  var reqs = http.request(options);

  req.on('error', function(err){
    console.log('Bad Post: ' + err.messgae);
  });
  reqs.write(jason);
  reqs.end();

});

function rand(length,current){
 current = current ? current : '';
 return length ? rand( --length , "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".charAt( Math.floor( Math.random() * 60 ) ) + current ) : current;
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
