/**
 * If the user is not logged in, redirects to /
 */
module.exports = function(objectrepository) {
  return function(req, res, next) {
    if (typeof req.session.user._id === 'undefined') {
      return res.redirect('/');
    }

    res.tpl.loggedInUserId = req.session.user._id;
    return next();
  };
};
