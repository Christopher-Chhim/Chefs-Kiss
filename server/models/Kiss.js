const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chefsKissSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    recipeId: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe', 
        required: true
    },
    kissedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Kiss', chefsKissSchema);



