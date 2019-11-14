const { BaseModel } = require('@the-medicsoft/webapi-framework');
const { model } = require('mongoose');

const { AppointmentStatusSchema } = require('../schemas');

class AppointmentStatus extends BaseModel {
  constructor() {
    super(model('AppointmentStatus', AppointmentStatusSchema));
  }
}

exports.AppointmentStatus = AppointmentStatus;
