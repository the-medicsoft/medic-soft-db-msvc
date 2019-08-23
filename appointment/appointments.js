const { Appointment } = require('./appointment');

exports.createAppointment = async (req, res) => {
  let result = await Appointment.createAppointment(req.body);

  res.send(result);
};

exports.getAppointments = async (req, res) => {
  let result = await Appointment.getAppointments();

  res.send(result);
};
