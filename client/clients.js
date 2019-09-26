const { Client } = require('./client');

const client = new Client();

exports.getClients = async (req, res) => {
  try {
    if (Object.keys(req.query).length) {
      await getClientByQuery(req, res);
    }

    let response = await client.getClients();
    res.code(response.statusCode).send(response);
  } catch (err) {}
};

async function getClientByQuery(req, res) {
  try {
    let response = await client.getClientByQuery(req.query);

    return res.code(response.statusCode).send(response);
  } catch (err) {}
}

exports.createClient = async (req, res) => {
  try {
    let response = await client.createClient(req.body);

    res.code(response.statusCode).send(response);
  } catch (err) {}
};

exports.updateClient = async (req, res) => {
  try {
    let response = await client.updateClient(req.params.email, req.body);

    res.code(response.statusCode).send(response);
  } catch (err) {}
};

exports.deleteClient = async (req, res) => {
  try {
    let response = await client.deleteClient(req.params.email);

    res.code(response.statusCode).send(response);
  } catch (err) {}
};
