const { Schema } = require('mongoose');

exports.pointSchema = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    default: 'Point'
  },
  coordinates: [Number]
});
