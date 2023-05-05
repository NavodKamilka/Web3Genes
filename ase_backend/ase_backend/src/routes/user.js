const express = require('express');
const {
  userLogin,
} = require('../controllers/user_controller');

module.exports = (config) => {
  const router = express.Router();

  // Login for users within an organization
  router.post('/login', userLogin);
  return router;
};
