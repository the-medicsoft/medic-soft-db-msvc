const mongoose = require('mongoose');

const config = require('../config/config');

const {
  MONGO_DB_URL = config.MONGO_DB_URL,
  MONGO_USER = config.MONGO_USER,
  MONGO_PASSWORD = config.MONGO_PASSWORD
} = process.env;

async function connect(mongoDbURL) {
  try {
    const authData = {
      user: MONGO_USER,
      password: MONGO_PASSWORD,
      useNewUrlParser: true,
      useUnifiedTopology: true
    };

    const client = await mongoose.connect(mongoDbURL, authData);

    if (client) {
      console.log('Connected to MongoDb...');
    }
  } catch (err) {
    console.error('Connection to MongoDb failed:', err);
    process.exit(1);
  }
}

connect(MONGO_DB_URL);

exports.mongoose = mongoose;
