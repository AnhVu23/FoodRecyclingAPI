const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FridgeSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    uploader: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    pickUpTime: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

const Fridge = mongoose.model('Fridge', FridgeSchema);
module.exports = Fridge;