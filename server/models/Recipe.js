const mongoose = require('mongoose');

const { Schema } = mongoose;

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    ingredients: [{
        type: String,
        required: true,
    }],
    instructions: {
        type: String, 
        required: true,
    },
    image: {
        type: String,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment', 
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;