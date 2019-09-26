const { db, ResourceController } = require('../db');
const { userSchema } = require('../db/shared_schemas/');

const { mongoose } = db;

const clientSchema = new mongoose.Schema(userSchema);

// todo: convert this to Singleton Design Pattern
const clientModel = mongoose.model('Client', clientSchema);

exports.Client = class Client extends ResourceController {
  constructor() {
    super(clientModel);
  }

  async createClient(newClient) {
    try {
      // if client exists then do not insert and, prompt user with message
      let { email } = newClient.contacts;

      let clientExists = await this.Model.findOne({
        'contacts.email': email
      });

      if (clientExists && clientExists.contacts.email === email) {
        return {
          success: false,
          statusCode: 409,
          statusText: 'Conflict',
          message: `client with email ${email} already exists!`
        };
      }

      let client = await super.create(newClient);

      if (client && client.contacts.email === email) {
        return {
          success: true,
          statusCode: 200,
          statusText: 'OK',
          message: 'client inserted',
          data: client
        };
      } else {
        throw new Error();
      }
    } catch (err) {
      return {
        success: false,
        statusCode: 500,
        statusText: 'Internal Server Error',
        message: err.message
      };
    }
  }

  async getClients() {
    try {
      let response = await super.read();

      return {
        success: true,
        statusCode: 200,
        statusText: 'OK',
        total: response.length,
        data: response
      };
    } catch (err) {
      return {
        success: false,
        statusCode: 500,
        statusText: 'Internal Server Error',
        message: err.message
      };
    }
  }

  async getClientByQuery(query) {
    try {
      let response = await super.readByQuery(query);

      if (response.length) {
        return {
          success: true,
          statusCode: 200,
          statusText: 'OK',
          total: response.length,
          data: response
        };
      } else throw new Error();
    } catch (err) {
      return {
        success: false,
        statusCode: 404,
        statusText: 'Not Found',
        message: 'Not Found'
      };
    }
  }

  async updateClient(email, updateClientWith) {
    try {
      const client = await this.Model.findOne({ 'contacts.email': email });

      const response = await super.update(client._id, updateClientWith);

      if (response) {
        return {
          success: true,
          statusCode: 200,
          statusText: 'OK',
          message: 'client updated',
          data: response
        };
      }

      return {
        success: false,
        statusCode: 500,
        statusText: 'Internal Server Error',
        message: 'client not updated'
      };
    } catch (err) {
      return {
        success: false,
        statusCode: 500,
        statusText: 'Internal Server Error',
        message: err.message
      };
    }
  }

  async deleteClient(email) {
    try {
      const setActiveToFalse = { isActive: false };

      const client = await this.Model.findOne({ 'contacts.email': email });

      const response = await super.delete(client._id, setActiveToFalse);

      if (response && response.isActive === false) {
        return {
          success: true,
          statusCode: 200,
          statusText: 'OK',
          message: 'client deleted'
        };
      }

      return {
        success: false,
        statusCode: 500,
        statusText: 'Internal Server Error',
        message: 'client not deleted'
      };
    } catch (err) {
      return {
        success: false,
        statusCode: 500,
        statusText: 'Internal Server Error',
        message: err.message
      };
    }
  }
};
