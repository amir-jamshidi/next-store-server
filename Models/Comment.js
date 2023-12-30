import mongoose from "mongoose";

const schema = new mongoose.Schema({
    creatorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    body: {
        type: String,
        required: true
    },
    productID: {
        type: mongoose.Types.ObjectId,
        ref: 'product',
        required: true
    },
    score: {
        type: Number,
        default: 5
    },
    photos: {
        type: [String],
        required: false
    }
}, { timestamps: true });

const model = mongoose.model('comment', schema);

export default model;