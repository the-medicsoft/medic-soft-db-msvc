const { BaseController } = require('@the-medicsoft/webapi-framework');
const { Appointment } = require('../models');

const appointment = new Appointment();

class Appointments extends BaseController {
  async createAppointment(req, res) {
    try {
      let result = await appointment.createAppointment({
        appointment: req.body
      });

      super.sendResponse({ req, res, response: result });
    } catch (err) {
      super.sendErrorResponse({ req, res, errResponse: err });
    }
  }

  async getAppointments(req, res) {
    try {
      let result = await appointment.getAppointments();

      super.sendResponse({ req, res, response: result });
    } catch (err) {
      super.sendErrorResponse({ req, res, errResponse: err });
    }
  }
}

exports.Appointments = Appointments;
