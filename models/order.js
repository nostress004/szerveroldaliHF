var Schema = require('mongoose').Schema;
var db = require('../config/db');

const pizzaModel = require('../models/pizza');

var Order = db.model('Order', {
  customerID: Schema.Types.ObjectId,
  customerName: String,
  customerAddress: String,
  customerPhone: String,
  customerEmail: String,
  pizzas: [String],
  subtotal: Number,
  status: { type: String, default: 'ordered' },
  ordered: { type: Date, default: Date.now }
});

module.exports = Order;
