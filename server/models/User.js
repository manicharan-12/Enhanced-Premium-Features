// models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum: ['user', 'recruiter'],
    required: true
  },
  plan: {
    type: String,
    default: 'free'
  },
  skills: [String],
  certifications: [String],
  company: String
});

module.exports = mongoose.model('User', UserSchema);