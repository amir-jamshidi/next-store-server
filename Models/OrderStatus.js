import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        required: true
    },
    href: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    }
}, { timestamps: true });

const model = mongoose.model('orderStatus', schema);

export default model;