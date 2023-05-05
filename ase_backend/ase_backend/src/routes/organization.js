const express = require('express');
const {
  getOrgs,
  updateOrganizationWithFaculties
} = require('../controllers/organization_controller');
const {
   authorizeUpdateOrg, authorizeGetOrgs, 
} = require('../middlewares/organization');

module.exports = (config) => {
  const router = express.Router();

  // Organization's DO_ADMIN modify a specific organization within the related organization
  router.patch('/', authorizeUpdateOrg, updateOrganizationWithFaculties);

  // SP_ADMIN (allowed) to gell all orginzations or specific organization
  // Users within a specific org allowed to get their related org
  router.get('/:orgId?', authorizeGetOrgs, getOrgs);
  return router;
};
