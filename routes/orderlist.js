const renderMW = require('../middlewares/generic/render');
const authMW = require('../middlewares/generic/auth');
const redirectMW = require('../middlewares/generic/mainRedirect');
const checkUserLoginMW = require('../middlewares/user/checkUserLogin');
const getOrderListMW = require('../middlewares/orders/getOrderList');
const updateOrderMW = require('../middlewares/orders/updateOrder');
const placeOrderMW = require('../middlewares/orders/placeOrder');
const deleteOrderMW = require('../middlewares/orders/deleteOrder');
const pizzaModel = require('../models/pizza');
const userModel = require('../models/user');
const orderModel = require('../models/order');

module.exports = function(app) {
  let objectRepository = {
    orderModel,
    pizzaModel,
    userModel
  };

  app.get(
    '/orders',
    authMW(objectRepository),
    getOrderListMW(objectRepository),
    renderMW({}, 'admin-orders')
  );

  app.get(
    '/order',
    authMW(objectRepository),
    placeOrderMW(objectRepository),
    (req, res) => {
      res.redirect('/cart');
    }
  );

  app.get(
    '/order/:orderid/deliver',
    authMW(objectRepository),
    updateOrderMW(objectRepository, 'delivered'),
    (req, res) => {
      res.redirect('/orders');
    }
  );

  app.get(
    '/order/:orderid/finish',
    authMW(objectRepository),
    updateOrderMW(objectRepository, 'finished'),
    (req, res) => {
      res.redirect('/orders');
    }
  );

  app.get(
    '/order/:orderid/delete',
    authMW(objectRepository),
    deleteOrderMW(objectRepository),
    (req, res) => {
      res.redirect('/orders');
    }
  );
};
