const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ErrorService = require('../services/ErrorService');
const {
  TYPE_SP_ADMIN,
  NF,
  UNAUTHORIZED,
} = require('../constants');
const {
  userLoginValidation,
} = require('../validations/user');

const poLogin = async (req, res, next) => {
  try {
    const { error } = userLoginValidation(req.body);
    if (error) {
      // return res.status(400).send(error.details[0].message);
      next(ErrorService.badRequest(error.details[0].message));
      return;
    }
    if (req.body.email != process.env.USER_NAME) {
      // return res.status(401).send('Invalid Username or Password');
      next(new ErrorService(404, 'Invalid Email or Password', NF));
      return;
    }

    const passCheck = bcrypt.compareSync(req.body.password, process.env.PASSWORD);

    if (!passCheck) {
      // return res.status(401).send('Invalid password');
      next(new ErrorService(401, 'Invalid Email or Password', UNAUTHORIZED));
      return;
    }
    // Set Token
    const token = jwt.sign(
      { email: req.body.email, user_type: TYPE_SP_ADMIN },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.EXPIRES_IN },
    );

    // // Add to Header
    res.header('x-authToken', token);
    res.status(200).send('SuccessFully Logged In');
  } catch (err) {
    next(ErrorService.internal(err.message));
  }
};

module.exports = {
  poLogin,
};
