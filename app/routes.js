//var steamAPI = '6BF9A23760C89D6EA810AD69C819549E'
const request = require('request')
const timestamp = require('unix-timestamp')
const mongojs = require('./../config/db.js')
const async_ = require("async")
const opendota = require('./models/opendota.js')

const db = mongojs.connectDB()
const local = mongojs.connectDB('local')

module.exports = (app) => {
	app
		.get('/', (req, res) => {
      respJSON(200, {"greeting": "hello, world"}, res)
		})

    .get('/heroes', (req, res) => {
      db.heroes.find({}, (err, heroes) => {
          if (err) {
						respJSON(500, err, res)
          } else {
            respJSON(200, heroes, res)
          }
      })
    })

    .get('/heroes/:id', (req, res) => {
      db.heroes.findOne({'id': parseInt(req.params.id)}, (err, hero) => {
        if (err) {
          respJSON(500, err, res)
        } else {
          respJSON(200, hero, res)
        }
      })
    })

		.get('/test', async (req, res, next) => {
			try {
			  let stat = await opendota.getHeroesStat()
				respJSON(200, stat, res)
			} catch (err) {
				respJSON(500, err, res)
			}
		})

    .post('/auth', (req, res) => {
      console.log(req.body)
      // console.log('username = ' + req.body.username + ', password = ' + req.body.password)
      res.send('auth')
    })

		.get('*', (req, res) => {
			res.redirect('/')
		})


		////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////
		function setHeader(res) {
			res.header("Access-Control-Allow-Origin", "*")
			res.header("Access-Control-Allow-Headers", "X-Requested-With")
		}

		function respJSON(status, data, res) {
			setHeader(res)
			if (status === 200) {
				res.status(200).json(data)
			} else if (status === 500) {
				res.status(500).json(data)
			}

		}
}
