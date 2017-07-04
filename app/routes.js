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

		// .get('/deploy/db', (req, res) => {
		// 	local.heroes.find({}, (err, heroes) => {
		// 		if (err) {
		// 			return res.status(500).json({'status': 'error'})
		// 		} else {
		// 			db.heroes.save(heroes, ()=>{
		// 				console.log('---ok')
		// 			})
		// 			return res.json(heroes)
		// 		}
		// 	})
		// })

		// .get('/config', (req, res) => {
		// 	opendota.getHeroesStat((err, heroes) => {
		// 		if (err) {
		// 			console.log(err)
		// 			res.status(500).json({'error': err})
		// 		} else {
		// 			async_.forEach(heroes, function loop(hero, callback) {
		// 					delete hero.localized_name
		// 					delete hero.attack_type
		// 					delete hero.img
		// 					local.heroes.findOne({'id': hero.id}, (err, localHero) => {
		// 						if (err) {
		// 							console.log(err)
		// 						} else {
		// 							let temp = Object.assign(hero, localHero)
		// 							// console.log(temp)
		// 							temp.icon = 'https://api.opendota.com' + temp.icon
		// 							delete temp.base_damage_min
		// 							delete temp.base_damage_max
		// 							delete temp.str_per_level
		// 							delete temp.agi_per_level
		// 							delete temp.int_per_level
		// 							db.heroes.update({'id': temp.id}, {'$set': temp}, () => {
		// 								console.log(temp.id + '  --ok')
		// 								callback()
		// 							})
		// 						}
		// 					})
		// 				}, function done(err) {
		// 					console.log('all done')
		// 				})
		// 			res.json(heroes)
		// 		}
		// 	})
		// })

		// .get('/db/sort', (req, res) => {
		// 	db.heroes.find({}).sort({'id': 1}, (err, heroes) => {
		// 		if (err) {
		// 			res.json({'status': err})
		// 		} else {
		// 			local.heroes_temp.save(heroes, ()=>{
		// 				console.log('ok')
		// 			})
		// 			res.json(heroes)
		// 		}
		// 	})
		// })

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
