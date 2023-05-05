const jwt = require('jsonwebtoken');
const ErrorService = require('../services/ErrorService');
const UserService = require('../services/UserService');
const { logger } = require('../utils/logger');

const {
  TYPE_DO_ADMIN, TYPE_DO_UPLOADER,
  UNAUTHORIZED, ERR_TOKEN_EXPIRED, TYPE_SP_ADMIN,
} = require('../constants');

async function authorizeGetOrgs(req, res, next) {
  try {
    const token = req.header('x-authToken');
    if (!token) {
      next(new ErrorService(401, 'Unauthorized access', UNAUTHORIZED));
      return;
    }
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);

    if (verified.email && verified.user_type) {
      if (![TYPE_SP_ADMIN, TYPE_DO_ADMIN].includes(verified.user_type)
      ) {
        next(new ErrorService(401, 'Unauthorized access', UNAUTHORIZED));
        return;
      }

      if (!req.query.orgId) {
        if (verified.user_type !== TYPE_SP_ADMIN) {
          next(new ErrorService(401, 'Unauthorized access', UNAUTHORIZED));
          return;
        }
        next();
        return;
      }

      if (verified.user_type !== TYPE_SP_ADMIN) {
        const user = await UserService.findByEmailInOrg(req.query.orgId, verified.email);

        if (!user) {
          next(new ErrorService(401, 'Unauthorized access', UNAUTHORIZED));
          return;
        }
      }

      logger.info(`${verified.email} authorized for ${req.method} ${req.originalUrl}`);
      next();
    } else {
      next(new ErrorService(401, 'Invalid token', UNAUTHORIZED));
    }
  } catch (err) {
    if (err.name === ERR_TOKEN_EXPIRED) {
      next(new ErrorService(401, 'Token expired', UNAUTHORIZED));
      return;
    }
    next(ErrorService.internal(err.message));
  }
}

async function authorizeUpdateOrg(req, res, next) {
  try {
    const token = req.header('x-authToken');
    if (!token) {
      next(new ErrorService(401, 'Unauthorized access', UNAUTHORIZED));
      return;
    }
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);

    if (verified.email && verified.user_type) {
      if (!req.body.org_id) {
        next(ErrorService.badRequest('Organization id is a required field'));
        return;
      }

      if (verified.user_type == TYPE_SP_ADMIN) {
        next();
      } else {
        const user = await UserService.findByEmailInOrg(req.body.org_id, verified.email);
        console.log("USER: ", user);
        if (!user) {
          next(new ErrorService(401, 'Unauthorized access', UNAUTHORIZED));
          return;
        }
        if (verified.user_type !== TYPE_SP_ADMIN) {
          next(new ErrorService(401, 'Unauthorized access', UNAUTHORIZED));
          return;
        }

        logger.info(`${verified.email} authorized for ${req.method} ${req.originalUrl}`);
        next();
      }
    } else {
      next(new ErrorService(401, 'Invalid token', UNAUTHORIZED));
      // return;
    }
  } catch (err) {
    if (err.name === ERR_TOKEN_EXPIRED) {
      next(new ErrorService(401, 'Token expired', UNAUTHORIZED));
      return;
    }
    next(ErrorService.internal(err.message));
  }
}

module.exports = {
  authorizeUpdateOrg, authorizeGetOrgs,
};
