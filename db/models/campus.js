const db = require('../index')
const Sequelize = db.Sequelize

module.exports = db.define('campus', {
	name : Sequelize.STRING,
	image : Sequelize.STRING
})


