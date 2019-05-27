const { Client } = require("./client");

exports.getClients = async (req, res) => {
  try {
    let response = await Client.getClients();
    
    res
      .code(response.statusCode)
      .send(response);
  } catch (err) {}
};

exports.getClientByEmail = async (req, res) => {
  try {
    let response = await Client.getClientByEmail(req.params.email);

    res
      .code(response.statusCode)
      .send(response);
  } catch (err) {
    res
      .code(err.statusCode)
      .send(err);
  }
};

exports.createClient = async (req, res) => {
  try {
    const client = new Client(req.body);

    let response = await Client.createClient(client);

    res
      .code(response.statusCode)
      .send(response);
  } catch (err) {}
};

exports.updateClient = async (req, res) => {
  try {
    let response = await Client.updateClient(req.params.email, req.body);

    res
      .code(response.statusCode)
      .send(response);
  } catch (err) {}
};

exports.deleteClient = async (req, res) => {
  try {
    let response = await Client.deleteClient(req.params.email);

    res
      .code(response.statusCode)
      .send(response);
  } catch (err) {}
};
