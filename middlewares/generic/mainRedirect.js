/**
 * This middleware has one purpose, when the user visits the / main page,
 * should be redirected to
 *    - /login when not signed in
 *    - /tasks when signed in
 */
module.exports = function(objectrepository) {
  return function(req, res, next) {
    if (req.session && req.session.hasOwnProperty('user')) {
      return res.redirect('/home');
    } else {
      return res.redirect('/login');
    }
  };
};
