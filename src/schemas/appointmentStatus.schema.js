const { Schema } = require('mongoose');

exports.AppointmentStatusSchema = new Schema({
  code: {
    type: String,
    required: true
  },
  descr: {
    type: String,
    required: true
  }
});
