const db = require("../db/db");
const { userSchema } = require("../db/shared_schemas/");

const clientSchema = userSchema;

// schema functions
clientSchema.statics.getClients = async () => {
    try {
        let clients = await this.Client.find({});
        return clients;
    } catch (err) {
        return err;
    }
}

clientSchema.statics.getClientByEmail = async (email) => {
    try {
        let client = this.Client.findOne({
            email
        });
        return client;
    } catch (err) {
        return err;
    }
}

clientSchema.statics.createClient = async (email) => {
    try {
        let client = this.Client.findOne({ email });
        return client;
    } catch (err) {
        return err;
    }
}

clientSchema.statics.updateClient = async (email, updateClient) => {
    try {
        let client = this.Client.findOneAndUpdate({ email }, updateClient);
        return client;
    } catch (err) {
        return err;
    }
}

clientSchema.statics.deleteClient = async (email) => {
    try {
        let client = this.Client.findOneAndUpdate({ email }, {
            isActive: false
        });
        return client;
    } catch (err) {
        return err;
    }
}

exports.Client = db.mongoose.model("Client", clientSchema);
