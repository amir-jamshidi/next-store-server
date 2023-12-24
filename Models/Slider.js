import mongoose from "mongoose";

const schema = new mongoose.Schema({

    img: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    href: {
        type: String,
        required: true
    },
    mode: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const model = mongoose.model('slider', schema);

export default model