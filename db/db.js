const mongoose = require("mongoose");

const config = require("../config/config");

const {
  NODE_ENV,
  MONGO_DB_URL,
  MONGO_USER,
  MONGO_PASSWORD
} = process.env || config;

switch (NODE_ENV) {
  case "production":
    connectToProdDatabse(MONGO_DB_URL);
    break;

  default:
    connectToDevDatabase(MONGO_DB_URL);
    break;
}

async function connectToProdDatabse(mongoDbURL) {
  const authData = {
    user: MONGO_USER,
    password: MONGO_PASSWORD,
    useNewUrlParser: true
  };

  makeConnection(mongoDbURL, authData);
}

async function connectToDevDatabase(mongoDbURL) {
  const authData = {
    user: MONGO_USER,
    password: MONGO_PASSWORD,
    useNewUrlParser: true
  };

  makeConnection(mongoDbURL, authData);
}

async function makeConnection(mongoDbURL, authData) {
  try {
    const client = await mongoose.connect(mongoDbURL, authData);

    if (client) {
      console.log("Connected to MongoDb...");
    }
  }
  catch (err) {
    console.error("Connection to MongoDb failed" + err);
  }
}

exports.mongoose = mongoose;
