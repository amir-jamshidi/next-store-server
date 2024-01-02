import mongoose from "mongoose";

const schema = new mongoose.Schema({
    img: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const model = mongoose.model('sendMethod', schema);

export default model;