const express = require('express');
const poRoute = require('./po');
const orgRoute = require('./organization');
const userRoute = require('./user');

module.exports = (config) => {
  const router = express.Router();
  router.use('/po', poRoute(config));
  router.use('/user', userRoute(config));
  router.use('/organization', orgRoute(config));
  return router;
};
