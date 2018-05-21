var Schema = require('mongoose').Schema;
var db = require('../config/db');

var User = db.model('User', {
  name: String,
  email: String,
  address: String,
  phone: String,
  password: String,
  cart: [],
  isAdmin: Boolean
});

module.exports = User;
