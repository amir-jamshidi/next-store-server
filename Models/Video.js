import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    href: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    courseID: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    video: {
        type: String,
        required: true
    }
}, { timestamps: true })

const model = mongoose.model('video', schema);

export default model;