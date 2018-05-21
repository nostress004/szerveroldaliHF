var requireOption = require('../common').requireOption;

/**
 * Check if the email address is already registered, if not
 * create the user (no extra checks on password)
 */
module.exports = function(objectrepository) {
  var UserModel = requireOption(objectrepository, 'userModel');

  return function(req, res, next) {
    //not enough parameter
    // TODO
    if (
      typeof req.body === 'undefined' ||
      typeof req.body.name === 'undefined' ||
      typeof req.body.email === 'undefined' ||
      typeof req.body.address === 'undefined' ||
      typeof req.body.phone === 'undefined' ||
      typeof req.body.password1 === 'undefined'
    ) {
      return next();
    }

    //lets find the user
    UserModel.findOne(
      {
        email: req.body.email
      },
      function(err, result) {
        if (err || result) {
          res.tpl.error.push('Your email address is already registered!');
          return next();
        }

        if (req.body.password1 !== req.body.password2) {
          res.tpl.error.push("Passwords don't match");
          return next();
        }

        //create user
        var newUser = new UserModel();
        newUser.name = req.body.name;
        newUser.address = req.body.address;
        newUser.email = req.body.email;
        newUser.phone = req.body.phone;
        newUser.password = req.body.password1;
        newUser.save(function(err) {
          //redirect to /login
          return res.redirect('/login');
        });
      }
    );
  };
};
