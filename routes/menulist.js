const renderMW = require('../middlewares/generic/render');
const authMW = require('../middlewares/generic/auth');
const redirectMW = require('../middlewares/generic/mainRedirect');
const checkUserLoginMW = require('../middlewares/user/checkUserLogin');
const updateMenuItemMW = require('../middlewares/menu/updateMenuItem');
const getMenuListMW = require('../middlewares/menu/getMenuList');
const pizzaToCartMW = require('../middlewares/menu/pizzaToCart');
const getMenuItemMW = require('../middlewares/menu/getMenuItem');
const deleteMenuItemMW = require('../middlewares/menu/deleteMenuItem');

const pizzaModel = require('../models/pizza');
const userModel = require('../models/user');
const orderModel = require('../models/order');

module.exports = function(app) {
  let objectRepository = {
    pizzaModel,
    userModel,
    orderModel
  };

  app.get(
    '/menu',
    authMW(objectRepository),
    getMenuListMW(objectRepository),
    renderMW({}, 'menulist')
  );

  // add new pizza item
  app.get('/add', authMW(objectRepository), renderMW({}, 'add'));

  app.post(
    '/add',
    authMW(objectRepository),
    updateMenuItemMW(objectRepository),
    renderMW({}, 'admin-menu')
  );

  app.get(
    '/admin-menu',
    authMW(objectRepository),
    getMenuListMW(objectRepository),
    renderMW({}, 'admin-menu')
  );

  app.post(
    '/pizza/:pizzaid/modify',
    authMW(objectRepository),
    updateMenuItemMW(objectRepository),
    (req, res) => {
      res.redirect('/admin-menu');
    }
  );

  app.get(
    '/pizza/:pizzaid/modify',
    authMW(objectRepository),
    getMenuItemMW(objectRepository),
    renderMW({}, 'add')
  );

  app.get(
    '/pizza/:pizzaid/delete',
    authMW(objectRepository),
    deleteMenuItemMW(objectRepository),
    (req, res) => {
      res.redirect('/admin-menu');
    }
  );

  app.get(
    '/pizza/:pizzaid/addtocart',
    authMW(objectRepository),
    pizzaToCartMW(objectRepository),
    (req, res) => {
      res.redirect('/menu');
    }
  );
};
