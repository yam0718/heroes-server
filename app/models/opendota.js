const Request = require('request')
const BigNumber = require('bignumber.js')

const exported = {
	// Matches
	getMatch: (matchID) => {
		let path = `https://api.opendota.com/api/matches/${matchID}`
		return checkResponse(path)
	},

	// Players
	getPlayer: (id32, option) => {
		let path = `https://api.opendota.com/api/players/${id32}?`
		return checkResponse(path, option)
	},

	getPlayerWinLose: (id32, option) => {
		let path = `https://api.opendota.com/api/players/${id32}/wl?`
		return checkResponse(path, option)
	},

	getPlayerRecent: (id32) => {
		let path = `https://api.opendota.com/api/players/${id32}/recentMatches`
		return  checkResponse(path)
	},

	getPlayerAllMatches: (id32, option) => {
		let path = `https://api.opendota.com/api/players/${id32}/matches?`
		return checkResponse(path, option)
	},

	getPlayerHeroesStat: (id32, option) => {
		let path = `https://api.opendota.com/api/players/${id32}/heroes`
		return checkResponse(path, option)
	},

	getPlayerPeers: (id32, option) => {
		let path = `https://api.opendota.com/api/players/${id32}/peers`
		return checkResponse(path, option)
	},

	getPlayerPros: (id32, option) => {
		let path = `https://api.opendota.com/api/players/${id32}/pros`
		return checkResponse(path, option)
	},

	getPlayerTotal: (id32, option) => {
		let path = `https://api.opendota.com/api/players/${id32}/totals`
		return checkResponse(path, option)
	},

	getPlayerCount: (id32, option) => {
		let path = `https://api.opendota.com/api/players/${id32}/counts`
		return checkResponse(path, option)
	},

	getPlayerHistogram: (id32, field, option) => {
		let path = `https://api.opendota.com/api/players/${id32}/histograms/${field}`
		return checkResponse(path, option)
	},

	getPlayerWardMap: (id32, option) => {
		let path = `https://api.opendota.com/api/players/${id32}/wardmap`
		return checkResponse(path, option)
	},

	getPlayerWordCloud: (id32, option) => {
		let path = `https://api.opendota.com/api/players/${id32}/wordcloud`
		return checkResponse(path, option)
	},

	getPlayerRating: (id32) => {
		let path = `https://api.opendota.com/api/players/${id32}/ratings`
		return checkResponse(path)
	},

	getPlayerRanking: (id32) => {
		let path = `https://api.opendota.com/api/players/${id32}/rankings`
		return checkResponse(path)
	},

	refreshPlayerMatchHistory: (id32) => {
		let path = `https://api.opendota.com/api/players/${id32}/refresh`
		return checkResponse(path)
	},

	// Pro Players
	getProPlayers: () => {
		let path = 'https://api.opendota.com/api/proPlayers'
		return checkResponse(path)
	},

	// Pro Matches
	getProMatches: () => {
		let path = "https://api.opendota.com/api/proMatches"
		return checkResponse(path)
	},

	// Public Matches
	getPublicMatches: () => {
		let path = 'https://api.opendota.com/api/publicMatches'
		return checkResponse(path)
	},

	// Heroes Stat
	getHeroesStat: () => {
		let path = "https://api.opendota.com/api/heroStats"
		return checkResponse(path)
	},

	// META Data
	getMetaData: () => {
		let path = 'https://api.opendota.com/api/metadata'
		return checkResponse(path)
	},

	// Distributions
	getDistributions: () => {
		let path = 'https://api.opendota.com/api/distributions'
		return checkResponse(path)
	},

	// Ranking
	getTopPlayerByHero: () => {
		let path = 'https://api.opendota.com/api/rankings'
		return checkResponse(path)
	},

	getBenchmarks: () => {
		let path = 'https://api.opendota.com/api/benchmarks'
		return checkResponse(path)
	},

	// Heroes
	getHeroes: () => {
		let path = 'https://api.opendota.com/api/heroes'
		return checkResponse(path)
	},

	// Leagues
	getLeagues: () => {
		let path = 'https://api.opendota.com/api/leagues'
		return checkResponse(path)
	},

	// Teams
	getTeams: () => {
		let path = 'https://api.opendota.com/api/teams'
		return checkResponse(path)
	},

	// Replays
	getReplays: (matchID) => {
		let path = `https://api.opendota.com/api/replays?match_id=${matchID}`
		return checkResponse(path)
	},

	// Records
	getRecords: (field) => {
		let path = `https://api.opendota.com/api/records/${field}`
		return checkResponse(path)
	},

	getSchema: () => {
		let path = 'https://api.opendota.com/api/schema'
		return checkResponse(path)
	},
}

// FUNCTIONS //
function checkResponse(path, option) {
	if (option) {
		path = addQueryParams(path, option)
	}
	return new Promise((resolve, reject) => {
		Request(path, (err, resp, body) => {
			if (!err && resp.statusCode == 200) { // response OK
				let data = JSON.parse(body)
				resolve(data)
			} else { // found error
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
	path = path.slice(0, -1) // remove last character '&'
	return path
}

function convert64To32(steam64) {
	let x = new BigNumber(steam64).minus('76561197960265728')
	return x.c[0]
}

function convert32To64(steam34) {
	let x = new BigNumber(steam34).plus('76561197960265728')
	return x.c[0]
}

// export functions //
module.exports = exported
