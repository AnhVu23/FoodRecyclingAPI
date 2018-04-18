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
        enum: ['vegetables', 'drink', 'meat'],
        required: true
    },
    uploader: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;