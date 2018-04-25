module.exports = function(app) {
  /**
   * Main page
   */
  app.get('/home');

  /**
  //  * Login page
  //  */
  // app.use('/login');

  // /**
  //  * Main page

  app.get('/register');

  app.get('/forgotten');

  app.get('/profile');

  app.get('/logout');
};
