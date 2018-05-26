/**
 * If the user is logged in, redirects to /
 */
module.exports = function(objectrepository) {
  return function(req, res, next) {
    if (req.session && req.session.hasOwnProperty('user')) {
      return res.redirect('/');
    }
    res.tpl.user = undefined;
    return next();
  };
};
