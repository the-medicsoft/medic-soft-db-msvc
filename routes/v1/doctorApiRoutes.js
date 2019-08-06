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

exports.doctorApiRoutes = [
  {
    method: 'GET',
    url: '/api/v1/doctors',
    handler: doctors.getDoctors
  },
  {
    method: 'GET',
    url: '/api/v1/doctors/:email',
    handler: doctors.getDoctorByEmail,
    schema: {
      params: {
        email: { type: 'string' }
      }
    }
  },
  {
    method: 'POST',
    url: '/api/v1/doctors',
    schema: {
      body: doctorRequestBodySchema
    },
    handler: doctors.createDoctor
  },
  {
    method: 'PUT',
    url: '/api/v1/doctors/:email',
    handler: doctors.updateDoctor,
    schema: {
      params: {
        email: { type: 'string' }
      }
    }
  },
  {
    method: 'DELETE',
    url: '/api/v1/doctors/:email',
    handler: doctors.deleteDoctor,
    schema: {
      params: {
        email: { type: 'string' }
      }
    }
  }
];
