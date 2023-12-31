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
    try {
        const { userID, productID } = req.body;
        const remove = await cartModel.findOneAndDelete({ userID, productID }).lean();
        if (remove) {
            res.status(200).json(remove);
        }
    } catch (error) {
        next(error)
    }
}

export const removeAll = async (req, res, next) => {
    try {
        const { userID } = req.body;
        const removeAll = await cartModel.deleteMany({ userID }).lean();
        res.status(200).json({ message: 'success' });
    } catch (error) {
        next(error)
    }
}

export const getAll = async (req, res, next) => {

}
