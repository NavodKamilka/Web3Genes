const { Schema, model } = require('mongoose');

const OrganizatioSchema = new Schema({
  org_name: {
    type: String,
    required: [true, 'Organization Name is Essential'],
    trim: true,
    maxLength: [50, 'Max character count is 50'],
  },
  org_reg_no: {
    type: String,
    unique: true,
    sparse: true,
    required: [true, 'Organization Reg No is Essential'],
    maxLength: [50, 'Max character count is 50'],
  },
  org_address: {
    add_no: {
      type: String,
      required: [true, 'Address No is Essential'],
      trim: true,
      maxLength: [10, 'Max character count is 10'],
    },
    add_line1: {
      type: String,
      required: [true, 'Address Line1 is Essential'],
      trim: true,
      maxLength: [30, 'Max character count is 30'],
    },
    add_line2: {
      type: String,
      trim: true,
      maxLength: [30, 'Max character count is 30'],
    },
    city: {
      type: String,
      required: [true, 'City is Essential'],
      trim: true,
      maxLength: [30, 'Max character count is 30'],
    },
  },
  org_contact_nums: [
    {
      contact_type: {
        type: String,
        required: true,
        trim: true,
        maxLength: [10, 'Contact Type: Max character count is 10'],
      },
      contact_number: {
        type: String,
        required: true,
        maxLength: [15, 'Contact No: Max character count is 15'],
      },
    },
  ],
  faculties: [
    {
      faculty_id: {
        type: String,
        maxLength: [10, 'Faculty ID: Max character count is 10'],
        required: true,
      },
      faculty_name: {
        type: String,
        maxLength: [50, 'Faculty Name: Max character count is 50'],
        required: true,
      },
      description: {
        type: String,
        maxLength: [200, 'Faculty Desc: Max character count is 200'],
        required: true,
      },
      programs: [
        {
          type: Schema.Types.ObjectId,
          ref: 'program',
          required: true,
        },
      ],
      status: {
        type: String,
        default: 'ACTIVE',
      },
    },
  ],
});

module.exports = model('organization', OrganizatioSchema);
