const { mongoose } = require("../db/db");
const { userSchema } = require("../db/shared_schemas/");

const clientSchema = new mongoose.Schema(userSchema);

// schema functions
clientSchema.statics.getClients = async function () {
    try {
        let clients = await this.find();
        return {
            success: true,
            statusCode: 200,
            statusText: "OK",
            total: clients.length,
            data: [clients]
        };
    } catch (err) {
        return err;
    }
}

clientSchema.statics.getClientByEmail = async function (email) {
    try {
        let client = await this.findOne({ "contacts.email": email });

        if (client)
            return {
                success: true,
                statusCode: 200,
                statusText: "OK",
                message: `client found!`,
                data: [client]
            };
        else
            return {
                success: true,
                statusCode: 404,
                statusText: "Not Found",
                message: `client Not found!`
            };
    } catch (err) { }
}

clientSchema.statics.createClient = async function (newClient) {
    try {
        // if client exists then do not insert and, prompt user with message
        let { email } = newClient.contacts;

        let clientExists = await this.findOne({ "contacts.email": email });

        if (clientExists && clientExists.contacts.email) {
            return {
                success: false,
                statusCode: 409,
                statusText: "Conflict",
                message: `client with email ${email} already exists!`
            };
        }

        let client = await this.insertMany(newClient);

        return {
            success: true,
            statusCode: 200,
            statusText: "OK",
            message: `client inserted`,
            data: [client]
        };
    } catch (err) {}
}

clientSchema.statics.updateClient = async function (email, updateClientWith) {
    try {
        let client = await this.findOneAndUpdate({ "contacts.email": email }, updateClientWith);
        return client;
    } catch (err) {
        return err;
    }
}

clientSchema.statics.deleteClient = async function (email) {
    try {
        let client = await this.findOneAndUpdate({ "contacts.email": email }, {
            isActive: false
        });
        return client;
    } catch (err) {
        return err;
    }
}

exports.Client = mongoose.model("Client", clientSchema);
