const { BaseModel } = require('@the-medicsoft/webapi-framework');
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
      super.conflict({ message: `Client with email ${email} already exists!` });
    }

    let client = await super.create({ body: newClient });

    if (client && client.contacts.email === email) {
      return super.success({ data: client, message: 'Client Inserted' });
    } else {
      super.fail();
    }
  }

  async getClients() {
    const response = await super.read();

    if (response.length) {
      return super.success({ total: response.length, data: response });
    } else {
      super.fail();
    }
  }

  async getClientByQuery({ query }) {
    const response = await super.readByQuery({ query });

    if (response.length) {
      return super.success({ total: response.length, data: response });
    } else {
      super.notFound();
    }
  }

  async updateClient({ email, body }) {
    const client = await this.Model.findOne({ 'contacts.email': email });

    if (client && client.contacts.email === email) {
      const result = await super.update({
        id: client._id,
        body
      });

      if (result) {
        return super.success({ data: result, message: 'Client Inserted' });
      } else {
        super.fail({ message: 'Client not updated!' });
      }
    } else {
      super.notFound({ message: `Client with email ${email} not found!` });
    }
  }

  async deleteClient({ email }) {
    const setActiveToFalse = { isActive: false };

    const client = await this.Model.findOne({ 'contacts.email': email });

    if (client && client.contacts.email === email) {
      const response = await super.delete({
        id: client._id,
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
