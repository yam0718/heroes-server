var express = require('express');
var app = express();
var http = require('http').Server(app);
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan')
var port = 3000;
// STEAM API:: 6BF9A23760C89D6EA810AD69C819549E //

app
	// Config materials
	.use(morgan('dev'))
	.use(cookieParser())
  .use(expressSession({secret:'nuntjwsecretexpresssesion', resave: true, saveUninitialized: true}))
	.use(bodyParser.json())       // to support JSON-encoded bodies
	.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  		extended: true
	}))
	.use(express.static(__dirname + '/public/'))

	// Routing
	require('./app/routes')(app);

http.listen(port, function() {
    console.log('DOTA2 heroes running at port 3000');
});
