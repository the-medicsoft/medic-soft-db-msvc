const fakerAPI = require('./fakerAPI');
const { Client } = require('../client/client');

const client = new Client();

exports.seedClients = async (seedLimit = 1) => {
  try {
    const count = await client.Model.countDocuments();

    if (count === 0) {
      const data = await fakerAPI.fakeClients(seedLimit);

      await client.Model.create(data);

      console.log('Clients Seed Complete!');
    } else {
      throw new Error('Collection Clients: Documents already exists!');
    }
  } catch (err) {
    console.error(err.message);
  }
};

exports.dropClients = async () => {
  try {
    const count = await client.Model.countDocuments();

    await client.Model.deleteMany();

    console.log(`Collection Clients: Total ${count} Removed!`);
  } catch (e) {
    throw e;
  }
};
