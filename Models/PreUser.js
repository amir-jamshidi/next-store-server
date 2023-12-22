import mongoose from "mongoose";

const schema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        minLength: 5
    }
}, { timestamps: true });

const model = mongoose.model('preUser', schema);
export default model