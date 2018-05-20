const nodemailer = require('nodemailer');
const requireOption = require('../common').requireOption;

/**
 * Sends forgotten pawwword to user
 */
module.exports = objectrepository => {
  let userModel = requireOption(objectrepository, 'userModel');

  return (req, res, next) => {
    console.log('sendPasswordMW1');
    if (
      !req.body.forgottenemail ||
      req.body.forgottenemail === 'undefined' ||
      req.body.forgottenemail === null
    ) {
      return next();
    }
    console.log('sendPasswordMW2');
    userModel.findOne({ email: req.body.forgottenemail }, (err, result) => {
      if (err || result == null) {
        res.tpl.error.push('This email address is not registered!');
        return next();
      }

      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'felhasznalonevfoglalt89@gmail.com',
          pass: 'ezcsakegyteszt'
        }
      });

      console.log(transporter);
      const mailOptions = {
        from: 'Pizza Restaurant',
        to: result.email,
        subject: 'Forgotten password',
        text: `Your password for the username ${result.email} is ${
          result.password
        }.`
      };
      console.log('asdasd1');
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      res.redirect('/login');
    });
  };
};
