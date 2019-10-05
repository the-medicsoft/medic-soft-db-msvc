const { db, BaseModel } = require('../db');
const { userSchema } = require('../db/shared_schemas/');

const { mongoose } = db;

const clientSchema = new mongoose.Schema(userSchema);

const clientModel = mongoose.model('Client', clientSchema);

class Client extends BaseModel {
  constructor() {
    super(clientModel);
  }

  async createClient(newClient) {
    // if client exists then do not insert and, prompt user with message
    let { email } = newClient.contacts;

    let clientExists = await this.Model.findOne({
      'contacts.email': email
    });

    if (clientExists && clientExists.contacts.email === email) {
      super.conflict(`Client with email ${email} already exists!`);
    }

    let client = await super.create(newClient);

    if (client && client.contacts.email === email) {
      return super.success(undefined, client, 'Client Inserted');
    } else {
      super.fail();
    }
  }

  async getClients() {
    const response = await super.read();

    if (response.length) {
      return super.success(response.length, response, undefined);
    } else {
      super.fail();
    }
  }

  async getClientByQuery(query) {
    const response = await super.readByQuery(query);

    if (response.length) {
      return super.success(response.length, response, undefined);
    } else {
      super.notFound();
    }
  }

  async updateClient(email, updateClientWith) {
    const client = await this.Model.findOne({ 'contacts.email': email });

    if (client && client.contacts.email === email) {
      const result = await super.update(client._id, updateClientWith);

      if (result) {
        return super.success(undefined, result, 'Client Inserted');
      } else {
        super.fail('Client not updated!');
      }
    } else {
      super.notFound(`Client with email ${email} not found!`);
    }
  }

  async deleteClient(email) {
    const setActiveToFalse = { isActive: false };

    const client = await this.Model.findOne({ 'contacts.email': email });

    if (client && client.contacts.email === email) {
      const response = await super.delete(client._id, setActiveToFalse);

      if (response && response.isActive === false) {
        return super.success(undefined, undefined, 'Client Deleted');
      } else {
        return super.fail('Client not deleted');
      }
    } else {
      super.notFound(`Client with email ${email} not found!`);
    }
  }
}

exports.Client = Client;
