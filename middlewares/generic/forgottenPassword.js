const nodemailer = require('nodemailer');
const requireOption = require('../common').requireOption;
/**
 * Sends forgotten password to user
 */
module.exports = objectrepository => {
  let userModel = requireOption(objectrepository, 'userModel');

  return (req, res, next) => {
    if (
      !req.body.forgottenemail ||
      req.body.forgottenemail === 'undefined' ||
      req.body.forgottenemail === null
    ) {
      return next();
    }
    userModel.findOne({ email: req.body.forgottenemail }, (err, result) => {
      if (err || result == null) {
        res.tpl.error.push('This email address is not registered!');
        return next();
      }
      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'szerveroldalihftestemail@gmail.com',
          pass: 'Asddsa123'
        }
      });

      const mailOptions = {
        from: 'Pizza Restaurant',
        to: result.email,
        subject: 'Forgotten password',
        text: `Your password for the username ${result.email} is ${
          result.password
        }.`
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('It might take a while...e-mail sent: ' + info.response);
        }
      });

      res.redirect('/login');
    });
  };
};
