const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


const userIdRequired = Joi.objectId().required().messages({
  'any.required': 'Please select a user',
  'string.pattern.name': 'Invalid user objectId',
});


const userLoginValidation = (data) => {
  const userSchema = Joi.object({
    email: Joi.string().required().email().messages({
      'string.empty': 'Email cannot be an empty field',
      'any.required': 'Email is a required field',
      'string.email': 'Email must be a valid email',
    }),
    password: Joi.string().required().messages({
      'string.empty': 'Password cannot be an empty field',
      'any.required': 'Password is a required field',
    }),
  });

  return userSchema.validate(data);
};

module.exports = {
  userLoginValidation,
};
