const { db, BaseModel } = require('../db');
const { Schema, model } = db.mongoose;

const AppointmentStatusSchema = new Schema({
  appointmentStatusCode: {
    type: String,
    required: true
  },
  descr: {
    type: String,
    required: true
  }
});

class AppointmentStatus extends BaseModel {
  constructor() {
    super(model('AppointmentStatus', AppointmentStatusSchema));
  }
}

exports.AppointmentStatus = AppointmentStatus;
