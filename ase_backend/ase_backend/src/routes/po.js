const express = require('express');
const { poLogin } = require('../controllers/po_controller');

module.exports = (config) => {
  const router = express.Router();
  // SUPER_ADMIN Login
  router.post('/', poLogin);
  return router;
};
