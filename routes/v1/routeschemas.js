exports.userBaseSchema = {
  body: {
    type: "object",
    properties: {
      firstName: { type: "string" },
      lastName: { type: "string" },
      address: {
        type: "object",
        required: ["line1"],
        properties: {
          line1: {
            type: "string"
          },
          line2: {
            type: "string"
          },
          zipCode: {
            type: "integer"
          },
          state: {
            type: "string"
          },
          country: {
            type: "string"
          }
        }
      },
      contacts: {
        type: "object",
        required: ["email"],
        properties: {
          phones: {
            type: "array",
            items: {
              type: "string"
            }
          },
          email: {
            type: "string"
          }
        }
      },
      isActive: { type: "boolean" }
    }
  }
};