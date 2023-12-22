import mongoose from "mongoose";

const schema = new mongoose.Schema({

    phone: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        default: `User${Math.trunc(Date.now())}`
    },
    role: {
        type: String,
        required: true,
        default: 'USER'
    }

}, { timestamps: true });

const model = mongoose.model('user', schema);

export default model