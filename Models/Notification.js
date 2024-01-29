import mongoose from "mongoose";


const schema = new mongoose.Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        default: 1
    },
    seen: {
        type: Number,
        default: 0
    },
    href: {
        type: String,
        required: false
    }

}, { timestamps: true });

const model = mongoose.model('notifications', schema);

export default model