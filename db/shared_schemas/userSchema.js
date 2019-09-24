const { mongoose } = require('../db');

const locationSchema = require('./locationSchema');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  address: {
    line1: {
      type: String,
      required: true
    },
    line2: String,
    city: String,
    zipCode: Number,
    state: String,
    country: String
  },
  location: {
    type: locationSchema.pointSchema,
    required: true
  },
  contacts: {
    phones: [
      {
        type: String
      }
    ],
    email: {
      type: String,
      required: true
    }
  },
  isActive: { type: Boolean, default: true },
  password: { type: String, required: true },
  isDoctor: { type: Boolean, default: false },
  gender: { type: String, required: true }
});

exports.userSchema = userSchema;
