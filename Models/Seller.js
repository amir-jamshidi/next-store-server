import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    href: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const model = mongoose.model('seller' , schema)

export default model;