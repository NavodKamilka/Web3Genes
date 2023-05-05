const { logger } = require('../utils/logger');

function requestLogger(req, res, next) {
  logger.info(`Calling ${req.method} ${req.url}`);
  next();
}

function errorLogger(err, req, res, next) {
  logger.error({ err, req, res });
  next();
}

module.exports = { requestLogger, errorLogger };
