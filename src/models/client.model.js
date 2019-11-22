const { BaseModel } = require('@the-medicsoft/webapi-framework');
const {
  DB_RESULT_ERROR_CONFLICT,
  DB_RESULT_ERROR_NOT_FOUND
} = require('@the-medicsoft/webapi-framework/lib/helpers').DbResultErrors;
const { model } = require('mongoose');

const { ClientSchema } = require('../schemas');

class Client extends BaseModel {
  constructor() {
    super(model('Client', ClientSchema));
  }

  async createClient({ newClient }) {
    // if client exists then do not insert and, prompt user with message
    let { email } = newClient.contacts;

    let clientExists = await this.Model.findOne({
      'contacts.email': email
    });

    if (clientExists && clientExists.contacts.email === email) {
      const message = `Client with email ${email} already exists!`;
      throw new DB_RESULT_ERROR_CONFLICT(message);
    }

    let client = await super.create({ body: newClient });

    return client && client.contacts.email === email;
  }

  async getClients() {
    const response = await super.read();

    return response;
  }

  async getClientByQuery({ query }) {
    const response = await super.readByQuery({ query });

    if (!response.length) {
      throw new DB_RESULT_ERROR_NOT_FOUND('Client Not Found!');
    }

    return response;
  }

  async updateClient({ email, body }) {
    const client = await this.Model.findOne({ 'contacts.email': email });

    if (client && client.contacts.email === email) {
      const result = await super.update({
        id: client._id,
        body
      });

      return result;
    } else {
      const message = `Client with email ${email} not found!`;
      throw new DB_RESULT_ERROR_NOT_FOUND(message);
    }
  }

  async deleteClient({ email }) {
    const setActiveToFalse = { isActive: false };

    const client = await this.Model.findOne({ 'contacts.email': email });

    if (client && client.contacts.email === email) {
      const response = await super.delete({
        id: client._id,
        useSoftDelete: true,
        deleteDoc: setActiveToFalse
      });

      if (response && response.isActive === false) {
        return super.success({ message: 'Client Deleted' });
      } else {
        return super.fail({ message: 'Client not deleted' });
      }
    } else {
      super.notFound({ message: `Client with email ${email} not found!` });
    }
  }
}

exports.Client = Client;
