const requireOption = require('../common').requireOption;

/**
 * Create (or update) pizza
 */
module.exports = objectrepository => {
  let pizzaModel = requireOption(objectrepository, 'pizzaModel');

  return (req, res, next) => {
    if (
      typeof req.body.name === 'undefined' ||
      typeof req.body.description === 'undefined' ||
      typeof req.body.price === 'undefined'
    ) {
      return next();
    }

    let pizza = undefined;
    if (typeof res.tpl.pizza !== 'undefined') {
      pizza = res.tpl.pizza;
    } else {
      pizza = new pizzaModel();
    }
    pizza.name = req.body.name;
    pizza.description = req.body.description;
    pizza.price = req.body.price;

    pizza.save((err, result) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/admin-menu');
    });
  };
};
