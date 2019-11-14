const { BaseController } = require('@the-medicsoft/webapi-framework');
const { Client } = require('../models');

const client = new Client();

class Clients extends BaseController {
  async getClients(req, res) {
    try {
      let response = undefined;

      if (Object.keys(req.query).length) {
        response = await getClientByQuery({ req });
        return super.sendResponse({ req, res, response });
      }

      response = await client.getClients();

      super.sendResponse({ req, res, response });
    } catch (err) {
      super.sendErrorResponse({ req, res, errResponse: err });
    }
  }

  async createClient(req, res) {
    try {
      let response = await client.createClient({ newClient: req.body });

      super.sendResponse({ req, res, response });
    } catch (err) {
      super.sendErrorResponse({ req, res, errResponse: err });
    }
  }

  async updateClient(req, res) {
    try {
      let response = await client.updateClient({
        email: req.params.email,
        body: req.body
      });

      super.sendResponse({ req, res, response });
    } catch (err) {
      super.sendErrorResponse({ req, res, errResponse: err });
    }
  }

  async deleteClient(req, res) {
    try {
      let response = await client.deleteClient({ email: req.params.email });

      super.sendResponse({ req, res, response });
    } catch (err) {
      super.sendErrorResponse({ req, res, errResponse: err });
    }
  }
}

async function getClientByQuery({ req }) {
  return await client.getClientByQuery({ query: req.query });
}

exports.Clients = Clients;
