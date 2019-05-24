const { mongoose } = require("../db");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  address: {
    line1: {
      type: String,
      required: true
    },
    line2: String,
    zipCode: Number,
    state: String,
    country: String
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
  isActive: { type: Boolean, default: true }
});

exports.userSchema = userSchema;
