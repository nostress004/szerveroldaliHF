const requireOption = require('../common').requireOption;

/**
 * Create (or update) pizza
 */
module.exports = objectrepository => {
  let pizzaModel = requireOption(objectrepository, 'pizzaModel');

  return async function(req, res, next) {
    // not enought parameter
    if (typeof req.params.pizzaid === 'undefined') {
      return next();
    }

    const pizzas = await pizzaModel.remove({ _id: req.params.pizzaid }).exec();
    const resPizzas = await pizzaModel.find({});

    res.tpl.pizzas = resPizzas || [];
  };
};
