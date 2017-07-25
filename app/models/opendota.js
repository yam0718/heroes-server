const Request = require('request')
const BigNumber = require('bignumber.js')

function convert64To32(steam64) {
	let x = new BigNumber(steam64).minus('76561197960265728')
	return x.c[0]
}

function convert32To64(steam34) {
	let x = new BigNumber(steam34).plus('76561197960265728')
	return x.c[0]
}

const getMatch = (match_id) => {
  console.log('get match #' + match_id)
  let path = "https://api.opendota.com/api/matches/" + match_id
	return new Promise((resolve, reject) => {
		Request(path, (err, resp, body) => {
	    if (!err && resp.statusCode == 200) {
	      let match = JSON.parse(body)
	      resolve(match)
	    } else {
	      reject(err)
	    }
	  })
	})
}

const getHeroesStat = () => {
	console.log('get heroes stat opendota')
	let path = "https://api.opendota.com/api/heroStats"
	return new Promise((resolve, reject) => {
		Request(path, (err, resp, body) => {
			if (!err && resp.statusCode == 200) {
				let heroes = JSON.parse(body)
				resolve(heroes)
			} else {
				reject(err)
			}
		})
	})
}

module.exports = {
  getMatch: getMatch,
	getHeroesStat, getHeroesStat
}
