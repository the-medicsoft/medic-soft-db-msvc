const { Doctor } = require('./doctor');

const doctor = new Doctor();

exports.getDoctors = async (req, res) => {
  try {
    if (Object.keys(req.query).length) {
      return getDoctorByQuery(req, res);
    }

    let response = await doctor.getDoctors();

    res.code(response.statusCode).send(response);
  } catch (err) {}
};

async function getDoctorByQuery(req, res) {
  try {
    let response = await doctor.getDoctorByQuery(req.query);

    res.code(response.statusCode).send(response);
  } catch (err) {}
}

exports.createDoctor = async (req, res) => {
  try {
    let response = await doctor.createDoctor(req.body);

    res.code(response.statusCode).send(response);
  } catch (err) {
    res.code(err.statusCode).send(err);
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    let response = await doctor.updateDoctorByEmail(req.params.email, req.body);

    res.code(response.statusCode).send(response);
  } catch (err) {
    res.code(err.statusCode).send(err);
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    let response = await doctor.deleteDoctorByEmail(req.params.email);

    res.code(response.statusCode).send(response);
  } catch (err) {
    res.code(err.statusCode).send(err);
  }
};
