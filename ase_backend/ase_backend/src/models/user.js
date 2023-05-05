const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'organization',
    required: [true, 'Oraginzation is a requiredd field'],
  },
  first_name: {
    type: String,
    required: [true, 'First name is a requiredd field'],
    maxLength: [50, 'Max character count is 50'],
  },
  last_name: {
    type: String,
    required: [true, 'Last name is a requiredd field'],
    maxLength: [50, 'Max character count is 50'],
  },
  email: {
    type: String,
    required: [true, 'Email is a requiredd field'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is a requiredd field'],
  },
  user_type: {
    type: String,
    required: [true, 'User type is a requiredd field'],
    enum: ['DO_ADMIN', 'DO_UPLOADER', 'DO_ENDORSER', 'VALIDATOR'],
  },
  designation: {
    type: String,
    required: [true, 'Designation is a requiredd field'],
    maxLength: [50, 'Max character count is 50'],
  },
  status: {
    type: String,
    required: true,
    default: 'INITIATED',
    enum: ['INITIATED', 'EMAIL_VERIFIED', 'ACTIVE'],
  },
});

module.exports = model('user', UserSchema);
