const { appointments } = require('../../appointment');
const { userBaseSchema } = require('./routeschemas');

const appointmentRouteSchema = {
  type: userBaseSchema.type,
  required: ['department'],
  properties: userBaseSchema.properties
};

module.exports = function(fastify, opts, next) {
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
