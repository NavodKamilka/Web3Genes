const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserService = require('../services/UserService');
const ErrorService = require('../services/ErrorService');
const { logger } = require('../utils/logger');

const {
  userLoginValidation,
} = require('../validations/user');
const {
  STATUS_ACTIVE,
  NF,
  UNAUTHORIZED,
} = require('../constants');

const userLogin = async (req, res, next) => {
  try {
    const { error } = userLoginValidation(req.body);
    if (error) {
      // return res.status(400).send(error.details[0].message);
      next(ErrorService.badRequest(error.details[0].message));
      return;
    }

    let userExists = await UserService.findByEmail(req.body.email);

    if (!userExists) {
      // return res.status(401).send('Invalid Email or Password');
      next(new ErrorService(404, 'Invalid Email or Password', NF));
      return;
    }

    const passCheck = bcrypt.compareSync(
      req.body.password,
      userExists.password,
    );

    if (!passCheck) {
      // return res.status(401).send('Invalid password');
      next(new ErrorService(401, 'Invalid Email or Password', UNAUTHORIZED));
      return;
    }

    if (userExists.status !== STATUS_ACTIVE) {
      // return res.status(401).send('Your account is not activated yet!');
      next(new ErrorService(401, 'Your account is not activated yet', UNAUTHORIZED));
      return;
    }
    // Set Token
    const token = jwt.sign(
      {
        email: userExists.email,
        user_type: userExists.user_type,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.EXPIRES_IN },
    );

    userExists = userExists.toObject();
    delete userExists.password;

    // // Add to Header
    res.header('x-authToken', token);
    res.status(200).send(userExists);
    logger.info(`response: ${userExists.email} SuccessFully Logged In`);
  } catch (err) {
    next(ErrorService.internal(err.message));
  }
};

module.exports = {
  userLogin,
};
