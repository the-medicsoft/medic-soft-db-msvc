const db = require("../db/db");
const { userSchema } = require("../db/shared_schemas/");

const clientSchema = userSchema;

exports.Client = db.mongoose.model("Client", clientSchema);
