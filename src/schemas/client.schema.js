const { Schema } = require('mongoose');
const { userSchema } = require('./shared_schemas');

exports.ClientSchema = new Schema(userSchema);