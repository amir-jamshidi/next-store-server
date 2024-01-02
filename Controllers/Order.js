import orderModel from '../Models/Order.js'
import cartModel from '../Models/Cart.js'
export const insert = async (req, res, next) => {

    try {
        const { productsDetails, price, isSuccess, addressID } = req.body
        const code = Date.now() + Math.trunc(Math.random() * 1000000);
        const order = await orderModel.create({ userID: req.user._id, productsDetails, price, isSuccess, addressID, code });
        if (order) {
            await cartModel.deleteMany({ userID: req.user._id });
            res.status(201).json(order);
        }
    } catch (error) {
        next(error)
    }


}