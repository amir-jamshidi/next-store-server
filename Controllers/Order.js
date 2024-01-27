import orderModel from '../Models/Order.js'
import cartModel from '../Models/Cart.js'
import orderStatusModel from '../Models/OrderStatus.js'
import addressModel from '../Models/Address.js'
import converToPersian from './../Utils/PersianDate.js';
export const insert = async (req, res, next) => {

    try {
        const { productsDetails, price, isSuccess, addressID, sendMethodID, award } = req.body
        const address = await addressModel.findOne({ _id: addressID }).lean();
        const code = Date.now() + Math.trunc(Math.random() * 1000000);
        const { _id: orderStatusID } = await orderStatusModel.findOne({ code: 1 });
        const order = await orderModel.create({ userID: req.user._id, productsDetails, price, isSuccess, addressID: address, code, sendMethodID, award, orderStatusID });
        if (order) {
            await cartModel.deleteMany({ userID: req.user._id });
            res.status(201).json(order);
        }
    } catch (error) {
        next(error)
    }


}

export const getOrders = async (req, res, next) => {
    try {
        const orders = await orderModel.find({ userID: req.user._id }).populate({ path: 'productsDetails', populate: { path: 'productID' } }).populate('addressID').populate('sendMethodID').populate('orderStatusID').lean();
        orders.forEach(order => {
            order.createdAt = converToPersian(order.createdAt);
        })
        res.status(200).json(orders)
    } catch (error) {
        next(error);
    }
}

export const getOne = async (req, res, next) => {
    try {
        const { orderID } = req.params;
        const order = await orderModel.findOne({ _id: orderID, userID: req.user._id }).populate({ path: 'productsDetails', populate: { path: 'productID' } }).populate('addressID').populate('sendMethodID').populate('orderStatusID').lean();
        order.createdAt = converToPersian(order.createdAt);
        if (order) {
            res.status(200).json(order)
        }
    } catch (error) {
        next(error);
    }
}

export const changeState = async (req, res, next) => {

}
