const Request = require('request')
const steamAPI = '6BF9A23760C89D6EA810AD69C819549E'
const BigNumber = require('bignumber.js')

function convert64To32(steam64){
	let x = new BigNumber(steam64).minus('76561197960265728')
	return x.c[0]
}

function convert32To64(steam34){
	let x = new BigNumber(steam34).plus('76561197960265728')
	return x.c[0]
}

const getSteamID = (vanityurl, callback) => {
	let path = 'http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?vanityurl='
				+ vanityurl + '&key=' + steamAPI
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

const getMatchHistory = (option) => {
	path = 'http://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v1?key=' + steamAPI
	for(let key in option){
		path += '&' + key + '=' + option[key]
	}
	return new Promise((resolve, reject) => {
		Request(path, (error, response, body) => {
			if (!error && response.statusCode == 200) {
				let resp = JSON.parse(body)
				if(resp.result.status == 1){
					resolve(resp.result.matches)
				}else{
					reject(resp.result)
				}
			}
		})
	})
}

const getMatchDetails = (matchID) => {
	let path = 'http://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/v1?key=' + steamAPI
				+ '&match_id=' + matchID
	//console.log(path)
	return Promise((resolve, reject) => {
		Request(path, (error, response, body) => {
			if (!error && response.statusCode == 200) {
				let resp = JSON.parse(body)
				if(!resp.result.error){
					resolve(resp.result)
				}else{
					reject(resp.result)
				}
			}
		})
	})
}

const getMatchBySequenceNum = (option) => {
	let path = "http://api.steampowered.com/IDOTA2Match_570/GetMatchHistoryBySequenceNum/v1?key=" + steamAPI
	for(let key in option){
		path += '&' + key + '=' + option[key]
	}
	//console.log(path)
	return new Promise((resolve, reject) => {
		Request(path, (error, response, body) => {
			if(!error && response.statusCode == 200){
				let resp = JSON.parse(body)
				if(resp.result.status == 1){
					resolve(resp.result.matches)
				}else{
					reject(resp.result)
				}
			}
		})
	})
}

const getHeroWinRate = (heroName) => {
	let path = 'http://www.dotabuff.com/heroes/centaur-warrunner'
	console.log('sending to: ' + path)
	return new Promise((resolve, reject) => {
		Request(path, (error, response, body)=>{
	  		if (!error && response.statusCode == 200) {
					if (resp.result.status === 1) {
						resolve(body)
					} else {
						reject(body)
					}
			  }
		})
	})
}

const getLeagueListing = () => {
	path = 'http://api.steampowered.com/IDOTA2Match_570/GetLeagueListing/v1/?key=' + steamAPI
	return new Promise((resolve, reject) => {
		Request(path, (error, response, body)=>{
	  		if (!error && response.statusCode == 200) {
	  			let leagues = JSON.parse(body)
	  			resolve(leagues.result.leagues)
			  } else {
					reject(error)
				}
		})
	})
}

const getPlayerSummaries = (steamids) => {
	path = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + steamAPI
	path += '&steamids=' + convert32To64(steamids)
	return new Promise((resolve, reject) => {
		Request(path, (error, response, body)=>{
	  		if (!error && response.statusCode == 200) {
	  			let player = JSON.parse(body)
	  			resolve(player)
			  } else {
					reject(error)
				}
		})
	})
}

const getTeamInfo = (options) => {
	path = 'http://api.steampowered.com/IDOTA2Match_570/GetTeamInfoByTeamID/v1?key=' + steamAPI
	for(let key in options){
		path += '&' + key + '=' + option[key]
	}
	return new Promise((resolve, reject) => {
		Request(path, (error, response, body)=>{
	  		if(!error && response.statusCode == 200) {
	  			let teams = JSON.parse(body)
	  			resolve(teams.result.teams)
			  }else{
					reject(error)
				}
		})
	})
}

module.exports = {
	getSteamID: getSteamID,
	getMatchHistory: getMatchHistory,
	getMatchDetails: getMatchDetails,
	getMatchBySequenceNum: getMatchBySequenceNum,
	getHeroWinRate: getHeroWinRate,
	getLeagueListing: getLeagueListing,
	getPlayerSummaries: getPlayerSummaries,
	getTeamInfo: getTeamInfo
}
