const requireOption = require('../common').requireOption;
/**
 * Delete the menu list
 */

module.exports = function(objectrepository) {
  let pizzaModel = requireOption(objectrepository, 'pizzaModel');

  return async function(req, res, next) {
    const pizzas = await pizzaModel.find({});

    res.tpl.pizzas = pizzas;
    return next();
  };
};
