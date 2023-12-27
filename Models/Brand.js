import mongoose from "mongoose";

const schema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    nameEn: {
        type: String,
        required: true
    }

}, { timestamps: true })

const model = mongoose.model('brand', schema);

export default model 