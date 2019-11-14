const { Appointments } = require('../../src/controllers');
const { AppointmentStatus } = require('../../src/models');

const { userBaseSchema } = require('./routeschemas');

const appointmentRouteSchema = {
  type: userBaseSchema.type,
  required: ['department'],
  properties: userBaseSchema.properties
};

module.exports = function(fastify, opts, next) {
  const appointments = new Appointments();
  const appointmentStatus = new AppointmentStatus();
  
  fastify.post(
    '/appointments',
    {
      schema: {
        body: appointmentRouteSchema
      }
    },
    appointments.createAppointment
  );

  fastify.get('/appointments', appointments.getAppointments);
  next();
};
