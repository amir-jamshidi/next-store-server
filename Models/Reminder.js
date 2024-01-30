import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    productID: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    userID: {
        type: mongoose.Types.ObjectId,
        required: true
    }
}, { timeStamps: true });

const model = mongoose.model('reminder', schema);

export default model;