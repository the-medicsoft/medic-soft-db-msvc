const { Doctor } = require("./doctor");

exports.getDoctors = async (req, res) => {
  try {
    let response = await Doctor.getDoctors();
    
    res
      .code(response.statusCode)
      .send(response);
  } catch (err) {}
};

exports.getDoctorByEmail = async (req, res) => {
  try {
  } catch (err) {}
};

exports.createDoctor = async (req, res) => {
  try {
    let doctor = new Doctor(req.body);

    let response = await Doctor.createDoctor(doctor);
    
    res
      .code(response.statusCode)
      .send(response);
  } catch (err) {}
};

exports.updateDoctor = async (req, res) => {
  try {
  } catch (err) {}
};

exports.deleteDoctor = async (req, res) => {
  try {
  } catch (err) {}
};
