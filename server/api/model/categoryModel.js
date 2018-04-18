const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    idNumber: {
        type: Number,
        required: true
    },
    photos: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
});

const Category = mongoose.model('Category', CategorySchema);
module.exports = {Category};