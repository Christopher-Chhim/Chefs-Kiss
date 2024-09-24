const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const voteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true,
    }
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;