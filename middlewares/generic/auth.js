/**
 * If the user is not logged in, redirects to /
 */
module.exports = function(objectrepository) {
  return function(req, res, next) {
    if (!req.session.hasOwnProperty('user')) {
      return res.redirect('/');
    }

    res.tpl.user = req.session.user;
    return next();
  };
};
