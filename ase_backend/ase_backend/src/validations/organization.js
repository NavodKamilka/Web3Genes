const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const orgIdRequired = Joi.objectId().required().messages({
  'any.required': 'Organization id is required',
  'string.pattern.name': 'Invalid {#key}',
});

const facultyOid = Joi.objectId().messages({ 'string.pattern.name': 'Invalid FacultyId' });

const fcltyOidReq = Joi.objectId().required().messages({ 'any.required': 'FacultyId is required url parameter', 'string.pattern.name': 'Invalid faculty objectId' });

const addOrganizationValidation = (data) => {
  const addressSchema = Joi.object().keys({
    add_no: Joi.string().trim().required().max(10)
      .messages({
        'any.required': 'Address number is required',
        'string.empty': 'Address number cannot be an empty field',
        'string.max': 'Maximum charater limit for address number is {#limit}',
        'string.base': 'Address number must be a string',
      }),
    add_line1: Joi.string().required().max(30).messages({
      'any.required': 'Address line 1 is required',
      'string.empty': 'Address line 1 cannot be an empty field',
      'string.max': 'Maximum charater limit for address line 1 is {#limit}',
      'string.base': 'Address line 1 must be a string',
    }),
    add_line2: Joi.string().trim().required().max(30)
      .allow('')
      .messages({
        'any.required': 'Address line 2 is required',
        'string.max': 'Maximum charater limit for address line 2 is {#limit}',
        'string.base': 'Address line 2 must be a string',
      }),
    city: Joi.string().required().max(30).required()
      .messages({
        'any.required': 'City is required',
        'string.empty': 'City cannot be an empty field',
        'string.max': 'Maximum charater limit for city is {#limit}',
        'string.base': 'City must be a string',
      }),
  });

  const contactSchema = Joi.object()
    .required()
    .keys({
      contact_type: Joi.string().required().max(10).messages({
        'string.empty': 'Contact type cannot be an empty field',
        'any.required': 'Contact type is a required field',
        'string.max': 'Maximum charater limit for contact type is {#limit}',
        'string.base': 'Contact type must be a string',
      }),
      contact_number: Joi.string().max(15).messages({
        'string.empty': 'Contact number cannot be an empty field',
        'any.required': 'Contact number is a required field',
        'string.max': 'Maximum charater limit for contact number is {#limit}',
        'string.base': 'Contact number must be a string',
      }),
    });

  const organizationSchema = Joi.object().keys({
    org_name: Joi.string().required().max(50).messages({
      'any.required': 'Organization name is required',
      'string.empty': 'Organization name cannot be an empty field',
      'string.max': 'Maximum charater limit for organization name is {#limit}',
      'string.base': 'Organization name must be a string',
    }),
    org_reg_no: Joi.string().required().max(50).messages({
      'any.required': 'Organization registration number is required',
      'string.empty': 'Organization registration number cannot be an empty field',
      'string.max': 'Maximum charater limit for organization registration number is {#limit}',
      'string.base': 'Organization registration number must be a string',
    }),
    org_address: addressSchema.required().messages({
      'any.required': 'org_address is required',
    }),
    org_contact_nums: Joi.array()
      .required()
      .min(1)
      .items(contactSchema)
      .unique('contact_number')
      .messages({
        'any.required': 'org_contact_nums is required',
        'array.unique': 'Duplicate {#path} found for contact numbers',
        'array.includesRequiredUnknowns': 'org_contact_nums must contain at least 1 element',
      }),
  });

  return organizationSchema.validate(data);
};

const updateOrganizationValidation = (data) => {
  const upOrgAddressSchema = Joi.object().keys({
    add_no: Joi.string().max(10).messages({
      'string.empty': 'Address number cannot be an empty field',
      'string.max': 'Maximum charater limit for address number is {#limit}',
      'string.base': 'Address number must be a string',
    }),
    add_line1: Joi.string().max(30).messages({
      'string.empty': 'Address line 1 cannot be an empty field',
      'string.max': 'Maximum charater limit for address line 1 is {#limit}',
      'string.base': 'Address line 1 must be a string',
    }),
    add_line2: Joi.string().messages({
      'string.empty': 'Address line 2 cannot be an empty field',
      'string.base': 'Address line 2 must be a string',
    }),
    city: Joi.string().max(30).required().messages({
      'string.empty': 'City cannot be an empty field',
      'string.max': 'Maximum charater limit for city is {#limit}',
      'string.base': 'City must be a string',
    }),
  });

  const upOrgContactSchema = Joi.object().keys({
    _id: Joi.objectId().messages({ 'string.pattern.name': 'Invalid {#key}' }),
    contact_type: Joi.string().required().max(10).messages({
      'string.empty': 'Contact type cannot be an empty field',
      'any.required': 'Contact type is a required field',
      'string.max': 'Maximum charater limit for contact type is {#limit}',
      'string.base': 'Contact type must be a string',
    }),
    contact_number: Joi.string().max(15).messages({
      'string.empty': 'Contact number cannot be an empty field',
      'any.required': 'Contact number is a required field',
      'string.max': 'Maximum charater limit for contact number is {#limit}',
      'string.base': 'Contact number must be a string',
    }),
  });

  const program = Joi.objectId().messages({
    'string.pattern.name': 'Invalid {#key}',
  });

  const upOrgFacultySchema = Joi.object().keys({
    _id: Joi.objectId().messages({ 'string.pattern.name': 'Invalid {#key}' }),
    faculty_id: Joi.string().required().max(10).messages({
      'string.empty': 'Faculty id cannot be an empty field',
      'any.required': 'Faculty id is a required field',
      'string.max': 'Maximum charater limit for faculty id is {#limit}',
      'string.base': 'Faculty id must be a string',
    }),
    faculty_name: Joi.string().required().max(50).messages({
      'string.empty': 'Faculty name cannot be an empty field',
      'any.required': 'Faculty name is a required field',
      'string.max': 'Maximum charater limit for faculty name is {#limit}',
      'string.base': 'Faculty name must be a string',
    }),
    description: Joi.string().required().max(200).messages({
      'string.empty': 'Description cannot be an empty field',
      'any.required': 'Description is a required field',
      'string.max': 'Maximum charater limit for Description is {#limit}',
      'string.base': 'Description must be a string',
    }),
    programs: Joi.array().items(program).required().messages({
      'any.required': 'Programs are required',
    }),
    status: Joi.string().messages({
      'string.empty': 'Description cannot be an empty field',
      'string.base': 'Description must be a string',
    }),
  });

  const upOrgSchema = Joi.object().keys({
    org_name: Joi.string().max(50).messages({
      'string.empty': 'Organization name cannot be an empty field',
      'string.max': 'Maximum charater limit for organization name is {#limit}',
      'string.base': 'Organization name must be a string',
    }),
    org_reg_no: Joi.string().max(50).messages({
      'string.empty': 'Organization registration number cannot be an empty field',
      'string.max': 'Maximum charater limit for organization registration number is {#limit}',
      'string.base': 'Organization registration number must be a string',
    }),
    org_address: upOrgAddressSchema,
    org_contact_nums: Joi.array()
      .items(upOrgContactSchema)
      .unique('_id')
      .unique('contact_number', { ignoreUndefined: true })
      .messages({
        'array.unique': 'Duplicate {#path} found for contact numbers',
      }),
    faculties: Joi.array()
      .items(upOrgFacultySchema)
      .unique('_id', { ignoreUndefined: true })
      .unique('faculty_id')
      .messages({
        'array.unique': 'Duplicate {#path} found for faculties',
      }),
  });

  const organizationSchema = Joi.object({
    org_id: Joi.objectId().required().messages({
      'any.required': 'Please select an organization',
      'string.pattern.name': 'Invalid {#key}',
    }),
    up_org: upOrgSchema,
  });

  return organizationSchema.validate(data);
};
// must pass a string of object id
const validateOrgId = (data) => orgIdRequired.validate(data);

// must pass a string of object id
const validateFacOid = (data) => facultyOid.validate(data);

module.exports = {
  addOrganizationValidation,
  updateOrganizationValidation,
  validateOrgId,
  validateFacOid,
  fcltyOidReq,
};
