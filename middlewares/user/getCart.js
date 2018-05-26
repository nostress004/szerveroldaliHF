const requireOption = require('../common').requireOption;
/**
 * Delete the menu list
 */

module.exports = function(objectrepository) {
  let userModel = requireOption(objectrepository, 'userModel');

  return async function(req, res, next) {
    if (!res.tpl.user._id) {
      return next();
    }

    const users = await userModel.find({ _id: res.tpl.user._id });

    res.tpl.user = users[0];
    return next();
  };
};
