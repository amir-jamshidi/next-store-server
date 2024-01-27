import mongoose from "mongoose";

export const addressSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    avenue: {
        type: String,
        required: true
    },
    alley: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

const model = mongoose.model('address', addressSchema);


export default model;