var Schema = require('mongoose').Schema;
var db = require('../config/db');

const userModel = require('../models/user');

var Order = db.model('Order', {
  person: String,
  date: {
    type: Date,
    // `Date.now()` returns the current unix timestamp as a number
    default: Date.now
  },
  subtotal: Number,
  status: String
});

module.exports = Order;
