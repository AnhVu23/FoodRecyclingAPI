const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    _id: Schema.Types.ObjectId,
    description: {
      type: String,
      required: true
    },
    imgPath: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Avocado', 'Banana', 'Cocos', 'Kiwi', 'Lemon', 'Limes', 'Mango', 'Orange', 'Pineapple', 'Strawberry'],
        required: true
    },
    uploader: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fridge: {
        type: Schema.Types.ObjectId,
        ref: 'Fridge',
        required: true
    },
    uploadedTime: {
        type: Date,
        required: true,
        default: Date.now()
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'available'
    }
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;