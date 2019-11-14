const { Schema } = require('mongoose');

exports.AppointmentSchema = new Schema({
  creationDate: {
    type: Date,
    default: new Date()
  },
  appointmentDate: {
    type: Date
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  appointmentStatusCode: {
    type: Schema.Types.ObjectId,
    ref: 'AppointmentStatus',
    required: true
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  }
});
