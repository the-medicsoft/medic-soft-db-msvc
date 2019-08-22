const { doctors } = require('../../doctor');
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
  fastify.get('/doctors', doctors.getDoctors);

  fastify.get(
    '/doctors/:email',
    {
      schema: {
        params: {
          email: { type: 'string' }
        }
      }
    },
    doctors.getDoctorByEmail
  );

  fastify.post(
    '/doctors',
    {
      schema: {
        body: doctorRequestBodySchema
      }
    },
    doctors.createDoctor
  );

  fastify.put(
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
