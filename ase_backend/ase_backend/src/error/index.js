const ErrorService = require('../services/ErrorService');
const { logger } = require('../utils/logger');

function apiErrorHandler(err, req, res, next) {
  // console.error(err);

  if (err instanceof ErrorService) {
    res.status(err.code).json({ message: err.message, type: err.type });
    logger.error(`${req.method} ${req.originalUrl} ${err.type}, status: ${err.code}, message:${err.message}`);
    return;
  }

  res.status(500).json('something went wrong');
}

module.exports = apiErrorHandler;
