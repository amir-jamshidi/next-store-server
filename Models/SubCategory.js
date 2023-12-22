import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    href: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    categoryRef: {
        type: String,
        required: true
    }
}, { timestamps: true });

const model = mongoose.model('subCategory', schema);

export default model