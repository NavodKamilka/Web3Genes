const ErrorService = require('../services/ErrorService');
const {
  updateOrganizationValidation,
} = require('../validations/organization');
const OrganizationService = require('../services/OrganizationService');
const { logger } = require('../utils/logger');

const updateOrganizationWithFaculties = async (req, res, next) => {
  try {
    const { error } = updateOrganizationValidation(req.body);
    if (error) {
      next(ErrorService.badRequest(error.details[0].message));
      return;
    }
    if (req.body.up_org.org_contact_nums) {
      const {
        validate, data, status, type,
      } = await OrganizationService.checkNonExistingContactId(
        req.body.org_id,
        req.body.up_org.org_contact_nums,
      );

      if (!validate) {
        next(new ErrorService(status, data, type));
        return;
      }
    }

    if (req.body.up_org.faculties) {
      const {
        validate, data, status, type,
      } = await OrganizationService.validateExistingFacultyId(
        req.body.org_id,
        req.body.up_org.faculties,
      );

      if (!validate) {
        next(new ErrorService(status, data, type));
        return;
      }

      const {
        validate: v2,
        data: d2,
        status: s2,
        type: t2,
      } = await OrganizationService.validateExistingFacultyPrograms(
        req.body.org_id,
        req.body.up_org.faculties,
      );

      if (!v2) {
        next(new ErrorService(s2, d2, t2));
        return;
      }
    }

    const result = await OrganizationService.updateOne(
      req.body.org_id,
      req.body.up_org,
    );

    res.status(200).send(result);
    logger.info(`Orgnizatin ${req.body.org_id} modified`);
  } catch (err) {
    next(ErrorService.internal(err.message));
  }
};

const getOrgs = async (req, res, next) => {
  try {
    let result;
    if (req.query.orgId) {
      result = await OrganizationService.findById(req.query.orgId);
    } else {
      result = await OrganizationService.getAll();
    }
    res.status(200).send(result);
  } catch (err) {
    next(ErrorService.internal(err.message));
  }
};

module.exports = {
  updateOrganizationWithFaculties,
  getOrgs,
};
