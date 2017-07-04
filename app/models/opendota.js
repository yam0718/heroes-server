const Request = require('request')
const BigNumber = require('bignumber.js')

function convert64To32(steam64){
	let x = new BigNumber(steam64).minus('76561197960265728')
	return x.c[0]
}

function convert32To64(steam34){
	let x = new BigNumber(steam34).plus('76561197960265728')
	return x.c[0]
}

const getMatch = (match_id, callback) => {
  console.log(match_id)
  let path = "https://api.opendota.com/api/matches/" + match_id
  Request(path, (err, resp, body) => {
    if(!err && resp.statusCode == 200) {
      let match = JSON.parse(body)
      callback(null, match)
    } else {
      callback(err, null)
    }
  })
}

const getHeroesStat = (callback) => {
	console.log('get heroes stat opendota')
	let path = "https://api.opendota.com/api/heroStats"
	Request(path, (err, resp, body) => {
		if(!err && resp.statusCode == 200) {
			let heroes = JSON.parse(body)
			callback(null, heroes)
		} else {
			callback(err, null)
		}
	})
}

module.exports = {
  getMatch: getMatch,
	getHeroesStat, getHeroesStat
}
