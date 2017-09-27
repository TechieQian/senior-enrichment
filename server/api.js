'use strict'
const api = require('express').Router()
const db = require('../db')

api.use('/campuses', require('./campuses'));
api.use('/students', require('./students'));

module.exports = api
