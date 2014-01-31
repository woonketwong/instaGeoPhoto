var path = require('path'),
rootPath = path.normalize(__dirname + '/../..');

module.exports = {
	root: rootPath,
	port: process.env.PORT || 5000,
    db: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL    
}
