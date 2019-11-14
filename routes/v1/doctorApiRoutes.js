const { Doctors } = require('../../src/controllers');
const { userBaseSchema } = require('./routeschemas');

const doctorRequestBodySchema = {
  type: userBaseSchema.type,
  required: ['designation', 'password', 'gender'],
  properties: userBaseSchema.properties
};

// doctor schema
doctorRequestBodySchema.properties.isAdmin = { type: 'boolean' };

doctorRequestBodySchema.properties.qualifications = {
  type: 'array',
  items: {
    type: 'string'
  }
};

doctorRequestBodySchema.properties.department = { type: 'string' };

doctorRequestBodySchema.properties.designation = { type: 'string' };

doctorRequestBodySchema.properties.DOJ = { type: 'string' };

doctorRequestBodySchema.properties.visitingTime = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      branch: { type: 'string' },
      timings: { type: 'string' }
    }
  }
};

module.exports = function(fastify, opts, done) {
  const doctors = new Doctors();

  fastify.get('/doctors', doctors.getDoctors);

  fastify.post(
    '/doctors',
    {
      schema: {
        body: doctorRequestBodySchema
      }
    },
    doctors.createDoctor
  );

  fastify.patch(
    '/doctors/:email',
    {
      schema: {
        params: {
          email: { type: 'string' }
        }
      }
    },
    doctors.updateDoctor
  );

  fastify.delete(
    '/doctors/:email',
    {
      schema: {
        params: {
          email: { type: 'string' }
        }
      }
    },
    doctors.deleteDoctor
  );

  done();
};
