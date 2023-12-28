import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    attributes: {
        // type: [mongoose.Schema.Types.Mixed],
        type: [[]],
        required: true
    },
    creatorID: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    photos: {
        type: [String],
        required: true
    },
    categoryID: {
        type: mongoose.Types.ObjectId,
        ref: 'category'
    },
    sellerID: {
        type: mongoose.Types.ObjectId,
        ref: 'seller',
        //required: true
    },
    brandID: {
        type: mongoose.Types.ObjectId,
        ref: "brand"
    },
    code: {
        type: String,
        required: true
    },
    award: {
        type: Number,
        required: true
    },
    warranty: {
        type: String,
        required: true
    },
    inventory: {
        type: Number,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    colors: {
        type: [String],
        required: true
    },
    price: {
        type: String,
        required: true
    },
    isOff: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    sendTime: {
        type: String,
        required: true
    },
    href: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    }
}, { timestamps: true });

const model = mongoose.model('product', schema)

export default model;