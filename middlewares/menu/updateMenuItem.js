var requireOption = require('../common').requireOption;
const mongoose = require('mongoose');

/**
 * Load a pizza (if exists) with the :pizzaid param
 * and redirect
 */
module.exports = function(objectrepository) {
  var pizzaModel = requireOption(objectrepository, 'pizzaModel');

  return async function(req, res, next) {
    if (
      typeof req.body === 'undefined' ||
      typeof req.body.name === 'undefined' ||
      typeof req.body.description === 'undefined' ||
      typeof req.body.price === 'undefined'
    ) {
      return next();
    }

    var query = { _id: req.params.pizzaid };

    if (!query._id) {
      query._id = new mongoose.mongo.ObjectID();
    }

    pizzaModel.findOneAndUpdate(
      query,
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
      },
      {
        upsert: true
      },
      function(err, doc) {
        if (err) return res.send(500, { error: err });
      }
    );

    const resPizzas = await pizzaModel.find({});

    res.tpl.pizzas = resPizzas || [];

    return next();
  };
};
