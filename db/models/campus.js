const db = require('../index')
const Sequelize = db.Sequelize

module.exports = db.define('campus', {
	name : Sequelize.STRING,
  image: {
    type: Sequelize.VIRTUAL,
    get: function () {
      return `/api/campuses/${this.id}/image`;
    }
  }
})


