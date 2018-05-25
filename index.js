var express = require('express');
var path = require('path');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');

// Define the port to run on
app.set('port', 3000);
app.use(express.static('public'));
app.set('view engine', 'ejs');

require('./models/user');
require('./models/pizza');
require('./models/order');

app.use(
  session({
    secret: 'dmpn24',
    cookie: {
      maxAge: 60 * 1000 * 10
    },
    resave: true,
    saveUninitialized: false
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Let's creat the .tpl and .error on the res object
 */
app.use(function(req, res, next) {
  res.tpl = {};
  res.tpl.error = [];

  return next();
});

/**
 * Include all the routes
 */
require('./routes/general')(app);
require('./routes/menulist')(app);
require('./routes/orderlist')(app);
require('./routes/userlist')(app);

// Routes
// GET    '/home' home page
// GET    '/login' whenever a user wants to login
// GET    '/profile' our profile
// GET    '/menu' list of menus
// GET    '/menu/:menuid/view' get an item of the menu
// POST   '/menu/:menuid/new' add new menu item
// PUT    '/menu/:menuid/edit' update menu item
// DELETE '/menu/:menuid/delete' delete menu item
// POST   '/menu/:menuid/order' order selected item
// GET    '/orders' view orders (admin mode)
// GET    '/order/:orderid/view' view order
// POST   '/order/:orderid/new' create order
// PUT    '/order/:orderid/edit' update order status
// DELETE '/order/:orderid/delete' delete order
// GET    '/myorders' check my orders

// Middlewares
// getMenuItem
// deleteMenuItem
// updateMenuItem
// getMenuList
// getOrder
// deleteOrder
// updateOrder
// getOrderList
// auth
// checkUserLogin
// inverseAuth
// forgottenPassword
// register
// logout
// mainRedirect
// render

// Listen for requests
var server = app.listen(app.get('port'), () => {
  var port = server.address().port;
  console.log('Listening on:' + port);
});
