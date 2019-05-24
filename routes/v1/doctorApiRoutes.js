const { doctors } = require("../../doctor");
const { userBaseSchema } = require("./routeschemas");

const doctorRequestBodySchema = userBaseSchema;

// required keys/fields
doctorRequestBodySchema.body.required = ["department", "designation"];

// doctor schema
doctorRequestBodySchema.body.properties.isAdmin = { type: "boolean" };

doctorRequestBodySchema.body.properties.qualifications = {
  type: "array",
  items: {
    type: "string"
  }
};

doctorRequestBodySchema.body.properties.isActive = { type: "boolean" };

doctorRequestBodySchema.body.properties.department = { type: "string" };

doctorRequestBodySchema.body.properties.designation = { type: "string" };

doctorRequestBodySchema.body.properties.DOJ = { type: "string" };

doctorRequestBodySchema.body.properties.visitingTime = {
  type: "array",
  items: {
    type: "object",
    properties: {
      branch: { type: "string" },
      timings: { type: "string" }
    }
  }
};

exports.doctorApiRoutes = [
  {
    method: "GET",
    url: "/api/v1/doctors",
    handler: doctors.getDoctors
  },
  {
    method: "GET",
    url: "/api/v1/doctors/:email",
    handler: doctors.getDoctorByEmail,
    schema: {
      params: {
        email: { type: "string" }
      }
    }
  },
  {
    method: "POST",
    url: "/api/v1/doctors",
    schema: doctorRequestBodySchema,
    handler: doctors.createDoctor
  },
  {
    method: "PUT",
    url: "/api/v1/doctors/:email",
    handler: doctors.updateDoctor,
    schema: {
      params: {
        email: { type: "string" }
      }
    }
  },
  {
    method: "DELETE",
    url: "/api/v1/doctors/:email",
    handler: doctors.deleteDoctor,
    schema: {
      params: {
        email: { type: "string" }
      }
    }
  }
];
