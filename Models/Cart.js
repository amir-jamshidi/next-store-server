import mongoose from "mongoose";

const schema = new mongoose.Schema({
    productID: {
        type: mongoose.Types.ObjectId,
        ref: 'product',
        required: true
    },
    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    count: {
        type: Number,
        default: 1
    }
}, { timestamps: true });

const model = mongoose.model('cart', schema);

export default model