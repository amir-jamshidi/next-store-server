import mongoose from "mongoose";


const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
}, { timestamps: true });



const model = mongoose.model('ticketSection', schema);

export default model;