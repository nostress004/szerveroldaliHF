var requireOption = require('../common').requireOption;
const mongoose = require('mongoose');

module.exports = function(objectrepository) {
  var orderModel = requireOption(objectrepository, 'orderModel');

  return async function(req, res, next) {
    if (
      typeof res.tpl.user === 'undefined' ||
      typeof req.params.orderid === 'undefined'
    ) {
      return next();
    }

    var order = { _id: req.params.orderid };

    orderModel
      .find(order)
      .remove()
      .exec();

    const orders = orderModel.find({});
    res.tpl.orders = orders || [];

    return next();
  };
};
