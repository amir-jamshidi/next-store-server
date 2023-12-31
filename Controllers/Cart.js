import cartModel from '../Models/Cart.js'

export const getCart = async (req, res, next) => {
    try {
        const { userID } = req.params;
        const cart = await cartModel.find({ userID }).populate('productID').lean();
        if (cart) {
            res.status(200).json(cart);
        }
    } catch (error) {
        next(error)
    }
}

export const insert = async (req, res, next) => {
    try {
        const { productID, userID, count, total } = req.body;
        const cart = new cartModel.create({ productID, userID, count, total });
        if (cart) {
            res.status(201).json(cart);
        }
    } catch (error) {
        next(error)
    }
}

export const remove = async (req, res, next) => {

}

export const getAll = async (req, res, next) => {

}
