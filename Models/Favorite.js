import mongoose from "mongoose";


const schema = new mongoose.Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    productID: {
        type: mongoose.Types.ObjectId,
        ref: 'product',
        required: true
    }
}, { timestamps: true });

const model = mongoose.model('favorite', schema);

export default model