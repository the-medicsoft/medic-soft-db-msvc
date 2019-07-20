const { Doctor } = require('./doctor');

exports.getDoctors = async (req, res) => {
  try {
    if (req.query) {
      return getDoctorByQuery(req, res);
    }

    let response = await Doctor.getDoctors();

    res.code(response.statusCode).send(response);
  } catch (err) {}
};

const getDoctorByQuery = async (req, res) => {
  try {
    let response = await Doctor.getDoctorByQuery(req.query);

    res.code(response.statusCode).send(response);
  } catch (err) {}
};

exports.getDoctorByEmail = async (req, res) => {
  try {
    let response = await Doctor.getDoctorByEmail(req.params.email);

    res.code(response.statusCode).send(response);
  } catch (err) {
    res.code(err.statusCode).send(err);
  }
};

exports.createDoctor = async (req, res) => {
  try {
    let doctor = new Doctor(req.body);

    let response = await Doctor.createDoctor(doctor);

    res.code(response.statusCode).send(response);
  } catch (err) {
    res.code(err.statusCode).send(err);
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    let response = await Doctor.updateDoctorByEmail(req.params.email, req.body);

    res.code(response.statusCode).send(response);
  } catch (err) {
    res.code(err.statusCode).send(err);
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    let response = await Doctor.deleteDoctorByEmail(req.params.email);

    res.code(response.statusCode).send(response);
  } catch (err) {
    res.code(err.statusCode).send(err);
  }
};
