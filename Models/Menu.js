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
    categoryID: {
        type: mongoose.Types.ObjectId,
        ref: 'category'
    }
}, { timestamps: true })

const model = mongoose.model('menu', schema);

export default model


