var requireOption = require('../common').requireOption;

module.exports = function(objectrepository, userRight) {
  var userModel = requireOption(objectrepository, 'userModel');
  var pizzaModel = requireOption(objectrepository, 'pizzaModel');

  return async function(req, res, next) {
    if (
      typeof res.tpl.user._id === 'undefined' ||
      typeof req.params.pizzaid === 'undefined'
    ) {
      return next();
    }

    const pizzaToCart = await pizzaModel.find({ _id: req.params.pizzaid });

    if (pizzaToCart.length !== 1) {
      return next();
    }
    var query = { _id: res.tpl.user._id };

    userModel.findOneAndUpdate(
      query,
      {
        $push: {
          cart: { name: pizzaToCart[0].name, price: pizzaToCart[0].price }
        }
      },
      {
        upsert: true
      },
      function(err, doc) {
        if (err) return res.send(500, { error: err });
      }
    );
    const pizzas = await pizzaModel.find({});

    const user = userModel.find({ _id: res.tpl.user._id });

    res.tpl.user = user;
    res.tpl.pizzas = pizzas || [];

    return next();
  };
};
