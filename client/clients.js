const { BaseController } = require('../controllers/BaseController');
const { Client } = require('./client');

const client = new Client();

class Clients extends BaseController {
  async getClients(req, res) {
    try {
      let response = undefined;

      if (Object.keys(req.query).length) {
        response = await getClientByQuery(req);
        return super.sendResponse(req, res, response);
      }

      response = await client.getClients();

      super.sendResponse(req, res, response);
    } catch (err) {
      super.sendErrorResponse(req, res, err);
    }
  }

  async createClient(req, res) {
    try {
      let response = await client.createClient(req.body);

      super.sendResponse(req, res, response);
    } catch (err) {
      super.sendErrorResponse(req, res, err);
    }
  }

  async updateClient(req, res) {
    try {
      let response = await client.updateClient(req.params.email, req.body);

      super.sendResponse(req, res, response);
    } catch (err) {
      super.sendErrorResponse(req, res, err);
    }
  }

  async deleteClient(req, res) {
    try {
      let response = await client.deleteClient(req.params.email);

      super.sendResponse(req, res, response);
    } catch (err) {
      super.sendErrorResponse(req, res, err);
    }
  }
}

async function getClientByQuery(req) {
  return await client.getClientByQuery(req.query);
}

exports.Clients = Clients;
