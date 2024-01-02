import { number } from "joi";
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
        required: true
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
        type: number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    state: {

    },
    sendMethod: {

    },
    peymentMethod: {

    }
})

const model = mongoose.model('order', schema);
export default model