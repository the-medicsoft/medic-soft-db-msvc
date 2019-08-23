const { mongoose } = require('../db/db');

// TODO
/**
 * P  = Pending
 * A  = Approved
 * D  = Declined
 * CR = Change Request
 *  */
const AppointmentStatusSchema = new mongoose.Schema({
  P: {
    type: String,
    enum: ['Pending']
  },
  A: {
    type: String,
    enum: ['Approved']
  },
  D: {
    type: String,
    enum: ['Declined']
  },
  CR: {
    type: String,
    enum: ['Change Request']
  }
});

exports.AppointmentStatus = new mongoose.model(
  'AppointmentStatus',
  AppointmentStatusSchema
);
