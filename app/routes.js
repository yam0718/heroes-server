//var steamAPI = '6BF9A23760C89D6EA810AD69C819549E'
const request = require('request')
const timestamp = require('unix-timestamp')
const mongojs = require('./../config/db.js')
const asyncM = require("async")

const db = mongojs.connectDB()

module.exports = (app) => {
	app
		.get('/', (req, res) => {
			setHeader(res)
      res.send({"greeting": "hello, world"})
		})

    .get('/heroes', (req, res) => {
      db.heroes.find({}, (err, heroes) => {
          if (err) {
            console.log(err)
            res.status(500).end(err)
          } else {
						setHeader(res)
            res.json(heroes)
          }
      })
    })

    .get('/heroes/:id', (req, res) => {
      db.heroes.findOne({'id': parseInt(req.params.id)}, (err, hero) => {
        if (err) {
          console.log(err)
          res.status(500).end(err)
        } else {
					setHeader(res)
          res.json(hero)
        }
      })
    })

    .post('/auth', (req, res) => {
      console.log(req.body)
      // console.log('username = ' + req.body.username + ', password = ' + req.body.password)
      res.send('here')
    })

		.get('*', (req, res) => {
			res.send('PAGE NOT FOUND')
		})


		////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////
		function setHeader(res) {
			res.header("Access-Control-Allow-Origin", "*")
			res.header("Access-Control-Allow-Headers", "X-Requested-With")
		}
}
