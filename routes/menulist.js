const renderMW = require('../middlewares/generic/render');
const authMW = require('../middlewares/generic/auth');
const redirectMW = require('../middlewares/generic/mainRedirect');
const checkUserLoginMW = require('../middlewares/user/checkUserLogin');
const updateMenuItemMW = require('../middlewares/menu/updateMenuItem');
const getMenuListMW = require('../middlewares/menu/getMenuList');
const getMenuItemMW = require('../middlewares/menu/getMenuItem');

// mock data
const data = require('../mockData/data');

const pizzaModel = require('../models/pizza');

module.exports = function(app) {
  let objectRepository = {
    pizzaModel
  };

  app.get(
    '/menu',
    authMW(objectRepository),
    getMenuListMW(objectRepository),
    renderMW({}, 'menulist')
  );

  // add new pizza item
  app.get(
    '/add',
    authMW(objectRepository),
    (req, res, next) => {
      res.tpl.pizzas = data.pizzas;
      next();
    },
    renderMW({}, 'add')
  );

  app.post(
    '/add',
    authMW(objectRepository),
    updateMenuItemMW(objectRepository),
    renderMW({}, 'add')
  );

  app.get(
    '/admin-menu',
    authMW(objectRepository),
    getMenuListMW(objectRepository),
    renderMW({}, 'admin-menu')
  );

  app.get(
    '/pizza/:id/modify',
    authMW(objectRepository),
    getMenuItemMW(objectRepository),
    renderMW({}, 'add')
  );
};
