const Request = require('request')
const steamAPI = '6BF9A23760C89D6EA810AD69C819549E'
const BigNumber = require('bignumber.js')

const exported = {
	getSteamID: (vanityurl) => {
		let path = 'http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?vanityurl=' + vanityurl
		return getSteamIDBoth(path)
	},

	getMatchHistory: (option) => {
		let path = 'http://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v1?'
		return checkResponse(path, option)
	},

	getMatchDetails: (matchID) => {
		let path = 'http://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/v1?'
					+ '&match_id=' + matchID
		return checkResponse(path)
	},

	getMatchBySequenceNum: (option) => {
		let path = "http://api.steampowered.com/IDOTA2Match_570/GetMatchHistoryBySequenceNum/v1?"
		return checkResponse(path, option)
	},

	getHeroWinRate: (heroName) => {
		let path = 'http://www.dotabuff.com/heroes/centaur-warrunner?'
		return checkResponse(path)
	},

	getLeagueListing: () => {
		let path = 'http://api.steampowered.com/IDOTA2Match_570/GetLeagueListing/v1/?'
		return checkResponse(path)
	},

	getPlayerSummaries: (steamids) => {
		let path = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?'
		path += '&steamids=' + convert32To64(steamids)
		return checkResponse(path)
	},

	getTeamInfo: (option) => {
		let path = 'http://api.steampowered.com/IDOTA2Match_570/GetTeamInfoByTeamID/v1?'
		return checkResponse(path, option)
	},
}

// FUNCTIONS //
function checkResponse(path, option) {
	if (option) {
		path = addQueryParams(path, option)
	}
	path += `key=${steamAPI}`
	return new Promise((resolve, reject) => {
		Request(path, (err, resp, body) => {
			if (!err && resp.statusCode == 200) { // response OK
				let data = JSON.parse(body)
				resolve(data.result)
			} else { // response ERROR
				let error = JSON.parse(err)
				reject(error)
			}
		})
	})
}

function addQueryParams(path, option) {
	for (data in option) { // loop for add query params
		path += `${data}=${option[data]}&`
	}
	return path
}

function getSteamIDBoth(path) {
	path += `&key=${steamAPI}`
	console.log(path)
	return new Promise((resolve, reject) => {
		Request(path, (error, response, body) => {
				if (!error && response.statusCode == 200) {
					let resp = JSON.parse(body)
					if(resp.response.success == 1){
						let steamID64 = resp.response.steamid
						let steamID32 = convert64To32(steamID64)
						let steamIDObj = {'id64': steamID64, 'id32': steamID32}
						resolve(steamIDObj)
					}else{
						reject(resp.response)
					}
				}
		})
	})
}

function convert64To32(steam64) {
	let x = new BigNumber(steam64).minus('76561197960265728')
	return x.c[0]
}

function convert32To64(steam34) {
	let x = new BigNumber(steam34).plus('76561197960265728')
	return x.c[0]
}

module.exports = exported
