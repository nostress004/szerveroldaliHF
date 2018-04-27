var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Pizza = db.model('Pizza', {
  name: String,
  description: String,
  price: Number
});

module.exports = Pizza;
