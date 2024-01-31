import orderModel from '../Models/Order.js'
import cartModel from '../Models/Cart.js'
import productModel from '../Models/Product.js'
import orderStatusModel from '../Models/OrderStatus.js'
import addressModel from '../Models/Address.js'
import notificationModel from '../Models/Notification.js'
import converToPersian from './../Utils/PersianDate.js';
import mongoose from 'mongoose';
export const insert = async (req, res, next) => {
    try {
        const { productsDetails, price, isSuccess, addressID, sendMethodID, award } = req.body
        // productsDetails.forEach(async p => {
        //     const { inventory } = await productModel.findOne({ _id: p.productID });
        //     console.log(p.count, inventory);
        //     if (p.count > inventory) {
        //         return res.status(404).json({ message: 'error' });
        //     }
        // })
        const address = await addressModel.findOne({ _id: addressID }).lean();
        const code = Date.now() + Math.trunc(Math.random() * 1000000);
        const { _id: orderStatusID } = await orderStatusModel.findOne({ code: 1 });
        const order = await orderModel.create({ userID: req.user._id, productsDetails, price, isSuccess, addressID: address, code, sendMethodID, award, orderStatusID });
        if (order) {
            await cartModel.deleteMany({ userID: req.user._id });
            res.status(201).json(order);
            const title = 'سفارش شما با موفقیت ثبت شد ، میتونید از قسمت سفارشات پیگیری کنید'
            const href = '/panel/orders';
            await notificationModel.create({ userID: req.user._id, title, href });
            productsDetails.forEach(async p => {
                await productModel.findOneAndUpdate({ _id: p.productID }, { $inc: { inventory: -p.count } });
            })
        }
    } catch (error) {
        next(error)
    }
}
export const getOrders = async (req, res, next) => {
    try {
        const orders = await orderModel.find({ userID: req.user._id }).sort({ _id: -1 }).populate({ path: 'productsDetails', populate: { path: 'productID' } }).populate('addressID').populate('sendMethodID').populate('orderStatusID').lean();
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
        if (!mongoose.Types.ObjectId.isValid(orderID)) {
            return res.status(404).json({ message: 'not valid' });
        }
        const order = await orderModel.findOne({ _id: orderID, userID: req.user._id }).populate({ path: 'productsDetails', populate: { path: 'productID' } }).populate('addressID').populate('sendMethodID').populate('orderStatusID').lean();
        if (order) {
            order.createdAt = converToPersian(order.createdAt);
            return res.status(200).json(order)
        } else {
            return res.status(404).json({ message: 'not found' });
        }
    } catch (error) {
        next(error);
    }
}
export const changeState = async (req, res, next) => {

}

export const removeOrder = async (req, res, next) => {

}
export const removeAllOrders = async (req, res, next) => {

}