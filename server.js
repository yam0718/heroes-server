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

	.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true)
    // Pass to next layer of middleware
    next()
	})

	// Routing
	require('./app/routes')(app)

http.listen(port, function() {
    console.log('DOTA2 heroes running at port 3000');
});
