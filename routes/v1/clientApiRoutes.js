const { clients } = require("../../client");
const { userBaseSchema } = require("./routeschemas");

const clientRequestBodySchema = userBaseSchema;

exports.clientApiRoutes = [
  {
    method: "GET",
    url: "/api/v1/clients",
    handler: clients.getClients
  },
  {
    method: "GET",
    url: "/api/v1/clients/:email",
    handler: clients.getClientByEmail
  },
  {
    method: "POST",
    url: "/api/v1/clients",
    schema: clientRequestBodySchema,
    handler: clients.createClient
  },
  {
    method: "PUT",
    url: "/api/v1/clients/:email",
    handler: clients.updateClient
  },
  {
    method: "DELETE",
    url: "/api/v1/clients/:email",
    handler: clients.deleteClient
  }
];
