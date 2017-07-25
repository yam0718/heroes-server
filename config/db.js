const mongojs = require('mongojs')

const configDB = function(selector) {
	let databaseUrl = ""
	const collections = ['heroes']

	if (selector === 'local') {
		databaseUrl = 'localhost:27017/dota'
	} else {
		databaseUrl = 'mongodb://nextzy:abs204@ds035776.mlab.com:35776/dotapredict'
	}
	return mongojs(databaseUrl, collections)
};

module.exports = {
	connectDB: configDB
}
