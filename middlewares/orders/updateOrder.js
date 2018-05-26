var requireOption = require('../common').requireOption;
const mongoose = require('mongoose');

/**
 * Load a pizza (if exists) with the :pizzaid param
 * and redirect
 */
module.exports = function(objectrepository, status) {
  var orderModel = requireOption(objectrepository, 'orderModel');
  var pizzaModel = requireOption(objectrepository, 'pizzaModel');
  var userModel = requireOption(objectrepository, 'userModel');

  return async function(req, res, next) {
    if (
      typeof res.tpl.user === 'undefined' ||
      typeof req.params.orderid === 'undefined'
    ) {
      return next();
    }

    var order = { _id: req.params.orderid };

    orderModel.findOneAndUpdate(
      order,
      {
        status: status
      },
      {
        upsert: true
      },
      function(err, doc) {
        if (err) return res.send(500, { error: err });
      }
    );

    const resOrders = await orderModel.find({});

    res.tpl.orders = resOrders || [];

    return next();
  };
};
