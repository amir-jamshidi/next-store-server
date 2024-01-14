import mongoose from "mongoose";


const shcema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    orderID: {
        type: mongoose.Types.ObjectId,
        ref: 'order',
        required: false
    },
    userID: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    isAnswer: {
        type: Number,
        default: 0
    },
    answerContent: {
        type: String,
        default: null
    },
    ticketSectionID: {
        type: mongoose.Types.ObjectId,
        ref: 'ticketSection',
        required: true
    },
    code: {
        type: String,
        required: true
    }
}, { timestamps: true })

const model = mongoose.model('ticket', shcema);

export default model