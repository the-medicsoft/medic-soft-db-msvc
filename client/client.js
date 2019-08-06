const { mongoose } = require('../db/db');
const { userSchema } = require('../db/shared_schemas/');

const clientSchema = new mongoose.Schema(userSchema);

// schema functions
clientSchema.statics.getClients = async function() {
  try {
    // remove _id and _v properties from resultset
    const clientResultFilter = '-_id -__v -password';

    let clients = await this.find({}, clientResultFilter);

    return {
      success: true,
      statusCode: 200,
      statusText: 'OK',
      total: clients.length,
      data: clients
    };
  } catch (err) {
    return {
      success: false,
      statusCode: 500,
      statusText: 'Internal Server Error',
      message: err.message
    };
  }
};

clientSchema.statics.getClientByEmail = async function(email) {
  try {
    // remove _id and _v properties from resultset
    const clientResultFilter = '-_id -__v';

    let client = await this.findOne(
      { 'contacts.email': email },
      clientResultFilter
    );

    if (client)
      return {
        success: true,
        statusCode: 200,
        statusText: 'OK',
        message: 'client found!',
        data: { client }
      };
    else
      return {
        success: false,
        statusCode: 404,
        statusText: 'Not Found',
        message: 'client Not found!'
      };
  } catch (err) {
    return {
      success: false,
      statusCode: 500,
      statusText: 'Internal Server Error',
      message: err.message
    };
  }
};

clientSchema.statics.createClient = async function(newClient) {
  try {
    // if client exists then do not insert and, prompt user with message
    let { email } = newClient.contacts;

    let clientExists = await this.findOne({ 'contacts.email': email });

    if (clientExists && clientExists.contacts.email === email) {
      return {
        success: false,
        statusCode: 409,
        statusText: 'Conflict',
        message: `client with email ${email} already exists!`
      };
    }

    let client = await this.create(newClient);

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
};

clientSchema.statics.updateClient = async function(email, updateClientWith) {
  try {
    let client = await this.findOneAndUpdate(
      { 'contacts.email': email },
      updateClientWith,
      { useFindAndModify: true }
    );

    if (client) {
      return {
        success: true,
        statusCode: 200,
        statusText: 'OK',
        message: 'client updated',
        data: client
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
};

clientSchema.statics.deleteClient = async function(email) {
  try {
    let client = await this.findOneAndUpdate(
      { 'contacts.email': email },
      { isActive: false },
      { useFindAndModify: true }
    );

    if (client && client.isActive === false) {
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
};

exports.Client = mongoose.model('Client', clientSchema);
