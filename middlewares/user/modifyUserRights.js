var requireOption = require('../common').requireOption;

/**
 * Load a user (if exists) with the :userid param
 * and put it on res.tpl.user
 */
module.exports = function(objectrepository, userRight) {
  var userModel = requireOption(objectrepository, 'userModel');

  return async function(req, res, next) {
    if (typeof res.tpl.user._id === 'undefined') {
      return next();
    }

    var query = { _id: res.tpl.user._id };
    userModel.findOneAndUpdate(
      query,
      { isAdmin: userRight },
      { upsert: true },
      function(err, doc) {
        if (err) return res.send(500, { error: err });
        //return res.send(req.user);
      }
    );
    const resUsers = await userModel.find({});

    res.tpl.users = resUsers || [];

    return next();
  };
};
