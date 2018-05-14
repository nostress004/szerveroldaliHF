const renderMW = require('../middlewares/generic/render');
const authMW = require('../middlewares/generic/render');
const addNewPIzza = require('../middlewares/generic/render');
const redirectMW = require('../middlewares/generic/render');
// mock data
const data = require('../mockData/data');

const pizzaModel = require('../models/pizza');

module.exports = function(app) {
  let obejectRepository = {
    pizzaModel
  };

  app.get(
    '/menu',
    (req, res, next) => {
      res.tpl.pizzas = data.pizzas;
      next();
    },
    renderMW({}, 'menulist')
  );

  app.get(
    '/add',
    (req, res, next) => {
      res.tpl.pizzas = data.pizzas;
      next();
    },
    renderMW({}, 'add')
  );
  app.post(
    '/pizza/add',
    authMW(obejectRepository),
    addNewPIzza(obejectRepository),
    redirectMW('/menu')
  );

  app.get(
    '/admin-menu',
    (req, res, next) => {
      res.tpl.pizzas = data.pizzas;
      next();
    },
    renderMW({}, 'admin-menu')
  );
};
