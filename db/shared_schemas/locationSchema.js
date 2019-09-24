const { mongoose } = require('../db');

exports.pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    default: 'Point'
  },
  coordinates: [Number]
});
