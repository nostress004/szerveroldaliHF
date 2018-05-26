var requireOption = require('../common').requireOption;
const mongoose = require('mongoose');

module.exports = function(objectrepository) {
  var orderModel = requireOption(objectrepository, 'orderModel');
  var pizzaModel = requireOption(objectrepository, 'pizzaModel');
  var userModel = requireOption(objectrepository, 'userModel');

  return async function(req, res, next) {
    if (typeof res.tpl.user === 'undefined') {
      return next();
    }

    var order = { _id: new mongoose.mongo.ObjectID() };

    var sum = 0;
    res.tpl.user.cart.forEach(element => {
      sum += element.price;
    });

    var pizzasTMP = [];

    res.tpl.user.cart.forEach(element => {
      pizzasTMP.push(element.name);
    });

    orderModel.findOneAndUpdate(
      order,
      {
        customerName: res.tpl.user.name || '',
        customerEmail: res.tpl.user.email || '',
        customerAddress: res.tpl.user.address || '',
        customerPhone: res.tpl.user.phone || '',
        pizzas: pizzasTMP || '',
        subtotal: sum
      },
      {
        upsert: true
      },
      function(err, doc) {
        if (err) return res.send(500, { error: err });
      }
    );

    var query = { _id: res.tpl.user._id };

    const user = await userModel.findOneAndUpdate(
      query,
      {
        cart: []
      },
      {
        upsert: true
      },
      function(err, doc) {
        if (err) return res.send(500, { error: err });
      }
    );

    res.tpl.user = user || {};

    return next();
  };
};
