const requireOption = require('../common').requireOption;
/**
 * get order list
 */

module.exports = function(objectrepository) {
  let orderModel = requireOption(objectrepository, 'orderModel');

  return async function(req, res, next) {
    const orders = await orderModel.find({});

    res.tpl.orders = orders;
    return next();
  };
};
