import orderModel from '../Models/Order.js'
import cartModel from '../Models/Cart.js'
export const insert = async (req, res, next) => {

    try {
        const { productsDetails, price, isSuccess, addressID, sendMethodID, award } = req.body
        const code = Date.now() + Math.trunc(Math.random() * 1000000);
        const order = await orderModel.create({ userID: req.user._id, productsDetails, price, isSuccess, addressID, code, sendMethodID, award });
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
        const orders = await orderModel.find({ userID: req.user._id }).populate({ path: 'productsDetails', populate: { path: 'productID' } }).populate('addressID').populate('sendMethodID').lean();
        res.status(200).json(orders)
    } catch (error) {
        next(error);
    }
}

export const changeState = async (req, res, next) => {

}