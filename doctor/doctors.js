const { BaseController } = require('../controllers/BaseController');
const { Doctor } = require('./doctor');

const doctor = new Doctor();

class Doctors extends BaseController {
  async getDoctors(req, res) {
    try {
      let response = undefined;

      if (Object.keys(req.query).length) {
        response = await getDoctorByQuery(req);
        return super.sendResponse(req, res, response);
      }

      response = await doctor.getDoctors();

      super.sendResponse(req, res, response);
    } catch (err) {
      super.sendErrorResponse(req, res, err);
    }
  }

  async createDoctor(req, res) {
    try {
      let response = await doctor.createDoctor(req.body);

      super.sendResponse(req, res, response);
    } catch (err) {
      super.sendErrorResponse(req, res, err);
    }
  }

  async updateDoctor(req, res) {
    try {
      let response = await doctor.updateDoctorByEmail(
        req.params.email,
        req.body
      );

      super.sendResponse(req, res, response);
    } catch (err) {
      super.sendErrorResponse(req, res, err);
    }
  }

  async deleteDoctor(req, res) {
    try {
      let response = await doctor.deleteDoctorByEmail(req.params.email);

      super.sendResponse(req, res, response);
    } catch (err) {
      super.sendErrorResponse(req, res, err);
    }
  }
}

async function getDoctorByQuery(req) {
  return await doctor.getDoctorByQuery(req.query);
}

exports.Doctors = Doctors;
