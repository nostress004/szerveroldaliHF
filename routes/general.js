var mainRedirectMW = require('../middlewares/generic/mainRedirect');
var inverseAuthMW = require('../middlewares/generic/inverseAuth');
var renderMW = require('../middlewares/generic/render');
var authMW = require('../middlewares/generic/auth');
var logoutMW = require('../middlewares/generic/logout');
var checkUserLoginMW = require('../middlewares/user/checkUserLogin');
var checkUserRegistrationMW = require('../middlewares/user/checkUserRegistration');

var userModel = require('../models/user');

module.exports = function(app) {
  var objectRepository = {
    userModel: userModel
  };

  /**
   * Main page
   */
  app.get('/', mainRedirectMW(objectRepository));

  /**
   * Login page
   */
  app.use(
    '/login',
    inverseAuthMW(objectRepository),
    checkUserLoginMW(objectRepository),
    renderMW(objectRepository, 'login')
  );

  /**
   * Main page
   */
  app.get('/logout', logoutMW(objectRepository), function(req, res, next) {
    res.redirect('/');
  });

  /**
   * Registration
   */
  app.use(
    '/register',
    inverseAuthMW(objectRepository),
    checkUserRegistrationMW(objectRepository),
    renderMW(objectRepository, 'register')
  );
};
