const { BaseController } = require('@the-medicsoft/webapi-framework');
const {
  DbResultErrors
} = require('@the-medicsoft/webapi-framework/lib/helpers');

const { Client } = require('../models');

const client = new Client();

class Clients extends BaseController {
  async getClients(req, res) {
    try {
      let response = undefined;

      if (Object.keys(req.query).length) {
        response = await getClientByQuery({ req });

        return super.success({
          req,
          res,
          total: response.length,
          data: response
        });
      }

      response = await client.getClients();

      super.success({ req, res, total: response.length, data: response });
    } catch (err) {
      throw err;
    }
  }

  async createClient(req, res) {
    try {
      let response = await client.createClient({ newClient: req.body });

      if (response && typeof response !== 'string') {
        super.success({ req, res, message: 'Client Inserted!' });
      }
    } catch (err) {
      throw err;
    }
  }

  async updateClient(req, res) {
    try {
      let response = await client.updateClient({
        email: req.params.email,
        body: req.body
      });

      super.success({ req, res, message: 'Client Updated!' });
    } catch (err) {
      throw err;
    }
  }

  async deleteClient(req, res) {
    try {
      let response = await client.deleteClient({ email: req.params.email });

      super.sendResponse({ req, res, response });
    } catch (err) {
      super.fail({ req, res, message: err.message });
    }
  }
}

async function getClientByQuery({ req }) {
  return await client.getClientByQuery({ query: req.query });
}

exports.Clients = Clients;
