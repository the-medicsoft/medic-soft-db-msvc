const { Client } = require("./client");

exports.getClients = async (req, res) => {
  try {
    let response = Client.getClients();
    
    res.send(response);
  } catch (err) {}
};

exports.getClientByEmail = async (req, res) => {
  try {
    let response = Client.getClientByEmail(req.params.email);

    res.send(response);
  } catch (err) {}
};

exports.createClient = async (req, res) => {
  try {
  } catch (err) {}
};

exports.updateClient = async (req, res) => {
  try {
  } catch (err) {}
};

exports.deleteClient = async (req, res) => {
  try {
  } catch (err) {}
};
