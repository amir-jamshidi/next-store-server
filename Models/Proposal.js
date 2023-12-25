import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subTitle: {
        type: String,
        required: true
    },
    img: {
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
})


const model = mongoose.model('proposal', schema);

export default model