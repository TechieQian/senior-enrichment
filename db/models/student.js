const db = require('../index')
const Sequelize = db.Sequelize

module.exports = db.define('student', {
	name : Sequelize.STRING,
	email : Sequelize.STRING
})


