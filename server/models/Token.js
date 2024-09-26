const mongoose = require('mongoose');

const { Schema } = mongoose;

const tokenSchema = new Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;