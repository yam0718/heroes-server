const mongojs = require('mongojs');

const configDB = function(){
	// const databaseUrl = 'localhost:27017/dota';
	const databaseUrl = 'mongodb://nextzy:abs204@ds035776.mlab.com:35776/dotapredict';
	const collections = ['heroes'];
	return mongojs(databaseUrl, collections);
};

module.exports = {
	connectDB: configDB
};
