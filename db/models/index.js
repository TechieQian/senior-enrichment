'use strict';

const 
	Student 	= require('./student'),
	Campus		= require('./campus')

Student.belongsTo(Campus)
Campus.hasMany(Student)

module.exports = {
	Student,
	Campus
}
