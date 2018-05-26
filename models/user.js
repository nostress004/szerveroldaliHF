var Schema = require('mongoose').Schema;
var db = require('../config/db');

var User = db.model('User', {
  name: String,
  email: String,
  address: String,
  phone: String,
  password: String,
  cart: [],
  // it is true by default because we would not be able to add any items, it should be set to false after the first user registered
  isAdmin: { type: Boolean, default: true }
});

module.exports = User;
