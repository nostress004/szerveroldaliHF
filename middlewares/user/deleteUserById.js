var requireOption = require('../common').requireOption;

/**
 * Load a user (if exists) with the :userid param
 * and put it on res.tpl.user
 */
module.exports = function(objectrepository) {
  var userModel = requireOption(objectrepository, 'userModel');

  return async function(req, res, next) {
    // not enought parameter
    if (typeof req.param('userid') === 'undefined') {
      return next();
    }

    const users = await userModel.remove({ _id: req.param('userid') }).exec();
    const resUsers = await userModel.find({});

    res.tpl.users = resUsers || [];

    return next();
  };
};
