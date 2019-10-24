const { Clients } = require('../../client');
const { userBaseSchema } = require('./routeschemas');

const clientRequestBodySchema = {
  type: userBaseSchema.type,
  required: ['password', 'gender'],
  properties: userBaseSchema.properties
};

module.exports = function(fastify, opts, done) {
  const clients = new Clients();

  fastify.get('/clients', clients.getClients);

  fastify.post(
    '/clients',
    {
      schema: {
        body: clientRequestBodySchema
      }
    },
    clients.createClient
  );

  fastify.patch('/clients/:email', clients.updateClient);

  fastify.delete('/clients/:email', clients.deleteClient);
  done();
};
