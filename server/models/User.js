const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const recipeSchema = require('./Recipe');
const commentSchema = require('./Comment');

const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    recipes: [recipeSchema],
    comments: [commentSchema],
});

// Middleware to hash the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare entered password with hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
