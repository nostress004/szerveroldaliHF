const requireOption = require('../common').requireOption;
/**
 * Delete the menu list
 */

module.exports = function(objectrepository, id) {
  let pizzaModel = requireOption(objectrepository, 'pizzaModel');

  return async function(req, res, next) {
    const pizzas = await pizzaModel.find({ _id: req.params.id });
    res.tpl.pizza = pizzas[0];
    return next();
  };
};
