const { BaseController } = require('@the-medicsoft/webapi-framework');
const { Doctor } = require('../models');

const doctor = new Doctor();

class Doctors extends BaseController {
  async getDoctors(req, res) {
    try {
      let response = undefined;

      if (Object.keys(req.query).length) {
        response = await getDoctorByQuery({ req });
        return super.sendResponse({ req, res, response });
      }

      response = await doctor.getDoctors();

      super.sendResponse({ req, res, response });
    } catch (err) {
      super.sendErrorResponse({ req, res, errResponse: err });
    }
  }

  async createDoctor(req, res) {
    try {
      let response = await doctor.createDoctor({ newDoctor: req.body });

      super.sendResponse({ req, res, response });
    } catch (err) {
      super.sendErrorResponse({ req, res, errResponse: err });
    }
  }

  async updateDoctor(req, res) {
    try {
      let response = await doctor.updateDoctorByEmail({
        email: req.params.email,
        body: req.body
      });

      super.sendResponse({ req, res, response });
    } catch (err) {
      super.sendErrorResponse({ req, res, errResponse: err });
    }
  }

  async deleteDoctor(req, res) {
    try {
      let response = await doctor.deleteDoctorByEmail({
        email: req.params.email
      });

      super.sendResponse({ req, res, response });
    } catch (err) {
      super.sendErrorResponse({ req, res, errResponse: err });
    }
  }
}

async function getDoctorByQuery({ req }) {
  return await doctor.getDoctorByQuery({ query: req.query });
}

exports.Doctors = Doctors;
