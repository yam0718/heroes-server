const express = require('express');
const app = express();
const http = require('http').Server(app);
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const port = 3000;
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
	require('./app/routes')(app)

http.listen(port, function() {
    console.log('DOTA2 heroes running at port 3000');
})
