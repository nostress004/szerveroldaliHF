const renderMW = require('../middlewares/generic/render');
const authMW = require('../middlewares/generic/auth');
const redirectMW = require('../middlewares/generic/mainRedirect');
const getUserListMW = require('../middlewares/user/getUserList');
const getUserByIdMW = require('../middlewares/user/getUserById');
const deleteUserByIdMW = require('../middlewares/user/deleteUserById');
const modifyUserRightsMW = require('../middlewares/user/modifyUserRights');
const modifyUserInfoMW = require('../middlewares/user/modifyUserInfo');
const userModel = require('../models/user');

module.exports = function(app) {
  let objectRepository = {
    userModel
  };

  app.get(
    '/users',
    authMW(objectRepository),
    getUserListMW(objectRepository),
    renderMW({}, 'admin-userlist')
  );

  app.get('/cart', authMW(objectRepository), renderMW({}, 'cart'));

  app.get(
    '/user/:userid/delete',
    authMW(objectRepository),
    deleteUserByIdMW(objectRepository),
    renderMW({}, 'admin-userlist')
  );

  app.get(
    '/user/:userid/adminize',
    authMW(objectRepository),
    modifyUserRightsMW(objectRepository, true),
    renderMW({}, 'admin-userlist')
  );

  app.get(
    '/user/:userid/userize',
    authMW(objectRepository),
    modifyUserRightsMW(objectRepository, false),
    renderMW({}, 'admin-userlist')
  );

  app.get('/profile', authMW(objectRepository), renderMW({}, 'profile'));

  app.post(
    '/profile/modify',
    authMW(objectRepository),
    modifyUserInfoMW(objectRepository),
    renderMW({}, 'profile')
  );
};
