import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Types.ObjectId,
        ref: 'product',
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    totalPrice: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: false
    }
})

const schema = new mongoose.Schema({
    productsDetails: [productSchema],
    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    addressID: {
        type: mongoose.Types.ObjectId,
        ref: 'address',
        required: true
    },
    isSuccess: {
        type: Number,
        required: true
    },
    code: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    state: {

    },
    sendMethodID: {
        type: mongoose.Types.ObjectId,
        ref: 'sendMethod'
    },
    award: {
        type: Number,
        required: true
    },
    orderStatusID: {
        type: mongoose.Types.ObjectId,
        ref: 'orderStatus',
        required: true
    }
}, { timestamps: true })

const model = mongoose.model('order', schema);
export default model