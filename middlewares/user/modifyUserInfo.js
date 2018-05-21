var requireOption = require('../common').requireOption;

/**
 * Load a user (if exists) with the :userid param
 * and put it on res.tpl.user
 */
module.exports = function(objectrepository, userRight) {
  var userModel = requireOption(objectrepository, 'userModel');

  return async function(req, res, next) {
    if (
      typeof res.tpl.user._id === 'undefined' ||
      typeof req.body === 'undefined' ||
      typeof req.body.name === 'undefined' ||
      typeof req.body.email === 'undefined' ||
      typeof req.body.address === 'undefined' ||
      typeof req.body.phone === 'undefined' ||
      typeof req.body.password1 === 'undefined' ||
      req.body.password1 !== req.body.password2
    ) {
      return next();
    }

    var query = { _id: res.tpl.user._id };

    userModel.findOneAndUpdate(
      query,
      {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        password: req.body.password1
      },
      {
        upsert: true
      },
      function(err, doc) {
        if (err) return res.send(500, { error: err });
        //return res.send(req.user);
      }
    );
    const resUsers = await userModel.find({});

    res.tpl.user = resUsers[0] || {};

    return next();
  };
};
